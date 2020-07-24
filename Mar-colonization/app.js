var x_player = document.getElementById("x_player");
var o_player = document.getElementById("o_player");
var turn = document.getElementById('turn');
var comp= '';
var user = '';
var cells = document.querySelectorAll('.cell');
//var curBoardState = [];
var moveCount = 0;
var winner = '';
var winLine='';
var body = document.getElementById('#board');
var reset = document.getElementById('reset');
var winDisplay = document.getElementById('win');
var userScore=0;
var compScore=0;
var scoreC = document.getElementById('compscore');
var scoreU = document.getElementById('userscore');
var flag = 0; // checks if any winner
var flag1 = 0; 
var gameType = document.getElementById("gameType");
var humanVScomputer = document.getElementById("humanVScomputer");
var hint = document.getElementById("hint");
var radioChecked;
var levelChange = document.getElementById('level_change');
var boardState = [];
var notSelected;
var flag_level = 0;

var winningLine = [
  [0,1,2],
  [0,3,6],
  [3,4,5],
  [1,4,7],
  [6,7,8],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  ]
function radioButtonCheck(){
	var element = document.getElementsByName("choice");
	for(let i=0;i<element.length;i++){
		if(element[i].checked){
			return element[i].id;
		}
	}
}


//whose turn
function setTurn(current_player){
	var temp = "Turn: "
	document.getElementById("turn").innerHTML = temp.concat(current_player);
}

function main_levels(){
	console.log("hey i am dumb are you also??");
	humanVScomputer.disabled = true;
	radioChecked = radioButtonCheck();
	intialize_level();
	moveCount = 0;
	cells.forEach((cell)=>{
		cell.innerHTML = '';
	});

	x_player.addEventListener('click',()=>{
		x_player.disabled = true;
		o_player.disabled = true;
		user = 'X';
		comp = 'O';
		radioChecked = radioButtonCheck();
		initiate_players(comp,user);
		setTurn(user);

	});

	o_player.addEventListener('click',()=>{
		o_player.disabled = true;
		x_player.disabled = true;
		user = 'O';
		comp = 'X';
		setTurn(comp);
		radioChecked = radioButtonCheck();
		if(radioChecked == 'easiest'){
			var pos = easiest(boardState);
		}else if(radioChecked == 'better'){
			var pos = medium(boardState);
		}else if(radioChecked == 'hard'){
			var pos = hard(boardState)
		}else if(radioChecked == 'extremely-hard'){
			initiate_players(comp,user);
			var pos = findBestSpot(boardState);
		}
		boardState[pos] = comp;
		cells[pos].innerHTML = 'X';
	});

	cells.forEach((cell)=>{
		cell.addEventListener('click',()=>{
			if(cell.innerHTML === ''&& user!=''&&moveCount<9){
				moveCount++;
				if(flag_level == 0){
					cell.innerHTML = user;
					boardState[parseInt(cell.id)] = user;
					getResults_levels(boardState);
				}
				
				if(winner==='' && moveCount<9){
					setTurn(comp);
					moveCount++;
					if(radioChecked == 'easiest'){
						var pos = easiest(boardState);
					}else if(radioChecked == 'better'){
						var pos = medium(boardState);
					}else if(radioChecked == 'hard'){
						var pos = hard(boardState);
					}else if(radioChecked == 'extremely-hard'){
						initiate_players(comp,user);
						var pos = findBestSpot(boardState);
					}
					if(flag_level == 0){
						boardState[pos] = comp;
						cells[pos].innerHTML = comp;
						getResults_levels(boardState);	
					}
					setTurn(user);
				}
			}
		});
	});
	
	hint.addEventListener('click',getHint_computer);
	reset.addEventListener('click',reset_level);



}

//hints
function getHint_computer(){
	if(winner == ''&& moveCount<9 && comp!='' &&user!=''){
	initiate_players(user,comp);
	var pos = findBestSpot(boardState);
	initiate_players(comp,user);
	document.getElementById(pos).classList.add('box-hint');
	cells.forEach((cell)=>{
		cell.addEventListener('click',()=>{
			document.getElementById(pos).classList.remove("box-hint");
		});
	})
}
}



function reset_level(){
	boardState = ['','','','','','','','',''];
	x_player.disabled = false;
	o_player.disabled = false;
	winner = '';
	moveCount = 0;
	user = '';
	comp = '';
	flag_level = 0;
	winDisplay.innerHTML = '';
	setTurn('');
	radioChecked = radioButtonCheck();
	cells.forEach((cell)=>{
		cell.innerHTML = '';
		cell.classList.remove('box-win');
		cell.classList.remove('box-hint');
		cell.classList.add('box-reset');
	});
}


