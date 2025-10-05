"use client"
import { AuthContext } from '@/context/AuthContext';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface AuthContextType {
    user: any | null;
}

function Provider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const { user, isLoaded } = useUser();

    return (
        <NextThemesProvider {...props}>
            <AuthContext.Provider value={{ user: isLoaded ? user : null }}>
                <div>
                    {children}
                </div>
            </AuthContext.Provider>
        </NextThemesProvider>
    )
}

// Custom hook to use auth
export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default Provider

