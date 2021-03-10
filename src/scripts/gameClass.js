"use strict";

export default class Game {
   constructor(animal) {
      this._animal = animal;
      this._clickerField = document.querySelector("#clicker-field");
      this._consoleOutput = document.querySelector("#console-output");

      this._levelOutput = document.querySelector("#level-count");
      this._satietyOutput = document.querySelector("#satiety-count");
      this._currencyOutput = document.querySelector("#currency-count");
      this._appearanceImage = document.querySelector("#appearance-image");

      this._infoBtn = document.querySelector("#info-btn");
      this._foodBtn = document.querySelector("#food-btn");
      this._lvlBtn = document.querySelector("#level-btn");
      this._clickerBtn = document.querySelector("#clicker");
   }

   updateInfo() {
      this.clearMessage();
      this._levelOutput.textContent = this._animal.lvl;
      this._satietyOutput.textContent = this._animal.satiety;
      this._currencyOutput.textContent = this._animal.currency;
      this._appearanceImage.src = this._animal.fullImagePath;
   }

   startGame() {
      this.updateInfo();
      this.showName();
      this.clickClickerBtn();
      this.clickInfoBtn();
      this.clickFoodBtn();
      this.clickLvlBtn();
   }

   feedAnimal() {
      this._animal.feed();
      this.updateInfo();
      this.showName();
      this.addCounterElement();
      this.deleteCounterElement();
   }

   checkCurrency() {
      if (this._animal.currency >= this._animal.foodCost) {
         this._animal.foodUp();
         return "Еда куплена";
      } else {
         return "Еда стоит: " + this._animal.foodCost + " Крысок";
      }
   }

   сheckSatiety() {
      if (this._animal.satiety >= this._animal.lvlCost) {
         this._animal.lvlUp();
         return "Уровень повышен";
      } else {
         return "Уровень стоит: " + this._animal.lvlCost + " Сытости";
      }
   }

   showInfo() {
      this.clearMessage();
      this.sayMessage("Имя: " + this._animal.name);
      this.sayMessage("Здоровье: " + this._animal.health);
      this.sayMessage("Крыски: " + this._animal.currency);
   }

   showName() {
      this._consoleOutput.textContent = "Ваш питомец: " + this._animal.name;
   }

   clickInfoBtn() {
      this._infoBtn.addEventListener("click", (event) => {
         event.preventDefault();
         this.showInfo();
      });
   }

   clickClickerBtn() {
      this._clickerBtn.addEventListener("click", (event) => {
         event.preventDefault();
         this.feedAnimal();
      });
   }

   clickFoodBtn() {
      this._foodBtn.addEventListener("click", (event) => {
         event.preventDefault();
         let info = this.checkCurrency();
         this.updateInfo();
         this.sayMessage(info);
      });
   }

   clickLvlBtn() {
      this._lvlBtn.addEventListener("click", (event) => {
         event.preventDefault();
         let info = this.сheckSatiety();
         this.updateInfo();
         this.sayMessage(info);
      });
   }

   sayMessage(message) {
      let consoleDiv = document.createElement("div");
      consoleDiv.textContent = message;
      this._consoleOutput.appendChild(consoleDiv);
   }

   clearMessage() {
      this._consoleOutput.textContent = "";
   }

   addCounterElement() {
      let newElement = document.createElement("span");
      newElement.textContent = "+" + this._animal.food;
      newElement.classList.add("clicker__count");
      newElement.classList.add("to-bottom");
      newElement.style.top = `${Math.random() * 70 + 50}px`;
      newElement.style.left = `${Math.random() * 70 + 50}px`;
      this._clickerField.appendChild(newElement);
   }

   deleteCounterElement() {
      setTimeout(() => {
         if (this._clickerField.childNodes.length !== 0) {
            let delElement = this._clickerField.firstChild;
            this._clickerField.removeChild(delElement);
         }
      }, 1500);
   }
}
