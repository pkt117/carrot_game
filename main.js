"use strict";

const play = document.querySelector(".play");
const timer = document.querySelector(".timer");
const count = document.querySelector(".count");
const result = document.querySelector("#result");
const item_container = document.querySelector("#itemContainer");
const item__list = document.querySelector("#item__list");
const win = document.querySelector(".win");
const pause = document.querySelector(".pause_reply");
const lost = document.querySelector(".lost");
const replay = document.querySelector(".replay");

let carrot_length = 10;
let interval;

// timer function
function countDown() {
  let countdown = 10;
  timer.textContent = `0:${countdown}`;

  interval = setInterval(() => {
    countdown--;
    timer.textContent = `0:${countdown}`;

    if (countdown == 0) {
      clearInterval(interval);
      lost.classList.add("on");
      result.classList.add("on");
    }
  }, 1000);
}

// carrot count function
function carrot__count() {
  carrot_length--;

  count.textContent = carrot_length;
  if (carrot_length === 0) {
    win.classList.add("on");
    result.classList.add("on");
  }
}

// carrot & bug batch
function item__batch() {
  let num = 20;
  const array_num = Array(num).fill();
  item__list.innerHTML =
    array_num.map(() => item__create("bug__items", "bug")).join("") +
    array_num
      .fill()
      .map(() => item__create("carrot__items", "carrot"))
      .join("");
}

// item create
function item__create(name, type) {
  const randomX = parseInt(Math.random() * 100);
  const randomY = parseInt(Math.random() * 100);
  return `<div class=${name} style="top:${randomX}%; left:${randomY}%; data-type=${type}></div>`;
}

// game start & end
play.addEventListener("click", (event) => {
  const target = event.target;
  if (target.dataset.state === "play") {
    target.classList.remove("active");
    target.nextElementSibling.classList.add("active");

    countDown();
    carrot_length = 10;
    count.textContent = carrot_length;
    item__batch();
  } else if (target.dataset.state === "pause") {
    target.classList.remove("active");
    target.previousElementSibling.classList.add("active");
    clearInterval(interval);
  } else return;
});

item_container.addEventListener("click", (event) => {
  const target = event.target;

  if (target.dataset.type === "carrot") {
    target.remove();
    carrot__count();
  } else if (target.dataset.type === "bug") {
    result.classList.add("on");
    lost.classList.add("on");
  }
});

// replay button click
replay.addEventListener("click", () => {});
