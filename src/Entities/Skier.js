import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

    isCrashed = false;
    isJumping = false;
    jumpDuration = 0;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        if (direction < Constants.SKIER_DIRECTIONS.LEFT) {
            direction = Constants.SKIER_DIRECTIONS.LEFT
        }
        if (direction > Constants.SKIER_DIRECTIONS.RIGHT) {
            direction = Constants.SKIER_DIRECTIONS.RIGHT
        }
        this.direction = direction;
        this.setCrashed(false);
        this.updateAsset();
    }

    setCrashed(isCrashed) {
        this.isCrashed = isCrashed;
    }

    startJump() {
        this.isJumping = true;
        this.jumpDuration = 0
    }

    stopJump() {
        this.isJumping = false;
    }

    getJumpStep() {
        return Math.floor(this.jumpDuration / Constants.SKIER_JUMP_TIME);
    }

    updateAsset() {
        if (this.isJumping) {
            this.assetName = Constants.SKIER_JUMP_ASSETS[this.getJumpStep()];
        } else if (this.isCrashed) {
            this.assetName = Constants.SKIER_CRASH;
        } else {
            this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
        }
    }

    move() {
        if (this.isCrashed) {
            return
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

        // Advance the jumping animation and check if the jump is complete.
        if (this.isJumping) {
            this.jumpDuration++;
            if (this.getJumpStep() >= Constants.SKIER_JUMP_ASSETS.length) {
                this.isJumping = false;
                this.jumpDuration = 0;
            }
            this.updateAsset();
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
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
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collisionObject = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if (collisionObject) {
            switch (collisionObject.getAssetName()) {
                case 'tree':
                case 'treeCluster':
                    // Trees can not be jumped over.
                    this.setCrashed(true);
                    this.stopJump();
                    break;

                case 'rock1':
                case 'rock2':
                    // Rocks can be jumped over.
                    if (!this.isJumping) {
                        this.setCrashed(true);
                    }
                    break;

                case 'jumpRamp':
                    if (!this.isJumping) {
                        this.startJump();
                    }
            }
        } else {
            this.setCrashed(false);
        }

        this.updateAsset();
    };
}