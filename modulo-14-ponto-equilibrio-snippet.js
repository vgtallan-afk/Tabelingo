// Módulo 14 — Ponto de Equilíbrio
// Objeto pronto para colar dentro do array MODULES.

{
        id: "ponto-equilibrio",
        title: "Ponto de Equilíbrio: onde para de sangrar",
        metric: "Break-even",
        description: "Aprenda o limite exato entre campanha saudável, campanha apertada e campanha que vende dando prejuízo.",
        xp: 140,
        difficulty: "Intermediário",
        estimatedMinutes: 17,
        requiresTicket: true,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é ponto de equilíbrio?",
            body: "Ponto de equilíbrio é o lugar onde você não lucra e não perde. A venda paga os custos e o anúncio, mas não sobra dinheiro de verdade. É a linha do: 'daqui para cima começa a prestar; daqui para baixo começa a sangrar'.",
            dynamicNote: "breakEvenFullContext",
            cards: [
              {
                label: "Acima do equilíbrio",
                status: "good",
                text: "Existe lucro ou folga para crescer."
              },
              {
                label: "Em cima do equilíbrio",
                status: "warn",
                text: "A campanha se paga, mas não sobra quase nada."
              },
              {
                label: "Abaixo do equilíbrio",
                status: "bad",
                text: "A campanha vende, mas perde dinheiro."
              }
            ]
          },
          {
            type: "quiz",
            title: "Equilíbrio sem ilusão",
            question: "O que significa ponto de equilíbrio em uma campanha?",
            options: [
              {
                text: "O limite onde a venda paga custos e anúncio, mas ainda não gera lucro real.",
                correct: true,
                feedback: "Isso. Ponto de equilíbrio é a linha entre lucro e prejuízo."
              },
              {
                text: "O momento em que todo clique vira compra.",
                feedback: "Isso seria conversão absurda, não ponto de equilíbrio. Aqui estamos falando de conta financeira."
              },
              {
                text: "O valor do CPC ideal para qualquer produto.",
                feedback: "Ponto de equilíbrio não é CPC universal. Ele depende de ticket, margem e CPA."
              },
              {
                text: "A frequência média do anúncio.",
                feedback: "Frequência mede repetição. Ponto de equilíbrio mede limite financeiro."
              },
              {
                text: "O número de pessoas que viram a página.",
                feedback: "Isso é volume de página. Ponto de equilíbrio é sobre a campanha se pagar ou não."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "CPA de equilíbrio",
            body: "CPA de equilíbrio é o máximo que você pode pagar por venda sem perder dinheiro. Se sobra R$ 40 antes do anúncio, seu CPA de equilíbrio é R$ 40. Se pagar R$ 30 para vender, sobra R$ 10. Se pagar R$ 45, você vendeu e perdeu dinheiro.",
            formula: "CPA de equilíbrio ≈ sobra por venda antes do tráfego",
            cards: [
              {
                label: "Exemplo bom",
                status: "good",
                text: "Sobra R$ 40 e CPA real é R$ 28: ainda sobra R$ 12."
              },
              {
                label: "Exemplo no limite",
                status: "warn",
                text: "Sobra R$ 40 e CPA real é R$ 40: empatou, mas não lucrou."
              },
              {
                label: "Exemplo ruim",
                status: "bad",
                text: "Sobra R$ 40 e CPA real é R$ 55: prejuízo de R$ 15 por venda."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPA de equilíbrio",
            question: "Sobra R$ 50 por venda antes do anúncio. A campanha está com CPA de R$ 62. Qual leitura está correta?",
            options: [
              {
                text: "Está acima do ponto de equilíbrio e tende a dar prejuízo.",
                correct: true,
                feedback: "Certo. Se sobra R$ 50 e você paga R$ 62 para vender, a conta fica negativa."
              },
              {
                text: "Está perfeito porque vendeu.",
                feedback: "Venda não é lucro. Se o custo de vender passa da sobra, a venda machuca o caixa."
              },
              {
                text: "Está no ponto exato de equilíbrio.",
                feedback: "O ponto exato seria CPA de R$ 50. R$ 62 passou do limite."
              },
              {
                text: "O CPC obrigatoriamente está ótimo.",
                feedback: "CPA acima do limite não diz que CPC está ótimo. A leitura aqui é financeira."
              },
              {
                text: "ROAS não importa nessa análise.",
                feedback: "ROAS importa também, mas o CPA já mostra que o custo por venda passou do limite."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "ROAS de equilíbrio",
            body: "ROAS de equilíbrio é o ROAS mínimo para a campanha não ficar negativa. Ele depende do ticket e da margem. Se você vende por R$ 100 e só pode gastar R$ 25 para adquirir a venda, precisa de ROAS 4 para empatar.",
            formula: "ROAS de equilíbrio = ticket médio ÷ CPA de equilíbrio",
            cards: [
              {
                label: "Exemplo",
                text: "Ticket R$ 100 ÷ CPA de equilíbrio R$ 25 = ROAS mínimo 4."
              },
              {
                label: "Leitura",
                text: "Se ROAS real for menor que 4, a conta aperta."
              },
              {
                label: "Pegadinha",
                text: "ROAS 2 pode ser ótimo em um negócio e péssimo em outro."
              }
            ]
          },
          {
            type: "quiz",
            title: "ROAS mínimo",
            question: "Ticket médio R$ 120 e CPA de equilíbrio R$ 40. Qual é o ROAS de equilíbrio?",
            options: [
              {
                text: "ROAS 1",
                feedback: "ROAS 1 seria empatar receita com investimento, mas ainda ignoraria custos. Aqui usamos ticket dividido pelo CPA de equilíbrio."
              },
              {
                text: "ROAS 2",
                feedback: "ROAS 2 seria 120 dividido por 60. Aqui o CPA de equilíbrio é R$ 40."
              },
              {
                text: "ROAS 3",
                correct: true,
                feedback: "Boa. R$ 120 dividido por R$ 40 dá ROAS de equilíbrio 3."
              },
              {
                text: "ROAS 4",
                feedback: "ROAS 4 seria se o CPA de equilíbrio fosse R$ 30 com ticket de R$ 120."
              },
              {
                text: "ROAS 40",
                feedback: "Esse número confundiu CPA com ROAS. ROAS é uma razão, não o valor em reais."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "Por que ROAS 2 não é regra universal",
            body: "Muita gente fala 'ROAS acima de 2 é bom'. Só que isso é simplificação. Se sua margem é alta, ROAS 2 pode ser ótimo. Se sua margem é baixa, ROAS 2 pode ser prejuízo. A régua de ROAS só presta quando você sabe o ponto de equilíbrio.",
            cards: [
              {
                label: "Margem forte",
                status: "good",
                text: "Pode precisar de ROAS mínimo menor."
              },
              {
                label: "Margem apertada",
                status: "bad",
                text: "Pode precisar de ROAS mínimo muito maior."
              },
              {
                label: "Resumo",
                text: "ROAS bom é ROAS acima do seu equilíbrio, não acima do número dos outros."
              }
            ]
          },
          {
            type: "quiz",
            title: "ROAS universal é cilada",
            question: "Por que não dá para dizer que ROAS 2 é bom para todo mundo?",
            options: [
              {
                text: "Porque cada produto tem ticket, custos e margem diferentes.",
                correct: true,
                feedback: "Perfeito. ROAS só faz sentido comparado ao ponto de equilíbrio do negócio."
              },
              {
                text: "Porque ROAS nunca serve para nada.",
                feedback: "ROAS serve muito. O erro é usar uma régua genérica sem olhar custos."
              },
              {
                text: "Porque todo produto tem a mesma margem.",
                feedback: "Justamente o contrário. Margens variam muito."
              },
              {
                text: "Porque CPC substitui ROAS.",
                feedback: "CPC mede clique. ROAS mede retorno em receita."
              },
              {
                text: "Porque checkout não influencia venda.",
                feedback: "Checkout influencia sim, mas a pergunta é sobre ROAS e margem."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "Ponto de equilíbrio com lucro desejado",
            body: "Empatar não é meta. Empatar só evita sangrar. Se você quer lucro, precisa colocar uma folga. Exemplo: sobra R$ 50 antes do anúncio, mas você quer lucrar R$ 15 por venda. Então seu CPA alvo não é R$ 50; é R$ 35.",
            formula: "CPA alvo = sobra antes do tráfego - lucro desejado por venda",
            cards: [
              {
                label: "Sobra antes do tráfego",
                text: "R$ 50."
              },
              {
                label: "Lucro desejado",
                text: "R$ 15."
              },
              {
                label: "CPA alvo",
                status: "good",
                text: "R$ 35."
              }
            ]
          },
          {
            type: "quiz",
            title: "Lucro desejado",
            question: "Sobra R$ 60 antes do anúncio e você quer lucrar R$ 20 por venda. Qual deve ser o CPA alvo?",
            options: [
              {
                text: "R$ 20",
                feedback: "R$ 20 é o lucro desejado, não o CPA alvo. O CPA alvo é a sobra menos esse lucro."
              },
              {
                text: "R$ 40",
                correct: true,
                feedback: "Boa. R$ 60 de sobra - R$ 20 de lucro desejado = CPA alvo de R$ 40."
              },
              {
                text: "R$ 60",
                feedback: "R$ 60 é o ponto de equilíbrio. Se gastar tudo isso em CPA, não sobra o lucro desejado."
              },
              {
                text: "R$ 80",
                feedback: "R$ 80 passa da sobra e geraria prejuízo."
              },
              {
                text: "R$ 120",
                feedback: "Esse valor está muito acima da sobra. Não cabe na conta."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Break-even não é autorização para escalar",
            body: "Campanha no ponto de equilíbrio não está boa; ela só não está sangrando. Se você escala uma campanha que só empata, aumenta faturamento, aumenta trabalho e continua sem lucro. Escala boa precisa de folga: CPA abaixo do alvo, ROAS acima do equilíbrio e consistência.",
            cards: [
              {
                label: "Empatou",
                status: "warn",
                text: "Não perdeu, mas também não ganhou."
              },
              {
                label: "Lucrou com folga",
                status: "good",
                text: "Aí sim começa a fazer sentido pensar em escala."
              },
              {
                label: "Prejuízo",
                status: "bad",
                text: "Escalar multiplica o rombo."
              }
            ]
          },
          {
            type: "quiz",
            title: "Escala no equilíbrio",
            question: "Campanha está exatamente no ponto de equilíbrio. Qual decisão é mais madura?",
            options: [
              {
                text: "Ajustar para criar folga de lucro antes de escalar forte.",
                correct: true,
                feedback: "Isso. Empatar não é vitória de escala. Precisa sobrar dinheiro."
              },
              {
                text: "Escalar pesado porque empate é lucro.",
                feedback: "Empate não é lucro. Escalar empate aumenta operação sem aumentar resultado."
              },
              {
                text: "Ignorar margem para sempre.",
                feedback: "Margem é o coração do ponto de equilíbrio."
              },
              {
                text: "Aumentar CPA alvo acima da margem.",
                feedback: "Isso joga a conta para prejuízo."
              },
              {
                text: "Apagar todas as métricas do funil.",
                feedback: "As métricas são justamente o mapa para criar folga."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Como melhorar o ponto de equilíbrio",
            body: "Você melhora ponto de equilíbrio de duas formas: aumentando o que sobra ou reduzindo o custo para vender. Para aumentar o que sobra: melhora margem, ticket, kits, upsells. Para reduzir custo: melhora CPC, página, checkout, CPA e criativo.",
            cards: [
              {
                label: "Aumentar sobra",
                text: "Ticket maior, margem melhor, kit, combo, upsell e menos custo."
              },
              {
                label: "Reduzir CPA",
                text: "Criativo melhor, página melhor, checkout melhor e público melhor."
              },
              {
                label: "Melhor cenário",
                status: "good",
                text: "Ticket/margem sobem e CPA cai."
              }
            ]
          },
          {
            type: "quiz",
            title: "Melhorar equilíbrio",
            question: "Qual ação melhora o ponto de equilíbrio de forma mais completa?",
            options: [
              {
                text: "Aumentar margem/ticket e reduzir CPA com otimização do funil.",
                correct: true,
                feedback: "Perfeito. Você melhora os dois lados: sobra mais e custa menos vender."
              },
              {
                text: "Aumentar CPA acima da margem.",
                feedback: "Isso piora o ponto de equilíbrio e tende a gerar prejuízo."
              },
              {
                text: "Diminuir valor percebido da oferta.",
                feedback: "Isso pode derrubar conversão e reduzir capacidade de preço."
              },
              {
                text: "Ignorar checkout.",
                feedback: "Checkout ruim aumenta CPA e piora a conta."
              },
              {
                text: "Escalar antes de saber a margem.",
                feedback: "Sem margem, você não sabe onde fica o limite de prejuízo."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "Ponto de equilíbrio no diagnóstico cruzado",
            body: "Quando o funil parece bonito, mas o caixa não cresce, o ponto de equilíbrio revela a verdade. Talvez CPA esteja só empatando. Talvez ROAS pareça bom, mas fique abaixo do ROAS mínimo. Talvez a margem não aguente escala. É aqui que o app separa crescimento real de teatro de faturamento.",
            cards: [
              {
                label: "ROAS acima da régua, mas abaixo do equilíbrio",
                status: "bad",
                text: "Faturamento bonito, lucro suspeito."
              },
              {
                label: "CPA abaixo do equilíbrio",
                status: "good",
                text: "Existe espaço para lucro."
              },
              {
                label: "CPA no equilíbrio",
                status: "warn",
                text: "Empate. Precisa melhorar antes de escalar."
              },
              {
                label: "CPA acima do equilíbrio",
                status: "bad",
                text: "Prejuízo provável por venda."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico de equilíbrio",
            question: "Funil está vendendo, mas CPA fica sempre igual à sobra antes do tráfego. Qual leitura faz mais sentido?",
            options: [
              {
                text: "A campanha está empatando; precisa de folga para gerar lucro real.",
                correct: true,
                feedback: "Boa. Vender no ponto de equilíbrio não é perder, mas também não é lucrar."
              },
              {
                text: "A campanha está imprimindo dinheiro infinito.",
                feedback: "Não. Se CPA consome toda a sobra, não sobra lucro."
              },
              {
                text: "O CPC é obrigatoriamente zero.",
                feedback: "Essa conclusão não vem da análise de equilíbrio."
              },
              {
                text: "Não precisa olhar margem nunca mais.",
                feedback: "Margem é justamente o que define o equilíbrio."
              },
              {
                text: "Escalar forte sem ajustes é sempre seguro.",
                feedback: "Escalar empate geralmente aumenta trabalho sem aumentar lucro."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo Ponto de Equilíbrio amassado",
            body: "Agora você sabe onde a campanha para de sangrar e onde começa a sobrar dinheiro. A partir daqui, CPA, ROAS e margem deixam de ser números soltos e viram limite real de decisão. Próximo módulo natural: Lucro Líquido por Venda.",
            xp: 140
          }
        ]
      }
