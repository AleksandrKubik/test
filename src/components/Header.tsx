"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline/index.js';

const boostServices = [
    {
        name: 'X Boost',
        href: '/services/x-boost',
        description: 'Grow your X presence organically'
    },
    {
        name: 'Telegram Boost',
        href: '/services/telegram-boost',
        description: 'Increase your Telegram channel members'
    },
    {
        name: 'YouTube Boost',
        href: '/services/youtube-boost',
        description: 'Grow your YouTube audience'
    }
];

export default function Header() {
    const [isBoostOpen, setIsBoostOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (elementId: string) => {
        setIsBoostOpen(false);
        setIsMobileMenuOpen(false);
        const element = document.getElementById(elementId);
        if (element) {
            const headerOffset = 64; // высота хедера
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <header className="fixed w-full top-0 left-0 right-0 z-50">
            <nav className="h-16 backdrop-blur-md border-b border-white/10 bg-black/40">
                <div className="container h-full mx-auto px-4 flex items-center justify-between">
                    {/* Логотип */}
                    <Link
                        href="/"
                        className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
            bg-clip-text text-transparent hover:from-blue-300 hover:to-blue-500 
            transition-all duration-300"
                    >
                        SocialBoost
                    </Link>

                    {/* Навигация */}
                    <div className="hidden md:flex h-full items-center">
                        {/* Обычные ссылки */}
                        {['features', 'how-it-works', 'test-flight', 'contact'].map((section) => (
                            <Link
                                key={section}
                                href={`#${section}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(section);
                                }}
                                className="h-full px-4 inline-flex items-center text-neutral-400 hover:text-white 
                hover:bg-white/5 transition-all duration-300 relative group"
                            >
                                {section.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 
                  group-hover:scale-x-100 transition-transform duration-300" />
                            </Link>
                        ))}

                        {/* Выпадающее меню Boost */}
                        <div className="relative h-full group">
                            <button
                                onClick={() => setIsBoostOpen(!isBoostOpen)}
                                className="h-full px-4 flex items-center gap-1 text-neutral-400 hover:text-white 
                hover:bg-white/5 transition-all duration-300 relative group"
                            >
                                Boost
                                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300
                  ${isBoostOpen ? 'rotate-180' : ''}`}
                                />
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 
                  group-hover:scale-x-100 transition-transform duration-300" />
                            </button>

                            <AnimatePresence>
                                {isBoostOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-1 w-64 rounded-xl 
                    backdrop-blur-xl bg-black/60 border border-white/10 
                    shadow-[0_0_20px_rgba(29,161,242,0.1)]"
                                    >
                                        <div className="p-1">
                                            {boostServices.map((service) => (
                                                <Link
                                                    key={service.name}
                                                    href={service.href}
                                                    className="block p-3 rounded-lg hover:bg-white/10 
                          transition-all duration-300"
                                                    onClick={() => {
                                                        setIsBoostOpen(false);
                                                    }}
                                                >
                                                    <div className="font-medium text-white">
                                                        {service.name}
                                                    </div>
                                                    <div className="text-sm text-neutral-400">
                                                        {service.description}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Мобильное меню */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Открытие/закрытие мобильного меню
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Мобильное меню */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-16 left-0 right-0 bg-black/40 backdrop-blur-md border-b border-white/10 z-50"
                    >
                        <div className="flex flex-col items-center">
                            {['features', 'how-it-works', 'test-flight', 'contact'].map((section) => (
                                <Link
                                    key={section}
                                    href={`#${section}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(section);
                                    }}
                                    className="w-full text-neutral-400 hover:text-white 
                                hover:bg-white/5 transition-all duration-300 text-center py-2"
                                >
                                    {section.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </Link>
                            ))}
                            {/* Список сервисов для буста в мобильном меню в виде карточек */}
                            <div className="flex flex-col mb-4 mt-4 space-y-2">
                                {boostServices.map((service) => (
                                    <Link
                                        key={service.name}
                                        href={service.href}
                                        className={`block p-4 mb-2 rounded-lg bg-black/60 border border-white/10 
                                hover:bg-blue-500 transition-all duration-300 text-center 
                                relative group 
                                hover:shadow-xl transform hover:scale-105 
                                ${service.name === 'X Boost' ? 'hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.7)]' :
                                                service.name === 'Telegram Boost' ? 'hover:shadow-[0_0_20px_5px_rgba(0,136,204,0.7)]' :
                                                    'hover:shadow-[0_0_20px_5px_rgba(255,0,0,0.7)]'}`}
                                        onClick={() => setIsMobileMenuOpen(false)} // Закрыть мобильное меню при выборе
                                    >
                                        <div className="font-medium text-white">
                                            {service.name}
                                        </div>
                                        <div className="text-sm text-neutral-400">
                                            {service.description}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}