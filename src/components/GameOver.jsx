import React from 'react';

const Button = ({ onClick, children, className = '' }) => (
    <button 
        className={`px-8 py-4 font-bold rounded-full text-lg transition-all duration-300 
                    transform hover:scale-105 focus:outline-none focus:ring-4
                    ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
);

const GameOver = ({ score, onRestart }) => {
    return (
        <div className="flex items-center justify-center min-h-screen -m-4">
            <div className="text-center p-8 md:p-12 bg-glass backdrop-blur-card border border-card-border rounded-2xl shadow-2xl animate-fade-in-up max-w-lg w-full">
                <h1 className="text-5xl md:text-6xl font-black text-primary mb-2">Игра окончена</h1>
                <p className="text-xl text-secondary mb-8">Ваш итоговый счет:</p>
                <p className="text-7xl font-bold text-accent-primary mb-10">{score}</p>
                <Button 
                    onClick={onRestart}
                    className="bg-accent-primary text-white shadow-lg hover:shadow-blue-400/50 focus:ring-blue-300"
                >
                    Начать заново
                </Button>
            </div>
        </div>
    );
};

export default GameOver;
