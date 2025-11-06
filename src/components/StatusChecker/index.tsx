import type { TodoInfo } from "../../models/TodoInterfaces";
import { statusMapping } from "../../models/statusMapping";
import { Tabs } from "antd";
import type { TabsProps } from 'antd';

function isTodoStatusKey(key: string): key is keyof TodoInfo {
    const validKeys = Object.keys(statusMapping) as Array<keyof TodoInfo>;
    return validKeys.includes(key as keyof TodoInfo);
}

const StatusChecker: React.FC<{
    onCheckerClick: (status: keyof TodoInfo) => void;
    statuses: TodoInfo;
    status: keyof TodoInfo;
}> = (props) => {
    const items: TabsProps['items'] = [];

    const onTabClick = (activeKey: string) => {
        if (!isTodoStatusKey(activeKey)) {
            throw new Error('status error');
        }

        props.onCheckerClick(activeKey);
        console.log('Выбран статус:', activeKey);
    };

    Object.entries(props.statuses).forEach(([key, value]) => {
        if (!isTodoStatusKey(key)) {
            throw new Error('status error');
        }

        const label = `${statusMapping[key]} (${value})`;

        items.push({
            key,
            label,
        });
    });

    return (
        <Tabs
            defaultActiveKey={props.status}
            items={items}
            onTabClick={onTabClick}
        />
    );
};

export default StatusChecker;