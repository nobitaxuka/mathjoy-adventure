"use client";

import { useGame } from "@/hooks/useGame";
import { HeartLife } from "@/components/game/HeartLife";
import { ProgressBar } from "@/components/game/ProgressBar";
import { GameButton } from "@/components/ui/GameButton";
import { Trophy, Frown, Sparkles, Star } from "lucide-react";
import { FeedbackOverlay } from "@/components/game/FeedbackOverlay";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const {
    status,
    currentLevel,
    score,
    lives,
    currentQuestionIndex,
    questions,
    currentQuestion,
    startGame,
    answerQuestion,
    resetGame,
  } = useGame(1);

  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const handleAnswer = (option: string) => {
    if (feedback) return; // Prevent double clicking

    const isCorrect = currentQuestion?.correctAnswer === option;
    setFeedback(isCorrect ? "correct" : "wrong");

    // Delay the actual logic to let animation play
    setTimeout(() => {
      answerQuestion(option);
      setFeedback(null);
    }, 800);
  };

  // --- MÀN HÌNH CHỜ (START) ---
  if (status === "START") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center space-y-12"
        >
          <div className="bg-white rounded-[4rem] p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform rotate-2 border-b-[12px] border-gray-200 relative overflow-hidden">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -left-10 text-yellow-300 opacity-20"
            >
              <Star size={120} fill="currentColor" />
            </motion.div>
            <h1 className="text-8xl font-black text-blue-600 mb-6 tracking-tighter drop-shadow-sm">
              MathJoy!
            </h1>
            <p className="text-3xl text-gray-500 font-bold uppercase tracking-widest">
              Học mà chơi - Cực kỳ vui!
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex justify-center"
          >
            <GameButton size="lg" variant="success" onClick={startGame} className="scale-125 rounded-[2.5rem] px-16">
              Bắt đầu thôi! 🚀
            </GameButton>
          </motion.div>
        </motion.div>
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
          className="text-center space-y-8 bg-white p-20 rounded-[5rem] shadow-2xl relative"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Trophy size={160} className="text-yellow-500 mx-auto" />
          </motion.div>
          <h2 className="text-6xl font-black text-green-600">Bé là Thiên Tài! 🏆</h2>
          <p className="text-2xl font-bold text-gray-500">Bé đã vượt qua tất cả câu thách thức!</p>
          <GameButton onClick={resetGame} variant="primary" size="lg">Tiếp tục hành trình</GameButton>
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
          className="text-center space-y-8 bg-white p-20 rounded-[5rem] shadow-2xl"
        >
          <Frown size={160} className="text-red-500 mx-auto" />
          <h2 className="text-6xl font-black text-red-600">Đừng bỏ cuộc bé nhé!</h2>
          <p className="text-2xl font-bold text-gray-500">Cùng ôn bài lại một chút để thắng nhé!</p>
          <GameButton onClick={resetGame} variant="danger" size="lg">Thử lại ngay</GameButton>
        </motion.div>
      </main>
    );
  }

  // --- MÀN HÌNH ĐANG CHƠI (PLAYING) ---
  return (
    <main className="min-h-screen flex flex-col items-center p-8 bg-[#fdf2f8] relative overflow-hidden">
      <FeedbackOverlay type={feedback} onComplete={() => { }} />

      {/* Header: Lives & Progress */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl flex items-center justify-between mb-16 z-10"
      >
        <HeartLife lives={lives} />
        <div className="w-64 bg-white p-4 rounded-3xl shadow-lg border-2 border-white">
          <ProgressBar current={currentQuestionIndex} total={10} />
          <p className="text-center text-lg font-black text-blue-500 mt-2 uppercase tracking-wider">
            Câu {currentQuestionIndex + 1} / 10
          </p>
        </div>
      </motion.div>

      {/* Question Area - AnimatePresence for smooth transitions */}
      <div className="w-full max-w-3xl z-10">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ x: 300, opacity: 0, rotate: 5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -300, opacity: 0, rotate: -5 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="text-center space-y-12"
            >
              <div className="bg-white p-16 rounded-[4rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border-b-[12px] border-gray-100 relative group">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-10 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-black shadow-lg text-xl uppercase italic">
                  Level {currentLevel}
                </span>
                <h3 className="text-[10rem] font-black text-gray-800 leading-none tracking-tighter">
                  {currentQuestion.content}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-8 px-4">
                {currentQuestion.options?.map((option, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GameButton
                      variant={idx % 2 === 0 ? "primary" : "secondary"}
                      onClick={() => handleAnswer(option)}
                      className="text-6xl w-full py-10 rounded-[2.5rem]"
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

      {/* Decorative Background Elements */}
      <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl -z-10" />
      <div className="fixed -top-20 -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl -z-10" />

      {/* Mascot Placeholder with stronger animation */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="fixed bottom-12 right-12 z-20"
      >
        <div className="w-32 h-32 bg-yellow-300 rounded-[2rem] flex items-center justify-center border-8 border-white shadow-2xl rotate-12 relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full border-4 border-white" />
          <Sparkles className="text-white" size={64} />
        </div>
      </motion.div>
    </main>
  );
}
