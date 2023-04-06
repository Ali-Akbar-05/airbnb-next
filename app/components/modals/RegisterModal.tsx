'use client'
import axios from "axios"
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from "@/app/hooks/useRegisterModel";
import { useState } from "react";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data)
            .then(() => {

            }).catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    return (
        <div>
            a
        </div>
    )
}

export default RegisterModal