"use client";

import { useGame } from "@/hooks/useGame";
import { HeartLife } from "@/components/game/HeartLife";
import { ProgressBar } from "@/components/game/ProgressBar";
import { GameButton } from "@/components/ui/GameButton";
import { Trophy, Frown, Sparkles, Star, Lock, Play, Zap } from "lucide-react";
import { FeedbackOverlay } from "@/components/game/FeedbackOverlay";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAudio } from "@/hooks/useAudio";

export default function Home() {
  const {
    status,
    currentLevel,
    maxUnlockedLevel,
    score,
    lives,
    currentQuestionIndex,
    questions,
    currentQuestion,
    selectLevel,
    startGame,
    answerQuestion,
    resetGame,
    goToMenu,
  } = useGame();

  const { playSound } = useAudio();
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (status === "VICTORY") playSound("victory");
  }, [status, playSound]);

  const handleAnswer = (option: string) => {
    if (feedback) return;

    const isCorrect = currentQuestion?.correctAnswer === option;
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      playSound("correct");
    } else {
      playSound("wrong");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    setTimeout(() => {
      answerQuestion(option);
      setFeedback(null);
    }, 800);
  };

  // --- MÀN HÌNH CHỌN LEVEL (START) ---
  if (status === "START") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] px-8 py-4 md:px-12 md:py-6 shadow-2xl mb-6 md:mb-8 inline-block">
            <h1 className="text-4xl md:text-6xl font-black text-blue-600 tracking-tighter">MathJoy!</h1>
          </div>
          <h2 className="text-xl md:text-3xl font-black text-white drop-shadow-lg uppercase tracking-widest px-4">
            Chọn màn chơi của bé
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl w-full px-4">
          {[1, 2, 3, 4, 5, 6].map((lvl) => {
            const isUnlocked = lvl <= maxUnlockedLevel;
            return (
              <motion.div
                key={lvl}
                whileHover={isUnlocked ? { scale: 1.05, rotate: 2 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                className="relative"
              >
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      selectLevel(lvl);
                      startGame();
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`w-full aspect-square rounded-[2rem] md:rounded-[3rem] text-3xl md:text-5xl font-black flex flex-col items-center justify-center gap-2 md:gap-4 transition-all border-b-[8px] md:border-b-[12px] 
                    ${isUnlocked
                      ? "bg-white text-blue-500 border-blue-100 shadow-xl hover:shadow-2xl cursor-pointer"
                      : "bg-gray-200/50 text-gray-400 border-gray-300 cursor-not-allowed"}`}
                >
                  <span className="text-sm md:text-xl uppercase font-bold text-gray-400">Màn</span>
                  {lvl}
                  {!isUnlocked && <Lock size={24} className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400" />}
                  {isUnlocked && lvl === maxUnlockedLevel && (
                    <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-yellow-400 p-2 md:p-3 rounded-full shadow-lg animate-pulse">
                      <Star fill="white" className="text-white w-4 h-4 md:w-6 md:h-6" />
                    </div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </main>
    );
  }

  // --- MÀN HÌNH CHIẾN THẮNG (VICTORY) ---
  if (status === "VICTORY") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-yellow-400 overflow-hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-6 md:space-y-8 bg-white p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-2xl relative max-w-2xl w-full"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Trophy className="text-yellow-500 mx-auto w-24 h-24 md:w-[160px] md:h-[160px]" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-green-600 leading-tight">Tuyệt vời! <br />Bé là Thiên Tài!</h2>
          <div className="flex flex-col gap-4">
            <GameButton onClick={goToMenu} variant="primary" size="lg" className="w-full text-2xl md:text-3xl">
              Tiếp tục hành trình
            </GameButton>
            <button onClick={resetGame} className="text-gray-400 font-bold hover:text-gray-600 transition-colors">
              Chơi lại màn này
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  // --- MÀN HÌNH GAME OVER ---
  if (status === "GAME_OVER") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-red-400">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-center space-y-6 md:space-y-8 bg-white p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-2xl max-w-2xl w-full"
        >
          <Frown className="text-red-500 mx-auto w-24 h-24 md:w-[160px] md:h-[160px]" />
          <h2 className="text-4xl md:text-6xl font-black text-red-600 leading-tight">Đừng bỏ cuộc bé nhé!</h2>
          <p className="text-lg md:text-2xl font-bold text-gray-500">Thử lại một chút là thắng ngay thôi!</p>
          <div className="flex flex-col gap-4">
            <GameButton onClick={resetGame} variant="danger" size="lg" className="w-full text-2xl md:text-3xl">
              Thử lại ngay
            </GameButton>
            <button onClick={goToMenu} className="text-gray-400 font-bold hover:text-gray-600 transition-colors">
              Quay về bản đồ
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  // --- MÀN HÌNH ĐANG CHƠI (PLAYING) ---
  return (
    <motion.main
      animate={isShaking ? { x: [-10, 10, -10, 10, 0], backgroundColor: "#fee2e2" } : { x: 0, backgroundColor: "#fdf2f8" }}
      className="min-h-screen flex flex-col items-center p-8 relative overflow-hidden transition-colors duration-300"
    >
      <FeedbackOverlay type={feedback} onComplete={() => { }} />

      {/* Header: Lives & Progress */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16 gap-6 z-10"
      >
        <div className="flex flex-row md:flex-col items-center md:items-start justify-between w-full md:w-auto gap-2">
          <button
            onClick={goToMenu}
            className="text-gray-400 font-black flex items-center gap-2 hover:text-blue-500 transition-colors uppercase tracking-wider text-sm"
          >
            ← Thoát
          </button>
          <HeartLife lives={lives} />
        </div>

        <div className="w-full md:w-64 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-lg border-2 border-white">
          <ProgressBar current={currentQuestionIndex} total={10} />
          <p className="text-center text-sm md:text-lg font-black text-blue-500 mt-2 uppercase tracking-wider">
            Câu {currentQuestionIndex + 1} / 10
          </p>
        </div>
      </motion.div>

      {/* Question Area */}
      <div className="w-full max-w-3xl z-10">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={`${currentQuestion.id}-${currentQuestionIndex}`}
              initial={{ x: 300, opacity: 0, rotate: 5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -300, opacity: 0, rotate: -5 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="text-center space-y-12"
            >
              <div className="bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border-b-[8px] md:border-b-[12px] border-gray-100 relative">
                <span className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 px-6 md:px-10 py-2 md:py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-black shadow-lg text-lg md:text-xl uppercase italic whitespace-nowrap">
                  Màn {currentLevel}
                </span>
                <h3 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-gray-800 leading-none tracking-tighter">
                  {currentQuestion.content}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
                {currentQuestion.options?.map((option, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GameButton
                      variant={idx % 2 === 0 ? "primary" : "secondary"}
                      onClick={() => handleAnswer(option)}
                      className="text-3xl md:text-6xl w-full py-6 md:py-10 rounded-[1.5rem] md:rounded-[2.5rem]"
                    >
                      {option}
                    </GameButton>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mascot Placeholder */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="fixed bottom-12 right-12 z-20 hidden md:block"
      >
        <div className="w-32 h-32 bg-yellow-300 rounded-[2rem] flex items-center justify-center border-8 border-white shadow-2xl rotate-12 relative">
          <Sparkles className="text-white" size={64} />
        </div>
      </motion.div>
    </motion.main>
  );
}
