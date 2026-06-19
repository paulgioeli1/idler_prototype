import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
        console.log('[Boot] constructed');
    }

    create(): void {
        console.log('[Boot] create() called');
        // TODO: restore full flow: Boot → Preloader → MainMenu → Game
        // Defer one frame — Phaser 4 requires the scene lifecycle to fully settle
        // before a transition can be triggered from within create()
        this.time.delayedCall(0, () => {
            console.log('[Boot] firing scene.start(Game)');
            this.scene.start('Game');
        });
    }
}
