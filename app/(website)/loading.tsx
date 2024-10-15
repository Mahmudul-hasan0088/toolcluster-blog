"use client";
// app/loading.tsx
import React from "react";

export default function Loading() {
    return (
        <>
            <style jsx global>{`
                @keyframes square-animation {
                    0%,
                    10.5% {
                        left: 0;
                        top: 0;
                    }
                    12.5%,
                    23% {
                        left: 32px;
                        top: 0;
                    }
                    25%,
                    35.5% {
                        left: 64px;
                        top: 0;
                    }
                    37.5%,
                    48% {
                        left: 64px;
                        top: 32px;
                    }
                    50%,
                    60.5% {
                        left: 32px;
                        top: 32px;
                    }
                    62.5%,
                    73% {
                        left: 32px;
                        top: 64px;
                    }
                    75%,
                    85.5% {
                        left: 0;
                        top: 64px;
                    }
                    87.5%,
                    98% {
                        left: 0;
                        top: 32px;
                    }
                    100% {
                        left: 0;
                        top: 0;
                    }
                }
                .animate-square-animation {
                    animation: square-animation 10s ease-in-out infinite both;
                }
            `}</style>
            <div className="flex items-center justify-center h-screen bg-gray-100 fixed top-0 z-[9999] w-full">
                <div className="relative w-24 h-24 transform rotate-45">
                    <div className="absolute top-0 left-0 w-7 h-7 m-0.5 rounded-none bg-blue-500 animate-square-animation"></div>
                    <div
                        className="absolute top-0 left-0 w-7 h-7 m-0.5 rounded-none bg-blue-500 animate-square-animation"
                        style={{ animationDelay: "-1.4285714286s" }}
                    ></div>
                    <div
                        className="absolute top-0 left-0 w-7 h-7 m-0.5 rounded-none bg-blue-500 animate-square-animation"
                        style={{ animationDelay: "-2.8571428571s" }}
                    ></div>
                    <div
                        className="absolute top-0 left-0 w-7 h-7 m-0.5 rounded-none bg-blue-500 animate-square-animation"
                        style={{ animationDelay: "-4.2857142857s" }}
                    ></div>
                    <div
                        className="absolute top-0 left-0 w-7 h-7 m-0.5 rounded-none bg-blue-500 animate-square-animation"
                        style={{ animationDelay: "-5.7142857143s" }}
                    ></div>
                    <div
                        className="absolute top-0 left-0 w-7 h-7 m-0.5 rounded-none bg-blue-500 animate-square-animation"
                        style={{ animationDelay: "-7.1428571429s" }}
                    ></div>
                    <div
                        className="absolute top-0 left-0 w-7 h-7 m-0.5 rounded-none bg-blue-500 animate-square-animation"
                        style={{ animationDelay: "-8.5714285714s" }}
                    ></div>
                    <div
                        className="absolute top-0 left-0 w-7 h-7 m-0.5 rounded-none bg-blue-500 animate-square-animation"
                        style={{ animationDelay: "-10s" }}
                    ></div>
                </div>
            </div>
        </>
    );
}