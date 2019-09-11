import { Rect } from "../Core/Utils";

export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    isHidden = false;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    getBounds(assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        return new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y
        );
    }

    draw(canvas, assetManager) {
        if (this.isHidden) {
            return;
        }

        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }

    hide() {
        this.isHidden = true;
    }
}
