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
console.log(enemyNames);

var fightLoop = function (enemyName, enemyHealth, enemyAttack) {
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
  var enemyHealth = 50;
  var enemyAttack = 12;

  // log this enemy starting stats
  console.log("--- starting a new fight : " + enemyName + " ------");
  console.log("    enemyName ->" + enemyName);
  console.log("    enemyHealth -> " + enemyHealth);
  console.log("    enemyAttack ->" + enemyAttack);
  console.log("---- ready to fight! ---------");

  // repeat and execute as long as this enemy robot is alive
  while (playerHealth > 0 && enemyHealth > 0) {
    fightLoop(enemyName, enemyHealth, enemyAttack);
  }

  console.log("----- fight with " + enemyName + " is OVER! -----");
};

var fight = function (enemyName, index) {
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
  } else {
    console.log("We are not goign to fight :" + enemyName);
  }
};

// iterate over all enemy names, and call fight for each one.  argument for fight is the current value (ie, each indidvidual enemy name)
enemyNames.forEach(fight);
