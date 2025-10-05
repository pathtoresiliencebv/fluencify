"use client"
import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'
import { useAuthContext } from '../provider';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ProfileAvatar() {

    const { user } = useAuthContext();
    const { signOut } = useClerk();
    const router = useRouter();
    
    const onButtonPress = () => {
        signOut().then(() => {
            router.replace('/')
        }).catch((error) => {
            console.error('Sign out error:', error);
        });
    }
    
    return (
        <div>
            <Popover >
                <PopoverTrigger>
                    {user?.imageUrl && <img src={user?.imageUrl} alt='profile' className='w-[35px] h-[35px] rounded-full' />}
                </PopoverTrigger>
                <PopoverContent className='w-full mx-w-lg cursor-pointer'>
                    <h2 onClick={onButtonPress}>Logout</h2>

                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ProfileAvatar