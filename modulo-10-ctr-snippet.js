// Módulo 10 — CTR
// Objeto pronto para colar dentro do array MODULES.

{
        id: "ctr",
        title: "CTR: por que ninguém clica?",
        metric: "CTR",
        description: "Aprenda a medir se o anúncio está gerando vontade de clicar ou se está passando invisível no feed.",
        xp: 120,
        difficulty: "Básico",
        estimatedMinutes: 15,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é CTR?",
            body: "CTR significa Taxa de Clique. Ele mostra a porcentagem de pessoas que viram o anúncio e clicaram. Se muita gente vê e pouca gente clica, o anúncio até aparece, mas não desperta vontade. CTR é a métrica do: 'isso chamou atenção ou passou batido?'",
            formula: "CTR = cliques ÷ impressões × 100",
            cards: [
              {
                label: "Impressão",
                text: "O anúncio apareceu na tela de alguém."
              },
              {
                label: "Clique",
                text: "A pessoa se interessou o suficiente para tocar."
              },
              {
                label: "CTR",
                text: "A porcentagem de impressões que viraram clique."
              }
            ]
          },
          {
            type: "quiz",
            title: "CTR sem confundir",
            question: "O que o CTR mostra?",
            options: [
              {
                text: "A porcentagem de pessoas que viram o anúncio e clicaram.",
                correct: true,
                feedback: "Isso. CTR mede a passagem de impressão para clique."
              },
              {
                text: "Quanto você paga por cada clique.",
                feedback: "Isso é CPC. CTR não mostra preço; mostra porcentagem de clique."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Isso é CPM. CTR mostra se quem viu o anúncio clicou."
              },
              {
                text: "Quantas pessoas finalizaram compra.",
                feedback: "Isso é métrica de fechamento. CTR acontece antes da página e antes do checkout."
              },
              {
                text: "Quanto de receita voltou do investimento.",
                feedback: "Isso é ROAS. CTR mede reação ao anúncio, não receita."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A conta do CTR",
            body: "A conta é: cliques divididos por impressões, vezes 100. Se seu anúncio apareceu 10.000 vezes e recebeu 100 cliques, o CTR foi 1%. Isso quer dizer que, a cada 100 impressões, 1 virou clique.",
            formula: "CTR = cliques ÷ impressões × 100",
            cards: [
              {
                label: "Exemplo 1",
                text: "100 cliques ÷ 10.000 impressões × 100 = CTR de 1%."
              },
              {
                label: "Exemplo 2",
                text: "250 cliques ÷ 10.000 impressões × 100 = CTR de 2,5%."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Um anúncio teve 10.000 impressões e 200 cliques. Qual foi o CTR?",
            options: [
              {
                text: "0,2%",
                feedback: "0,2% seria 20 cliques em 10.000 impressões. Aqui foram 200."
              },
              {
                text: "2%",
                correct: true,
                feedback: "Boa. 200 dividido por 10.000 dá 0,02. Multiplicando por 100, temos 2%."
              },
              {
                text: "20%",
                feedback: "20% seria 2.000 cliques em 10.000 impressões. Aqui foram 200."
              },
              {
                text: "200%",
                feedback: "Essa conta misturou número absoluto com porcentagem. CTR é taxa, não soma."
              },
              {
                text: "Não dá para calcular com esses dados.",
                feedback: "Dá sim. Para CTR você precisa de impressões e cliques, e os dois dados estão aí."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua prática do CTR",
            body: "CTR varia muito por plataforma, formato, nicho e criativo. Então essa régua é uma referência prática do Tabelingo, não uma lei sagrada. Ela serve para campanhas de tráfego/anúncios diretos, especialmente quando você quer saber se o criativo está chamando clique.",
            cards: [
              {
                label: "🔴 Abaixo de 1%",
                status: "bad",
                text: "Baixo. Muita gente vê, pouca gente clica. Criativo ou promessa podem estar fracos."
              },
              {
                label: "🟡 Entre 1% e 2%",
                status: "warn",
                text: "Ok/morno. Pode funcionar, mas ainda tem espaço para melhorar gancho e clareza."
              },
              {
                label: "🟢 Acima de 2%",
                status: "good",
                text: "Bom sinal. O anúncio está gerando clique com mais força."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua do CTR",
            question: "Na régua prática do Tabelingo, CTR de 0,7% indica o quê?",
            options: [
              {
                text: "CTR baixo: o anúncio aparece, mas pouca gente clica.",
                correct: true,
                feedback: "Certo. Abaixo de 1% é sinal de pouco clique em relação às impressões."
              },
              {
                text: "CTR excelente, pode escalar sem olhar nada.",
                feedback: "Acima de 2% seria bom sinal. 0,7% está na faixa baixa."
              },
              {
                text: "Checkout perfeito.",
                feedback: "CTR nem chegou no checkout. Ele mede anúncio → clique."
              },
              {
                text: "ROAS garantido.",
                feedback: "CTR não garante receita. Ele só mostra taxa de clique."
              },
              {
                text: "Página obrigatoriamente ruim.",
                feedback: "CTR baixo acontece antes da pessoa chegar na página. Primeiro olhe criativo/promessa."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "CTR baixo: o que pode estar acontecendo?",
            body: "CTR baixo geralmente indica que o anúncio não está despertando clique. Pode ser gancho fraco, imagem/vídeo sem impacto, promessa confusa, público errado ou criativo cansado. A pessoa até vê, mas não sente motivo para tocar.",
            cards: [
              {
                label: "Gancho fraco",
                text: "O começo não cria curiosidade, dor ou desejo."
              },
              {
                label: "Criativo sem contraste",
                text: "O anúncio parece igual a tudo que a pessoa já ignora."
              },
              {
                label: "Promessa confusa",
                text: "A pessoa não entende rápido o benefício."
              },
              {
                label: "Público errado",
                text: "A oferta aparece para quem não tem interesse."
              }
            ]
          },
          {
            type: "quiz",
            title: "CTR baixo",
            question: "CTR está baixo. Qual ação faz mais sentido primeiro?",
            options: [
              {
                text: "Testar novos criativos, hooks e promessas para aumentar vontade de clicar.",
                correct: true,
                feedback: "Boa. CTR baixo pede melhora no anúncio: gancho, visual, promessa e público."
              },
              {
                text: "Mexer direto no checkout sem olhar anúncio.",
                feedback: "CTR acontece antes da página e do checkout. O problema está no anúncio gerando clique."
              },
              {
                text: "Aumentar orçamento e torcer.",
                feedback: "Se pouca gente clica, mais verba pode só comprar mais impressões ignoradas."
              },
              {
                text: "Ignorar, porque clique não importa.",
                feedback: "Clique importa como passagem para o resto do funil. CTR baixo limita volume."
              },
              {
                text: "Concluir que o produto está validado.",
                feedback: "CTR baixo não valida produto. Ele mostra que o anúncio não está puxando clique."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "CTR alto também pode enganar",
            body: "CTR alto é bom sinal, mas não é vitória sozinho. Às vezes o anúncio gera muito clique porque é curioso, polêmico ou exagerado, mas atrai gente errada. Aí o CTR fica bonito e o resto do funil apodrece: visualização baixa, PV–IC baixo, IC–Compras ruim ou CPA alto.",
            cards: [
              {
                label: "CTR alto + funil bom",
                status: "good",
                text: "Ótimo. O anúncio atrai e o resto confirma qualidade."
              },
              {
                label: "CTR alto + PV–IC baixo",
                status: "warn",
                text: "Clique pode ser curioso ou promessa desalinhada com a página."
              },
              {
                label: "CTR alto + CPA alto",
                status: "bad",
                text: "Muita gente clica, mas vender está caro. Precisa cruzar o funil."
              }
            ]
          },
          {
            type: "quiz",
            title: "CTR alto não é rei",
            question: "CTR alto, mas PV–IC baixo. Qual leitura faz mais sentido?",
            options: [
              {
                text: "O anúncio gera clique, mas pode estar atraindo curioso ou prometendo algo que a página não entrega.",
                correct: true,
                feedback: "Perfeito. CTR alto só vale de verdade quando o clique vira intenção no resto do funil."
              },
              {
                text: "A campanha está perfeita.",
                feedback: "Não. PV–IC baixo mostra que a página não está levando para checkout."
              },
              {
                text: "Checkout é o único culpado.",
                feedback: "Ainda não. O problema aparece antes: a página não gera início de checkout."
              },
              {
                text: "CTR alto sempre garante lucro.",
                feedback: "Não garante. CTR mede clique, não lucro."
              },
              {
                text: "CPM sempre está baixo.",
                feedback: "CTR não diz automaticamente o CPM. São métricas diferentes."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "CTR com CPC: vontade de clicar e custo do clique",
            body: "CTR mostra a porcentagem de pessoas que clicam. CPC mostra quanto custa cada clique. Quando CTR sobe, o CPC pode cair, porque o anúncio está gerando mais cliques com as mesmas impressões. Mas isso não é automático: leilão, público e CPM também influenciam.",
            cards: [
              {
                label: "CTR baixo + CPC alto",
                status: "bad",
                text: "Pouca gente clica e cada clique sai caro. Criativo/promessa pedem revisão."
              },
              {
                label: "CTR alto + CPC baixo",
                status: "good",
                text: "Bom sinal no anúncio. Agora precisa validar a qualidade do clique."
              },
              {
                label: "CTR alto + CPC alto",
                status: "warn",
                text: "O criativo pode gerar clique, mas o público/leilão pode estar caro."
              }
            ]
          },
          {
            type: "quiz",
            title: "CTR + CPC",
            question: "CTR baixo e CPC alto. Qual leitura encaixa melhor?",
            options: [
              {
                text: "O anúncio não gera clique suficiente e cada clique está caro; revisar criativo/promessa.",
                correct: true,
                feedback: "Exato. Essa combinação aponta forte para criativo, promessa, público ou ângulo ruim."
              },
              {
                text: "Checkout está obrigatoriamente perfeito.",
                feedback: "Essa combinação acontece antes do checkout. Primeiro olhe anúncio e público."
              },
              {
                text: "A página está validada.",
                feedback: "Ainda não. Pouca gente está clicando, então a página pode nem ter volume suficiente."
              },
              {
                text: "Escalar sem medo.",
                feedback: "CTR baixo com CPC alto é sinal de correção, não de escala."
              },
              {
                text: "ROAS está garantido.",
                feedback: "Não dá para garantir retorno com topo do funil pesado."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "CTR com PV–IC: clique qualificado ou clique lixo?",
            body: "Esse cruzamento é forte. CTR mostra se o anúncio gera clique. PV–IC mostra se quem chegou na página inicia checkout. Se CTR é baixo e PV–IC alto, quem clica é bom, mas pouca gente clica. Se CTR é alto e PV–IC baixo, talvez o anúncio gere clique errado.",
            cards: [
              {
                label: "CTR baixo + PV–IC alto",
                status: "warn",
                text: "Pouca gente clica, mas quem clica é qualificado. Testar criativos para ganhar volume."
              },
              {
                label: "CTR alto + PV–IC baixo",
                status: "bad",
                text: "Muita gente clica, mas não avança. Pode ser curiosidade ou promessa desalinhada."
              },
              {
                label: "CTR alto + PV–IC alto",
                status: "good",
                text: "Anúncio chama clique e a página gera intenção. Bom sinal."
              }
            ]
          },
          {
            type: "quiz",
            title: "CTR + PV–IC",
            question: "CTR baixo e PV–IC alto. Qual diagnóstico faz mais sentido?",
            options: [
              {
                text: "Quem clica tende a ser qualificado, mas o anúncio precisa gerar mais cliques.",
                correct: true,
                feedback: "Boa. Esse cenário pede novos criativos/ângulos para aumentar volume sem perder qualidade."
              },
              {
                text: "A página está obrigatoriamente fraca.",
                feedback: "PV–IC alto aponta que a página conduz bem quem chega."
              },
              {
                text: "O clique é sempre lixo.",
                feedback: "Se PV–IC está alto, quem clica está avançando bem."
              },
              {
                text: "Não precisa testar criativo.",
                feedback: "CTR baixo normalmente pede novos criativos, hooks ou promessas."
              },
              {
                text: "Checkout é a primeira etapa do diagnóstico.",
                feedback: "Ainda estamos lendo anúncio e página. Checkout vem depois."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "O que testar para melhorar CTR",
            body: "Para melhorar CTR, você testa o que faz a pessoa parar e clicar: gancho, primeira frase, imagem, ângulo de dor, desejo, promessa, demonstração, prova visual e público. Não é sair trocando tudo sem controle. Testa uma coisa por vez para saber o que mexeu o ponteiro.",
            cards: [
              {
                label: "Hook",
                text: "Primeira frase ou primeira cena precisa bater rápido."
              },
              {
                label: "Promessa",
                text: "Benefício claro, específico e fácil de entender."
              },
              {
                label: "Visual",
                text: "Imagem/vídeo com contraste e demonstração real."
              },
              {
                label: "Público",
                text: "A oferta precisa aparecer para quem sente a dor ou desejo."
              },
              {
                label: "Controle",
                text: "Mude uma variável por vez para entender o resultado."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ação prática",
            question: "CTR baixo e CPC alto. Qual plano de teste é mais inteligente?",
            options: [
              {
                text: "Criar variações de hook, criativo e promessa, testando com controle.",
                correct: true,
                feedback: "Perfeito. O problema está na passagem impressão → clique, então o teste precisa focar no anúncio."
              },
              {
                text: "Mudar página, checkout, preço, público e criativo tudo junto.",
                feedback: "Mexer em tudo junto vira bagunça. Você não sabe o que resolveu ou piorou."
              },
              {
                text: "Aumentar orçamento e esperar o CTR subir.",
                feedback: "Mais verba não conserta anúncio que pouca gente quer clicar."
              },
              {
                text: "Ignorar o criativo.",
                feedback: "CTR é uma das métricas mais ligadas ao criativo e promessa."
              },
              {
                text: "Pausar o produto para sempre.",
                feedback: "Pode ser só problema de ângulo/criativo. Diagnóstico vem antes de conclusão radical."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo CTR amassado",
            body: "Agora você sabe ler se o anúncio está gerando clique ou sendo ignorado. CTR não vende sozinho, mas mostra se a primeira porta do funil está chamando atenção. Próximo módulo natural: Frequência, para entender quando a mesma pessoa viu seu anúncio vezes demais.",
            xp: 120
          }
        ]
      }
