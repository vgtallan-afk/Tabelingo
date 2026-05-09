// Módulo 13 — Margem de Lucro
// Objeto pronto para colar dentro do array MODULES.

{
        id: "margem-lucro",
        title: "Margem de Lucro: venda não é dinheiro livre",
        metric: "Margem",
        description: "Aprenda quanto sobra de verdade por venda e por que isso manda no CPA, ROAS e escala.",
        xp: 130,
        difficulty: "Básico",
        estimatedMinutes: 16,
        requiresTicket: true,
        screens: [
          {
            type: "setup",
            eyebrow: "Configuração de margem",
            saveAs: "profitBeforeAds",
            title: "Quanto sobra por venda antes de pagar anúncio?",
            body: "Aqui você coloca quanto sobra depois de tirar custo do produto, embalagem, taxa, frete subsidiado e outras despesas variáveis, mas antes de pagar tráfego. Exemplo: vende por R$ 100, custos variáveis dão R$ 60, então sobra R$ 40 antes do anúncio.",
            placeholder: "Ex: 40,00",
            buttonText: "Salvar margem por venda ✅",
            note: "Se você não sabe o número exato, coloca uma estimativa conservadora. É melhor ser pessimista na conta do que se iludir com faturamento bonito."
          },
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é margem de lucro?",
            body: "Margem é o dinheiro que sobra depois de descontar custos. No tráfego pago, a margem mais útil é a sobra por venda antes do anúncio. É esse dinheiro que precisa pagar o CPA e ainda deixar lucro. Venda não é lucro. Faturamento não é lucro. Print bonito não paga boleto se a margem estiver apertada.",
            formula: "Sobra antes do tráfego = ticket médio - custos variáveis",
            dynamicNote: "marginContext",
            cards: [
              {
                label: "Ticket",
                text: "Quanto entra no pedido."
              },
              {
                label: "Custos variáveis",
                text: "Produto, taxa, frete subsidiado, embalagem, plataforma e outros custos por venda."
              },
              {
                label: "Margem antes do tráfego",
                text: "Quanto sobra para pagar anúncio e ainda lucrar."
              }
            ]
          },
          {
            type: "quiz",
            title: "Margem sem ilusão",
            question: "O que significa margem por venda antes do tráfego?",
            options: [
              {
                text: "Quanto sobra por venda depois dos custos variáveis e antes de pagar anúncio.",
                correct: true,
                feedback: "Isso. Esse é o valor que precisa bancar o CPA e ainda deixar lucro."
              },
              {
                text: "O valor total que o cliente pagou.",
                feedback: "Isso é ticket ou receita do pedido. Margem é o que sobra depois dos custos."
              },
              {
                text: "Quanto você paga por clique.",
                feedback: "Isso é CPC. Margem fala do dinheiro que sobra na venda."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Isso é CPM. Margem é conta financeira por venda."
              },
              {
                text: "A porcentagem de checkout que vira compra.",
                feedback: "Isso é IC–Compras. Margem mostra se sobra dinheiro depois dos custos."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A conta básica da margem",
            body: "A conta começa simples. Pega o ticket médio e tira tudo que custa para entregar aquela venda. O que sobra é a margem antes do tráfego. Se vende por R$ 100 e os custos variáveis são R$ 55, sobra R$ 45. Esse valor é o teto bruto para pagar anúncio.",
            formula: "Margem antes do tráfego = receita do pedido - custos variáveis",
            cards: [
              {
                label: "Exemplo 1",
                text: "Ticket R$ 100 - custos R$ 55 = sobra R$ 45."
              },
              {
                label: "Exemplo 2",
                text: "Ticket R$ 79,90 - custos R$ 48 = sobra R$ 31,90."
              },
              {
                label: "Importante",
                text: "Se o CPA chegar perto dessa sobra, seu lucro some."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Você vende por R$ 120 e tem R$ 72 de custos variáveis. Quanto sobra antes do tráfego?",
            options: [
              {
                text: "R$ 32",
                feedback: "Ainda não. R$ 120 menos R$ 72 não dá R$ 32."
              },
              {
                text: "R$ 48",
                correct: true,
                feedback: "Boa. R$ 120 - R$ 72 = R$ 48 de sobra antes do anúncio."
              },
              {
                text: "R$ 72",
                feedback: "R$ 72 são os custos variáveis, não a sobra."
              },
              {
                text: "R$ 120",
                feedback: "Esse é o valor da venda. Margem precisa descontar os custos."
              },
              {
                text: "R$ 192",
                feedback: "Essa conta somou receita e custos. Margem desconta, não soma."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "Margem percentual",
            body: "Além do valor em reais, você também pode olhar a margem em percentual. Se você vende por R$ 100 e sobra R$ 40, sua margem antes do tráfego é 40%. Isso ajuda a comparar produtos diferentes. Um produto de R$ 300 com 20% de margem pode sobrar menos do que parece.",
            formula: "Margem % = sobra antes do tráfego ÷ ticket médio × 100",
            cards: [
              {
                label: "Exemplo fácil",
                text: "Sobra R$ 40 em ticket de R$ 100 = margem de 40%."
              },
              {
                label: "Pegadinha",
                text: "Ticket alto com margem baixa pode ser pior que ticket menor com margem forte."
              }
            ]
          },
          {
            type: "quiz",
            title: "Margem percentual",
            question: "Ticket de R$ 200 e sobra antes do tráfego de R$ 80. Qual é a margem percentual?",
            options: [
              {
                text: "20%",
                feedback: "20% seria R$ 40 de sobra em R$ 200. Aqui sobram R$ 80."
              },
              {
                text: "40%",
                correct: true,
                feedback: "Certo. R$ 80 dividido por R$ 200 dá 0,4, ou seja, 40%."
              },
              {
                text: "60%",
                feedback: "60% seria R$ 120 de sobra em R$ 200. Aqui sobram R$ 80."
              },
              {
                text: "80%",
                feedback: "80% confundiu o valor em reais com percentual. R$ 80 não é 80% de R$ 200."
              },
              {
                text: "200%",
                feedback: "A margem não passa de 100% nesse caso. Ela é a sobra dividida pelo ticket."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "Margem e CPA: a conta que salva seu bolso",
            body: "Seu CPA precisa caber dentro da margem. Se sobra R$ 40 antes do tráfego e seu CPA é R$ 30, ainda sobra R$ 10 antes de outros ajustes. Se seu CPA é R$ 45, você está pagando mais para vender do que sobra por venda. Aí é venda com gosto de prejuízo.",
            dynamicNote: "marginCpaContext",
            cards: [
              {
                label: "🟢 CPA abaixo da margem",
                status: "good",
                text: "Existe espaço para lucro."
              },
              {
                label: "🟡 CPA perto da margem",
                status: "warn",
                text: "Quase ponto de equilíbrio. Pouca folga."
              },
              {
                label: "🔴 CPA acima da margem",
                status: "bad",
                text: "Prejuízo provável por venda."
              }
            ]
          },
          {
            type: "quiz",
            title: "Margem vs CPA",
            question: "Sobra R$ 40 por venda antes do tráfego. O CPA está em R$ 52. Qual leitura faz mais sentido?",
            options: [
              {
                text: "CPA está acima da margem e a venda tende a dar prejuízo.",
                correct: true,
                feedback: "Exato. Se sobra R$ 40 e você paga R$ 52 para vender, a conta não fecha."
              },
              {
                text: "Está perfeito, porque teve venda.",
                feedback: "Venda não é lucro. Se o CPA passa da margem, pode ser venda negativa."
              },
              {
                text: "O CPC obrigatoriamente está baixo.",
                feedback: "Não dá para saber o CPC por essa conta. Aqui estamos olhando margem e CPA."
              },
              {
                text: "O checkout está sempre saudável.",
                feedback: "Mesmo com checkout saudável, CPA acima da margem pode quebrar a conta."
              },
              {
                text: "ROAS não importa nunca.",
                feedback: "ROAS importa, mas precisa conversar com margem e CPA para saber lucro real."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "Margem baixa muda tudo",
            body: "Quando a margem é baixa, o funil precisa ser muito eficiente. Não dá para aceitar CPC caro, PV–IC ruim, checkout travando e CPA oscilando. Margem baixa é pista estreita: qualquer derrapada joga a campanha no barranco.",
            cards: [
              {
                label: "Margem baixa",
                status: "bad",
                text: "Pouco espaço para erro de tráfego."
              },
              {
                label: "O que precisa",
                text: "CPC controlado, página forte, checkout limpo e CPA baixo."
              },
              {
                label: "Risco",
                text: "ROAS bonito pode esconder lucro fraco."
              }
            ]
          },
          {
            type: "quiz",
            title: "Margem baixa",
            question: "Produto com margem baixa normalmente exige o quê?",
            options: [
              {
                text: "CPA muito controlado e funil mais eficiente.",
                correct: true,
                feedback: "Boa. Margem baixa deixa pouco espaço para erro."
              },
              {
                text: "CPA mais alto que a margem.",
                feedback: "Isso tende a gerar prejuízo por venda."
              },
              {
                text: "Ignorar custos variáveis.",
                feedback: "Custos variáveis são justamente o que define a margem."
              },
              {
                text: "Escalar qualquer campanha com uma venda.",
                feedback: "Margem baixa exige ainda mais cuidado antes de escalar."
              },
              {
                text: "Checkout mais complicado.",
                feedback: "Checkout complicado derruba conversão e piora CPA."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Margem alta não libera bagunça",
            body: "Margem alta é boa porque dá mais espaço para tráfego. Mas não é passe livre para campanha ruim. Se o CPA sobe sem controle, se o público satura ou se o checkout trava, a margem vai embora do mesmo jeito. Margem alta dá fôlego, não imunidade.",
            cards: [
              {
                label: "Vantagem",
                status: "good",
                text: "Pode suportar CPA maior e testes mais amplos."
              },
              {
                label: "Perigo",
                status: "warn",
                text: "Usar margem como desculpa para não otimizar."
              },
              {
                label: "Regra",
                text: "Margem alta precisa virar lucro, não desperdício elegante."
              }
            ]
          },
          {
            type: "quiz",
            title: "Margem alta",
            question: "Produto com margem alta significa o quê?",
            options: [
              {
                text: "Existe mais espaço para pagar tráfego, mas ainda precisa controlar CPA e funil.",
                correct: true,
                feedback: "Perfeito. Margem alta ajuda, mas não substitui diagnóstico."
              },
              {
                text: "Pode ignorar CPA para sempre.",
                feedback: "CPA continua mandando na eficiência da venda."
              },
              {
                text: "ROAS baixo sempre vira lucro.",
                feedback: "Não necessariamente. Margem ajuda, mas retorno ruim pode continuar quebrando a conta."
              },
              {
                text: "Não precisa de página nem checkout.",
                feedback: "Precisa sim. Página e checkout ruins desperdiçam margem."
              },
              {
                text: "CPC caro nunca importa.",
                feedback: "CPC caro pode empurrar CPA para cima e comer margem."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Como melhorar margem",
            body: "Melhorar margem pode ser mais poderoso que só tentar baratear clique. Você pode negociar fornecedor, reduzir custo de frete, melhorar embalagem, criar kits, aumentar ticket, vender produto complementar, reduzir taxa, melhorar preço ou cortar desperdício operacional.",
            cards: [
              {
                label: "Reduzir custo",
                text: "Fornecedor, frete, embalagem, taxa e operação."
              },
              {
                label: "Aumentar valor",
                text: "Kit, combo, versão premium, order bump e upsell."
              },
              {
                label: "Melhorar oferta",
                text: "Mais valor percebido para sustentar preço."
              },
              {
                label: "Cortar vazamento",
                text: "Menos reembolso, menos erro de entrega e menos suporte caótico."
              }
            ]
          },
          {
            type: "quiz",
            title: "Aumentar margem",
            question: "Qual ação pode melhorar margem de forma estratégica?",
            options: [
              {
                text: "Negociar custos, criar kits/upsells e aumentar valor percebido da oferta.",
                correct: true,
                feedback: "Certo. Margem melhora tanto reduzindo custo quanto aumentando valor por pedido."
              },
              {
                text: "Aumentar CPA acima do limite.",
                feedback: "Isso piora lucro. CPA maior consome margem."
              },
              {
                text: "Ignorar fornecedor, frete e taxas.",
                feedback: "Esses custos são parte central da margem."
              },
              {
                text: "Diminuir valor percebido da oferta.",
                feedback: "Isso pode derrubar conversão e dificultar preço."
              },
              {
                text: "Tornar o checkout mais difícil.",
                feedback: "Checkout difícil reduz compras e pode piorar custo por venda."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "Margem no diagnóstico cruzado",
            body: "Quando CPC, página e checkout parecem bons, mas o lucro não vem, a margem pode ser o gargalo. A campanha vende, mas o dinheiro evapora em custo de produto, frete, taxa e CPA. Nesse caso, corrigir criativo não basta. A solução pode estar na oferta e na estrutura financeira.",
            cards: [
              {
                label: "Funil saudável + lucro ruim",
                status: "warn",
                text: "Olhe margem, ticket e CPA máximo."
              },
              {
                label: "ROAS bom + caixa apertado",
                status: "bad",
                text: "Custos podem estar comendo o resultado."
              },
              {
                label: "Margem melhor + CPA controlado",
                status: "good",
                text: "Mais espaço para escalar com segurança."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico com margem",
            question: "Funil está saudável, ROAS parece bom, mas no caixa quase não sobra dinheiro. Qual suspeita é forte?",
            options: [
              {
                text: "Margem/custos estão comendo o resultado.",
                correct: true,
                feedback: "Boa. ROAS bonito sem sobra no caixa costuma apontar para custos e margem."
              },
              {
                text: "CTR é obrigatoriamente zero.",
                feedback: "Se o funil está saudável, CTR zerado não faz sentido nesse cenário."
              },
              {
                text: "A página não recebeu visita.",
                feedback: "O cenário diz que o funil está saudável; a suspeita aqui é financeira."
              },
              {
                text: "Checkout nunca converteu.",
                feedback: "Se há vendas e ROAS, checkout está convertendo algum volume."
              },
              {
                text: "Escalar sem olhar custo.",
                feedback: "Se quase não sobra, escalar pode aumentar faturamento e manter lucro ruim."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo Margem de Lucro amassado",
            body: "Agora você sabe que venda não é lucro. Margem é o que decide se CPA cabe, se ROAS presta e se escala faz sentido. Próximo módulo natural: Ponto de Equilíbrio Completo.",
            xp: 130
          }
        ]
      }
