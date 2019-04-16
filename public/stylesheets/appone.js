function brakekError(){
      let brake = document.getElementById("brake");

             brake.innerHTML = "&#xf12a;";

      setTimeout(function(){
        brake.innerHTML = "&#xf06a;";
      }, 700);
          
    }
 brakekError();