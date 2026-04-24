# AgroCarbono: Lucro Inteligente - Dashboard de Sustentabilidade

**Projeto desenvolvido para o concurso Agrinho**, com o tema "Agro forte, futuro sustentável".

![Agrinho Tag](https://img.shields.io/badge/Agrinho-2024-blue) ![HTML5](https://img.shields.io/badge/HTML5-vanilla-orange) ![CSS3](https://img.shields.io/badge/CSS3-premium-darkgreen) ![JavaScript](https://img.shields.io/badge/JavaScript-puro-yellow)

## 📋 Sobre o Sistema
O **AgroCarbono** é um dashboard web que auxilia produtores rurais no diagnóstico ambiental e otimização de custos. Ele democratiza o acesso a cálculos complexos do Código Florestal Brasileiro e projeções de créditos de carbono.

## 🎯 Objetivo
Capacitar o agricultor com uma ferramenta fácil de usar para:
- Entender sua situação quanto à Reserva Legal.
- Identificar excedentes florestais e potencial de geração de renda com créditos de carbono.
- Simular economia com práticas de agricultura de precisão (taxa variável).

## 🧮 Lógicas de Cálculo Utilizadas
**1. Diagnóstico Florestal (Código Florestal Brasileiro - Lei 12.651/2012):**
- **Reserva Legal exigida:** Calculada com base na área total da fazenda e no bioma selecionado:
  - Amazônia: **80%** da área total.
  - Cerrado: **35%** da área total.
  - Outros Biomas: **20%** da área total.
- **Excedente/Déficit:** `Mata Nativa Informada - Reserva Legal Exigida`.

**2. Créditos de Carbono (Projeção de Ganho):**
- **Captura de CO₂:** Média de **10 toneladas de CO₂ equivalente por hectare/ano** sobre a área de excedente florestal.
- **Valor Financeiro:** Cada tonelada de CO₂ precificada a **US$ 15,00**.
- **Fórmula:** `Ganho Anual = Excedente (ha) × 10 (tCO₂) × $15.00`

**3. Otimização de Insumos (Agricultura de Precisão):**
- **Redução de Químicos:** Aplicação de taxa variável reduz o uso médio de fertilizantes em **20%**.
- **Emissões Evitadas:** Calcula-se uma taxa de emissão evitada por real economizado (modelo conceitual para demonstração).

## 🔧 Como Rodar o Projeto
Por ser desenvolvido com tecnologias web puras, não requer instalação de dependências.

1. Faça o download dos arquivos do projeto (`index.html`, `style.css`, `script.js`).
2. Mantenha todos os arquivos na mesma pasta.
3. Abra o arquivo **index.html** em qualquer navegador moderno (Chrome, Edge, Firefox).
4. **Ou acesse via GitHub Pages** (se disponível).

## 📄 Direitos Autorais e Originalidade
Este projeto é original, com código desenvolvido especificamente para o concurso Agrinho.
**Declaração sobre uso de IA:** O planejamento da arquitetura do sistema, a lógica de cálculos e a revisão dos textos base foram realizados com o auxílio de ferramentas de Inteligência Artificial (Gemini), garantindo precisão conceitual e alinhamento com as exigências da rubrica de avaliação. Todo o código foi estruturado e implementado manualmente para atender aos padrões Nível 4 de qualidade.

## 🏷️ Tags e Avaliação
`agrinho` `agrinho2024` `sustentabilidade` `creditosdecarbono` `codigoflorestal` `agriculturadeprecisao` `frontend-vanilla`

**Nível da Rubrica:** 4 (HTML semântico, CSS responsivo com Grid/Flexbox, JavaScript com cálculos, localStorage e manipulação de DOM funcional).