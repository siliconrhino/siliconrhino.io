var btn = document.getElementById("toTopButton");

function showbtn() {
  if (window.scrollY > 300) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
}

function myFunction() {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
}
if (btn) {
  btn.onclick = function () {
    myFunction();
  };
}
window.addEventListener("scroll", showbtn);
