var next = document.getElementById("next");
var previous = document.getElementById("previous");
var carouselScroll = document.getElementById("carousel");

if (next) {
  next.addEventListener('click', () => {
    carouselScroll.scrollBy(280, 0);
  })
}
if (previous) {
  previous.addEventListener('click', () => {
    carouselScroll.scrollBy(-280, 0);
  })
}
function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curtop];
  }
}
/* var carousel_element = document.getElementById("team-carousel");
var minimize = carousel_element.classList.contains("minimize");
function clickRoger() {
  console.log(minimize)
  if (minimize) {
    $(window).scrollTop($('#roger').offset().top - 600);
  } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $(window).scrollTop($('#roger').offset().top - 600);
  } else {
    $(window).scrollTop($('#roger').offset().top - 600);
  }

}; */

