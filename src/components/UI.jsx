import React from 'react';

const UI = ({ score, lives, combo }) => {
    return (
        <div className="w-full bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-4 mb-8 sticky top-4 z-10">
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="text-2xl font-bold">
                    <span className="block text-sm font-normal text-slate-500">Очки</span>
                    {score}
                </div>
                <div className="text-2xl font-bold text-sky-500">
                    <span className="block text-sm font-normal text-slate-500">Комбо</span>
                    x{combo}
                </div>
                <div className="text-2xl font-bold text-red-500 flex items-center justify-center">
                    <span className="block text-sm font-normal text-slate-500 mr-3">Жизни</span>
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className={`w-6 h-6 rounded-full transition-all ${i < lives ? 'bg-red-500' : 'bg-slate-200'}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UI;