// Módulo 05 — IC–Compras
// Objeto pronto para colar dentro do array MODULES.

{
        id: "ic-compras",
        title: "IC–Compras: o checkout fecha ou espanta?",
        metric: "IC–Compras",
        description: "Aprenda a medir se quem iniciou checkout está realmente comprando ou fugindo na última porta.",
        xp: 130,
        difficulty: "Básico",
        estimatedMinutes: 16,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é IC–Compras?",
            body: "IC–Compras é a taxa que mostra quantas pessoas que iniciaram o checkout realmente finalizaram a compra. Ela fica no fim do funil. A pessoa já clicou, chegou na página, iniciou o checkout… agora a pergunta é: ela pagou ou fugiu?",
            cards: [
              {
                label: "IC",
                text: "Início de Checkout: a pessoa começou o processo de compra."
              },
              {
                label: "Compra",
                text: "A pessoa concluiu o pagamento e virou venda."
              },
              {
                label: "IC–Compras",
                text: "A ponte entre intenção de compra e dinheiro entrando."
              }
            ]
          },
          {
            type: "quiz",
            title: "IC–Compras sem confundir",
            question: "O que a métrica IC–Compras mostra?",
            options: [
              {
                text: "A porcentagem de pessoas que iniciaram checkout e finalizaram a compra.",
                correct: true,
                feedback: "Isso. IC–Compras mede se o checkout está transformando intenção em compra real."
              },
              {
                text: "Quanto você paga por cada clique no anúncio.",
                feedback: "Isso é CPC. IC–Compras acontece bem depois, quando a pessoa já está no checkout."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Essa é a lógica do CPM. IC–Compras mede a etapa final do checkout."
              },
              {
                text: "Quantas pessoas chegaram na página depois do clique.",
                feedback: "Isso tem relação com Taxa de Visualização. IC–Compras é checkout virando venda."
              },
              {
                text: "Quantas pessoas iniciaram checkout a partir da página.",
                feedback: "Isso é PV–IC. IC–Compras mede o próximo passo: quem iniciou checkout e comprou."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A fórmula do IC–Compras",
            body: "A conta é: compras divididas pelos inícios de checkout, vezes 100. Se 100 pessoas iniciaram checkout e 40 compraram, seu IC–Compras foi 40%. Essa métrica mostra se a última porta do funil está saudável.",
            formula: "IC–Compras = compras ÷ inícios de checkout × 100",
            cards: [
              {
                label: "Exemplo 1",
                text: "100 inícios de checkout e 40 compras = 40%."
              },
              {
                label: "Exemplo 2",
                text: "80 inícios de checkout e 16 compras = 20%."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Uma campanha teve 100 inícios de checkout e 18 compras. Qual foi o IC–Compras?",
            options: [
              {
                text: "8%",
                feedback: "Não fecha. 8% seria 8 compras em 100 checkouts. Aqui foram 18 compras."
              },
              {
                text: "18%",
                correct: true,
                feedback: "Boa. 18 compras divididas por 100 inícios de checkout dá 18%."
              },
              {
                text: "25%",
                feedback: "25% seria 25 compras em 100 checkouts. Aqui foram 18."
              },
              {
                text: "40%",
                feedback: "40% seria uma taxa saudável, mas aqui só 18 de 100 compraram."
              },
              {
                text: "118%",
                feedback: "Essa conta somou eventos. IC–Compras é compras divididas por inícios de checkout."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua do IC–Compras",
            body: "Essa régua mostra se o checkout está fechando bem. Quando IC–Compras está baixo, a página até levou a pessoa para o checkout, mas algo na etapa final está fazendo ela abandonar.",
            cards: [
              {
                label: "🟢 40% a 100%",
                status: "good",
                text: "Checkout saudável. Boa parte de quem começa o checkout finaliza."
              },
              {
                label: "🟡 25% a 39%",
                status: "warn",
                text: "Existe objeção. A pessoa chega perto de comprar, mas parte relevante trava."
              },
              {
                label: "🔴 Abaixo de 25%",
                status: "bad",
                text: "Fuga forte no pagamento. O checkout está perdendo muita gente."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua do checkout",
            question: "Na régua do Tabelingo, IC–Compras de 22% indica o quê?",
            options: [
              {
                text: "Fuga forte no pagamento, porque está abaixo de 25%.",
                correct: true,
                feedback: "Certo. Abaixo de 25% é alerta vermelho: muita gente inicia checkout e não compra."
              },
              {
                text: "Checkout saudável.",
                feedback: "Checkout saudável começa em 40%. Com 22%, a perda no fechamento está pesada."
              },
              {
                text: "Existe objeção leve, mas está tudo tranquilo.",
                feedback: "A faixa de objeção fica entre 25% e 39%. 22% já caiu abaixo disso."
              },
              {
                text: "Problema obrigatório no criativo.",
                feedback: "Criativo fica no começo do funil. IC–Compras fala da última etapa, dentro do checkout."
              },
              {
                text: "PV–IC perfeito.",
                feedback: "IC–Compras não mede página para checkout. Mede checkout para compra."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "O que IC–Compras bom indica?",
            body: "IC–Compras bom indica que o checkout está convertendo bem. A pessoa chega na etapa final e encontra confiança, clareza, forma de pagamento adequada e pouca fricção. Isso não significa que a campanha inteira é perfeita, mas mostra que a última porta não está sabotando o resultado.",
            cards: [
              {
                label: "Sinal positivo",
                status: "good",
                text: "Checkout simples e compreensível."
              },
              {
                label: "Sinal positivo",
                status: "good",
                text: "Preço e condições não assustam na hora final."
              },
              {
                label: "Próxima pergunta",
                text: "O CPA está abaixo do ponto de equilíbrio?"
              }
            ]
          },
          {
            type: "quiz",
            title: "Checkout saudável",
            question: "Se o IC–Compras está em 48%, qual leitura faz mais sentido?",
            options: [
              {
                text: "O checkout parece saudável, mas ainda preciso olhar CPA, margem e ROAS.",
                correct: true,
                feedback: "Perfeito. IC–Compras bom mostra fechamento saudável, mas lucro depende de CPA, margem e receita."
              },
              {
                text: "A campanha inteira está validada e pode escalar sem olhar mais nada.",
                feedback: "Nenhuma métrica sozinha valida o sistema inteiro. Falta olhar custo de aquisição e retorno."
              },
              {
                text: "A página obrigatoriamente está ruim.",
                feedback: "IC–Compras bom não aponta problema de página. Ele mostra que quem entra no checkout compra bem."
              },
              {
                text: "O CPC obrigatoriamente está abaixo de R$ 1.",
                feedback: "IC–Compras não revela o preço do clique. Ele mede fechamento."
              },
              {
                text: "A Taxa de Visualização está obrigatoriamente baixa.",
                feedback: "Não dá para saber isso por IC–Compras. São etapas diferentes."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "O que IC–Compras baixo indica?",
            body: "IC–Compras baixo indica que a pessoa demonstrou intenção, mas travou na hora de pagar. Isso costuma ter relação com confiança, fricção, taxa surpresa, checkout longo, falta de parcelamento, método de pagamento limitado, garantia fraca ou preço parecendo pesado demais no último passo.",
            cards: [
              {
                label: "Falta de confiança",
                text: "Pouca prova social, garantia escondida ou checkout com cara duvidosa."
              },
              {
                label: "Fricção",
                text: "Campos demais, checkout longo, cadastro chato ou demora no carregamento."
              },
              {
                label: "Pagamento",
                text: "Falta Pix, cartão, parcelamento ou método que o público usa."
              },
              {
                label: "Surpresa ruim",
                text: "Frete, taxa ou condição aparecendo só no final."
              }
            ]
          },
          {
            type: "quiz",
            title: "IC–Compras baixo",
            question: "Qual alternativa combina mais com IC–Compras baixo?",
            options: [
              {
                text: "A pessoa inicia checkout, mas trava por falta de confiança, fricção ou problema no pagamento.",
                correct: true,
                feedback: "Exatamente. IC–Compras baixo mostra fuga na última porta do funil."
              },
              {
                text: "O anúncio nunca recebeu impressão.",
                feedback: "Isso seria problema lá no CPM. IC–Compras acontece depois que a pessoa chegou ao checkout."
              },
              {
                text: "A página não recebeu nenhuma visita.",
                feedback: "Se existe início de checkout, alguém passou pela página. O gargalo está depois."
              },
              {
                text: "O CPC sempre está perfeito.",
                feedback: "IC–Compras não diz se o clique está barato. Ele fala sobre fechamento."
              },
              {
                text: "O produto sempre está validado.",
                feedback: "Não necessariamente. Pode ter interesse, mas o fechamento ainda está quebrando."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Ticket muda a pressão no checkout",
            body: "Quanto maior o ticket, maior tende a ser a exigência de confiança. A pessoa pensa mais, compara mais e sente mais risco. Em ticket baixo, o checkout precisa ser rápido e sem atrito. Em ticket alto, precisa reforçar segurança, garantia, valor percebido e condições de pagamento.",
            dynamicNote: "icComprasTicketContext",
            cards: [
              {
                label: "Ticket baixo",
                text: "A compra precisa ser simples, rápida e sem surpresa."
              },
              {
                label: "Ticket alto",
                text: "Confiança, garantia e condição de pagamento pesam mais."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ticket e fechamento",
            question: "Por que um produto de ticket alto pode exigir mais cuidado no checkout?",
            options: [
              {
                text: "Porque a pessoa sente mais risco e precisa de mais confiança para pagar.",
                correct: true,
                feedback: "Boa. Quanto maior o valor percebido como risco, mais o checkout precisa transmitir segurança."
              },
              {
                text: "Porque ticket alto sempre vende sem prova social.",
                feedback: "Pelo contrário. Ticket alto costuma precisar de mais prova, garantia e clareza."
              },
              {
                text: "Porque checkout não influencia compra.",
                feedback: "Checkout influencia muito. Ele é a última porta antes do dinheiro entrar."
              },
              {
                text: "Porque CPC substitui garantia.",
                feedback: "CPC não substitui confiança. CPC traz clique; checkout precisa fechar compra."
              },
              {
                text: "Porque taxa surpresa ajuda a vender.",
                feedback: "Taxa surpresa geralmente aumenta abandono. Surpresa ruim no checkout mata conversão."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "O que ajustar quando IC–Compras está baixo?",
            body: "A ordem correta é reduzir medo e fricção. Deixe garantia clara, mostre segurança, simplifique campos, melhore velocidade, ofereça métodos de pagamento adequados, evite taxa surpresa e reforce prova social perto da decisão final.",
            cards: [
              {
                label: "1. Confiança",
                text: "Garantia, segurança, avaliações e prova perto do checkout."
              },
              {
                label: "2. Simplicidade",
                text: "Menos campos, menos etapas, menos confusão."
              },
              {
                label: "3. Pagamento",
                text: "Pix, cartão, parcelamento e métodos que o público usa."
              },
              {
                label: "4. Transparência",
                text: "Nada de frete ou taxa surpresa no último segundo."
              },
              {
                label: "5. Velocidade",
                text: "Checkout lento derruba gente quente."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ação prática",
            question: "IC–Compras está em 18%. Qual ação faz mais sentido?",
            options: [
              {
                text: "Simplificar checkout, reforçar garantia/confiança e revisar métodos de pagamento.",
                correct: true,
                feedback: "Perfeito. A pessoa chegou quente no checkout, então o foco é remover medo e fricção."
              },
              {
                text: "Aumentar orçamento sem mexer em nada.",
                feedback: "Se o checkout está vazando, mais orçamento só manda mais gente para o vazamento."
              },
              {
                text: "Ignorar checkout e trocar só o criativo.",
                feedback: "Criativo pode ser testado depois, mas IC–Compras baixo aponta problema na etapa final."
              },
              {
                text: "Culpar apenas a Taxa de Visualização.",
                feedback: "Taxa de Visualização fala da chegada na página. Aqui o gargalo está no fechamento."
              },
              {
                text: "Remover todos os métodos de pagamento.",
                feedback: "Isso aumenta fricção. O caminho é facilitar pagamento, não dificultar."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "Como cruzar IC–Compras com PV–IC",
            body: "PV–IC mostra se a página leva para o checkout. IC–Compras mostra se o checkout fecha compra. Se PV–IC é bom e IC–Compras é baixo, a página convence, mas o checkout trava. Se os dois são baixos, o problema pode estar na oferta inteira.",
            cards: [
              {
                label: "PV–IC bom + IC–Compras baixo",
                status: "bad",
                text: "Página convence, mas checkout trava."
              },
              {
                label: "PV–IC baixo + IC–Compras bom",
                status: "warn",
                text: "Pouca gente inicia checkout, mas quem inicia compra. Gargalo maior na página."
              },
              {
                label: "PV–IC bom + IC–Compras bom",
                status: "good",
                text: "Página e checkout parecem saudáveis. Próximo: CPA e ROAS."
              },
              {
                label: "PV–IC baixo + IC–Compras baixo",
                status: "bad",
                text: "Oferta/página/checkout precisam de diagnóstico forte."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico cruzado",
            question: "PV–IC bom, mas IC–Compras baixo. Qual leitura faz mais sentido?",
            options: [
              {
                text: "A página leva para o checkout, mas algo no fechamento está travando a compra.",
                correct: true,
                feedback: "Exatamente. A pessoa quer avançar, mas o checkout está perdendo na última porta."
              },
              {
                text: "O anúncio nunca chamou atenção.",
                feedback: "Se tem PV–IC bom, pessoas chegaram e iniciaram checkout. O gargalo indicado está depois."
              },
              {
                text: "A página não convence ninguém.",
                feedback: "PV–IC bom mostra o contrário: a página está levando gente para checkout."
              },
              {
                text: "O CPM sempre é o único culpado.",
                feedback: "CPM pode pesar no custo, mas essa combinação aponta mais para checkout."
              },
              {
                text: "A campanha está perfeita.",
                feedback: "Não. IC–Compras baixo mostra que dinheiro está vazando no fechamento."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo IC–Compras amassado",
            body: "Agora você sabe medir se o checkout transforma intenção em venda. Se essa taxa está baixa, a última porta do funil está espantando comprador quente. Próximo módulo natural: CPA, o custo real para gerar uma venda.",
            xp: 130
          }
        ]
      }
