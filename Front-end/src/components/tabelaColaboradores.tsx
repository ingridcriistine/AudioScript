import React from "react"

interface Linha {
    id: string,
    name: string,
    email: string
}

export const Colaborador = ({id, name, email} : Linha) => {
    return(
        <div className="flex gap-1">
            <span className="w-[20%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{id}</span>
            <span className="w-[40%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{name}</span>
            <span className="w-[40%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{email}</span>
        </div>
    )
}