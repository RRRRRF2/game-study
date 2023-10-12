const ATTACK_VALUE =10;
const STRONGATTACK_VALUE =17;
const MONSTER_ATTACK_VALUE =14;
const HEAL_VALUE =20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You Win!");
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You Lost!")
    }else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("You hane a Draw!");
    }
}

function attackMonster(mode){
    let maxDamage;
    if(mode === 'ATTACK'){
        maxDamage=ATTACK_VALUE;
    }else if(mode === 'STRONGATTACK'){
        maxDamage=STRONGATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongattackHandler() {
    attackMonster('STRONGATTACK');
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