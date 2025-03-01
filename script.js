let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGame=document.querySelector("#newGame");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg")
let turnO=true;
let gameOver=false
function resetGame(){
    turnO=true;
    enableBox();
    gameOver=false
    msgContainer.classList.add("hide")
}
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box)=>{
box.addEventListener("click",()=>{
    if(turnO){
        box.innerText="O";
       box.classList.remove("x")
        turnO=false;
    }else{
        box.innerText="X";  
        box.classList.remove("o")
        turnO=true;
    }
    box.disabled=true;
    checkWinner()
    if (!gameOver) {
        checkDraw();
    }
})
});
function checkDraw() {
    let allDisabled = true;
    for (let box of boxes) {
        if (!box.disabled) {
            allDisabled = false;
            break;
        }
    }
    if (allDisabled) {
        msg.innerText = `It's a draw!`;
        msgContainer.classList.remove("hide");
        gameOver=true
    }
}

function disableBox(){
    for(let box of boxes){
        box.disabled=true;
    }
}
function enableBox(){
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.add("x");
        box.classList.add("o")
    }
}
function showWinner(winner){
msg.innerText=`Congratulations! the winner is ${winner}`
msgContainer.classList.remove("hide")
disableBox()
gameOver = true;
}
function checkWinner(){
    for(let pattern of winPatterns){

            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText
            let pos3Val=boxes[pattern[2]].innerText

            if(pos1Val!=="" && pos2Val!==""&& pos3Val!==""){
                if(pos1Val===pos2Val && pos2Val===pos3Val){
                    showWinner(pos1Val)
                }
            }
    }
}

newGame.addEventListener("click",()=>{
resetGame()
})

resetBtn.addEventListener("click",()=>{
    resetGame()
    })