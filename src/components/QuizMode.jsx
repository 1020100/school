import React, { useState, useEffect } from 'react';
import UI from './UI';

const QuizMode = ({ questions, onComplete, score, setScore, lives, setLives, combo, setCombo }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        if (lives <= 0) {
            setTimeout(() => onComplete(score), 500);
        }
    }, [lives, onComplete, score]);

    useEffect(() => {
        const question = questions[currentQuestionIndex];
        setShuffledAnswers(question.answers.sort(() => Math.random() - 0.5));
    }, [currentQuestionIndex, questions]);

    const handleAnswerClick = (answer, index) => {
        if (showFeedback) return;

        setSelectedAnswer(index);
        setShowFeedback(true);

        if (answer.correct) {
            setScore(score + 100 * combo);
            setCombo(combo + 1);
        } else {
            setLives(lives - 1);
            setCombo(1);
        }

        setTimeout(() => {
            setShowFeedback(false);
            setSelectedAnswer(null);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                onComplete(score);
            }
        }, 1200);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="w-full">
            <UI score={score} lives={lives} combo={combo} />
            <div className="text-center mt-8">
                <h2 className="text-4xl font-bold mb-8 animate-fade-in">{currentQuestion.question}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {shuffledAnswers.map((answer, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = answer.correct;
                        let borderClass = 'border-transparent';
                        if (showFeedback) {
                            if (isCorrect) borderClass = 'border-green-500';
                            else if (isSelected) borderClass = 'border-red-500';
                        }

                        return (
                            <div 
                                key={index} 
                                className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-4 ${borderClass}`}
                                onClick={() => handleAnswerClick(answer, index)}
                            >
                                <img src={answer.image} className="w-full h-64 object-cover" alt="Answer option" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizMode;