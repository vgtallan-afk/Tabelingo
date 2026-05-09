// Módulo 07 — ROAS/ROI
// Objeto pronto para colar dentro do array MODULES.

{
        id: "roas-roi",
        title: "ROAS/ROI: retorno sem ilusão",
        metric: "ROAS/ROI",
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
            title: "Módulo ROAS/ROI amassado",
            body: "Agora você sabe que ROAS mostra retorno em receita, ROI olha lucro e nenhum dos dois deve ser lido sozinho. Resultado final bonito só presta quando o funil inteiro e a margem confirmam. Próximo módulo natural: Diagnóstico Cruzado, o cérebro da tabela.",
            xp: 150
          }
        ]
      }
