"use client";

import Image from "next/image";
import Capa from "@/assets/bg-login.jpg";
import { useState } from "react";

export default function Home() {
  const [codEmpresa, setCodEmpresa] = useState<string>("");
  const [codFuncionario, setCodFuncionario] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  const Logar = async () => {
    try {
      const response = await fetch("http://localhost:5000/login/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codEmpresa: codEmpresa.trim(),
          codFuncionario: codFuncionario.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setModalMessage(result.erro || "Erro no login");
        // setShowModal(true);
        alert("Erro ao logar")
        setCodEmpresa("");
        setCodFuncionario("");
        return;
      }

      localStorage.setItem("idUsuario", result.usuario.id);
      localStorage.setItem("idEmpresa", result.usuario.empresaId);

      alert(result.mensagem || "Login realizado com sucesso");
      console.log("Usuário autenticado:", result.usuario);
      setError(false);
      setCodEmpresa("");
      setCodFuncionario("")

    } catch (erro) {
      console.error("Erro ao logar:", erro);
      alert("Erro ao conectar com o servidor. Verifique sua conexão.");
      setError(true);
    }

    
  };

  return (
    <>
    {showModal && (
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg z-50 transition-opacity duration-300"></div>
    )}
    <div className="flex items-center h-screen w-full">
        <Image
          className="w-[45%] h-full flex justify-start items-start"
          src={Capa}
          alt="Imagem de fundo"
        />
        <div className="flex items-center justify-center w-[50%]">
          <div className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-[#FF8502] font-bold text-[30px] mb-6">Login</h2>
            <input
              placeholder="Código da empresa"
              className="border w-[400px] border-[rgb(255,133,2)] text-[16px] rounded-md p-2 pl-5 placeholder:opacity-60"
              value={codEmpresa}
              onChange={(e) => setCodEmpresa(e.target.value)}
            />
            <input
              placeholder="Seu código de verificação"
              className="border w-[400px] border-[#FF8502] text-[16px] rounded-md p-2 pl-5 placeholder:opacity-60"
              value={codFuncionario}
              onChange={(e) => setCodFuncionario(e.target.value)}
            />
            <button
              className="bg-[#FF8502] font-bold p-1 pl-6 pr-6 rounded-md mt-6 opacity-80 cursor-pointer hover:opacity-100"
              onClick={Logar}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>

    
  );
}
