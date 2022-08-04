import { getCharacter } from '../Firebase/userCharacter.js';

export function setCharValues() {
  getCharacter().then((character) => {
    document.querySelector('#strVal').innerHTML = character.abilityScores.str;
    document.querySelector('#dexVal').innerHTML = character.abilityScores.dex;
    document.querySelector('#conVal').innerHTML = character.abilityScores.con;
    document.querySelector('#intVal').innerHTML = character.abilityScores.int;
    document.querySelector('#wisVal').innerHTML = character.abilityScores.wis;
    document.querySelector('#chaVal').innerHTML = character.abilityScores.cha;
  });

  getCharacter().then((character) => {
    document.querySelector('#nameVal').innerHTML = character.basicInfo.name;
    // document.querySelector('#raceVal').innerHTML = character.basicInfo.race;
    // document.querySelector('#classVal').innerHTML = character.basicInfo.characterClass;
    // document.querySelector('#alignmentVal').innerHTML = character.basicInfo.alignment;
    document.querySelector('#currentHpVal').innerHTML = character.basicInfo.currentHp;
    document.querySelector('#maxHpVal').innerHTML = character.basicInfo.maxHp;
    document.querySelector('#armorClassVal').innerHTML = character.basicInfo.armorClass;
    document.querySelector('#initiativeVal').innerHTML = character.basicInfo.initiative;
    document.querySelector('#imgVal').src = character.basicInfo.img;
  });
}