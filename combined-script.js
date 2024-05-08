var inputBox = document.getElementById("input-box0");
inputBox.focus();
const ans = ['X','X','X'];
var closePage = document.getElementsByClassName("closePage");
var popup = document.getElementsByClassName("popup");
var playAgainLost = document.getElementById("playAgainLost");
var playAgainWon = document.getElementById("playAgainWon");
var closeLost = document.getElementById("closeLost");
var closeWon = document.getElementById("closeWon");
let gameOver = false;



const CLUE_SIZE = 3;
const answer = [];

let existentNums = [];
let nonExistentNums = [];
let wellPlacedClueArr = [];
let twoCorrectClueArr = [];
let oneCorrectClueArr = [];
let noCorrectClueArr = [];


let wellplacedIndex = -1;
let wellpacedNum = -1;
let corrNotPlacedNum1 = -1;
let corrNotPlacedNum2 = -1;
let corrNotPlacedIndex1 = -1;
let corrNotPlacedIndex2 = -1;
let gameWon = true;


getClueArrays();

function inputNumber(num){
    
    
    if(inputBox == document.getElementById("input-box0")){
        ans[0] = num;
        inputBox.value = ans[0];
        inputBox= document.getElementById("input-box1");
    }
    else if(inputBox == document.getElementById("input-box1")){
        ans[1] = num;
        inputBox.value = ans[1];
        inputBox=document.getElementById("input-box2");
    }
    else if(inputBox == document.getElementById("input-box2")){
        
        ans[2] = num;
        inputBox.value = ans[2];
        inputBox = document.getElementById("");
    }
    inputBox.focus();
    
}

var body = document.getElementById("body");

body.addEventListener("click", function(e){
    if(!gameOver){
        var elem = e.target;
        if(elem.type == "submit"){
            if(elem == document.getElementById("submit"))
            {
                submit();
            }
            else{
                if(inputBox == document.getElementById("")){
                    alert("Please click on a box to input");
                }    
                else {
                    let num = elem.innerText;
                    inputNumber(num);
                }
            }
            
        }
        else if(elem.type == "text"){
            inputBox = elem;
            inputBox.focus();
            
        }
        else{
            inputBox = document.getElementById("");
        }
    
    }
});

var submit = document.getElementById("submit");

submit.addEventListener("click", function(e){

    if(!gameOver){
        document.getElementById("input-box0").value = ans[0];
        document.getElementById("input-box1").value = ans[1];
        document.getElementById("input-box2").value = ans[2];
    
        let ansCount = 0;
       
        for(let i = 0; i < ans.length; i++) {
    
            if(ans[0] == 'X' || ans[1] == 'X' || ans[2] == 'X'){
                alert("You must input all three numbers");
                break;            
            }
            if ( isNaN(parseFloat(ans[i])) && !isFinite(ans[i]) ) {
                alert("You must input all three numbers");
                break;
            }
            if(ans[0] == ans[1] || ans[0] == ans[2] || ans[1] == ans[2]){
                alert("Duplicate digits is not allowed");
                break;
            }
            else{
                ansCount++;
            }
        
        }
        let answerArray = [];
        for(let i = 0; i < ans.length; i++) {
            answerArray[i] = parseInt(ans[i]);
        }
        
        if(ansCount == CLUE_SIZE){
            checkAnswer(answerArray);
            if (gameWon == false){
                var popup = document.getElementById("popup-lost");
                popup.classList.add("open-popupLost");
            }
            else {
                var popup = document.getElementById("popup-won");
                popup.classList.add("open-popupWon");
    
            }
            
        }
    
    }
});




// playAgainLost.addEventListener("click", function (e){
//     popup = document.getElementById("popup-lost");
//     popup.classList.remove("open-popupLost");
//     location.reload();
// });

// playAgainWon.addEventListener("click", function (e){
    
//     popup = document.getElementById("popup-won");
//     popup.classList.remove("open-popupWon");
//     location.reload();

// });

// closePage.addEventListener("click", function (e){
//     var startPage= document.getElementById("startPage");
//     startPage.classList.remove(".start-page");
//     startPage.classList.add(".close-start-page");
// });

// closeLost.addEventListener("click", function (e){
//     popup = document.getElementById("popup-lost");
//     popup.classList.remove("open-popupLost");
//    disableElements();
// });

// closeWon.addEventListener("click", function (e){
//     popup = document.getElementById("popup-won");
//     popup.classList.remove("open-popupWon");
//     disableElements();

// });

function disableElements(){
    var input = document.getElementById("input-box0");
    input.disabled = true;
    input = document.getElementById("input-box1");
    input.disabled = true;
    input = document.getElementById("input-box2");
    input.disabled = true;
    submit.disabled = true;
}


