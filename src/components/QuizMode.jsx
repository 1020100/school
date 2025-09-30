import React, { useState, useEffect } from 'react';
import UI from './UI';

const QuizMode = ({ questions, onComplete, score, setScore, lives, setLives, combo, setCombo }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        if (lives <= 0) {
            setTimeout(() => onComplete(score), 1000);
        }
    }, [lives, onComplete, score]);

    useEffect(() => {
        const question = questions[currentQuestionIndex];
        if (question) {
            setShuffledAnswers(question.answers.sort(() => Math.random() - 0.5));
        }
        setShowFeedback(false);
        setSelectedAnswer(null);
    }, [currentQuestionIndex, questions]);

    const handleAnswerClick = (answer, index) => {
        if (showFeedback) return;

        setSelectedAnswer(index);
        setShowFeedback(true);

        let scoreUpdate = score;
        if (answer.correct) {
            scoreUpdate = score + 100 * combo;
            setScore(scoreUpdate);
            setCombo(c => c + 1);
        } else {
            setLives(l => l - 1);
            setCombo(1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                onComplete(scoreUpdate);
            }
        }, 1500);
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return null; // Or a loading state
    }

    return (
        <div className="w-full animate-fade-in-up">
            <UI score={score} lives={lives} combo={combo} />
            <div className="text-center mt-8 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary px-4">{currentQuestion.question}</h2>
                <div className="grid md:grid-cols-3 gap-6 px-4">
                    {shuffledAnswers.map((answer, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = answer.correct;
                        
                        let stateClass = 'border-transparent';
                        let scaleClass = 'hover:scale-105 hover:shadow-2xl';
                        let overlayClass = 'opacity-0';

                        if (showFeedback) {
                            scaleClass = 'scale-100'; // Disable hover effect after selection
                            if (isCorrect) {
                                stateClass = 'border-accent-secondary scale-105 shadow-2xl';
                                overlayClass = 'opacity-100 bg-accent-secondary/30';
                            } else if (isSelected) {
                                stateClass = 'border-danger scale-105 shadow-2xl';
                                overlayClass = 'opacity-100 bg-danger/30';
                            } else {
                                stateClass = 'opacity-50 grayscale';
                            }
                        }

                        return (
                            <div 
                                key={index} 
                                className={`relative bg-glass backdrop-blur-card border-4 rounded-2xl shadow-lg overflow-hidden cursor-pointer 
                                            transition-all duration-300 ${stateClass} ${scaleClass}`}
                                onClick={() => handleAnswerClick(answer, index)}
                            >
                                <img src={answer.image} className="w-full h-64 object-cover" alt="Answer option" />
                                <div className={`absolute inset-0 transition-opacity duration-300 ${overlayClass}`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizMode;
