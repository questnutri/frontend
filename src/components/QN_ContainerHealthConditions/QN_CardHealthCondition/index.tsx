import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { MdAddBox } from "../../../icons/index";

interface QN_CardHealthConditionProps {
    name: string;
    key?: string;
    severity?: "mild" | "moderate" | "severe";
    obs?: string;
    dosage?: string;
    frequency?: string;
    diagnosedAt?: Date;
    treatment?: string;
}

export default function QN_CardHealthCondition({
    name,
    key,
    severity = "mild",
    obs,
    dosage,
    frequency,
    diagnosedAt,
    treatment,
}: QN_CardHealthConditionProps) {
    const isAddCard = name === "Adicionar";

    const handleCardClick = () => {
        console.log(`Card clicado: ${name}`);
    };

    const renderAddCard = () => (
        <>
            <CardBody className="overflow-visible text-sm p-2 font-bold text-center flex justify-center items-center">
                {name}
            </CardBody>
            <CardFooter className="bg-white flex justify-center">
                <MdAddBox color="#55b7fe" size={40} />
            </CardFooter>
        </>
    );

    const renderHealthConditionCard = () => (
        <>
            <CardBody className="overflow-visible text-sm p-2 font-bold text-center flex flex-col justify-center gap-1">
                <div>{name}</div>
                {dosage && <div className="text-xs font-normal">Dosage: {dosage}</div>}
                {frequency && <div className="text-xs font-normal">Frequency: {frequency}</div>}
                {treatment && <div className="text-xs font-normal">Treatment: {treatment}</div>}
                {diagnosedAt && (
                    <div className="text-xs font-normal">
                        Diagnosed: {diagnosedAt.toLocaleDateString()}
                    </div>
                )}
                {obs && <div className="text-xs font-normal">Notes: {obs}</div>}
            </CardBody>
            <CardFooter className="bg-white flex justify-center">
                <Chip
                    className="w-3"
                    color={
                        severity === "mild"
                            ? "success"
                            : severity === "moderate"
                                ? "warning"
                                : "danger"
                    }
                >
                    {severity}
                </Chip>
            </CardFooter>
        </>
    );

    return (
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-1 h-fit">
            <Card
                key={key}
                className="flex flex-col justify-center cursor-pointer border-solid border-1 border-black w-32 h-32"
                onClick={handleCardClick}
            >
                {isAddCard ? renderAddCard() : renderHealthConditionCard()}
            </Card>
        </div>
    );
}
