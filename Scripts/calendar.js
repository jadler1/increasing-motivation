var tasks = [];
if(!localStorage.getItem("viewType")){
  localStorage.setItem("viewType", "Weekly");
}
var viewType = localStorage.getItem("viewType");
document.getElementById("viewTog").innerHTML=viewType;

if(localStorage.getItem("tasks")){
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
var weekdays= ["sun","mon","tue","wed","thu","fri","sat"];
var timetable = document.getElementById("times");
fillCalendarTimes();
const currentDate = new Date();
var year = currentDate.getFullYear();
var monthno= currentDate.getMonth();
var weekdayno = currentDate.getDay();
var weekday = 0;
var dayno = currentDate.getDate();
var j = dayno-weekdayno;

for(var i = 0; i < 7;i++){
  weekday= weekdays[i];
  var temp=j;
  if(j<1)
  {
    var daysLastMonth=0;
    if(monthno==0)
    {
      daysLastMonth=getDaysThisMonth(11,year-1);
    }
    else{
      daysLastMonth=getDaysThisMonth(monthno-1, year);
    }
    j = daysLastMonth+j;
  }
  document.getElementById(weekday).innerHTML=j;
  j = temp;
  if(j==getDaysThisMonth(monthno,year)) {
    j=0;
  }
  j++;
}

tasks.forEach(function(t){
  var date = new Date(t[1]);
  if(dayno+(6-weekdayno)<date.getDate()){
    return;
  }
  var taskday = document.getElementsByClassName(date.getDay()+"");
  var hour= date.getHours()*2;
  if(date.getMinutes() >29){
    hour++;
  }
  taskday[hour].innerHTML = t[0];
  taskday[hour].id = "active";
})





function fillCalendarTimes(){
  var calhtml = "";
  for(var i = 0; i <24;i++){
    var j = (i%12);
    if(j==0){j=12;}
    var ampm = "AM";
    if(i>11){
      ampm="PM";
    }
    calhtml +="<tr id=\""+j+ampm+"\">";
    calhtml +="<td class=\"hour\" rowspan=\"2\"><span>" +j +" "+ampm;
    calhtml +="</span></td>";
    for(var k = 0; k <7; k++){
      calhtml +="<td class=\""+k+"\"></td>"
    }
    calhtml +="</tr><tr id=\""+j+"30"+ampm+"\">";
    for(var k = 0; k <7; k++){
      calhtml +="<td class=\""+k+"\"></td>"
    }
    calhtml+="</tr>";

  }
  timetable.innerHTML=calhtml;
}


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
