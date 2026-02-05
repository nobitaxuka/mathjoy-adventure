"use client";

import { useState, useCallback } from "react";
import { GameState, GameStatus, Question } from "@/types/game";
import { getRandomQuestions } from "@/lib/engine";

const INITIAL_LIVES = 3;
const QUESTIONS_PER_LEVEL = 10;

export const useGame = (level: number = 1) => {
    const [state, setState] = useState<GameState>({
        status: "START",
        currentLevel: level,
        score: 0,
        lives: INITIAL_LIVES,
        currentQuestionIndex: 0,
        questions: [],
    });

    const startGame = useCallback(() => {
        const questions = getRandomQuestions(state.currentLevel, QUESTIONS_PER_LEVEL);
        setState((prev) => ({
            ...prev,
            status: "PLAYING",
            score: 0,
            lives: INITIAL_LIVES,
            currentQuestionIndex: 0,
            questions,
        }));
    }, [state.currentLevel]);

    const answerQuestion = useCallback((answer: string) => {
        setState((prev) => {
            if (prev.status !== "PLAYING") return prev;

            const currentQuestion = prev.questions[prev.currentQuestionIndex];
            const isCorrect = currentQuestion.correctAnswer === answer;

            const newLives = isCorrect ? prev.lives : prev.lives - 1;
            const newScore = isCorrect ? prev.score + 1 : prev.score;
            const nextIndex = prev.currentQuestionIndex + 1;

            // Check for Game Over (failed more than 3 times - actually if lives reach 0)
            if (newLives <= 0) {
                return { ...prev, lives: 0, status: "GAME_OVER" };
            }

            // Check for Victory (finished all questions)
            if (nextIndex >= prev.questions.length) {
                // Condition for victory: answer all questions and have lives remaining
                // Actually the brief says "Sai quá 3 câu sẽ phải chơi lại", so if you finish all questions with lives > 0, you win.
                return { ...prev, score: newScore, status: "VICTORY" };
            }

            return {
                ...prev,
                score: newScore,
                lives: newLives,
                currentQuestionIndex: nextIndex,
            };
        });
    }, []);

    const resetGame = useCallback(() => {
        startGame();
    }, [startGame]);

    return {
        ...state,
        currentQuestion: state.questions[state.currentQuestionIndex],
        startGame,
        answerQuestion,
        resetGame,
    };
};
