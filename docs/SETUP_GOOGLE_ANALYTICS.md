# Configuração do Google Analytics

Guia passo a passo para configurar o Google Analytics 4 no seu projeto.

---

## 🔍 O que é Google Analytics?

O Google Analytics (GA4) é uma ferramenta gratuita do Google que permite monitorar:
- 📊 Quantas pessoas visitam seu site
- 📍 De onde vêm os visitantes (países, cidades)
- 📱 Que dispositivos usam (mobile, desktop, tablet)
- ⏱️ Quanto tempo passam no site
- 🔄 Quais páginas acessam
- 🎯 Como interagem com o site

**Gratuito**: Sim, 100% gratuito
**Requisitos**: Apenas uma conta Google
**Tempo de setup**: ~5 minutos

---

## 📋 Passo a Passo

### Passo 1: Acessar o Google Analytics

1. Acesse: https://analytics.google.com/
2. Faça login com sua conta Google
3. Clique em **"Começar a medir"** ou **"Start measuring"**

### Passo 2: Criar Conta

1. **Nome da conta**: Digite um nome descritivo
   - Exemplo: `"Meus Projetos"` ou `"Previsão do Tempo"`
2. **Compartilhamento de dados da conta**:
   - Deixe as opções marcadas (recomendado para melhores insights)
3. Clique em **"Avançar"** ou **"Next"**

### Passo 3: Criar Propriedade

1. **Nome da propriedade**: Nome do seu projeto/site
   - Exemplo: `"Previsão do Tempo App"`
2. **Fuso horário para os relatórios**:
   - Selecione **"Brasil"** ou seu fuso horário
   - Exemplo: `(GMT-03:00) Brasília`
3. **Moeda**:
   - Selecione **"Real brasileiro (R$)"**
4. Clique em **"Avançar"**

### Passo 4: Sobre sua Empresa

1. **Setor**: Selecione a categoria do seu negócio
   - Para este projeto: **"Tecnologia"** ou **"Internet e Telecomunicações"**
2. **Tamanho da empresa**: Selecione o mais adequado
   - Exemplo: **"Pequena (1-100 funcionários)"** ou **"Eu mesmo"**
3. **Como você pretende usar o Google Analytics**:
   - Marque as opções relevantes
   - Exemplo: ☑️ Analisar o comportamento dos clientes
4. Clique em **"Criar"**
5. Aceite os **Termos de Serviço do Google Analytics**

### Passo 5: Configurar Coleta de Dados

1. **Escolha sua plataforma**: Selecione **"Web"**
2. Clique em **"Avançar"**

### Passo 6: Configurar Fluxo de Dados da Web

1. **URL do site**: Digite a URL do seu site
   - Desenvolvimento local: `http://localhost:3000`
   - Produção: `https://seu-dominio.com` ou `https://seu-app.vercel.app`
2. **Nome do fluxo**: Nome descritivo para identificar este fluxo
   - Exemplo: `"Web Stream"` ou `"Site Principal"`
3. Clique em **"Criar fluxo"**

### Passo 7: Obter o ID de Medição

Após criar o fluxo, você verá a página **"Detalhes do fluxo da Web"**.

1. Na parte superior, localize o **"ID de medição"**
   - Formato: `G-XXXXXXXXXX` (começa com `G-`)
2. **Copie este ID** (clique no ícone de copiar ao lado)

Exemplo:
```
ID de medição: G-ABC123XYZ
```

### Passo 8: Adicionar o ID ao Projeto

1. Abra o arquivo `.env.local` no seu projeto
2. Cole o ID de medição:
   ```bash
   VITE_GOOGLE_ANALYTICS_ID=G-ABC123XYZ
   ```
3. Salve o arquivo

### Passo 9: Testar a Configuração

1. **Reinicie o servidor de desenvolvimento**:
   ```bash
   # Pare o servidor (Ctrl+C) e inicie novamente
   npm run dev
   ```

2. **Abra seu site** em `http://localhost:3000`

3. **Verifique no Google Analytics**:
   - Volte ao painel do Google Analytics
   - No menu lateral, clique em **"Relatórios"** > **"Tempo real"**
   - Você deve ver **"1 usuário ativo agora"** (você mesmo!)

✅ **Funcionou?** Parabéns! Google Analytics configurado com sucesso!

---

## 📊 Entendendo os Relatórios

### Tempo Real
Mostra usuários ativos **agora**:
- Quantos usuários estão no site neste momento
- Que páginas estão visualizando
- De onde vêm (país, cidade)

**Quando usar**: Para testar se o Analytics está funcionando.

### Visão Geral da Aquisição
Mostra como os usuários **chegaram** ao seu site:
- Busca orgânica (Google, Bing)
- Direto (digitaram a URL)
- Redes sociais
- Referência (links de outros sites)

**Quando usar**: Para entender de onde vem seu tráfego.

