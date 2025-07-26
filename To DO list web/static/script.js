document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskAdded = document.getElementById('task-added');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span class="task-text">${task.completed ? '✓' : ''} ${task.text}</span>
                <div class="task-actions">
                    <button class="update-btn" data-index="${index}">Update ⬆️</button>
                    <button class="delete-btn" data-index="${index}">🗑️</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
            taskAdded.classList.add('show');
            setTimeout(() => taskAdded.classList.remove('show'), 2000);
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        } else if (e.target.classList.contains('update-btn')) {
            const index = e.target.dataset.index;
            const newTask = prompt('Update task:', tasks[index].text);
            if (newTask && newTask.trim()) {
                tasks[index].text = newTask.trim();
                saveTasks();
                renderTasks();
            }
        }
    });

    renderTasks();
});