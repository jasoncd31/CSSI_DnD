// use 'select' tag for whether health should be incremented or decremented
import { userCharacter } from 'createCharacter.js';

document.querySelector('#change-current-hp').addEventListener('click', () => {
  const health = document.querySelector('#healthAmount');
  const addOrSubtract = document.querySelector('#addOrSubtract');
  
  userCharacter.incrementBasicInfoNumber('currentHp', health, addOrSubtract);
});