'use client'
import React from 'react'
import QN_Button from '../QN_Button';

interface QN_FormProps {
    title?: string
    actionButton?: React.ReactNode
    children: React.ReactNode
}

export default function QN_Form({ children, actionButton, title }: QN_FormProps): JSX.Element {

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
                justifyContent: 'space-between',
                boxSizing: 'border-box'
            }}
        >
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <h1 style={{ color: 'black', fontWeight: '600', marginLeft: '5px', fontSize: '20px', width: '100%' }}>{title}</h1>
                <div style={{ width: '180px', height: '45px', marginRight: '-15px' }}>
                    {actionButton}
                </div>
            </div>
            {children}
        </div>

    );
}
