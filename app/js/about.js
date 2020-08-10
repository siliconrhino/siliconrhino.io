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
