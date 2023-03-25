// dark and light mode switch 
let modeLight = document.querySelector('.fa-sun');

let modeDark = document.querySelector('.fa-moon');

let calc = document.querySelector('.calculator');

let swMode = document.querySelector('.switch');

let modes = document.querySelector('.modes');

let toLeft  = false;
let toRight = true;

modeLight.addEventListener('click', () => {
    calc.classList.add('light');
    modeLight.style.color = 'white';
    modeDark.style.color = 'black';
    if(toRight) {
        switchMode('left');
    }
    
});
modeDark.addEventListener('click', () => {
    calc.classList.remove('light');
    modeLight.style.color = 'white';
    modeDark.style.color = 'white';
    if(toLeft) {
        switchMode('right');
    }
    
});
let pos = 0;

function switchMode(dir) {
    if(dir === 'left') {
        toLeft  = true;
        toRight = false;
        let timer = setInterval(animate,8);
        function animate() {
            if(pos === 58) {
                clearInterval(timer);
            }else {
                pos += 2;
                swMode.style.cssText = `transform: translateX(${-pos}px)`;
            }
        }
    }else {
        toLeft = false;
        toRight = true;
        let timer = setInterval(animate,8);
        pos = pos * -1;
        function animate() {
            if(pos === 0) {
                clearInterval(timer);
            }else {
                pos += 2;
                swMode.style.cssText = `transform: translateX(${pos}px)`;
            }
        }
    }   
}
/// modee switch !! 

// for numbers
let btn = document.querySelectorAll('.num');

// for operation
let op = document.querySelectorAll('.op');

// result 
let result = document.querySelector('.final-result');

// dot char
let dot = document.querySelector('.dot');

// equal button !
let equal = document.querySelector('.equal');

let arrOfOperations = ['%','/','*','-','+','.'];

let arrOfNums = ["0","1","2","3","4","5","6","7","8","9"];

dot.addEventListener('click', () => {
    let isFound = false;
    let lastele = result.lastElementChild;
    let isDot = false;
    // making sure that the result is not empty 
    if(lastele !== null) {
        // taking last element as an array to fetch it! 
        let arr = lastele.innerText.split('');
        for(let i = 0; i < arrOfOperations.length; i++) {
            if(arr.at(-1) === arrOfOperations[i] || result.textContent === ''){
                    isFound = true;
            }
        }
        if(!isFound){
            // check that the number only contains one dot ! 
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] === '.') {
                    isDot = true;
                    break;
                }else {
                    isDot = false;
                }
            }
            // no dot found in the number then add dot 
            if(!isDot){
                lastele.append('.');
            }
        }
    }
});

op.forEach( (op) => {
    op.addEventListener('click',() => {
        addOperations(op.textContent);
    })
});
// click button by mouse 
btn.forEach( (num) => {
    num.addEventListener('click',() => {
        Addnumbers(num.textContent);
    });
});

equal.addEventListener('click', () => {
   calcResults();
});

document.body.addEventListener('keypress', (e) => {
   if(e.key === "=" || e.key === "Enter") {
    calcResults();
   }
   for(let i = 0; i < arrOfNums.length; i++) {
        if(e.key === arrOfNums[i]){
            Addnumbers(e.key);
        }
   }
   for(let i = 0; i < arrOfOperations.length; i++) {
        if(e.key === arrOfOperations[i]){
            addOperations(arrOfOperations[i]);
        }
   }
});
function Addnumbers(num) {
    let lastele = result.lastElementChild;
    // make sure there is no elements  
    if(result.children.length === 0) {
        let numDiv = document.createElement('div');
        numDiv.className = 'number';
        result.append(numDiv);
        numDiv.textContent = num;
    } else {
        if(lastele.className === 'opColor') {
            let numDiv = document.createElement('div');
            numDiv.className = 'number';
            result.append(numDiv);
            numDiv.textContent = num;
        }else {
            lastele.textContent += num;
        }
    }
}
function addOperations(op) {
    let isFound = false;
    let arr = result.innerText.split('');
    for(let i = 0; i < arrOfOperations.length; i++) {
        if(arr.at(-1) === arrOfOperations[i] || result.textContent === ''){
                isFound = true;
        }
    }
    if (!isFound){
        let opSpan = document.createElement('span');
        result.appendChild(opSpan);
        opSpan.className = 'opColor';
        opSpan.textContent += op;
    }
}
function calcResults() {
    let resultChildren = result.children;
    if(result.textContent !== '') {
        let str = '';
        for(let i = 0; i < resultChildren.length; i++) {
            str += resultChildren[i].textContent;
        }
        
        result.textContent = '';
        let finalS = eval(str);
        let numDiv = document.createElement('div');
        numDiv.className = 'number';
        result.append(numDiv);
        numDiv.textContent = finalS;
    }
}
////////////////////////////////////////////////////////////////
