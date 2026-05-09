// Módulo 04 — PV–IC
// Objeto pronto para colar dentro do array MODULES.

{
        id: "pv-ic",
        title: "PV–IC: a página convence ou só enrola?",
        metric: "PV–IC",
        description: "Aprenda a medir se a página está levando a pessoa para o checkout ou se ela só olha e vai embora.",
        xp: 120,
        difficulty: "Básico",
        estimatedMinutes: 15,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é PV–IC?",
            body: "PV–IC é a taxa que mostra quantas pessoas que visualizaram a página deram o próximo passo: iniciar o checkout. Em português claro: a pessoa chegou na página, leu a oferta e decidiu clicar para comprar. Se muita gente chega e pouca gente inicia checkout, a página não está convencendo.",
            cards: [
              {
                label: "PV",
                text: "Page View: visualização da página."
              },
              {
                label: "IC",
                text: "Início de Checkout: quando a pessoa começa o processo de compra."
              },
              {
                label: "PV–IC",
                text: "A ponte entre interesse na página e intenção de compra."
              }
            ]
          },
          {
            type: "quiz",
            title: "PV–IC sem confundir",
            question: "O que a métrica PV–IC mostra?",
            options: [
              {
                text: "A porcentagem de pessoas que viram a página e iniciaram checkout.",
                correct: true,
                feedback: "Isso. PV–IC mostra se a página está convencendo a pessoa a dar o próximo passo."
              },
              {
                text: "Quanto custa cada clique no anúncio.",
                feedback: "Isso é CPC. PV–IC acontece depois que a pessoa já chegou na página."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Essa é a função do CPM. PV–IC mede a passagem da página para o checkout."
              },
              {
                text: "Quantas pessoas finalizaram a compra depois do checkout.",
                feedback: "Isso é IC–Compras. PV–IC mede o passo anterior: página para início de checkout."
              },
              {
                text: "Quanto você faturou dividido pelo investimento.",
                feedback: "Isso se aproxima de ROAS. PV–IC não mede faturamento, mede intenção de avançar."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A fórmula do PV–IC",
            body: "A conta é simples: pega os inícios de checkout, divide pelas visualizações da página e multiplica por 100. Se 1.000 pessoas visualizaram a página e 200 iniciaram checkout, seu PV–IC foi 20%.",
            formula: "PV–IC = inícios de checkout ÷ visualizações da página × 100",
            cards: [
              {
                label: "Exemplo 1",
                text: "1.000 visualizações e 200 checkouts iniciados = 20%."
              },
              {
                label: "Exemplo 2",
                text: "500 visualizações e 50 checkouts iniciados = 10%."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Uma página teve 1.000 visualizações e 150 inícios de checkout. Qual foi o PV–IC?",
            options: [
              {
                text: "1,5%",
                feedback: "Ficou baixo demais. 150 de 1.000 não é 1,5%; pensa como porcentagem de 1.000."
              },
              {
                text: "10%",
                feedback: "10% seria 100 inícios de checkout em 1.000 visualizações. Aqui foram 150."
              },
              {
                text: "15%",
                correct: true,
                feedback: "Boa. 150 dividido por 1.000 dá 0,15. Multiplicando por 100, temos 15%."
              },
              {
                text: "50%",
                feedback: "50% seria metade das pessoas iniciando checkout. Aqui foram 150 de 1.000."
              },
              {
                text: "150%",
                feedback: "Isso mistura número absoluto com porcentagem. PV–IC é uma taxa, não soma de eventos."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua do PV–IC",
            body: "Essa régua mostra se a página está conduzindo as pessoas para o checkout. Ela é muito usada para produtos de baixo ticket e ofertas diretas. Quanto menor o PV–IC, maior o sinal de que a página não está gerando intenção de compra.",
            cards: [
              {
                label: "🟢 20% a 100%",
                status: "good",
                text: "Página saudável. A página está convencendo uma boa parte das pessoas a iniciar checkout."
              },
              {
                label: "🟡 15% a 20%",
                status: "warn",
                text: "Conversão morna. Existe interesse, mas a página ainda pode melhorar."
              },
              {
                label: "🔴 Abaixo de 15%",
                status: "bad",
                text: "Página fraca. A pessoa chega, mas não sente vontade suficiente de avançar."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua do PV–IC",
            question: "Na régua do Tabelingo, um PV–IC de 12% indica o quê?",
            options: [
              {
                text: "Página fraca. Está abaixo de 15%.",
                correct: true,
                feedback: "Certo. Abaixo de 15% é sinal de página fraca ou oferta/persuasão com problema."
              },
              {
                text: "Página saudável.",
                feedback: "Página saudável começa em 20% na régua base. 12% está abaixo da faixa mínima."
              },
              {
                text: "Conversão morna.",
                feedback: "Conversão morna fica entre 15% e 20%. 12% ainda está abaixo disso."
              },
              {
                text: "Checkout perfeito.",
                feedback: "PV–IC ainda nem mede compra final. Ele mede se a página leva para o checkout."
              },
              {
                text: "CPM baixo garantido.",
                feedback: "PV–IC não fala de custo para aparecer. Isso é outra etapa do funil."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "O que PV–IC bom indica?",
            body: "PV–IC bom indica que a página está fazendo o trabalho dela: transformar interesse em intenção. A pessoa chegou, entendeu a promessa, viu valor na oferta e clicou para iniciar o checkout. Mas ainda não comemora venda: depois disso vem a métrica IC–Compras.",
            cards: [
              {
                label: "Sinal positivo",
                status: "good",
                text: "A promessa da página está clara."
              },
              {
                label: "Sinal positivo",
                status: "good",
                text: "O CTA está funcionando."
              },
              {
                label: "Próxima pergunta",
                text: "Quem iniciou checkout está realmente comprando?"
              }
            ]
          },
          {
            type: "quiz",
            title: "PV–IC saudável",
            question: "Se o PV–IC está em 26%, qual leitura faz mais sentido?",
            options: [
              {
                text: "A página parece saudável na passagem para o checkout, mas ainda preciso olhar IC–Compras.",
                correct: true,
                feedback: "Perfeito. PV–IC bom mostra intenção, mas a venda final depende do checkout converter."
              },
              {
                text: "A campanha está 100% validada e não precisa olhar mais nada.",
                feedback: "Nenhuma etapa sozinha valida o sistema inteiro. Depois do PV–IC vem checkout, CPA e ROAS."
              },
              {
                text: "O CPC obrigatoriamente está baixo.",
                feedback: "PV–IC não diz o custo do clique. Ele fala da página conduzindo para checkout."
              },
              {
                text: "O checkout está obrigatoriamente perfeito.",
                feedback: "Ainda não dá para afirmar. PV–IC mede início de checkout, não compra final."
              },
              {
                text: "O tráfego nem chegou na página.",
                feedback: "Se existe PV–IC, estamos analisando pessoas que já visualizaram a página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "O que PV–IC baixo indica?",
            body: "PV–IC baixo indica que a página não está convencendo o suficiente. Pode ser promessa genérica, benefício pouco claro, falta de prova social, CTA fraco, excesso de informação, oferta confusa ou falta de confiança. O tráfego chegou, mas a página não empurrou para a próxima etapa.",
            cards: [
              {
                label: "Problema de promessa",
                text: "A pessoa não entende rápido por que deveria querer aquilo."
              },
              {
                label: "Problema de oferta",
                text: "Preço, bônus, garantia ou entrega podem não parecer bons o bastante."
              },
              {
                label: "Problema de confiança",
                text: "Falta prova social, autoridade, garantia ou clareza."
              },
              {
                label: "Problema de CTA",
                text: "O botão não aparece, não convence ou não guia a pessoa."
              }
            ]
          },
          {
            type: "quiz",
            title: "PV–IC baixo",
            question: "Qual alternativa combina com PV–IC baixo?",
            options: [
              {
                text: "A página recebe tráfego, mas não convence a pessoa a iniciar checkout.",
                correct: true,
                feedback: "Isso. PV–IC baixo mostra falha na persuasão da página ou na força da oferta."
              },
              {
                text: "O anúncio não apareceu para ninguém.",
                feedback: "Isso seria problema antes, no topo. PV–IC existe depois que a pessoa chegou na página."
              },
              {
                text: "O checkout está convertendo 100%.",
                feedback: "PV–IC não mede conclusão de compra. Mede só o início do checkout."
              },
              {
                text: "O CPM está obrigatoriamente baixo.",
                feedback: "CPM mede custo de impressão. PV–IC mede página conduzindo para checkout."
              },
              {
                text: "O CPC sempre precisa ser ignorado.",
                feedback: "CPC não deve ser ignorado. Mas PV–IC analisa outra etapa do funil."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Ticket e oferta mudam a exigência",
            body: "A régua base é um guia, mas ticket e oferta mudam a leitura. Produto barato e direto costuma precisar de mais gente iniciando checkout. Produto mais caro pode ter uma jornada mais pesada, mas ainda precisa mostrar intenção clara. O segredo é não olhar PV–IC isolado: olhe junto com CPA, margem e IC–Compras.",
            dynamicNote: "pvIcTicketContext",
            cards: [
              {
                label: "Produto barato",
                text: "Normalmente precisa de volume e pouca fricção para avançar para checkout."
              },
              {
                label: "Produto caro",
                text: "Pode ter menos gente iniciando checkout, mas precisa compensar com margem e fechamento."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ticket e PV–IC",
            question: "Por que a régua do PV–IC não deve ser usada como verdade absoluta?",
            options: [
              {
                text: "Porque ticket, margem, oferta e fechamento mudam a leitura do funil.",
                correct: true,
                feedback: "Exatamente. A régua ajuda, mas a decisão real depende do sistema inteiro."
              },
              {
                text: "Porque PV–IC nunca importa.",
                feedback: "Importa muito. O erro é usar sozinho como se explicasse tudo."
              },
              {
                text: "Porque produto caro sempre converte melhor.",
                feedback: "Produto caro pode ter mais margem, mas não converte automaticamente. Oferta e confiança pesam muito."
              },
              {
                text: "Porque checkout não influencia nada.",
                feedback: "Checkout influencia sim. PV–IC mede antes dele; IC–Compras mede depois."
              },
              {
                text: "Porque CPC substitui PV–IC.",
                feedback: "CPC e PV–IC medem etapas diferentes. Um não substitui o outro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "O que ajustar quando PV–IC está baixo?",
            body: "A ordem certa é melhorar clareza e desejo. Primeiro headline direta. Depois benefício específico. Depois prova social. Depois CTA visível e repetido. Depois garantia. A página não precisa ser bonita; ela precisa fazer a pessoa entender, confiar e avançar.",
            cards: [
              {
                label: "1. Headline",
                text: "Promessa direta e fácil de entender."
              },
              {
                label: "2. Benefício",
                text: "Mostrar o ganho real, não só característica."
              },
              {
                label: "3. Prova social",
                text: "Depoimentos, avaliações, antes/depois permitido, autoridade."
              },
              {
                label: "4. CTA",
                text: "Botão claro, visível e repetido nos pontos certos."
              },
              {
                label: "5. Garantia",
                text: "Reduzir risco percebido e aumentar confiança."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ação prática",
            question: "PV–IC está em 9%. Qual ação faz mais sentido?",
            options: [
              {
                text: "Melhorar promessa, benefício, prova social, CTA e garantia da página.",
                correct: true,
                feedback: "Boa. PV–IC baixo pede ajuste de persuasão e clareza da página/oferta."
              },
              {
                text: "Aumentar orçamento para mandar mais tráfego para a página fraca.",
                feedback: "Se a página não conduz, mais tráfego só aumenta desperdício."
              },
              {
                text: "Ignorar a página e mexer só no checkout.",
                feedback: "Checkout vem depois. Primeiro a pessoa precisa querer iniciar o checkout."
              },
              {
                text: "Pausar tudo sem analisar mais nada.",
                feedback: "Pode até pausar para evitar gasto, mas o diagnóstico pede entender o que falha na página."
              },
              {
                text: "Trocar apenas o público e manter a página igual para sempre.",
                feedback: "Público pode influenciar, mas se o tráfego chegou e não avança, a página precisa ser investigada."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "Como cruzar PV–IC com Taxa de Visualização",
            body: "A Taxa de Visualização diz se o clique chegou na página. O PV–IC diz se a página convenceu a pessoa a iniciar checkout. Se a visualização está boa e o PV–IC está baixo, o problema provavelmente está na página ou na oferta. Se a visualização está baixa, ainda é cedo para culpar a página.",
            cards: [
              {
                label: "Visualização boa + PV–IC baixo",
                status: "bad",
                text: "Tráfego chegou, mas página não convenceu."
              },
              {
                label: "Visualização baixa + PV–IC baixo",
                status: "warn",
                text: "Primeiro resolva a chegada na página antes de julgar a persuasão."
              },
              {
                label: "Visualização boa + PV–IC bom",
                status: "good",
                text: "Ponte e página parecem saudáveis. Próximo: IC–Compras."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico cruzado",
            question: "Taxa de Visualização boa, mas PV–IC baixo. Qual leitura faz mais sentido?",
            options: [
              {
                text: "O tráfego está chegando, mas a página/oferta não está convencendo a iniciar checkout.",
                correct: true,
                feedback: "Perfeito. Quando a chegada está boa e o avanço está ruim, a página vira o principal suspeito."
              },
              {
                text: "O problema está obrigatoriamente antes do clique.",
                feedback: "Se a visualização está boa, o clique está chegando na página. O gargalo aparece depois."
              },
              {
                text: "O checkout é o único culpado.",
                feedback: "Ainda não. A pessoa nem está iniciando checkout em volume saudável."
              },
              {
                text: "A campanha está perfeita.",
                feedback: "Não. PV–IC baixo mostra gargalo na página/oferta."
              },
              {
                text: "O CPM sempre está alto.",
                feedback: "CPM pode até estar alto, mas essa combinação fala principalmente da página conduzindo pouco."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo PV–IC amassado",
            body: "Agora você sabe medir se a página transforma visita em intenção de compra. Se o tráfego chega e o PV–IC é baixo, a página/oferta precisa trabalhar melhor. Próximo módulo natural: IC–Compras, a porta final entre checkout e compra.",
            xp: 120
          }
        ]
      }
