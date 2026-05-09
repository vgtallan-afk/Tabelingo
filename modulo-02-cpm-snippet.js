// Módulo 02 — CPM
// Objeto pronto para colar dentro do array MODULES.

{
        id: "cpm",
        title: "CPM: o custo da atenção",
        metric: "CPM",
        description: "Entenda quanto custa aparecer para mil pessoas, quando isso é bom, quando pesa e como cruzar com CPC.",
        xp: 100,
        difficulty: "Básico",
        estimatedMinutes: 12,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é CPM?",
            body: "CPM significa Custo por Mil Impressões. Ele mostra quanto você paga para seu anúncio aparecer mil vezes. Impressão não é clique, não é visita e não é venda. É só o anúncio sendo exibido para alguém.",
            formula: "CPM = custo para 1.000 impressões",
            cards: [
              {
                label: "Exemplo seco",
                text: "Se seu CPM é R$ 20, significa que você pagou R$ 20 para aparecer mil vezes."
              },
              {
                label: "O que ele mede",
                text: "CPM mede o preço da atenção no leilão, antes da pessoa clicar."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPM sem confundir",
            question: "Escolhe a definição mais correta de CPM:",
            options: [
              {
                text: "Quanto custa aparecer mil vezes para o público.",
                correct: true,
                feedback: "Isso. CPM é o custo para mil impressões. Ele mede o preço de aparecer, não o preço do clique."
              },
              {
                text: "Quanto você paga por cada clique no anúncio.",
                feedback: "Essa é a lógica do CPC. CPM fala de aparecer mil vezes, antes do clique acontecer."
              },
              {
                text: "Quanto você paga por cada compra.",
                feedback: "Isso já fica mais perto de CPA. CPM ainda está no topo do funil, antes da compra."
              },
              {
                text: "Quantas pessoas iniciaram checkout.",
                feedback: "Isso é uma métrica de página/checkout. CPM fica antes: ele mede custo de impressão."
              },
              {
                text: "Quanto você faturou dividido pelo investimento.",
                feedback: "Essa ideia se aproxima de ROAS. CPM não mede retorno, mede custo de exibição."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "CPM não é clique",
            body: "Essa parte é onde muita gente se enrola. CPM alto não quer dizer que ninguém clicou. CPM baixo não quer dizer que a campanha vai vender. CPM só mostra quanto está custando aparecer. Para saber se a pessoa reagiu, você olha CPC e CTR. Para saber se vendeu, olha CPA, ROAS e o resto do funil.",
            cards: [
              {
                label: "CPM",
                text: "Custo para aparecer."
              },
              {
                label: "CPC",
                text: "Custo para alguém clicar."
              },
              {
                label: "CPA",
                text: "Custo para gerar uma compra."
              }
            ]
          },
          {
            type: "quiz",
            title: "Cada métrica no seu lugar",
            question: "Se o anúncio apareceu mil vezes, mas você quer saber quanto custou essa exposição, qual métrica olha?",
            options: [
              {
                text: "CPM.",
                correct: true,
                feedback: "Boa. CPM é exatamente o custo para mil impressões, ou seja, o preço de aparecer."
              },
              {
                text: "CPC.",
                feedback: "CPC só entra quando alguém clica. A pergunta fala do custo de aparecer mil vezes."
              },
              {
                text: "CPA.",
                feedback: "CPA fala de aquisição/compra. Aqui ainda estamos antes do clique e antes da venda."
              },
              {
                text: "ROAS.",
                feedback: "ROAS fala de retorno sobre investimento. Não responde o custo de aparecer."
              },
              {
                text: "IC–Compras.",
                feedback: "IC–Compras fala do checkout virando compra. CPM acontece muito antes disso."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua base do CPM",
            body: "A régua base ajuda a entender se está barato ou caro aparecer para o público. Ela não é uma lei universal, porque nicho, época do ano, concorrência e público mudam o leilão. Mas serve como referência prática para não ficar perdido.",
            cards: [
              {
                label: "🟢 CPM abaixo de R$ 20",
                status: "good",
                text: "Bom/saudável. O custo para aparecer está leve. Agora avalia as outras métricas."
              },
              {
                label: "🟡 CPM entre R$ 20 e R$ 60",
                status: "warn",
                text: "Ponto de atenção. Pode estar normal em nichos competitivos, mas precisa monitorar."
              },
              {
                label: "🔴 CPM acima de R$ 60",
                status: "bad",
                text: "Caro/perigoso. Pode indicar leilão pesado, público muito disputado ou campanha com baixa chance de escala se o ROI estiver ruim."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua do CPM",
            question: "Na régua base do Tabelingo, um CPM de R$ 75 indica o quê?",
            options: [
              {
                text: "Custo de atenção caro/perigoso, pedindo diagnóstico antes de escalar.",
                correct: true,
                feedback: "Certo. Acima de R$ 60, o CPM já está caro na régua base. Antes de escalar, precisa entender o motivo."
              },
              {
                text: "Custo perfeito, pode escalar sem olhar mais nada.",
                feedback: "Nenhuma métrica sozinha libera escala. E R$ 75 está acima da faixa de atenção."
              },
              {
                text: "CPC obrigatoriamente baixo.",
                feedback: "CPM não diz automaticamente o CPC. Você precisa olhar os dois juntos."
              },
              {
                text: "Checkout saudável.",
                feedback: "CPM não fala sobre checkout. Ele fala sobre o custo de aparecer no leilão."
              },
              {
                text: "Compra garantida.",
                feedback: "Impressão não é compra. CPM só diz o custo de aparecer."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "CPM alto: o que pode estar acontecendo?",
            body: "CPM alto geralmente significa que está caro aparecer para aquele público. Pode ser concorrência alta, público muito disputado, época do ano mais cara, segmentação apertada demais ou baixa qualidade percebida pelo sistema da plataforma.",
            cards: [
              {
                label: "Suspeito 1",
                text: "Público muito concorrido."
              },
              {
                label: "Suspeito 2",
                text: "Sazonalidade: datas comerciais deixam o leilão mais caro."
              },
              {
                label: "Suspeito 3",
                text: "Segmentação estreita demais ou público pequeno."
              },
              {
                label: "Suspeito 4",
                text: "Criativo fraco, baixa relevância ou baixa resposta inicial."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPM alto",
            question: "Seu CPM está em R$ 80. O que faz mais sentido investigar primeiro?",
            options: [
              {
                text: "Concorrência no leilão, público, sazonalidade e qualidade do criativo.",
                correct: true,
                feedback: "Isso. CPM alto é sinal de custo de exibição pesado. O diagnóstico começa no leilão, público e criativo."
              },
              {
                text: "Somente a cor do botão de compra.",
                feedback: "Botão pode influenciar conversão depois, mas CPM alto acontece antes da pessoa chegar na página."
              },
              {
                text: "Trocar o checkout imediatamente.",
                feedback: "Checkout vem depois. CPM alto está no topo do funil, na etapa de exibição."
              },
              {
                text: "Ignorar, porque CPM alto sempre é bom.",
                feedback: "CPM alto pode ser aceitável em alguns casos, mas ignorar sem cruzar métricas é pedir pra apanhar do leilão."
              },
              {
                text: "Aumentar orçamento sem analisar nada.",
                feedback: "Se está caro aparecer, aumentar verba sem diagnóstico pode só comprar atenção cara em volume maior."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "CPM baixo nem sempre é vitória",
            body: "CPM baixo significa que está barato aparecer. Isso é bom, mas pode enganar. Às vezes você aparece barato para um público fraco, amplo demais ou sem intenção de compra. A pergunta certa é: aparecer barato está trazendo clique bom e venda ou só volume vazio?",
            cards: [
              {
                label: "CPM baixo + CPC baixo",
                status: "good",
                text: "Bom sinal inicial: aparece barato e as pessoas clicam barato."
              },
              {
                label: "CPM baixo + CPC alto",
                status: "warn",
                text: "Aparece barato, mas ninguém quer clicar. Pode ser criativo ou promessa fraca."
              },
              {
                label: "CPM baixo + vendas ruins",
                status: "bad",
                text: "Pode ser público barato, mas desqualificado. Atenção no resto do funil."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPM baixo também engana",
            question: "CPM baixo, mas CPC alto. Qual leitura é mais inteligente?",
            options: [
              {
                text: "Você aparece barato, mas o criativo/promessa pode não estar gerando vontade de clicar.",
                correct: true,
                feedback: "Perfeito. CPM baixo diz que aparecer está barato. CPC alto diz que o clique está difícil/caro."
              },
              {
                text: "A campanha está perfeita e deve escalar sempre.",
                feedback: "Cuidado. CPM baixo sozinho não prova nada. Se CPC está alto, tem resistência no clique."
              },
              {
                text: "O checkout é obrigatoriamente o problema.",
                feedback: "Ainda não. Antes do checkout, existe um problema na passagem de impressão para clique."
              },
              {
                text: "CPM baixo significa compra garantida.",
                feedback: "Impressão barata não garante clique, checkout ou compra."
              },
              {
                text: "O preço do produto é sempre o único problema.",
                feedback: "Preço pode influenciar depois, mas essa combinação fala primeiro de anúncio e clique."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "O cruzamento mais importante: CPM + CPC",
            body: "CPM mostra o preço para aparecer. CPC mostra o preço para clicar. Quando junta os dois, você entende se o problema está no leilão, no público ou no criativo. Essa é a diferença entre gestor e apertador de botão.",
            cards: [
              {
                label: "🟢 CPM normal + CPC baixo",
                status: "good",
                text: "Topo do funil provavelmente saudável."
              },
              {
                label: "🟡 CPM alto + CPC baixo",
                status: "warn",
                text: "Público caro, mas o criativo está gerando clique. Pode ser aceitável se o funil vender."
              },
              {
                label: "🟡 CPM normal + CPC alto",
                status: "warn",
                text: "Aparecer não está tão caro, mas o anúncio não convence a clicar."
              },
              {
                label: "🔴 CPM alto + CPC alto",
                status: "bad",
                text: "Pior cenário no topo: caro para aparecer e caro para clicar. Revisão forte antes de escalar."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico cruzado",
            question: "CPM alto e CPC baixo. Qual interpretação faz mais sentido?",
            options: [
              {
                text: "O público pode ser caro, mas o criativo está conseguindo gerar clique.",
                correct: true,
                feedback: "Boa. CPM alto mostra atenção cara; CPC baixo mostra que, mesmo caro para aparecer, quem vê tende a clicar."
              },
              {
                text: "O criativo não gera nenhum clique.",
                feedback: "Se CPC está baixo, clique não é o maior problema. O custo de aparecer é que está pesado."
              },
              {
                text: "O checkout está necessariamente quebrado.",
                feedback: "CPM e CPC falam do topo do funil. Checkout ainda precisa ser analisado depois."
              },
              {
                text: "A campanha deve ser pausada sempre.",
                feedback: "Não necessariamente. Pode ser aceitável se o resto do funil compensar com CPA e ROAS bons."
              },
              {
                text: "O público é barato.",
                feedback: "CPM alto indica justamente que aparecer para esse público está caro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "O que fazer quando CPM pesa?",
            body: "Quando o CPM está alto, não mexe igual barata tonta. Primeiro confirma se o CPC também está alto. Depois testa novos criativos, abre ou troca público, muda ângulo da promessa e compara horários/dias. Se tiver ROI bom, pode só monitorar. Se tiver ROI ruim, aí o alerta fica sério.",
            cards: [
              {
                label: "Se CPM alto + ROI bom",
                text: "Monitorar. Público caro pode valer a pena se o dinheiro volta."
              },
              {
                label: "Se CPM alto + ROI ruim",
                text: "Revisar público, criativo, promessa e estrutura antes de colocar mais verba."
              },
              {
                label: "Se CPM alto + CPC alto",
                text: "Topo do funil está pesado. Criar novos anúncios costuma ser prioridade."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ação correta",
            question: "CPM alto, CPC alto e ROI ruim. Qual ação combina mais com diagnóstico profissional?",
            options: [
              {
                text: "Revisar criativo, público e promessa antes de escalar.",
                correct: true,
                feedback: "Exatamente. Topo caro e retorno ruim não é convite para escala. É convite para corrigir a base."
              },
              {
                text: "Aumentar orçamento para compensar.",
                feedback: "Se o topo já está caro e o retorno ruim, aumentar orçamento tende a aumentar o prejuízo."
              },
              {
                text: "Ignorar CPM porque só ROAS importa.",
                feedback: "ROAS mostra consequência. CPM ajuda a entender uma causa do custo no topo."
              },
              {
                text: "Trocar só o título da página e manter anúncio igual.",
                feedback: "Pode até mexer na página depois, mas CPM e CPC altos apontam primeiro para anúncio/público."
              },
              {
                text: "Pausar todos os produtos da loja.",
                feedback: "O diagnóstico é da campanha/anúncio/público, não necessariamente da loja inteira."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo CPM amassado",
            body: "Agora você sabe que CPM é o custo da atenção. Ele mostra quanto custa aparecer, mas só vira diagnóstico de verdade quando cruza com CPC, ROI e o resto do funil. Próximo passo natural: Taxa de Visualização, a ponte entre clique e página.",
            xp: 100
          }
        ]
      }
