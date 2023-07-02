import {Card, Grid, Typography} from "@mui/material";
import React, {Fragment} from "react";
import ReactMarkdown from "react-markdown";
import attributes from "../../libs/attributes";
import {
  toObject,
} from "../../libs/npcs";
import {CloseBracket, OpenBracket} from "../Bracket";
import Diamond from "../Diamond";
import {ActionIcon, DistanceIcon, MeleeIcon, OffensiveSpellIcon, SpellIcon,} from "../icons";
import {TypeAffinity, TypeName} from "../types";

function NpcPretty({npc}, ref) {
  let obj;
  if (npc.mode === 'advanced') {
    obj = npc.advanced;
  } else {
    obj = toObject(npc)
  }
  
  return (
    <Card>
      <div ref={ref}>
        <Header npc={obj}/>
        <Stats npc={obj}/>
        <Attacks npc={obj}/>
        <Spells npc={obj}/>
        <Actions npc={obj}/>
        <Special npc={obj}/>
        <Equip npc={obj}/>
      </div>
    </Card>
  );
}

function Header({npc}) {
  return (
    <Grid container alignItems="stretch">
      <Grid
        item
        xs
        sx={{
          background: "linear-gradient(90deg, #674168 0%, #b9a9be 100%);",
          borderRight: "4px solid white",
          px: 2,
        }}
      >
        <Typography
          color="white.main"
          fontFamily="Antonio"
          fontSize="1.5rem"
          fontWeight="medium"
          sx={{textTransform: "uppercase"}}
        >
          {npc.basic.name}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          px: 2,
          py: 0.5,
          borderLeft: "2px solid #b9a9be",
          borderBottom: "2px solid #b9a9be",
          borderImage: "linear-gradient(45deg, #b9a9be, #ffffff) 1;",
        }}
      >
        <Typography
          fontFamily="Antonio"
          fontSize="1.25rem"
          fontWeight="medium"
          sx={{textTransform: "uppercase"}}
        >
          Liv {npc.basic.lvl} {npc.basic.rank} <Diamond/> {npc.basic.species}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          px: 2,
          py: 0.5,
          borderBottom: "1px solid #b9a9be",
          borderImage: "linear-gradient(45deg, #674168, #ffffff) 1;",
        }}
      >
        <Typography>{npc.basic.description}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          px: 2,
          py: 0.5,
        }}
      >
        <Typography>
          <strong>Tratti tipici: </strong>
          {npc.basic.traits}
        </Typography>
      </Grid>
    </Grid>
  );
}

