const levelCounterTag = document.querySelector('#level-counter');
const highestLevelTag = document.querySelector('#highest-level');
const livesTag = document.querySelector('#lives');
const impossibleMode = document.querySelector('#hard-mode')

/**
 * These numbers are for moving the player equally across the board
 * Note: enemy is "y" is 60 to be center and "x" 
*/
const moveLeft = -100;
const moveRight = 100;
const moveUp = -80;
const moveDown = 80;

const startingXAxis = 200; // Player's Starting Spot on the "X" Axis
const startingYAxis = 380; // Player's Starting Spot on the "Y" Axis

const charHeight = 80; // Height value resembles the amount of the vertical movement of the player(see above)
const charWidth = 80; // I Decided to make the "hit box" to be a square instead of a rectangle
const offsetX = 12; // To move the x value/origin point to be more to the right of the cell

const finishZone = -20; // The top cell row is the finish

// For future self to integrate a option to choose player name, and all char sprites
let userName = "Player 1";
let playerType = "char-boy";
let enemyType = "enemy-bug";

let levelCounter = 0;
let highestLevel = 0;
let hardLevelCounter = 1;

let showHitBox = false;

/**
 * Taken from "https://www.w3schools.com/js/js_random.asp"
 * Return random number according to the given "min", "max" 
 * NOTE: note below will create a desc when hovering over the param in the actual function
 * @param {Number} min prevents any numbers below this to be returned
 * @param {Number} max prevents any numbers above this to be returned
*/
const randNumbBet = (min, max) => (Math.floor(Math.random() * (max - min)) + min);

// Simple position reset function for the player object
const resetPlayerPosition = (playerObj) => {
  playerObj.x = startingXAxis;
  playerObj.y = startingYAxis;
  console.log(playerObj.name, "Position Reset!");
  
}

/**
 * Gets invoked when the game "updates"
 * Goes through each enemy in the given arr (that contains all enemy Objects) 
 * and checks if the player's/enemy's "hit box" collide
 * The "hitBox" is made through the "charWidth"/"charHeight" and the object's coordinates
 * The "offsetX" is to change the hit box to fit the object's sprite better
 * 
 * ________
 * 
 * "x" resembles the origin point (the thing you actually move) 
 * and the "x" will be at the bottom corner of the cell that it is in. 
 * The hit box is a 80x80 square that will start where the "x" is on the canvas. 
 * The hit box will go from the origin point then 80 (or "charWidth") to the right. 
 * Then same with the vertical but using the charHeight which has the same value as "charWidth". 
 * Only two hit boxes will be checked at a time, 
 * so to check all enemies' and player's hit boxes I decided to use a for loop.
 * 
 * ________
 * 
 * @function checkCollisions Check for collisions between player/enemy objects
 * @param {player} playerObj Is the player object that will be checked
 * @param {allEnemies} enemyArr Is an array containing all enemy objects
*/
const checkCollisions = (playerObj, enemyArr) => {
  livesTag.textContent = `Lives: ${playerObj.lives}`;

  for (const enemyObj of enemyArr) {
    /**
     * If true then there isn't any space between the player/enemyObj "hit-box" meaning a collision occurred
     * Using the offsetX to put the position of the origin 
     * (or the "point" of each char) of the chars slightly to the right, 
     * in other words it places the origin to be slightly more center. 
     * Therefore, the hit box will be more center in the cell that it is in.
    */
    
    if ((
      (playerObj.x + offsetX) < (enemyObj.x + offsetX) + enemyObj.width &&
      (playerObj.x + offsetX) + playerObj.width > (enemyObj.x + offsetX) &&
      playerObj.y < enemyObj.y + enemyObj.height &&
      playerObj.height + playerObj.y > enemyObj.y)
    ) {

      // Manages the player's lives and resetting positions or the game after the player got hit.
      if (playerObj.lives === 1) {
        levelCounter = 0;
        hardLevelCounter = 1;
        allEnemies = [];
        allEnemies.push(
          new Enemy(0, 60, 225, 25),
          new Enemy(100, 220, 225, 25),
          new Enemy(400, 140, 225, 25)
        );
        resetPlayerPosition(playerObj);
        console.log(allEnemies, "Position Reset!");
        playerObj.lives = 3;
        alert("You ran out of lives. Game Reset!");
        impossibleMode.style = 'display:none;';

      // Decrements player's lives and reset player's position
      } else {
        resetPlayerPosition(playerObj);
        console.log(playerObj.name, "has", playerObj.lives, "lives left");
        playerObj.lives--;
      }

      console.log(enemyObj.name, "KILLED", playerObj.name);
    }
  }
}

