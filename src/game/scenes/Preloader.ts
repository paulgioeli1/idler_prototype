import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    create(): void {
        // No file assets to load — go straight to main menu
        this.scene.start('MainMenu');
    }
}
