"use strict";
class Expense {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}
let expenses = [];
const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table');
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;
    const expense = new Expense(expenseName, parseFloat(expenseAmount));
    expenses.push(expense);
    updateExpenseTable();
});
// function updateExpenseTable() {
//     expenseTable.innerHTML = '';
//     expenses.forEach((expense) => {
//         const row = document.createElement('tr');
//         const nameCell = 
//     }
// }
