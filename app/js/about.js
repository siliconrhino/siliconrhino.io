var next = document.getElementById('next');
var previous = document.getElementById('previous');
var carouselScroll = document.getElementById('carousel');

if (next) {
  next.addEventListener('click', () => {
    carouselScroll.scrollBy(280, 0);
  });
}
if (previous) {
  previous.addEventListener('click', () => {
    carouselScroll.scrollBy(-280, 0);
  });
}
function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return [curtop];
  }
}
var carousel_wrap = document.getElementById('team-carousel');
carousel_wrap.addEventListener('click', function (event) {
  const person = event.target;
  var minimised = carousel_wrap.classList.contains('minimize');
  console.log(person.dataset.name);

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


