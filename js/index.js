const sarita = document.querySelector('.sarita');
const monster = document.querySelector('.monster');
let isJumping = false;

const jump = () => {
    if (isJumping) return; //Pra Sarita não ficar pulando várias vezes
    isJumping = true;
    sarita.classList.add('jump');
    sarita.src = '/assets/css/images/sarita_jump.gif';

    setTimeout(() => {
        sarita.classList.remove('jump');
        sarita.src = '/assets/css/images/sarita_walking.gif'; // Volta para imagem de caminhada
        isJumping = false;
    }, 700);
}

const loop = setInterval(() => {

    const monsterPosition = monster.offsetLeft;
    const saritaPosition = +window.getComputedStyle(sarita).bottom.replace('px', '');
                            // o '+' tenta converter a String em número!

    console.log(saritaPosition);

    if(monsterPosition <= 60 && monsterPosition > 0 && saritaPosition < 60) {
        sarita.src = '/assets/css/images/sarita_dead.gif' + '?a=' + Math.random();
        monster.style.animationPlayState = 'paused';
        clearInterval(loop);
        monster.style.left = `${monsterPosition}px`;
    }
}, 10);

document.addEventListener('keydown', jump);