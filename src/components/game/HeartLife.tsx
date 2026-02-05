import React from "react";
import { Heart } from "lucide-react";

interface HeartLifeProps {
    lives: number;
    maxLives?: number;
}

export const HeartLife: React.FC<HeartLifeProps> = ({ lives, maxLives = 3 }) => {
    return (
        <div className="flex gap-2">
            {Array.from({ length: maxLives }).map((_, i) => (
                <Heart
                    key={i}
                    size={32}
                    className={`${i < lives ? "text-red-500 fill-red-500" : "text-gray-300 fill-gray-100"
                        } transition-all duration-300 transform ${i < lives ? "scale-110" : "scale-90"}`}
                />
            ))}
        </div>
    );
};
