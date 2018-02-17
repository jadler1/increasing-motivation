//an array of all the tasks
var tasks = [];
var points = 0;
var taskcount=0;

//display the points on the main screen
var pointDisplay=document.getElementById("points");
if(pointDisplay){
  pointDisplay.innerHTML = points;
}

//display the calendar on the add task screen
var days = document.getElementById("days");
if(days){
  days.innerHTML = getCalendarDays();
}

//display the month and year on the calendar on the add task screen
var month_head = document.getElementById("year");
if(month_head){
  month_head.innerHTML = getCalendarMonth();
}

//Create a new task when the button is pressed
function createTask(){
  var taskname= document.forms["addTask"]["taskname"].value;
  var due="not yet implemented";
  var points = calculatePoints(due);
  tasks[taskcount]=[taskname,due,points];
  taskcount++;
}

//Properly aligns the calendar for the add task screen
function getCalendarDays(){
  var date = new Date();
  var year = date.getFullYear();
  var monthno = date.getMonth();
  var daysThisMonth = getDaysThisMonth(monthno, year);
  var weekdayno = date.getUTCDay();
  var day = date.getUTCDate();
  var cal = [];
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
    if(cal[i] == day && i >= day-1)
    {
      calhtml += "<li><span class=\"active\">"+cal[i]+"</span></li>";
    }
    else if(currentMonth){
      calhtml+= "<li>" + cal[i]+"</li>";
    }
    else{
      calhtml+= "<li><span class=\"inactive\">"+cal[i]+"</span></li>";
    }
  }
  return "<ul>" +calhtml + "</ul>";
}

//Returns the number of days in the given month and year taking into account
//leap years
function getDaysThisMonth( monthno,  year){
  switch(monthno){
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    case 2:
      if(year%4 ==0 && year%100 !=0){
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
  var date= new Date();
  var year = date.getFullYear();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
  var month = months[date.getMonth()];
  return month +"<br><span style=\"font-size:18px\">" + year + "</span>";
}



//not yet implemented
function calculatePoints(due){
  return 10;
}
