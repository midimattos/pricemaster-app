function calculatePrice() {
    // Passo 1: Dados Base
    const fixedCosts = parseFloat(document.getElementById('fixed-costs').value) || 0;
    const workHours = parseFloat(document.getElementById('work-hours').value) || 1;
    const profitMargin = (parseFloat(document.getElementById('desired-profit').value) || 0) / 100;

    // Valor da Hora de Custo (Custos Fixos / Horas Mensais)
    const costPerHour = fixedCosts / workHours;
    document.getElementById('hour-value').innerText = costPerHour.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    // Passo 2: Dados do Serviço
    const serviceTime = parseFloat(document.getElementById('service-time').value) || 0;
    const variableCosts = parseFloat(document.getElementById('variable-costs').value) || 0;

    // Cálculo do Preço
    // Lógica: (Tempo * Custo Hora + Custos Variáveis) / (1 - Margem)
    const baseCost = (serviceTime * costPerHour) + variableCosts;
    const finalPrice = baseCost / (1 - profitMargin);
    const netProfit = finalPrice - baseCost;

    if (finalPrice > 0) {
        document.getElementById('result-card').classList.replace('hidden', 'block');
        document.getElementById('final-price').innerText = finalPrice.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('cost-labor').innerText = (serviceTime * costPerHour).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('net-profit').innerText = netProfit.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        
        // Scroll suave para o resultado
        document.getElementById('result-card').scrollIntoView({ behavior: 'smooth' });
    }
}

// [Verificação]: O caminho deve ser exato para a raiz do seu projeto no Vercel
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('PriceMaster: PWA Ativo'))
            .catch(err => console.error('Erro SW:', err));
    });
}