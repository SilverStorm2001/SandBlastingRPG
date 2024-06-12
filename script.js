let xp = 0;
let equipmentDurability = 100;
let money = 15;
let currentUnit = 0;
let blasting;
let jobCompletion;
let inventory = [" 100 Grit Sand Paper"];
let adjustedBlast = 0;
let hiddenEquipmentDurabilityValue = 5

// can just call upon const now
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
// const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const durabilityText = document.querySelector("#durabilityText");
const moneyText = document.querySelector("#moneyText");
const jobDescriptionText = document.querySelector("#jobDescriptionText");
const jobNameText = document.querySelector("#jobNameText");
const jobCompletionText = document.querySelector("#jobCompletionText"); 

const Upgrades = [
  {
    name: "100 Grit Sand Paper",
    power: 6
  },
  {
    name: "DB350 Mobile XS",
    power: 11
  },
  {
    name: "DB800 Mibile XL",
    power: 15  
  },
  {
    name: "Ultra Laser Surface Annihilator",
    power: 21
  }
];

const jobOpportunities = [
  {
    name: "Old Collector Car",
    level: 12,
    completion: 40
  },
  {
    name: "Steel Pipeline",
    level: 18,
    completion: 115
  },
  {
    name: "Enchanted Graffiti",
    level: 105,
    completion: 800
  }
]

const locations = [
  {
  name: "Home",
  "button text": ["Order Parts", "Side Job", "Attempt The Enchanted Graffiti"],
  "button functions": [orderParts, sideJob, cleanTown],
  text: "You are home with a beer in your hand. What would you like to do?"
},
  {
     name: "Online Store",
      "button text": ["Replacement Part ($10)", "Buy Upgrades ($30)", "Log Off"],
      "button functions": [buyParts, buyUpgrade, logOff],
      text: "You logged into SandBlasters Unite website. What would you like to buy?"
},
  {
    name: "Side Job",
    "button text": [ "Restoration", "Steel Maintenence", "Go Back"],
    "button functions": [carRestoration, steelMaintenence, logOff],
    text: "You have two job postings available. Which one would you like to accept?"
  },
  {
    name: "Blasting",
    "button text": ["Blast", "Adjust", "Give Up"],
    "button functions": [blast, adjust, logOff],
    text: "You are cleaning the suface layer"
  },
  {
    name: "Job Completed",
    "button text": ["Go Home", "Go Gamble", "Go Home" ],
    "button functions": [logOff, gambling, logOff ],
    text: '"Thank you for your service! Here is your cold hard cash for the job!"'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "Your equipment broke and you were fired. You lose."
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "Congratulations! You have blasted the Enchanted Graffiti into a million specs and have saved the town!"
  },
  {
    name: "easterEgg",
      "button text": ["$5", "$10", "Go Home"],
      "button functions": [fiveDollar, tenDollar, logOff],
      text: "You stop at a cassino and contemplate gambling. What do you do?"
  }
  ]

// Initialize buttons
button1.onclick = orderParts; 
button2.onclick = sideJob;
button3.onclick = cleanTown;

function update(location) {
  jobStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  button1.onclick = location["button functions"][0]; 
  button2.onclick = location["button functions"][1]; 
  button3.onclick = location["button functions"][2];

  text.innerText = location.text;
}
// This function takes you back home from online store //
function logOff() {
  update(locations[0]);
}


// Online Store // 
function orderParts() {
    update(locations[1]);
}

// Side Job //
function sideJob() {
  update(locations[2])

}


// Online Store Options //
function buyParts() {
  if (money >= 10) {
      money -= 10;
      equipmentDurability += 15;
      moneyText.innerText = money;
      durabilityText.innerText = equipmentDurability;
  } else {
      text.innerText = "You cannot afford this item. Complete more jobs!";
  }

}

function buyUpgrade() {
  if (currentUnit < Upgrades.length - 1) {
    if (money >= 30) {
      money -= 30;
      currentUnit++;
      moneyText.innerText = money;
      let newUpgrade = Upgrades[currentUnit].name;
      text.innerText = "You now have a " + newUpgrade + ".";
      inventory.push(newUpgrade);
      text.innerText += " In your inventory you have: " + inventory + ", ";
  } else {
      text.innerText = "You cannot afford this item. Complete more jobs!";
    }
  } else {
      text.innerText = "You already have the most powerful Blaster!";
      button2.innerText = "Sell Blaster for $20?";
      button2.onclick = sellBlaster;
  }
}

