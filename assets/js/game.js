// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// function to set name
var getPlayerName = function () {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  //name: "jimmy",
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
};

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 15),
    health: randomNumber(40, 60),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 15),
    health: randomNumber(40, 60),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 15),
    health: randomNumber(40, 60),
  },
];

console.log(enemyInfo);

var playerAttackFirst = function (
  enemyInfo,
  enemyAttackDamage,
  playerAttackDamage
) {
  // the player attacks first in this round

  enemyInfo.health = Math.max(0, enemyInfo.health - playerAttackDamage);

  // Log a resulting message to the console so we know that it worked.
  console.log(
    playerInfo.name +
      " attacked " +
      enemyInfo.name +
      " with " +
      playerAttackDamage +
      " damage. " +
      enemyInfo.name +
      " now has " +
      enemyInfo.health +
      " health remaining."
  );

  // check enemy's health
  if (enemyInfo.health <= 0) {
    console.log(enemyInfo.name + " has died!");
    // no need to apply enemy damage to player, then enemy is dead
  } else {
    console.log(
      enemyInfo.name + " still has " + enemyInfo.health + " health left."
    );
    //now apply enemy damage to player
    playerInfo.health = Math.max(0, playerInfo.health - enemyAttackDamage);

    // Log a resulting message to the console so we know that it worked.
    console.log(
      enemyInfo.name +
        " attacked " +
        playerInfo.name +
        "with " +
        enemyAttackDamage +
        " damage. " +
        playerInfo.name +
        " now has " +
        playerInfo.health +
        " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
      console.log(playerInfo.name + " has died!");
    } else {
      console.log(
        playerInfo.name + " still has " + playerInfo.health + " health left."
      );
    }
  }
};

var enemyAttackFirst = function (
  enemyInfo,
  enemyAttackDamage,
  playerAttackDamage
) {
  // enemy attacks first this round
  //now apply enemy damage to player
  playerInfo.health = Math.max(0, playerInfo.health - enemyAttackDamage);

  // Log a resulting message to the console so we know that it worked.
  console.log(
    enemyInfo.name +
      " attacked " +
      playerInfo.name +
      "with " +
      enemyAttackDamage +
      " damage. " +
      playerInfo.name +
      " now has " +
      playerInfo.health +
      " health remaining."
  );

  //check if player has died
  if (playerInfo.health <= 0) {
    console.log(playerInfo.name + " has died!");
    // no need to apply player damage to enemy, the player is dead.
  } else {
    console.log(
      playerInfo.name + " still has " + playerInfo.health + " health left."
    );

    // now apply player damage to enemy
    enemyInfo.health = Math.max(0, enemyInfo.health - playerAttackDamage);

    // Log a resulting message to the console so we know that it worked.
    console.log(
      playerInfo.name +
        " attacked " +
        enemyInfo.name +
        " with " +
        playerAttackDamage +
        " damage. " +
        enemyInfo.name +
        " now has " +
        enemyInfo.health +
        " health remaining."
    );

    //now see if enemy is dead
    // check enemy's health
    if (enemyInfo.health <= 0) {
      console.log(enemyInfo.name + " has died!");
    } else {
      console.log(
        enemyInfo.name + " still has " + enemyInfo.health + " health left."
      );
    }
  }
};

var fightLoop = function (enemyInfo, isPlayerTurn) {
  // Alert players that they are starting the round
  //window.alert("Welcome to Robot Gladiators!");

  //determine the attack damage this round, for both enemy and player
  var playerAttackDamage = randomNumber(
    playerInfo.attack - 3,
    playerInfo.attack
  );
  var enemyAttackDamage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);

  if (isPlayerTurn) {
    playerAttackFirst(enemyInfo, enemyAttackDamage, playerAttackDamage);
  } else {
    enemyAttackFirst(enemyInfo, enemyAttackDamage, playerAttackDamage);
  }
};

