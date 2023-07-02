export function calcHP(npc) {
  let hp = 2 * npc.lvl + 5 * npc.attributes.might;

  // Skill Extra HP
  if (npc.extra?.hp) {
    hp += parseInt(npc.extra.hp);
  }

  // Rank
  if (npc.rank === "elite" || npc.rank === "champion2") {
    hp = hp * 2;
  }

  if (npc.rank === "champion3") {
    hp = hp * 3;
  }

  if (npc.rank === "champion4") {
    hp = hp * 4;
  }
  
  if (npc.rank === "champion5") {
    hp = hp * 5;
  }

  if (npc.rank === "companion") {
    const sl = npc.companionlvl || 1;
    const lvl = npc.companionpclvl || 5;
    hp = sl * npc.attributes.might + Math.floor(lvl / 2)
  }
  
  return hp;
}

export function calcMP(npc) {
  let mp = npc.lvl + 5 * npc.attributes.will;
  // Skill Extra MP
  if (npc.extra?.mp) {
    mp += parseInt(npc.extra.mp);
  }
  // Rank
  if (
    npc.rank === "champion2" ||
    npc.rank === "champion3" ||
    npc.rank === "champion4" ||
    npc.rank === "champion5"
  ) {
    mp = mp * 2;
  }

  return mp;
}

export function calcInit(npc) {
  let init = (npc.attributes.dexterity + npc.attributes.insight) / 2;

  // Skill Extra Init
  if (npc.extra?.init) {
    init += 4;
  }

  // Rank
  if (npc.rank === "elite" || npc.rank === "champion2") {
    init = init + 2;
  }

  if (npc.rank === "champion3") {
    init = init + 3;
  }
  if (npc.rank === "champion4") {
    init = init + 4;
  }
  if (npc.rank === "champion5") {
    init = init + 5;
  }

  // Armor
  if (npc.armor?.init) {
    init += npc.armor?.init;
  }

  return init;
}

export function calcDef(npc) {
  let def = 0;

  // Armor
  if (npc.armor?.def) {
    def += npc.armor?.def;
  }

  if (npc.armor?.defbonus) {
    def += npc.armor?.defbonus;
  }

  // Shield
  if (npc.shield?.def) {
    def += npc.shield?.def;
  }

  if (npc.shield?.defbonus) {
    def += npc.shield?.defbonus;
  }

  // Skill Extra def
  if (npc.extra?.def) {
    def += npc.extra?.def;
  }

  return def;
}

export function calcMDef(npc) {
  let mdef = 0;

  // Skill Extra M def
  if (npc.extra?.mDef) {
    mdef += npc.extra?.mDef;
  }

  // Armor
  if (npc.armor?.mdefbonus) {
    mdef += npc.armor?.mdefbonus;
  }

  // Shield
  if (npc.shield?.mdefbonus) {
    mdef += npc.shield?.mdefbonus;
  }

  return mdef;
}

export function calcDamage(attack, npc) {
  let number = 5;

  // Level
  number = number + Math.floor(npc.lvl / 20) * 5;

  // Extra Damage
  if (attack.extraDamage) {
    number = number + 5;
  }

  // Equip
  if (attack.weapon) {
    number = number - 5 + attack.weapon.damage;
  }

  return number;
}

export function calcPrecision(attack, npc) {
  console.debug(attack, npc);
  let number = 0;

  // Level
  number = number + Math.floor(npc.lvl / 10);

  // Extra Precision
  if (npc.extra?.precision) {
    number = number + 3;
  }

  // Equip
  if (attack.weapon) {
    number = number + attack.weapon.prec;
  }
  
  // Companion
  if (npc.rank === "companion") {
    const sl = npc.companionlvl || 1;
    number = number + sl;
  }
  
  return number;
}

export function calcMagic(npc) {
  let number = 0;

  // Level
  number = number + Math.floor(npc.lvl / 10);

  // Extra Precision
  if (npc.extra?.magic) {
    number = number + 3;
  }
  
  // Companion
  if (npc.rank === "companion") {
    const sl = npc.companionlvl || 1;
    number = number + sl;
  }
  
  
  return number;
}

export function calcAvailableSkills(npc) {
  return (
    calcAvailableSkillsFromSpecies(npc) +
    calcAvailableSkillsFromLevel(npc) +
    calcAvailableSkillsFromVulnerabilities(npc) +
    calcAvailableSkillsFromRank(npc)
  );
}

export function calcAvailableSkillsFromSpecies(npc) {
  let number = 4;

  if (
    npc.species === "Costrutto" ||
    npc.species === "Elementale" ||
    npc.species === "Non Morto"
  ) {
    number = 2;
  }

  if (
    npc.species === "Demone" ||
    npc.species === "Pianta" ||
    npc.species === "Umanoide"
  ) {
    number = 3;
  }

  return number;
}

