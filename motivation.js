//an array of all the tasks
var tasks = [];
var points = 0;
var taskcount=0;

if()
var pointDisplay=document.getElementById("points");
pointDisplay.innerHTML = points;


var days = document.getElementByClassName("days");
days.innerHTML = getCalendarDays();
function createTask(){
  var taskname= document.getElementByName("taskname").value;
  var due="not yet implemented";
  var points = 10;
  tasks[taskcount]=[taskname,due,points];
  taskcount++;

}


var t_array = document.getElementByClassName("t_array");
for(var i = 0; i < taskcount;i++)
{
//  t_array
}
function getCalendarDays(){
  var months = ["January","Febuary","March", "April", "May", "June","July","August","September", "October","November","December"];
  var date = Date();
  var year = date.getYear();
  var monthno = date.getMonth();
  var month = months[monthno];
  var daysThisMonth = getDaysThisMonth(monthno, year);
  var weekdays = ["S","M","T","W","T","F","S"]
  var weekdayno = date.getUTCDay();
  var weekday= weekdays[weekdayno];
  var day = date.getUTCDate();
  for(var i = 0; i < daysThisMonth; i++){

  }
  var cal = [];
  // "<li>" +
  // "<li>1</li><li>2</li>
  // <li>3</li>
  // <li>4</li>
  // <li>5</li>
  // <li>6</li>
  // <li>7</li>
  // <li>8</li>
  // <li>9</li>
  // <li><span class=\"active\">10</span></li>
  // <li>11</li>
  // <li>12</li>
  // <li>13</li>
  // <li>14</li>
  // <li>15</li>
  // <li>16</li>
  // <li>17</li>
  // <li>18</li>
  // <li>19</li>
  // <li>20</li>
  // <li>21</li>
  // <li>22</li>
  // <li>23</li>
  // <li>24</li>
  // <li>25</li>
  // <li>26</li>
  // <li>27</li>
  // <li>28</li>
  // <li>29</li>
  // <li>30</li>
  // <li>31</li>"
}

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
