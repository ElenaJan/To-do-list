const buttonChangeColor = document.querySelector('.header__button-chage-color');
const buttonCloseModal = document.querySelector('.modal__close-button');
const modalContainer = document.querySelector('.modal__container');
const modal = document.querySelector('.modal');

// открытие и закрытие модального окна

const openModal = () => {
    modal.style.visibility = "visible";
    modal.style.background = "rgba(0,0,0,0.5)";
    modalContainer.classList.remove('modal_animate-close');
    modalContainer.classList.add('modal_animate-open');
}

buttonChangeColor.addEventListener('click', openModal);

const close = () => {
    modalContainer.classList.remove('modal_animate-open');
    modalContainer.classList.add('modal_animate-close');
    modal.style.background = "rgba(0,0,0,0)";
    modal.style.visibility = "hidden";
}

const closeModal = () => {
    close();
}

buttonCloseModal.addEventListener('click', closeModal);

const closeModalByWindowClick = (event) => {
    if (event.target == modal) {
        modal.style.background = "rgba(0,0,0,0)";
        modalContainer.classList.remove('modal_animate-open');
        modalContainer.classList.add('modal_animate-close');
    }
}

window.addEventListener('click', closeModalByWindowClick);

// изменение цвета фона

const colorButtons = document.querySelectorAll('.modal__color-btn');
const colors = ['#D00000', '#FFBA08', '#CBFF8C', '#8FE388', '#1B998B','#3185FC', '#5D2E8C', '#46237A', '#FF7B9C', '#FF9B85', '#141414', '#e6e6e6'];
const body = document.querySelector('body');
const weatherButton = document.querySelector('.header__button-weather');
const tasks = document.querySelector('.tasks');
const tascksInput = document.querySelector('.tasks__input');
const colorLS = 'color';
import{ clock, currentDate } from './clockAndDate.js';
import { greeting, greetingInput } from './greeting.js';
const submitButton = document.querySelector('.tasks__submitButton');
import {tasksButtons} from './toDo.js';
let index;

let colorsButtonArray = Array.from(colorButtons);

const saveColor = (color) => localStorage.setItem(colorLS, color);

const changeTextColor = (x) => {
    if(x == 0 || (x > 3 && x < 8) || x == 10) {
        greeting.style.color = '#fff';
        clock.style.color = '#fff';
        currentDate.style.color = '#fff';
    } else if((x > 0 && x < 4) || (x > 7 && x < 10) || (x == 11)) {
        greeting.style.color = '#000';
        clock.style.color = '#000';
        currentDate.style.color = '#000';
    };
}

let color = localStorage.getItem(colorLS);

const colorsButtonsArr = ['button_red', 'button_yellow', 'button_green-yellow', 'button_pastel-green', 'button_green', 'button_blue', 'button_violet', 'button_dark-violet', 'button_pink', 'button_peach', 'button_black', 'button_white']
const colorsTasksArr = ['tasks_red', 'tasks_yellow', 'tasks_green-yellow', 'tasks_pastel-green', 'tasks_green', 'tasks_blue', 'tasks_violet', 'tasks_dark-violet', 'tasks_pink', 'tasks_peach', 'tasks_black', 'tasks_whit'];
const colorsInputArr = ['input_red', 'input_yellow', 'input_green-yellow', 'input_pastel-green', 'input_green', 'input_blue', 'input_violet', 'input_dark-violet', 'input_pink', 'input_peach', 'input_black', 'input_white'];
let colorsWhiteText = ['rgb(208, 0, 0)', 'rgb(27, 153, 139)','rgb(49, 133, 252)', 'rgb(93, 46, 140)', 'rgb(70, 35, 122)', 'rgb(20, 20, 20)'];

const setColors = (y) => {
    buttonChangeColor.classList.add(colorsButtonsArr[y]);
    weatherButton.classList.add(colorsButtonsArr[y]);
    submitButton.classList.add(colorsButtonsArr[y]);
    tasks.classList.add(colorsTasksArr[y]);
    greetingInput.classList.add(colorsInputArr[y]);
    tascksInput.classList.add(colorsInputArr[y]);
    for(let button of tasksButtons) {
        button.classList.add(colorsButtonsArr[y]);
    }
    if(colorsWhiteText.includes(body.style.background)) {
        tasksButtons.forEach((btn) => {
            btn.classList.replace('tasks__delete-button_black', 'tasks__delete-button_white');
            btn.classList.replace('tasks__edit-button_black', 'tasks__edit-button_white');
            btn.classList.replace('tasks__complete-button_black', 'tasks__complete-button_white')
        })
    } else {
        tasksButtons.forEach((btn) => {
            btn.classList.replace('tasks__delete-button_white', 'tasks__delete-button_black');
            btn.classList.replace('tasks__edit-button_white', 'tasks__edit-button_black');
            btn.classList.replace('tasks__complete-button_white', 'tasks__complete-button_black');
        })
    }
}

const deleteColors = () => {
    let currentColorBtn = colorsButtonsArr.filter(color => buttonChangeColor.classList.contains(color));
    buttonChangeColor.classList.remove(currentColorBtn);
    weatherButton.classList.remove(currentColorBtn);
    submitButton.classList.remove(currentColorBtn);
    for(let button of tasksButtons) {
        button.classList.remove(currentColorBtn);
    }
    let currentColorTasks = colorsTasksArr.filter(color => tasks.classList.contains(color));
    tasks.classList.remove(currentColorTasks);
    let currentColorInput = colorsInputArr.filter(color => 
    greetingInput.classList.contains(color));
    greetingInput.classList.remove(currentColorInput);
    tascksInput.classList.remove(currentColorInput);
}

if(color === null) {
    setColors(11);
    localStorage.setItem(colorLS, 11);
} else {
    body.style.background = colors[color];
    body.style.transition = 'background 500ms ease-in-out';
    changeTextColor(color);
    setColors(color);
}

for (let colorButton of colorButtons) {
    colorButton.addEventListener('click', function(){
        index = colorsButtonArray.indexOf(this);
        body.style.background = colors[index];
        deleteColors();
        setColors(index);
        changeTextColor(index);
        saveColor(index);
    })
}

weatherButton.addEventListener('click', () => alert('Извините, сайт с погодой находится в процессе разработки'));
