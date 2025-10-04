let stds = []
let prom = document.getElementById("prompt")

stds = JSON.parse(localStorage.getItem("stds")) || [];
renderTable();

function reloadpage() {
    location.reload();
}

prom.onclick = function() {
    let username = prompt("Enter your Username: ");
    if (username == "ahmed") {
        alert("Welcome " + username + " to the Student Management System");
    }
}

function clearAll() {
    if(confirm("Are you sure you want to delete all student?")) {
        localStorage.clear();
        location.reload();
    }
}

let form = document.getElementById("studentform");
form.addEventListener("submit" , function (e){
    e.preventDefault();
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;

    if (!name || !age || !course) return;
    stds.push({name: name , age: age , course: course});
    saveData();
    renderTable();
    this.reset();
});


function renderTable(sTEXT = "") {
    let studentList = document.getElementById("studentlist");
    studentList.innerHTML = "";

    let data = stds.filter(s => 
        s.name.toLowerCase().includes(sTEXT.toLowerCase()) || s.course.toLowerCase().includes(sTEXT.toLowerCase()))

    data.forEach((student , index) => {
        let row = `<tr>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>  
        <td><button class="btn btn-danger" onclick="deletestudent(${index})">Delete</button></td>
        </tr>`;
        
        studentList.innerHTML += row; 
    });
    console.log(data.length);
    document.getElementById("count").innerText = data.length
}

document.getElementById("search").oninput = function() {
    renderTable(this.value);
}

function deletestudent(index) {
    if(confirm("Are you sure you want to delete this student?")) {
        stds.splice(index , 1);
        saveData();
        renderTable();
    }
}

function saveData() {
    localStorage.setItem("stds" , JSON.stringify(stds));
}