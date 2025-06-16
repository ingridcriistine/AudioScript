"use client"
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import Capa from "@/assets/capa.png"
import Forms from "@/assets/capa-forms.png"
import Logo from "@/assets/Logo.png"
import Cloud from "@/assets/cloud.png"
import Watch from "@/assets/watch.png"
import Precision from "@/assets/precision.png"
import { useState } from "react";

type Arquivo = {
    file: File
    name: string;
    id: string;
};

export default function Audioscript() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/enviar-codigo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    company
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(`Código enviado para seu e-mail! Código: ${data.codigo}`);
                setName("");
                setEmail("");
                setCompany("");
            } else {
                alert(data.error || 'Erro ao enviar e-mail');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro na conexão com o servidor');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="bg-[#272727] items-center flex justify-between text-amber-50 w-full h-20 shadow-lg shadow-gray-900/50 z-10 fixed top-0 left-0">
                <div className="flex">
                    <Image src={Logo} alt={"Logo"} className="w-[180px]" />
                </div>
                <div className="flex items-center gap-4 p-6">
                    <Link href={ROUTES.login} className="flex items-center gap-2">
                        <h1 className="cursor-pointer hover:border-b border-amber-50">Entrar</h1>
                    </Link>
                    <h1> | </h1>
                    <a href="#form-section">
                        <button className="cursor-pointer bg-amber-600 p-1 pl-4 pr-4 rounded-[5px] hover:opacity-[85%]">
                            <h2>Comece a usar</h2>
                        </button>
                    </a>
                </div>
            </div>

            <div className="relative w-full h-[600px] flex items-center justify-center">
                <Image src={Capa} alt={"Capa"} className="object-cover w-[100%]" />

                <div className="absolute flex flex-col items-center justify-center">
                    <Image src={Logo} alt={"Logo"} className="w-[200px]" />
                    <div className="w-[70%] text-center p-16">
                        <h1 className="text-[30px] text-white font-bold">Transcreva arquivos multimídia de forma eficiente em segundos.</h1>
                    </div>
                    <a href="#form-section">
                        <button className="cursor-pointer bg-amber-600 p-2 pl-4 pr-4 rounded-[5px] hover:opacity-[85%]">
                            <h2>Comece a usar</h2>
                        </button>
                    </a>
                </div>
            </div>

            <div className="m-14 mt-0 p-4 pb-24">
                <h1 className="font-bold pb-24 pt-2 text-[18px]">Por que usar nosso software?</h1>
                <div className="flex justify-center">
                    <div className="flex flex-col items-center text-center pl-12 pr-12 w-[30%]">
                        <div className="bg-amber-600 w-[50px] h-[50px] rounded-[100%] flex justify-center items-center">
                            <Image src={Precision} alt={"Ícone precisão"} className="w-[34px]" />
                        </div>
                        <h2 className="font-bold p-4 pt-8">Precisão avançada de transcrição</h2>
                        <p className="opacity-[80%]">Nosso algoritmo identifica vozes e atores diferentes atores com 95% de acurácia.</p>
                    </div>
                    <div className="flex flex-col items-center text-center pl-12 pr-12 w-[30%]">
                        <div className="bg-amber-600 w-[50px] h-[50px] rounded-[100%] flex justify-center items-center">
                            <Image src={Cloud} alt={"Ícone nuvem"} className="w-[34px]" />
                        </div>
                        <h2 className="font-bold p-4 pt-8">Armazenamento em nuvem</h2>
                        <p className="opacity-[80%]">Suas transcrições ficarão salvas em segurança na nuvem e você poderá acessá-las a qualquer momento.</p>
                    </div>
                    <div className="flex flex-col items-center text-center pl-12 pr-12 w-[30%]">
                        <div className="bg-amber-600 w-[50px] h-[50px] rounded-[100%] flex justify-center items-center">
                            <Image src={Watch} alt={"Ícone relógio"} className="w-[34px]" />
                        </div>
                        <h2 className="font-bold p-4 pt-8">Rapidez e Automação</h2>
                        <p className="opacity-[80%]">Transcreva horas de áudio ou vídeo em poucos minutos com apenas um clique.</p>
                    </div>
                </div>
            </div>

            <div className="relative flex justify-between border-2 border-gray-950">
                <div className="relative w-[50%]">
                    <Image src={Forms} alt={"Capa"} className="object-cover w-full h-full" />

                    <div className="absolute inset-0 flex flex-col items-center bg-black/50 pt-14">
                        <Image src={Logo} alt={"Logo"} className="w-[150px]" />
                        <div className="w-[70%] text-center p-6">
                            <h1 className="text-[18px] text-white opacity-[80%] pt-6">
                                Preencha o formulário ao lado que enviaremos um e-mail com todos os detalhes de acesso!
                            </h1>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-[50%] p-8 pr-16 pl-16">
                    <h2 className="font-bold">Informações pessoais</h2>

                    <div className="flex flex-col justify-center pt-12 pb-12">
                        <label className="mt-4">Nome</label>
                        <input
                            placeholder="Seu nome"
                            className="bg-[#272727] p-1 pl-4 mt-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label className="mt-4">Empresa</label>
                        <input
                            placeholder="Nome da empresa"
                            className="bg-[#272727] p-1 pl-4 mt-2"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />

                        <label className="mt-4">E-mail</label>
                        <input
                            placeholder="Seu e-mail"
                            className="bg-[#272727] p-1 pl-4 mt-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`cursor-pointer bg-amber-600 p-2 pl-4 pr-4 rounded-[5px] hover:opacity-[85%] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>

            </div>
        </>
    );
}
