'use client'
import { useState } from "react";
import QN_HeaderTable from "./QN_HeaderTable";
import QN_TableBody from "./QN_TableBody";

interface QN_NutritinalTableProps {
    bgColor: string
    removeHeadTable?: boolean
    label?: string
    bgRowHeader?: string
    fontColorHead?: string
    columns: string[],
    values: Array<{
        label: string;
        portion?: string;
        quantity?: string;
    }>
}

export default function QN_NutritionalTable({
    bgColor = '#EAEAEA',
    removeHeadTable = false,
    label,
    bgRowHeader,
    fontColorHead,
    values,
    columns
}: QN_NutritinalTableProps) {

    return (
        <div
            style={{
                backgroundColor: `${bgColor}`,
                width: '100%',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                height: 'fit-content',
                gap: '5px'
            }}
        >
            <h1
                style={{
                    color: 'black',
                    textAlign: 'end',
                    fontSize: '13px',
                    fontWeight: '500'
                }}
            >
                {label}
            </h1>
            {removeHeadTable ? (
                <></>
            ) :
                <QN_HeaderTable />
            }
            {<QN_TableBody columns={columns} values={values} bgColorRowHead={bgRowHeader} fontColorHead={fontColorHead} />}
        </div>
    )
}