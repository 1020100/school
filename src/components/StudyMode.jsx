import React, { useState, useEffect } from 'react';

const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-white/20 rounded-full h-2">
      <div className="bg-accent-primary h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const StudyMode = ({ facts, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isAnimating, setIsAnimating] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const currentFact = facts[currentIndex];

    useEffect(() => {
        setIsFading(true);
        const fadeTimer = setTimeout(() => {
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
            }, 25);
            setIsFading(false);
            return () => clearInterval(interval);
        }, 300);
        return () => clearTimeout(fadeTimer);
    }, [currentIndex, facts, currentFact.text]);

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
            className="relative min-h-screen w-full flex items-center justify-center p-4 -m-4 animate-fade-in cursor-pointer"
            onClick={handleNext}
        >
            <div className="absolute inset-0 z-0 transition-all duration-500 ease-in-out" key={currentIndex}>
                <img src={currentFact.image} className="w-full h-full object-cover" alt="background" />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            <div className={`relative z-10 w-full max-w-3xl mx-auto p-8 md:p-12
                bg-glass backdrop-blur-card border border-white/10 rounded-2xl shadow-2xl 
                transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <h2 className="text-sm font-bold uppercase text-accent-primary mb-4 tracking-widest">Режим обучения</h2>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-white min-h-[150px] md:min-h-[200px]">
                    {displayedText}
                    {isAnimating && <span className="inline-block w-0.5 h-8 bg-white/70 ml-1 animate-ping"></span>}
                </p>
                <div className="mt-8">
                    <ProgressBar current={currentIndex} total={facts.length} />
                    <div className="text-right text-white/70 mt-2 text-sm">
                        Факт {currentIndex + 1} из {facts.length}
                    </div>
                </div>
            </div>
             <div className="absolute bottom-8 text-white/50 text-center text-sm z-10">
                Кликните в любом месте, чтобы продолжить...
            </div>
        </div>
    );
};

export default StudyMode;
