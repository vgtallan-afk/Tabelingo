// Módulo 15 — Lucro Líquido por Venda
// Objeto pronto para colar dentro do array MODULES.

{
        id: "lucro-liquido-venda",
        title: "Lucro Líquido por Venda: sobrou ou só parece?",
        metric: "Lucro",
        description: "Aprenda a calcular quanto sobra depois da mídia e por que faturar bonito não significa ganhar dinheiro.",
        xp: 140,
        difficulty: "Intermediário",
        estimatedMinutes: 17,
        requiresTicket: true,
        screens: [
          {
            type: "setup",
            eyebrow: "Configuração de resultado",
            saveAs: "realCpa",
            title: "Qual é o CPA real médio da campanha?",
            body: "Coloque quanto você está pagando, em média, para gerar uma venda nessa campanha. Se a campanha gastou R$ 300 e fez 10 compras, o CPA real é R$ 30. Esse número vai ser usado para estimar se sobra lucro por venda.",
            placeholder: "Ex: 30,00",
            buttonText: "Salvar CPA real ✅",
            note: "Use o CPA real da campanha que você quer analisar. Se ainda não tiver vendas suficientes, coloque uma estimativa e depois atualize."
          },
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é lucro líquido por venda?",
            body: "Lucro líquido por venda é o que sobra depois de descontar tudo que precisa sair para aquela venda acontecer. No contexto do tráfego pago, a conta prática é: pega a sobra antes do anúncio e tira o CPA real. Se sobrou R$ 40 antes da mídia e o CPA foi R$ 25, o lucro líquido por venda é R$ 15.",
            formula: "Lucro líquido por venda = sobra antes do tráfego - CPA real",
            dynamicNote: "netProfitContext",
            cards: [
              {
                label: "Sobra antes do tráfego",
                text: "O dinheiro que resta depois dos custos variáveis."
              },
              {
                label: "CPA real",
                text: "Quanto custou gerar a venda."
              },
              {
                label: "Lucro líquido por venda",
                text: "O que realmente sobra depois da mídia."
              }
            ]
          },
          {
            type: "quiz",
            title: "Lucro sem ilusão",
            question: "O que é lucro líquido por venda no tráfego pago?",
            options: [
              {
                text: "O que sobra depois de descontar custos e CPA da venda.",
                correct: true,
                feedback: "Isso. É o dinheiro que realmente sobra depois da operação e da mídia."
              },
              {
                text: "O valor total que o cliente pagou.",
                feedback: "Isso é receita/ticket. Lucro líquido precisa descontar custos e CPA."
              },
              {
                text: "O custo de cada clique.",
                feedback: "Isso é CPC. Lucro líquido fala do dinheiro que sobra no final."
              },
              {
                text: "A quantidade de impressões do anúncio.",
                feedback: "Impressões são exposição. Lucro líquido é resultado financeiro."
              },
              {
                text: "A frequência média do anúncio.",
                feedback: "Frequência mede repetição. Lucro líquido mede sobra real por venda."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A conta básica",
            body: "A conta é curta, mas salva muito dinheiro. Se a venda deixa R$ 55 antes do tráfego e você pagou R$ 32 de CPA, sobram R$ 23. Se o CPA sobe para R$ 60, você vende, mas perde R$ 5 por venda.",
            formula: "Lucro líquido = margem antes do tráfego - CPA",
            cards: [
              {
                label: "Exemplo bom",
                status: "good",
                text: "Sobra R$ 55 e CPA R$ 32 = lucro de R$ 23."
              },
              {
                label: "Exemplo empatado",
                status: "warn",
                text: "Sobra R$ 55 e CPA R$ 55 = lucro R$ 0."
              },
              {
                label: "Exemplo ruim",
                status: "bad",
                text: "Sobra R$ 55 e CPA R$ 60 = prejuízo de R$ 5."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Sobra R$ 70 antes do tráfego e o CPA real é R$ 44. Qual é o lucro líquido por venda?",
            options: [
              {
                text: "R$ 14",
                feedback: "Ainda não. R$ 70 menos R$ 44 dá mais que R$ 14."
              },
              {
                text: "R$ 26",
                correct: true,
                feedback: "Boa. R$ 70 - R$ 44 = R$ 26 de lucro líquido por venda."
              },
              {
                text: "R$ 44",
                feedback: "R$ 44 é o CPA real, não o lucro."
              },
              {
                text: "R$ 70",
                feedback: "R$ 70 é a sobra antes do tráfego. Ainda precisa descontar o CPA."
              },
              {
                text: "R$ 114",
                feedback: "Essa conta somou. Lucro líquido desconta o CPA da sobra."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "Lucro positivo, zero e negativo",
            body: "A régua aqui é direta. Lucro positivo significa que sobra dinheiro por venda. Lucro zero significa ponto de equilíbrio: vende, mas não sobra. Lucro negativo significa que cada venda aumenta o prejuízo. O mais perigoso é o negativo com volume, porque parece crescimento, mas é buraco crescendo.",
            cards: [
              {
                label: "🟢 Lucro positivo",
                status: "good",
                text: "Sobra dinheiro depois do CPA."
              },
              {
                label: "🟡 Lucro zero",
                status: "warn",
                text: "Empatou. Campanha se paga, mas não gera lucro."
              },
              {
                label: "🔴 Lucro negativo",
                status: "bad",
                text: "Cada venda está comprando prejuízo."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua do lucro",
            question: "A campanha tem lucro líquido de -R$ 8 por venda. Qual leitura está correta?",
            options: [
              {
                text: "Cada venda está gerando prejuízo de R$ 8.",
                correct: true,
                feedback: "Certo. Lucro negativo significa que vender mais pode aumentar o rombo."
              },
              {
                text: "A campanha está lucrando R$ 8 por venda.",
                feedback: "O sinal negativo mostra prejuízo, não lucro."
              },
              {
                text: "A campanha está no ponto de equilíbrio.",
                feedback: "Ponto de equilíbrio seria lucro R$ 0. Aqui está negativo."
              },
              {
                text: "O CPC obrigatoriamente é baixo.",
                feedback: "Não dá para saber CPC por lucro líquido. Aqui a leitura é financeira."
              },
              {
                text: "Pode escalar forte sem olhar mais nada.",
                feedback: "Escalar lucro negativo multiplica prejuízo."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "Faturamento bonito pode ser cilada",
            body: "Faturamento é quanto entrou. Lucro é quanto sobrou. Uma campanha pode faturar R$ 10.000 e ainda dar prejuízo se produto, taxa, frete, reembolso, operação e CPA comerem tudo. O app precisa ensinar isso cedo porque muito iniciante comemora receita e esquece caixa.",
            cards: [
              {
                label: "Faturamento",
                text: "O dinheiro que entrou em vendas."
              },
              {
                label: "Lucro",
                text: "O dinheiro que sobrou depois dos custos."
              },
              {
                label: "Cilada",
                status: "bad",
                text: "Faturar alto com margem negativa é só prejuízo com maquiagem."
              }
            ]
          },
          {
            type: "quiz",
            title: "Faturamento vs lucro",
            question: "Por que faturamento alto não garante lucro?",
            options: [
              {
                text: "Porque ainda precisa descontar custos, CPA, taxas, frete, reembolso e operação.",
                correct: true,
                feedback: "Exatamente. Receita sem custo é história incompleta."
              },
              {
                text: "Porque faturamento nunca importa.",
                feedback: "Faturamento importa, mas não pode ser confundido com lucro."
              },
              {
                text: "Porque toda venda é prejuízo.",
                feedback: "Não. Venda pode dar lucro, empatar ou dar prejuízo. Depende da conta."
              },
              {
                text: "Porque CPC substitui lucro.",
                feedback: "CPC mede clique, não lucro final."
              },
              {
                text: "Porque ROAS sempre é falso.",
                feedback: "ROAS é útil, mas precisa ser lido junto com margem e lucro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "Lucro líquido e escala",
            body: "Escala só faz sentido quando existe lucro líquido positivo e repetido. Se você lucra R$ 20 por venda de forma consistente, aumentar volume pode fazer sentido. Se você perde R$ 5 por venda, aumentar volume é só pedir para o prejuízo vir em atacado.",
            cards: [
              {
                label: "Lucro positivo consistente",
                status: "good",
                text: "Pode começar a pensar em escala controlada."
              },
              {
                label: "Lucro no zero",
                status: "warn",
                text: "Ajustar antes de escalar forte."
              },
              {
                label: "Lucro negativo",
                status: "bad",
                text: "Corrigir antes. Escala aqui é bomba."
              }
            ]
          },
          {
            type: "quiz",
            title: "Escala com lucro",
            question: "Quando faz sentido pensar em escalar olhando lucro líquido por venda?",
            options: [
              {
                text: "Quando o lucro líquido por venda é positivo e consistente.",
                correct: true,
                feedback: "Boa. Escala precisa multiplicar lucro, não prejuízo."
              },
              {
                text: "Quando cada venda dá prejuízo, mas o faturamento parece bonito.",
                feedback: "Isso é perigoso. Faturamento bonito com lucro negativo aumenta o buraco."
              },
              {
                text: "Quando o lucro está exatamente zero.",
                feedback: "Empatar não é lucro. Primeiro cria folga."
              },
              {
                text: "Quando não sei meus custos.",
                feedback: "Sem custos, você não sabe se lucra. Escalar assim é dirigir vendado."
              },
              {
                text: "Quando o CPA está acima da margem.",
                feedback: "CPA acima da margem tende a gerar lucro negativo."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Lucro líquido por dia",
            body: "Além do lucro por venda, você precisa olhar lucro por dia. Uma campanha com R$ 5 de lucro por venda e 2 vendas por dia dá R$ 10 por dia. Outra com R$ 12 por venda e 20 vendas por dia dá R$ 240 por dia. Valor por venda e volume precisam conversar.",
            formula: "Lucro líquido diário = lucro por venda × número de vendas no dia",
            cards: [
              {
                label: "Cenário A",
                text: "R$ 5 por venda × 2 vendas = R$ 10/dia."
              },
              {
                label: "Cenário B",
                text: "R$ 12 por venda × 20 vendas = R$ 240/dia."
              },
              {
                label: "Leitura",
                text: "Lucro unitário e volume decidem o tamanho do jogo."
              }
            ]
          },
          {
            type: "quiz",
            title: "Lucro diário",
            question: "Lucro líquido por venda é R$ 18 e a campanha fez 12 vendas no dia. Qual foi o lucro líquido diário?",
            options: [
              {
                text: "R$ 30",
                feedback: "R$ 30 não vem da multiplicação de R$ 18 por 12."
              },
              {
                text: "R$ 180",
                feedback: "R$ 180 seria R$ 15 por venda em 12 vendas. Aqui são R$ 18."
              },
              {
                text: "R$ 216",
                correct: true,
                feedback: "Certo. R$ 18 × 12 vendas = R$ 216 de lucro líquido diário."
              },
              {
                text: "R$ 1.200",
                feedback: "Esse valor passou muito da multiplicação indicada."
              },
              {
                text: "Não dá para calcular.",
                feedback: "Dá sim. Basta multiplicar lucro por venda pelo número de vendas."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Como aumentar lucro por venda",
            body: "Para aumentar lucro líquido por venda, você pode mexer em dois lados: aumentar a sobra antes do tráfego ou reduzir CPA. Aumentar sobra vem de margem, ticket, kits, upsells e custos menores. Reduzir CPA vem de criativo melhor, página melhor, checkout melhor e tráfego mais qualificado.",
            cards: [
              {
                label: "Aumentar sobra",
                text: "Ticket, margem, kit, combo, upsell, frete e custos."
              },
              {
                label: "Reduzir CPA",
                text: "Criativo, público, página, checkout e oferta."
              },
              {
                label: "Melhor cenário",
                status: "good",
                text: "Sobra sobe e CPA cai ao mesmo tempo."
              }
            ]
          },
          {
            type: "quiz",
            title: "Aumentar lucro",
            question: "Qual plano tende a aumentar lucro líquido por venda?",
            options: [
              {
                text: "Aumentar margem/ticket e reduzir CPA com melhoria do funil.",
                correct: true,
                feedback: "Perfeito. Você melhora a sobra e reduz o custo de aquisição."
              },
              {
                text: "Aumentar CPA sem aumentar margem.",
                feedback: "Isso tende a reduzir lucro por venda."
              },
              {
                text: "Diminuir valor percebido da oferta.",
                feedback: "Isso pode derrubar conversão e margem."
              },
              {
                text: "Tornar checkout mais difícil.",
                feedback: "Checkout difícil tende a piorar IC–Compras e CPA."
              },
              {
                text: "Ignorar todos os custos.",
                feedback: "Sem custos, você não sabe o lucro real."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "Lucro líquido no diagnóstico cruzado",
            body: "Quando o funil parece saudável, CPA cabe e ROAS é bom, o lucro líquido confirma se vale a pena continuar. Se o lucro por venda é pequeno demais, talvez a campanha funcione, mas não compense a operação. Se o lucro é forte e consistente, aí começa a ficar interessante.",
            cards: [
              {
                label: "Funil bom + lucro baixo",
                status: "warn",
                text: "Pode faltar margem, ticket ou volume."
              },
              {
                label: "Funil bom + lucro forte",
                status: "good",
                text: "Candidato a escala controlada."
              },
              {
                label: "Funil bom + lucro negativo",
                status: "bad",
                text: "A matemática financeira está quebrada."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico final",
            question: "Funil parece saudável, mas lucro líquido por venda é quase zero. Qual suspeita faz sentido?",
            options: [
              {
                text: "A campanha pode estar só empatando; precisa melhorar margem, ticket ou CPA antes de escalar.",
                correct: true,
                feedback: "Boa. Funil saudável sem lucro ainda não é escala boa."
              },
              {
                text: "Escalar forte porque quase zero é lucro enorme.",
                feedback: "Quase zero não dá folga. Escalar pode aumentar trabalho sem aumentar dinheiro."
              },
              {
                text: "CPC é obrigatoriamente zero.",
                feedback: "Não dá para concluir isso por lucro líquido."
              },
              {
                text: "O checkout nunca converteu.",
                feedback: "Se existe venda e funil saudável, checkout está convertendo algum volume."
              },
              {
                text: "Custos não importam.",
                feedback: "Custos são exatamente o que separa faturamento de lucro."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo Lucro Líquido amassado",
            body: "Agora você sabe se a campanha está realmente deixando dinheiro por venda ou só fazendo barulho no faturamento. O próximo módulo natural é AOV, para aprofundar o valor médio do pedido e aumentar o tamanho da compra.",
            xp: 140
          }
        ]
      }
