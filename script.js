// Função de busca
function searchDoces() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("docesTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
}

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Gerenciamento de Carrinho
let cart = [];

function addToCart(product, price) {
    let productIndex = cart.findIndex(item => item.product === product);
    if (productIndex === -1) {
        cart.push({ product, price, quantity: 1 });
    } else {
        cart[productIndex].quantity++;
    }
    updateCartTable();
}

function removeFromCart(product) {
    let productIndex = cart.findIndex(item => item.product === product);
    if (productIndex !== -1) {
        cart[productIndex].quantity--;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    updateCartTable();
}

function updateCartTable() {
    let cartTable = document.getElementById("cartTable").getElementsByTagName('tbody')[0];
    cartTable.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        let row = cartTable.insertRow();
        row.insertCell(0).innerText = item.product;
        row.insertCell(1).innerText = item.quantity;
        row.insertCell(2).innerText = `R$ ${item.price.toFixed(2)}`;
        row.insertCell(3).innerText = `R$ ${(item.price * item.quantity).toFixed(2)}`;
        let actionCell = row.insertCell(4);
        let removeButton = document.createElement('button');
        removeButton.innerText = 'Remover';
        removeButton.onclick = () => removeFromCart(item.product);
        actionCell.appendChild(removeButton);
        total += item.price * item.quantity;
    });
    document.getElementById("cartTotal").innerText = total.toFixed(2);
}

// Gerenciamento de Cadastro
let clients = [];

document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;

    let clientIndex = clients.findIndex(client => client.email === email);
    if (clientIndex === -1) {
        clients.push({ nome, email, telefone });
    } else {
        clients[clientIndex] = { nome, email, telefone };
    }

    updateClientsTable();
    this.reset();
});

function editClient(email) {
    let client = clients.find(client => client.email === email);
    if (client) {
        document.getElementById("nome").value = client.nome;
        document.getElementById("email").value = client.email;
        document.getElementById("telefone").value = client.telefone;
    }
}

function deleteClient(email) {
    clients = clients.filter(client => client.email !== email);
    updateClientsTable();
}

function updateClientsTable() {
    let clientsTable = document.getElementById("clientsTable").getElementsByTagName('tbody')[0];
    clientsTable.innerHTML = '';
    clients.forEach(client => {
        let row = clientsTable.insertRow();
        row.insertCell(0).innerText = client.nome;
        row.insertCell(1).innerText = client.email;
        row.insertCell(2).innerText = client.telefone;
        let actionCell = row.insertCell(3);
        let editButton = document.createElement('button');
        editButton.innerText = 'Editar';
        editButton.onclick = () => editClient(client.email);
        actionCell.appendChild(editButton);
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Excluir';
        deleteButton.onclick = () => deleteClient(client.email);
        actionCell.appendChild(deleteButton);
    });
}
