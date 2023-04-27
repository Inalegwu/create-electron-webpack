import "./styles.css";

const count = document.getElementById("count");
const countup = document.getElementById("countup");

let num = 0;

countup &&
  countup.addEventListener("click", () => {
    num += 1;
    if (count) count.textContent = `${num}`;
  });
