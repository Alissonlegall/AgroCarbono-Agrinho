// ===== SELEÇÃO DE ELEMENTOS DO DOM =====
const formFazenda = document.getElementById('form-fazenda');
const secaoCarbono = document.getElementById('secao-carbono');
const secaoInsumos = document.getElementById('secao-insumos');
const formCarbono = document.getElementById('form-carbono');
const formInsumos = document.getElementById('form-insumos');
const resultadoCarbono = document.getElementById('resultado-carbono');
const resultadoInsumos = document.getElementById('resultado-insumos');
const mensagemBoasvindas = document.getElementById('mensagem-boasvindas');

// Objeto para armazenar os dados da fazenda durante a sessão
let dadosFazenda = {};

// ===== INICIALIZAÇÃO: CARREGAR DADOS SALVOS =====
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se já existem dados salvos no localStorage
    if (localStorage.getItem('dadosFazendaAgrinho')) {
        dadosFazenda = JSON.parse(localStorage.getItem('dadosFazendaAgrinho'));
        // Atualiza interface com dados salvos
        document.getElementById('nome-fazenda').value = dadosFazenda.nome;
        document.getElementById('tamanho-fazenda').value = dadosFazenda.tamanho;
        atualizarTitulo();
        mostrarSecoes();
    }
});

// ===== SEÇÃO 1: BOAS-VINDAS E PERSONALIZAÇÃO =====
formFazenda.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    
    // Captura os valores dos inputs
    const nomeFazenda = document.getElementById('nome-fazenda').value.trim();
    const tamanhoFazenda = parseFloat(document.getElementById('tamanho-fazenda').value);
    
    // Validação simples
    if (!nomeFazenda || isNaN(tamanhoFazenda) || tamanhoFazenda <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    
    // Atualiza o objeto de dados
    dadosFazenda.nome = nomeFazenda;
    dadosFazenda.tamanho = tamanhoFazenda;
    
    // Salva no localStorage
    localStorage.setItem('dadosFazendaAgrinho', JSON.stringify(dadosFazenda));
    
    // Atualiza interface
    atualizarTitulo();
    mostrarSecoes();
    mensagemBoasvindas.style.display = 'block';
    mensagemBoasvindas.textContent = `Bem-vindo, ${nomeFazenda}! Sua fazenda de ${tamanhoFazenda} hectares foi carregada.`;
});

// Função para alterar o título da página dinamicamente
function atualizarTitulo() {
    if (dadosFazenda.nome && dadosFazenda.tamanho) {
        document.title = `Dashboard da Fazenda ${dadosFazenda.nome}, ${dadosFazenda.tamanho} ha`;
        document.querySelector('header h1').textContent = `Fazenda ${dadosFazenda.nome}`;
    }
}

// Função para exibir seções ocultas após preenchimento inicial
function mostrarSecoes() {
    secaoCarbono.style.display = 'block';
    secaoInsumos.style.display = 'block';
}

