import React from 'react';

interface ControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  statusMessage: string;
}

const Controls: React.FC<ControlsProps> = ({ isRunning, onToggle, statusMessage }) => {
  return (
    <div className="absolute z-10 bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 w-full max-w-sm px-4">
      <div className={`transition-opacity duration-500 ${isRunning ? 'opacity-70' : 'opacity-100'} text-white text-center font-light tracking-wider text-sm bg-black/30 p-2 rounded-lg backdrop-blur-sm`}>
        {statusMessage}
      </div>
      
      <button
        onClick={onToggle}
        className={`
          relative overflow-hidden group
          px-8 py-3 rounded-full font-semibold tracking-widest uppercase transition-all duration-300
          ${isRunning 
            ? 'bg-red-500/20 text-red-100 border border-red-500/50 hover:bg-red-500/40 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
            : 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/50 hover:bg-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
          }
          backdrop-blur-md shadow-lg
        `}
      >
        <span className="relative z-10">
          {isRunning ? 'Parar' : 'Iniciar Tempestade'}
        </span>
      </button>

      {!isRunning && (
        <p className="text-gray-400 text-xs text-center max-w-[250px]">
          Toque para iniciar a experiência imersiva com áudio e vibração.
        </p>
      )}
    </div>
  );
};

export default Controls;
