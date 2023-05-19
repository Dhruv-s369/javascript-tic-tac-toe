const gameBoard = document.getElementById("gameboard");
const infoDisplay = document.getElementById("info");

const startCells = ["", "", "", "", "", "", "", "", ""];

let randomFirstChance = "circle";
infoDisplay.textContent = "Circle will have a chance first! :)";

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addElements);
    gameBoard.append(cellElement);
  });
}

createBoard();

function addElements(e) {
  //   console.log(e.target);
  const elementsDisplay = document.createElement("div");

  elementsDisplay.classList.add(randomFirstChance);

  e.target.append(elementsDisplay);

  randomFirstChance = randomFirstChance == "circle" ? "cross" : "circle";

  infoDisplay.textContent = "It is now " + randomFirstChance + "'s chance.";
  e.target.removeEventListener("click", addElements);

  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  //important.

  /* 
  
  so, for each array in winningCombos array we will take each array and inside that array for every `cell` i.e. 0,1 or 2, we will grab the 0 and we will put that in allSquares array, 
  
  for e.g.: if we get console.log(allSquares[0]) and pass 0, we will get back the div element with the id=0, because we grab all the squares, all 9 of them and pass to a 0 so it brought back the first item.


  similarly, 

  If we pass 4 instead of 0, we will get back the id of 4. 

  Now, moving forward,

  whatever we pass, 0, 1 or 2, has a child element that also contains a class called circle, then its true. a winning combo does exists.

   */

  //if circle wins
  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      ); //we can't remove the event listener so thats why used this.
      return;
    }
  });

  //if cross wins
  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      ); //we can't remove the event listener so thats why used this.
      return;
    }
  });
}
