// Módulo 11 — Frequência
// Objeto pronto para colar dentro do array MODULES.

{
        id: "frequencia",
        title: "Frequência: já encheu o saco da pessoa?",
        metric: "Frequência",
        description: "Aprenda a ler quantas vezes, em média, a mesma pessoa viu seu anúncio e quando isso começa a cansar.",
        xp: 120,
        difficulty: "Básico",
        estimatedMinutes: 15,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é Frequência?",
            body: "Frequência mostra quantas vezes, em média, a mesma pessoa viu seu anúncio. Se a frequência é 1, cada pessoa viu mais ou menos uma vez. Se é 4, a mesma pessoa viu em média quatro vezes. É a métrica do: 'estou alcançando gente nova ou enchendo o saco da mesma galera?'",
            formula: "Frequência = impressões ÷ alcance",
            cards: [
              {
                label: "Impressões",
                text: "Total de vezes que o anúncio apareceu."
              },
              {
                label: "Alcance",
                text: "Quantidade de pessoas únicas alcançadas."
              },
              {
                label: "Frequência",
                text: "Média de vezes que cada pessoa viu o anúncio."
              }
            ]
          },
          {
            type: "quiz",
            title: "Frequência sem confundir",
            question: "O que a Frequência mostra?",
            options: [
              {
                text: "Quantas vezes, em média, a mesma pessoa viu o anúncio.",
                correct: true,
                feedback: "Isso. Frequência mede repetição média por pessoa alcançada."
              },
              {
                text: "Quanto custa cada clique no anúncio.",
                feedback: "Isso é CPC. Frequência não fala de preço; fala de repetição de exibição."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Isso é CPM. Frequência mostra quantas vezes a mesma pessoa viu o anúncio."
              },
              {
                text: "A porcentagem de pessoas que compraram.",
                feedback: "Isso é métrica de conversão. Frequência fica na exposição do anúncio."
              },
              {
                text: "Quanto de receita voltou do investimento.",
                feedback: "Isso é ROAS. Frequência mede repetição, não retorno financeiro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "Impressões não são pessoas",
            body: "Esse é o erro clássico. 10.000 impressões não significa 10.000 pessoas. Pode ser 10.000 pessoas vendo uma vez, ou 2.000 pessoas vendo cinco vezes. Por isso você precisa olhar alcance junto com impressões. Frequência nasce dessa divisão.",
            cards: [
              {
                label: "Cenário A",
                text: "10.000 impressões e 10.000 de alcance = frequência 1."
              },
              {
                label: "Cenário B",
                text: "10.000 impressões e 2.000 de alcance = frequência 5."
              },
              {
                label: "Leitura",
                text: "Mesmo número de impressões, mas exposição totalmente diferente."
              }
            ]
          },
          {
            type: "quiz",
            title: "Impressão vs alcance",
            question: "Um anúncio teve 10.000 impressões e 2.000 pessoas alcançadas. Qual foi a frequência?",
            options: [
              {
                text: "Frequência 0,2",
                feedback: "Essa conta inverteu a divisão. Frequência é impressões divididas por alcance."
              },
              {
                text: "Frequência 2",
                feedback: "Frequência 2 seria 4.000 impressões para 2.000 de alcance. Aqui foram 10.000."
              },
              {
                text: "Frequência 5",
                correct: true,
                feedback: "Boa. 10.000 impressões divididas por 2.000 pessoas alcançadas dá frequência 5."
              },
              {
                text: "Frequência 10",
                feedback: "Frequência 10 seria 20.000 impressões para 2.000 pessoas. Aqui foram 10.000."
              },
              {
                text: "Não dá para calcular com esses dados.",
                feedback: "Dá sim. Para frequência você precisa de impressões e alcance, e os dois estão no cenário."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua prática da Frequência",
            body: "Frequência depende do objetivo. Em prospecção, você quer alcançar gente nova sem saturar rápido. Em remarketing, é normal a pessoa ver mais vezes. Mas para uma régua prática geral, dá para usar isso como referência inicial.",
            cards: [
              {
                label: "🟢 1 a 2,5",
                status: "good",
                text: "Saudável para prospecção. Boa chance de estar alcançando gente nova."
              },
              {
                label: "🟡 2,5 a 4",
                status: "warn",
                text: "Atenção. Pode começar a cansar se CTR cair e CPC subir."
              },
              {
                label: "🔴 Acima de 4",
                status: "bad",
                text: "Risco de saturação. Mesma galera vendo demais, principalmente se os resultados pioram."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua da Frequência",
            question: "Na régua prática do Tabelingo, frequência 4,8 em campanha de prospecção indica o quê?",
            options: [
              {
                text: "Risco de saturação, principalmente se CTR caiu e CPC subiu.",
                correct: true,
                feedback: "Certo. Acima de 4 já pede atenção forte em prospecção."
              },
              {
                text: "Alcance perfeito e infinito.",
                feedback: "Não. Frequência alta pode indicar que a mesma galera está vendo repetidas vezes."
              },
              {
                text: "CPC obrigatoriamente abaixo de R$ 1.",
                feedback: "Frequência não diz automaticamente o CPC. Precisa cruzar as duas métricas."
              },
              {
                text: "Checkout saudável.",
                feedback: "Frequência fala de exposição do anúncio, não de fechamento no checkout."
              },
              {
                text: "ROAS garantido.",
                feedback: "Frequência alta não garante retorno. Pode até derrubar resultado por saturação."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "Frequência alta: quando vira problema?",
            body: "Frequência alta sozinha não é crime. O problema é frequência alta junto com sinais de fadiga: CTR caindo, CPC subindo, CPA piorando, comentários repetidos, criativo perdendo força e público pequeno demais. A pessoa viu uma, duas, três vezes… na quarta já quer mandar o anúncio tomar banho.",
            cards: [
              {
                label: "Sinal 1",
                text: "CTR começa a cair."
              },
              {
                label: "Sinal 2",
                text: "CPC começa a subir."
              },
              {
                label: "Sinal 3",
                text: "CPA piora mesmo com orçamento parecido."
              },
              {
                label: "Sinal 4",
                text: "O público é pequeno e o anúncio fica rodando para os mesmos."
              }
            ]
          },
          {
            type: "quiz",
            title: "Fadiga de anúncio",
            question: "Frequência alta + CTR caindo + CPC subindo. Qual leitura faz mais sentido?",
            options: [
              {
                text: "Possível fadiga de criativo ou saturação de público.",
                correct: true,
                feedback: "Boa. Esse combo é clássico de anúncio cansando a audiência."
              },
              {
                text: "A campanha está cada vez mais forte.",
                feedback: "Se CTR cai e CPC sobe, o anúncio está perdendo força, não ganhando."
              },
              {
                text: "Checkout é o único culpado.",
                feedback: "Esse combo aparece antes do checkout: exposição, clique e custo do clique."
              },
              {
                text: "ROAS está garantido.",
                feedback: "Nada garante ROAS aqui. Esse cenário tende a piorar custo e resultado."
              },
              {
                text: "Não precisa testar criativo novo.",
                feedback: "Quando frequência pesa e CTR cai, criativo novo pode ser uma das primeiras ações."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "Frequência baixa também diz algo",
            body: "Frequência muito baixa pode significar que você está alcançando muita gente nova, mas talvez sem repetição suficiente para fixar a mensagem. Para produto de decisão rápida, isso pode ser ok. Para produto mais caro ou oferta mais complexa, a pessoa pode precisar ver mais de uma vez antes de confiar.",
            cards: [
              {
                label: "Frequência baixa + CTR bom",
                status: "good",
                text: "Anúncio está pegando gente nova e gerando clique."
              },
              {
                label: "Frequência baixa + CTR ruim",
                status: "warn",
                text: "Você aparece para gente nova, mas o anúncio não está puxando clique."
              },
              {
                label: "Frequência baixa + produto caro",
                status: "warn",
                text: "Pode precisar de remarketing, prova e repetição estratégica."
              }
            ]
          },
          {
            type: "quiz",
            title: "Frequência baixa",
            question: "Frequência baixa, CTR baixo e produto de decisão mais cara. Qual leitura é mais inteligente?",
            options: [
              {
                text: "O anúncio pode não estar forte e talvez falte repetição/remarketing para gerar confiança.",
                correct: true,
                feedback: "Perfeito. Baixa repetição com pouca resposta pode pedir criativo melhor e estratégia de aquecimento."
              },
              {
                text: "A campanha está automaticamente perfeita.",
                feedback: "Não. CTR baixo mostra que o anúncio não está puxando clique."
              },
              {
                text: "A frequência baixa sempre é ruim.",
                feedback: "Nem sempre. Pode ser boa para alcance novo. O contexto é que manda."
              },
              {
                text: "Checkout é a primeira coisa a trocar.",
                feedback: "Ainda estamos na exposição e clique. Checkout vem depois."
              },
              {
                text: "Aumentar frequência resolve tudo sozinho.",
                feedback: "Repetição sem criativo e oferta bons só repete um problema mais vezes."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Frequência com CTR: o termômetro da fadiga",
            body: "Frequência e CTR juntos mostram se a repetição está cansando ou ajudando. Se frequência sobe e CTR se mantém, beleza. Se frequência sobe e CTR despenca, o anúncio está sendo ignorado. O feed já reconheceu tua cara e passou reto.",
            cards: [
              {
                label: "Frequência sobe + CTR estável",
                status: "good",
                text: "Ainda pode estar saudável."
              },
              {
                label: "Frequência sobe + CTR cai",
                status: "bad",
                text: "Sinal de fadiga ou saturação."
              },
              {
                label: "Frequência sobe + CPC sobe",
                status: "warn",
                text: "Clique ficando mais caro conforme o público cansa."
              }
            ]
          },
          {
            type: "quiz",
            title: "Frequência + CTR",
            question: "Frequência subiu de 2 para 5 e CTR caiu de 2,4% para 0,9%. Qual leitura encaixa melhor?",
            options: [
              {
                text: "O público pode estar saturando e o criativo perdendo força.",
                correct: true,
                feedback: "Exato. Mais repetição e menos clique é sinal forte de fadiga."
              },
              {
                text: "A campanha ficou automaticamente melhor.",
                feedback: "Não. CTR caiu bastante. Isso indica perda de interesse."
              },
              {
                text: "A página é o único gargalo possível.",
                feedback: "Esse cenário acontece antes da página: exposição e clique."
              },
              {
                text: "Não precisa trocar criativo nunca.",
                feedback: "Esse é justamente o tipo de cenário que pode pedir criativo novo."
              },
              {
                text: "A frequência não serve para nada.",
                feedback: "Serve sim. Ela mostra repetição média e ajuda a identificar saturação."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Frequência com CPA e ROAS",
            body: "A frequência também precisa conversar com resultado financeiro. Se frequência sobe, mas CPA continua saudável e ROAS bom, talvez o público ainda aguente. Se frequência sobe, CPA piora e ROAS cai, a repetição está ficando cara. Aí o anúncio começa a virar spam pago.",
            cards: [
              {
                label: "Frequência alta + CPA saudável",
                status: "good",
                text: "Pode ser aceitável, especialmente em remarketing."
              },
              {
                label: "Frequência alta + CPA subindo",
                status: "warn",
                text: "Atenção. O público pode estar cansando."
              },
              {
                label: "Frequência alta + ROAS caindo",
                status: "bad",
                text: "Sinal de saturação afetando resultado."
              }
            ]
          },
          {
            type: "quiz",
            title: "Frequência + resultado",
            question: "Frequência alta, CPA subindo e ROAS caindo. Qual ação faz mais sentido?",
            options: [
              {
                text: "Testar novos criativos, abrir/renovar público e controlar orçamento.",
                correct: true,
                feedback: "Boa. O cenário mostra saturação afetando resultado financeiro."
              },
              {
                text: "Aumentar orçamento sem mudar nada.",
                feedback: "Se o público já está cansando, mais verba pode acelerar a piora."
              },
              {
                text: "Ignorar CPA e ROAS.",
                feedback: "CPA e ROAS mostram se a repetição está machucando o bolso."
              },
              {
                text: "Trocar apenas a cor do botão da página.",
                feedback: "Pode haver melhorias na página, mas esse combo aponta primeiro para saturação/criativo/público."
              },
              {
                text: "Concluir que frequência alta sempre é ótima.",
                feedback: "Frequência alta só é aceitável quando o resultado continua saudável."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "O que fazer quando a frequência pesa",
            body: "Quando a frequência começa a pesar, você tem alguns caminhos: trocar criativo, criar novos ângulos, ampliar público, reduzir orçamento, separar remarketing de prospecção, controlar posicionamentos e pausar anúncios cansados. O erro é deixar o mesmo criativo rodando até virar papel de parede.",
            cards: [
              {
                label: "1. Novo criativo",
                text: "Troque hook, visual, prova e ângulo."
              },
              {
                label: "2. Novo público",
                text: "Abra segmentação ou teste audiência nova."
              },
              {
                label: "3. Controle de verba",
                text: "Orçamento alto em público pequeno acelera saturação."
              },
              {
                label: "4. Separar campanhas",
                text: "Prospecção e remarketing podem ter frequências aceitáveis diferentes."
              },
              {
                label: "5. Pausa estratégica",
                text: "Criativo cansado pode voltar depois com público renovado."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ação prática",
            question: "Frequência acima de 5, CTR caindo e CPA piorando. Qual plano é mais profissional?",
            options: [
              {
                text: "Renovar criativos/ângulos, revisar público e controlar verba antes de escalar.",
                correct: true,
                feedback: "Perfeito. O cenário pede antídoto contra saturação, não mais pressão no mesmo anúncio."
              },
              {
                text: "Escalar forte porque a frequência alta é sempre boa.",
                feedback: "Frequência alta com resultado piorando é alerta, não convite para escala."
              },
              {
                text: "Ignorar criativo e mexer só no checkout.",
                feedback: "O problema aparece no anúncio sendo repetido e perdendo clique. Checkout não é o primeiro suspeito."
              },
              {
                text: "Manter tudo igual por mais 30 dias.",
                feedback: "Se as métricas estão piorando, manter tudo igual tende a piorar mais."
              },
              {
                text: "Apagar todas as campanhas da conta.",
                feedback: "Não precisa destruir tudo. Primeiro renova criativo, público e controle de verba."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo Frequência amassado",
            body: "Agora você sabe quando o anúncio está alcançando gente nova e quando está virando aquele chato que aparece toda hora. Frequência não trabalha sozinha: cruza com CTR, CPC, CPA e ROAS para saber se a repetição ajuda ou cansa.",
            xp: 120
          }
        ]
      }
