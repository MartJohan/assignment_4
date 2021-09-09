let baseURL = "https://noroff-komputer-store-api.herokuapp.com/";
let url = "https://noroff-komputer-store-api.herokuapp.com/computers";

//Wallet amount
let pay = 0
let payHTML = document.getElementById("pay");

//Bank balance
let balance = 0;
let balanceHTML = document.getElementById("balance");

//Loan boolean
let hasLoan = false;

//Loan amount
let loanAmount = 0;
let loanAmountHTML = document.getElementById("outstandingLoan");

//Repay loan button
let btnRepayLoan = document.getElementById("repayLoan");

let allComputers = [];
let computersHTML = document.getElementById("computers");

document.getElementById("computers").addEventListener("change", changeComputer);

//These are all for placing information about the computer
let computerTitle = document.getElementById("computerTitle");
let computerFeatures = document.getElementById("computerFeatures");
let computerDescription = document.getElementById("computerDescription");
let computerPrice = document.getElementById("computerPrice");
let computerImage = document.getElementById("computerImage");
let btnComputerBuy = document.getElementById("btnComputerBuy");
let computerDiv = document.getElementById("computerDiv");

//Tracks the chosen computer
let currentComputer = undefined;
//Checks if you can take a loan, gives you the loan if possible
function getLoan() {

    if(hasLoan) { alert("You already have a loan, pay it off first");}

    let amount = prompt("How much would you like to loan?", 0);
    if(amount < (balance * 2)) {
        balance += Number.parseInt(amount);
        balanceHTML.innerText = balance.toString();
        hasLoan = true;
        loanAmount = amount;
        loanAmountHTML.innerHTML = loanAmount;
        btnRepayLoan.style.display = "block";
        return;
    } else {
        window.alert("Thats more than double of your current money, work harder!");
        return;
    }
}

//Each time you click the "work" button this function gives you alot of money
function work() {
    pay += 100;
    payHTML.innerText = pay.toString();
}

//Transfers your money to the bank, if you have a loan, 10% will be a transfer fee
function transferToBank() {

    if(hasLoan) {
        loanAmount -= (pay / 10);
        if(loanAmount <= 0) { 
            loanAmount = 0;
             hasLoan = false;
             btnRepayLoan.style.display = "none";
        }

        loanAmountHTML.innerText = loanAmount.toString();

        balance += (pay * 0.9);
        balanceHTML.innerText = balance.toString();

        pay = 0;
        payHTML.innerText = pay.toString();
    } else {
        balance += pay;
        pay = 0;
        payHTML.innerText = pay.toString();
        balanceHTML.innerText = balance.toString();
    }
}

//Repays your loan
function repayLoan() {
    let diff = pay - loanAmount;
    if(diff >= 0) {
        pay -= loanAmount;
        loanAmount = 0;
        hasLoan = false;
    } else {
        loanAmount -= pay;
        pay = 0;
    }
    payHTML.innerText = pay.toString();
    loanAmountHTML.innerText = loanAmount.toString();
}

//Gets all the computers
function fetchComputers() {
    fetch(url).then(response => response.json())
    .then(data => allComputers = data)
    .then(computers => addComputers(computers))
    .catch(err => console.log(err));
}

//Looping through each computer and adds it to the select list
const addComputers = (computers) => {
    computers.forEach(c => {
    const computerElement = document.createElement("option");
    computerElement.value = c.id;
    computerElement.appendChild(document.createTextNode(c.title));
    computersHTML.appendChild(computerElement);
    });
}
//Each time the computer changes in the selection menu
function changeComputer() {
    resetValues(); //Reset all the values on the site
    computerDiv.style.display = "block";
    const computer = allComputers[this.value - 1]
    computerTitle.innerHTML  = computer.title;
    computerDescription.innerHTML = computer.description;

    //For each computer spec, create a p tag and add the spec as a text
    computer.specs.forEach(feature => {
        let tag = document.createElement("p");
        tag.innerText = feature;
        tag.style.fontSize = "0.8rem";
        computerFeatures.appendChild(tag);
    });

    computerPrice.innerHTML = computer.price;
    let img = document.createElement("img");
    img.src = baseURL + computer.image;
    img.onerror = function() {
        img.src = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
    }
    img.alt = "Image of a computer";
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    currentComputer = computer;
    computerImage.appendChild(img);
}

//Tries to buy a computer
function buyComputer() {
    //Find out which computer you want
    //Check the price to the bank balance
    if(currentComputer.price > balance) {
        alert("You do not have sufficient amount of money in your bank, broke boy");
        return;
    }else {
        balance -= currentComputer.price;
        balanceHTML.innerText = balance;
        alert("Congratulations! You are now the new proud owner of a " + currentComputer.title + ", it is quite a beast");
    }
    resetValues();
    
}

//Resets the values on the site
function resetValues() {
    computerTitle.innerHTML = "";
    computerDescription.innerHTML = "";
    while(computerFeatures.firstChild) { computerFeatures.removeChild(computerFeatures.firstChild); }
    computerPrice.innerHTML = "0";
    while(computerImage.firstChild) { computerImage.removeChild(computerImage.firstChild); }
    
}