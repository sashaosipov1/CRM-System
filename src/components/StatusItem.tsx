import classes from "../styles/StatusItem.module.css";

const StatusItem: React.FC<{ onChekerClick: (status: string) => void, title: string, value: number, status: string, isActive: boolean }> = (props) => {
    return (
        <li className={props.isActive ? classes.statusItem + " " + classes.isActive : classes.statusItem} onClick={props.onChekerClick.bind(null, props.status)}>
            <div>{props.title}</div>
            <div>({props.value})</div>
        </li>
    )
}

export default StatusItem;