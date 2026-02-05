import React from "react";

interface ProgressBarProps {
    current: number;
    total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="w-full bg-blue-100 rounded-full h-6 border-4 border-blue-200 shadow-inner overflow-hidden">
            <div
                className="bg-yellow-400 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};
