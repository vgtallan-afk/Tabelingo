// Módulo 08 — Diagnóstico Cruzado
// Objeto pronto para colar dentro do array MODULES.

{
        id: "diagnostico-cruzado",
        title: "Diagnóstico Cruzado: para de chutar",
        metric: "Funil",
        description: "Aprenda a cruzar CPC, CPM, Taxa de Visualização, PV–IC, IC–Compras, CPA e ROAS para achar o gargalo real.",
        xp: 180,
        difficulty: "Intermediário",
        estimatedMinutes: 20,
        requiresTicket: true,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "Métrica isolada mente bonito",
            body: "Uma métrica sozinha pode te enganar feio. ROAS baixo não diz sozinho se o problema é criativo, página, checkout, ticket ou público. CPC bom não garante venda. PV–IC bom não garante lucro. O diagnóstico cruzado existe para responder uma pergunta: onde exatamente está o gargalo?",
            cards: [
              {
                label: "Erro de iniciante",
                text: "Olhar uma métrica isolada e sair mexendo em tudo."
              },
              {
                label: "Leitura profissional",
                text: "Cruzar as métricas na ordem do funil."
              },
              {
                label: "Pergunta certa",
                text: "Em qual etapa o sistema está quebrando?"
              }
            ]
          },
          {
            type: "quiz",
            title: "Sem chute",
            question: "Por que olhar apenas ROAS pode gerar decisão errada?",
            options: [
              {
                text: "Porque ROAS mostra consequência, mas não mostra sozinho onde está o gargalo.",
                correct: true,
                feedback: "Isso. ROAS diz que algo deu bom ou ruim; as métricas intermediárias mostram onde mexer."
              },
              {
                text: "Porque ROAS sempre é inútil.",
                feedback: "ROAS é útil, sim. O problema é usar ele sozinho como se fosse diagnóstico completo."
              },
              {
                text: "Porque CPC substitui todas as outras métricas.",
                feedback: "CPC é só o custo do clique. Ele não substitui página, checkout, CPA ou ROAS."
              },
              {
                text: "Porque checkout nunca influencia resultado.",
                feedback: "Checkout influencia muito. Por isso precisa cruzar IC–Compras com as outras etapas."
              },
              {
                text: "Porque toda campanha ruim é culpa do público.",
                feedback: "Pode ser público, mas também pode ser criativo, página, checkout, oferta ou margem."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "O funil é uma sequência de engrenagens",
            body: "Pensa no funil como uma sequência: anúncio aparece, pessoa clica, página carrega, página convence, checkout inicia, compra acontece, CPA e ROAS fecham a conta. Se uma engrenagem trava, o sistema inteiro sofre. O segredo é não mexer na engrenagem errada.",
            cards: [
              {
                label: "1. Atenção",
                text: "CPM, CPC e CTR mostram o topo do funil."
              },
              {
                label: "2. Chegada",
                text: "Taxa de Visualização mostra se o clique virou página carregada."
              },
              {
                label: "3. Intenção",
                text: "PV–IC mostra se a página levou para checkout."
              },
              {
                label: "4. Fechamento",
                text: "IC–Compras mostra se checkout virou compra."
              },
              {
                label: "5. Resultado",
                text: "CPA, ROAS e ROI mostram se a conta fecha."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ordem do funil",
            question: "Qual sequência faz mais sentido para diagnosticar uma campanha?",
            options: [
              {
                text: "Anúncio → chegada na página → página → checkout → CPA/ROAS.",
                correct: true,
                feedback: "Perfeito. Essa ordem evita culpar uma etapa antes de validar a anterior."
              },
              {
                text: "ROAS → chute → troca tudo → torce.",
                feedback: "Essa é a receita do caos. Diagnóstico profissional segue o caminho do funil."
              },
              {
                text: "Checkout → CPM → cor do botão → CPC.",
                feedback: "Essa ordem pula etapas e mistura causa com consequência. Primeiro topo, depois página, depois checkout."
              },
              {
                text: "Apenas CPC, porque clique resolve tudo.",
                feedback: "CPC é começo, não sistema completo. Clique não garante página, checkout ou lucro."
              },
              {
                text: "Apenas ROAS, porque resultado final explica tudo.",
                feedback: "ROAS mostra o final, mas não explica sozinho onde corrigir."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "Cenário 1: CPC bom + Visualização baixa",
            body: "Esse cenário é traiçoeiro. O anúncio até gera clique barato, mas a pessoa não chega bem na página. Pode ser página lenta, promessa desalinhada, público curioso ou problema de rastreamento. Não adianta mexer na página de venda se metade nem carrega a página.",
            cards: [
              {
                label: "Leitura",
                status: "warn",
                text: "O clique existe, mas a ponte até a página está vazando."
              },
              {
                label: "Ação 1",
                text: "Testar velocidade e carregamento mobile."
              },
              {
                label: "Ação 2",
                text: "Revisar promessa do anúncio vs página."
              },
              {
                label: "Ação 3",
                text: "Checar público e rastreamento."
              }
            ]
          },
          {
            type: "quiz",
            title: "Cenário 1",
            question: "CPC está bom, mas Taxa de Visualização está baixa. Qual diagnóstico faz mais sentido?",
            options: [
              {
                text: "O clique está vindo barato, mas pode estar vazando antes da página ou vindo sem intenção real.",
                correct: true,
                feedback: "Boa. O gargalo está entre clique e página, não necessariamente na oferta final."
              },
              {
                text: "A página está comprovadamente perfeita.",
                feedback: "Não dá para afirmar. Muita gente nem chegou nela para testar de verdade."
              },
              {
                text: "O checkout é o único culpado.",
                feedback: "Ainda não chegamos no checkout. Primeiro resolva a chegada na página."
              },
              {
                text: "Escala porque CPC bom resolve tudo.",
                feedback: "CPC bom com visualização baixa só aumenta vazamento se você escalar."
              },
              {
                text: "ROAS está garantido.",
                feedback: "Não. Se o clique não vira página, o retorno tende a sofrer."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "Cenário 2: CPC bom + Visualização boa + PV–IC baixo",
            body: "Agora o tráfego clicou e chegou. Se o PV–IC está baixo, o problema começa a apontar para a página ou oferta. A pessoa viu a página, mas não sentiu vontade suficiente de iniciar checkout. Aqui entram promessa, headline, benefício, prova social, CTA e garantia.",
            cards: [
              {
                label: "Leitura",
                status: "bad",
                text: "Tráfego chegou, mas a página não convenceu."
              },
              {
                label: "Ação 1",
                text: "Melhorar headline e promessa."
              },
              {
                label: "Ação 2",
                text: "Inserir prova social e reduzir dúvida."
              },
              {
                label: "Ação 3",
                text: "Deixar CTA claro, visível e repetido."
              }
            ]
          },
          {
            type: "quiz",
            title: "Cenário 2",
            question: "CPC bom, Visualização boa e PV–IC baixo. Onde está o principal suspeito?",
            options: [
              {
                text: "Na página/oferta, porque o tráfego chega mas não inicia checkout.",
                correct: true,
                feedback: "Exato. Se chegou bem e não avançou, a página/oferta vira o principal suspeito."
              },
              {
                text: "Na velocidade da página obrigatoriamente.",
                feedback: "Se a visualização está boa, a página está carregando para boa parte das pessoas. O problema é persuasão/avanço."
              },
              {
                text: "No checkout, com certeza absoluta.",
                feedback: "Ainda não. O problema é que pouca gente está iniciando checkout."
              },
              {
                text: "No CPM, sempre.",
                feedback: "CPM pode pesar no topo, mas esse cenário aponta mais para a página."
              },
              {
                text: "Não existe problema.",
                feedback: "PV–IC baixo é problema claro: a página não está empurrando para checkout."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "Cenário 3: PV–IC bom + IC–Compras baixo",
            body: "Aqui a página convence. A pessoa inicia checkout. Mas na hora de pagar, ela some. Isso aponta para problema no fechamento: checkout complicado, taxa surpresa, falta de pagamento, pouca confiança, garantia fraca ou preço parecendo pesado no último passo.",
            cards: [
              {
                label: "Leitura",
                status: "bad",
                text: "Página gera intenção, mas checkout trava compra."
              },
              {
                label: "Ação 1",
                text: "Simplificar checkout e reduzir campos."
              },
              {
                label: "Ação 2",
                text: "Reforçar garantia, segurança e prova social."
              },
              {
                label: "Ação 3",
                text: "Adicionar métodos de pagamento e evitar taxa surpresa."
              }
            ]
          },
          {
            type: "quiz",
            title: "Cenário 3",
            question: "PV–IC está bom, mas IC–Compras está baixo. Qual leitura faz mais sentido?",
            options: [
              {
                text: "A página leva para o checkout, mas o fechamento está travando a compra.",
                correct: true,
                feedback: "Perfeito. A intenção existe, mas algo no checkout está espantando o comprador quente."
              },
              {
                text: "O anúncio nunca funcionou.",
                feedback: "Se existe PV–IC bom, a pessoa chegou e avançou. O gargalo indicado está depois."
              },
              {
                text: "A página não convence ninguém.",
                feedback: "PV–IC bom mostra que a página convence a iniciar checkout."
              },
              {
                text: "O CPM é o único culpado.",
                feedback: "CPM pode afetar custo, mas esse cruzamento aponta para checkout."
              },
              {
                text: "Pode escalar sem olhar nada.",
                feedback: "Checkout vazando comprador quente não é cenário seguro para escala."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Cenário 4: tudo saudável + CPA alto",
            body: "Esse é o cenário em que as etapas parecem boas, mas o custo por venda ainda fica alto. Pode ser ticket baixo demais, margem apertada, público caro ou oferta sem aumento de valor médio. Aqui não adianta só mexer em botão. Talvez precise ajustar oferta, kit, upsell, preço, público ou estrutura de margem.",
            cards: [
              {
                label: "Leitura",
                status: "warn",
                text: "O funil converte, mas a matemática do lucro está apertada."
              },
              {
                label: "Ação 1",
                text: "Testar kits, combos, order bump ou upsell."
              },
              {
                label: "Ação 2",
                text: "Ajustar oferta para aumentar ticket médio."
              },
              {
                label: "Ação 3",
                text: "Revisar público se o custo de entrada estiver caro demais."
              }
            ],
            dynamicNote: "cpaBreakevenContext"
          },
          {
            type: "quiz",
            title: "Cenário 4",
            question: "Todas as etapas parecem saudáveis, mas o CPA está acima do limite. Qual leitura faz mais sentido?",
            options: [
              {
                text: "A estrutura converte, mas a conta financeira está apertada; precisa ajustar oferta, ticket, margem ou custo.",
                correct: true,
                feedback: "Boa. Quando o funil funciona mas o CPA não cabe, o problema pode ser matemática de negócio."
              },
              {
                text: "O checkout é obrigatoriamente o único problema.",
                feedback: "Se IC–Compras está saudável, o checkout não é o principal suspeito."
              },
              {
                text: "A página nunca convenceu ninguém.",
                feedback: "Se PV–IC está saudável, a página está conduzindo para checkout."
              },
              {
                text: "Aumentar orçamento resolve sempre.",
                feedback: "Se CPA já está acima do limite, escalar pode multiplicar prejuízo."
              },
              {
                text: "Não precisa olhar margem.",
                feedback: "Margem é essencial. CPA só faz sentido comparado ao que sobra."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Cenário 5: CTR baixo + PV–IC alto",
            body: "CTR é a taxa de cliques: quantas pessoas clicam depois de ver o anúncio. Se o CTR está baixo, pouca gente clica. Mas se o PV–IC está alto, quem clica é quente. O problema não é qualidade de quem chega; é volume de gente clicando. Ação: testar novos criativos e ângulos para aumentar alcance qualificado.",
            formula: "CTR = cliques ÷ impressões × 100",
            cards: [
              {
                label: "Leitura",
                status: "warn",
                text: "Quem clica presta, mas pouca gente está clicando."
              },
              {
                label: "Ação 1",
                text: "Testar novos criativos e primeiros segundos."
              },
              {
                label: "Ação 2",
                text: "Criar novos ângulos de promessa."
              },
              {
                label: "Ação 3",
                text: "Aumentar alcance sem perder qualidade."
              }
            ]
          },
          {
            type: "quiz",
            title: "Cenário 5",
            question: "CTR baixo e PV–IC alto. Qual leitura faz mais sentido?",
            options: [
              {
                text: "Pouca gente clica, mas quem clica tende a ser qualificado. Precisa melhorar criativo/alcance.",
                correct: true,
                feedback: "Exatamente. O gargalo é volume de clique, não necessariamente qualidade da página."
              },
              {
                text: "Todo clique é ruim.",
                feedback: "PV–IC alto mostra que quem clica tende a avançar bem na página."
              },
              {
                text: "A página está obrigatoriamente fraca.",
                feedback: "PV–IC alto indica que a página está conduzindo quem chega."
              },
              {
                text: "O checkout está sempre quebrado.",
                feedback: "Esse cenário não fala diretamente de checkout. Ele fala de clique e avanço na página."
              },
              {
                text: "Não precisa criar novos criativos.",
                feedback: "CTR baixo normalmente pede novos criativos, hooks e ângulos para aumentar cliques qualificados."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "A ordem certa de decisão",
            body: "Antes de escalar, passa o pente fino: o anúncio atrai clique bom? O clique chega na página? A página leva para checkout? O checkout fecha? O CPA cabe na margem? O ROAS/ROI confirma retorno? Se uma resposta falha, você corrige antes de escalar.",
            cards: [
              {
                label: "1",
                text: "Topo: CPM, CPC e CTR."
              },
              {
                label: "2",
                text: "Ponte: Taxa de Visualização."
              },
              {
                label: "3",
                text: "Página: PV–IC."
              },
              {
                label: "4",
                text: "Checkout: IC–Compras."
              },
              {
                label: "5",
                text: "Resultado: CPA, ROAS e ROI."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ordem de decisão",
            question: "Antes de escalar, qual pergunta é mais completa?",
            options: [
              {
                text: "O funil inteiro está saudável, do anúncio ao CPA/ROAS?",
                correct: true,
                feedback: "É isso. Escala segura exige sistema validado, não empolgação com uma métrica solta."
              },
              {
                text: "Tive uma venda isolada, então acabou a análise?",
                feedback: "Uma venda isolada pode enganar. Precisa olhar estrutura e consistência."
              },
              {
                text: "O ROAS deu bom uma vez, então ignoro o resto?",
                feedback: "ROAS isolado é perigoso. Precisa cruzar as etapas."
              },
              {
                text: "Meu criativo é bonito, então escala?",
                feedback: "Criativo bonito não basta. Métrica precisa provar que o funil funciona."
              },
              {
                text: "Meu CPC está baixo, então checkout não importa?",
                feedback: "CPC baixo só abre a porta. Checkout e CPA ainda decidem se sobra dinheiro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 9",
            title: "Mapa rápido de gargalos",
            body: "Guarda esse mapa: CPC/CPM ruins apontam topo. Visualização baixa aponta ponte. PV–IC baixo aponta página/oferta. IC–Compras baixo aponta checkout. CPA alto aponta custo por venda acima do limite. ROAS/ROI ruim aponta consequência financeira. O trabalho é voltar da consequência até a causa.",
            cards: [
              {
                label: "Topo",
                text: "Criativo, público, leilão e promessa inicial."
              },
              {
                label: "Ponte",
                text: "Carregamento, alinhamento e intenção do clique."
              },
              {
                label: "Página",
                text: "Clareza, oferta, prova, CTA e garantia."
              },
              {
                label: "Checkout",
                text: "Fricção, confiança, pagamento e surpresa ruim."
              },
              {
                label: "Resultado",
                text: "CPA, margem, ticket, ROAS e ROI."
              }
            ]
          },
          {
            type: "quiz",
            title: "Mapa de gargalo",
            question: "Qual combinação aponta mais diretamente para problema de página/oferta?",
            options: [
              {
                text: "Taxa de Visualização boa + PV–IC baixo.",
                correct: true,
                feedback: "Boa. O tráfego chegou, mas a página não convenceu a iniciar checkout."
              },
              {
                text: "CPM alto + CPC alto.",
                feedback: "Isso aponta mais para topo caro: leilão, público ou criativo."
              },
              {
                text: "PV–IC bom + IC–Compras baixo.",
                feedback: "Isso aponta mais para checkout travando, não página."
              },
              {
                text: "CPA bom + ROAS bom.",
                feedback: "Isso tende a indicar resultado saudável, não gargalo."
              },
              {
                text: "CPC bom + Visualização baixa.",
                feedback: "Isso aponta mais para ponte entre clique e página, não necessariamente página/oferta."
              }
            ]
          },
          {
            type: "complete",
            title: "Diagnóstico Cruzado amassado",
            body: "Agora você saiu do modo chute e entrou no modo diagnóstico. A partir daqui, métrica nenhuma manda sozinha. Você lê o funil como sistema, acha o gargalo certo e corrige antes de escalar. Próximo passo: módulo final de prática com cenários aleatórios.",
            xp: 180
          }
        ]
      }
