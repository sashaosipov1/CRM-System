import type { TodoInfo, TodoInfoKey } from "../../models/TodoInterfaces";
import { statusMapping } from "../../models/statusMapping";
import { Tabs } from "antd";
import type { TabsProps } from 'antd';

function isTodoStatusKey(key: string): key is TodoInfoKey {
    return Object.keys(statusMapping).includes(key);
}

const StatusChecker: React.FC<{
    onCheckerClick: (status: TodoInfoKey) => void;
    statuses: TodoInfo;
    status: TodoInfoKey;
}> = (props) => {
    const items: TabsProps['items'] = [];

    const onTabClick = (activeKey: string) => {
        if (!isTodoStatusKey(activeKey)) {
            throw new Error('status error');
        }

        props.onCheckerClick(activeKey);
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