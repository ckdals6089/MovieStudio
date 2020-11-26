
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions'

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                //Not Loggined in Status 
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                    //Loggined in Status
                } else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                        //Logged in Status, but Try to go into log in page 
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}