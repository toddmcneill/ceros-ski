import "babel-polyfill";
import * as Constants from "../Constants";
import { Skier } from "./Skier"

describe('setDirection', () => {
  it('can not turn past left', () => {
    const skier = new Skier(0,0)
    const pastLeft = Constants.SKIER_DIRECTIONS.LEFT - 1
    skier.setDirection(pastLeft)
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT)
  });

  it('can not turn past right', () => {
    const skier = new Skier(0,0)
    const pastRight = Constants.SKIER_DIRECTIONS.RIGHT + 1
    skier.setDirection(pastRight)
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT)
  })
});
