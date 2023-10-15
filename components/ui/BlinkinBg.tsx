"use client";
import React, { useEffect, useRef } from "react";

export default function BlinkinBg() {
    const rows = 10;
    const columns = 18;
    const transitionDuration = 250;
    const letters = [
        0, 1, 10, 19, 28, 37, 46, 55, 64, 73, 82, 2, 11, 20, 29, 38, 47, 56, 65, 74, 83, 4, 13, 22, 31, 40, 49, 58, 67, 76, 85, 6, 15, 24, 33, 42, 51, 60, 69,
        78, 87, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 8, 17, 26, 35, 44, 53, 62, 71, 80, 89, 12, 21, 30, 39, 48, 57, 66, 75, 84, 93, 100, 120, 130, 125, 103,
        110, 128, 105, 150, 165, 154, 164, 170, 175, 145, 148, 142,
    ];
    const indices = [...letters];

    const states = ["off", "medium", "high"];
    const lightRef = useRef<HTMLDivElement | null>(null);

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    useEffect(() => {
        if (!lightRef.current) {
            return;
        }
        let timeoutIds: NodeJS.Timeout[] = [];

        const interval = setInterval(() => {
            indices.forEach(index => {
                const light = lightRef.current?.querySelector(`[data-index="${index}"]`);

                if (!light) {
                    return;
                }

                // Pick a random next state
                const nextState = states[Math.floor(Math.random() * states.length)];
                const currentState = light.getAttribute("data-state");

                const pulse =
                    Math.random() > 0.2 &&
                    // Make sure we only pulsate going from "off" → "medium" → "high"
                    ((currentState === "off" && nextState === "high") ||
                        (currentState === "off" && nextState === "medium") ||
                        (currentState === "medium" && nextState === "high"));

                if (pulse) {
                    const delay = getRandomNumber(100, 500);
                    timeoutIds.push(
                        setTimeout(() => {
                            if (light instanceof HTMLDivElement && light.style) {
                                light.style.transform = "scale(2)";
                            }
                        }, delay)
                    );

                    timeoutIds.push(
                        setTimeout(() => {
                            if (light instanceof HTMLDivElement && light.style) {
                                light.style.transform = "scale(1)";
                            }
                        }, transitionDuration + delay)
                    );
                }

                // After a pulse, don't transition from "high" → "medium"
                if (currentState === "high" && nextState === "medium" && pulse) {
                    light.setAttribute("data-state", "off");
                } else {
                    light.setAttribute("data-state", nextState);
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            timeoutIds.forEach(clearTimeout);
        };
    }, []);

    return (
        <div
            ref={lightRef}
            className="switchboard inset-0 absolute -z-40 max-h-screen"
            style={{
                display: "grid",
                gap: `${columns}px`,
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
        >
            {Array.from({ length: columns * rows }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className="light"
                        data-state="off"
                        data-index={i}
                        style={{
                            transitionDuration: `${transitionDuration}ms`,
                        }}
                    />
                );
            })}
        </div>
    );
}
