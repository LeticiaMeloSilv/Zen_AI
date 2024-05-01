'use strict'
const btn_entrar = document.getElementById('btn_entrar')

async function validarLogin() {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    if (email == '' || senha == '') {
        alert('Preencha todos os campos')
    }
    else {
        const responseApi = await fetch('https://back-login.vercel.app/usuarios')
        const listUsers = await responseApi.json()
        listUsers.forEach((usuario) => {
            if (email == usuario.email && senha == usuario.senha) {
                localStorage.setItem('idusuario', usuario.id)
                window.location.href = './src/html/home.html'
            }            
            else if (email !== usuario.email || senha !== usuario.senha) {
                alert('Email ou senha incorretos')
            }
        })

    }
}
btn_entrar.addEventListener('click', validarLogin)
