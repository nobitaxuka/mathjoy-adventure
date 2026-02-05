import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "success" | "danger";
    size?: "sm" | "md" | "lg";
}

export const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-blue-500 hover:bg-blue-600 text-white border-blue-700 shadow-[0_6px_0_0_#1d4ed8]",
            secondary: "bg-purple-500 hover:bg-purple-600 text-white border-purple-700 shadow-[0_6px_0_0_#7e22ce]",
            success: "bg-green-500 hover:bg-green-600 text-white border-green-700 shadow-[0_6px_0_0_#15803d]",
            danger: "bg-red-500 hover:bg-red-600 text-white border-red-700 shadow-[0_6px_0_0_#b91c1c]",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-8 py-4 text-xl font-bold rounded-2xl",
            lg: "px-12 py-6 text-3xl font-black rounded-3xl",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center transition-all active:translate-y-1 active:shadow-none border-b-0",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

GameButton.displayName = "GameButton";
