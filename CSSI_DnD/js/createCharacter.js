// to be called on 'submit/save/whatever we end up calling it' after filling out character info
import { Character } from '../Firebase/userCharacter.js';
export let userCharacter = {};

function createCharacter() {
  const race = document.querySelector('#charRace');
  const charClass = document.querySelector('#charClass');
  const alignment = document.querySelector('#charAlignment');

  userCharacter = new Character({
    basicInfo: {
      name: document.querySelector('#charName').value,
      race: race.options[race.selectedIndex].text,
      characterClass: charClass.options[charClass.selectedIndex].text,
      alignment: alignment.options[alignment.selectedIndex].text,
      currentHp: document.querySelector('#charCurrentHp').value,
      maxHp: document.querySelector('#charMaxHp').value,
      armorClass: document.querySelector('#charArmorClass').value,
      initiative: document.querySelector('#charInitiative').value,
      img: document.querySelector('#charImg').value
    },
    abilityScores: {
      str: document.querySelector('#charStr').value,
      dex: document.querySelector('#charDex').value,
      con: document.querySelector('#charCon').value,
      int: document.querySelector('#charInt').value,
      wis: document.querySelector('#charWis').value,
      cha: document.querySelector('#charCha').value
    }
  });
}

document.querySelector('.createCharacter').addEventListener('click', createCharacter);