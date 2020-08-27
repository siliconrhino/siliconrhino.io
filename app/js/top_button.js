var btn = document.getElementById('toTopButton');

function showbtn() {
  if (window.scrollY > 300) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
}
function smoothScrollTo(endX, endY, duration) {
  let startX = window.scrollX || window.pageXOffset,
    startY = window.scrollY || window.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime();

  // Easing function
  let easeInOutQuart = function (time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  let timer = window.setInterval(function () {
    let time = new Date().getTime() - startTime,
      newX = easeInOutQuart(time, startX, distanceX, duration),
      newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      window.clearInterval(timer);
    }
    window.scrollTo(newX, newY);
  }, 1000 / 60);
}

function scrollFunction() {
  if ('scrollBehavior' in document.documentElement.style) { //Checks if browser supports scroll function
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    smoothScrollTo(0, 0, 1000);
  }
}

if (btn) {
  btn.onclick = function () {
    scrollFunction();
  };
}
window.addEventListener('scroll', showbtn);
