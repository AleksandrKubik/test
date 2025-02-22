"use client";

import { useEffect, useRef, useState } from 'react';

export default function BackgroundGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const currentX = useRef(50);
    const currentY = useRef(50);
    const targetX = useRef(50);
    const targetY = useRef<number>(50);
    const animationFrameId = useRef<number | undefined>(undefined);

    useEffect(() => {
        // Уменьшаем время ожидания
        setTimeout(() => {
            setIsVisible(true);
        }, 50);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            targetX.current = (clientX / innerWidth) * 100;
            targetY.current = (clientY / innerHeight) * 100;
        };

        const animate = () => {
            // Плавная интерполяция
            currentX.current += (targetX.current - currentX.current) * 0.08;
            currentY.current += (targetY.current - currentY.current) * 0.08;

            if (glowRef.current) {
                glowRef.current.style.setProperty('--mouse-x', `${currentX.current}%`);
                glowRef.current.style.setProperty('--mouse-y', `${currentY.current}%`);
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isLoading]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Основное свечение */}
            <div
                ref={glowRef}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    backgroundImage: 'radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(29,161,242,0.1) 0%, rgba(29,161,242,0) 50%)',
                    '--mouse-x': '50%',
                    '--mouse-y': '50%',
                } as React.CSSProperties}
            />

            {/* Анимированные круги */}
            <div className={`absolute top-1/4 left-1/4 w-[40vw] h-[40vw] animate-glow-slow
                transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}
                md:w-[40vw] md:h-[40vw] w-[80vw] h-[80vw]`}>
                <div className="absolute inset-0 rounded-full bg-[rgba(29,161,242,0.08)] blur-3xl" />
            </div>

            <div className={`absolute bottom-1/4 right-1/3 w-[35vw] h-[35vw] animate-glow-slow-reverse
                transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}
                md:w-[35vw] md:h-[35vw] w-[70vw] h-[70vw]`}>
                <div className="absolute inset-0 rounded-full bg-[rgba(29,161,242,0.08)] blur-3xl" />
            </div>

            <div className={`absolute top-1/3 right-1/4 w-[25vw] h-[25vw] animate-glow-slower
                transition-opacity duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}
                md:w-[25vw] md:h-[25vw] w-[50vw] h-[50vw]`}>
                <div className="absolute inset-0 rounded-full bg-[rgba(29,161,242,0.1)] blur-3xl" />
            </div>
        </div>
    );
} 