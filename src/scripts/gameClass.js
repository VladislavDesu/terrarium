"use strict";

export default class Game {
   constructor(animal) {
      this._animal = animal;

      this._clickerField = document.querySelector("#clicker-field");
      this._consoleOutput = document.querySelector("#console-output");
      this._notification = document.querySelector("#notification");

      this._levelOutput = document.querySelector("#level-count");
      this._satietyOutput = document.querySelector("#satiety-count");
      this._currencyOutput = document.querySelector("#currency-count");
      this._appearanceImage = document.querySelector("#appearance-image");

      this._infoBtn = document.querySelector("#info-btn");
      this._foodBtn = document.querySelector("#food-btn");
      this._lvlBtn = document.querySelector("#level-btn");
      this._clickerBtn = document.querySelector("#clicker");
   }

   startGame() {
      this.updateInfo();
      this.clickBtns();
   }

   updateInfo() {
      this._levelOutput.textContent = this._animal.lvl;
      this._satietyOutput.textContent = this._animal.satiety;
      this._currencyOutput.textContent = this._animal.currency;
      this._appearanceImage.src = this._animal.fullImagePath;
      this.showName();
   }

   feedAnimal() {
      this._animal.feed();
      this.randomGetFood();
      this.updateInfo();
      this.showCounterElement();
   }

   showInfo() {
      this.clearMessage(this._consoleOutput);
      this.sayMessage("Имя: " + this._animal.name);
      this.sayMessage("Здоровье: " + this._animal.health);
      this.sayMessage("Крыски: " + this._animal.currency);
   }

   showName() {
      this._consoleOutput.textContent = "Ваш питомец: " + this._animal.name;
   }

   randomGetFood() {
      let chance = Math.round(Math.random() * 99 + 1);
      if (chance <= 2) {
         let foundedFood = Math.round(Math.random() * 9 + 1);
         this._animal.currency += foundedFood;
         if (foundedFood === 1) {
            this.showSuccessNotification(`Вы нашли ${foundedFood} Крыску`);
         } else if (foundedFood === 2 || foundedFood === 3 || foundedFood === 4) {
            this.showSuccessNotification(`Вы нашли ${foundedFood} Крыски`);
         } else {
            this.showSuccessNotification(`Вы нашли ${foundedFood} Крысок`);
         }
      }
   }

   // Check methods
   checkCurrency() {
      if (this._animal.currency >= this._animal.foodCost) {
         this._animal.foodUp();
         return this.showSuccessNotification("Еда куплена");
      } else {
         return this.showErrorNotification(
            "Еда стоит: " + this._animal.foodCost + " Крысок"
         );
      }
   }

   сheckSatiety() {
      if (this._animal.satiety >= this._animal.lvlCost) {
         this._animal.lvlUp();
         return this.showSuccessNotification("Уровень повышен");
      } else {
         return this.showErrorNotification(
            "Уровень стоит: " + this._animal.lvlCost + " Сытости"
         );
      }
   }

   // ClickBtns methods
   clickBtns() {
      this.clickClickerBtn();
      this.clickLvlBtn();
      this.clickFoodBtn();
      this.clickInfoBtn();
   }

   clickEventBtn(btn, ...methods) {
      btn.addEventListener("click", (event) => {
         event.preventDefault();
         methods.forEach((element) => {
            element.call(this);
         });
      });
   }

   clickInfoBtn() {
      this.clickEventBtn(this._infoBtn, this.showInfo);
   }

   clickClickerBtn() {
      this.clickEventBtn(this._clickerBtn, this.feedAnimal);
   }

   clickFoodBtn() {
      this.clickEventBtn(this._foodBtn, this.checkCurrency, this.updateInfo);
   }

   clickLvlBtn() {
      this.clickEventBtn(this._lvlBtn, this.сheckSatiety, this.updateInfo);
   }

   clickClickerAuto(obj) {
      setTimeout(function feeding() {
         obj.feedAnimal();
         setTimeout(feeding, 1000);
      }, 1000);
   }

   // Notification methods
   showSuccessNotification(message) {
      let notification = this.createNotification(message);
      notification.classList.add("notification__item--success");
      this.hideNotification(notification);
   }

   showErrorNotification(message) {
      let notification = this.createNotification(message);
      notification.classList.add("notification__item--error");
      this.hideNotification(notification);
   }

   createNotification(message) {
      this.clearMessage(this._notification);
      let newNotification = document.createElement("span");
      newNotification.textContent = message;
      newNotification.classList.add("notification__item");
      newNotification.classList.add("show-notification");
      this._notification.appendChild(newNotification);
      return newNotification;
   }

   hideNotification(notification) {
      setTimeout(() => {
         notification.classList.add("hide-notification");
         notification.classList.remove("show-notification");
         setTimeout(() => {
            notification.remove();
         }, 500);
      }, 3000);
   }

   // Message methods
   sayMessage(message) {
      let consoleDiv = document.createElement("div");
      consoleDiv.textContent = message;
      this._consoleOutput.appendChild(consoleDiv);
   }

   clearMessage(message) {
      message.textContent = "";
   }

   // CounterElement methods
   showCounterElement() {
      this.createCounterElement();
      this.deleteCounterElement();
   }

   createCounterElement() {
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
