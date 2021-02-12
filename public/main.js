import Game from "./Game.js";
import Item from "./objects/Item.js";
import Level from "./objects/Level.js";
import NetworkManager from "./objects/NetworkManager.js";
import Player from "./objects/Player.js";
import Wall from "./objects/Wall.js";
import Vec from "./Vec.js";

const lvl = new Level({
    gravity: 0.981
});
const game = new Game(lvl);

const player = new Player({
    position: new Vec(300, 200)
});

const item = new Item({
    position: new Vec(400, 300)
});

const networkManager = new NetworkManager(lvl);

networkManager.setPlayer(player);

game.level.add(item);
game.level.add(networkManager);

function createWall(x = 0, y = 0, w = 500) {
    const wall = new Wall([
        new Vec(0, 0),
        new Vec(w, 0),
        new Vec(w, 40),
        new Vec(0, 40),
    ]);
    wall.position.x = x;
    wall.position.y = y;
    game.level.add(wall);
    return wall;
}

createWall(0, 100, 500);
createWall(500, 250, 500);
createWall(1000, 0, 500);
createWall(-500, -100, 500 * 3);

game.level.add(player);
game.level.camera.setTarget(player);

game.run();

window.game = game;
