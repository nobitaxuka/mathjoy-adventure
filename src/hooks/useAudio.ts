"use client";

import { useCallback } from "react";

export const useAudio = () => {
    const playSound = useCallback((type: "correct" | "wrong" | "victory" | "click") => {
        // Chúng ta sẽ sử dụng AudioContext hoặc tạo phần tử Audio mới
        // Vì chưa có file mp3 thực tế, em sẽ chuẩn bị sẵn logic để anh chỉ cần bỏ file vào folder public/sounds
        const audioPath = {
            correct: "/sounds/correct.mp3",
            wrong: "/sounds/wrong.mp3",
            victory: "/sounds/victory.mp3",
            click: "/sounds/click.mp3",
        };

        const audio = new Audio(audioPath[type]);
        audio.play().catch(() => {
            // Bỏ qua lỗi nếu trình duyệt chặn tự động phát hoặc chưa có file
            console.log(`[Audio] Đang phát âm thanh: ${type} (Vui lòng thêm file ${audioPath[type]} vào thư mục public để nghe)`);
        });
    }, []);

    return { playSound };
};
