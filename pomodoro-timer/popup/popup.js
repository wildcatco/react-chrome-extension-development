let tasks = [];

const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', () => addTask());

chrome.storage.sync.get(['tasks'], (data) => {
  tasks = data.tasks || [];
  renderTasks();
});

function saveTasks() {
  // chrome.storage.sync는 데이터를 여러 기기 간에 동기화합니다.
  // 반면 chrome.storage.local은 현재 기기에만 데이터를 저장합니다.
  // 여기서는 sync를 사용하여 사용자의 작업을 모든 기기에서 접근 가능하게 합니다.
  chrome.storage.sync.set({
    tasks,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement('div');

  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = 'Enter a task...';
  text.value = tasks[taskNum];
  text.addEventListener('input', () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.value = 'X';
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById('task-container');
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push('');
  renderTask(taskNum);
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById('task-container');
  taskContainer.textContent = '';
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
