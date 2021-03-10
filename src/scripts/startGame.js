"use strict";

import Snake from "./animalClass.js";
import Game from "./gameClass.js";

function startGame(name, appearance) {
   let animal = new Snake(name, appearance);
   let game = new Game(animal);
   game.startGame();
}

startGame("Аня", "snake1.jpg");
