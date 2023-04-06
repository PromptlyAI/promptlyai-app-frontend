import React from 'react'

interface IProps {
    path: string,
    method: string,
    params: any
}

export default async function Api({path, method, params}: IProps) {
    const response = await fetch(`http://localhost:5000/${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    const data = await response.json();
    return await data
}
