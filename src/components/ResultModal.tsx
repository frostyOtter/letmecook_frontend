import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
  
interface ResultModalProps {
title: string;
image: string;
time: number;
cook: string;
isOpen: boolean;
onClose: () => void;
}

export default function ResultModal({
title,
image,
time,
cook,
isOpen,
onClose,
}: ResultModalProps) {
const steps = cook.split(/(\d+\.\s)/).filter(step => step.trim() !== "").map((step, index, array) => {
    if (step.match(/^\d+\.\s$/) && array[index + 1]) {
    return step + array[index + 1];
    } else if (index > 0 && !step.match(/^\d+\.\s$/)) {
    return null;
    }
    return step;
}).filter(step => step !== null);

const formattedSteps = steps.map(step => {
    if (step) {
    return step.split(/\n{1,2}/).map((subStep, subIndex) => (
        <p key={`${subStep}-${subIndex}`}>{subStep.trim()}</p>
    ));
    }
    return null;
});

return (
    <Modal
    backdrop="opaque"
    isOpen={isOpen}
    onOpenChange={onClose}
    classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
    }}
    >
    <ModalContent>
        {(onClose) => (
        <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
            <img src={image} alt={title} className="w-full object-cover rounded-lg" />
            <p>
                <strong>Time:</strong> {time}
            </p>
            <div>
                <strong>Cook:</strong>
                {formattedSteps}
            </div>
            </ModalBody>
            <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
                Close
            </Button>
            </ModalFooter>
        </>
        )}
    </ModalContent>
    </Modal>
);
}
  