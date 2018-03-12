var points = 0;
if(localStorage.getItem("points")){
  points = parseInt(localStorage.getItem("points"));
}
document.getElementById("points").innerHTML=points;
function buy(name){

  switch (name){
	  case 'Pippin':
	  if(points>=100){
		  localStorage.setItem("points", points-100);
		  localStorage.setItem("pet", "pippin");
		  alert("You have purchased a new pet!");
		  window.location.href = 'schedule.html';
	  }
	  else{
		  alert("You cannot afford this pet!");
	  }
	  break;

	  case 'Sly':
	  if(points>=200){
		  localStorage.setItem("points", points-200);
		  localStorage.setItem("pet", "sly");
		  alert("You have purchased a new pet!");
		  window.location.href = 'schedule.html';
	  }
	  else{
		  alert("You cannot afford this pet!");
	  }
	  break;

	  case 'Plop':
	  if(points>=250){
		  localStorage.setItem("points", points-250);
		  localStorage.setItem("pet", "plop");
		  alert("You have purchased a new pet!");
		  window.location.href = 'schedule.html';
	  }
	  else{
		  alert("You cannot afford this pet!");
	  }
	  break;

	  case 'Bamboozle':
	  if(points>=300){
		  localStorage.setItem("points", points-300);
		  localStorage.setItem("pet", "bamboozle");
		  alert("You have purchased a new pet!");
		  window.location.href = 'schedule.html';
	  }
	  else{
		  alert("You cannot afford this pet!");
	  }
	  break;
  }

}
