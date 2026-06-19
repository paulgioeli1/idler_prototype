import { Scene, Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE, GRID_COLS, GRID_ROWS } from '../constants';
import { Plant, PlantType, PLANT_CONFIG } from '../objects/Plant';
import { Player } from '../objects/Player';

export class GameScene extends Scene {
    private player!: Player;
    private plants: Plant[] = [];
    private staticGroup!: Phaser.Physics.Arcade.StaticGroup;
    private collected = 0;
    private inventory: Record<PlantType, number> = { blue: 0, yellow: 0, red: 0 };
    private totalPlants = 0;
    private uiText!: Phaser.GameObjects.Text;
    private uiDetail!: Phaser.GameObjects.Text;
    private done = false;

    constructor() {
        super('Game');
    }

    create(): void {
        this.collected = 0;
        this.inventory = { blue: 0, yellow: 0, red: 0 };
        this.done = false;
        this.plants = [];

        this.drawGrid();
        this.createParticleTexture();
        this.staticGroup = this.physics.add.staticGroup();
        this.spawnPlants();
        this.player = new Player(this);
        this.physics.add.collider(this.player.sprite, this.staticGroup);
        this.createUI();
        this.input.on('pointerdown', this.handleClick, this);
    }

    private drawGrid(): void {
        const g = this.add.graphics();
        g.lineStyle(1, 0x222240, 0.8);
        for (let c = 0; c <= GRID_COLS; c++) {
            g.moveTo(c * GRID_SIZE, 0);
            g.lineTo(c * GRID_SIZE, CANVAS_HEIGHT);
        }
        for (let r = 0; r <= GRID_ROWS; r++) {
            g.moveTo(0, r * GRID_SIZE);
            g.lineTo(CANVAS_WIDTH, r * GRID_SIZE);
        }
        g.strokePath();
    }

    private createParticleTexture(): void {
        const g = this.add.graphics();
        g.fillStyle(0xffffff);
        g.fillCircle(4, 4, 4);
        g.generateTexture('particle', 8, 8);
        g.destroy();
    }

    private spawnPlants(): void {
        const count = PhaserMath.Between(5, 10);
        const types: PlantType[] = ['blue', 'yellow', 'red'];

        const spawnCol = Math.floor(CANVAS_WIDTH / 2 / GRID_SIZE);
        const spawnRow = Math.floor(CANVAS_HEIGHT / 2 / GRID_SIZE);

        const cells: [number, number][] = [];
        for (let c = 0; c < GRID_COLS; c++) {
            for (let r = 0; r < GRID_ROWS; r++) {
                if (Math.abs(c - spawnCol) <= 1 && Math.abs(r - spawnRow) <= 1) continue;
                cells.push([c, r]);
            }
        }
        PhaserUtils.Array.Shuffle(cells);

        this.totalPlants = count;
        for (let i = 0; i < count; i++) {
            const [col, row] = cells[i];
            const plant = new Plant(this, col, row, types[i % 3]);
            this.staticGroup.add(plant.zone);
            this.plants.push(plant);
        }
    }

    private createUI(): void {
        this.uiText = this.add.text(8, 8, '', {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: { x: 6, y: 4 },
        }).setDepth(10);

        this.uiDetail = this.add.text(8, 40, '', {
            fontSize: '14px',
            color: '#aaaacc',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: { x: 6, y: 4 },
        }).setDepth(10);

        this.refreshUI();
    }

    private refreshUI(): void {
        this.uiText.setText(`Collected: ${this.collected} / ${this.totalPlants}`);
        this.uiDetail.setText(
            `Blue: ${this.inventory.blue}  Yellow: ${this.inventory.yellow}  Red: ${this.inventory.red}`
        );
    }

    private handleClick(pointer: Phaser.Input.Pointer): void {
        if (this.done) return;

        const clickCol = Math.floor(pointer.x / GRID_SIZE);
        const clickRow = Math.floor(pointer.y / GRID_SIZE);

        const plant = this.plants.find(p => p.gridCol === clickCol && p.gridRow === clickRow);
        if (!plant) return;

        const playerCol = Math.floor(this.player.sprite.x / GRID_SIZE);
        const playerRow = Math.floor(this.player.sprite.y / GRID_SIZE);
        if (Math.abs(playerCol - plant.gridCol) > 1 || Math.abs(playerRow - plant.gridRow) > 1) return;

        const fullyCollected = plant.onClick();
        if (fullyCollected) {
            const { plantType, gridCol, gridRow } = plant;
            this.plants = this.plants.filter(p => p !== plant);
            plant.destroy();
            this.emitParticles(gridCol, gridRow, plantType);
            this.inventory[plantType]++;
            this.collected++;
            this.refreshUI();

            if (this.collected >= this.totalPlants) {
                this.done = true;
                this.time.delayedCall(800, () => {
                    this.scene.start('GameOver', {
                        collected: this.collected,
                        inventory: { ...this.inventory },
                    });
                });
            }
        }
    }

    private emitParticles(gridCol: number, gridRow: number, plantType: PlantType): void {
        const cx = gridCol * GRID_SIZE + GRID_SIZE / 2;
        const cy = gridRow * GRID_SIZE + GRID_SIZE / 2;
        const color = PLANT_CONFIG[plantType].color;

        const emitter = this.add.particles(cx, cy, 'particle', {
            speed: { min: 60, max: 160 },
            lifespan: 600,
            scale: { start: 1.5, end: 0 },
            tint: color,
            emitting: false,
        });
        emitter.explode(12);
        this.time.delayedCall(700, () => emitter.destroy());
    }

    update(): void {
        this.player.update();
    }
}
