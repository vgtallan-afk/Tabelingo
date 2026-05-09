/* Tabelingo V14 Clean Original — app tratado como fonte original, com UX mais limpa, tema e escala visual. */
// V8 Direct: sem service worker, sem reset automático e sem cache PWA na abertura.

    // Hotfix de estabilidade: evita tela fechando/branca por erro de cache, armazenamento ou renderização.
    window.addEventListener("error", (event) => {
      handleRuntimeError(event.error || event.message || "Erro inesperado");
    });

    window.addEventListener("unhandledrejection", (event) => {
      handleRuntimeError(event.reason || "Promessa rejeitada");
    });

    /*
      TABELINGO — MOTOR DE AULAS EM MICROTELAS

      Estrutura:
      - Cada módulo tem "screens".
      - Cada screen pode ser:
        1) setup: pergunta ticket médio antes do módulo
        2) lesson: explicação curta + botão continuar
        3) quiz: pergunta A/B/C/D/E + feedback
        4) complete: fim do módulo

      Regras:
      - Resposta errada explica o erro, mas não entrega a correta.
      - Resposta certa explica por que está certa e libera a próxima tela.
      - O ticket médio fica salvo e pode ser usado em qualquer módulo futuro.
    */

    const STORAGE_KEY = "tabelingo_v10_progress";
    const CAMPAIGN_HISTORY_KEY = "campaigns";
    const CAMPAIGN_LATEST_KEY = "tabelingo_latest_campaign_result";
    const CREATIVE_LATEST_KEY = "tabelingo_latest_creative_result";
    const LETTERS = ["A", "B", "C", "D", "E"];

    const MODULES = [
      {
        id: "mentalidade-escala",
        title: "Mentalidade: escala sem impulso",
        metric: "Mentalidade",
        description: "Antes de CPC, ROAS ou CPA, aprenda a pensar como gestor: escala não é empolgação, é validação do funil inteiro.",
        xp: 100,
        difficulty: "Básico",
        estimatedMinutes: 10,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Base da escala",
            title: "Antes das métricas: a cabeça certa",
            body: "O Tabelingo começa por mentalidade porque o maior erro não é errar uma conta. É escalar no impulso. Muita gente vê uma venda, um print bonito ou um ROAS alto e já quer aumentar orçamento. Só que escala não serve para consertar campanha quebrada. Escala serve para ampliar algo que já está saudável.",
            cards: [
              {
                label: "Ideia central",
                text: "Não aumente orçamento para tentar salvar uma campanha. Primeiro descubra onde está o gargalo."
              },
              {
                label: "Tradução prática",
                text: "Antes de falar 'vou escalar', confirme anúncio, página, checkout, CPA, ROAS, volume e rastreamento."
              }
            ]
          },
          {
            type: "quiz",
            title: "Primeiro exercício",
            question: "Qual é a mentalidade correta antes de escalar uma campanha?",
            options: [
              {
                text: "Escalar só quando o funil inteiro mostra sinais saudáveis, não apenas por empolgação.",
                correct: true,
                feedback: "Perfeito. Essa é a base da Tabela Inteligente: transformar emoção em diagnóstico."
              },
              {
                text: "Escalar sempre que aparecer uma venda isolada.",
                feedback: "Uma venda pode ser sinal, mas não valida o sistema inteiro. Falta olhar o funil."
              },
              {
                text: "Escalar quando o ROAS estiver alto, mesmo sem olhar página e checkout.",
                feedback: "ROAS é consequência. Ele mostra resultado, mas não explica onde o funil está forte ou fraco."
              },
              {
                text: "Escalar para corrigir criativo, página ou checkout ruins.",
                feedback: "Escala não corrige problema. Ela multiplica o que já existe. Se está quebrado, amplia o prejuízo."
              },
              {
                text: "Escalar sem olhar dados, usando só feeling.",
                feedback: "Feeling ajuda na criação, mas decisão de escala precisa de métrica cruzada."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "Escalar não é aumentar orçamento",
            body: "Aumentar orçamento é só mexer na verba. Escalar de verdade é ampliar algo que já provou que funciona. Se anúncio atrai a pessoa errada, se a página não convence ou se o checkout trava, colocar mais dinheiro só acelera o vazamento.",
            cards: [
              {
                label: "Campanha instável",
                text: "Mais verba pode gerar mais cliques ruins, mais abandono e mais prejuízo."
              },
              {
                label: "Campanha saudável",
                text: "Mais verba pode ampliar um sistema que já tem lógica, margem e consistência."
              }
            ]
          },
          {
            type: "quiz",
            title: "Escala de verdade",
            question: "Na lógica do Tabelingo, o que significa escalar uma campanha?",
            options: [
              {
                text: "Ampliar algo que já está estruturalmente saudável.",
                correct: true,
                feedback: "Isso. Escala é ampliação de um sistema validado, não aposta para ver se melhora."
              },
              {
                text: "Aumentar orçamento sempre que o anúncio tiver bastante impressão.",
                feedback: "Impressão mostra alcance, mas não valida clique, página, checkout, CPA e venda."
              },
              {
                text: "Trocar tudo da campanha ao mesmo tempo.",
                feedback: "Trocar tudo junto dificulta saber o que funcionou. Escala exige controle."
              },
              {
                text: "Ignorar gargalos e comprar mais tráfego.",
                feedback: "Comprar mais tráfego em funil com gargalo só aumenta o problema."
              },
              {
                text: "Olhar só o faturamento total.",
                feedback: "Faturamento sem CPA, margem e ROAS pode esconder prejuízo."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "O funil é um sistema",
            body: "A Tabela Inteligente olha a campanha como engrenagens conectadas: anúncio, página, checkout e venda. Se uma engrenagem falha, o resultado final sofre. Por isso o app não deve perguntar só 'vendeu?'. Ele precisa descobrir onde a pessoa parou.",
            formula: "Anúncio → Página → Checkout → Venda",
            cards: [
              {
                label: "Anúncio saudável",
                text: "Atrai cliques qualificados, não só curiosos."
              },
              {
                label: "Página saudável",
                text: "Faz a pessoa entender a oferta e iniciar checkout."
              },
              {
                label: "Checkout saudável",
                text: "Reduz fricção e transforma intenção em compra."
              },
              {
                label: "Conta saudável",
                text: "CPA fica abaixo do limite e o retorno faz sentido."
              }
            ]
          },
          {
            type: "quiz",
            title: "Sistema, não chute",
            question: "Se o ROAS caiu, qual é a atitude mais inteligente?",
            options: [
              {
                text: "Investigar o funil para descobrir se o problema está no anúncio, página, checkout, CPA, volume ou tracking.",
                correct: true,
                feedback: "Boa. ROAS avisa que algo mudou, mas as métricas intermediárias mostram onde mexer."
              },
              {
                text: "Culpar automaticamente o checkout.",
                feedback: "Pode ser checkout, mas também pode ser clique ruim, página fraca, público caro ou tracking."
              },
              {
                text: "Aumentar orçamento para compensar.",
                feedback: "Se não sabe onde está o gargalo, mais verba pode só aumentar o prejuízo."
              },
              {
                text: "Pausar tudo sem olhar mais nada.",
                feedback: "Às vezes pausar faz sentido, mas primeiro entenda se é falta de volume, erro de dado ou gargalo real."
              },
              {
                text: "Olhar apenas o número de curtidas.",
                feedback: "Curtida pode ajudar criativo, mas não substitui métricas de funil e dinheiro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "ROAS é consequência, não causa",
            body: "O Tabelingo bate muito nessa tecla: ROAS sozinho pode enganar. ROAS baixo não diz automaticamente o motivo. Pode ser criativo, público, página, checkout, ticket, margem ou rastreamento. As métricas do meio do funil mostram onde está o erro.",
            cards: [
              {
                label: "ROAS responde",
                text: "Quanto voltou em receita para cada real investido."
              },
              {
                label: "ROAS não responde sozinho",
                text: "Por que voltou pouco, onde travou e qual ajuste fazer primeiro."
              }
            ]
          },
          {
            type: "quiz",
            title: "ROAS sem ilusão",
            question: "Por que não dá para decidir escala olhando só ROAS?",
            options: [
              {
                text: "Porque ROAS mostra o resultado final, mas não mostra sozinho a causa do resultado.",
                correct: true,
                feedback: "Exato. ROAS é importante, mas precisa ser cruzado com as etapas do funil."
              },
              {
                text: "Porque ROAS nunca deve ser usado.",
                feedback: "ROAS deve ser usado, sim. O erro é usar sozinho."
              },
              {
                text: "Porque CPC sempre é mais importante que venda.",
                feedback: "CPC é topo do funil. Venda e ROAS importam, mas precisam ser lidos junto com o caminho até ela."
              },
              {
                text: "Porque margem não tem relação com escala.",
                feedback: "Margem tem muita relação com escala, principalmente para saber o CPA máximo aceitável."
              },
              {
                text: "Porque checkout sempre é o único problema.",
                feedback: "Checkout é uma etapa, mas não é sempre o culpado."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "Perguntas de gestor profissional",
            body: "Um gestor profissional não para no 'está vendendo?'. Ele pergunta se o topo está atraindo gente boa, se o clique virou visualização, se a página levou ao checkout, se o checkout fechou, se o CPA cabe na margem e se existe volume suficiente para confiar no diagnóstico.",
            cards: [
              {
                label: "Pergunta 1",
                text: "O CPC, CPM e CTR mostram um anúncio saudável?"
              },
              {
                label: "Pergunta 2",
                text: "A Taxa de Visualização mostra que o clique chegou de verdade?"
              },
              {
                label: "Pergunta 3",
                text: "PV–IC e IC–Compras mostram página e checkout funcionando?"
              },
              {
                label: "Pergunta 4",
                text: "CPA, ROAS e margem sustentam a escala?"
              }
            ]
          },
          {
            type: "quiz",
            title: "Pensamento profissional",
            question: "Qual pergunta combina mais com a mentalidade da Tabela Inteligente?",
            options: [
              {
                text: "Onde exatamente o funil está saudável e onde está vazando?",
                correct: true,
                feedback: "Boa. Essa pergunta puxa diagnóstico, não chute."
              },
              {
                text: "Teve uma venda, então já posso dobrar o orçamento?",
                feedback: "Calma. Uma venda isolada não prova que o sistema está pronto para escala."
              },
              {
                text: "O ROAS está alto, então não preciso olhar mais nada?",
                feedback: "Precisa olhar o restante do funil, volume, CPA, margem e tracking."
              },
              {
                text: "Se o anúncio está bonito, posso ignorar métrica?",
                feedback: "Criativo bonito não basta. Ele precisa atrair a pessoa certa e gerar caminho até venda."
              },
              {
                text: "Se gastou pouco, qualquer resultado serve?",
                feedback: "Com pouco dado, a leitura é provisória. O app precisa avisar isso."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "A regra de ouro",
            body: "Nunca escale para tentar corrigir um problema. Primeiro corrija. Depois valide. Só então pense em ampliar. Essa é a diferença entre subir orçamento com clareza e apostar dinheiro no escuro.",
            cards: [
              {
                label: "Antes de escalar",
                text: "Diagnosticar gargalo, corrigir etapa fraca e confirmar com dados."
              },
              {
                label: "Na escala",
                text: "Subir aos poucos, monitorar e parar se CPA, ROAS, frequência ou conversão piorarem."
              }
            ]
          },
          {
            type: "complete",
            title: "Mentalidade amassada",
            body: "Agora sim faz sentido começar as métricas. Você entendeu que a Tabela Inteligente não é sobre apertar botão de orçamento; é sobre diagnosticar anúncio, página, checkout e dinheiro antes de decidir. Próximo passo: CPC, o custo do clique.",
            xp: 100
          }
        ]
      },
      {
        id: "cpc",
        title: "CPC: custo do clique",
        metric: "CPC",
        description: "Aprenda o que o CPC mede, como calcular e como saber se ele está leve ou pesado para seu produto.",
        xp: 100,
        difficulty: "Básico",
        estimatedMinutes: 12,
        requiresTicket: true,
        screens: [
          {
            type: "setup",
            title: "Antes do CPC: quanto custa seu produto?",
            body: "Pra não ficar naquela régua cega de internet, o Tabelingo usa seu ticket médio nos exemplos. Ticket médio é quanto você recebe, em média, por venda.",
            inputLabel: "Qual é o ticket médio do seu produto ou kit?",
            placeholder: "Ex: 79,90"
          },
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é CPC de verdade?",
            body: "CPC significa Custo por Clique. Ele mostra quanto você pagou, em média, para uma pessoa clicar no seu anúncio. Ele acontece no começo do funil: antes da página, antes do checkout e antes da venda.",
            formula: "CPC = valor gasto ÷ quantidade de cliques",
            cards: [
              {
                label: "Exemplo seco",
                text: "Gastou R$ 30 e recebeu 60 cliques? Seu CPC foi R$ 0,50."
              },
              {
                label: "O que ele NÃO mede",
                text: "CPC não mede lucro, venda ou checkout. Ele mede o preço do clique."
              }
            ]
          },
          {
            type: "quiz",
            title: "O que o CPC mostra?",
            question: "Escolhe a definição mais correta de CPC:",
            options: [
              {
                text: "Quanto você paga, em média, por cada clique no anúncio.",
                correct: true,
                feedback: "Isso. CPC é o custo médio de cada clique. Ele mostra o preço para tirar a pessoa do anúncio e levar para o próximo passo."
              },
              {
                text: "Quanto você ganha em média por cada venda.",
                feedback: "Essa opção fala de receita/ticket, não de clique. CPC acontece antes da venda existir."
              },
              {
                text: "Quantas pessoas finalizaram a compra.",
                feedback: "Isso é fechamento/conversão, lá no fim do funil. CPC fica no começo, quando a pessoa só clicou."
              },
              {
                text: "Quanto custa aparecer para mil pessoas.",
                feedback: "Essa é a ideia do CPM, não do CPC. Aqui a pergunta é sobre custo por clique."
              },
              {
                text: "A porcentagem de pessoas que chegaram no checkout.",
                feedback: "Essa leitura tem mais relação com página e checkout. CPC mede o preço do clique, não a passagem para checkout."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "Como calcular CPC sem sofrer",
            body: "A conta é simples: pega o valor gasto e divide pela quantidade de cliques. O resultado é o preço médio de cada clique. Se você gastou muito e recebeu poucos cliques, o CPC sobe. Se gastou pouco e recebeu muitos cliques, o CPC cai.",
            formula: "CPC = gasto ÷ cliques",
            cards: [
              {
                label: "Conta 1",
                text: "R$ 20 gastos ÷ 40 cliques = CPC de R$ 0,50."
              },
              {
                label: "Conta 2",
                text: "R$ 50 gastos ÷ 25 cliques = CPC de R$ 2,00."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Você gastou R$ 50 e recebeu 25 cliques. Qual foi o CPC?",
            options: [
              {
                text: "R$ 0,50",
                feedback: "Essa conta ficou baixa demais. Divide 50 por 25 com calma: cada grupo de 25 cabe duas vezes em 50."
              },
              {
                text: "R$ 1,00",
                feedback: "Ainda não. R$ 1 por clique daria 50 cliques com R$ 50 gastos. Aqui foram só 25 cliques."
              },
              {
                text: "R$ 2,00",
                correct: true,
                feedback: "Boa. R$ 50 dividido por 25 cliques dá R$ 2,00 por clique."
              },
              {
                text: "R$ 25,00",
                feedback: "Esse valor confundiu com quantidade de cliques. CPC é gasto dividido por cliques, não o número de cliques."
              },
              {
                text: "R$ 50,00",
                feedback: "Esse é o gasto total, não o custo por clique. O CPC precisa dividir esse valor pelos cliques."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua base do CPC",
            body: "A tabela base usa uma régua prática para campanhas de entrada e produtos de ticket menor. Ela ajuda a identificar se o clique está barato, em atenção ou caro. Mas ela não é uma lei absoluta: ticket, margem e conversão mudam o jogo.",
            cards: [
              {
                label: "🟢 Bom/ideal",
                text: "CPC abaixo de R$ 1,00 costuma ser saudável."
              },
              {
                label: "🟡 Atenção",
                text: "CPC entre R$ 1,00 e R$ 2,00 pede monitoramento."
              },
              {
                label: "🔴 Ruim/perigoso",
                text: "CPC acima de R$ 2,00 costuma exigir revisão antes de escalar."
              }
            ],
            dynamicNote: "ticketWeight"
          },
          {
            type: "quiz",
            title: "Régua base",
            question: "Na régua base do Tabelingo, CPC de R$ 1,45 entra em qual zona?",
            options: [
              {
                text: "Bom/ideal.",
                feedback: "Bom/ideal fica abaixo de R$ 1,00. R$ 1,45 já passou dessa faixa."
              },
              {
                text: "Zona de atenção.",
                correct: true,
                feedback: "Certo. Entre R$ 1,00 e R$ 2,00 é zona de atenção: não é pânico, mas precisa monitorar."
              },
              {
                text: "Ruim/perigoso.",
                feedback: "Ruim/perigoso começa acima de R$ 2,00 na régua base. R$ 1,45 ainda está na faixa de atenção."
              },
              {
                text: "Garantia de escala.",
                feedback: "Nenhuma métrica isolada garante escala. Mesmo CPC bom precisa ser cruzado com o resto do funil."
              },
              {
                text: "Problema obrigatório no checkout.",
                feedback: "CPC é topo do funil. Checkout é outra etapa. Não pula diagnóstico."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "Por que o ticket médio muda a leitura?",
            body: "Um CPC de R$ 2,00 pesa diferente dependendo do preço do produto. Em um produto de R$ 29,90, R$ 2 por clique pode comer a margem rápido. Em um produto de R$ 397, esse mesmo CPC pode ser aceitável se a página e o checkout converterem bem.",
            dynamicNote: "ticketCpcComparison",
            cards: [
              {
                label: "Atenção real",
                text: "Só o ticket não fecha a conta toda. Para decidir escala de verdade, você também precisa olhar margem, CPA máximo e taxa de conversão."
              },
              {
                label: "Mesmo assim ajuda",
                text: "O ticket médio já impede você de comparar produto barato com produto caro como se fosse tudo igual."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ticket muda o jogo",
            question: "Por que não dá para dizer que R$ 2,00 de CPC é sempre ruim para todo produto?",
            options: [
              {
                text: "Porque o peso do CPC depende do ticket, margem e conversão do funil.",
                correct: true,
                feedback: "Exatamente. O mesmo CPC pode ser pesado para produto barato e aceitável para produto caro, dependendo da margem e conversão."
              },
              {
                text: "Porque CPC nunca importa.",
                feedback: "CPC importa sim. O erro é ler CPC sozinho, sem contexto de ticket, margem e conversão."
              },
              {
                text: "Porque todo produto caro sempre vende fácil.",
                feedback: "Produto caro não vende automaticamente. Ele pode suportar CPC maior, mas precisa de funil forte."
              },
              {
                text: "Porque CPM substitui totalmente o CPC.",
                feedback: "CPM ajuda no diagnóstico, mas não substitui CPC. Cada métrica mostra uma parte do funil."
              },
              {
                text: "Porque o checkout sempre resolve clique caro.",
                feedback: "Checkout bom ajuda, mas não faz milagre se o topo do funil estiver atraindo clique caro e ruim."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "O que CPC alto indica?",
            body: "CPC alto é sinal de que está caro fazer a pessoa clicar. Pode ser criativo fraco, promessa sem força, público saturado, segmentação ruim ou leilão competitivo. O erro de iniciante é culpar a página antes de entender se o anúncio está trazendo gente boa.",
            cards: [
              {
                label: "Suspeito 1",
                text: "Criativo sem gancho ou sem clareza."
              },
              {
                label: "Suspeito 2",
                text: "Público caro, errado ou saturado."
              },
              {
                label: "Suspeito 3",
                text: "CPM alto empurrando o custo do clique para cima."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico de CPC alto",
            question: "Seu CPC está acima de R$ 2,00. O que faz mais sentido olhar primeiro?",
            options: [
              {
                text: "Criativo, promessa, público e CPM.",
                correct: true,
                feedback: "Boa. CPC caro mora no topo do funil. Primeiro olha anúncio, público e leilão."
              },
              {
                text: "A cor do botão do checkout, sem olhar anúncio.",
                feedback: "Checkout fica depois. CPC alto aparece antes da pessoa chegar lá. Não começa pelo fim."
              },
              {
                text: "Aumentar orçamento para o algoritmo resolver.",
                feedback: "Escalar não conserta problema. Se o clique já está caro, aumentar verba pode acelerar o prejuízo."
              },
              {
                text: "Ignorar, porque CPC não influencia nada.",
                feedback: "CPC influencia o custo de entrada no funil. Ignorar pode deixar você pagando caro por atenção ruim."
              },
              {
                text: "Apagar a página imediatamente.",
                feedback: "Pode até existir problema na página, mas CPC alto primeiro pede leitura de topo: criativo, público e CPM."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "CPC baixo também pode enganar",
            body: "CPC baixo é bom sinal, mas não é troféu sozinho. Clique barato pode ser clique curioso. Se muita gente clica, mas pouca gente carrega a página, inicia checkout ou compra, o clique barato virou maquiagem bonita em campanha ruim.",
            cards: [
              {
                label: "CPC baixo + visualização boa",
                text: "Bom sinal. A pessoa clica e realmente chega na página."
              },
              {
                label: "CPC baixo + visualização baixa",
                text: "Cuidado. Pode ter clique curioso, promessa desalinhada ou problema de carregamento."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPC baixo não é rei",
            question: "CPC baixo, mas taxa de visualização baixa. Qual leitura é mais inteligente?",
            options: [
              {
                text: "O clique é barato, mas pode estar vazando depois do clique ou atraindo curioso sem intenção.",
                correct: true,
                feedback: "Perfeito. Clique barato só ajuda se a pessoa certa chega de verdade na página."
              },
              {
                text: "A campanha está perfeita e deve escalar agora.",
                feedback: "Calma. CPC baixo sozinho não prova que o funil está saudável. Precisa olhar a chegada na página."
              },
              {
                text: "O checkout é com certeza o único problema.",
                feedback: "Ainda é cedo para culpar checkout. A taxa de visualização fala da ponte entre clique e página."
              },
              {
                text: "O CPC baixo anula qualquer problema.",
                feedback: "Nenhuma métrica anula o resto do funil. Métrica boa isolada pode enganar."
              },
              {
                text: "A página sempre está perfeita nesse cenário.",
                feedback: "Não dá para afirmar. Pode ser carregamento, promessa desalinhada ou tráfego curioso."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "CPC com CPM: agora vira diagnóstico",
            body: "CPM mostra o custo para aparecer para mil pessoas. CPC mostra o custo para alguém clicar. Juntos, eles ajudam a separar problema de criativo, público e competição. É aqui que você para de adivinhar e começa a investigar.",
            cards: [
              {
                label: "CPC baixo + CPM normal",
                text: "Provável anúncio saudável no topo do funil."
              },
              {
                label: "CPC alto + CPM normal",
                text: "Pode ser criativo/promessa fraca: aparece ok, mas pouca gente quer clicar."
              },
              {
                label: "CPC alto + CPM alto",
                text: "Pode ser público caro, competitivo ou anúncio sem força."
              }
            ]
          },
          {
            type: "quiz",
            title: "Cruzamento com CPM",
            question: "CPC alto com CPM normal geralmente aponta mais para qual suspeita?",
            options: [
              {
                text: "Criativo ou promessa sem força para gerar clique.",
                correct: true,
                feedback: "Boa. Se aparecer não está tão caro, mas clicar está caro, o criativo/promessa pode não estar puxando clique."
              },
              {
                text: "Checkout longo demais.",
                feedback: "Checkout vem depois. Essa combinação está falando do anúncio antes do clique virar página."
              },
              {
                text: "Produto obrigatoriamente validado.",
                feedback: "Não dá para validar produto só com CPC e CPM. Isso só ajuda a ler o topo do funil."
              },
              {
                text: "Taxa de compra excelente.",
                feedback: "Compra é métrica de fechamento. CPC e CPM não mostram isso sozinhos."
              },
              {
                text: "Pixel sempre quebrado.",
                feedback: "Pixel pode ser problema em alguns casos, mas essa combinação primeiro sugere leitura de criativo/promessa."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo CPC amassado",
            body: "Agora você já sabe: CPC mede o preço do clique, a régua base ajuda, mas ticket, margem, conversão e outras métricas mudam a leitura. O próximo módulo natural é CPM, o custo da atenção.",
            xp: 100
          }
        ]
      },
      {
        id: "cpm",
        title: "CPM: o custo da atenção",
        metric: "CPM",
        description: "Entenda quanto custa aparecer para mil pessoas, quando isso é bom, quando pesa e como cruzar com CPC.",
        xp: 100,
        difficulty: "Básico",
        estimatedMinutes: 12,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é CPM?",
            body: "CPM significa Custo por Mil Impressões. Ele mostra quanto você paga para seu anúncio aparecer mil vezes. Impressão não é clique, não é visita e não é venda. É só o anúncio sendo exibido para alguém.",
            formula: "CPM = custo para 1.000 impressões",
            cards: [
              {
                label: "Exemplo seco",
                text: "Se seu CPM é R$ 20, significa que você pagou R$ 20 para aparecer mil vezes."
              },
              {
                label: "O que ele mede",
                text: "CPM mede o preço da atenção no leilão, antes da pessoa clicar."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPM sem confundir",
            question: "Escolhe a definição mais correta de CPM:",
            options: [
              {
                text: "Quanto custa aparecer mil vezes para o público.",
                correct: true,
                feedback: "Isso. CPM é o custo para mil impressões. Ele mede o preço de aparecer, não o preço do clique."
              },
              {
                text: "Quanto você paga por cada clique no anúncio.",
                feedback: "Essa é a lógica do CPC. CPM fala de aparecer mil vezes, antes do clique acontecer."
              },
              {
                text: "Quanto você paga por cada compra.",
                feedback: "Isso já fica mais perto de CPA. CPM ainda está no topo do funil, antes da compra."
              },
              {
                text: "Quantas pessoas iniciaram checkout.",
                feedback: "Isso é uma métrica de página/checkout. CPM fica antes: ele mede custo de impressão."
              },
              {
                text: "Quanto você faturou dividido pelo investimento.",
                feedback: "Essa ideia se aproxima de ROAS. CPM não mede retorno, mede custo de exibição."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "CPM não é clique",
            body: "Essa parte é onde muita gente se enrola. CPM alto não quer dizer que ninguém clicou. CPM baixo não quer dizer que a campanha vai vender. CPM só mostra quanto está custando aparecer. Para saber se a pessoa reagiu, você olha CPC e CTR. Para saber se vendeu, olha CPA, ROAS e o resto do funil.",
            cards: [
              {
                label: "CPM",
                text: "Custo para aparecer."
              },
              {
                label: "CPC",
                text: "Custo para alguém clicar."
              },
              {
                label: "CPA",
                text: "Custo para gerar uma compra."
              }
            ]
          },
          {
            type: "quiz",
            title: "Cada métrica no seu lugar",
            question: "Se o anúncio apareceu mil vezes, mas você quer saber quanto custou essa exposição, qual métrica olha?",
            options: [
              {
                text: "CPM.",
                correct: true,
                feedback: "Boa. CPM é exatamente o custo para mil impressões, ou seja, o preço de aparecer."
              },
              {
                text: "CPC.",
                feedback: "CPC só entra quando alguém clica. A pergunta fala do custo de aparecer mil vezes."
              },
              {
                text: "CPA.",
                feedback: "CPA fala de aquisição/compra. Aqui ainda estamos antes do clique e antes da venda."
              },
              {
                text: "ROAS.",
                feedback: "ROAS fala de retorno sobre investimento. Não responde o custo de aparecer."
              },
              {
                text: "IC–Compras.",
                feedback: "IC–Compras fala do checkout virando compra. CPM acontece muito antes disso."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua base do CPM",
            body: "A régua base ajuda a entender se está barato ou caro aparecer para o público. Ela não é uma lei universal, porque nicho, época do ano, concorrência e público mudam o leilão. Mas serve como referência prática para não ficar perdido.",
            cards: [
              {
                label: "🟢 CPM abaixo de R$ 20",
                status: "good",
                text: "Bom/saudável. O custo para aparecer está leve. Agora avalia as outras métricas."
              },
              {
                label: "🟡 CPM entre R$ 20 e R$ 60",
                status: "warn",
                text: "Ponto de atenção. Pode estar normal em nichos competitivos, mas precisa monitorar."
              },
              {
                label: "🔴 CPM acima de R$ 60",
                status: "bad",
                text: "Caro/perigoso. Pode indicar leilão pesado, público muito disputado ou campanha com baixa chance de escala se o ROI estiver ruim."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua do CPM",
            question: "Na régua base do Tabelingo, um CPM de R$ 75 indica o quê?",
            options: [
              {
                text: "Custo de atenção caro/perigoso, pedindo diagnóstico antes de escalar.",
                correct: true,
                feedback: "Certo. Acima de R$ 60, o CPM já está caro na régua base. Antes de escalar, precisa entender o motivo."
              },
              {
                text: "Custo perfeito, pode escalar sem olhar mais nada.",
                feedback: "Nenhuma métrica sozinha libera escala. E R$ 75 está acima da faixa de atenção."
              },
              {
                text: "CPC obrigatoriamente baixo.",
                feedback: "CPM não diz automaticamente o CPC. Você precisa olhar os dois juntos."
              },
              {
                text: "Checkout saudável.",
                feedback: "CPM não fala sobre checkout. Ele fala sobre o custo de aparecer no leilão."
              },
              {
                text: "Compra garantida.",
                feedback: "Impressão não é compra. CPM só diz o custo de aparecer."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "CPM alto: o que pode estar acontecendo?",
            body: "CPM alto geralmente significa que está caro aparecer para aquele público. Pode ser concorrência alta, público muito disputado, época do ano mais cara, segmentação apertada demais ou baixa qualidade percebida pelo sistema da plataforma.",
            cards: [
              {
                label: "Suspeito 1",
                text: "Público muito concorrido."
              },
              {
                label: "Suspeito 2",
                text: "Sazonalidade: datas comerciais deixam o leilão mais caro."
              },
              {
                label: "Suspeito 3",
                text: "Segmentação estreita demais ou público pequeno."
              },
              {
                label: "Suspeito 4",
                text: "Criativo fraco, baixa relevância ou baixa resposta inicial."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPM alto",
            question: "Seu CPM está em R$ 80. O que faz mais sentido investigar primeiro?",
            options: [
              {
                text: "Concorrência no leilão, público, sazonalidade e qualidade do criativo.",
                correct: true,
                feedback: "Isso. CPM alto é sinal de custo de exibição pesado. O diagnóstico começa no leilão, público e criativo."
              },
              {
                text: "Somente a cor do botão de compra.",
                feedback: "Botão pode influenciar conversão depois, mas CPM alto acontece antes da pessoa chegar na página."
              },
              {
                text: "Trocar o checkout imediatamente.",
                feedback: "Checkout vem depois. CPM alto está no topo do funil, na etapa de exibição."
              },
              {
                text: "Ignorar, porque CPM alto sempre é bom.",
                feedback: "CPM alto pode ser aceitável em alguns casos, mas ignorar sem cruzar métricas é pedir pra apanhar do leilão."
              },
              {
                text: "Aumentar orçamento sem analisar nada.",
                feedback: "Se está caro aparecer, aumentar verba sem diagnóstico pode só comprar atenção cara em volume maior."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "CPM baixo nem sempre é vitória",
            body: "CPM baixo significa que está barato aparecer. Isso é bom, mas pode enganar. Às vezes você aparece barato para um público fraco, amplo demais ou sem intenção de compra. A pergunta certa é: aparecer barato está trazendo clique bom e venda ou só volume vazio?",
            cards: [
              {
                label: "CPM baixo + CPC baixo",
                status: "good",
                text: "Bom sinal inicial: aparece barato e as pessoas clicam barato."
              },
              {
                label: "CPM baixo + CPC alto",
                status: "warn",
                text: "Aparece barato, mas ninguém quer clicar. Pode ser criativo ou promessa fraca."
              },
              {
                label: "CPM baixo + vendas ruins",
                status: "bad",
                text: "Pode ser público barato, mas desqualificado. Atenção no resto do funil."
              }
            ]
          },
          {
            type: "quiz",
            title: "CPM baixo também engana",
            question: "CPM baixo, mas CPC alto. Qual leitura é mais inteligente?",
            options: [
              {
                text: "Você aparece barato, mas o criativo/promessa pode não estar gerando vontade de clicar.",
                correct: true,
                feedback: "Perfeito. CPM baixo diz que aparecer está barato. CPC alto diz que o clique está difícil/caro."
              },
              {
                text: "A campanha está perfeita e deve escalar sempre.",
                feedback: "Cuidado. CPM baixo sozinho não prova nada. Se CPC está alto, tem resistência no clique."
              },
              {
                text: "O checkout é obrigatoriamente o problema.",
                feedback: "Ainda não. Antes do checkout, existe um problema na passagem de impressão para clique."
              },
              {
                text: "CPM baixo significa compra garantida.",
                feedback: "Impressão barata não garante clique, checkout ou compra."
              },
              {
                text: "O preço do produto é sempre o único problema.",
                feedback: "Preço pode influenciar depois, mas essa combinação fala primeiro de anúncio e clique."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "O cruzamento mais importante: CPM + CPC",
            body: "CPM mostra o preço para aparecer. CPC mostra o preço para clicar. Quando junta os dois, você entende se o problema está no leilão, no público ou no criativo. Essa é a diferença entre gestor e apertador de botão.",
            cards: [
              {
                label: "🟢 CPM normal + CPC baixo",
                status: "good",
                text: "Topo do funil provavelmente saudável."
              },
              {
                label: "🟡 CPM alto + CPC baixo",
                status: "warn",
                text: "Público caro, mas o criativo está gerando clique. Pode ser aceitável se o funil vender."
              },
              {
                label: "🟡 CPM normal + CPC alto",
                status: "warn",
                text: "Aparecer não está tão caro, mas o anúncio não convence a clicar."
              },
              {
                label: "🔴 CPM alto + CPC alto",
                status: "bad",
                text: "Pior cenário no topo: caro para aparecer e caro para clicar. Revisão forte antes de escalar."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico cruzado",
            question: "CPM alto e CPC baixo. Qual interpretação faz mais sentido?",
            options: [
              {
                text: "O público pode ser caro, mas o criativo está conseguindo gerar clique.",
                correct: true,
                feedback: "Boa. CPM alto mostra atenção cara; CPC baixo mostra que, mesmo caro para aparecer, quem vê tende a clicar."
              },
              {
                text: "O criativo não gera nenhum clique.",
                feedback: "Se CPC está baixo, clique não é o maior problema. O custo de aparecer é que está pesado."
              },
              {
                text: "O checkout está necessariamente quebrado.",
                feedback: "CPM e CPC falam do topo do funil. Checkout ainda precisa ser analisado depois."
              },
              {
                text: "A campanha deve ser pausada sempre.",
                feedback: "Não necessariamente. Pode ser aceitável se o resto do funil compensar com CPA e ROAS bons."
              },
              {
                text: "O público é barato.",
                feedback: "CPM alto indica justamente que aparecer para esse público está caro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "O que fazer quando CPM pesa?",
            body: "Quando o CPM está alto, não mexe igual barata tonta. Primeiro confirma se o CPC também está alto. Depois testa novos criativos, abre ou troca público, muda ângulo da promessa e compara horários/dias. Se tiver ROI bom, pode só monitorar. Se tiver ROI ruim, aí o alerta fica sério.",
            cards: [
              {
                label: "Se CPM alto + ROI bom",
                text: "Monitorar. Público caro pode valer a pena se o dinheiro volta."
              },
              {
                label: "Se CPM alto + ROI ruim",
                text: "Revisar público, criativo, promessa e estrutura antes de colocar mais verba."
              },
              {
                label: "Se CPM alto + CPC alto",
                text: "Topo do funil está pesado. Criar novos anúncios costuma ser prioridade."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ação correta",
            question: "CPM alto, CPC alto e ROI ruim. Qual ação combina mais com diagnóstico profissional?",
            options: [
              {
                text: "Revisar criativo, público e promessa antes de escalar.",
                correct: true,
                feedback: "Exatamente. Topo caro e retorno ruim não é convite para escala. É convite para corrigir a base."
              },
              {
                text: "Aumentar orçamento para compensar.",
                feedback: "Se o topo já está caro e o retorno ruim, aumentar orçamento tende a aumentar o prejuízo."
              },
              {
                text: "Ignorar CPM porque só ROAS importa.",
                feedback: "ROAS mostra consequência. CPM ajuda a entender uma causa do custo no topo."
              },
              {
                text: "Trocar só o título da página e manter anúncio igual.",
                feedback: "Pode até mexer na página depois, mas CPM e CPC altos apontam primeiro para anúncio/público."
              },
              {
                text: "Pausar todos os produtos da loja.",
                feedback: "O diagnóstico é da campanha/anúncio/público, não necessariamente da loja inteira."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo CPM amassado",
            body: "Agora você sabe que CPM é o custo da atenção. Ele mostra quanto custa aparecer, mas só vira diagnóstico de verdade quando cruza com CPC, ROI e o resto do funil. Próximo passo natural: Taxa de Visualização, a ponte entre clique e página.",
            xp: 100
          }
        ]
      },
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
      },
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
      },
      {
        id: "taxa-visualizacao",
        title: "Taxa de Visualização: clique não é chegada",
        metric: "TX Visualização",
        description: "Aprenda a descobrir se quem clicou realmente chegou na página ou se o dinheiro vazou no caminho.",
        xp: 110,
        difficulty: "Básico",
        estimatedMinutes: 14,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "Clique não é visita real",
            body: "Muita gente olha CPC, vê clique e acha que a pessoa chegou na página. Só que não é bem assim. A pessoa pode clicar e abandonar antes da página carregar. A Taxa de Visualização mostra quantos cliques realmente viraram visualização da página de destino.",
            cards: [
              {
                label: "Clique",
                text: "A pessoa tocou no anúncio."
              },
              {
                label: "Visualização da página",
                text: "A página carregou de verdade para essa pessoa."
              },
              {
                label: "O vazamento",
                text: "Se muita gente clica e pouca gente chega, você está pagando por clique que morre no caminho."
              }
            ]
          },
          {
            type: "quiz",
            title: "Clique vs chegada",
            question: "O que a Taxa de Visualização mostra?",
            options: [
              {
                text: "Quantos cliques realmente viraram carregamento da página.",
                correct: true,
                feedback: "Isso. Ela mostra se o clique atravessou a ponte e chegou na página de destino."
              },
              {
                text: "Quanto você paga por cada clique.",
                feedback: "Essa é a função do CPC. Taxa de Visualização mede a passagem do clique para a página carregada."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Isso é CPM. Aqui a pergunta é sobre quem clicou e realmente chegou na página."
              },
              {
                text: "Quantas pessoas finalizaram compra.",
                feedback: "Compra fica no final do funil. Taxa de Visualização fica antes, entre clique e página."
              },
              {
                text: "Quanto você faturou sobre o investimento.",
                feedback: "Isso parece ROAS. Taxa de Visualização não mede faturamento, mede chegada na página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A fórmula sem enrolação",
            body: "A conta é: visualizações da página de destino divididas pelos cliques no link, vezes 100. Ela transforma a chegada real em porcentagem. Se 100 pessoas clicaram e 80 carregaram a página, sua taxa de visualização foi 80%.",
            formula: "Taxa de Visualização = visualizações da página ÷ cliques no link × 100",
            cards: [
              {
                label: "Exemplo 1",
                text: "100 cliques e 80 visualizações = 80%."
              },
              {
                label: "Exemplo 2",
                text: "200 cliques e 100 visualizações = 50%."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Uma campanha teve 100 cliques e 80 visualizações da página. Qual foi a Taxa de Visualização?",
            options: [
              {
                text: "20%",
                feedback: "Essa leitura parece o que faltou chegar. Mas a taxa mede quem chegou: 80 de 100."
              },
              {
                text: "50%",
                feedback: "50% seria se metade dos cliques virasse visualização. Aqui foram 80 de 100."
              },
              {
                text: "80%",
                correct: true,
                feedback: "Boa. 80 visualizações divididas por 100 cliques dá 80%."
              },
              {
                text: "100%",
                feedback: "100% seria se todos os cliques tivessem carregado a página. Aqui 20 ficaram pelo caminho."
              },
              {
                text: "180%",
                feedback: "A taxa não soma cliques com visualizações. Ela divide visualizações por cliques."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua da Taxa de Visualização",
            body: "Essa régua mostra se o tráfego está chegando bem na página. Quanto maior, melhor. Se muita gente clica e não carrega a página, antes de culpar copy, checkout ou produto, você precisa resolver esse vazamento.",
            cards: [
              {
                label: "🔴 0% a 75%",
                status: "bad",
                text: "Ruim. Existe vazamento forte entre clique e página."
              },
              {
                label: "🟢 75% a 85%",
                status: "good",
                text: "Bom. A maior parte dos cliques está chegando."
              },
              {
                label: "🟢 85% a 100%",
                status: "good",
                text: "Muito bom. O tráfego está chegando limpo na página."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua da chegada",
            question: "Na régua do Tabelingo, uma Taxa de Visualização de 62% indica o quê?",
            options: [
              {
                text: "Ruim. Tem vazamento forte entre clique e página.",
                correct: true,
                feedback: "Certo. Abaixo de 75% é ruim. Muita gente clicou, mas não chegou na página."
              },
              {
                text: "Bom. Está dentro da faixa saudável.",
                feedback: "Bom começa em 75%. Com 62%, muita gente está ficando pelo caminho."
              },
              {
                text: "Muito bom. Pode escalar sem olhar nada.",
                feedback: "Muito bom seria acima de 85%. E mesmo assim nenhuma métrica sozinha libera escala."
              },
              {
                text: "Problema obrigatório no checkout.",
                feedback: "Ainda nem chegamos no checkout. Essa métrica fala da ponte entre clique e página."
              },
              {
                text: "CPC perfeito.",
                feedback: "Ela não mede o custo do clique. Ela mede se o clique carregou a página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "O que taxa baixa pode indicar",
            body: "Taxa de Visualização baixa geralmente significa que tem algo quebrando entre o clique e a página. Pode ser página lenta, imagem pesada, hospedagem ruim, script demais, público curioso sem intenção ou promessa do anúncio diferente do que a página entrega.",
            cards: [
              {
                label: "Problema técnico",
                text: "Página lenta, imagem pesada, hospedagem fraca ou script travando."
              },
              {
                label: "Problema de tráfego",
                text: "Público curioso, clique sem intenção ou promessa chamando gente errada."
              },
              {
                label: "Problema de alinhamento",
                text: "Anúncio promete uma coisa e a página parece outra. A pessoa pula fora."
              }
            ]
          },
          {
            type: "quiz",
            title: "Causas do vazamento",
            question: "Qual alternativa combina com Taxa de Visualização baixa?",
            options: [
              {
                text: "Página lenta, clique curioso ou promessa desalinhada com a página.",
                correct: true,
                feedback: "Perfeito. Esses são suspeitos clássicos quando muita gente clica e pouca gente chega."
              },
              {
                text: "Checkout obrigatoriamente perfeito.",
                feedback: "A métrica nem chegou no checkout ainda. Ela fala da chegada na página."
              },
              {
                text: "ROAS sempre alto.",
                feedback: "Taxa baixa não garante retorno. Na verdade, pode desperdiçar tráfego antes da venda."
              },
              {
                text: "CPC sempre baixo e saudável.",
                feedback: "Pode até ter CPC baixo, mas taxa baixa mostra que o clique não está chegando bem."
              },
              {
                text: "Produto sempre validado.",
                feedback: "Não dá para validar produto se uma parte grande das pessoas nem chega na página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "O erro que queima dinheiro",
            body: "O iniciante vê poucas vendas e sai mexendo na página, no produto, no preço ou no checkout. Mas se metade dos cliques nem chega na página, a conversão nunca vai ser justa. Antes de mexer na copy da página, confirme se o tráfego realmente está chegando.",
            cards: [
              {
                label: "Erro comum",
                text: "Culpar a página quando o problema está antes dela."
              },
              {
                label: "Leitura correta",
                text: "Se a Taxa de Visualização está baixa, primeiro limpa a ponte entre clique e página."
              }
            ]
          },
          {
            type: "quiz",
            title: "Não culpe a etapa errada",
            question: "Você teve 1.000 cliques, mas só 450 visualizações de página. Qual leitura faz mais sentido?",
            options: [
              {
                text: "Existe um vazamento antes da página. Não dá para julgar a página com justiça ainda.",
                correct: true,
                feedback: "Exato. Se menos da metade chegou, primeiro resolve a chegada. Depois avalia a página."
              },
              {
                text: "A página foi testada de forma perfeita.",
                feedback: "Não foi. Se pouca gente chegou, a página nem recebeu tráfego suficiente com qualidade para julgamento justo."
              },
              {
                text: "O checkout é o único culpado.",
                feedback: "Muito cedo para culpar checkout. A perda está acontecendo antes da página."
              },
              {
                text: "O produto está automaticamente ruim.",
                feedback: "Ainda não dá para afirmar isso. Primeiro entenda por que os cliques não viram visualizações."
              },
              {
                text: "A campanha deve escalar porque teve muito clique.",
                feedback: "Clique sozinho não basta. Se o clique não chega na página, escala só aumenta o vazamento."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "O que fazer quando está baixa",
            body: "A ordem de correção precisa ser fria: testa velocidade da página, otimiza imagens, revisa scripts, confere promessa do anúncio, ajusta público e verifica rastreamento. Não sai mudando tudo ao mesmo tempo, senão você nunca sabe o que resolveu.",
            cards: [
              {
                label: "1. Técnica",
                text: "Velocidade, imagens, hospedagem, scripts e carregamento mobile."
              },
              {
                label: "2. Promessa",
                text: "O anúncio precisa bater com o que a página mostra."
              },
              {
                label: "3. Público",
                text: "Evite atrair curioso barato que clica e some."
              },
              {
                label: "4. Rastreamento",
                text: "Confira pixel/eventos para não tomar decisão em dado bugado."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ordem de ação",
            question: "Taxa de Visualização está baixa. Qual ação é mais profissional?",
            options: [
              {
                text: "Testar velocidade, otimizar carregamento, revisar promessa e conferir público/rastreamento.",
                correct: true,
                feedback: "Boa. Essa é a ordem correta: primeiro limpa a ponte entre clique e página."
              },
              {
                text: "Aumentar orçamento para compensar a perda.",
                feedback: "Se existe vazamento, mais orçamento só compra mais vazamento."
              },
              {
                text: "Trocar só o preço do produto.",
                feedback: "Preço pode importar depois, mas essa métrica fala antes da pessoa avaliar a oferta."
              },
              {
                text: "Ignorar, porque clique já basta.",
                feedback: "Clique que não carrega página não vende. Ignorar isso é pagar por buraco no funil."
              },
              {
                text: "Mudar o checkout imediatamente.",
                feedback: "Checkout vem depois. Primeiro resolva a chegada na página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "Como cruzar com CPC",
            body: "CPC mostra o preço do clique. Taxa de Visualização mostra se esse clique virou página carregada. Quando cruza as duas, você entende se está pagando barato por clique bom ou barato por clique lixo.",
            cards: [
              {
                label: "CPC bom + visualização boa",
                status: "good",
                text: "Topo e ponte parecem saudáveis. Próximo passo: avaliar PV–IC."
              },
              {
                label: "CPC bom + visualização baixa",
                status: "warn",
                text: "Clique barato, mas pode ter página lenta, promessa desalinhada ou curiosos."
              },
              {
                label: "CPC alto + visualização baixa",
                status: "bad",
                text: "Pior cenário: clique caro e ainda vaza antes da página."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico cruzado",
            question: "CPC bom, mas Taxa de Visualização baixa. Qual leitura faz mais sentido?",
            options: [
              {
                text: "O clique está barato, mas pode estar vazando antes da página ou vindo de curiosos.",
                correct: true,
                feedback: "Exatamente. CPC bonito não salva se a chegada na página está ruim."
              },
              {
                text: "A campanha está perfeita.",
                feedback: "Não está. A visualização baixa mostra vazamento depois do clique."
              },
              {
                text: "O checkout é obrigatoriamente o culpado.",
                feedback: "Ainda não. Essa leitura acontece antes do checkout."
              },
              {
                text: "ROAS está garantido.",
                feedback: "Não dá para garantir retorno com a ponte entre clique e página vazando."
              },
              {
                text: "A página já foi validada.",
                feedback: "Não foi bem validada se muita gente nem chegou nela."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo Taxa de Visualização amassado",
            body: "Agora você sabe separar clique de chegada real. Se essa ponte vaza, o resto do funil sofre injustamente. Próximo módulo natural: PV–IC, a métrica que mostra se a página convence a pessoa a iniciar checkout.",
            xp: 110
          }
        ]
      },
      {
        id: "pv-ic",
        title: "PV–IC: a página convence ou só enrola?",
        metric: "PV–IC",
        description: "Aprenda a medir se a página está levando a pessoa para o checkout ou se ela só olha e vai embora.",
        xp: 120,
        difficulty: "Básico",
        estimatedMinutes: 15,
        requiresTicket: false,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é PV–IC?",
            body: "PV–IC é a taxa que mostra quantas pessoas que visualizaram a página deram o próximo passo: iniciar o checkout. Em português claro: a pessoa chegou na página, leu a oferta e decidiu clicar para comprar. Se muita gente chega e pouca gente inicia checkout, a página não está convencendo.",
            cards: [
              {
                label: "PV",
                text: "Page View: visualização da página."
              },
              {
                label: "IC",
                text: "Início de Checkout: quando a pessoa começa o processo de compra."
              },
              {
                label: "PV–IC",
                text: "A ponte entre interesse na página e intenção de compra."
              }
            ]
          },
          {
            type: "quiz",
            title: "PV–IC sem confundir",
            question: "O que a métrica PV–IC mostra?",
            options: [
              {
                text: "A porcentagem de pessoas que viram a página e iniciaram checkout.",
                correct: true,
                feedback: "Isso. PV–IC mostra se a página está convencendo a pessoa a dar o próximo passo."
              },
              {
                text: "Quanto custa cada clique no anúncio.",
                feedback: "Isso é CPC. PV–IC acontece depois que a pessoa já chegou na página."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Essa é a função do CPM. PV–IC mede a passagem da página para o checkout."
              },
              {
                text: "Quantas pessoas finalizaram a compra depois do checkout.",
                feedback: "Isso é IC–Compras. PV–IC mede o passo anterior: página para início de checkout."
              },
              {
                text: "Quanto você faturou dividido pelo investimento.",
                feedback: "Isso se aproxima de ROAS. PV–IC não mede faturamento, mede intenção de avançar."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "A fórmula do PV–IC",
            body: "A conta é simples: pega os inícios de checkout, divide pelas visualizações da página e multiplica por 100. Se 1.000 pessoas visualizaram a página e 200 iniciaram checkout, seu PV–IC foi 20%.",
            formula: "PV–IC = inícios de checkout ÷ visualizações da página × 100",
            cards: [
              {
                label: "Exemplo 1",
                text: "1.000 visualizações e 200 checkouts iniciados = 20%."
              },
              {
                label: "Exemplo 2",
                text: "500 visualizações e 50 checkouts iniciados = 10%."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Uma página teve 1.000 visualizações e 150 inícios de checkout. Qual foi o PV–IC?",
            options: [
              {
                text: "1,5%",
                feedback: "Ficou baixo demais. 150 de 1.000 não é 1,5%; pensa como porcentagem de 1.000."
              },
              {
                text: "10%",
                feedback: "10% seria 100 inícios de checkout em 1.000 visualizações. Aqui foram 150."
              },
              {
                text: "15%",
                correct: true,
                feedback: "Boa. 150 dividido por 1.000 dá 0,15. Multiplicando por 100, temos 15%."
              },
              {
                text: "50%",
                feedback: "50% seria metade das pessoas iniciando checkout. Aqui foram 150 de 1.000."
              },
              {
                text: "150%",
                feedback: "Isso mistura número absoluto com porcentagem. PV–IC é uma taxa, não soma de eventos."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua do PV–IC",
            body: "Essa régua mostra se a página está conduzindo as pessoas para o checkout. Ela é muito usada para produtos de baixo ticket e ofertas diretas. Quanto menor o PV–IC, maior o sinal de que a página não está gerando intenção de compra.",
            cards: [
              {
                label: "🟢 20% a 100%",
                status: "good",
                text: "Página saudável. A página está convencendo uma boa parte das pessoas a iniciar checkout."
              },
              {
                label: "🟡 15% a 20%",
                status: "warn",
                text: "Conversão morna. Existe interesse, mas a página ainda pode melhorar."
              },
              {
                label: "🔴 Abaixo de 15%",
                status: "bad",
                text: "Página fraca. A pessoa chega, mas não sente vontade suficiente de avançar."
              }
            ]
          },
          {
            type: "quiz",
            title: "Régua do PV–IC",
            question: "Na régua do Tabelingo, um PV–IC de 12% indica o quê?",
            options: [
              {
                text: "Página fraca. Está abaixo de 15%.",
                correct: true,
                feedback: "Certo. Abaixo de 15% é sinal de página fraca ou oferta/persuasão com problema."
              },
              {
                text: "Página saudável.",
                feedback: "Página saudável começa em 20% na régua base. 12% está abaixo da faixa mínima."
              },
              {
                text: "Conversão morna.",
                feedback: "Conversão morna fica entre 15% e 20%. 12% ainda está abaixo disso."
              },
              {
                text: "Checkout perfeito.",
                feedback: "PV–IC ainda nem mede compra final. Ele mede se a página leva para o checkout."
              },
              {
                text: "CPM baixo garantido.",
                feedback: "PV–IC não fala de custo para aparecer. Isso é outra etapa do funil."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "O que PV–IC bom indica?",
            body: "PV–IC bom indica que a página está fazendo o trabalho dela: transformar interesse em intenção. A pessoa chegou, entendeu a promessa, viu valor na oferta e clicou para iniciar o checkout. Mas ainda não comemora venda: depois disso vem a métrica IC–Compras.",
            cards: [
              {
                label: "Sinal positivo",
                status: "good",
                text: "A promessa da página está clara."
              },
              {
                label: "Sinal positivo",
                status: "good",
                text: "O CTA está funcionando."
              },
              {
                label: "Próxima pergunta",
                text: "Quem iniciou checkout está realmente comprando?"
              }
            ]
          },
          {
            type: "quiz",
            title: "PV–IC saudável",
            question: "Se o PV–IC está em 26%, qual leitura faz mais sentido?",
            options: [
              {
                text: "A página parece saudável na passagem para o checkout, mas ainda preciso olhar IC–Compras.",
                correct: true,
                feedback: "Perfeito. PV–IC bom mostra intenção, mas a venda final depende do checkout converter."
              },
              {
                text: "A campanha está 100% validada e não precisa olhar mais nada.",
                feedback: "Nenhuma etapa sozinha valida o sistema inteiro. Depois do PV–IC vem checkout, CPA e ROAS."
              },
              {
                text: "O CPC obrigatoriamente está baixo.",
                feedback: "PV–IC não diz o custo do clique. Ele fala da página conduzindo para checkout."
              },
              {
                text: "O checkout está obrigatoriamente perfeito.",
                feedback: "Ainda não dá para afirmar. PV–IC mede início de checkout, não compra final."
              },
              {
                text: "O tráfego nem chegou na página.",
                feedback: "Se existe PV–IC, estamos analisando pessoas que já visualizaram a página."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "O que PV–IC baixo indica?",
            body: "PV–IC baixo indica que a página não está convencendo o suficiente. Pode ser promessa genérica, benefício pouco claro, falta de prova social, CTA fraco, excesso de informação, oferta confusa ou falta de confiança. O tráfego chegou, mas a página não empurrou para a próxima etapa.",
            cards: [
              {
                label: "Problema de promessa",
                text: "A pessoa não entende rápido por que deveria querer aquilo."
              },
              {
                label: "Problema de oferta",
                text: "Preço, bônus, garantia ou entrega podem não parecer bons o bastante."
              },
              {
                label: "Problema de confiança",
                text: "Falta prova social, autoridade, garantia ou clareza."
              },
              {
                label: "Problema de CTA",
                text: "O botão não aparece, não convence ou não guia a pessoa."
              }
            ]
          },
          {
            type: "quiz",
            title: "PV–IC baixo",
            question: "Qual alternativa combina com PV–IC baixo?",
            options: [
              {
                text: "A página recebe tráfego, mas não convence a pessoa a iniciar checkout.",
                correct: true,
                feedback: "Isso. PV–IC baixo mostra falha na persuasão da página ou na força da oferta."
              },
              {
                text: "O anúncio não apareceu para ninguém.",
                feedback: "Isso seria problema antes, no topo. PV–IC existe depois que a pessoa chegou na página."
              },
              {
                text: "O checkout está convertendo 100%.",
                feedback: "PV–IC não mede conclusão de compra. Mede só o início do checkout."
              },
              {
                text: "O CPM está obrigatoriamente baixo.",
                feedback: "CPM mede custo de impressão. PV–IC mede página conduzindo para checkout."
              },
              {
                text: "O CPC sempre precisa ser ignorado.",
                feedback: "CPC não deve ser ignorado. Mas PV–IC analisa outra etapa do funil."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "Ticket e oferta mudam a exigência",
            body: "A régua base é um guia, mas ticket e oferta mudam a leitura. Produto barato e direto costuma precisar de mais gente iniciando checkout. Produto mais caro pode ter uma jornada mais pesada, mas ainda precisa mostrar intenção clara. O segredo é não olhar PV–IC isolado: olhe junto com CPA, margem e IC–Compras.",
            dynamicNote: "pvIcTicketContext",
            cards: [
              {
                label: "Produto barato",
                text: "Normalmente precisa de volume e pouca fricção para avançar para checkout."
              },
              {
                label: "Produto caro",
                text: "Pode ter menos gente iniciando checkout, mas precisa compensar com margem e fechamento."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ticket e PV–IC",
            question: "Por que a régua do PV–IC não deve ser usada como verdade absoluta?",
            options: [
              {
                text: "Porque ticket, margem, oferta e fechamento mudam a leitura do funil.",
                correct: true,
                feedback: "Exatamente. A régua ajuda, mas a decisão real depende do sistema inteiro."
              },
              {
                text: "Porque PV–IC nunca importa.",
                feedback: "Importa muito. O erro é usar sozinho como se explicasse tudo."
              },
              {
                text: "Porque produto caro sempre converte melhor.",
                feedback: "Produto caro pode ter mais margem, mas não converte automaticamente. Oferta e confiança pesam muito."
              },
              {
                text: "Porque checkout não influencia nada.",
                feedback: "Checkout influencia sim. PV–IC mede antes dele; IC–Compras mede depois."
              },
              {
                text: "Porque CPC substitui PV–IC.",
                feedback: "CPC e PV–IC medem etapas diferentes. Um não substitui o outro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "O que ajustar quando PV–IC está baixo?",
            body: "A ordem certa é melhorar clareza e desejo. Primeiro headline direta. Depois benefício específico. Depois prova social. Depois CTA visível e repetido. Depois garantia. A página não precisa ser bonita; ela precisa fazer a pessoa entender, confiar e avançar.",
            cards: [
              {
                label: "1. Headline",
                text: "Promessa direta e fácil de entender."
              },
              {
                label: "2. Benefício",
                text: "Mostrar o ganho real, não só característica."
              },
              {
                label: "3. Prova social",
                text: "Depoimentos, avaliações, antes/depois permitido, autoridade."
              },
              {
                label: "4. CTA",
                text: "Botão claro, visível e repetido nos pontos certos."
              },
              {
                label: "5. Garantia",
                text: "Reduzir risco percebido e aumentar confiança."
              }
            ]
          },
          {
            type: "quiz",
            title: "Ação prática",
            question: "PV–IC está em 9%. Qual ação faz mais sentido?",
            options: [
              {
                text: "Melhorar promessa, benefício, prova social, CTA e garantia da página.",
                correct: true,
                feedback: "Boa. PV–IC baixo pede ajuste de persuasão e clareza da página/oferta."
              },
              {
                text: "Aumentar orçamento para mandar mais tráfego para a página fraca.",
                feedback: "Se a página não conduz, mais tráfego só aumenta desperdício."
              },
              {
                text: "Ignorar a página e mexer só no checkout.",
                feedback: "Checkout vem depois. Primeiro a pessoa precisa querer iniciar o checkout."
              },
              {
                text: "Pausar tudo sem analisar mais nada.",
                feedback: "Pode até pausar para evitar gasto, mas o diagnóstico pede entender o que falha na página."
              },
              {
                text: "Trocar apenas o público e manter a página igual para sempre.",
                feedback: "Público pode influenciar, mas se o tráfego chegou e não avança, a página precisa ser investigada."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "Como cruzar PV–IC com Taxa de Visualização",
            body: "A Taxa de Visualização diz se o clique chegou na página. O PV–IC diz se a página convenceu a pessoa a iniciar checkout. Se a visualização está boa e o PV–IC está baixo, o problema provavelmente está na página ou na oferta. Se a visualização está baixa, ainda é cedo para culpar a página.",
            cards: [
              {
                label: "Visualização boa + PV–IC baixo",
                status: "bad",
                text: "Tráfego chegou, mas página não convenceu."
              },
              {
                label: "Visualização baixa + PV–IC baixo",
                status: "warn",
                text: "Primeiro resolva a chegada na página antes de julgar a persuasão."
              },
              {
                label: "Visualização boa + PV–IC bom",
                status: "good",
                text: "Ponte e página parecem saudáveis. Próximo: IC–Compras."
              }
            ]
          },
          {
            type: "quiz",
            title: "Diagnóstico cruzado",
            question: "Taxa de Visualização boa, mas PV–IC baixo. Qual leitura faz mais sentido?",
            options: [
              {
                text: "O tráfego está chegando, mas a página/oferta não está convencendo a iniciar checkout.",
                correct: true,
                feedback: "Perfeito. Quando a chegada está boa e o avanço está ruim, a página vira o principal suspeito."
              },
              {
                text: "O problema está obrigatoriamente antes do clique.",
                feedback: "Se a visualização está boa, o clique está chegando na página. O gargalo aparece depois."
              },
              {
                text: "O checkout é o único culpado.",
                feedback: "Ainda não. A pessoa nem está iniciando checkout em volume saudável."
              },
              {
                text: "A campanha está perfeita.",
                feedback: "Não. PV–IC baixo mostra gargalo na página/oferta."
              },
              {
                text: "O CPM sempre está alto.",
                feedback: "CPM pode até estar alto, mas essa combinação fala principalmente da página conduzindo pouco."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo PV–IC amassado",
            body: "Agora você sabe medir se a página transforma visita em intenção de compra. Se o tráfego chega e o PV–IC é baixo, a página/oferta precisa trabalhar melhor. Próximo módulo natural: IC–Compras, a porta final entre checkout e compra.",
            xp: 120
          }
        ]
      },
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
      },
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
      },
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
            body: "Agora você sabe que CPA é o preço real da venda. Se ele fica abaixo do seu limite e se repete com consistência, a campanha começa a ficar interessante. Se passa do limite, escalar só aumenta o prejuízo. Próximo módulo natural: ROAS e ROI, a leitura do retorno.",
            xp: 140
          }
        ]
      },
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
      },
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
      },
      {
        id: "roas-roi",
        title: "ROAS e ROI: retorno sem ilusão",
        metric: "ROAS e ROI",
        description: "Aprenda a ler retorno de campanha sem cair na armadilha do faturamento bonito e lucro feio.",
        xp: 150,
        difficulty: "Básico",
        estimatedMinutes: 17,
        requiresTicket: true,
        screens: [
          {
            type: "lesson",
            eyebrow: "Parte 1",
            title: "O que é ROAS?",
            body: "ROAS significa Retorno Sobre Investimento em Anúncios. Ele mostra quantas vezes o dinheiro investido em tráfego voltou em receita. Se você investiu R$ 100 e faturou R$ 300, seu ROAS foi 3. Isso quer dizer que voltou 3 vezes o valor investido em receita.",
            formula: "ROAS = receita gerada ÷ investimento em anúncios",
            cards: [
              {
                label: "ROAS 1",
                text: "Voltou exatamente o valor investido em receita."
              },
              {
                label: "ROAS 2",
                text: "Voltou duas vezes o investimento em receita."
              },
              {
                label: "ROAS não é lucro",
                text: "ROAS fala de receita, não desconta produto, frete, taxa e operação."
              }
            ]
          },
          {
            type: "quiz",
            title: "ROAS sem confundir",
            question: "O que o ROAS mostra?",
            options: [
              {
                text: "Quanto de receita voltou para cada real investido em anúncio.",
                correct: true,
                feedback: "Isso. ROAS mede retorno em receita sobre o dinheiro investido em anúncios."
              },
              {
                text: "Quanto você paga por cada clique.",
                feedback: "Isso é CPC. ROAS aparece no resultado financeiro, depois das vendas."
              },
              {
                text: "Quanto custa aparecer mil vezes.",
                feedback: "Essa é a função do CPM. ROAS mede receita gerada pelo investimento."
              },
              {
                text: "A porcentagem de checkouts que viraram compra.",
                feedback: "Isso é IC–Compras. ROAS mede retorno de receita."
              },
              {
                text: "Quantas pessoas chegaram na página.",
                feedback: "Isso tem relação com Taxa de Visualização. ROAS é métrica de resultado."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 2",
            title: "Como calcular ROAS",
            body: "A conta é receita dividida pelo investimento. Se você gastou R$ 200 em anúncios e gerou R$ 600 em vendas, o ROAS foi 3. Se gastou R$ 200 e faturou R$ 200, o ROAS foi 1.",
            formula: "ROAS = receita ÷ investimento",
            cards: [
              {
                label: "Exemplo 1",
                text: "R$ 600 de receita ÷ R$ 200 de investimento = ROAS 3."
              },
              {
                label: "Exemplo 2",
                text: "R$ 200 de receita ÷ R$ 200 de investimento = ROAS 1."
              },
              {
                label: "Exemplo 3",
                text: "R$ 100 de receita ÷ R$ 200 de investimento = ROAS 0,5."
              }
            ]
          },
          {
            type: "quiz",
            title: "Conta rápida",
            question: "Você investiu R$ 250 em anúncios e gerou R$ 750 em receita. Qual foi o ROAS?",
            options: [
              {
                text: "ROAS 0,3",
                feedback: "Esse resultado seria receita menor que o investimento. Aqui a receita é três vezes maior que o investimento."
              },
              {
                text: "ROAS 1",
                feedback: "ROAS 1 seria R$ 250 de receita para R$ 250 de investimento. Aqui gerou R$ 750."
              },
              {
                text: "ROAS 2",
                feedback: "ROAS 2 seria R$ 500 de receita para R$ 250 investidos. Aqui foi R$ 750."
              },
              {
                text: "ROAS 3",
                correct: true,
                feedback: "Boa. R$ 750 dividido por R$ 250 dá ROAS 3."
              },
              {
                text: "ROAS 750",
                feedback: "Esse é o valor da receita, não a divisão entre receita e investimento."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 3",
            title: "A régua base do ROAS",
            body: "A régua base ajuda a entender o retorno da campanha. Mas cuidado: ROAS é consequência do sistema. Ele não diz sozinho onde está o problema. Se o ROAS está ruim, você volta nas métricas anteriores para achar o gargalo.",
            cards: [
              {
                label: "🟢 ROAS acima de 2",
                status: "good",
                text: "Escalável na régua base, se CPA, margem e consistência confirmarem."
              },
              {
                label: "🟡 ROAS entre 1 e 2",
                status: "warn",
                text: "Ajustável. Existe retorno, mas pode estar apertado ou instável."
              },
              {
                label: "🔴 ROAS abaixo de 1",
                status: "bad",
                text: "Prejuízo na receita de mídia: voltou menos do que investiu."
              }
            ],
            dynamicNote: "roasTicketContext"
          },
          {
            type: "quiz",
            title: "Régua do ROAS",
            question: "Na régua base do Tabelingo, ROAS 0,8 indica o quê?",
            options: [
              {
                text: "Prejuízo na receita de mídia, porque voltou menos do que investiu.",
                correct: true,
                feedback: "Certo. ROAS abaixo de 1 significa que a receita gerada foi menor que o investimento."
              },
              {
                text: "Campanha escalável sem olhar nada.",
                feedback: "Escalável na régua base começa acima de 2, e mesmo assim precisa confirmar margem e consistência."
              },
              {
                text: "Resultado ajustável entre 1 e 2.",
                feedback: "ROAS 0,8 está abaixo de 1. A faixa ajustável começa em 1."
              },
              {
                text: "Checkout obrigatoriamente saudável.",
                feedback: "ROAS não mostra diretamente checkout. Ele mostra retorno final em receita."
              },
              {
                text: "CPC obrigatoriamente baixo.",
                feedback: "ROAS não informa sozinho o preço do clique. Para isso você olha CPC."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 4",
            title: "ROAS alto pode enganar",
            body: "ROAS alto é bom, mas pode enganar se você esquecer custos. Se o produto tem margem baixa, frete caro, taxa alta ou operação pesada, um ROAS bonito pode não significar lucro real. Por isso ROAS precisa conversar com CPA, margem e ponto de equilíbrio.",
            cards: [
              {
                label: "ROAS mostra",
                text: "Receita voltando do investimento."
              },
              {
                label: "ROAS não mostra sozinho",
                text: "Lucro líquido, custo do produto, taxa, frete, reembolso e operação."
              },
              {
                label: "Pergunta certa",
                text: "Depois de todos os custos, sobrou dinheiro de verdade?"
              }
            ]
          },
          {
            type: "quiz",
            title: "ROAS não é lucro",
            question: "Por que ROAS alto não garante lucro real?",
            options: [
              {
                text: "Porque ele mede receita, mas não desconta todos os custos do negócio.",
                correct: true,
                feedback: "Perfeito. ROAS fala de receita sobre investimento, não de lucro líquido final."
              },
              {
                text: "Porque ROAS nunca importa.",
                feedback: "ROAS importa muito. O erro é tratar ROAS como lucro sem olhar custos."
              },
              {
                text: "Porque CPC substitui margem.",
                feedback: "CPC não substitui margem. CPC mede clique; margem mostra quanto sobra."
              },
              {
                text: "Porque qualquer ROAS acima de 1 é sempre lucro garantido.",
                feedback: "Não. ROAS acima de 1 só diz que voltou mais receita do que mídia investida. Ainda faltam custos."
              },
              {
                text: "Porque IC–Compras elimina custo de produto.",
                feedback: "IC–Compras mede fechamento do checkout. Ele não elimina custo de produto."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 5",
            title: "O que é ROI?",
            body: "ROI significa Retorno Sobre Investimento. Enquanto ROAS olha receita gerada pelo anúncio, ROI é uma leitura mais próxima de lucro. Ele considera quanto sobrou em relação ao investimento. No mundo real, ROI exige colocar custos na conta.",
            formula: "ROI = lucro líquido ÷ investimento × 100",
            cards: [
              {
                label: "ROAS",
                text: "Receita ÷ investimento em anúncios."
              },
              {
                label: "ROI",
                text: "Lucro ÷ investimento."
              },
              {
                label: "Resumo bruto",
                text: "ROAS mostra faturamento. ROI mostra se sobrou dinheiro."
              }
            ]
          },
          {
            type: "quiz",
            title: "ROAS vs ROI",
            question: "Qual é a diferença mais importante entre ROAS e ROI?",
            options: [
              {
                text: "ROAS olha receita; ROI olha lucro em relação ao investimento.",
                correct: true,
                feedback: "Boa. Essa é a diferença que evita muita ilusão com faturamento bonito."
              },
              {
                text: "ROAS e ROI são exatamente a mesma coisa.",
                feedback: "Eles se relacionam, mas não são iguais. ROAS olha receita; ROI precisa olhar lucro/custos."
              },
              {
                text: "ROI mede custo por clique.",
                feedback: "Custo por clique é CPC. ROI fala de retorno sobre investimento."
              },
              {
                text: "ROAS mede velocidade da página.",
                feedback: "Velocidade/chegada na página aparece na Taxa de Visualização, não no ROAS."
              },
              {
                text: "ROI só existe antes da campanha rodar.",
                feedback: "ROI pode ser estimado antes, mas é calculado de verdade com resultado e custos."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 6",
            title: "ROAS baixo: onde procurar o problema?",
            body: "ROAS baixo é sinal de que o sistema não está devolvendo receita suficiente. Mas ele não diz sozinho a causa. Pode ser topo caro, página fraca, checkout ruim, ticket baixo, oferta ruim ou CPA acima do limite. O caminho é voltar no funil.",
            cards: [
              {
                label: "CPC/CPM ruins",
                text: "Entrada cara no funil."
              },
              {
                label: "Taxa de Visualização baixa",
                text: "Clique não chega na página."
              },
              {
                label: "PV–IC baixo",
                text: "Página não leva para checkout."
              },
              {
                label: "IC–Compras baixo",
                text: "Checkout não fecha."
              },
              {
                label: "CPA alto",
                text: "Venda está custando mais do que deveria."
              }
            ]
          },
          {
            type: "quiz",
            title: "ROAS baixo",
            question: "ROAS está baixo. Qual atitude é mais profissional?",
            options: [
              {
                text: "Voltar no funil e procurar o gargalo nas métricas anteriores.",
                correct: true,
                feedback: "Exato. ROAS baixo é consequência. O diagnóstico vem cruzando as métricas do funil."
              },
              {
                text: "Aumentar orçamento para ver se o ROAS melhora por sorte.",
                feedback: "Escalar sem diagnóstico pode só aumentar o prejuízo."
              },
              {
                text: "Ignorar CPC, página e checkout.",
                feedback: "Essas etapas podem explicar por que o ROAS está baixo. Ignorar é dirigir no escuro."
              },
              {
                text: "Assumir que o problema é sempre só o produto.",
                feedback: "Pode ser oferta/produto, mas também pode ser tráfego, página, checkout ou CPA."
              },
              {
                text: "Concluir que toda venda é lucro.",
                feedback: "Venda não é lucro automático. ROAS e CPA precisam conversar com margem."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 7",
            title: "ROAS e escala",
            body: "ROAS acima de 2 pode indicar campanha escalável, mas só se o resto estiver saudável: CPA abaixo do limite, IC–Compras bom, PV–IC bom e resultado consistente. Escalar só por print bonito de ROAS é uma das formas mais rápidas de queimar verba.",
            cards: [
              {
                label: "Pode pensar em escala",
                status: "good",
                text: "ROAS acima de 2 + CPA saudável + funil consistente."
              },
              {
                label: "Ajustar antes",
                status: "warn",
                text: "ROAS entre 1 e 2 ou resultado oscilando."
              },
              {
                label: "Não escala",
                status: "bad",
                text: "ROAS abaixo de 1 ou CPA acima do limite."
              }
            ]
          },
          {
            type: "quiz",
            title: "Escala com ROAS",
            question: "Quando ROAS acima de 2 começa a ser um bom sinal para escala?",
            options: [
              {
                text: "Quando CPA, margem, checkout e consistência também confirmam que o sistema está saudável.",
                correct: true,
                feedback: "Perfeito. ROAS alto ajuda, mas a escala segura precisa do sistema inteiro saudável."
              },
              {
                text: "Quando aparece em um print isolado com uma venda.",
                feedback: "Print isolado engana. Precisa de consistência e leitura do funil."
              },
              {
                text: "Quando o CPA está acima do ponto de equilíbrio.",
                feedback: "CPA acima do limite pode transformar faturamento em prejuízo."
              },
              {
                text: "Quando o PV–IC está muito baixo.",
                feedback: "PV–IC baixo mostra gargalo de página. Escalar assim pode aumentar desperdício."
              },
              {
                text: "Quando não sabemos a margem.",
                feedback: "Sem margem ou CPA máximo, você não sabe se o ROAS realmente sustenta lucro."
              }
            ]
          },
          {
            type: "lesson",
            eyebrow: "Parte 8",
            title: "Diagnóstico cruzado com ROAS",
            body: "ROAS é a consequência. Para saber o que fazer, cruze com as métricas anteriores. ROAS baixo com CPC alto aponta topo caro. ROAS baixo com PV–IC baixo aponta página fraca. ROAS baixo com IC–Compras baixo aponta checkout travando. ROAS bom com CPA saudável aponta estrutura mais pronta para escala.",
            cards: [
              {
                label: "ROAS baixo + CPC alto",
                status: "warn",
                text: "Entrada cara. Revisar criativo/público."
              },
              {
                label: "ROAS baixo + PV–IC baixo",
                status: "bad",
                text: "Página/oferta não conduz."
              },
              {
                label: "ROAS baixo + IC–Compras baixo",
                status: "bad",
                text: "Checkout perde comprador quente."
              },
              {
                label: "ROAS bom + CPA saudável",
                status: "good",
                text: "Campanha começa a ficar interessante."
              }
            ]
          },
          {
            type: "quiz",
            title: "Cruzamento final",
            question: "ROAS baixo + PV–IC baixo. Qual leitura faz mais sentido?",
            options: [
              {
                text: "O retorno está ruim e a página/oferta pode não estar levando gente suficiente para checkout.",
                correct: true,
                feedback: "Boa. PV–IC baixo mostra gargalo na página, e isso pode derrubar o retorno final."
              },
              {
                text: "O checkout está obrigatoriamente perfeito.",
                feedback: "Não dá para afirmar. O gargalo indicado pela combinação está antes: na página/oferta."
              },
              {
                text: "A campanha está pronta para escala.",
                feedback: "ROAS baixo com gargalo de página é sinal de ajuste, não de escala."
              },
              {
                text: "O CPC sempre é zero.",
                feedback: "Essa combinação não mostra CPC zero. Ela fala de retorno ruim e página conduzindo pouco."
              },
              {
                text: "ROI está garantidamente positivo.",
                feedback: "Se ROAS já está baixo, ROI positivo fica ainda mais improvável, mas precisa dos custos para confirmar."
              }
            ]
          },
          {
            type: "complete",
            title: "Módulo ROAS e ROI amassado",
            body: "Agora você sabe que ROAS mostra retorno em receita, ROI olha lucro e nenhum dos dois deve ser lido sozinho. Resultado final bonito só presta quando o funil inteiro e a margem confirmam. Próximo módulo natural: Diagnóstico Cruzado, o cérebro da tabela.",
            xp: 150
          }
        ]
      },
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
      },
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
      },
      {
  id: "volume-de-dados",
  title: "Volume de Dados: dá pra confiar nesse número?",
  metric: "Dados",
  description: "Aprenda quando uma métrica já tem dado suficiente para decisão e quando ainda é só barulho do algoritmo.",
  xp: 160,
  difficulty: "Fundamental",
  estimatedMinutes: 19,
  requiresTicket: false,
  screens: [
    {
      type: "lesson",
      eyebrow: "Parte 1",
      title: "Pouco dado mente pra caramba",
      body: "Volume de dados é a quantidade de informação que você tem antes de tomar uma decisão. Com pouco dado, qualquer número parece dramático. Uma venda pode fazer o ROAS parecer lindo. Um dia ruim pode fazer uma campanha boa parecer lixo. O segredo é saber quando o número já tem peso e quando ainda é só barulho.",
      cards: [
        {
          label: "Pouco dado",
          status: "warn",
          text: "Número instável. Pode mudar muito com poucos eventos."
        },
        {
          label: "Dado suficiente",
          status: "good",
          text: "Já dá para tomar decisão com mais segurança."
        },
        {
          label: "Barulho",
          status: "bad",
          text: "Variação normal que parece diagnóstico, mas ainda não prova nada."
        }
      ]
    },
    {
      type: "quiz",
      title: "Dado ou chute?",
      question: "Por que tomar decisão com pouco dado é perigoso?",
      options: [
        {
          text: "Porque poucos eventos podem distorcer a métrica e criar uma falsa conclusão.",
          correct: true,
          feedback: "Isso. Pouco dado faz a métrica oscilar muito. Parece verdade, mas pode ser só barulho."
        },
        {
          text: "Porque métrica nunca serve para nada.",
          feedback: "Métrica serve muito. O problema é acreditar nela cedo demais."
        },
        {
          text: "Porque toda campanha precisa rodar para sempre.",
          feedback: "Não. Às vezes precisa pausar rápido, mas a decisão precisa considerar volume e gravidade do problema."
        },
        {
          text: "Porque ROAS sempre é falso.",
          feedback: "ROAS é útil, mas com pouco dado pode enganar bastante."
        },
        {
          text: "Porque CPC substitui todas as outras métricas.",
          feedback: "CPC é uma parte do diagnóstico, não substitui o resto do funil."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 2",
      title: "Métrica do topo junta dado mais rápido",
      body: "Métricas do topo do funil costumam ganhar volume mais rápido: impressões, CPM, CTR e CPC. Já métricas do fundo demoram mais: IC–Compras, CPA e ROAS. Por isso você pode ter confiança no CTR antes de ter confiança no CPA. O funil de cima enche rápido; o funil de baixo demora.",
      cards: [
        {
          label: "Topo rápido",
          text: "Impressões, CPM, CTR e CPC aparecem com mais volume."
        },
        {
          label: "Meio do funil",
          text: "Taxa de Visualização e PV–IC precisam de cliques e visitas."
        },
        {
          label: "Fundo lento",
          text: "IC–Compras, CPA e ROAS precisam de checkouts e compras."
        },
        {
          label: "Regra",
          text: "Quanto mais fundo no funil, mais paciência você precisa para decidir."
        }
      ]
    },
    {
      type: "quiz",
      title: "Topo vs fundo",
      question: "Qual métrica normalmente ganha volume mais rápido?",
      options: [
        {
          text: "CTR, porque depende de impressões e cliques no anúncio.",
          correct: true,
          feedback: "Boa. CTR aparece mais cedo porque o topo do funil tem mais eventos."
        },
        {
          text: "CPA, porque compra acontece antes da impressão.",
          feedback: "Compra acontece no fundo do funil, depois de impressão, clique, página e checkout."
        },
        {
          text: "ROAS, porque receita aparece antes de qualquer clique.",
          feedback: "Receita só aparece depois da venda. ROAS demora mais para ficar confiável."
        },
        {
          text: "IC–Compras, porque checkout vem antes do anúncio.",
          feedback: "Checkout vem depois da página, que vem depois do clique."
        },
        {
          text: "Lucro líquido, porque não precisa de venda.",
          feedback: "Lucro líquido depende de vendas, CPA e custos. Não aparece antes do resultado."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 3",
      title: "Régua prática de volume",
      body: "Essa régua não é lei sagrada, mas ajuda muito. Para avaliar criativo, olhe pelo menos algumas milhares de impressões. Para avaliar página, tente ter dezenas ou centenas de visitas. Para avaliar checkout, precisa de inícios de checkout. Para avaliar CPA e ROAS, uma venda isolada não basta.",
      cards: [
        {
          label: "Criativo/anúncio",
          text: "Ideal olhar com volume de impressões e cliques, não com 50 impressões."
        },
        {
          label: "Página",
          text: "Precisa de visitas suficientes para PV–IC não ser chute."
        },
        {
          label: "Checkout",
          text: "Precisa de inícios de checkout suficientes para analisar abandono."
        },
        {
          label: "CPA/ROAS",
          text: "Precisa de compras suficientes. Uma venda não valida escala."
        }
      ]
    },
    {
      type: "quiz",
      title: "Régua prática",
      question: "Uma campanha teve 80 impressões, 1 clique e nenhuma venda. Qual leitura é mais madura?",
      options: [
        {
          text: "Ainda tem pouco dado para concluir que o produto é ruim.",
          correct: true,
          feedback: "Exato. Com 80 impressões e 1 clique, ainda é cedo para matar o produto inteiro."
        },
        {
          text: "Produto comprovadamente lixo.",
          feedback: "Calma aí. Com esse volume, você quase não testou nada."
        },
        {
          text: "Checkout comprovadamente quebrado.",
          feedback: "Nem chegou volume suficiente no checkout para afirmar isso."
        },
        {
          text: "ROAS validado para escala.",
          feedback: "Sem venda e com quase nenhum dado, não existe validação de ROAS."
        },
        {
          text: "Página validada com segurança.",
          feedback: "Com 1 clique, a página não teve volume para ser avaliada direito."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 4",
      title: "Uma venda isolada não é validação",
      body: "Uma venda sozinha pode deixar o ROAS bonito e o CPA maravilhoso. Mas pode ser sorte, amigo, conhecido, pessoa muito quente ou variação normal. Uma venda é sinal. Várias vendas consistentes começam a virar evidência. Não escala pesado porque um número brilhou uma vez.",
      cards: [
        {
          label: "1 venda",
          status: "warn",
          text: "Sinal inicial. Ainda pode ser sorte."
        },
        {
          label: "3 a 5 vendas",
          status: "warn",
          text: "Começa a dar leitura inicial, mas ainda exige cuidado."
        },
        {
          label: "10+ vendas",
          status: "good",
          text: "Já existe base mais forte para analisar CPA/ROAS."
        },
        {
          label: "Consistência",
          text: "Melhor que um pico bonito em um único dia."
        }
      ]
    },
    {
      type: "quiz",
      title: "Venda isolada",
      question: "Campanha gastou R$ 20, fez 1 venda de R$ 100 e ficou com ROAS 5. Qual decisão é mais segura?",
      options: [
        {
          text: "Tratar como bom sinal inicial, mas não escalar pesado sem mais dados.",
          correct: true,
          feedback: "Perfeito. ROAS 5 com pouco gasto pode ser sorte. Precisa confirmar."
        },
        {
          text: "Aumentar orçamento 10 vezes imediatamente.",
          feedback: "Esse é o tipo de emoção que queima verba. Primeiro confirme com mais volume."
        },
        {
          text: "Pausar porque ROAS alto é ruim.",
          feedback: "ROAS alto é bom sinal, mas precisa de confirmação. Não é motivo para pausar."
        },
        {
          text: "Concluir que o funil inteiro está perfeito.",
          feedback: "Uma venda não prova o funil inteiro. Ela só dá um sinal."
        },
        {
          text: "Ignorar CPA, margem e volume.",
          feedback: "Esses três são justamente o que impedem decisão burra."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 5",
      title: "Quando agir rápido mesmo com pouco dado",
      body: "Pouco dado normalmente pede paciência, mas existem exceções. Se a página nem carrega, se a Taxa de Visualização está absurda de baixa, se o rastreamento está bugado, se o criativo foi reprovado, se o checkout está quebrado ou se o anúncio está gastando muito sem clique nenhum, você pode agir rápido. Problema técnico não precisa esperar 500 vendas para ser óbvio.",
      cards: [
        {
          label: "Age rápido",
          status: "bad",
          text: "Bug técnico, página fora, checkout quebrado, evento duplicado ou gasto sem clique."
        },
        {
          label: "Espera mais",
          status: "warn",
          text: "CPA/ROAS oscilando com pouquíssimas compras."
        },
        {
          label: "Regra",
          text: "Pouco dado pede calma, exceto quando existe quebra clara."
        }
      ]
    },
    {
      type: "quiz",
      title: "Ação rápida",
      question: "Qual cenário justifica agir rápido mesmo com pouco dado?",
      options: [
        {
          text: "Página não carrega ou checkout está quebrado.",
          correct: true,
          feedback: "Boa. Problema técnico claro não precisa esperar grande volume."
        },
        {
          text: "Uma venda com ROAS alto.",
          feedback: "Isso é bom sinal inicial, mas não exige escala imediata."
        },
        {
          text: "Duas impressões sem compra.",
          feedback: "Duas impressões não testam nada. É cedo demais."
        },
        {
          text: "Um clique sem compra.",
          feedback: "Um clique não prova problema de página, checkout ou produto."
        },
        {
          text: "Meia hora de campanha rodando normal.",
          feedback: "Meia hora normalmente é pouco para decisão, salvo bug claro."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 6",
      title: "Janela de tempo importa",
      body: "Não olhe só um recorte minúsculo e ache que descobriu a verdade do universo. Campanha pode variar por horário, dia da semana, pagamento, sazonalidade e comportamento do público. Comparar períodos ajuda: hoje contra ontem, últimos 3 dias, últimos 7 dias. O objetivo é separar tendência de susto.",
      cards: [
        {
          label: "Recorte curto",
          status: "warn",
          text: "Pode mostrar susto, não tendência."
        },
        {
          label: "Vários dias",
          status: "good",
          text: "Ajuda a ver consistência."
        },
        {
          label: "Comparação justa",
          text: "Compare períodos parecidos e com volume suficiente."
        },
        {
          label: "Cuidado",
          text: "Não compare domingo ruim com pico de promoção sem contexto."
        }
      ]
    },
    {
      type: "quiz",
      title: "Janela de análise",
      question: "Por que analisar apenas uma hora de campanha pode enganar?",
      options: [
        {
          text: "Porque pode ser só variação de horário, pouco volume ou oscilação normal.",
          correct: true,
          feedback: "Certo. Recorte curto demais pode parecer diagnóstico, mas ainda é barulho."
        },
        {
          text: "Porque uma hora sempre prova tudo.",
          feedback: "Não. Uma hora quase sempre é pouco para decisão completa."
        },
        {
          text: "Porque campanha nunca varia por horário.",
          feedback: "Varia sim. Horário, dia e contexto podem mexer bastante."
        },
        {
          text: "Porque janela de tempo não importa.",
          feedback: "Importa muito. Janela errada cria leitura errada."
        },
        {
          text: "Porque CTR deixa de existir em uma hora.",
          feedback: "CTR existe, mas pode estar com pouco volume para conclusão."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 7",
      title: "Confiança por nível",
      body: "Pensa em três níveis de confiança. Nível 1: sinal inicial, serve para observar. Nível 2: dado acionável, serve para ajustar. Nível 3: dado forte, serve para escalar ou pausar com mais segurança. O erro é tomar decisão de nível 3 com dado de nível 1.",
      cards: [
        {
          label: "Nível 1 — Sinal",
          status: "warn",
          text: "Pouco dado. Observar e levantar hipótese."
        },
        {
          label: "Nível 2 — Ação",
          status: "good",
          text: "Dado suficiente para ajustar algo específico."
        },
        {
          label: "Nível 3 — Decisão forte",
          status: "good",
          text: "Volume e consistência para escalar, pausar ou mudar estratégia."
        },
        {
          label: "Erro clássico",
          status: "bad",
          text: "Escalar ou pausar pesado com base em sinal inicial."
        }
      ]
    },
    {
      type: "quiz",
      title: "Níveis de confiança",
      question: "O que é erro clássico de volume de dados?",
      options: [
        {
          text: "Tomar decisão forte com base em sinal inicial fraco.",
          correct: true,
          feedback: "Exato. É tratar pouco dado como se fosse prova."
        },
        {
          text: "Esperar confirmação quando só existe um clique.",
          feedback: "Esperar mais pode ser correto quando não há quebra clara."
        },
        {
          text: "Separar sinal inicial de dado forte.",
          feedback: "Isso é bom. Ajuda a decidir com mais segurança."
        },
        {
          text: "Comparar períodos com contexto.",
          feedback: "Isso também é bom. O erro é ignorar contexto."
        },
        {
          text: "Investigar bug técnico cedo.",
          feedback: "Bug técnico claro deve ser investigado cedo mesmo."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 8",
      title: "Volume de dados no diagnóstico cruzado",
      body: "Antes de perguntar 'qual métrica está ruim?', pergunte: 'essa métrica tem dado suficiente para eu acreditar nela?'. Se a resposta for não, sua ação muda. Em vez de pausar, talvez você observe. Em vez de escalar, talvez você confirme. Em vez de mexer em tudo, talvez você espere o funil respirar.",
      cards: [
        {
          label: "Pouco dado + sem bug",
          status: "warn",
          text: "Observar mais antes de decisão pesada."
        },
        {
          label: "Pouco dado + bug claro",
          status: "bad",
          text: "Corrigir o bug imediatamente."
        },
        {
          label: "Dado suficiente + gargalo claro",
          status: "good",
          text: "Ajustar a etapa indicada."
        },
        {
          label: "Dado forte + lucro consistente",
          status: "good",
          text: "Pode considerar escala controlada."
        }
      ]
    },
    {
      type: "quiz",
      title: "Diagnóstico com volume",
      question: "CPA está alto, mas existe apenas 1 compra registrada. Qual leitura é mais correta?",
      options: [
        {
          text: "É um sinal inicial, mas ainda precisa de mais compras para confirmar CPA real.",
          correct: true,
          feedback: "Boa. Com 1 compra, o CPA pode oscilar demais. Ainda não é prova forte."
        },
        {
          text: "Campanha comprovadamente morta para sempre.",
          feedback: "Com 1 compra, ainda é cedo para sentença final, salvo outros sinais graves."
        },
        {
          text: "Escalar pesado porque já teve compra.",
          feedback: "Compra isolada não valida escala."
        },
        {
          text: "Ignorar margem e ROAS.",
          feedback: "Margem e ROAS continuam importantes, mas precisam de volume para leitura forte."
        },
        {
          text: "Checkout obrigatoriamente quebrado.",
          feedback: "Se houve compra, o checkout funcionou pelo menos uma vez. Precisa analisar mais dados."
        }
      ]
    },
    {
      type: "complete",
      title: "Módulo Volume de Dados amassado",
      body: "Agora você sabe quando uma métrica merece confiança e quando ainda é só barulho. Antes de pausar, escalar ou mexer em tudo, veja se existe volume suficiente. Próximo módulo: Orçamento e Gasto.",
      xp: 160
    }
  ]
},
      {
  id: "orcamento-e-gasto",
  title: "Orçamento e Gasto: verba não é brinquedo",
  metric: "Verba",
  description: "Aprenda a ler orçamento, gasto real e ritmo de consumo antes de aumentar, reduzir ou pausar campanha.",
  xp: 160,
  difficulty: "Fundamental",
  estimatedMinutes: 19,
  requiresTicket: false,
  screens: [
    {
      type: "lesson",
      eyebrow: "Parte 1",
      title: "Orçamento não é gasto",
      body: "Orçamento é o limite que você permite a campanha gastar. Gasto é o que ela realmente consumiu. Parece detalhe besta, mas não é. Uma campanha pode ter orçamento de R$ 100 por dia e gastar só R$ 12. Outra pode gastar os R$ 100 rápido e trazer resultado ruim. O diagnóstico começa separando limite de consumo real.",
      cards: [
        {
          label: "Orçamento",
          text: "Quanto você autoriza gastar."
        },
        {
          label: "Gasto real",
          text: "Quanto a campanha realmente consumiu."
        },
        {
          label: "Ritmo de gasto",
          text: "A velocidade com que a verba está sendo consumida."
        }
      ]
    },
    {
      type: "quiz",
      title: "Orçamento sem confundir",
      question: "Qual é a diferença entre orçamento e gasto real?",
      options: [
        {
          text: "Orçamento é o limite definido; gasto real é quanto a campanha consumiu de fato.",
          correct: true,
          feedback: "Isso. Orçamento é autorização. Gasto real é dinheiro que saiu mesmo."
        },
        {
          text: "Orçamento e gasto real são sempre exatamente iguais.",
          feedback: "Nem sempre. A campanha pode gastar tudo, gastar pouco ou nem conseguir entregar."
        },
        {
          text: "Gasto real é a quantidade de cliques.",
          feedback: "Clique é volume de ação. Gasto real é dinheiro consumido."
        },
        {
          text: "Orçamento é o valor de cada compra.",
          feedback: "Valor de compra é ticket/receita. Orçamento é limite de verba."
        },
        {
          text: "Gasto real é a taxa de checkout.",
          feedback: "Taxa de checkout é conversão. Gasto real é consumo de dinheiro."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 2",
      title: "Campanha que não gasta também fala",
      body: "Se a campanha quase não gasta, alguma coisa pode estar travando entrega: público pequeno demais, lance limitado, criativo ruim, reprovação, segmentação estreita, orçamento estranho ou baixa competitividade no leilão. Não dá para julgar CPA e ROAS de uma campanha que mal saiu do lugar.",
      cards: [
        {
          label: "Possível causa 1",
          text: "Público pequeno ou segmentação estreita demais."
        },
        {
          label: "Possível causa 2",
          text: "Criativo com baixa entrega, baixa qualidade ou reprovação."
        },
        {
          label: "Possível causa 3",
          text: "Lance, otimização ou configuração limitando a campanha."
        },
        {
          label: "Leitura",
          status: "warn",
          text: "Sem gasto suficiente, muitas métricas ainda não têm força."
        }
      ]
    },
    {
      type: "quiz",
      title: "Não gastou",
      question: "Campanha com orçamento de R$ 100/dia gastou só R$ 8 no dia. Qual leitura faz mais sentido?",
      options: [
        {
          text: "A campanha pode estar com problema de entrega ou limitação antes de gerar dados úteis.",
          correct: true,
          feedback: "Boa. Se quase não gastou, primeiro entenda por que não entregou."
        },
        {
          text: "O produto foi validado com certeza absoluta.",
          feedback: "Com R$ 8 de gasto, provavelmente ainda não existe volume suficiente para validar."
        },
        {
          text: "O checkout está comprovadamente ruim.",
          feedback: "Se a campanha nem entregou direito, talvez nem tenha chegado gente suficiente no checkout."
        },
        {
          text: "Deve escalar 10 vezes imediatamente.",
          feedback: "Antes de escalar, precisa entender por que ela não gastou o orçamento atual."
        },
        {
          text: "ROAS está sempre perfeito quando gasta pouco.",
          feedback: "Gastar pouco não prova ROAS. Pode faltar dado."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 3",
      title: "Campanha que gasta rápido demais",
      body: "Quando a campanha consome verba rápido demais e as métricas vêm ruins, o prejuízo acelera. Gasto rápido com CPC alto, CTR ruim, PV–IC baixo ou CPA acima do limite é alerta. Não é porque a campanha conseguiu gastar que ela merece mais verba. Às vezes ela só está queimando dinheiro com eficiência.",
      cards: [
        {
          label: "Gasto rápido + métrica boa",
          status: "good",
          text: "Pode ser sinal de entrega com potencial."
        },
        {
          label: "Gasto rápido + métrica ruim",
          status: "bad",
          text: "Queima de verba acelerada."
        },
        {
          label: "Erro comum",
          text: "Confundir gastar muito com performar bem."
        }
      ]
    },
    {
      type: "quiz",
      title: "Gasto rápido",
      question: "Campanha gastou o orçamento inteiro cedo, com CTR baixo e CPC alto. Qual leitura encaixa melhor?",
      options: [
        {
          text: "Ela está consumindo verba rápido, mas o anúncio não está gerando clique eficiente.",
          correct: true,
          feedback: "Exato. Gasto rápido com topo ruim é alerta, não vitória."
        },
        {
          text: "Está perfeita porque gastou tudo.",
          feedback: "Gastar tudo não significa performar. Pode ser só dinheiro indo embora."
        },
        {
          text: "Checkout é o único culpado.",
          feedback: "CTR e CPC são topo do funil. O problema aparece antes do checkout."
        },
        {
          text: "Não precisa olhar criativo.",
          feedback: "CTR baixo e CPC alto pedem olhar criativo, promessa e público."
        },
        {
          text: "Deve aumentar orçamento sem ajuste.",
          feedback: "Aumentar verba em topo ruim pode acelerar prejuízo."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 4",
      title: "Orçamento baixo demais atrapalha teste",
      body: "Orçamento muito baixo pode demorar demais para gerar dados. Se você precisa avaliar venda, mas a campanha gasta centavos por dia, vai levar uma eternidade para sair do achismo. Orçamento de teste precisa ser suficiente para gerar impressões, cliques, visitas e, com sorte, compras em uma janela aceitável.",
      cards: [
        {
          label: "Baixo demais",
          status: "warn",
          text: "Demora para gerar dado e alonga o teste."
        },
        {
          label: "Alto demais",
          status: "bad",
          text: "Pode queimar verba antes de validar."
        },
        {
          label: "Ideal",
          status: "good",
          text: "Suficiente para aprender sem apostar a casa inteira."
        }
      ]
    },
    {
      type: "quiz",
      title: "Verba de teste",
      question: "Por que orçamento baixo demais pode atrapalhar o diagnóstico?",
      options: [
        {
          text: "Porque demora para gerar volume suficiente de impressões, cliques e conversões.",
          correct: true,
          feedback: "Certo. Sem volume, a métrica fica fraca e o teste demora demais."
        },
        {
          text: "Porque orçamento baixo sempre garante lucro.",
          feedback: "Não garante. Só limita o quanto pode gastar."
        },
        {
          text: "Porque orçamento baixo elimina a necessidade de análise.",
          feedback: "Análise continua necessária. O problema é ter pouco dado."
        },
        {
          text: "Porque CTR deixa de existir.",
          feedback: "CTR existe, mas pode demorar para ter volume confiável."
        },
        {
          text: "Porque checkout funciona melhor com menos dados.",
          feedback: "Checkout precisa de tráfego e inícios de checkout para ser analisado."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 5",
      title: "Orçamento alto demais antes da hora",
      body: "Orçamento alto demais em campanha não validada é pedir para o algoritmo gastar seu dinheiro aprendendo do jeito caro. Antes de subir verba, veja se existe base: CTR decente, taxa de visualização ok, PV–IC saudável, IC–Compras aceitável, CPA cabendo e ROAS coerente. Sem isso, orçamento alto vira gasolina em fogueira errada.",
      cards: [
        {
          label: "Antes de subir verba",
          text: "Confirme se o funil tem sinais saudáveis."
        },
        {
          label: "Se ainda não tem dado",
          text: "Suba com calma ou espere mais volume."
        },
        {
          label: "Se tem gargalo claro",
          status: "bad",
          text: "Corrija antes de colocar mais dinheiro."
        }
      ]
    },
    {
      type: "quiz",
      title: "Verba alta cedo demais",
      question: "Qual é o risco de colocar orçamento alto em campanha ainda não validada?",
      options: [
        {
          text: "Queimar dinheiro rápido antes de saber se o funil funciona.",
          correct: true,
          feedback: "Perfeito. Orçamento alto sem validação acelera erro."
        },
        {
          text: "Garantir lucro automático.",
          feedback: "Mais orçamento não cria lucro se o funil estiver quebrado."
        },
        {
          text: "Fazer o CPA desaparecer.",
          feedback: "CPA continua existindo. Pode até piorar com escala ruim."
        },
        {
          text: "Resolver página ruim automaticamente.",
          feedback: "Mais tráfego para página ruim só aumenta o vazamento."
        },
        {
          text: "Transformar checkout ruim em checkout bom.",
          feedback: "Checkout ruim precisa de ajuste, não só mais verba."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 6",
      title: "Quando aumentar orçamento",
      body: "Aumentar orçamento faz sentido quando a campanha tem sinais de saúde e volume minimamente confiável. CPA abaixo do limite, ROAS acima do necessário, funil sem gargalo grave e consistência por mais de um recorte. O aumento deve ser controlado, não um soco de 10x porque você ficou emocionado.",
      cards: [
        {
          label: "Pode aumentar",
          status: "good",
          text: "CPA saudável, ROAS coerente, funil ok e dados consistentes."
        },
        {
          label: "Aumente com controle",
          text: "Subida gradual reduz chance de bagunçar entrega."
        },
        {
          label: "Não aumente",
          status: "bad",
          text: "CPA acima do limite ou gargalo claro no funil."
        }
      ]
    },
    {
      type: "quiz",
      title: "Aumentar verba",
      question: "Quando faz sentido aumentar orçamento?",
      options: [
        {
          text: "Quando CPA cabe, ROAS confirma e o funil mostra consistência suficiente.",
          correct: true,
          feedback: "Boa. Aumento de verba precisa multiplicar algo saudável."
        },
        {
          text: "Quando a campanha teve uma venda isolada com pouco gasto.",
          feedback: "Pode ser sinal inicial, mas não é base forte para aumento pesado."
        },
        {
          text: "Quando o CPA está acima do limite.",
          feedback: "Aumentar verba com CPA acima do limite tende a multiplicar prejuízo."
        },
        {
          text: "Quando a página está claramente vazando.",
          feedback: "Primeiro corrige o vazamento, depois pensa em verba."
        },
        {
          text: "Quando o checkout está quebrado.",
          feedback: "Checkout quebrado precisa de correção, não mais tráfego."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 7",
      title: "Quando reduzir ou segurar orçamento",
      body: "Reduzir ou segurar orçamento faz sentido quando existe gasto acelerado com métrica ruim, pouca confiança nos dados, CPA no limite, ROAS instável ou gargalo claro. Às vezes você não precisa pausar tudo; só precisa parar de alimentar o monstro enquanto corrige o problema.",
      cards: [
        {
          label: "Segurar verba",
          status: "warn",
          text: "Quando há sinal, mas ainda falta confirmação."
        },
        {
          label: "Reduzir verba",
          status: "warn",
          text: "Quando o gasto está rápido e a eficiência está piorando."
        },
        {
          label: "Pausar",
          status: "bad",
          text: "Quando existe prejuízo claro, bug ou gargalo grave sem correção."
        }
      ]
    },
    {
      type: "quiz",
      title: "Reduzir ou segurar",
      question: "Campanha está gastando rápido, CPA no limite e ROAS instável. Qual ação é mais madura?",
      options: [
        {
          text: "Segurar ou reduzir orçamento enquanto investiga o gargalo.",
          correct: true,
          feedback: "Certo. Quando a conta está no limite, controlar verba evita sangria maior."
        },
        {
          text: "Aumentar orçamento porque instabilidade é sempre lucro.",
          feedback: "Instabilidade com CPA no limite pede cuidado, não emoção."
        },
        {
          text: "Ignorar CPA.",
          feedback: "CPA é uma das principais métricas para decidir verba."
        },
        {
          text: "Dobrar a verba sem olhar funil.",
          feedback: "Isso pode multiplicar o problema."
        },
        {
          text: "Trocar tudo ao mesmo tempo.",
          feedback: "Mexer em tudo sem diagnóstico dificulta entender o que resolveu."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 8",
      title: "Orçamento e gasto no diagnóstico cruzado",
      body: "Antes de decidir ação, olhe o gasto junto com as métricas. Pouco gasto com métrica ruim pode ser pouco dado. Muito gasto com métrica ruim pode ser prejuízo real. Pouco gasto com métrica boa pode ser sinal inicial. Muito gasto com métrica boa pode ser candidato a escala controlada.",
      cards: [
        {
          label: "Pouco gasto + métrica ruim",
          status: "warn",
          text: "Pode faltar dado. Investigue antes de sentença final."
        },
        {
          label: "Muito gasto + métrica ruim",
          status: "bad",
          text: "Problema mais forte. Segurar verba e corrigir."
        },
        {
          label: "Pouco gasto + métrica boa",
          status: "warn",
          text: "Bom sinal, mas precisa confirmar."
        },
        {
          label: "Muito gasto + métrica boa",
          status: "good",
          text: "Candidato a escala controlada."
        }
      ]
    },
    {
      type: "quiz",
      title: "Diagnóstico com verba",
      question: "Pouco gasto e ROAS alto. Qual leitura é mais segura?",
      options: [
        {
          text: "É um bom sinal inicial, mas ainda precisa de mais volume antes de escalar forte.",
          correct: true,
          feedback: "Perfeito. Pouco gasto com métrica boa pode enganar por sorte ou amostra pequena."
        },
        {
          text: "Escalar 20 vezes agora.",
          feedback: "Calma, fogueteiro. Primeiro confirme com mais dados."
        },
        {
          text: "Pausar porque ROAS alto é ruim.",
          feedback: "ROAS alto não é ruim; só precisa de confirmação."
        },
        {
          text: "Ignorar volume de dados.",
          feedback: "Volume de dados é justamente o que dá confiança para decidir."
        },
        {
          text: "Concluir que o produto nunca mais precisa de análise.",
          feedback: "Campanha muda com orçamento, tempo e público. Precisa monitorar."
        }
      ]
    },
    {
      type: "complete",
      title: "Módulo Orçamento e Gasto amassado",
      body: "Agora você sabe que orçamento é limite, gasto é dinheiro real saindo e ritmo de consumo muda a decisão. Não aumente verba em campanha quebrada e não mate campanha sem volume. Próximo módulo: Regras de Decisão.",
      xp: 160
    }
  ]
},
      {
  id: "erros-de-rastreamento",
  title: "Erros de Rastreamento: quando os números estão mentindo",
  metric: "Tracking",
  description: "Aprenda a identificar quando pixel, eventos, página ou checkout estão sujando os dados antes de tomar decisão errada.",
  xp: 170,
  difficulty: "Fundamental",
  estimatedMinutes: 20,
  requiresTicket: false,
  screens: [
    {
      type: "lesson",
      eyebrow: "Parte 1",
      title: "Antes de confiar, veja se está medindo certo",
      body: "Erro de rastreamento é quando a plataforma mostra números que não representam a realidade. Pode ser compra duplicada, evento faltando, visualização maior que clique, checkout não registrado ou página disparando evento errado. Se o dado está quebrado, a decisão sai quebrada também.",
      cards: [
        {
          label: "Dado limpo",
          status: "good",
          text: "Métrica representa o que realmente aconteceu."
        },
        {
          label: "Dado sujo",
          status: "bad",
          text: "Evento duplicado, faltando ou disparando errado."
        },
        {
          label: "Regra",
          text: "Antes de pausar, escalar ou ajustar, veja se os números fazem sentido."
        }
      ]
    },
    {
      type: "quiz",
      title: "Tracking sem ilusão",
      question: "Por que erro de rastreamento é perigoso?",
      options: [
        {
          text: "Porque você pode tomar decisão com base em números que não representam a realidade.",
          correct: true,
          feedback: "Isso. Dado quebrado gera diagnóstico quebrado."
        },
        {
          text: "Porque métrica nunca serve para nada.",
          feedback: "Métrica serve muito, mas precisa estar sendo medida corretamente."
        },
        {
          text: "Porque checkout deixa de existir.",
          feedback: "Checkout existe, mas pode estar sendo medido errado."
        },
        {
          text: "Porque CPC substitui evento de compra.",
          feedback: "CPC mede clique. Evento de compra é outra parte do rastreamento."
        },
        {
          text: "Porque orçamento sempre fica infinito.",
          feedback: "Orçamento não fica infinito. O perigo é gastar com base em leitura errada."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 2",
      title: "Evento faltando",
      body: "Evento faltando acontece quando uma ação real não aparece na plataforma. A pessoa compra, mas a compra não registra. A pessoa inicia checkout, mas o evento não aparece. Isso faz a campanha parecer pior do que está e pode te levar a pausar uma coisa que talvez estivesse funcionando.",
      cards: [
        {
          label: "Compra não registrada",
          status: "bad",
          text: "A campanha parece sem venda mesmo tendo venda real."
        },
        {
          label: "Checkout não registrado",
          status: "bad",
          text: "PV–IC e IC–Compras ficam distorcidos."
        },
        {
          label: "Consequência",
          text: "CPA, ROAS e diagnóstico do funil ficam errados."
        }
      ]
    },
    {
      type: "quiz",
      title: "Evento faltando",
      question: "A loja mostra 5 compras, mas a plataforma registrou só 1 compra. Qual suspeita faz sentido?",
      options: [
        {
          text: "Evento de compra pode não estar registrando aprendizadotamente.",
          correct: true,
          feedback: "Boa. Quando a loja e a plataforma divergem muito, suspeite do rastreamento."
        },
        {
          text: "A campanha obrigatoriamente não vendeu.",
          feedback: "Se a loja mostra compras reais, a campanha ou outros canais podem ter vendido. O tracking pode estar falhando."
        },
        {
          text: "ROAS da plataforma está 100% confiável.",
          feedback: "Se compras não registram, o ROAS da plataforma pode estar subestimado."
        },
        {
          text: "Checkout não existe.",
          feedback: "Checkout existe, mas o evento pode estar falhando."
        },
        {
          text: "Deve escalar só olhando a plataforma.",
          feedback: "Antes de escalar, corrija ou confirme a diferença entre plataforma e loja."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 3",
      title: "Evento duplicado",
      body: "Evento duplicado é o contrário: uma ação conta mais de uma vez. Uma compra vira duas. Um início de checkout dispara várias vezes. A plataforma acha que a campanha está melhor do que está. Isso é perigoso porque pode te fazer escalar uma campanha que parece lucrativa, mas só está com número inflado.",
      cards: [
        {
          label: "Compra duplicada",
          status: "bad",
          text: "ROAS fica inflado e CPA parece menor do que é."
        },
        {
          label: "Checkout duplicado",
          status: "bad",
          text: "PV–IC pode parecer lindo sem ser real."
        },
        {
          label: "Perigo",
          text: "Você escala mentira achando que é lucro."
        }
      ]
    },
    {
      type: "quiz",
      title: "Evento duplicado",
      question: "A loja teve 3 compras reais, mas a plataforma mostra 9 compras. Qual suspeita é mais forte?",
      options: [
        {
          text: "Evento de compra duplicado ou disparando mais de uma vez.",
          correct: true,
          feedback: "Exato. Compra registrada em excesso é sinal clássico de duplicação ou configuração errada."
        },
        {
          text: "A loja escondeu 6 compras.",
          feedback: "Pode haver atraso ou diferença de atribuição, mas 3 virando 9 pede suspeita forte de duplicação."
        },
        {
          text: "CPA está garantidamente perfeito.",
          feedback: "Se compra duplicou, CPA parece melhor do que é."
        },
        {
          text: "ROAS está garantidamente real.",
          feedback: "ROAS pode estar inflado se as compras foram duplicadas."
        },
        {
          text: "Não precisa verificar nada.",
          feedback: "Precisa verificar urgente, porque decisão financeira pode estar baseada em mentira."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 4",
      title: "Visualização maior que clique",
      body: "Algumas diferenças podem acontecer por atraso, atribuição ou carregamentos repetidos. Mas se as visualizações da página aparecem muito maiores que os cliques, suspeite. Pode ter evento disparando em lugar errado, duplicação, atualização de página, tráfego de outras fontes misturado ou configuração bugada.",
      cards: [
        {
          label: "Cliques",
          text: "Pessoas que tocaram no anúncio."
        },
        {
          label: "Visualizações",
          text: "Páginas carregadas e registradas."
        },
        {
          label: "Alerta",
          status: "warn",
          text: "Visualização muito maior que clique pode indicar tracking sujo."
        },
        {
          label: "Ação",
          text: "Comparar plataforma, analytics, loja e eventos disparados."
        }
      ]
    },
    {
      type: "quiz",
      title: "Visualização estranha",
      question: "Campanha teve 100 cliques e 380 visualizações de página registradas. Qual leitura é mais madura?",
      options: [
        {
          text: "Pode haver evento duplicado, tráfego misturado ou configuração disparando visualização errado.",
          correct: true,
          feedback: "Boa. Essa diferença é grande o suficiente para investigar tracking."
        },
        {
          text: "A campanha está automaticamente perfeita.",
          feedback: "Número estranho não prova perfeição. Pode ser erro de mensuração."
        },
        {
          text: "Toda visualização acima de clique é sempre impossível.",
          feedback: "Podem existir diferenças por recarregamento e atribuição, mas volume muito maior pede investigação."
        },
        {
          text: "Não precisa comparar com nenhuma outra fonte.",
          feedback: "Precisa comparar com loja, analytics e eventos para confirmar."
        },
        {
          text: "Checkout é sempre o culpado.",
          feedback: "Esse problema aparece antes do checkout: na medição de clique e página."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 5",
      title: "Compra registrada sem pedido real",
      body: "Se a plataforma registra compra, mas não existe pedido real na loja, acende alerta. Pode ser evento de compra disparando na página errada, no botão errado, no carregamento do checkout ou na página de obrigado sem confirmação real. Isso infla resultado e destrói a confiança no ROAS.",
      cards: [
        {
          label: "Compra na plataforma",
          text: "Evento registrado como purchase."
        },
        {
          label: "Pedido na loja",
          text: "Venda real, paga ou criada no sistema."
        },
        {
          label: "Alerta vermelho",
          status: "bad",
          text: "Compra registrada sem pedido real."
        }
      ]
    },
    {
      type: "quiz",
      title: "Compra falsa",
      question: "A plataforma mostra compra, mas não existe pedido aprendizadospondente na loja. Qual suspeita faz mais sentido?",
      options: [
        {
          text: "Evento de compra pode estar disparando no lugar errado.",
          correct: true,
          feedback: "Certo. Compra sem pedido real é alerta forte de evento mal configurado."
        },
        {
          text: "A venda é sempre real mesmo sem pedido.",
          feedback: "Sem pedido real, precisa investigar antes de considerar venda."
        },
        {
          text: "ROAS está perfeito e confirmado.",
          feedback: "ROAS pode estar inflado por evento falso."
        },
        {
          text: "CPA está sempre pior do que parece.",
          feedback: "Com compra falsa, CPA parece melhor do que é."
        },
        {
          text: "Não precisa olhar a loja.",
          feedback: "A loja é a fonte principal para confirmar pedido real."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 6",
      title: "Diferença de atribuição não é sempre bug",
      body: "Nem toda diferença é erro. Plataformas atribuem vendas de formas diferentes. Uma venda pode aparecer no TikTok, Meta, Google, loja ou analytics de maneiras diferentes por janela de atribuição, clique, visualização, navegador, bloqueio de cookies ou atraso. O segredo é separar diferença normal de absurdo técnico.",
      cards: [
        {
          label: "Diferença normal",
          status: "warn",
          text: "Atraso, janela de atribuição e método diferente de contagem."
        },
        {
          label: "Bug provável",
          status: "bad",
          text: "Evento duplicado, compra sem pedido ou métrica impossível."
        },
        {
          label: "Regra",
          text: "Não surte com diferença pequena; investigue diferença grande ou sem lógica."
        }
      ]
    },
    {
      type: "quiz",
      title: "Atribuição ou bug?",
      question: "Qual cenário parece mais bug do que diferença normal de atribuição?",
      options: [
        {
          text: "Plataforma registra compra sem existir pedido real na loja.",
          correct: true,
          feedback: "Perfeito. Isso é muito mais suspeito que uma simples diferença de atribuição."
        },
        {
          text: "Uma venda aparece com atraso de algumas horas.",
          feedback: "Atraso pode acontecer. Não é automaticamente bug grave."
        },
        {
          text: "Meta e loja mostram números um pouco diferentes.",
          feedback: "Diferenças pequenas entre fontes podem acontecer."
        },
        {
          text: "Analytics e plataforma usam janelas diferentes.",
          feedback: "Isso é diferença comum de atribuição."
        },
        {
          text: "Venda aparece em um canal e depois em relatório consolidado.",
          feedback: "Pode ser normal, dependendo do sistema e da janela."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 7",
      title: "Checklist rápido de rastreamento",
      body: "Quando desconfiar dos dados, use um checklist simples: a loja confirma os pedidos? O evento dispara uma vez só? A compra dispara apenas após pagamento/pedido? O checkout registra corretamente? A página de visualização não está duplicando? Os números fazem sentido comparados ao funil?",
      cards: [
        {
          label: "1. Pedido real",
          text: "Compra registrada bate com pedido na loja?"
        },
        {
          label: "2. Disparo único",
          text: "Evento dispara uma vez por ação?"
        },
        {
          label: "3. Lugar certo",
          text: "Compra dispara só na confirmação correta?"
        },
        {
          label: "4. Funil lógico",
          text: "Cliques, visualizações, checkouts e compras fazem sentido?"
        },
        {
          label: "5. Fontes",
          text: "Compare plataforma, loja e analytics."
        }
      ]
    },
    {
      type: "quiz",
      title: "Checklist de tracking",
      question: "Qual pergunta faz parte de um bom checklist de rastreamento?",
      options: [
        {
          text: "O evento de compra bate com pedidos reais da loja?",
          correct: true,
          feedback: "Boa. Compra precisa ser confirmada com pedido real."
        },
        {
          text: "Meu criativo está bonito?",
          feedback: "Criativo importa, mas isso não verifica rastreamento."
        },
        {
          text: "A cor do botão é agradável?",
          feedback: "Pode afetar página, mas não confirma se o evento está correto."
        },
        {
          text: "A frequência está acima de 2?",
          feedback: "Frequência é mídia. Tracking verifica se os eventos estão corretos."
        },
        {
          text: "O produto parece legal?",
          feedback: "Produto é estratégia/oferta. Rastreamento precisa comparar eventos e pedidos."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 8",
      title: "Tracking no diagnóstico cruzado",
      body: "Antes de tomar uma decisão forte, pergunte: os dados são confiáveis? Se tracking está quebrado, não adianta diagnosticar CPA, ROAS, PV–IC ou IC–Compras como se tudo fosse verdade. Primeiro corrija a mensuração. Depois volte para a leitura do funil.",
      cards: [
        {
          label: "Dados confiáveis",
          status: "good",
          text: "Pode seguir para diagnóstico de funil."
        },
        {
          label: "Dados suspeitos",
          status: "warn",
          text: "Compare fontes antes de agir pesado."
        },
        {
          label: "Dados quebrados",
          status: "bad",
          text: "Corrija rastreamento antes de escalar ou pausar por métrica final."
        },
        {
          label: "Regra final",
          text: "Não escala mentira e não pausa campanha por dado falso."
        }
      ]
    },
    {
      type: "quiz",
      title: "Decisão com tracking",
      question: "CPA parece ótimo, mas você descobriu que compras estão duplicadas. Qual decisão é mais correta?",
      options: [
        {
          text: "Corrigir o rastreamento antes de confiar no CPA e escalar.",
          correct: true,
          feedback: "Exato. CPA bom com compra duplicada é número contaminado."
        },
        {
          text: "Escalar forte porque CPA parece ótimo.",
          feedback: "Se compra duplicou, o CPA parece melhor do que é. Escalar agora é perigoso."
        },
        {
          text: "Ignorar a duplicação.",
          feedback: "Duplicação destrói a leitura de CPA e ROAS."
        },
        {
          text: "Pausar todos os produtos para sempre.",
          feedback: "Primeiro corrija o tracking. O problema pode estar na medição, não no produto."
        },
        {
          text: "Trocar a página sem verificar eventos.",
          feedback: "O problema identificado é rastreamento. Corrija isso antes de mexer no funil."
        }
      ]
    },
    {
      type: "complete",
      title: "Módulo Erros de Rastreamento amassado",
      body: "Agora você sabe quando os números podem estar mentindo. Antes de confiar em CPA, ROAS, PV–IC ou IC–Compras, veja se os eventos estão limpos. Próximo módulo: Checklist Final de Campanha.",
      xp: 170
    }
  ]
},
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
            body: "Antes de escalar, passa o pente fino: o anúncio atrai clique bom? O clique chega na página? A página leva para checkout? O checkout fecha? O CPA cabe na margem? O ROAS e ROI confirma retorno? Se uma resposta falha, você corrige antes de escalar.",
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
            body: "Guarda esse mapa: CPC/CPM ruins apontam topo. Visualização baixa aponta ponte. PV–IC baixo aponta página/oferta. IC–Compras baixo aponta checkout. CPA alto aponta custo por venda acima do limite. ROAS e ROI ruim aponta consequência financeira. O trabalho é voltar da consequência até a causa.",
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
      },
      {
  id: "regras-de-decisao",
  title: "Regras de Decisão: pausa, ajusta ou escala?",
  metric: "Decisão",
  description: "Aprenda a transformar métricas em ação prática: manter, ajustar, pausar ou escalar sem agir no impulso.",
  xp: 170,
  difficulty: "Fundamental",
  estimatedMinutes: 20,
  requiresTicket: true,
  screens: [
    {
      type: "lesson",
      eyebrow: "Parte 1",
      title: "Métrica boa não serve se você não sabe agir",
      body: "Saber o que é CPC, CPA ou ROAS é só metade do jogo. A outra metade é saber o que fazer com isso. Regras de decisão transformam métrica em ação: manter, ajustar, pausar ou escalar. Sem regra, você vira refém da emoção: pausa cedo demais, escala cedo demais ou mexe em tudo feito maluco.",
      cards: [
        {
          label: "Manter",
          text: "Quando ainda precisa de dados ou a campanha está estável."
        },
        {
          label: "Ajustar",
          text: "Quando existe gargalo claro em uma etapa."
        },
        {
          label: "Pausar",
          text: "Quando há prejuízo claro, bug ou falta de sinal após testes."
        },
        {
          label: "Escalar",
          text: "Quando o funil está saudável, com dados e lucro."
        }
      ]
    },
    {
      type: "quiz",
      title: "Decisão sem surto",
      question: "Qual é a função das regras de decisão?",
      options: [
        {
          text: "Transformar métricas em ações práticas, como manter, ajustar, pausar ou escalar.",
          correct: true,
          feedback: "Isso. Métrica boa precisa virar decisão boa."
        },
        {
          text: "Fazer você mexer em tudo ao mesmo tempo.",
          feedback: "Isso vira bagunça. Regra de decisão serve para agir com controle."
        },
        {
          text: "Ignorar o funil e decidir por emoção.",
          feedback: "É o contrário. A ideia é parar de agir no impulso."
        },
        {
          text: "Escalar qualquer campanha que teve um clique.",
          feedback: "Um clique não valida escala. Precisa de volume e funil saudável."
        },
        {
          text: "Pausar toda campanha no primeiro dia.",
          feedback: "Nem sempre. Às vezes falta dado; às vezes precisa ajustar; às vezes pode manter."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 2",
      title: "Regra 1: manter quando ainda falta dado",
      body: "Manter não é ser passivo. Às vezes é a decisão mais inteligente. Se tem pouco gasto, poucos cliques, poucas visitas ou só uma venda isolada, a métrica ainda pode estar fraca. Se não existe bug claro nem prejuízo acelerado, talvez a ação certa seja deixar rodar até ter dado suficiente.",
      cards: [
        {
          label: "Manter",
          status: "warn",
          text: "Pouco dado, sem bug claro e sem sangria acelerada."
        },
        {
          label: "Observar",
          text: "Acompanhar CTR, CPC, Visualização, PV–IC, CPA e ROAS."
        },
        {
          label: "Erro comum",
          status: "bad",
          text: "Pausar com meia dúzia de impressões e achar que analisou."
        }
      ]
    },
    {
      type: "quiz",
      title: "Quando manter",
      question: "Campanha nova gastou pouco, teve alguns cliques, nenhuma compra e não há bug aparente. Qual decisão costuma fazer mais sentido?",
      options: [
        {
          text: "Manter observando até ter volume suficiente para uma decisão mais forte.",
          correct: true,
          feedback: "Boa. Sem volume e sem bug claro, a leitura ainda é fraca."
        },
        {
          text: "Pausar para sempre porque ainda não vendeu.",
          feedback: "Pode ser cedo demais. Primeiro veja se existe volume suficiente."
        },
        {
          text: "Escalar pesado porque teve alguns cliques.",
          feedback: "Alguns cliques não validam escala. Falta dado."
        },
        {
          text: "Trocar página, checkout e criativo tudo junto.",
          feedback: "Mexer em tudo cedo demais destrói o diagnóstico."
        },
        {
          text: "Concluir que o produto é ruim com certeza.",
          feedback: "Sem volume, isso é chute."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 3",
      title: "Regra 2: ajustar quando o gargalo é claro",
      body: "Ajustar é a ação quando uma etapa específica está quebrando. CTR baixo? Ajusta criativo, hook e promessa. Taxa de Visualização baixa? Ajusta carregamento, alinhamento ou rastreamento. PV–IC baixo? Ajusta página/oferta. IC–Compras baixo? Ajusta checkout. CPA alto? Volta no funil para achar a causa.",
      cards: [
        {
          label: "CTR baixo",
          text: "Ajustar criativo, hook, promessa e público."
        },
        {
          label: "Visualização baixa",
          text: "Ajustar página, velocidade, promessa ou rastreamento."
        },
        {
          label: "PV–IC baixo",
          text: "Ajustar página, oferta, prova, CTA e garantia."
        },
        {
          label: "IC–Compras baixo",
          text: "Ajustar checkout, pagamento, confiança e fricção."
        },
        {
          label: "CPA alto",
          text: "Diagnosticar onde o custo subiu ou a conversão caiu."
        }
      ]
    },
    {
      type: "quiz",
      title: "Quando ajustar",
      question: "PV–IC está baixo, mas Taxa de Visualização está boa. Qual ajuste faz mais sentido?",
      options: [
        {
          text: "Ajustar página/oferta, porque o tráfego chega mas não inicia checkout.",
          correct: true,
          feedback: "Exato. Se chegou na página e não avançou, o gargalo está na página/oferta."
        },
        {
          text: "Trocar só o checkout.",
          feedback: "Ainda nem tem gente suficiente iniciando checkout. O problema aparece antes."
        },
        {
          text: "Escalar para gerar mais vazamento.",
          feedback: "Escalar página fraca só aumenta o desperdício."
        },
        {
          text: "Ignorar PV–IC.",
          feedback: "PV–IC é justamente a métrica que indica o gargalo."
        },
        {
          text: "Pausar sem testar a página.",
          feedback: "Se há tráfego chegando, pode valer ajuste de página/oferta antes da sentença final."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 4",
      title: "Regra 3: pausar quando a campanha virou sangria",
      body: "Pausar faz sentido quando a campanha mostra prejuízo claro, bug grave, CPA acima do limite com volume suficiente, gasto acelerado sem sinal de melhora ou gargalo técnico. Pausar não é fracasso. Às vezes é só parar de pagar para apanhar.",
      cards: [
        {
          label: "Pausar por prejuízo",
          status: "bad",
          text: "CPA acima do limite com volume suficiente."
        },
        {
          label: "Pausar por bug",
          status: "bad",
          text: "Página fora, checkout quebrado ou rastreamento absurdo."
        },
        {
          label: "Pausar por ausência de sinal",
          status: "warn",
          text: "Depois de testes suficientes, sem clique, sem intenção e sem venda."
        },
        {
          label: "Não confundir",
          text: "Pausar é diferente de desistir do produto para sempre."
        }
      ]
    },
    {
      type: "quiz",
      title: "Quando pausar",
      question: "Campanha já gastou bastante, CPA está acima do limite e o funil não mostra melhora. Qual ação é mais segura?",
      options: [
        {
          text: "Pausar ou reduzir forte enquanto revisa o gargalo.",
          correct: true,
          feedback: "Certo. Se há volume e prejuízo claro, continuar igual é financiar sangria."
        },
        {
          text: "Aumentar orçamento para ver se o prejuízo fica maior.",
          feedback: "Isso só acelera o problema se nada mudou."
        },
        {
          text: "Ignorar CPA.",
          feedback: "CPA acima do limite é um dos principais sinais de risco."
        },
        {
          text: "Escalar porque gasto alto sempre é bom.",
          feedback: "Gasto alto com resultado ruim é queima de verba."
        },
        {
          text: "Mexer em tudo sem saber onde está o gargalo.",
          feedback: "Primeiro pause/segure a sangria, depois ajuste com diagnóstico."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 5",
      title: "Regra 4: escalar só quando o sistema está saudável",
      body: "Escalar é aumentar o que já está funcionando. Não é tentar salvar campanha quebrada com mais dinheiro. Para escalar, você quer ver: dados suficientes, CPA abaixo do limite, ROAS coerente, PV–IC e IC–Compras saudáveis, sem bug de rastreamento e resultado consistente por mais de um recorte.",
      cards: [
        {
          label: "Precisa de dado",
          text: "Sem volume, escala é aposta."
        },
        {
          label: "Precisa de lucro",
          text: "CPA precisa caber na margem."
        },
        {
          label: "Precisa de funil",
          text: "Página e checkout não podem estar vazando forte."
        },
        {
          label: "Precisa de consistência",
          text: "Um pico bonito não é validação completa."
        }
      ]
    },
    {
      type: "quiz",
      title: "Quando escalar",
      question: "Qual cenário é mais adequado para escalar com controle?",
      options: [
        {
          text: "CPA abaixo do limite, ROAS saudável, funil sem gargalo grave e dados consistentes.",
          correct: true,
          feedback: "Perfeito. Escala deve multiplicar um sistema saudável."
        },
        {
          text: "Uma venda isolada com pouco gasto.",
          feedback: "Bom sinal inicial, mas ainda pode ser sorte. Falta confirmação."
        },
        {
          text: "CPA acima do limite e checkout travando.",
          feedback: "Isso pede correção, não escala."
        },
        {
          text: "Página com PV–IC baixo e gasto acelerado.",
          feedback: "Escalar página que não conduz só aumenta vazamento."
        },
        {
          text: "Rastreamento bugado.",
          feedback: "Com dados bugados, você nem sabe se a decisão é real."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 6",
      title: "Não mexa em tudo ao mesmo tempo",
      body: "Quando você muda criativo, público, página, preço e checkout tudo junto, você perde o controle do aprendizado. Se melhorou, você não sabe o que funcionou. Se piorou, você não sabe o que quebrou. A decisão boa mexe na etapa indicada pelo gargalo.",
      cards: [
        {
          label: "Gargalo no criativo",
          text: "Teste hook, promessa, visual e ângulo."
        },
        {
          label: "Gargalo na página",
          text: "Teste headline, prova, CTA, oferta e clareza."
        },
        {
          label: "Gargalo no checkout",
          text: "Teste fricção, pagamento, garantia e confiança."
        },
        {
          label: "Regra",
          status: "good",
          text: "Mude o necessário para aprender, não tudo para se perder."
        }
      ]
    },
    {
      type: "quiz",
      title: "Teste com controle",
      question: "Por que mudar tudo ao mesmo tempo é ruim?",
      options: [
        {
          text: "Porque você perde a capacidade de saber o que melhorou ou piorou.",
          correct: true,
          feedback: "Isso. Teste bom gera aprendizado. Teste caótico gera confusão."
        },
        {
          text: "Porque nunca se deve testar nada.",
          feedback: "Deve testar sim, mas com controle."
        },
        {
          text: "Porque métrica não importa.",
          feedback: "Métrica importa justamente para orientar o que testar."
        },
        {
          text: "Porque checkout sempre é perfeito.",
          feedback: "Checkout pode ser gargalo, mas precisa ser identificado antes de mexer."
        },
        {
          text: "Porque criativo não influencia campanha.",
          feedback: "Criativo influencia muito. O ponto é testar sem bagunçar tudo."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 7",
      title: "A matriz simples de decisão",
      body: "Use uma matriz mental: pouco dado e sem bug? manter. Gargalo claro? ajustar. Prejuízo claro com volume? pausar ou reduzir. Sistema saudável com lucro e consistência? escalar. Essa matriz é o volante do Tabelingo: ela transforma leitura de métrica em próxima ação.",
      cards: [
        {
          label: "Pouco dado",
          status: "warn",
          text: "Manter e observar, salvo bug claro."
        },
        {
          label: "Gargalo claro",
          status: "warn",
          text: "Ajustar a etapa certa."
        },
        {
          label: "Prejuízo claro",
          status: "bad",
          text: "Pausar, reduzir ou corrigir antes de gastar mais."
        },
        {
          label: "Lucro consistente",
          status: "good",
          text: "Escalar com controle."
        }
      ]
    },
    {
      type: "quiz",
      title: "Matriz de decisão",
      question: "Pouco dado, sem bug e sem gasto alto. Qual decisão tende a ser melhor?",
      options: [
        {
          text: "Manter observando até ter mais volume.",
          correct: true,
          feedback: "Boa. Pouco dado sem quebra clara pede paciência."
        },
        {
          text: "Pausar imediatamente sempre.",
          feedback: "Pode ser cedo demais. Sem dado, a decisão fica fraca."
        },
        {
          text: "Escalar pesado.",
          feedback: "Sem dado, escala vira aposta."
        },
        {
          text: "Mudar tudo de uma vez.",
          feedback: "Isso mata o aprendizado antes de existir diagnóstico."
        },
        {
          text: "Ignorar campanha para sempre.",
          feedback: "O correto é acompanhar até ter leitura melhor."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 8",
      title: "Regras de decisão no diagnóstico cruzado",
      body: "No final, toda análise precisa virar uma frase de ação. Não basta dizer 'CPA alto'. Tem que dizer: 'CPA alto porque PV–IC está baixo, então vou ajustar página antes de escalar'. Ou: 'ROAS bom com pouco dado, então vou manter e confirmar'. Ou: 'checkout quebrado, então vou pausar e corrigir agora'.",
      cards: [
        {
          label: "Diagnóstico ruim",
          status: "bad",
          text: "CPA alto. E daí?"
        },
        {
          label: "Diagnóstico bom",
          status: "good",
          text: "CPA alto por gargalo em PV–IC; ação: ajustar página/oferta."
        },
        {
          label: "Diagnóstico completo",
          status: "good",
          text: "Métrica + causa provável + ação + próximo acompanhamento."
        }
      ]
    },
    {
      type: "quiz",
      title: "Diagnóstico vira ação",
      question: "Qual resposta mostra uma decisão completa?",
      options: [
        {
          text: "PV–IC baixo com visualização boa; vou ajustar página/oferta e acompanhar se checkout aumenta.",
          correct: true,
          feedback: "Perfeito. Tem métrica, causa provável, ação e acompanhamento."
        },
        {
          text: "Tá ruim.",
          feedback: "Isso não vira ação. Precisa dizer o que está ruim e onde mexer."
        },
        {
          text: "ROAS caiu, então vou mexer em tudo.",
          feedback: "ROAS é consequência. Precisa descobrir onde o funil quebrou."
        },
        {
          text: "CPC subiu, então o checkout é culpado.",
          feedback: "CPC é topo do funil. Checkout vem depois."
        },
        {
          text: "Uma venda saiu, então acabou a análise.",
          feedback: "Uma venda é sinal, não conclusão final."
        }
      ]
    },
    {
      type: "complete",
      title: "Módulo Regras de Decisão amassado",
      body: "Agora você sabe transformar métrica em ação: manter quando falta dado, ajustar quando o gargalo é claro, pausar quando virou sangria e escalar quando o sistema está saudável. Próximo módulo: Erros de Rastreamento.",
      xp: 170
    }
  ]
},
      {
  id: "checklist-final-campanha",
  title: "Checklist Final: olha tudo antes de decidir",
  metric: "Checklist",
  description: "Aprenda a passar por uma campanha inteira e transformar métricas em uma decisão final: manter, ajustar, pausar ou escalar.",
  xp: 180,
  difficulty: "Fundamental",
  estimatedMinutes: 22,
  requiresTicket: true,
  screens: [
    {
      type: "lesson",
      eyebrow: "Parte 1",
      title: "O checklist é o freio de mão da emoção",
      body: "Checklist final é a ordem certa para olhar uma campanha antes de agir. Ele evita decisão emocionada: pausar cedo demais, escalar cedo demais ou mexer em tudo ao mesmo tempo. A pergunta central é: os dados são confiáveis, existe volume, onde está o gargalo e qual ação faz sentido agora?",
      cards: [
        {
          label: "1. Dados",
          text: "Os números estão confiáveis?"
        },
        {
          label: "2. Volume",
          text: "Tem dado suficiente para decidir?"
        },
        {
          label: "3. Funil",
          text: "Onde a campanha está quebrando?"
        },
        {
          label: "4. Dinheiro",
          text: "CPA, ROAS e margem fecham a conta?"
        },
        {
          label: "5. Ação",
          text: "Manter, ajustar, pausar ou escalar?"
        }
      ]
    },
    {
      type: "quiz",
      title: "Checklist sem emoção",
      question: "Qual é o objetivo do checklist final de campanha?",
      options: [
        {
          text: "Organizar a análise para transformar métricas em uma decisão prática e segura.",
          correct: true,
          feedback: "Isso. O checklist evita chute e transforma leitura em ação."
        },
        {
          text: "Fazer você escalar toda campanha que teve um clique.",
          feedback: "Um clique não valida escala. Checklist existe para evitar esse tipo de emoção."
        },
        {
          text: "Ignorar dados e decidir pelo gosto pessoal.",
          feedback: "É o contrário. Checklist força decisão baseada em métrica e contexto."
        },
        {
          text: "Mexer em todas as partes do funil ao mesmo tempo.",
          feedback: "Checklist ajuda a achar a etapa certa, não a bagunçar tudo."
        },
        {
          text: "Pausar tudo sempre.",
          feedback: "Pausar é uma das ações possíveis, mas não é sempre a ação correta."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 2",
      title: "Passo 1: os dados estão limpos?",
      body: "Antes de analisar performance, confirme se os dados não estão mentindo. Compra duplicada, compra faltando, visualização absurda, evento no lugar errado e diferença sem lógica entre loja e plataforma podem destruir qualquer diagnóstico. Dado quebrado vem antes de campanha quebrada.",
      cards: [
        {
          label: "Compra bate com pedido?",
          text: "Compare plataforma com pedidos reais da loja."
        },
        {
          label: "Evento duplica?",
          text: "Uma ação não pode virar várias compras falsas."
        },
        {
          label: "Funil faz sentido?",
          text: "Cliques, visualizações, checkouts e compras precisam ter lógica."
        },
        {
          label: "Se estiver bugado",
          status: "bad",
          text: "Corrija rastreamento antes de decidir."
        }
      ]
    },
    {
      type: "quiz",
      title: "Primeiro passo",
      question: "Por que o checklist começa verificando rastreamento?",
      options: [
        {
          text: "Porque dados quebrados geram decisões quebradas.",
          correct: true,
          feedback: "Perfeito. Se o número está sujo, qualquer análise fica contaminada."
        },
        {
          text: "Porque rastreamento substitui margem.",
          feedback: "Não substitui. Ele só garante que as métricas estão sendo medidas direito."
        },
        {
          text: "Porque compra duplicada melhora lucro real.",
          feedback: "Compra duplicada só infla relatório. Não cria dinheiro no caixa."
        },
        {
          text: "Porque pedido real não importa.",
          feedback: "Pedido real importa muito. Ele confirma se a compra registrada existe."
        },
        {
          text: "Porque pixel nunca erra.",
          feedback: "Pixel/eventos podem errar sim. Por isso precisam ser verificados."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 3",
      title: "Passo 2: tem volume suficiente?",
      body: "Depois de ver se o dado está limpo, veja se existe volume. Pouca impressão não valida criativo. Poucos cliques não validam página. Um checkout não valida checkout. Uma venda não valida escala. Sem volume, a decisão forte vira aposta.",
      cards: [
        {
          label: "Pouco dado",
          status: "warn",
          text: "Observe, levante hipótese e evite decisão pesada."
        },
        {
          label: "Volume suficiente",
          status: "good",
          text: "Dá para tomar ação com mais confiança."
        },
        {
          label: "Bug claro",
          status: "bad",
          text: "Corrija rápido mesmo com pouco dado."
        },
        {
          label: "Regra",
          text: "Sem volume, trate como sinal; com volume, trate como evidência."
        }
      ]
    },
    {
      type: "quiz",
      title: "Volume no checklist",
      question: "Campanha teve 1 venda com pouco gasto e ROAS alto. Qual decisão combina melhor com o checklist?",
      options: [
        {
          text: "Tratar como bom sinal inicial e confirmar com mais volume antes de escalar forte.",
          correct: true,
          feedback: "Boa. Uma venda pode ser sinal, mas ainda não é validação forte."
        },
        {
          text: "Escalar 20 vezes imediatamente.",
          feedback: "Isso é emoção. Pouco dado com número bonito ainda pode ser sorte."
        },
        {
          text: "Pausar porque vendeu.",
          feedback: "Venda é sinal positivo, não motivo automático para pausar."
        },
        {
          text: "Ignorar volume de dados.",
          feedback: "Volume é o que separa sinal de evidência."
        },
        {
          text: "Concluir que o produto nunca mais precisa de análise.",
          feedback: "Campanha muda com verba, criativo, público e tempo."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 4",
      title: "Passo 3: o topo do funil está saudável?",
      body: "Agora olhe o anúncio. CPM mostra custo de atenção. CTR mostra vontade de clicar. CPC mostra custo do clique. Frequência mostra se o público está cansando. Se o topo está ruim, não adianta culpar checkout primeiro. A pessoa nem entrou direito no funil.",
      cards: [
        {
          label: "CPM alto",
          text: "Atenção cara, público caro ou leilão pesado."
        },
        {
          label: "CTR baixo",
          text: "Criativo, hook ou promessa não puxam clique."
        },
        {
          label: "CPC alto",
          text: "Clique caro; pode vir de CTR baixo, CPM alto ou público ruim."
        },
        {
          label: "Frequência alta + CTR caindo",
          status: "warn",
          text: "Sinal de fadiga ou saturação."
        }
      ]
    },
    {
      type: "quiz",
      title: "Topo do funil",
      question: "CTR baixo e CPC alto. Qual ação entra melhor no checklist?",
      options: [
        {
          text: "Revisar criativo, hook, promessa e público antes de mexer no checkout.",
          correct: true,
          feedback: "Exato. Esse gargalo está no topo do funil."
        },
        {
          text: "Culpar o checkout primeiro.",
          feedback: "CTR e CPC acontecem antes da página e do checkout."
        },
        {
          text: "Escalar porque clique caro é sempre bom.",
          feedback: "Clique caro com CTR baixo é alerta, não convite para escala."
        },
        {
          text: "Ignorar criativo.",
          feedback: "CTR baixo é uma das maiores pistas de criativo/promessa fracos."
        },
        {
          text: "Trocar métodos de pagamento.",
          feedback: "Pagamento fica no checkout. Aqui o problema aparece antes."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 5",
      title: "Passo 4: a ponte clique → página está funcionando?",
      body: "Depois do clique, veja a Taxa de Visualização. Ela mostra se quem clicou realmente carregou a página. Se CPC está bom, mas Visualização está baixa, você pode estar perdendo gente entre o anúncio e a página: lentidão, promessa desalinhada, clique curioso ou rastreamento errado.",
      cards: [
        {
          label: "Visualização boa",
          status: "good",
          text: "O clique está chegando na página."
        },
        {
          label: "Visualização baixa",
          status: "bad",
          text: "Existe vazamento entre clique e página."
        },
        {
          label: "Ações",
          text: "Ver velocidade, mobile, alinhamento da promessa e tracking."
        }
      ]
    },
    {
      type: "quiz",
      title: "Ponte do funil",
      question: "CPC bom, mas Taxa de Visualização baixa. Qual leitura faz mais sentido?",
      options: [
        {
          text: "O clique é barato, mas pode estar vazando antes de carregar a página.",
          correct: true,
          feedback: "Boa. Esse é o gargalo entre anúncio e página."
        },
        {
          text: "Checkout é comprovadamente o único culpado.",
          feedback: "Ainda não chegamos no checkout. Primeiro resolva a chegada na página."
        },
        {
          text: "Página está validada com certeza.",
          feedback: "Se pouca gente carrega a página, ela ainda nem foi testada direito."
        },
        {
          text: "Escalar porque CPC bom resolve tudo.",
          feedback: "CPC bom com visualização baixa pode só comprar mais vazamento."
        },
        {
          text: "ROAS está garantido.",
          feedback: "Nada está garantido se o clique nem vira página carregada."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 6",
      title: "Passo 5: a página está levando para checkout?",
      body: "Se a pessoa chegou na página, o próximo passo é PV–IC. Essa métrica mostra se a página/oferta convence o suficiente para iniciar checkout. PV–IC baixo com Visualização boa aponta para problema de promessa, oferta, prova social, CTA, preço, confiança ou clareza.",
      cards: [
        {
          label: "PV–IC saudável",
          status: "good",
          text: "A página está gerando intenção."
        },
        {
          label: "PV–IC baixo",
          status: "bad",
          text: "A página/oferta não está empurrando para checkout."
        },
        {
          label: "Ações",
          text: "Melhorar oferta, prova, CTA, garantia, headline e clareza."
        }
      ]
    },
    {
      type: "quiz",
      title: "Página no checklist",
      question: "Taxa de Visualização boa e PV–IC baixo. Qual ação é mais lógica?",
      options: [
        {
          text: "Ajustar página/oferta, porque o tráfego chega mas não inicia checkout.",
          correct: true,
          feedback: "Perfeito. O gargalo está na passagem página → checkout."
        },
        {
          text: "Ajustar apenas o pixel de compra.",
          feedback: "Pode até verificar tracking, mas o sinal principal é página/oferta não gerando intenção."
        },
        {
          text: "Culpar somente o CPM.",
          feedback: "CPM é topo do funil. Aqui a pessoa já chegou na página."
        },
        {
          text: "Escalar imediatamente.",
          feedback: "Escalar página fraca aumenta desperdício."
        },
        {
          text: "Ignorar CTA e prova social.",
          feedback: "CTA e prova social podem afetar muito o PV–IC."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 7",
      title: "Passo 6: checkout está fechando?",
      body: "Se a página leva para checkout, olhe IC–Compras. Essa métrica mostra se quem iniciou checkout finalizou compra. IC–Compras baixo indica fricção, taxa surpresa, falta de método de pagamento, pouca confiança, checkout confuso ou medo no último passo.",
      cards: [
        {
          label: "IC–Compras saudável",
          status: "good",
          text: "Checkout transforma intenção em compra."
        },
        {
          label: "IC–Compras baixo",
          status: "bad",
          text: "Comprador quente está fugindo no final."
        },
        {
          label: "Ações",
          text: "Reduzir fricção, melhorar confiança, pagamento, garantia e transparência."
        }
      ]
    },
    {
      type: "quiz",
      title: "Checkout no checklist",
      question: "PV–IC bom e IC–Compras baixo. Qual diagnóstico encaixa melhor?",
      options: [
        {
          text: "A página gera intenção, mas o checkout está travando a compra.",
          correct: true,
          feedback: "Exato. A pessoa inicia checkout, mas não finaliza."
        },
        {
          text: "O criativo nunca gerou interesse.",
          feedback: "Se existe PV–IC bom, existe intenção depois da página."
        },
        {
          text: "A página não convence ninguém.",
          feedback: "PV–IC bom mostra que a página convence a iniciar checkout."
        },
        {
          text: "Escalar sem ajustar checkout.",
          feedback: "Checkout vazando comprador quente precisa de correção."
        },
        {
          text: "CPM é a única métrica relevante.",
          feedback: "Aqui o gargalo está no fundo do funil."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 8",
      title: "Passo 7: a conta financeira fecha?",
      body: "Depois de olhar o funil, olhe dinheiro. CPA cabe na margem? ROAS está acima do necessário? Lucro líquido por venda é positivo? Ticket/AOV ajuda ou aperta? Não adianta ter funil bonito se cada venda compra prejuízo. A decisão final precisa passar pelo bolso.",
      cards: [
        {
          label: "CPA cabe",
          status: "good",
          text: "Venda custa menos que o limite."
        },
        {
          label: "CPA não cabe",
          status: "bad",
          text: "Venda pode estar dando prejuízo."
        },
        {
          label: "ROAS confirma",
          status: "good",
          text: "Receita volta acima do mínimo necessário."
        },
        {
          label: "Lucro líquido",
          text: "Mostra se sobrou dinheiro depois da mídia."
        }
      ]
    },
    {
      type: "quiz",
      title: "Conta financeira",
      question: "Funil parece bom, mas CPA está acima do limite de margem. Qual leitura é mais madura?",
      options: [
        {
          text: "A campanha vende, mas a conta financeira não fecha; precisa ajustar CPA, margem, ticket ou oferta.",
          correct: true,
          feedback: "Boa. Venda sem lucro não sustenta escala."
        },
        {
          text: "Escalar porque toda venda é lucro.",
          feedback: "Venda não é lucro automático. CPA precisa caber na margem."
        },
        {
          text: "Ignorar margem.",
          feedback: "Margem define se o CPA cabe."
        },
        {
          text: "Culpar apenas o rastreamento.",
          feedback: "Pode verificar tracking, mas CPA acima do limite é problema financeiro real se os dados estiverem limpos."
        },
        {
          text: "Parar de olhar ROAS.",
          feedback: "ROAS continua ajudando a confirmar retorno."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 9",
      title: "Passo 8: decisão final",
      body: "Agora vem a decisão. Pouco dado sem bug? manter. Gargalo específico? ajustar. Tracking quebrado? corrigir rastreamento. Prejuízo claro com volume? pausar ou reduzir. Funil saudável, lucro positivo e consistência? escalar com controle. O checklist termina com uma ação, não com um monte de número solto.",
      cards: [
        {
          label: "Manter",
          status: "warn",
          text: "Pouco dado e sem quebra clara."
        },
        {
          label: "Ajustar",
          status: "warn",
          text: "Gargalo específico no funil."
        },
        {
          label: "Corrigir tracking",
          status: "bad",
          text: "Dados sujos ou eventos quebrados."
        },
        {
          label: "Pausar/reduzir",
          status: "bad",
          text: "Prejuízo claro com volume."
        },
        {
          label: "Escalar",
          status: "good",
          text: "Sistema saudável, lucro e consistência."
        }
      ]
    },
    {
      type: "quiz",
      title: "Decisão final",
      question: "Qual é a melhor decisão para: dados limpos, volume suficiente, funil saudável, CPA abaixo do limite e ROAS consistente?",
      options: [
        {
          text: "Escalar com controle, mantendo monitoramento de CPA, ROAS e gargalos.",
          correct: true,
          feedback: "Perfeito. Esse é o cenário que começa a merecer escala."
        },
        {
          text: "Pausar imediatamente.",
          feedback: "Não faz sentido pausar um sistema saudável."
        },
        {
          text: "Mudar tudo ao mesmo tempo.",
          feedback: "Se está saudável, mexer em tudo pode quebrar o que funciona."
        },
        {
          text: "Corrigir tracking mesmo sem sinal de erro.",
          feedback: "Pode monitorar, mas não é a ação principal se os dados estão limpos."
        },
        {
          text: "Ignorar os resultados.",
          feedback: "Resultado consistente é justamente o que orienta escala."
        }
      ]
    },
    {
      type: "lesson",
      eyebrow: "Parte 10",
      title: "Modelo de frase final",
      body: "A melhor forma de treinar é terminar toda análise com uma frase. Exemplo: 'Dados limpos, volume ainda baixo, ROAS bom com uma venda; decisão: manter e confirmar'. Ou: 'Visualização boa, PV–IC baixo; decisão: ajustar página/oferta'. Isso transforma o aluno em alguém que sabe ler e agir.",
      cards: [
        {
          label: "Formato",
          text: "Dados + volume + gargalo + ação."
        },
        {
          label: "Exemplo 1",
          text: "Pouco dado, sem bug, sinal positivo: manter e confirmar."
        },
        {
          label: "Exemplo 2",
          text: "PV–IC baixo com visitas suficientes: ajustar página."
        },
        {
          label: "Exemplo 3",
          text: "CPA acima do limite com volume: pausar/reduzir e corrigir."
        }
      ]
    },
    {
      type: "quiz",
      title: "Frase de análise",
      question: "Qual frase mostra uma análise completa?",
      options: [
        {
          text: "Dados limpos, volume suficiente, PV–IC baixo; ação: ajustar página/oferta e acompanhar início de checkout.",
          correct: true,
          feedback: "Boa. Tem dados, volume, gargalo e ação."
        },
        {
          text: "Tá ruim.",
          feedback: "Isso não explica nada. Falta métrica, causa e ação."
        },
        {
          text: "Vou mexer em tudo.",
          feedback: "Isso é bagunça. Falta diagnóstico específico."
        },
        {
          text: "ROAS caiu, logo checkout é culpado.",
          feedback: "ROAS é consequência. Precisa achar onde caiu no funil."
        },
        {
          text: "Teve uma venda, então nunca mais olho métrica.",
          feedback: "Uma venda pode ser sinal, mas campanha precisa de acompanhamento."
        }
      ]
    },
    {
      type: "complete",
      title: "Checklist Final amassado",
      body: "Agora você tem a ordem completa para analisar campanha: tracking, volume, topo, ponte, página, checkout, dinheiro e decisão final. Esse é o coração do Tabelingo: olhar métrica, entender o gargalo e saber a próxima ação.",
      xp: 180
    }
  ]
},
      {
        id: "treino-diagnostico",
        title: "Treino Diagnóstico: 150 cenários",
        metric: "Prática",
        description: "Modo treino com níveis Easy, Médio e Hard. Resolve cenários sem repetir até zerar cada nível.",
        xp: 300,
        difficulty: "Prática",
        estimatedMinutes: 45,
        requiresTicket: false,
        isPractice: true,
        screens: [
          {
            type: "practice",
            eyebrow: "Modo prática",
            title: "Escolha o nível do treino",
            body: "Aqui não tem aula longa. É uma sequência forte de cenários para treinar leitura de métrica. Cada nível tem 50 exercícios. O app guarda onde você parou e não repete exercício daquele nível até você completar os 50."
          }
        ]
      }
    ];



    const PROVA_UNIDADE_1 = {
  id: "prova-unidade-1",
  type: "unit_assessment",
  unitId: "unit-1",
  title: "Prova Unidade 1: mentalidade e anúncio sem chute",
  subtitle: "Mentalidade aplicada + CPC, CPM, CTR e Frequência na prática.",
  description: "Uma prova para confirmar se você entendeu a mentalidade de não escalar no impulso e sabe ler o topo do funil antes de avançar para página, checkout e compra.",
  estimatedMinutes: 10,
  xp: 220,
  unlocksUnitId: "unit-2",
  passingRule: {
    totalQuestions: 18,
    maxErrors: 3,
    minCorrect: 15,
    failMessage: "Você errou mais de 3. Ainda não passou. Revise os assuntos onde tropeçou e tente de novo.",
    passMessage: "Aprovado. Mentalidade e topo de funil amassados. Agora você pode seguir para a Unidade 2."
  },
  visualRules: {
    showMetricColorsBeforeAnswer: false,
    showMetricColorsAfterAnswer: true,
    reason: "A prova deve simular leitura real de painel. As cores só aparecem no feedback, não como pista."
  },
  reviewModules: {
    mentalidade: "mentalidade-escala",
    cpc: "cpc",
    cpm: "cpm",
    ctr: "ctr",
    frequencia: "frequencia"
  },
  questions: [
    {
      id: "u1-q01",
      topic: "cpc",
      difficulty: "easy",
      type: "concept",
      question: "O que o CPC mede?",
      options: [
        {
          text: "Quanto você paga, em média, por cada clique no anúncio.",
          correct: true,
          feedback: "Certo. CPC é custo por clique. Ele mostra quanto está custando levar uma pessoa do anúncio para o próximo passo."
        },
        {
          text: "Quanto você paga para aparecer mil vezes.",
          feedback: "Isso é CPM. CPM fala de custo por mil impressões, não de clique."
        },
        {
          text: "Quantas pessoas compraram depois de iniciar checkout.",
          feedback: "Isso tem relação com IC–Compras. CPC fica antes, no clique."
        },
        {
          text: "Quanto dinheiro voltou em receita para cada real investido.",
          feedback: "Isso é ROAS. CPC não mede receita; mede custo do clique."
        },
        {
          text: "Quantas vezes a mesma pessoa viu o anúncio.",
          feedback: "Isso é Frequência. CPC mede custo por clique."
        }
      ]
    },
    {
      id: "u1-q02",
      topic: "cpc",
      difficulty: "easy",
      type: "calculation",
      question: "Uma campanha gastou R$ 80 e gerou 40 cliques. Qual foi o CPC médio?",
      data: {
        gasto: "R$ 80",
        cliques: 40
      },
      options: [
        {
          text: "R$ 0,50",
          feedback: "Não. R$ 0,50 seria R$ 80 dividido por 160 cliques."
        },
        {
          text: "R$ 2,00",
          correct: true,
          feedback: "Boa. CPC = gasto ÷ cliques. R$ 80 ÷ 40 = R$ 2,00 por clique."
        },
        {
          text: "R$ 4,00",
          feedback: "R$ 4,00 seria R$ 80 dividido por 20 cliques."
        },
        {
          text: "R$ 40,00",
          feedback: "R$ 40,00 seria quase metade do gasto por clique. A conta correta divide 80 por 40."
        },
        {
          text: "R$ 80,00",
          feedback: "R$ 80 é o gasto total, não o custo por clique."
        }
      ]
    },
    {
      id: "u1-q03",
      topic: "cpc",
      difficulty: "medium",
      type: "interpretation",
      question: "CPC está alto. Antes de culpar o checkout, qual leitura faz mais sentido?",
      options: [
        {
          text: "O problema pode estar no topo do funil: criativo, promessa, público, CTR ou CPM.",
          correct: true,
          feedback: "Certo. CPC alto acontece antes do checkout. Primeiro olhe criativo, CTR, CPM e público."
        },
        {
          text: "O checkout é obrigatoriamente o único culpado.",
          feedback: "Não. CPC acontece antes da página e do checkout. Checkout não define custo do clique."
        },
        {
          text: "ROAS está automaticamente ótimo.",
          feedback: "CPC alto não garante ROAS bom. Pode até piorar o custo de aquisição."
        },
        {
          text: "A campanha deve ser escalada sem olhar mais nada.",
          feedback: "CPC alto pede diagnóstico, não escala emocional."
        },
        {
          text: "Frequência nunca pode influenciar CPC.",
          feedback: "Pode influenciar indiretamente. Frequência alta com CTR caindo pode deixar clique mais caro."
        }
      ]
    },
    {
      id: "u1-q04",
      topic: "cpm",
      difficulty: "easy",
      type: "concept",
      question: "O que o CPM mede?",
      options: [
        {
          text: "Quanto custa gerar uma compra.",
          feedback: "Isso é CPA. CPM fica antes, no custo de aparecer."
        },
        {
          text: "Quanto custa cada clique.",
          feedback: "Isso é CPC. CPM mede custo por mil impressões."
        },
        {
          text: "Quanto custa aparecer mil vezes para o público.",
          correct: true,
          feedback: "Exato. CPM é custo por mil impressões. Ele mostra se a atenção está cara ou barata."
        },
        {
          text: "Quanto a página converte para checkout.",
          feedback: "Isso é PV–IC. CPM é métrica de exposição do anúncio."
        },
        {
          text: "Quanto dinheiro sobrou depois do CPA.",
          feedback: "Isso é leitura de lucro/margem. CPM mede custo de exibição."
        }
      ]
    },
    {
      id: "u1-q05",
      topic: "cpm",
      difficulty: "medium",
      type: "calculation",
      question: "Uma campanha gastou R$ 60 e teve 3.000 impressões. Qual foi o CPM?",
      data: {
        gasto: "R$ 60",
        impressoes: 3000
      },
      options: [
        {
          text: "R$ 2,00",
          feedback: "R$ 2,00 seria se tivesse 30.000 impressões. Aqui são 3.000."
        },
        {
          text: "R$ 20,00",
          correct: true,
          feedback: "Certo. CPM = gasto ÷ impressões × 1000. R$ 60 ÷ 3000 × 1000 = R$ 20."
        },
        {
          text: "R$ 30,00",
          feedback: "Não. R$ 30 seria outra relação entre gasto e impressões."
        },
        {
          text: "R$ 60,00",
          feedback: "R$ 60 é o gasto total, não o custo por mil impressões."
        },
        {
          text: "R$ 3.000,00",
          feedback: "3.000 é o número de impressões, não o CPM."
        }
      ]
    },
    {
      id: "u1-q06",
      topic: "cpm",
      difficulty: "medium",
      type: "interpretation",
      question: "CPM alto, mas CTR também alto. Qual leitura é mais madura?",
      data: {
        cpm: "R$ 48",
        ctr: "2,8%"
      },
      options: [
        {
          text: "A atenção está cara, mas o anúncio está gerando interesse. Precisa ver se o CPC e o CPA cabem.",
          correct: true,
          feedback: "Perfeito. CPM alto não mata a campanha sozinho se o CTR compensa e a conta final fecha."
        },
        {
          text: "A campanha é obrigatoriamente ruim porque CPM alto sempre mata tudo.",
          feedback: "Não necessariamente. CPM alto com CTR forte pode ainda gerar CPC aceitável."
        },
        {
          text: "O checkout é o único problema possível.",
          feedback: "Esses dados são do topo do funil. Ainda não apontam diretamente para checkout."
        },
        {
          text: "CTR alto é ruim.",
          feedback: "CTR alto normalmente indica que o criativo está gerando interesse."
        },
        {
          text: "Não precisa olhar CPC nem CPA.",
          feedback: "Precisa sim. CPM e CTR juntos ajudam a explicar CPC, e CPA mostra se a venda cabe."
        }
      ]
    },
    {
      id: "u1-q07",
      topic: "ctr",
      difficulty: "easy",
      type: "concept",
      question: "O que o CTR mede?",
      options: [
        {
          text: "A porcentagem de pessoas que viram o anúncio e clicaram.",
          correct: true,
          feedback: "Isso. CTR mede a taxa de clique. Ele mostra se o anúncio gerou vontade de clicar."
        },
        {
          text: "O custo por mil impressões.",
          feedback: "Isso é CPM. CTR é clique dividido por impressão."
        },
        {
          text: "O custo por compra.",
          feedback: "Isso é CPA. CTR fica no topo do funil."
        },
        {
          text: "A porcentagem de checkouts que viraram compra.",
          feedback: "Isso é IC–Compras. CTR mede o clique no anúncio."
        },
        {
          text: "O valor médio do pedido.",
          feedback: "Isso é AOV/ticket médio. CTR mede interesse no anúncio."
        }
      ]
    },
    {
      id: "u1-q08",
      topic: "ctr",
      difficulty: "medium",
      type: "calculation",
      question: "Um anúncio teve 5.000 impressões e 75 cliques. Qual foi o CTR?",
      data: {
        impressoes: 5000,
        cliques: 75
      },
      options: [
        {
          text: "0,15%",
          feedback: "0,15% seria 7,5 cliques em 5.000 impressões. Aqui foram 75."
        },
        {
          text: "1,5%",
          correct: true,
          feedback: "Boa. CTR = cliques ÷ impressões × 100. 75 ÷ 5.000 × 100 = 1,5%."
        },
        {
          text: "5%",
          feedback: "5% seria 250 cliques em 5.000 impressões."
        },
        {
          text: "7,5%",
          feedback: "7,5% seria 375 cliques em 5.000 impressões."
        },
        {
          text: "75%",
          feedback: "75 é o número de cliques, não a porcentagem."
        }
      ]
    },
    {
      id: "u1-q09",
      topic: "ctr",
      difficulty: "medium",
      type: "action",
      question: "CTR baixo e CPM normal. Qual ação inicial faz mais sentido?",
      data: {
        cpm: "R$ 18",
        ctr: "0,45%"
      },
      options: [
        {
          text: "Testar novos criativos, hooks, promessa e ângulos de anúncio.",
          correct: true,
          feedback: "Exato. CPM normal com CTR baixo aponta mais para criativo/promessa do que para leilão caro."
        },
        {
          text: "Trocar apenas o checkout.",
          feedback: "Checkout fica depois. CTR baixo mostra problema antes do clique."
        },
        {
          text: "Aumentar orçamento sem mudar nada.",
          feedback: "Aumentar verba em criativo fraco só compra mais indiferença."
        },
        {
          text: "Concluir que a página está perfeita.",
          feedback: "CTR não prova página perfeita. Ele fala do anúncio."
        },
        {
          text: "Ignorar o CTR e olhar só o ROAS.",
          feedback: "ROAS é consequência. CTR baixo ajuda a achar a causa no topo do funil."
        }
      ]
    },
    {
      id: "u1-q10",
      topic: "frequencia",
      difficulty: "easy",
      type: "concept",
      question: "O que a Frequência mede?",
      options: [
        {
          text: "Quantas vezes, em média, a mesma pessoa viu o anúncio.",
          correct: true,
          feedback: "Certo. Frequência mostra repetição média do anúncio para o público."
        },
        {
          text: "Quanto custa cada clique.",
          feedback: "Isso é CPC."
        },
        {
          text: "Quanto custa aparecer mil vezes.",
          feedback: "Isso é CPM."
        },
        {
          text: "A porcentagem de pessoas que iniciaram checkout.",
          feedback: "Isso é PV–IC."
        },
        {
          text: "O valor médio de cada pedido.",
          feedback: "Isso é AOV/ticket médio."
        }
      ]
    },
    {
      id: "u1-q11",
      topic: "frequencia",
      difficulty: "medium",
      type: "interpretation",
      question: "Frequência está subindo e CTR está caindo. Qual suspeita faz sentido?",
      data: {
        frequencia: "6,2",
        ctr: "caiu de 1,8% para 0,7%"
      },
      options: [
        {
          text: "O público pode estar cansando do criativo, indicando fadiga ou saturação.",
          correct: true,
          feedback: "Boa. Frequência alta com CTR caindo é sinal clássico de desgaste do anúncio/público."
        },
        {
          text: "O checkout melhorou automaticamente.",
          feedback: "Esses dados falam do anúncio, não do checkout."
        },
        {
          text: "A campanha deve escalar sem trocar criativo.",
          feedback: "Se o público está cansando, escalar sem renovar criativo pode piorar."
        },
        {
          text: "CPC obrigatoriamente vai cair.",
          feedback: "Com CTR caindo, o CPC pode subir, não necessariamente cair."
        },
        {
          text: "Frequência alta nunca é problema.",
          feedback: "Pode não ser problema sozinha, mas com CTR caindo vira alerta forte."
        }
      ]
    },
    {
      id: "u1-q12",
      topic: "frequencia",
      difficulty: "medium",
      type: "action",
      question: "Frequência alta, CTR caindo e CPC subindo. Qual ação é mais lógica?",
      data: {
        frequencia: "7,4",
        ctr: "0,62%",
        cpc: "R$ 2,90"
      },
      options: [
        {
          text: "Renovar criativos, testar novos ângulos e/ou ampliar público.",
          correct: true,
          feedback: "Certo. O anúncio parece cansado. A ação é dar ar novo ao criativo ou público."
        },
        {
          text: "Mexer primeiro no checkout.",
          feedback: "O problema aparece antes do clique. Checkout não corrige fadiga de anúncio."
        },
        {
          text: "Ignorar tudo porque frequência alta sempre é ótima.",
          feedback: "Frequência alta com CTR caindo e CPC subindo é alerta."
        },
        {
          text: "Diminuir a qualidade do criativo.",
          feedback: "Isso provavelmente pioraria ainda mais o CTR."
        },
        {
          text: "Aumentar orçamento sem mudar criativo.",
          feedback: "Mais verba no criativo cansado pode acelerar a fadiga."
        }
      ]
    },
    {
      id: "u1-q13",
      topic: "cpc",
      difficulty: "hard",
      type: "scenario",
      question: "Analise o cenário sem usar cores: CPM normal, CTR baixo e CPC alto. Qual é a causa mais provável?",
      data: {
        cpm: "R$ 16",
        ctr: "0,38%",
        cpc: "R$ 4,21",
        frequencia: "1,7"
      },
      options: [
        {
          text: "O anúncio não está gerando vontade de clicar; criativo/hook/promessa provavelmente estão fracos.",
          correct: true,
          feedback: "Perfeito. CPM normal mostra que aparecer não está tão caro. O CTR baixo empurra o CPC para cima."
        },
        {
          text: "O CPM é o único culpado.",
          feedback: "O CPM está normal. O gargalo mais claro é CTR baixo."
        },
        {
          text: "A frequência está muito alta e saturou tudo.",
          feedback: "Frequência 1,7 não parece saturação. O problema principal é CTR baixo."
        },
        {
          text: "O checkout está travando a compra.",
          feedback: "Esse cenário não fala de checkout. O problema aparece antes do clique."
        },
        {
          text: "A página está comprovadamente ruim.",
          feedback: "Sem dados de página, não dá para afirmar isso. O topo já mostra problema no CTR."
        }
      ]
    },
    {
      id: "u1-q14",
      topic: "cpm",
      difficulty: "hard",
      type: "scenario",
      question: "Cenário: CPM alto, CTR alto e CPC aceitável. Qual interpretação é melhor?",
      data: {
        cpm: "R$ 52",
        ctr: "3,1%",
        cpc: "R$ 1,68",
        frequencia: "2,1"
      },
      options: [
        {
          text: "O público/leilão está caro, mas o criativo compensa com CTR forte e mantém CPC aceitável.",
          correct: true,
          feedback: "Boa. CPM alto não é sentença de morte quando o CTR é forte o suficiente para segurar CPC."
        },
        {
          text: "O anúncio está ruim porque CTR alto é problema.",
          feedback: "CTR alto geralmente é bom sinal de interesse."
        },
        {
          text: "A campanha deve ser pausada só por CPM alto.",
          feedback: "Não necessariamente. Se CPC cabe e depois CPA fecha, o CPM alto pode ser aceitável."
        },
        {
          text: "Frequência 2,1 prova saturação extrema.",
          feedback: "Frequência 2,1 não é saturação extrema por si só."
        },
        {
          text: "CPC aceitável não importa nunca.",
          feedback: "Importa sim. CPC é uma consequência importante de CPM e CTR."
        }
      ]
    },
    {
      id: "u1-q15",
      topic: "ctr",
      difficulty: "hard",
      type: "scenario",
      question: "Dois anúncios tiveram o mesmo CPM. O anúncio A tem CTR 0,5%. O anúncio B tem CTR 2%. Qual tende a ter CPC menor, se o resto for igual?",
      data: {
        cpm: "igual nos dois",
        ctrA: "0,5%",
        ctrB: "2%"
      },
      options: [
        {
          text: "Anúncio B, porque mais pessoas clicam com o mesmo custo de exposição.",
          correct: true,
          feedback: "Exato. Com CPM igual, CTR maior tende a diluir o custo e reduzir CPC."
        },
        {
          text: "Anúncio A, porque CTR menor sempre barateia o clique.",
          feedback: "Normalmente é o contrário. CTR menor tende a encarecer o CPC."
        },
        {
          text: "Os dois obrigatoriamente terão o mesmo CPC.",
          feedback: "Se o CPM é igual, mas o CTR muda, o CPC tende a mudar também."
        },
        {
          text: "Nenhum clique será gerado no anúncio B.",
          feedback: "CTR 2% indica que há cliques, e mais do que 0,5%."
        },
        {
          text: "Não existe relação nenhuma entre CTR e CPC.",
          feedback: "Existe sim. CTR influencia quanto o custo de exposição se transforma em custo por clique."
        }
      ]
    },
    {
      id: "u1-q16",
      topic: "frequencia",
      difficulty: "hard",
      type: "scenario",
      question: "Um anúncio começou com CTR 2,2% e CPC R$ 0,70. Depois de alguns dias: frequência 8, CTR 0,8% e CPC R$ 1,90. Qual hipótese é mais forte?",
      data: {
        antes: "CTR 2,2% | CPC R$ 0,70",
        depois: "Frequência 8 | CTR 0,8% | CPC R$ 1,90"
      },
      options: [
        {
          text: "Fadiga criativa ou saturação de público.",
          correct: true,
          feedback: "Certo. Frequência alta com CTR caindo e CPC subindo aponta para desgaste."
        },
        {
          text: "O criativo ficou melhor com o tempo.",
          feedback: "Se o CTR caiu e o CPC subiu, o criativo não parece ter melhorado."
        },
        {
          text: "A página começou a carregar mais rápido.",
          feedback: "Esses dados não medem carregamento de página."
        },
        {
          text: "O checkout está mais simples.",
          feedback: "Esses dados estão antes do checkout."
        },
        {
          text: "Não existe nenhuma mudança relevante.",
          feedback: "Existe: frequência subiu, CTR caiu e CPC subiu. Isso é sinal importante."
        }
      ]
    },
    {
      id: "u1-q17",
      topic: "mixed",
      difficulty: "hard",
      type: "diagnosis",
      question: "Qual diagnóstico está mais completo para este cenário?",
      data: {
        cpm: "R$ 21",
        ctr: "0,42%",
        cpc: "R$ 5,00",
        frequencia: "1,4"
      },
      options: [
        {
          text: "Topo do funil fraco por CTR baixo; testar criativo, hook, promessa e ângulo antes de mexer no checkout.",
          correct: true,
          feedback: "Perfeito. O diagnóstico aponta métrica, causa provável e ação correta."
        },
        {
          text: "Está ruim.",
          feedback: "Isso não é diagnóstico. Falta dizer onde está ruim e o que fazer."
        },
        {
          text: "Checkout está quebrado com certeza.",
          feedback: "Os dados são do topo. Não dá para culpar checkout ainda."
        },
        {
          text: "CPM está absurdo e é o único problema.",
          feedback: "CPM R$ 21 pode não ser absurdo dependendo do contexto. O CTR baixo é mais evidente."
        },
        {
          text: "Frequência saturou o público.",
          feedback: "Frequência 1,4 não indica saturação forte."
        }
      ]
    },
    {
      id: "u1-q18",
      topic: "mixed",
      difficulty: "hard",
      type: "action",
      question: "Você só pode escolher UMA próxima ação para este cenário. Qual é a melhor?",
      data: {
        impressoes: 12000,
        cpm: "R$ 19",
        ctr: "0,35%",
        cpc: "R$ 5,43",
        frequencia: "1,8",
        observacao: "Ainda não há dados suficientes de página e checkout."
      },
      options: [
        {
          text: "Criar novos anúncios com hooks e promessas diferentes para tentar subir CTR e reduzir CPC.",
          correct: true,
          feedback: "Certo. O problema aparece no anúncio: CTR baixo e CPC alto, com frequência ainda baixa."
        },
        {
          text: "Alterar checkout, porque o problema está claramente no pagamento.",
          feedback: "Ainda não há dados de checkout. O topo já mostra gargalo antes."
        },
        {
          text: "Aumentar orçamento para forçar o algoritmo.",
          feedback: "Mais verba no topo fraco pode só comprar clique caro."
        },
        {
          text: "Mudar o preço do produto sem olhar o anúncio.",
          feedback: "Preço pode importar depois, mas o gargalo visível agora é o anúncio."
        },
        {
          text: "Ignorar CTR e CPC porque só ROAS importa.",
          feedback: "ROAS é consequência. CTR e CPC ajudam a achar a causa antes de chegar na venda."
        }
      ]
    }
  ],
  scoringFeedback: {
    byTopic: {
      cpc: {
        failTitle: "Revisar CPC",
        failMessage: "Você está tropeçando em custo por clique. Revise o módulo de CPC antes de tentar a prova de novo."
      },
      cpm: {
        failTitle: "Revisar CPM",
        failMessage: "Você está confundindo custo de atenção com custo de clique. Revise CPM."
      },
      ctr: {
        failTitle: "Revisar CTR",
        failMessage: "Você precisa reforçar taxa de clique, criativo, hook e promessa."
      },
      frequencia: {
        failTitle: "Revisar Frequência",
        failMessage: "Você precisa reforçar fadiga, saturação e repetição de anúncio."
      },
      mixed: {
        failTitle: "Revisar diagnóstico do topo",
        failMessage: "Você precisa treinar cruzamento entre CPC, CPM, CTR e Frequência."
      }
    }
  }
};

    const PROVA_UNIDADE_2 = {
  id: "prova-unidade-2",
  type: "unit_assessment",
  unitId: "unit-2",
  title: "Prova Unidade 2: o clique prestou ou vazou?",
  subtitle: "Taxa de Visualização, PV–IC e IC–Compras na prática.",
  description: "Uma prova para confirmar se você sabe ler a passagem anúncio → página → checkout → compra sem culpar a etapa errada.",
  estimatedMinutes: 10,
  xp: 230,
  unlocksUnitId: "unit-3",
  passingRule: {
    totalQuestions: 18,
    maxErrors: 3,
    minCorrect: 15,
    failMessage: "Você errou mais de 3. Ainda não passou. Revise os pontos fracos e tente de novo.",
    passMessage: "Aprovado. Unidade 2 amassada. Agora você pode seguir para a Unidade 3."
  },
  visualRules: {
    showMetricColorsBeforeAnswer: false,
    showMetricColorsAfterAnswer: true,
    reason: "A prova deve treinar leitura real do funil. Os números aparecem crus; as cores só entram depois da resposta."
  },
  reviewModules: {
    taxaVisualizacao: "taxa-visualizacao",
    pvIc: "pv-ic",
    icCompras: "ic-compras"
  },
  questions: [
    {
      id: "u2-q01",
      topic: "taxaVisualizacao",
      difficulty: "easy",
      type: "concept",
      question: "O que a Taxa de Visualização mede no funil?",
      options: [
        {
          text: "A porcentagem de cliques que realmente viraram visualização/carregamento da página.",
          correct: true,
          feedback: "Certo. Ela mostra se o clique chegou na página ou se vazou no caminho."
        },
        {
          text: "Quanto custa cada clique.",
          feedback: "Isso é CPC. Taxa de Visualização vem depois do clique."
        },
        {
          text: "Quanto custa aparecer mil vezes.",
          feedback: "Isso é CPM. Taxa de Visualização mede clique virando página carregada."
        },
        {
          text: "A porcentagem de checkouts que viram compra.",
          feedback: "Isso é IC–Compras. Taxa de Visualização fica antes, na chegada à página."
        },
        {
          text: "O lucro líquido por venda.",
          feedback: "Lucro líquido é métrica financeira. Taxa de Visualização mede passagem clique → página."
        }
      ]
    },
    {
      id: "u2-q02",
      topic: "taxaVisualizacao",
      difficulty: "medium",
      type: "calculation",
      question: "Uma campanha teve 200 cliques e 150 visualizações de página. Qual foi a Taxa de Visualização?",
      data: {
        cliques: 200,
        visualizacoesPagina: 150
      },
      options: [
        {
          text: "25%",
          feedback: "25% seria 50 visualizações em 200 cliques. Aqui foram 150."
        },
        {
          text: "50%",
          feedback: "50% seria 100 visualizações em 200 cliques."
        },
        {
          text: "75%",
          correct: true,
          feedback: "Boa. 150 ÷ 200 × 100 = 75%."
        },
        {
          text: "100%",
          feedback: "100% seria se todos os 200 cliques virassem visualização."
        },
        {
          text: "150%",
          feedback: "150 é a quantidade de visualizações, não a taxa percentual."
        }
      ]
    },
    {
      id: "u2-q03",
      topic: "taxaVisualizacao",
      difficulty: "medium",
      type: "interpretation",
      question: "CPC está bom, mas Taxa de Visualização está baixa. Qual leitura faz mais sentido?",
      data: {
        cpc: "R$ 0,68",
        taxaVisualizacao: "42%"
      },
      options: [
        {
          text: "O clique está barato, mas muita gente não está chegando/carregando a página.",
          correct: true,
          feedback: "Exato. Clique barato não adianta se a ponte até a página está vazando."
        },
        {
          text: "O checkout é comprovadamente o único culpado.",
          feedback: "Ainda não chegamos no checkout. O problema aparece entre clique e página."
        },
        {
          text: "A página está validada com segurança.",
          feedback: "Se pouca gente carrega a página, ela ainda nem foi testada direito."
        },
        {
          text: "ROAS está garantido.",
          feedback: "Nada está garantido se o tráfego não chega direito na página."
        },
        {
          text: "Deve escalar sem olhar carregamento.",
          feedback: "Escalar com visualização baixa pode comprar mais vazamento."
        }
      ]
    },
    {
      id: "u2-q04",
      topic: "taxaVisualizacao",
      difficulty: "hard",
      type: "action",
      question: "Taxa de Visualização baixa com muitos cliques. Qual ação inicial é mais lógica?",
      data: {
        cliques: 850,
        visualizacoesPagina: 390,
        taxaVisualizacao: "45,8%"
      },
      options: [
        {
          text: "Verificar velocidade da página, carregamento mobile, link, promessa do anúncio e rastreamento.",
          correct: true,
          feedback: "Perfeito. Esse gargalo está na ponte clique → página."
        },
        {
          text: "Alterar apenas o método de pagamento.",
          feedback: "Método de pagamento fica no checkout. Aqui o problema é antes da página carregar."
        },
        {
          text: "Aumentar orçamento sem mexer em nada.",
          feedback: "Mais verba pode só aumentar o vazamento entre clique e página."
        },
        {
          text: "Trocar apenas o preço do produto.",
          feedback: "Preço pode afetar página/checkout, mas antes precisa resolver a chegada na página."
        },
        {
          text: "Ignorar porque clique barato sempre resolve tudo.",
          feedback: "Clique barato que não vira página carregada não resolve."
        }
      ]
    },
    {
      id: "u2-q05",
      topic: "taxaVisualizacao",
      difficulty: "hard",
      type: "scenario",
      question: "Qual cenário aponta mais claramente problema na ponte clique → página?",
      options: [
        {
          text: "CPC bom, muitos cliques e poucas visualizações de página.",
          correct: true,
          feedback: "Certo. Isso mostra vazamento depois do clique e antes da página ser realmente vista."
        },
        {
          text: "PV–IC baixo com visualizações boas.",
          feedback: "Isso aponta mais para página/oferta, não para a ponte clique → página."
        },
        {
          text: "IC–Compras baixo com muitos checkouts.",
          feedback: "Isso aponta mais para checkout."
        },
        {
          text: "CPA alto com IC–Compras ruim.",
          feedback: "Isso aponta para fundo do funil/checkout, não para carregamento da página."
        },
        {
          text: "Frequência alta com CTR caindo.",
          feedback: "Isso aponta para fadiga do anúncio, não para a ponte clique → página."
        }
      ]
    },
    {
      id: "u2-q06",
      topic: "taxaVisualizacao",
      difficulty: "hard",
      type: "diagnosis",
      question: "Cenário: 1.000 cliques, 970 visualizações de página, PV–IC baixo. Qual conclusão é mais correta?",
      data: {
        cliques: 1000,
        visualizacoesPagina: 970,
        pvIc: "2,4%"
      },
      options: [
        {
          text: "A ponte clique → página está boa; o problema parece estar na página/oferta.",
          correct: true,
          feedback: "Boa. A visualização está alta, então o tráfego chega. O gargalo aparece no PV–IC."
        },
        {
          text: "A página não está carregando.",
          feedback: "970 visualizações em 1.000 cliques indicam carregamento forte, não falha de chegada."
        },
        {
          text: "O anúncio não recebeu cliques.",
          feedback: "Recebeu 1.000 cliques. O problema não é ausência de clique."
        },
        {
          text: "O checkout é comprovadamente perfeito.",
          feedback: "Ainda não dá para afirmar checkout perfeito; o problema atual é antes de iniciar checkout."
        },
        {
          text: "A campanha deve escalar sem revisar a oferta.",
          feedback: "PV–IC baixo pede revisão de página/oferta antes de escala."
        }
      ]
    },
    {
      id: "u2-q07",
      topic: "pvIc",
      difficulty: "easy",
      type: "concept",
      question: "O que PV–IC mede?",
      options: [
        {
          text: "A porcentagem de visualizações de página que viraram início de checkout.",
          correct: true,
          feedback: "Isso. PV–IC mostra se a página/oferta convence a pessoa a começar o checkout."
        },
        {
          text: "A porcentagem de checkouts que viraram compra.",
          feedback: "Isso é IC–Compras. PV–IC vem antes: página → início de checkout."
        },
        {
          text: "Quanto custa cada clique.",
          feedback: "Isso é CPC. PV–IC é conversão da página para checkout."
        },
        {
          text: "Quanto custa aparecer mil vezes.",
          feedback: "Isso é CPM. PV–IC não mede exposição do anúncio."
        },
        {
          text: "Quantas vezes a mesma pessoa viu o anúncio.",
          feedback: "Isso é Frequência. PV–IC mede intenção criada pela página."
        }
      ]
    },
    {
      id: "u2-q08",
      topic: "pvIc",
      difficulty: "medium",
      type: "calculation",
      question: "Uma página teve 500 visualizações e 50 inícios de checkout. Qual foi o PV–IC?",
      data: {
        visualizacoesPagina: 500,
        iniciosCheckout: 50
      },
      options: [
        {
          text: "5%",
          feedback: "5% seria 25 inícios em 500 visualizações."
        },
        {
          text: "10%",
          correct: true,
          feedback: "Certo. 50 ÷ 500 × 100 = 10%."
        },
        {
          text: "20%",
          feedback: "20% seria 100 inícios de checkout."
        },
        {
          text: "50%",
          feedback: "50% seria 250 inícios de checkout."
        },
        {
          text: "500%",
          feedback: "500 é o número de visualizações, não a taxa."
        }
      ]
    },
    {
      id: "u2-q09",
      topic: "pvIc",
      difficulty: "medium",
      type: "interpretation",
      question: "Taxa de Visualização boa, mas PV–IC baixo. Qual leitura faz mais sentido?",
      data: {
        taxaVisualizacao: "91%",
        pvIc: "3,1%"
      },
      options: [
        {
          text: "As pessoas chegam na página, mas a página/oferta não convence a iniciar checkout.",
          correct: true,
          feedback: "Perfeito. A chegada está boa. O problema é converter visita em intenção."
        },
        {
          text: "O clique não está chegando na página.",
          feedback: "Taxa de Visualização de 91% indica que o clique está chegando bem."
        },
        {
          text: "O checkout está comprovadamente quebrado.",
          feedback: "Ainda tem pouca gente iniciando checkout. O gargalo aparece antes."
        },
        {
          text: "O CTR é obrigatoriamente alto.",
          feedback: "Não dá para afirmar CTR por esses dados."
        },
        {
          text: "O CPM é o único culpado.",
          feedback: "Esses dados apontam para página/oferta, não para CPM."
        }
      ]
    },
    {
      id: "u2-q10",
      topic: "pvIc",
      difficulty: "hard",
      type: "action",
      question: "PV–IC está baixo com volume suficiente. O que você ajustaria primeiro?",
      data: {
        visualizacoesPagina: 1200,
        pvIc: "2,8%"
      },
      options: [
        {
          text: "Oferta, headline, prova social, CTA, garantia, preço percebido e clareza da página.",
          correct: true,
          feedback: "Certo. PV–IC baixo pede mexer na capacidade da página de gerar intenção."
        },
        {
          text: "Apenas o botão de pagamento dentro do checkout.",
          feedback: "Checkout vem depois. O problema é pouca gente chegando até ele."
        },
        {
          text: "Somente o CPM.",
          feedback: "CPM é topo do funil. Aqui a pessoa já chegou na página."
        },
        {
          text: "Nada, porque PV–IC baixo é sempre bom.",
          feedback: "PV–IC baixo indica que a página não está levando para checkout."
        },
        {
          text: "Aumentar verba sem mudar página.",
          feedback: "Mais verba para página que não converte tende a aumentar desperdício."
        }
      ]
    },
    {
      id: "u2-q11",
      topic: "pvIc",
      difficulty: "hard",
      type: "scenario",
      question: "Cenário: CPC bom, Taxa de Visualização boa, PV–IC baixo. Qual etapa está mais suspeita?",
      data: {
        cpc: "R$ 0,72",
        taxaVisualizacao: "88%",
        pvIc: "2,2%"
      },
      options: [
        {
          text: "Página/oferta.",
          correct: true,
          feedback: "Boa. Clique chega, página carrega, mas não leva para checkout. Gargalo na página/oferta."
        },
        {
          text: "Anúncio apenas.",
          feedback: "O anúncio gera clique barato e a visualização está boa. A suspeita maior está na página/oferta."
        },
        {
          text: "Checkout apenas.",
          feedback: "Pouca gente inicia checkout, então ainda não dá para culpar só o checkout."
        },
        {
          text: "Tracking de compra apenas.",
          feedback: "A questão mostra gargalo antes da compra. Pode verificar tracking, mas a suspeita principal é página/oferta."
        },
        {
          text: "Frequência apenas.",
          feedback: "Não há dado de frequência aqui. O gargalo visível é PV–IC."
        }
      ]
    },
    {
      id: "u2-q12",
      topic: "pvIc",
      difficulty: "hard",
      type: "diagnosis",
      question: "Qual diagnóstico está mais completo para este cenário?",
      data: {
        taxaVisualizacao: "93%",
        pvIc: "1,9%",
        iniciosCheckout: 19,
        visualizacoesPagina: 1000
      },
      options: [
        {
          text: "A página está recebendo tráfego, mas não gera intenção; ajustar oferta, prova, CTA e clareza antes de escalar.",
          correct: true,
          feedback: "Perfeito. Tem métrica, causa provável e próxima ação."
        },
        {
          text: "Tá ruim.",
          feedback: "Isso não é diagnóstico. Falta indicar onde está ruim e o que fazer."
        },
        {
          text: "O clique não chega na página.",
          feedback: "Taxa de Visualização de 93% mostra que chega sim."
        },
        {
          text: "O checkout é o único gargalo.",
          feedback: "Ainda poucos iniciam checkout. O gargalo aparece na página."
        },
        {
          text: "Escalar porque visualização está boa.",
          feedback: "Visualização boa é só uma parte. PV–IC baixo segura a escala."
        }
      ]
    },
    {
      id: "u2-q13",
      topic: "icCompras",
      difficulty: "easy",
      type: "concept",
      question: "O que IC–Compras mede?",
      options: [
        {
          text: "A porcentagem de inícios de checkout que viraram compras.",
          correct: true,
          feedback: "Isso. IC–Compras mostra se o checkout está fechando ou espantando comprador quente."
        },
        {
          text: "A porcentagem de cliques que viraram visualizações de página.",
          feedback: "Isso é Taxa de Visualização."
        },
        {
          text: "A porcentagem de visualizações que viraram checkout.",
          feedback: "Isso é PV–IC."
        },
        {
          text: "O custo por clique.",
          feedback: "Isso é CPC."
        },
        {
          text: "O custo por mil impressões.",
          feedback: "Isso é CPM."
        }
      ]
    },
    {
      id: "u2-q14",
      topic: "icCompras",
      difficulty: "medium",
      type: "calculation",
      question: "Uma campanha teve 80 inícios de checkout e 20 compras. Qual foi o IC–Compras?",
      data: {
        iniciosCheckout: 80,
        compras: 20
      },
      options: [
        {
          text: "10%",
          feedback: "10% seria 8 compras em 80 checkouts."
        },
        {
          text: "20%",
          feedback: "20% seria 16 compras em 80 checkouts."
        },
        {
          text: "25%",
          correct: true,
          feedback: "Boa. 20 ÷ 80 × 100 = 25%."
        },
        {
          text: "80%",
          feedback: "80 é o número de inícios de checkout, não a taxa."
        },
        {
          text: "400%",
          feedback: "Não faz sentido nesse cenário. A taxa é compras divididas por inícios de checkout."
        }
      ]
    },
    {
      id: "u2-q15",
      topic: "icCompras",
      difficulty: "medium",
      type: "interpretation",
      question: "PV–IC está bom, mas IC–Compras está baixo. Qual leitura faz mais sentido?",
      data: {
        pvIc: "14%",
        icCompras: "8%"
      },
      options: [
        {
          text: "A página gera intenção, mas o checkout está perdendo pessoas no final.",
          correct: true,
          feedback: "Exato. Se muita gente inicia checkout e pouca compra, o gargalo está no checkout."
        },
        {
          text: "A página não gera nenhuma intenção.",
          feedback: "PV–IC bom mostra que a página gera intenção."
        },
        {
          text: "O anúncio não recebeu cliques.",
          feedback: "Essas métricas indicam que pessoas chegaram à página e ao checkout."
        },
        {
          text: "O CPM é automaticamente o único culpado.",
          feedback: "CPM é topo do funil. Aqui o gargalo aparece no fundo."
        },
        {
          text: "A campanha deve escalar sem olhar checkout.",
          feedback: "Checkout vazando comprador quente precisa ser investigado antes de escala."
        }
      ]
    },
    {
      id: "u2-q16",
      topic: "icCompras",
      difficulty: "hard",
      type: "action",
      question: "IC–Compras baixo com volume suficiente. O que ajustar primeiro?",
      data: {
        iniciosCheckout: 160,
        compras: 12,
        icCompras: "7,5%"
      },
      options: [
        {
          text: "Fricção do checkout, formas de pagamento, frete/taxa surpresa, confiança e transparência.",
          correct: true,
          feedback: "Certo. IC–Compras baixo indica perda no último passo."
        },
        {
          text: "Apenas trocar o hook do anúncio.",
          feedback: "Hook pode afetar clique, mas aqui já tem gente iniciando checkout."
        },
        {
          text: "Apenas mudar o CPM.",
          feedback: "CPM não corrige abandono no checkout."
        },
        {
          text: "Ignorar checkout porque início de checkout já é compra.",
          feedback: "Início de checkout não é compra. A métrica mostra abandono."
        },
        {
          text: "Aumentar verba sem revisar nada.",
          feedback: "Mais verba pode mandar mais gente para um checkout que está vazando."
        }
      ]
    },
    {
      id: "u2-q17",
      topic: "icCompras",
      difficulty: "hard",
      type: "scenario",
      question: "Qual cenário aponta mais fortemente problema no checkout?",
      options: [
        {
          text: "Taxa de Visualização boa, PV–IC bom e IC–Compras baixo.",
          correct: true,
          feedback: "Perfeito. As pessoas chegam e iniciam checkout, mas não finalizam."
        },
        {
          text: "CTR baixo e CPC alto.",
          feedback: "Isso aponta para topo do funil, não checkout."
        },
        {
          text: "CPC bom e Taxa de Visualização baixa.",
          feedback: "Isso aponta para ponte clique → página."
        },
        {
          text: "Taxa de Visualização boa e PV–IC baixo.",
          feedback: "Isso aponta para página/oferta."
        },
        {
          text: "Frequência alta e CTR caindo.",
          feedback: "Isso aponta para fadiga de anúncio."
        }
      ]
    },
    {
      id: "u2-q18",
      topic: "mixed",
      difficulty: "hard",
      type: "fullDiagnosis",
      question: "Faça o diagnóstico mais correto do funil abaixo.",
      data: {
        cliques: 900,
        visualizacoesPagina: 855,
        taxaVisualizacao: "95%",
        iniciosCheckout: 120,
        pvIc: "14%",
        compras: 9,
        icCompras: "7,5%"
      },
      options: [
        {
          text: "A chegada e a página estão razoáveis; o maior gargalo está no checkout, que não está convertendo início em compra.",
          correct: true,
          feedback: "Boa. Taxa de Visualização e PV–IC estão funcionando melhor. IC–Compras está baixo e aponta para checkout."
        },
        {
          text: "O clique não está chegando na página.",
          feedback: "Taxa de Visualização de 95% mostra que a chegada está forte."
        },
        {
          text: "A página não gera intenção nenhuma.",
          feedback: "PV–IC de 14% mostra que a página gera inícios de checkout."
        },
        {
          text: "O problema principal está obrigatoriamente no CPM.",
          feedback: "O cenário nem mostra CPM. O gargalo visível está no checkout."
        },
        {
          text: "Tudo está perfeito e pode escalar sem revisar nada.",
          feedback: "IC–Compras de 7,5% indica perda forte no checkout. Precisa revisar antes de escala."
        }
      ]
    }
  ],
  scoringFeedback: {
    byTopic: {
      taxaVisualizacao: {
        failTitle: "Revisar Taxa de Visualização",
        failMessage: "Você está tropeçando na ponte clique → página. Revise carregamento, link, promessa e rastreamento."
      },
      pvIc: {
        failTitle: "Revisar PV–IC",
        failMessage: "Você precisa reforçar página/oferta, prova, CTA e intenção de checkout."
      },
      icCompras: {
        failTitle: "Revisar IC–Compras",
        failMessage: "Você precisa reforçar checkout, fricção, pagamento, confiança e abandono final."
      },
      mixed: {
        failTitle: "Revisar diagnóstico do meio/fundo",
        failMessage: "Você precisa treinar a ordem do funil: clique → página → checkout → compra."
      }
    }
  }
};

    const PROVA_UNIDADE_3 = {
  id: "prova-unidade-3",
  type: "unit_assessment",
  unitId: "unit-3",
  title: "Prova Unidade 3: dinheiro sem autoengano",
  subtitle: "Ticket, CPA, margem, break-even, ROAS, lucro e AOV.",
  description: "Uma prova para confirmar se você sabe dizer se a campanha está vendendo com lucro ou só fazendo barulho bonito no painel.",
  estimatedMinutes: 12,
  xp: 260,
  unlocksUnitId: "unit-4",
  passingRule: {
    totalQuestions: 21,
    maxErrors: 3,
    minCorrect: 18,
    failMessage: "Você errou mais de 3. Ainda não passou. Revise os pontos fracos antes de seguir para dados, orçamento e rastreamento.",
    passMessage: "Aprovado. Unidade 3 amassada. Agora você pode seguir para a Unidade 4."
  },
  visualRules: {
    showMetricColorsBeforeAnswer: false,
    showMetricColorsAfterAnswer: true,
    reason: "A prova deve treinar leitura financeira real. Os números aparecem crus; as cores só entram no feedback."
  },
  reviewModules: {
    ticketMedio: "ticket-medio",
    cpa: "cpa",
    margemLucro: "margem-lucro",
    pontoEquilibrio: "ponto-equilibrio",
    roasRoi: "roas-roi",
    lucroLiquido: "lucro-liquido-venda",
    aov: "aov"
  },
  questions: [
    {
      id: "u3-q01",
      topic: "ticketMedio",
      difficulty: "easy",
      type: "concept",
      question: "O que o Ticket Médio mostra?",
      options: [
        {
          text: "Quanto entra, em média, por venda ou pedido.",
          correct: true,
          feedback: "Certo. Ticket Médio mostra o valor médio de cada venda/pedido."
        },
        {
          text: "Quanto custa cada clique no anúncio.",
          feedback: "Isso é CPC. Ticket Médio fala de valor de venda."
        },
        {
          text: "Quanto custa cada compra.",
          feedback: "Isso é CPA. Ticket Médio é receita média por pedido."
        },
        {
          text: "A porcentagem de checkout que virou compra.",
          feedback: "Isso é IC–Compras. Ticket Médio mede valor médio do pedido."
        },
        {
          text: "Quantas vezes a pessoa viu o anúncio.",
          feedback: "Isso é Frequência. Ticket Médio é financeiro."
        }
      ]
    },
    {
      id: "u3-q02",
      topic: "ticketMedio",
      difficulty: "medium",
      type: "calculation",
      question: "A loja faturou R$ 4.800 com 60 pedidos. Qual foi o Ticket Médio?",
      data: {
        faturamento: "R$ 4.800",
        pedidos: 60
      },
      options: [
        {
          text: "R$ 60",
          feedback: "R$ 60 daria R$ 3.600 em 60 pedidos. O faturamento foi R$ 4.800."
        },
        {
          text: "R$ 80",
          correct: true,
          feedback: "Boa. R$ 4.800 ÷ 60 pedidos = R$ 80 de Ticket Médio."
        },
        {
          text: "R$ 120",
          feedback: "R$ 120 daria R$ 7.200 em 60 pedidos."
        },
        {
          text: "R$ 4.800",
          feedback: "Esse é o faturamento total, não o valor médio por pedido."
        },
        {
          text: "R$ 60.000",
          feedback: "Esse valor não vem da divisão entre faturamento e pedidos."
        }
      ]
    },
    {
      id: "u3-q03",
      topic: "ticketMedio",
      difficulty: "hard",
      type: "interpretation",
      question: "CPA está perto do limite, mas o funil está saudável. Qual ajuste pode ajudar sem mexer primeiro no anúncio?",
      data: {
        ticketMedio: "R$ 59,90",
        cpa: "R$ 31",
        observacao: "PV–IC e IC–Compras estão aceitáveis"
      },
      options: [
        {
          text: "Aumentar Ticket Médio/AOV com kit, combo ou oferta complementar para dar mais folga ao CPA.",
          correct: true,
          feedback: "Exato. Se o funil funciona mas a conta está apertada, aumentar o valor do pedido pode abrir mais margem."
        },
        {
          text: "Ignorar o ticket porque ele não muda a conta.",
          feedback: "Ticket muda completamente a capacidade de pagar CPA e buscar ROAS."
        },
        {
          text: "Piorar o checkout para reduzir compras.",
          feedback: "Isso destruiria resultado. O objetivo é melhorar a conta, não travar compra."
        },
        {
          text: "Aumentar o CPA sem melhorar margem.",
          feedback: "CPA maior com mesma margem aperta ainda mais a conta."
        },
        {
          text: "Pausar sem analisar nada.",
          feedback: "Se o funil está saudável, pode haver ajustes financeiros antes de pausar."
        }
      ]
    },
    {
      id: "u3-q04",
      topic: "cpa",
      difficulty: "easy",
      type: "concept",
      question: "O que o CPA mede em uma campanha de vendas?",
      options: [
        {
          text: "Quanto custa, em média, gerar uma compra/venda.",
          correct: true,
          feedback: "Certo. CPA mostra o custo por aquisição/conversão, normalmente uma compra no ecommerce."
        },
        {
          text: "Quanto custa cada clique.",
          feedback: "Isso é CPC. CPA é custo por compra/conversão."
        },
        {
          text: "Quanto custa aparecer mil vezes.",
          feedback: "Isso é CPM. CPA fica no resultado de conversão."
        },
        {
          text: "Quanto entra por pedido.",
          feedback: "Isso é Ticket Médio/AOV."
        },
        {
          text: "Quantas pessoas viram o anúncio.",
          feedback: "Isso é impressão/alcance, não CPA."
        }
      ]
    },
    {
      id: "u3-q05",
      topic: "cpa",
      difficulty: "medium",
      type: "calculation",
      question: "Uma campanha gastou R$ 360 e fez 12 compras. Qual foi o CPA?",
      data: {
        gasto: "R$ 360",
        compras: 12
      },
      options: [
        {
          text: "R$ 12",
          feedback: "R$ 12 seria se o gasto fosse R$ 144 para 12 compras."
        },
        {
          text: "R$ 30",
          correct: true,
          feedback: "Boa. CPA = gasto ÷ compras. R$ 360 ÷ 12 = R$ 30."
        },
        {
          text: "R$ 60",
          feedback: "R$ 60 seria R$ 720 de gasto para 12 compras."
        },
        {
          text: "R$ 360",
          feedback: "R$ 360 é o gasto total, não o custo por compra."
        },
        {
          text: "R$ 4.320",
          feedback: "Essa conta multiplicou, mas CPA divide gasto por compras."
        }
      ]
    },
    {
      id: "u3-q06",
      topic: "cpa",
      difficulty: "hard",
      type: "interpretation",
      question: "CPA de R$ 42 é bom ou ruim?",
      data: {
        cpa: "R$ 42",
        margemAntesDoTrafego: "R$ 55",
        lucroDesejadoPorVenda: "R$ 10"
      },
      options: [
        {
          text: "Está no limite aceitável: sobra R$ 13 antes dos fixos, mas só R$ 3 acima do lucro desejado.",
          correct: true,
          feedback: "Certo. R$ 55 - R$ 42 = R$ 13. Se queria R$ 10 de lucro, tem só R$ 3 de folga."
        },
        {
          text: "É automaticamente ótimo porque está abaixo de R$ 100.",
          feedback: "Não existe CPA bom universal. Depende de margem, ticket e lucro desejado."
        },
        {
          text: "É automaticamente ruim porque passa de R$ 40.",
          feedback: "Também não. Precisa comparar com a margem antes do tráfego."
        },
        {
          text: "Não importa, porque CPA nunca afeta lucro.",
          feedback: "CPA afeta diretamente o lucro por venda."
        },
        {
          text: "É impossível analisar usando margem.",
          feedback: "Margem é justamente a referência para saber se CPA cabe."
        }
      ]
    },
    {
      id: "u3-q07",
      topic: "margemLucro",
      difficulty: "easy",
      type: "concept",
      question: "Por que margem é essencial para analisar campanha?",
      options: [
        {
          text: "Porque ela mostra quanto sobra para pagar tráfego e ainda tentar lucrar.",
          correct: true,
          feedback: "Isso. Sem margem, você não sabe se o CPA cabe."
        },
        {
          text: "Porque ela substitui CTR.",
          feedback: "Não substitui. CTR mede interesse no anúncio; margem mede sobra financeira."
        },
        {
          text: "Porque margem sempre é igual ao faturamento.",
          feedback: "Não. Faturamento é entrada total; margem é o que sobra depois dos custos."
        },
        {
          text: "Porque margem elimina necessidade de ROAS.",
          feedback: "Não elimina. Margem ajuda a interpretar ROAS e CPA."
        },
        {
          text: "Porque margem é a quantidade de cliques.",
          feedback: "Cliques são tráfego. Margem é dinheiro que sobra."
        }
      ]
    },
    {
      id: "u3-q08",
      topic: "margemLucro",
      difficulty: "medium",
      type: "calculation",
      question: "Produto vendido por R$ 100 tem R$ 62 de custos antes do tráfego. Qual sobra antes da mídia?",
      data: {
        preco: "R$ 100",
        custosAntesTrafego: "R$ 62"
      },
      options: [
        {
          text: "R$ 28",
          feedback: "R$ 28 seria se os custos fossem R$ 72."
        },
        {
          text: "R$ 38",
          correct: true,
          feedback: "Certo. R$ 100 - R$ 62 = R$ 38 de sobra antes do tráfego."
        },
        {
          text: "R$ 62",
          feedback: "R$ 62 são os custos, não a sobra."
        },
        {
          text: "R$ 100",
          feedback: "R$ 100 é o preço de venda, não a sobra."
        },
        {
          text: "R$ 162",
          feedback: "Essa conta somou preço e custo. Margem desconta custos."
        }
      ]
    },
    {
      id: "u3-q09",
      topic: "margemLucro",
      difficulty: "hard",
      type: "scenario",
      question: "Duas campanhas têm CPA R$ 30. Produto A sobra R$ 45 antes do tráfego. Produto B sobra R$ 25. Qual leitura é correta?",
      data: {
        cpa: "R$ 30",
        produtoA: "sobra antes do tráfego R$ 45",
        produtoB: "sobra antes do tráfego R$ 25"
      },
      options: [
        {
          text: "O mesmo CPA pode ser bom para A e ruim para B, porque as margens são diferentes.",
          correct: true,
          feedback: "Perfeito. CPA não se analisa sozinho. Para A sobra R$ 15; para B falta R$ 5."
        },
        {
          text: "Os dois produtos têm exatamente o mesmo lucro.",
          feedback: "Não. Produto A sobra R$ 15 após CPA; Produto B fica negativo em R$ 5."
        },
        {
          text: "Produto B é melhor só porque tem margem menor.",
          feedback: "Margem menor dá menos espaço para CPA."
        },
        {
          text: "CPA não precisa caber na margem.",
          feedback: "Precisa sim. Se não cabe, a venda tende a dar prejuízo."
        },
        {
          text: "Margem não altera decisão de campanha.",
          feedback: "Margem altera totalmente a régua de CPA e ROAS."
        }
      ]
    },
    {
      id: "u3-q10",
      topic: "pontoEquilibrio",
      difficulty: "easy",
      type: "concept",
      question: "O que é ponto de equilíbrio em campanha?",
      options: [
        {
          text: "O ponto em que a campanha não dá lucro nem prejuízo.",
          correct: true,
          feedback: "Certo. Break-even é empate: a campanha se paga, mas ainda não sobra lucro."
        },
        {
          text: "O ponto em que todo clique vira compra.",
          feedback: "Isso seria uma conversão impossível/irreal. Ponto de equilíbrio é financeiro."
        },
        {
          text: "O custo por mil impressões.",
          feedback: "Isso é CPM."
        },
        {
          text: "A quantidade de comentários no anúncio.",
          feedback: "Comentários não definem break-even."
        },
        {
          text: "A frequência média do anúncio.",
          feedback: "Isso é Frequência."
        }
      ]
    },
    {
      id: "u3-q11",
      topic: "pontoEquilibrio",
      difficulty: "medium",
      type: "calculation",
      question: "Sua sobra antes do tráfego é R$ 48. Qual é o CPA de equilíbrio aproximado?",
      data: {
        sobraAntesTrafego: "R$ 48"
      },
      options: [
        {
          text: "R$ 24",
          feedback: "R$ 24 seria um CPA com folga, mas o ponto de equilíbrio é a sobra total antes do tráfego."
        },
        {
          text: "R$ 48",
          correct: true,
          feedback: "Boa. Se sobra R$ 48 antes do tráfego, CPA de equilíbrio aproximado é R$ 48."
        },
        {
          text: "R$ 96",
          feedback: "R$ 96 passaria da sobra e geraria prejuízo."
        },
        {
          text: "R$ 4,80",
          feedback: "Esse valor não representa a sobra total."
        },
        {
          text: "Não dá para saber com a sobra antes do tráfego.",
          feedback: "Dá para estimar sim: CPA de equilíbrio ≈ sobra antes do tráfego."
        }
      ]
    },
    {
      id: "u3-q12",
      topic: "pontoEquilibrio",
      difficulty: "hard",
      type: "calculation",
      question: "Ticket R$ 120 e CPA de equilíbrio R$ 40. Qual é o ROAS de equilíbrio?",
      data: {
        ticket: "R$ 120",
        cpaEquilibrio: "R$ 40"
      },
      options: [
        {
          text: "ROAS 2",
          feedback: "ROAS 2 seria se CPA de equilíbrio fosse R$ 60."
        },
        {
          text: "ROAS 3",
          correct: true,
          feedback: "Certo. ROAS de equilíbrio = ticket ÷ CPA de equilíbrio. R$ 120 ÷ R$ 40 = 3."
        },
        {
          text: "ROAS 4",
          feedback: "ROAS 4 seria R$ 120 ÷ R$ 30."
        },
        {
          text: "ROAS 40",
          feedback: "40 é valor em reais do CPA, não ROAS."
        },
        {
          text: "ROAS 120",
          feedback: "120 é o ticket, não a razão de retorno."
        }
      ]
    },
    {
      id: "u3-q13",
      topic: "roasRoi",
      difficulty: "easy",
      type: "concept",
      question: "O que ROAS mede?",
      options: [
        {
          text: "Quanto voltou em receita para cada real investido em anúncio.",
          correct: true,
          feedback: "Isso. ROAS mostra retorno de receita sobre gasto em mídia."
        },
        {
          text: "Quanto custa cada clique.",
          feedback: "Isso é CPC."
        },
        {
          text: "Quanto custa aparecer mil vezes.",
          feedback: "Isso é CPM."
        },
        {
          text: "Quanto sobra depois de todos os custos.",
          feedback: "Isso é lucro. ROAS mede receita sobre mídia, não lucro líquido."
        },
        {
          text: "Quantas pessoas iniciaram checkout.",
          feedback: "Isso é evento de funil, não ROAS."
        }
      ]
    },
    {
      id: "u3-q14",
      topic: "roasRoi",
      difficulty: "medium",
      type: "calculation",
      question: "Campanha gastou R$ 250 e faturou R$ 1.000. Qual foi o ROAS?",
      data: {
        gasto: "R$ 250",
        faturamento: "R$ 1.000"
      },
      options: [
        {
          text: "ROAS 2",
          feedback: "ROAS 2 seria R$ 500 de faturamento para R$ 250 de gasto."
        },
        {
          text: "ROAS 4",
          correct: true,
          feedback: "Boa. ROAS = faturamento ÷ gasto. R$ 1.000 ÷ R$ 250 = 4."
        },
        {
          text: "ROAS 10",
          feedback: "ROAS 10 seria R$ 2.500 de faturamento para R$ 250 de gasto."
        },
        {
          text: "ROAS 250",
          feedback: "250 é o gasto em reais, não a razão de retorno."
        },
        {
          text: "ROAS 1.000",
          feedback: "1.000 é o faturamento em reais, não o ROAS."
        }
      ]
    },
    {
      id: "u3-q15",
      topic: "roasRoi",
      difficulty: "hard",
      type: "interpretation",
      question: "Por que ROAS alto não garante lucro?",
      data: {
        roas: "3,2",
        observacao: "produto com margem apertada e frete subsidiado"
      },
      options: [
        {
          text: "Porque ROAS mede receita sobre mídia, mas não desconta todos os custos do produto e operação.",
          correct: true,
          feedback: "Perfeito. ROAS bonito pode esconder margem ruim, frete, taxa, reembolso e custos."
        },
        {
          text: "Porque ROAS alto sempre significa prejuízo.",
          feedback: "Não. ROAS alto pode ser ótimo, mas precisa ser comparado com margem."
        },
        {
          text: "Porque ROAS é igual a CPC.",
          feedback: "Não. CPC mede clique; ROAS mede receita sobre gasto."
        },
        {
          text: "Porque ROAS substitui margem.",
          feedback: "Não substitui. ROAS precisa ser interpretado junto com margem."
        },
        {
          text: "Porque faturamento nunca importa.",
          feedback: "Faturamento importa, mas não é lucro sozinho."
        }
      ]
    },
    {
      id: "u3-q16",
      topic: "lucroLiquido",
      difficulty: "easy",
      type: "concept",
      question: "Qual é a fórmula prática do lucro líquido por venda no tráfego?",
      options: [
        {
          text: "Lucro líquido por venda = sobra antes do tráfego - CPA real.",
          correct: true,
          feedback: "Certo. Essa é a conta prática para saber quanto sobra depois da mídia."
        },
        {
          text: "Lucro líquido por venda = CPC + CPM.",
          feedback: "Não. CPC e CPM ajudam no topo, mas lucro por venda depende de margem e CPA."
        },
        {
          text: "Lucro líquido por venda = impressões ÷ cliques.",
          feedback: "Isso não calcula lucro. Lucro depende de dinheiro que sobra."
        },
        {
          text: "Lucro líquido por venda = frequência × CTR.",
          feedback: "Isso mistura métricas de anúncio, não calcula dinheiro."
        },
        {
          text: "Lucro líquido por venda = faturamento total sem desconto.",
          feedback: "Faturamento não é lucro. Precisa descontar custos e CPA."
        }
      ]
    },
    {
      id: "u3-q17",
      topic: "lucroLiquido",
      difficulty: "medium",
      type: "calculation",
      question: "Sobra R$ 65 antes do tráfego e o CPA real é R$ 44. Qual é o lucro líquido estimado por venda?",
      data: {
        sobraAntesTrafego: "R$ 65",
        cpaReal: "R$ 44"
      },
      options: [
        {
          text: "R$ 11",
          feedback: "R$ 11 seria se o CPA fosse R$ 54."
        },
        {
          text: "R$ 21",
          correct: true,
          feedback: "Boa. R$ 65 - R$ 44 = R$ 21 de lucro líquido estimado por venda."
        },
        {
          text: "R$ 44",
          feedback: "R$ 44 é o CPA, não o lucro."
        },
        {
          text: "R$ 65",
          feedback: "R$ 65 é a sobra antes do tráfego. Ainda precisa descontar o CPA."
        },
        {
          text: "R$ 109",
          feedback: "Essa conta somou. Lucro desconta CPA."
        }
      ]
    },
    {
      id: "u3-q18",
      topic: "lucroLiquido",
      difficulty: "hard",
      type: "scenario",
      question: "Campanha tem lucro líquido estimado de -R$ 6 por venda, mas está gerando muitas compras. Qual leitura é correta?",
      data: {
        lucroLiquidoPorVenda: "-R$ 6",
        volumeCompras: "alto"
      },
      options: [
        {
          text: "Cada venda está aumentando o prejuízo; escalar pode multiplicar o rombo.",
          correct: true,
          feedback: "Exato. Volume alto com lucro negativo é prejuízo em escala."
        },
        {
          text: "Está perfeito porque muitas compras sempre significam lucro.",
          feedback: "Compra não é lucro. Se o lucro por venda é negativo, volume aumenta o buraco."
        },
        {
          text: "Lucro negativo é melhor que lucro positivo.",
          feedback: "Não. Lucro negativo significa prejuízo."
        },
        {
          text: "CPA não importa nesse caso.",
          feedback: "CPA é justamente uma das causas possíveis do lucro negativo."
        },
        {
          text: "Deve aumentar orçamento imediatamente sem mudar nada.",
          feedback: "Aumentar orçamento em prejuízo tende a multiplicar prejuízo."
        }
      ]
    },
    {
      id: "u3-q19",
      topic: "aov",
      difficulty: "easy",
      type: "concept",
      question: "O que AOV significa na prática?",
      options: [
        {
          text: "Valor médio do pedido, muito usado para pensar em carrinho, kits e upsells.",
          correct: true,
          feedback: "Isso. AOV é Average Order Value, ou valor médio do pedido."
        },
        {
          text: "Custo por clique.",
          feedback: "Isso é CPC."
        },
        {
          text: "Custo por mil impressões.",
          feedback: "Isso é CPM."
        },
        {
          text: "Taxa de clique no anúncio.",
          feedback: "Isso é CTR."
        },
        {
          text: "Tempo até recuperar CAC.",
          feedback: "Isso é payback, que saiu da trilha principal."
        }
      ]
    },
    {
      id: "u3-q20",
      topic: "aov",
      difficulty: "medium",
      type: "action",
      question: "Qual ação tende a aumentar AOV sem ser só chute?",
      options: [
        {
          text: "Criar kit, combo, order bump, upsell ou frete grátis acima de um valor mínimo, preservando margem.",
          correct: true,
          feedback: "Perfeito. AOV sobe quando o pedido médio aumenta, mas a margem precisa acompanhar."
        },
        {
          text: "Diminuir o valor do pedido sem estratégia.",
          feedback: "Isso tende a reduzir AOV."
        },
        {
          text: "Remover todos os kits.",
          feedback: "Kits podem aumentar AOV quando bem montados."
        },
        {
          text: "Piorar a oferta para reduzir conversão.",
          feedback: "Isso não ajuda AOV saudável."
        },
        {
          text: "Ignorar margem.",
          feedback: "AOV sem margem pode virar só faturamento bonito."
        }
      ]
    },
    {
      id: "u3-q21",
      topic: "mixed",
      difficulty: "hard",
      type: "fullDiagnosis",
      question: "Faça o diagnóstico financeiro mais correto.",
      data: {
        ticketMedio: "R$ 100",
        sobraAntesTrafego: "R$ 35",
        cpa: "R$ 42",
        roas: "2,38",
        observacao: "funil gera vendas com volume suficiente"
      },
      options: [
        {
          text: "A campanha vende, mas o CPA passa da sobra antes do tráfego; há prejuízo estimado por venda e precisa reduzir CPA ou aumentar margem/ticket.",
          correct: true,
          feedback: "Exato. Sobra R$ 35 antes da mídia e CPA R$ 42 gera cerca de -R$ 7 por venda. ROAS 2,38 pode parecer ok, mas não fecha a margem."
        },
        {
          text: "Está perfeita porque todo ROAS acima de 2 sempre dá lucro.",
          feedback: "Não existe ROAS mágico universal. Depende da margem."
        },
        {
          text: "CPA R$ 42 é sempre barato para qualquer produto.",
          feedback: "CPA só é barato se cabe na margem daquele produto."
        },
        {
          text: "Ticket R$ 100 garante lucro sozinho.",
          feedback: "Ticket é receita média. Precisa descontar custos e CPA."
        },
        {
          text: "A única solução é mexer no checkout.",
          feedback: "O problema descrito é financeiro: CPA maior que sobra antes do tráfego."
        }
      ]
    }
  ],
  scoringFeedback: {
    byTopic: {
      ticketMedio: {
        failTitle: "Revisar Ticket Médio",
        failMessage: "Você precisa reforçar valor médio por pedido e como ele muda CPA, ROAS e escala."
      },
      cpa: {
        failTitle: "Revisar CPA",
        failMessage: "Você está tropeçando no custo por compra. Revise como calcular e comparar CPA com margem."
      },
      margemLucro: {
        failTitle: "Revisar Margem de Lucro",
        failMessage: "Você precisa reforçar a diferença entre faturamento, sobra e dinheiro real para pagar mídia."
      },
      pontoEquilibrio: {
        failTitle: "Revisar Ponto de Equilíbrio",
        failMessage: "Você precisa reforçar CPA de equilíbrio e ROAS mínimo para não vender no prejuízo."
      },
      roasRoi: {
        failTitle: "Revisar ROAS e ROI",
        failMessage: "Você precisa reforçar retorno de receita, diferença entre faturamento e lucro e a leitura com margem."
      },
      lucroLiquido: {
        failTitle: "Revisar Lucro Líquido por Venda",
        failMessage: "Você precisa reforçar quanto sobra depois de descontar o CPA real."
      },
      aov: {
        failTitle: "Revisar AOV",
        failMessage: "Você precisa reforçar valor médio do pedido, kits, combos e aumento de carrinho sem destruir margem."
      },
      mixed: {
        failTitle: "Revisar diagnóstico financeiro",
        failMessage: "Você precisa treinar o cruzamento entre ticket, CPA, margem, ROAS, break-even e lucro."
      }
    }
  }
};

    const PROVA_UNIDADE_4 = {
  id: "prova-unidade-4",
  type: "unit_assessment",
  unitId: "unit-4",
  title: "Prova Unidade 4: dá pra confiar nesses dados?",
  subtitle: "Volume de dados, orçamento/gasto e rastreamento.",
  description: "Uma prova para confirmar se você sabe quando a métrica tem dado suficiente, quando a verba está enganando e quando o tracking está mentindo.",
  estimatedMinutes: 10,
  xp: 240,
  unlocksUnitId: "unit-5",
  passingRule: {
    totalQuestions: 18,
    maxErrors: 3,
    minCorrect: 15,
    failMessage: "Você errou mais de 3. Ainda não passou. Revise volume, verba ou tracking antes de tentar de novo.",
    passMessage: "Aprovado. Unidade 4 amassada. Agora você pode seguir para a Unidade 5."
  },
  visualRules: {
    showMetricColorsBeforeAnswer: false,
    showMetricColorsAfterAnswer: true,
    reason: "A prova deve treinar julgamento sem pista visual. Os números aparecem crus; as cores só entram no feedback."
  },
  reviewModules: {
    volumeDados: "volume-de-dados",
    orcamentoGasto: "orcamento-e-gasto",
    errosRastreamento: "erros-de-rastreamento"
  },
  questions: [
    {
      id: "u4-q01",
      topic: "volumeDados",
      difficulty: "easy",
      type: "concept",
      question: "Por que pouco dado pode enganar na análise de campanha?",
      options: [
        {
          text: "Porque poucos eventos fazem a métrica oscilar muito e podem criar uma conclusão falsa.",
          correct: true,
          feedback: "Certo. Pouco dado é barulhento. Uma venda ou poucos cliques podem distorcer a leitura."
        },
        {
          text: "Porque métrica nunca serve para tomar decisão.",
          feedback: "Métrica serve muito, mas precisa de volume e contexto."
        },
        {
          text: "Porque ROAS sempre é mentira.",
          feedback: "ROAS não é sempre mentira, mas com pouco dado pode enganar."
        },
        {
          text: "Porque CPC substitui todas as outras métricas.",
          feedback: "CPC é uma métrica do topo. Ele não substitui volume, CPA, ROAS e funil."
        },
        {
          text: "Porque uma campanha só pode ser analisada depois de um ano.",
          feedback: "Não precisa esperar um ano. Precisa de volume suficiente para a decisão que quer tomar."
        }
      ]
    },
    {
      id: "u4-q02",
      topic: "volumeDados",
      difficulty: "medium",
      type: "interpretation",
      question: "Campanha teve 90 impressões, 1 clique e nenhuma venda. Qual leitura é mais madura?",
      data: {
        impressoes: 90,
        cliques: 1,
        compras: 0
      },
      options: [
        {
          text: "Ainda há pouco dado para concluir que produto, página ou checkout são ruins.",
          correct: true,
          feedback: "Boa. Com 90 impressões e 1 clique, quase nada foi testado."
        },
        {
          text: "Produto comprovadamente não presta.",
          feedback: "Cedo demais. Esse volume não prova isso."
        },
        {
          text: "Checkout está quebrado com certeza.",
          feedback: "Com 1 clique, talvez nem tenha chegado gente suficiente ao checkout."
        },
        {
          text: "ROAS está validado para escala.",
          feedback: "Sem compra e sem volume, ROAS não valida nada."
        },
        {
          text: "Página foi testada com segurança.",
          feedback: "Com 1 clique, a página praticamente não foi testada."
        }
      ]
    },
    {
      id: "u4-q03",
      topic: "volumeDados",
      difficulty: "medium",
      type: "interpretation",
      question: "Campanha gastou R$ 18, teve 1 venda de R$ 120 e ROAS alto. Qual decisão é mais segura?",
      data: {
        gasto: "R$ 18",
        vendas: 1,
        receita: "R$ 120",
        roas: "6,66"
      },
      options: [
        {
          text: "Tratar como bom sinal inicial, mas confirmar com mais volume antes de escalar forte.",
          correct: true,
          feedback: "Exato. Uma venda com pouco gasto pode ser sorte. É sinal, não prova final."
        },
        {
          text: "Aumentar verba 20 vezes imediatamente.",
          feedback: "Isso é emoção. Pouco gasto com um resultado bonito ainda precisa confirmação."
        },
        {
          text: "Pausar porque ROAS alto é ruim.",
          feedback: "ROAS alto é positivo, mas precisa de volume para confiança."
        },
        {
          text: "Concluir que o funil nunca mais precisa de análise.",
          feedback: "Campanha muda com volume, tempo, público e orçamento."
        },
        {
          text: "Ignorar margem e CPA.",
          feedback: "Mesmo com ROAS alto, margem e CPA precisam entrar na leitura."
        }
      ]
    },
    {
      id: "u4-q04",
      topic: "volumeDados",
      difficulty: "hard",
      type: "scenario",
      question: "Qual métrica normalmente exige mais paciência para confiar?",
      options: [
        {
          text: "CPA e ROAS, porque dependem de compras suficientes.",
          correct: true,
          feedback: "Certo. Métricas de fundo do funil precisam de mais eventos, principalmente compras."
        },
        {
          text: "Impressões, porque compra acontece antes da impressão.",
          feedback: "Impressões aparecem no topo e juntam volume rápido."
        },
        {
          text: "CPM, porque só aparece depois da venda.",
          feedback: "CPM aparece com impressões, antes da venda."
        },
        {
          text: "CTR, porque não depende de clique.",
          feedback: "CTR depende de impressões e cliques, e costuma aparecer antes de CPA/ROAS."
        },
        {
          text: "Frequência, porque é lucro líquido.",
          feedback: "Frequência mede repetição de anúncio, não lucro."
        }
      ]
    },
    {
      id: "u4-q05",
      topic: "volumeDados",
      difficulty: "hard",
      type: "action",
      question: "Pouco dado, sem bug claro e sem gasto alto. Qual ação combina melhor?",
      data: {
        gasto: "R$ 12",
        cliques: 8,
        compras: 0,
        bugsAparentes: "nenhum"
      },
      options: [
        {
          text: "Manter observando até ter mais volume antes de uma decisão forte.",
          correct: true,
          feedback: "Boa. Sem volume e sem quebra clara, a decisão mais madura é observar."
        },
        {
          text: "Pausar para sempre.",
          feedback: "Pode ser cedo demais. Ainda não há dado suficiente."
        },
        {
          text: "Trocar anúncio, página e checkout tudo junto.",
          feedback: "Mexer em tudo com pouco dado destrói o aprendizado."
        },
        {
          text: "Escalar pesado.",
          feedback: "Sem dado, escala vira aposta."
        },
        {
          text: "Concluir que o checkout é o único culpado.",
          feedback: "Não há volume suficiente para afirmar isso."
        }
      ]
    },
    {
      id: "u4-q06",
      topic: "orcamentoGasto",
      difficulty: "easy",
      type: "concept",
      question: "Qual é a diferença entre orçamento e gasto real?",
      options: [
        {
          text: "Orçamento é o limite definido; gasto real é quanto a campanha consumiu de verdade.",
          correct: true,
          feedback: "Certo. Orçamento é autorização. Gasto real é dinheiro que saiu."
        },
        {
          text: "Orçamento e gasto real são sempre iguais.",
          feedback: "Nem sempre. A campanha pode gastar tudo, pouco ou quase nada."
        },
        {
          text: "Gasto real é a quantidade de cliques.",
          feedback: "Cliques são ações. Gasto real é dinheiro consumido."
        },
        {
          text: "Orçamento é o valor do pedido.",
          feedback: "Valor do pedido é ticket/AOV."
        },
        {
          text: "Gasto real é a taxa de checkout.",
          feedback: "Taxa de checkout é conversão. Gasto real é verba consumida."
        }
      ]
    },
    {
      id: "u4-q07",
      topic: "orcamentoGasto",
      difficulty: "medium",
      type: "interpretation",
      question: "Campanha com orçamento de R$ 100/dia gastou só R$ 9. Qual leitura faz mais sentido?",
      data: {
        orcamentoDiario: "R$ 100",
        gastoReal: "R$ 9"
      },
      options: [
        {
          text: "Pode haver problema de entrega, público estreito, lance/configuração ou criativo com baixa entrega.",
          correct: true,
          feedback: "Boa. Se quase não gasta, antes de julgar resultado é preciso entender por que não entregou."
        },
        {
          text: "O produto foi validado com certeza.",
          feedback: "Com R$ 9 de gasto, provavelmente ainda falta dado."
        },
        {
          text: "Checkout é comprovadamente ruim.",
          feedback: "Se não gastou direito, talvez nem tenha gente suficiente no checkout."
        },
        {
          text: "Deve escalar 10 vezes agora.",
          feedback: "Antes de escalar, descubra por que a campanha não gastou o orçamento atual."
        },
        {
          text: "CPA real está completamente validado.",
          feedback: "Sem gasto e compras suficientes, CPA pode não ter confiança."
        }
      ]
    },
    {
      id: "u4-q08",
      topic: "orcamentoGasto",
      difficulty: "medium",
      type: "interpretation",
      question: "Campanha gastou o orçamento inteiro rápido, com CTR baixo e CPC alto. Qual leitura encaixa melhor?",
      data: {
        gasto: "100% do orçamento cedo",
        ctr: "0,41%",
        cpc: "R$ 4,80"
      },
      options: [
        {
          text: "A campanha está consumindo verba rápido, mas o topo do funil está fraco.",
          correct: true,
          feedback: "Exato. Gasto rápido com CTR baixo e CPC alto é alerta de queima de verba."
        },
        {
          text: "Está perfeita porque gastou tudo.",
          feedback: "Gastar tudo não significa performar bem."
        },
        {
          text: "Checkout é o único culpado.",
          feedback: "CTR e CPC são do topo do funil. O problema aparece antes."
        },
        {
          text: "Não precisa olhar criativo.",
          feedback: "CTR baixo pede olhar criativo, hook e promessa."
        },
        {
          text: "Deve aumentar orçamento sem ajuste.",
          feedback: "Mais verba no topo fraco pode acelerar prejuízo."
        }
      ]
    },
    {
      id: "u4-q09",
      topic: "orcamentoGasto",
      difficulty: "hard",
      type: "action",
      question: "Quando faz sentido aumentar orçamento?",
      options: [
        {
          text: "Quando CPA cabe, ROAS confirma, funil está saudável e há dados consistentes.",
          correct: true,
          feedback: "Perfeito. Aumentar verba deve multiplicar algo saudável, não tentar salvar campanha quebrada."
        },
        {
          text: "Quando houve uma venda isolada com pouco gasto.",
          feedback: "Isso pode ser sinal inicial, mas não base forte para escala pesada."
        },
        {
          text: "Quando CPA está acima do limite e piorando.",
          feedback: "Isso pede ajuste, redução ou pausa, não aumento."
        },
        {
          text: "Quando página está claramente vazando.",
          feedback: "Primeiro corrige o vazamento."
        },
        {
          text: "Quando tracking está bugado.",
          feedback: "Com tracking bugado, você nem sabe se a métrica é real."
        }
      ]
    },
    {
      id: "u4-q10",
      topic: "orcamentoGasto",
      difficulty: "hard",
      type: "diagnosis",
      question: "Pouco gasto e ROAS alto. Qual leitura é mais segura?",
      data: {
        gasto: "R$ 22",
        roas: "5,4",
        compras: 1
      },
      options: [
        {
          text: "Bom sinal inicial, mas precisa de mais volume antes de escalar forte.",
          correct: true,
          feedback: "Certo. Pouco gasto com métrica boa pode ser sorte ou amostra pequena."
        },
        {
          text: "Escalar 30 vezes imediatamente.",
          feedback: "Isso é perigoso. Ainda há pouco volume."
        },
        {
          text: "Pausar porque ROAS alto é ruim.",
          feedback: "ROAS alto é bom sinal, só precisa confirmação."
        },
        {
          text: "Ignorar volume de dados.",
          feedback: "Volume é o que dá confiança para a decisão."
        },
        {
          text: "Concluir que orçamento nunca mais precisa ser monitorado.",
          feedback: "Orçamento e gasto precisam de acompanhamento constante."
        }
      ]
    },
    {
      id: "u4-q11",
      topic: "orcamentoGasto",
      difficulty: "hard",
      type: "action",
      question: "Campanha gasta rápido, CPA está no limite e ROAS está instável. Qual ação é mais madura?",
      data: {
        gasto: "rápido",
        cpa: "perto do limite",
        roas: "instável"
      },
      options: [
        {
          text: "Segurar ou reduzir orçamento enquanto investiga o gargalo.",
          correct: true,
          feedback: "Boa. Quando a conta está no limite, controlar verba evita sangria maior."
        },
        {
          text: "Dobrar orçamento sem olhar funil.",
          feedback: "Pode multiplicar o problema."
        },
        {
          text: "Ignorar CPA.",
          feedback: "CPA no limite é sinal central para decidir verba."
        },
        {
          text: "Aumentar orçamento porque instabilidade sempre é lucro.",
          feedback: "Instabilidade com CPA no limite pede cuidado."
        },
        {
          text: "Trocar tudo ao mesmo tempo.",
          feedback: "Mexer em tudo sem diagnóstico atrapalha o aprendizado."
        }
      ]
    },
    {
      id: "u4-q12",
      topic: "errosRastreamento",
      difficulty: "easy",
      type: "concept",
      question: "O que é erro de rastreamento?",
      options: [
        {
          text: "Quando eventos ou métricas registrados não representam corretamente o que aconteceu de verdade.",
          correct: true,
          feedback: "Certo. Tracking errado suja os dados e pode gerar decisão errada."
        },
        {
          text: "Quando todo anúncio tem CTR baixo.",
          feedback: "CTR baixo é performance do anúncio. Rastreamento é medição dos eventos."
        },
        {
          text: "Quando o orçamento é alto.",
          feedback: "Orçamento alto não é erro de rastreamento."
        },
        {
          text: "Quando o produto tem margem baixa.",
          feedback: "Margem baixa é problema financeiro, não necessariamente tracking."
        },
        {
          text: "Quando a frequência sobe.",
          feedback: "Frequência alta pode indicar saturação, não erro de tracking."
        }
      ]
    },
    {
      id: "u4-q13",
      topic: "errosRastreamento",
      difficulty: "medium",
      type: "interpretation",
      question: "A loja mostra 6 compras reais, mas a plataforma registrou só 1. Qual suspeita faz sentido?",
      data: {
        comprasLoja: 6,
        comprasPlataforma: 1
      },
      options: [
        {
          text: "Evento de compra pode estar faltando ou registrando mal.",
          correct: true,
          feedback: "Boa. Quando loja e plataforma divergem muito, suspeite do tracking."
        },
        {
          text: "A campanha obrigatoriamente não vendeu.",
          feedback: "Se a loja mostra compras reais, houve compra. A plataforma pode ter falhado ou atribuído diferente."
        },
        {
          text: "ROAS da plataforma está 100% confiável.",
          feedback: "Se compras não registram, o ROAS da plataforma pode estar subestimado."
        },
        {
          text: "Checkout não existe.",
          feedback: "Checkout existe; o evento pode estar falhando."
        },
        {
          text: "Deve escalar só olhando a plataforma.",
          feedback: "Antes de escalar, precisa entender a divergência."
        }
      ]
    },
    {
      id: "u4-q14",
      topic: "errosRastreamento",
      difficulty: "medium",
      type: "interpretation",
      question: "A loja teve 4 pedidos reais, mas a plataforma mostra 12 compras. Qual suspeita é mais forte?",
      data: {
        pedidosReais: 4,
        comprasRegistradas: 12
      },
      options: [
        {
          text: "Evento de compra duplicado ou disparando mais de uma vez.",
          correct: true,
          feedback: "Exato. Compra registrada em excesso é sinal forte de duplicação."
        },
        {
          text: "A loja escondeu 8 pedidos.",
          feedback: "Pode haver diferenças, mas 4 virando 12 é forte suspeita de evento duplicado."
        },
        {
          text: "CPA está garantidamente correto.",
          feedback: "Se compra duplicou, CPA parece menor do que realmente é."
        },
        {
          text: "ROAS está garantidamente real.",
          feedback: "ROAS pode estar inflado por compras duplicadas."
        },
        {
          text: "Não precisa verificar nada.",
          feedback: "Precisa verificar urgente antes de tomar decisão."
        }
      ]
    },
    {
      id: "u4-q15",
      topic: "errosRastreamento",
      difficulty: "hard",
      type: "scenario",
      question: "A plataforma mostra compra, mas não existe pedido aprendizadospondente na loja. Qual suspeita faz mais sentido?",
      data: {
        compraPlataforma: "sim",
        pedidoLoja: "não existe"
      },
      options: [
        {
          text: "Evento de compra pode estar disparando no lugar errado.",
          correct: true,
          feedback: "Certo. Compra sem pedido real é alerta forte de evento mal configurado."
        },
        {
          text: "A venda é sempre real mesmo sem pedido.",
          feedback: "Sem pedido real, precisa investigar antes de considerar venda."
        },
        {
          text: "ROAS está confirmado.",
          feedback: "ROAS pode estar inflado por evento falso."
        },
        {
          text: "CPA está necessariamente pior do que parece.",
          feedback: "Com compra falsa, o CPA parece melhor do que é."
        },
        {
          text: "Não precisa olhar a loja.",
          feedback: "A loja é referência principal para confirmar pedido real."
        }
      ]
    },
    {
      id: "u4-q16",
      topic: "errosRastreamento",
      difficulty: "hard",
      type: "interpretation",
      question: "Campanha teve 100 cliques e 360 visualizações de página registradas. Qual leitura é mais madura?",
      data: {
        cliques: 100,
        visualizacoesPagina: 360
      },
      options: [
        {
          text: "Pode haver evento duplicado, tráfego misturado ou configuração disparando visualização errado.",
          correct: true,
          feedback: "Boa. Diferença muito grande entre clique e visualização pede investigação."
        },
        {
          text: "A campanha está automaticamente perfeita.",
          feedback: "Número estranho não prova performance; pode ser tracking sujo."
        },
        {
          text: "Toda visualização acima de clique é sempre impossível.",
          feedback: "Pode haver recarregamento ou atribuição, mas diferença grande precisa investigação."
        },
        {
          text: "Não precisa comparar com outras fontes.",
          feedback: "Precisa comparar com loja, analytics e eventos."
        },
        {
          text: "Checkout é sempre o culpado.",
          feedback: "Esse problema aparece antes do checkout, na medição de clique/página."
        }
      ]
    },
    {
      id: "u4-q17",
      topic: "errosRastreamento",
      difficulty: "hard",
      type: "action",
      question: "CPA parece ótimo, mas você descobriu que compras estão duplicadas. Qual ação é mais correta?",
      data: {
        cpaPlataforma: "baixo",
        problema: "compras duplicadas"
      },
      options: [
        {
          text: "Corrigir rastreamento antes de confiar no CPA e escalar.",
          correct: true,
          feedback: "Exato. CPA bom com compra duplicada é número contaminado."
        },
        {
          text: "Escalar forte porque CPA parece ótimo.",
          feedback: "Se as compras duplicaram, CPA parece melhor do que é."
        },
        {
          text: "Ignorar duplicação.",
          feedback: "Duplicação destrói leitura de CPA e ROAS."
        },
        {
          text: "Pausar todos os produtos para sempre.",
          feedback: "Primeiro corrija tracking. O problema pode ser medição, não produto."
        },
        {
          text: "Trocar a página sem verificar eventos.",
          feedback: "O problema identificado é rastreamento. Corrija isso antes."
        }
      ]
    },
    {
      id: "u4-q18",
      topic: "mixed",
      difficulty: "hard",
      type: "fullDiagnosis",
      question: "Qual diagnóstico é mais completo?",
      data: {
        gasto: "R$ 32",
        comprasPlataforma: 2,
        pedidosNaLoja: 0,
        cliques: 40,
        visualizacoesPagina: 180,
        observacao: "campanha em teste inicial"
      },
      options: [
        {
          text: "Há pouco volume e sinais fortes de tracking sujo; antes de decidir performance, corrigir eventos e comparar fontes.",
          correct: true,
          feedback: "Perfeito. Pouco gasto + compras sem pedido real + visualizações muito acima dos cliques indicam que os dados não são confiáveis."
        },
        {
          text: "Escalar imediatamente porque a plataforma mostrou 2 compras.",
          feedback: "Compra sem pedido real pode ser evento falso. Escalar agora é perigoso."
        },
        {
          text: "Pausar o produto para sempre porque nenhum dado presta.",
          feedback: "O primeiro passo é corrigir tracking. Ainda não dá para julgar o produto com dado sujo."
        },
        {
          text: "Ignorar loja e confiar só na plataforma.",
          feedback: "A loja confirma pedido real. Ignorar isso é erro grave."
        },
        {
          text: "Culpar apenas o checkout.",
          feedback: "O problema principal é dado suspeito/medição, não necessariamente checkout."
        }
      ]
    }
  ],
  scoringFeedback: {
    byTopic: {
      volumeDados: {
        failTitle: "Revisar Volume de Dados",
        failMessage: "Você está tomando decisão forte com pouca amostra. Revise sinal inicial, dado acionável e dado forte."
      },
      orcamentoGasto: {
        failTitle: "Revisar Orçamento e Gasto",
        failMessage: "Você precisa reforçar diferença entre orçamento, gasto real, ritmo de consumo e escala."
      },
      errosRastreamento: {
        failTitle: "Revisar Erros de Rastreamento",
        failMessage: "Você precisa reforçar evento faltando, duplicado, compra falsa e comparação com pedido real."
      },
      mixed: {
        failTitle: "Revisar confiança dos dados",
        failMessage: "Você precisa treinar a ordem: primeiro tracking, depois volume, depois decisão."
      }
    }
  }
};

    const PROVA_UNIDADE_5 = {
  id: "prova-unidade-5",
  type: "unit_assessment",
  unitId: "unit-5",
  title: "Prova Unidade 5: diagnóstico sem chorar",
  subtitle: "Juntar métricas, achar o gargalo e decidir a próxima ação.",
  description: "Uma prova para confirmar se você consegue olhar uma campanha inteira, entender onde está quebrando e escolher se mantém, ajusta, pausa ou escala.",
  estimatedMinutes: 12,
  xp: 280,
  unlocksUnitId: "unit-6",
  passingRule: {
    totalQuestions: 21,
    maxErrors: 3,
    minCorrect: 18,
    failMessage: "Você errou mais de 3. Ainda não passou. Revise diagnóstico cruzado, regras de decisão e checklist final antes de liberar o treino pesado.",
    passMessage: "Aprovado. Unidade 5 amassada. Agora você pode seguir para o Treino Diagnóstico."
  },
  visualRules: {
    showMetricColorsBeforeAnswer: false,
    showMetricColorsAfterAnswer: true,
    reason: "Esta prova simula o momento real de decisão. Os números aparecem crus; a leitura precisa vir da cabeça."
  },
  reviewModules: {
    diagnosticoCruzado: "diagnostico-cruzado",
    regrasDecisao: "regras-de-decisao",
    checklistFinal: "checklist-final-campanha"
  },
  questions: [
    {
      id: "u5-q01",
      topic: "diagnosticoCruzado",
      difficulty: "easy",
      type: "concept",
      question: "O que é diagnóstico cruzado?",
      options: [
        {
          text: "Cruzar várias métricas para descobrir onde o funil está quebrando e qual ação tomar.",
          correct: true,
          feedback: "Certo. Diagnóstico cruzado não olha uma métrica isolada; ele conecta as etapas do funil."
        },
        {
          text: "Olhar só o ROAS e ignorar todo o resto.",
          feedback: "ROAS é consequência. Diagnóstico cruzado olha o caminho que levou ao resultado."
        },
        {
          text: "Escolher campanha pela cor mais bonita no painel.",
          feedback: "Isso é chute visual. Diagnóstico cruzado exige métrica, contexto e ação."
        },
        {
          text: "Mexer em anúncio, página e checkout ao mesmo tempo sempre.",
          feedback: "Isso bagunça o aprendizado. Diagnóstico cruzado ajuda a mexer na etapa certa."
        },
        {
          text: "Pausar toda campanha que ainda não vendeu no primeiro clique.",
          feedback: "Sem volume suficiente, essa decisão pode ser cedo demais."
        }
      ]
    },
    {
      id: "u5-q02",
      topic: "diagnosticoCruzado",
      difficulty: "medium",
      type: "scenario",
      question: "Cenário: CTR baixo, CPC alto, Taxa de Visualização ainda sem volume relevante. Qual diagnóstico faz mais sentido?",
      data: {
        ctr: "0,39%",
        cpc: "R$ 4,70",
        visualizacoesPagina: "poucas"
      },
      options: [
        {
          text: "O gargalo mais claro está no anúncio/criativo, antes de culpar página ou checkout.",
          correct: true,
          feedback: "Boa. CTR baixo e CPC alto apontam para topo do funil. Ainda não tem base para culpar página/checkout."
        },
        {
          text: "Checkout está quebrado com certeza.",
          feedback: "Não há dado suficiente de checkout. O problema aparece antes do clique."
        },
        {
          text: "A página está comprovadamente ruim.",
          feedback: "Ainda há pouca visualização de página. Não dá para culpar página com segurança."
        },
        {
          text: "ROAS está validado para escala.",
          feedback: "Sem volume e com topo fraco, não existe validação de escala."
        },
        {
          text: "Aumentar orçamento é a única ação lógica.",
          feedback: "Aumentar verba em topo ruim pode só comprar clique caro."
        }
      ]
    },
    {
      id: "u5-q03",
      topic: "diagnosticoCruzado",
      difficulty: "medium",
      type: "scenario",
      question: "Cenário: CPC bom, Taxa de Visualização baixa e muitos cliques. Onde está o gargalo mais provável?",
      data: {
        cpc: "R$ 0,65",
        cliques: 900,
        taxaVisualizacao: "48%"
      },
      options: [
        {
          text: "Na ponte clique → página: carregamento, link, promessa desalinhada ou tracking.",
          correct: true,
          feedback: "Exato. Clique barato não adianta se quase metade não vira página carregada."
        },
        {
          text: "No checkout, obrigatoriamente.",
          feedback: "Ainda nem chegou gente suficiente na página. Checkout vem depois."
        },
        {
          text: "Na margem do produto, obrigatoriamente.",
          feedback: "Margem é financeira. O gargalo visível aqui é de passagem clique → página."
        },
        {
          text: "Na frequência alta.",
          feedback: "A questão não dá frequência. O dado principal é visualização baixa."
        },
        {
          text: "No ROAS alto.",
          feedback: "A questão não mostra ROAS. O gargalo aparece antes da venda."
        }
      ]
    },
    {
      id: "u5-q04",
      topic: "diagnosticoCruzado",
      difficulty: "medium",
      type: "scenario",
      question: "Cenário: Taxa de Visualização boa, PV–IC baixo e IC–Compras ainda com pouco volume. Qual etapa revisar primeiro?",
      data: {
        taxaVisualizacao: "92%",
        pvIc: "2,1%",
        iniciosCheckout: "poucos"
      },
      options: [
        {
          text: "Página/oferta, porque o tráfego chega mas não inicia checkout.",
          correct: true,
          feedback: "Perfeito. Visualização boa + PV–IC baixo aponta para página, oferta, prova, CTA ou clareza."
        },
        {
          text: "Checkout, porque ele é sempre culpado.",
          feedback: "Ainda há poucos inícios de checkout. O gargalo aparece antes."
        },
        {
          text: "Apenas CPM.",
          feedback: "CPM é topo do funil. Aqui o tráfego já chegou na página."
        },
        {
          text: "Tracking de compra apenas.",
          feedback: "Pode verificar tracking, mas o gargalo visível é página/oferta."
        },
        {
          text: "Nada, porque visualização boa resolve tudo.",
          feedback: "Visualização boa só mostra que a pessoa chegou. PV–IC baixo mostra que ela não avançou."
        }
      ]
    },
    {
      id: "u5-q05",
      topic: "diagnosticoCruzado",
      difficulty: "medium",
      type: "scenario",
      question: "Cenário: PV–IC bom, IC–Compras baixo, volume suficiente. Qual diagnóstico é mais correto?",
      data: {
        pvIc: "15%",
        iniciosCheckout: 170,
        compras: 13,
        icCompras: "7,6%"
      },
      options: [
        {
          text: "A página gera intenção, mas o checkout está perdendo compradores no final.",
          correct: true,
          feedback: "Certo. Se a pessoa inicia checkout e não compra, o gargalo está no checkout."
        },
        {
          text: "O criativo não gerou clique nenhum.",
          feedback: "Se há muitos inícios de checkout, o funil já avançou além do clique."
        },
        {
          text: "A página não convence ninguém.",
          feedback: "PV–IC de 15% indica que a página está gerando intenção."
        },
        {
          text: "O problema é necessariamente CPM alto.",
          feedback: "O cenário não mostra CPM e o gargalo visível é no checkout."
        },
        {
          text: "Escalar sem ajustar nada.",
          feedback: "Checkout com IC–Compras baixo precisa ser revisado antes de escala."
        }
      ]
    },
    {
      id: "u5-q06",
      topic: "diagnosticoCruzado",
      difficulty: "hard",
      type: "fullDiagnosis",
      question: "Qual diagnóstico está mais completo para o cenário abaixo?",
      data: {
        cpm: "R$ 19",
        ctr: "1,9%",
        cpc: "R$ 1,00",
        taxaVisualizacao: "94%",
        pvIc: "3%",
        icCompras: "sem volume suficiente"
      },
      options: [
        {
          text: "Topo e chegada estão bons; o gargalo mais claro está na página/oferta, porque PV–IC está baixo.",
          correct: true,
          feedback: "Exato. CPC bom e visualização boa mostram que o clique chega. PV–IC baixo indica que a página não gera checkout."
        },
        {
          text: "O anúncio está ruim porque CTR 1,9% é sempre péssimo.",
          feedback: "Nesse contexto, CTR 1,9% e CPC R$ 1,00 não parecem o maior gargalo."
        },
        {
          text: "Checkout é o culpado principal com certeza.",
          feedback: "Sem volume suficiente de checkout, ainda não dá para culpar o checkout."
        },
        {
          text: "Tracking está duplicado com certeza.",
          feedback: "Não há sinal de tracking duplicado no cenário."
        },
        {
          text: "Escalar imediatamente porque uma métrica está boa.",
          feedback: "PV–IC baixo precisa ser corrigido antes de escala."
        }
      ]
    },
    {
      id: "u5-q07",
      topic: "regrasDecisao",
      difficulty: "easy",
      type: "concept",
      question: "Quais são as quatro decisões principais depois de analisar uma campanha?",
      options: [
        {
          text: "Manter, ajustar, pausar/reduzir ou escalar.",
          correct: true,
          feedback: "Certo. Essas são as decisões práticas que saem da leitura de métricas."
        },
        {
          text: "Chorar, apagar, esquecer e apostar.",
          feedback: "Engraçado, mas não é método. A decisão precisa ser baseada em diagnóstico."
        },
        {
          text: "Sempre pausar, sempre escalar, sempre trocar tudo, sempre ignorar.",
          feedback: "Esses extremos são perigosos. A decisão depende do cenário."
        },
        {
          text: "Só olhar curtidas e comentários.",
          feedback: "Engajamento pode ajudar, mas não substitui funil e dinheiro."
        },
        {
          text: "Mudar tudo antes de olhar dados.",
          feedback: "Isso cria bagunça. Primeiro mede, depois decide."
        }
      ]
    },
    {
      id: "u5-q08",
      topic: "regrasDecisao",
      difficulty: "medium",
      type: "action",
      question: "Pouco dado, sem bug claro e sem gasto alto. Qual decisão é mais madura?",
      data: {
        gasto: "baixo",
        volume: "baixo",
        bug: "não aparente"
      },
      options: [
        {
          text: "Manter observando até ter mais volume.",
          correct: true,
          feedback: "Boa. Pouco dado sem quebra clara pede paciência, não decisão pesada."
        },
        {
          text: "Escalar pesado.",
          feedback: "Sem dado, escala vira aposta."
        },
        {
          text: "Pausar para sempre.",
          feedback: "Pode ser cedo demais. Ainda não há evidência suficiente."
        },
        {
          text: "Mudar anúncio, página, checkout e preço ao mesmo tempo.",
          feedback: "Isso mata o aprendizado e não mostra o que resolveu."
        },
        {
          text: "Concluir que o produto não presta.",
          feedback: "Sem volume suficiente, isso é chute."
        }
      ]
    },
    {
      id: "u5-q09",
      topic: "regrasDecisao",
      difficulty: "medium",
      type: "action",
      question: "Gargalo claro em PV–IC, com volume suficiente. Qual decisão faz mais sentido?",
      data: {
        taxaVisualizacao: "90%",
        pvIc: "2,4%",
        visualizacoesPagina: 1300
      },
      options: [
        {
          text: "Ajustar página/oferta e acompanhar se os inícios de checkout aumentam.",
          correct: true,
          feedback: "Perfeito. Gargalo claro pede ajuste na etapa certa."
        },
        {
          text: "Escalar sem mexer na página.",
          feedback: "Isso aumentaria tráfego em uma etapa que está vazando."
        },
        {
          text: "Mexer apenas no checkout.",
          feedback: "Pouca gente chega ao checkout. O gargalo é antes."
        },
        {
          text: "Ignorar PV–IC.",
          feedback: "PV–IC é a métrica central desse cenário."
        },
        {
          text: "Pausar todos os anúncios sem testar página.",
          feedback: "Se o tráfego chega, pode valer ajustar a página/oferta antes da sentença final."
        }
      ]
    },
    {
      id: "u5-q10",
      topic: "regrasDecisao",
      difficulty: "medium",
      type: "action",
      question: "Prejuízo claro com volume suficiente. Qual decisão é mais segura?",
      data: {
        cpa: "R$ 58",
        cpaLimite: "R$ 38",
        compras: 35,
        tendencia: "sem melhora"
      },
      options: [
        {
          text: "Pausar ou reduzir forte enquanto corrige o gargalo.",
          correct: true,
          feedback: "Certo. CPA muito acima do limite com volume suficiente é sangria, não hipótese."
        },
        {
          text: "Aumentar orçamento porque prejuízo precisa de mais verba.",
          feedback: "Mais verba em prejuízo tende a multiplicar o rombo."
        },
        {
          text: "Ignorar CPA limite.",
          feedback: "CPA limite existe para saber se a conta fecha."
        },
        {
          text: "Escalar porque teve compras.",
          feedback: "Compra sem lucro pode ser prejuízo com volume."
        },
        {
          text: "Mudar tudo ao mesmo tempo sem diagnóstico.",
          feedback: "Primeiro controle a sangria; depois ajuste com foco."
        }
      ]
    },
    {
      id: "u5-q11",
      topic: "regrasDecisao",
      difficulty: "medium",
      type: "action",
      question: "Quando faz sentido escalar?",
      options: [
        {
          text: "Quando há dados suficientes, funil saudável, CPA dentro do limite, ROAS coerente e consistência.",
          correct: true,
          feedback: "Exato. Escala deve multiplicar um sistema saudável."
        },
        {
          text: "Quando teve uma venda isolada com pouco gasto.",
          feedback: "Bom sinal inicial, mas ainda pode ser sorte."
        },
        {
          text: "Quando tracking está bugado.",
          feedback: "Com tracking bugado, você não sabe se a métrica é real."
        },
        {
          text: "Quando checkout está claramente vazando.",
          feedback: "Checkout vazando precisa ser corrigido antes de escala."
        },
        {
          text: "Quando CPA está acima do limite.",
          feedback: "Isso pede ajuste, redução ou pausa, não escala."
        }
      ]
    },
    {
      id: "u5-q12",
      topic: "regrasDecisao",
      difficulty: "hard",
      type: "principle",
      question: "Por que não é bom mudar criativo, público, página, preço e checkout tudo ao mesmo tempo?",
      options: [
        {
          text: "Porque você perde a capacidade de saber o que melhorou ou piorou.",
          correct: true,
          feedback: "Boa. Teste bom gera aprendizado. Teste caótico gera confusão."
        },
        {
          text: "Porque nunca se deve testar nada.",
          feedback: "Deve testar sim, mas com controle."
        },
        {
          text: "Porque página nunca influencia resultado.",
          feedback: "Página influencia muito. O ponto é mexer com método."
        },
        {
          text: "Porque criativo nunca importa.",
          feedback: "Criativo importa muito, principalmente no topo."
        },
        {
          text: "Porque checkout sempre é perfeito.",
          feedback: "Checkout pode ser gargalo, mas precisa ser diagnosticado."
        }
      ]
    },
    {
      id: "u5-q13",
      topic: "checklistFinal",
      difficulty: "easy",
      type: "concept",
      question: "Qual é a ordem mais correta antes de tomar uma decisão forte?",
      options: [
        {
          text: "Verificar tracking, volume, funil, dinheiro e então decidir ação.",
          correct: true,
          feedback: "Certo. Essa ordem evita decidir com dado sujo, pouco volume ou métrica isolada."
        },
        {
          text: "Olhar só ROAS e escalar.",
          feedback: "ROAS sozinho pode enganar. Precisa de tracking, volume, funil e margem."
        },
        {
          text: "Mudar tudo primeiro e medir depois.",
          feedback: "Isso cria bagunça e atrapalha o aprendizado."
        },
        {
          text: "Pausar antes de olhar qualquer coisa.",
          feedback: "Pausar pode ser certo em alguns casos, mas não antes de analisar."
        },
        {
          text: "Olhar só comentários.",
          feedback: "Comentário não substitui funil e conta financeira."
        }
      ]
    },
    {
      id: "u5-q14",
      topic: "checklistFinal",
      difficulty: "medium",
      type: "checklist",
      question: "Primeiro passo do checklist: a plataforma mostra 10 compras, mas a loja mostra 3 pedidos reais. O que fazer?",
      data: {
        comprasPlataforma: 10,
        pedidosLoja: 3
      },
      options: [
        {
          text: "Investigar rastreamento antes de confiar em CPA e ROAS.",
          correct: true,
          feedback: "Perfeito. Compra duplicada ou evento errado pode inflar resultado."
        },
        {
          text: "Escalar porque 10 compras é lindo.",
          feedback: "Se os pedidos reais são 3, o número da plataforma pode estar contaminado."
        },
        {
          text: "Ignorar a loja.",
          feedback: "A loja confirma pedido real. Não ignore."
        },
        {
          text: "Culpar o criativo sem verificar eventos.",
          feedback: "O primeiro problema é divergência de tracking."
        },
        {
          text: "Pausar produto para sempre.",
          feedback: "Primeiro corrija/valide tracking. O problema pode ser medição."
        }
      ]
    },
    {
      id: "u5-q15",
      topic: "checklistFinal",
      difficulty: "medium",
      type: "checklist",
      question: "Depois de verificar tracking limpo, qual pergunta vem antes de uma decisão pesada?",
      options: [
        {
          text: "Tem volume suficiente para confiar nessa métrica?",
          correct: true,
          feedback: "Boa. Dado limpo ainda pode ser pouco dado. Limpeza e volume são coisas diferentes."
        },
        {
          text: "Qual cor eu gosto mais?",
          feedback: "Cor não decide campanha."
        },
        {
          text: "Já posso escalar qualquer coisa?",
          feedback: "Só depois de volume, funil, CPA/ROAS e margem."
        },
        {
          text: "Posso ignorar o funil?",
          feedback: "Não. O funil mostra onde está o gargalo."
        },
        {
          text: "Posso parar de medir?",
          feedback: "Não. Medição continua durante toda a campanha."
        }
      ]
    },
    {
      id: "u5-q16",
      topic: "checklistFinal",
      difficulty: "hard",
      type: "fullDiagnosis",
      question: "Use o checklist e escolha a melhor decisão.",
      data: {
        tracking: "limpo",
        volume: "suficiente",
        cpm: "R$ 18",
        ctr: "2,1%",
        cpc: "R$ 0,86",
        taxaVisualizacao: "94%",
        pvIc: "13%",
        icCompras: "31%",
        cpa: "R$ 28",
        cpaLimite: "R$ 42",
        roas: "acima do necessário por 4 dias"
      },
      options: [
        {
          text: "Escalar com controle, monitorando CPA, ROAS e possíveis gargalos.",
          correct: true,
          feedback: "Exato. Tracking limpo, volume suficiente, funil saudável e CPA abaixo do limite indicam escala controlada."
        },
        {
          text: "Pausar porque está vendendo.",
          feedback: "Não faz sentido pausar um sistema saudável."
        },
        {
          text: "Mudar tudo ao mesmo tempo.",
          feedback: "Se está funcionando, mexer em tudo pode quebrar."
        },
        {
          text: "Corrigir tracking antes de qualquer coisa, mesmo estando limpo.",
          feedback: "Pode monitorar, mas o cenário diz que tracking está limpo. A decisão principal é escala controlada."
        },
        {
          text: "Trocar checkout porque IC–Compras está saudável.",
          feedback: "IC–Compras saudável não pede troca prioritária."
        }
      ]
    },
    {
      id: "u5-q17",
      topic: "checklistFinal",
      difficulty: "hard",
      type: "fullDiagnosis",
      question: "Use o checklist e escolha a melhor decisão.",
      data: {
        tracking: "limpo",
        volume: "suficiente",
        ctr: "1,7%",
        cpc: "R$ 1,10",
        taxaVisualizacao: "91%",
        pvIc: "2,5%",
        icCompras: "pouco volume",
        cpa: "sem estabilidade",
        observacao: "muitas visitas, poucos checkouts"
      },
      options: [
        {
          text: "Ajustar página/oferta, porque a chegada está boa mas PV–IC está baixo.",
          correct: true,
          feedback: "Perfeito. Checklist mostra tracking limpo, volume na página e gargalo página → checkout."
        },
        {
          text: "Escalar forte porque CTR é aceitável.",
          feedback: "O PV–IC baixo indica vazamento. Escalar agora aumenta desperdício."
        },
        {
          text: "Mexer no checkout como primeira prioridade.",
          feedback: "Ainda há poucos checkouts. O gargalo principal vem antes."
        },
        {
          text: "Pausar para sempre sem testar página.",
          feedback: "Com tráfego chegando, há hipótese clara para ajustar página/oferta."
        },
        {
          text: "Ignorar PV–IC e olhar só CPC.",
          feedback: "CPC não mostra a conversão da página. PV–IC é central aqui."
        }
      ]
    },
    {
      id: "u5-q18",
      topic: "checklistFinal",
      difficulty: "hard",
      type: "fullDiagnosis",
      question: "Use o checklist e escolha a melhor decisão.",
      data: {
        tracking: "suspeito",
        comprasPlataforma: 6,
        pedidosLoja: 1,
        roasPlataforma: "alto",
        gasto: "baixo",
        visualizacoesPagina: "muito acima dos cliques"
      },
      options: [
        {
          text: "Corrigir/validar rastreamento antes de confiar no ROAS e tomar decisão de escala.",
          correct: true,
          feedback: "Certo. Tracking suspeito vem antes de diagnóstico de performance."
        },
        {
          text: "Escalar porque ROAS da plataforma está alto.",
          feedback: "ROAS pode estar inflado por evento errado."
        },
        {
          text: "Pausar o produto para sempre.",
          feedback: "O problema pode ser medição. Primeiro corrija tracking."
        },
        {
          text: "Culpar somente o checkout.",
          feedback: "Há sinais de tracking sujo, não apenas checkout."
        },
        {
          text: "Ignorar pedidos reais da loja.",
          feedback: "Pedido real é a referência para confirmar compra."
        }
      ]
    },
    {
      id: "u5-q19",
      topic: "mixed",
      difficulty: "hard",
      type: "decisionPhrase",
      question: "Qual frase final de análise está mais completa?",
      data: {
        taxaVisualizacao: "92%",
        pvIc: "2,8%",
        volume: "suficiente",
        tracking: "limpo"
      },
      options: [
        {
          text: "Dados limpos, volume suficiente, chegada boa e PV–IC baixo; ação: ajustar página/oferta e acompanhar início de checkout.",
          correct: true,
          feedback: "Boa. A frase tem dados, volume, gargalo e ação."
        },
        {
          text: "Tá ruim.",
          feedback: "Isso não diz onde está ruim nem o que fazer."
        },
        {
          text: "Vou mexer em tudo.",
          feedback: "Isso é bagunça. Falta foco no gargalo."
        },
        {
          text: "ROAS caiu, logo checkout é culpado.",
          feedback: "ROAS é consequência. Precisa achar a etapa quebrada."
        },
        {
          text: "Teve visita, então acabou a análise.",
          feedback: "Visita é só uma etapa. PV–IC baixo ainda precisa ação."
        }
      ]
    },
    {
      id: "u5-q20",
      topic: "mixed",
      difficulty: "hard",
      type: "fullDiagnosis",
      question: "A campanha tem compras, mas prejuízo por venda. Qual decisão é mais correta?",
      data: {
        tracking: "limpo",
        volume: "suficiente",
        cpa: "R$ 49",
        sobraAntesTrafego: "R$ 35",
        pvIc: "bom",
        icCompras: "bom"
      },
      options: [
        {
          text: "A campanha vende, mas a conta financeira não fecha; reduzir CPA, ajustar margem/ticket/oferta ou pausar se não houver correção.",
          correct: true,
          feedback: "Exato. Funil bom não salva venda negativa. CPA maior que sobra antes do tráfego dá prejuízo."
        },
        {
          text: "Escalar porque compra sempre é lucro.",
          feedback: "Compra não é lucro. Se CPA passa da sobra, há prejuízo por venda."
        },
        {
          text: "Trocar checkout como única ação.",
          feedback: "Checkout está bom. O problema é financeiro."
        },
        {
          text: "Ignorar margem.",
          feedback: "Margem é a régua para saber se o CPA cabe."
        },
        {
          text: "Culpar só o tracking mesmo estando limpo.",
          feedback: "O cenário diz tracking limpo. O problema é a conta financeira."
        }
      ]
    },
    {
      id: "u5-q21",
      topic: "mixed",
      difficulty: "hard",
      type: "finalBoss",
      question: "Boss final: escolha o diagnóstico e a próxima ação mais profissional.",
      data: {
        tracking: "limpo",
        volume: "suficiente",
        cpm: "R$ 23",
        ctr: "1,8%",
        cpc: "R$ 1,27",
        taxaVisualizacao: "89%",
        pvIc: "11%",
        icCompras: "9%",
        cpa: "R$ 54",
        cpaLimite: "R$ 38",
        roas: "abaixo do mínimo",
        observacao: "muitos checkouts, poucas compras"
      },
      options: [
        {
          text: "Topo, chegada e página estão aceitáveis; maior gargalo está no checkout e na conta final. Reduzir/segurar verba e ajustar checkout antes de escalar.",
          correct: true,
          feedback: "Perfeito. PV–IC gera checkouts, mas IC–Compras baixo e CPA acima do limite mostram gargalo no fundo e prejuízo. Ação: segurar verba e corrigir checkout."
        },
        {
          text: "Escalar porque CTR é aceitável.",
          feedback: "CTR aceitável não compensa IC–Compras baixo, CPA acima do limite e ROAS abaixo."
        },
        {
          text: "Trocar só o criativo porque o único problema é topo.",
          feedback: "Topo não parece o maior gargalo. O problema mais forte está no checkout e na conta final."
        },
        {
          text: "Ignorar CPA porque existem checkouts.",
          feedback: "Checkouts sem compra suficiente não pagam a conta."
        },
        {
          text: "Aumentar verba para o checkout aprender sozinho.",
          feedback: "Mais verba em checkout vazando pode aumentar prejuízo."
        }
      ]
    }
  ],
  scoringFeedback: {
    byTopic: {
      diagnosticoCruzado: {
        failTitle: "Revisar Diagnóstico Cruzado",
        failMessage: "Você precisa reforçar como cruzar métricas e achar a etapa certa do gargalo."
      },
      regrasDecisao: {
        failTitle: "Revisar Regras de Decisão",
        failMessage: "Você precisa reforçar quando manter, ajustar, pausar/reduzir ou escalar."
      },
      checklistFinal: {
        failTitle: "Revisar Checklist Final",
        failMessage: "Você precisa reforçar a ordem: tracking, volume, funil, dinheiro e ação."
      },
      mixed: {
        failTitle: "Revisar decisão completa",
        failMessage: "Você precisa treinar a frase final: dados + volume + gargalo + ação."
      }
    }
  }
};


    function assessmentToModule(assessment) {
      const total = assessment.questions.length;
      return {
        id: assessment.id,
        title: assessment.title,
        metric: "Prova",
        description: assessment.description,
        xp: assessment.xp,
        difficulty: "Prova",
        estimatedMinutes: assessment.estimatedMinutes,
        isAssessment: true,
        assessment,
        screens: [
          {
            type: "assessmentIntro",
            title: assessment.title,
            eyebrow: "Prova da unidade",
            body: assessment.description,
            subtitle: assessment.subtitle
          },
          ...assessment.questions.map((question, index) => ({
            type: "assessmentQuiz",
            id: question.id,
            topic: question.topic,
            difficulty: question.difficulty,
            title: `Pergunta ${index + 1}/${total}`,
            question: question.question,
            data: question.data || null,
            options: question.options
          })),
          {
            type: "assessmentResult",
            title: "Resultado da prova",
            body: "Veja se você passou ou se precisa revisar algum assunto antes de seguir."
          }
        ]
      };
    }

    const ASSESSMENTS = [
      PROVA_UNIDADE_1,
      PROVA_UNIDADE_2,
      PROVA_UNIDADE_3,
      PROVA_UNIDADE_4,
      PROVA_UNIDADE_5
    ];

    function injectAssessmentModules() {
      const modulesById = Object.fromEntries(MODULES.map((module) => [module.id, module]));

      ASSESSMENTS.forEach((assessment) => {
        modulesById[assessment.id] = assessmentToModule(assessment);
      });

      const finalOrder = [
        "mentalidade-escala", "cpc", "cpm", "ctr", "frequencia", "prova-unidade-1",
        "taxa-visualizacao", "pv-ic", "ic-compras", "prova-unidade-2",
        "ticket-medio", "cpa", "margem-lucro", "ponto-equilibrio", "roas-roi", "lucro-liquido-venda", "aov", "prova-unidade-3",
        "volume-de-dados", "orcamento-e-gasto", "erros-de-rastreamento", "prova-unidade-4",
        "diagnostico-cruzado", "regras-de-decisao", "checklist-final-campanha", "prova-unidade-5",
        "treino-diagnostico"
      ];

      MODULES.splice(0, MODULES.length, ...finalOrder.map((id) => modulesById[id]).filter(Boolean));
    }

    injectAssessmentModules();


    const TEST_UNLOCK_ALL = false;


    const TRACK_UNITS = [
      {
        id: "unit-1",
        label: "UNIDADE 1",
        title: "Começo do jogo: mentalidade e anúncio",
        subtitle: "Mentalidade, CPC, CPM, CTR e Frequência. Primeiro pensa certo, depois mede certo.",
        emoji: "🧠",
        moduleIds: ["mentalidade-escala", "cpc", "cpm", "ctr", "frequencia", "prova-unidade-1"]
      },
      {
        id: "unit-2",
        label: "UNIDADE 2",
        title: "O clique virou intenção?",
        subtitle: "Taxa de Visualização, PV–IC e IC–Compras. Depois vem a prova da unidade.",
        emoji: "🧭",
        moduleIds: ["taxa-visualizacao", "pv-ic", "ic-compras", "prova-unidade-2"]
      },
      {
        id: "unit-3",
        label: "UNIDADE 3",
        title: "Agora entra dinheiro",
        subtitle: "Ticket, CPA, margem, break-even, ROAS, lucro e AOV. Depois vem a prova.",
        emoji: "💰",
        moduleIds: ["ticket-medio", "cpa", "margem-lucro", "ponto-equilibrio", "roas-roi", "lucro-liquido-venda", "aov", "prova-unidade-3"]
      },
      {
        id: "unit-4",
        label: "UNIDADE 4",
        title: "Posso confiar nesses dados?",
        subtitle: "Volume, gasto e tracking antes de decidir no escuro. Depois vem a prova.",
        emoji: "🧪",
        moduleIds: ["volume-de-dados", "orcamento-e-gasto", "erros-de-rastreamento", "prova-unidade-4"]
      },
      {
        id: "unit-5",
        label: "UNIDADE 5",
        title: "Juntar tudo e decidir",
        subtitle: "Diagnóstico, regras de decisão e checklist. Depois vem a prova final.",
        emoji: "🧠",
        moduleIds: ["diagnostico-cruzado", "regras-de-decisao", "checklist-final-campanha", "prova-unidade-5"]
      },
      {
        id: "unit-6",
        label: "UNIDADE 6",
        title: "Treino pesado",
        subtitle: "Treino pesado com cenários até virar reflexo.",
        emoji: "⚔️",
        moduleIds: ["treino-diagnostico"]
      }
    ];

    const PRACTICE_LEVELS = [
      { id: "easy", label: "Easy", emoji: "🟢", total: 50, description: "Conta básica, definição e régua simples." },
      { id: "medium", label: "Médio", emoji: "🟡", total: 50, description: "Cruzamento de duas ou três métricas." },
      { id: "hard", label: "Hard", emoji: "🔴", total: 50, description: "Diagnóstico completo com pegadinhas." }
    ];

    const PRACTICE_SCENARIOS = buildPracticeScenarios();

    randomizeQuizOptions();


    const state = {
      route: "home",
      activeModuleId: null,
      activeScreenIndex: 0,
      activePracticeLevel: null,
      answeredCorrect: false,
      data: loadData()
    };

    const pages = {
      home: document.getElementById("page-home"),
      path: document.getElementById("page-path"),
      reference: document.getElementById("page-reference"),
      settings: document.getElementById("page-settings"),
      analyzer: document.getElementById("page-analyzer"),
      consult: document.getElementById("page-consult"),
      map: document.getElementById("page-map"),
      progress: document.getElementById("page-progress"),
      lesson: document.getElementById("page-lesson")
    };

    const sidebar = document.getElementById("sidebar");
    const toast = document.getElementById("toast");

const audioState = {
  context: null,
  unlocked: false
};

function getAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioState.context) audioState.context = new AudioCtx();
  return audioState.context;
}

function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  audioState.unlocked = true;
}

function triggerHaptic(pattern = 8) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {}
}

function playTone({ frequency = 440, duration = 0.09, type = "sine", gain = 0.04, bendTo = null, when = 0 }) {
  const ctx = getAudioContext();
  if (!ctx) return;
  unlockAudio();

  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + when);
  if (bendTo !== null && bendTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, bendTo), ctx.currentTime + when + duration);
  }

  amp.gain.setValueAtTime(0.0001, ctx.currentTime + when);
  amp.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + when + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + when + duration);
  osc.connect(amp).connect(ctx.destination);
  osc.start(ctx.currentTime + when);
  osc.stop(ctx.currentTime + when + duration + 0.05);
}

function playSound(kind = "pop") {
  const ctx = getAudioContext();
  if (!ctx) return;
  unlockAudio();

  if (kind === "success") {
    playTone({ frequency: 523.25, duration: 0.08, type: "triangle", gain: 0.045 });
    playTone({ frequency: 659.25, duration: 0.08, type: "triangle", gain: 0.045, when: 0.08 });
    playTone({ frequency: 783.99, duration: 0.12, type: "triangle", gain: 0.05, when: 0.16 });
    triggerHaptic([12, 28, 12]);
    return;
  }

  if (kind === "error") {
    playTone({ frequency: 220, duration: 0.10, type: "sawtooth", gain: 0.035, bendTo: 170 });
    playTone({ frequency: 165, duration: 0.12, type: "sawtooth", gain: 0.032, bendTo: 120, when: 0.10 });
    triggerHaptic([18, 30, 18]);
    return;
  }

  if (kind === "pop") {
    playTone({ frequency: 430, duration: 0.05, type: "triangle", gain: 0.025, bendTo: 310 });
    playTone({ frequency: 260, duration: 0.03, type: "sine", gain: 0.018, when: 0.045 });
    triggerHaptic(5);
    return;
  }

  playTone({ frequency: 360, duration: 0.06, type: "sine", gain: 0.02, bendTo: 280 });
  triggerHaptic(4);
}

function celebratePulse() {
  document.body.classList.add("celebrate-flash");
  window.setTimeout(() => document.body.classList.remove("celebrate-flash"), 420);
}

const fxState = {
  burstTimer: null,
  navTimer: null
};

function spawnParticles({ x, y, kind = "success", count = 12 } = {}) {
  const colors = kind === "error"
    ? ["rgba(251,113,133,.95)", "rgba(248,113,113,.9)", "rgba(248,180,180,.9)"]
    : kind === "nav"
      ? ["rgba(163,255,18,.95)", "rgba(56,189,248,.9)", "rgba(255,255,255,.9)"]
      : ["rgba(163,255,18,.95)", "rgba(56,189,248,.9)", "rgba(255,255,255,.9)", "rgba(255,43,214,.82)"];

  const originX = Number.isFinite(x) ? x : window.innerWidth * .5;
  const originY = Number.isFinite(y) ? y : window.innerHeight * .25;

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    particle.className = "fx-particle";
    const spread = kind === "error" ? 130 : kind === "nav" ? 170 : 150;
    const angle = (Math.PI * 2 * i) / count + (Math.random() * .3);
    const distance = spread * (0.55 + Math.random() * 0.55);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance * (kind === "nav" ? .72 : .88) - (kind === "error" ? 18 : 10);
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.setProperty("--dx", `${dx.toFixed(1)}px`);
    particle.style.setProperty("--dy", `${dy.toFixed(1)}px`);
    particle.style.setProperty("--size", `${(4 + Math.random() * 7).toFixed(1)}px`);
    particle.style.setProperty("--particle", colors[i % colors.length]);
    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), 820);
  }
}

function flashNavigation(route) {
  document.body.classList.remove("nav-flash");
  void document.body.offsetWidth;
  document.body.classList.add("nav-flash");
  window.clearTimeout(fxState.navTimer);
  fxState.navTimer = window.setTimeout(() => document.body.classList.remove("nav-flash"), 520);
  spawnParticles({ x: window.innerWidth * .5, y: window.innerHeight * .14, kind: "nav", count: 10 });
}

function triggerShake() {
  document.body.classList.remove("fx-shake");
  void document.body.offsetWidth;
  document.body.classList.add("fx-shake");
  window.setTimeout(() => document.body.classList.remove("fx-shake"), 280);
}

function addButtonRipple(target, clientX, clientY) {
  if (!target || !target.getBoundingClientRect) return;
  const rect = target.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ui-ripple";
  ripple.style.left = `${clientX - rect.left}px`;
  ripple.style.top = `${clientY - rect.top}px`;
  const size = Math.max(rect.width, rect.height) * 1.45;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  target.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 620);
}

(function attachMotionFX() {
  const selector = "button, .btn, .home-action, .clean-module-row, .consult-card, .analyzer-choice-card, .map-option-btn, .lesson-flow-step, .lesson-visual-card, .mini, .reference-card, .settings-box, .cross-card, .formula-card, .map-metric-card, .lesson-screen";
  document.addEventListener("pointerdown", (event) => {
    const target = event.target?.closest?.(selector);
    if (!target) return;
    addButtonRipple(target, event.clientX, event.clientY);
  }, { passive: true });

  document.addEventListener("click", (event) => {
    const target = event.target?.closest?.(selector);
    if (!target) return;
    const kind = target.classList.contains("danger") || target.closest(".reset-progress-dialog") ? "error" : "nav";
    if (kind === "nav") {
      triggerHaptic(4);
    }
  }, { passive: true });
})();


    function getScaleLabel(level) {
      const labels = ["Mais compacto", "Compacto", "Médio", "Amplo", "Mais amplo"];
      return labels[Math.min(Math.max(Number(level) || 3, 1), 5) - 1] || labels[2];
    }

    function applyUiPreferences() {
      const theme = state.data.theme === "light" ? "light" : "dark";
      const level = Math.min(Math.max(Number(state.data.uiScaleLevel) || 3, 1), 5);
      document.body.classList.toggle("theme-light", theme === "light");
      document.body.classList.toggle("theme-dark", theme !== "light");
      for (let i = 1; i <= 5; i += 1) document.body.classList.toggle(`density-${i}`, i === level);
    }

    applyUiPreferences();

    function safeRender(label, fn) {
      try {
        if (typeof fn === "function") fn();
      } catch (error) {
        console.error(`Erro ao renderizar ${label}:`, error);
        handleRuntimeError(error);
      }
    }

    function handleRuntimeError(error) {
      try {
        console.error("Tabelingo runtime error:", error);
        const main = document.querySelector("main") || document.body;
        if (!main || document.getElementById("appErrorBox")) return;

        const message = error && error.message ? error.message : String(error || "Erro desconhecido");
        const box = document.createElement("div");
        box.id = "appErrorBox";
        box.className = "card lesson-screen";
        box.style.cssText = "margin:16px 0;border:1px solid rgba(251,113,133,.55);background:rgba(251,113,133,.10);position:relative;z-index:9999;";
        box.innerHTML = `
          <p class="micro">Correção automática</p>
          <h3>O Tabelingo encontrou um erro de carregamento, mas não vai fechar sozinho.</h3>
          <p class="lesson-text">Isso normalmente acontece por cache antigo do PWA ou dados salvos de uma versão anterior. Toque no botão abaixo para limpar cache e reabrir o app limpo.</p>
          <p class="small-note">Erro técnico: ${escapeHtml(message)}</p>
          <div class="lesson-actions">
            <button class="btn" type="button" id="clearAppCacheBtn">Limpar cache e reabrir ✅</button>
          </div>
        `;
        main.prepend(box);

        document.getElementById("clearAppCacheBtn")?.addEventListener("click", async () => {
          try { localStorage.removeItem(STORAGE_KEY); } catch {}
          try {
            if ("serviceWorker" in navigator) {
              const regs = await navigator.serviceWorker.getRegistrations();
              await Promise.all(regs.map((reg) => reg.unregister()));
            }
          } catch {}
          try {
            if (window.caches) {
              const keys = await caches.keys();
              await Promise.all(keys.map((key) => caches.delete(key)));
            }
          } catch {}
          window.location.reload();
        });
      } catch (fallbackError) {
        console.error("Falha ao mostrar recuperação do app:", fallbackError);
      }
    }

    document.getElementById("menuBtn")?.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      playSound("pop");
    });

    ["pointerdown", "touchstart", "keydown"].forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { passive: true, once: true });
    });

    document.querySelectorAll("[data-route]").forEach((button) => {
      button.addEventListener("click", () => {
        playSound("pop");
        if (button.dataset.analyzerMode) {
          state.data.analyzerMode = button.dataset.analyzerMode;
          state.data.analyzerFlow = button.dataset.analyzerMode === "creatives" ? "creative-single" : "campaign-single";
          state.data.campaignEntryMethod = "";
          state.data.creativeEntryMethod = "";
          state.data.csvImportPreview = null;
          saveData();
        } else if (button.dataset.route === "analyzer") {
          state.data.analyzerMode = "hub";
          state.data.analyzerFlow = "hub";
          saveData();
        }
        goTo(button.dataset.route);
      });
    });

    function closeResetProgressDialog() {
      document.getElementById("resetProgressOverlay")?.remove();
    }

    function showResetProgressDialog() {
      closeResetProgressDialog();

      const overlay = document.createElement("div");
      overlay.id = "resetProgressOverlay";
      overlay.className = "reset-progress-overlay";
      overlay.innerHTML = `
        <div class="reset-progress-dialog" role="dialog" aria-modal="true" aria-labelledby="resetProgressTitle">
          <p class="micro">Confirmação necessária</p>
          <h3 id="resetProgressTitle">Tem certeza que deseja apagar todo o seu progresso?</h3>
          <p class="lesson-text">Digite <strong>APAGAR</strong> para habilitar a exclusão. Depois escolha <strong>Sim</strong> ou <strong>Não</strong>.</p>

          <label class="reset-progress-label" for="resetProgressInput">Escreva APAGAR para confirmar</label>
          <input id="resetProgressInput" class="reset-progress-input" type="text" inputmode="text" autocomplete="off" placeholder="APAGAR" />

          <div class="reset-progress-actions">
            <button class="btn secondary" type="button" id="resetProgressNoBtn">Não</button>
            <button class="btn danger" type="button" id="resetProgressYesBtn" disabled>Sim, apagar</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const input = overlay.querySelector("#resetProgressInput");
      const yesBtn = overlay.querySelector("#resetProgressYesBtn");
      const noBtn = overlay.querySelector("#resetProgressNoBtn");

      const sync = () => {
        const ready = String(input.value || "").trim().toUpperCase() === "APAGAR";
        yesBtn.disabled = !ready;
      };

      input.addEventListener("input", sync);
      input.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closeResetProgressDialog();
        }
        if (event.key === "Enter" && !yesBtn.disabled) {
          event.preventDefault();
          yesBtn.click();
        }
      });
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeResetProgressDialog();
      });
      noBtn.addEventListener("click", closeResetProgressDialog);
      yesBtn.addEventListener("click", () => {
        if (yesBtn.disabled) return;
        state.data.completedModules = [];
        state.data.moduleProgress = {};
        state.data.practiceProgress = {};
        state.data.assessmentProgress = {};
        state.data.xp = 0;
        saveData();
        renderAll();
        closeResetProgressDialog();
        showToast("Progresso zerado. Tudo limpo por aqui.", "pop");
      });

      setTimeout(() => input.focus(), 0);
    }

    document.getElementById("resetProgressBtn")?.addEventListener("click", () => {
      playSound("pop");
      triggerHaptic(6);
      showResetProgressDialog();
    });

    document.getElementById("saveTicketBtn")?.addEventListener("click", () => {
      const input = document.getElementById("settingsTicketInput");
      const value = parseMoney(input.value);
      if (!value || value <= 0) {
        showToast("Coloca um ticket válido. Exemplo: 79,90");
        return;
      }
      state.data.ticket = value;
      saveData();
      input.value = formatMoney(value);
      renderAll();
      showToast("Ticket médio salvo. Os módulos e análises que usam ticket já passam a considerar esse valor. ✅", "success");
    });

    document.getElementById("uiScaleRange")?.addEventListener("input", (event) => {
      state.data.uiScaleLevel = Math.min(Math.max(Number(event.target.value) || 3, 1), 5);
      saveData();
      applyUiPreferences();
      const liveScaleLabel = document.getElementById("uiScaleLabel");
      if (liveScaleLabel) liveScaleLabel.textContent = getScaleLabel(state.data.uiScaleLevel);
    });

    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        state.data.theme = button.dataset.themeChoice === "light" ? "light" : "dark";
        saveData();
        applyUiPreferences();
        renderSettings();
      });
    });

    // V8 Direct: não registra service worker. O app abre como site estático puro para evitar fechamento instantâneo em celular.

    function loadData() {
      const blank = {
        ticket: null,
        breakevenCpa: null,
        profitBeforeAds: null,
        realCpa: null,
        theme: "dark",
        uiScaleLevel: 3,
        analyzerMode: "hub",
        analyzerFlow: "hub",
        campaignAnalyzer: {},
        campaignWizardIndex: 0,
        campaignEntryMethod: "",
        latestCampaignResult: null,
        campaignCompare: { campaigns: [{}], wizardCampaignIndex: 0, wizardFieldIndex: 0 },
        creativeAnalyzer: { creatives: [{}], wizardCreativeIndex: 0, wizardFieldIndex: 0 },
        creativeEntryMethod: "",
        latestCreativeResult: null,
        csvImportPreview: null,
        completedModules: [],
        moduleProgress: {},
        practiceProgress: {},
        assessmentProgress: {},
        xp: 0
      };

      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return blank;
        const parsed = JSON.parse(raw);
        const creativeAnalyzer = parsed.creativeAnalyzer && typeof parsed.creativeAnalyzer === "object"
          ? parsed.creativeAnalyzer
          : { creatives: [{}], wizardCreativeIndex: 0, wizardFieldIndex: 0 };
        if (!Array.isArray(creativeAnalyzer.creatives) || !creativeAnalyzer.creatives.length) {
          creativeAnalyzer.creatives = [{}];
        }

        return {
          ...blank,
          ticket: Number(parsed.ticket) || null,
          breakevenCpa: Number(parsed.breakevenCpa) || null,
          profitBeforeAds: Number(parsed.profitBeforeAds) || null,
          realCpa: Number(parsed.realCpa) || null,
          theme: parsed.theme === "light" ? "light" : "dark",
          uiScaleLevel: (() => {
            const parsedLevel = Number(parsed.uiScaleLevel);
            return parsedLevel >= 1 && parsedLevel <= 5 ? parsedLevel : 3;
          })(),
          analyzerMode: ["campaign", "creatives", "hub"].includes(parsed.analyzerMode) ? parsed.analyzerMode : "hub",
          analyzerFlow: ["hub", "campaign-single", "campaign-result", "campaign-history", "campaign-compare", "creative-single", "creative-result", "creative-compare"].includes(parsed.analyzerFlow) ? parsed.analyzerFlow : "hub",
          campaignAnalyzer: parsed.campaignAnalyzer && typeof parsed.campaignAnalyzer === "object" ? parsed.campaignAnalyzer : {},
          campaignWizardIndex: Number.isFinite(Number(parsed.campaignWizardIndex)) ? Number(parsed.campaignWizardIndex) : 0,
          campaignEntryMethod: ["", "manual", "csv"].includes(parsed.campaignEntryMethod) ? parsed.campaignEntryMethod : "",
          latestCampaignResult: parsed.latestCampaignResult && typeof parsed.latestCampaignResult === "object" ? parsed.latestCampaignResult : null,
          campaignCompare: parsed.campaignCompare && typeof parsed.campaignCompare === "object" ? parsed.campaignCompare : { campaigns: [{}], wizardCampaignIndex: 0, wizardFieldIndex: 0 },
          creativeAnalyzer,
          creativeEntryMethod: ["", "manual", "csv"].includes(parsed.creativeEntryMethod) ? parsed.creativeEntryMethod : "",
          latestCreativeResult: parsed.latestCreativeResult && typeof parsed.latestCreativeResult === "object" ? parsed.latestCreativeResult : null,
          csvImportPreview: parsed.csvImportPreview && typeof parsed.csvImportPreview === "object" ? parsed.csvImportPreview : null,
          completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : [],
          moduleProgress: parsed.moduleProgress && typeof parsed.moduleProgress === "object" ? parsed.moduleProgress : {},
          practiceProgress: parsed.practiceProgress && typeof parsed.practiceProgress === "object" ? parsed.practiceProgress : {},
          assessmentProgress: parsed.assessmentProgress && typeof parsed.assessmentProgress === "object" ? parsed.assessmentProgress : {},
          xp: Number(parsed.xp) || 0
        };
      } catch {
        return blank;
      }
    }

    function saveData() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
      } catch (error) {
        console.warn("Não foi possível salvar no armazenamento local:", error);
        showToast?.("Não consegui salvar agora. O app continua funcionando, mas o progresso pode não ficar salvo.");
      }
    }

    function goTo(route) {
      try {
        if (!pages[route]) route = "home";
        state.route = route;
        Object.values(pages).forEach((page) => page?.classList.remove("active"));
        pages[route]?.classList.add("active");
        document.querySelectorAll("[data-route]").forEach((button) => {
          button.classList.toggle("active", button.dataset.route === route);
        });
        sidebar?.classList.remove("open");
        window.scrollTo({ top: 0, behavior: "smooth" });
        flashNavigation(route);

        if (route === "home") safeRender("início", renderHome);
        if (route === "path") safeRender("trilha", renderPath);
        if (route === "progress") safeRender("progresso", renderProgress);
        if (route === "settings") safeRender("configurações", renderSettings);
        if (route === "reference") safeRender("base do método", renderReferenceGuide);
        if (route === "analyzer") safeRender("analisador", () => renderAnalyzer());
        if (route === "consult") safeRender("consulta", renderConsult);
        if (route === "map") safeRender("mapa", renderSmartMap);
      } catch (error) {
        handleRuntimeError(error);
      }
    }


    function getModuleIndex(moduleId) {
      return MODULES.findIndex((item) => item.id === moduleId);
    }

    function isModuleCompleted(moduleId) {
      return state.data.completedModules.includes(moduleId);
    }

    function isModuleUnlocked(moduleId) {
      if (TEST_UNLOCK_ALL) return true;

      const index = getModuleIndex(moduleId);
      if (index <= 0) return true;
      if (isModuleCompleted(moduleId)) return true;

      const previous = MODULES[index - 1];
      return previous ? isModuleCompleted(previous.id) : false;
    }



    function getNextModule() {
      return MODULES.find((module) => !isModuleCompleted(module.id)) || MODULES[MODULES.length - 1];
    }

    function getUnlockedCount() {
      return MODULES.filter((module) => isModuleUnlocked(module.id)).length;
    }

    function getUnitProgress(unit) {
      const total = unit.moduleIds.length;
      const done = unit.moduleIds.filter((id) => isModuleCompleted(id)).length;
      return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
    }

    function startModule(moduleId) {
      const module = MODULES.find((item) => item.id === moduleId);
      if (!module) return;

      if (!isModuleUnlocked(moduleId)) {
        const index = getModuleIndex(moduleId);
        const previous = MODULES[index - 1];
        showToast(`Essa fase ainda está bloqueada 🔒 Primeiro conclua "${previous?.title || "a fase anterior"}".`);
        return;
      }

      state.activeModuleId = moduleId;
      state.activeScreenIndex = getSavedScreen(moduleId);
      state.activePracticeLevel = null;
      state.answeredCorrect = false;
      goTo("lesson");
      renderLessonScreen();
    }



    function getSavedScreen(moduleId) {
      const saved = Number(state.data.moduleProgress[moduleId] || 0);
      const module = MODULES.find((item) => item.id === moduleId);
      if (!module) return 0;
      return Math.min(Math.max(saved, 0), module.screens.length - 1);
    }

function getModulePercent(module) {
      if (module?.isPractice) {
        return getPracticeOverallPercent();
      }

      const saved = getSavedScreen(module.id);
      return Math.round((saved / Math.max(module.screens.length - 1, 1)) * 100);
    }

    function getPracticeOverallPercent() {
      const total = PRACTICE_LEVELS.reduce((sum, level) => sum + level.total, 0);
      const done = PRACTICE_LEVELS.reduce((sum, level) => {
        const progress = getPracticeProgress(level.id);
        return sum + (progress.completedOnce ? level.total : Math.min(progress.cursor || 0, level.total));
      }, 0);

      return total ? Math.round((done / total) * 100) : 0;
    }

    function isPracticeFullyCompleted() {
      return PRACTICE_LEVELS.every((level) => getPracticeProgress(level.id).completedOnce);
    }

    function setSavedScreen(moduleId, screenIndex) {
      state.data.moduleProgress[moduleId] = screenIndex;
      saveData();
    }

    function nextScreen() {
      const module = getActiveModule();
      if (!module) return;

      playSound("pop");
      const next = Math.min(state.activeScreenIndex + 1, module.screens.length - 1);
      state.activeScreenIndex = next;
      state.answeredCorrect = false;
      setSavedScreen(module.id, next);
      renderLessonScreen();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function previousScreen() {
      const module = getActiveModule();
      if (!module) return;
      playSound("pop");
      state.activeScreenIndex = Math.max(state.activeScreenIndex - 1, 0);
      state.answeredCorrect = false;
      setSavedScreen(module.id, state.activeScreenIndex);
      renderLessonScreen();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function getActiveModule() {
      return MODULES.find((item) => item.id === state.activeModuleId);
    }

    function completeModule(module) {
      if (!state.data.completedModules.includes(module.id)) {
        state.data.completedModules.push(module.id);
        const completeScreen = module.screens.find((screen) => screen.type === "complete");
        state.data.xp += Number(completeScreen?.xp || module.xp || 0);
      }
      state.data.moduleProgress[module.id] = module.screens.length - 1;
      saveData();
      renderAll();
      showToast("Módulo concluído. XP salvo. 🔥", "success");
      celebratePulse();
      goTo("path");
    }

    function renderAll() {
      // Renderização leve na abertura: evita travar/fechar em celular ao montar telas pesadas escondidas.
      safeRender("início", renderHome);
      safeRender("configurações", renderSettings);

      if (state.route === "path") safeRender("trilha", renderPath);
      if (state.route === "progress") safeRender("progresso", renderProgress);
      if (state.route === "reference") safeRender("base do método", renderReferenceGuide);
      if (state.route === "analyzer") safeRender("analisador", () => renderAnalyzer());
      if (state.route === "consult") safeRender("consulta", renderConsult);
      if (state.route === "map") safeRender("mapa", renderSmartMap);
    }

    function renderHome() {
      const total = MODULES.length;
      const done = state.data.completedModules.length;
      const percent = total ? Math.round((done / total) * 100) : 0;

      document.getElementById("statModules").textContent = total;
      document.getElementById("statDone").textContent = done;
      document.getElementById("statXp").textContent = state.data.xp;
      document.getElementById("percent").textContent = `${percent}%`;
      document.getElementById("meter").style.setProperty("--deg", `${percent * 3.6}deg`);
    }


    function renderPath() {
      const root = document.getElementById("pathList");
      const total = MODULES.length;
      const doneCount = state.data.completedModules.length;
      const nextModule = getNextModule();

      const getNodeIcon = (module, index, done) => {
        if (done) return "✓";
        if (module.isAssessment) return "🧪";
        if (module.id === "mentalidade-escala") return "🧠";
        if (module.id === "diagnostico-cruzado") return "🧩";
        if (module.id === "treino-diagnostico") return "⚔️";
        if (module.id.includes("cpa") || module.id.includes("roas") || module.id.includes("lucro") || module.id.includes("ticket") || module.id.includes("aov")) return "💰";
        if (module.id.includes("rastreamento") || module.id.includes("volume") || module.id.includes("orcamento")) return "🔎";
        return "★";
      };

      const getNodeLabel = (module) => {
        if (module.isAssessment) {
          const match = module.id.match(/prova-unidade-(\d+)/);
          return `Prova U${match ? match[1] : ""}`;
        }
        return module.title
          .split(":")[0]
          .replace("por que ninguém clica?", "CTR")
          .replace("olha tudo antes de fazer decisão ruim", "Checklist")
          .replace("dá pra confiar nesse número?", "Volume")
          .replace("verba não é brinquedo", "Orçamento")
          .replace("quando os números estão mentindo", "Tracking")
          .trim();
      };

      const buildPath = (points) => {
        if (!points.length) return "";
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const midY = (prev.y + curr.y) / 2;
          d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
        }
        return d;
      };

      const unitsHtml = TRACK_UNITS.map((unit, unitIndex) => {
        const progress = getUnitProgress(unit);
        const rowGap = 122;
        const topPad = 86;
        const bottomPad = 58;
        const height = topPad + Math.max(unit.moduleIds.length - 1, 0) * rowGap + bottomPad;
        const xPattern = unit.moduleIds.length === 1 ? [50] : [50, 30, 68, 38, 62, 28, 72, 50, 36];
        const points = unit.moduleIds.map((moduleId, localIndex) => ({ x: xPattern[localIndex % xPattern.length], y: topPad + localIndex * rowGap }));
        const pathD = buildPath(points);
        const modulesHtml = unit.moduleIds.map((moduleId, localIndex) => {
          const module = MODULES.find((item) => item.id === moduleId);
          if (!module) return "";
          const globalIndex = getModuleIndex(module.id);
          const point = points[localIndex];
          const done = isModuleCompleted(module.id);
          const unlocked = isModuleUnlocked(module.id);
          const current = module.id === nextModule?.id && !done;
          const isArena = module.id === "treino-diagnostico";
          const icon = getNodeIcon(module, globalIndex, done);
          const label = getNodeLabel(module);
          return `
            <div class="duo-stone ${done ? "done" : ""} ${current ? "current" : ""} ${module.isAssessment ? "assessment" : ""} ${isArena ? "arena" : ""} ${unlocked ? "unlocked" : "locked"}" style="left:${point.x}%; top:${point.y}px;" data-current-node="${current ? "true" : "false"}">
              <button class="duo-stone-btn" type="button" data-start-module="${module.id}" aria-label="Abrir ${escapeHtml(module.title)}"><span class="duo-stone-shine"></span><span class="duo-stone-icon">${icon}</span></button>
              <button class="duo-stone-name" type="button" data-start-module="${module.id}">${escapeHtml(label)}</button>
              <span class="duo-stone-meta">${module.isAssessment ? "PROVA" : `${module.estimatedMinutes} MIN`}</span>
            </div>`;
        }).join("");
        return `
          <section class="duo-map-shell duo-unit" data-unit-index="${unitIndex}">
            <div class="duo-unit-card unit-${unitIndex % 6}">
              <div class="duo-unit-badge">${unit.emoji}</div>
              <div><p>${escapeHtml(unit.label)}</p><h3>${escapeHtml(unit.title)}</h3><span>${escapeHtml(unit.subtitle)}</span></div>
              <div class="duo-unit-progress"><strong>${progress.done}/${progress.total}</strong><div class="bar"><div class="bar-fill" style="width:${progress.percent}%"></div></div></div>
            </div>
            <div class="duo-road" style="height:${height}px;">
              <svg class="duo-road-svg" viewBox="0 0 100 ${height}" preserveAspectRatio="none"><defs><linearGradient id="duoRoad-${unit.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1cb0f6" /><stop offset="50%" stop-color="#58cc02" /><stop offset="100%" stop-color="#ffc800" /></linearGradient></defs><path class="duo-road-glow" d="${pathD}" stroke="url(#duoRoad-${unit.id})"></path><path class="duo-road-line" d="${pathD}"></path></svg>
              ${modulesHtml}
              ${unitIndex % 2 === 0 ? `<div class="duo-character char-${unitIndex % 4}">${["🦉","🧌","🤖","🐉"][unitIndex % 4]}</div>` : ""}
            </div>
          </section>`;
      }).join("");
      root.innerHTML = unitsHtml;
      root.querySelectorAll("[data-start-module]").forEach((button) => button.addEventListener("click", () => startModule(button.dataset.startModule)));
      setTimeout(() => scrollToCurrentPathNode(), 80);
      setTimeout(() => scrollToCurrentPathNode(), 360);
      setTimeout(() => scrollToCurrentPathNode(), 900);
    }

    function scrollToCurrentPathNode() {
      if (state.route !== "path") return;
      const root = document.getElementById("pathList");
      const current = root?.querySelector('.duo-stone.current') || root?.querySelector('.duo-stone.unlocked:not(.done)') || root?.querySelector('.duo-stone');
      if (!current) return;
      const rect = current.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const offset = window.innerWidth <= 900 ? 120 : 90;
      window.scrollTo({ top: Math.max(0, absoluteTop - offset), behavior: "smooth" });
    }


    function renderProgress() {
      const total = MODULES.length;
      const done = state.data.completedModules.length;

      document.getElementById("progressModules").textContent = total;
      document.getElementById("progressDone").textContent = done;
      document.getElementById("progressXp").textContent = state.data.xp;

      const root = document.getElementById("progressList");
      root.innerHTML = MODULES.map((module, index) => {
        const completed = isModuleCompleted(module.id);
        const unlocked = isModuleUnlocked(module.id);
        const percent = getModulePercent(module);

        return `
          <article class="module-node ${unlocked ? "" : "locked"}">
            <div class="node-badge ${completed ? "" : unlocked ? "" : "locked"}">${completed ? "✓" : unlocked ? index + 1 : "🔒"}</div>
            <div>
              <h4>${escapeHtml(module.title)}</h4>
              <p>${completed ? "Concluído e XP recebido." : unlocked ? `Liberado para teste • ${percent}% feito` : "Bloqueado até concluir a fase anterior."}</p>
            </div>
            <span class="tag">${completed ? "+" + module.xp + " XP" : unlocked ? "trilha" : "bloqueado"}</span>
          </article>
        `;
      }).join("");
    }


    const ANALYZER_FIELDS = [
      { key: "spend", label: "Gasto", placeholder: "Ex: 150", hint: "Quanto foi investido na campanha." },
      { key: "revenue", label: "Receita", placeholder: "Ex: 420", hint: "Receita atribuída à campanha." },
      { key: "sales", label: "Compras", placeholder: "Ex: 6", hint: "Quantidade de vendas." },
      { key: "clicks", label: "Cliques no link", placeholder: "Ex: 800", hint: "Cliques que saíram do anúncio." },
      { key: "pageViews", label: "Visualizações da página", placeholder: "Ex: 640", hint: "Quantas pessoas realmente carregaram a página." },
      { key: "checkouts", label: "Inícios de checkout", placeholder: "Ex: 96", hint: "Pessoas que começaram o checkout." },
      { key: "impressions", label: "Impressões", placeholder: "Ex: 25000", hint: "Usado para calcular CPM e CTR." },
      { key: "cpc", label: "CPC", placeholder: "Ex: 0,75", hint: "Opcional. Se tiver gasto e cliques, o app calcula." },
      { key: "cpm", label: "CPM", placeholder: "Ex: 18", hint: "Opcional. Se tiver gasto e impressões, o app calcula." },
      { key: "ctr", label: "CTR %", placeholder: "Ex: 1,8", hint: "Opcional. Se tiver cliques e impressões, o app calcula." },
      { key: "viewRate", label: "Taxa de Visualização %", placeholder: "Ex: 82", hint: "Opcional. Página ÷ cliques × 100." },
      { key: "pvIc", label: "PV–IC %", placeholder: "Ex: 18", hint: "Opcional. Checkouts ÷ visualizações × 100." },
      { key: "icPurchase", label: "IC–Compras %", placeholder: "Ex: 38", hint: "Opcional. Compras ÷ checkouts × 100." },
      { key: "cpa", label: "CPA", placeholder: "Ex: 25", hint: "Opcional. Gasto ÷ compras." },
      { key: "roas", label: "ROAS", placeholder: "Ex: 2,4", hint: "Opcional. Receita ÷ gasto. ROI é lucro ÷ investimento, tratado nas aulas." },
      { key: "ticket", label: "Ticket médio", placeholder: "Ex: 79,90", hint: "Opcional. Receita ÷ compras, se tiver dados." },
      { key: "maxCpa", label: "CPA máximo / margem", placeholder: "Ex: 32", hint: "Quanto você pode pagar por venda sem apertar a conta." },
      { key: "frequency", label: "Frequência", placeholder: "Ex: 2,1", hint: "Opcional. Ajuda a perceber fadiga do anúncio." }
    ];


    const CAMPAIGN_COMPARISON_FIELDS = [
      { key: "name", label: "Nome da campanha", placeholder: "Ex: Campanha 01 - broad", hint: "Use um nome simples para comparar depois.", type: "text" },
      ...ANALYZER_FIELDS
    ];

    const CREATIVE_ANALYZER_FIELDS = [
      { key: "name", label: "Nome do anúncio", placeholder: "Ex: Anúncio 01 - gancho da dor", hint: "Coloque um nome simples para comparar depois.", type: "text" },
      { key: "angle", label: "Ângulo / gancho", placeholder: "Ex: dor, prova, comparação", hint: "Opcional. Ajuda você lembrar qual ideia foi testada.", type: "text" },
      { key: "spend", label: "Gasto", placeholder: "Ex: 50", hint: "Quanto esse criativo consumiu de verba." },
      { key: "revenue", label: "Receita", placeholder: "Ex: 180", hint: "Receita atribuída a esse criativo." },
      { key: "sales", label: "Compras", placeholder: "Ex: 3", hint: "Quantidade de vendas atribuídas." },
      { key: "impressions", label: "Impressões", placeholder: "Ex: 12000", hint: "Quantas vezes o criativo apareceu." },
      { key: "clicks", label: "Cliques no link", placeholder: "Ex: 240", hint: "Cliques gerados pelo criativo." },
      { key: "pageViews", label: "Visualizações da página", placeholder: "Ex: 190", hint: "Opcional. Mede se o clique virou página carregada." },
      { key: "checkouts", label: "Inícios de checkout", placeholder: "Ex: 28", hint: "Opcional. Mede se a página levou para checkout." },
      { key: "ctr", label: "CTR %", placeholder: "Ex: 1,8", hint: "Opcional. Se tiver cliques e impressões, o app calcula." },
      { key: "cpc", label: "CPC", placeholder: "Ex: 0,72", hint: "Opcional. Se tiver gasto e cliques, o app calcula." },
      { key: "cpm", label: "CPM", placeholder: "Ex: 18", hint: "Opcional. Se tiver gasto e impressões, o app calcula." },
      { key: "hookRate", label: "Taxa de gancho / 3s %", placeholder: "Ex: 32", hint: "Opcional. Use quando a plataforma mostrar retenção inicial." },
      { key: "retention", label: "Retenção média %", placeholder: "Ex: 18", hint: "Opcional. Ajuda a ler se a pessoa está assistindo." },
      { key: "frequency", label: "Frequência", placeholder: "Ex: 2,4", hint: "Opcional. Ajuda a perceber cansaço do público." }
    ];

    const SMART_MAP_ROWS = [
      { metric: "CPC", result: "Menor que R$ 1", status: "Bom", action: "Avaliar as demais métricas. Clique barato é bom, mas sozinho não libera escala." },
      { metric: "CPC", result: "Entre R$ 1 e R$ 2", status: "Atenção", action: "Monitorar com CPM, CTR e ROI. Pode funcionar se o funil compensar." },
      { metric: "CPC", result: "Acima de R$ 2", status: "Pesado", action: "Revisar criativo, público e ângulo antes de aumentar orçamento." },
      { metric: "CPM", result: "Menor que R$ 20", status: "Bom", action: "Avaliar qualidade do clique e seguir para taxa de visualização." },
      { metric: "CPM", result: "Entre R$ 20 e R$ 60", status: "Atenção", action: "Campanha pode funcionar, mas precisa cruzar com CPC, CTR e ROI." },
      { metric: "CPM", result: "Acima de R$ 60", status: "Ruim", action: "Público competitivo ou criativo fraco. Testar novos criativos e públicos." },
      { metric: "Taxa de Visualização", result: "Abaixo de 75%", status: "Ruim", action: "Corrigir velocidade, promessa do anúncio, link, público e rastreamento." },
      { metric: "Taxa de Visualização", result: "75% a 85%", status: "Boa", action: "Monitorar e continuar olhando PV–IC." },
      { metric: "Taxa de Visualização", result: "85% a 100%", status: "Muito boa", action: "A chegada está saudável. Agora olhe página e checkout." },
      { metric: "PV–IC", result: "Abaixo de 15%", status: "Página fraca", action: "Ajustar promessa, headline, prova social, CTA, oferta e clareza da página." },
      { metric: "PV–IC", result: "15% a 20%", status: "Morno", action: "Melhorar página e oferta antes de escalar com força." },
      { metric: "PV–IC", result: "20% ou mais", status: "Saudável", action: "A página está conduzindo. Validar checkout e CPA." },
      { metric: "IC–Compras", result: "Abaixo de 25%", status: "Fuga forte", action: "Simplificar checkout, reforçar garantia, prova social, pagamento e confiança." },
      { metric: "IC–Compras", result: "25% a 39%", status: "Existe objeção", action: "Revisar fricção, taxas, parcelamento, método de pagamento e confiança." },
      { metric: "IC–Compras", result: "40% ou mais", status: "Saudável", action: "Checkout está bom. Agora confira CPA, margem e ROAS." },
      { metric: "CPA", result: "Abaixo do ponto de equilíbrio", status: "Bom", action: "Pode testar escala controlada se o restante do funil estiver saudável." },
      { metric: "CPA", result: "Acima do ponto de equilíbrio", status: "Perigoso", action: "Não escalar. Ajustar oferta, ticket, criativo, público ou conversão." },
      { metric: "ROAS", result: "Abaixo de 1", status: "Prejuízo", action: "Pausar, reduzir ou ajustar. Escalar aqui só aumenta o problema. ROI precisa considerar lucro, não só receita." },
      { metric: "ROAS", result: "Entre 1 e 2", status: "Ajustável", action: "Monitorar e melhorar gargalos. Pode estar perto, mas ainda exige cuidado. Confirme CPA e margem." },
      { metric: "ROAS", result: "Acima de 2", status: "Bom sinal", action: "Pode ser escalável se CPA, margem, volume e funil confirmarem. Não confunda ROAS com lucro líquido." },
      { metric: "ROI", result: "Lucro líquido ÷ investimento", status: "Métrica financeira", action: "Use quando quiser enxergar retorno com lucro real, depois de custos, produto, taxas e tráfego." }
    ];

    const CROSS_DIAGNOSIS_ROWS = [
      { scenario: "CPC bom + Taxa de Visualização baixa", diagnosis: "O anúncio chama atenção, mas o clique não vira página carregada.", action: "Revisar promessa, velocidade, público, link e tracking." },
      { scenario: "CPC bom + Visualização boa + PV–IC baixo", diagnosis: "Tráfego chega, mas a página/oferta não convence.", action: "Melhorar headline, benefício, prova social, CTA, garantia e clareza." },
      { scenario: "PV–IC bom + IC–Compras baixo", diagnosis: "Página convence, mas o checkout trava.", action: "Simplificar checkout, reforçar confiança e oferecer pagamentos adequados." },
      { scenario: "Tudo saudável + CPA alto", diagnosis: "O funil funciona, mas a conta financeira não fecha.", action: "Testar upsell, kit, aumento de ticket, oferta melhor ou público mais barato." },
      { scenario: "CTR baixo + PV–IC alto", diagnosis: "Pouca gente clica, mas quem clica tem qualidade.", action: "Testar novos criativos, ganchos e alcance sem mexer no que já converte." }
    ];


    const ANALYZER_FIELD_HELP = {
      spend: { ask: "Quanto você gastou até agora?", unit: "money", min: 0, max: 5000, step: 1, what: "Gasto é quanto saiu de verba nessa campanha ou criativo.", where: "No gerenciador de anúncios, procure por Gasto, Valor gasto ou Cost." },
      revenue: { ask: "Qual foi a receita atribuída?", unit: "money", min: 0, max: 20000, step: 1, what: "Receita é o valor de vendas atribuído à campanha/criativo.", where: "Veja em Receita, Valor de conversão ou Vendas atribuídas. Use a mesma janela de tempo do gasto." },
      sales: { ask: "Quantas compras saíram?", unit: "integer", min: 0, max: 300, step: 1, what: "Compras é a quantidade de pedidos finalizados.", where: "Procure por Compras, Orders, Purchase ou Finalizações de compra." },
      clicks: { ask: "Quantos cliques no link teve?", unit: "integer", min: 0, max: 50000, step: 1, what: "Cliques no link são cliques que tentaram levar a pessoa para a página/produto.", where: "Use Cliques no link, não todos os cliques do anúncio." },
      pageViews: { ask: "Quantas visualizações da página teve?", unit: "integer", min: 0, max: 50000, step: 1, what: "Mostra quantos cliques realmente viraram carregamento da página.", where: "Procure por Visualização da página de destino, ViewContent, LPV ou Page views." },
      checkouts: { ask: "Quantos inícios de checkout teve?", unit: "integer", min: 0, max: 10000, step: 1, what: "Início de checkout mostra quantas pessoas avançaram para pagar.", where: "Procure por Initiate Checkout, IC ou Inícios de finalização de compra." },
      impressions: { ask: "Quantas impressões teve?", unit: "integer", min: 0, max: 500000, step: 10, what: "Impressões é quantas vezes o anúncio apareceu.", where: "Fica nas métricas básicas do anúncio/campanha." },
      cpc: { ask: "Qual foi o CPC?", unit: "money", min: 0, max: 10, step: 0.01, what: "CPC é o custo médio por clique.", where: "Pode preencher se a plataforma já mostra CPC. Se tiver gasto e cliques, o app calcula sozinho." },
      cpm: { ask: "Qual foi o CPM?", unit: "money", min: 0, max: 200, step: 0.5, what: "CPM é o custo por mil impressões.", where: "Pode preencher se a plataforma já mostra CPM. Se tiver gasto e impressões, o app calcula." },
      ctr: { ask: "Qual foi o CTR?", unit: "percent", min: 0, max: 20, step: 0.1, what: "CTR é a porcentagem de impressões que viraram clique.", where: "Use CTR de link quando existir. Se tiver cliques e impressões, o app calcula." },
      viewRate: { ask: "Qual foi a Taxa de Visualização?", unit: "percent", min: 0, max: 100, step: 0.5, what: "É a ponte entre clique e página carregada.", where: "Se você tiver cliques e visualizações da página, toque em Continuar sem mexer na régua: o app calcula." },
      pvIc: { ask: "Qual foi o PV–IC?", unit: "percent", min: 0, max: 100, step: 0.5, what: "PV–IC mede quantas visualizações da página viraram início de checkout.", where: "Se tiver visualizações e checkouts, toque em Continuar sem mexer na régua: o app calcula." },
      icPurchase: { ask: "Qual foi o IC–Compras?", unit: "percent", min: 0, max: 100, step: 0.5, what: "IC–Compras mede quantos checkouts viraram compra.", where: "Se tiver checkouts e compras, toque em Continuar sem mexer na régua: o app calcula." },
      cpa: { ask: "Qual foi o CPA?", unit: "money", min: 0, max: 500, step: 0.5, what: "CPA é quanto você pagou por compra.", where: "Se tiver gasto e compras, toque em Continuar sem mexer na régua: o app calcula." },
      roas: { ask: "Qual foi o ROAS?", unit: "decimal", min: 0, max: 10, step: 0.1, what: "ROAS é receita dividida pelo gasto. Não é ROI, porque não considera lucro líquido.", where: "Se tiver receita e gasto, toque em Continuar sem mexer na régua: o app calcula." },
      ticket: { ask: "Qual é o ticket médio?", unit: "money", min: 0, max: 3000, step: 1, what: "Ticket médio é quanto entra, em média, por compra.", where: "Pode usar receita dividida por compras ou o valor médio do produto/kit." },
      maxCpa: { ask: "Qual é seu CPA máximo/ponto de equilíbrio?", unit: "money", min: 0, max: 1000, step: 1, what: "É o máximo que você pode pagar por venda sem apertar a conta.", where: "Use sua margem antes do tráfego ou o limite definido no módulo de ponto de equilíbrio." },
      frequency: { ask: "Qual foi a frequência?", unit: "decimal", min: 0, max: 10, step: 0.1, what: "Frequência mostra quantas vezes, em média, cada pessoa viu o anúncio.", where: "Normalmente aparece como Frequência no gerenciador de anúncios." },
      name: { ask: "Qual é o nome?", unit: "text", what: "Use um nome simples para lembrar depois.", where: "Exemplo: Campanha 01 - broad ou Anúncio 01 - gancho da dor." },
      angle: { ask: "Qual foi o ângulo ou gancho?", unit: "text", what: "Ajuda a comparar ideias, não só números.", where: "Exemplo: dor, prova social, comparação, desejo, oferta ou CTA." },
      hookRate: { ask: "Qual foi a taxa de gancho/3s?", unit: "percent", min: 0, max: 100, step: 0.5, what: "Mede se o começo do vídeo prendeu atenção.", where: "Use quando a plataforma mostrar retenção nos 3 primeiros segundos." },
      retention: { ask: "Qual foi a retenção média?", unit: "percent", min: 0, max: 100, step: 0.5, what: "Mostra quanto do vídeo as pessoas assistiram, em média.", where: "Use a métrica de retenção média do criativo/vídeo." }
    };

    function getFieldHelp(field) {
      return ANALYZER_FIELD_HELP[field.key] || { ask: field.label, unit: "decimal", min: 0, max: 100, step: 1, what: field.hint || "Informe o dado se tiver.", where: "Procure essa métrica no painel da plataforma." };
    }

    function getWizardValue(raw, key) {
      return raw && raw[key] !== undefined && raw[key] !== null ? String(raw[key]) : "";
    }

    function formatWizardDisplay(value, help) {
      const n = parseMoney(String(value ?? ""));
      if (!hasNumber(n)) return "";
      if (help.unit === "money") return String(n).replace(".", ",");
      if (help.unit === "percent") return String(n).replace(".", ",");
      if (help.unit === "integer") return String(Math.round(n));
      return String(n).replace(".", ",");
    }


    function buildMetricPickerHtml({ field, help, saved }) {
      const parsed = parseMoney(saved);
      const min = Number(help.min ?? 0);
      const max = Number(help.max ?? 100);
      const step = Number(help.step ?? 1);
      const hasSaved = hasNumber(parsed);
      const initial = hasSaved ? Math.min(Math.max(Number(parsed), min), max) : min;
      const unit = help.unit || "decimal";
      const hiddenValue = hasSaved ? escapeHtml(formatPickerRaw(initial, unit, step)) : "";
      return `<div class="metric-picker" data-metric-picker data-field-key="${escapeHtml(field.key)}" data-min="${min}" data-max="${max}" data-step="${step}" data-unit="${escapeHtml(unit)}" data-value="${initial}" data-empty="${hasSaved ? "false" : "true"}"><input data-wizard-input type="hidden" value="${hiddenValue}" /><div class="picker-value" data-picker-value>${escapeHtml(formatPickerDisplay(initial, unit, step))}</div><div class="picker-window" data-picker-window aria-label="Régua para ${escapeHtml(field.label)}"><div class="picker-track" data-picker-track></div><div class="picker-center-line" aria-hidden="true"></div></div><div class="picker-range-meta"><span>${escapeHtml(formatPickerDisplay(min, unit, step))}</span><span>${escapeHtml(formatPickerDisplay(max, unit, step))}</span></div><p class="picker-help-text">Arraste a régua para esquerda ou direita. O valor selecionado fica sempre no centro.</p></div>`;
    }

    function buildWizardStepHtml({ fields, raw, stepIndex, title, subtitle, scope = "campaign" }) {
      const total = fields.length;
      const safeIndex = Math.min(Math.max(Number(stepIndex) || 0, 0), total - 1);
      const field = fields[safeIndex];
      const help = getFieldHelp(field);
      const progress = Math.round(((safeIndex + 1) / total) * 100);
      let saved = getWizardValue(raw, field.key);
      if (saved === "" && field.key === "ticket" && hasNumber(state.data.ticket)) saved = formatWizardDisplay(state.data.ticket, help);
      if (saved === "" && field.key === "maxCpa" && hasNumber(state.data.breakevenCpa)) saved = formatWizardDisplay(state.data.breakevenCpa, help);
      const isText = help.unit === "text" || field.type === "text";
      const inputMode = help.unit === "integer" ? "numeric" : help.unit === "text" ? "text" : "decimal";
      const placeholder = field.placeholder || (help.unit === "money" ? "Ex: 79,90" : help.unit === "percent" ? "Ex: 18,5" : "Digite aqui");
      const controlHtml = isText ? `<input class="wizard-text-only" data-wizard-input type="text" inputmode="${inputMode}" placeholder="${escapeHtml(placeholder)}" value="${escapeHtml(saved)}" />` : buildMetricPickerHtml({ field, help, saved });
      return `<div class="wizard-shell picker-wizard" data-wizard-scope="${scope}" data-wizard-field="${field.key}" data-wizard-index="${safeIndex}"><div class="wizard-progress-card compact-progress"><div class="wizard-progress-row"><strong>${escapeHtml(title)}</strong><span>Informação ${safeIndex + 1} de ${total}</span></div><div class="wizard-bar"><div style="width:${progress}%"></div></div></div><div class="card lesson-screen wizard-question clean-question-screen"><p class="micro">${escapeHtml(subtitle)}</p><h3>${escapeHtml(help.ask || field.label)}</h3><p class="lesson-text concise-hint">${escapeHtml(field.hint || help.what || "Preencha esse dado se tiver. Se não souber, toque em Continuar sem mexer na régua; o app tenta calcular com os outros dados.")}</p><div class="wizard-input-wrap picker-input-wrap">${controlHtml}</div><div class="wizard-actions inline-actions"><button class="btn secondary" type="button" data-wizard-prev>Voltar</button><button class="btn" type="button" data-wizard-next>${safeIndex + 1 === total ? "Finalizar" : "Continuar"}</button></div><div class="wizard-helper compact-helper helper-below-actions"><details><summary>O que é isso?</summary><p>${escapeHtml(help.what || field.hint || "É uma métrica usada na leitura do funil.")}</p></details><details><summary>Onde encontrar?</summary><p>${escapeHtml(help.where || "Normalmente fica no painel da campanha, conjunto de anúncios ou criativo.")}</p></details></div></div></div>`;
    }

    function wireWizardControls({ container, fields, raw, stepIndex, onSaveRaw, onSetStep, onFinish }) {
      const shell = container?.querySelector("[data-wizard-field]");
      if (!shell) return;
      const fieldKey = shell.dataset.wizardField;
      const input = container.querySelector("[data-wizard-input]");
      setupMetricPickers(container);
      const saveVisibleValue = () => {
        const nextRaw = { ...(raw || {}) };
        if (input && input.value.trim() !== "") nextRaw[fieldKey] = input.value.trim();
        else delete nextRaw[fieldKey];
        onSaveRaw(nextRaw);
        return nextRaw;
      };
      input?.addEventListener("input", () => saveVisibleValue());
      const saveCurrent = () => saveVisibleValue();
      container.querySelector("[data-wizard-prev]")?.addEventListener("click", () => { saveCurrent(); onSetStep(Math.max((Number(stepIndex) || 0) - 1, 0)); });
      container.querySelector("[data-wizard-next]")?.addEventListener("click", () => { const nextRaw = saveCurrent(); const next = (Number(stepIndex) || 0) + 1; if (next >= fields.length) onFinish(nextRaw); else onSetStep(next); });
    }

    function formatPickerRaw(value, unit, step = 1) { const n = Number(value); if (!Number.isFinite(n)) return ""; if (unit === "integer") return String(Math.round(n)); const decimals = getDecimals(step); return n.toFixed(decimals).replace(".", ","); }
    function formatPickerDisplay(value, unit, step = 1) { const raw = formatPickerRaw(value, unit, step); if (unit === "money") return `R$ ${raw}`; if (unit === "percent") return `${raw}%`; return raw; }
    function getDecimals(step) { const text = String(step); return text.includes(".") ? Math.min(text.split(".")[1].length, 3) : 0; }
    function getSpeedMultiplier(speedPxMs, totalSteps = 100) {
      const steps = Math.max(1, Number(totalSteps) || 1);
      if (speedPxMs < 0.10) return 1;
      if (speedPxMs < 0.25) return 2;
      if (speedPxMs < 0.55) return 4;
      if (speedPxMs < 1.00) return 8;
      if (speedPxMs < 1.80) return Math.min(Math.max(12, steps / 300), 35);
      return Math.min(Math.max(25, steps / 120), 120);
    }

    function setupMetricPickers(scope = document) {
      scope.querySelectorAll("[data-metric-picker]").forEach((picker) => {
        if (picker.dataset.ready === "true") return;
        picker.dataset.ready = "true";

        const min = Number(picker.dataset.min || 0);
        const max = Number(picker.dataset.max || 100);
        const step = Number(picker.dataset.step || 1);
        const unit = picker.dataset.unit || "decimal";
        const fieldKey = picker.dataset.fieldKey || "";
        const input = picker.querySelector("[data-wizard-input]");
        const valueEl = picker.querySelector("[data-picker-value]");
        const track = picker.querySelector("[data-picker-track]");
        const windowEl = picker.querySelector("[data-picker-window]");
        const tickPx = 14;
        const visualTickStep = getPickerTickStep(min, max, step);
        const totalSteps = Math.max(1, (max - min) / Math.max(Math.abs(step), 0.000001));

        let value = clampNumber(Number(picker.dataset.value || min), min, max);
        let preciseValue = value;
        let hasUserValue = picker.dataset.empty !== "true";
        let dragging = false;
        let lastX = 0;
        let lastTime = 0;
        let lastVelocity = 0;
        let inertiaFrame = null;
        let savedBodyOverflow = "";
        let savedHtmlOverflow = "";
        let savedBodyTouchAction = "";
        let savedHtmlTouchAction = "";
        let savedHtmlOverscroll = "";
        let scrollLocked = false;

        const preventNativeScroll = (event) => {
          if (!dragging && !scrollLocked) return;
          if (event.cancelable) event.preventDefault();
        };

        const lockVerticalScroll = () => {
          if (scrollLocked) return;
          scrollLocked = true;
          savedBodyOverflow = document.body.style.overflow;
          savedHtmlOverflow = document.documentElement.style.overflow;
          savedBodyTouchAction = document.body.style.touchAction;
          savedHtmlTouchAction = document.documentElement.style.touchAction;
          savedHtmlOverscroll = document.documentElement.style.overscrollBehavior;
          document.body.style.overflow = "hidden";
          document.documentElement.style.overflow = "hidden";
          document.body.style.touchAction = "none";
          document.documentElement.style.touchAction = "none";
          document.documentElement.style.overscrollBehavior = "none";
          document.addEventListener("touchmove", preventNativeScroll, { passive: false });
        };

        const unlockVerticalScroll = () => {
          if (!scrollLocked) return;
          scrollLocked = false;
          document.body.style.overflow = savedBodyOverflow;
          document.documentElement.style.overflow = savedHtmlOverflow;
          document.body.style.touchAction = savedBodyTouchAction;
          document.documentElement.style.touchAction = savedHtmlTouchAction;
          document.documentElement.style.overscrollBehavior = savedHtmlOverscroll;
          document.removeEventListener("touchmove", preventNativeScroll, { passive: false });
        };

        const cancelInertia = () => {
          if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
          inertiaFrame = null;
        };

        const snap = (n) => clampNumber(Math.round(n / step) * step, min, max);

        const setValue = (nextValue, dispatch = true, snapNow = false, markFilled = true) => {
          value = snapNow ? snap(nextValue) : clampNumber(nextValue, min, max);
          preciseValue = value;
          if (markFilled) {
            hasUserValue = true;
            picker.dataset.empty = "false";
          }
          picker.dataset.value = String(value);
          picker.classList.remove("picker-good", "picker-warn", "picker-bad", "picker-neutral");
          picker.classList.add(getPickerStatusClass(fieldKey, value));
          const finalValue = snap(value);
          if (valueEl) valueEl.textContent = formatPickerDisplay(finalValue, unit, step);
          if (input && hasUserValue) input.value = formatPickerRaw(finalValue, unit, step);
          renderPickerTicks(track, value, min, max, visualTickStep, unit, tickPx);
          if (dispatch && input && hasUserValue) input.dispatchEvent(new Event("input", { bubbles: true }));
        };

        const applyDragDelta = (currentX, currentTime) => {
          const dx = currentX - lastX;
          const dt = Math.max(8, currentTime - lastTime);
          const speedPxMs = Math.abs(dx) / dt;
          const multiplier = getSpeedMultiplier(speedPxMs, totalSteps);
          const valueDelta = -(dx / tickPx) * step * multiplier;
          preciseValue = clampNumber(preciseValue + valueDelta, min, max);
          lastVelocity = valueDelta / dt;
          lastX = currentX;
          lastTime = currentTime;
          setValue(preciseValue, true, false, true);
        };

        const runInertiaToNearest = () => {
          cancelInertia();
          let velocity = Math.abs(lastVelocity) > step / 80 ? lastVelocity : 0;
          let previous = performance.now();
          const maxDuration = 420;
          const started = previous;

          const animate = (now) => {
            const dt = Math.min(32, Math.max(8, now - previous));
            previous = now;

            if (velocity) {
              preciseValue = clampNumber(preciseValue + velocity * dt, min, max);
              velocity *= 0.86;
              setValue(preciseValue, true, false, true);
            }

            const elapsed = now - started;
            if (Math.abs(velocity) < step / 180 || elapsed > maxDuration || preciseValue <= min || preciseValue >= max) {
              setValue(preciseValue, true, true, true);
              inertiaFrame = null;
              try { if (navigator.vibrate && Math.abs(step) >= 1) navigator.vibrate(4); } catch {}
              return;
            }

            inertiaFrame = requestAnimationFrame(animate);
          };

          inertiaFrame = requestAnimationFrame(animate);
        };

        if (windowEl) {
          windowEl.style.touchAction = "none";
          windowEl.style.overscrollBehavior = "contain";
          picker.style.touchAction = "none";
        }

        windowEl?.addEventListener("touchstart", (event) => {
          lockVerticalScroll();
          if (event.cancelable) event.preventDefault();
        }, { passive: false });

        windowEl?.addEventListener("touchmove", (event) => {
          if (dragging && event.cancelable) event.preventDefault();
        }, { passive: false });

        windowEl?.addEventListener("touchend", unlockVerticalScroll, { passive: true });
        windowEl?.addEventListener("touchcancel", unlockVerticalScroll, { passive: true });

        windowEl?.addEventListener("pointerdown", (event) => {
          if (event.pointerType === "touch" && event.cancelable) event.preventDefault();
          cancelInertia();
          dragging = true;
          hasUserValue = true;
          picker.dataset.empty = "false";
          picker.classList.add("dragging");
          preciseValue = value;
          lastX = event.clientX;
          lastTime = performance.now();
          lastVelocity = 0;
          lockVerticalScroll();
          setValue(value, true, false, true);
          windowEl.setPointerCapture?.(event.pointerId);
        });

        windowEl?.addEventListener("pointermove", (event) => {
          if (!dragging) return;
          if (event.cancelable) event.preventDefault();
          applyDragDelta(event.clientX, performance.now());
        }, { passive: false });

        const endDrag = (event) => {
          if (!dragging) return;
          dragging = false;
          picker.classList.remove("dragging");
          try { windowEl.releasePointerCapture?.(event.pointerId); } catch {}
          unlockVerticalScroll();
          runInertiaToNearest();
        };

        windowEl?.addEventListener("pointerup", endDrag);
        windowEl?.addEventListener("pointercancel", endDrag);
        windowEl?.addEventListener("lostpointercapture", () => {
          if (dragging) {
            dragging = false;
            picker.classList.remove("dragging");
            unlockVerticalScroll();
            runInertiaToNearest();
          }
        });

        windowEl?.addEventListener("wheel", (event) => {
          event.preventDefault();
          setValue(value + Math.sign(event.deltaY || event.deltaX) * visualTickStep, true, true, true);
        }, { passive: false });

        setValue(value, false, true, false);
        if (input && !hasUserValue) input.value = "";
      });
    }
    function getPickerTickStep(min, max, step) { const range = Math.max(0, Number(max) - Number(min)); if (range > 100000) return Math.max(step, 1000); if (range > 20000) return Math.max(step, 500); if (range > 5000) return Math.max(step, 100); if (range > 1000) return Math.max(step, 10); if (range > 100) return Math.max(step, 5); if (range > 20 && step < .1) return .1; if (range > 5 && step < .05) return .05; return step; }
    function renderPickerTicks(track, value, min, max, step, unit, tickPx) { if (!track) return; const rounded = Math.round(value / step) * step; const frac = (value - rounded) / step; const items = []; for (let i = -24; i <= 24; i++) { const tickValue = rounded + i * step; if (tickValue < min - step || tickValue > max + step) continue; const absIndex = Math.round(tickValue / step); const isTen = absIndex % 10 === 0; const isFive = absIndex % 5 === 0; const cls = isTen ? "big" : isFive ? "mid" : "small"; const left = `calc(50% + ${(i - frac) * tickPx}px)`; const label = isTen ? `<span>${escapeHtml(formatPickerRaw(tickValue, unit, step).replace(",0", ""))}</span>` : ""; items.push(`<div class="picker-tick ${cls}" style="left:${left}"><i></i>${label}</div>`); } track.innerHTML = items.join(""); }
    function getPickerStatusClass(fieldKey, value) { if (!hasNumber(value)) return "picker-neutral"; const n = Number(value); if (fieldKey === "cpc") return n < 1 ? "picker-good" : n <= 2 ? "picker-warn" : "picker-bad"; if (fieldKey === "cpm") return n < 20 ? "picker-good" : n <= 60 ? "picker-warn" : "picker-bad"; if (fieldKey === "ctr") return n >= 1.5 ? "picker-good" : n >= .8 ? "picker-warn" : "picker-bad"; if (fieldKey === "viewRate") return n >= 85 ? "picker-good" : n >= 75 ? "picker-warn" : "picker-bad"; if (fieldKey === "pvIc") return n >= 20 ? "picker-good" : n >= 15 ? "picker-warn" : "picker-bad"; if (fieldKey === "icPurchase") return n >= 40 ? "picker-good" : n >= 25 ? "picker-warn" : "picker-bad"; if (fieldKey === "roas") return n >= 2 ? "picker-good" : n >= 1 ? "picker-warn" : "picker-bad"; if (fieldKey === "frequency") return n <= 2.5 ? "picker-good" : n <= 4 ? "picker-warn" : "picker-bad"; if (fieldKey === "hookRate" || fieldKey === "retention") return n >= 30 ? "picker-good" : n >= 15 ? "picker-warn" : "picker-bad"; return "picker-neutral"; }
    function clampNumber(value, min, max) { if (!Number.isFinite(Number(value))) return min; return Math.min(Math.max(Number(value), Number(min)), Number(max)); }


    function buildFilledSummary(raw, fields) {
      const items = fields
        .filter((field) => raw && raw[field.key] !== undefined && raw[field.key] !== null && String(raw[field.key]).trim() !== "")
        .map((field) => `<div class="wizard-summary-item"><strong>${escapeHtml(field.label)}</strong><span>${escapeHtml(raw[field.key])}</span></div>`)
        .join("");
      if (!items) return `<p class="small-note">Nenhum dado preenchido ainda.</p>`;
      return `<div class="wizard-summary-grid">${items}</div>`;
    }


    function loadCampaigns() {
      try {
        const parsed = JSON.parse(localStorage.getItem(CAMPAIGN_HISTORY_KEY));
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    function saveCampaignData(campaignData) {
      const campaigns = loadCampaigns();
      campaigns.push(campaignData);
      localStorage.setItem(CAMPAIGN_HISTORY_KEY, JSON.stringify(campaigns));
      return campaigns.length - 1;
    }

    function deleteCampaign(index) {
      const campaigns = loadCampaigns();
      const removed = campaigns[index] || null;
      campaigns.splice(index, 1);
      localStorage.setItem(CAMPAIGN_HISTORY_KEY, JSON.stringify(campaigns));
      if (!removed) return;
      const type = removed.analysisType || removed.type || "campaign";
      const latestKey = type === "creative" ? CREATIVE_LATEST_KEY : CAMPAIGN_LATEST_KEY;
      try {
        const latest = JSON.parse(localStorage.getItem(latestKey));
        if (latest?.id === removed.id) localStorage.removeItem(latestKey);
      } catch {}
      if (type === "creative" && state.data.latestCreativeResult?.id === removed.id) state.data.latestCreativeResult = null;
      if (type !== "creative" && state.data.latestCampaignResult?.id === removed.id) state.data.latestCampaignResult = null;
      saveData();
    }

    function getCampaignDateLabel(campaign) {
      const iso = campaign?.createdAt || campaign?.dateISO;
      if (iso) {
        const date = new Date(iso);
        if (!Number.isNaN(date.getTime())) return date.toLocaleDateString("pt-BR");
      }
      return campaign?.date || "Sem data";
    }

    function getCampaignTimeLabel(campaign) {
      const iso = campaign?.createdAt || campaign?.dateISO;
      if (!iso) return "";
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    }

    function buildAnalysisRecord(type, raw, result) {
      const now = new Date();
      const normalizedType = type === "creative" ? "creative" : "campaign";
      const defaultName = normalizedType === "creative" ? "Anúncio" : "Campanha";
      const name = raw?.name && String(raw.name).trim() ? String(raw.name).trim() : `${defaultName} ${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
      return {
        id: `analysis-${normalizedType}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type: normalizedType,
        analysisType: normalizedType,
        name,
        date: now.toLocaleDateString("pt-BR"),
        dateISO: now.toISOString(),
        createdAt: now.toISOString(),
        raw: raw || {},
        result
      };
    }

    function persistAnalysisRecord(type, raw, result) {
      const record = buildAnalysisRecord(type, raw, result);
      saveCampaignData(record);
      try {
        localStorage.setItem(type === "creative" ? CREATIVE_LATEST_KEY : CAMPAIGN_LATEST_KEY, JSON.stringify(record));
      } catch {}
      return record;
    }

    function getLatestAnalysisRecord(type) {
      const stateRecord = type === "creative" ? state.data.latestCreativeResult : state.data.latestCampaignResult;
      if (stateRecord && stateRecord.result) return stateRecord;
      try {
        const raw = localStorage.getItem(type === "creative" ? CREATIVE_LATEST_KEY : CAMPAIGN_LATEST_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.result) return parsed;
        }
      } catch {}
      const campaigns = loadCampaigns().filter((item) => (item.analysisType || item.type || "campaign") === type && item.result);
      return campaigns.length ? campaigns[campaigns.length - 1] : null;
    }

    function openSavedAnalysis(index, mode = "view") {
      const campaigns = loadCampaigns();
      const campaign = campaigns[index];
      if (!campaign) {
        showToast("Não encontrei essa análise salva.", "error");
        return;
      }
      const type = campaign.analysisType || campaign.type || "campaign";
      if (mode === "edit") {
        if (type === "creative") {
          state.data.creativeAnalyzer = { creatives: [campaign.raw || {}], wizardCreativeIndex: 0, wizardFieldIndex: 0 };
          state.data.analyzerFlow = "creative-single";
          state.data.analyzerMode = "creatives";
          state.data.creativeEntryMethod = "manual";
          state.data.csvImportPreview = null;
        } else {
          state.data.campaignAnalyzer = campaign.raw || {};
          state.data.campaignWizardIndex = 0;
          state.data.analyzerFlow = "campaign-single";
          state.data.analyzerMode = "campaign";
          state.data.campaignEntryMethod = "manual";
          state.data.csvImportPreview = null;
        }
        saveData();
        renderAnalyzer();
        return;
      }

      if (type === "creative") {
        state.data.latestCreativeResult = campaign;
        state.data.analyzerFlow = "creative-result";
        state.data.analyzerMode = "creatives";
      } else {
        state.data.latestCampaignResult = campaign;
        state.data.analyzerFlow = "campaign-result";
        state.data.analyzerMode = "campaign";
      }
      saveData();
      renderAnalyzer();
    }

    function renderCampaigns() {
      const calendarElement = document.getElementById("calendar");
      if (!calendarElement) return;
      const campaigns = loadCampaigns();
      if (!campaigns.length) {
        calendarElement.innerHTML = `<div class="card lesson-screen"><p class="micro">Calendário</p><h3>Nenhuma análise salva ainda.</h3><p class="lesson-text">Quando você finalizar uma campanha ou anúncio, o resultado será salvo aqui automaticamente.</p></div>`;
        return;
      }

      calendarElement.innerHTML = campaigns.map((campaign, index) => {
        const type = (campaign.analysisType || campaign.type || "campaign") === "creative" ? "Anúncio" : "Campanha";
        const time = getCampaignTimeLabel(campaign);
        return `
          <article class="card lesson-screen" style="margin-top:12px;">
            <div class="creative-title-row">
              <div>
                <p class="micro">${escapeHtml(type)} • ${escapeHtml(getCampaignDateLabel(campaign))}${time ? ` às ${escapeHtml(time)}` : ""}</p>
                <h3>${escapeHtml(campaign.name || `${type} salva`)}</h3>
                <p class="lesson-text">${escapeHtml(campaign.result?.decision?.title || campaign.result?.summary?.title || "Resultado salvo no histórico")}</p>
              </div>
              <button class="btn secondary" type="button" data-delete-campaign="${index}" aria-label="Excluir análise">⋮ Excluir</button>
            </div>
            <div class="analyzer-actions">
              <button class="btn" type="button" data-open-campaign="${index}">Ver resultado</button>
              <button class="btn secondary" type="button" data-edit-campaign="${index}">Reinserir valores</button>
            </div>
          </article>
        `;
      }).join("");

      calendarElement.querySelectorAll("[data-open-campaign]").forEach((button) => {
        button.addEventListener("click", () => openSavedAnalysis(Number(button.dataset.openCampaign), "view"));
      });
      calendarElement.querySelectorAll("[data-edit-campaign]").forEach((button) => {
        button.addEventListener("click", () => openSavedAnalysis(Number(button.dataset.editCampaign), "edit"));
      });
      calendarElement.querySelectorAll("[data-delete-campaign]").forEach((button) => {
        button.addEventListener("click", () => {
          deleteCampaign(Number(button.dataset.deleteCampaign));
          renderCampaigns();
          showToast("Análise excluída do histórico.", "pop");
        });
      });
    }

    function renderAnalyzer(result = null) {
      const root = document.getElementById("analyzerRoot");
      if (!root) return;
      const flow = state.data.analyzerFlow || "hub";
      if (flow === "campaign-single") return renderCampaignAnalyzer(result);
      if (flow === "campaign-result") return renderCampaignResultScreen();
      if (flow === "campaign-history") return renderCampaignHistory();
      if (flow === "campaign-compare") return renderCampaignCompare(result);
      if (flow === "creative-result") return renderCreativeResultScreen();
      if (flow === "creative-single" || flow === "creative-compare") return renderCreativeAnalyzer(result);
      return renderAnalyzerHub();
    }

    function setAnalyzerFlow(flow) {
      const previousFlow = state.data.analyzerFlow || "hub";
      state.data.analyzerFlow = flow;
      state.data.analyzerMode = flow.includes("creative") ? "creatives" : flow.includes("campaign") ? "campaign" : "hub";
      if (flow === "campaign-single" && previousFlow !== "campaign-single") {
        state.data.campaignEntryMethod = "";
        state.data.csvImportPreview = null;
      }
      if (flow === "creative-single" && previousFlow !== "creative-single") {
        state.data.creativeEntryMethod = "";
        state.data.csvImportPreview = null;
      }
      if (flow === "hub") {
        state.data.campaignEntryMethod = "";
        state.data.creativeEntryMethod = "";
        state.data.csvImportPreview = null;
      }
      saveData();
      renderAnalyzer();
    }

    function renderAnalyzerHub() {
      const root = document.getElementById("analyzerRoot");
      root.innerHTML = `<div class="analyzer-choice-grid analyzer-choice-grid-clean"><button class="analyzer-choice-card" type="button" data-start-flow="campaign-single"><span>🧮</span><strong>Analisar campanha</strong><small>Diagnóstico completo de uma campanha.</small></button><button class="analyzer-choice-card" type="button" data-start-flow="campaign-compare"><span>📊</span><strong>Comparar campanhas</strong><small>Preencha duas ou mais campanhas e veja o que fazer.</small></button><button class="analyzer-choice-card" type="button" data-start-flow="creative-single"><span>🎬</span><strong>Analisar anúncio</strong><small>Leia um criativo/anúncio individual.</small></button><button class="analyzer-choice-card" type="button" data-start-flow="creative-compare"><span>⚖️</span><strong>Comparar anúncios</strong><small>Compare criativos da mesma campanha.</small></button><button class="analyzer-choice-card" type="button" data-start-flow="campaign-history"><span>🗓️</span><strong>Histórico</strong><small>Calendário/lista com análises salvas, datas e opção de excluir.</small></button></div><div class="reference-warning compact-rule"><strong>Regra:</strong> ROAS alto sozinho não libera escala. O app exige funil, CPA, CPA máximo e volume antes de recomendar aumento de verba.</div>`;
      root.querySelectorAll("[data-start-flow]").forEach((button) => button.addEventListener("click", () => setAnalyzerFlow(button.dataset.startFlow)));
    }


    function getCSVImportFields(type) {
      return type === "creative" ? CREATIVE_ANALYZER_FIELDS : ANALYZER_FIELDS;
    }

    function getCSVImportLabel(type) {
      return type === "creative" ? "anúncio" : "campanha";
    }

    function getCSVColumnAliases(key) {
      const aliases = {
        name: ["Nome", "Nome do anúncio", "Nome da campanha", "Ad name", "Campaign name"],
        angle: ["Ângulo", "Ângulo / gancho", "Gancho", "Ideia", "Hook", "Angle"],
        spend: ["Gasto", "Valor gasto", "Valor usado", "Amount spent", "Amount spent BRL", "Gasto BRL", "Cost", "Custo"],
        revenue: ["Receita", "Receita atribuída", "Valor de conversão", "Valor de conversão de compras", "Purchase conversion value", "Conversion value", "Revenue"],
        sales: ["Compras", "Purchase", "Purchases", "Compras no site", "Compras na loja", "Resultados", "Pedidos", "Orders", "Vendas"],
        clicks: ["Cliques no link", "Cliques de link", "Link clicks", "Outbound clicks", "Cliques de saída", "Cliques"],
        pageViews: ["Visualizações da página", "Visualização da página de destino", "Landing page views", "Page views", "Visualizações da página de destino", "ViewContent", "Visualizações de conteúdo"],
        checkouts: ["Inícios de checkout", "Inícios de finalização de compra", "Initiate checkout", "InitiateCheckout", "Checkouts iniciados", "Finalizações iniciadas"],
        impressions: ["Impressões", "Impressions"],
        cpc: ["CPC", "CPC link", "CPC de link", "Custo por clique no link", "Cost per link click"],
        cpm: ["CPM", "Custo por 1.000 impressões", "Cost per 1,000 impressions"],
        ctr: ["CTR", "CTR %", "CTR de link", "Link CTR", "Taxa de cliques no link"],
        viewRate: ["Taxa de Visualização", "Taxa de Visualização %", "Taxa de visualização da página", "Page view rate", "LPV rate"],
        pvIc: ["PV–IC", "PV-IC", "PV–IC %", "PV-IC %", "Página para checkout", "Page view to checkout", "ViewContent to checkout"],
        icPurchase: ["IC–Compras", "IC-Compras", "IC–Compras %", "IC-Compras %", "Checkout para compras", "Checkout to purchase"],
        cpa: ["CPA", "Custo por compra", "Cost per purchase", "Custo por aquisição"],
        roas: ["ROAS", "ROAS de compras", "Purchase ROAS", "Retorno sobre gasto com anúncio"],
        ticket: ["Ticket médio", "AOV", "Valor médio do pedido", "Average order value"],
        maxCpa: ["CPA máximo / margem", "CPA máximo", "CPA maximo", "Ponto de equilíbrio", "Break-even CPA", "Margem"],
        frequency: ["Frequência", "Frequency"],
        hookRate: ["Taxa de gancho / 3s", "Taxa de gancho / 3s %", "Hook rate", "3s hook rate", "Retenção 3s", "Visualizações de vídeo de 3 segundos"],
        retention: ["Retenção média", "Retenção média %", "Average retention", "Retenção", "Tempo médio de reprodução"]
      };
      return aliases[key] || [];
    }

    function normalizeCSVHeader(value) {
      return String(value ?? "")
        .replace(/^\uFEFF/, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[–—]/g, "-")
        .replace(/[%$€£¥]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
    }

    function cleanCSVValue(value) {
      return String(value ?? "").replace(/^\uFEFF/, "").trim();
    }

    function csvHeaderMatches(field, headerValue) {
      const normalizedHeader = normalizeCSVHeader(headerValue);
      const accepted = [field.label, field.key, ...(getCSVColumnAliases(field.key) || [])]
        .map(normalizeCSVHeader)
        .filter(Boolean);
      return accepted.includes(normalizedHeader);
    }

    function detectCSVDelimiter(firstLine) {
      const delimiters = [";", ",", "\t"];
      let best = ",";
      let bestCount = -1;
      delimiters.forEach((delimiter) => {
        let count = 0;
        let quoted = false;
        for (let i = 0; i < firstLine.length; i += 1) {
          const char = firstLine[i];
          if (char === '"') quoted = !quoted;
          if (!quoted && char === delimiter) count += 1;
        }
        if (count > bestCount) {
          bestCount = count;
          best = delimiter;
        }
      });
      return best;
    }

    function parseCSVRows(text, delimiter) {
      const rows = [];
      let row = [];
      let cell = "";
      let quoted = false;
      const source = String(text || "").replace(/^\uFEFF/, "");

      for (let i = 0; i < source.length; i += 1) {
        const char = source[i];
        const next = source[i + 1];

        if (char === '"') {
          if (quoted && next === '"') {
            cell += '"';
            i += 1;
          } else {
            quoted = !quoted;
          }
          continue;
        }

        if (!quoted && char === delimiter) {
          row.push(cell);
          cell = "";
          continue;
        }

        if (!quoted && (char === "\n" || char === "\r")) {
          if (char === "\r" && next === "\n") i += 1;
          row.push(cell);
          if (row.some((item) => cleanCSVValue(item) !== "")) rows.push(row);
          row = [];
          cell = "";
          continue;
        }

        cell += char;
      }

      row.push(cell);
      if (row.some((item) => cleanCSVValue(item) !== "")) rows.push(row);
      return rows;
    }

    function validateCSV(csvText, type = "campaign") {
      const label = getCSVImportLabel(type);
      const firstLine = String(csvText || "").split(/\r?\n/).find((line) => cleanCSVValue(line) !== "") || "";
      const delimiter = detectCSVDelimiter(firstLine);
      const rows = parseCSVRows(csvText, delimiter);
      const fields = getCSVImportFields(type);
      const requiredColumns = fields.map((field) => field.label);

      if (!rows.length) {
        return { valid: false, error: "O arquivo CSV está vazio ou não pôde ser lido." };
      }

      if (rows.length < 2) {
        return { valid: false, error: `O CSV de ${label} precisa ter uma linha de cabeçalho e pelo menos uma linha com dados.` };
      }

      const headers = rows[0].map(cleanCSVValue);
      if (headers.length < fields.length) {
        return {
          valid: false,
          error: `O CSV de ${label} tem ${headers.length} coluna(s), mas precisa ter ${fields.length}. Colunas obrigatórias: ${requiredColumns.join(" | ")}.`
        };
      }

      for (let index = 0; index < fields.length; index += 1) {
        const field = fields[index];
        const found = headers[index] || "vazio";
        if (!csvHeaderMatches(field, found)) {
          return {
            valid: false,
            error: `Coluna ${index + 1} fora da ordem. Esperado: "${field.label}". Encontrado: "${found}". A ordem correta é: ${requiredColumns.join(" | ")}.`
          };
        }
      }

      const dataRows = rows.slice(1).filter((row) => row.some((item) => cleanCSVValue(item) !== ""));
      if (!dataRows.length) {
        return { valid: false, error: `O CSV de ${label} tem cabeçalho, mas não tem nenhuma linha de dados para importar.` };
      }

      const firstDataRow = dataRows[0];
      const rawData = {};
      fields.forEach((field, index) => {
        rawData[field.key] = cleanCSVValue(firstDataRow[index] || "");
      });

      return {
        valid: true,
        delimiter,
        headers,
        fields,
        requiredColumns,
        rowCount: dataRows.length,
        rawData,
        previewRows: dataRows.slice(0, 5).map((row) => fields.map((field, index) => ({ key: field.key, label: field.label, value: cleanCSVValue(row[index] || "") })))
      };
    }

    function getCSVMetricSetupInfo(key, type = "campaign") {
      const common = {
        name: {
          group: "standard",
          metaName: type === "creative" ? "Nome do anúncio" : "Nome da campanha",
          setup: `Use o nome que aparece no nível de ${type === "creative" ? "Anúncios" : "Campanhas"}.`,
          fill: "Serve apenas para identificar a linha importada. Não precisa de cálculo."
        },
        angle: {
          group: "manual",
          metaName: "Não vem do Meta",
          setup: "Preencha manualmente no CSV com uma palavra simples: dor, desejo, prova, comparação, preço, UGC etc.",
          fill: "Ajuda você lembrar qual gancho/ideia aquele anúncio testou."
        },
        spend: {
          group: "standard",
          metaName: "Gasto / Valor gasto / Amount spent",
          setup: "Em Colunas > Personalizar colunas, procure por Gasto ou Valor gasto e adicione a coluna.",
          fill: "Use o valor gasto no mesmo período da análise. Exemplo: 150,00."
        },
        revenue: {
          group: "standard",
          metaName: "Valor de conversão de compras / Purchase conversion value",
          setup: "Procure por valor de conversão, valor de compra ou purchase conversion value.",
          fill: "Use a receita atribuída pelo Meta. Se a conta não rastreia valor de compra, deixe em branco e preencha manualmente quando souber."
        },
        sales: {
          group: "standard",
          metaName: "Compras / Purchases",
          setup: "Procure por Compras, Purchase ou Resultados quando o objetivo/evento principal for compra.",
          fill: "Informe a quantidade de compras/pedidos atribuídos."
        },
        clicks: {
          group: "standard",
          metaName: "Cliques no link / Link clicks",
          setup: "Adicione Cliques no link. Evite usar Todos os cliques, porque ele mistura curtidas, expansões e outras ações.",
          fill: "Use os cliques que realmente tentaram levar a pessoa para fora do anúncio."
        },
        pageViews: {
          group: "standard",
          metaName: "Visualizações da página de destino / Landing page views / ViewContent",
          setup: "Procure por Visualizações da página de destino. Em algumas contas, use Visualizações de conteúdo/ViewContent se esse for o evento rastreado.",
          fill: "Mostra quantos cliques realmente carregaram a página/produto."
        },
        checkouts: {
          group: "standard",
          metaName: "Inícios de finalização de compra / InitiateCheckout",
          setup: "Procure por Inícios de finalização de compra, Initiate checkout ou InitiateCheckout.",
          fill: "Use a quantidade de pessoas que iniciaram o checkout."
        },
        impressions: {
          group: "standard",
          metaName: "Impressões / Impressions",
          setup: "Adicione Impressões no personalizador de colunas.",
          fill: "Necessária para o app calcular CPM, CTR e leituras de topo do funil."
        },
        cpc: {
          group: "standard_calc",
          metaName: "CPC de link / Custo por clique no link",
          setup: "Pode adicionar a coluna pronta do Meta. Se não adicionar, o Tabelingo calcula com Gasto ÷ Cliques no link.",
          fill: "Pode vir preenchido do Meta ou ficar em branco quando Gasto e Cliques no link estiverem no CSV."
        },
        cpm: {
          group: "standard_calc",
          metaName: "CPM / Custo por 1.000 impressões",
          setup: "Pode adicionar a coluna pronta do Meta. Se não adicionar, o Tabelingo calcula com Gasto ÷ Impressões × 1000.",
          fill: "Pode vir preenchido do Meta ou ficar em branco quando Gasto e Impressões estiverem no CSV."
        },
        ctr: {
          group: "standard_calc",
          metaName: "CTR de link / Link CTR",
          setup: "Pode adicionar a coluna pronta do Meta. Se não adicionar, o Tabelingo calcula com Cliques no link ÷ Impressões × 100.",
          fill: "Use percentual sem o símbolo %. Exemplo: 1,8."
        },
        cpa: {
          group: "standard_calc",
          metaName: "Custo por compra / Cost per purchase",
          setup: "Pode adicionar a coluna pronta do Meta. Se não adicionar, o Tabelingo calcula com Gasto ÷ Compras.",
          fill: "Pode ficar em branco se Gasto e Compras estiverem corretos."
        },
        roas: {
          group: "standard_calc",
          metaName: "ROAS de compras / Purchase ROAS",
          setup: "Pode adicionar a coluna pronta do Meta. Se não adicionar, o Tabelingo calcula com Receita ÷ Gasto.",
          fill: "Use número decimal. Exemplo: 2,4. Não confunda ROAS com ROI/lucro líquido."
        },
        frequency: {
          group: "standard",
          metaName: "Frequência / Frequency",
          setup: "Adicione Frequência nas colunas do Meta.",
          fill: "Ajuda a identificar fadiga: a mesma pessoa vendo o anúncio muitas vezes."
        },
        viewRate: {
          group: "custom",
          metaName: "Taxa de Visualização %",
          setup: "Crie uma métrica personalizada em Colunas > Personalizar colunas > Criar métrica personalizada. Fórmula: Visualizações da página de destino ÷ Cliques no link × 100. Formato: Percentual.",
          fill: "Se não criar no Meta, deixe a coluna em branco. O Tabelingo calcula quando Visualizações da página e Cliques no link estiverem preenchidos."
        },
        pvIc: {
          group: "custom",
          metaName: "PV–IC %",
          setup: "Crie uma métrica personalizada. Fórmula: Inícios de finalização de compra ÷ Visualizações da página de destino × 100. Formato: Percentual.",
          fill: "Mede se a página/produto está levando a pessoa para o checkout. Também pode ficar em branco se os dados base existirem."
        },
        icPurchase: {
          group: "custom",
          metaName: "IC–Compras %",
          setup: "Crie uma métrica personalizada. Fórmula: Compras ÷ Inícios de finalização de compra × 100. Formato: Percentual.",
          fill: "Mede se o checkout está convertendo. Também pode ficar em branco se Compras e Inícios de checkout existirem."
        },
        ticket: {
          group: "custom",
          metaName: "Ticket médio / AOV",
          setup: "Crie uma métrica personalizada. Fórmula: Valor de conversão de compras ÷ Compras. Formato: Moeda. Se sua conta já tiver Valor médio do pedido/AOV, pode usar a coluna pronta.",
          fill: "Também pode ficar em branco se Receita e Compras estiverem preenchidas, porque o Tabelingo calcula."
        },
        maxCpa: {
          group: "manual",
          metaName: "Não vem do Meta",
          setup: "Essa coluna é do seu negócio, não do Gerenciador. Preencha com o CPA máximo que sua margem permite, ou com o lucro disponível por venda antes do tráfego.",
          fill: "Exemplo: se você pode gastar até R$ 32 para vender sem apertar a conta, coloque 32."
        },
        hookRate: {
          group: "custom",
          metaName: "Taxa de gancho / 3s %",
          setup: "Para criativos em vídeo, crie uma métrica personalizada. Fórmula sugerida: Visualizações de vídeo de 3 segundos ÷ Impressões × 100. Formato: Percentual.",
          fill: "Use para entender se o começo do vídeo segura atenção. Se o anúncio não for vídeo ou se a métrica não existir, deixe em branco."
        },
        retention: {
          group: "custom",
          metaName: "Retenção média %",
          setup: "Não costuma aparecer como percentual pronto. Se você usa vídeo curto com duração fixa, pode criar uma métrica personalizada: Tempo médio de reprodução do vídeo ÷ duração do vídeo em segundos × 100. Formato: Percentual.",
          fill: "Se não tiver retenção média em %, deixe em branco. O diagnóstico ainda funciona com gasto, impressões, cliques, compras e funil."
        }
      };
      return common[key] || {
        group: "standard",
        metaName: "Métrica do Meta ou coluna do Tabelingo",
        setup: "Adicione a métrica equivalente no personalizador de colunas ou mantenha a coluna com o nome do Tabelingo.",
        fill: "Preencha usando o mesmo período e o mesmo nível da análise."
      };
    }

    function getCSVMetricGroupLabel(group) {
      const labels = {
        standard: "Padrão do Meta",
        standard_calc: "Padrão ou calculada",
        custom: "Personalizada/calculada",
        manual: "Manual do negócio"
      };
      return labels[group] || "Métrica";
    }

    function buildCSVMetricInstructionRows(fields, groups, type = "campaign") {
      const allowed = Array.isArray(groups) ? groups : [groups];
      return fields
        .map((field) => ({ field, info: getCSVMetricSetupInfo(field.key, type) }))
        .filter((item) => allowed.includes(item.info.group))
        .map(({ field, info }) => `
          <tr>
            <td style="padding:10px; border-bottom:1px solid rgba(255,255,255,.10); vertical-align:top;"><strong>${escapeHtml(field.label)}</strong><br><span class="tag">${escapeHtml(getCSVMetricGroupLabel(info.group))}</span></td>
            <td style="padding:10px; border-bottom:1px solid rgba(255,255,255,.10); vertical-align:top;">${escapeHtml(info.metaName)}</td>
            <td style="padding:10px; border-bottom:1px solid rgba(255,255,255,.10); vertical-align:top;">${escapeHtml(info.setup)}</td>
            <td style="padding:10px; border-bottom:1px solid rgba(255,255,255,.10); vertical-align:top;">${escapeHtml(info.fill)}</td>
          </tr>
        `).join("");
    }

    function buildCSVMetricInstructionTable(title, intro, fields, groups, type = "campaign") {
      const rows = buildCSVMetricInstructionRows(fields, groups, type);
      if (!rows) return "";
      return `
        <details open>
          <summary>${escapeHtml(title)}</summary>
          <p>${escapeHtml(intro)}</p>
          <div style="overflow:auto; border:1px solid rgba(255,255,255,.12); border-radius:16px; margin-top:12px;">
            <table style="width:100%; border-collapse:collapse; min-width:760px; font-size:.92rem;">
              <thead>
                <tr>
                  <th style="text-align:left; padding:10px; border-bottom:1px solid rgba(255,255,255,.16);">Coluna no CSV</th>
                  <th style="text-align:left; padding:10px; border-bottom:1px solid rgba(255,255,255,.16);">Nome para procurar no Meta</th>
                  <th style="text-align:left; padding:10px; border-bottom:1px solid rgba(255,255,255,.16);">Como configurar</th>
                  <th style="text-align:left; padding:10px; border-bottom:1px solid rgba(255,255,255,.16);">Como preencher</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </details>
      `;
    }

    function showCSVInstructions(type = "campaign") {
      const fields = getCSVImportFields(type);
      const label = getCSVImportLabel(type);
      const levelLabel = type === "creative" ? "Anúncios" : "Campanhas";
      const columns = fields.map((field, index) => `<li><strong>${index + 1}.</strong> ${escapeHtml(field.label)}</li>`).join("");
      const standardTable = buildCSVMetricInstructionTable(
        "1. Métricas padrão que você adiciona direto no Meta",
        "Essas métricas normalmente já existem no Gerenciador de Anúncios. Você só precisa entrar no nível correto, personalizar as colunas e adicionar cada uma antes de exportar o CSV.",
        fields,
        ["standard", "standard_calc"],
        type
      );
      const customTable = buildCSVMetricInstructionTable(
        "2. Métricas personalizadas que não vêm prontas no modelo padrão",
        "Essas métricas são fórmulas de funil. Você pode criá-las no Meta para exportar o CSV já completo, ou deixar a coluna em branco quando o Tabelingo tiver os dados base para calcular.",
        fields,
        ["custom"],
        type
      );
      const manualTable = buildCSVMetricInstructionTable(
        "3. Colunas manuais que o Meta não consegue saber sozinho",
        "Essas informações dependem do seu negócio, margem, produto ou organização interna. Elas precisam existir no CSV com o nome correto, mesmo que você preencha manualmente.",
        fields,
        ["manual"],
        type
      );

      return `
        <div class="card lesson-screen csv-instructions-card" style="margin-top:18px;">
          <p class="micro">Antes de importar o CSV</p>
          <h3>Configure as colunas no Meta antes de selecionar o arquivo</h3>
          <p class="lesson-text">Para o Tabelingo ler a análise de ${escapeHtml(label)} sem erro, primeiro configure o relatório no Gerenciador de Anúncios. Entre no nível <strong>${escapeHtml(levelLabel)}</strong>, clique em <strong>Colunas</strong>, escolha <strong>Personalizar colunas</strong>, adicione as métricas abaixo, aplique a visualização e só depois exporte o arquivo em CSV.</p>
          <div class="reference-warning"><strong>Ordem obrigatória no CSV:</strong> ${escapeHtml(fields.map((field) => field.label).join(" | "))}</div>
          <p class="lesson-text">O arquivo precisa começar exatamente com estas ${fields.length} colunas, nesta ordem. O app aceita colunas extras depois, mas as primeiras ${fields.length} precisam estar corretas.</p>
          <ol class="small-note" style="line-height:1.8; margin-top:14px; padding-left:22px;">${columns}</ol>
          <div class="wizard-helper compact-helper helper-below-actions">
            <details open>
              <summary>Passo a passo rápido no Meta Ads</summary>
              <p>1. Abra o Gerenciador de Anúncios e escolha o mesmo período que você quer analisar.</p>
              <p>2. Entre no nível correto: <strong>${escapeHtml(levelLabel)}</strong>.</p>
              <p>3. Clique em <strong>Colunas</strong> e depois em <strong>Personalizar colunas</strong>.</p>
              <p>4. Adicione as métricas padrão. Para as fórmulas, use <strong>Criar métrica personalizada</strong>, escolha o formato correto e monte a conta com divisão, multiplicação, soma ou subtração.</p>
              <p>5. Aplique a visualização, exporte em CSV e renomeie os cabeçalhos para os nomes do Tabelingo se necessário.</p>
            </details>
            ${standardTable}
            ${customTable}
            ${manualTable}
            <details>
              <summary>Como o Tabelingo trata campos vazios</summary>
              <p>Você não precisa preencher duas vezes uma métrica que o app consegue calcular. CPC, CPM, CTR, Taxa de Visualização, PV–IC, IC–Compras, CPA, ROAS e Ticket médio podem ficar em branco se as colunas base estiverem preenchidas corretamente.</p>
              <p>Exemplo: se o CSV tiver Gasto e Cliques no link, o Tabelingo calcula o CPC. Se tiver Receita e Compras, calcula Ticket médio. Se tiver Compras e Inícios de checkout, calcula IC–Compras.</p>
            </details>
            <details>
              <summary>Importante sobre nomes das colunas</summary>
              <p>Para evitar erro, deixe o cabeçalho com os nomes do Tabelingo e na ordem obrigatória. Exemplos: <strong>Gasto</strong>, <strong>Receita</strong>, <strong>Compras</strong>, <strong>Cliques no link</strong>, <strong>PV–IC %</strong> e <strong>CPA máximo / margem</strong>.</p>
              <p>Se o Meta exportar nomes em inglês ou com variações, o app aceita alguns apelidos comuns, mas a forma mais segura é renomear a primeira linha do CSV antes de importar.</p>
            </details>
          </div>
        </div>
      `;
    }

    function renderInputMethodChoice(type = "campaign") {
      const root = document.getElementById("analyzerRoot");
      if (!root) return;
      const isCreative = type === "creative";
      const label = getCSVImportLabel(type);
      root.innerHTML = `
        <div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>${isCreative ? "Análise de anúncio" : "Análise de campanha"}</span></div>
        <div class="card lesson-screen">
          <p class="micro">Entrada de dados</p>
          <h3>Como você quer inserir os dados da ${escapeHtml(label)}?</h3>
          <p class="lesson-text">Você pode preencher uma métrica por tela, como antes, ou importar um CSV exportado do Meta Ads.</p>
          <div class="analyzer-actions">
            <button class="btn" type="button" data-entry-method="manual">Inserir manualmente</button>
            <button class="btn secondary" type="button" data-entry-method="csv">Importar arquivo CSV</button>
          </div>
        </div>
      `;
      root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub"));
      root.querySelectorAll("[data-entry-method]").forEach((button) => {
        button.addEventListener("click", () => {
          if (isCreative) state.data.creativeEntryMethod = button.dataset.entryMethod;
          else state.data.campaignEntryMethod = button.dataset.entryMethod;
          state.data.csvImportPreview = null;
          saveData();
          renderAnalyzer();
        });
      });
    }

    function buildCSVPreviewHtml(preview, type = "campaign") {
      if (!preview || preview.type !== type || !preview.rawData) return "";
      const fields = getCSVImportFields(type);
      const rows = fields.map((field) => `
        <tr>
          <td style="padding:8px 10px; border-bottom:1px solid rgba(255,255,255,.10);"><strong>${escapeHtml(field.label)}</strong></td>
          <td style="padding:8px 10px; border-bottom:1px solid rgba(255,255,255,.10);">${escapeHtml(preview.rawData[field.key] || "—")}</td>
        </tr>
      `).join("");
      return `
        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">CSV validado com sucesso</p>
          <h3>${escapeHtml(preview.fileName || "Arquivo importado")}</h3>
          <p class="lesson-text">O Tabelingo validou as colunas obrigatórias e importou a primeira linha de dados. Linhas encontradas no arquivo: ${Number(preview.rowCount) || 1}.</p>
          <div style="overflow:auto; border:1px solid rgba(255,255,255,.12); border-radius:16px; margin-top:14px;">
            <table style="width:100%; border-collapse:collapse; min-width:420px;">
              <thead><tr><th style="text-align:left; padding:10px; border-bottom:1px solid rgba(255,255,255,.16);">Métrica</th><th style="text-align:left; padding:10px; border-bottom:1px solid rgba(255,255,255,.16);">Valor importado</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          <div class="analyzer-actions" style="margin-top:16px;">
            <button class="btn" type="button" data-run-csv-analysis>Gerar análise com este CSV</button>
            <button class="btn secondary" type="button" data-clear-csv-preview>Trocar arquivo</button>
          </div>
        </div>
      `;
    }

    function renderCSVImportScreen(type = "campaign") {
      const root = document.getElementById("analyzerRoot");
      if (!root) return;
      const label = getCSVImportLabel(type);
      const preview = state.data.csvImportPreview && state.data.csvImportPreview.type === type ? state.data.csvImportPreview : null;
      root.innerHTML = `
        <div class="analyzer-topline"><button class="btn secondary" type="button" data-back-input-choice>← Voltar</button><span>Importar CSV de ${escapeHtml(label)}</span></div>
        ${showCSVInstructions(type)}
        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Upload do CSV</p>
          <h3>Agora selecione o arquivo CSV</h3>
          <p class="lesson-text">Depois que as colunas estiverem configuradas no Meta, envie o arquivo aqui. O app valida se as colunas obrigatórias, incluindo as personalizadas e manuais, estão presentes e na ordem correta.</p>
          <div data-csv-drop-zone style="margin-top:16px; padding:22px; border:1px dashed rgba(255,255,255,.35); border-radius:20px; background:rgba(255,255,255,.06); text-align:center;">
            <p class="lesson-text" style="margin:0 0 12px;">Solte o arquivo aqui ou selecione no botão abaixo.</p>
            <button class="btn" type="button" data-csv-browse>Selecionar CSV</button>
            <input type="file" accept=".csv,text/csv" data-csv-file-input hidden />
          </div>
        </div>
        ${buildCSVPreviewHtml(preview, type)}
      `;

      root.querySelector("[data-back-input-choice]")?.addEventListener("click", () => {
        if (type === "creative") state.data.creativeEntryMethod = "";
        else state.data.campaignEntryMethod = "";
        state.data.csvImportPreview = null;
        saveData();
        renderAnalyzer();
      });

      const input = root.querySelector("[data-csv-file-input]");
      const dropZone = root.querySelector("[data-csv-drop-zone]");
      root.querySelector("[data-csv-browse]")?.addEventListener("click", () => input?.click());
      input?.addEventListener("change", () => uploadCSV(input.files?.[0], type));
      dropZone?.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropZone.style.background = "rgba(163,255,18,.10)";
      });
      dropZone?.addEventListener("dragleave", () => {
        dropZone.style.background = "rgba(255,255,255,.06)";
      });
      dropZone?.addEventListener("drop", (event) => {
        event.preventDefault();
        dropZone.style.background = "rgba(255,255,255,.06)";
        uploadCSV(event.dataTransfer?.files?.[0], type);
      });
      root.querySelector("[data-run-csv-analysis]")?.addEventListener("click", () => runCSVImportedAnalysis(type));
      root.querySelector("[data-clear-csv-preview]")?.addEventListener("click", () => {
        state.data.csvImportPreview = null;
        saveData();
        renderAnalyzer();
      });
    }

    function uploadCSV(file, type = "campaign") {
      if (!file) {
        showToast("Selecione um arquivo CSV para continuar.", "error");
        return;
      }

      const fileName = file.name || "arquivo.csv";
      const looksLikeCSV = fileName.toLowerCase().endsWith(".csv") || String(file.type || "").includes("csv") || String(file.type || "").includes("text");
      if (!looksLikeCSV) {
        alert("Arquivo inválido. Envie um arquivo .csv exportado do Gerenciador de Anúncios.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const validation = validateCSV(String(reader.result || ""), type);
        if (!validation.valid) {
          state.data.csvImportPreview = null;
          saveData();
          alert(validation.error || "CSV inválido. Confira as colunas obrigatórias e a ordem do arquivo.");
          renderAnalyzer();
          return;
        }

        state.data.csvImportPreview = {
          type,
          fileName,
          rowCount: validation.rowCount,
          importedAt: new Date().toISOString(),
          headers: validation.headers,
          rawData: validation.rawData
        };

        if (type === "creative") {
          state.data.creativeEntryMethod = "csv";
          state.data.creativeAnalyzer = { creatives: [validation.rawData], wizardCreativeIndex: 0, wizardFieldIndex: 0 };
        } else {
          state.data.campaignEntryMethod = "csv";
          state.data.campaignAnalyzer = validation.rawData;
        }

        saveData();
        renderAnalyzer();
        showToast("CSV validado com sucesso. Confira os dados e gere a análise.", "success");
      };
      reader.onerror = () => {
        alert("Não foi possível ler o arquivo CSV. Tente exportar novamente e enviar outro arquivo.");
      };
      reader.readAsText(file, "UTF-8");
    }

    function runCSVImportedAnalysis(type = "campaign") {
      const preview = state.data.csvImportPreview;
      if (!preview || preview.type !== type || !preview.rawData) {
        alert("Nenhum CSV validado foi encontrado. Importe o arquivo novamente.");
        return;
      }

      const raw = preview.rawData;
      if (type === "creative") {
        state.data.creativeAnalyzer = { creatives: [raw], wizardCreativeIndex: 0, wizardFieldIndex: CREATIVE_ANALYZER_FIELDS.length - 1 };
        const result = analyzeCreatives([raw]);
        const record = persistAnalysisRecord("creative", raw, result);
        state.data.latestCreativeResult = record;
        state.data.analyzerFlow = "creative-result";
        state.data.analyzerMode = "creatives";
        state.data.creativeEntryMethod = "csv";
      } else {
        state.data.campaignAnalyzer = raw;
        state.data.campaignWizardIndex = ANALYZER_FIELDS.length - 1;
        if (raw.ticket) state.data.ticket = parseMoney(raw.ticket) || state.data.ticket;
        if (raw.maxCpa) state.data.breakevenCpa = parseMoney(raw.maxCpa) || state.data.breakevenCpa;
        const result = analyzeCampaign(raw);
        const record = persistAnalysisRecord("campaign", raw, result);
        state.data.latestCampaignResult = record;
        state.data.analyzerFlow = "campaign-result";
        state.data.analyzerMode = "campaign";
        state.data.campaignEntryMethod = "csv";
      }

      saveData();
      try { window.history.pushState({}, "", "#nova_tela_resultados"); } catch {}
      renderAnalyzer();
      showToast("Análise gerada a partir do CSV.", "success");
    }

    function renderCampaignAnalyzer(result = null) {
      const root = document.getElementById("analyzerRoot");
      if (!root) return;
      if (state.data.campaignEntryMethod === "csv") return renderCSVImportScreen("campaign");
      if (state.data.campaignEntryMethod !== "manual") return renderInputMethodChoice("campaign");
      const saved = state.data.campaignAnalyzer || {};
      const stepIndex = Math.min(Math.max(Number(state.data.campaignWizardIndex) || 0, 0), ANALYZER_FIELDS.length - 1);
      root.innerHTML = `<div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>Análise de campanha</span></div><div id="campaignWizardRoot">${buildWizardStepHtml({ fields: ANALYZER_FIELDS, raw: saved, stepIndex, title: "Campanha", subtitle: "Uma métrica por tela", scope: "campaign" })}</div>`;
      root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub"));
      wireWizardControls({
        container: document.getElementById("campaignWizardRoot"),
        fields: ANALYZER_FIELDS,
        raw: saved,
        stepIndex,
        onSaveRaw: (nextRaw) => { state.data.campaignAnalyzer = nextRaw; saveData(); },
        onSetStep: (nextStep) => { state.data.campaignWizardIndex = nextStep; saveData(); renderAnalyzer(); },
        onFinish: (nextRaw) => {
          state.data.campaignAnalyzer = nextRaw;
          state.data.campaignWizardIndex = ANALYZER_FIELDS.length - 1;
          if (nextRaw.ticket) state.data.ticket = parseMoney(nextRaw.ticket) || state.data.ticket;
          if (nextRaw.maxCpa) state.data.breakevenCpa = parseMoney(nextRaw.maxCpa) || state.data.breakevenCpa;
          const result = analyzeCampaign(nextRaw);
          const record = persistAnalysisRecord("campaign", nextRaw, result);
          state.data.latestCampaignResult = record;
          state.data.analyzerFlow = "campaign-result";
          state.data.analyzerMode = "campaign";
          saveData();
          try { window.history.pushState({}, "", "#nova_tela_resultados"); } catch {}
          renderAnalyzer();
          showToast("Relatório salvo e aberto na próxima tela.", "success");
        }
      });
    }

    function renderCampaignResultScreen() {
      const root = document.getElementById("analyzerRoot");
      if (!root) return;
      const record = getLatestAnalysisRecord("campaign");
      if (!record || !record.result) {
        root.innerHTML = `<div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>Resultado da campanha</span></div><div class="card lesson-screen"><p class="micro">Resultado</p><h3>Nenhuma análise encontrada.</h3><p class="lesson-text">Finalize uma campanha para gerar o resultado nesta tela.</p><div class="analyzer-actions"><button class="btn" type="button" data-start-flow="campaign-single">Analisar campanha</button><button class="btn secondary" type="button" data-start-flow="campaign-history">Ver histórico</button></div></div>`;
        root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub"));
        root.querySelectorAll("[data-start-flow]").forEach((button) => button.addEventListener("click", () => setAnalyzerFlow(button.dataset.startFlow)));
        return;
      }

      root.innerHTML = `
        <div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>Resultado da campanha</span></div>
        <div class="card lesson-screen">
          <p class="micro">${escapeHtml(getCampaignDateLabel(record))}${getCampaignTimeLabel(record) ? ` • ${escapeHtml(getCampaignTimeLabel(record))}` : ""}</p>
          <h3>${escapeHtml(record.name || "Campanha analisada")}</h3>
          <p class="lesson-text">Resultado aberto em uma tela separada da entrada de dados.</p>
        </div>
        <div id="analyzerResult" class="result-space">${buildAnalyzerResultHtml(record.result)}${buildAfterCampaignOptionsHtml("single")}</div>
      `;
      root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub"));
      wireAfterCampaignOptions("single");
    }

    function renderCreativeResultScreen() {
      const root = document.getElementById("analyzerRoot");
      if (!root) return;
      const record = getLatestAnalysisRecord("creative");
      if (!record || !record.result) {
        root.innerHTML = `<div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>Resultado do anúncio</span></div><div class="card lesson-screen"><p class="micro">Resultado</p><h3>Nenhuma análise de anúncio encontrada.</h3><p class="lesson-text">Finalize um anúncio para gerar o resultado nesta tela.</p></div>`;
        root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub"));
        return;
      }

      root.innerHTML = `
        <div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>Resultado do anúncio</span></div>
        <div class="card lesson-screen">
          <p class="micro">${escapeHtml(getCampaignDateLabel(record))}${getCampaignTimeLabel(record) ? ` • ${escapeHtml(getCampaignTimeLabel(record))}` : ""}</p>
          <h3>${escapeHtml(record.name || "Anúncio analisado")}</h3>
          <p class="lesson-text">Resultado aberto em uma tela separada da entrada de dados.</p>
        </div>
        <div id="creativeAnalyzerResult" class="result-space">${buildCreativeComparisonHtml(record.result)}</div>
        <div class="card lesson-screen after-analysis-card">
          <p class="micro">Próximo passo</p>
          <h3>Quer continuar analisando anúncios?</h3>
          <div class="analyzer-actions">
            <button class="btn" type="button" data-start-flow="creative-single">Novo anúncio</button>
            <button class="btn secondary" type="button" data-start-flow="campaign-history">Ver histórico</button>
            <button class="btn secondary" type="button" data-edit-latest-creative>Reinserir valores</button>
          </div>
        </div>
      `;
      root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub"));
      root.querySelectorAll("[data-start-flow]").forEach((button) => button.addEventListener("click", () => setAnalyzerFlow(button.dataset.startFlow)));
      root.querySelector("[data-edit-latest-creative]")?.addEventListener("click", () => {
        state.data.creativeAnalyzer = { creatives: [record.raw || {}], wizardCreativeIndex: 0, wizardFieldIndex: 0 };
        state.data.analyzerFlow = "creative-single";
        state.data.analyzerMode = "creatives";
        state.data.creativeEntryMethod = "manual";
        state.data.csvImportPreview = null;
        saveData();
        renderAnalyzer();
      });
    }

    function renderCampaignHistory() {
      const root = document.getElementById("analyzerRoot");
      if (!root) return;
      root.innerHTML = `
        <div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>Histórico de análises</span></div>
        <div class="card lesson-screen">
          <p class="micro">Calendário</p>
          <h3>Análises salvas por data</h3>
          <p class="lesson-text">Aqui ficam campanhas e anúncios finalizados. Você pode abrir o resultado, reinserir os valores ou excluir uma análise antiga.</p>
        </div>
        <div id="calendar"></div>
      `;
      root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub"));
      renderCampaigns();
    }

    function buildAfterCampaignOptionsHtml(mode) {
      return `<div class="card lesson-screen after-analysis-card"><p class="micro">Próximo passo</p><h3>Quer comparar com outra campanha?</h3><p class="lesson-text">Você pode manter essa análise, adicionar outra campanha para comparação ou voltar aos valores salvos.</p><div class="analyzer-actions"><button class="btn" type="button" data-campaign-done>Ver histórico</button><button class="btn secondary" type="button" data-campaign-add-compare>Adicionar outra campanha</button><button class="btn secondary" type="button" data-campaign-restart>Reinserir valores</button></div></div>`;
    }

    function wireAfterCampaignOptions(mode) {
      document.querySelector("[data-campaign-done]")?.addEventListener("click", () => setAnalyzerFlow("campaign-history"));
      document.querySelector("[data-campaign-restart]")?.addEventListener("click", () => {
        const record = getLatestAnalysisRecord("campaign");
        state.data.campaignAnalyzer = record?.raw || state.data.campaignAnalyzer || {};
        state.data.campaignWizardIndex = 0;
        state.data.analyzerFlow = "campaign-single";
        state.data.analyzerMode = "campaign";
        state.data.campaignEntryMethod = "manual";
        state.data.csvImportPreview = null;
        saveData();
        renderAnalyzer();
      });
      document.querySelector("[data-campaign-add-compare]")?.addEventListener("click", () => {
        const record = getLatestAnalysisRecord("campaign");
        const current = record?.raw || state.data.campaignAnalyzer || {};
        state.data.campaignCompare = { campaigns: [current, {}], wizardCampaignIndex: 1, wizardFieldIndex: 0 };
        setAnalyzerFlow("campaign-compare");
      });
    }
    function renderCampaignCompare(result = null) { const root = document.getElementById("analyzerRoot"); if (!root) return; const saved = state.data.campaignCompare || { campaigns: [{}], wizardCampaignIndex: 0, wizardFieldIndex: 0 }; if (!Array.isArray(saved.campaigns) || !saved.campaigns.length) saved.campaigns = [{}]; const campaignIndex = Math.min(Math.max(Number(saved.wizardCampaignIndex) || 0, 0), saved.campaigns.length - 1); const fieldIndex = Math.min(Math.max(Number(saved.wizardFieldIndex) || 0, 0), CAMPAIGN_COMPARISON_FIELDS.length - 1); const currentCampaign = saved.campaigns[campaignIndex] || {}; root.innerHTML = `<div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>Comparar campanhas</span></div><div id="campaignCompareWizardRoot">${buildWizardStepHtml({ fields: CAMPAIGN_COMPARISON_FIELDS, raw: currentCampaign, stepIndex: fieldIndex, title: `Campanha ${campaignIndex + 1} de ${saved.campaigns.length}`, subtitle: "Uma métrica por tela", scope: "campaign-compare" })}</div><div class="card lesson-screen compact-saved-card"><p class="micro">Campanhas na comparação</p><h3>${saved.campaigns.length} campanha(s) salvas</h3><div class="analyzer-actions"><button class="btn" type="button" id="runCampaignCompareBtn">Comparar campanhas</button><button class="btn secondary" type="button" id="addCampaignBtn">Adicionar outra campanha</button><button class="btn secondary" type="button" id="clearCampaignCompareBtn">Limpar comparação</button></div></div><div id="campaignCompareResult">${result ? buildCampaignComparisonHtml(result) : ""}</div>`; root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub")); const saveCampaign = (nextRaw) => { const next = { ...saved, campaigns: [...saved.campaigns] }; next.campaigns[campaignIndex] = nextRaw; state.data.campaignCompare = next; saveData(); }; wireWizardControls({ container: document.getElementById("campaignCompareWizardRoot"), fields: CAMPAIGN_COMPARISON_FIELDS, raw: currentCampaign, stepIndex: fieldIndex, onSaveRaw: saveCampaign, onSetStep: (nextStep) => { const next = state.data.campaignCompare || saved; next.wizardCampaignIndex = campaignIndex; next.wizardFieldIndex = nextStep; state.data.campaignCompare = next; saveData(); renderAnalyzer(); }, onFinish: (nextRaw) => { const next = state.data.campaignCompare || saved; next.campaigns[campaignIndex] = nextRaw; next.wizardCampaignIndex = campaignIndex; next.wizardFieldIndex = CAMPAIGN_COMPARISON_FIELDS.length - 1; state.data.campaignCompare = next; const result = analyzeCampaign(nextRaw); const record = persistAnalysisRecord("campaign", nextRaw, result); state.data.latestCampaignResult = record; saveData(); renderCampaignCompare(analyzeCampaigns(next.campaigns)); showToast("Campanha salva no histórico. Compare ou adicione outra.", "success"); }}); document.getElementById("addCampaignBtn")?.addEventListener("click", () => { const next = state.data.campaignCompare || saved; next.campaigns = Array.isArray(next.campaigns) ? next.campaigns : [{}]; next.campaigns.push({}); next.wizardCampaignIndex = next.campaigns.length - 1; next.wizardFieldIndex = 0; state.data.campaignCompare = next; saveData(); renderAnalyzer(); }); document.getElementById("runCampaignCompareBtn")?.addEventListener("click", () => { const next = state.data.campaignCompare || saved; document.getElementById("campaignCompareResult").innerHTML = buildCampaignComparisonHtml(analyzeCampaigns(next.campaigns)); }); document.getElementById("clearCampaignCompareBtn")?.addEventListener("click", () => { state.data.campaignCompare = { campaigns: [{}], wizardCampaignIndex: 0, wizardFieldIndex: 0 }; saveData(); renderAnalyzer(); }); }
    function renderCreativeAnalyzer(result = null) { const root = document.getElementById("analyzerRoot"); if (!root) return; const compareMode = (state.data.analyzerFlow || "creative-single") === "creative-compare"; if (!compareMode && state.data.creativeEntryMethod === "csv") return renderCSVImportScreen("creative"); if (!compareMode && state.data.creativeEntryMethod !== "manual") return renderInputMethodChoice("creative"); const saved = state.data.creativeAnalyzer || { creatives: [{}], wizardCreativeIndex: 0, wizardFieldIndex: 0 }; if (!Array.isArray(saved.creatives) || !saved.creatives.length) saved.creatives = [{}]; const creativeIndex = Math.min(Math.max(Number(saved.wizardCreativeIndex) || 0, 0), saved.creatives.length - 1); const fieldIndex = Math.min(Math.max(Number(saved.wizardFieldIndex) || 0, 0), CREATIVE_ANALYZER_FIELDS.length - 1); const currentCreative = saved.creatives[creativeIndex] || {}; root.innerHTML = `<div class="analyzer-topline"><button class="btn secondary" type="button" data-back-analyzer>← Voltar</button><span>${compareMode ? "Comparar anúncios" : "Analisar anúncio"}</span></div><div id="creativeWizardRoot">${buildWizardStepHtml({ fields: CREATIVE_ANALYZER_FIELDS, raw: currentCreative, stepIndex: fieldIndex, title: `Anúncio ${creativeIndex + 1} de ${saved.creatives.length}`, subtitle: "Uma métrica por tela", scope: "creative" })}</div><div class="card lesson-screen compact-saved-card"><p class="micro">Anúncios salvos</p><h3>${saved.creatives.length} anúncio(s) na análise</h3><p class="lesson-text">No final, você pode analisar só este anúncio, adicionar outro ou comparar todos.</p><div class="analyzer-actions"><button class="btn" type="button" id="runCreativeAnalyzerBtn">Comparar todos</button><button class="btn secondary" type="button" id="analyzeSingleCreativeBtn">Analisar só este</button><button class="btn secondary" type="button" id="addCreativeBtn">Adicionar outro anúncio</button><button class="btn secondary" type="button" id="clearCreativeAnalyzerBtn">Limpar anúncios</button></div></div><div id="creativeAnalyzerResult">${result ? buildCreativeComparisonHtml(result) : ""}</div>`; root.querySelector("[data-back-analyzer]")?.addEventListener("click", () => setAnalyzerFlow("hub")); const saveCreative = (nextRaw) => { const next = { ...saved, creatives: [...saved.creatives] }; next.creatives[creativeIndex] = nextRaw; state.data.creativeAnalyzer = next; saveData(); }; wireWizardControls({ container: document.getElementById("creativeWizardRoot"), fields: CREATIVE_ANALYZER_FIELDS, raw: currentCreative, stepIndex: fieldIndex, onSaveRaw: saveCreative, onSetStep: (nextStep) => { const next = state.data.creativeAnalyzer || saved; next.wizardCreativeIndex = creativeIndex; next.wizardFieldIndex = nextStep; state.data.creativeAnalyzer = next; saveData(); renderAnalyzer(); }, onFinish: (nextRaw) => { const next = state.data.creativeAnalyzer || saved; next.creatives[creativeIndex] = nextRaw; next.wizardCreativeIndex = creativeIndex; next.wizardFieldIndex = CREATIVE_ANALYZER_FIELDS.length - 1; state.data.creativeAnalyzer = next; const result = analyzeCreatives([nextRaw]); const record = persistAnalysisRecord("creative", nextRaw, result); state.data.latestCreativeResult = record; state.data.analyzerFlow = "creative-result"; state.data.analyzerMode = "creatives"; saveData(); try { window.history.pushState({}, "", "#nova_tela_resultados"); } catch {} renderAnalyzer(); showToast("Anúncio salvo e aberto na próxima tela.", "success"); }}); document.getElementById("addCreativeBtn")?.addEventListener("click", () => { const next = state.data.creativeAnalyzer || saved; next.creatives = Array.isArray(next.creatives) ? next.creatives : [{}]; next.creatives.push({}); next.wizardCreativeIndex = next.creatives.length - 1; next.wizardFieldIndex = 0; state.data.creativeAnalyzer = next; state.data.analyzerFlow = "creative-compare"; saveData(); renderAnalyzer(); }); document.getElementById("analyzeSingleCreativeBtn")?.addEventListener("click", () => { const next = state.data.creativeAnalyzer || saved; document.getElementById("creativeAnalyzerResult").innerHTML = buildCreativeComparisonHtml(analyzeCreatives([next.creatives[creativeIndex] || {}])); }); document.getElementById("runCreativeAnalyzerBtn")?.addEventListener("click", () => { const next = state.data.creativeAnalyzer || saved; document.getElementById("creativeAnalyzerResult").innerHTML = buildCreativeComparisonHtml(analyzeCreatives(next.creatives)); }); document.getElementById("clearCreativeAnalyzerBtn")?.addEventListener("click", () => { state.data.creativeAnalyzer = { creatives: [{}], wizardCreativeIndex: 0, wizardFieldIndex: 0 }; saveData(); renderAnalyzer(); }); }


    function buildCreativeFormCard(creative, index, total) {
      const fields = CREATIVE_ANALYZER_FIELDS.map((field) => {
        const isText = field.type === "text";
        return `
          <div class="metric-field">
            <label for="creative-${index}-${field.key}">${field.label}</label>
            <input id="creative-${index}-${field.key}" data-creative-index="${index}" data-creative-field="${field.key}" type="text" ${isText ? "" : "inputmode=\"decimal\""} placeholder="${field.placeholder}" value="${escapeHtml(formatSavedValue(creative[field.key]))}" />
            <small>${field.hint}</small>
          </div>
        `;
      }).join("");

      return `
        <article class="creative-card" data-creative-card="${index}">
          <div class="creative-card-head">
            <div>
              <h4>Criativo ${index + 1}</h4>
              <p>Preencha o que você tiver. Nome, gasto, impressões, cliques, compras e receita já ajudam bastante.</p>
            </div>
            ${total > 1 ? `<button class="creative-remove" type="button" data-remove-creative="${index}">Remover</button>` : ""}
          </div>
          <div class="campaign-grid">${fields}</div>
        </article>
      `;
    }

    function collectCreativeInputs() {
      const cards = Array.from(document.querySelectorAll("[data-creative-card]"));
      const creatives = cards.map((card, index) => {
        const item = {};
        card.querySelectorAll("[data-creative-field]").forEach((input) => {
          item[input.dataset.creativeField] = input.value.trim();
        });
        item.order = index + 1;
        return item;
      });
      return { creatives };
    }

    function buildCreativeEmptyHtml() {
      return `
        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Como ler criativos</p>
          <h3>A comparação vai aparecer aqui.</h3>
          <p class="lesson-text">O app vai separar criativo forte, criativo em observação e criativo com sinal de pausa/redução. Ele não decide só por venda: também olha CTR, CPC, CPM, chegada na página, checkout, CPA, ROAS, frequência e volume de dados.</p>
        </div>
      `;
    }

    function analyzeCreatives(creativesRaw) {
      const creatives = (creativesRaw || [])
        .map((creative, index) => normalizeCreative(creative, index))
        .filter((creative) => creative.hasAnyData);

      if (!creatives.length) {
        return {
          creatives: [],
          champion: null,
          weakest: null,
          summary: {
            level: "warning",
            title: "Ainda falta dado para comparar",
            main: "Preencha pelo menos gasto, impressões, cliques, compras ou receita de cada criativo.",
            action: "Comece com nome, gasto, impressões, cliques, compras e receita. Depois refine com visualizações, checkouts e retenção."
          }
        };
      }

      const maxScore = Math.max(...creatives.map((creative) => creative.score));
      const champion = creatives.find((creative) => creative.score === maxScore) || creatives[0];
      const weakest = creatives.slice().sort((a, b) => a.score - b.score)[0] || null;

      const canShiftBudget = champion && weakest && champion.id !== weakest.id && champion.level === "success" && champion.scaleReadiness?.ready && champion.score >= 28 && weakest.score <= 4 && champion.volumeLabel !== "baixo";
      const summary = buildCreativeSummary(champion, weakest, canShiftBudget, creatives);

      return { creatives, champion, weakest, summary, canShiftBudget };
    }


    function hasNumber(value) {
      return value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
    }

    function firstNumber(...values) {
      for (const value of values) {
        if (hasNumber(value)) return Number(value);
      }
      return null;
    }

    function divideMetric(numerator, denominator, multiplier = 1) {
      if (!hasNumber(numerator) || !hasNumber(denominator) || Number(denominator) <= 0) return null;
      return (Number(numerator) / Number(denominator)) * multiplier;
    }

    function isMetricMissing(value) {
      return !hasNumber(value);
    }

    function formatSavedValue(value) {
      return value === 0 || value === "0" ? "0" : (value || "");
    }

    function getScaleReadiness(metrics, raw = {}) {
      const required = [
        { key: "viewRate", label: "Taxa de Visualização" },
        { key: "pvIc", label: "PV–IC" },
        { key: "icPurchase", label: "IC–Compras" },
        { key: "cpa", label: "CPA" },
        { key: "maxCpa", label: "CPA máximo / ponto de equilíbrio" },
        { key: "roas", label: "ROAS" }
      ];

      const missing = required.filter((item) => isMetricMissing(metrics[item.key])).map((item) => item.label);
      const salesOk = hasNumber(raw.sales) && Number(raw.sales) >= 3;
      const clicksOk = hasNumber(raw.clicks) && Number(raw.clicks) >= 100;
      const checkoutsOk = hasNumber(raw.checkouts) && Number(raw.checkouts) >= 10;
      const spendOk = hasNumber(raw.spend) && Number(raw.spend) > 0;
      const volumeOk = salesOk && clicksOk && checkoutsOk && spendOk;

      return {
        missing,
        volumeOk,
        salesOk,
        clicksOk,
        checkoutsOk,
        spendOk,
        ready: missing.length === 0 && volumeOk
      };
    }

    function getCreativeScaleReadiness(metrics) {
      const required = [
        { key: "ctr", label: "CTR" },
        { key: "cpc", label: "CPC" },
        { key: "roas", label: "ROAS" },
        { key: "cpa", label: "CPA" },
        { key: "maxCpa", label: "CPA máximo / ponto de equilíbrio" }
      ];
      const missing = required.filter((item) => isMetricMissing(metrics[item.key])).map((item) => item.label);
      const volumeOk = hasNumber(metrics.sales) && Number(metrics.sales) >= 3 && hasNumber(metrics.clicks) && Number(metrics.clicks) >= 100 && hasNumber(metrics.spend) && Number(metrics.spend) > 0;
      return { missing, volumeOk, ready: missing.length === 0 && volumeOk };
    }

    function normalizeCreative(raw, index) {
      const spend = parseMoney(raw.spend);
      const revenue = parseMoney(raw.revenue);
      const sales = parseMoney(raw.sales);
      const clicks = parseMoney(raw.clicks);
      const pageViews = parseMoney(raw.pageViews);
      const checkouts = parseMoney(raw.checkouts);
      const impressions = parseMoney(raw.impressions);
      const maxCpa = firstNumber(parseMoney(raw.maxCpa), state.data.breakevenCpa, state.data.profitBeforeAds);

      const cpcInput = parseMoney(raw.cpc);
      const cpmInput = parseMoney(raw.cpm);
      const ctrInput = parsePercent(raw.ctr);
      const viewRateInput = parsePercent(raw.viewRate);
      const pvIcInput = parsePercent(raw.pvIc);
      const icPurchaseInput = parsePercent(raw.icPurchase);
      const cpaInput = parseMoney(raw.cpa);
      const roasInput = parseMoney(raw.roas);

      const metrics = {
        spend,
        revenue,
        sales,
        clicks,
        pageViews,
        checkouts,
        impressions,
        cpc: firstNumber(cpcInput, divideMetric(spend, clicks)),
        cpm: firstNumber(cpmInput, divideMetric(spend, impressions, 1000)),
        ctr: firstNumber(ctrInput, divideMetric(clicks, impressions, 100)),
        viewRate: firstNumber(viewRateInput, divideMetric(pageViews, clicks, 100)),
        pvIc: firstNumber(pvIcInput, divideMetric(checkouts, pageViews, 100)),
        icPurchase: firstNumber(icPurchaseInput, divideMetric(sales, checkouts, 100)),
        cpa: firstNumber(cpaInput, hasNumber(spend) && hasNumber(sales) && Number(sales) > 0 ? Number(spend) / Number(sales) : null),
        roas: firstNumber(roasInput, divideMetric(revenue, spend)),
        hookRate: parsePercent(raw.hookRate),
        retention: parsePercent(raw.retention),
        frequency: parseMoney(raw.frequency),
        maxCpa
      };

      const hasAnyData = [spend, revenue, sales, clicks, pageViews, checkouts, impressions, metrics.ctr, metrics.cpc, metrics.cpm, metrics.hookRate, metrics.retention, metrics.roas, metrics.cpa].some(hasNumber);
      const volumeLabel = getCreativeVolumeLabel(metrics);
      const evaluation = evaluateCreative(metrics, volumeLabel);

      return {
        id: `creative-${index}`,
        order: index + 1,
        name: raw.name || `Criativo ${index + 1}`,
        angle: raw.angle || "",
        raw,
        metrics,
        hasAnyData,
        volumeLabel,
        score: evaluation.score,
        action: evaluation.action,
        level: evaluation.level,
        diagnosis: evaluation.diagnosis,
        nextStep: evaluation.nextStep,
        strengths: evaluation.strengths,
        issues: evaluation.issues,
        scaleReadiness: evaluation.scaleReadiness
      };
    }

    function getCreativeVolumeLabel(metrics) {
      if ((hasNumber(metrics.sales) && metrics.sales >= 3) || (hasNumber(metrics.clicks) && metrics.clicks >= 150) || (hasNumber(metrics.impressions) && metrics.impressions >= 5000)) return "ok";
      if ((hasNumber(metrics.clicks) && metrics.clicks >= 60) || (hasNumber(metrics.impressions) && metrics.impressions >= 2000) || (hasNumber(metrics.spend) && metrics.spend >= 30)) return "médio";
      return "baixo";
    }

    function evaluateCreative(metrics, volumeLabel) {
      let score = 0;
      const strengths = [];
      const issues = [];

      if (metrics.ctr !== null) {
        if (metrics.ctr >= 1.5) { score += 14; strengths.push("CTR forte: o criativo chama clique."); }
        else if (metrics.ctr >= 0.8) { score += 5; strengths.push("CTR aceitável, mas ainda pode melhorar."); }
        else { score -= 14; issues.push("CTR baixo: o gancho ou promessa não está puxando clique suficiente."); }
      }

      if (metrics.cpc !== null) {
        if (metrics.cpc < 1) { score += 10; strengths.push("CPC leve: clique barato para testar."); }
        else if (metrics.cpc <= 2) { score += 2; }
        else { score -= 8; issues.push("CPC pesado: clique caro para esse criativo."); }
      }

      if (metrics.cpm !== null) {
        if (metrics.cpm < 20) score += 4;
        else if (metrics.cpm > 60) { score -= 5; issues.push("CPM alto: público/leilão pode estar caro."); }
      }

      if (metrics.viewRate !== null) {
        if (metrics.viewRate >= 85) { score += 8; strengths.push("Boa chegada na página."); }
        else if (metrics.viewRate >= 75) { score += 4; }
        else { score -= 14; issues.push("Muitos cliques não viram página carregada."); }
      }

      if (metrics.pvIc !== null) {
        if (metrics.pvIc >= 20) { score += 12; strengths.push("Quem chega avança bem para checkout."); }
        else if (metrics.pvIc >= 15) { score += 4; }
        else { score -= 14; issues.push("Chega na página, mas não inicia checkout."); }
      }

      if (metrics.icPurchase !== null) {
        if (metrics.icPurchase >= 40) { score += 12; strengths.push("Checkout fecha bem para esse tráfego."); }
        else if (metrics.icPurchase >= 25) { score += 4; }
        else { score -= 14; issues.push("Checkout está travando depois desse criativo."); }
      }

      if (metrics.roas !== null) {
        if (metrics.roas > 2) { score += 18; strengths.push("ROAS forte para teste de escala controlada."); }
        else if (metrics.roas >= 1) { score += 5; strengths.push("ROAS existe, mas ainda precisa melhorar."); }
        else { score -= 20; issues.push("ROAS abaixo de 1: devolve menos receita do que gasta."); }
      }

      if (metrics.cpa !== null && metrics.maxCpa !== null) {
        if (metrics.cpa <= metrics.maxCpa) { score += 16; strengths.push("CPA cabe no limite salvo."); }
        else { score -= 22; issues.push("CPA acima do limite salvo."); }
      } else if (metrics.cpa !== null) {
        score += 2;
      }

      if (hasNumber(metrics.sales)) {
        if (metrics.sales >= 3) { score += 8; strengths.push("Já tem volume mínimo de compras."); }
        else if (metrics.sales >= 1) { score += 3; strengths.push("Já gerou compra, mas ainda precisa de volume."); }
        else if (hasNumber(metrics.spend) && metrics.spend > 0) { score -= 12; issues.push("Ainda tem 0 compras com gasto registrado. Isso é alerta vermelho, não dado ausente."); }
      }

      if (metrics.hookRate !== null) {
        if (metrics.hookRate >= 30) { score += 8; strengths.push("Gancho inicial forte."); }
        else if (metrics.hookRate >= 18) { score += 3; }
        else { score -= 8; issues.push("Gancho inicial fraco: troca abertura ou primeira cena."); }
      }

      if (metrics.retention !== null) {
        if (metrics.retention >= 25) { score += 6; strengths.push("Retenção acima do básico."); }
        else if (metrics.retention < 12) { score -= 7; issues.push("Retenção baixa: o vídeo perde atenção cedo."); }
      }

      if (metrics.frequency !== null) {
        if (metrics.frequency > 4) { score -= 8; issues.push("Frequência alta: pode estar saturando."); }
        else if (metrics.frequency > 2.5) { score -= 3; issues.push("Frequência em atenção: monitorar fadiga."); }
      }

      const scaleReadiness = getCreativeScaleReadiness(metrics);

      if (volumeLabel === "baixo") {
        return {
          score: Math.round(score),
          level: "warning",
          action: "Coletar mais dados",
          diagnosis: "Ainda tem pouco volume. Não dá para mandar escalar ou pausar com segurança só por esse sinal.",
          nextStep: "Deixe rodar um pouco mais ou compare depois de atingir volume parecido entre os criativos.",
          strengths,
          issues,
          scaleReadiness
        };
      }

      if (issues.some((text) => text.includes("CPA acima") || text.includes("ROAS abaixo") || text.includes("CTR baixo")) && score <= 0) {
        return {
          score: Math.round(score),
          level: "danger",
          action: "Pausar/reduzir ou refazer",
          diagnosis: "Esse criativo tem sinal forte de desperdício ou baixa resposta.",
          nextStep: "Reduza verba, pause para teste novo ou refaça gancho, promessa e primeira cena antes de insistir.",
          strengths,
          issues,
          scaleReadiness
        };
      }

      if (score >= 42 && !issues.some((text) => text.includes("CPA acima") || text.includes("ROAS abaixo"))) {
        if (!scaleReadiness.ready) {
          const missingText = scaleReadiness.missing.length ? ` Falta: ${scaleReadiness.missing.join(", ")}.` : "";
          return {
            score: Math.round(score),
            level: "warning",
            action: "Vencedor provisório",
            diagnosis: "Esse criativo tem bons sinais, mas ainda não tem base completa para escalar com segurança." + missingText,
            nextStep: "Mantenha em teste, complete os dados essenciais e só mova verba pesada quando houver volume parecido entre os criativos.",
            strengths,
            issues,
            scaleReadiness
          };
        }
        return {
          score: Math.round(score),
          level: "success",
          action: "Candidato a escala controlada",
          diagnosis: "Esse criativo está combinando atenção, custo, CPA, ROAS e volume melhor que os demais sinais.",
          nextStep: "Teste aumento gradual de verba e monitore se CPA, ROAS, CTR e frequência continuam saudáveis.",
          strengths,
          issues,
          scaleReadiness
        };
      }

      if (score >= 18) {
        return {
          score: Math.round(score),
          level: "warning",
          action: "Manter e otimizar",
          diagnosis: "Esse criativo tem sinal útil, mas ainda pode melhorar antes de receber mais verba.",
          nextStep: "Crie variações de gancho, capa, primeira fala ou CTA mantendo o que já funcionou.",
          strengths,
          issues,
          scaleReadiness
        };
      }

      return {
        score: Math.round(score),
        level: "warning",
        action: "Monitorar com cuidado",
        diagnosis: "O criativo ainda não provou força suficiente nem deu um motivo claro para corte definitivo.",
        nextStep: "Compare com mais dados ou rode uma nova variação antes de mover verba pesada.",
        strengths,
        issues,
        scaleReadiness
      };
    }

    function buildCreativeSummary(champion, weakest, canShiftBudget, creatives) {
      if (!champion) {
        return {
          level: "warning",
          title: "Ainda falta dado para comparar",
          main: "Sem dados preenchidos, o app não consegue separar vencedor, monitoramento e pausa.",
          action: "Preencha pelo menos dois criativos com gasto, impressões, cliques e resultado."
        };
      }

      if (creatives.length === 1) {
        return {
          level: "warning",
          title: "Só existe um criativo preenchido",
          main: "Dá para analisar esse criativo, mas comparação real precisa de pelo menos dois.",
          action: "Adicione outro criativo da mesma campanha para o app apontar diferença de força."
        };
      }

      if (canShiftBudget) {
        return {
          level: "success",
          title: `Melhor sinal agora: ${champion.name}`,
          main: `${champion.name} está mais forte que ${weakest.name} no conjunto de métricas. Não é para subir verba no escuro, mas faz sentido priorizar o criativo vencedor e reduzir o que está queimando sinal.`,
          action: `Teste mover verba aos poucos para ${champion.name}, enquanto pausa/reduz ou refaz ${weakest.name}. Continue olhando CPA, ROAS e frequência.`
        };
      }

      if (champion && champion.action === "Vencedor provisório") {
        return {
          level: "warning",
          title: `Vencedor provisório: ${champion.name}`,
          main: `${champion.name} está melhor no ranking, mas ainda faltam dados essenciais ou volume para recomendar escala. Isso evita o erro de declarar vencedor por sinal curto, venda isolada ou ROAS sozinho.`,
          action: "Complete os dados mínimos, iguale a janela de comparação e só depois decida se move verba."
        };
      }

      if (champion.level === "success") {
        return {
          level: "success",
          title: `Criativo mais forte: ${champion.name}`,
          main: "Existe um candidato melhor, mas a escala ainda deve ser controlada. O app não está dizendo para dobrar verba de uma vez.",
          action: "Suba pouco, observe se o resultado aguenta e mantenha variações novas para não depender de um único criativo."
        };
      }

      return {
        level: "warning",
        title: "Ainda não existe campeão claro",
        main: "Os criativos têm sinais mistos ou pouco volume. Forçar escala agora pode transformar teste em prejuízo.",
        action: "Continue testando variações. Priorize melhorar o pior gargalo: CTR baixo, CPC caro, queda na página, CPA alto ou ROAS fraco."
      };
    }

    function buildCreativeComparisonHtml(result) {
      const decisionClass = result.summary.level === "success" ? "" : result.summary.level === "danger" ? "danger" : "warning";
      const cards = result.creatives.map((creative) => {
        const isBest = result.champion && creative.id === result.champion.id && result.creatives.length > 1;
        const isWeak = result.weakest && creative.id === result.weakest.id && result.creatives.length > 1 && creative.level === "danger";
        const metrics = creative.metrics;
        const metricLine = [
          hasNumber(metrics.spend) ? `Gasto ${formatMoney(metrics.spend)}` : null,
          hasNumber(metrics.ctr) ? `CTR ${formatNumber(metrics.ctr)}%` : null,
          hasNumber(metrics.cpc) ? `CPC ${formatMoney(metrics.cpc)}` : null,
          hasNumber(metrics.cpm) ? `CPM ${formatMoney(metrics.cpm)}` : null,
          hasNumber(metrics.viewRate) ? `Visualização ${formatNumber(metrics.viewRate)}%` : null,
          hasNumber(metrics.pvIc) ? `PV–IC ${formatNumber(metrics.pvIc)}%` : null,
          hasNumber(metrics.icPurchase) ? `IC ${formatNumber(metrics.icPurchase)}%` : null,
          hasNumber(metrics.cpa) ? `CPA ${formatMoney(metrics.cpa)}` : null,
          hasNumber(metrics.roas) ? `ROAS ${formatNumber(metrics.roas)}` : null,
          hasNumber(metrics.frequency) ? `Freq. ${formatNumber(metrics.frequency)}` : null
        ].filter(Boolean).map((item) => `<span>${escapeHtml(item)}</span>`).join("");

        const issues = creative.issues.length ? `<p class="small-note"><strong>Gargalos:</strong> ${escapeHtml(creative.issues.slice(0, 3).join(" "))}</p>` : `<p class="small-note"><strong>Gargalos:</strong> nenhum gargalo crítico apareceu com os dados preenchidos.</p>`;
        const strengths = creative.strengths.length ? `<p class="small-note"><strong>Forças:</strong> ${escapeHtml(creative.strengths.slice(0, 3).join(" "))}</p>` : `<p class="small-note"><strong>Forças:</strong> preencha mais dados para o app enxergar pontos fortes.</p>`;

        return `
          <article class="creative-result-card ${isBest ? "best" : ""} ${isWeak ? "cut" : ""}">
            <div class="creative-title-row">
              <div>
                <h4>${escapeHtml(creative.name)}</h4>
                <p class="small-note">${creative.angle ? `Ângulo: ${escapeHtml(creative.angle)} • ` : ""}Volume: ${creative.volumeLabel === "ok" ? "suficiente" : creative.volumeLabel === "médio" ? "médio" : "baixo"}</p>
              </div>
              <div class="creative-score">${creative.score}</div>
            </div>
            <span class="status-pill status-${creative.level === "success" ? "good" : creative.level === "danger" ? "bad" : "warn"}">${escapeHtml(creative.action)}</span>
            <div class="creative-metrics-line">${metricLine || "<span>Dados ainda incompletos</span>"}</div>
            <p class="small-note"><strong>Diagnóstico:</strong> ${escapeHtml(creative.diagnosis)}</p>
            <p class="small-note"><strong>Próximo passo:</strong> ${escapeHtml(creative.nextStep)}</p>
            ${strengths}
            ${issues}
          </article>
        `;
      }).join("");

      return `
        <div class="decision-banner ${decisionClass}">
          <h4>${escapeHtml(result.summary.title)}</h4>
          <p>${escapeHtml(result.summary.main)}</p>
          <p style="margin-top:10px;"><strong>Ação:</strong> ${escapeHtml(result.summary.action)}</p>
          <div class="reference-warning"><strong>Regra de segurança:</strong> não compare criativo com 2 horas de teste contra criativo com 3 dias rodando. Use janela parecida, mesma campanha e verba parecida para uma decisão mais justa.</div>
        </div>

        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Comparação dos criativos</p>
          <h3>Ranking prático por sinal de decisão</h3>
          <div class="creative-result-grid">${cards}</div>
          <div class="creative-comparison-note"><strong>Como usar:</strong> criativo vencedor não significa escala agressiva automática. Significa candidato para receber mais teste. Criativo fraco não significa apagar tudo sem pensar; significa reduzir risco, pausar ou refazer quando já tiver volume suficiente.</div>
        </div>
      `;
    }


    function analyzeCampaigns(rawCampaigns) {
      const rows = (rawCampaigns || []).map((raw, index) => {
        const result = analyzeCampaign(raw || {});
        const score = scoreCampaignResult(result);
        return { index, name: raw?.name || `Campanha ${index + 1}`, raw: raw || {}, result, score, decision: result.decision };
      }).filter((item) => Object.values(item.raw || {}).some((v) => String(v ?? "").trim() !== ""));
      const sorted = rows.slice().sort((a, b) => b.score - a.score);
      const champion = sorted[0] || null;
      return { rows, sorted, champion };
    }
    function scoreCampaignResult(result) { const levelScore = { good: 2, warn: 0, bad: -3, neutral: -1 }; let score = 0; (result.ratings || []).forEach((rating) => { score += levelScore[rating.level] ?? 0; }); if (result.decision?.level === "success") score += 8; if (result.decision?.level === "warning") score += 1; if (result.decision?.level === "danger") score -= 8; if (result.scaleReadiness?.ready) score += 5; return score; }
    function buildCampaignComparisonHtml(result) { if (!result.rows.length) { return `<div class="card lesson-screen result-space"><p class="micro">Comparação</p><h3>Ainda falta dado</h3><p class="lesson-text">Adicione pelo menos uma campanha com dados para gerar comparação.</p></div>`; } const championText = result.champion ? `${escapeHtml(result.champion.name)} — ${escapeHtml(result.champion.decision.title)}` : "Sem vencedor"; const cards = result.sorted.map((row) => { const metrics = row.result.metrics || {}; const line = [hasNumber(metrics.roas) ? `ROAS ${formatNumber(metrics.roas)}` : null, hasNumber(metrics.cpa) ? `CPA ${formatMoney(metrics.cpa)}` : null, hasNumber(metrics.pvIc) ? `PV–IC ${formatNumber(metrics.pvIc)}%` : null, hasNumber(metrics.icPurchase) ? `IC–Compras ${formatNumber(metrics.icPurchase)}%` : null].filter(Boolean).join(" • "); return `<article class="creative-result-card"><div class="creative-result-head"><div><strong>${escapeHtml(row.name)}</strong><p class="small-note">${escapeHtml(line || "Dados incompletos")}</p></div><div class="creative-score">${row.score}</div></div><span class="status-pill status-${row.decision.level === "success" ? "good" : row.decision.level === "danger" ? "bad" : "warn"}">${escapeHtml(row.decision.title)}</span><p class="small-note"><strong>Ação:</strong> ${escapeHtml(row.decision.action)}</p></article>`; }).join(""); return `<div class="decision-banner ${result.champion?.decision.level === "success" ? "" : "warning"}"><h4>Melhor sinal provisório: ${championText}</h4><p>Compare campanhas com janela, verba e objetivo parecidos. Se faltar volume, trate o resultado como sinal inicial, não como verdade absoluta.</p></div><div class="card lesson-screen"><p class="micro">Comparação de campanhas</p><h3>Leitura lado a lado</h3><div class="creative-result-grid">${cards}</div></div>`; }

    function collectAnalyzerInputs() {
      const raw = {};
      document.querySelectorAll("[data-analyzer-field]").forEach((input) => {
        raw[input.dataset.analyzerField] = input.value.trim();
      });
      return raw;
    }

    function buildAnalyzerEmptyHtml() {
      return `
        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Como ler o resultado</p>
          <h3>O diagnóstico vai aparecer aqui.</h3>
          <p class="lesson-text">A leitura sempre segue a ordem do funil: primeiro anúncio, depois chegada na página, depois página, checkout, CPA e ROAS. Essa ordem evita mexer na peça errada. Use como decisão pontual: ajustar, monitorar, pausar/reduzir ou testar escala controlada.</p>
          <div class="reference-warning"><strong>Trava de segurança:</strong> se você preencher só ROAS, só receita ou poucos dados, o app não vai recomendar escala. Para escala controlada, ele pede Taxa de Visualização, PV–IC, IC–Compras, CPA, CPA máximo/ponto de equilíbrio, ROAS e volume mínimo.</div>
        </div>
      `;
    }

    function analyzeCampaign(raw) {
      const spend = parseMoney(raw.spend);
      const revenue = parseMoney(raw.revenue);
      const sales = parseMoney(raw.sales);
      const clicks = parseMoney(raw.clicks);
      const pageViews = parseMoney(raw.pageViews);
      const checkouts = parseMoney(raw.checkouts);
      const impressions = parseMoney(raw.impressions);

      const cpcInput = parseMoney(raw.cpc);
      const cpmInput = parseMoney(raw.cpm);
      const ctrInput = parsePercent(raw.ctr);
      const viewRateInput = parsePercent(raw.viewRate);
      const pvIcInput = parsePercent(raw.pvIc);
      const icPurchaseInput = parsePercent(raw.icPurchase);
      const cpaInput = parseMoney(raw.cpa);
      const roasInput = parseMoney(raw.roas);

      const metrics = {
        cpc: firstNumber(cpcInput, divideMetric(spend, clicks)),
        cpm: firstNumber(cpmInput, divideMetric(spend, impressions, 1000)),
        ctr: firstNumber(ctrInput, divideMetric(clicks, impressions, 100)),
        viewRate: firstNumber(viewRateInput, divideMetric(pageViews, clicks, 100)),
        pvIc: firstNumber(pvIcInput, divideMetric(checkouts, pageViews, 100)),
        icPurchase: firstNumber(icPurchaseInput, divideMetric(sales, checkouts, 100)),
        cpa: firstNumber(cpaInput, hasNumber(spend) && hasNumber(sales) && Number(sales) > 0 ? Number(spend) / Number(sales) : null),
        roas: firstNumber(roasInput, divideMetric(revenue, spend)),
        ticket: firstNumber(parseMoney(raw.ticket), hasNumber(revenue) && hasNumber(sales) && Number(sales) > 0 ? Number(revenue) / Number(sales) : state.data.ticket),
        maxCpa: firstNumber(parseMoney(raw.maxCpa), state.data.breakevenCpa, state.data.profitBeforeAds),
        frequency: parseMoney(raw.frequency)
      };

      const ratings = [
        rateCpc(metrics.cpc),
        rateCpm(metrics.cpm),
        rateCtr(metrics.ctr),
        rateViewRate(metrics.viewRate),
        ratePvIc(metrics.pvIc),
        rateIcPurchase(metrics.icPurchase),
        rateCpa(metrics.cpa, metrics.maxCpa),
        rateRoas(metrics.roas),
        rateFrequency(metrics.frequency)
      ];

      const normalizedRaw = { spend, revenue, sales, clicks, pageViews, checkouts, impressions };
      const scaleReadiness = getScaleReadiness(metrics, normalizedRaw);
      const decision = decideCampaign({ metrics, raw: normalizedRaw, ratings, scaleReadiness });
      return { metrics, ratings, decision, scaleReadiness };
    }

    function parsePercent(value) {
      return parseMoney(value);
    }

    function rateCpc(value) {
      if (!hasNumber(value)) return rating("CPC", null, "neutral", "Sem dado", "Coloque CPC ou gasto + cliques para avaliar o custo do clique.");
      if (value < 1) return rating("CPC", formatMoney(value), "good", "Leve", "Clique barato. Agora precisa confirmar se esse clique chega e converte.");
      if (value <= 2) return rating("CPC", formatMoney(value), "warn", "Atenção", "Clique em zona intermediária. Cruze com CPM, CTR e ROI antes de decidir.");
      return rating("CPC", formatMoney(value), "bad", "Pesado", "Clique caro. Revisar criativo, público e ângulo antes de escalar.");
    }

    function rateCpm(value) {
      if (!hasNumber(value)) return rating("CPM", null, "neutral", "Sem dado", "Coloque CPM ou gasto + impressões para avaliar o custo da atenção.");
      if (value < 20) return rating("CPM", formatMoney(value), "good", "Leve", "Aparecer está barato. Agora confirme se gera clique qualificado.");
      if (value <= 60) return rating("CPM", formatMoney(value), "warn", "Atenção", "CPM no meio do caminho. Pode funcionar se o funil compensar.");
      return rating("CPM", formatMoney(value), "bad", "Caro", "Leilão pesado ou público competitivo. Teste criativo e público.");
    }

    function rateCtr(value) {
      if (!hasNumber(value)) return rating("CTR", null, "neutral", "Sem dado", "Coloque CTR ou cliques + impressões para medir atração do anúncio.");
      if (value >= 1.5) return rating("CTR", `${formatNumber(value)}%`, "good", "Bom", "O anúncio está chamando atenção. Agora olhe a qualidade do clique.");
      if (value >= 0.8) return rating("CTR", `${formatNumber(value)}%`, "warn", "Morno", "Tem clique, mas talvez o criativo precise de gancho mais forte.");
      return rating("CTR", `${formatNumber(value)}%`, "bad", "Baixo", "Pouca gente clica. Testar novos criativos, promessa e ângulo.");
    }

    function rateViewRate(value) {
      if (!hasNumber(value)) return rating("Taxa de Visualização", null, "neutral", "Sem dado", "Coloque a taxa ou informe cliques + visualizações da página.");
      if (value >= 85) return rating("Taxa de Visualização", `${formatNumber(value)}%`, "good", "Muito boa", "O clique está virando página carregada. A ponte está saudável.");
      if (value >= 75) return rating("Taxa de Visualização", `${formatNumber(value)}%`, "warn", "Boa", "Está aceitável, mas ainda vale observar velocidade e qualidade do clique.");
      return rating("Taxa de Visualização", `${formatNumber(value)}%`, "bad", "Ruim", "Vazamento entre clique e página. Revisar carregamento, promessa, público e tracking.");
    }

    function ratePvIc(value) {
      if (!hasNumber(value)) return rating("PV–IC", null, "neutral", "Sem dado", "Coloque PV–IC ou informe visualizações + inícios de checkout.");
      if (value >= 20) return rating("PV–IC", `${formatNumber(value)}%`, "good", "Saudável", "A página está conduzindo para o checkout.");
      if (value >= 15) return rating("PV–IC", `${formatNumber(value)}%`, "warn", "Morno", "A página até gera intenção, mas ainda dá para melhorar antes de acelerar.");
      return rating("PV–IC", `${formatNumber(value)}%`, "bad", "Página fraca", "As pessoas chegam, mas não avançam. Ajustar promessa, oferta, prova social, CTA e clareza.");
    }

    function rateIcPurchase(value) {
      if (!hasNumber(value)) return rating("IC–Compras", null, "neutral", "Sem dado", "Coloque IC–Compras ou informe checkouts + compras.");
      if (value >= 40) return rating("IC–Compras", `${formatNumber(value)}%`, "good", "Saudável", "Checkout está convertendo bem. Agora confira CPA e margem.");
      if (value >= 25) return rating("IC–Compras", `${formatNumber(value)}%`, "warn", "Com objeção", "Tem gente abandonando. Revisar confiança, pagamento, taxas e fricção.");
      return rating("IC–Compras", `${formatNumber(value)}%`, "bad", "Fuga forte", "O checkout está travando. Simplificar, reforçar garantia e remover atrito.");
    }

    function rateCpa(value, maxCpa) {
      if (!hasNumber(value)) return rating("CPA", null, "neutral", "Sem dado", "Coloque CPA ou gasto + compras para ver se a venda cabe na margem.");
      if (!hasNumber(maxCpa)) return rating("CPA", formatMoney(value), "neutral", "Sem CPA máximo", "CPA calculado, mas falta o ponto de equilíbrio para saber se está saudável.");
      if (value <= maxCpa) return rating("CPA", formatMoney(value), "good", "Cabe na margem", `CPA abaixo do limite de ${formatMoney(maxCpa)}.`);
      return rating("CPA", formatMoney(value), "bad", "Acima do limite", `CPA passou do limite de ${formatMoney(maxCpa)}. Escalar agora pode apertar a conta.`);
    }

    function rateRoas(value) {
      if (!hasNumber(value)) return rating("ROAS", null, "neutral", "Sem dado", "Coloque ROAS ou gasto + receita para medir retorno. ROI é analisado separadamente como lucro sobre investimento.");
      if (value > 2) return rating("ROAS", formatNumber(value), "good", "Bom sinal", "Retorno acima de 2. Só pense em escalar se o funil, o volume e o CPA também estiverem saudáveis.");
      if (value >= 1) return rating("ROAS", formatNumber(value), "warn", "Ajustável", "Existe retorno, mas ainda precisa melhorar gargalos e margem.");
      return rating("ROAS", formatNumber(value), "bad", "Prejuízo", "ROAS abaixo de 1. Não escalar antes de corrigir a causa.");
    }

    function rateFrequency(value) {
      if (!hasNumber(value)) return rating("Frequência", null, "neutral", "Sem dado", "Opcional. Ajuda a perceber saturação do público.");
      if (value <= 2.5) return rating("Frequência", formatNumber(value), "good", "Controlada", "A audiência ainda não parece saturada por frequência.");
      if (value <= 4) return rating("Frequência", formatNumber(value), "warn", "Atenção", "Observe queda de CTR e aumento de CPA. Pode estar começando fadiga.");
      return rating("Frequência", formatNumber(value), "bad", "Alta", "Criativo ou público pode estar cansando. Teste variações.");
    }

    function rating(metric, value, level, label, message) {
      return { metric, value, level, label, message };
    }

    function decideCampaign({ metrics, raw, scaleReadiness }) {
      const hasAnyCore = [metrics.viewRate, metrics.pvIc, metrics.icPurchase, metrics.cpa, metrics.maxCpa, metrics.roas].some(hasNumber);
      if (!hasAnyCore) {
        return {
          level: "warning",
          title: "Ainda falta dado para decidir",
          main: "Preencha pelo menos algumas métricas centrais do funil. Sem isso, o app até orienta, mas não fecha diagnóstico com segurança.",
          action: "Comece por gasto, cliques, visualizações, checkouts, compras e receita. Com esses dados, a tabela fica bem mais precisa."
        };
      }

      if (hasNumber(raw.clicks) && hasNumber(raw.pageViews) && raw.pageViews > raw.clicks * 1.15) {
        return {
          level: "danger",
          title: "Atenção: dados podem estar inconsistentes",
          main: "As visualizações de página estão muito acima dos cliques. Isso pode ser diferença de janela, origem de tráfego ou evento duplicado.",
          action: "Revise pixel, eventos, UTMs e fonte dos dados antes de tomar decisão de escala."
        };
      }

      if (hasNumber(raw.sales) && raw.sales === 0 && hasNumber(raw.spend) && raw.spend > 0) {
        return {
          level: "danger",
          title: "Não escalar: ainda tem 0 compras",
          main: "Compra zero com gasto registrado não é dado ausente; é alerta vermelho. Antes de escalar, precisa entender se o problema está no criativo, página, checkout, oferta ou tracking.",
          action: "Cruze CTR, CPC, Taxa de Visualização, PV–IC e IC–Compras para localizar onde o funil está quebrando."
        };
      }

      if (hasNumber(metrics.viewRate) && metrics.viewRate < 75) {
        return {
          level: "danger",
          title: "Gargalo principal: ponte clique → página",
          main: "O anúncio pode até gerar clique, mas muita gente não chega de verdade na página. Escalar agora compraria mais vazamento.",
          action: "Verifique velocidade mobile, link, promessa do anúncio, público curioso demais e rastreamento."
        };
      }

      if (hasNumber(metrics.pvIc) && metrics.pvIc < 15) {
        return {
          level: "danger",
          title: "Gargalo principal: página/oferta",
          main: "As pessoas chegam, mas não avançam para o checkout. O problema está na capacidade da página de gerar intenção.",
          action: "Ajuste headline, promessa, benefício específico, prova social, CTA, garantia e clareza da oferta."
        };
      }

      if (hasNumber(metrics.icPurchase) && metrics.icPurchase < 25) {
        return {
          level: "danger",
          title: "Gargalo principal: checkout",
          main: "A página até leva para o checkout, mas a compra não fecha. Aqui o problema costuma ser confiança ou fricção.",
          action: "Simplifique checkout, revise taxas inesperadas, parcelamento, métodos de pagamento, garantia e prova social."
        };
      }

      if (hasNumber(metrics.cpa) && hasNumber(metrics.maxCpa) && metrics.cpa > metrics.maxCpa) {
        return {
          level: "danger",
          title: "Gargalo principal: CPA acima da margem",
          main: "Mesmo que o funil pareça funcionar, a venda está custando mais do que o limite saudável.",
          action: "Não escale ainda. Teste aumentar ticket/AOV, kit, upsell, criativo mais eficiente ou público com custo menor."
        };
      }

      if (hasNumber(metrics.roas) && metrics.roas < 1) {
        return {
          level: "danger",
          title: "Não escalar: retorno negativo",
          main: "ROAS abaixo de 1 indica que a campanha está devolvendo menos receita do que o investimento.",
          action: "Ache o gargalo acima antes de colocar mais verba. Escala não corrige prejuízo; ela multiplica o que já existe."
        };
      }

      if (!scaleReadiness.ready) {
        const missingText = scaleReadiness.missing.length ? ` Faltam: ${scaleReadiness.missing.join(", ")}.` : "";
        const volumeText = scaleReadiness.volumeOk ? "" : " Também falta volume mínimo consistente: gasto registrado, pelo menos 100 cliques, 10 inícios de checkout e 3 compras.";
        return {
          level: "warning",
          title: "Não escalar ainda: dados insuficientes",
          main: "O app não recomenda escala com ROAS isolado, métrica faltando ou pouco volume." + missingText + volumeText,
          action: "Complete o funil antes de aumentar orçamento. Até lá, use o diagnóstico apenas para monitorar ou ajustar a métrica mais fraca."
        };
      }

      const allHealthy = metrics.viewRate >= 75 && metrics.pvIc >= 20 && metrics.icPurchase >= 40 && metrics.cpa <= metrics.maxCpa && metrics.roas > 2;

      if (allHealthy) {
        return {
          level: "success",
          title: "Cenário saudável: pode testar escala controlada",
          main: "As principais engrenagens estão trabalhando bem e os dados mínimos de escala foram preenchidos. Isso não significa subir orçamento sem pensar, mas já existe base para testar aumento com controle.",
          action: "Aumente aos poucos, monitore CPA, ROAS, frequência e queda de conversão. Se a estrutura continuar saudável, aí sim a escala faz sentido."
        };
      }

      return {
        level: "warning",
        title: "Cenário ajustável: monitore antes de acelerar",
        main: "Não apareceu um vazamento crítico, mas também não está tudo redondo. A campanha pode melhorar antes de receber mais verba.",
        action: "Ajuste a métrica mais fraca da lista, rode mais dados e compare de novo antes de escalar."
      };
    }

    function buildAnalyzerResultHtml(result) {
      const decisionClass = result.decision.level === "success" ? "" : result.decision.level === "danger" ? "danger" : "warning";
      const cards = result.ratings.map((item) => `
        <div class="health-card">
          <strong>${escapeHtml(item.metric)} <span class="status-pill status-${item.level}">${escapeHtml(item.label)}</span></strong>
          <p class="small-note">${item.value !== null && item.value !== undefined && item.value !== "" ? `<b>${escapeHtml(item.value)}</b> — ` : ""}${escapeHtml(item.message)}</p>
        </div>
      `).join("");

      const missingHtml = result.scaleReadiness && (!result.scaleReadiness.ready) ? `
        <div class="reference-warning"><strong>Dados mínimos para escalar:</strong> ${result.scaleReadiness.missing.length ? `faltam ${escapeHtml(result.scaleReadiness.missing.join(", "))}.` : "métricas essenciais preenchidas."} ${result.scaleReadiness.volumeOk ? "Volume mínimo ok." : "Ainda falta volume mínimo: gasto registrado, 100 cliques, 10 checkouts e 3 compras."}</div>
      ` : `<div class="reference-warning"><strong>Dados mínimos para escalar:</strong> preenchidos. Mesmo assim, a escala deve ser gradual e monitorada.</div>`;

      return `
        <div class="decision-banner ${decisionClass}">
          <h4>${escapeHtml(result.decision.title)}</h4>
          <p>${escapeHtml(result.decision.main)}</p>
          <p style="margin-top:10px;"><strong>Ação:</strong> ${escapeHtml(result.decision.action)}</p>
          <div class="reference-warning"><strong>Lembrete:</strong> diagnóstico bom não é autorização automática para escalar. Confirme volume, tracking, margem e consistência antes de aumentar orçamento.</div>
          ${missingHtml}
        </div>

        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Leitura das métricas</p>
          <h3>Resumo do funil</h3>
          <div class="health-grid">${cards}</div>
        </div>
      `;
    }


    const METHOD_CORE_MODULE_IDS = [
      "mentalidade-escala",
      "cpc",
      "cpm",
      "taxa-visualizacao",
      "pv-ic",
      "ic-compras",
      "cpa",
      "roas-roi",
      "diagnostico-cruzado"
    ];

    const TABELINGO_EXPANSION_MODULE_IDS = [
      "ctr",
      "frequencia",
      "ticket-medio",
      "margem-lucro",
      "ponto-equilibrio",
      "lucro-liquido-venda",
      "aov",
      "volume-de-dados",
      "orcamento-e-gasto",
      "erros-de-rastreamento",
      "regras-de-decisao",
      "checklist-final-campanha",
      "treino-diagnostico"
    ];

    const METHOD_STUDY_ORDER = [
      {
        label: "Passo 1",
        title: "Mentalidade da Escala Inteligente",
        description: "Não escalar no impulso, não olhar ROAS sozinho e entender que escala é ampliar algo estruturalmente saudável.",
        moduleIds: ["mentalidade-escala"]
      },
      {
        label: "Passo 2",
        title: "Métricas de atração",
        description: "CPC e CPM para entender preço do clique, custo da atenção, público, criativo e competição.",
        moduleIds: ["cpc", "cpm"]
      },
      {
        label: "Passo 3",
        title: "Taxa de Visualização",
        description: "A ponte entre clique e página: quantos cliques realmente viram carregamento de página.",
        moduleIds: ["taxa-visualizacao"]
      },
      {
        label: "Passo 4",
        title: "PV–IC",
        description: "A etapa que mostra se a página convence a pessoa a iniciar o checkout.",
        moduleIds: ["pv-ic"]
      },
      {
        label: "Passo 5",
        title: "Fechamento e conta financeira",
        description: "IC–Compras, CPA, ponto de equilíbrio e ROAS para decidir se existe lucro ou prejuízo.",
        moduleIds: ["ic-compras", "cpa", "roas-roi"]
      },
      {
        label: "Passo 6",
        title: "Diagnóstico Cruzado",
        description: "Cruzar sinais do funil para achar o gargalo certo antes de ajustar, pausar ou escalar.",
        moduleIds: ["diagnostico-cruzado"]
      }
    ];

    function renderConsult() {
      const root = document.getElementById("consultRoot");
      if (!root) return;
      const total = MODULES.length;
      const done = state.data.completedModules.length;
      const percent = total ? Math.round((done / total) * 100) : 0;
      root.innerHTML = `
        <div class="card lesson-screen">
          <p class="micro">Consulta rápida</p>
          <h3>Escolha o que você quer revisar agora.</h3>
          <p class="lesson-text">Essa área existe para consulta. A trilha continua em Aprender, e os diagnósticos continuam em Analisar. Aqui você encontra a base do método, a régua, as fórmulas e seu progresso sem abrir tudo de uma vez.</p>
        </div>
        <div class="consult-grid" style="margin-top:14px;">
          <button class="consult-card" type="button" data-route="map">
            <span>🗺️</span>
            <h4>Régua da Tabela</h4>
            <p>Escolha a métrica, selecione a faixa e veja leitura + ação recomendada.</p>
          </button>
          <button class="consult-card" type="button" data-route="reference">
            <span>📚</span>
            <h4>Base do método</h4>
            <p>Veja a sequência principal, o núcleo base e os módulos complementares do Tabelingo.</p>
          </button>
          <button class="consult-card" type="button" data-route="progress">
            <span>📈</span>
            <h4>Progresso</h4>
            <p>${done}/${total} módulos concluídos. Você está com ${percent}% do aprendizado.</p>
          </button>
          <button class="consult-card" type="button" data-route="settings">
            <span>⚙️</span>
            <h4>Produto</h4>
            <p>Configure ticket e dados financeiros para deixar as leituras mais reais.</p>
          </button>
        </div>
      `;
      root.querySelectorAll("[data-route]").forEach((button) => {
        button.addEventListener("click", () => goTo(button.dataset.route));
      });
    }


    function renderReferenceGuide() {
      const root = document.getElementById("referenceGuideRoot");
      if (!root) return;

      const modulePill = (moduleId) => {
        const module = MODULES.find((item) => item.id === moduleId);
        if (!module) return "";
        const unlocked = isModuleUnlocked(module.id);
        return `<button class="tiny-btn" type="button" data-start-module="${module.id}">${unlocked ? "Abrir" : "Bloqueado"} • ${escapeHtml(module.metric || module.title)}</button>`;
      };

      const coreModules = METHOD_CORE_MODULE_IDS.map((moduleId) => MODULES.find((item) => item.id === moduleId)).filter(Boolean);
      const expansionModules = TABELINGO_EXPANSION_MODULE_IDS.map((moduleId) => MODULES.find((item) => item.id === moduleId)).filter(Boolean);

      const coreHtml = coreModules.map((module) => `
        <div class="reference-card">
          <strong>${escapeHtml(module.metric || module.title)}</strong>
          <span>${escapeHtml(module.title)}</span>
        </div>
      `).join("");

      const expansionHtml = expansionModules.map((module) => `
        <div class="reference-card">
          <strong>${escapeHtml(module.metric || module.title)}</strong>
          <span>${escapeHtml(module.title)}</span>
        </div>
      `).join("");

      const orderHtml = METHOD_STUDY_ORDER.map((step) => `
        <div class="reference-step">
          <div>
            <span class="source-pill">${escapeHtml(step.label)}</span>
            <h4>${escapeHtml(step.title)}</h4>
            <p>${escapeHtml(step.description)}</p>
          </div>
          <div class="reference-actions">
            ${step.moduleIds.map(modulePill).join("")}
          </div>
        </div>
      `).join("");

      root.innerHTML = `
        <div class="card lesson-screen">
          <p class="micro">Base do método</p>
          <h3>O Tabelingo separa o núcleo principal dos módulos complementares.</h3>
          <p class="lesson-text">
            A lógica central é analisar o funil como sistema: anúncio, página, checkout, CPA e retorno. O app mantém essa base e adiciona módulos extras para deixar a decisão mais prática, sem apagar nada que já existia.
          </p>
          <div class="reference-warning"><strong>Ajuste aplicado:</strong> ROAS e ROI ficam separados na explicação. ROAS é receita ÷ investimento. ROI é lucro líquido ÷ investimento. Isso evita achar que faturamento bonito significa lucro.</div>
          <div class="reference-warning"><strong>Regra aplicada:</strong> as réguas são referência inicial de diagnóstico, não lei absoluta. Ticket, margem, nicho, plataforma, volume de dados e tracking podem mudar a decisão.</div>
          <div class="reference-warning"><strong>Trava aplicada:</strong> os módulos extras aparecem como complementares/avançados e o analisador não recomenda escala com ROAS isolado, dado ausente ou volume baixo.</div>
        </div>

        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Sequência principal</p>
          <h3>Ordem recomendada para estudar o método.</h3>
          <p class="lesson-text">Essa lista mostra a sequência conceitual do Tabelingo. A trilha gamificada continua existindo com módulos extras, provas e treino diagnóstico.</p>
          <div class="reference-list">${orderHtml}</div>
        </div>

        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Núcleo base</p>
          <h3>Módulos que representam diretamente a Tabela Inteligente.</h3>
          <div class="reference-grid">${coreHtml}</div>
        </div>

        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Expansões mantidas</p>
          <h3>Conteúdos extras que deixam o app mais completo.</h3>
          <p class="lesson-text">Esses módulos continuam no aplicativo porque ajudam na prática: fadiga, volume de dados, orçamento, margem, AOV, tracking, regras de decisão e checklist.</p>
          <div class="reference-grid">${expansionHtml}</div>
        </div>
      `;

      root.querySelectorAll("[data-start-module]").forEach((button) => {
        button.addEventListener("click", () => startModule(button.dataset.startModule));
      });
    }

    function renderSmartMap() {
      const root = document.getElementById("smartMapRoot");
      if (!root) return;

      const groups = SMART_MAP_ROWS.reduce((acc, row) => {
        if (!acc[row.metric]) acc[row.metric] = [];
        acc[row.metric].push(row);
        return acc;
      }, {});

      const metricCards = Object.entries(groups).map(([metric, rows], metricIndex) => {
        const buttons = rows.map((row, rowIndex) => `
          <button class="map-option-btn" type="button" data-map-target="map-${metricIndex}-${rowIndex}">${escapeHtml(row.result)}</button>
        `).join("");
        const results = rows.map((row, rowIndex) => `
          <div class="map-result-box" id="map-${metricIndex}-${rowIndex}">
            <strong>${escapeHtml(row.status)}</strong>
            <p>${escapeHtml(row.action)}</p>
          </div>
        `).join("");
        return `
          <article class="map-metric-card">
            <h4>${escapeHtml(metric)}</h4>
            <div class="map-options">${buttons}</div>
            ${results}
          </article>
        `;
      }).join("");

      const crossCards = CROSS_DIAGNOSIS_ROWS.map((row) => `
        <article class="cross-card">
          <strong>${escapeHtml(row.scenario)}</strong>
          <p>${escapeHtml(row.diagnosis)}</p>
          <small><b>Ação:</b> ${escapeHtml(row.action)}</small>
        </article>
      `).join("");

      root.innerHTML = `
        <div class="card lesson-screen map-guide">
          <p class="micro">Tabela Inteligente</p>
          <h3>Régua de decisão rápida, sem tabela gigante.</h3>
          <p class="lesson-text">Funciona em três passos: escolha a métrica, toque na faixa do resultado e veja a leitura com a ação. Assim você não precisa arrastar tabela larga nem ler tudo de uma vez. As réguas continuam sendo referência inicial; ticket, margem, volume, nicho e tracking podem mudar a decisão.</p>
          <div class="reference-warning"><strong>Como usar:</strong> não leia uma métrica sozinha. Use a régua para entender o sinal e depois cruze com o funil completo.</div>
        </div>

        <div class="interactive-map">${metricCards}</div>

        <div class="card lesson-screen" style="margin-top:18px;">
          <p class="micro">Diagnóstico cruzado</p>
          <h3>Quando as métricas se misturam</h3>
          <p class="lesson-text">Aqui ficam os cenários principais do método em formato de cartões, para não virar uma parede de tabela.</p>
          <div class="cross-card-grid">${crossCards}</div>
        </div>

        <div class="formula-strip">
          <div class="formula-card"><strong>Taxa de Visualização</strong><span>Visualizações da página ÷ Cliques no link × 100</span></div>
          <div class="formula-card"><strong>PV–IC</strong><span>Inícios de checkout ÷ Visualizações da página × 100</span></div>
          <div class="formula-card"><strong>IC–Compras</strong><span>Compras ÷ Inícios de checkout × 100</span></div>
          <div class="formula-card"><strong>ROAS</strong><span>Receita ÷ Investimento em anúncios</span></div>
          <div class="formula-card"><strong>ROI</strong><span>Lucro líquido ÷ Investimento</span></div>
        </div>
      `;

      root.querySelectorAll("[data-map-target]").forEach((button) => {
        button.addEventListener("click", () => {
          const card = button.closest(".map-metric-card");
          card.querySelectorAll(".map-option-btn").forEach((btn) => btn.classList.remove("active"));
          card.querySelectorAll(".map-result-box").forEach((box) => box.classList.remove("show"));
          button.classList.add("active");
          document.getElementById(button.dataset.mapTarget)?.classList.add("show");
        });
      });
    }

    function formatNumber(value) {
      return Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
    }

    function renderSettings() {
      const input = document.getElementById("settingsTicketInput");
      const label = document.getElementById("currentTicketLabel");

      if (state.data.ticket) {
        input.value = formatMoney(state.data.ticket);
        label.textContent = formatMoney(state.data.ticket);
      } else {
        label.textContent = "não configurado";
      }

      const scaleRange = document.getElementById("uiScaleRange");
      const scaleLabel = document.getElementById("uiScaleLabel");
      const level = Math.min(Math.max(Number(state.data.uiScaleLevel) || 3, 1), 5);
      if (scaleRange) scaleRange.value = String(level);
      if (scaleLabel) scaleLabel.textContent = getScaleLabel(level);
      document.querySelectorAll("[data-theme-choice]").forEach((button) => {
        button.classList.toggle("active", button.dataset.themeChoice === (state.data.theme || "dark"));
      });
    }


    function ensureAssessmentProgress() {
      if (!state.data.assessmentProgress || typeof state.data.assessmentProgress !== "object") {
        state.data.assessmentProgress = {};
      }
    }

    function getAssessmentProgress(moduleId) {
      ensureAssessmentProgress();

      if (!state.data.assessmentProgress[moduleId]) {
        state.data.assessmentProgress[moduleId] = {
          errors: 0,
          answered: {},
          wrongTopics: {},
          failed: false,
          passed: false
        };
      }

      return state.data.assessmentProgress[moduleId];
    }

    function resetAssessmentProgress(moduleId) {
      ensureAssessmentProgress();
      state.data.assessmentProgress[moduleId] = {
        errors: 0,
        answered: {},
        wrongTopics: {},
        failed: false,
        passed: false
      };
      saveData();
    }

    function getAssessmentAnsweredCount(moduleId) {
      const progress = getAssessmentProgress(moduleId);
      return Object.keys(progress.answered || {}).length;
    }

    function getAssessmentResult(module) {
      const progress = getAssessmentProgress(module.id);
      const total = module.assessment?.passingRule?.totalQuestions || module.assessment?.questions?.length || 0;
      const maxErrors = module.assessment?.passingRule?.maxErrors ?? 3;
      const errors = Number(progress.errors || 0);
      const answered = getAssessmentAnsweredCount(module.id);
      const correct = Math.max(0, answered - errors);
      const passed = !progress.failed && answered >= total && errors <= maxErrors;

      return { total, maxErrors, errors, answered, correct, passed };
    }

    function formatDataLabel(key) {
      return String(key)
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    function getWeakTopicHtml(module) {
      const progress = getAssessmentProgress(module.id);
      const wrongTopics = progress.wrongTopics || {};
      const entries = Object.entries(wrongTopics).sort((a, b) => b[1] - a[1]);
      if (!entries.length) {
        return `<p class="small-note">Nenhum tópico específico ficou marcado. Tente refazer a prova com calma.</p>`;
      }

      return entries.map(([topic, count]) => {
        const info = module.assessment?.scoringFeedback?.byTopic?.[topic];
        return `
          <div class="mini bad">
            <strong>${escapeHtml(info?.failTitle || "Revisar assunto")}</strong>
            ${escapeHtml(info?.failMessage || "Revise esse assunto antes de tentar novamente.")} <br>
            <span class="small-note">Erros nesse tópico: ${count}</span>
          </div>
        `;
      }).join("");
    }


    function renderLessonScreen() {
      const module = getActiveModule();
      const root = document.getElementById("lessonRoot");

      if (!module) {
        root.innerHTML = `
          <div class="duo-lesson">
            <div class="empty">
              <div class="big">🤔</div>
              <h4>Módulo não apareceu no mapa</h4>
              <p>Volte para a trilha e escolha um módulo que existe.</p>
              <button class="btn" type="button" id="backPath">Voltar pra trilha</button>
            </div>
          </div>
        `;
        document.getElementById("backPath").addEventListener("click", () => goTo("path"));
        return;
      }

      const screen = module.screens[state.activeScreenIndex];
      const percent = Math.round(((state.activeScreenIndex + 1) / Math.max(module.screens.length, 1)) * 100);

      root.innerHTML = `
        <div class="duo-lesson">
          <div class="duo-lesson-top">
            <button class="duo-close" type="button" id="backToPath" aria-label="Sair">×</button>
            <div class="duo-lesson-progress">
              <div class="bar"><div class="bar-fill" style="width:${percent}%"></div></div>
            </div>
            <div class="duo-energy">⚡∞</div>
          </div>

          <div class="duo-lesson-count">${state.activeScreenIndex + 1}/${module.screens.length} • ${escapeHtml(module.title)}</div>

          ${renderScreen(module, screen)}
        </div>
      `;

      bindScreenEvents(module, screen);
    }


    function getCompactText(text) {
      const clean = String(text || "").trim();
      if (clean.length <= 210) return clean;
      const sentenceMatch = clean.match(/^(.{80,210}?[.!?])\s/);
      if (sentenceMatch) return sentenceMatch[1];
      return clean.slice(0, 205).replace(/\s+\S*$/, "") + "...";
    }
    function renderScreen(module, screen) {
      if (screen.type === "assessmentIntro") {
        const rule = module.assessment?.passingRule || {};
        return `
          <div class="duo-challenge duo-intro">
            <p class="duo-kicker">${escapeHtml(screen.eyebrow || "Prova da unidade")}</p>
            <h3>${escapeHtml(screen.title)}</h3>
            <p class="lesson-text">${escapeHtml(screen.subtitle || "")}</p>

            <div class="duo-rule-card">
              <strong>Regra da prova</strong>
              <span>${rule.totalQuestions || module.assessment?.questions?.length || 0} perguntas • máximo ${rule.maxErrors ?? 3} erros • sem adivinhação no escuro.</span>
            </div>

            <div class="lesson-actions">
              <button class="btn" id="startAssessmentBtn" type="button">Começar prova 🔥</button>
              <button class="btn secondary" id="exitLesson" type="button">Sair</button>
            </div>
          </div>
        `;
      }

      if (screen.type === "assessmentQuiz") {
        const result = getAssessmentResult(module);
        const dataHtml = screen.data ? `
          <div class="assessment-data">
            ${Object.entries(screen.data).map(([key, value]) => `
              <div class="assessment-data-row">
                <span>${escapeHtml(formatDataLabel(key))}</span>
                <strong>${escapeHtml(String(value))}</strong>
              </div>
            `).join("")}
          </div>
        ` : "";

        const options = screen.options.map((option, index) => `
          <button class="option duo-option" type="button" data-assessment-option="${index}">
            <span class="letter">${LETTERS[index]}</span>
            <span>${escapeHtml(resolveText(option.text))}</span>
          </button>
        `).join("");

        return `
          <div class="duo-challenge duo-question">
            <p class="duo-kicker">Prova • erros ${result.errors}/${result.maxErrors}</p>
            <h3>${escapeHtml(screen.title)}</h3>
            <p class="lesson-text">${escapeHtml(resolveText(screen.question))}</p>
            ${dataHtml}

            <div class="quiz-options">${options}</div>

            <div class="feedback" id="feedbackBox"></div>

            <div class="lesson-actions">
              <button class="btn hidden" id="nextAfterCorrect" type="button">${state.activeScreenIndex >= module.screens.length - 2 ? "Ver resultado →" : "Continuar →"}</button>
              <button class="btn secondary" id="exitLesson" type="button">Sair</button>
            </div>
          </div>
        `;
      }

      if (screen.type === "assessmentResult") {
        const result = getAssessmentResult(module);
        const passHtml = result.passed ? `
          <div class="duo-result-cards">
            <div class="result-stat yellow"><span>XP</span><strong>${module.xp}</strong></div>
            <div class="result-stat green"><span>Acertos</span><strong>${result.correct}/${result.total}</strong></div>
            <div class="result-stat blue"><span>Erros</span><strong>${result.errors}</strong></div>
          </div>
          <div class="lesson-actions">
            <button class="btn" id="completeModule" type="button">Receber XP ✅</button>
            <button class="btn secondary" id="assessmentRetry" type="button">Refazer 👀</button>
          </div>
        ` : `
          <div class="assessment-score-card fail">
            <h3>❌ Não passou ainda</h3>
            <p>Você respondeu ${result.answered}/${result.total}, acertou ${result.correct} e errou ${result.errors}. O máximo permitido é ${result.maxErrors} erros.</p>
          </div>
          <div class="duo-info-grid">${getWeakTopicHtml(module)}</div>
          <div class="lesson-actions">
            <button class="btn" id="assessmentRetry" type="button">Tentar de novo 🔁</button>
            <button class="btn secondary" id="exitLesson" type="button">Voltar ao mapa</button>
          </div>
        `;

        return `
          <div class="duo-challenge duo-result ${result.passed ? "pass" : "fail"}">
            <h3>${result.passed ? "Unidade concluída!" : "Ainda não foi dessa"}</h3>
            <p>${escapeHtml(screen.body)}</p>
            ${passHtml}
          </div>
        `;
      }

      if (screen.type === "setup") {
        const field = screen.saveAs || "ticket";
        const currentValue = state.data[field] ? formatMoney(state.data[field]) : "";

        return `
          <div class="duo-challenge duo-intro">
            <p class="duo-kicker">${escapeHtml(screen.eyebrow || "Configuração rápida")}</p>
            <h3>${escapeHtml(screen.title)}</h3>
            <p class="lesson-text">${escapeHtml(screen.body)}</p>

            <div class="input-row">
              <input class="money-input" id="lessonTicketInput" type="text" inputmode="decimal" placeholder="${escapeHtml(screen.placeholder || "Ex: 79,90")}" value="${currentValue}" data-save-field="${escapeHtml(field)}" />
              <button class="btn" id="lessonSaveTicket" type="button">${escapeHtml(screen.buttonText || "Salvar ✅")}</button>
            </div>

            <p class="small-note">${escapeHtml(screen.note || "Dica honesta: isso deixa as próximas contas mais próximas da sua realidade.")}</p>

            <div class="lesson-actions">
              <button class="btn secondary" type="button" id="backToPath">Voltar</button>
            </div>
          </div>
        `;
      }

      if (screen.type === "lesson") {
        const cards = (screen.cards || []).map((card) => {
          const emoji = card.status === "good" ? "✅" : card.status === "warn" ? "🟡" : card.status === "bad" ? "⛔" : "💡";
          return `
            <div class="mini ${escapeHtml(card.status || "")}">
              <span class="mini-emoji" aria-hidden="true">${emoji}</span>
              <div>
                <strong>${escapeHtml(card.label)}</strong>
                <span>${escapeHtml(resolveText(card.text))}</span>
              </div>
            </div>
          `;
        }).join("");

        const dynamic = screen.dynamicNote ? `<div class="duo-rule-card">${getDynamicNote(screen.dynamicNote)}</div>` : "";
        const formula = screen.formula ? `<div class="duo-rule-card"><strong>Fórmula</strong><span>${escapeHtml(screen.formula)}</span></div>` : "";

        const fullBody = resolveText(screen.body);
        const compactBody = getCompactText(fullBody);
        const detailsHtml = compactBody !== fullBody ? `<details class="clean-details"><summary>Ver explicação completa</summary><p>${escapeHtml(fullBody)}</p></details>` : "";

        return `
          <div class="duo-challenge duo-intro">
            <p class="duo-kicker">${escapeHtml(screen.eyebrow || "Aula")}</p>
            <h3>${escapeHtml(screen.title)}</h3>
            <p class="lesson-text">${escapeHtml(compactBody)}</p>
            ${detailsHtml}
            ${formula}
            ${cards ? `<div class="mini-cards">${cards}</div>` : ""}
            ${dynamic}

            <div class="lesson-actions">
              <button class="btn" id="continueBtn" type="button">Continuar →</button>
              ${state.activeScreenIndex > 0 ? `<button class="btn secondary" id="prevBtn" type="button">← Voltar</button>` : ""}
              <button class="btn secondary" id="exitLesson" type="button">Sair</button>
            </div>
          </div>
        `;
      }

      if (screen.type === "quiz") {
        const options = screen.options.map((option, index) => `
          <button class="option duo-option" type="button" data-option="${index}">
            <span class="letter">${LETTERS[index]}</span>
            <span>${escapeHtml(resolveText(option.text))}</span>
          </button>
        `).join("");

        return `
          <div class="duo-challenge duo-question">
            <h3>${escapeHtml(screen.title)}</h3>
            <p class="lesson-text">${escapeHtml(resolveText(screen.question))}</p>

            <div class="quiz-options">${options}</div>

            <div class="feedback" id="feedbackBox"></div>

            <div class="lesson-actions">
              <button class="btn hidden" id="nextAfterCorrect" type="button">Continuar →</button>
              ${state.activeScreenIndex > 0 ? `<button class="btn secondary" id="prevBtn" type="button">← Voltar</button>` : ""}
              <button class="btn secondary" id="exitLesson" type="button">Sair</button>
            </div>
          </div>
        `;
      }

      if (screen.type === "practice") {
        return renderPracticeScreen(module, screen);
      }

      if (screen.type === "complete") {
        return `
          <div class="duo-challenge duo-result pass">
            <h3>${escapeHtml(screen.title)}</h3>
            <p>${escapeHtml(screen.body)}</p>

            <div class="duo-result-cards">
              <div class="result-stat yellow"><span>XP</span><strong>${screen.xp || module.xp}</strong></div>
              <div class="result-stat green"><span>Status</span><strong>100%</strong></div>
              <div class="result-stat blue"><span>Fase</span><strong>OK</strong></div>
            </div>

            <div class="lesson-actions">
              <button class="btn" id="completeModule" type="button">Receber XP ✅</button>
              <button class="btn secondary" id="reviewModule" type="button">Revisar 👀</button>
            </div>
          </div>
        `;
      }

      return "";
    }


    function bindScreenEvents(module, screen) {

      if (screen.type === "assessmentIntro") {
        document.getElementById("startAssessmentBtn")?.addEventListener("click", () => {
          resetAssessmentProgress(module.id);
          state.activeScreenIndex = 1;
          setSavedScreen(module.id, 1);
          renderLessonScreen();
        });
      }

      if (screen.type === "assessmentResult") {
        document.getElementById("assessmentRetry")?.addEventListener("click", () => {
          resetAssessmentProgress(module.id);
          state.activeScreenIndex = 0;
          setSavedScreen(module.id, 0);
          renderLessonScreen();
        });
      }

      if (screen.type === "assessmentQuiz") {
        const feedbackBox = document.getElementById("feedbackBox");
        const progress = getAssessmentProgress(module.id);
        const screenKey = String(screen.id || state.activeScreenIndex);

        document.querySelectorAll("[data-assessment-option]").forEach((button) => {
          button.addEventListener("click", () => {
            const index = Number(button.dataset.assessmentOption);
            const option = screen.options[index];
            const isCorrect = !!option.correct;

            document.querySelectorAll("[data-assessment-option]").forEach((item) => {
              item.classList.remove("correct", "wrong");
            });

            button.classList.add(isCorrect ? "correct" : "wrong");
            feedbackBox.className = "feedback show " + (isCorrect ? "good" : "bad");

            if (!progress.answered[screenKey]) {
              progress.answered[screenKey] = {
                topic: screen.topic || "mixed",
                firstCorrect: isCorrect
              };

              if (!isCorrect) {
                progress.errors = Number(progress.errors || 0) + 1;
                const topic = screen.topic || "mixed";
                progress.wrongTopics[topic] = Number(progress.wrongTopics?.[topic] || 0) + 1;
              }

              const maxErrors = module.assessment?.passingRule?.maxErrors ?? 3;
              if (progress.errors > maxErrors) {
                progress.failed = true;
              }

              saveData();
            }

            const currentResult = getAssessmentResult(module);

            if (isCorrect) {
              feedbackBox.textContent = option.feedback;
              document.getElementById("nextAfterCorrect")?.classList.remove("hidden");
              playSound("success");
              celebratePulse();
            } else if (currentResult.errors > currentResult.maxErrors) {
              feedbackBox.textContent = option.feedback + " Você passou do limite de erros. Vai pro resultado e revisa onde tropeçou.";
              const nextBtn = document.getElementById("nextAfterCorrect");
              if (nextBtn) {
                nextBtn.textContent = "Ver resultado →";
                nextBtn.classList.remove("hidden");
                nextBtn.onclick = () => {
                  state.activeScreenIndex = module.screens.length - 1;
                  setSavedScreen(module.id, state.activeScreenIndex);
                  renderLessonScreen();
                };
              }
            } else {
              feedbackBox.textContent = option.feedback + " Tenta outra vez.";
              document.getElementById("nextAfterCorrect")?.classList.add("hidden");
              playSound("error");
            }
          });
        });
      }


      if (screen.type === "practice") {
        bindPracticeEvents(module, screen);
      }

      document.getElementById("backToPath")?.addEventListener("click", () => { playSound("pop"); goTo("path"); });
      document.getElementById("exitLesson")?.addEventListener("click", () => { playSound("pop"); goTo("path"); });
      document.getElementById("continueBtn")?.addEventListener("click", () => nextScreen());
      document.getElementById("prevBtn")?.addEventListener("click", () => previousScreen());
      document.getElementById("nextAfterCorrect")?.addEventListener("click", () => nextScreen());

      document.getElementById("lessonSaveTicket")?.addEventListener("click", () => {
        playSound("pop");
        const input = document.getElementById("lessonTicketInput");
        const value = parseMoney(input.value);
        const field = input?.dataset?.saveField || "ticket";

        if (!value || value <= 0) {
          showToast(field === "breakevenCpa" ? "Coloca um CPA máximo válido. Exemplo: 35,00" : field === "profitBeforeAds" ? "Coloca uma margem válida. Exemplo: 32,00" : field === "realCpa" ? "Coloca um CPA real válido. Exemplo: 28,00" : "Coloca um ticket válido. Exemplo: 79,90");
          return;
        }

        state.data[field] = value;
        saveData();
        renderAll();
        showToast(field === "breakevenCpa" ? "CPA máximo salvo. Agora a régua de lucro fica mais real. ✅" : field === "profitBeforeAds" ? "Margem antes do tráfego salva. Agora a conta fica mais honesta. ✅" : field === "realCpa" ? "CPA real salvo. Agora dá para estimar lucro por venda. ✅" : "Ticket salvo. Agora dá pra estudar com base no seu produto. ✅", "success");
        nextScreen();
      });

      document.getElementById("completeModule")?.addEventListener("click", () => completeModule(module));
      document.getElementById("reviewModule")?.addEventListener("click", () => {
        playSound("pop");
        state.activeScreenIndex = 0;
        state.answeredCorrect = false;
        setSavedScreen(module.id, 0);
        renderLessonScreen();
      });

      if (screen.type === "quiz") {
        const feedbackBox = document.getElementById("feedbackBox");
        document.querySelectorAll("[data-option]").forEach((button) => {
          button.addEventListener("click", () => {
            const index = Number(button.dataset.option);
            const option = screen.options[index];
            const isCorrect = !!option.correct;

            document.querySelectorAll("[data-option]").forEach((item) => {
              item.classList.remove("correct", "wrong");
            });

            button.classList.add(isCorrect ? "correct" : "wrong");
            feedbackBox.className = "feedback show " + (isCorrect ? "good" : "bad");

            if (isCorrect) {
              feedbackBox.textContent = option.feedback;
              document.getElementById("nextAfterCorrect")?.classList.remove("hidden");
              playSound("success");
              celebratePulse();
            } else {
              feedbackBox.textContent = option.feedback + " Tenta outra vez.";
              document.getElementById("nextAfterCorrect")?.classList.add("hidden");
              playSound("error");
            }
          });
        });
      }
    }


    function renderPracticeScreen(module, screen) {
      if (!state.activePracticeLevel) {
        const levelCards = PRACTICE_LEVELS.map((level) => {
          const progress = getPracticeProgress(level.id);
          const doneCount = progress.completedOnce ? level.total : Math.min(progress.cursor || 0, level.total);
          const percent = Math.round((doneCount / level.total) * 100);
          const roundLabel = progress.completedOnce ? `Rodada ${progress.round || 2}` : "Primeira rodada";

          return `
            <div class="mini">
              <strong>${level.emoji} ${level.label}</strong>
              <span style="display:block;color:var(--muted);line-height:1.5;margin-bottom:10px;">${escapeHtml(level.description)}</span>
              <div class="bar" style="height:10px;margin:10px 0;"><div class="bar-fill" style="width:${percent}%"></div></div>
              <span class="small-note" style="display:block;margin:0 0 12px;">${doneCount}/${level.total} feitos • ${roundLabel}</span>
              <button class="btn" type="button" data-practice-level="${level.id}">
                ${progress.cursor > 0 || progress.completedOnce ? "Continuar treino ⚡" : "Começar treino 🔥"}
              </button>
            </div>
          `;
        }).join("");

        return `
          <div class="card lesson-screen">
            <p class="micro">${escapeHtml(screen.eyebrow || "Modo prática")}</p>
            <h3>${escapeHtml(screen.title)}</h3>
            <p class="lesson-text">${escapeHtml(screen.body)}</p>

            <div class="mini-cards">${levelCards}</div>

            <div class="formula">
              <strong>Regra:</strong> dentro de cada nível, o Tabelingo guarda sua ordem de exercícios. Ele só começa a repetir depois que você completa os 50 daquele nível.
            </div>

            <div class="lesson-actions">
              <button class="btn secondary" id="exitLesson" type="button">Sair</button>
            </div>
          </div>
        `;
      }

      return renderPracticeExercise(module, state.activePracticeLevel);
    }

    function renderPracticeExercise(module, levelId) {
      const level = PRACTICE_LEVELS.find((item) => item.id === levelId);
      const progress = getPracticeProgress(levelId);
      const scenario = getCurrentPracticeScenario(levelId);
      const currentNumber = Math.min((progress.cursor || 0) + 1, level.total);
      const doneCount = progress.completedOnce ? level.total : Math.min(progress.cursor || 0, level.total);
      const percent = Math.round((doneCount / level.total) * 100);

      const metricsHtml = (scenario.metrics || []).map((metric) => `
        <div class="mini ${escapeHtml(metric.status || "")}">
          <strong>${escapeHtml(metric.label)}</strong>
          ${escapeHtml(metric.value)}
        </div>
      `).join("");

      const optionsHtml = scenario.options.map((option, index) => `
        <button class="option" type="button" data-practice-option="${index}">
          <span class="letter">${LETTERS[index]}</span>
          <span>${escapeHtml(option)}</span>
        </button>
      `).join("");

      return `
        <div class="card lesson-screen">
          <p class="micro">${level.emoji} ${level.label} • Exercício ${currentNumber}/${level.total}</p>
          <h3>${escapeHtml(scenario.title)}</h3>
          <p class="lesson-text">${escapeHtml(scenario.question)}</p>

          <div class="bar" style="margin:18px 0;"><div class="bar-fill" style="width:${percent}%"></div></div>

          <div class="mini-cards">${metricsHtml}</div>

          <div class="quiz-options">${optionsHtml}</div>

          <div class="feedback" id="practiceFeedback"></div>

          <div class="lesson-actions">
            <button class="btn hidden" id="nextPracticeExercise" type="button">Próximo exercício →</button>
            <button class="btn secondary" id="backPracticeLevels" type="button">Trocar nível</button>
            <button class="btn secondary" id="exitLesson" type="button">Sair</button>
          </div>
        </div>
      `;
    }

    function bindPracticeEvents(module, screen) {
      document.getElementById("exitLesson")?.addEventListener("click", () => {
        state.activePracticeLevel = null;
        goTo("path");
      });

      document.querySelectorAll("[data-practice-level]").forEach((button) => {
        button.addEventListener("click", () => {
          state.activePracticeLevel = button.dataset.practiceLevel;
          ensurePracticeOrder(state.activePracticeLevel);
          renderLessonScreen();
        });
      });

      document.getElementById("backPracticeLevels")?.addEventListener("click", () => {
        state.activePracticeLevel = null;
        renderLessonScreen();
      });

      const feedback = document.getElementById("practiceFeedback");
      const scenario = state.activePracticeLevel ? getCurrentPracticeScenario(state.activePracticeLevel) : null;

      document.querySelectorAll("[data-practice-option]").forEach((button) => {
        button.addEventListener("click", () => {
          const selected = Number(button.dataset.practiceOption);
          const isCorrect = selected === scenario.correctIndex;

          document.querySelectorAll("[data-practice-option]").forEach((item) => {
            item.classList.remove("correct", "wrong");
          });

          button.classList.add(isCorrect ? "correct" : "wrong");
          feedback.className = "feedback show " + (isCorrect ? "good" : "bad");

          if (isCorrect) {
            feedback.textContent = scenario.feedbackCorrect || "Boa. Essa é a leitura que encaixa melhor nesse cenário.";
            document.getElementById("nextPracticeExercise")?.classList.remove("hidden");
          } else {
            feedback.textContent = scenario.feedbackWrong || "Essa leitura não encaixa com a etapa principal do gargalo. Repara na ordem do funil e tenta de novo.";
            document.getElementById("nextPracticeExercise")?.classList.add("hidden");
          }
        });
      });

      document.getElementById("nextPracticeExercise")?.addEventListener("click", () => {
        playSound("pop");
        advancePracticeExercise(module, state.activePracticeLevel);
      });
    }

    function getPracticeProgress(levelId) {
      if (!state.data.practiceProgress) {
        state.data.practiceProgress = {};
      }

      if (!state.data.practiceProgress[levelId]) {
        state.data.practiceProgress[levelId] = {
          cursor: 0,
          order: [],
          round: 1,
          completedOnce: false
        };
      }

      return state.data.practiceProgress[levelId];
    }

    function ensurePracticeOrder(levelId) {
      const progress = getPracticeProgress(levelId);
      const scenarios = PRACTICE_SCENARIOS[levelId] || [];

      if (!Array.isArray(progress.order) || progress.order.length !== scenarios.length) {
        progress.order = shuffleIds(scenarios.map((item) => item.id));
        progress.cursor = 0;
        progress.round = progress.round || 1;
        progress.completedOnce = !!progress.completedOnce;
        saveData();
      }
    }

    function getCurrentPracticeScenario(levelId) {
      ensurePracticeOrder(levelId);
      const progress = getPracticeProgress(levelId);
      const scenarios = PRACTICE_SCENARIOS[levelId] || [];
      const safeCursor = Math.min(progress.cursor || 0, scenarios.length - 1);
      const scenarioId = progress.order[safeCursor];
      return scenarios.find((item) => item.id === scenarioId) || scenarios[0];
    }

    function advancePracticeExercise(module, levelId) {
      const progress = getPracticeProgress(levelId);
      const scenarios = PRACTICE_SCENARIOS[levelId] || [];
      progress.cursor = (progress.cursor || 0) + 1;

      if (progress.cursor >= scenarios.length) {
        progress.completedOnce = true;
        progress.round = (progress.round || 1) + 1;
        progress.cursor = 0;
        progress.order = shuffleIds(scenarios.map((item) => item.id));
        showToast("Nível zerado. Agora esse nível pode repetir em nova rodada. 🏆", "success");
      } else {
        showToast("Boa. Próximo cenário na tela. ⚡", "pop");
      }

      if (module?.id === "treino-diagnostico" && isPracticeFullyCompleted() && !state.data.completedModules.includes(module.id)) {
        state.data.completedModules.push(module.id);
        state.data.xp += Number(module.xp || 0);
        showToast("Treino completo: Easy, Médio e Hard zerados. XP caiu na conta. 🔥", "success");
      }

      saveData();
      renderAll();
      renderLessonScreen();
    }

    function shuffleIds(ids) {
      const arr = [...ids];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function shuffleItems(items) {
      const arr = [...items];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function randomizeQuizOptions() {
      MODULES.forEach((module) => {
        (module.screens || []).forEach((screen) => {
          if ((screen.type === "quiz" || screen.type === "assessmentQuiz") && Array.isArray(screen.options)) {
            screen.options = shuffleItems(screen.options);
          }
        });
      });
    }

    function buildPracticeScenarios() {
      return {
        easy: buildEasyScenarios(),
        medium: buildMediumScenarios(),
        hard: buildHardScenarios()
      };
    }

    function makeScenario(level, index, title, metrics, question, correct, wrongs, feedbackCorrect, feedbackWrong) {
      const shuffledOptions = shuffleItems([
        { text: correct, correct: true },
        ...wrongs.slice(0, 4).map((text) => ({ text, correct: false }))
      ]);
      const options = shuffledOptions.map((option) => option.text);
      const correctIndex = shuffledOptions.findIndex((option) => option.correct);

      return {
        id: `${level}-${String(index).padStart(2, "0")}`,
        title,
        metrics,
        question,
        options,
        correctIndex,
        feedbackCorrect,
        feedbackWrong
      };
    }

    function money(value) {
      return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    function pct(value) {
      return `${String(value).replace(".", ",")}%`;
    }

    function buildEasyScenarios() {
      const scenarios = [];
      const wrongGeneric = [
        "O problema principal está obrigatoriamente no checkout.",
        "A campanha está perfeita e deve escalar sem olhar mais nada.",
        "Essa métrica não importa para diagnóstico.",
        "O correto é aumentar orçamento imediatamente."
      ];

      for (let i = 1; i <= 50; i++) {
        const type = (i - 1) % 10;

        if (type === 0) {
          const spend = 20 + i * 4;
          const clicks = 20 + i * 2;
          const cpc = spend / clicks;
          scenarios.push(makeScenario(
            "easy",
            i,
            "Calcule o CPC",
            [
              { label: "Investimento", value: money(spend) },
              { label: "Cliques", value: `${clicks}` }
            ],
            "Qual é o CPC aproximado dessa campanha?",
            `CPC de ${money(cpc)}.`,
            [`CPC de ${money(cpc * 2)}.`, `CPM de ${money(cpc)}.`, `CPA de ${money(spend / 2)}.`, "Não dá para calcular CPC com esses dados."],
            "Boa. CPC é investimento dividido por cliques.",
            "Essa leitura não calcula investimento dividido por cliques. Tenta de novo."
          ));
        }

        if (type === 1) {
          const cpm = [12, 18, 28, 42, 65][i % 5];
          const correct = cpm < 20 ? "CPM saudável/baixo na régua base." : cpm <= 60 ? "CPM em ponto de atenção." : "CPM caro/perigoso na régua base.";
          scenarios.push(makeScenario(
            "easy",
            i,
            "Classifique o CPM",
            [{ label: "CPM", value: money(cpm), status: cpm < 20 ? "good" : cpm <= 60 ? "warn" : "bad" }],
            "Como classificar esse CPM na régua base?",
            correct,
            ["Isso mede custo por compra, não atenção.", "Checkout está obrigatoriamente travado.", "PV–IC está perfeito.", "ROAS está garantido."],
            "Certo. CPM classifica o custo para aparecer mil vezes.",
            "Essa opção mistura CPM com outra etapa. CPM é custo de atenção."
          ));
        }

        if (type === 2) {
          const clicks = 100 + i * 4;
          const views = Math.round(clicks * ([0.62, 0.78, 0.91, 0.70, 0.84][i % 5]));
          const rate = Math.round((views / clicks) * 100);
          const correct = rate < 75 ? "Taxa ruim: tem vazamento entre clique e página." : rate < 85 ? "Taxa boa: a maior parte chega na página." : "Taxa muito boa: o tráfego está chegando limpo.";
          scenarios.push(makeScenario(
            "easy",
            i,
            "Classifique a Taxa de Visualização",
            [
              { label: "Cliques", value: `${clicks}` },
              { label: "Visualizações da página", value: `${views}` },
              { label: "Taxa", value: pct(rate), status: rate < 75 ? "bad" : "good" }
            ],
            "Qual é a leitura correta?",
            correct,
            wrongGeneric,
            "Boa. Essa métrica mede quem clicou e realmente carregou a página.",
            "Olha a ponte clique → página. Essa resposta está olhando a etapa errada."
          ));
        }

        if (type === 3) {
          const pv = 500 + i * 20;
          const ic = Math.round(pv * ([0.10, 0.16, 0.22, 0.14, 0.28][i % 5]));
          const rate = Math.round((ic / pv) * 100);
          const correct = rate < 15 ? "PV–IC baixo: página fraca ou oferta não convence." : rate < 20 ? "PV–IC morno: precisa melhorar página/oferta." : "PV–IC saudável: página conduz para checkout.";
          scenarios.push(makeScenario(
            "easy",
            i,
            "Classifique o PV–IC",
            [
              { label: "Visualizações da página", value: `${pv}` },
              { label: "Inícios de checkout", value: `${ic}` },
              { label: "PV–IC", value: pct(rate), status: rate < 15 ? "bad" : rate < 20 ? "warn" : "good" }
            ],
            "Qual diagnóstico encaixa melhor?",
            correct,
            wrongGeneric,
            "Certo. PV–IC mostra se a página convence a iniciar checkout.",
            "PV–IC não mede clique nem compra final. Ele mede página → checkout."
          ));
        }

        if (type === 4) {
          const starts = 100 + i;
          const purchases = Math.round(starts * ([0.18, 0.31, 0.44, 0.22, 0.52][i % 5]));
          const rate = Math.round((purchases / starts) * 100);
          const correct = rate < 25 ? "IC–Compras ruim: fuga forte no pagamento." : rate < 40 ? "IC–Compras em atenção: existe objeção no checkout." : "IC–Compras saudável: checkout fecha bem.";
          scenarios.push(makeScenario(
            "easy",
            i,
            "Classifique IC–Compras",
            [
              { label: "Inícios de checkout", value: `${starts}` },
              { label: "Compras", value: `${purchases}` },
              { label: "IC–Compras", value: pct(rate), status: rate < 25 ? "bad" : rate < 40 ? "warn" : "good" }
            ],
            "Qual leitura está correta?",
            correct,
            wrongGeneric,
            "Boa. IC–Compras mostra checkout virando compra.",
            "Essa métrica está no fim do funil. Foca no checkout virando compra."
          ));
        }

        if (type === 5) {
          const spend = 120 + i * 6;
          const purchases = 3 + (i % 7);
          const cpa = spend / purchases;
          scenarios.push(makeScenario(
            "easy",
            i,
            "Calcule o CPA",
            [
              { label: "Investimento", value: money(spend) },
              { label: "Compras", value: `${purchases}` }
            ],
            "Qual é o CPA aproximado?",
            `CPA de ${money(cpa)}.`,
            [`CPC de ${money(cpa)}.`, `CPA de ${money(spend)}.`, `ROAS de ${String(cpa).replace(".", ",")}.`, "Não dá para calcular CPA com esses dados."],
            "Certo. CPA é investimento dividido por compras.",
            "CPA é custo por venda. Divide o gasto pela quantidade de compras."
          ));
        }

        if (type === 6) {
          const spend = 100 + i * 10;
          const revenue = spend * ([0.8, 1.4, 2.2, 3.0, 1.0][i % 5]);
          const roas = revenue / spend;
          const correct = roas < 1 ? "ROAS abaixo de 1: voltou menos receita do que investiu." : roas <= 2 ? "ROAS entre 1 e 2: ajustável/atenção." : "ROAS acima de 2: bom sinal, se o funil confirmar.";
          scenarios.push(makeScenario(
            "easy",
            i,
            "Classifique o ROAS",
            [
              { label: "Investimento", value: money(spend) },
              { label: "Receita", value: money(revenue) },
              { label: "ROAS", value: roas.toFixed(1).replace(".", ","), status: roas < 1 ? "bad" : roas <= 2 ? "warn" : "good" }
            ],
            "Qual é a leitura correta?",
            correct,
            wrongGeneric,
            "Boa. ROAS é receita dividida por investimento.",
            "ROAS fala de receita sobre investimento. Não confunde com clique ou checkout."
          ));
        }

        if (type === 7) {
          scenarios.push(makeScenario(
            "easy",
            i,
            "Identifique a métrica",
            [{ label: "Definição", value: "Custo para aparecer mil vezes." }],
            "Qual métrica é essa?",
            "CPM.",
            ["CPC.", "PV–IC.", "IC–Compras.", "CPA."],
            "Certo. CPM é custo por mil impressões.",
            "Essa definição é de custo de exibição, não de clique, página ou venda."
          ));
        }

        if (type === 8) {
          scenarios.push(makeScenario(
            "easy",
            i,
            "Identifique o gargalo",
            [
              { label: "Taxa de Visualização", value: "91%", status: "good" },
              { label: "PV–IC", value: "11%", status: "bad" }
            ],
            "Onde está o principal suspeito?",
            "Página/oferta não está convencendo a iniciar checkout.",
            ["A ponte clique → página está quebrada.", "Checkout é o único culpado.", "CPM está obrigatoriamente alto.", "ROAS está garantido."],
            "Boa. A chegada está boa, mas a página não leva para checkout.",
            "Se a visualização está boa, o tráfego chegou. Repara no PV–IC baixo."
          ));
        }

        if (type === 9) {
          scenarios.push(makeScenario(
            "easy",
            i,
            "Identifique o checkout",
            [
              { label: "PV–IC", value: "25%", status: "good" },
              { label: "IC–Compras", value: "19%", status: "bad" }
            ],
            "Qual leitura faz mais sentido?",
            "Página leva para checkout, mas o checkout está travando a compra.",
            ["Página não recebe tráfego.", "Criativo é o único problema.", "CPM está perfeito.", "Taxa de Visualização é obrigatoriamente baixa."],
            "Certo. PV–IC bom + IC–Compras baixo aponta fechamento.",
            "A página gerou intenção. O problema aparece depois: no checkout."
          ));
        }
      }

      return scenarios;
    }

    function buildMediumScenarios() {
      const scenarios = [];
      const wrongs = [
        "Escalar imediatamente sem olhar mais nada.",
        "Culpar apenas o checkout.",
        "Ignorar as métricas intermediárias.",
        "Trocar tudo ao mesmo tempo sem diagnóstico."
      ];

      for (let i = 1; i <= 50; i++) {
        const type = (i - 1) % 10;

        if (type === 0) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "Clique barato, chegada ruim",
            [
              { label: "CPC", value: money(0.72), status: "good" },
              { label: "Taxa de Visualização", value: "58%", status: "bad" },
              { label: "PV–IC", value: "—" }
            ],
            "Qual diagnóstico encaixa melhor?",
            "Clique barato, mas existe vazamento entre clique e página.",
            wrongs,
            "Boa. CPC está ok, mas a ponte até a página está quebrando.",
            "Olha a ordem: antes de página e checkout, precisa validar se o clique chegou."
          ));
        }

        if (type === 1) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "Aparece caro, clica barato",
            [
              { label: "CPM", value: money(78), status: "bad" },
              { label: "CPC", value: money(0.86), status: "good" }
            ],
            "Qual leitura é mais correta?",
            "O público pode ser caro, mas o criativo está gerando clique.",
            wrongs,
            "Certo. CPM alto mostra atenção cara; CPC baixo mostra clique acontecendo bem.",
            "Não confunde custo para aparecer com custo para clicar."
          ));
        }

        if (type === 2) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "Página não convence",
            [
              { label: "Taxa de Visualização", value: "88%", status: "good" },
              { label: "PV–IC", value: "9%", status: "bad" }
            ],
            "Onde está o gargalo mais provável?",
            "Na página/oferta, porque o tráfego chega mas não inicia checkout.",
            wrongs,
            "Exato. Chegou bem; não avançou. Suspeito: página/oferta.",
            "A chegada está boa. A queda está na passagem página → checkout."
          ));
        }

        if (type === 3) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "Checkout perde comprador",
            [
              { label: "PV–IC", value: "27%", status: "good" },
              { label: "IC–Compras", value: "21%", status: "bad" }
            ],
            "Qual ação combina mais?",
            "Simplificar checkout, reforçar confiança e revisar pagamento.",
            wrongs,
            "Boa. O problema está no fechamento.",
            "A página está levando para checkout. Repara onde a perda acontece."
          ));
        }

        if (type === 4) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "CPA acima do limite",
            [
              { label: "CPA máximo", value: money(35) },
              { label: "CPA real", value: money(52), status: "bad" },
              { label: "ROAS", value: "1,3", status: "warn" }
            ],
            "Qual leitura faz mais sentido?",
            "Venda está custando acima do limite e a campanha precisa de ajuste antes de escala.",
            wrongs,
            "Certo. CPA acima do limite aperta ou quebra a margem.",
            "Compara CPA real com CPA máximo. Essa é a pista principal."
          ));
        }

        if (type === 5) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "ROAS ruim com página fraca",
            [
              { label: "ROAS", value: "0,8", status: "bad" },
              { label: "PV–IC", value: "10%", status: "bad" },
              { label: "Taxa de Visualização", value: "90%", status: "good" }
            ],
            "O que faz mais sentido ajustar primeiro?",
            "Página/oferta, porque o tráfego chega mas não avança para checkout.",
            wrongs,
            "Boa. ROAS ruim é consequência; PV–IC baixo mostra a causa provável.",
            "A visualização está boa. O gargalo aparece na página."
          ));
        }

        if (type === 6) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "Criativo sem clique",
            [
              { label: "CPM", value: money(24), status: "warn" },
              { label: "CPC", value: money(2.30), status: "bad" }
            ],
            "Qual suspeita é mais forte?",
            "O criativo/promessa pode não estar gerando vontade de clicar.",
            wrongs,
            "Certo. Aparecer não está tão absurdo, mas clicar está caro.",
            "Se CPM não está absurdo e CPC está alto, olha o criativo/promessa."
          ));
        }

        if (type === 7) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "Tudo bom até o resultado",
            [
              { label: "PV–IC", value: "24%", status: "good" },
              { label: "IC–Compras", value: "45%", status: "good" },
              { label: "CPA", value: money(60), status: "bad" },
              { label: "CPA máximo", value: money(38) }
            ],
            "Qual diagnóstico faz sentido?",
            "O funil converte, mas a matemática da margem/oferta está apertada.",
            wrongs,
            "Perfeito. Página e checkout funcionam, mas CPA não cabe.",
            "Se as taxas estão boas e o CPA não cabe, olhe ticket, margem, oferta e custo."
          ));
        }

        if (type === 8) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "Volume baixo, clique qualificado",
            [
              { label: "CTR", value: "0,6%", status: "bad" },
              { label: "PV–IC", value: "28%", status: "good" }
            ],
            "Qual leitura é mais correta?",
            "Pouca gente clica, mas quem clica tende a ser qualificado. Testar novos criativos.",
            wrongs,
            "Boa. O gargalo é gerar mais cliques qualificados.",
            "PV–IC alto mostra que quem chega avança. O problema está antes: clique/CTR."
          ));
        }

        if (type === 9) {
          scenarios.push(makeScenario(
            "medium",
            i,
            "Barato para aparecer, caro para clicar",
            [
              { label: "CPM", value: money(16), status: "good" },
              { label: "CPC", value: money(2.10), status: "bad" }
            ],
            "Qual leitura encaixa melhor?",
            "Aparece barato, mas o criativo/promessa não está puxando clique.",
            wrongs,
            "Exato. Custo de impressão está ok; clique está caro.",
            "Separe impressão de clique. O CPM está bom, o CPC não."
          ));
        }
      }

      return scenarios;
    }

    function buildHardScenarios() {
      const scenarios = [];
      const wrongs = [
        "Escalar porque uma métrica isolada parece boa.",
        "Trocar tudo ao mesmo tempo e perder o controle do teste.",
        "Ignorar a ordem do funil.",
        "Culpar sempre o produto sem olhar gargalos."
      ];

      for (let i = 1; i <= 50; i++) {
        const type = (i - 1) % 10;

        if (type === 0) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Funil vazando antes da página",
            [
              { label: "CPM", value: money(18), status: "good" },
              { label: "CPC", value: money(0.68), status: "good" },
              { label: "Taxa de Visualização", value: "49%", status: "bad" },
              { label: "PV–IC", value: "7%", status: "bad" },
              { label: "ROAS", value: "0,6", status: "bad" }
            ],
            "Qual é a primeira correção mais inteligente?",
            "Resolver a chegada na página: carregamento, promessa, público e rastreamento.",
            wrongs,
            "Perfeito. Antes de culpar página/oferta, muita gente nem está carregando a página.",
            "Olha a primeira quebra do funil. A visualização está destruída."
          ));
        }

        if (type === 1) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Página é o gargalo",
            [
              { label: "CPC", value: money(0.91), status: "good" },
              { label: "Taxa de Visualização", value: "89%", status: "good" },
              { label: "PV–IC", value: "8%", status: "bad" },
              { label: "IC–Compras", value: "42%", status: "good" },
              { label: "ROAS", value: "0,9", status: "bad" }
            ],
            "Qual é o gargalo principal?",
            "Página/oferta: o tráfego chega, mas pouca gente inicia checkout.",
            wrongs,
            "Certo. O checkout fecha bem quando chega gente, mas pouca gente inicia.",
            "A ordem mostra que clique e chegada estão ok. A queda está em PV–IC."
          ));
        }

        if (type === 2) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Checkout está sabotando",
            [
              { label: "PV–IC", value: "31%", status: "good" },
              { label: "IC–Compras", value: "16%", status: "bad" },
              { label: "CPA", value: money(70), status: "bad" },
              { label: "CPA máximo", value: money(42) },
              { label: "ROAS", value: "1,1", status: "warn" }
            ],
            "Qual ação é mais coerente?",
            "Atacar o checkout: confiança, fricção, pagamento, garantia e taxa surpresa.",
            wrongs,
            "Boa. A página leva para checkout, mas a compra morre no fechamento.",
            "PV–IC bom mostra intenção. IC–Compras baixo mostra a perda na última porta."
          ));
        }

        if (type === 3) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Topo caro e criativo fraco",
            [
              { label: "CPM", value: money(74), status: "bad" },
              { label: "CPC", value: money(2.60), status: "bad" },
              { label: "Taxa de Visualização", value: "82%", status: "good" },
              { label: "PV–IC", value: "21%", status: "good" }
            ],
            "Qual hipótese mais forte?",
            "Topo do funil caro: público/leilão pesado e criativo precisando de novos ângulos.",
            wrongs,
            "Exato. Depois que chega, a página até funciona. O custo de entrada está pesado.",
            "O gargalo está antes da página: CPM e CPC."
          ));
        }

        if (type === 4) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "ROAS bonito, lucro suspeito",
            [
              { label: "ROAS", value: "2,4", status: "good" },
              { label: "CPA", value: money(58), status: "warn" },
              { label: "CPA máximo", value: money(45), status: "bad" },
              { label: "Ticket", value: money(97) }
            ],
            "Qual leitura é mais madura?",
            "ROAS parece bom, mas CPA acima do limite indica risco de prejuízo real.",
            wrongs,
            "Perfeito. ROAS bonito não salva CPA acima do ponto de equilíbrio.",
            "Compare retorno com custo máximo. Receita bonita não é lucro automático."
          ));
        }

        if (type === 5) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Funil pronto para teste de escala",
            [
              { label: "CPC", value: money(0.76), status: "good" },
              { label: "Taxa de Visualização", value: "91%", status: "good" },
              { label: "PV–IC", value: "24%", status: "good" },
              { label: "IC–Compras", value: "46%", status: "good" },
              { label: "CPA", value: money(32), status: "good" },
              { label: "CPA máximo", value: money(45), status: "good" },
              { label: "ROAS", value: "2,6", status: "good" }
            ],
            "Qual decisão faz mais sentido?",
            "Considerar escala controlada, mantendo monitoramento de CPA e consistência.",
            wrongs,
            "Boa. O sistema parece saudável, então escala pode ser testada com controle.",
            "Quando todas as engrenagens estão saudáveis, não é correção; é ampliação controlada."
          ));
        }

        if (type === 6) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Cliques curiosos",
            [
              { label: "CPC", value: money(0.49), status: "good" },
              { label: "Taxa de Visualização", value: "86%", status: "good" },
              { label: "PV–IC", value: "6%", status: "bad" },
              { label: "Tempo na página", value: "muito baixo", status: "bad" }
            ],
            "Qual leitura é melhor?",
            "O anúncio pode estar atraindo curiosos ou prometendo algo desalinhado com a página.",
            wrongs,
            "Certo. Clique barato e chegada boa não bastam se a página não gera intenção.",
            "CPC baixo não é vitória se o tráfego não avança."
          ));
        }

        if (type === 7) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Problema de oferta matemática",
            [
              { label: "PV–IC", value: "23%", status: "good" },
              { label: "IC–Compras", value: "43%", status: "good" },
              { label: "Ticket", value: money(49.90), status: "warn" },
              { label: "CPA", value: money(31), status: "warn" },
              { label: "Margem estimada", value: "apertada", status: "bad" }
            ],
            "Qual caminho faz mais sentido?",
            "Ajustar oferta/ticket/margem com kits, combos ou aumento de valor médio.",
            wrongs,
            "Boa. O funil converte, mas a economia da oferta está apertada.",
            "Página e checkout não parecem o gargalo. Olha a matemática da oferta."
          ));
        }

        if (type === 8) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Pixel ou leitura suspeita",
            [
              { label: "Cliques", value: "1.200" },
              { label: "Visualizações da página", value: "1.450", status: "warn" },
              { label: "Taxa calculada", value: "acima de 100%", status: "warn" }
            ],
            "Qual suspeita é mais inteligente?",
            "Rastreamento/eventos podem estar duplicados ou configurados errado.",
            wrongs,
            "Exato. Visualizações maiores que cliques pode indicar tracking duplicado ou leitura inconsistente.",
            "Quando a métrica passa do limite lógico, suspeite de mensuração."
          ));
        }

        if (type === 9) {
          scenarios.push(makeScenario(
            "hard",
            i,
            "Escala emocional",
            [
              { label: "Vendas", value: "2" },
              { label: "ROAS", value: "3,1", status: "good" },
              { label: "Gasto", value: money(28) },
              { label: "Dados", value: "pouco volume", status: "warn" }
            ],
            "Qual decisão é mais segura?",
            "Não escalar pesado ainda; precisa de mais volume e consistência.",
            wrongs,
            "Perfeito. Pouco volume pode enganar. Validação precisa de repetição.",
            "ROAS bonito com pouco dado ainda pode ser sorte. Não escala no impulso."
          ));
        }
      }

      return scenarios;
    }


    function getDynamicNote(kind) {
      const ticket = state.data.ticket;

      if (!ticket) {
        return "Você ainda não configurou o ticket médio. Sem isso, o app mostra a régua base, mas os exemplos ficam menos personalizados.";
      }

      if (kind === "ticketWeight") {
        const one = percentageOfTicket(1, ticket);
        const two = percentageOfTicket(2, ticket);
        return `Com seu ticket de ${formatMoney(ticket)}, um CPC de R$ 1,00 representa cerca de ${one}% do valor da venda. Um CPC de R$ 2,00 representa cerca de ${two}%. Quanto maior esse peso, mais cuidado você precisa ter com conversão e margem.`;
      }

      if (kind === "ticketCpcComparison") {
        const cpc = 2;
        const weight = percentageOfTicket(cpc, ticket);
        let reading = "moderado";
        if (weight >= 6) reading = "pesado";
        if (weight <= 1.5) reading = "leve";

        return `No seu ticket de ${formatMoney(ticket)}, um CPC de R$ 2,00 pesa cerca de ${weight}% da venda. Isso parece ${reading} como ponto de entrada, mas a decisão final ainda depende de margem, CPA e conversão.`;
      }

      if (kind === "pvIcTicketContext") {
        let profile = "intermediário";
        let note = "a régua base ajuda, mas você precisa cruzar PV–IC com margem, CPA e IC–Compras.";
        if (ticket <= 97) {
          profile = "baixo ticket";
          note = "produto de entrada costuma precisar de uma página bem direta, com pouca fricção e PV–IC saudável para gerar volume.";
        } else if (ticket >= 300) {
          profile = "ticket mais alto";
          note = "é normal a decisão ser mais pesada, mas a oferta precisa gerar confiança forte para o checkout não ficar vazio.";
        }

        return `Com seu ticket de ${formatMoney(ticket)}, seu produto entra como ${profile}. Para esse caso, ${note}`;
      }

      if (kind === "icComprasTicketContext") {
        let profile = "intermediário";
        let note = "o checkout precisa ser simples, confiável e sem surpresa para não matar comprador quente.";
        if (ticket <= 97) {
          profile = "baixo ticket";
          note = "o comprador costuma decidir mais rápido, então qualquer fricção besta no checkout pode derrubar volume.";
        } else if (ticket >= 300) {
          profile = "ticket mais alto";
          note = "a pessoa tende a sentir mais risco, então garantia, prova, parcelamento e segurança precisam ficar muito claros.";
        }

        return `Com seu ticket de ${formatMoney(ticket)}, seu produto entra como ${profile}. Para esse caso, ${note}`;
      }

      if (kind === "cpaBreakevenContext") {
        const maxCpa = state.data.breakevenCpa;

        if (!maxCpa) {
          return `Você ainda não salvou seu CPA máximo. Sem ele, dá pra aprender a lógica, mas não dá pra saber com precisão onde começa o prejuízo.`;
        }

        const pct = ticket ? percentageOfTicket(maxCpa, ticket) : null;
        let reading = "um limite operacional";
        if (ticket && (maxCpa / ticket) <= 0.15) reading = "um limite apertado";
        if (ticket && (maxCpa / ticket) >= 0.45) reading = "um limite folgado, desde que sua margem seja real";

        return `Seu CPA máximo salvo é ${formatMoney(maxCpa)}. ${ticket ? `Isso representa cerca de ${pct}% do seu ticket de ${formatMoney(ticket)} e parece ${reading}. ` : ""}Se o CPA real ficar acima disso, a campanha entra em zona de prejuízo.`;
      }

      if (kind === "roasTicketContext") {
        const maxCpa = state.data.breakevenCpa;
        if (!ticket && !maxCpa) {
          return `Sem ticket médio e CPA máximo salvos, o app mostra a régua base do ROAS. Para decisão real de escala, configure esses valores.`;
        }

        if (ticket && maxCpa) {
          const breakEvenRoas = (ticket / maxCpa).toFixed(2).replace(".", ",");
          return `Com ticket de ${formatMoney(ticket)} e CPA máximo de ${formatMoney(maxCpa)}, seu ROAS de equilíbrio aproximado é ${breakEvenRoas}. Abaixo disso, a conta tende a apertar; acima disso, começa a sobrar espaço, desde que os custos estejam corretos.`;
        }

        if (ticket) {
          return `Seu ticket salvo é ${formatMoney(ticket)}. O ROAS mostra quantas vezes o investimento voltou em receita, mas para saber lucro real ainda falta seu CPA máximo/margem.`;
        }

        return `Seu CPA máximo salvo é ${formatMoney(maxCpa)}. Para transformar isso em leitura de ROAS mais precisa, também precisamos do ticket médio.`;
      }

      if (kind === "ticketMedioContext") {
        if (!ticket) {
          return `Você ainda não salvou ticket médio. Quando salvar, o app usa esse valor para personalizar exemplos de CPA, ROAS, escala e margem.`;
        }

        let profile = "intermediário";
        let note = "ele precisa ser comparado com margem, CPA e volume para decidir escala.";
        if (ticket <= 79) {
          profile = "baixo ticket";
          note = "você tende a precisar de volume, página direta, checkout sem fricção e CPA muito controlado.";
        } else if (ticket >= 250) {
          profile = "ticket mais alto";
          note = "você pode suportar CPA maior, mas precisa de mais confiança, prova, garantia e uma oferta muito clara.";
        }

        return `Seu ticket médio salvo é ${formatMoney(ticket)}. Isso parece ${profile}; nesse caso, ${note}`;
      }

      if (kind === "marginContext") {
        const profit = state.data.profitBeforeAds;
        if (!ticket && !profit) {
          return `Sem ticket médio e margem salvos, o app mostra a lógica geral. Para deixar a conta real, salve quanto entra por pedido e quanto sobra antes de pagar anúncio.`;
        }

        if (ticket && profit) {
          const marginPct = percentageOfTicket(profit, ticket);
          let reading = "intermediária";
          if ((profit / ticket) < 0.25) reading = "apertada";
          if ((profit / ticket) >= 0.50) reading = "forte";

          return `Com ticket de ${formatMoney(ticket)} e sobra antes do tráfego de ${formatMoney(profit)}, sua margem aproximada é ${marginPct}% do pedido. Essa margem parece ${reading}.`;
        }

        if (ticket) {
          return `Seu ticket salvo é ${formatMoney(ticket)}, mas ainda falta informar quanto sobra depois dos custos. Sem isso, ticket vira número bonito sem saber se tem lucro.`;
        }

        return `Sua sobra antes do tráfego está salva como ${formatMoney(profit)}. Para calcular percentual de margem, também precisamos do ticket médio.`;
      }

      if (kind === "marginCpaContext") {
        const profit = state.data.profitBeforeAds;
        const maxCpa = state.data.breakevenCpa;

        if (profit && maxCpa) {
          const gap = profit - maxCpa;
          if (gap > 0) {
            return `Sua sobra antes do tráfego é ${formatMoney(profit)} e seu CPA máximo salvo é ${formatMoney(maxCpa)}. Sobra uma folga de ${formatMoney(gap)} por venda antes de outros ajustes.`;
          }

          if (gap === 0) {
            return `Sua sobra antes do tráfego e seu CPA máximo estão iguais em ${formatMoney(profit)}. Isso é ponto de equilíbrio: vende, mas não sobra lucro real depois da mídia.`;
          }

          return `Sua sobra antes do tráfego é ${formatMoney(profit)}, mas seu CPA máximo salvo está em ${formatMoney(maxCpa)}. Tem algo estranho: o limite de CPA está maior que a sobra informada. Revise a conta.`;
        }

        if (profit) {
          return `Sua sobra antes do tráfego é ${formatMoney(profit)}. Seu CPA precisa ficar abaixo disso para sobrar lucro depois da mídia.`;
        }

        return `Você ainda não salvou a sobra antes do tráfego. Sem isso, fica difícil saber se o CPA cabe na margem.`;
      }

      if (kind === "breakEvenFullContext") {
        const ticket = state.data.ticket;
        const profit = state.data.profitBeforeAds;
        const maxCpa = state.data.breakevenCpa;

        if (ticket && profit) {
          const beRoas = (ticket / profit).toFixed(2).replace(".", ",");
          const marginPct = percentageOfTicket(profit, ticket);
          return `Com ticket de ${formatMoney(ticket)} e sobra antes do tráfego de ${formatMoney(profit)}, sua margem antes da mídia é cerca de ${marginPct}%. Seu CPA de equilíbrio aproximado é ${formatMoney(profit)} e seu ROAS de equilíbrio é ${beRoas}. Acima disso começa a sobrar; abaixo disso a conta aperta.`;
        }

        if (ticket && maxCpa) {
          const beRoas = (ticket / maxCpa).toFixed(2).replace(".", ",");
          return `Com ticket de ${formatMoney(ticket)} e CPA máximo salvo de ${formatMoney(maxCpa)}, seu ROAS de equilíbrio aproximado é ${beRoas}. Se o ROAS real ficar abaixo disso, a campanha tende a entrar em zona perigosa.`;
        }

        if (profit) {
          return `Sua sobra antes do tráfego está salva como ${formatMoney(profit)}. Esse é o CPA de equilíbrio aproximado: se pagar mais que isso por venda, a campanha tende a ficar negativa.`;
        }

        return `Você ainda não salvou ticket/margem suficientes para personalizar o ponto de equilíbrio. Mesmo assim, a lógica é: CPA precisa caber na margem e ROAS precisa passar do ROAS mínimo.`;
      }

      if (kind === "netProfitContext") {
        const profit = state.data.profitBeforeAds;
        const realCpa = state.data.realCpa;
        const ticket = state.data.ticket;

        if (profit && realCpa) {
          const net = profit - realCpa;
          const netPct = ticket ? percentageOfTicket(net, ticket) : null;

          if (net > 0) {
            return `Sua sobra antes do tráfego é ${formatMoney(profit)} e seu CPA real salvo é ${formatMoney(realCpa)}. Lucro líquido estimado por venda: ${formatMoney(net)}${ticket ? `, cerca de ${netPct}% do ticket.` : "."} Aqui existe lucro por venda.`;
          }

          if (net === 0) {
            return `Sua sobra antes do tráfego e seu CPA real estão iguais em ${formatMoney(profit)}. Isso é empate: vende, mas não sobra lucro líquido por venda depois da mídia.`;
          }

          return `Sua sobra antes do tráfego é ${formatMoney(profit)}, mas seu CPA real é ${formatMoney(realCpa)}. Lucro líquido estimado: ${formatMoney(net)}. Isso indica prejuízo por venda.`;
        }

        if (profit) {
          return `Sua sobra antes do tráfego está salva como ${formatMoney(profit)}. Para estimar lucro líquido por venda, salve também o CPA real da campanha.`;
        }

        if (realCpa) {
          return `Seu CPA real está salvo como ${formatMoney(realCpa)}, mas ainda falta a sobra antes do tráfego. Sem margem, não dá para saber se esse CPA dá lucro.`;
        }

        return `Para personalizar esta aula, salve a sobra antes do tráfego e o CPA real. A fórmula é simples: lucro líquido por venda = sobra antes do tráfego - CPA real.`;
      }

      if (kind === "aovContext") {
        const ticket = state.data.ticket;
        const profit = state.data.profitBeforeAds;
        const realCpa = state.data.realCpa;

        if (ticket && profit && realCpa) {
          const net = profit - realCpa;
          const netPct = percentageOfTicket(net, ticket);
          return `Com AOV/ticket salvo de ${formatMoney(ticket)}, sobra antes do tráfego de ${formatMoney(profit)} e CPA real de ${formatMoney(realCpa)}, seu lucro estimado por pedido é ${formatMoney(net)}, cerca de ${netPct}% do pedido. Aumentar AOV pode abrir mais folga para tráfego.`;
        }

        if (ticket) {
          return `Seu AOV/ticket salvo é ${formatMoney(ticket)}. Se você aumentar esse valor sem destruir conversão, normalmente ganha mais espaço para pagar CPA e escalar.`;
        }

        return `Você ainda não salvou ticket médio/AOV. Quando salvar, o app usa esse valor para personalizar as leituras de CPA, ROAS, margem e escala.`;
      }

      return "";
    }

    function percentageOfTicket(value, ticket) {
      return ((value / ticket) * 100).toFixed(2).replace(".", ",");
    }

    function parseMoney(value) {
      if (typeof value !== "string") {
        const number = Number(value);
        return Number.isFinite(number) ? number : null;
      }

      let cleaned = value.trim().replace(/[^\d,.-]/g, "");
      if (!cleaned) return null;

      const lastComma = cleaned.lastIndexOf(",");
      const lastDot = cleaned.lastIndexOf(".");

      if (lastComma >= 0 && lastDot >= 0) {
        if (lastComma > lastDot) {
          cleaned = cleaned.replace(/\./g, "").replace(",", ".");
        } else {
          cleaned = cleaned.replace(/,/g, "");
        }
      } else if (lastComma >= 0) {
        cleaned = cleaned.replace(",", ".");
      } else if (lastDot >= 0) {
        const decimals = cleaned.length - lastDot - 1;
        if (decimals > 2) cleaned = cleaned.replace(/\./g, "");
      }

      const number = Number(cleaned);
      return Number.isFinite(number) ? number : null;
    }

    function formatMoney(value) {
      return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }

    function resolveText(text) {
      if (!text) return "";
      return String(text)
        .replaceAll("{{ticket}}", state.data.ticket ? formatMoney(state.data.ticket) : "seu ticket");
    }

    function escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function showToast(message, kind = "pop") {
      toast.textContent = message;
      toast.classList.add("show");
      if (kind === "success") {
        playSound("success");
        celebratePulse();
        spawnParticles({ x: window.innerWidth * .5, y: window.innerHeight * .24, kind: "success", count: 14 });
      } else if (kind === "error") {
        playSound("error");
        triggerShake();
        spawnParticles({ x: window.innerWidth * .5, y: window.innerHeight * .24, kind: "error", count: 10 });
      } else if (kind === "pop") {
        playSound("pop");
      }
      setTimeout(() => toast.classList.remove("show"), 2600);
    }

    renderAll();
