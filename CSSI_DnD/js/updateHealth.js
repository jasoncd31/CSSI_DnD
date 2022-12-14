// use 'select' tag for whether health should be incremented or decremented
import { incrementBasicInfoNumber } from '../Firebase/userCharacter.js';

document.querySelector('#change-current-hp').addEventListener('click', () => {
  const health = document.querySelector('#healthAmount');
  const addOrSubtract = document.querySelector('#addOrSubtract');
  
  incrementBasicInfoNumber('currentHp', health, addOrSubtract);
});