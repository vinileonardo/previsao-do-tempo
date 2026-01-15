# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de Desenvolvimento

```bash
# Servidor de desenvolvimento (porta 3000)
npm run dev

# Build para produção
npm run build

# Visualizar build de produção
npm run preview
```

## Arquitetura e Estrutura

### Stack Tecnológica
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN no index.html)
- **Audio**: Web Audio API (síntese de som sem dependências externas)

### Fluxo da Aplicação

A aplicação é um app de previsão do tempo imersivo com efeitos de chuva e trovão. O fluxo principal tem 4 estados (`ViewState`):

1. **welcome** → Tela inicial com opções de usar GPS ou escolher cidade manualmente
2. **locating** → Busca coordenadas via Geolocalização
3. **manual_input** → Input para seleção manual de cidade (municípios brasileiros via API IBGE)
4. **weather_result** → Exibe resultado com nome da cidade e previsão de 50% (placeholder)

### Serviços Principais

**audioService.ts** - Gerencia áudio sintetizado via Web Audio API:
- `startRain()`: Loop de ruído branco filtrado para simular chuva
- `playThunder()`: Sintetiza som de trovão com envelope ADSR
- `setMute(boolean)`: Controla masterGainNode para mute global
- `resume()`: Desbloqueia AudioContext (necessário após interação do usuário)

**locationService.ts** - Gerencia geolocalização e dados de cidades:
- `getCurrentPosition()`: Wrapper para navigator.geolocation
- `getCityFromCoordinates()`: Reverse geocoding via Nominatim (OpenStreetMap)
- `getBrazilianCities()`: Busca lista de municípios brasileiros da API IBGE

### Componentes Visuais

**RainCanvas.tsx** - Canvas animado com:
- Partículas de chuva (gotas animadas via requestAnimationFrame)
- Efeito de relâmpago (flash branco + path zigzag desenhado dinamicamente)
- Redimensionamento responsivo

**Clouds.tsx** - Nuvens decorativas com animação float CSS

**LocationInput.tsx** - Autocomplete de cidades brasileiras

### Integrações Externas

**APIs públicas**:
- IBGE: `https://servicodados.ibge.gov.br/api/v1/localidades/municipios`
- Nominatim: `https://nominatim.openstreetmap.org/reverse` (reverse geocoding)

### Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
# API Keys
GEMINI_API_KEY=your_gemini_api_key_here

# Google Analytics
VITE_GOOGLE_ANALYTICS_ID=G-YOUR_ANALYTICS_ID

# Vercel Analytics
REACT_APP_VERCEL_ANALYTICS_ID=$VERCEL_ANALYTICS_ID
```

**Notas importantes**:
- A API do Gemini está configurada no `vite.config.ts` mas não está sendo usada no código atual (preparação para futura integração de previsão real)
- Google Analytics só será carregado se o ID for diferente do placeholder padrão
- As variáveis `VITE_*` são expostas automaticamente pelo Vite para o client-side

### Características Técnicas

- **Audio Context**: Requer interação do usuário antes de iniciar (mobile browsers)
- **Geolocalização**: Configurada com timeout de 10s e cache de 1 minuto
- **Vibração**: Padrão customizado `[200, 100, 50, 50, 200]` durante trovões
- **Trovões aleatórios**: Intervalo entre 1-10 segundos (agendamento recursivo)
- **Estado imutável**: Controle de áudio separado do estado visual (refs)
