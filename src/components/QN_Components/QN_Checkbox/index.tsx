'use client'
import { Checkbox } from "@nextui-org/react";

export default function QN_Checkbox({ selected, isDisabled, onChange }: { selected: boolean, isDisabled: boolean, onChange: () => void | Promise<void> }) {

    return (
        <div style={{ marginLeft: '30px' }}>
            <Checkbox
                isDisabled={selected}
                defaultSelected={selected}
                size="lg"
                style={{
                    borderColor: 'red'
                }}
                onChange={onChange}
            >
            </Checkbox>
        </div>
    );
}