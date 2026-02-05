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
import { useSpeech } from "@/hooks/useSpeech";

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
    selectedAgeGroup,
    selectAgeGroup,
    selectLevel,
    startGame,
    answerQuestion,
    resetGame,
    goToMenu,
  } = useGame();

  const { speak } = useSpeech();
  const { playSound } = useAudio();
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (status === "VICTORY") playSound("victory");
  }, [status, playSound]);

  // Tự động đọc câu hỏi khi ở dạng NHẬN BIẾT SỐ
  useEffect(() => {
    if (status === "PLAYING" && currentQuestion && currentQuestion.category === "NUMBER_RECOGNITION") {
      // Đọc "Số [X]" với một chút delay nhỏ để đảm bảo stable
      const timer = setTimeout(() => {
        speak(`Số ${currentQuestion.content}`);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, status, speak]);

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

  // --- MÀN HÌNH CHỌN ĐỘ TUỔI / MÀN CHƠI (START) ---
  if (status === "START") {
    // 1. Nếu chưa chọn độ tuổi -> Hiện màn hình chọn độ tuổi
    if (!selectedAgeGroup) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4">Chào bé yêu!</h1>
            <p className="text-xl md:text-2xl font-bold text-blue-100">Hôm nay bé muốn học toán ở lứa tuổi nào?</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectAgeGroup("3-4")}
              className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border-b-[12px] border-yellow-400 text-center group"
            >
              <div className="text-6xl md:text-8xl mb-4 group-hover:rotate-12 transition-transform">🍼</div>
              <h3 className="text-3xl md:text-5xl font-black text-blue-600">3 - 4 Tuổi</h3>
              <p className="text-gray-500 font-bold mt-2">Bé tập nhận biết số đếm</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectAgeGroup("5-6")}
              className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border-b-[12px] border-blue-400 text-center group"
            >
              <div className="text-6xl md:text-8xl mb-4 group-hover:-rotate-12 transition-transform">🎒</div>
              <h3 className="text-3xl md:text-5xl font-black text-blue-600">5 - 6 Tuổi</h3>
              <p className="text-gray-500 font-bold mt-2">Bé tập cộng trừ cơ bản</p>
            </motion.button>
          </div>
        </main>
      );
    }

    // 2. Nếu đã chọn độ tuổi -> Hiện màn hình chọn màn (1-10)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <button
            onClick={() => selectAgeGroup(null as any)} // Quay lại chọn độ tuổi
            className="mb-4 text-white font-bold flex items-center gap-2 hover:underline"
          >
            ← Chọn lại lứa tuổi
          </button>
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] px-8 py-4 md:px-12 md:py-6 shadow-2xl mb-4 md:mb-6 inline-block">
            <h1 className="text-3xl md:text-5xl font-black text-blue-600">Lứa tuổi {selectedAgeGroup}</h1>
          </div>
          <h2 className="text-lg md:text-2xl font-black text-white drop-shadow-lg uppercase tracking-widest">
            Chọn màn chơi cho bé
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl w-full px-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => {
            // Tạm thời cho phép chơi tất cả màn để test, sau này có thể dùng maxUnlockedLevel
            const isUnlocked = true;
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
                  className={`w-full aspect-square rounded-[2rem] text-2xl md:text-4xl font-black flex flex-col items-center justify-center gap-1 transition-all border-b-[6px] md:border-b-[10px] 
                    bg-white text-blue-500 border-blue-100 shadow-xl hover:shadow-2xl cursor-pointer`}
                >
                  <span className="text-[10px] md:text-xs uppercase font-bold text-gray-400">Màn</span>
                  {lvl}
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
          className="text-center space-y-4 md:space-y-8 bg-white p-6 md:p-12 lg:p-20 rounded-[3rem] md:rounded-[5rem] shadow-2xl relative max-w-2xl w-full"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Trophy className="text-yellow-500 mx-auto w-24 h-24 md:w-[160px] md:h-[160px]" />
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-black text-green-600 leading-tight">Tuyệt vời! <br />Bé là Thiên Tài!</h2>
          <div className="flex flex-col gap-4">
            <GameButton onClick={goToMenu} variant="primary" size="lg" className="w-full text-xl md:text-3xl">
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
          className="text-center space-y-4 md:space-y-8 bg-white p-6 md:p-12 lg:p-20 rounded-[3rem] md:rounded-[5rem] shadow-2xl max-w-2xl w-full"
        >
          <Frown className="text-red-500 mx-auto w-24 h-24 md:w-[160px] md:h-[160px]" />
          <h2 className="text-3xl md:text-6xl font-black text-red-600 leading-tight">Đừng bỏ cuộc bé nhé!</h2>
          <p className="text-lg md:text-2xl font-bold text-gray-500">Thử lại một chút là thắng ngay thôi!</p>
          <div className="flex flex-col gap-4">
            <GameButton onClick={resetGame} variant="danger" size="lg" className="w-full text-xl md:text-3xl">
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
      className="min-h-screen flex flex-col items-center p-4 md:p-8 relative overflow-hidden transition-colors duration-300"
    >
      <FeedbackOverlay type={feedback} onComplete={() => { }} />

      {/* Header: Lives & Progress */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-4 md:gap-6 z-10"
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

        <div className="w-full md:w-64 bg-white p-2 md:p-4 rounded-xl md:rounded-3xl shadow-lg border-2 border-white">
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
              className="text-center space-y-6 md:space-y-12"
            >
              <div className="bg-white pt-16 pb-8 px-6 md:p-16 rounded-[2rem] md:rounded-[4rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border-b-[6px] md:border-b-[12px] border-gray-100 relative mb-6">
                <span className="absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 px-6 md:px-10 py-2 md:py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-black shadow-lg text-lg md:text-xl uppercase italic whitespace-nowrap">
                  {currentQuestion.category === "NUMBER_RECOGNITION" ? "Bé Tập Đếm" : `Màn ${currentLevel}`}
                </span>
                <h3 className={`${currentQuestion.category === "NUMBER_RECOGNITION" ? "text-6xl sm:text-8xl md:text-[12rem]" : "text-4xl sm:text-6xl md:text-[8rem]"} font-black text-gray-800 leading-none tracking-tighter`}>
                  {currentQuestion.content}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-8 px-1 md:px-4">
                {currentQuestion.options?.map((option, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GameButton
                      variant={idx % 2 === 0 ? "primary" : "secondary"}
                      onClick={() => handleAnswer(option)}
                      className={`${currentQuestion.category === "NUMBER_RECOGNITION" ? "text-4xl md:text-7xl py-6 md:py-14" : "text-2xl md:text-5xl py-4 md:py-10"} w-full rounded-[1.25rem] md:rounded-[2.5rem]`}
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

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-20"
      >
        <div className="w-16 h-16 md:w-32 md:h-32 bg-yellow-300 rounded-2xl md:rounded-[2rem] flex items-center justify-center border-4 md:border-8 border-white shadow-2xl rotate-12 relative">
          <Sparkles className="text-white w-8 h-8 md:w-16 md:h-16" />
        </div>
      </motion.div>
    </motion.main>
  );
}
