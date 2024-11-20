import React from 'react'

interface QN_FormProps {
    title?: string
    children: React.ReactNode
}

export default function QN_Form({ children, title }: QN_FormProps): JSX.Element {
    return (
        <div
            style={{
                width: "100%",
                height: 'fit-content',
                backgroundColor: 'white',
                padding: '15px 25px 25px 15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                border: '1px solid black',
                borderRadius: '10px',
                color: 'black',
                gap: '20px',
                justifyContent: 'space-between'
            }}
        >
            <h1 style={{ color: 'black', fontWeight: '600', marginLeft: '5px' }}>{title}</h1>
            {children}
        </div>
    );
}