var doFight = function (enemyInfo) {
  // log this enemy starting stats
  console.log("--- starting a new fight : " + enemyInfo.name + " ------");
  console.log("    playerInfo:");
  console.log("          name  : " + playerInfo.name);
  console.log("          health: " + playerInfo.health);
  console.log("          attack: " + playerInfo.attack);
  console.log("    enemyInfo:");
  console.log("          name  : " + enemyInfo.name);
  console.log("          health: " + enemyInfo.health);
  console.log("          attack: " + enemyInfo.attack);

  // figure out who attacks first
  var isPlayerTurn;
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
    console.log("   ENEMY attacks first!");
  } else {
    isPlayerTurn = true;
    console.log("   PLAYER attacks first!");
  }

  console.log("---- ready to fight! ---------");

  // repeat and execute as long as this enemy robot is alive
  while (playerInfo.health > 0 && enemyInfo.health > 0) {
    fightLoop(enemyInfo, isPlayerTurn);
    //switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }

  if (playerInfo.health <= 0) {
    window.alert("LOSE : " + playerInfo.name + " has died!");
  } else if (enemyInfo.health <= 0) {
    window.alert("WIN : " + enemyInfo.name + " has died!");
    playerInfo.money = playerInfo.money + 20;
  }

  console.log("----- fight with " + enemyInfo.name + " is OVER! -----");
};

var fightOrSkip = function (enemyInfo) {
  // return true if user wants to fight
  // return false if user wants to skip
  // loop until user makes a valid choice

  // set a variable if we want to fight this enemy or not
  var choiceMade = false;
  var willFight = false;

  // first, get the player choice for the fight against this enemy

  //we will loop until a valid choice is made
  console.log("Does user want to fight " + enemyInfo.name + " ? let's ask!");

  // loop until we get a valid choice
  do {
    // Ask players if they want to fight
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );

    //convert to all lowercase
    promptFight = promptFight.toLowerCase();

    if (promptFight === "fight") {
      // player chose to fight
      choiceMade = true;
      willFight = true;
    } else if (promptFight === "skip") {
      // player chose to skip
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        choiceMade = true;
        willSkip = true;

        window.alert(
          playerInfo.name + " has decided to skip this fight. Goodbye!"
        );
        // subtract money from playerInfo.money for skipping
        playerInfo.money = playerInfo.money - 10;

        // if no, we will go through loop again, since we haven't set choiceMade to true
      }
    } else {
      // unknown choice
      window.alert("You need to choose a valid option. Try again!");
    }
  } while (!choiceMade);

  // now return a value
  return willFight;
};

var fight = function (enemyInfo, round, totalRounds) {
  console.log(
    "   --- fight START -> enemyName : " + enemyInfo.name + " round : " + round
  );

  //show user what round it is
  window.alert("Welcome to Robot Gladiators! Round " + round);

  // will user fight or skip this fight?
  if (fightOrSkip(enemyInfo)) {
    console.log("We are going to fight : " + enemyInfo.name);
    doFight(enemyInfo);

    //after fighting, if the player is still alive, and if we are not at the last enemy, go to shop
    if (playerInfo.health > 0 && round < totalRounds) {
      //ask the player if they want to go to the shop
      var storeConfirm = window.confirm(
        "The fight is over, visit the store before the next round?"
      );

      //if yes, take them to the shop
      if (storeConfirm) {
        shop();
      }
    }
  } else {
    console.log("We are not going to fight :" + enemyInfo.name);
  }
  console.log(
    "   --- fight END -> enemyName : " + enemyInfo.name + " round : " + round
  );
};

// function to start a new game
var startGame = function () {
  console.log("---- startGame START...");

  // initialize player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    console.log("  doing index : " + i + " enemyName : " + enemyInfo[i].name);
    if (playerInfo.health > 0) {
      // you not dead, we can fight
      console.log("      player NOT dead, can fight");
      fight(enemyInfo[i], i + 1, enemyInfo.length);
    } else {
      // you dead
      console.log("      player IS dead, can NOT fight");

      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  console.log("---- startGame FINISHED!");

  // after the loop ends, the player is either out of health or enemies to fight
  endGame();
};

var endGame = function () {
  window.alert("The game has now ended. Let's see how you did!");

  // check localStorage for high score, if it's not there, use 0
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }
  // if player has more money than the high score, player has new high score!
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(
      playerInfo.name + " now has the high score of " + playerInfo.money + "!"
    );
  } else {
    alert(
      playerInfo.name +
        " did not beat the high score of " +
        highScore +
        ". Maybe next time!"
    );
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
  );

  //convert string to integer
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;

    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// start the game when the page loads
startGame();
