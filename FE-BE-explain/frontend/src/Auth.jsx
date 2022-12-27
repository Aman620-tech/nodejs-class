/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminProtected(props) {
    let Cmp = props.cmp;

    const [authorized, SetAuthorized] = useState(false)

    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('token')) {

            window.alert("token required")
            navigate('/login')
            console.log("hello");
        } else {
            SetAuthorized(true);
        }

    }, [0])

    return (

        (authorized && <Cmp />)
    )
}

export function UserProtected(props) {
    let Cmp = props.cmp;
    // console.log(props);
    // console.log(Cmp);
    const [authorized, SetAuthorized] = useState(false)

    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.alert("token required")

            navigate('/login')
            // console.log("hello");
        }
        else {
            SetAuthorized(true);
            // console.log("world");
        }

    }, [0])

    return (

        (authorized && <Cmp />)
    )
}
