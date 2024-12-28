'use strict';

//CONSTS
const roll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
let score1= 0;
let current1 = document.querySelector('#current--0');
let score2 = 0;
let current2 = document.querySelector('#current--1');
const active1 = document.querySelector('.player--0');
const active2 = document.querySelector('.player--1');
let use,useNot,useCurrent,useHigh;
let useScore = 0;

let useHold = 0;
const hold = document.querySelector('.btn--hold');
const high1 = document.querySelector('#score--0');
const high2 = document.querySelector('#score--1');

const newBtn = document.querySelector('.btn--new');

let win = false;
//FUNCTIONALITIES
function Dice(visible){
    if(visible){
        dice.classList.remove('hidden');
        //dice.style.height = '0rem';
    }else{
        dice.classList.add('hidden');
        //dice.style.height = '10rem';
    }
    }

function deactive(act1,act2){
    act1.classList.remove('player--active');
    act2.classList.add('player--active');
    //classlist ->add,remove,contains,toggle
    //toggle ->adds the class if it IS-NOT there and remove is it IS there
}
function scoreZero(score,current){
    score=0;
    current.textContent = score;
    return score;
}

function enter(){
    if(!win){
    useHold += useScore;
    useHigh.textContent = useHold;
    console.log(useHold);
    if(useHold >= 20){
        win = true;
        use.classList.remove('player--active');
        use.classList.add('player--winner');
        Dice();
    }else{
    deactive(use,useNot);
    useScore=scoreZero(useScore,useCurrent);
    }
}
}

function esc(){
    useHold = 0;
    win = false;
    Dice(false);
    scoreZero(useScore,useCurrent)
    use.classList.remove('player--winner');
    deactive(active2,active1);
    scoreZero(Number(high1.textContent),high1);
    scoreZero(Number(high2.textContent),high2);
}

function rollIt(){
    if(!win){
    Dice(true);
    let randNum = Math.trunc(Math.random()*6)+1;

    dice.src = `dice-${randNum}.png`;

    // switch (randNum){
    //     case 1:
    //         console.log('1');
    //         dice.src="dice-1.png";
    //         break;
    //     case 2:
    //         dice.src="dice-2.png";
    //         console.log('2');
    //         break;
    //     case 3:
    //         dice.src="dice-3.png";
    //         console.log('3');
    //         break;
    //     case 4:
    //         dice.src="dice-4.png";
    //         console.log('4');
    //         break;
    //     case 5:
    //         dice.src="dice-5.png";
    //         console.log('5');
    //         break;
    //     case 6:
    //         dice.src="dice-6.png";
    //         console.log('6');
    //         break;
    // };
    function scoreAdd(score,current){
        score+=randNum;
        current.textContent = score;
        return score;
    } 
    if(active1.classList.contains('player--active')){
        use = active1;
        useScore += score1;
        useHold = Number(high1.textContent);
        useCurrent = current1;
        useHigh = high1;
        useNot = active2;
    }else{
        use = active2;
        useScore += score2;
        useHold = Number(high2.textContent);
        useCurrent = current2;
        useHigh = high2;
        useNot = active1;
    }
    if(randNum!==1){
        useScore=scoreAdd(useScore,useCurrent);
    }else if (randNum===1){
        useScore=scoreZero(useScore,useCurrent);
        useHold=scoreZero(useHold,useHigh);
        deactive(use,useNot);
    }
}
}


Dice(false);
//clicks
roll.addEventListener('click',function(){
    rollIt();
    
});

hold.addEventListener('click',function(){
    enter();
})

newBtn.addEventListener('click',function(){
    esc();
})

document.addEventListener('keydown',function(e){
    if(e.key === 'Escape'){
        esc();
    }
    else if(e.key === 'Enter'){
        enter();
    }
    else if(e.key === ' '){
        rollIt();
    }
})