//an array of all the tasks
var tasks = [];
if(localStorage.getItem("tasks")){
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

var taskcount=0;
if(localStorage.getItem("taskcount")){
  taskcount = localStorage.getItem("taskcount");
}

//The calendar, defaults to due today
const currentDate = new Date();
var activeDate= new Date();
var monthno= activeDate.getMonth();
var year = activeDate.getFullYear();
$('.timepicker').wickedpicker();

//////addtask.html
///////////////////////////////////////////////////
//display the calendar on the add task screen
var days = document.getElementById("days");
var month_head = document.getElementById("year");
if(days && month_head){
  updateCalendar();
}

//update the contents of the calendar
function updateCalendar(){
  days.innerHTML = getCalendarDays();
  month_head.innerHTML = getCalendarMonth();
}

//Create a new task when the button is pressed
function createTask(){
  var taskname= document.forms["addTask"]["taskname"].value;
  var hour=document.forms["addTask"]["timepicker"].value.split(" ")[0];
  var minute = document.forms["addTask"]["timepicker"].value.split(" ")[2];
  activeDate.setHours(hour);
  activeDate.setMinutes(minute);
  tasks[taskcount]=[taskname,activeDate.getTime()];
  taskcount++;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("taskcount", taskcount);
  document.location.href="schedule.html";
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
    if(cal[i] == day && ((day>15 && i >= day-1)||(day<16 && i<29)))
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
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[monthno];
  return month +"<br><span style=\"font-size:18px\">" + year + "</span>";
}


//sets the currently selected day
function setActiveDay(day){
  var newDate = new Date(year, monthno, day);
  if(newDate>currentDate){
    activeDate= newDate;
  }
  else {
    activeDate=currentDate;
  }
  updateCalendar();
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
  setActiveDay(1);
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
