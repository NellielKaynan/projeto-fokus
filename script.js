//............................Variáveis................................//

const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector( '.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt  = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span')

const tempoNaTela = document.querySelector('#timer');
const pausePlayIcon = document.querySelector('.app__card-primary-butto-icon');


const musicaFocoInput = document.querySelector('#alternar-musica');

const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');
const musica = new Audio ('./sons/luna-rise-part-one.mp3');

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else  {
        musica.paused
    }
});

focoBt.addEventListener ('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt. addEventListener ('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto (contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case 'descanso-curto': 
            titulo.innerHTML = `
            Que tal dar uma respirada?
                <strong class="app__title-strong">Faça uma pausa curta!</strong> 
            `
            break;
        case 'descanso-longo': 
            titulo.innerHTML = `
            Hora de voltar à superfície.
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        //audioTempoFinalizado.play()   // áudio executado quando cronômetro finalizar
        zerar()
        alert('Tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()   // áudio executado quando cronômetro for pausado
        zerar()
        return
    }
    audioPlay.play()   // áudio executado quando cronômetro iniciar
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    pausePlayIcon.src = ("./imagens/pause.png")
};

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBt.textContent = 'Começar'
    intervaloId = null
    pausePlayIcon.src = ("./imagens/play_arrow.png")
};


function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
};

mostrarTempo();