function sellBlaster() {
  if (inventory.length > 1) {
    money += 20;
    moneyText.innerText = money;
    let currentUnit = inventory.shift();
    text.innerText = "You sold a " + currentUnit + ".";
    text.innerText = "In your inventory you have: " + inventory + ", ";
  } else {
    text.innerText = "Don't sell your only Unit!";
  }
    
  
}

// Side Job Options //
function carRestoration() {
  blasting = 0;
  goBlast();
}

function steelMaintenence() {
  blasting = 1;
  goBlast();
}

function cleanTown() {
  blasting = 2;
  goBlast();

}

function goBlast() {
  update(locations[3]);
  jobCompletion = jobOpportunities[blasting].completion;
  jobStats.style.display = "block";
  jobNameText.innerText = jobOpportunities[blasting].name;
  jobCompletionText.innerText = jobCompletion;
}

// Blast button in job. Equipment durability goes down with each attack
function blast() {
  text.innerText = "The " + jobOpportunities[blasting].name + "'s outer layer maintained its integrity!";
  text.innerText += " Your technique with your " + Upgrades[currentUnit].name + " was consistent across the surface.";
  
  if (blastAccurately()) {
    equipmentDurability -= getEquipmentDurabilityValue(jobOpportunities[blasting].level);
  } else {
    equipmentDurability -= 20;
    text.innerText += " Unfortunately, your technique was not effective and you damaged your equipment!";
  }
  
  jobCompletion -= Upgrades[currentUnit].power + Math.floor(Math.random() * xp) + 1;
  durabilityText.innerText = equipmentDurability;
  jobCompletionText.innerText = jobCompletion;
  if (equipmentDurability <=0) {
      lose();
  } else if (jobCompletion <= 0) {
    blasting === 2 ? winGame() : completeJob();  
    }

  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " broke!";
    currentUnit--;
  }
}
function getEquipmentDurabilityValue(level) {
  let hit = (level * 1) - (Math.floor(Math.random() * hiddenEquipmentDurabilityValue));
  console.log(hit);
  return hit;
}

function blastAccurately() {
  return Math.random() > .2 || equipmentDurability < 15;
}

// Adjusting adds 10 damage to next attack but decreases durability by 5 //
function adjust() {
  if (equipmentDurability > 5) {
    equipmentDurability -= 5;
    adjustedBlast += 10;
  
  text.innerText = "You adjust your technique with your " + Upgrades[currentUnit].name + " and your next blast will hit harder!";
  durabilityText.innerText = equipmentDurability;
} else {
  text.innerText = "Your " + Upgrades[currentUnit].name + " is too damaged to adjust!";
  }  
}

function completeJob() {
  money += Math.floor(jobOpportunities[blasting].level * 2.1);
  xp += Math.floor(jobOpportunities[blasting].level * .35);
  moneyText.innerText = money;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  equipmentDurability = 100;
  money = 15;
  currentUnit = 0;
  inventory = [" 100 Grit Sand Paper"];
  moneyText.innerText = money;
  durabilityText.innerText = equipmentDurability;
  xpText.innerText = xp;
  logOff();
}

// Gamble game //
function gambling() {
  update(locations[7]);
}

function pick(amount) {
  if (money < amount) {
    text.innerText = "You are broke. Complete more jobs!";
    return;
  }
  
  const  randomNumber = Math.floor(Math.random() * 11);
  const gambleWin = randomNumber > 5;
    if (gambleWin) {
    money += amount * 2;
    moneyText.innerText = money;
    text.innerText = "You gambled right! You won $" + amount * 2 + "!";
  } else {
    money -= amount;
    moneyText.innerText = money;
    text.innerText = "Your intuition was wrong. You lost $" + amount + "!";
  }
}

function fiveDollar() {
  pick(5);
}

function tenDollar() {
  pick(10);
}
