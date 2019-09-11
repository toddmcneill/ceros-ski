export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP_1 = 'skierJump1';
export const SKIER_JUMP_2 = 'skierJump2';
export const SKIER_JUMP_3 = 'skierJump3';
export const SKIER_JUMP_4 = 'skierJump4';
export const SKIER_JUMP_5 = 'skierJump5';
export const JUMP_RAMP = 'jumpRamp';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RHINO_DEFAULT = 'rhinoDefault';
export const RHINO_RUN_LEFT = 'rhinoRunLeft';
export const RHINO_RUN_LEFT_2 = 'rhinoRunLeft2';
export const RHINO_LIFT = 'rhinoLift';
export const RHINO_LIFT_MOUTH_OPEN = 'rhinoLiftMouthOpen';
export const RHINO_LIFT_EAT_1 = 'rhinoLiftEat1';
export const RHINO_LIFT_EAT_2 = 'rhinoLiftEat2';
export const RHINO_LIFT_EAT_3 = 'rhinoLiftEat3';
export const RHINO_LIFT_EAT_4 = 'rhinoLiftEat4';

export const SKIER_STARTING_SPEED = 5;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_JUMPING_SPEED_MULTIPLIER = 1.5;

export const RHINO_STARTING_SPEED = 1;
export const RHINO_SPEED_INCREASE_RATE = 1.0005;
export const RHINO_MAX_SPEED = 6;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP_1]: 'img/skier_jump_1.png',
    [SKIER_JUMP_2]: 'img/skier_jump_2.png',
    [SKIER_JUMP_3]: 'img/skier_jump_3.png',
    [SKIER_JUMP_4]: 'img/skier_jump_4.png',
    [SKIER_JUMP_5]: 'img/skier_jump_5.png',
    [JUMP_RAMP]: 'img/jump_ramp.png',
    [TREE] : 'img/tree_1.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [RHINO_DEFAULT] : 'img/rhino_default.png',
    [RHINO_RUN_LEFT] : 'img/rhino_run_left.png',
    [RHINO_RUN_LEFT_2] : 'img/rhino_run_left_2.png',
    [RHINO_LIFT] : 'img/rhino_lift.png',
    [RHINO_LIFT_MOUTH_OPEN] : 'img/rhino_lift_mouth_open.png',
    [RHINO_LIFT_EAT_1] : 'img/rhino_lift_eat_1.png',
    [RHINO_LIFT_EAT_2] : 'img/rhino_lift_eat_2.png',
    [RHINO_LIFT_EAT_3] : 'img/rhino_lift_eat_3.png',
    [RHINO_LIFT_EAT_4] : 'img/rhino_lift_eat_4.png',
};

export const SKIER_DIRECTIONS = {
    LEFT : 0,
    LEFT_DOWN : 1,
    DOWN : 2,
    RIGHT_DOWN : 3,
    RIGHT : 4
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const SKIER_MODES = {
    SKI: 'skiing',
    CRASH: 'crashed',
    JUMP: 'jumping',
    EATEN: 'eaten',
};

export const SKIER_JUMP_TIME = 20;
export const SKIER_JUMP_ASSETS = [
    SKIER_JUMP_1,
    SKIER_JUMP_2,
    SKIER_JUMP_3,
    SKIER_JUMP_4,
    SKIER_JUMP_5,
];

export const RHINO_MODES = {
    CHASE: 'chasing',
    EAT: 'eating',
    CELEBRATE: 'celebrating',
};

export const RHINO_CHASE_TIME = 10;
export const RHINO_CHASE_ASSETS = [
    RHINO_RUN_LEFT,
    RHINO_RUN_LEFT_2
];

export const RHINO_EAT_TIME = 50;
export const RHINO_EAT_ASSETS = [
    RHINO_LIFT,
    RHINO_LIFT_MOUTH_OPEN,
    RHINO_LIFT_EAT_1,
    RHINO_LIFT_EAT_2,
    RHINO_DEFAULT,
];

export const RHINO_CELEBRATE_TIME = 30;
export const RHINO_CELEBRATE_ASSETS = [
    RHINO_LIFT_EAT_3,
    RHINO_LIFT_EAT_4
];

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40
};
