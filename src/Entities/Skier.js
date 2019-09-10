import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects } from "../Core/Utils";
import {SKIER_MODES} from "../Constants";

export class Skier extends Entity {
    assetName = Constants.SKIER_LEFT;

    direction = Constants.SKIER_DIRECTIONS.LEFT;
    speed = Constants.SKIER_STARTING_SPEED;

    mode = Constants.SKIER_MODES.SKI;
    animationDuration = 0;

    constructor(x, y) {
        super(x, y);
    }

    setMode(mode) {
        if (this.mode === Constants.SKIER_MODES.EATEN) {
            return;
        }

        this.mode = mode;
        this.animationDuration = 0;
        this.updateAsset();
    }

    setDirection(direction) {
        if (direction < Constants.SKIER_DIRECTIONS.LEFT) {
            direction = Constants.SKIER_DIRECTIONS.LEFT
        }
        if (direction > Constants.SKIER_DIRECTIONS.RIGHT) {
            direction = Constants.SKIER_DIRECTIONS.RIGHT
        }
        this.direction = direction;

        // Allow deliberate movement while crashed.
        if (this.mode === Constants.SKIER_MODES.CRASH) {
        this.setMode(Constants.SKIER_MODES.SKI);
        }

        this.updateAsset();
    }

    getJumpStep() {
        return Math.floor(this.animationDuration / Constants.SKIER_JUMP_TIME);
    }

    updateAsset() {
        this.animationDuration++;
        switch (this.mode) {
            case Constants.SKIER_MODES.SKI:
                this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
                break;

            case Constants.SKIER_MODES.CRASH:
                this.assetName = Constants.SKIER_CRASH;
                break;

            case Constants.SKIER_MODES.JUMP:
                this.assetName = Constants.SKIER_JUMP_ASSETS[this.getJumpStep()];
                if (this.getJumpStep() >= Constants.SKIER_JUMP_ASSETS.length) {
                    this.setMode(Constants.SKIER_MODES.SKI);
                }
                break;
        }
    }

    move() {
        // Don't move from skiing while crashed.
        if (this.mode === Constants.SKIER_MODES.CRASH) {
            return;
        }

        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    getStraightSpeed() {
        if (this.mode === Constants.SKIER_MODES.JUMP) {
            return this.speed * Constants.SKIER_JUMPING_SPEED_MULTIPLIER
        }
        return this.speed
    }

    getDiagonalSpeed() {
        return this.getStraightSpeed() / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkier(x, y) {
        // Don't move while eaten.
        if (this.mode === Constants.SKIER_MODES.EATEN) {
            return;
        }

        this.x += x;
        this.y += y;
    }

    moveSkierLeft() {
        this.moveSkier(-Constants.SKIER_STARTING_SPEED, 0);
    }

    moveSkierLeftDown() {
        this.moveSkier(-this.getDiagonalSpeed(), this.getDiagonalSpeed());
    }

    moveSkierDown() {
        this.moveSkier(0, this.getStraightSpeed());
    }

    moveSkierRightDown() {
        this.moveSkier(this.getDiagonalSpeed(), this.getDiagonalSpeed());
    }

    moveSkierRight() {
        this.moveSkier(Constants.SKIER_STARTING_SPEED, 0);
    }

    moveSkierUp() {
        this.moveSkier(0, -Constants.SKIER_STARTING_SPEED);
    }

    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const skierBounds = this.getBounds(assetManager);
        const collisionObject = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleBounds = obstacle.getBounds(assetManager);
            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if (collisionObject) {
            switch (collisionObject.getAssetName()) {
                case Constants.TREE:
                case Constants.TREE_CLUSTER:
                    // Trees can not be jumped over.
                    this.setMode(Constants.SKIER_MODES.CRASH);
                    break;

                case Constants.ROCK1:
                case Constants.ROCK2:
                    // Rocks can be jumped over.
                    if (this.mode !== Constants.SKIER_MODES.JUMP) {
                        this.setMode(Constants.SKIER_MODES.CRASH);
                    }
                    break;

                case Constants.JUMP_RAMP:
                    if (this.mode !== Constants.SKIER_MODES.JUMP) {
                        this.setMode(Constants.SKIER_MODES.JUMP);
                    }
            }
        }
        else if (this.mode !== Constants.SKIER_MODES.JUMP) {
            // Get back up when moving away from a crash.
            this.setMode(Constants.SKIER_MODES.SKI);
        }

        this.updateAsset();
    };
}