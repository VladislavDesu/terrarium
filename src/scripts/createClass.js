"use strict";

class Animal {
   constructor(name, appearance) {
      this._name = name;
      this._appearance = appearance;
      this._satiety = 100;
      this._food = 1;
      this._foodCost = 10;
      this._lvl = 0;
      this._lvlCost = 100;
      this._currency = 0;
      this._health = 100;
      this._clickerField = document.querySelector("#clicker-field");
      this._consoleOutput = document.querySelector("#console-output");
      this._levelOutput = document.querySelector("#level-count");
      this._satietyOutput = document.querySelector("#satiety-count");
      this._currencyOutput = document.querySelector("#currency-count");
      this._appearanceImage = document.querySelector("#appearance-image");
   }

   get name() {
      return this._name;
   }

   get satiety() {
      return this._satiety;
   }

   get food() {
      return this._food;
   }

   get foodCost() {
      return this._foodCost;
   }

   get lvl() {
      return this._lvl;
   }

   get lvlCost() {
      return this._lvlCost;
   }

   get currency() {
      return this._currency;
   }

   get appearance() {
      return this._appearance;
   }

   get fullImagePath() {
      return "images/" + this.appearance;
   }

   get health() {
      return this._health;
   }

   updateInfo() {
      this._levelOutput.textContent = this.lvl;
      this._satietyOutput.textContent = this.satiety;
      this._currencyOutput.textContent = this.currency;
      this._appearanceImage.src = this.fullImagePath;
      this._consoleOutput.textContent = "Ваш питомец: " + this.name;
   }

   showInfo() {
      this._consoleOutput.textContent = "";

      for (let i = 1; i <= 3; i++) {
         let consoleSpan = document.createElement("div");
         this._consoleOutput.appendChild(consoleSpan);
      }

      this._consoleOutput.childNodes[0].textContent = "Имя: " + this.name;
      this._consoleOutput.childNodes[1].textContent = "Здоровье: " + this.health;
      this._consoleOutput.childNodes[2].textContent = "Крыски: " + this.currency;
   }

   feed() {
      this._satiety += this.food;
      return this.satiety;
   }

   checkCurrency() {
      if (this.currency >= this.foodCost) {
         this.buyFood();
         return "Еда куплена";
      } else {
         return "Еда стоит: " + this.foodCost + " Крысок";
      }
   }

   сheckSatiety() {
      if (this.satiety >= this.lvlCost) {
         this.lvlUp();
         return "Уровень повышен";
      } else {
         return "Уровень стоит: " + this.lvlCost + " Сытости";
      }
   }

   sayMessage(message) {
      this._consoleOutput.textContent = message;
      return message;
   }

   buyFood() {
      this._food += 1;
      this._currency -= this.foodCost;
   }

   lvlUp() {
      this._lvl += 1;
      this._satiety -= this.lvlCost;
      this._lvlCost *= 2;
      this._food += 1;
      this._currency += 25;
   }

   clickMe() {
      this.feed();
      this.updateInfo();
      this.addCounterElement();
      this.deleteCounterElement();
   }

   addCounterElement() {
      let newElement = document.createElement("span");
      newElement.textContent = "+" + this.food;
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

export default class Snake extends Animal {
   constructor(name, appearance) {
      super(name, appearance);
   }
}
