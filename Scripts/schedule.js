var tasks = []
var taskcount=0;
var points = 0;

if(localStorage.getItem("tasks")){
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
if(localStorage.getItem("taskcount")){
  taskcount=localStorage.getItem("taskcount");
}
if(localStorage.getItem("points")){
  points = parseInt(localStorage.getItem("points"));
}
if(localStorage.getItem("pet")){
  document.getElementById("pet").src= "images/"+ localStorage.getItem("pet") +".png";
}

//display the points on the main screen
var pointDisplay=document.getElementById("points");
if(pointDisplay){
  updatePoints();
}

//display the tasks on the main screen
var tasklist = document.getElementsByClassName("task-wrapper")[0];
if(tasklist){
  fillTaskList();
}


//Complete the task and earn the points
function completeTask(taskno){
  points+=calculatePoints(tasks[taskno][1]);
  tasks= tasks.filter(function(x, index){
    return taskno != index;
  });
  taskcount--;
  localStorage.setItem("taskcount", taskcount);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  fillTaskList();
  updatePoints();
  location.reload();
}

//Fills the task list with html elements
function fillTaskList(){
  var i = 0;
  tasks.forEach(function(task){
      tasklist.innerHTML = tasklist.innerHTML + fillTask(task[0],timeTillDue(task[1]),calculatePoints(task[1]),i);
   i++;
 });
}

//Add a row to the task list with the new task info
function fillTask(name, duedate, points, index){
	var rowData = "<tr><td class=\"small-column\"><div id=\"task"+index+"\" class=\"checkbox\"></div></td><td class=\"big-column\">"+ name +"</td><td class=\"big-column\">"+ duedate +"</td><td class=\"big-column\">"+ points +"</td><td class=\"small-column\"><div class=\"options\"><div class=\"dropdown\"><button onclick=\"myFunction()\" class=\"dropbtn\">...</button><div id=\"myDropdown\" class=\"dropdown-content\">Delete Task</div></div></div></td></tr>";
	return rowData;
}

//updates the point display
function updatePoints(){
    localStorage.setItem("points", points);
    pointDisplay.innerHTML = points;
}



//uses a logistic curve to calculate points based on a given date
function calculatePoints(due){
  var newpoints = due-new Date().getTime();
  newpoints = newpoints/86400000;
  newpoints -= 3.5;
  newpoints *=-1;
  newpoints = (Math.exp(newpoints))+1;
  newpoints= Math.ceil(100/newpoints);
  return newpoints;
}

function timeTillDue(due){
  due = due-new Date().getTime();
  var timeDisp= "";
  var days = Math.floor(due/86400000);
  due = due%86400000;
  var hours = Math.floor(due/3600000);
  due = due%3600000;
  var mins = Math.floor(due/60000);
  if(days > 1){
    timeDisp += days +" Days ";
  }
  else if(days == 1){
    timeDisp += days + " Day ";
  }
  if(days <= 1 && hours >1){
    timeDisp += hours + " Hours ";
  }
  else if(days <=1 && hours == 1){
    timeDisp += hours + " Hour ";
  }
  if(days < 1 && hours <=2 && mins > 1){
    timeDisp += mins + " Minutes";
  }
  else if(days < 1 && hours <=2 && mins == 1){
    timeDisp += mins + " Minute";
  }
  return timeDisp;
}


function moreOptions(){
  console.log("Options clicked");
}
