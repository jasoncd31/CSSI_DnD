import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js';
import { setCharValues } from '../js/setCharValues.js';

// assuming that this page will not be shown unless user is already signed in
import { app } from './initializeFirebase.js';
let charName = '';
const database = getFirestore(app);

export function createCharacter(char) {
  charName = document.querySelector('#charName').value;
  const characterRef = database.collection('characters').doc(`${charName}_character`);
  characterRef.set(char).then(setCharValues); // .then(alert?)
  // todo should probably redirect back to home page or some kind of success message
}

/// Return the character data from Firestore
function getCharacter() {
  const characterRef = database.collection('characters').doc(`${charName}_character`);
  characterRef.get().then((character) => {
    if (character.exists) {
      return character.data();
    } else {
      alert(`There was an error getting ${charName}'s data. Please try again in a few minutes!`);
    }
  });
}

/// Return an object containing all basic information about the current user's character
export function getBasicInfo() {
  return getCharacter().basicInfo;
}

/// Return an object containing the ability scores of the current user's character
export function getAbilityScores() {
  return getCharacter().abilityScores;
}

/**
 * Update a numeric field in the character's basic information. Use updateAbilityScore() to update ability scores.
 * 
 * @param field The name of the basic info attribute to update
 * @param amount The amount by which to increment the field
 * @param add True if the amount is positive, false otherwise
 */
export function incrementBasicInfoNumber(field, amount, add) {
  const characterRef = database.collection('characters').doc(`${charName}_character`);
  characterRef.update({
    [`basicInfo.${field}`]: firebase.firestore.FieldValue.increment(add ? amount : (amount * -1))
  });
}

/**
 * Update a field in the character's basic information. Use incrementBasicInfoNumber() to update numeric fields.
 * 
 * @param field The name of the basic info attribute to change
 * @param value The new value to set the field to. Will overwrite original value
 */
export function updateBasicInfo(field, value) {
  const characterRef = database.collection('characters').doc(`${charName}_character`);
  characterRef.update({
    [`basicInfo.${field}`]: value
  });
}

/**
 * Update one of the character's ability scores.
 * 
 * @param field The ABBRIEVIATED name of the ability score to change
 * @param value The new value to set the ability score to. Will overwrite original value
 */
export function updateAbilityScore(field, value) {
  const characterRef = database.collection('characters').doc(`${charName}_character`);
  characterRef.update({
    [`abilityScores.${field}`]: value
  });
}

/// Delete the current character after asking for confirmation.
export function deleteCharacter() {
  if (window.confirm(`Are you sure you want to delete ${this.character.basicInfo.name}?\nThis action cannot be undone.`)) {
    database.collection('characters').doc(`${charName}_character`).delete().then(() => {
      alert(`${charName}'s data has been deleted!`);
    }).catch((error) => {
      alert(`There was an error deleting ${charName}'s data. Error code: ${error}`);
    })
  }
}