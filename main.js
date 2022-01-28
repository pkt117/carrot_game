"use strict";

const play = document.querySelector(".play");
const timer = document.querySelector(".timer");
const count = document.querySelector(".count");
const result = document.querySelector("#result");
const item_container = document.querySelector("#itemContainer");
const item__list = document.querySelector("#item__list");
const win = document.querySelector(".win");
const pause = document.querySelector(".pause_replay");
const lost = document.querySelector(".lost");
const replay = document.querySelector(".replay");

let carrot_length = 10;
let interval;
const bgm = new Audio("sound/bg.mp3");
const bug__effect = new Audio("sound/bug_pull.mp3");
const win__effect = new Audio("sound/game_win.mp3");

// timer function
function countDown() {
  let countdown = 10;
  timer.textContent = `0:${countdown}`;

  interval = setInterval(() => {
    countdown--;
    timer.textContent = `0:${countdown}`;

    if (countdown == 0) {
      result__Alert("lost");
    }
  }, 1000);
}

// carrot count function
function carrot__count() {
  carrot_length--;

  count.textContent = carrot_length;
  if (carrot_length === 0) {
    result__Alert("win");
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

// result print
function result__Alert(item) {
  bgm.pause();
  clearInterval(interval);
  result.classList.add("on");
  play.classList.add("hide");
  item_container.style.pointerEvents = "none";

  switch (item) {
    case "win":
      win.classList.add("on");
      win__effect.play();
      break;

    case "lost":
      lost.classList.add("on");

      break;

    case "pause":
      pause.classList.add("on");

      break;
  }
}

// play game
function play__game() {
  bgm.load();
  bgm.play();
  countDown();
  carrot_length = 10;
  count.textContent = carrot_length;
  item__batch();
}

// game start & end
play.addEventListener("click", (event) => {
  const target = event.target;
  if (target.dataset.state === "play") {
    target.classList.remove("active");
    target.nextElementSibling.classList.add("active");

    play__game();
  } else if (target.dataset.state === "pause") {
    result__Alert("pause");
  } else return;
});

item_container.addEventListener("click", (event) => {
  const target = event.target;

  if (target.dataset.type === "carrot") {
    target.remove();
    carrot__count();
  } else if (target.dataset.type === "bug") {
    bug__effect.play();
    result__Alert("lost");
  }
});

// replay button click
replay.addEventListener("click", () => {
  play__game();
  result.classList.remove("on");
  play.classList.remove("hide");
  item_container.style.pointerEvents = "auto";
  document.querySelector("#result .on").classList.remove("on");
});
