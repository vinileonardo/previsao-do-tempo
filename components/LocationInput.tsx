import React, { useEffect, useState, useRef } from 'react';
import { locationService } from '../services/locationService';
import { City } from '../types';

interface LocationInputProps {
  onCitySelected: (cityName: string) => void;
  onCancel: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onCitySelected, onCancel }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carregar cidades do IBGE ao montar
    locationService.getBrazilianCities()
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fechar sugestões ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 1) {
      // Filtrar cidades (limite de 10 para performance)
      const matches = cities
        .filter(c => c.nome.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10); // Mostrar apenas as 10 primeiras
      setFilteredCities(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (cityName: string) => {
    setInputValue(cityName);
    setShowSuggestions(false);
    onCitySelected(cityName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      onCitySelected(inputValue);
    }
  };

  return (
    /* Removed 'absolute' positioning. The parent in App.tsx (flex items-center) handles centering. */
    <div className="w-full max-w-sm z-30 animate-emerge">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-600/50 p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col gap-4 relative" ref={wrapperRef}>
        
        <div className="text-center mb-1">
          <h2 className="text-white text-lg sm:text-xl font-light tracking-wide">
            Selecione sua Cidade
          </h2>
          <p className="text-slate-400 text-[10px] sm:text-xs mt-1">
            Digite o nome para buscar na base de dados
          </p>
        </div>
        
        {loading ? (
          <div className="text-cyan-400 text-sm animate-pulse text-center py-4">
            Carregando lista de cidades...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => inputValue.length > 1 && setShowSuggestions(true)}
                placeholder="Ex: São Paulo"
                className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-base sm:text-lg"
                autoFocus
              />
              
              {/* Dropdown de Sugestões Customizado */}
              {showSuggestions && filteredCities.length > 0 && (
                <ul className="absolute left-0 right-0 top-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50">
                  {filteredCities.map((city) => (
                    <li 
                      key={city.id}
                      onClick={() => handleSelectCity(city.nome)}
                      className="px-4 py-3 text-slate-200 hover:bg-cyan-900/50 cursor-pointer border-b border-slate-700/50 last:border-0 text-left transition-colors text-sm sm:text-base"
                    >
                      {city.nome}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 py-3 rounded-lg text-xs sm:text-sm uppercase tracking-wider font-medium transition-colors"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={inputValue.length < 2}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LocationInput;