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

//Checks if you can take a loan
function getLoan() {

    if(hasLoan) { alert("You already have a loan, pay it off first");}

    let amount = prompt("How much would you like to loan?", 0);

    if(amount < (balance * 2)) {
        balance += Number.parseInt(amount);
        balanceHTML.innerHTML = balance.toString();
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

function work() {
    pay += 100;
    payHTML.innerHTML = pay.toString();
}

function transferToBank() {

    if(hasLoan) {
        loanAmount -= (pay / 10);
        if(loanAmount <= 0) { 
            loanAmount = 0;
             hasLoan = false;
             btnRepayLoan.style.display = "none";
        }

        loanAmountHTML.innerHTML = loanAmount.toString();

        balance += (pay * 0.9);
        balanceHTML.innerHTML = balance.toString();

        pay = 0;
        payHTML.innerHTML = pay.toString();
    } else {
        balance += pay;
        pay = 0;
        payHTML.innerHTML = pay.toString();
        balanceHTML.innerHTML = balance.toString();
    }
}

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
    payHTML.innerHTML = pay.toString();
    loanAmountHTML.innerHTML = loanAmount.toString();
}

