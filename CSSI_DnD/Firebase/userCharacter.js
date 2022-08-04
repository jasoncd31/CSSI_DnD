import { deleteDoc, doc, getDoc, getFirestore, updateDoc } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js';

// assuming that this page will not be shown unless user is already signed in
import { app } from './initializeFirebase.js';
const database = getFirestore(app);

export class Character {

  constructor(characterData) {
    this.name = characterData.basicInfo.name;
    this.createCharacter(characterData);
  }

  async createCharacter(char) {
    const characterRef = database.collection('characters').doc(`${this.name}_character`);
    await characterRef.set(char); // todo error handling
    // todo should probably redirect back to home page or some kind of success message
  }

  /// Return the character data from Firestore
  getCharacter() {
    const characterRef = database.collection('characters').doc(`${this.name}_character`);
    characterRef.get().then((character) => {
      if (character.exists) {
        return character.data();
      } else {
        alert(`There was an error getting ${this.name}'s data. Please try again in a few minutes!`);
      }
    });
  }

  /// Return an object containing all basic information about the current user's character
  getBasicInfo() {
    return this.getCharacter().basicInfo;
  }

  /// Return an object containing the ability scores of the current user's character
  getAbilityScores() {
    return this.getCharacter().abilityScores;
  }

  /**
   * Update a numeric field in the character's basic information. Use updateAbilityScore() to update ability scores.
   * 
   * @param field The name of the basic info attribute to update
   * @param amount The amount by which to increment the field
   * @param add True if the amount is positive, false otherwise
   */
  incrementBasicInfoNumber(field, amount, add) {
    const characterRef = database.collection('characters').doc(`${this.name}_character`);
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
  updateBasicInfo(field, value) {
    const characterRef = database.collection('characters').doc(`${this.name}_character`);
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
  async updateAbilityScore(field, value) {
    const characterRef = database.collection('characters').doc(`${this.name}_character`);
    characterRef.update({
      [`abilityScores.${field}`]: value
    });
  }

  /// Delete the current character after asking for confirmation.
  async delete() {
    if (window.confirm(`Are you sure you want to delete ${this.character.basicInfo.name}?\nThis action cannot be undone.`)) {
      database.collection('characters').doc(`${this.name}_character`).delete().then(() => {
        alert(`${this.name}'s data has been deleted!`);
      }).catch((error) => {
        alert(`There was an error deleting ${this.name}'s data. Error code: ${error}`);
      })
    }
  }

}