export function calcAvailableSkillsFromLevel(npc) {
  return Math.floor(npc.lvl / 10);
}

export function calcAvailableSkillsFromVulnerabilities(npc) {
  let sum = 0;
  Object.entries(npc.affinities).forEach((el) => {
    if (el[1] === "vu") {
      sum++;
    }
  });

  if (npc.affinities.physical === "vu") {
    sum++;
  }

  // Undeads are vulnerable to light
  if (npc.species === "Non Morto" && npc.affinities.light === "vu") {
    sum = sum - 1;
  }

  // Plants have a free vulnerability
  if (
    npc.species === "Pianta" &&
    (npc.affinities.fire ||
      npc.affinities.wind ||
      npc.affinities.ice ||
      npc.affinities.bolt)
  ) {
    sum = sum - 1;
  }
  if (sum < 0) {
    sum = 0;
  }

  return sum;
}

export function calcAvailableSkillsFromRank(npc) {
  if (npc.rank === "elite") {
    return 1;
  }

  if (npc.rank === "champion2") {
    return 2;
  }

  if (npc.rank === "champion3") {
    return 3;
  }

  if (npc.rank === "champion4") {
    return 4;
  }

  if (npc.rank === "champion5") {
    return 5;
  }

  return 0;
}

export function calcUsedSkills(npc) {
  return (
    calcUsedSkillsFromSpecialAttacks(npc) +
    calcUsedSkillsFromExtraDefs(npc) +
    calcUsedSkillsFromExtraHP(npc) +
    calcUsedSkillsFromExtraMP(npc) +
    calcUsedSkillsFromExtraInit(npc) +
    calcUsedSkillsFromExtraPrecision(npc) +
    calcUsedSkillsFromExtraMagic(npc) +
    calcUsedSkillsFromResistances(npc) +
    calcUsedSkillsFromImmunities(npc) +
    calcUsedSkillsFromAbsorbs(npc) +
    calcUsedSkillsFromSpecial(npc) +
    calcUsedSkillsFromSpells(npc) +
    calcUsedSkillsFromEquip(npc)
  );
}

export function calcUsedSkillsFromSpecialAttacks(npc) {
  let sum = 0;
  npc.attacks?.forEach((attack) => {
    sum += attack.special.length;
    if (attack.extraDamage) {
      sum++;
    }
  });

  npc.weaponattacks?.forEach((attack) => {
    sum += attack.special.length;
    if (attack.extraDamage) {
      sum++;
    }
  });

  return sum;
}

export function calcUsedSkillsFromExtraDefs(npc) {
  if (!npc.extra?.def || !npc.extra?.mDef) {
    return 0;
  }
  return (npc.extra.def + npc.extra.mDef) / 3;
}

export function calcUsedSkillsFromExtraHP(npc) {
  if (!npc.extra?.hp) {
    return 0;
  }
  return npc.extra.hp / 10;
}

export function calcUsedSkillsFromExtraMP(npc) {
  if (!npc.extra?.mp) {
    return 0;
  }
  return npc.extra.mp / 10 / 2;
}

export function calcUsedSkillsFromExtraInit(npc) {
  if (!npc.extra?.init) {
    return 0;
  }
  return 1;
}

export function calcUsedSkillsFromExtraPrecision(npc) {
  if (!npc.extra?.precision) {
    return 0;
  }
  return 1;
}

export function calcUsedSkillsFromExtraMagic(npc) {
  if (!npc.extra?.magic) {
    return 0;
  }
  return 1;
}

export function calcUsedSkillsFromResistances(npc) {
  let sum = 0;
  Object.entries(npc.affinities).forEach((el) => {
    if (el[1] === "rs") {
      // Don't count earth for Costrutto
      if (npc.species === "Costrutto" && el[0] === "earth") {
        return;
      }

      sum++;
    }
  });

  // Demons have two free resistances
  if (npc.species === "Demone") {
    sum = sum - 2;
  }

  if (sum < 0) {
    sum = 0;
  }

  return Math.ceil(sum / 2);
}

export function calcUsedSkillsFromImmunities(npc) {
  let sum = 0;
  Object.entries(npc.affinities).forEach((el) => {
    if (el[1] === "im") {
      // Don't count poison for Costrutto, Elementale, Non Mortto
      if (
        (npc.species === "Costrutto" ||
          npc.species === "Elementale" ||
          npc.species === "Non Morto") &&
        el[0] === "poison"
      ) {
        return;
      }

      // Don't count dark for Non Mortto
      if (npc.species === "Non Morto" && el[0] === "dark") {
        return;
      }

      sum++;
    }
  });

  // Elementals have a free immunity
  if (npc.species === "Elementale") {
    sum = sum - 1;
  }

  if (sum < 0) {
    sum = 0;
  }

  return Math.ceil(sum);
}

