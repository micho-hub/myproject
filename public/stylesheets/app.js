
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
$(".navDivButton").on("click", function(){
  $(".navDiv").slideUp(1000,function(){
    $(this).remove();
  });
   $(".newHeadDiv").slideUp(1000,function(){
    $(this).remove();
  });
   $(".navDivShow").slideUp(1000,function(){
    $(this).remove();
  });
   $(".navDivEdit").slideUp(1000,function(){
    $(this).remove();
  });
});


function brakeCheck(){
      let check = document.getElementById('check');

             check.innerHTML = "&#xf00c;";

      setTimeout(function(){
        check.innerHTML = "&#xf058;";
      }, 700);
          
    }
 brakeCheck();



 
 