'use strict'
const btn_entrar = document.getElementById('btn_entrar')

async function validarLogin() {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    console.log(senha);
    if (email == '' || senha == '') {
        alert('Preencha os campos corretamente')
    }

    else if (email == ! "adm@adm" && email == !'' || senha == ! "123" && senha == !'') {
        alert('Email ou senha incorretos')

    }
    else if (email == 'adm@adm' && senha == "123") {
        window.location.href = './src/html/home.html'
    }
}

btn_entrar.addEventListener('click', validarLogin)

