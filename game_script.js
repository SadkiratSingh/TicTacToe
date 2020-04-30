const X_CLASS='x';
const CIRCLE_CLASS='circle';

const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const winning_msg_element=document.querySelector('[data-winning-message-text]');
const winning_div=document.getElementById('winningMessage');
const restart_element=document.getElementById('restartButton');

var circleTurn;
startGame();

restart_element.addEventListener('click',startGame);



function startGame(){
    circleTurn=false;
    setBoardHoverClass();
    cellElements.forEach(function(cell){
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click',handleclick);
        cell.addEventListener('click',handleclick,{once:true});
    })
    winning_div.classList.remove('display');
}

function handleclick(e){
    var my_cell=e.target;
    var currentClass;
    if(circleTurn==true){
        currentClass=CIRCLE_CLASS;
    }
    else{
        currentClass=X_CLASS;
    }
    placemark(my_cell,currentClass);

    if(checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        setBoardHoverClass();
    }
    
}

function placemark(my_cell,currentClass){
    my_cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn=!circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn==true){
        board.classList.add(CIRCLE_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(
        function(combination){
            return combination.every(
                function(index){
                    return cellElements[index].classList.contains(currentClass);
                }
            )
        }
    )
}

function isDraw(){
    var cell_array=Array.prototype.slice.call(cellElements);
    return cell_array.every(
        function(cell){
            return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS);
        }
    )
}

function endGame(draw){
    if(draw){
        winning_msg_element.innerHTML='Draw!';
    }
    else{
        if(circleTurn==true){
            winning_msg_element.innerHTML='O Wins!';
        }
        else{
            winning_msg_element.innerHTML='X Wins!';
        }
    }
    winning_div.classList.add('display');
}
