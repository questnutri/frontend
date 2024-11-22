import { Tabs, Tab } from '@nextui-org/react';

interface QN_TabsProps {
    tabs: string[]
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function QN_Tabs({ tabs, value, setValue }: QN_TabsProps) {
    const handleTabChange = (key: React.Key) => {
        if (typeof key === 'string') {
            setValue(key)
        }
    };

    return (
        <Tabs
            className={'w-full'}
            style={{
                backgroundColor: '#55B7FE',
                borderRadius: '10px',
                padding: '2px 2px',
                flex: '1',
            }}
            color="primary"
            selectedKey={value}
            onSelectionChange={handleTabChange}
            classNames={{
                tabList: 'flex',
                tab: 'w-screen font-semibold text-gray-700 ',
                cursor: 'bg-[#55B7FE] text-white font-bold',
            }}
        >
            {tabs.map((tab, index) => (
                <Tab title={tab} key={tab} />
            ))}
        </Tabs>
    )
}
//#676767