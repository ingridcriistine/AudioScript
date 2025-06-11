"use client"
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";

type Arquivo = {
  file: File
  name: string;
  id: string;
};

export default function Audioscript() {

    return (
      <>
        <div className="bg-[#272727] items-center flex justify-between text-amber-50 w-full h-20 shadow-lg shadow-gray-900/50 z-10 p-6 fixed top-0 left-0">
            <div className="flex">
                <h1>Logo</h1>
            </div>
            <div className="flex items-center gap-4">
                <h1>Entrar</h1>
                <h1> | </h1>
                <button className="bg-amber-600 p-1 pl-4 pr-4 rounded-[5px]">
                    <div>
                        <h2>Comece a usar</h2>                        
                    </div>
                </button>
            </div>
        </div>

        <div>
            <h1>Transcreva arquivos multimídia de forma eficiente em segundos.</h1>
            <button className="bg-amber-600 p-1 pl-4 pr-4 rounded-[5px]">
                <div>
                    <h2>Comece a usar</h2>                        
                </div>
            </button>
        </div>

        <div>
            <h1>Por que usar nosso software?</h1>
            <div>
                <div>
                    <h2>Precisão avançada de transcrição</h2>
                    <p>Nosso algoritmo identifica vozes e atores diferentes atores com 95% de acurácia.</p>
                </div>
                <div>
                    <h2>Armazenamento em nuvem</h2>
                    <p>Suas transcrições ficarão salvas em segurança na nuvem e você poderá acessá-las a qualquer momento.</p>
                </div>
                <div>
                    <h2>Rapidez e Automação</h2>
                    <p>Transcreva horas de áudio ou vídeo em poucos minutos com apenas um clique.</p>
                </div>
            </div>
        </div>
      </>
    );
}
