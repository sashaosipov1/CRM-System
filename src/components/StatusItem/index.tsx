import classes from "./StatusItem.module.css";
import type { TodoInfo } from "../../models/TodoInterfaces";

const StatusItem: React.FC<{ onCheckerClick: (status: keyof TodoInfo) => void, title: string, value: number, status: keyof TodoInfo, isActive: boolean }> = (props) => {
    return (
        <li className={props.isActive ? classes.statusItem + " " + classes.isActive : classes.statusItem} onClick={props.onCheckerClick.bind(null, props.status)}>
            <div>{props.title}</div>
            <div>({props.value})</div>
        </li>
    )
}

export default StatusItem;