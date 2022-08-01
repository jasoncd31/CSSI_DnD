// use 'select' tag for whether health should be incremented or decremented
import { userCharacter } from 'createCharacter';

const health = document.querySelector('#healthAmount');
const increment = document.querySelector('#incrementHealth');

userCharacter.updateHp(health, increment);