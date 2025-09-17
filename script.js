const task_name = document.querySelector('#task_input');
const task_date = document.querySelector('#date_input');
const submit_btn = document.querySelector('#submit');
const reset_btn = document.querySelector('#reset');
const task_display = document.querySelector('#task_display');
const light_switch_btn  = document.querySelector('#light_switch_btn');

document.addEventListener('DOMContentLoaded', () => {
    submit_btn.disabled = true;
    reset_btn.disabled = true;

    if (localStorage.getItem('tasks')) {
        task_display.innerHTML = localStorage.getItem('tasks');
        reset_btn.disabled = task_display.children.length === 0;
        restoreEvents();

        document.querySelectorAll('.task-item').forEach(item => {
            if (item.querySelector('.task').classList.contains('completed')) {
                item.querySelector('.checkbox').checked = true;
            }
        });
    }

    task_name.addEventListener('input', () => {
        submit_btn.disabled = task_name.value.trim() === '';
    });

    reset_btn.addEventListener('click', (e) => {
        e.preventDefault();
        task_display.innerHTML = '';
        localStorage.removeItem('tasks');
        reset_btn.disabled = true;
    });

    document.querySelector('#form').onsubmit = (e) => {
        e.preventDefault();

        if (task_name.value.trim() === '') return;

        let taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.innerHTML = `
            <input type="checkbox" class="checkbox">
            <p class="task">${task_name.value}</p>
            <p class="due">${task_date.value || 'No date'}</p>
            <button class="delete_btn">Delete</button>
        `;

        task_display.appendChild(taskElement);
        addEvents(taskElement);

        task_name.value = '';
        task_date.value = '';
        submit_btn.disabled = true;
        reset_btn.disabled = false;

        localStorage.setItem('tasks', task_display.innerHTML);
    }
});

function addEvents(taskElement) {
    taskElement.querySelector('.delete_btn').addEventListener('click', () => {
        taskElement.remove();
        localStorage.setItem('tasks', task_display.innerHTML);
        if (task_display.children.length === 0) {
            reset_btn.disabled = true;
        }
    });

    taskElement.querySelector('.checkbox').addEventListener('change', (e) => {
        taskElement.querySelector('.task').classList.toggle('completed', e.target.checked);
        localStorage.setItem('tasks', task_display.innerHTML);
    });
}

function restoreEvents() {
    document.querySelectorAll('.task-item').forEach(task => addEvents(task));
}

light_switch_btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (light_switch_btn.innerText === 'White') {

        light_switch_btn.innerText = 'Black';
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'black';

    } else if (light_switch_btn.innerText === 'Black') {

        light_switch_btn.innerText = 'White';
        document.body.style.backgroundColor = 'white';
        document.style.color = 'black';

    } else {
        alert('Error!');
    }

});
