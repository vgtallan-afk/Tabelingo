// Módulo 09 — Treino Diagnóstico
// Módulo integrado ao app com motor especial de prática por níveis.

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