function Stats({npc}) {
  return (
    <Typography
      component="div"
      fontFamily="Antonio"
      fontWeight="bold"
      textAlign="center"
      fontSize="0.9rem"
    >
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            borderBottom: "1px solid #281127",
            borderTop: "1px solid #281127",
            borderRight: "1px solid #281127",
            borderImage: "linear-gradient(90deg, #341b35, #6d5072) 1;",
            mr: "2px",
            my: "2px",
            flexBasis: "calc(50% - 2px)",
          }}
        >
          <Grid container alignItems="stretch" justifyContent="space-between">
            <Grid
              item
              xs
              sx={{
                bgcolor: "#efecf5",
                borderRight: "1px solid #ffffff",
                py: 0.4,
              }}
            >
              DES d{npc.attributes?.dexterity}
            </Grid>
            <Grid
              item
              xs
              sx={{
                bgcolor: "#f3f0f7",
                borderRight: "1px solid #ffffff",
                py: 0.4,
              }}
            >
              INT d{npc.attributes?.insight}
            </Grid>
            <Grid
              item
              xs
              sx={{
                bgcolor: "#f6f4f9",
                borderRight: "1px solid #ffffff",
                py: 0.4,
              }}
            >
              VIG d{npc.attributes?.might}
            </Grid>
            <Grid item xs sx={{bgcolor: "#f9f8fb", py: 0.4}}>
              VOL d{npc.attributes?.will}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            borderBottom: "1px solid #281127",
            borderTop: "1px solid #281127",
            borderLeft: "1px solid #281127",
            borderImage: "linear-gradient(90deg, #6d5072, #ffffff) 1;",
            ml: "2px",
            my: "2px",
            flexBasis: "calc(50% - 2px)",
          }}
        >
          <Grid container alignItems="stretch" justifyContent="space-between">
            <Grid item sx={{px: 1, py: 0.4}}>
              PV
            </Grid>
            <Grid
              item
              sx={{
                py: 0.4,
                px: 1.5,
                color: "white.main",
                bgcolor: "red.main",
              }}
            >
              {npc.stats.hp} <Diamond color="white.main"/> {npc.stats.crisis}
            </Grid>
            <Grid item sx={{px: 1, py: 0.4}}>
              PM
            </Grid>
            <Grid
              item
              sx={{
                px: 1.5,
                py: 0.4,
                color: "white.main",
                bgcolor: "cyan.main",
              }}
            >
              {npc.stats.mp}
            </Grid>
            <Grid item xs sx={{py: 0.4}}>
              Iniz. {npc.stats.init}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderBottom: "1px solid #281127",
            borderTop: "1px solid #281127",
            borderRight: "1px solid #281127",
            borderImage: "linear-gradient(90deg, #432846, #432846) 1;",
            mr: "2px",
            flexBasis: "calc(50% - 2px)",
          }}
        >
          <Grid container justifyItems="space-between">
            <Grid
              item
              xs
              sx={{
                bgcolor: "#efecf5",
                borderRight: "1px solid #ffffff",
                py: 0.4,
              }}
            >
              DIF {npc.stats.def}
            </Grid>
            <Grid
              item
              xs
              sx={{
                bgcolor: "#efecf5",
                py: 0.4,
              }}
            >
              D.MAG {npc.stats.mdef}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          sx={{
            borderBottom: "1px solid #281127",
            borderTop: "1px solid #281127",
            borderLeft: "1px solid #281127",
            borderImage: "linear-gradient(90deg, #432846, #ffffff) 1;",
            ml: "2px",
          }}
        >
          {npc.affinities && (
            <Grid container>
              <Grid item xs sx={{py: 0.4, borderRight: "1px solid #513455"}}>
                <TypeAffinity
                  type="physical"
                  affinity={npc.affinities.physical}
                />
              </Grid>
              <Grid item xs sx={{py: 0.4, borderRight: "1px solid #604365"}}>
                <TypeAffinity type="wind" affinity={npc.affinities.wind}/>
              </Grid>
              <Grid item xs sx={{py: 0.4, borderRight: "1px solid #6f5375"}}>
                <TypeAffinity type="bolt" affinity={npc.affinities.bolt}/>
              </Grid>
              <Grid item xs sx={{py: 0.4, borderRight: "1px solid #816687"}}>
                <TypeAffinity type="dark" affinity={npc.affinities.dark}/>
              </Grid>
              <Grid item xs sx={{py: 0.4, borderRight: "1px solid #957d9b"}}>
                <TypeAffinity type="earth" affinity={npc.affinities.earth}/>
              </Grid>
              <Grid item xs sx={{py: 0.4, borderRight: "1px solid #ac97b0"}}>
                <TypeAffinity type="fire" affinity={npc.affinities.fire}/>
              </Grid>
              <Grid item xs sx={{py: 0.4, borderRight: "1px solid #c4b4c7"}}>
                <TypeAffinity type="ice" affinity={npc.affinities.ice}/>
              </Grid>
              <Grid item xs sx={{py: 0.4, borderRight: "1px solid #e0d7e2"}}>
                <TypeAffinity type="light" affinity={npc.affinities.light}/>
              </Grid>
              <Grid item xs sx={{py: 0.4}}>
                <TypeAffinity type="poison" affinity={npc.affinities.poison}/>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Typography>
  );
}

