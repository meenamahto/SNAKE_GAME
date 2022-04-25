let inputDir={x:0,y:0}
const foodsound=new Audio("fd.mp3")
const oversound=new Audio("over.mp3")
const movesound=new Audio("bg.mp3")
const musicsound=new Audio("music.mp3")
let speed=5;
let score=0;
let lastpainttime=0;
let snakearr=[{x:13,y:15}]
let food={x:6,y:7}
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine()
}
function isCollide(snake){
    // if you bump into yourself:-
    for(let i=1;i<snake.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    // if you bump into wall:-
    if(snake[0].x>18 || snake[0].x<=0 || snake[0].y>18 || snake[0].y<=0){
        return true;
    }
}
function gameEngine(){
    if(isCollide(snakearr)){
        oversound.play()
        movesound.pause()
        inputDir={x:0,y:0}
        alert("game over. press any key to play again!")
        snakearr=[{x:13,y:15}];
        musicsound.play();
        score=0;
    }
    //if you have eaten the food ,increment the score and regenerate the food:-
    if(snakearr[0].y==food.y && snakearr[0].x==food.x){
        foodsound.play()
        score+=1
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML="High Score: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score
        snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    // moving the snake:-
    for(let i=snakearr.length-2;i>=0;i--){
        // const element=array[i];
        snakearr[i+1]={...snakearr[i]}
    }
    snakearr[0].x+=inputDir.x
    snakearr[0].y+=inputDir.y

    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeEliment=document.createElement("div");
        snakeEliment.style.gridRowStart=e.y;
        snakeEliment.style.gridColumnStart=e.x;
        if(index===0){
            snakeEliment.classList.add("head");
        }else{
        snakeEliment.classList.add("snake");
        }
        board.appendChild(snakeEliment);
    });
    foodEliment=document.createElement("div");
    foodEliment.style.gridRowStart=food.y;
    foodEliment.style.gridColumnStart=food.x;
    foodEliment.classList.add("food");
    board.appendChild(foodEliment);
}
main()
// main logic here:-
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="High Score: "+hiscore
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir={x:0,y:0}  //start game
    movesound.play()
    switch(e.key){
        case("ArrowUp"):console.log("ArrowUp")
        inputDir.x=0;
        inputDir.y=-1;
        break
        case("ArrowDown"):console.log("ArrowDown")
        inputDir.x=0;
        inputDir.y=1;
        break
        case("ArrowLeft"):console.log("ArrowLeft")
        inputDir.x=-1;
        inputDir.y=0;
        break
        case("ArrowRight"):console.log("ArrowRight")
        inputDir.x=1;
        inputDir.y=0;
        break
        default:
            break;
    }
})