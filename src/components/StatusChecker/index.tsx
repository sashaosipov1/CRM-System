import type { TodoInfo } from "../../models/TodoInterfaces";
import { statusMapping } from "../../models/statusMapping";
import { Tabs } from "antd";
import type { TabsProps } from 'antd';

const StatusChecker: React.FC<{ onCheckerClick: (status: keyof TodoInfo) => void, statuses: TodoInfo, status: keyof TodoInfo }> = (props) => {
    const items: TabsProps['items'] = [];

    const onTabClick = (activeKey: string) => {
        const status = activeKey as keyof TodoInfo;
        props.onCheckerClick(status);
        console.log(status);
    };

    Object.entries(props.statuses).map(([key, value]) => {
        const typedKey = key as keyof TodoInfo;
        const typedValue = value as number;

        let obj = {
            key: typedKey,
            label: `${statusMapping[typedKey]} (${typedValue})`,
        }

        items.push(obj);
    })

    return (
        <Tabs defaultActiveKey="1" items={items} onTabClick={onTabClick} />
    )
}

export default StatusChecker;