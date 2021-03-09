"use strict";
import Snake from "./createClass.js";

function startGame(name, appearance) {
   let animal = new Snake(name, appearance);
   animal.updateInfo();

   function checkBtn(animal, selector, func) {
      let element = document.querySelector(selector);
      element.addEventListener("click", (event) => {
         event.preventDefault();
         let info = func.call(animal);
         animal.updateInfo();
         animal.sayMessage(info);
      });
   }

   function clickBtn(animal, selector, func) {
      let element = document.querySelector(selector);
      element.addEventListener("click", (event) => {
         event.preventDefault();
         func.call(animal);
      });
   }

   checkBtn(animal, "#level-btn", animal.сheckSatiety);
   checkBtn(animal, "#food-btn", animal.checkCurrency);
   clickBtn(animal, "#clicker", animal.clickMe);
   clickBtn(animal, "#info-btn", animal.showInfo);
}

startGame("Аня", "snake1.jpg");
