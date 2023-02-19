class Expense {
    name: string;
    amount: number;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}

let expenses: Expense[] = [];

const expenseForm = document.getElementById('expense-form') as HTMLFormElement;
const expenseTable = document.getElementById('expense-table') as HTMLTableElement;

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const expenseName = (document.getElementById('expense-name') as HTMLInputElement).value;
    const expenseAmount = (document.getElementById('expense-amount') as HTMLInputElement).value;

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