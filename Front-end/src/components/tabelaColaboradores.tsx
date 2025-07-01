import React from "react"

export interface Linha {
    Id: string,
    Name: string,
    Email: string
}

export const Colaborador = ({Id, Name, Email} : Linha) => {
    return(
        <div className="flex gap-1">
            <span className="w-[20%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{Id}</span>
            <span className="w-[40%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{Name}</span>
            <span className="w-[40%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{Email}</span>
        </div>
    )
}