// Módulo 03 — Taxa de Visualização
// Objeto pronto para colar dentro do array MODULES.

{
        id: "taxa-visualizacao",
        title: "Taxa de Visualização: clique não é chegada",
        metric: "TX Visualização",
        description: "Aprenda a descobrir se quem clicou realmente chegou na página ou se o dinheiro vazou no caminho.",
        xp: 110,
        difficulty: "Básico",
        estimatedMinutes: 14,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "Clique não é visita real",
            body: "Muita gente olha CPC, vê clique e acha que a pessoa chegou na página. Só que não é bem assim. A pessoa pode clicar e abandonar antes da página carregar. A Taxa de Visualização mostra quantos cliques realmente viraram visualização da página de destino.",
            cards: [
              {
                label: "Clique",
                text: "A pessoa tocou no anúncio."
              },
              {
                label: "Visualização da página",
                text: "A página carregou de verdade para essa pessoa."
              },
              {
                label: "O vazamento",
                text: "Se muita gente clica e pouca gente chega, você está pagando por clique que morre no caminho."
              }
            ]
          },
          {
            type: "quiz",
            title: "Clique vs chegada",
            question: "O que a Taxa de Visualização mostra?",
            options: [
              {
                text: "Quantos cliques realmente viraram carregamento da página.",
                correct: true,
                feedback: "Isso. Ela mostra se o clique atravessou a ponte e chegou na página de destino."
              },
              {
                text: "Quanto você paga por cada clique.",
                feedback: "Essa é a função do CPC. Taxa de Visualização mede a passagem do clique para a página carregada."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Isso é CPM. Aqui a pergunta é sobre quem clicou e realmente chegou na página."
              },
              {
                text: "Quantas pessoas finalizaram compra.",
                feedback: "Compra fica no final do funil. Taxa de Visualização fica antes, entre clique e página."
              },
              {
                text: "Quanto você faturou sobre o investimento.",
                feedback: "Isso parece ROAS. Taxa de Visualização não mede faturamento, mede chegada na página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A fórmula sem enrolação",
            body: "A conta é: visualizações da página de destino divididas pelos cliques no link, vezes 100. Ela transforma a chegada real em porcentagem. Se 100 pessoas clicaram e 80 carregaram a página, sua taxa de visualização foi 80%.",
            formula: "Taxa de Visualização = visualizações da página ÷ cliques no link × 100",
            cards: [
              {
                label: "Exemplo 1",
                text: "100 cliques e 80 visualizações = 80%."
              },
              {
                label: "Exemplo 2",
                text: "200 cliques e 100 visualizações = 50%."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Uma campanha teve 100 cliques e 80 visualizações da página. Qual foi a Taxa de Visualização?",
            options: [
              {
                text: "20%",
                feedback: "Essa leitura parece o que faltou chegar. Mas a taxa mede quem chegou: 80 de 100."
              },
              {
                text: "50%",
                feedback: "50% seria se metade dos cliques virasse visualização. Aqui foram 80 de 100."
              },
              {
                text: "80%",
                correct: true,
                feedback: "Boa. 80 visualizações divididas por 100 cliques dá 80%."
              },
              {
                text: "100%",
                feedback: "100% seria se todos os cliques tivessem carregado a página. Aqui 20 ficaram pelo caminho."
              },
              {
                text: "180%",
                feedback: "A taxa não soma cliques com visualizações. Ela divide visualizações por cliques."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua da Taxa de Visualização",
            body: "Essa régua mostra se o tráfego está chegando bem na página. Quanto maior, melhor. Se muita gente clica e não carrega a página, antes de culpar copy, checkout ou produto, você precisa resolver esse vazamento.",
            cards: [
              {
                label: "🔴 0% a 75%",
                status: "bad",
                text: "Ruim. Existe vazamento forte entre clique e página."
              },
              {
                label: "🟢 75% a 85%",
                status: "good",
                text: "Bom. A maior parte dos cliques está chegando."
              },
              {
                label: "🟢 85% a 100%",
                status: "good",
                text: "Muito bom. O tráfego está chegando limpo na página."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua da chegada",
            question: "Na régua do Tabelingo, uma Taxa de Visualização de 62% indica o quê?",
            options: [
              {
                text: "Ruim. Tem vazamento forte entre clique e página.",
                correct: true,
                feedback: "Certo. Abaixo de 75% é ruim. Muita gente clicou, mas não chegou na página."
              },
              {
                text: "Bom. Está dentro da faixa saudável.",
                feedback: "Bom começa em 75%. Com 62%, muita gente está ficando pelo caminho."
              },
              {
                text: "Muito bom. Pode escalar sem olhar nada.",
                feedback: "Muito bom seria acima de 85%. E mesmo assim nenhuma métrica sozinha libera escala."
              },
              {
                text: "Problema obrigatório no checkout.",
                feedback: "Ainda nem chegamos no checkout. Essa métrica fala da ponte entre clique e página."
              },
              {
                text: "CPC perfeito.",
                feedback: "Ela não mede o custo do clique. Ela mede se o clique carregou a página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "O que taxa baixa pode indicar",
            body: "Taxa de Visualização baixa geralmente significa que tem algo quebrando entre o clique e a página. Pode ser página lenta, imagem pesada, hospedagem ruim, script demais, público curioso sem intenção ou promessa do anúncio diferente do que a página entrega.",
            cards: [
              {
                label: "Problema técnico",
                text: "Página lenta, imagem pesada, hospedagem fraca ou script travando."
              },
              {
                label: "Problema de tráfego",
                text: "Público curioso, clique sem intenção ou promessa chamando gente errada."
              },
              {
                label: "Problema de alinhamento",
                text: "Anúncio promete uma coisa e a página parece outra. A pessoa pula fora."
              }
            ]
          },
          {
            type: "quiz",
            title: "Causas do vazamento",
            question: "Qual alternativa combina com Taxa de Visualização baixa?",
            options: [
              {
                text: "Página lenta, clique curioso ou promessa desalinhada com a página.",
                correct: true,
                feedback: "Perfeito. Esses são suspeitos clássicos quando muita gente clica e pouca gente chega."
              },
              {
                text: "Checkout obrigatoriamente perfeito.",
                feedback: "A métrica nem chegou no checkout ainda. Ela fala da chegada na página."
              },
              {
                text: "ROAS sempre alto.",
                feedback: "Taxa baixa não garante retorno. Na verdade, pode desperdiçar tráfego antes da venda."
              },
              {
                text: "CPC sempre baixo e saudável.",
                feedback: "Pode até ter CPC baixo, mas taxa baixa mostra que o clique não está chegando bem."
              },
              {
                text: "Produto sempre validado.",
                feedback: "Não dá para validar produto se uma parte grande das pessoas nem chega na página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "O erro que queima dinheiro",
            body: "O iniciante vê poucas vendas e sai mexendo na página, no produto, no preço ou no checkout. Mas se metade dos cliques nem chega na página, a conversão nunca vai ser justa. Antes de mexer na copy da página, confirme se o tráfego realmente está chegando.",
            cards: [
              {
                label: "Erro comum",
                text: "Culpar a página quando o problema está antes dela."
              },
              {
                label: "Leitura correta",
                text: "Se a Taxa de Visualização está baixa, primeiro limpa a ponte entre clique e página."
              }
            ]
          },
          {
            type: "quiz",
            title: "Não culpe a etapa errada",
            question: "Você teve 1.000 cliques, mas só 450 visualizações de página. Qual leitura faz mais sentido?",
            options: [
              {
                text: "Existe um vazamento antes da página. Não dá para julgar a página com justiça ainda.",
                correct: true,
                feedback: "Exato. Se menos da metade chegou, primeiro resolve a chegada. Depois avalia a página."
              },
              {
                text: "A página foi testada de forma perfeita.",
                feedback: "Não foi. Se pouca gente chegou, a página nem recebeu tráfego suficiente com qualidade para julgamento justo."
              },
              {
                text: "O checkout é o único culpado.",
                feedback: "Muito cedo para culpar checkout. A perda está acontecendo antes da página."
              },
              {
                text: "O produto está automaticamente ruim.",
                feedback: "Ainda não dá para afirmar isso. Primeiro entenda por que os cliques não viram visualizações."
              },
              {
                text: "A campanha deve escalar porque teve muito clique.",
                feedback: "Clique sozinho não basta. Se o clique não chega na página, escala só aumenta o vazamento."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "O que fazer quando está baixa",
            body: "A ordem de correção precisa ser fria: testa velocidade da página, otimiza imagens, revisa scripts, confere promessa do anúncio, ajusta público e verifica rastreamento. Não sai mudando tudo ao mesmo tempo, senão você nunca sabe o que resolveu.",
            cards: [
              {
                label: "1. Técnica",
                text: "Velocidade, imagens, hospedagem, scripts e carregamento mobile."
              },
              {
                label: "2. Promessa",
                text: "O anúncio precisa bater com o que a página mostra."
              },
              {
                label: "3. Público",
                text: "Evite atrair curioso barato que clica e some."
              },
              {
                label: "4. Rastreamento",
                text: "Confira pixel/eventos para não tomar decisão em dado bugado."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ordem de ação",
            question: "Taxa de Visualização está baixa. Qual ação é mais profissional?",
            options: [
              {
                text: "Testar velocidade, otimizar carregamento, revisar promessa e conferir público/rastreamento.",
                correct: true,
                feedback: "Boa. Essa é a ordem correta: primeiro limpa a ponte entre clique e página."
              },
              {
                text: "Aumentar orçamento para compensar a perda.",
                feedback: "Se existe vazamento, mais orçamento só compra mais vazamento."
              },
              {
                text: "Trocar só o preço do produto.",
                feedback: "Preço pode importar depois, mas essa métrica fala antes da pessoa avaliar a oferta."
              },
              {
                text: "Ignorar, porque clique já basta.",
                feedback: "Clique que não carrega página não vende. Ignorar isso é pagar por buraco no funil."
              },
              {
                text: "Mudar o checkout imediatamente.",
                feedback: "Checkout vem depois. Primeiro resolva a chegada na página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Como cruzar com CPC",
            body: "CPC mostra o preço do clique. Taxa de Visualização mostra se esse clique virou página carregada. Quando cruza as duas, você entende se está pagando barato por clique bom ou barato por clique lixo.",
            cards: [
              {
                label: "CPC bom + visualização boa",
                status: "good",
                text: "Topo e ponte parecem saudáveis. Próximo passo: avaliar PV–IC."
              },
              {
                label: "CPC bom + visualização baixa",
                status: "warn",
                text: "Clique barato, mas pode ter página lenta, promessa desalinhada ou curiosos."
              },
              {
                label: "CPC alto + visualização baixa",
                status: "bad",
                text: "Pior cenário: clique caro e ainda vaza antes da página."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico cruzado",
            question: "CPC bom, mas Taxa de Visualização baixa. Qual leitura faz mais sentido?",
            options: [
              {
                text: "O clique está barato, mas pode estar vazando antes da página ou vindo de curiosos.",
                correct: true,
                feedback: "Exatamente. CPC bonito não salva se a chegada na página está ruim."
              },
              {
                text: "A campanha está perfeita.",
                feedback: "Não está. A visualização baixa mostra vazamento depois do clique."
              },
              {
                text: "O checkout é obrigatoriamente o culpado.",
                feedback: "Ainda não. Essa leitura acontece antes do checkout."
              },
              {
                text: "ROAS está garantido.",
                feedback: "Não dá para garantir retorno com a ponte entre clique e página vazando."
              },
              {
                text: "A página já foi validada.",
                feedback: "Não foi bem validada se muita gente nem chegou nela."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo Taxa de Visualização amassado",
            body: "Agora você sabe separar clique de chegada real. Se essa ponte vaza, o resto do funil sofre injustamente. Próximo módulo natural: PV–IC, a métrica que mostra se a página convence a pessoa a iniciar checkout.",
            xp: 110
          }
        ]
      }
