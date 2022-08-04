// to be called on 'delete character button' (maybe put that under edit?)
import { deleteCharacter } from '../Firebase/userCharacter.js';

document.querySelector('#delete-character').addEventListener('click', () => {
  deleteCharacter();
});