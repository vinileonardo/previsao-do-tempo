# Previsão do Tempo

Aplicativo de previsão do tempo imersivo com efeitos visuais de chuva, sons de trovão sintetizados e feedback tátil (vibração).

## 🚀 Setup

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev

# Build para produção
npm run build

# Visualizar build de produção
npm run preview
```

## 🔧 Configuração

### Variáveis de Ambiente

Configure o arquivo `.env.local` com suas chaves:

- **GEMINI_API_KEY**: Chave da API Gemini (preparação para integração futura)
- **VITE_GOOGLE_ANALYTICS_ID**: ID do Google Analytics (formato: G-XXXXXXXXXX)

O script do Google Analytics só será carregado se o ID for configurado corretamente (diferente do placeholder).

📚 **Como configurar o Google Analytics?** Veja o guia completo em [`docs/SETUP_GOOGLE_ANALYTICS.md`](docs/SETUP_GOOGLE_ANALYTICS.md)

## 🏗️ Tecnologias

- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Web Audio API** - Síntese de áudio
- **Canvas API** - Animações visuais
- **Geolocation API** - Detecção de localização

## 📦 Estrutura

```
├── components/          # Componentes React
│   ├── RainCanvas.tsx  # Canvas animado com chuva e raios
│   ├── Clouds.tsx      # Nuvens decorativas
│   ├── LocationInput.tsx # Autocomplete de cidades
│   └── AdBanner.tsx    # Banner de anúncios
├── services/           # Serviços
│   ├── audioService.ts # Síntese de áudio
│   └── locationService.ts # Geolocalização
└── App.tsx            # Componente principal
```

## 📝 Licença

MIT
