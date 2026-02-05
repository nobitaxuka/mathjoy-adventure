import { Question } from "@/types/game";
import { LEVEL_1_QUESTIONS } from "./questions";

/**
 * Thuật toán Shuffle Fisher-Yates để xáo trộn mảng
 */
export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/**
 * Lấy 10 câu hỏi ngẫu nhiên cho một level cụ thể
 */
export const getRandomQuestions = (level: number, count: number = 10): Question[] => {
    let allQuestions: Question[] = [];

    if (level === 1) {
        allQuestions = LEVEL_1_QUESTIONS;
    }
    // Thêm các level khác ở đây sau này

    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, count);
};
