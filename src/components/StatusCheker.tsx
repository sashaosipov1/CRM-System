import StatusItem from "./StatusItem";
import type { ITodoInfo } from "../models/status";
import { statusMapping } from "../models/statusMapping";
import classes from "../styles/StatusCheker.module.css";

const StatusCheker: React.FC<{ onChekerClick: (status: string) => void, statuses: ITodoInfo, status: string }> = (props) => {
    return (
        <ul className={classes.statusCheker}>
            {
                Object.entries(props.statuses).map(([key, value]) => (
                    <StatusItem onChekerClick={props.onChekerClick} key={key} title={statusMapping[key]} value={value} status={key} isActive={props.status === key} />
                ))
            }
        </ul>
    )
}

export default StatusCheker;