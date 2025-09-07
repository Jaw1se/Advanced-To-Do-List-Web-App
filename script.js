const task_name = document.querySelector('#task_input');
const task_date = document.querySelector('#date_input');
const submit_btn = document.querySelector('#submit');
const reset_btn = document.querySelector('#reset');
const task_display = document.querySelector('#task_display');

document.addEventListener('DOMContentLoaded', () => {

    submit_btn.disabled = true;
    reset_btn.disabled = true;

    task_name.addEventListener('input', () => {
        submit_btn.disabled = task_name.value.trim() === '';
    });


    reset_btn.addEventListener('click', (e) => {
        e.preventDefault();
        task_display.innerHTML = '';
        reset_btn.disabled = true;
    });


    document.querySelector('#form').onsubmit = (e) => {
        e.preventDefault();

        if (task_name.value.trim() === '') {
            return;
        }

        let taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.innerHTML = `
            <input type="checkbox" class="checkbox">
            <p class="task">${task_name.value}</p>
            <p class="due">${task_date.value || 'No date'}</p>
            <button class="delete_btn">Delete</button>
        `;


        taskElement.querySelector('.delete_btn').addEventListener('click', () => {
            taskElement.remove();
            if (task_display.children.length === 0) {
                reset_btn.disabled = true;
            }
        });

        taskElement.querySelector('.checkbox').addEventListener('change', (e) => {
            taskElement.querySelector('.task').classList.toggle('completed', e.target.checked);
        });

        task_display.appendChild(taskElement);

        task_name.value = '';
        task_date.value = '';
        submit_btn.disabled = true;
        reset_btn.disabled = false;
    }
});
