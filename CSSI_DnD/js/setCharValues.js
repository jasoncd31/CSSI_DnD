import { getAbilityScores, getBasicInfo } from '../Firebase/userCharacter.js';

export function setCharValues() {
  const abilityScores = getAbilityScores();
  const basicInfo = getBasicInfo();

  document.querySelector('#strVal').innerHTML = abilityScores.str;
  document.querySelector('#dexVal').innerHTML = abilityScores.dex;
  document.querySelector('#conVal').innerHTML = abilityScores.con;
  document.querySelector('#intVal').innerHTML = abilityScores.int;
  document.querySelector('#wisVal').innerHTML = abilityScores.wis;
  document.querySelector('#chaVal').innerHTML = abilityScores.cha;

  document.querySelector('#nameVal').innerHTML = basicInfo.name;
  document.querySelector('#raceVal').innerHTML = basicInfo.race;
  document.querySelector('#classVal').innerHTML = basicInfo.characterClass;
  document.querySelector('#alignmentVal').innerHTML = basicInfo.alignment;
  document.querySelector('#currentHpVal').innerHTML = basicInfo.currentHp;
  document.querySelector('#maxHpVal').innerHTML = basicInfo.maxHp;
  document.querySelector('#armorClassVal').innerHTML = basicInfo.armorClass;
  document.querySelector('#initiativeVal').innerHTML = basicInfo.initiative;
  document.querySelector('#imgVal').src = basicInfo.img;
}