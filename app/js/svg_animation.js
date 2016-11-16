/*
var numberOfDegreesToRotateEachTime = 1;


function bespokeAnimation(){

  var bigWheel = document.getElementById('bigWheel');
  var smallWheel = document.getElementById('smallWheel');

  function animateElement(element, reverse) {
    var step = 0;
    function performStep() {
      step++;
      var numberOfStepsPerFullRotation = 360 / numberOfDegreesToRotateEachTime;

      var rotationAmount;
      if (reverse === true){
        rotationAmount = '-' + (step % numberOfStepsPerFullRotation * numberOfDegreesToRotateEachTime);
      } else {
        rotationAmount = step % numberOfStepsPerFullRotation * numberOfDegreesToRotateEachTime;
      }
      element.style.transform = 'rotate(' + rotationAmount + 'deg)';
    setTimeout(performStep, 50);
    }
    performStep();
  }

  animateElement(smallWheel);
  animateElement(bigWheel, true);



  console.log('animation running');

}

bespokeAnimation();
*/

document.addEventListener('DOMContentLoaded', function () {
 if(window.location.pathname === '/what-we-do/'){
  setInterval(function () {
    var containerWebsiteSvg = document.getElementById('websiteSvg');
    var tmp = containerWebsiteSvg.innerHTML;
    containerWebsiteSvg.innerHTML = tmp;
  }, 36000);


 setInterval(function () {
    var containerAppSvg = document.getElementById('appSvg');
    var tmp = containerAppSvg.innerHTML;
    containerAppSvg.innerHTML = tmp;
  }, 9000);

 setInterval(function () {
    var containerMvpSvg = document.getElementById('mvpSvg');
    var tmp = containerMvpSvg.innerHTML;
    containerMvpSvg.innerHTML = tmp;
  }, 12000);
}

});






