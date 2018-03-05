var tasks = [];
if(localStorage.getItem("tasks")){
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
var weekdays= ["sun","mon","tue","wed","thu","fri","sat"];

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