function Attacks({npc}) {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          mt: 1,
          px: 2,
          py: 0.3,
          background: "linear-gradient(90deg, #6e468d 0%, #ffffff 100%);",
        }}
      >
        <Typography
          color="white.main"
          fontFamily="Antonio"
          fontSize="1.1rem"
          fontWeight="medium"
          sx={{textTransform: "uppercase"}}
        >
          Attacchi base
        </Typography>
      </Grid>
      
      {npc.attacks?.map((attack, i) => {
        return (
          <Fragment key={i}>
            <Grid item xs={1} sx={{px: 1, py: 0.5}}>
              <Typography textAlign="center">
                {attack.range === "melee" && <MeleeIcon/>}
                {attack.range === "distance" && <DistanceIcon/>}
              </Typography>
            </Grid>
            <Grid item xs={11} sx={{px: 1, py: 0.5}}>
              <Typography>
                <strong>{attack.name}</strong> <Diamond/>{" "}
                <strong>
                  <OpenBracket/>
                  {attributes[attack.attr1].shortcaps}+
                  {attributes[attack.attr2].shortcaps}
                  {attack.precision > 0 &&
                    `+${attack.precision}`}
                  <CloseBracket/> <Diamond/> <OpenBracket/>
                  TM + {attack.damage}
                  <CloseBracket/>
                </strong>{" "}
                danni {attack.type === "physical" && <strong>fisici</strong>}
                {attack.type !== "physical" && (
                  <>
                    da{" "}
                    <strong style={{textTransform: "lowercase"}}>
                      <TypeName type={attack.type}/>
                    </strong>
                  </>
                )}
                .{" "}
                {attack.special?.map((effect, i) => {
                  return (
                    <Typography component="span" key={i}>
                      <ReactMarkdown
                        allowedElements={["strong"]}
                        unwrapDisallowed={true}
                      >
                        {effect}
                      </ReactMarkdown>
                      .{" "}
                    </Typography>
                  );
                })}
              </Typography>
            </Grid>
          </Fragment>
        );
      })}
      
      {npc.weaponattacks?.map((attack, i) => {
        return (
          <Fragment key={i}>
            <Grid item xs={1} sx={{px: 1, py: 0.5}}>
              <Typography textAlign="center">
                {attack.weapon.range === "melee" && <MeleeIcon/>}
                {attack.weapon.range === "distance" && <DistanceIcon/>}
              </Typography>
            </Grid>
            <Grid item xs={11} sx={{px: 1, py: 0.5}}>
              <Typography>
                <strong>
                  {attack.name} ({attack.weapon.name}){" "}
                </strong>{" "}
                <Diamond/> {attack.weapon.hands === 1 ? "1 mano" : "2 mani"}{" "}
                <Diamond/>{" "}
                <strong>
                  <OpenBracket/>
                  {attributes[attack.weapon.att1].shortcaps}+
                  {attributes[attack.weapon.att2].shortcaps}
                  {attack.precision > 0 &&
                    `+${attack.precision}`}
                  <CloseBracket/> <Diamond/> <OpenBracket/>
                  TM + {attack.damage}
                  <CloseBracket/>
                </strong>{" "}
                danni{" "}
                {attack.weapon.type === "physical" && <strong>fisici</strong>}
                {attack.weapon.type !== "physical" && (
                  <>
                    da{" "}
                    <strong style={{textTransform: "lowercase"}}>
                      <TypeName type={attack.type}/>
                    </strong>
                  </>
                )}
                .{" "}
                {attack.special?.map((effect, i) => {
                  return (
                    <Typography component="span" key={i}>
                      <ReactMarkdown
                        allowedElements={["strong"]}
                        unwrapDisallowed={true}
                      >
                        {effect}
                      </ReactMarkdown>
                      .{" "}
                    </Typography>
                  );
                })}
              </Typography>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}

function Spells({npc}) {
  if (!npc.spells || npc.spells.length === 0) {
    return null;
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          px: 2,
          py: 0.3,
          background: "linear-gradient(90deg, #6e468d 0%, #ffffff 100%);",
        }}
      >
        <Typography
          color="white.main"
          fontFamily="Antonio"
          fontSize="1.1rem"
          fontWeight="medium"
          sx={{textTransform: "uppercase"}}
        >
          Incantesimi
        </Typography>
      </Grid>
      
      {npc.spells?.map((spell, i) => {
        return (
          <Fragment key={i}>
            <Grid item xs={1} sx={{px: 1, py: 0.5}}>
              <Typography textAlign="center">
                <SpellIcon/>
              </Typography>
            </Grid>
            <Grid item xs={11} sx={{px: 1, py: 0.5}}>
              <Typography>
                <strong>{spell.name}</strong>{" "}
                {spell.type === "offensive" && <OffensiveSpellIcon/>}{" "}
                <Diamond/>{" "}
                <strong>
                  {spell.type === "offensive" && (
                    <>
                      <OpenBracket/>
                      {attributes[spell.attr1].shortcaps}+
                      {attributes[spell.attr2].shortcaps}
                      {spell.magic > 0 && `+${spell.magic}`}
                      <CloseBracket/> <Diamond/>
                    </>
                  )}{" "}
                  {spell.mp} PM <Diamond/> {spell.target} <Diamond/>{" "}
                  {spell.duration}
                </strong>
                <br/>
                <Typography component="span" key={i}>
                  <ReactMarkdown
                    allowedElements={["strong"]}
                    unwrapDisallowed={true}
                  >
                    {spell.effect}
                  </ReactMarkdown>
                  .{" "}
                </Typography>
              </Typography>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}

function Actions({npc}) {
  const actions = [];
  
  if (npc.actions) {
    npc.actions.forEach((s) => {
      actions.push(s);
    });
  }
  
  if (actions.length === 0) {
    return null;
  }
  
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          mt: 0,
          px: 2,
          py: 0.3,
          background: "linear-gradient(90deg, #6e468d 0%, #ffffff 100%);",
        }}
      >
        <Typography
          color="white.main"
          fontFamily="Antonio"
          fontSize="1.1rem"
          fontWeight="medium"
          sx={{textTransform: "uppercase"}}
        >
          Altre Azioni
        </Typography>
      </Grid>
      
      {actions?.map((actions, i) => {
        return (
          <Fragment key={i}>
            <Grid item xs={1} sx={{px: 1, py: 0.5}}>
              <Typography textAlign="center">
                <ActionIcon/>
              </Typography>
            </Grid>
            <Grid item xs={11} sx={{px: 1, py: 0.5}}>
              <Typography>
                <strong>{actions.name}</strong> <Diamond/>{" "}
                <ReactMarkdown
                  allowedElements={["strong"]}
                  unwrapDisallowed={true}
                >
                  {actions.effect}
                </ReactMarkdown>
                .
              </Typography>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}

function Special({npc}) {
  if (npc.special?.length === 0) {
    return null;
  }
  
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          mt: 0,
          px: 2,
          py: 0.3,
          background: "linear-gradient(90deg, #6e468d 0%, #ffffff 100%);",
        }}
      >
        <Typography
          color="white.main"
          fontFamily="Antonio"
          fontSize="1.1rem"
          fontWeight="medium"
          sx={{textTransform: "uppercase"}}
        >
          Regole Speciali
        </Typography>
      </Grid>
      
      {npc.special?.map((special, i) => {
        return (
          <Fragment key={i}>
            <Grid item xs={12} sx={{px: 3, py: 0.5}}>
              <Typography>
                <strong>{special.name}</strong> <Diamond/>{" "}
                <ReactMarkdown
                  allowedElements={["strong"]}
                  unwrapDisallowed={true}
                >
                  {special.effect}
                </ReactMarkdown>
                .
              </Typography>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}


function Equip({npc}) {
  const hasWeapons = npc.equip.weapons.length !== 0;
  const hasArmor = npc.equip.armor && npc.equip.armor.name !== "Nessuna Armatura";
  const hasShield = npc.equip.shield && npc.equip.shield.name !== "Nessuno Scudo";
  
  if (!hasWeapons && !hasArmor && !hasShield) {
    return null;
  }
  
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          mt: 0,
          px: 2,
          py: 0.3,
          background: "linear-gradient(90deg, #6e468d 0%, #ffffff 100%);",
        }}
      >
        <Typography
          color="white.main"
          fontFamily="Antonio"
          fontSize="1.1rem"
          fontWeight="medium"
          sx={{textTransform: "uppercase"}}
        >
          Equipaggiamento
        </Typography>
      </Grid>
      
      {/* Weapons */}
      {npc.equip.weapons.map((weapon, i) => (
        <Grid key={i} item xs={12} sx={{px: 2, py: 0}}>
          <Typography>
            <strong>Arma:</strong> {weapon.name} <Diamond/>{" "}
            {weapon.hands === 1 ? "1 mano" : "2 mani"} <Diamond/>{" "}
            <strong>
              {" "}
              <OpenBracket/>
              {attributes[weapon.att1].shortcaps}+
              {attributes[weapon.att2].shortcaps}
              {weapon.prec > 0 && `+${weapon.prec}`}
              <CloseBracket/> <Diamond/> <OpenBracket/>
              TM + {weapon.damage}
              <CloseBracket/>
            </strong>{" "}
            danni {weapon.type === "physical" && <strong>fisici</strong>}
            {weapon.type !== "physical" && (
              <>
                da{" "}
                <strong style={{textTransform: "lowercase"}}>
                  <TypeName type={weapon.type}/>
                </strong>
              </>
            )}{" "}
            <Diamond/> <strong>{weapon.cost}</strong> zenit
          </Typography>
        </Grid>
      ))}
      
      {/* Armor */}
      {npc.equip.armor && npc.equip.armor.name !== "Nessuna Armatura" && (
        <Grid item xs={12} sx={{px: 2, py: 0}}>
          <strong>Armatura:</strong> {npc.equip.armor.name} <Diamond/>{" "}
          {npc.equip.armor.def > 0 ? (
            <strong>DIF {npc.equip.armor.def}</strong>
          ) : (
            <strong>DIF + {npc.equip.armor.defbonus}</strong>
          )}{" "}
          <Diamond/> <strong>D. MAG +{npc.equip.armor.mdefbonus}</strong> <Diamond/>{" "}
          Iniz. <strong>{npc.equip.armor.init}</strong> <Diamond/>{" "}
          <strong>{npc.equip.armor.cost}</strong> zenit
        </Grid>
      )}
      
      {/* Shield */}
      {npc.equip.shield && npc.equip.shield.name !== "Nessuno Scudo" && (
        <Grid item xs={12} sx={{px: 2, py: 0}}>
          <strong>Scudo:</strong> {npc.equip.shield.name} <Diamond/>{" "}
          {npc.equip.shield.def > 0 ? (
            <strong>DIF {npc.equip.shield.def}</strong>
          ) : (
            <strong>DIF + {npc.equip.shield.defbonus}</strong>
          )}{" "}
          <Diamond/> <strong>D. MAG +{npc.equip.shield.mdefbonus}</strong>{" "}
          <Diamond/> Iniz. <strong>{npc.equip.shield.init}</strong> <Diamond/>{" "}
          <strong>{npc.equip.shield.cost}</strong> zenit
        </Grid>
      )}
    </Grid>
  );
}

export default React.forwardRef(NpcPretty);