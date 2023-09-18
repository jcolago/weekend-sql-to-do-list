//Sets up click listerers and getTasks to run on page load
$(() => {
    console.log('JS and JQ');
    getTasks();
    $('#submitButton').on('click', submitTask);
    $('#showTasks').on('click', '#deleteButton', deleteTask);
    $('#showTasks').on('click', '#completeButton', completeTask);
});

//Function to get task list from the back end then display the list on DOM
function getTasks() {
    $.ajax({
        method: "GET",
        url: "/tasks"
    })
        .then((response) => appendDom(response))
        .catch((err) => {
            console.log('Error updating list', err)
        });
};

//Appends the DOM with the response from the getTasks function and adds them to the DOM in table format.
function appendDom(response) {
    $("#showTasks").empty();
    for (const task of response) {
        if (task.completed === true) {
            $("#showTasks").append(`
            <tr class='completedTask'>
                <td>${task.task_name}</td>
                <td><button data-id=${task.id} id="completeButton">Complete</button></td>
                <td><button data-id=${task.id} id="deleteButton">Delete</button></td>
            </tr> `);
        } else (
            $("#showTasks").append(`
        <tr>
            <td>${task.task_name}</td>
            <td><button data-id=${task.id} id="completeButton">Complete</button></td>
            <td><button data-id=${task.id} id="deleteButton">Delete</button></td>
        </tr> `)
        )
    };
};

//Takes submitted task from DOM and sends the data to be added to the database on the backend.
function submitTask() {
    let taskIn = $("#taskInput").val()

    if (!taskIn) {
        alert("Please fill in task input at submit again");
        return;
    }

    $.ajax({
        method: "POST",
        url: "/tasks",
        data: {
            task_name: taskIn,
            complete: false
        }
    }).then(() => getTasks())
        .catch((err) => {
            console.log('Error in POSTing to task list', err);
        });
    $("#taskInput").val('');
};

//Function sets the completed status of a task to TRUE if the complete button is clicked
function completeTask(event) {
    const id = $(event.target).data('id');
    console.log(id);
    $.ajax({
        method: "PUT",
        url: `/tasks/${id}`
    }).then(() => getTasks())
        .catch((err) => {
            console.log('Unable to update task', err)
        });
};

//Deletes table item base on id when delete button is clicked
function deleteTask(event) {
    const id = $(event.target).data('id');
    console.log(id);
    $.ajax({
        method: "DELETE",
        url: `/tasks/${id}`
    })
        .then(() => getTasks())
        .catch((err) => {
            console.log('Unable to delete task', err)
        });
};