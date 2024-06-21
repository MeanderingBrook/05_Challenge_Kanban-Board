// Retrieve tasks and nextId from localStorage
// Given Code: Did not function until function was created to generate blank Array (taskList) as needed !!!
// let taskList = JSON.parse(localStorage.getItem("tasks"));
let taskList = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  let taskID = "id" + Math.random().toString(16).slice(2);
  console.log(taskID);
  return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $("<div>")
    .addClass("card project-card draggable my-3")
    .attr("data-project-id", task.id);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.name);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>").addClass("card-text").text(task.type);
  const cardDueDate = $("<p>").addClass("card-text").text(text.dueDate);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-project-id", task.id);
  cardDeleteBtn.on("click", handleDeleteTask); // No Parentheses () Required !!!

  // Applies Task Card color-coding (Red - Yellow) based on Task tardiness (Late, Due) if Task is not 'Done'
  if (task.dueDate && task.status !== "done") {
    const currentDate = dayjs();
    const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");

    // Tasks due 'Today' (currentDay) are colored Yellow
    if (currentDate.isSame(taskDueDate, "day")) {
      taskCard.addClass("bg-warning text-white");
      // Tasks due in the past are colored Red
    } else if (currentDate.isAfter(taskDueDate)) {
      taskCard.addClass("bg-danger text-white");
      cardDeleteBtn.addClass("border-light");
    }
  }

  // Aggregates 'Task Card' HTML Elements and Appends them to correct Parent Element
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // Returns Task Card to be rendered on Kanban Board based upon Progress, to correct Swim Lane (e.g., In Progress, Done)
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // Clear Task Swim Lanes (HTML) of previously-created Task Cards >>
  const todoTasks = $("#to-do");
  todoTasks.empty();

  const inProgressTasks = $("#in-progress");
  inProgressTasks.empty();

  const doneTasks = $("#done");
  doneTasks.empty();
  // << Clear Task Swim Lanes

  // Evaluates each Task from Task Array (taskArray) to determine appropriate Task Swim Lane (HTML) and generate Task Cards and appends to correct Lane using Lane ID
  taskList.forEach((task, status) => {
    if (task.status === "to-do") {
      todoTasks.append(createTaskCard(task));
    } else if (task.status === "in-progress") {
      inProgressTasks.append(createTaskCard(task));
    } else if (task.status === "done") {
      doneTasks.append(createTaskCard(task));
    }
  });

  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // Constant holding target Task to be Deleted
  const taskDel = $(this).attr("data-project-id");

  // Local Constant representing Task Array (taskList) maintained in Local Storage (tasks)
  const taskInv = taskList;

  // Removes target Task to be deleted, using Filter method, from local Task Invetory (taskInv)
  taskInv = taskInv.filter((task) => task.taskId !== taskDel);

  // Updates Local Storage (tasks) with revised Task Inventory
  localStorage.setItem("tasks", JSON.stringify(taskInv));

  // Renders updated list of Tasks using existing Function
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Local Constant representing Task Array (taskList) maintained in Local Storage (tasks)
  const taskInv = taskList;

  // DONT THINK THAT projectId IS CORRECT !!! WEIRDLY NOT DEFINED IN ORIGINAL CODE IN THIS FUNCTION
  // Local Constant defining dropped Task
  const taskDrop = ui.draggable[0].dataset.projectId;

  // Local Constant defining target Swim Lane Task
  const newStatus = event.target.id;

  for (let task of taskInv) {
    // ? Find the task card by the `id` and update the task status.
    if (task.id === taskDrop) {
      task.status = newStatus;
    }
  }

  // Updates Local Storage (tasks) with revised Task Inventory
  localStorage.setItem("tasks", JSON.stringify(taskInv));

  // Renders updated list of Tasks using existing Function
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {});
