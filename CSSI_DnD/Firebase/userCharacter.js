import { Auth } from 'auth';
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
        maxHp: characterData[5]
      },
      abilityScores: {
        str: characterData[6],
        dex: characterData[7],
        con: characterData[8],
        int: characterData[9],
        wis: characterData[10],
        cha: characterData[11]
      }
    };
    
    this.characterRef = firestore.doc(database, 'characters', `${Auth.displayName}_character`);
    await firestore.setDoc(this.characterRef, this.character);
  }

  addHp(health) {
    this.character.basicInfo.currentHp += health;
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

  deleteCharacter() {
    if (window.confirm(`Are you sure you want to delete ${this.character.basicInfo.name}?\nThis action cannot be undone.`)) {
      await firestore.deleteDoc(this.characterRef);
    }
  }

}