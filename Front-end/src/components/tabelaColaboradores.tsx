import React from "react"

interface Linha {
    id: string,
    name: string,
    email: string
}

export const Colaborador = ({id, name, email} : Linha) => {
    return(
        <div className="flex gap-2">
            <span className="w-[20%] bg-gray-500 h-8">{id}</span>
            <span className="w-[40%] bg-gray-500 h-8">{name}</span>
            <span className="w-[40%] bg-gray-500 h-8">{email}</span>
        </div>
    )
}