var next = document.getElementById("next");
var previous = document.getElementById("previous");
var carouselScroll = document.getElementById("carousel");

if (next) {
  next.addEventListener("click", () => {
    carouselScroll.scrollBy(280, 0);
  });
}
if (previous) {
  previous.addEventListener("click", () => {
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
var carousel_wrap = document.getElementById("team-carousel");
carousel_wrap.addEventListener("click", function (event) {
  const person = event.target;
  var minimised = carousel_wrap.classList.contains("minimize");
  console.log(person.dataset.name);

  var personpos = document.querySelector("#" + person.dataset.name);
  const rect = personpos.getBoundingClientRect(); // get rects(width, height, top, etc)
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  event.preventDefault();

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    console.log("in mobile");
    const scrollTop = rect.top + rect.height / 2 - viewHeight / 2;
    window.scrollTo({
      top: scrollTop,
    });
  } else if (minimised) {
    console.log("minimized");
    window.scrollTo({
      top: rect.top + rect.height / 2 - viewHeight / 2,
    });
  } else {
    console.log("normal");
    window.scrollTo({
      top: rect.top + rect.height / 2 - viewHeight / 2 - 450,
    });
  }
});
