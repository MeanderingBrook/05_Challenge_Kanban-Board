// Retrieve tasks and nextId from localStorage
// GIVEN CODE - THIS DIDNT WORK UNTIL I INSTANTIATED BLANK ARRAY:
// let taskList = JSON.parse(localStorage.getItem("tasks"));
let taskList = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  var taskID = "id" + Math.random().toString(16).slice(2);
  console.log(taskID);
  return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Set Constant for target HTML Element to which Tasks will be added
  const targetDiv = document.getElementById("to-do");

  console.log(task);

  // MOVED TO renderTaskLIST !!!!!!
  // // Creates <div> for each Task Object, and adds to <ul>
  // taskList.forEach(addTask);

  // function addTask(object) {
  // WAS object. NOW task.
  let taskIDNode = task.taskId;
  let taskTitleNode = task.taskTitle;
  let taskDateNode = task.taskDate;
  let taskDescrNode = task.taskDescr;

  // Task Container >>
  // Creates (no-content) <div> to hold individual Tasks
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-card");
  taskDiv.setAttribute("id", taskIDNode);
  targetDiv.appendChild(taskDiv);
  // << Task Container

  // Task ID >>
  // Creates <div> to hold Task - ID
  const taskIDDiv = document.createElement("div");
  taskIDDiv.classList.add("elementDiv");
  taskDiv.appendChild(taskIDDiv);

  // Creates <h4> to hold Task - ID ("Task ID")
  const taskIDHeader = document.createElement("h4");
  taskIDHeader.classList.add("idHeader");
  taskIDHeader.textContent = "Task ID";
  taskIDDiv.appendChild(taskIDHeader);

  // Creates <p> to hold Task - ID (Auto-Generated)
  const taskIDPara = document.createElement("p");
  taskIDPara.textContent = taskIDNode;
  taskIDDiv.appendChild(taskIDPara);
  // << Task ID

  // Task Title >>
  // Creates <div> to hold Task - Title
  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.classList.add("elementDiv");
  // taskTitleDiv.setAttribute("id", "taskTitleDiv");
  taskDiv.appendChild(taskTitleDiv);

  // Creates <h4> to hold Task - Title ("Task Title")
  const taskTitleHeader = document.createElement("h4");
  taskTitleHeader.classList.add("titleHeader");
  // postTitleHeader.setAttribute("id", "postTitleHeader");
  taskTitleHeader.textContent = "Task Title";
  taskTitleDiv.appendChild(taskTitleHeader);

  // Creates <p> to hold Task - Title (User Content)
  const taskTitlePara = document.createElement("p");
  taskTitlePara.textContent = taskTitleNode;
  taskTitleDiv.appendChild(taskTitlePara);
  // << Task Title

  // Task Date >>
  // Creates <div> to hold Task - Date
  const taskDateDiv = document.createElement("div");
  taskDateDiv.classList.add("elementDiv");
  // taskDateDiv.setAttribute("id", "taskDateDiv");
  taskDiv.appendChild(taskDateDiv);

  // Creates <h4> to hold Task - Date ("Task Date")
  const taskDateHeader = document.createElement("h4");
  taskDateHeader.classList.add("dateHeader");
  // postContentHeader.setAttribute("id", "postContentHeader");
  taskDateHeader.textContent = "Task Date";
  taskDateDiv.appendChild(taskDateHeader);

  // Creates <p> to hold Task - Date (User Content)
  const taskDatePara = document.createElement("p");
  taskDatePara.textContent = taskDateNode;
  taskDateDiv.appendChild(taskDatePara);
  // << Task Date

  // Task Description >>
  // Creates <div> to hold Task - Description
  const taskDescrDiv = document.createElement("div");
  taskDescrDiv.classList.add("elementDiv");
  // taskDescrDiv.setAttribute("id", "taskDescrDiv");
  taskDiv.appendChild(taskDescrDiv);

  // Creates <h4> to hold Task - Description ("Description")
  const taskDescrHeader = document.createElement("h4");
  taskDescrHeader.classList.add("descrHeader");
  // userNameHeader.setAttribute("id", "userNameHeader");
  taskDescrHeader.textContent = "Description";
  taskDescrDiv.appendChild(taskDescrHeader);

  // Creates <p> to hold Task - Description (User Content)
  const taskDescrPara = document.createElement("p");
  taskDescrPara.textContent = taskDescrNode;
  taskDescrDiv.appendChild(taskDescrPara);
  // << Task Description

  // Task Delete Button >>
  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.textContent = "Delete";
  taskDiv.appendChild(taskDeleteBtn);
  // << Task Delete Button
  // }
}

