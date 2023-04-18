'use client'
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import React, { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModel';
import useLoginModel from '@/app/hooks/useLoginModel';
import useRentModel from '@/app/hooks/useRentModel';

import { signOut } from 'next-auth/react'

import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';


interface UserMenuProps {
    currentUser?: SafeUser | null;
}


const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModel = useLoginModel();
    const rentModal = useRentModel();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModel, rentModal])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >Airbnb your home</div>
                <div onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden top-12 right-0 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (<>
                            <MenuItem label='My trimps' onClick={() =>router.push('/trips')} />
                            <MenuItem label='My favorites' onClick={() =>router.push('/favorites')} />
                            <MenuItem label='My reservation' onClick={() => router.push("/reservations")} />
                            <MenuItem label='My properties' onClick={() =>router.push("/properties")} />
                            <MenuItem label='Airbnb my home' onClick={rentModal.onOpen} />
                            <hr />
                            <MenuItem label='Logout' onClick={() => signOut()} />
                        </>) : (
                            <>
                                <MenuItem label='Login' onClick={loginModel.onOpen} />
                                <MenuItem label='Sign Up' onClick={registerModal.onOpen} />
                            </>
                        )}
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default UserMenu;