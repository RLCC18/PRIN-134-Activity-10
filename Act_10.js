class Player {
    constructor(name, team) {
        this.name = name;
        this.score = 0;
        this.team = team;
    }

    attemptShot(successRate) {
        if (Math.random() < successRate) {
            this.score++;
        }
    }
}

function generateSuccessRate() {
    return Math.random();
}

function playRound(players, attempts) {
    players.forEach(player => {
        const successRate = generateSuccessRate();
        for (let i = 0; i < attempts; i++) {
            player.attemptShot(successRate);
        }
    });
}

function rankPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
}

function displayRankings(players) {
    console.log("\n🏆 Rankings after this round:");
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} - ${player.score} points`);
    });
}

function tieBreaker(players, attempts) {
    console.log("\n🔥 Tiebreaker needed between: " + players.map(p => p.name).join(", ")+"\n");
    console.log("🏀 Round 2 Begins!");

    players.forEach(player => (player.score = 0));
    playRound(players, attempts);

    players.forEach(player => {
        console.log(`${player.name} scored ${player.score} successful shots.`);
    });

    displayRankings(players);
    return rankPlayers(players)[0];
}

function determineChampion(players) {
    let rankedPlayers = rankPlayers(players);

  
    if (rankedPlayers.length > 1 && rankedPlayers[0].score === rankedPlayers[1].score) {
        let tiedPlayers = rankedPlayers.filter(p => p.score === rankedPlayers[0].score);

        if (tiedPlayers.length > 1) {
            let winner = tieBreaker(tiedPlayers, 3);
            console.log(`\n🏆 The champion is ${winner.name} with ${winner.score} points!\n`);
            return;
        }
    }

  
    console.log(`\n 🏆 The champion is ${rankedPlayers[0].name} with ${rankedPlayers[0].score} points!\n`);
}

const players = [
    new Player("James", "Lakers"),
    new Player("Curry", "Warriors"),
    new Player("Jordan", "Bulls"),
    new Player("Bryant", "Lakers"),
    new Player("Durant", "Suns")
];

playRound(players, 5);
displayRankings(players);
determineChampion(players);









const app = document.getElementById("app");

const container = document.createElement("div");
container.id = "main";
container.classList.add("container");
app.append(container);

const header = document.createElement("h2");
header.textContent = "Basketball 2k25"
container.append(header);

const toDoList = document.createElement("ul");
toDoList.id = "todo-list";
toDoList.classList.add("list-group", "pt-3", "pb-2");
container.append(toDoList);

const toDoControls = document.createElement("div");
toDoControls.id = "todo-controls"
toDoControls.classList.add("input-group");
document.getElementById("todo-list").before(toDoControls);

const instructions = document.createElement("p");
instructions.textContent = "Enter a player name."
document.getElementById("todo-controls").before(instructions);







const footer = document.createElement("p");
footer.textContent = "Lesson 10: Manipulating Elements - Simple ToDo App"
document.getElementById("todo-list").after(footer);

const toDoInput = document.createElement("input");
toDoInput.id = "text-todo";
toDoInput.classList.add("form-control");
document.getElementById("todo-controls").append(toDoInput);










const toDoButton = document.createElement("button");
toDoButton.id = "btn-todo";
toDoButton.classList.add("btn", "btn-outline-primary");
toDoButton.textContent = "Add";
toDoButton.addEventListener("click", () => {
  let itemInput = document.getElementById('text-todo');
  let toDoList = document.getElementById('todo-list');

  let newItem = document.createElement('li');
  newItem.classList.add("list-group-item");
  newItem.textContent = " " + itemInput.value;

  addRemoveBtn(newItem)

  toDoList.append(newItem);
  itemInput.value = '';
})
document.getElementById("todo-controls").append(toDoButton);

const addRemoveBtn = (listItem) => {
  let removeBtn = document.createElement('button');
  removeBtn.innerHTML = "<i class='bi bi-trash'></i>";
  removeBtn.type = "button";
  removeBtn.classList.add("btn", "btn-sm", "btn-outline-danger");
  removeBtn.addEventListener("click", () => {
    listItem.remove();
  })
  listItem.prepend(removeBtn);
}

const actionButtons = document.createElement("div");
actionButtons.classList.add("btn-group", "pt-2", "pb-2");

const btnReplaceChild = document.createElement("button");
btnReplaceChild.id = "btn-replace-child";
btnReplaceChild.classList.add("btn", "btn-outline-primary");
btnReplaceChild.textContent = "Replace Child";
btnReplaceChild.addEventListener("click", () => {
  const todo = document.getElementById('todo-list');
  const itemsArray = Array.from(todo.children);
  
  itemsArray.forEach((oldChild, index) => {
    const newChild = document.createElement("li");
    newChild.classList.add("list-group-item");
    newChild.textContent = ` Replaced Item ${index + 1}`;
    addRemoveBtn(newChild)

    todo.replaceChild(newChild, oldChild);
  });
});
actionButtons.append(btnReplaceChild);

const btnReplaceWith = document.createElement("button");
btnReplaceWith.id = "btn-replace-with";
btnReplaceWith.classList.add("btn", "btn-outline-primary");
btnReplaceWith.textContent = "Replace With";
btnReplaceWith.addEventListener("click", () => {
  const todo = document.getElementById('todo-list');
  const itemsArray = Array.from(todo.children);
  
  itemsArray.forEach((oldChild, index) => {
    const newChild = document.createElement("li");
    newChild.classList.add("list-group-item");
    newChild.textContent = ` Replaced With ${index + 1}`;
    addRemoveBtn(newChild)

    oldChild.replaceWith(newChild);
  });
});
actionButtons.append(btnReplaceWith);

const btnProcessFirst = document.createElement("button");
btnProcessFirst.id = "btn-process-first";
btnProcessFirst.classList.add("btn", "btn-outline-primary");
btnProcessFirst.textContent = "Process First";
btnProcessFirst.addEventListener("click", () => {
  let todo = document.getElementById('todo-list');
  if (todo.firstElementChild) {
    todo.removeChild(todo.firstElementChild);
  }
});
actionButtons.append(btnProcessFirst);

const btnProcessLast = document.createElement("button");
btnProcessLast.id = "btn-process-last";
btnProcessLast.classList.add("btn", "btn-outline-primary");
btnProcessLast.textContent = "Process Last";
btnProcessLast.addEventListener("click", () => {
  let todo = document.getElementById('todo-list');
  if (todo.lastElementChild) {
    todo.removeChild(todo.lastElementChild);
  }
});
actionButtons.append(btnProcessLast);

document.getElementById("todo-controls").after(actionButtons);