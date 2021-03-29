// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

//var playerName = window.prompt("What is your robot's name?");
var playerName = "jimmy";
var playerHealth = 100;
var playerAttack = 10;

var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);

var fightLoop = function (enemyName) {
  // Alert players that they are starting the round
  //window.alert("Welcome to Robot Gladiators!");

  //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
  enemyHealth = enemyHealth - playerAttack;

  // Log a resulting message to the console so we know that it worked.
  console.log(
    playerName +
      " attacked " +
      enemyName +
      ". " +
      enemyName +
      " now has " +
      enemyHealth +
      " health remaining."
  );

  // check enemy's health
  if (enemyHealth <= 0) {
    console.log(enemyName + " has died!");
  } else {
    console.log(enemyName + " still has " + enemyHealth + " health left.");
  }

  // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
  playerHealth = playerHealth - enemyAttack;

  // Log a resulting message to the console so we know that it worked.
  console.log(
    enemyName +
      " attacked " +
      playerName +
      ". " +
      playerName +
      " now has " +
      playerHealth +
      " health remaining."
  );

  // check player's health
  if (playerHealth <= 0) {
    console.log(playerName + " has died!");
  } else {
    console.log(playerName + " still has " + playerHealth + " health left.");
  }
};

var doFight = function (enemyName) {
  // initialize this enemyName health & attack
  enemyHealth = 50;
  enemyAttack = 12;

  // log this enemy starting stats
  console.log("--- starting a new fight : " + enemyName + " ------");
  console.log("    enemyName ->" + enemyName);
  console.log("    enemyHealth -> " + enemyHealth);
  console.log("    enemyAttack ->" + enemyAttack);
  console.log("---- ready to fight! ---------");

  // repeat and execute as long as this enemy robot is alive
  while (playerHealth > 0 && enemyHealth > 0) {
    fightLoop(enemyName);
  }

  if (playerHealth <= 0) {
    window.alert("LOSE : " + playerName + " has died!");
  } else if (enemyHealth <= 0) {
    window.alert("WIN : " + enemyName + " has died!");
  }

  console.log("----- fight with " + enemyName + " is OVER! -----");
};

var fight = function (enemyName, round) {
  console.log(
    "   --- fight START -> enemyName : " + enemyName + " round : " + round
  );

  //show user what round it is
  window.alert("Welcome to Robot Gladiators! Round " + round);

  // set a variable if we want to fight this enemy or not
  var choiceMade = false;
  var willFight = false;

  // first, get the player choice for the fight against this enemy

  //we will loop until a valid choice is made
  console.log("Does user want to fight " + enemyName + " ? let's ask!");

  do {
    // Ask players if they want to fight
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );

    if (promptFight === "fight" || promptFight === "FIGHT") {
      // player chose to fight
      choiceMade = true;
      willFight = true;
    } else if (promptFight === "skip" || promptFight === "SKIP") {
      // player chose to skip
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        choiceMade = true;
        willSkip = true;

        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;

        // if no, we will go through loop again, since we haven't set choiceMade to true
      }
    } else {
      // unknown choice
      window.alert("You need to choose a valid option. Try again!");
    }
  } while (!choiceMade);

  if (willFight) {
    console.log("We are going to fight : " + enemyName);
    doFight(enemyName);

    //after fighting, if the player is still alive, and if we are not at the last enemy, go to shop
    if (playerHealth > 0 && round < enemyNames.length) {
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
    console.log("We are not going to fight :" + enemyName);
  }
  console.log(
    "   --- fight END -> enemyName : " + enemyName + " round : " + round
  );
};

// function to start a new game
var startGame = function () {
  console.log("---- startGame START...");

  // initialize player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    console.log("  doing index : " + i + " enemyName : " + enemyNames[i]);
    if (playerHealth > 0) {
      // you not dead, we can fight
      console.log("      player NOT dead, can fight");
      var pickedEnemyName = enemyNames[i];
      fight(pickedEnemyName, i + 1);
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
  //if the player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerMoney +
        "."
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "refill":
    case "REFILL":
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;

    case "upgrade":
    case "UPGRADE":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;

    case "leave":
    case "LEAVE":
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
