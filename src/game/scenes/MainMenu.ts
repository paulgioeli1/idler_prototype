import { Scene } from 'phaser';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create(): void {
        this.add.rectangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT, 0x1a1a2e);

        this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 80, 'PLANT COLLECTOR', {
            fontSize: '48px',
            color: '#c4a85b',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10, 'WASD to move  ·  Left click to collect plants', {
            fontSize: '20px',
            color: '#8888a0',
        }).setOrigin(0.5);

        this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50, 'You must be adjacent to a plant to collect it', {
            fontSize: '16px',
            color: '#666680',
        }).setOrigin(0.5);

        this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 90, 'Blue = 1 click  ·  Yellow = 2 clicks  ·  Red = 3 clicks', {
            fontSize: '15px',
            color: '#666680',
        }).setOrigin(0.5);

        this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 170, '[ CLICK ANYWHERE TO START ]', {
            fontSize: '26px',
            color: '#4a9e5c',
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => this.scene.start('Game'));
        this.input.keyboard!.once('keydown-SPACE', () => this.scene.start('Game'));
    }
}
