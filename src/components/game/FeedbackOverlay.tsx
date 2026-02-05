"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackProps {
    type: "correct" | "wrong" | null;
    onComplete: () => void;
}

export const FeedbackOverlay: React.FC<FeedbackProps> = ({ type, onComplete }) => {
    if (!type) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
            {type === "correct" ? (
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -50, 0] }}
                    transition={{ duration: 0.5, repeat: 1 }}
                    className="text-7xl md:text-9xl"
                >
                    🌟
                </motion.div>
            ) : (
                <motion.div
                    animate={{ x: [-10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="text-7xl md:text-9xl"
                >
                    ❌
                </motion.div>
            )}
        </motion.div>
    );
};
