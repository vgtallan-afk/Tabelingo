// Módulo 12 — Ticket Médio
// Objeto pronto para colar dentro do array MODULES.

{
        id: "ticket-medio",
        title: "Ticket Médio: quanto entra por venda?",
        metric: "Ticket",
        description: "Aprenda a calcular o valor médio de cada pedido e por que ele muda CPA, ROAS, escala e lucro.",
        xp: 120,
        difficulty: "Básico",
        estimatedMinutes: 15,
        requiresTicket: true,
        screens: [
          {
            type: "setup",
            eyebrow: "Configuração rápida",
            saveAs: "ticket",
            title: "Qual é o ticket médio do seu produto ou kit?",
            body: "Ticket médio é quanto entra, em média, por venda. Se você vende kits, combos ou produtos com variação de preço, não use só o preço de um item isolado. Use o valor médio real que costuma cair por pedido.",
            placeholder: "Ex: 79,90",
            buttonText: "Salvar ticket médio ✅",
            note: "Esse valor vai ser usado em exemplos futuros de CPA, ROAS, escala e margem. Se ainda não souber exato, coloca uma estimativa honesta."
          },
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é Ticket Médio?",
            body: "Ticket médio é o valor médio que cada cliente deixa em uma compra. Não é necessariamente o preço de um produto. Se uma pessoa compra uma unidade por R$ 49 e outra compra um kit por R$ 147, o ticket médio mostra a média real dos pedidos.",
            formula: "Ticket Médio = receita total ÷ número de pedidos",
            dynamicNote: "ticketMedioContext",
            cards: [
              {
                label: "Preço do produto",
                text: "Valor de um item específico."
              },
              {
                label: "Ticket médio",
                text: "Média real do dinheiro que entra por pedido."
              },
              {
                label: "Por que importa",
                text: "Ele muda quanto você consegue pagar para vender."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ticket sem confundir",
            question: "O que o ticket médio mostra?",
            options: [
              {
                text: "O valor médio que entra por pedido/venda.",
                correct: true,
                feedback: "Isso. Ticket médio é a média de receita por pedido."
              },
              {
                text: "Quanto você paga por clique.",
                feedback: "Isso é CPC. Ticket médio fala do valor da venda, não do custo do clique."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Isso é CPM. Ticket médio fica na receita por pedido."
              },
              {
                text: "A porcentagem de checkouts que viram compra.",
                feedback: "Isso é IC–Compras. Ticket médio é valor médio de pedido."
              },
              {
                text: "A frequência média que a pessoa viu o anúncio.",
                feedback: "Isso é Frequência. Ticket médio fala de dinheiro que entra por venda."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A conta do Ticket Médio",
            body: "A fórmula é receita total dividida pelo número de pedidos. Se você faturou R$ 1.000 com 20 pedidos, seu ticket médio foi R$ 50. Isso mostra quanto cada pedido trouxe, em média.",
            formula: "Ticket Médio = receita total ÷ pedidos",
            cards: [
              {
                label: "Exemplo 1",
                text: "R$ 1.000 de receita ÷ 20 pedidos = ticket médio de R$ 50."
              },
              {
                label: "Exemplo 2",
                text: "R$ 3.000 de receita ÷ 30 pedidos = ticket médio de R$ 100."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Você faturou R$ 2.400 com 40 pedidos. Qual foi o ticket médio?",
            options: [
              {
                text: "R$ 24",
                feedback: "R$ 24 ficou baixo. Multiplica 24 por 40: daria R$ 960, não R$ 2.400."
              },
              {
                text: "R$ 40",
                feedback: "R$ 40 seria R$ 1.600 de receita em 40 pedidos. Aqui foi R$ 2.400."
              },
              {
                text: "R$ 60",
                correct: true,
                feedback: "Boa. R$ 2.400 dividido por 40 pedidos dá ticket médio de R$ 60."
              },
              {
                text: "R$ 120",
                feedback: "R$ 120 seria R$ 4.800 em 40 pedidos. Passou do valor real."
              },
              {
                text: "R$ 2.400",
                feedback: "Esse é o faturamento total. Ticket médio precisa dividir pelos pedidos."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "Ticket médio muda o CPA que você aguenta",
            body: "Quanto maior o ticket médio, mais espaço você pode ter para pagar tráfego, desde que a margem acompanhe. Produto de R$ 39,90 não aguenta o mesmo CPA que um kit de R$ 197. Por isso é perigoso copiar régua de outra pessoa sem olhar seu próprio ticket.",
            cards: [
              {
                label: "Ticket baixo",
                status: "warn",
                text: "Precisa controlar CPA com mais força ou vender em volume."
              },
              {
                label: "Ticket alto",
                status: "good",
                text: "Pode suportar CPA maior, se margem e conversão forem saudáveis."
              },
              {
                label: "Pegadinha",
                status: "bad",
                text: "Ticket alto com margem baixa também quebra. Não é só preço; é quanto sobra."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ticket e CPA",
            question: "Por que um kit de R$ 197 pode suportar CPA maior que um produto de R$ 39,90?",
            options: [
              {
                text: "Porque entra mais receita por pedido, desde que a margem também permita.",
                correct: true,
                feedback: "Perfeito. Ticket maior pode abrir espaço para CPA maior, mas margem ainda manda na decisão final."
              },
              {
                text: "Porque produto caro sempre vende fácil.",
                feedback: "Não. Produto caro pode exigir mais confiança e prova. Ticket maior não garante conversão."
              },
              {
                text: "Porque CPA não importa em produto caro.",
                feedback: "CPA importa sempre. A diferença é que o limite pode ser maior se a margem permitir."
              },
              {
                text: "Porque CPC substitui margem.",
                feedback: "CPC mede clique. Margem mostra quanto sobra para pagar tráfego."
              },
              {
                text: "Porque ROAS deixa de existir.",
                feedback: "ROAS continua importante. Ticket apenas muda a leitura da conta."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "Ticket médio e ROAS de equilíbrio",
            body: "ROAS depende de receita, mas a leitura real depende da margem. Se seu ticket é R$ 100 e seu CPA máximo é R$ 25, você precisa de uma conta bem diferente de quem vende ticket R$ 300 e aguenta CPA R$ 80. Ticket médio ajuda a estimar o quanto a campanha precisa devolver.",
            cards: [
              {
                label: "Ticket",
                text: "Quanto entra por pedido."
              },
              {
                label: "CPA máximo",
                text: "Quanto você pode pagar para gerar uma venda."
              },
              {
                label: "ROAS de equilíbrio",
                text: "Quanto o anúncio precisa devolver para a conta não ficar negativa."
              }
            ],
            dynamicNote: "roasTicketContext"
          },
          {
            type: "quiz",
            title: "Ticket e ROAS",
            question: "Por que ticket médio sozinho não prova lucro?",
            options: [
              {
                text: "Porque ainda falta descontar custos, margem, taxas, frete e CPA.",
                correct: true,
                feedback: "Isso. Ticket mostra receita por pedido, mas lucro depende do que sobra depois dos custos."
              },
              {
                text: "Porque ticket médio nunca importa.",
                feedback: "Importa muito. Só não pode ser lido sozinho."
              },
              {
                text: "Porque todo ticket alto dá prejuízo.",
                feedback: "Não necessariamente. Ticket alto pode ser ótimo se margem e conversão fecham."
              },
              {
                text: "Porque CTR substitui o ticket.",
                feedback: "CTR mede clique. Ticket mede valor médio de pedido."
              },
              {
                text: "Porque frequência é a única métrica financeira.",
                feedback: "Frequência mede repetição de anúncio. Não é métrica financeira."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "Ticket baixo: jogo de volume e eficiência",
            body: "Com ticket baixo, cada venda deixa menos espaço para pagar anúncio. Então o funil precisa ser mais eficiente: CPC controlado, página direta, checkout rápido e CPA bem abaixo do limite. O erro é tentar vender produto barato com custo de aquisição de produto premium.",
            cards: [
              {
                label: "O que pesa",
                text: "CPC alto e checkout ruim machucam mais rápido."
              },
              {
                label: "O que ajuda",
                text: "Kit, combo, desconto progressivo e aumento de unidades por pedido."
              },
              {
                label: "Regra",
                text: "Quanto menor o ticket, menos espaço para erro na mídia."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ticket baixo",
            question: "Produto de ticket baixo normalmente exige o quê?",
            options: [
              {
                text: "CPA mais controlado, funil eficiente e tentativa de aumentar valor do pedido.",
                correct: true,
                feedback: "Boa. Ticket baixo precisa de eficiência e, muitas vezes, estratégia para subir o valor médio."
              },
              {
                text: "CPA infinito, porque o produto é barato.",
                feedback: "É o contrário. Produto barato geralmente aguenta menos CPA."
              },
              {
                text: "Checkout mais difícil.",
                feedback: "Checkout difícil derruba conversão. Ticket baixo precisa de pouca fricção."
              },
              {
                text: "Ignorar margem.",
                feedback: "Margem é ainda mais importante quando o ticket é baixo."
              },
              {
                text: "ROAS sempre negativo.",
                feedback: "Não necessariamente. Pode ser lucrativo se CPA, margem e volume fecharem."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Ticket alto: jogo de confiança",
            body: "Com ticket alto, você pode ter mais espaço para CPA, mas a venda costuma exigir mais confiança. A pessoa pensa mais antes de pagar. A página precisa explicar melhor, provar mais, reduzir risco e mostrar por que vale o preço.",
            cards: [
              {
                label: "O que pesa",
                text: "Falta de prova, garantia fraca e oferta confusa."
              },
              {
                label: "O que ajuda",
                text: "Prova social, garantia, parcelamento, bônus e clareza de transformação."
              },
              {
                label: "Regra",
                text: "Quanto maior o ticket, maior precisa ser a confiança."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ticket alto",
            question: "Produto de ticket alto normalmente precisa de quê?",
            options: [
              {
                text: "Mais confiança, prova, garantia e clareza de valor.",
                correct: true,
                feedback: "Exato. Ticket alto pode suportar CPA maior, mas exige mais segurança para converter."
              },
              {
                text: "Menos explicação e menos prova social.",
                feedback: "Geralmente é o contrário. Quanto maior o risco percebido, mais prova a pessoa quer."
              },
              {
                text: "Checkout cheio de surpresa.",
                feedback: "Taxa surpresa e confusão no checkout derrubam compra, ainda mais em ticket alto."
              },
              {
                text: "Ignorar IC–Compras.",
                feedback: "IC–Compras é crucial para saber se checkout está fechando."
              },
              {
                text: "CTR sempre baixo de propósito.",
                feedback: "CTR baixo limita volume. O ideal é clique qualificado, não desinteresse."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Como aumentar Ticket Médio",
            body: "Aumentar ticket médio não é só subir preço do nada. Você pode criar kit, combo, leve mais por menos, order bump, upsell, cross-sell, frete grátis acima de certo valor ou variações premium. A ideia é aumentar valor por pedido sem destruir conversão.",
            cards: [
              {
                label: "Kit/Combo",
                text: "Agrupar produtos para aumentar valor do pedido."
              },
              {
                label: "Order bump",
                text: "Oferta extra simples no checkout."
              },
              {
                label: "Upsell",
                text: "Oferta maior depois da compra ou antes de finalizar."
              },
              {
                label: "Frete grátis acima de X",
                text: "Incentiva a pessoa a adicionar mais ao carrinho."
              },
              {
                label: "Versão premium",
                text: "Opção mais completa para quem quer mais valor."
              }
            ]
          },
          {
            type: "quiz",
            title: "Aumentar ticket",
            question: "Qual ação tende a aumentar ticket médio sem depender só de subir preço?",
            options: [
              {
                text: "Criar kits, combos, order bump, upsell ou frete grátis acima de certo valor.",
                correct: true,
                feedback: "Perfeito. Isso aumenta valor por pedido com estratégia de oferta."
              },
              {
                text: "Esconder todos os benefícios da oferta.",
                feedback: "Isso tende a derrubar conversão, não aumentar ticket de forma saudável."
              },
              {
                text: "Remover todos os métodos de pagamento.",
                feedback: "Isso aumenta fricção e pode derrubar checkout."
              },
              {
                text: "Ignorar CPA e ROAS.",
                feedback: "Ticket médio precisa conversar com CPA e ROAS para saber se a conta fecha."
              },
              {
                text: "Aumentar preço aleatoriamente todo dia.",
                feedback: "Preço precisa de estratégia. Subir sem oferta clara pode derrubar conversão."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "Ticket médio no diagnóstico cruzado",
            body: "Quando tudo parece funcionar, mas CPA e ROAS não fecham, ticket médio pode ser o gargalo financeiro. A campanha até vende, mas o pedido médio é baixo demais para sustentar o custo de aquisição. Nesse caso, a correção pode não ser criativo nem página: pode ser oferta.",
            cards: [
              {
                label: "Funil bom + CPA caro",
                status: "warn",
                text: "Talvez o ticket/margem não aguente o custo."
              },
              {
                label: "ROAS baixo + ticket baixo",
                status: "bad",
                text: "Pode faltar valor por pedido para sustentar tráfego."
              },
              {
                label: "Ticket sobe + CPA controlado",
                status: "good",
                text: "Mais espaço para escala e margem."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico com ticket",
            question: "Página e checkout estão saudáveis, mas CPA não cabe e ROAS fica apertado. Qual suspeita faz sentido?",
            options: [
              {
                text: "Ticket médio/margem/oferta podem estar baixos para sustentar o custo de aquisição.",
                correct: true,
                feedback: "Boa. Quando o funil converte mas a conta não fecha, olhe matemática da oferta."
              },
              {
                text: "A página obrigatoriamente não convence ninguém.",
                feedback: "Se página está saudável, esse não é o principal suspeito."
              },
              {
                text: "Checkout obrigatoriamente não fecha nenhuma compra.",
                feedback: "Se checkout está saudável, o gargalo não está necessariamente ali."
              },
              {
                text: "CPC sempre será zero.",
                feedback: "Não existe essa conclusão. O problema aqui é financeiro/oferta."
              },
              {
                text: "Escalar sem mexer em nada.",
                feedback: "Se a conta está apertada, escalar pode multiplicar o aperto."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo Ticket Médio amassado",
            body: "Agora você sabe que ticket médio muda a leitura de CPA, ROAS, escala e margem. Venda não é tudo igual: quanto entra por pedido define quanto espaço você tem para comprar tráfego. Próximo módulo natural: Margem de Lucro.",
            xp: 120
          }
        ]
      }
