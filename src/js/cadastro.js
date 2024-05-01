'use strict'

async function cadastrarUsuario() {
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    let confirmaSenha = document.getElementById('confirmarSenha').value
    let telefone = document.getElementById('telefone').value

    // const responseApi = await fetch('https://back-login.vercel.app/usuarios')
    // const listUsers = await responseApi.json()
    // const validarNomeUsuario=false
    // listUsers.forEach((user) => {
    //     if (listUsers.nome === nome) {
    //         alert('Este nome de usuario já está em uso')
    //     }            
    // })

    if (nome == '' || email == '' || senha == '' || confirmaSenha == '' || telefone == '') {
        alert('Preencha todos os campos')
    }
    else if(nome.indexOf(' ') !== -1){
        alert('O nome de usuario não pode conter espaços')
    }
    else if (senha !== confirmaSenha) {
        alert('Senha incorreta')
    }
    else if(isNaN(telefone)){
        alert('verifique o numero de telefone')
    }
    else {
        const usuario = {
            nome: nome,
            email: email,
            senha: senha
            // telefone: telefone
        }

        console.log(usuario)
        try {
            const url = 'https://back-login.vercel.app/usuarios'
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            }
            console.log(url);
            console.log(options);

            const response = await fetch(url, options)

            console.log(response);
            console.log(response.ok);
            // window.location.href = '../html/home.html'
            return response.ok
        }
        catch (error) {
            console.error(error)
            console.log(error);
        }
    }
}