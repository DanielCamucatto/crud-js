'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active')
    
} 


//CRUD
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (db_client) => localStorage.setItem("db_client", JSON.stringify(db_client));


//function CREATE
const createClient = (client) => {
    const db_client = getLocalStorage();
    db_client.push(client);
    setLocalStorage(db_client)

}

//function READ
const readClient = () => getLocalStorage();

//function UPDATE
const updateClient = (index, client) => {
    const db_client = readClient();
    db_client[index] = client;
    setLocalStorage()
}

//function DELETE
const deleteClient = (index) => {
    const db_client = readClient();
    db_client.slice(index, 1);
    setLocalStorage(db_client)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field'); 
    console.log(fields);
    fields.forEach(field => field.value = "");
}

const saveClient = () => {
    if(isValidFields()){
       const client = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value, 
        phone: document.getElementById('phone').value, 
        city: document.getElementById('city').value
       }
       createClient(client);
       updateTable();
       closeModal();
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr'); 

    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
            <button type="button" class="button green" data-action='edit-${index}' >editar</button>
            <button type="button" class="button red" data-action='delete-${index}' >excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const updateTable = () => {
    const db_client = readClient(); 
    db_client.forEach(createRow);
}

const fillFields = (client) => {
    document.getElementById('name').value = client.name;
    document.getElementById('email').value = client.email;
    document.getElementById('phone').value = client.phone;
    document.getElementById('city').value = client.city;
}

const editClient = (index) => {
    const client = readClient()[index]; 
    fillFields(client);
    openModal()
}

const editDelete = (ev) => {
    if(ev.target.type === 'button'){
        const [action, index] = ev.target.dataset.action.split('-');
        action === 'edit' ? editClient(index) : console.log('deletando cliente');;
    }
}

updateTable()

//EVENT
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('save').addEventListener('click', saveClient); 
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);