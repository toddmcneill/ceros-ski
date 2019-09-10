import "babel-polyfill";
import * as Constants from "../Constants";
import { Skier } from "./Skier"

describe('setDirection', () => {
  it('can not turn past left', () => {
    const skier = new Skier(0,0);
    const pastLeft = Constants.SKIER_DIRECTIONS.LEFT - 1;
    skier.setDirection(pastLeft);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
  });

  it('can not turn past right', () => {
    const skier = new Skier(0,0);
    const pastRight = Constants.SKIER_DIRECTIONS.RIGHT + 1;
    skier.setDirection(pastRight);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
  });
});


describe('checkIfSkierHitObstacle', () => {
  let obstacleManager, assetManager;
  beforeEach(() => {
    obstacleManager = {
      getObstacles: jest.fn().mockReturnValue([
        getCollidingObject()
      ])
    };
    assetManager = {
      getAsset: jest.fn().mockReturnValue({ width: 10, height: 10 })
    };
  });

  function getCollidingObject(collisionObjectAssetName) {
    return {
      getPosition: jest.fn().mockReturnValue({ x: 0, y: 0 }),
      width: 10,
      height: 10,
      getAssetName: jest.fn().mockReturnValue(collisionObjectAssetName)
    }
  }

  it('crashes on a collision with a tree', () => {
    const skier = new Skier(0, 0);
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('tree') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.isCrashed).toBe(true);
  });

  it('crashes on a collision with a tree while jumping', () => {
    const skier = new Skier(0, 0);
    skier.startJump();
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('tree') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.isCrashed).toBe(true);
  });

  it('crashes on a collision with a rock', () => {
    const skier = new Skier(0, 0);
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('rock1') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.isCrashed).toBe(true);
  });

  it('does not crash on a collision with a rock while jumping', () => {
    const skier = new Skier(0, 0);
    skier.startJump();
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('rock1') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.isCrashed).not.toBe(true);
  });

  it('starts a jump on a collision with a jump ramp', () => {
    const skier = new Skier(0, 0);
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('jumpRamp') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.isJumping).toBe(true);
  });

  it('does not start a jump on a collision with a jump ramp while jumping', () => {
    const skier = new Skier(0, 0);
    skier.startJump();
    jest.spyOn(skier, 'startJump');
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('jumpRamp') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.startJump).not.toBeCalled();
  });
});