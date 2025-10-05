"use client"
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react'

function Authentication({ children }: any) {
    const { signIn, isLoaded } = useSignIn();
    const router = useRouter();
    
    const onButtonPress = async () => {
        if (!isLoaded) return;
        
        try {
            const result = await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/app',
                redirectUrlComplete: '/app'
            });
            
            if (result.status === 'complete') {
                router.replace('/app');
            }
        } catch (error) {
            console.error('Sign in error:', error);
        }
    }
    
    return (
        <div>
            <div onClick={onButtonPress}>
                {children}
            </div>
        </div>
    )
}

export default Authentication