// Módulo 06 — CPA
// Objeto pronto para colar dentro do array MODULES.

{
        id: "cpa",
        title: "CPA: quanto custa uma venda",
        metric: "CPA",
        description: "Aprenda a saber se uma venda está saindo barata, perigosa ou no prejuízo.",
        xp: 140,
        difficulty: "Básico",
        estimatedMinutes: 16,
        requiresTicket: true,
        screens: [
          {
            type: "setup",
            eyebrow: "Configuração de lucro",
            saveAs: "breakevenCpa",
            title: "Qual é seu CPA máximo sem prejuízo?",
            body: "CPA máximo é quanto você pode pagar para gerar uma venda sem perder dinheiro. Se você vende por R$ 100 e, depois de produto, frete, taxas e custo, sobram R$ 35 para anúncio, seu CPA máximo é R$ 35. Se não souber exato ainda, coloca uma estimativa conservadora.",
            placeholder: "Ex: 35,00",
            buttonText: "Salvar CPA máximo ✅",
            note: "Não coloca o preço cheio do produto se você tem custo. O correto é usar o dinheiro que sobra para pagar tráfego sem ficar negativo."
          },
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é CPA?",
            body: "CPA significa Custo por Aquisição. Na prática, é quanto você pagou em anúncio para conseguir uma venda. Ele é uma das métricas mais importantes porque encosta direto no lucro. Clique é começo. Compra é resultado. CPA mostra o preço desse resultado.",
            cards: [
              {
                label: "CPC",
                text: "Quanto custa o clique."
              },
              {
                label: "IC–Compras",
                text: "Se o checkout fecha."
              },
              {
                label: "CPA",
                text: "Quanto custou gerar a venda."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPA sem confundir",
            question: "O que o CPA mostra?",
            options: [
              {
                text: "Quanto você pagou em anúncio para gerar uma venda.",
                correct: true,
                feedback: "Isso. CPA é o custo de aquisição: quanto custou conquistar uma compra."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Isso é CPM. CPA fica no resultado: quanto custou gerar uma venda."
              },
              {
                text: "Quanto você paga por clique.",
                feedback: "Isso é CPC. CPA olha a compra final, não só o clique."
              },
              {
                text: "A porcentagem de cliques que carregaram a página.",
                feedback: "Isso é Taxa de Visualização. CPA mede custo por venda."
              },
              {
                text: "A porcentagem de pessoas que iniciaram checkout.",
                feedback: "Isso se aproxima de PV–IC. CPA é valor gasto dividido por compras."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A fórmula do CPA",
            body: "A conta é simples: valor gasto dividido pela quantidade de compras. Se você gastou R$ 300 e fez 10 vendas, seu CPA foi R$ 30. Ou seja: cada venda custou, em média, R$ 30 em anúncio.",
            formula: "CPA = investimento em anúncios ÷ compras",
            cards: [
              {
                label: "Exemplo 1",
                text: "R$ 300 gastos ÷ 10 compras = CPA de R$ 30."
              },
              {
                label: "Exemplo 2",
                text: "R$ 120 gastos ÷ 3 compras = CPA de R$ 40."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Você gastou R$ 240 em anúncios e fez 8 compras. Qual foi o CPA?",
            options: [
              {
                text: "R$ 8",
                feedback: "Esse número confundiu compra com custo. CPA é gasto dividido por compras: 240 dividido por 8."
              },
              {
                text: "R$ 24",
                feedback: "Quase, mas ainda ficou baixo. R$ 24 vezes 8 daria R$ 192, não R$ 240."
              },
              {
                text: "R$ 30",
                correct: true,
                feedback: "Boa. R$ 240 dividido por 8 compras dá CPA de R$ 30."
              },
              {
                text: "R$ 80",
                feedback: "R$ 80 seria se fossem só 3 compras com R$ 240 gastos. Aqui foram 8."
              },
              {
                text: "R$ 240",
                feedback: "Esse é o gasto total. CPA precisa dividir o gasto pela quantidade de compras."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "CPA bom ou ruim depende do seu limite",
            body: "CPA não tem uma régua fixa igual 'abaixo de X é bom para todo mundo'. CPA bom é aquele que fica abaixo do seu ponto de equilíbrio. CPA ruim é aquele que passa do máximo que você pode pagar por venda. É aqui que muito iniciante se lasca: vende, mas paga caro demais para vender.",
            dynamicNote: "cpaBreakevenContext",
            cards: [
              {
                label: "🟢 CPA abaixo do limite",
                status: "good",
                text: "Tende a ser saudável. Ainda precisa olhar consistência e volume."
              },
              {
                label: "🟡 CPA perto do limite",
                status: "warn",
                text: "Atenção. Pouca margem de erro. Qualquer oscilação pode virar prejuízo."
              },
              {
                label: "🔴 CPA acima do limite",
                status: "bad",
                text: "Prejuízo provável. Escalar assim só aumenta o rombo."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPA e ponto de equilíbrio",
            question: "Seu CPA máximo sem prejuízo é R$ 35. A campanha está com CPA de R$ 48. Qual leitura faz mais sentido?",
            options: [
              {
                text: "Está acima do limite e provavelmente entrando em prejuízo.",
                correct: true,
                feedback: "Certo. Se seu limite é R$ 35 e o CPA real está em R$ 48, cada venda custa mais do que você aguenta pagar."
              },
              {
                text: "Está perfeito porque qualquer venda é lucro.",
                feedback: "Venda não é lucro automático. Se custa mais para vender do que sobra de margem, é prejuízo."
              },
              {
                text: "O CPC obrigatoriamente está abaixo de R$ 1.",
                feedback: "CPA não revela automaticamente o CPC. Ele mostra o custo por venda final."
              },
              {
                text: "A campanha deve escalar sem olhar nada.",
                feedback: "Escalar CPA acima do limite tende a multiplicar prejuízo, não lucro."
              },
              {
                text: "O checkout está sempre saudável.",
                feedback: "Pode até estar, mas CPA acima do limite mostra que o resultado financeiro não fecha."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "CPA baixo: bom sinal, mas confirma o resto",
            body: "CPA abaixo do limite é um ótimo sinal. Significa que a campanha está comprando vendas por um custo que o negócio aguenta. Mas ainda precisa ver se isso acontece com volume suficiente, por dias diferentes, sem depender de uma venda isolada ou sorte do algoritmo.",
            cards: [
              {
                label: "Bom sinal",
                status: "good",
                text: "CPA abaixo do ponto de equilíbrio."
              },
              {
                label: "Confirmação",
                text: "Ver consistência, volume e se o ROAS acompanha."
              },
              {
                label: "Cuidado",
                text: "Uma venda barata isolada não valida escala sozinha."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPA baixo",
            question: "CPA abaixo do ponto de equilíbrio significa o quê?",
            options: [
              {
                text: "A campanha pode estar saudável, mas ainda precisa validar consistência e volume.",
                correct: true,
                feedback: "Perfeito. CPA bom é sinal forte, mas escala exige consistência."
              },
              {
                text: "Pode escalar infinito no mesmo segundo.",
                feedback: "Calma, emocionado. Um CPA bom precisa se repetir com volume antes de virar escala."
              },
              {
                text: "O CPM deixou de importar para sempre.",
                feedback: "CPM ainda ajuda a entender custo de atenção. CPA mostra resultado, não elimina diagnóstico."
              },
              {
                text: "A página obrigatoriamente está ruim.",
                feedback: "Se o CPA está bom, a estrutura pode estar funcionando. Não dá para concluir que a página é ruim."
              },
              {
                text: "ROAS sempre será negativo.",
                feedback: "CPA bom normalmente ajuda o ROAS, mas você ainda precisa olhar receita e ticket."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "CPA alto: onde pode estar o BO?",
            body: "CPA alto é consequência. Ele pode nascer de clique caro, público ruim, página fraca, checkout travando, preço/oferta mal estruturada ou ticket/margem baixos. Por isso não adianta olhar CPA e sair mexendo aleatoriamente. Você volta no funil e procura onde o custo subiu ou a conversão caiu.",
            cards: [
              {
                label: "Topo do funil",
                text: "CPC/CPM altos deixam a entrada cara."
              },
              {
                label: "Ponte",
                text: "Taxa de Visualização baixa desperdiça clique."
              },
              {
                label: "Página",
                text: "PV–IC baixo mostra pouca intenção de checkout."
              },
              {
                label: "Checkout",
                text: "IC–Compras baixo mostra fuga no pagamento."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPA alto",
            question: "CPA está alto. Qual atitude é mais profissional?",
            options: [
              {
                text: "Voltar no funil e descobrir se o gargalo está no anúncio, página, checkout ou oferta.",
                correct: true,
                feedback: "Exatamente. CPA alto é consequência. O trabalho é achar a causa antes de mexer."
              },
              {
                text: "Aumentar orçamento para o CPA cair por milagre.",
                feedback: "Pode até oscilar, mas escalar sem diagnóstico costuma aumentar prejuízo."
              },
              {
                text: "Culpar somente o pixel sempre.",
                feedback: "Pixel pode dar problema, mas CPA alto pode nascer em várias etapas do funil."
              },
              {
                text: "Apagar a página sem olhar CPC, PV–IC ou IC–Compras.",
                feedback: "A página pode ser culpada, mas você precisa confirmar com as métricas intermediárias."
              },
              {
                text: "Ignorar porque CPA não tem relação com lucro.",
                feedback: "CPA tem relação direta com lucro. Se ele passa do limite, a conta quebra."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "CPA com ticket: venda não é lucro",
            body: "Se você vende um produto de R$ 100 e seu CPA é R$ 60, ainda não dá para comemorar. Precisa saber quanto sobra depois de produto, frete, taxas, plataforma e operação. O erro fatal é olhar faturamento e esquecer custo. CPA só faz sentido quando comparado ao que sobra.",
            cards: [
              {
                label: "Ticket",
                text: "Valor da venda."
              },
              {
                label: "Margem",
                text: "Quanto sobra depois dos custos."
              },
              {
                label: "CPA máximo",
                text: "Quanto você pode gastar para vender sem ficar negativo."
              }
            ]
          },
          {
            type: "quiz",
            title: "Venda não é lucro",
            question: "Por que CPA precisa ser comparado com margem/ponto de equilíbrio?",
            options: [
              {
                text: "Porque uma venda pode existir e mesmo assim dar prejuízo se o custo para vender for alto.",
                correct: true,
                feedback: "Isso. Faturar não basta. O CPA precisa caber dentro do dinheiro que sobra."
              },
              {
                text: "Porque margem não importa em anúncio.",
                feedback: "Margem importa demais. Sem margem, você não sabe quanto pode pagar por venda."
              },
              {
                text: "Porque todo CPA alto sempre é bom.",
                feedback: "CPA alto só é aceitável se ainda couber na margem e no objetivo. Caso contrário, é prejuízo."
              },
              {
                text: "Porque CPC substitui lucro.",
                feedback: "CPC mede clique. Lucro depende de receita, custos e CPA."
              },
              {
                text: "Porque ROAS não existe.",
                feedback: "ROAS existe e ajuda, mas CPA mostra diretamente o custo da aquisição."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "CPA e escala",
            body: "Você só pensa em escala quando o CPA está abaixo do limite e o funil mostra consistência. Escalar para tentar corrigir CPA alto é burrice cara. Escala multiplica o que existe: se existe lucro, multiplica lucro; se existe prejuízo, multiplica prejuízo.",
            cards: [
              {
                label: "Pode considerar escala",
                status: "good",
                text: "CPA abaixo do limite, ROAS consistente e gargalos controlados."
              },
              {
                label: "Não escala ainda",
                status: "bad",
                text: "CPA acima do limite, checkout travando ou página fraca."
              },
              {
                label: "Ajusta antes",
                status: "warn",
                text: "CPA perto do limite e resultado instável."
              }
            ]
          },
          {
            type: "quiz",
            title: "Escala com CPA",
            question: "Quando faz sentido pensar em escalar olhando CPA?",
            options: [
              {
                text: "Quando o CPA está abaixo do limite e o resultado mostra consistência.",
                correct: true,
                feedback: "Boa. Escala precisa multiplicar algo saudável, não tentar salvar campanha quebrada."
              },
              {
                text: "Quando o CPA está acima do ponto de equilíbrio.",
                feedback: "Isso tende a multiplicar prejuízo. Primeiro corrige, depois escala."
              },
              {
                text: "Quando teve uma venda isolada barata.",
                feedback: "Uma venda isolada pode ser sorte. Precisa de consistência."
              },
              {
                text: "Quando o criativo é bonito, mesmo sem venda.",
                feedback: "Criativo bonito não paga boleto. CPA precisa provar custo por venda saudável."
              },
              {
                text: "Quando o checkout está travando muito.",
                feedback: "Checkout travando aumenta custo e derruba fechamento. Corrige antes de escalar."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "CPA cruza com tudo",
            body: "CPA é resultado de várias engrenagens. CPC e CPM afetam o custo de entrada. Taxa de Visualização mostra desperdício entre clique e página. PV–IC mostra se a página convence. IC–Compras mostra se o checkout fecha. CPA junta tudo isso no bolso.",
            cards: [
              {
                label: "CPA alto + CPC alto",
                status: "warn",
                text: "Entrada cara no funil."
              },
              {
                label: "CPA alto + PV–IC baixo",
                status: "bad",
                text: "Página não está gerando intenção suficiente."
              },
              {
                label: "CPA alto + IC–Compras baixo",
                status: "bad",
                text: "Checkout está vazando comprador quente."
              },
              {
                label: "CPA bom + funil saudável",
                status: "good",
                text: "Campanha começa a ficar interessante para escala."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico cruzado",
            question: "CPA alto + IC–Compras baixo. Qual leitura faz mais sentido?",
            options: [
              {
                text: "O custo por venda está alto e o checkout pode estar vazando compradores.",
                correct: true,
                feedback: "Perfeito. IC–Compras baixo aumenta o custo final por venda, porque muita gente quente abandona."
              },
              {
                text: "O checkout está perfeito.",
                feedback: "IC–Compras baixo aponta o contrário: o fechamento está perdendo gente."
              },
              {
                text: "O CPM é sempre baixo.",
                feedback: "Essa combinação não afirma CPM baixo. Ela aponta problema de custo final e fechamento."
              },
              {
                text: "A página obrigatoriamente tem PV–IC alto.",
                feedback: "Não dá para afirmar sem olhar PV–IC. Aqui o sinal forte está no checkout."
              },
              {
                text: "A campanha deve escalar imediatamente.",
                feedback: "CPA alto com checkout vazando não é sinal de escala. É sinal de correção."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo CPA amassado",
            body: "Agora você sabe que CPA é o preço real da venda. Se ele fica abaixo do seu limite e se repete com consistência, a campanha começa a ficar interessante. Se passa do limite, escalar só aumenta o prejuízo. Próximo módulo natural: ROAS/ROI, a leitura do retorno.",
            xp: 140
          }
        ]
      }
