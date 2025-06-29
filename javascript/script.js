// ============== CÓDIGO GERAL (UTILIZADO EM TODAS AS PÁGINAS) ==============
// Função para marcar a página ativa no menu
document.addEventListener('DOMContentLoaded', function() {
    // Verifica qual página está ativa e marca no menu
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        const pageName = item.getAttribute('href').replace('#', '').replace('.html', '');
        if (pageName === currentPage) {
            item.parentElement.classList.add('active');
        }
    });
});

// ============== PÁGINA "MINHAS AULAS" ==============
// Função para reproduzir vídeo aula
function setupVideoPlayer() {
    const videoPlayer = document.getElementById('video-player');
    const playButton = document.getElementById('play-button');
    
    if (videoPlayer && playButton) {
        playButton.addEventListener('click', function() {
            videoPlayer.play();
            playButton.style.display = 'none';
        });
        
        videoPlayer.addEventListener('click', function() {
            if (videoPlayer.paused) {
                videoPlayer.play();
                playButton.style.display = 'none';
            } else {
                videoPlayer.pause();
                playButton.style.display = 'block';
            }
        });
    }
}

// ============== PÁGINA "ATIVIDADES" ==============
// Funções para filtros de atividades
function setupActivityFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.filter-btn.active').classList.remove('active');
            this.classList.add('active');
            
            const filter = this.textContent.trim();
            filterActivities(filter);
        });
    });
}

function filterActivities(filter) {
    const allActivities = document.querySelectorAll('.activity-card');
    const subjectSections = document.querySelectorAll('.subject-section');
    
    if (filter === 'Todas') {
        allActivities.forEach(activity => activity.style.display = '');
        subjectSections.forEach(section => section.style.display = '');
        return;
    }
    
    // Esconde todas as atividades primeiro
    allActivities.forEach(activity => activity.style.display = 'none');
    
    // Mostra apenas as atividades do filtro selecionado
    if (['Pendentes', 'Concluídas'].includes(filter)) {
        const statusClass = filter === 'Pendentes' ? 'status-pending' : 'status-completed';
        document.querySelectorAll(`.${statusClass}`).forEach(status => {
            status.closest('.activity-card').style.display = '';
        });
    } else {
        // Filtro por matéria
        subjectSections.forEach(section => {
            if (section.querySelector('.subject-title').textContent.includes(filter)) {
                section.style.display = '';
                section.querySelectorAll('.activity-card').forEach(activity => {
                    activity.style.display = '';
                });
            } else {
                section.style.display = 'none';
            }
        });
    }
}

// ============== PÁGINA "CALENDÁRIO" ==============
// Funções para navegação no calendário
function setupCalendarNavigation() {
    document.getElementById('prev-month').addEventListener('click', function() {
        navigateMonth(-1);
    });
    
    document.getElementById('next-month').addEventListener('click', function() {
        navigateMonth(1);
    });
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.view-btn.active').classList.remove('active');
            this.classList.add('active');
            changeCalendarView(this.textContent.trim());
        });
    });
    
    // Eventos do calendário
    document.querySelectorAll('.event').forEach(event => {
        event.addEventListener('click', function() {
            showEventDetails(this.textContent.trim());
        });
    });
}

function navigateMonth(direction) {
    // Lógica para mudar o mês (simulação)
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                   "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const currentMonthElement = document.querySelector('.current-month');
    const currentText = currentMonthElement.textContent.split(' ');
    let currentMonth = months.indexOf(currentText[0]);
    let currentYear = parseInt(currentText[1]);
    
    currentMonth += direction;
    
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    
    currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`;
    // Aqui você carregaria os eventos do novo mês
}

function changeCalendarView(view) {
    console.log(`Mudando para visualização: ${view}`);
    // Implementação real mudaria a exibição do calendário
}

function showEventDetails(eventTitle) {
    const modal = document.getElementById('event-modal');
    const modalTitle = modal.querySelector('h3');
    
    modalTitle.textContent = eventTitle;
    modal.style.display = 'flex';
    
    document.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// ============== PÁGINA "MEU PERFIL" ==============
// Funções para edição do perfil
function setupProfileEditing() {
    // Edição de foto
    document.getElementById('photo-upload').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                document.getElementById('profile-photo').src = event.target.result;
            }
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Edição de biografia
    document.getElementById('edit-bio-btn').addEventListener('click', function() {
        toggleEditForm('bio');
    });
    
    document.getElementById('cancel-bio-btn').addEventListener('click', function(e) {
        e.preventDefault();
        toggleEditForm('bio', false);
    });
    
    document.getElementById('save-bio-btn').addEventListener('click', function(e) {
        e.preventDefault();
        saveProfileField('bio');
    });
    
    // Edição de interesses
    document.getElementById('edit-interests-btn').addEventListener('click', function() {
        toggleEditForm('interests');
    });
    
    document.getElementById('cancel-interests-btn').addEventListener('click', function(e) {
        e.preventDefault();
        toggleEditForm('interests', false);
    });
    
    document.getElementById('save-interests-btn').addEventListener('click', function(e) {
        e.preventDefault();
        saveProfileField('interests');
    });
    
    // Salvar informações pessoais
    document.getElementById('save-profile-btn').addEventListener('click', function() {
        saveProfileField('name');
        alert('Informações pessoais atualizadas com sucesso!');
    });
    
    // Alterar senha
    document.getElementById('change-password-btn').addEventListener('click', function() {
        const currentPass = document.getElementById('current-password').value;
        const newPass = document.getElementById('new-password').value;
        const confirmPass = document.getElementById('confirm-password').value;
        
        if (newPass !== confirmPass) {
            alert('As senhas não coincidem!');
            return;
        }
        
        if (newPass.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        // Simulação de alteração de senha
        alert('Senha alterada com sucesso!');
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
    });
}

function toggleEditForm(field, show = true) {
    const displayElement = document.getElementById(`display-${field}`);
    const formElement = document.getElementById(`${field}-form`);
    
    if (show) {
        displayElement.style.display = 'none';
        formElement.style.display = 'block';
    } else {
        displayElement.style.display = field === 'interests' ? 'flex' : 'block';
        formElement.style.display = 'none';
    }
}

function saveProfileField(field) {
    const inputElement = document.getElementById(`${field}-input`);
    const displayElement = document.getElementById(`display-${field}`);
    
    if (field === 'interests') {
        const interestsArray = inputElement.value.split(',').map(item => item.trim());
        const interestsContainer = displayElement;
        interestsContainer.innerHTML = '';
        
        interestsArray.forEach(interest => {
            if (interest) {
                const tag = document.createElement('span');
                tag.className = 'interest-tag';
                tag.textContent = interest;
                interestsContainer.appendChild(tag);
            }
        });
    } else {
        displayElement.textContent = inputElement.value;
    }
    
    toggleEditForm(field, false);
    alert(`${field === 'bio' ? 'Biografia' : 'Interesses'} atualizados com sucesso!`);
}

// ============== PÁGINA "MINHA TURMA" ==============
// Funções para interação com a turma
function setupClassInteraction() {
    // Alternar entre abas de turmas
    document.querySelectorAll('.class-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelector('.class-tab.active').classList.remove('active');
            this.classList.add('active');
            filterClasses(this.textContent.trim());
        });
    });
    
    // Botões de contato
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Mensagem')) {
            btn.addEventListener('click', function() {
                const teacherName = this.closest('.class-teacher').querySelector('.teacher-name').textContent;
                alert(`Sistema de mensagens para ${teacherName} será aberto em uma versão futura!`);
            });
        }
    });
    
    // Ver perfil
    document.querySelectorAll('.btn-outline').forEach(btn => {
        if (btn.textContent.includes('Perfil')) {
            btn.addEventListener('click', function() {
                const teacherName = this.closest('.class-teacher').querySelector('.teacher-name').textContent;
                alert(`Perfil de ${teacherName} será exibido em uma versão futura!`);
            });
        }
    });
}

function filterClasses(filter) {
    const classContainers = document.querySelectorAll('.class-container');
    
    if (filter === 'Todas as Turmas') {
        classContainers.forEach(container => container.style.display = '');
        return;
    }
    
    classContainers.forEach(container => {
        if (container.querySelector('.class-title').textContent.includes(filter)) {
            container.style.display = '';
        } else {
            container.style.display = 'none';
        }
    });
}

// ============== PÁGINA "MINHAS NOTAS" ==============
// Funções para visualização de notas
function setupGradesView() {
    // Alternar entre abas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelector('.tab.active').classList.remove('active');
            this.classList.add('active');
            changeGradesView(this.textContent.trim());
        });
    });
}

function changeGradesView(view) {
    const summarySection = document.querySelector('.grades-summary').parentElement;
    const tableSection = document.querySelector('.grades-table').parentElement;
    
    switch(view) {
        case 'Visão Geral':
            summarySection.style.display = '';
            tableSection.style.display = 'none';
            break;
        case 'Detalhado':
            summarySection.style.display = 'none';
            tableSection.style.display = '';
            break;
        case 'Histórico':
            // Simulação - carregaria dados históricos
            alert('Carregando histórico de notas...');
            break;
    }
}

// ============== INICIALIZAÇÃO GERAL ==============
// Chame as funções de setup conforme necessário em cada página
function initializePage() {
    const page = document.body.getAttribute('data-page');
    
    switch(page) {
        case 'aulas':
            setupVideoPlayer();
            break;
        case 'atividades':
            setupActivityFilters();
            break;
        case 'calendario':
            setupCalendarNavigation();
            break;
        case 'perfil':
            setupProfileEditing();
            break;
        case 'turma':
            setupClassInteraction();
            break;
        case 'notas':
            setupGradesView();
            break;
        default:
            // Código para página inicial ou outras
            break;
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializePage);