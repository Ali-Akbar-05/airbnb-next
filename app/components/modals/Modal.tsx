'use client';
import { useCallback, useEffect, useState } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLable?: string;
}
const Modal: React.FC<ModalProps> = ({
    isOpen, onClose, onSubmit, title,
    body, footer, actionLabel, disabled,
    secondaryAction, secondaryLable
}) => {
    const [showModel, setShowModel] = useState(isOpen);

    useEffect(() => {
        setShowModel(isOpen);
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModel(false);

        setTimeout(() => {
            onClose()
        }, 300);
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled)
            return;
        onSubmit();
    }, [disabled, onSubmit])

const handleSecondaryAction = useCallback(()=?{
    
})

    return (
        <div>Modal</div>
    )
}

export default Modal;