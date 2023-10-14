const ATTACK_VALUE =10;
const STRONG_ATTACK_VALUE =17;
const MONSTER_ATTACK_VALUE =14;
const HEAL_VALUE =18;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONGATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

// const enterValue = prompt('Maximun Life for you and the Monster','100');


// let chosenMaxLife = parseInt(enterValue);
let battleLog =[];

// if(isNaN(enterValue) || enterValue <= 0) {
//     chosenMaxLife = 100;
// }
function getMAXLifeValue(){
    const enterValue = prompt('Maximun Life for you and the Monster','100');

    const parsedValue = parseInt(enterValue);
    if(isNaN(parsedValue) || parsedValue <= 0) {
        throw { message : 'Invaild user input, not a number!'};
    }
    return parsedValue;
}

let chosenMaxLife = getMAXLifeValue();

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry ={
        envent: ev,
        value: val,
        finalMonsterHealth : monsterHealth,
        finalPlayerHealth : playerHealth
    }

    switch(ev){
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'Monster';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target= 'Monster';
             break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry ={
                envent: ev,
                value: val,
                target: 'Player',
                finalMonsterHealth : monsterHealth,
                finalPlayerHealth : playerHealth
            };break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry ={
                envent: ev,
                value: val,
                target: 'Monster',
                finalMonsterHealth : monsterHealth,
                finalPlayerHealth : playerHealth
            };break;
        case LOG_EVENT_GAME_OVER:
            logEntry ={
                envent: ev,
                value: val,
                finalMonsterHealth : monsterHealth,
                finalPlayerHealth : playerHealth
            };break;
        default:
            logEntry={};
    }
    // if(ev=== LOG_EVENT_PLAYER_ATTACK){
    //     logEntry.target = 'Monster';
    // }else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
    //     logEntry ={
    //         envent: ev,
    //         value: val,
    //         target: 'Monster',
    //         finalMonsterHealth : monsterHealth,
    //         finalPlayerHealth : playerHealth
    //     };
    // }else if(ev === LOG_EVENT_MONSTER_ATTACK){
    //     logEntry ={
    //         envent: ev,
    //         value: val,
    //         target: 'Player',
    //         finalMonsterHealth : monsterHealth,
    //         finalPlayerHealth : playerHealth
    //     };
    // }else if(ev === LOG_EVENT_PLAYER_HEAL){
    //     logEntry ={
    //         envent: ev,
    //         value: val,
    //         target: 'Monster',
    //         finalMonsterHealth : monsterHealth,
    //         finalPlayerHealth : playerHealth
    //     };
    // }else if(ev === LOG_EVENT_GAME_OVER){
    //     logEntry ={
    //         envent: ev,
    //         value: val,
    //         finalMonsterHealth : monsterHealth,
    //         finalPlayerHealth : playerHealth
    //     };
    // }
    battleLog.push(logEntry);
}

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK, 
        playerDamage, 
        currentMonsterHealth, 
        currentPlayerHealth
        );

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("used bonus health.")
    } 
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You Win!");
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'PLAYER WIN!',
            currentMonsterHealth, 
            currentPlayerHealth
            );
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You Lost!");
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'PLAYER LOST!',
            currentMonsterHealth, 
            currentPlayerHealth
            );
    }else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("You have a Draw!");
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'A DRAW!',
            currentMonsterHealth, 
            currentPlayerHealth
            );
    }

    if(currentMonsterHealth <= 0 || currentPlayerHealth <=0){
        reset();
    }
}

function attackMonster(mode){
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logevent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if(mode === MODE_ATTACK){
    //     maxDamage=ATTACK_VALUE;
    //     logevent = LOG_EVENT_PLAYER_ATTACK;
    // }else if(mode === MODE_STRONG_ATTACK){
    //     maxDamage=STRONG_ATTACK_VALUE;
    //     logevent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logevent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongattackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
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
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function printLogHandler() {
    let j = 0;
    while(j<3){
        console.log('---------');
        j++;
    }
    // for(let i = 0; i < battleLog.length; i++){
    //     console.log(battleLog[i]);
    // }
    // for(const logEntry of battleLog){
    //     console.log(logEntry);       
    // }
    // for(const logEntry of battle){
    //     console.log(`#${i}`);
    //     for(const key in logEntry){
    //         console.log(`${key} => ${logEntry[key]}`);
    //     }
    //     i++;
    // }
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongattackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);