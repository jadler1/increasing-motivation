//an array of all the tasks
var tasks = [];
var points = 0;
var taskcount=0;

//The calendar, defaults to due today
const currentDate = new Date();
var activeDate= new Date();
var monthno= activeDate.getMonth();
var year = activeDate.getFullYear();


//////addtask.html
///////////////////////////////////////////////////
//display the calendar on the add task screen
var days = document.getElementById("days");
var month_head = document.getElementById("year");
if(days && month_head){
  updateCalendar();
  minutes = activeDate.getMinutes();
  hours = activeDate.getHours();
  if(minutes <10){
    minutes ="0"+minutes;
  }
  if(hours<10){
    hours = "0"+hours
  }
  document.forms["addTask"]["time"].value = hours+":"+minutes;
}

//update the contents of the calendar
function updateCalendar(){
  days.innerHTML = getCalendarDays();
  month_head.innerHTML = getCalendarMonth();
}

//Create a new task when the button is pressed
function createTask(){
  var taskname= document.forms["addTask"]["taskname"].value;
  var hour=document.forms["addTask"]["time"].value.split(":")[0];
  var minute = document.forms["addTask"]["time"].value.split(":")[1];
  activeDate.setHours(hour);
  activeDate.setMinutes(minute);
  var points = calculatePoints(activeDate);
  tasks[taskcount]=[taskname,activeDate,points];
  console.log(tasks[taskcount]);
  taskcount++;
}


//Properly aligns the calendar for the add task screen
function getCalendarDays(){
  var cal = [];
  var date = activeDate;
  year = date.getFullYear();
  monthno = date.getMonth();
  var daysThisMonth = getDaysThisMonth(monthno, year);
  var weekdayno = date.getUTCDay();
  var day = date.getUTCDate();
  var i =0;
  //fill in the calendar
  for(i = 1; i <= daysThisMonth; i++){
    cal.push(i);
  }
  //add the last month padding
  var daysLastMonth=0;
  if(monthno==0)
  {
    daysLastMonth=getDaysThisMonth(11,year-1);
  }
  else{
    daysLastMonth=getDaysThisMonth(monthno-1, year);
  }
  i = (day%7)-1;
  while(i%7!=weekdayno)
  {
    cal.unshift(daysLastMonth);
    daysLastMonth--;
    i++;
  }
  //add the next month padding
  i=1;
  while(cal.length < 42)
  {
    cal.push(i);
    i++;
  }
  //actually fill in the calendar with html tags
  var calhtml= "";
  var currentMonth=false;
  for(i=0; i<42; i++){
    if(cal[i]==1){
      currentMonth = !currentMonth;
    }
    if(cal[i] == day && ((day>15 && i >= day-1)||(day<16 && i<30)))
    {
      calhtml += "<li><span class=\"active\">"+cal[i]+"</span></li>";
    }
    else if(!currentMonth || (monthno== currentDate.getMonth() && year == currentDate.getFullYear() && cal[i]<currentDate.getUTCDate())){
      calhtml+= "<li><span class=\"inactive\">"+cal[i]+"</span></li>";
    }
    else{
      calhtml+= "<li>" + cal[i]+"</li>";
    }
  }
  return "<ul>" +calhtml + "</ul>";
}

//Returns the number of days in the given month and year taking into account
//leap years
function getDaysThisMonth(mo, yr){
  switch(mo){
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    case 1:
      if(yr%4 ==0 && yr%100 !=0){
        return 29;
      }
      return 28;
    default:
      return 30;
  }
}

//Gets the month and year header
function getCalendarMonth()
{
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
  var month = months[monthno];
  return month +"<br><span style=\"font-size:18px\">" + year + "</span>";
}



//uses a logistic curve to calculate points based on a given date
function calculatePoints(due){
  var points = due.getTime()-currentDate.getTime();
  points = points/86400000;
  points -= 3.5;
  points *=-1;
  points = (Math.exp(points))+1;
  points= Math.floor(100/points);

  return points;
}



//sets the currently selected day
function setActiveDay(day){
  var newDate = new Date(year, monthno, day);
  if(newDate>currentDate){
    activeDate= newDate;
    updateCalendar();
  }
  else {
    return true;
  }
}

//Not currently implemented
function prevMonth(){
  if(monthno ==0){
    monthno = 11;
    year--;
  }
  else{
    monthno--;
  }
  if(setActiveDay(1))
  {
    activeDate=currentDate;
  }
}

//not currently implemented
function nextMonth(){
  if(monthno ==11){
    monthno = 0;
    year++;
  }
  else{
    monthno++
  }
  setActiveDay(1);
}


////Schedule.html
/////////////////////////////////////
//Switch to true and the task list will autopopulate
var devMode = true;
if(devMode){
  fillList();
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
  points+=tasks[taskno][2];
  tasks= tasks.filter(function(x, index){
    return taskno != index;
  });
  fillTaskList();
  updatePoints();
}

//Fills the task list with html elements
function fillTaskList(){
  var i = 0;
  tasks.forEach(function(task){
      tasklist.innerHTML = tasklist.innerHTML + fillTask(task[0],task[1],task[2],i);
   i++;
 });
}

//Add a row to the task list with the new task info
function fillTask(name, duedate, points, index){
	var rowData = "<tr><td class=\"small-column\"><div id=\"task"+index+"\" class=\"checkbox\"></div></td><td class=\"big-column\">"+ name +"</td><td class=\"big-column\">"+ duedate +"</td><td class=\"big-column\">"+ points +"</td><td class=\"small-column\"><i class=\"material-icons\">more_horiz</i></td></tr>";
	return rowData;
}

//updates the point display
function updatePoints(){
    pointDisplay.innerHTML = points;
}




//This is just for demoing the project. It would not be in the final implementation
function fillList(){
  var hw = new Date(currentDate.getTime()+172800000);
  tasks.push(["DTC User Testing", hw, calculatePoints(hw)]);
}
