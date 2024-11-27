import { Divider } from "@nextui-org/react"

interface QN_SectionDividerProps {
    title?: string
    endLine?: boolean
    sectionPadding?: string
    children: React.ReactNode
}

export default function QN_SectionDivider({ title, endLine = false, sectionPadding, children }: QN_SectionDividerProps) {
    return (
        <div style={{padding: sectionPadding}}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Divider style={{ flex: 1 }} />
                <span style={{ textAlign: 'center', padding: '0 20px', whiteSpace: 'nowrap', fontSize: '12px'}}>
                    {title}
                </span>
                <Divider style={{ flex: 1}} />
            </div>

            {children}
            {endLine && (
                <Divider style={{marginTop: '10px'}}/>
            )}
        </div>
    )
}
