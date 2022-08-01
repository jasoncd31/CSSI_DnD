import { auth } from '../js/signIn';
import { app } from 'initializeApp';

const firebase = require("firebase");
const firestore = require("firebase/firestore");

export default class Character {
  database = firestore.getFirestore(app);

  constructor(characterData) {
    this.character = {
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
    
    this.characterRef = firestore.doc(database, 'characters', `${auth.displayName}_character`);
    await firestore.setDoc(this.characterRef, this.character);
  }

  updateHp(health, increment) {
    this.character.basicInfo.currentHp += (increment ? health : (health * -1));
    this.updateBasicInfo('currentHp', this.character.basicInfo.currentHp);
  }

  updateBasicInfo(field, value) {
    this.character.basicInfo[field] = value;
    await firestore.updateDoc(this.characterRef, {
      [`basicInfo.${field}`]: value
    });
  }

  /// Use abbrievieated terms for ability scores
  updateAbilityScore(field, value) {
    this.character.abilityScores[field] = value;
    await firestore.updateDoc(this.characterRef, {
      [`abilityScores.${field}`]: value
    });
  }

  delete() {
    if (window.confirm(`Are you sure you want to delete ${this.character.basicInfo.name}?\nThis action cannot be undone.`)) {
      await firestore.deleteDoc(this.characterRef);
    }
  }

}