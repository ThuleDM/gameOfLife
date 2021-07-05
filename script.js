const ALIVE_CLASS = "aliveSquare";
const DEAD_CLASS = "deadSquare";
let length = 10;
let width = 10;
let timerId;
let clear = document.createElement("button");
let oneStep = document.createElement("button");
let run = document.createElement("button");
let stopp = document.createElement("button");
let box = document.createElement("div");
let buttons = document.createElement("div");
document.body.appendChild(box);
document.body.appendChild(buttons);

clear.innerHTML = "clear";
oneStep.innerHTML = "one step";
run.innerHTML = "run";
stopp.innerHTML = "stop";
box.className = "box";
buttons.className = "buttons";

let fields  = new Array(length);
let nextStep = new Array(length); 
for(let i = 0;i<length;i++){
    fields[i] = new Array(width);
}
for(let i = 0;i<length;i++){
    nextStep[i] = new Array(width);
}

for(let i = 0;i<length; i++){
    for(let j = 0;j<width;j++){
        let square = createSquare();
        box.appendChild(square);
        fields[i][j] = square;
    }
    let br = document.createElement("br");
    box.appendChild(br);
}

function createSquare(){
    let square = document.createElement("div");
    square.className = DEAD_CLASS;
    square.addEventListener('click' , ()=>{
        if(square.className ==ALIVE_CLASS){
            square.className = DEAD_CLASS;
        }else{
            square.className = ALIVE_CLASS;;
        }
    })
    return square;
}

function nextStepButton (){
    calculateNextStep();
    applyNextStep();
}

function calculateNextStep() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < length; j++) {
            let aliveNeightbours = getAliveNeightboursNumber(i, j);
            // console.log(aliveNeightbours);
            if (aliveNeightbours == 3) {
                // console.log("alive :" + i + " :" + j + " соседи :" + aliveNeightbours);
                nextStep[i][j] = ALIVE_CLASS;
            }
            else if (aliveNeightbours !== 2) {
                nextStep[i][j] = DEAD_CLASS;
            }
        }
    }
}
function applyNextStep(){
    for(let i = 0;i<length; i++){
        for(let j = 0;j<width;j++){
            if(nextStep[i][j] == ALIVE_CLASS){
                fields[i][j].className = ALIVE_CLASS;
            }else if (nextStep[i][j] == DEAD_CLASS){
                fields[i][j].className = DEAD_CLASS;
            }
        }
    }   
}
function getAliveNeightboursNumber(i,j){
    let aliveNeightbours = 0;
    [i-1 ,i, i+1].forEach((w)=>{
        [j-1,j,j+1].forEach((l)=>{
            if(
                !(w == i && l==j)&&
                 (w >=0 && l >=0) && (w < width && l <length)
            ){
                if(fields[w][l].className == ALIVE_CLASS){
                    aliveNeightbours++;
                }
            }
        })
    })
    return aliveNeightbours;
}
buttons.appendChild(clear);
buttons.appendChild(oneStep);
buttons.appendChild(run);
buttons.appendChild(stopp);
oneStep.addEventListener('click', nextStepButton);
let noChange = "NO CHANGE";
clear.addEventListener('click' , ()=>{
    for(let i = 0;i<length; i++){
        for(let j = 0;j<width;j++){
            fields[i][j].className = DEAD_CLASS;
            nextStep[i][j] = noChange;
        }
    } 
    clearInterval(timerId);
    if(run.disabled || stopp.disabled){
        run.disabled =0;
        stopp.disabled =0;
    }
})
function runGame(){
    run.disabled = 1;
    stopp.disabled = 0;
    timerId = setInterval(nextStepButton , 1000);
}
function stopGame(){
    stopp.disabled = 1;
    run.disabled = 0;
    clearInterval(timerId);
}
run.addEventListener('click' ,runGame);
stopp.addEventListener('click' ,stopGame);

for(let i = 0;i<length; i++){
    for(let j = 0;j<width;j++){
        fields[i][j].addEventListener('mouseover' , (event)=>{
            if(event.shiftKey){
                if(fields[i][j].className == DEAD_CLASS){
                    fields[i][j].className = ALIVE_CLASS;
                }else{
                    fields[i][j].className = DEAD_CLASS;
                }
            }
        })
    }
} 