// ===== SEÇÃO 2: DIAGNÓSTICO FLORESTAL E CRÉDITOS DE CARBONO =====
formCarbono.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Validação: verificar se dados da fazenda existem
    if (!dadosFazenda.tamanho) {
        alert('Primeiro, configure os dados da fazenda na seção 1.');
        return;
    }
    
    // Captura os valores
    const bioma = document.getElementById('bioma').value;
    const mataNativa = parseFloat(document.getElementById('mata-nativa').value);
    
    if (!bioma || isNaN(mataNativa) || mataNativa < 0) {
        alert('Selecione o bioma e informe a área de mata nativa corretamente.');
        return;
    }
    
    // Cálculo da Reserva Legal baseada no Código Florestal Brasileiro
    let percentualReservaLegal;
    switch (bioma) {
        case 'amazonia':
            percentualReservaLegal = 0.80; // 80%
            break;
        case 'cerrado':
            percentualReservaLegal = 0.35; // 35%
            break;
        case 'outros':
            percentualReservaLegal = 0.20; // 20%
            break;
        default:
            percentualReservaLegal = 0;
    }
    
    const areaReservaLegal = dadosFazenda.tamanho * percentualReservaLegal;
    const excedenteFlorestal = mataNativa - areaReservaLegal;
    
    // Constantes para cálculo de carbono
    const TONELADAS_CO2_POR_HA = 10; // Média de captura anual por hectare
    const PRECO_CREDITO_USD = 15.00; // Preço por tonelada de CO2
    
    let resultadoHTML = '';
    
    // Diagnóstico da situação
    resultadoHTML += `<p><strong>Área total da fazenda:</strong> ${dadosFazenda.tamanho} hectares</p>`;
    resultadoHTML += `<p><strong>Bioma selecionado:</strong> ${bioma.charAt(0).toUpperCase() + bioma.slice(1)} (Reserva Legal: ${percentualReservaLegal * 100}%)</p>`;
    resultadoHTML += `<p><strong>Área de Reserva Legal Exigida:</strong> ${areaReservaLegal.toFixed(2)} hectares</p>`;
    resultadoHTML += `<p><strong>Mata Nativa Preservada:</strong> ${mataNativa} hectares</p>`;
    
    if (excedenteFlorestal >= 0) {
        // Situação de excedente ou dentro da reserva
        const potencialCarbono = excedenteFlorestal * TONELADAS_CO2_POR_HA;
        const ganhoFinanceiro = potencialCarbono * PRECO_CREDITO_USD;
        
        resultadoHTML += `<p class="destaque-positivo">✅ <strong>Excedente Florestal:</strong> ${excedenteFlorestal.toFixed(2)} hectares.</p>`;
        resultadoHTML += `<p>🌳 <strong>Potencial de Créditos de Carbono:</strong> ${potencialCarbono.toFixed(2)} toneladas de CO₂/ano.</p>`;
        resultadoHTML += `<p>💰 <strong>Projeção de Ganho Anual:</strong> US$ ${ganhoFinanceiro.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>`;
        resultadoHTML += `<p style="font-size: 0.9rem;"><em>Cálculo baseado em média de ${TONELADAS_CO2_POR_HA} tCO₂/ha/ano e crédito a US$${PRECO_CREDITO_USD}/ton.</em></p>`;
    } else {
        // Déficit de reserva legal
        resultadoHTML += `<p style="color: #c0392b;">⚠️ <strong>Déficit de Reserva Legal:</strong> ${Math.abs(excedenteFlorestal).toFixed(2)} hectares.</p>`;
        resultadoHTML += `<p>🌱 Recomenda-se a restauração florestal para atender à legislação.</p>`;
    }
    
    // Exibe os resultados
    resultadoCarbono.innerHTML = resultadoHTML;
    resultadoCarbono.style.display = 'block';
    
    // Animação suave para rolar até o resultado
    resultadoCarbono.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ===== SEÇÃO 3: OTIMIZAÇÃO DE INSUMOS (TAXA VARIÁVEL) =====
formInsumos.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const gastoAtual = parseFloat(document.getElementById('gasto-fertilizante').value);
    
    if (isNaN(gastoAtual) || gastoAtual < 0) {
        alert('Informe um valor válido para o gasto com fertilizantes.');
        return;
    }
    
    // Parâmetros da simulação de agricultura de precisão
    const REDUCAO_PERCENTUAL = 0.20; // 20% de redução no uso de químicos
    const EMISSAO_EVITADA_POR_REAL = 0.0025; // kg de CO2 evitados por real economizado (base fictícia para demonstração)
    
    const economiaAnual = gastoAtual * REDUCAO_PERCENTUAL;
    const emissaoEvitada = economiaAnual * EMISSAO_EVITADA_POR_REAL;
    
    let resultadoHTML = '';
    resultadoHTML += `<p>💵 <strong>Gasto Atual com Fertilizantes:</strong> R$ ${gastoAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}/ano</p>`;
    resultadoHTML += `<p>📉 <strong>Redução Estimada (Taxa Variável):</strong> ${REDUCAO_PERCENTUAL * 100}%</p>`;
    resultadoHTML += `<p class="destaque-positivo">💰 <strong>Economia Anual Projetada:</strong> R$ ${economiaAnual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>`;
    resultadoHTML += `<p>🌎 <strong>Emissões Evitadas:</strong> ${emissaoEvitada.toFixed(2)} kg de CO₂/ano</p>`;
    resultadoHTML += `<p style="font-size: 0.9rem;"><em>Simulação baseada em práticas de agricultura de precisão e aplicação em taxa variável.</em></p>`;
    
    resultadoInsumos.innerHTML = resultadoHTML;
    resultadoInsumos.style.display = 'block';
    
    resultadoInsumos.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});