// Todo: create a function to render the task list and make cards draggable
// Reference: https://www.w3schools.com/howto/howto_js_draggable.asp
function renderTaskList() {
  // Creates <div> for each Task Object, and adds to <ul>
  taskList.forEach(createTaskCard);

  $(".task-card").draggable({
    snap: ".card",
    stack: ".task-card",
    distance: 0,
    stop: function (event, ui) {
      console.log(ui.position);
      // var pos = ui.position;
      // var posTop = ui.helper.offset();
      // var posTop = ;;;
      var Stoppos = $(this).position();
      console.log(Stoppos);

      var posLeft = Stoppos.left;
      console.log(posLeft);

      var posTop = Stoppos.top;
      console.log(posTop);

      // taskList.this.taskPosLeft = Stoppos.left;
      // console.log(this.taskPosLeft);

      // this.taskPosTop = Stoppos.top;
      // console.log(this.taskPosTop);

      // localStorage.setItem("tasks", JSON.stringify(this.taskList));

      // localStorage.setItem(this.taskPositionLeft, this.taskPosLeft);
      // console.log(taskList.taskPositionLeft);

      // localStorage.setItem(this.taskPositionTop, this.taskPosTop);
      // console.log(taskList.taskPositionTop);

      // localStorage.setItem(taskList.taskPosition, ui.position);

      // console.log(taskList);
    },
  });
}

// Custom Function
function openTaskModal() {
  // Sets Reference defining "Add Task" Modal Dialog (<div>)
  const addTaskModal = document.getElementById("addTaskDialog");

  // Sets Reference defining "Add Task" Button activating Modal Dialog (<button>)
  const addTaskBtn = document.getElementById("modalBtn");

  // Sets Reference defining "X" icon closing Modal Dialog (<span>)
  const addTaskClose = document.getElementsByClassName("close-modal")[0];

  addTaskModal.style.display = "block";

  // "Closes" Modal Dialog Box using "X" icon - Display: None
  addTaskClose.onclick = function () {
    addTaskModal.style.display = "none";
  };

  // "Closes" Modal Dialog Box on-click outside of Box  - Display: None
  window.onclick = function (event) {
    if (event.target == addTaskModal) {
      addTaskModal.style.display = "none";
    }
  };
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  newTask = {}; // Temporary Object to hold Task inputs (Title, Date, Description)
  console.log(newTask);

  // Sets Reference defining "Add Task" Modal Dialog (<div>)
  const addTaskModal = document.getElementById("addTaskDialog");

  // Sets Reference defining "Add Task (Submit)" Button activating Modal Dialog (<button>)
  const submitBtn = document.getElementById("submitBtn");

  // Calls generateTaskId() to create unique Task ID (taskID) and stores returned value
  let autoTaskID = generateTaskId();

  // Creates empty Object Element to later store draggable <div> position
  let taskPosTop = 0;
  let taskPosLeft = 0;

  // Assigns generated Task ID to Temporary Object to be added to Local Storage
  newTask.taskId = autoTaskID;
  console.log(newTask.taskid);

  // Assigns placeholder Task Position to Temporary Object to be added to Local Storage
  newTask.taskPositionTop = taskPosTop;
  newTask.taskPositionLeft = taskPosLeft;

  // Constants to hold User Input to be added to Local Storage
  const inputTaskTitle = document.getElementById("tasktitle");
  const inputTaskDate = document.getElementById("taskdate");
  const inputTaskDescr = document.getElementById("taskdescr");

  // Assign User Input values to Temporary Object
  newTask.taskTitle = inputTaskTitle.value;
  console.log(newTask.taskTitle);

  newTask.taskDate = inputTaskDate.value;
  console.log(newTask.taskDate);

  newTask.taskDescr = inputTaskDescr.value;
  console.log(newTask.taskDescr);

  console.log(newTask);

  // Validation confirms Task Form is complete, else Alert
  if (
    newTask.taskId &&
    newTask.taskTitle &&
    newTask.taskDate &&
    newTask.taskDescr
  ) {
    // Adds new Task inputs to taskList
    taskList.push(newTask);
    console.log(taskList);

    // Adds values of taskList to Local Storage
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // Clears User Input values already pushed to Array
    autoTaskID = "";
    taskPosTop = "";
    taskPosLeft = "";
    inputTaskTitle.value = "";
    inputTaskDate.value = "";
    inputTaskDescr.value = "";

    // "Closes" Modal Dialog Box on Submit - Display: None
    addTaskModal.style.display = "none";

    // Calls createTaskCard() to generate Task Card for new Task
    createTaskCard();
  } else {
    alert("All Fields are Required. Please fully complete the Task Form.");
    return false;
  }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
