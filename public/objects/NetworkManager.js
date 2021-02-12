import GameObject from "../GameObject.js";
import Client from "../net/Client.js";
import HostClient from '../net/HostClient.js';
import Packet from '../net/Packet.js';
import PacketTypes from '../net/PacketTypes.js';
import NetworkPlayer from "./NetworkPlayer.js";

const client = new Client();
window.client = client;

export default class NetworkManager extends GameObject {

    constructor(lvl) {
        super();

        this.level = lvl;
    }

    setPlayer(player) {
        this.player = player;
        this.hostClient = new HostClient(client);

        this.players = new Map();

        this.players.set(client.id, this.player);

        // sets up client to recieve updates from the host
        client.on('connected', conn => {
            console.log('Connected to host.');
        });
        client.on('disconnected', () => {
            console.log('Disconnected from host.');
        });
        client.on('host.state', msg => {
            this.updateScene(msg);
        });
        
        this.initConnectionsManager();
    }

    updateScene(data) {
        for(let ent of data.enteties) {
            if(!this.players.has(ent.id)) {
                this.spawnPlayer('DummyUsername', ent.id);
            }

            const player = this.players.get(ent.id);

            player.position.x = ent.position[0];
            player.position.y = ent.position[1];
            player.position.z = ent.position[2];
            
            player.velocity.x = ent.velocity[0];
            player.velocity.y = ent.velocity[1];
            player.velocity.z = ent.velocity[2];
        }
    }

    spawnPlayer(username, id) {
        const player = new NetworkPlayer(username);

        this.players.set(id, player);

        this.level.add(player);
    }

    initConnectionsManager() {
        this.hostClient.on('player.joined', ({ data, connection }) => {
            this.spawnPlayer(data.username, connection.peer);
        });
        this.hostClient.on('player.update', ({ data, connection }) => {
            const player = this.players.get(connection.peer);
            // TODO:
            player.force[0] = data.input[2];
        });
    }

    update(ms) {
        // client update to host
        // TODO: get lokal player from level
        const player = this.player;

        if(player) {
            const playerInput = player.force;
            const playerRotation = player.direction;
    
            if(client.connected) {
                client.sendInput({
                    input: [
                        0,
                        0,
                        playerInput[0],
                        playerInput[0] * -1,
                    ],
                    rotation: playerRotation.x,
                });
            }
        }

        const packet = new Packet(PacketTypes.SceneState);
        const enteties = [];

        for(let [id, player] of this.players) {
            if(player) {
                enteties.push({
                    id: id,
                    position: [
                        player.position.x,
                        player.position.y,
                        player.position.z,
                    ],
                    velocity: [
                        player.velocity[0],
                        player.velocity[1],
                        player.velocity[2],
                    ],
                    rotation: [0, 0, 0],
                })
            }
        }

        packet.write({ enteties }, 256);

        // host update to clients
        for(let p of this.players) {
            const player = p[1];
            const conn = player.connection;
            this.hostClient.sendPacket(packet);
        }
    }

}
