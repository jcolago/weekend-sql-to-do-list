$(() => {
    console.log('JS and JQ');
    getTasks();
    $('#submitButton').on('click', submitTask);
});

function getTasks(){
    $.ajax({
        method: "GET",
        url: "/tasks"
    })
    .then((response) => appendDom(response))
    .catch((err) =>{
        console.log('Error updating list', err)
    });
};

function appendDom(response){
    $("#showTasks").empty();
    for (const task of response){
        if (task.completed === true){
            $("#showTasks").append(`
            <tr class='completedTask'>
                <td>${task.task_name}</td>
                <td><button data-id=${task.id} id="completeButton">Complete</button></td>
                <td><button data-id=${task.id} id="deletedButton">Delete</button></td>
            </tr> `);
        }else (
            $("#showTasks").append(`
        <tr>
            <td>${task.task_name}</td>
            <td><button data-id=${task.id} id="completeButton">Complete</button></td>
            <td><button data-id=${task.id} id="deletedButton">Delete</button></td>
        </tr> `)
        )
    };
};

function submitTask(){
    $.ajax({
        method: "POST",
        url: "/tasks",
        data: {
            task_name: $("#taskInput").val(),
            complete: false
        }
    }).then(() =>  getTasks())
    .catch((err)=> {
        console.log('Error in POSTing to task list', err);
    });
    $("#taskInput").val('');
}
