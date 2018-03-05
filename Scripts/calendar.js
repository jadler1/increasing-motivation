var tasks = [];
if(localStorage.getItem("tasks")){
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
var weekdays= ["sun","mon","tue","wed","thu","fri","sat"];

const currentDate = new Date();
var weekdayno = currentDate.getDay();
var weekday = 0;
var dayno = currentDate.getDate();
var j = dayno-weekdayno;
for(var i = 0; i < 7;i++){
  weekday= weekdays[i];
  document.getElementById(weekday).innerHTML=j;
  if(j==getDaysThisMonth(currentDate.getMonth(),currentDate.getFullYear())) {
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
