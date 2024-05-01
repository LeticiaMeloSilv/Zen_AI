'use strict'

const container = document.getElementById('atividades')

const idPerfil = localStorage.getItem('idusuario')
console.log(idPerfil);
if (!idPerfil) {
    window.location.href = '../../index.html'
}
async function pegarUsuariosBack() {
    const responseApi = await fetch('https://back-login.vercel.app/usuarios')
    const listUsuarios = await responseApi.json()
    return listUsuarios
}

async function criarMenssagem() {
    const pergunta_usuario = document.getElementById('pergunta_usuario').value
    const main = document.getElementById('main')
    const p_pergunta = document.createElement('p')
    p_pergunta.textContent = pergunta_usuario
    p_pergunta.classList.add('pergunta_user')
    // console.log(pergunta_usuario);
    /*****************************************************************************************************************
     * os codigos comentados a seguir, fariam com que enquanto a ia não respondesse, a caixa de texto dela seria
     * inicializada com tres pontinhos, para mostrar ao usuario que a pergunta está sendo processada, mas essa
     * ideia foi tirada de ar pois, com essa linha de pensamento, a aplicacao iria substiruir o texto das tags p,
     * e não criar uma nova caixa de mensagem
    
        const p_resposta = document.createElement('p')
        p_resposta.classList.add('resposta_ia')
        p_resposta.id='p_resposta'
        p_resposta.textContent='...'
        main.replaceChildren(p_pergunta,p_resposta)
    *****************************************************************************************************************/
    main.appendChild(p_pergunta)
}


const button = document.getElementById('pergunta_usuario')

const consultaGemini = (question) => {
    const keyGoogle = 'AIzaSyBZaybh57iVi23jcLvzuIrabNG4f3td60A'
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle;
    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `${question}`
                    }
                ]
            }
        ]
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            const responseTextIa = data.candidates[0].content.parts[0].text
            respostaIa(responseTextIa)
            // console.log(responseTextIa);

        })
        .catch(error => console.error('Error: ', error))
}


const respostaIa = (responseTextIa) => {

    const p_resposta = document.createElement('p')
    p_resposta.classList.add('resposta_ia')
    const main = document.getElementById('main')
    //tambem retirado pelo mesmo motivo anteriormente dito
    // const p_resposta = document.getElementById('p_resposta')
    const textoFormatado = responseTextIa.replaceAll("*", "\n");
    /******************************************************************************************************************
    * por mais que tenha o seguinte comando, o que está aparecendo para o usuario,
    * não está indo com essa alteracao, motivo=??
        .replace("*", "\n")
    ******************************************************************************************************************/
    p_resposta.textContent = textoFormatado

    main.appendChild(p_resposta)

}

button.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        const question = document.getElementById('pergunta_usuario').value
        consultaGemini(question)
        criarMenssagem()
    }
})

