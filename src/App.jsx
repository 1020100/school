
import React, { useState, useEffect } from 'react';
import StudyMode from './components/StudyMode';
import QuizMode from './components/QuizMode';
import GameOver from './components/GameOver';
import Preloader from './components/Preloader';

// --- Данные (остаются без изменений) ---
const FACTS_DATA = [
    { text: 'В Царскосельском лицее Пушкин показывал успехи только в русском, французском и фехтовании.', image: 'images/lyceum.jpg' },
    { text: 'Он стеснялся своего небольшого роста, так как его жена Наталья Гончарова была выше его.', image: 'images/goncharova.jpg' },
    { text: 'Именно Пушкин подсказал Гоголю сюжеты произведений \'Мертвые души\' и \'Ревизор\'.', image: 'images/gogol.jpg' },
    { text: 'Роковой для поэта стала дуэль с Жоржем Дантесом, хотя за свою жизнь он участвовал более чем в 20 дуэлях.', image: 'images/duel.jpg' },
    { text: 'В детстве Пушкин едва не погиб под копытами коня императора Александра I.', image: 'images/alexander.jpg' }
];

const QUIZ_DATA = [
    {
        question: 'На какой картине изображена сцена дуэли?',
        answers: [
            { image: 'images/duel.jpg', correct: true },
            { image: 'images/lyceum.jpg', correct: false },
            { image: 'images/gogol.jpg', correct: false }
        ]
    },
    {
        question: 'Какой из этих портретов НЕ принадлежит Пушкину?',
        answers: [
            { image: 'images/pushkin_portrait.jpg', correct: false },
            { image: 'images/goncharova.jpg', correct: true },
            { image: 'images/alexander.jpg', correct: false }
        ]
    },
    {
        question: 'Какое изображение ассоциируется с литературным творчеством в целом?',
        answers: [
            { image: 'images/quill_and_ink.jpg', correct: true },
            { image: 'images/alexander.jpg', correct: false },
            { image: 'images/lyceum.jpg', correct: false }
        ]
    },
    {
        question: 'Где Пушкин получил свое образование?',
        answers: [
            { image: 'images/lyceum.jpg', correct: true },
            { image: 'images/old_books.jpg', correct: false },
            { image: 'images/duel.jpg', correct: false }
        ]
    }
];

const GameState = { STUDY: 'STUDY', QUIZ: 'QUIZ', GAME_OVER: 'GAME_OVER' };

function App() {
    const [gameState, setGameState] = useState(GameState.STUDY);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [combo, setCombo] = useState(1);
    const [loading, setLoading] = useState(true); // Состояние для прелоадера

    useEffect(() => {
        // Имитация загрузки
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleStudyComplete = () => setGameState(GameState.QUIZ);
    const handleQuizComplete = (finalScore) => {
        setScore(finalScore);
        setGameState(GameState.GAME_OVER);
    };
    const handleRestart = () => {
        setScore(0);
        setLives(3);
        setCombo(1);
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
            setGameState(GameState.STUDY);
        }, 1500);
    };

    if (loading) {
        return <Preloader />;
    }

    const renderGameState = () => {
        switch (gameState) {
            case GameState.STUDY:
                return <StudyMode facts={FACTS_DATA} onComplete={handleStudyComplete} />;
            case GameState.QUIZ:
                return <QuizMode 
                            questions={QUIZ_DATA} 
                            onComplete={handleQuizComplete} 
                            score={score} setScore={setScore}
                            lives={lives} setLives={setLives}
                            combo={combo} setCombo={setCombo}
                        />;
            case GameState.GAME_OVER:
                return <GameOver score={score} onRestart={handleRestart} />;
            default:
                return null;
        }
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-6xl mx-auto animate-fade-in">
                {renderGameState()}
            </div>
        </main>
    );
}

export default App;
