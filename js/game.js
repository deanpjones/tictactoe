var playerPick = "X";
var gameover = false;
var winner = false;
var grid = [];

//--------------------------------------------------
//--------------------------------------------------
//GAME LOOP
function pick(button){
    var id = button.id;                     //get current id (button picked)
    var p = document.getElementById(id);
    //console.log(p.__proto__);
    var currentPick = p.lastElementChild.innerHTML;
    
    //--------------
    //check if blank
    if(!gameover){                  //see if game is done
        if(currentPick != ""){      //test for picked already
            console.log("this square has been picked already")
        }
        //fill in with player('x' or 'o') square
        else{
            p.lastElementChild.innerHTML = playerPick;

            if(playerPick == "X"){
                playerPick = "O";
                checkGame();
            }
            else{
                playerPick = "X";
                checkGame();
            }
        }
    }
    //--------------
    
}
//--------------------------------------------------
//--------------------------------------------------

    //check win
    function checkGame(){
        updateGrid();
        checkGridForWin('X');
        checkGridForWin('O');
        checkForDraw();
    }

    //check function
    function checkWin(_X, a, b, c){
        if(grid[a] == _X && grid[b] == _X && grid[c] == _X){
            
            //highlight (3-in-a-row)
            updateViewWin(a, b, c); 

            gameover = true;   
            return gameover;
        }
    }

    //update view for draw
    function updateViewDraw(){               
        for(var i = 0; i < 9; i++){
            var temp = document.getElementById("c" + i);
            //set to win (green - success)
            var winColor = '#8080ff';
            temp.setAttribute('fill', winColor);
        }
    }

    //update view for win
    function updateViewWin(a, b, c){
        //get grid elements
        var a1 = document.getElementById("c" + a);
        var b1 = document.getElementById("c" + b);
        var c1 = document.getElementById("c" + c);
        //set to win (green - success)
        var winColor = '#80ff80';
        a1.setAttribute('fill', winColor);
        b1.setAttribute('fill', winColor);
        c1.setAttribute('fill', winColor);

    }

    //test for win
    function checkGridForWin(player){                
        //check rows
        if(
        checkWin(player, 0, 1, 2) ||
        checkWin(player, 3, 4, 5) ||
        checkWin(player, 6, 7, 8) ||

        //check columns
        checkWin(player, 0, 3, 6) ||
        checkWin(player, 1, 4, 7) ||
        checkWin(player, 2, 5, 8) ||

        //check diagonals
        checkWin(player, 0, 4, 8) ||
        checkWin(player, 2, 4, 6)
        
        ){
            winner = true;
            console.log(player + " wins...")
        }                                       
    }
     
    //update grid 
    function updateGrid(){
        grid = [
        document.getElementById("txt0").innerHTML,
        document.getElementById("txt1").innerHTML, 
        document.getElementById("txt2").innerHTML,

        document.getElementById("txt3").innerHTML,
        document.getElementById("txt4").innerHTML, 
        document.getElementById("txt5").innerHTML,

        document.getElementById("txt6").innerHTML,
        document.getElementById("txt7").innerHTML, 
        document.getElementById("txt8").innerHTML
        ];
    }

    //grid is full
    function gridIsFull(){
        return grid.indexOf("") == -1;
    }

    //check for draw
    function checkForDraw(){          
        if(gridIsFull() && !winner){

            //update view for draw
            updateViewDraw();

            gameover = true;
            console.log("it's a draw");
        }
    }