export function calcUsedSkillsFromAbsorbs(npc) {
  let sum = 0;
  Object.entries(npc.affinities).forEach((el) => {
    if (el[1] === "ab") {
      sum++;
    }
  });

  if (sum < 0) {
    sum = 0;
  }

  return Math.ceil(sum) * 2;
}

export function calcUsedSkillsFromSpecial(npc) {
  return npc.special?.length || 0;
}

export function calcUsedSkillsFromSpells(npc) {
  return npc.spells?.length / 2 || 0;
}

export function calcUsedSkillsFromEquip(npc) {
  let equip = false;

  if (npc.weaponattacks?.length > 0) {
    equip = true;
  }

  if (npc.armor && npc.armor.name !== "Nessuna Armatura") {
    equip = true;
  }

  if (npc.shield && npc.shield.name !== "Nessuno Scudo") {
    equip = true;
  }

  if (npc.species === "Umanoide") {
    equip = false;
  }

  return equip ? 1 : 0;
}

export function toObject(npc) {
  const obj = {
    basic: {
      name: npc.name,
      lvl: npc.lvl,
      rank: toObjectRank(npc),
      species: npc.species,
      description: npc.description,
      traits: npc.traits,
    },
    attributes: npc.attributes,
    stats: {
      hp: calcHP(npc),
      crisis: Math.floor(calcHP(npc) / 2),
      mp: calcMP(npc),
      init: calcInit(npc),
      def: npc.armor?.def > 0 ? (
          ""+calcDef(npc)
        ) : (
          "+"+calcDef(npc)
        ),
      mdef: "+"+calcMDef(npc)
    },
    affinities: npc.affinities,
    attacks: toObjectAttacks(npc),
    weaponattacks: toObjectWeaponAttacks(npc),
    spells: toObjectSpells(npc),
    actions: npc.actions,
    special: toObjectSpecial(npc),
    equip: {
      weapons: toObjectWeapons(npc),
      armor: npc.armor,
      shield: npc.shield,
    }
  }
  
  return obj;
}

function toObjectRank(npc) {
  switch (npc.rank) {
    case 'elite':
      return 'Elite';
    case 'champion2':
      return 'Campione (2)';
    case 'champion3':
      return 'Campione (3)';
    case 'champion4':
      return 'Campione (4)';
    case 'champion5':
      return 'Campione (5)';
    default:
      return '';
  }
}

function toObjectAttacks(npc) {
  const attacks = npc.attacks?.map((attack) => {
    return {
      name: attack.name,
      range: attack.range,
      attr1: attack.attr1,
      attr2: attack.attr2,
      precision: calcPrecision(attack, npc),
      damage: calcDamage(attack, npc),
      type: attack.type,
      special: attack.special,
    }
  })
  
  return attacks;
}

function toObjectWeaponAttacks(npc) {
  const attacks = npc.weaponattacks?.map((attack) => {
    return {
      name: attack.name,
      weapon: attack.weapon,
      precision: calcPrecision(attack, npc),
      damage: calcDamage(attack, npc),
      special: attack.special,
    }
  })
  
  return attacks;
}

function toObjectSpells(npc) {
  const spells = npc.spells?.map((spell) => {
    return {
      name: spell.name,
      type: spell.type,
      magic: spell.magic,
      mp: spell.mp,
      target: spell.target,
      duration: spell.duration,
      effect: spell.effect,
      attr1: spell.attr1,
      attr2: spell.attr2,
    }
  })
  
  return spells;
}

function toObjectSpecial(npc) {
  const special = [];
  
  if (npc.special) {
    npc.special.forEach((s) => {
      special.push(s);
    });
  }
  
  // Species
  if (npc.species === "Costrutto") {
    special.push({
      name: "Costrutto",
      effect: "Immune allo status **avvelenato**",
    });
  }
  
  if (npc.species === "Non Morto") {
    special.push({
      name: "Non Morto",
      effect:
        "Immune allo status **avvelenato** e ciò che farebbe recuperare Punti Vita può invece ferire (vedi pag **305**)",
    });
  }
  
  if (npc.species === "Pianta") {
    special.push({
      name: "Pianta",
      effect: "Immune agli status **confuso**, **furente**, **scosso**",
    });
  }
  
  return special
}

function toObjectWeapons(npc) {
  const weapons = [];
  
  npc.weaponattacks?.forEach((attack) => {
    if (weapons.find((weapon) => weapon.name === attack.weapon.name)) {
      return;
    }
    weapons.push(attack.weapon);
  });
  
  return weapons
}