import { Tabs, Tab } from '@nextui-org/react';

interface QN_TabsProps {
    tabs: string[]
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    path?: string
}

export default function QN_Tabs({ tabs, value, setValue, path }: QN_TabsProps) {
    const newWidth = path === undefined ? 'w-screen' : 'w-full'

    const handleTabChange = (key: React.Key) => {
        if (typeof key === 'string') {
            setValue(key)
        }
    };

    return (
        <Tabs
            className={'w-full'}
            style={{
                backgroundColor: path ? 'white' : '#55B7FE',
                borderRadius: '10px',
                padding: '2px 2px',
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                border: path ? '1px solid' : ''
            }}
            color="primary"
            selectedKey={value}
            onSelectionChange={handleTabChange}
            classNames={{
                tabList: 'flex w-full',
                tab: `${newWidth} font-semibold text-gray-700 border-solid-black`,
                cursor: 'bg-[#55B7FE] text-white font-bold',
                tabContent: 'w-full'
            }}
        >
            {tabs.map((tab, index) => (
                <Tab title={tab} key={tab} />
            ))}
        </Tabs>
    )
}
//#676767