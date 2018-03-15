//Jquery for clicking interactions

$(document).ready(function(){
  //switch the active day
  $("#days").on("click", "li", function(){
      var day = $(this).html();
      if(day.length<3){
        day = parseInt(day);
        setActiveDay(day);
      }

  });

  $("tr").on("click", ".checkbox", function(){
    var index= parseInt($(this).attr("id").slice(4));
    $("tr:not(#task-header)").remove();
    $("tbody:empty").remove();
    completeTask(index);
  });
  $("tr").on("click", ".options", function(){
    console.log($(this));
  });
  $("#addtask").click(function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("taskcount", taskcount);
    localStorage.setItem("points", points);
  });
  if(document.title == "Add Task"){
    $("#prev").click(prevMonth);
    $("#next").click(nextMonth);
  }
  if(document.title=="Remindr"){
    $(".dropdown-content").click(deleteTask);
  }
  if(document.title=="Calendar"){
    $(".toggle").click(function(){
      if(localStorage.getItem("viewType")==="Weekly"){
        localStorage.setItem("viewType", "Monthly");
        viewTog="Monthly";
        updateView();
      }
      else{
        localStorage.setItem("viewType", "Weekly");
        viewTog="Weekly";
        updateView();
      }
    });
  }

});
