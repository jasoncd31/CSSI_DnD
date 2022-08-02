// to be called on 'submit/save/whatever we end up calling it' after filling out character info
import { Character } from '../Firebase/userCharacter';
export let userCharacter = {};

function createCharacter() {
  const charFields = document.querySelectorAll('.input');
  
  let charData = [];
  charFields.forEach((info) => {
    const value = info.value;
  
    if (value == null) {
      alert('All values are required!');
    }
  
    charData.push(value);
  });

  userCharacter = new Character(charData);
}