const app = document.getElementById("app");

const container = document.createElement("div");
container.id = "main";
container.classList.add("container");
app.append(container);

const header = document.createElement("h2");
header.textContent = "Basketball 2k25";
header.classList.add("pt-2");
container.append(header);


const playersHeader = document.createElement("h4");
playersHeader.textContent = "PLAYERS";
container.append(playersHeader);

const playersList = document.createElement("ul");
playersList.id = "players-list";
playersList.classList.add("list-group", "pt-1", "pb-3");
container.append(playersList);

const gameControls = document.createElement("div");
gameControls.id = "game-controls";
gameControls.classList.add("input-group", "mb-3");
container.append(gameControls);

const playerInput = document.createElement("input");
playerInput.id = "text-player";
playerInput.classList.add("form-control");
playerInput.placeholder = "Enter player name";
gameControls.append(playerInput);

const addPlayerBtn = document.createElement("button");
addPlayerBtn.id = "btn-add-player";
addPlayerBtn.classList.add("btn", "btn-outline-primary");
addPlayerBtn.innerHTML = "<i class='bi bi-person-plus'></i> Add Player";
gameControls.append(addPlayerBtn);

const playBtn = document.createElement("button");
playBtn.id = "btn-play";
playBtn.classList.add("btn", "btn-success", "ms-2");
playBtn.innerHTML = "<i class='bi bi-play-fill'></i> PLAY";
playBtn.style.width = "100px";
container.append(playBtn);

const roundsContainer = document.createElement("div");
roundsContainer.id = "rounds-container";
container.append(roundsContainer);


const footer = document.createElement("p");
footer.textContent = "PRIN134-Activity-10"; 
footer.classList.add("mt-3", "text-muted");
container.append(footer);






class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    attemptShot(successRate) {
        if (Math.random() < successRate) {
            this.score++;
        }
    }
}

let players = [];

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

function displayRoundResults(roundNumber, players) {
    const roundDiv = document.createElement("div");
    roundDiv.classList.add("round", "mb-3");
    
    const roundHeader = document.createElement("h4");
    roundHeader.textContent = `ROUND ${roundNumber.toString().padStart(2, '0')}`;
    roundDiv.append(roundHeader);
    
    const resultsList = document.createElement("ul");
    resultsList.classList.add("list-group");
    
    players.forEach(player => {
        const playerResult = document.createElement("li");
        playerResult.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        playerResult.innerHTML = `
            ${player.name}
            <span class="badge bg-primary rounded-pill">${player.score} PTS</span>
        `;
        resultsList.append(playerResult);
    });
    
    roundDiv.append(resultsList);
    roundsContainer.append(roundDiv);
}

function tieBreaker(players, attempts) {
    const tieDiv = document.createElement("div");
    tieDiv.classList.add("alert", "alert-warning", "mb-3");
    tieDiv.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> <strong>Tiebreaker needed between:</strong> ${players.map(p => p.name).join(", ")}`;
    roundsContainer.append(tieDiv);

   
    players.forEach(player => player.score = 0);
    playRound(players, attempts);
    displayRoundResults(2, players);
    
    return rankPlayers(players)[0];
}

function determineChampion(players) {
    let rankedPlayers = rankPlayers(players);
    
    if (rankedPlayers.length > 1 && rankedPlayers[0].score === rankedPlayers[1].score) {
        let tiedPlayers = rankedPlayers.filter(p => p.score === rankedPlayers[0].score);
        
        if (tiedPlayers.length > 1) {
            let winner = tieBreaker(tiedPlayers, 3);
            const championDiv = document.createElement("div");
            championDiv.classList.add("alert", "alert-success", "mt-3");
            championDiv.innerHTML = `
                <i class="bi bi-trophy-fill"></i> 
                The champion is ${winner.name} with ${winner.score} points!
            `;
            roundsContainer.append(championDiv);
            return;
        }
    }
    
    const championDiv = document.createElement("div");
    championDiv.classList.add("alert", "alert-success", "mt-3");
    championDiv.innerHTML = `
        <i class="bi bi-trophy-fill"></i> 
        The champion is ${rankedPlayers[0].name} with ${rankedPlayers[0].score} points!
    `;
    roundsContainer.append(championDiv);
}


addPlayerBtn.addEventListener("click", () => {
    const playerName = playerInput.value.trim();
    if (playerName) {
        const newPlayer = new Player(playerName);
        players.push(newPlayer);
        
        const playerItem = document.createElement("li");
        playerItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        playerItem.innerHTML = `
            ${playerName}
            <button class="btn btn-sm btn-outline-danger remove-player">
                <i class="bi bi-trash"></i>
            </button>
        `;
        
        playerItem.querySelector(".remove-player").addEventListener("click", () => {
            players = players.filter(p => p.name !== playerName);
            playerItem.remove();
        });
        
        playersList.append(playerItem);
        playerInput.value = '';
    }
});

playBtn.addEventListener("click", () => {
    if (players.length < 2) {
        alert("You need at least 2 players to start the game!");
        return;
    }
    
    roundsContainer.innerHTML = '';
    players.forEach(player => player.score = 0);
    playRound(players, 5);
    displayRoundResults(1, players);
    determineChampion(players);
});