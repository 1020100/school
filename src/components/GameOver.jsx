import React from 'react';

const GameOver = ({ score, onRestart }) => {
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl animate-fade-in">
            <h1 className="text-6xl font-black text-slate-800 mb-4">Игра окончена</h1>
            <p className="text-2xl text-slate-600 mb-8">Ваш итоговый счет: <span className="font-bold text-sky-500">{score}</span></p>
            <button 
                className="px-8 py-4 bg-sky-500 text-white font-bold rounded-full text-xl transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300"
                onClick={onRestart}
            >
                Начать заново
            </button>
        </div>
    );
};

export default GameOver;