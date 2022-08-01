import { auth } from '../js/signIn';
import { app } from 'initializeApp';

const firebase = require("firebase");
const firestore = require("firebase/firestore");

export default class Character {
  database = firestore.getFirestore(app);

  constructor(characterData) {
    this.createCharacter(characterData);
  }

  createCharacter(characterData) {
    const character = {
      basicInfo: {
        name: characterData[0],
        race: characterData[1],
        characterClass: characterData[2],
        alignment: characterData[3],
        currentHp: characterData[4],
        maxHp: characterData[5],
        armorClass: characterData[6],
        initiative: characterData[7]
      },
      abilityScores: {
        str: characterData[8],
        dex: characterData[9],
        con: characterData[10],
        int: characterData[11],
        wis: characterData[12],
        cha: characterData[13]
      }
    };

    const characterRef = firestore.doc(database, 'characters', `${auth.displayName}_character`);
    await firestore.setDoc(characterRef, character);
  }

  /// Return an array containing all basic information about the current user's character
  getBasicInfo() {
    const character = await firestore.getDoc(firestore.doc(database, 'characters', `${auth.displayName}_character`));

    if (character.exists()) {
      return character.data().basicInfo;
    } else {
      alert('There was an error getting your character data. Please try again in a few minutes!');
    }
  }

  /// Return an array containing the ability scores of the current user's character
  getAbilityScores() {
    const character = await firestore.getDoc(firestore.doc(database, 'characters', `${auth.displayName}_character`));

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
  incrementBasicInfoNumber(field, amount, add) {
    const characterRef = firestore.doc(database, 'characters', `${auth.displayName}_character`);
    await firestore.updateDoc(characterRef, {
      [`basicInfo.${field}`]: increment(add ? amount : (amount * -1))
    });
  }

  /**
   * Update a field in the character's basic information. Use incrementBasicInfoNumber() to update numeric fields.
   * 
   * @param field The name of the basic info attribute to change
   * @param value The new value to set the field to. Will overwrite original value
   */
  updateBasicInfo(field, value) {
    const characterRef = firestore.doc(database, 'characters', `${auth.displayName}_character`);
    await firestore.updateDoc(characterRef, {
      [`basicInfo.${field}`]: value
    });
  }

  /**
   * Update one of the character's ability scores.
   * 
   * @param field The ABBRIEVIATED name of the ability score to change
   * @param value The new value to set the ability score to. Will overwrite original value
   */
  updateAbilityScore(field, value) {
    const characterRef = firestore.doc(database, 'characters', `${auth.displayName}_character`);
    await firestore.updateDoc(characterRef, {
      [`abilityScores.${field}`]: value
    });
  }

  /// Delete the current character after asking for confirmation.
  delete() {
    if (window.confirm(`Are you sure you want to delete ${this.character.basicInfo.name}?\nThis action cannot be undone.`)) {
      const characterRef = firestore.doc(database, 'characters', `${auth.displayName}_character`);
      await firestore.deleteDoc(characterRef);
    }
  }

}