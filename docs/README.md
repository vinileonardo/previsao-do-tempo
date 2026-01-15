# Documentação do Projeto

Índice completo da documentação do Previsão do Tempo.

---

## 📚 Documentos Disponíveis

### 🚀 [Guia Rápido de Configuração](QUICK_START.md)
**Para quem quer começar rápido!**
- Setup em 5 minutos
- Configuração básica
- Deploy rápido
- Troubleshooting

👉 **Comece aqui se você quer rodar o projeto agora!**

---

### 📊 [Setup do Google Analytics](SETUP_GOOGLE_ANALYTICS.md)
**Guia passo a passo detalhado**
- Como criar conta no Google Analytics
- Configuração completa do GA4
- Como testar se está funcionando
- Entendendo os relatórios
- Troubleshooting

👉 **Use este guia se quiser rastrear visitantes do seu site.**

---

## 🗺️ Estrutura de Documentação

```
docs/
├── README.md                     # Este arquivo (índice)
├── QUICK_START.md               # Setup rápido (5 min)
└── SETUP_GOOGLE_ANALYTICS.md   # Guia Google Analytics
```

---

## 🎯 Guia por Situação

### "Quero apenas rodar o projeto localmente"
1. Leia: [QUICK_START.md](QUICK_START.md)
2. Execute: `npm install && npm run dev`
3. Pronto! ✅

### "Quero fazer deploy para produção"
1. Leia: [QUICK_START.md](QUICK_START.md) - Seção "Deploy Rápido"
2. Faça deploy na Vercel ou Netlify (super fácil!)
3. (Opcional) Configure Analytics: [SETUP_GOOGLE_ANALYTICS.md](SETUP_GOOGLE_ANALYTICS.md)

### "Quero rastrear visitantes do meu site"
1. Configure Analytics: [SETUP_GOOGLE_ANALYTICS.md](SETUP_GOOGLE_ANALYTICS.md)
2. Deploy o site
3. Aguarde 24-48h para dados significativos
4. Analise os relatórios no painel do Google Analytics

### "Quero personalizar o app"
1. Veja: [QUICK_START.md](QUICK_START.md) - Seção "Personalização Rápida"
2. Para arquitetura detalhada: [`../CLAUDE.md`](../CLAUDE.md)

---

## 📖 Documentação Técnica

Para informações sobre a arquitetura do código e desenvolvimento:
- [`../CLAUDE.md`](../CLAUDE.md) - Arquitetura, serviços e comandos

---

## ❓ FAQ Rápido

### Preciso configurar algo antes de rodar o projeto?
**Não!** O projeto funciona out-of-the-box. Todas as configurações são opcionais.

### Preciso de Google Analytics?
**Não!** É completamente opcional. Só configure se quiser rastrear visitantes.

### Preciso de um domínio próprio?
**Não!** Você pode hospedar gratuitamente em:
- ✅ Vercel (recomendado): `seu-app.vercel.app`
- ✅ Netlify: `seu-app.netlify.app`
- ✅ GitHub Pages: `seu-usuario.github.io/repo`

### O app funciona offline?
**Parcialmente**. As funcionalidades visuais (chuva, trovão, animações) funcionam offline. Mas a busca de cidades e geolocalização precisam de internet.

### Posso usar em produção comercial?
**Sim!** O projeto está sob licença MIT. Use como quiser.

### Como adiciono mais cidades ou países?
O app usa a API do IBGE para municípios brasileiros. Para adicionar outros países, você precisaria:
1. Modificar `services/locationService.ts`
2. Usar outra API (ex: [REST Countries](https://restcountries.com/))

---

## 🆘 Precisa de Ajuda?

1. **Leia a documentação** relevante acima
2. **Verifique o FAQ** nesta página
3. **Veja o troubleshooting** no [QUICK_START.md](QUICK_START.md)
4. **Abra uma issue** no GitHub se o problema persistir

---

## 📝 Contribuindo com a Documentação

Encontrou algo confuso ou faltando? Contribuições são bem-vindas!

1. Fork o repositório
2. Edite a documentação
3. Abra um Pull Request

---

## 🎓 Recursos de Aprendizado

### Para Iniciantes
- [React Docs](https://react.dev/) - Documentação oficial do React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guia do TypeScript
- [Vite Guide](https://vitejs.dev/guide/) - Guia do Vite

### Para Web Audio API
- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Audio API Tutorial](https://www.youtube.com/watch?v=3NgVlAscdcA)

### Para Canvas API
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Canvas Tutorial](https://www.html5canvastutorials.com/)

---

**Última atualização**: Janeiro 2026
