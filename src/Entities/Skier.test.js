import "babel-polyfill";
import * as Constants from "../Constants";
import { Skier } from "./Skier"
import { Rect } from "../Core/Utils";

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
      getObstacles: jest.fn().mockReturnValue([])
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
      getAssetName: jest.fn().mockReturnValue(collisionObjectAssetName),
      getBounds: jest.fn().mockReturnValue(new Rect(-5, -5, 5, 5))
    }
  }

  it('crashes on a collision with a tree', () => {
    const skier = new Skier(0, 0);
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('tree') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.mode).toBe(Constants.SKIER_MODES.CRASH);
  });

  it('crashes on a collision with a tree while jumping', () => {
    const skier = new Skier(0, 0);
    skier.setMode(Constants.SKIER_MODES.JUMP);
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('tree') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.mode).toBe(Constants.SKIER_MODES.CRASH);
  });

  it('crashes on a collision with a rock', () => {
    const skier = new Skier(0, 0);
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('rock1') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.mode).toBe(Constants.SKIER_MODES.CRASH);
  });

  it('does not crash on a collision with a rock while jumping', () => {
    const skier = new Skier(0, 0);
    skier.setMode(Constants.SKIER_MODES.JUMP);
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('rock1') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.mode).not.toBe(Constants.SKIER_MODES.CRASH);
  });

  it('starts a jump on a collision with a jump ramp', () => {
    const skier = new Skier(0, 0);
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('jumpRamp') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.mode).toBe(Constants.SKIER_MODES.JUMP);
  });

  it('does not start a jump on a collision with a jump ramp while jumping', () => {
    const skier = new Skier(0, 0);
    skier.setMode(Constants.SKIER_MODES.JUMP);
    jest.spyOn(skier, 'setMode');
    obstacleManager.getObstacles.mockReturnValue([ getCollidingObject('jumpRamp') ]);
    skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
    expect(skier.setMode).not.toBeCalledWith(Constants.SKIER_MODES.JUMP);
  });
});