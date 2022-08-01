// to be called on 'submit/save/whatever we end up calling it' after filling out character info
import { Character } from '../Firebase/userCharacter';

const charFields = document.querySelectorAll('.characterInfo');

let charData = [];
charFields.forEach((info) => {
  const value = info.value;

  if (value == null) {
    alert('All values are required!');
  }

  charData.push(value);
});

export let userCharacter = new Character(charData);