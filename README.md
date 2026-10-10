# ⚡ Pokémon Checklist

Um aplicativo moderno, responsivo e interativo para rastrear o progresso de captura de Pokémon jogo por jogo, abrangendo desde a **Geração 1 (Red & Blue)** até a **Geração 9 (Scarlet & Violet)** e a **National Dex**.

---

## 🚀 Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) (App Router com TypeScript)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com suporte total a **Dark Mode** e regras de `@media print`
- **Gerenciamento de Estado**: [Zustand](https://github.com/pmndrs/zustand) com middleware `persist` (`localStorage`)
- **Data Fetching & Cache**: [TanStack Query](https://tanstack.com/query) (React Query) integrado à [PokéAPI](https://pokeapi.co/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Animações & Efeitos**: Canvas Confetti & Web Audio API (chime sonoro suave ao capturar)
- **Exportação & Impressão**: Layout A4 dedicado para geração de PDF via `window.print()`

---

## ✨ Funcionalidades Principais

1. **Catálogo Completo de Jogos (Gerações 1 a 9 + National Dex)**:
   - Alternância rápida entre jogos clássicos (Red, Blue, Yellow, Gold, Silver, Crystal, Ruby, Emerald, Platinum, Black & White, X & Y, Sun & Moon, Sword & Shield, Legends Arceus, Scarlet & Violet) e a Pokédex Nacional completa.
2. **Modo Shiny Instantâneo**:
   - Um clique alterna todas as artes e sprites para suas variantes brilhantes (Shiny), com animação de partículas e brilho temático.
3. **Persistência Automática**:
   - Seu progresso de captura fica salvo no navegador por jogo específico. Ao fechar e reabrir a aba, nada é perdido.
4. **Filtros e Busca em Tempo Real**:
   - Busca por nome ou número (#ID regional ou nacional).
   - Filtros de status: *Todos*, *Capturados* e *Pendentes*.
   - Filtros por tipo elemental (*Fire*, *Water*, *Grass*, etc.) com badges coloridos oficiais.
5. **Ações em Massa & Backup**:
   - Botões para *Marcar Todos* ou *Limpar* da Pokédex atual.
   - Modal de Backup para **exportar em JSON** e **restaurar** em qualquer outro dispositivo.
6. **Estatísticas & Celebração**:
   - Contador de Pokémon capturados, restantes e porcentagem em tempo real.
   - Chuva de confetes ao completar 100% de uma Pokédex.
7. **Modo Impressão / PDF Otimizado (@media print)**:
   - Clique em "Imprimir / PDF" para abrir a visualização direta em grade A4.
   - Oculta menus, cores pesadas e fundos escuros para economia de tinta, apresentando caixas de seleção limpas e prontas para impressão física ou arquivamento em PDF.

---

## 📦 Como Executar o Projeto

### 1. Clonar ou navegar até o diretório:
```bash
cd PokemonCheckList
```

### 2. Instalar as dependências:
```bash
npm install
```

### 3. Rodar em modo de desenvolvimento:
```bash
npm run dev
```
Acesse `http://localhost:3000` no seu navegador.

### 4. Build de produção:
```bash
npm run build
npm run start
```
