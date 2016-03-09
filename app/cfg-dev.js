// Duration in seconds
const TIME_PER_BALL = 4.5;
const BULBS_ANIMATION_TIME = 2;
const BALL_ANIMATION_TIME = 2.4;
const BALL_ANIMATION_PAUSE = TIME_PER_BALL - BULBS_ANIMATION_TIME - BALL_ANIMATION_TIME;
const TOTAL_DRAWN_BALLS = 35;
const TOTAL_TIME = 300;
const COUNT_DOWN_TIME = 120;
const DELAY_BEFORE_DRAW = 5;
const TOTAL_DRAWING_TIME = 180;
const DRAW_ANIMATION_TIME = TOTAL_DRAWN_BALLS * TIME_PER_BALL;
const DISPLAYED_RESULTS_TIME = TOTAL_DRAWING_TIME - DRAW_ANIMATION_TIME - DELAY_BEFORE_DRAW;

// Application configuration for development environment
window.prCfg = {
    // Environment discriminator
    env: 'dev',

    // Base URL to the backend REST API
    apiBaseUrl: 'http://localhost',

    // Drawing parameters
    timePerBall: TIME_PER_BALL,
    totalDrawnBalls: TOTAL_DRAWN_BALLS,
    totalDrawingTime: TOTAL_DRAWING_TIME,
    totalTime: TOTAL_TIME,
    countDownTime: COUNT_DOWN_TIME,
    drawAnimationTime: DRAW_ANIMATION_TIME,
    displayedResultsTime: DISPLAYED_RESULTS_TIME,
    delayBeforeDraw: DELAY_BEFORE_DRAW,
    bulbsAnimationTime: BULBS_ANIMATION_TIME,
    ballAnimationTime: BALL_ANIMATION_TIME,
    ballAnimationPause: BALL_ANIMATION_PAUSE,
    colors: {
        '1': 'yellow', '2': 'orange', '3': 'red', '4': 'pink', '5': 'purple', '6': 'blue', '7': 'light-blue', '8': 'green',
        '9': 'yellow', '10': 'orange', '11': 'red', '12': 'pink', '13': 'purple', '14': 'blue', '15': 'light-blue', '16': 'green',
        '17': 'yellow', '18': 'orange', '19': 'red', '20': 'pink', '21': 'purple', '22': 'blue', '23': 'light-blue', '24': 'green',
        '25': 'yellow', '26': 'orange', '27': 'red', '28': 'pink', '29': 'purple', '30': 'blue', '31': 'light-blue', '32': 'green',
        '33': 'yellow', '34': 'orange', '35': 'red', '36': 'pink', '37': 'purple', '38': 'blue', '39': 'light-blue', '40': 'green',
        '41': 'yellow', '42': 'orange', '43': 'red', '44': 'pink', '45': 'purple', '46': 'blue', '47': 'light-blue', '48': 'green'
    },
    numOfBallsPerColor: {
        'yellow': 0,
        'orange': 0,
        'red': 0,
        'pink': 0,
        'purple': 0,
        'blue': 0,
        'light-blue': 0,
        'green': 0
    },
    jackpotCodeCharacters: ['W','E','R','T','Y','U','O','P','A','S','D','F','G','H','J','K','Z','X','C','V','B','N','M','2','3','4','5','6','7','8','9']
};
