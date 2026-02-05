"use client";

import { useGame } from "@/hooks/useGame";
import { HeartLife } from "@/components/game/HeartLife";
import { ProgressBar } from "@/components/game/ProgressBar";
import { GameButton } from "@/components/ui/GameButton";
import { Trophy, Frown, Sparkles } from "lucide-react";

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

  // --- MÀN HÌNH CHỜ (START) ---
  if (status === "START") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-400 to-purple-500">
        <div className="text-center space-y-8">
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl transform rotate-2">
            <h1 className="text-6xl font-black text-blue-600 mb-4 tracking-tight">MathJoy!</h1>
            <p className="text-2xl text-gray-600 font-bold">Chuyến phiêu lưu toán học kỳ thú</p>
          </div>

          <div className="flex justify-center">
            <GameButton size="lg" variant="success" onClick={startGame} className="scale-125">
              Bắt đầu chơi ngay!
            </GameButton>
          </div>
        </div>
      </main>
    );
  }

  // --- MÀN HÌNH CHIẾN THẮNG (VICTORY) ---
  if (status === "VICTORY") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-yellow-400">
        <div className="text-center space-y-8 bg-white p-16 rounded-[4rem] shadow-2xl">
          <Trophy size={120} className="text-yellow-500 mx-auto" />
          <h2 className="text-5xl font-black text-green-600">Tuyệt vời! Bé đã thắng!</h2>
          <p className="text-2xl font-bold text-gray-600">Bé đã hoàn thành xuất sắc thử thách.</p>
          <GameButton onClick={resetGame} variant="primary">Chơi màn tiếp theo</GameButton>
        </div>
      </main>
    );
  }

  // --- MÀN HÌNH GAME OVER ---
  if (status === "GAME_OVER") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-red-400">
        <div className="text-center space-y-8 bg-white p-16 rounded-[4rem] shadow-2xl">
          <Frown size={120} className="text-red-500 mx-auto" />
          <h2 className="text-5xl font-black text-red-600">Cố gắng lên bé ơi!</h2>
          <p className="text-2xl font-bold text-gray-600">Đừng buồn nhé, mình cùng thử lại nào!</p>
          <GameButton onClick={resetGame} variant="danger">Thử lại màn này</GameButton>
        </div>
      </main>
    );
  }

  // --- MÀN HÌNH ĐANG CHƠI (PLAYING) ---
  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-pink-50">
      {/* Header: Lives & Progress */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-12">
        <HeartLife lives={lives} />
        <div className="w-48">
          <ProgressBar current={currentQuestionIndex} total={10} />
          <p className="text-center text-sm font-bold text-blue-500 mt-2">
            Câu {currentQuestionIndex + 1}/10
          </p>
        </div>
      </div>

      {/* Question Area */}
      {currentQuestion && (
        <div className="w-full max-w-2xl text-center space-y-12">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border-b-8 border-gray-200">
            <span className="inline-block px-6 py-2 bg-yellow-100 text-yellow-700 rounded-full font-bold mb-6">
              Level {currentLevel}
            </span>
            <h3 className="text-7xl font-black text-gray-800 mb-8">{currentQuestion.content}</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {currentQuestion.options?.map((option, idx) => (
              <GameButton
                key={idx}
                variant={idx % 2 === 0 ? "primary" : "secondary"}
                onClick={() => answerQuestion(option)}
                className="text-4xl"
              >
                {option}
              </GameButton>
            ))}
          </div>
        </div>
      )}

      {/* Decorative Mascot (Placeholder) */}
      <div className="fixed bottom-8 right-8 animate-bounce">
        <div className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
          <Sparkles className="text-white" size={48} />
        </div>
      </div>
    </main>
  );
}
