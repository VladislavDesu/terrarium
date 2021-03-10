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

   feed() {
      this._satiety += this.food;
      return this._satiety;
   }

   foodUp() {
      this._food += 1;
      this._currency -= this.foodCost;
      return this._food;
   }

   lvlUp() {
      this._lvl += 1;
      this._satiety -= this.lvlCost;
      this._lvlCost *= 2;
      this._food += 1;
      this._currency += 25;
      return this._lvl;
   }
}

export default class Snake extends Animal {
   constructor(name, appearance) {
      super(name, appearance);
   }
}
