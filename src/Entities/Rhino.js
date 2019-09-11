import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Rhino extends Entity {
    assetName = Constants.RHINO_DEFAULT;

    speed = Constants.RHINO_STARTING_SPEED;

    mode = Constants.RHINO_MODES.CHASE;
    animationDuration = 0;

    constructor(x, y) {
        super(x, y);
    }

    setMode(mode) {
        this.mode = mode;
        this.animationDuration = 0;
        this.updateAsset();
    }

    getChaseStep() {
        return Math.floor(this.animationDuration / Constants.RHINO_CHASE_TIME);
    }

    getEatStep() {
        return Math.floor(this.animationDuration / Constants.RHINO_EAT_TIME);
    }

    getCelebrateStep() {
        return Math.floor(this.animationDuration / Constants.RHINO_CELEBRATE_TIME);
    }

    updateAsset() {
        this.animationDuration++;
        switch (this.mode) {
          case Constants.RHINO_MODES.CHASE:
              // Toggle chasing animation frames.
              if (this.getChaseStep() >= Constants.RHINO_CHASE_ASSETS.length) {
                  this.animationDuration = 0;
              }
              this.assetName = Constants.RHINO_CHASE_ASSETS[this.getChaseStep()];
              break;

          case Constants.RHINO_MODES.EAT:
              // Play through each of the eating animation frames.
              if (this.getEatStep() >= Constants.RHINO_EAT_ASSETS.length) {
                  // Celebrate after eating.
                  this.setMode(Constants.RHINO_MODES.CELEBRATE);
              }
              this.assetName = Constants.RHINO_EAT_ASSETS[this.getEatStep()];
              break;

          case Constants.RHINO_MODES.CELEBRATE:
              // Toggle celebrating animation frames.
              if (this.getCelebrateStep() >= Constants.RHINO_CELEBRATE_ASSETS.length) {
                 this.animationDuration = 0;
              }
              this.assetName = Constants.RHINO_CELEBRATE_ASSETS[this.getCelebrateStep()];
              break;
        }
    }

    move(skierPosition) {
        if (this.mode === Constants.RHINO_MODES.CHASE) {
            this.speed = Math.min(this.speed * Constants.RHINO_SPEED_INCREASE_RATE, Constants.RHINO_MAX_SPEED);
            this.moveTowardSkier(skierPosition);
        }
        this.updateAsset();
    }

    moveTowardSkier(skierPosition) {
        // Move toward the skier's position.
        const { x: rhinoX, y: rhinoY } = this.getPosition();
        const { x: skierX, y: skierY } = skierPosition;

        const xDistance = skierX - rhinoX;
        const yDistance = skierY - rhinoY;
        const directDistance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));

        if (directDistance === 0) {
           return
        }

        this.y += Math.round(this.speed * yDistance / directDistance);
        this.x += Math.round(this.speed * xDistance / directDistance);
    }

    checkIfRhinoCaughtSkier(skier, assetManager) {
        if (this.mode === Constants.RHINO_MODES.CHASE && intersectTwoRects(this.getBounds(assetManager), skier.getBounds(assetManager))) {
            this.setMode(Constants.RHINO_MODES.EAT);
            skier.hide();
            skier.setMode(Constants.SKIER_MODES.EATEN);
        }
    }
}