//Block the opponent 
function medium(curBoardState){
	var line = [];
	for (let i=0;i<winningLine.length;i++){
		line = winningLine[i];
		if(curBoardState[line[0]] == curBoardState[line[1]] &&
		 curBoardState[line[0]]!='' && curBoardState[line[0]] == user && curBoardState[line[2]] == ''){
			return line[2];

		}else if(curBoardState[line[1]] == curBoardState[line[2]] && 
			curBoardState[line[1]]!='' && curBoardState[line[1]] == user && curBoardState[line[0]] ==''){
			return line[0];
		}else if(curBoardState[line[0]] == curBoardState[line[2]] && 
			curBoardState[line[0]]!='' && curBoardState[line[2]] == user && curBoardState[line[1]] == ''){
			return line[1];
		}
	}
	for(let i=0;i<9;i++){
		if(curBoardState[i]==''){
			return i;
		}
	}

}

function hard(curBoardState){
	var line; //Countering the opponent
	for (let i=0;i<winningLine.length;i++){
		line = winningLine[i];
		if(curBoardState[line[0]] == curBoardState[line[1]] &&
		 curBoardState[line[0]]!='' && curBoardState[line[0]] == user && curBoardState[line[2]] == ''){
			return line[2];

		}else if(curBoardState[line[1]] == curBoardState[line[2]] && 
			curBoardState[line[1]]!='' && curBoardState[line[1]] == user && curBoardState[line[0]] ==''){
			return line[0];
		}else if(curBoardState[line[0]] == curBoardState[line[2]] && 
			curBoardState[line[0]]!='' && curBoardState[line[2]] == user && curBoardState[line[1]] == ''){
			return line[1];
		}
	}

	// this loop will check whether any move can make the computer win
	for(let i=0;i<winningLine.length;i++){
		line = winningLine[i];
		if(curBoardState[line[0]] == curBoardState[line[1]] &&
		 curBoardState[line[0]]!='' && curBoardState[line[0]] == comp && curBoardState[line[2]] == ''){
			return line[2];

		}else if(curBoardState[line[1]] == curBoardState[line[2]] && 
			curBoardState[line[1]]!='' && curBoardState[line[1]] == comp && curBoardState[line[0]] ==''){
			return line[0];
		}else if(curBoardState[line[0]] == curBoardState[line[2]] && 
			curBoardState[line[0]]!='' && curBoardState[line[2]] == comp && curBoardState[line[1]] == ''){
			return line[1];
		}

	}
	//no above condition return an empty box then
	for(let i=0;i<9;i++){
		if(curBoardState[i] == ''){
			return i;
		}
	}
}


function intialize_level(){
	for(let i=0;i<9;i++){
		boardState[i]='';
	}
}

function getResults_levels(curBoardState){
	winLine = null;
	for(let i =0;i<winningLine.length;i++){
		let line_level = winningLine[i];
		if(curBoardState[line_level[0]]==curBoardState[line_level[1]]&&
			curBoardState[line_level[1]]==curBoardState[line_level[2]]&&
			curBoardState[line_level[0]]!=''){
			var won =line_level;
			winner = curBoardState[line_level[0]];
			break;
		}
	}
	if(moveCount == 9 && winner == ''){
		winDisplay.innerHTML = 'Draw match';
		for(let i=0;i<9;i++){
			document.getElementById(i).classList.remove('cell:hover');
			document.getElementById(i).classList.add('box-cancel');
			document.getElementById(i).classList.remove('box-reset');
			document.getElementById(i).disabled = true;
		}
		setTurn('');
	}
	if(winner!=''){
		flag_level = 1;
		if(winner == user){
			scoreU.innerHTML = ++userScore;
		}else{
			scoreC.innerHTML = ++compScore;
		}
		win(won);
	}
}

		

function easiest(curBoardState){
	for(let i=0;i<9;i++){
		if(curBoardState[i]===''){
			return i;
		}
	}
}



function getResults(){
	if(moveCount==9 && winner==''){
		winDisplay.innerHTML = "It is a Draw!!";
		setTurn('');
	}
	winLine = null;
	for(let i=0;i<winningLine.length;i++){
		let line = winningLine[i];
		if(curBoardState[line[0]]==curBoardState[line[1]]&&
			curBoardState[line[1]]==curBoardState[line[2]]&&
			curBoardState[line[0]]!=''){
			winLine=line;
			winner = curBoardState[line[0]];
			break;
		}
	}
	if(winner!=''){
		if(winner==user){
			scoreU.innerHTML = ++userScore;
		}else{
			scoreC.innerHTML = ++compScore;
		}
		win(winLine);
	}
}

function win(line){
	var tem = "The winner is "
	winDisplay.innerHTML =tem.concat(winner);
	flag = 1;
	for(let i = 0;i<line.length;i++){
		document.getElementById(line[i]).classList.remove('cell:hover');
		document.getElementById(line[i]).classList.add('box-win');
	}

	for(let i=0;i<9;i++){
		document.getElementById(i).classList.remove('cell:hover');
		document.getElementById(i).classList.add('box-cancel');
		document.getElementById(i).classList.remove('box-reset');
		document.getElementById(i).disabled = true;
	}

}
