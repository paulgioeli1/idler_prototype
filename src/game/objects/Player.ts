import { Input } from 'phaser';
import { CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_SIZE, PLAYER_SPEED } from '../constants';

export class Player {
    readonly sprite: Phaser.GameObjects.Rectangle;

    private readonly wasd: {
        up: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
    };

    constructor(scene: Phaser.Scene) {
        this.sprite = scene.add.rectangle(
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2,
            PLAYER_SIZE,
            PLAYER_SIZE,
            0x4a9e5c
        );

        scene.physics.add.existing(this.sprite);
        (this.sprite.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

        const kbd = scene.input.keyboard!;
        this.wasd = {
            up:    kbd.addKey(Input.Keyboard.KeyCodes.W),
            down:  kbd.addKey(Input.Keyboard.KeyCodes.S),
            left:  kbd.addKey(Input.Keyboard.KeyCodes.A),
            right: kbd.addKey(Input.Keyboard.KeyCodes.D),
        };
    }

    update(): void {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;

        let vx = 0;
        let vy = 0;

        if (this.wasd.left.isDown)  vx -= PLAYER_SPEED;
        if (this.wasd.right.isDown) vx += PLAYER_SPEED;
        if (this.wasd.up.isDown)    vy -= PLAYER_SPEED;
        if (this.wasd.down.isDown)  vy += PLAYER_SPEED;

        // Normalize diagonal so speed stays consistent
        if (vx !== 0 && vy !== 0) {
            vx *= Math.SQRT1_2;
            vy *= Math.SQRT1_2;
        }

        body.setVelocity(vx, vy);
    }
}
