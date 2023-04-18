'use client'
import { signIn } from 'next-auth/react';
import axios from "axios"
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { useCallback, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModel from "@/app/hooks/useLoginModel";
import useRegisterModal from "@/app/hooks/useRegisterModel";
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModel = useLoginModel();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        debugger;
        signIn('credentials', {
            ...data,
            redirect: false
        }).then(callback => {
            setIsLoading(false)
            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModel.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })

    }
    const togole = useCallback(() => {
        loginModel.onClose();
        registerModal.onOpen();
    }, [loginModel, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome Back"
                subTitle="Login to your Account"
                center

            />
            <Input id="email" label="Email"
                disabled={isLoading}
                placeHolder='test@test.com'
                register={register} errors={errors} required />

            <Input id="password" type="password" label="Password"
                disabled={isLoading}
                placeHolder='test'
                register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="Continue with Google"
                icon={FcGoogle} onClick={() => signIn('google')} />

            <Button outline label="Continue with Github"
                icon={AiFillGithub} onClick={() => signIn('github')} />

            <div className="
                text-neutral-500
                text-center mt-4 font-light
                ">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>First time using Airbnb?</div>

                    <div onClick={togole}
                        className="text-neutral-800 cursor-pointer hover:underline">
                        Create an account
                    </div>
                </div>

            </div>
        </div>
    )

    return (
        <div>
            <Modal disabled={isLoading}
                isOpen={loginModel.isOpen}
                title="Login"
                actionLabel="Login"
                onClose={loginModel.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}
            />

        </div>
    )
}

export default LoginModal