const task_name = document.querySelector('#task_input');
const task_date = document.querySelector('#date_input');
const submit_btn = document.querySelector('#submit');
const reset_btn = document.querySelector('#reset');
let task_display = document.createElement('div');

document.querySelector('.to-do').appendChild(task_display);

document.addEventListener('DOMContentLoaded', () => {

    let task = 0;

    submit_btn.disabled = true;
    reset_btn.disabled = true;

    task_name.addEventListener('input', () => {
        submit_btn.disabled = task_name.value.trim() === '';
    });

    if(task >= 1) {
        reset_btn.disabled = false;
    }

    document.querySelector('#form').onsubmit = (e) => {
        e.preventDefault();

        if (task_name.value.trim() === '') {
            return;
        }

        let taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.innerHTML = `
            <p>Task: ${task_name.value}</p>
            <p>Due: ${task_date.value}</p>
        `;

        task_display.appendChild(taskElement);

        task_name.value = '';
        task_date.value = '';
        submit_btn.disabled = true;
    }

})



