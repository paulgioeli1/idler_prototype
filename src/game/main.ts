import { AUTO, Game } from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { GameScene } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
    scene: [MainMenu, GameScene, Boot, Preloader, GameOver],
};

const StartGame = (parent: string) => new Game({ ...config, parent });

export default StartGame;
