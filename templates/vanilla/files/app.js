const count = document.getElementById("count");
const countup = document.getElementById("countup");

let num = 0;

countup.addEventListener("click", () => {
  num += 1;
  count.textContent = `${num}`;
});
