import { AgeGroup, Question } from "@/types/game";
import { LEVEL_1_QUESTIONS, LEVEL_2_QUESTIONS, RECOGNITION_QUESTIONS } from "./questions";

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
 * Tỉ lệ độ khó theo màn (1-10)
 */
const DIFFICULTY_RATIOS: Record<number, { EASY: number; MEDIUM: number; HARD: number }> = {
    1: { EASY: 10, MEDIUM: 0, HARD: 0 },
    2: { EASY: 9, MEDIUM: 1, HARD: 0 },
    3: { EASY: 8, MEDIUM: 2, HARD: 0 },
    4: { EASY: 7, MEDIUM: 3, HARD: 0 },
    5: { EASY: 5, MEDIUM: 5, HARD: 0 },
    6: { EASY: 4, MEDIUM: 6, HARD: 0 },
    7: { EASY: 2, MEDIUM: 7, HARD: 1 },
    8: { EASY: 1, MEDIUM: 6, HARD: 3 },
    9: { EASY: 0, MEDIUM: 4, HARD: 6 },
    10: { EASY: 0, MEDIUM: 2, HARD: 8 },
};

/**
 * Lấy 10 câu hỏi ngẫu nhiên dựa trên độ tuổi và màn chơi (độ khó tăng dần)
 */
export const getRandomQuestions = (ageGroup: AgeGroup, level: number, count: number = 10): Question[] => {
    // Gom tất cả câu hỏi lại
    const allQuestionsPool = [...RECOGNITION_QUESTIONS, ...LEVEL_1_QUESTIONS, ...LEVEL_2_QUESTIONS];

    // Lọc theo độ tuổi
    const ageFiltered = allQuestionsPool.filter(q => q.tags.ageGroup === ageGroup);

    if (ageFiltered.length === 0) return [];

    const easyPool = shuffleArray(ageFiltered.filter(q => q.tags.difficulty === "EASY"));
    const mediumPool = shuffleArray(ageFiltered.filter(q => q.tags.difficulty === "MEDIUM"));
    const hardPool = shuffleArray(ageFiltered.filter(q => q.tags.difficulty === "HARD"));

    const ratio = DIFFICULTY_RATIOS[level] || DIFFICULTY_RATIOS[10];
    const result: Question[] = [];

    const pickFromPool = (pool: Question[], needed: number) => {
        for (let i = 0; i < needed; i++) {
            if (pool.length > 0) {
                // Nếu hết pool thì lấy lại từ đầu (để tránh bị thiếu)
                result.push(pool[i % pool.length]);
            }
        }
    };

    // Lấy theo ratio, nếu thiếu type này thì fallback sang type kia
    pickFromPool(easyPool, ratio.EASY);
    pickFromPool(mediumPool, ratio.MEDIUM);
    pickFromPool(hardPool, ratio.HARD);

    // Nếu vẫn chưa đủ count (do pool bị trống hoàn toàn 1 loại), lấy đại từ pool chính
    if (result.length < count) {
        const remaining = count - result.length;
        const shuffledAgePool = shuffleArray(ageFiltered);
        for (let i = 0; i < remaining; i++) {
            result.push(shuffledAgePool[i % shuffledAgePool.length]);
        }
    }

    return shuffleArray(result).slice(0, count);
};
