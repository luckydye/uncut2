import Game from "./Game.js";
import Player from "./objects/Player.js";
import Wall from "./objects/Wall.js";
import Vec from "./Vec.js";

const game = new Game();
game.run();

game.level.add(new Player({
    position: new Vec(50, 300)
}));
const wall = new Wall([
    new Vec(0, 0),
    new Vec(500, 0),
    new Vec(500, 40),
    new Vec(0, 40),
]);
wall.position.x = 100;
wall.position.y = 50;
game.level.add(wall);

window.game = game;
