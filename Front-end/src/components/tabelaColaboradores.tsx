import React from "react"

export interface Linha {
    Id?: number
    CodigoFunc: string;
    Nome: string;
    Email: string;
}

export const Colaborador = ({CodigoFunc, Nome, Email} : Linha) => {
    return(
        <div className="flex gap-1">
            <span className="w-[20%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{CodigoFunc}</span>
            <span className="w-[40%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{Nome}</span>
            <span className="w-[40%] bg-[#272725] h-8 rounded-sm p-2 items-center flex">{Email}</span>
        </div>
    )
}