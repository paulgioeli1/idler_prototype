import { GRID_SIZE } from '../constants';

export type PlantType = 'blue' | 'yellow' | 'red';

export const PLANT_CONFIG: Record<PlantType, { maxClicks: number; color: number }> = {
    blue:   { maxClicks: 1, color: 0x5b9fc4 },
    yellow: { maxClicks: 2, color: 0xc4a85b },
    red:    { maxClicks: 3, color: 0xc46b6b },
};

export class Plant {
    readonly plantType: PlantType;
    readonly gridCol: number;
    readonly gridRow: number;
    readonly maxClicks: number;
    readonly zone: Phaser.GameObjects.Zone;

    private readonly graphics: Phaser.GameObjects.Graphics;
    private clicksLeft: number;

    constructor(scene: Phaser.Scene, gridCol: number, gridRow: number, plantType: PlantType) {
        this.plantType = plantType;
        this.gridCol = gridCol;
        this.gridRow = gridRow;

        const cfg = PLANT_CONFIG[plantType];
        this.maxClicks = cfg.maxClicks;
        this.clicksLeft = cfg.maxClicks;

        const cx = gridCol * GRID_SIZE + GRID_SIZE / 2;
        const cy = gridRow * GRID_SIZE + GRID_SIZE / 2;

        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(cfg.color);
        // Upward-pointing triangle centered in the cell
        this.graphics.fillTriangle(
            cx,      cy - 20,   // apex
            cx - 20, cy + 16,   // bottom-left
            cx + 20, cy + 16    // bottom-right
        );

        this.zone = scene.add.zone(cx, cy, GRID_SIZE, GRID_SIZE);
    }

    // Returns true when the plant has been fully collected
    onClick(): boolean {
        this.clicksLeft--;
        if (this.clicksLeft <= 0) {
            return true;
        }
        this.graphics.setAlpha(this.clicksLeft / this.maxClicks);
        return false;
    }

    destroy(): void {
        this.graphics.destroy();
        this.zone.destroy();
    }
}
