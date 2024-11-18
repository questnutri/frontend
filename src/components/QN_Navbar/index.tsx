'use client'
import React from 'react'

interface QN_NavbarProps {
    padding?: {
        left?: number
        right?: number
        bottom?: number
        top?: number
    }
    header?: React.ReactNode
    footer?: React.ReactNode
    children: React.ReactNode
}

export default function QN_Navbar({ header, footer, children }: QN_NavbarProps) {
    return (
        <>

            <div style={{
                width: '250px',
                backgroundColor: '#D9D9D9',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '30px 0px',
                gap: '20px',
            }}>
                {header && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '10%',
                        fontSize: '15px',
                        gap: '10px'
                    }}>
                        {header}
                    </div>
                )}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    gap: '10px'
                }}
                >
                    {children}
                </div>
                {footer && (
                    <>
                        <div style={{
                            height: '10%',
                            marginTop: 'auto',
                            marginBottom: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px'
                        }}>
                            {footer}
                        </div>
                    </>
                )}

            </div>
        </>
    )
}