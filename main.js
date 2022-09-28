'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "teste1", 
    email: "teste@testa.com", 
    celular: "11123459876", 
    cidade: "São Paulo"
}    

//CRUD
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (db_client) => localStorage.setItem("db_client", JSON.stringify(db_client));
//func CREATE

const createClient = (client) => {
    const db_client = getLocalStorage();
    db_client.push(client);
    setLocalStorage(db_client)
    
}

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)