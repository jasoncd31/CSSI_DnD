import { Auth } from 'auth';
import { app } from 'initializeApp';

const firebase = require("firebase");
const firestore = require("firebase/firestore");

export default class Character {
  database = firestore.getFirestore(app);

  constructor(name, race, characterClass, alignment, maxHp, str, dex, con, int, wis, cha) {
    this.character = {
      basicInfo: {
        name: name,
        race: race,
        characterClass: characterClass,
        alignment: alignment,
        currentHp: maxHp,
        maxHp: maxHp
      },
      abilityScores: {
        str: str,
        dex: dex,
        con: con,
        int: int,
        wis: wis,
        cha: cha
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