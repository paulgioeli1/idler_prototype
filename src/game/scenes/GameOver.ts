import { Scene } from 'phaser';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';
import { PlantType } from '../objects/Plant';

type Inventory = Record<PlantType, number>;

export class GameOver extends Scene {
    private totalCollected: number;
    private inventory: Inventory;

    constructor() {
        super('GameOver');
        this.totalCollected = 0;
        this.inventory = { blue: 0, yellow: 0, red: 0 };
    }

    init(data: object): void {
        const d = data as { collected: number; inventory: Inventory };
        this.totalCollected = d.collected ?? 0;
        this.inventory = d.inventory ?? { blue: 0, yellow: 0, red: 0 };
    }

    create(): void {
        this.add.rectangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT, 0x1a1a2e);

        this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 110, 'ALL PLANTS COLLECTED!', {
            fontSize: '44px',
            color: '#c4a85b',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30, `Total: ${this.totalCollected}`, {
            fontSize: '28px',
            color: '#c0c0d0',
        }).setOrigin(0.5);

        this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30,
            `Blue: ${this.inventory.blue}     Yellow: ${this.inventory.yellow}     Red: ${this.inventory.red}`, {
            fontSize: '22px',
            color: '#8888a0',
        }).setOrigin(0.5);

        const playAgain = this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 140, '[ PLAY AGAIN ]', {
            fontSize: '28px',
            color: '#4a9e5c',
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        playAgain.on('pointerover', () => playAgain.setColor('#6abe8c'));
        playAgain.on('pointerout',  () => playAgain.setColor('#4a9e5c'));
        playAgain.on('pointerdown', () => this.scene.start('Game'));

        this.input.keyboard!.once('keydown-SPACE', () => this.scene.start('Game'));
    }
}