// Draws "hit box" depending if the "Home" key was pressed and returns the hit box outline on provided obj
const toggleHitBoxes = (obj) => {
  if (showHitBox) {
    /**
     * Magic num "80" is for moving the hit box overtop the sprite (without it the hit box would be above)
     * 80 resembles one step down (or 80 is cell height)
    */
    return ctx.strokeRect((obj.x + offsetX), (obj.y + 80), obj.width, obj.height);
  } else {
    return ctx.strokeRect((NaN), (NaN), charWidth, charHeight);
  }
}

// Enemies our player must avoid
class Enemy {
  constructor(x, y, maxSpeed, minSpeed) {
    /**
     * Variables applied to each of our instances go here,
     * we've provided one for you to get started
     * The image/sprite for our enemies, this uses
     * a helper we've provided to easily load images
    */
    this.sprite = `images/${enemyType}.png`;
    this.name = "BUG";

    /**
     * Note: enemy starting Y is 60 (first stone row) then add 80 to move one cell down
     * And Starting X is 0 (far left); to move one cell to the right, add 100 to X.
    */
    this.x = x;
    this.y = y;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed
    this.movement = randNumbBet(maxSpeed, minSpeed);
    this.width = charWidth;
    this.height = charHeight;
  }

  /**
   *Update the enemy's position, required method for game
   *Parameter: dt, a time delta between ticks
  */
  update(dt) {
    /**
     * You should multiply any movement by the dt parameter
     * which will ensure the game runs at the same speed for
     * all computers.
    */

    // Resets enemy position after enemy goes past the canvas boundary/width
    if (this.x > 505) {
      this.x = -randNumbBet(500, 100);//The returned num will be negative to appear from the other side of the canvas
    }

    // Determines "this.x" each time the game is "updated" according to the "this.movement" var
    this.x += this.movement * dt;

    // This prevents the enemies from going too slow
    if (this.movement < 10) {
      this.movement = randNumbBet(this.maxSpeed, 25) * dt;
      this.x += this.movement * dt;
    }
  }

  /**
   * Draw the enemy on the screen, required method for game
   * Displays the sprite and hit box depending on the "showHitBox" var
  */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.strokeStyle = 'red';
    toggleHitBoxes(this);
  }
}

/**
 * Now write your own player class
 * This class requires an update(), render() and
 * a handleInput() method.
*/
class Player {
  constructor(char, name) {
    this.sprite = `images/${char}.png`;
    this.name = name;
    this.lives = 3;
    this.x = startingXAxis;
    this.y = startingYAxis;
    this.newMove = "";
    this.width = charWidth;
    this.height = charHeight;
  }

