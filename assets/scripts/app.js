const ATTACK_VALUE =10;
const STRONGATTACK_VALUE =17;
const MONSTER_ATTACK_VALUE =14;
const HEAL_VALUE =18;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONGATTACK = 'STRONGATTACK';

const enterValue = prompt('Maximun Life for you and the Monster','100');


let chosenMaxLife = parseInt(enterValue);
if(isNaN(enterValue) || enterValue <= 0) {
    chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("used bonus health.")
    } 
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You Win!");
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You Lost!")
    }else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("You have a Draw!");
    }

    if(currentMonsterHealth <= 0 || currentPlayerHealth <=0){
        reset();
    }
}

function attackMonster(mode){
    let maxDamage;
    if(mode === MODE_ATTACK){
        maxDamage=ATTACK_VALUE;
    }else if(mode === MODE_STRONGATTACK){
        maxDamage=STRONGATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongattackHandler() {
    attackMonster(MODE_STRONGATTACK);
}

function healPlayerHandler() {
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife-HEAL_VALUE){
        alert("You can't heal to more than your max health.")
        healValue= chosenMaxLife-currentPlayerHealth;
    }else{
        healValue =HEAL_VALUE;
    } 
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongattackHandler);
healBtn.addEventListener('click',healPlayerHandler);