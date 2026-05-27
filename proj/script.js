async function carregarDados() {

    try {

        const response = await fetch('dados.json');
        const dados = await response.json();

        const estados = [];
        const populacoes = [];

        const tbody = document.querySelector('#tabela tbody');

        tbody.innerHTML = '';

        dados.forEach(item => {

            estados.push(item.estado);
            populacoes.push(item.populacao);

            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${item.estado}</td>
                <td>${item.populacao.toLocaleString('pt-BR')}</td>
            `;

            tbody.appendChild(tr);
        });

        criarGrafico(estados, populacoes);
        criarMapa();

    } catch (erro) {

        console.error(erro);
    }
}

function criarGrafico(estados, populacoes) {

    const ctx = document.getElementById('grafico');

    new Chart(ctx, {

        type: 'bar',

        data: {
            labels: estados,

            datasets: [{
                label: 'População',
                data: populacoes,
                borderWidth: 1
            }]
        },

        options: {
            responsive: true
        }
    });
}

function criarMapa() {

    const mapa = L.map('mapa').setView([-14.2350, -51.9253], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(mapa);

    L.marker([-3.7319, -38.5267])
        .addTo(mapa)
        .bindPopup('Fortaleza - Ceará')
        .openPopup();
}

carregarDados();