import Game from "./Game.js";
import Player from "./objects/Player.js";
import Wall from "./objects/Wall.js";
import Vec from "./Vec.js";

const game = new Game();
game.run();

const player = new Player({
    position: new Vec(300, 200)
});
game.level.add(player);

function createWall(x = 0, y = 0) {
    const wall = new Wall([
        new Vec(0, 0),
        new Vec(500, 0),
        new Vec(500, 40),
        new Vec(0, 40),
    ]);
    wall.position.x = x;
    wall.position.y = y;
    game.level.add(wall);
    return wall;
}

createWall(0, 100);
createWall(500, 250);
createWall(1000, 0);

createWall(-500, -100);
createWall(0, -100);
createWall(500, -100);
createWall(1000, -100);
createWall(1500, -100);

game.level.camera.setTarget(player);

window.game = game;