  /**
   * "Moves" player.
   * Has the Win-condition.
   * Contains the Levels.
   * Both level counters here.
  */
  update() {
    levelCounterTag.textContent = `Current Level: ${levelCounter}`;
    highestLevelTag.textContent = `Highest Level: ${highestLevel}`;

    /**
     * Win-condition
     * Increments level and resets player position
    */
    if (this.y === finishZone) {
      resetPlayerPosition(this);
      alert("YOU WIN");
      allEnemies = [];
      levelCounter++;

      // Changes the "highestLevel" counter to match "levelCounter" when appropriate
      if (levelCounter >= highestLevel) {
        highestLevel = levelCounter;
        highestLevelTag.textContent = `Highest Level: ${highestLevel}`;
      }


      /**
       * I made my own levels up to 6
       * Past level 6 will be Very Challenging because this switch will default to
       * a random "maxSpeed" and a random "x" position to each enemy and the default adds 2 bugs per row.
       * (Twice as much bugs/enemies)
      */
      switch (levelCounter) {
        case 0:
          allEnemies.push(
            new Enemy(0, 60, 225, 125),
            new Enemy(100, 220, 225, 125),
            new Enemy(400, 140, 225, 125)
          );
          break;

        case 1:
          allEnemies.push(
            new Enemy(-20, 60, 250, 150),
            new Enemy(-100, 220, 250, 150),
            new Enemy(400, 140, 250, 150)
          );
          break;

        case 2:
          allEnemies.push(
            new Enemy(200, 60, 325, 225),
            new Enemy(0, 140, 425, 225),
            new Enemy(-75, 220, 275, 225)
          );
          break;

        case 3:
          allEnemies.push(
            new Enemy(-150, 60, 375, 250),
            new Enemy(400, 140, 375, 250),
            new Enemy(0, 220, 500, 250)
          );
          break;

        case 4:
          allEnemies.push(
            new Enemy(400, 60, 750, 350),
            new Enemy(200, 140, 500, 350),
            new Enemy(100, 220, 500, 350)
          );
          break;

        case 5:
          alert("FINAL EASY LEVEL\n\nAfter this level you will face endless levels with increased difficulty and\nYou will face double the amount of bugs");
          allEnemies.push(
            new Enemy(0, 60, 1000, 350),
            new Enemy(400, 140, 1000, 350),
            new Enemy(100, 220, 1000, 350)
          );
          break;
        
        /**
         * This activates after the last case, so active only after level 5 (0 is being counted)
         * This will double the amount of bugs
         * And each bug will have a random "x" position and a random "maxSpeed"
         * This is very difficult to beat
        */
        default:
          alert(`IMPOSSIBLE LEVEL ${hardLevelCounter++}`);
          impossibleMode.style = 'display:block;';
          allEnemies.push(
            new Enemy(randNumbBet(-100, 400), 60, randNumbBet((levelCounter * 100), 150), 150),
            new Enemy(randNumbBet(-100, 400), 140, randNumbBet((levelCounter * 100), 150), 150),
            new Enemy(randNumbBet(-100, 400), 220, randNumbBet((levelCounter * 100), 150), 150),
            new Enemy(randNumbBet(-100, 400), 60, randNumbBet((levelCounter * 100), 150), 150),
            new Enemy(randNumbBet(-100, 400), 140, randNumbBet((levelCounter * 100), 150), 150),
            new Enemy(randNumbBet(-100, 400), 220, randNumbBet((levelCounter * 100), 150), 150)
          );
          
          break;
      }
    }

    // Moves player according to inputted move (this.newMove) and the constant move[`${direction}`] value
    switch (this.newMove) {
      case "left":
        this.x += moveLeft;
        break;

      case "up":
        this.y += moveUp;
        break;

      case "right":
        this.x += moveRight;
        break;

      case "down":
        this.y += moveDown;
        break;
    }

    this.newMove = "";
  }

  // Displays the sprite and hit box depending on the "showHitBox" var
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.strokeStyle = 'green';
    toggleHitBoxes(this);
  }

  // Determines boundaries of the canvas and assigns the "this.newMove" var according to the key press
  handleInput(playerMove) {
    switch (playerMove) {
      case 'left':
      case 'a':
        if (this.x >= 100) {this.newMove = "left";}
        break;

      case 'up':
      case 'w':
        if (this.y >= 0) {this.newMove = "up";}
        break;

      case 'right':
      case 'd':
        if (this.x < 400) {this.newMove = "right";}
        break;

      case 'down':
      case 's':
        if (this.y < 380) {this.newMove = "down";}
        break;
    }
  }
}

/**
 * Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 * Random minSpeeds and maxSpeeds
*/
let allEnemies = [new Enemy(0, 60, 250, 125), new Enemy(100, 220, 250, 125), new Enemy(400, 140, 250, 125)];
const player = new Player(playerType, userName);

/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
*/
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    68: 'd',
    83: 's',
    87: 'w',
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * KeyBoard Shortcut for displaying the hit box
 * Adding lives and removing lives (FOR TESTING)
*/
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Home') {
    if (!showHitBox) {
      showHitBox = true;
    } else {
      showHitBox = false;
    }

  // Just for testing
  } else if (e.key === 'PageDown') {
    if (player.lives > 1) {
      player.lives -= 1;
    }

  } else if (e.key === 'PageUp') {
    if (player.lives < 3) {
      player.lives += 1;
    }
  }
});