### Visão Geral do Engajamento
Mostra o que os usuários **fazem** no site:
- Páginas mais visitadas
- Tempo médio no site
- Taxa de rejeição

**Quando usar**: Para entender o comportamento dos usuários.

### Dados Demográficos
Mostra **quem** são seus usuários:
- Países e cidades
- Idiomas
- Dispositivos (mobile, desktop)
- Navegadores

**Quando usar**: Para conhecer seu público.

---

## 🔧 Configurações Avançadas (Opcional)

### Filtrar seu próprio IP (Recomendado)

Para não contar suas próprias visitas nas estatísticas:

1. No Google Analytics, vá em **"Administrador"** (canto inferior esquerdo)
2. Na coluna **"Propriedade"**, clique em **"Fluxos de dados"**
3. Clique no seu fluxo de dados
4. Role até **"Configurar marcação avançada"**
5. Clique em **"Definir tráfego interno"**
6. Adicione seu endereço IP
   - Descubra seu IP em: https://www.meuip.com.br/

### Eventos Personalizados

O projeto já está configurado para enviar pageviews automaticamente. Para rastrear eventos customizados (cliques, interações):

```typescript
// Exemplo: Rastrear clique no botão de GPS
gtag('event', 'use_gps_button_click', {
  'event_category': 'engagement',
  'event_label': 'User Location'
});
```

---

## 🚫 Problemas Comuns

### "Não vejo dados no Tempo Real"

**Possíveis causas**:
1. O ID está incorreto ou não foi salvo
2. O servidor não foi reiniciado após adicionar o ID
3. Bloqueador de anúncios está ativo (desative para testar)
4. O navegador está em modo privado/anônimo

**Solução**:
```bash
# 1. Verifique se o ID está correto no .env.local
cat .env.local

# 2. Reinicie o servidor
# Ctrl+C para parar
npm run dev

# 3. Desative extensões de bloqueio (uBlock, AdBlock)

# 4. Teste em navegador normal (não anônimo)
```

### "Dados demoram para aparecer nos relatórios"

**Isso é normal!**
- **Tempo Real**: Dados aparecem instantaneamente
- **Outros relatórios**: Podem levar até **24-48 horas** para processar

### "O Analytics não carrega em produção"

**Verifique**:
1. As variáveis de ambiente estão configuradas no Vercel/Netlify?
2. O site está em HTTPS? (Analytics funciona melhor com HTTPS)
3. Veja o console do navegador (F12) para erros

**Solução no Vercel**:
1. Dashboard do Vercel > Projeto > Settings
2. Environment Variables
3. Adicione: `VITE_GOOGLE_ANALYTICS_ID` = `G-XXXXXXXXXX`
4. Redeploy o site

---

## 📱 Analytics e LGPD/GDPR

### Preciso de aviso de cookies?

**Tecnicamente, sim**. O Google Analytics usa cookies.

**Opções**:
1. **Banner simples** (recomendado para início):
   ```html
   <!-- Adicione no seu site -->
   <div class="cookie-banner">
     Este site usa cookies do Google Analytics para análise.
     <button onclick="acceptCookies()">Ok, entendi</button>
   </div>
   ```

2. **Serviços profissionais**:
   - [Iubenda](https://www.iubenda.com/)
   - [Cookiebot](https://www.cookiebot.com/)
   - [OneTrust](https://www.onetrust.com/)

### Anonimizar IPs

O GA4 já anonimiza IPs automaticamente por padrão. ✅

---

## 🎯 Próximos Passos

### Após Configurar o Analytics

1. ✅ **Aguarde 24-48h** para dados significativos
2. 📊 **Configure metas** (se aplicável)
3. 📧 **Configure relatórios por e-mail** (opcional)
4. 🔗 **Integre com Google Search Console** (opcional)
5. 📱 **Instale o app mobile** do Google Analytics

### Aprender Mais

**Cursos gratuitos**:
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Skillshop do Google](https://skillshop.withgoogle.com/)

**Documentação**:
- [Central de Ajuda do GA4](https://support.google.com/analytics)

---

## ✅ Checklist Final

- [ ] Conta criada no Google Analytics
- [ ] Propriedade configurada com fuso horário correto
- [ ] Fluxo de dados da web criado
- [ ] ID de medição copiado (formato: G-XXXXXXXXXX)
- [ ] ID adicionado ao `.env.local`
- [ ] Servidor reiniciado
- [ ] Site aberto no navegador
- [ ] "Tempo real" mostrando 1 usuário ativo
- [ ] (Opcional) IP filtrado para não contar visitas próprias
- [ ] (Opcional) Banner de cookies adicionado

---

## 📞 Precisa de Ajuda?

- 📖 [Documentação oficial do GA4](https://support.google.com/analytics)
- 🎓 [Cursos gratuitos](https://analytics.google.com/analytics/academy/)
- 💬 [Comunidade do Google Analytics](https://support.google.com/analytics/community)

---

**Última atualização**: Janeiro 2026
