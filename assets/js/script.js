// Retrieve tasks and nextId from localStorage

function refreshTaskList() {
  // Given Starter Code was Superseded by Storage Call below: Starter Code did not function until function was created to generate blank Array (taskList) as needed
  // let taskList = JSON.parse(localStorage.getItem("tasks"));

  // Initiates Object ('taskList') to hold Local Storage ('tasks') data
  const taskList = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  // Returns current Task Inventory for use by other Functions
  return taskList;
}

// Starter Code, Not Employed in Final Product
const nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const taskID = "id" + Math.random().toString(16).slice(2);
  // console.log(taskID);
  return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Formats Task Due Date

  // Formats (and corrects JavaScript Date issues) Task Due Date
  const taskDateFormatted = dayjs(task.taskDate).format("MM/DD/YYYY");

  const taskCard = $("<div>")
    .addClass("card project-card draggable my-3")
    .attr("data-task-id", task.taskId);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.taskTitle);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescrHeader = $("<h5>").text("Task Description:");
  const cardDescription = $("<p>").addClass("card-text").text(task.taskDescr);
  const cardDueDateHeader = $("<h5>").text("Task Due Date:");
  const cardDueDate = $("<p>").addClass("card-text").text(taskDateFormatted);
  const cardIdContainer = $("<div>").addClass("card-id-container");
  const cardIdHeader = $("<p>").addClass("card-id-header").text("Task ID: ");
  const cardId = $("<p>").addClass("card-id").text(task.taskId);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete delete-btn")
    .text("Delete")
    .attr("data-task-id", task.taskId);
  cardDeleteBtn.on("click", handleDeleteTask); // No Parentheses () Required !!!

  // Applies Task Card color-coding (Grey) is Task is complete ('Done')
  if (task.taskStatus === "done") {
    taskCard.addClass("task-card-done");
    cardDeleteBtn.addClass("delete-btn-done");
  }

  // Applies Task Card color-coding (Red - Yellow) based on Task tardiness (Late, Due) if Task is not 'Done'
  if (task.taskDate && task.taskStatus !== "done") {
    const taskDueDate = dayjs(dayjs(task.taskDate), "MM/DD/YYYY");

    // Tasks due 'today' (current day) are colored Yellow
    if (dayjs().isSame(taskDueDate, "day")) {
      // taskCard.addClass("bg-warning text-white");
      taskCard.addClass("task-card-warning");
      // Tasks due in the past are colored Red
    } else if (dayjs().isAfter(taskDueDate)) {
      taskCard.addClass("task-card-late");
      cardDeleteBtn.addClass("border-light");
      // Tasks due in the future are colored Green
    } else {
      taskCard.addClass("task-card-ontime");
    }
  }

  // Aggregates 'Task Card' HTML Elements and Appends them to correct Parent Element
  cardIdContainer.append(cardIdHeader, cardId);
  cardBody.append(
    cardDescrHeader,
    cardDescription,
    cardDueDateHeader,
    cardDueDate,
    cardDeleteBtn,
    cardIdContainer
  );
  taskCard.append(cardHeader, cardBody);

  // Returns Task Card to be rendered on Kanban Board, based upon Progress, to correct Swim Lane (e.g., In Progress, Done)
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  taskInv = refreshTaskList();

  // Clear Task Swim Lanes (HTML) of previously-created Task Cards >>
  const todoTasks = $("#todo-cards");
  todoTasks.empty();

  const inProgressTasks = $("#in-progress-cards");
  inProgressTasks.empty();

  const doneTasks = $("#done-cards");
  doneTasks.empty();
  // << Clear Task Swim Lanes

  // Evaluates each Task from Task Array (taskArray) to determine appropriate Task Swim Lane (HTML) and generate Task Cards and appends to correct Lane using Lane ID
  taskInv.forEach((task, status) => {
    if (task.taskStatus === "to-do") {
      todoTasks.append(createTaskCard(task));
    } else if (task.taskStatus === "in-progress") {
      inProgressTasks.append(createTaskCard(task));
    } else if (task.taskStatus === "done") {
      doneTasks.append(createTaskCard(task));
    }
  });

  // JQery Method, permits Task Cards to be 'dragged' between Swim Lanes
  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
    // Creates image of dragged Object (Task Card)
    helper: function (e) {
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Open 'Add Task' Modal Dialog box (Custom Function)
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
  let taskList = refreshTaskList();

  // Creates Temporary Object to hold Task-related User Inputs (Title, Due Date, Description)
  newTask = {};

  // Sets Reference defining "Add Task" Modal Dialog (<div>) to "Close" it automatically at end of Task creation
  const addTaskModal = document.getElementById("addTaskDialog");

  // Sets Reference defining "Add Task (Submit)" Button activating Modal Dialog (<button>)
  const submitBtn = document.getElementById("submitBtn");

  // Calls Function for generated Task ID and assigns to Temporary Object to be added to Local Storage
  newTask.taskId = generateTaskId();
  // console.log(newTask.taskId)

  // Assigns defaul Task Status ('to-do') to to Temporary Object to be added to Local Storage
  newTask.taskStatus = "to-do";
  // console.log(newTask.taskStatus)

  // Constants to hold User Input to be added to Local Storage
  const inputTaskTitle = document.getElementById("tasktitle");
  const inputTaskDate = document.getElementById("taskdate");
  const inputTaskDescr = document.getElementById("taskdescr");

  // Assigns User Input values to Temporary Object
  newTask.taskTitle = inputTaskTitle.value;
  // console.log(newTask.taskTitle);

  newTask.taskDate = inputTaskDate.value;
  // console.log(newTask.taskDate);

  newTask.taskDescr = inputTaskDescr.value;
  // console.log(newTask.taskDescr);

  // console.log(newTask);

  // Validation confirms Task Form is complete, else Alert
  if (
    newTask.taskId &&
    newTask.taskTitle &&
    newTask.taskDate &&
    newTask.taskDescr
  ) {
    // Adds new Task inputs to taskList
    taskList.push(newTask);
    // console.log(taskList);

    // Adds values of taskList to Local Storage
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // "Closes" Modal Dialog Box on Submit - Display: None
    addTaskModal.style.display = "none";

    // Renders all Tasks, including new Task
    renderTaskList();

    // Clears User Input values already pushed to Array
    autoTaskID = "";
    taskStat = "";
    taskPosTop = "";
    taskPosLeft = "";
    inputTaskTitle.value = "";
    inputTaskDate.value = "";
    inputTaskDescr.value = "";
  } else {
    alert("All Fields are Required. Please fully complete the Task Form.");
    return false;
  }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // Constant holding target Task to be Deleted
  const taskDelete = $(this).attr("data-task-id");
  // console.log(taskDelete);

  // Local Variable representing Task Array (taskList) maintained in Local Storage (tasks)
  let taskInv = refreshTaskList();
  // console.log(taskInv);

  // Superseded in favor of Filter Method (beginning Line 250)
  // taskInv.forEach((task) => {
  //   if (task.taskId === taskDelete) {
  //     taskInv.splice(taskInv.indexOf(task), 1);
  //   }
  // });

  // Removes target Task to be deleted, using Filter method, from local Task Invetory (taskInv)
  taskInv = taskInv.filter((task) => task.taskId !== taskDelete);

  // Updates Local Storage (tasks) with revised Task Inventory
  localStorage.setItem("tasks", JSON.stringify(taskInv));

  // Renders updated list of Tasks using existing Function
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Local Constant representing Task Array (taskList) maintained in Local Storage (tasks)
  const taskInv = refreshTaskList();

  const taskId = $(this).attr("data-task-id");

  // Local Constant defining dropped Task
  const taskDrop = ui.draggable[0].dataset.taskId;

  // Local Constant defining target Swim Lane Task
  const newStatus = event.target.id;

  for (let task of taskInv) {
    // ? Find the task card by the `id` and update the task status.
    if (task.taskId === taskDrop) {
      task.taskStatus = newStatus;
    }
  }
  // Updates Local Storage (tasks) with revised Task Inventory
  localStorage.setItem("tasks", JSON.stringify(taskInv));

  // Renders updated list of Tasks using existing Function
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // Populates Kanban Board with current Tasks, taken from Local Storage
  renderTaskList();

  // Swim Lanes accept 'draggable' Task Cards as 'droppable'
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
});
