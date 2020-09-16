var next = document.getElementById('next');
var previous = document.getElementById('previous');
var carouselScroll = document.getElementById('carousel');

function clickNext() {
  carouselScroll.scrollBy(280, 0);
}
function clickPrevious() {
  carouselScroll.scrollBy(-280, 0);
}
if (next) {
  next.addEventListener('click', clickNext);
}
if (previous) {
  previous.addEventListener('click', clickPrevious);
}

function smoothScrollTo(endX, endY, duration) {
  var startX = window.scrollX || window.pageXOffset,
    startY = window.scrollY || window.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime();

  // Easing function
  var easeInOutQuart = function (time, from, distance, duration) {
    if ((time /= duration / 2) < 1) {
      return distance / 2 * time * time * time * time + from;
    } else {
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    }
  };

  var timer = window.setInterval(function () {
    var time = new Date().getTime() - startTime,
      newX = easeInOutQuart(time, startX, distanceX, duration),
      newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      window.clearInterval(timer);
    }
    window.scrollTo(newX, newY);
  }, 1000 / 60);
}
var carousel_wrap = document.getElementById('team-carousel');
carousel_wrap.addEventListener('click', function (event) {
  const person = event.target;
  var minimised = carousel_wrap.classList.contains('minimize');


  var personpos = document.querySelector('#' + person.dataset.name);
  const topPos = personpos.getBoundingClientRect().top + window.pageYOffset;
  var scrollBehavior;
  if ('scrollBehavior' in document.documentElement.style) {
    scrollBehavior = true;
  } else {
    scrollBehavior = false;
  }
  event.preventDefault();
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) && minimised
  ) {

    if (scrollBehavior) {
      window.scrollTo({
        top: topPos - 250,
        behavior: 'smooth'
      });
    } else {
      smoothScrollTo(0, topPos - 250, 1000);
    }
  } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )) {
    if (scrollBehavior) {
      window.scrollTo({
        top: topPos - 300,
        behavior: 'smooth'
      });
    } else {
      smoothScrollTo(0, topPos - 300, 1000);
    }
  } else if (minimised) {
    if (scrollBehavior) {
      window.scrollTo({
        top: topPos - 280,
        behavior: 'smooth'
      });
    } else {
      smoothScrollTo(0, topPos - 280, 1000);
    }
  } else {
    if (scrollBehavior) {
      window.scrollTo({
        top: topPos - 600,
        behavior: 'smooth'
      });
    } else {
      smoothScrollTo(0, topPos - 600, 1000);
    }
  }
});
