# Guia Rápido de Configuração

Resumo executivo para configurar o projeto rapidamente.

---

## ⚡ Setup em 5 Minutos

### 1. Clone e Instale

```bash
cd previsao-do-tempo
npm install
```

### 2. Configure Variáveis de Ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```bash
# Opcional - pode deixar os valores padrão para desenvolvimento
GEMINI_API_KEY=PLACEHOLDER_API_KEY
VITE_GOOGLE_ANALYTICS_ID=G-SEU_ID_ANALYTICS
```

### 3. Execute

```bash
npm run dev
```

Acesse: `http://localhost:3000`

✅ **Pronto!** O app já funciona perfeitamente sem configurar nada.

---

## 🎯 Configuração por Ambiente

### Desenvolvimento Local
```bash
# Funciona sem configurar nada!
# Analytics é opcional, só se quiser rastrear durante o desenvolvimento
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX  # opcional
```

### Produção (Vercel/Netlify)
```bash
# Configure no dashboard da plataforma
GEMINI_API_KEY=sua_chave_gemini  # para uso futuro
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX  # recomendado
REACT_APP_VERCEL_ANALYTICS_ID=$VERCEL_ANALYTICS_ID  # automático na Vercel
```

---

## 📊 Configurar Google Analytics (Opcional - 5 min)

O Google Analytics permite ver quantas pessoas visitam seu site, de onde vêm, quanto tempo ficam, etc.

**É necessário?** Não! O app funciona perfeitamente sem ele.

**Quer configurar?**

1. Acesse: https://analytics.google.com/
2. Clique em **"Começar a medir"**
3. Crie uma conta e propriedade
4. Escolha plataforma: **Web**
5. Digite URL do site
6. Copie o ID (formato: `G-XXXXXXXXXX`)
7. Cole no `.env.local`:
   ```bash
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```
8. Reinicie o servidor: `Ctrl+C` e `npm run dev`

✅ **Teste**: Acesse seu site e veja em "Tempo Real" no painel do Analytics.

📚 **Guia completo**: [`SETUP_GOOGLE_ANALYTICS.md`](SETUP_GOOGLE_ANALYTICS.md)

---

## 🚀 Deploy Rápido

### Vercel (Recomendado - Mais Fácil)

**Opção 1: Via Dashboard (Sem CLI)**
1. Acesse: https://vercel.com/
2. Clique em **"Add New Project"**
3. Importe seu repositório do GitHub
4. Configure variáveis de ambiente:
   - `VITE_GOOGLE_ANALYTICS_ID` = `G-XXXXXXXXXX` (opcional)
5. Clique em **"Deploy"**

**Opção 2: Via CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente
vercel env add VITE_GOOGLE_ANALYTICS_ID
```

### Netlify

**Opção 1: Via Dashboard (Sem CLI)**
1. Acesse: https://app.netlify.com/
2. Clique em **"Add new site"** > **"Import an existing project"**
3. Conecte com GitHub e selecione o repositório
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Adicione variáveis de ambiente em **Site settings** > **Environment variables**
6. Clique em **"Deploy site"**

**Opção 2: Via CLI**
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## ✅ Checklist Pós-Deploy

- [ ] Site está acessível na URL de produção
- [ ] Sons e animações funcionam no mobile
- [ ] Geolocalização solicita permissão corretamente
- [ ] Busca de cidades funciona
- [ ] Botão de mute funciona
- [ ] Design responsivo em diferentes telas
- [ ] Analytics rastreando (se configurado)

---

## 🐛 Problemas Comuns

### "AudioContext was not allowed to start"
**Causa**: Browsers bloqueiam áudio até interação do usuário
**Solução**: Isso é normal e esperado! O áudio inicia após o primeiro clique.

### Analytics não mostra dados
**Causa**: Delay de processamento ou ID incorreto
**Solução**:
1. Verifique "Tempo Real" para dados instantâneos
2. Aguarde 24-48h para relatórios completos
3. Confirme que o ID está correto no `.env.local`

### Geolocalização não funciona
**Causa**: Site precisa estar em HTTPS
**Solução**:
- ✅ **Localhost**: Funciona normalmente
- ✅ **Vercel/Netlify**: HTTPS automático
- ❌ **HTTP remoto**: Não vai funcionar

### Variáveis de ambiente não funcionam
**Causa**: Esqueceu o prefixo `VITE_` ou não reiniciou o servidor
**Solução**:
1. Variáveis client-side DEVEM começar com `VITE_`
2. Após editar `.env.local`, reinicie: `Ctrl+C` e `npm run dev`
3. No Vercel/Netlify, redeploy após adicionar variáveis

### "Cannot find module" ou erro de build
**Causa**: Dependências não instaladas ou cache corrompido
**Solução**:
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpar cache do Vite
rm -rf dist
npm run build
```

---

## 📁 Estrutura do Projeto

```
previsao-do-tempo/
├── components/          # Componentes React
│   ├── RainCanvas.tsx  # Canvas com chuva e raios
│   ├── Clouds.tsx      # Nuvens animadas
│   ├── LocationInput.tsx # Autocomplete de cidades
│   └── Controls.tsx    # Controles (se houver)
├── services/           # Lógica de negócio
│   ├── audioService.ts # Síntese de áudio (chuva/trovão)
│   └── locationService.ts # Geolocalização e API IBGE
├── docs/               # Documentação
│   ├── QUICK_START.md  # Este arquivo
│   └── SETUP_GOOGLE_ANALYTICS.md # Guia do Analytics
├── App.tsx            # Componente principal
├── index.tsx          # Entry point
├── types.ts           # TypeScript types
└── vite.config.ts     # Configuração do Vite
```

---

## 🎨 Personalização Rápida

### Mudar Cores do Tema

Edite `App.tsx` e procure por classes Tailwind:

```tsx
// Fundo
className="bg-slate-900"  // Mude para bg-blue-900, bg-gray-900, etc.

// Botões
className="bg-cyan-600"   // Mude para bg-blue-600, bg-green-600, etc.
```

### Ajustar Intensidade da Chuva

Edite `components/RainCanvas.tsx`:

```typescript
// Linha ~53
const dropCount = Math.floor((windowSize.width * windowSize.height) / 3000);
// Diminua 3000 para mais chuva, aumente para menos
```

### Mudar Frequência dos Trovões

Edite `App.tsx`:

```typescript
// Linha ~41
const delay = Math.floor(Math.random() * 9000) + 1000;
// 9000 = máximo de 9 segundos, 1000 = mínimo de 1 segundo
```

---

## 📞 Precisa de Ajuda?

- 📖 **Arquitetura do código**: [`../CLAUDE.md`](../CLAUDE.md)
- 📊 **Configurar Analytics**: [`SETUP_GOOGLE_ANALYTICS.md`](SETUP_GOOGLE_ANALYTICS.md)
- 🐛 **Problemas técnicos**: Abra uma issue no GitHub

---

**Última atualização**: Janeiro 2026
