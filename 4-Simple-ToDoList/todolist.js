document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('#todo-input');
    const addButton = document.querySelector('#add-button');
    const toDoList = document.querySelector('#todo-list');
    const date = document.querySelector("#todo-date");
    const todoButtonsAll = document.querySelector("#todo-buttons-all");
    const todoButtonToDo = document.querySelector("#todo-buttons-todo");
    const todoButtonDid = document.querySelector("#todo-buttons-did");

    addButton.addEventListener('click', addToDo);

    document.addEventListener("keydown", (event) => {
        if (event.key === 'Enter' || event.key === 'enter') {
            addButton.click();
        }
    })

    todoButtonToDo.addEventListener('click', () => {
        todoButtonToDo.classList.add('active');
        todoButtonsAll.classList.remove('active');
        todoButtonDid.classList.remove('active');
        showTaskToDo();
    });

    todoButtonDid.addEventListener('click', () => {
        todoButtonToDo.classList.remove('active');
        todoButtonsAll.classList.remove('active');
        todoButtonDid.classList.add('active');
        showTaskDid();
    });
    
    todoButtonsAll.addEventListener('click', () => {
        todoButtonToDo.classList.remove('active');
        todoButtonsAll.classList.add('active');
        todoButtonDid.classList.remove('active');
        showallTasks();
    });

    function addToDo () {
        let inputValue = input.value.trim();
        let dateValue = date.value;
        let dateValueCleaned = clearDate(dateValue);
        let dateNowCleaned = clearDate(limiteDate());

        if (inputValue !== '' && dateValue !== '') {
            if (dateNowCleaned > dateValueCleaned) {
                spanError("The date you have chosen is wrong");
                return
            } else {
                const task = {
                    text: inputValue,
                    date: dateValue,
                    uniqueID: `${inputValue}-${Date.now()}`,
                    done: false  
                }
                addTaskToDom(task);
                saveTask(task);
                resetTask();
            }
        } else {
            spanError("Enter all informations");
        };
    };

    function addTaskToDom (task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.setAttribute('data-id', task.uniqueID);
        if (task.done) li.classList.add('did');
        li.innerHTML = 
            `
            <input type="checkbox" ${task.done ? 'checked' : ''} onclick="toggleTaskStatus(this)">
            <span>${task.text}</span>
            <span>${task.date}</span>
            <button onclick="deleteToDo(this)">Delete</button>
            `;
        toDoList.appendChild(li);
    }

    function saveTask (task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDom(task));
    }

    function resetTask () {
        input.value = ''
        date.value = ''
    }

    function showallTasks () {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const toDoList = document.querySelector('#todo-list');
        toDoList.innerHTML = '';

        tasks.forEach(task => addTaskToDom(task));
    }

    function showTaskDid () {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let toDoTasks = tasks.filter(task => task.done);

        const toDoList = document.querySelector('#todo-list');
        toDoList.innerHTML = '';

        toDoTasks.forEach(task => addTaskToDom(task));
    }

    function showTaskToDo () {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let toDoTasks = tasks.filter(task => !task.done);

        const toDoList = document.querySelector('#todo-list');
        toDoList.innerHTML = '';

        toDoTasks.forEach(task => addTaskToDom(task));
    }

    loadTasks();
});

function clearDate(n) {
    const regex = n.replace(/[^0-9]/g, '');
    return regex
}

function deleteToDo (button) {
    const li = button.parentElement;
    const taskId = li.getAttribute('data-id');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.uniqueID !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.remove();
}

function toggleTaskStatus (checkbox) {
    const li = checkbox.parentElement;
    const taskId = li.getAttribute('data-id');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.map(task => {
        if (task.uniqueID === taskId) {
            task.done = !task.done;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.classList.toggle('did');
}

function limiteDate () {
    let date = new Date();
    let yearDate = date.getFullYear();
    let dayDate = date.getDate();
    let monthDate = date.getMonth() + 1;
    const fullDate = `${yearDate}-0${monthDate}-${dayDate < 10 ? "0" + dayDate : dayDate}`;
    return fullDate;
}

function spanError (string) {
    const spanError = document.createElement('span');
    const toDoList = document.querySelector('#todo-list');
    spanError.classList.add('fade-out');
    spanError.innerHTML = 
     `
        <span>${string}</span>
    `;

    spanError.style.color = 'red';
    spanError.style.display = 'block';
    spanError.style.textAlign = 'center';
    spanError.style.marginTop = '10px';
    spanError.style.marginBottom = '0px';
    toDoList.appendChild(spanError);

    setTimeout(() => {
        spanError.classList.add('hidden');
    }, 2200);

    setTimeout(() => {
        spanError.remove();
    }, 3000);

    return spanError;
}
