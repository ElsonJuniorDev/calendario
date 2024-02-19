//Funcao para carregar o calendario quando carrega  a pagina
window.onload = function () {
  generateCalendar();
};

//Função que Gera  o calendario
function generateCalendar() {
  const calendar = document.getElementById("calendar");
  //Criando o objeto que pega a data, mes e ano  atual do usuário
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  //Calcula o primeiro e o ultimo dia do mes
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  //Calcula o primeiro dia da semana e a quantidade de dias do mes
  const firstDayOfWeek = firstDayOfMonth.getDate();
  const totalDays = lastDayOfMonth.getDate();
  // Adciona uma DIV em branco para os dias depis do 1 dia do mes
  for (let i = 0; i < firstDayOfWeek; i++) {
    let blankDay = document.createElement("div");
    calendar.appendChild(blankDay);
  }

  //Adiciona as linhas com os dias do mês
  for (let day = 1; day <= totalDays; day++) {
    let daySquare = document.createElement("div");
    daySquare.className = "calendar-day";
    daySquare.textContent = day;
    daySquare.id = `day-${day}`;
    calendar.appendChild(daySquare);
  }
}

//Funcao que mostra o modal para add tarefas
function showAddTaskModal() {
  document.getElementById("addTaskModal").style.display = 'block';
}

//Funcao que esconde o modal
function closeAddTaskModal() {
  document.getElementById("addTaskModal").style.display = 'none';  
}

//Funcao que deleta a tarefa
function deleteTask(taskElement) {
  // Confrimacao  antes de deletar a tarefa
  if (confirm("Tem certeza que deseja deletar essa tarefa ?")) {
    // Se o usuario confirmar, remove o elemento com a tarefa
    taskElement.parentNode.removeChild(taskElement);
  }
}

//Função para Editar a tarefa
function editTask(taskElement) {
  // Prompt para o usuario editar a descricao da tarefa
  const newTaskDesc = prompt("Edite sua tarefa:", taskElement.textContent);
  // Verifica Se o usuário não digitou nada na descrição
  if (newTaskDesc !== null & newTaskDesc.trim() !== "") {
    // Atualiza a descrição da tarefa
    taskElement.textContent = newTaskDesc;
  }
}

//Função Adcionar Tarefa
function addTask() {
    //Pega a data e a descrição da tarefa
  const taskDate = new Date(document.getElementById('task-date').value);
  const taskDesc = document.getElementById('task-desc').value.trim();

  // Verificando se a data está correta e se há alguma descrição para a tarefa
  if (taskDesc && !isNaN(taskDate.getDate())) {
    // Pega os dias do Calendario
    const calendarDays = document.getElementById('calendar').children;
    for (let i = 0; i < calendarDays.length; i++) {
        const day = calendarDays[i];

      if (parseInt(day.textContent) === taskDate.getDate()) {
        //Cria o elemento task
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.textContent = taskDesc;

        // add  o botão de deletar ao botal direito do mouse
        taskElement.addEventListener("contextmenu", function (event) {
          event.preventDefault();
          deleteTask(taskElement);
        });
        
        // adiciona o botão de editar
        taskElement.addEventListener('click', function () {
          editTask(taskElement);
        });

        day.appendChild(taskElement);
        break;
      }
    }
    cloeseAddTaskModal();
  } else {
    alert("Data inválida ou faltando descrição!");
  }
}

