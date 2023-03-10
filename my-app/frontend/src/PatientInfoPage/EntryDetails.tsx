import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />
        default:
            return <HealthCheckEntry entry={entry} />;
    }
}   

export default EntryDetails