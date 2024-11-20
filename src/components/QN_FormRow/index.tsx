import React from "react"

interface QN_FormRowProps {
    height?: string
    children?: React.ReactNode
}

export default function QN_FormRow({ height = 'fit-content', children }: QN_FormRowProps): JSX.Element {
    return (
        <div style={{ height: `${height}`, minHeight: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
            {React.Children.map(children, (child) => (
                <div style={{ flex: '1', textAlign: 'start', height: '10px' }}>
                    {child}
                </div>
            ))}
        </div>
    )
}