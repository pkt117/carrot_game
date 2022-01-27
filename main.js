"use strict";

const play = document.querySelector(".play");
const timer = document.querySelector(".timer");
const count = document.querySelector(".count");
const bug = document.querySelector("#bug");
const carrot = document.querySelector("#carrot");
const result = document.querySelector("#result");
const item_container = document.querySelector("#itemContainer");
// timer function
function countDown() {
  let countdown = 10;
  const interval = setInterval(() => {
    timer.textContent = `0:${countdown}`;

    countdown--;

    if (countdown == 0) {
      clearInterval(interval);
    }
  }, 1000);
}

// carrot count function
function carrot__count() {
  console.log("carrot_count");
}

// carrot & bug batch
function item__batch() {
  let num = 10;

  bug.innerHTML = Array(num)
    .fill()
    .map(() => item__create("bug__items", "bug"))
    .join("");

  carrot.innerHTML = Array(num)
    .fill()
    .map(() => item__create("carrot__items", "carrot"))
    .join("");
}

// item create
function item__create(name, type) {
  const randomX = parseInt(Math.random() * 100);
  const randomY = parseInt(Math.random() * 100);
  return `<div class=${name} style="top:${randomX}%; left:${randomY}%; data-type="${type}"></div>`;
}

// game start & end
play.addEventListener("click", (event) => {
  const target = event.target;
  if (target.dataset.state === "play") {
    target.classList.remove("active");
    target.nextElementSibling.classList.add("active");

    countDown();
    carrot__count();
    item__batch();
  } else if (target.dataset.state === "pause") {
    target.classList.remove("active");
    target.previousElementSibling.classList.add("active");
  } else return;
});

item_container.addEventListener("click", (event) => {
  const target = event.target;
});
