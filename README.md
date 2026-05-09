# Tabelingo V13 UX Clean + Caminho Duolingo

Versão final repaginada com foco em UX/UI, mantendo a estrutura da página de aprendizado no estilo caminho das pedras / Duolingo.

## O que mudou nesta versão

- Mantém a tela **Aprender** com o mapa de módulos em formato de caminho, como no estilo Duolingo.
- Mantém todos os módulos, textos, provas, funcionalidades e features.
- Tela inicial mais limpa, com quatro cards principais em grade 2x2.
- Navegação organizada em Aprender, Diagnosticar, Consultar e Configurar.
- Área Consultar para reunir Régua da Tabela, Base do método, Progresso e Produto.
- Mapa da Tabela em consulta interativa por métrica e faixa.
- Aulas com resumo primeiro e explicação completa em sanfona quando o texto é longo.
- Analisador de campanha e criativos em fluxo guiado.
- Relatórios com decisão principal no topo e detalhes em blocos.
- Visual mais clean, menos carregado, com melhor legibilidade e espaçamento.
- Botões verdes com texto preto.
- Navegação inferior mobile.
- Service worker continua sem interceptar o app para evitar cache antigo fechando a tela.

## O que foi mantido

- Caminho de aprendizado estilo Duolingo.
- Todos os módulos e textos.
- Todas as provas por unidade.
- Treino diagnóstico.
- Análise de campanha completa.
- Análise e comparação de criativos.
- Travas contra escala com ROAS isolado, pouco volume ou dados incompletos.
- Separação entre ROAS e ROI.
- Modo Base do método.
- Mapa da Tabela Inteligente.
- Configuração de produto.
- Progresso e XP.

## Como publicar no GitHub Pages

1. Envie todos os arquivos deste ZIP para a raiz do repositório.
2. No GitHub, vá em **Settings > Pages**.
3. Escolha a branch principal e a pasta raiz.
4. Abra o link do Pages direto em `index.html?v=12-ux-clean-duolingo`.

## Se uma versão antiga ainda abrir errado no celular

1. Remova o atalho/app antigo da tela inicial.
2. Abra `limpar-cache.html`.
3. Toque em limpar cache antigo.
4. Abra `index.html?v=12-ux-clean-duolingo`.
5. Adicione novamente à tela inicial.


## V13 — Picker Clean

Esta versão simplifica a tela Aprender, mantém o caminho estilo Duolingo, adiciona rolagem automática para a fase atual e refaz a área Analisar com fluxo limpo, comparação de campanhas/anúncios e régua horizontal tipo picker para inserir métricas sem digitar.


## V14 Clean Original

- Remove referências visíveis a material externo/ordem externa: o Tabelingo agora aparece como fonte original do conteúdo.
- Configuração de ticket médio continua refletindo automaticamente nos módulos e análises que usam ticket.
- Analisador com botões Voltar/Continuar lado a lado, sem botão Pular e com ajuda abaixo dos botões.
- Adicionados ajuste de tamanho da interface e modo claro/escuro em Configurar.
