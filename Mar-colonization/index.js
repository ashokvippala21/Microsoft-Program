var max_depth = 2;
var count = 0;
var best_move = [];
//all possible  win Combos
function initiate_players(comp,user){
	player = comp;
	opponent = user;
}

function findBestSpot(curBoardState){
	var bestMove = -Infinity;
	let pos = -1;
	let val ;
	for(let i=0; i<9 ;i++){
		if(curBoardState[i]===''){
			curBoardState[i] = player;
			val = minimax(curBoardState,0,false);//returns the value
			curBoardState[i]='';

			if(val>bestMove ){
				bestMove = val;
				
				pos = i;
			}
		}
	}
	count=0;
	return pos;
}

function minimax(curBoardState,depth,isMax){
	let score = checkWin(curBoardState);
	let val;
	
	if(score == 10){
		return score - depth ; //score for computer winning
	}
	else if(score == -10){
		return depth+score; 
	}
	else if(!isCellEmpty(curBoardState)){
		return 0;
	}

	else{
		if(isMax){
			let bestVal = -Infinity;
			for(let i=0;i<9;i++){
				if(curBoardState[i]==''){
					curBoardState[i] = player;
					val = minimax(curBoardState,depth+1,!isMax);

					if(val>bestVal){
						bestVal = val;
					}
					curBoardState[i] = '';
				}
			}
			return bestVal;

		}
		else{
			let bestVal = Infinity;
			for (let i=0;i<9;i++){	
				if(curBoardState[i]==''){
					curBoardState[i] = opponent;
					val = minimax(curBoardState,depth+1,!isMax);
					if(val<bestVal){
						bestVal = val; 
					}
					curBoardState[i] ='';
				}
			}
			return bestVal;
		}
	}

}


function checkWin(curBoardState){
	let winner = '';
	var line=[];
	for (let i=0;i<winningLine.length;i++){
		line = winningLine[i];
		if(curBoardState[line[0]]==curBoardState[line[1]]&&
			curBoardState[line[1]]==curBoardState[line[2]]&&
			curBoardState[line[0]]!=''){
			winner = curBoardState[line[0]];
			break;
		}
	}
	if(winner == player){
		return 10; 
	}
	else if(winner == opponent){
		return -10;
	}
	else{
		return 0;
	}

}

function isCellEmpty(curBoardState){
	for (let i=0;i<9;i++){
		if(curBoardState[i]==''){
			return true;
		}
	}
	return false;
}
