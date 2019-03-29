
//Bring All HTML Elements:
const shootBtn = document.getElementById("Shoot")
const reloadBtn = document.getElementById("Reload")
const blockBtn = document.getElementById("Block")
const resetContainer = document.querySelector('.reset-container')
const buttons = document.querySelectorAll('.btn')
const icon = document.querySelector('.opts-icon')
const optsButtons = document.querySelectorAll('.opts-btn')
const computerIcon = document.querySelector('.opts-icon-computer')
const resetBtn = document.getElementById("Reset")
const shootIcon = document.querySelector('.shoot-icon')
const WinnerText = document.querySelector('.WinnerText')
const originalShootBtn = document.getElementById("Shoot")
const PlayerBullets = document.querySelector('.PlayerBullets')
const ComputerBullets = document.querySelector('.ComputerBullets')

//Player class
function Player(name) {
    this.name = name;
    let bullets = [];
    this.shoot = function(){
        PlayerBullets.innerText = 'Bullets: ' + bullets.length
        if(bullets.length>0) {
             //remove last index
            bullets.pop()
        }
    }
    this.reload = function()
    {
        bullets.push("1")
        PlayerBullets.innerText = 'Bullets: ' + bullets.length
    }
    this.block = function() {}
    this.getBullets = function()
    {
        return bullets.length
    }
    this.setBullets = function() {
        bullets = []
    }

}

//Computer class

function Computer()
{
    let bullets = [];
    const self = this
    this.shoot = function(){
        if(bullets.length>0)
        {
          computerIcon.classList.remove('fa-sync', 'fa-user-lock')
          computerIcon.classList.add('fa-fighter-jet');
          computerIcon.style.display = 'block';
             //remove last index
            bullets.pop()
            ComputerBullets.innerText = 'Bullets: ' + bullets.length
            return bullets.length === 2 ? 'shotgun' : 'shoot'
        }
        else{
            return self.reload()
        }

    }
    this.reload = function()
    {  
        computerIcon.classList.remove('fa-fighter-jet', 'fa-user-lock')
        computerIcon.classList.add('fa-sync');
        computerIcon.style.display = 'block';
        if(bullets.length === 3)
        {
        return self.shoot()
        } else
        {
            bullets.push("1")
            ComputerBullets.innerText = 'Bullets: ' + bullets.length 
            return "reload"
        }
    }
    this.block = function()
    {
      computerIcon.classList.remove('fa-sync', 'fa-fighter-jet')
      computerIcon.classList.add('fa-user-lock')
      computerIcon.style.display = 'block';
      return "block"
    }
}

//Random choices for computer
function choices()
{
    const choices = ["shoot", "reload", "block"]
    const choice = Math.floor(Math.random() * 3)+ 0     //  random number between (0-3)
    return choices[choice]
}

//Create new player
let player = new Player("Kevin")
let computer = new Computer("computer")


//Diasable Shoot Button
shootBtn.disabled = true
let isPlayerWinner = false
let computerChoice

// Add eventlistner to all button
shootBtn.addEventListener("click", function()
{
    icon.classList.remove('fa-sync', 'fa-user-lock')
    icon.classList.add('fa-fighter-jet');
    icon.style.display = 'block';
    if(player.getBullets() === 3)
    {
        isPlayerWinner = true
        disableOptsButtons()
        resetContainer.style.display = 'block';
        WinnerText.innerText = 'Player Win the Game!!'
        player.setBullets() 
    }
        player.shoot()
        computerChoice = computer[choices()]()
        if(computerChoice === "reload") {
          resetContainer.style.display = 'block';
          disableOptsButtons()
          WinnerText.innerText = 'Player Win the Game!!' 
        } else if (computerChoice === "shotgun" && computer.getBullets === 2 && !isPlayerWinner)
        {
          WinnerText.innerText = 'Computer Win the Game!!'  
          resetContainer.style.display = 'block';
          disableOptsButtons()
        }
        if(player.getBullets() === 0)
        {
            shootBtn.disabled = true
        }
})

reloadBtn.addEventListener("click", function()
{
    icon.classList.remove('fa-fighter-jet', 'fa-user-lock')
    icon.classList.add('fa-sync');
    icon.style.display = 'block';
    player.reload()
    computerChoice = computer[choices()]()
    shootBtn.disabled = false
    if(computerChoice === "shoot") {
      resetContainer.style.display = 'block';
      disableOptsButtons()
      WinnerText.innerText = 'Computer Win the Game!!' 
    }
    if(player.getBullets() === 3)
    {
    shootBtn.innerText = "SHOTGUN"
    }
})

blockBtn.addEventListener("click", function()
{
  icon.classList.remove('fa-sync', 'fa-fighter-jet')
  icon.classList.add('fa-user-lock')
  icon.style.display = 'block';
  player.block()

  const computerChoice = computer[choices()]()
  if (computerChoice === "shotgun") {
        WinnerText.innerText = 'Computer Win the Game!!'  
        resetContainer.style.display = 'block';
        disableOptsButtons()
    }
})

resetBtn.addEventListener("click", function()
{
    WinnerText.innerText = ' ' 
  player = new Player('Kevin')
  computer = new Computer()
  icon.classList.remove('fa-sync', 'fa-fighter-jet', 'fa-user-lock')
  icon.style.display = 'none';
  computerIcon.classList.remove('fa-sync', 'fa-fighter-jet', 'fa-user-lock')
  computerIcon.style.display = 'none';
  reloadBtn.disabled = false
  blockBtn.disabled = false
  ComputerBullets.innerText = 'Bullets: 0'
  PlayerBullets.innerText = 'Bullets: 0'
  if (shootBtn.innerText === 'SHOTGUN') {
    shootBtn.innerText = ''
    shootBtn.appendChild(shootIcon)
  }
  resetContainer.style.display = 'none';
})
// Disable buttons when some one wins:
function disableOptsButtons() {
  for(let i = 0; i < optsButtons.length; i++) {
    optsButtons[i].disabled = true
  }
}






// Share with different JS files...!!!

// All player properties in player Class!!!