"use client"

import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Capa from "@/assets/bg-login.jpg";
import { useState } from "react";

export default function Home() {

  const [codEmpresa, setCodEmpresa] = useState<string>("");
  const [codFuncionario, setCodFuncionario] = useState<string>("");
  const [error,setError] = useState<boolean>(false)

  const Logar = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codigoEmpresa: codEmpresa,
          codigoFunc: codFuncionario
        }),
      });

      const result = await response.json();

      if (response.status > 400 && response.status < 500) {
        setError(true)
        setCodEmpresa("")
        setCodFuncionario("")
        alert(result.message);
      } else {
        // sessionStorage.setItem("Token", "Bearer " + result.token)
        setError(false);
        setCodEmpresa("")
        setCodFuncionario("")
      }
      console.log(result)

    } catch (erro) {
      setError(true)
    }
  }

  return (
    <div className="flex items-center h-screen w-full">
      <Image className="w-[45%] h-full flex justify-start items-start" src={Capa} alt={"Logo AudioScript"} />
      <div className="flex items-center justify-center w-[50%]">
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="text-[#FF8502] font-bold text-[30px] mb-6">Login</h2>
          <input placeholder="Código da empresa" className="border w-[400px] border-[rgb(255,133,2)] text-[16px] rounded-md p-2 pl-5 placeholder:opacity-60" value={codEmpresa} onChange={(event) => { setCodEmpresa(event?.target.value) }}></input>
          <input placeholder="Seu código de verificação" className="border w-[400px] border-[#FF8502] text-[16px] rounded-md p-2 pl-5 placeholder:opacity-60" value={codFuncionario} onChange={(event) => { setCodFuncionario(event?.target.value) }}></input>
          <button className="bg-[#FF8502] font-bold p-1 pl-6 pr-6 rounded-md mt-6 opacity-80 cursor-pointer hover:opacity-100">Entrar</button>
        </div>
      </div>
    </div>
  );
}
