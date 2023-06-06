//Load boards from file or manually

const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

// create variables//

var timer;
var timeRemaining;
var  lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload= function() {
   // Run startgame when clicked//
id("start-btn").addEventListener("click", startGame);
// add event listener to each number and the number container//
for(let i = 0; i < id("number-container").children.length; i++) {
id("number-container").children[i].addEventListener("click", function() {
  // If selecting is not disabled
if(!disableSelect)   {   
if(this.classList.contains("selected")) {
this.classList.remove("selected");
selectedNum = null;
} else{
  for (let i = 0; i < 9; i++ ){
id("number-container").children[i].classList.remove("selected");
  }
//select it and update selected Num
this.classList.add("selected");
selectedNum = this;
updateMove();

}
}
});

   }

}     
  // Täättä menossa pitää tehä vielä on loadia uudestaan ja testata :) ep4   //
  


function startTimer(){
//sets timer based on input//
if(id("time-1").checked) timeRemaining =180;

else if (id("time-2").checked) timeRemaining = 300;

else timeRemaining=600;

//sets timer for first second//
id ("timer").textContent=timeConversion(timeRemaining);
timer= setInterval(function(){
timeRemaining --;
if (timeRemaining===0) endGame()
id("timer").textContent = timeConversion(timeRemaining);
},1000)

}
//Converts seconds into string of MM:SS format//
function timeConversion(time){
let minutes = Math.floor(time/60);
if (minutes < 10) minutes = "0" + minutes;
let seconds = time % 60;
if (seconds < 10) seconds = "0" + seconds;
return minutes + ":" + seconds;

}

function startGame(){
// choose board difficulty//
let board;
if (id("diff-1").checked) board=easy[0];
else if (id("diff-2").checked) board= medium [0];
 else board= hard[0];

 // set lives and enable number selection//
lives = 3; 
disableSelect = false;
id("lives").textContent = "Lives Remaining: 3";
// create board based on the difficulty//
generateBoard(board);
// timer start//
startTimer();

if (id("theme-1").checked) {
qs("body").classList.remove("dark");

}else{
  qs("body").classList.add("dark");
}
// show number container//
id("number-container").classList.remove("hidden");

}
  
function generateBoard(board){
//clear boards//
clearPrevious();
let idCount=0;
for(let i = 0; i<81; i++){
let tile= document.createElement("p");
if(board.charAt(i)!= "-"){
tile.textContent= board.charAt(i);

}else{
// add click event listener to tile
tile.addEventListener("click", function(){
  //if selectiong is not disabled
if(!disableSelect) {
  if(tile.classList.contains("selected")) {
    tile.classList.remove("selected");
  selectedTile = null;
}else{
for (let i=0; i < 81; i++){
qsa(".tile")[i].classList.remove("selected");
selectedTile = tile;
updateMove();

}
}
} 
});
}

//assign title id
tile.id = idCount;
idCount ++;
tile.classList.add("tile");
if(tile.id>17&& tile.id<27 || (tile.id > 44 & tile.id<54)) {
tile.classList.add("bottomBorder");
   }


if( (tile.id + 1 )% 9 == 3 || (tile.id+ 1 )% 9 == 6){
tile.classList.add("rightBorder");

    } 
    //add tile to board//
id("board").appendChild(tile)
  
  }
}

function updateMove(){
//function 
if(selectedTile && selectedNum) {
selectedTile.textContent= selectedNum.textContent;

if (checkCorrect(selectedTile)) {
//Deselects the tile// 
selectedTile.classList.remove("selected");
selectedNum.classList.remove("selected");
//Clear the selected variables//
selectedNum = null;
selectedTile = null;
// If the number does not match the solution key
} else{
   disableSelect= true;
   selectedTile.classList.add("incorrect");
setTimeout(function(){
  lives--;
  if(lives===0){
    endGame();
  }else{
id("lives").textContent= "Lives Remaining: " + lives;
disableSelect = false;
  }
selectedTile.classList.remove("incorrect");
selectedTile.classList.remove("selected");
selectedNum.classList.remove("selected");
selectedTile.textContent = "";
selectedTile = null;
selectedNum = null;

}, 1000);

}

}

}
function checkDone(){
  let tiles = qsa(".tile");
  for (let i =0; i < tiles.length;i++) {
    if(tiles[i].textContent=== "") return false;

}
return true;
}
function endGame(){
disableSelect= true;
clearTimeout(timer);
if (lives===0 || timeRemaining===0) {
id("lives").textContent="You Lost!";
}else{
  id("lives").textContent= "You Won!";
}
}

function checkCorrect(tile){
let solution;
if (id("diff-1").checked) solution= easy[1];
else if (id("diff-2").checked) solution = medium[1];
else solution = hard[1];
if (solution.charAt(tile.id)=== tile.textContent) return true;
else return false;

}

function clearPrevious(){
//access all tiles
    let tiles=qsa(".tile");

//remove all tiles//
for (let i= 0; i< tiles.length; i++){
tiles[i].remove();
}

// if there is a timer clear it//

if(timer) clearTimeout(timer);

for (let i = 0; i < id("number-container").children.length; i++){
id("number-container").children[i].classList.remove("selected");

}

selectedTile= null;
selectedNum= null;
}

//help functions//

function id(id){
return document.getElementById(id);

}

function qs(selector){
    return document.querySelector(selector);
    
    }

    function qsa(selector){
        return document.querySelectorAll(selector);
        
        }



          
