"use client";
import React from "react";
import { motion } from "framer-motion";
export default function GradientTracing() {
    const width = 317;
    const height = 80;
    const path = "M316 0V10C316 12.2091 314.209 14 312 14H5C2.79086 14 1 15.7909 1 18V80";

    return (
        <div className="fixed min-h-screen w-full -z-30 inset-0">
            <div>
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
                    <path d={path} stroke="black" strokeOpacity="0.2" />
                    <path d={path} stroke="url(#pulse)" strokeLinecap="round" strokeWidth="2" />
                    <defs>
                        <motion.linearGradient
                            animate={{
                                x1: [0, width * 2],
                                x2: [0, width],
                                y1: [height, height / 2],
                                y2: [height * 2, height],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            id="pulse"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            x2="0"
                            y1={height}
                            y2={height * 2}
                        >
                            <stop stopColor="#40f5c8" stopOpacity="0" />
                            <stop stopColor="#40f5c8" />
                            <stop offset="1" stopColor="#40f5c8" stopOpacity="0" />
                        </motion.linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="absolute   bottom-0 -left-[60%] -scale-x-150">
                <svg width={1200} height={height} viewBox={`0 0 ${1000} ${height}`} fill="none">
                    <path d={path} stroke="black" strokeOpacity="0.2" />
                    <path d={path} stroke="url(#pulse)" strokeLinecap="round" strokeWidth="2" />
                    <defs>
                        <motion.linearGradient
                            animate={{
                                x1: [0, width * 2],
                                x2: [0, width],
                                y1: [height, height / 2],
                                y2: [height * 2, height],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            id="pulse"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            x2="0"
                            y1={height}
                            y2={height * 2}
                        >
                            <stop stopColor="#40f5c8" stopOpacity="0" />
                            <stop stopColor="#40f5c8" />
                            <stop offset="1" stopColor="#40f5c8" stopOpacity="0" />
                        </motion.linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="absolute top-36 -right-10  rotate-45">
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
                    <path d={path} stroke="black" strokeOpacity="0.2" />
                    <path d={path} stroke="url(#pulse)" strokeLinecap="round" strokeWidth="2" />
                    <defs>
                        <motion.linearGradient
                            animate={{
                                x1: [0, width * 2],
                                x2: [0, width],
                                y1: [height, height / 2],
                                y2: [height * 2, height],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            id="pulse"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            x2="0"
                            y1={height}
                            y2={height * 2}
                        >
                            <stop stopColor="#40f5c8" strokeOpacity="0" />
                            <stop stopColor="#40f5c8" />
                            <stop offset="1" stopColor="#40f5c8" stopOpacity="0" />
                        </motion.linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
