'use client'
import React from "react"

interface QN_FormRowProps {
    height?: string
    children?: React.ReactNode
}

export default function QN_FormRow({ height = 'fit-content', children }: QN_FormRowProps): JSX.Element {
    return (
        <div
            style={{
                height: `${height}`,
                minHeight: '50px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                alignItems: 'center'
            }}
        >
            {React.Children.map(children, (child) => (
                <div
                    style={{
                        flex: '1',
                        textAlign: 'start',
                        height: '70px'
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    )
}