"use client";

import { useCallback, useEffect, useRef } from "react";

export const useSpeech = () => {
    const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        if (typeof window === "undefined" || !window.speechSynthesis) return;

        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                voicesRef.current = voices;
                console.log("[Speech] Voices loaded:", voices.filter(v => v.lang.includes("vi")).map(v => v.name));
            }
        };

        loadVoices();

        // Chrome và một số trình duyệt khác cần event này để load voices
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Một số trường hợp cần gọi lại sau 1s để chắc chắn
        const timer = setTimeout(loadVoices, 1000);
        return () => clearTimeout(timer);
    }, []);

    const speak = useCallback((text: string) => {
        if (typeof window === "undefined" || !window.speechSynthesis) return;

        // Hủy mọi âm thanh đang phát để tránh chồng chéo
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Lấy danh sách giọng từ ref hoặc trực tiếp
        let voices = voicesRef.current;
        if (voices.length === 0) {
            voices = window.speechSynthesis.getVoices();
        }

        const viVoices = voices.filter(v => v.lang.includes("vi") || v.lang.includes("VN"));

        // Ưu tiên:
        // 1. Giọng Online "An" hoặc "HoaiMy" (Microsoft Online voices cực hay)
        // 2. Các giọng chứa từ "female", "nữ", "linh"
        // 3. Giọng Google Vietnamese
        // 4. Giọng tiếng Việt đầu tiên tìm thấy
        const selectedVoice =
            viVoices.find(v => v.name.toLowerCase().includes("online") && (v.name.toLowerCase().includes("an") || v.name.toLowerCase().includes("hoaimy"))) ||
            viVoices.find(v => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("nữ") || v.name.toLowerCase().includes("linh") || v.name.toLowerCase().includes("an")) ||
            viVoices.find(v => v.name.toLowerCase().includes("google")) ||
            viVoices[0];

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log("[Speech] Playing with voice:", selectedVoice.name);
        }

        utterance.lang = "vi-VN";
        utterance.rate = 0.85; // Đọc chậm cho bé dễ nghe
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
    }, []);

    return { speak };
};
