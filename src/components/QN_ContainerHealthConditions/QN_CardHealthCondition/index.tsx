import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { MdAddBox } from '../../../icons/index';

interface QN_CardHealthConditionProps {
    key?: number;
    name: string;
    everity?: "mild" | "moderate" | "severe";
    obs?: string;
    dosage?: string;
    frequency?: string;
    diagnosedAt?: Date;
    treatment?: string;
}

export default function QN_CardHealthCondition({
    name,
    key,
    everity = 'mild',
    obs,
    dosage,
    frequency,
    diagnosedAt,
    treatment
}: QN_CardHealthConditionProps) {
    const isAddCard = name === 'Adicionar';
    console.log("Props recebidas:", { name, dosage, frequency, treatment, diagnosedAt, obs });


    const renderContent = () => {
        if (isAddCard) {
            return (
                <>
                    <CardBody className="overflow-visible text-sm p-2 font-bold text-center flex justify-center items-center">
                        {name}
                    </CardBody>
                    <CardFooter className="bg-white flex justify-center">
                        <MdAddBox color="#55b7fe" size={40} />
                    </CardFooter>
                </>
            );
        }

        return (
            <>
                <CardBody className="overflow-visible text-sm p-2 font-bold text-center flex flex-col justify-center gap-1">
                    <div>{name}</div>
                    {dosage && <div className="text-xs font-normal">Dosage: {dosage}</div>}
                    {frequency && <div className="text-xs font-normal">Freq: {frequency}</div>}
                    {treatment && <div className="text-xs font-normal">Treatment: {treatment}</div>}
                    {diagnosedAt && (
                        <div className="text-xs font-normal">
                            Diagnosed: {diagnosedAt.toLocaleDateString()}
                        </div>
                    )}
                    {obs && <div className="text-xs font-normal">{obs}</div>}
                </CardBody>
                <CardFooter className="bg-white flex justify-center">
                    <Chip className="w-3" color={everity === 'mild' ? 'secondary' : everity === 'moderate' ? 'warning' : 'danger'} >{everity}</Chip>
                </CardFooter>
            </>
        );
    };

    return (
        <div className="gap-2 grid grid-cols-5 sm:grid-cols-2 h-fit">
            <Card
                key={key || 'add'}
                className="flex flex-col justify-center"
                classNames={{
                    base: 'border-solid border-1 border-black w-32 h-32'
                }}
            >
                {renderContent()}
            </Card>
        </div>
    );
}