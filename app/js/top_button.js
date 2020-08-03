var btn = document.getElementById("button");
window.addEventListener("scroll", showbtn);

function showbtn() {
  if (window.scrollY > 300) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
}

btn.onclick = function () {
  myFunction();
};

function myFunction() {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
}
