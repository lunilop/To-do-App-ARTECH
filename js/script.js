// ============================================
// TAREA: Crear una To Do App
// ============================================
//
// REQUISITOS:
// 1. Implementar un CRUD completo:
//      - Crear
//      - Leer
//      - Actualizar
//      - Eliminar
//
// 2. Guardad los datps localmente (LocalStorage)
// 3. Diseño interfaz de forma clara y amigable.
//
// ============================================

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';


    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const text = document.createElement('span');
        text.textContent = task;


        const actions = document.createElement('div');
        actions.className = 'actions';


        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => editTask(index);


        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = () => deleteTask(index);


        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);


        li.appendChild(text);
        li.appendChild(actions);
        list.appendChild(li);
    });
}


function addTask() {
    const input = document.getElementById('taskInput');
    const value = input.value.trim();                       // elimina espacios en blanco al principio y final de la oración

    if (value === '') return;

    tasks.push(value);
    saveTasks();
    renderTasks();

    input.value = '';
}


function editTask(index) {
    const newTask = prompt('Editar tarea:', tasks[index]);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index] = newTask;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks()