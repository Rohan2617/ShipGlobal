const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');

tasks.forEach(task => {
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
    updateArrows(task);
});

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', dragDrop);
});

function dragStart() {
    setTimeout(() => this.classList.add('invisible'), 0);
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('invisible');
    this.classList.remove('dragging');
    updateArrows(this);  // Update arrows when the task is dropped
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
}

function dragLeave() {
    this.classList.remove('hovered');
}

function dragDrop() {
    const draggingTask = document.querySelector('.dragging');
    this.appendChild(draggingTask);
    this.classList.remove('hovered');
    updateArrows(draggingTask);  // Update arrows after dropping
}

function moveTask(taskId, targetColumnClass) {
    const task = document.getElementById(taskId);
    const targetColumn = document.querySelector(`.${targetColumnClass}`);
    targetColumn.appendChild(task);
    updateArrows(task);
}

function updateArrows(task) {
    const parentColumn = task.parentElement.classList[1]; // Get the class name of the parent column
    task.querySelectorAll('.arrow').forEach(button => button.remove()); // Remove existing arrows

    if (parentColumn === 'backlog') {
        // If in Backlog, only show the right arrow
        addArrow(task, 'right', 'todo');
    } else if (parentColumn === 'done') {
        // If in Done, only show the left arrow
        addArrow(task, 'left', 'ongoing');
    } else {
        // If in To Do or Ongoing, show both arrows
        if (parentColumn !== 'backlog') {
            addArrow(task, 'left', 'backlog');
        }
        if (parentColumn !== 'done') {
            addArrow(task, 'right', parentColumn === 'todo' ? 'ongoing' : 'done');
        }
    }
}

function addArrow(task, direction, targetColumnClass) {
    const button = document.createElement('button');
    button.classList.add('arrow', direction === 'right' ? 'right-arrow' : 'left-arrow');
    button.textContent = direction === 'right' ? '→' : '←';
    button.onclick = () => moveTask(task.id, targetColumnClass);
    task.appendChild(button);
}
