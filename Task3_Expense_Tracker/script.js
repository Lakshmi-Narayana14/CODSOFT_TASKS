let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");
const date = document.getElementById("date");

const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");
const filterCategory = document.getElementById("filterCategory");

filterCategory.addEventListener("change", displayTransactions);
addBtn.addEventListener("click", addTransaction);

function addTransaction() {

    if (
        description.value === "" ||
        amount.value === "" ||
        date.value === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description.value,
        amount: Number(amount.value),
        type: type.value,
        category: category.value,
        date: date.value
    };

    transactions.push(transaction);
    localStorage.setItem("transaction",JSON.stringify(transactions));

    displayTransactions();
    updateSummary();

    description.value = "";
    amount.value = "";
    date.value = "";
}

function displayTransactions() {

    transactionList.innerHTML = "";

    const filteredTransactions=filterCategory.value==="All"
    ? transactions
    :transactions.filter(item=>item.category=== filterCategory.value);
    filteredTransactions.forEach((item) => {
        const li= document.createElement("li");
        li.innerHTML=`
    
        <div>
            <strong>${item.description}</strong><br>
            ${item.category} | ${item.date}
        </div>

        <div>
            ${item.type === "income" ? "+" : "-"}₹${item.amount}
            <button onclick="editTransaction(${item.id})">
            Edit
            </button>
            <button onclick="deleteTransaction(${item.id})">
            Delete
            </button>

        </div>
    `;

        transactionList.appendChild(li);

    });

}
function editTransaction(id) {

    const item = transactions.find(item => item.id === id);

    description.value = item.description;
    amount.value = item.amount;
    type.value = item.type;
    category.value = item.category;
    date.value = item.date;

    deleteTransaction(id);
}
function deleteTransaction(id){

    transactions = transactions.filter(item => item.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();

    updateSummary();

}
function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach((item) => {

        if (item.type === "income") {
            income += item.amount;
        } else {
            expense += item.amount;
        }

    });

    document.getElementById("income").textContent = `₹${income}`;
    document.getElementById("expense").textContent = `₹${expense}`;
    document.getElementById("balance").textContent = `₹${income - expense}`;

}
updateSummary();
displayTransactions();
