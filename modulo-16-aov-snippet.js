// Módulo 16 — AOV
// Objeto pronto para colar dentro do array MODULES.

{
        id: "aov",
        title: "AOV: aumenta o carrinho ou morre no CPA",
        metric: "AOV",
        description: "Aprenda a aumentar o valor médio do pedido para dar mais espaço ao CPA, ROAS e escala.",
        xp: 130,
        difficulty: "Intermediário",
        estimatedMinutes: 16,
        requiresTicket: true,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é AOV?",
            body: "AOV significa Average Order Value, ou Valor Médio do Pedido. Na prática, é muito parecido com ticket médio: mostra quanto cada pedido gera, em média. A diferença é que AOV costuma ser usado no ecommerce para pensar no carrinho, kits, combos, upsells e aumento de valor por pedido.",
            formula: "AOV = receita total ÷ número de pedidos",
            dynamicNote: "aovContext",
            cards: [
              {
                label: "Ticket médio",
                text: "Nome comum no marketing e vendas."
              },
              {
                label: "AOV",
                text: "Nome comum em ecommerce e análise de pedidos."
              },
              {
                label: "A ideia",
                text: "Quanto mais entra por pedido, mais espaço você pode ter para pagar aquisição."
              }
            ]
          },
          {
            type: "quiz",
            title: "AOV sem confundir",
            question: "O que o AOV mostra?",
            options: [
              {
                text: "O valor médio gerado por cada pedido.",
                correct: true,
                feedback: "Isso. AOV é receita total dividida pelo número de pedidos."
              },
              {
                text: "Quanto custa cada clique.",
                feedback: "Isso é CPC. AOV fala de valor do pedido, não de custo do clique."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Isso é CPM. AOV é métrica de receita por pedido."
              },
              {
                text: "A porcentagem de pessoas que iniciam checkout.",
                feedback: "Isso é PV–IC. AOV mostra dinheiro médio por pedido."
              },
              {
                text: "Quantas vezes a pessoa viu o anúncio.",
                feedback: "Isso é frequência. AOV mede valor médio do pedido."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A conta do AOV",
            body: "A conta é simples: receita total dividida pelo número de pedidos. Se a loja faturou R$ 5.000 com 100 pedidos, o AOV foi R$ 50. Se faturou R$ 7.500 com 100 pedidos, o AOV foi R$ 75.",
            formula: "AOV = receita total ÷ pedidos",
            cards: [
              {
                label: "Exemplo 1",
                text: "R$ 5.000 ÷ 100 pedidos = AOV de R$ 50."
              },
              {
                label: "Exemplo 2",
                text: "R$ 7.500 ÷ 100 pedidos = AOV de R$ 75."
              },
              {
                label: "Leitura",
                text: "Mesmo número de pedidos, mais receita por pedido."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Uma loja faturou R$ 9.000 com 120 pedidos. Qual foi o AOV?",
            options: [
              {
                text: "R$ 45",
                feedback: "R$ 45 daria R$ 5.400 em 120 pedidos. O faturamento foi maior."
              },
              {
                text: "R$ 75",
                correct: true,
                feedback: "Boa. R$ 9.000 dividido por 120 pedidos dá AOV de R$ 75."
              },
              {
                text: "R$ 90",
                feedback: "R$ 90 daria R$ 10.800 em 120 pedidos. Passou do valor real."
              },
              {
                text: "R$ 120",
                feedback: "R$ 120 é o número de pedidos, não o valor médio por pedido."
              },
              {
                text: "R$ 9.000",
                feedback: "Esse é o faturamento total. AOV precisa dividir pelos pedidos."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "Por que AOV é arma de escala?",
            body: "AOV maior pode abrir mais espaço para pagar tráfego, porque cada venda traz mais receita. Se o CPA fica igual e o AOV sobe, a campanha pode ficar mais lucrativa. Mas cuidado: AOV só ajuda se a margem acompanhar e se a conversão não despencar.",
            cards: [
              {
                label: "AOV sobe + CPA igual",
                status: "good",
                text: "Pode sobrar mais dinheiro por pedido."
              },
              {
                label: "AOV sobe + conversão despenca",
                status: "bad",
                text: "Pode perder volume e piorar CPA."
              },
              {
                label: "AOV sobe + margem baixa",
                status: "warn",
                text: "Receita aumenta, mas talvez não sobre lucro."
              }
            ]
          },
          {
            type: "quiz",
            title: "AOV e escala",
            question: "Por que aumentar AOV pode ajudar na escala?",
            options: [
              {
                text: "Porque cada pedido pode trazer mais receita e abrir mais espaço para CPA, se a margem acompanhar.",
                correct: true,
                feedback: "Perfeito. AOV maior ajuda quando aumenta a sobra real por pedido."
              },
              {
                text: "Porque AOV maior sempre aumenta conversão.",
                feedback: "Não. Às vezes um pedido maior pode reduzir conversão se a oferta não for boa."
              },
              {
                text: "Porque AOV substitui CPA.",
                feedback: "AOV não substitui CPA. Você precisa dos dois para entender lucro."
              },
              {
                text: "Porque margem deixa de importar.",
                feedback: "Margem continua mandando. Receita maior sem margem não resolve."
              },
              {
                text: "Porque CTR vira desnecessário.",
                feedback: "CTR ainda importa para gerar clique. AOV atua no valor do pedido."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "AOV alto pode enganar",
            body: "AOV alto parece lindo, mas pode enganar. Se você força kits caros e a conversão cai demais, o CPA pode subir. Se o produto adicional tem margem ruim, o pedido cresce mas o lucro não. AOV bom é AOV que aumenta lucro, não só faturamento.",
            cards: [
              {
                label: "AOV de vaidade",
                status: "bad",
                text: "Pedido maior, mas lucro não melhora."
              },
              {
                label: "AOV saudável",
                status: "good",
                text: "Pedido maior, margem preservada e CPA controlado."
              },
              {
                label: "Pegadinha",
                text: "Aumentar pedido não pode destruir conversão."
              }
            ]
          },
          {
            type: "quiz",
            title: "AOV enganoso",
            question: "AOV subiu, mas CPA dobrou e a margem caiu. Qual leitura faz mais sentido?",
            options: [
              {
                text: "O AOV cresceu, mas a estratégia pode estar piorando lucro real.",
                correct: true,
                feedback: "Boa. AOV maior não vale se CPA sobe demais e margem cai."
              },
              {
                text: "A campanha está perfeita porque AOV subiu.",
                feedback: "AOV sozinho não valida nada. Precisa olhar CPA, margem e conversão."
              },
              {
                text: "Margem não importa mais.",
                feedback: "Margem importa ainda mais quando você mexe em pedido e oferta."
              },
              {
                text: "CPA alto sempre é bom.",
                feedback: "CPA alto só é aceitável se couber na margem e no objetivo."
              },
              {
                text: "ROAS é garantidamente excelente.",
                feedback: "Não dá para garantir. Receita pode subir e lucro ainda piorar."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "Como aumentar AOV com kit",
            body: "Kit é uma das formas mais simples de aumentar AOV. Em vez de vender uma unidade, você oferece 2, 3 ou mais com uma vantagem clara. O segredo é o cliente sentir que o kit faz sentido, não que você só empurrou mais coisa no carrinho.",
            cards: [
              {
                label: "Kit básico",
                text: "Compre 2 unidades e economize."
              },
              {
                label: "Kit por uso",
                text: "Um para casa, um para bolsa, um para viagem."
              },
              {
                label: "Kit por variedade",
                text: "Cores, sabores, tamanhos ou versões diferentes."
              },
              {
                label: "Regra",
                text: "O kit precisa parecer útil, não forçado."
              }
            ]
          },
          {
            type: "quiz",
            title: "AOV com kit",
            question: "Qual é uma boa lógica para aumentar AOV com kit?",
            options: [
              {
                text: "Criar um kit útil, com vantagem clara e motivo real para comprar mais unidades.",
                correct: true,
                feedback: "Certo. Kit bom aumenta valor percebido e pedido sem parecer empurroterapia."
              },
              {
                text: "Obrigar todo cliente a comprar mais sem explicar benefício.",
                feedback: "Isso pode derrubar conversão. O kit precisa fazer sentido."
              },
              {
                text: "Aumentar preço sem aumentar valor percebido.",
                feedback: "Preço sem valor pode reduzir intenção de compra."
              },
              {
                text: "Remover o produto unitário sempre.",
                feedback: "Nem sempre. Às vezes manter unitário e kit cria escolha inteligente."
              },
              {
                text: "Ignorar margem do kit.",
                feedback: "Kit precisa aumentar valor e preservar margem."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Order bump e upsell",
            body: "Order bump é uma oferta extra simples no checkout. Upsell é uma oferta maior ou complementar antes/depois da compra. Eles aumentam AOV porque fazem o cliente adicionar algo a mais quando já está quente. Mas precisam ser relevantes, simples e fáceis de aceitar.",
            cards: [
              {
                label: "Order bump",
                text: "Adicional pequeno e fácil de aceitar no checkout."
              },
              {
                label: "Upsell",
                text: "Oferta complementar ou versão melhor."
              },
              {
                label: "Cross-sell",
                text: "Produto relacionado que combina com o pedido."
              },
              {
                label: "Regra",
                text: "A oferta extra precisa ser óbvia e útil."
              }
            ]
          },
          {
            type: "quiz",
            title: "Bump e upsell",
            question: "Qual exemplo combina melhor com order bump?",
            options: [
              {
                text: "Um adicional simples no checkout que complementa o produto principal.",
                correct: true,
                feedback: "Boa. Order bump é pequeno, relevante e fácil de adicionar."
              },
              {
                text: "Um anúncio para aparecer mil vezes.",
                feedback: "Isso tem relação com CPM, não com order bump."
              },
              {
                text: "Uma página que nunca oferece nada extra.",
                feedback: "Sem oferta extra, não existe bump."
              },
              {
                text: "Um checkout mais longo e confuso.",
                feedback: "Order bump precisa ser simples. Confusão derruba conversão."
              },
              {
                text: "Um desconto escondido que só aparece depois do pagamento.",
                feedback: "Bump precisa aparecer antes da finalização e ser claro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Frete grátis acima de X",
            body: "Frete grátis acima de um valor mínimo pode aumentar AOV porque incentiva a pessoa a adicionar mais itens. Exemplo: se o AOV atual é R$ 70, você pode testar frete grátis acima de R$ 99. A pessoa pensa: 'já estou perto, vou completar'.",
            cards: [
              {
                label: "AOV atual",
                text: "R$ 70."
              },
              {
                label: "Meta de carrinho",
                text: "Frete grátis acima de R$ 99."
              },
              {
                label: "Efeito esperado",
                text: "Cliente adiciona item para alcançar o benefício."
              },
              {
                label: "Cuidado",
                status: "warn",
                text: "O frete grátis precisa caber na margem."
              }
            ]
          },
          {
            type: "quiz",
            title: "Frete grátis estratégico",
            question: "Como usar frete grátis para aumentar AOV sem se ferrar?",
            options: [
              {
                text: "Definir um valor mínimo acima do AOV atual e garantir que a margem suporte o frete.",
                correct: true,
                feedback: "Perfeito. A meta precisa puxar carrinho maior sem destruir lucro."
              },
              {
                text: "Dar frete grátis para tudo, mesmo que a margem não aguente.",
                feedback: "Isso pode aumentar vendas e matar lucro ao mesmo tempo."
              },
              {
                text: "Colocar valor mínimo abaixo do AOV atual.",
                feedback: "Se está abaixo do AOV atual, não incentiva aumento de carrinho."
              },
              {
                text: "Esconder a regra do cliente.",
                feedback: "A regra precisa ser clara para incentivar a pessoa a adicionar itens."
              },
              {
                text: "Ignorar ticket, margem e CPA.",
                feedback: "Frete grátis precisa conversar com a conta completa."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "AOV no diagnóstico cruzado",
            body: "Quando CPA está no limite e ROAS está apertado, aumentar AOV pode ser a saída. Mas antes confirme que a página, checkout e margem aguentam. AOV é alavanca financeira: ele aumenta o tamanho do pedido para dar mais oxigênio ao funil.",
            cards: [
              {
                label: "CPA alto + AOV baixo",
                status: "warn",
                text: "Talvez falte valor por pedido para sustentar aquisição."
              },
              {
                label: "AOV sobe + margem sobe",
                status: "good",
                text: "Mais espaço para tráfego e escala."
              },
              {
                label: "AOV sobe + conversão cai",
                status: "bad",
                text: "Oferta extra pode estar pesada demais."
              },
              {
                label: "AOV sobe + CPA controlado",
                status: "good",
                text: "Candidato forte para escala."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico com AOV",
            question: "CPA está perto do limite, mas página e checkout estão bons. Qual teste pode ajudar a melhorar a conta?",
            options: [
              {
                text: "Testar kit, order bump, upsell ou frete grátis acima de um valor para aumentar AOV.",
                correct: true,
                feedback: "Boa. Se o funil funciona mas a conta está apertada, aumentar valor por pedido pode ajudar."
              },
              {
                text: "Aumentar CPA de propósito.",
                feedback: "CPA maior aperta mais a conta. A ideia é aumentar valor por pedido ou reduzir custo."
              },
              {
                text: "Deixar checkout mais confuso.",
                feedback: "Checkout confuso derruba IC–Compras e pode piorar CPA."
              },
              {
                text: "Reduzir o valor do pedido sem estratégia.",
                feedback: "Isso pode piorar ainda mais a capacidade de pagar tráfego."
              },
              {
                text: "Ignorar margem.",
                feedback: "AOV sem margem pode virar só faturamento bonito."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo AOV amassado",
            body: "Agora você sabe usar valor médio do pedido como alavanca de escala. AOV maior, com margem saudável e CPA controlado, dá mais oxigênio para tráfego. Próximo módulo natural: LTV, o valor do cliente ao longo do tempo.",
            xp: 130
          }
        ]
      }
