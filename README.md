# TripMate Lite 🇨🇦

MVP PWA gratuito para roteiro de viagem. Sem login, backend ou banco de dados: o roteiro é salvo localmente no aparelho e o app pode funcionar offline depois de instalado/carregado.

## Stack
- React + Vite
- PWA/manifest
- localStorage
- GitHub Pages
- Google Maps apenas por links externos

## Rodar localmente
```bash
npm install
npm run dev
```

## Publicar no GitHub Pages
1. Crie um repositório no GitHub chamado `tripmate-lite`.
2. Envie todos os arquivos deste projeto.
3. Em Settings → Pages, selecione GitHub Actions.
4. Crie `.github/workflows/deploy.yml` com o workflow padrão de Vite/Node, ou use o GitHub Pages com Actions.
5. O `vite.config.js` usa `base: './'`, então o projeto funciona também em subcaminho.

## Escopo da V1
- Início
- Roteiro de 07/09 a 21/09/2026
- Detalhe de cada dia
- Adicionar/editar/excluir atividade
- Marcar dia como concluído
- Abrir local no Google Maps
- Persistência local

Não há gastos, restaurantes, reservas, participantes ou conta de usuário.
