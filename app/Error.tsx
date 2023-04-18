'use client'
import { useEffect } from "react"
import EmptyState from "./components/EmptyState"
import { title } from "process"
import { subtle } from "crypto"

interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <EmptyState title="Uh Oh" subTitle="Some thing went wrong"
        />
    )
}
export default ErrorState;