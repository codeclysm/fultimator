import {Alert, FormControl, Grid,} from "@mui/material";
import CodeMirror from '@uiw/react-codemirror';
import {toObject} from "../../libs/npcs";
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {linter} from '@codemirror/lint';

export default function EditAdvanced({npc, setNpc}) {
  const onChange = (key) => {
    return (e) => {
      setNpc((prevState) => {
        const newState = Object.assign({}, prevState);
        
        try {
          const obj = JSON.parse(e);
          newState[key] = obj;
          
        } catch (SyntaxError) {
          return newState
        }
        
        return newState;
      });
    };
  };
  
  if (!npc.advanced) {
    npc.advanced = toObject(npc)
  }
  
  const text = JSON.stringify(npc.advanced, null, 2);
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Alert severity="warning">Occhio: Uscire dalla modalità avanzata resetta tutte le modifiche</Alert>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="standard" fullWidth sx={{mt: 2}}>
          <CodeMirror
            value={text}
            extensions={[json(), linter(jsonParseLinter())]}
            onChange={onChange("advanced")}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
