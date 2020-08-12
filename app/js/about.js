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
var phil = document.getElementById("phil").offsetTop;
function scrollToTeam() {
  console.log(phil);

  window.scrollTo({ top: phil - 70, behavior: 'smooth' });
  ;
}

