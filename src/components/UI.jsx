import React from 'react';

const Stat = ({ label, value, colorClass }) => (
  <div className={`text-center ${colorClass}`}>
    <span className="block text-sm font-medium text-secondary uppercase tracking-wider">{label}</span>
    <span className="text-3xl font-bold">{value}</span>
  </div>
);

const UI = ({ score, lives, combo }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-glass backdrop-blur-card rounded-2xl shadow-lg border border-card-border p-4 sticky top-4 z-50 animate-fade-in-up">
      <div className="grid grid-cols-3 gap-4 items-center">
        <Stat label="Очки" value={score} />
        <Stat label="Комбо" value={`x${combo}`} colorClass="text-accent-primary" />
        <div className="text-center">
          <span className="block text-sm font-medium text-secondary uppercase tracking-wider">Жизни</span>
          <div className="flex gap-2 items-center justify-center mt-1.5">
            {[...Array(3)].map((_, i) => (
              <svg key={i} className={`w-7 h-7 transition-all duration-300 ${i < lives ? 'text-danger' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UI;