//Get clues
function getClueArrays(){
    var clueIds = ["CB1", "CB2", "CB3", "CB4"];
    var clueString = "";
    var clueStrArray = [];
    clueIds.forEach(elem =>{
        var clueID = document.getElementById(elem).innerHTML;
        if(clueID.includes("well")){
            clueString = clueID.substr(0,3);
            clueStrArray = Array.from(clueString);
            for(var i = 0; i<clueString.length; i++){
                wellPlacedClueArr.push(parseInt(clueStrArray[i]));
            }
        }
        if(clueID.includes("Two")){
            clueString = clueID.substr(0,3);
            clueStrArray = Array.from(clueString);
            for(var i = 0; i<clueString.length; i++){
                twoCorrectClueArr.push(parseInt(clueStrArray[i]));
            }
        }
        if(clueID.includes("One") && clueID.includes("wrongly")){
            clueString = clueID.substr(0,3);
            clueStrArray = Array.from(clueString);
            for(var i = 0; i<clueString.length; i++){
                oneCorrectClueArr.push(parseInt(clueStrArray[i]));
            }
        }

        if(clueID.includes("Nothing")){
            clueString = clueID.substr(0,3);
            clueStrArray = Array.from(clueString);
            for(var i = 0; i<clueString.length; i++){
                noCorrectClueArr.push(parseInt(clueStrArray[i]));
            }
        }

    
    });
    wellplacedIndex = parseInt(document.getElementById("wpIndex").innerHTML);
    corrNotPlacedIndex1 = parseInt(document.getElementById("cnpIndex1").innerHTML);
    corrNotPlacedIndex2 = parseInt(document.getElementById("cnpIndex2").innerHTML);
    wellpacedNum = parseInt(document.getElementById("wpNum").innerHTML);
    corrNotPlacedNum1 = parseInt(document.getElementById("cnpNum1").innerHTML);
    corrNotPlacedIndex2 = parseInt(document.getElementById("cnpNum2").innerHTML);
    
 
}



  function checkAnswer(answer){



    gameWon = checkWellPlaced(answer);

    if(gameWon){
        gameWon = checkTwoCorrect(answer);

        if(gameWon){

            gameWon = checkOneCorrect(answer);
            if(gameWon){
                gameWon = checkNoCorrect(answer);
            }
        }

    }
    gameOver = true;
    
}  

function checkWellPlaced(answer){
    let wpAns = -1;
    let wellpacedCount = 0;

    for(let i = 0; i < answer.length; i++){
        if(wellPlacedClueArr.includes((answer[i]))){
            wpAns = answer[i];
            wellpacedCount++;
        }
    }
    if (wellpacedCount != 1){

        gameWon = false;
    }
    else{

        if(answer.indexOf(wpAns) != wellPlacedClueArr.indexOf(wpAns)){
            gameWon = false;
        }

    
    }
    
    return gameWon;
} 

function checkTwoCorrect(answer){
    let twoCorrectCount = 0;
    let cp1 = -1;
    let cp2 = -1;

    for(let i = 0; i < answer.length; i++){
        if(twoCorrectClueArr.includes(answer[i])){
            if(cp1 < 0){
                cp1 = answer[i];

            }
            else{
                cp2 = answer[i];
            }
            twoCorrectCount++;
        }

    }

    
    if(twoCorrectCount == 2){
        
        if(answer.indexOf(cp1)==twoCorrectClueArr.indexOf(cp1)){
            gameWon = false;
        }
        if (answer.indexOf(cp2)==twoCorrectClueArr.indexOf(cp2)){
            gameWon = false;
        }
        
    }
    else {
        gameWon = false;
    }
 
   
    return gameWon;
}

function checkOneCorrect(answer){
    let oneCorrectCount = 0;
    let correct = -1;
    for(let i = 0; i < answer.length; i++){
        if(oneCorrectClueArr.includes(answer[i])){
            correct = answer[i];
            oneCorrectCount++;
        }
    }
    if (oneCorrectCount != 1){
        gameWon = false;
    }
    else{
        for(let i = 0; i < answer.length; i++){
            if(answer.indexOf(correct)  == oneCorrectClueArr.indexOf(correct)){
                gameWon = false;
                break;
            }
        }
    }
    
   
    return gameWon;

}

function checkNoCorrect(answer){
    for(let i = 0; i < answer.length; i++){
        if(noCorrectClueArr.includes(answer[i])){
            gameWon = false;
            break;
        }
    }
    
   
    return gameWon;
}

function closeThisLost(){
    var lostMessage = document.getElementById("popup-lost");
    lostMessage.style.display = "none";
}


function closeThisWon(){
    var wonMessage = document.getElementById("popup-won");
    wonMessage.style.display = "none";
}

function closeThisPage(){
    var startPage = document.getElementById("start-page");
    startPage.style.display = "none";
}


