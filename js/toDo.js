const body = document.querySelector('body');
const tasksForm = document.querySelector('.tasks__form');
const taskInput = document.querySelector('.tasks__input');
const toDolist = document.querySelector('.tasks__to-do-list');
const addButton = document.querySelector('.tasks__submitButton');
const tasksLs = 'tasks';

let tasksArray = [];

const saveTasks = () => {
    localStorage.setItem(tasksLs, JSON.stringify(tasksArray));
}

const deleteTask = (event) => {
    const btn = event.target;
    const li = btn.parentNode;
    toDolist.removeChild(li);
    const cleanTasks = tasksArray.filter((task) => {
        return task.id !== parseInt(li.id);
    })

    let num;
    for(let i = 0; i < tasksArray.length; i++) {
        for(let j = 0; j < cleanTasks.length; j++) {
        if(cleanTasks[j].name !== tasksArray[i].name) {
            num = cleanTasks[j].id;
            }
            break;
        }
    }
    tasksArray = cleanTasks;
    saveTasks();
}

const colors = ['rgb(208, 0, 0)', 'rgb(255, 186, 8)', 'rgb(203, 255, 140)', 'rgb(143, 227, 136)', 'rgb(27, 153, 139)','rgb(49, 133, 252)', 'rgb(93, 46, 140)', 'rgb(70, 35, 122)', 'rgb(255, 123, 156)', 'rgb(255, 155, 133)', 'rgb(20, 20, 20)', 'rgb(230, 230, 230)'];
const colorsButtonsArr = ['button_red', 'button_yellow', 'button_green-yellow', 'button_pastel-green', 'button_green', 'button_blue', 'button_violet', 'button_dark-violet', 'button_pink', 'button_peach', 'button_black', 'button_white'];
const colorsInputArr = ['input_red', 'input_yellow', 'input_green-yellow', 'input_pastel-green', 'input_green', 'input_blue', 'input_violet', 'input_dark-violet', 'input_pink', 'input_peach', 'input_black', 'input_white'];

let colorsWhiteText = ['rgb(208, 0, 0)', 'rgb(27, 153, 139)','rgb(49, 133, 252)', 'rgb(93, 46, 140)', 'rgb(70, 35, 122)', 'rgb(20, 20, 20)'];

const editTask = (event) => {
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.childNodes[0];
    const deleteButton = li.childNodes[3];
    const completeButton = li.childNodes[1];
    const editButton = li.childNodes[2];
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.classList.add('tasks__input');
    input.setAttribute("type", "text");
    let value = span.textContent;
    input.setAttribute('value', value);
    const div = document.createElement('div');
    div.classList.add('tasks__edit-container');

    editButton.style.visibility =  "hidden";
    completeButton.style.visibility =  "hidden";
    deleteButton.style.visibility =  "hidden";
    span.style.visibility = "hidden";
    
    const submitButton = document.createElement('button');
    submitButton.classList.add('tasks__button');
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('tasks__button');

    let ind = colors.indexOf(body.style.background);
    input.classList.add(colorsInputArr[ind]);
    submitButton.classList.add(colorsButtonsArr[ind]);
    cancelButton.classList.add(colorsButtonsArr[ind]);

    if(colorsWhiteText.includes(body.style.background)) {
        cancelButton.classList.add('tasks__delete-button_white');
        submitButton.classList.add('tasks__complete-button_white');
    } else {
        cancelButton.classList.add('tasks__delete-button_black');
        submitButton.classList.add('tasks__complete-button_black');
    }

    div.style =  `position: relative;
                  top: -40px;`;

    li.append(div);
    div.append(form, submitButton, cancelButton);
    form.appendChild(input);

    const submit = () => {
        value = input.value;
        tasksArray[li.id - 1].name = value;
        saveTasks();
        form.removeChild(input);
        div.removeChild(form);
        div.removeChild(submitButton);
        div.removeChild(cancelButton);
        li.removeChild(div);
        span.style.visibility = 'visible';
        span.textContent = value;
        deleteButton.style.visibility =  "visible";
        completeButton.style.visibility =  "visible";
        editButton.style.visibility =  "visible";
    }

    const cancel = () => {
        form.removeChild(input);
        div.removeChild(form);
        div.removeChild(submitButton);
        div.removeChild(cancelButton);
        li.removeChild(div);
        span.style.visibility = 'visible';
        deleteButton.style.visibility =  "visible";
        completeButton.style.visibility =  "visible";
        editButton.style.visibility =  "visible";
    }

    form.addEventListener('submit', submit);
    submitButton.addEventListener('click', submit);
    cancelButton.addEventListener('click', cancel);
}

const completeTask = (event) => {
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.childNodes[0];
    span.style.textDecoration = 'line-through';
    
    const id = Number(li.id);
    tasksArray[id - 1].comleted = true;
    saveTasks();
}

let tasksButtons = [];

const showTasks = (text, done = false) => {
    const li = document.createElement('li');
    li.classList.add('tasks__li');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('tasks__button');
    const editButton = document.createElement('button');
    editButton.classList.add('tasks__button');
    const completeButton = document.createElement('button');
    completeButton.classList.add('tasks__button');

    let y = colors.indexOf(body.style.background);
    deleteButton.classList.add(colorsButtonsArr[y]);
    editButton.classList.add(colorsButtonsArr[y]);
    completeButton.classList.add(colorsButtonsArr[y]);
    if(colorsWhiteText.includes(body.style.background)) {
        deleteButton.classList.add('tasks__delete-button_white');
        editButton.classList.add('tasks__edit-button_white');
        completeButton.classList.add('tasks__complete-button_white');
    } else {
        deleteButton.classList.add('tasks__delete-button_black');
        editButton.classList.add('tasks__edit-button_black');
        completeButton.classList.add('tasks__complete-button_black');
    }
    
    const span = document.createElement('span');
    const newId = tasksArray.length + 1; 

    tasksButtons.push(completeButton, editButton, deleteButton);

    deleteButton.addEventListener('click', deleteTask);
    editButton.addEventListener('click', editTask);
    completeButton.addEventListener('click', completeTask);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    li.id = newId;
    toDolist.appendChild(li);
    toDolist.style.margin = '0 auto 40px auto';
    const taskObject = {
        name: text,
        id: newId,
        comleted: done,
    }
    tasksArray.push(taskObject);
    if(taskObject.comleted === true) {
        span.style.textDecoration = 'line-through';
    }

    saveTasks();
}

const loadTasks = () => {
    const tasks = localStorage.getItem(tasksLs);
    if(tasks !== null) {
        const parsedTasks = JSON.parse(tasks);
        parsedTasks.forEach(task => {
            showTasks(task.name, task.comleted);
        });
    }
}

const submitHandler = (event) => {
    event.preventDefault();
    const currentValue = taskInput.value;
    if(currentValue !== '') {
        showTasks(currentValue);
        taskInput.value = '';
    }
}


const init = () => {
    loadTasks();
    tasksForm.addEventListener('submit', submitHandler);
    addButton.addEventListener('click', submitHandler);
}

init();

export {tasksButtons};
