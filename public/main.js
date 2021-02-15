import Game from "./Game.js";
import Item from "./objects/Item.js";
import Level from "./objects/Level.js";
import NetworkManager from "./objects/NetworkManager.js";
import Player from "./objects/Player.js";
import Wall from "./objects/Wall.js";
import Vec from "./Vec.js";
import Heart from "./objects/items/Heart.js";
import Map from "./Map.js";


const lvl = new Level({
    gravity: 0.981
});

Map.loadMapFile('../assets/maps/test.svg', lvl);

const game = new Game(lvl);

const player = new Player({
    position: new Vec(300, 200)
});

const item = new Item({
    position: new Vec(400, 300)
});

const item2 = new Heart({
    position: new Vec(400, 300)
});

const networkManager = new NetworkManager(lvl);

networkManager.setPlayer(player);

game.level.add(item2);
game.level.add(item);
game.level.add(networkManager);

game.level.add(player);
game.level.camera.setTarget(player);

game.run();

window.game = game;
