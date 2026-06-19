import api from '@/lib/api/apiClient';
import useAuthStore from '@/lib/store/authStore'
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const {user, setAuth, setCleanAuth, token} = useAuthStore();

    const location = useLocation();

    const {data, error, isError, isLoading, isSuccess} = useQuery({
        queryKey: ['currentUser', token],
        queryFn: async () => {
            const response = await api.get("/auth/protect");
            return response.data
        },
        enabled: !!token,
        retry: 1
    })

    console.log({
    user,
    token,
    isLoading,
    isSuccess,
    isError,
    data
});
    // Error case 
    useEffect(()=> {

        if(isError){    
            setCleanAuth();
        }

    },[isError, error, setCleanAuth]);

    // Success case
    useEffect(()=> {
        if(isSuccess && data){
            setAuth(data, token);
        }
    },[isSuccess, data , token , setAuth]);

    if(isLoading){
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader2  className='animate-spin'/>
            </div>
        )
    }
    // 2. WAIT for the store to sync. 
    // If the API was successful but the store 'user' isn't set yet, 
    // keep showing the loader for one more frame instead of redirecting.
    // if (isSuccess && !user) {
    //     return (
    //         <div className='flex h-screen items-center justify-center'>
    //             <Loader2 className='animate-spin' />
    //         </div>
    //     );
    // }

    if(isError){
        console.log("error here", error);
        return <Navigate to="/login"  state={{from : location}} replace/>
    }

    // changed to token ot make more stable then !user
    if(!user){
        console.log("user not found", user)
        return <Navigate to="/login"  state={{from : location}} replace/>
    }

    return children;
}

export default ProtectedRoute