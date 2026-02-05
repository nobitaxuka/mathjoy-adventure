"use client";

import { useState, useCallback, useEffect } from "react";
import { GameState, GameStatus, Question, AgeGroup } from "@/types/game";
import { getRandomQuestions } from "@/lib/engine";

const INITIAL_LIVES = 3;
const QUESTIONS_PER_LEVEL = 10;
const STORAGE_KEY = "mathjoy_max_level";

export const useGame = () => {
    const [maxUnlockedLevel, setMaxUnlockedLevel] = useState<number>(1);
    const [state, setState] = useState<GameState>({
        status: "START",
        currentLevel: 1,
        score: 0,
        lives: INITIAL_LIVES,
        currentQuestionIndex: 0,
        questions: [],
        selectedAgeGroup: null,
    });

    // Load progress from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setMaxUnlockedLevel(parseInt(saved, 10));
        }
    }, []);

    const selectAgeGroup = useCallback((age: AgeGroup) => {
        setState(prev => ({ ...prev, selectedAgeGroup: age }));
    }, []);

    const selectLevel = useCallback((level: number) => {
        setState(prev => ({ ...prev, currentLevel: level }));
    }, []);

    const startGame = useCallback(() => {
        if (!state.selectedAgeGroup) return;

        const questions = getRandomQuestions(state.selectedAgeGroup, state.currentLevel, QUESTIONS_PER_LEVEL);
        setState((prev) => ({
            ...prev,
            status: "PLAYING",
            score: 0,
            lives: INITIAL_LIVES,
            currentQuestionIndex: 0,
            questions,
        }));
    }, [state.selectedAgeGroup, state.currentLevel]);

    const answerQuestion = useCallback((answer: string) => {
        setState((prev) => {
            if (prev.status !== "PLAYING") return prev;

            const currentQuestion = prev.questions[prev.currentQuestionIndex];
            const isCorrect = currentQuestion.correctAnswer === answer;

            const newLives = isCorrect ? prev.lives : prev.lives - 1;
            const newScore = isCorrect ? prev.score + 1 : prev.score;
            const nextIndex = prev.currentQuestionIndex + 1;

            if (newLives <= 0) {
                return { ...prev, lives: 0, status: "GAME_OVER" };
            }

            if (nextIndex >= prev.questions.length) {
                // Victory!
                const nextLevel = prev.currentLevel + 1;
                if (nextLevel > maxUnlockedLevel) {
                    setMaxUnlockedLevel(nextLevel);
                    localStorage.setItem(STORAGE_KEY, nextLevel.toString());
                }
                return { ...prev, score: newScore, status: "VICTORY" };
            }

            return {
                ...prev,
                score: newScore,
                lives: newLives,
                currentQuestionIndex: nextIndex,
            };
        });
    }, [maxUnlockedLevel]);

    const resetGame = useCallback(() => {
        startGame();
    }, [startGame]);

    const goToMenu = useCallback(() => {
        setState(prev => ({ ...prev, status: "START" }));
    }, []);

    return {
        ...state,
        maxUnlockedLevel,
        currentQuestion: state.questions[state.currentQuestionIndex],
        selectAgeGroup,
        selectLevel,
        startGame,
        answerQuestion,
        resetGame,
        goToMenu,
    };
};
