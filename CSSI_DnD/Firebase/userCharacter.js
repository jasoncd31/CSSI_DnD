import { deleteDoc, doc, getDoc, getFirestore, updateDoc } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js';

// assuming that this page will not be shown unless user is already signed in
import { app, displayName } from './initializeFirebase.js';
const database = getFirestore(app);

export class Character {

  constructor(characterData) {
    this.createCharacter(characterData);
  }

  async createCharacter(char) {
    const characterRef = database.collection('characters').doc(`${displayName}_character`);
    await characterRef.set(char); // todo error handling
  }

  /// Return an object containing all basic information about the current user's character
  async getBasicInfo() {
    const characterRef = database.collection('characters');
    const character = await getDoc(doc(database, 'characters', `${displayName}_character`)); // todo

    if (character.exists()) {
      return character.data().basicInfo;
    } else {
      alert('There was an error getting your character data. Please try again in a few minutes!');
    }
  }

  /// Return an object containing the ability scores of the current user's character
  async getAbilityScores() {
    const character = await getDoc(doc(database, 'characters', `${auth.displayName}_character`));

    if (character.exists()) {
      return character.data().abilityScores;
    } else {
      alert('There was an error getting your character data. Please try again in a few minutes!');
    }
  }

  /**
   * Update a numeric field in the character's basic information. Use updateAbilityScore() to update ability scores.
   * 
   * @param field The name of the basic info attribute to update
   * @param amount The amount by which to increment the field
   * @param add True if the amount is positive, false otherwise
   */
  async incrementBasicInfoNumber(field, amount, add) {
    const characterRef = doc(database, 'characters', `${auth.displayName}_character`);
    await updateDoc(characterRef, {
      [`basicInfo.${field}`]: increment(add ? amount : (amount * -1))
    });
  }

  /**
   * Update a field in the character's basic information. Use incrementBasicInfoNumber() to update numeric fields.
   * 
   * @param field The name of the basic info attribute to change
   * @param value The new value to set the field to. Will overwrite original value
   */
  async updateBasicInfo(field, value) {
    const characterRef = doc(database, 'characters', `${auth.displayName}_character`);
    await updateDoc(characterRef, {
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
    const characterRef = doc(database, 'characters', `${auth.displayName}_character`);
    await updateDoc(characterRef, {
      [`abilityScores.${field}`]: value
    });
  }

  /// Delete the current character after asking for confirmation.
  async delete() {
    if (window.confirm(`Are you sure you want to delete ${this.character.basicInfo.name}?\nThis action cannot be undone.`)) {
      const characterRef = doc(database, 'characters', `${auth.displayName}_character`);
      await deleteDoc(characterRef);
    }
  }

}