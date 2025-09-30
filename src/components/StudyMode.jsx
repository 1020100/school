import React, { useState, useEffect } from 'react';

const StudyMode = ({ facts, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isAnimating, setIsAnimating] = useState(true);

    const currentFact = facts[currentIndex];

    useEffect(() => {
        setIsAnimating(true);
        setDisplayedText('');
        let charIndex = 0;
        const interval = setInterval(() => {
            if (charIndex < currentFact.text.length) {
                setDisplayedText(prev => prev + currentFact.text[charIndex]);
                charIndex++;
            } else {
                setIsAnimating(false);
                clearInterval(interval);
            }
        }, 20);
        return () => clearInterval(interval);
    }, [currentIndex, facts]);

    const handleNext = () => {
        if (isAnimating) {
            setDisplayedText(currentFact.text);
            setIsAnimating(false);
        } else {
            if (currentIndex < facts.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                onComplete();
            }
        }
    };

    return (
        <div 
            className="bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-transform duration-500" 
            onClick={handleNext}
        >
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="p-8 order-2 md:order-1">
                    <h2 className="text-sm font-bold uppercase text-sky-500 mb-2">Режим Обучения</h2>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed min-h-[150px]">{displayedText}</p>
                    <div className="text-slate-400 mt-8">Кликните в любом месте, чтобы продолжить...</div>
                </div>
                <div className="order-1 md:order-2 h-64 md:h-full">
                    <img src={currentFact.image} className="w-full h-full object-cover" alt="Fact illustration" />
                </div>
            </div>
        </div>
    );
};

export default StudyMode;