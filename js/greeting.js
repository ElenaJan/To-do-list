const greetingForm = document.querySelector('.greeting__form');
const greetingInput = document.querySelector('.greeting__input');
const greeting = document.querySelector('.greeting__h2');
const userLS = 'currentUserName';
const showCN = 'greeting_show-greeting';

const saveUserName = (name) => {
    localStorage.setItem(userLS, name);
}

const showGreeting = (text) => {
    greeting.innerText = `Привет, ${text}!`
    greeting.classList.add(showCN);
    greetingForm.classList.remove(showCN);
}

const submitHandler = (event) => {
    event.preventDefault();
    const inputValue = greetingInput.value;
    showGreeting(inputValue);
    saveUserName(inputValue);
}

const askForUserName = () => {
    greetingForm.classList.add(showCN);
    greetingForm.addEventListener('submit', submitHandler);
}

const loadUserName = () => {
    const currentUserName = localStorage.getItem(userLS);
    if(currentUserName === null) {
        askForUserName();
    } else {
        showGreeting(currentUserName);
    }
}

const init = () => {
    loadUserName();
}

init();

export { greeting, greetingInput };
