// Simples interação para o calendário
document.querySelectorAll('.event').forEach(event => {
    event.addEventListener('click', function () {
        document.getElementById('event-modal').style.display = 'flex';
    });
});

document.querySelector('.close-modal').addEventListener('click', function () {
    document.getElementById('event-modal').style.display = 'none';
});

document.getElementById('prev-month').addEventListener('click', function () {
    // Lógica para mudar para o mês anterior
    alert('Mudar para o mês anterior');
});

document.getElementById('next-month').addEventListener('click', function () {
    // Lógica para mudar para o próximo mês
    alert('Mudar para o próximo mês');
});

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelector('.view-btn.active').classList.remove('active');
        this.classList.add('active');
        // Aqui iria a lógica para mudar a visualização
    });
});
