import React, { useState, useEffect } from 'react';
import StudyMode from './components/StudyMode';
import QuizMode from './components/QuizMode';
import GameOver from './components/GameOver';
import Preloader from './components/Preloader';
import { FACTS_DATA, QUIZ_DATA } from './data.js';

const GameState = {
  LOADING: 'LOADING',
  STUDY: 'STUDY',
  QUIZ: 'QUIZ',
  GAME_OVER: 'GAME_OVER'
};

function App() {
    const [gameState, setGameState] = useState(GameState.LOADING);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [combo, setCombo] = useState(1);

    useEffect(() => {
        if (gameState === GameState.LOADING) {
            const timer = setTimeout(() => setGameState(GameState.STUDY), 1500);
            return () => clearTimeout(timer);
        }
    }, [gameState]);

    const handleStudyComplete = () => setGameState(GameState.QUIZ);
    
    const handleQuizComplete = (finalScore) => {
        setScore(finalScore);
        setGameState(GameState.GAME_OVER);
    };

    const handleRestart = () => {
        setScore(0);
        setLives(3);
        setCombo(1);
        setGameState(GameState.LOADING);
    };

    const renderGameState = () => {
        switch (gameState) {
            case GameState.LOADING:
                return <Preloader />;
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
                return <Preloader />;
        }
    }

    return (
        <main className="w-full font-sans">
            {renderGameState()}
        </main>
    );
}

export default App;