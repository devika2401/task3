const inputBox = document.querySelector(".box input");
const addBtn = document.querySelector(".box button");
const todoList = document.querySelector(".todo");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}
showTasks(); //calling show function
addBtn.onclick = () => {
    let userEnteredValue = inputBox.value; //getting input field value
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = []; //create a blank array
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(userEnteredValue); //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button once the task added
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active"); //active the delete button
    } else {
        deleteAllBtn.classList.remove("active"); //unactive the delete button
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}
// delete task function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
}
// delete all tasks function
deleteAllBtn.onclick = () => {
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
}