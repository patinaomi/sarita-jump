const sarita = document.querySelector('.sarita');
const monster = document.querySelector('.monster');
let isJumping = false;
let isAlive = true;

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

const loop = setInterval(() => {

    const monsterPosition = monster.offsetLeft;
    const saritaPosition = +window.getComputedStyle(sarita).bottom.replace('px', '');
                            // o '+' tenta converter a String em número!

    console.log(saritaPosition);

    if(monsterPosition <= 60 && monsterPosition > 0 && saritaPosition < 60 && isAlive) {
        sarita.src = '/assets/css/images/sarita_dead.gif';
        monster.style.left = `${monsterPosition}px`;
        monster.src = '/assets/css/images/png-monstro.png';
        isAlive = false;

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);