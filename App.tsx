import React, { useState, useEffect, useCallback, useRef } from 'react';
import RainCanvas from './components/RainCanvas';
import Clouds from './components/Clouds';
import LocationInput from './components/LocationInput';
import AdBanner from './components/AdBanner'; // Importando o componente de anúncio
import { audioService } from './services/audioService';
import { locationService } from './services/locationService';

type ViewState = 'welcome' | 'locating' | 'manual_input' | 'weather_result';

const App: React.FC = () => {
  // Estado principal da aplicação
  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [cityName, setCityName] = useState<string | null>(null);
  
  // Controle de áudio e efeitos
  const [isRunning, setIsRunning] = useState(true);
  const [isThundering, setIsThundering] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Estado para Mute
  const timerRef = useRef<number | null>(null);

  // --- Lógica de Efeitos (Chuva/Trovão) ---

  const triggerVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 50, 50, 200]);
    }
  };

  const triggerThunder = useCallback(() => {
    setIsThundering(true);
    audioService.playThunder();
    triggerVibration();
    setTimeout(() => {
      setIsThundering(false);
    }, 300); 
  }, []);

  const scheduleNextThunder = useCallback(() => {
    if (!isRunning) return;
    const delay = Math.floor(Math.random() * 9000) + 1000;
    
    timerRef.current = window.setTimeout(() => {
      triggerThunder();
      scheduleNextThunder();
    }, delay);
  }, [isRunning, triggerThunder]);

  useEffect(() => {
    if (isRunning) {
      audioService.startRain();
      scheduleNextThunder();
    }
    return () => {
      audioService.stopRain();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, scheduleNextThunder]);

  // Desbloqueio de áudio na primeira interação (clique global)
  useEffect(() => {
    const unlockAudio = () => {
      audioService.resume();
      // Removemos listeners apenas após a interação
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  // Handler para o botão de Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita conflitos, embora o unlockAudio seja global
    const newState = !isMuted;
    setIsMuted(newState);
    audioService.setMute(newState);
    
    // Garante que o contexto esteja ativo se o usuário clicar direto no botão de mute
    audioService.resume();
  };

  // --- Lógica de Localização ---

  const handleUseGPS = async () => {
    setViewState('locating');
    audioService.resume(); 

    try {
      const position = await locationService.getCurrentPosition();
      const detectedCity = await locationService.getCityFromCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );

      if (detectedCity) {
        setCityName(detectedCity);
        setViewState('weather_result');
      } else {
        setViewState('manual_input');
      }
    } catch (error) {
      console.log("Geolocalização negada ou falhou.");
      setViewState('manual_input');
    }
  };

  const handleManualEntry = () => {
    audioService.resume();
    setViewState('manual_input');
  };

  const handleCitySelected = (selectedCity: string) => {
    setCityName(selectedCity);
    setViewState('weather_result');
  };

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden select-none font-sans flex flex-col">
      {/* Fundo Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 pointer-events-none" />
      
      {/* Nuvens Pesadas */}
      <Clouds />

      {/* Canvas de Chuva e Raios */}
      <RainCanvas isThundering={isThundering} />
      
      {/* Botão de Mute (Topo Direito) */}
      <button 
        onClick={toggleMute}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white/80 transition-all hover:text-white hover:scale-105 active:scale-95 focus:outline-none"
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? (
          // Ícone Mute (Speaker X)
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        ) : (
          // Ícone Som (Speaker Wave)
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        )}
      </button>

      {/* Camada de Conteúdo Interativo */}
      <div className="flex-1 relative z-20 flex items-center justify-center p-4 w-full">
        
        {/* TELA 1: Boas-vindas / Decisão */}
        {viewState === 'welcome' && (
           <div className="w-11/12 max-w-sm bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-emerge text-center">
             <div className="space-y-2">
                <h1 className="text-2xl text-white font-light tracking-widest uppercase">
                  Previsão do Tempo
                </h1>
                <p className="text-slate-300 text-sm font-light">
                  Para uma experiência imersiva, precisamos saber onde você está.
                </p>
             </div>

             <div className="flex flex-col w-full gap-3">
               <button 
                 onClick={handleUseGPS}
                 className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg text-sm uppercase tracking-wider font-semibold shadow-lg shadow-cyan-500/20 transition-all transform active:scale-95"
               >
                 Usar minha localização
               </button>
               
               <button 
                 onClick={handleManualEntry}
                 className="w-full bg-transparent border border-slate-500 hover:bg-slate-800 text-slate-300 hover:text-white py-3 px-4 rounded-lg text-sm uppercase tracking-wider font-medium transition-all"
               >
                 Escolher Cidade
               </button>
             </div>
           </div>
        )}

        {/* TELA 2: Buscando GPS */}
        {viewState === 'locating' && (
           <div className="text-center animate-pulse">
             <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <div className="text-slate-300 text-sm tracking-widest uppercase">
               Obtendo coordenadas...
             </div>
           </div>
        )}

        {/* TELA 3: Input Manual */}
        {viewState === 'manual_input' && (
          <LocationInput 
            onCitySelected={handleCitySelected} 
            onCancel={() => setViewState('welcome')}
          />
        )}

        {/* TELA 4: Resultado Final */}
        {viewState === 'weather_result' && cityName && (
          <div className="text-center animate-emerge w-full max-w-lg px-4 flex flex-col items-center">
             <h1 className="text-4xl sm:text-5xl md:text-6xl text-slate-100 font-thin tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] break-words">
                {cityName}
             </h1>
             <div className="mt-8 flex justify-center">
                <p className="text-cyan-100/90 text-base sm:text-lg md:text-xl font-light tracking-wide drop-shadow-md bg-black/30 backdrop-blur-md py-4 px-6 sm:px-10 rounded-3xl border border-white/10 leading-relaxed">
                  A previsão de chuva em <strong className="font-semibold text-white">{cityName}</strong> é de 50%
                </p>
             </div>
             <div className="mt-6">
                <p className="text-white text-[10px] sm:text-xs tracking-[0.25em] uppercase font-light animate-ghost">
                  Chove ou não chove
                </p>
             </div>
          </div>
        )}

      </div>

      {/* Área de Anúncios e Rodapé */}
      <div className="relative z-30 w-full flex flex-col items-center justify-end pb-2">
         {/* Anúncio do Google */}
         <AdBanner />

         {/* Rodapé fixo (Apenas visível no resultado) */}
         {viewState === 'weather_result' && (
          <div className="w-full text-center text-slate-600 text-[10px] uppercase tracking-[0.3em] opacity-40 px-4 mt-2">
            Previsão do Tempo • Imersivo
          </div>
         )}
      </div>
    </div>
  );
};

export default App;