import StatusItem from "../StatusItem";
import type { TodoInfo } from "../../models/TodoInterfaces";
import { statusMapping } from "../../models/statusMapping";
import classes from "./StatusCheker.module.css";

const StatusChecker: React.FC<{ onCheckerClick: (status: keyof TodoInfo) => void, statuses: TodoInfo, status: keyof TodoInfo }> = (props) => {
    return (
        <ul className={classes.statusCheker}>
            {
                Object.entries(props.statuses).map(([key, value]) => {
                    const typedKey = key as keyof TodoInfo;
                    const typedValue = value as number;

                    return (
                        <StatusItem
                            onCheckerClick={props.onCheckerClick}
                            key={typedKey}
                            title={statusMapping[typedKey]}
                            value={typedValue}
                            status={typedKey}
                            isActive={props.status === typedKey}
                        />
                    );
                })
            }
        </ul>
    )
}

export default StatusChecker;