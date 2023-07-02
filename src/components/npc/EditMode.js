import {FormControl, Grid, Switch, Typography,} from "@mui/material";
import {toObject} from "../../libs/npcs";

export default function EditMode({npc, setNpc}) {
  const onChange = (key) => {
    return (e) => {
      setNpc((prevState) => {
        const newState = Object.assign({}, prevState);
        newState[key] = e.target.checked ? 'advanced' : 'basic';
        
        newState['advanced'] = toObject(npc);
        
        return newState;
      });
    };
  };
  
  return (
    <Grid container spacing={2} sx={{mb:2}}>
      <Grid item>
        <Typography fontFamily="Antonio" fontSize="1.3rem">Modalità avanzata</Typography>
      </Grid>
      <Grid item xs={10}>
        <FormControl variant="standard" fullWidth>
          <Switch checked={npc.mode === 'advanced'}
                  onChange={onChange('mode')}
                  inputProps={{'aria-label': 'controlled'}}/>
        </FormControl>
      </Grid>
    </Grid>
  );
}
