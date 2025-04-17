// To-Do List App using localStorage
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = '';
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const label = document.createElement('label');
        label.className = 'task-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            toggleTask(idx);
        });

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) span.classList.add('completed');

        label.appendChild(checkbox);
        label.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => {
            deleteTask(idx);
        });

        li.appendChild(label);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Add task
function addTask(text) {
    const tasks = getTasks();
    tasks.push({ text, completed: false });
    saveTasks(tasks);
    renderTasks();
}

// Delete task
function deleteTask(idx) {
    const tasks = getTasks();
    tasks.splice(idx, 1);
    saveTasks(tasks);
    renderTasks();
}

// Toggle task completed
function toggleTask(idx) {
    const tasks = getTasks();
    tasks[idx].completed = !tasks[idx].completed;
    saveTasks(tasks);
    renderTasks();
}

// Handle form submit
if (taskForm) {
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const value = taskInput.value.trim();
        if (value) {
            addTask(value);
            taskInput.value = '';
            taskInput.focus();
        }
    });
}

// Initial render
renderTasks();
