window.addEventListener('DOMContentLoaded', function () {

    let newTaskName = document.getElementById("new-task");
    let addNewTaskButton = document.querySelector("button");
    let activeTasksWrapper = document.getElementById("active-tasks");
    let completedTasksWrapper = document.getElementById("completed-tasks");

    const createNewTaskElement = function (taskName) {
        let newTaskItem = document.createElement("li");
        newTaskItem.classList.add('task');

        newTaskItem.innerHTML = `
        <input class="task__checkbox" type="checkbox">
        <label class="task__name"> ${taskName} </label>
        <input type="text" value="${taskName}" class="text-field inpt">
        <button class="btn task__edit"> Edit </button>
        <button class="delete btn">
            <img class="btn__img" src="./remove.svg" alt="remove button">
        </button>
    `
        return newTaskItem;
    }

    const addTask = function () {
        if (!newTaskName.value) return;
        let newTask = createNewTaskElement(newTaskName.value);
        console.log('adding');
        activeTasksWrapper.appendChild(newTask);

        newTaskName.value = "";
    }


    var editTask = function (event) {
        console.log("Edit Task...");

        if (!event.target.closest('.task__edit')) {
            return
        };

        let taskWrapper = event.target.closest('.task');
        let editButton = event.target.closest('.task__edit');
        let taskName = taskWrapper.querySelector('.task__name');
        let textField = taskWrapper.querySelector('.text-field');

        if (taskWrapper.classList.contains("editMode")) {

            taskName.innerText = textField.value;
            editButton.innerText = "Edit";
        } else {

            textField.value = taskName.innerText;
            editButton.innerText = "Save";
        }

        taskWrapper.classList.toggle("editMode");
    };



    const deleteTask = function (event) {
        console.log("Delete Task...");

        if (!event.target.closest('.delete')) {
            return
        };

        let task = event.target.closest('.task');
        task.remove();
    }

    const taskCompleted = function (event) {

        if (!event.target.closest('.task__checkbox')) {
            return
        };

        let task = event.target.closest('.task');
        completedTasksWrapper.appendChild(task);
    }


    const taskIncomplete = function (event) {
        if (!event.target.closest('.task__checkbox')) {
            return
        };

        let task = event.target.closest('.task');
        activeTasksWrapper.appendChild(task);
    }


    addNewTaskButton.addEventListener("click", addTask);

    activeTasksWrapper.addEventListener('click', deleteTask);
    activeTasksWrapper.addEventListener('click', editTask);
    activeTasksWrapper.addEventListener('click', taskCompleted);

    completedTasksWrapper.addEventListener('click', deleteTask);
    completedTasksWrapper.addEventListener('click', editTask);
    completedTasksWrapper.addEventListener('click', taskIncomplete);
})