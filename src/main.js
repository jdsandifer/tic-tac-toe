// Set button click listeners. jQuery wasn't working for me
// for some reason for these so I just worked around it for now.
// Works fine elsewhere...
for (let id = 1; id <= 9; id++) {
   document.getElementById(id).onclick = function() {
      update(id);
   };
}
document.getElementById('switch').onclick = function() {
      switchPlaces();
   };

// Data for Tic Tac Toe AI.
const data = {
  	aiCharacter: 'o',
	playerCharacter: 'x',
	startingCharacter: 'x',
	board: [
      'e','e','e',
		'e','e','e',
		'e','e','e']
};

const update = (position) => {
   if (isAvailable(position)) {
      changePosition(position, data.playerCharacter);
      if(checkBoard(data) === 'not-end') {
         setTimeout(aiMove(data),500);
      }
   }
};

const isAvailable = (position) => {
   return data.board[position-1] === 'e';
};

const changePosition = (position, char) => {
   $('#'+position).html(char);
   data.board[position-1] = data.playerCharacter;
};

const aiMove = (data) => {
   let newBoard = AI.getBoardAfterAIMove(data);
   for (let i = 0; i < data.board.length; i++) {
      data.board[i] = newBoard[i];
   }
   console.log("aiMove", data, "ea");
   updateBoard(data);
   checkBoard(data);
   return data;
};

const checkBoard = (data) => {
   let status = AI.getStateOfGame(data.board);
   console.log("check",status);
   if (status === 'not-end') {
      return status;
   } else if (status === `${data.aiCharacter}-won`) {
      displayResult('ai');
      setTimeout(newGame, 100);
   } else if (status === `${data.playerCharacter}-won`) {
      displayResult('player');
      setTimeout(newGame, 100);
   } else if (status === 'draw') {
      displayResult('draw');
      setTimeout(newGame, 100);
   }
   return status;
};

const displayResult = (winner) => {
   console.log("display", winner);
   let message = 'It was a draw. Try again!';
   if (winner === 'ai') {
      message = 'The A.I. won. Try again!';
   } else if (winner === 'player') {
      message = 'You won! Keep it up.';      
   }
   setTimeout(function(){alert(message);},10);
}

const updateBoard = (data) => {
   for (let i = 0; i < data.board.length; i++) {
      if(data.board[i] !== 'e') {
         $('#'+(i+1)).html(data.board[i]);
      } else {
         $('#'+(i+1)).html('');
      }
   }
};

const newGame = () => {
   for (let e = 0; e < data.board.length; e++) {
      data.board[e] = 'e';
   }
   updateBoard(data);
   if (data.aiCharacter === data.startingCharacter) {
      aiMove(data);
   }
   return data;
};

const switchPlaces = () => {
   if (data.playerCharacter === 'x') {
      data.playerCharacter = 'o';
      data.aiCharacter = 'x';
   } else {
      data.playerCharacter = 'x';
      data.aiCharacter = 'o';
   }
   newGame();
};
