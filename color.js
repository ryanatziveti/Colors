//TODO
//Refactor this to be DRY

//Define colors array
var numSquares = 6;
var colors = generateRandomColors(numSquares);
// [
//     "rgb(255, 0, 0)",
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 255, 255)",
//     "rgb(0, 0, 255)",
//     "rgb(255, 0, 255)"
// ];    

//Create variable that holds the array of squares
var squares = document.querySelectorAll(".square");
//Variable to hold the random picked color from the colors array
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");






//When easy or hard button is clicked
easyBtn.addEventListener("click", function(){
    //toggle selected
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    //generate new boxes
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    //Loop through and set last three squares to not display
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function(){
    //toggle selected
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    //generate new boxes
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    //Loop through and set new colors and show all six
    for(var i =0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }
});

resetButton.addEventListener("click", function(){
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick new random colors
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    this.textContent = "New Colors";
    //change colors of the squares
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
    //change h1 background color to default (dark)
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
});

colorDisplay.textContent = pickedColor;

//Loop through the squares and assign each square to a color from the colors array
for(var i = 0; i < squares.length; i++){
    //Add initial colors to the squares
    squares[i].style.backgroundColor = colors[i];

    //Add the click listeners to the squares
    squares[i].addEventListener("click", function(){
        //Grab color of picked square
        var clickedColor = this.style.backgroundColor;
        //debugging
            //console.log("picked: "+ pickedColor + " | clicked: " + clickedColor);
        //Compare color of picked to goal color
        if(clickedColor === pickedColor){
            messageDisplay.textContent="Correct";
            //change text of reset button to play again
            resetButton.textContent = "Play Again";
            changeColors(clickedColor);
            //change h1 background color to match
            h1.style.backgroundColor = clickedColor;
        }
        else{
            //Fades to background color to "disappear"
            this.style.backgroundColor = "#232323";
            //Displays message to user
            messageDisplay.textContent = "Try Again";
        }
    });
}

function changeColors(color){
    //loop through all squares
    for(var i = 0; i < squares.length; i++){
    //change all squares to match winning
    squares[i].style.backgroundColor = color;
    }    
}

function pickColor(){
    //creates random number that is used to select from colors[i]
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    //make an array 
    var arr = [];
    //repeat num times
    for(var i = 0; i < num; i++){
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array  
    return arr;
}

function randomColor(){
    //pick a red from 0-255
    var r = Math.floor(Math.random() * 256);
    //pick a green from 0-255
    var g = Math.floor(Math.random() * 256);
    //pick a blue from 0-255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
