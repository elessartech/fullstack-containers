import { Box, List, ListItem, Typography } from "@material-ui/core"
import { useStateValue } from "../state"
import { HospitalEntry } from "../types"
import {FaHospital} from 'react-icons/fa';

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry})  => {
    const [{ diagnoses }] = useStateValue()  
    return (
        <Box margin={'2em'} border={'1px solid black'} borderRadius={'5px'} padding={'2em'}>
            <Typography>{entry.date}<FaHospital/></Typography>
            <Typography style={{fontStyle: 'italic'}}>{entry.description}</Typography>
            <List>
                {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => {
                    const definedDiagnose = Object.values(diagnoses).find(diagnose => diagnose.code === code)?.name
                    return (
                        <ListItem>{`${code} ${definedDiagnose}`} </ListItem>
                    )
                    }
                ) 
                : null}
            </List>
            <Typography>{`diagnosed by ${entry.specialist}`}</Typography>
        </Box>
    )
}

export default Hospital