const sarita = document.querySelector('.sarita');
const monster = document.querySelector('.monster');
let isJumping = false;
let isAlive = true;
let cont = 0;
let puloContabilizado = false;

const jump = () => {
    if (isJumping || !isAlive) return; // Impede pulo se já estiver pulando ou morta
    isJumping = true;
    sarita.classList.add('jump');
    sarita.src = '/assets/css/images/sarita_jump.gif';

    
    setTimeout(() => {
        if (isAlive) { // Só muda a imagem se ela ainda estiver viva
            sarita.classList.remove('jump');
            sarita.src = '/assets/css/images/sarita_walking.gif'; // Volta para imagem de caminhada
        }
        isJumping = false;
    }, 700);
}


const contPulo = setInterval(() => {
    const posicao = monster.offsetLeft;

    // Verifica se está pulando E o monstro está na posição especificada
    // E se o pulo ainda não foi contabilizado
    if(isJumping && posicao < 10 && !puloContabilizado) {
        cont++;
        document.getElementById('contador').innerHTML = cont;
        puloContabilizado = true; // Marca o pulo como contabilizado
    } else if (posicao >= 10 || !isJumping) {
        puloContabilizado = false; // Reseta a flag quando a condição não é mais atendida
    }
    
}, 10);

const loop = setInterval(() => {
    const monsterPosition = monster.offsetLeft;
    const saritaPosition = +window.getComputedStyle(sarita).bottom.replace('px', '');
                            // o '+' tenta converter a String em número!

    if(monsterPosition <= 60 && monsterPosition > 0 && saritaPosition < 220) {
        sarita.src = '/assets/css/images/sarita_dead.gif';
        monster.style.left = `${monsterPosition}px`;
        monster.src = '/assets/css/images/png-monstro.png';
        isAlive = false;

        clearInterval(loop);
    }
    
}, 10);

document.addEventListener('keydown', jump);