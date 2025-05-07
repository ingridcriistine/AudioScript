"use client"
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { useState } from "react";
import { useRef } from "react";
import Lixeira from "@/assets/bin.png";
import { ArquivoItem } from "@/components/upaloadArquivo";

type Arquivo = {
  name: string;
  id: string; // Adicionando um ID único para cada arquivo (pode ser o nome ou outro identificador)
};

export default function TelaInicial() {

const [arquivos, setArquivos] = useState<Arquivo[]>([]);
const [restrito, setRestrito] = useState<"sim" | "nao" | "">(""); // Tipo para 'restrito'

const fileInputRef = useRef<HTMLInputElement | null>(null);

const handleButtonClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click(); // Dispara o clique no input invisível
  }
};

  // Função para lidar com a mudança de arquivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Converte FileList para um array e atualiza o estado, gerando um ID único para cada arquivo
      const novosArquivos = Array.from(e.target.files).map((file) => ({
        name: file.name,
        id: `${file.name}-${Date.now()}`, // Criando um ID único com base no nome e timestamp
      }));
      setArquivos((prevArquivos) => [...prevArquivos, ...novosArquivos]);
    }
  };

  // Função para excluir um arquivo
  const handleExcluirArquivo = (id: string) => {
    setArquivos((prevArquivos) => prevArquivos.filter((arquivo) => arquivo.id !== id));
  };

  // Função para lidar com a mudança do estado de 'restrito'
  const handleRestritoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestrito(e.target.value as "sim" | "nao");
  };

  return (
    <>
      <Menu/>
      <div className="flex">
        <Submenu/>
        <div className="flex w-full">
          <div className="flex flex-col w-[50%] p-8 gap-8 text-white pt-[150px] pl-[80px]">
            <div className="flex flex-col w-[50%] ">
              <button onClick={handleButtonClick}
                  className="bg-[#272727] rounded-xl p-4 flex items-center justify-center cursor-pointer hover:bg-[#333333]"
              >
                  Escolher arquivos
              </button>

              {/* Input de arquivo oculto */}
              <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
              />

              <ul className="mt-2 gap-2 flex flex-col w-full overflow-x-auto max-h-[280px]">
                {arquivos.map((arquivo) => (
                  <ArquivoItem
                    key={arquivo.id}
                    id={arquivo.id}
                    name={arquivo.name}
                    onExcluir={handleExcluirArquivo}
                  />
                ))}
              </ul>

            </div>
              
            {/* Nome do arquivo transcrito */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Nome do arquivo transcrito</label>
              <input
                type="text"
                className="flex text-white border rounded-sm p-1 border-amber-50 w-[50%]"
              />
            </div>

            {/* Seleção de arquivo restrito */}
            <div className="flex gap-2 mt-4">
              <h1>Arquivo Restrito: </h1>
              <div className="flex gap-5">
                <label>
                  <input
                    type="radio"
                    name="restrito"
                    value="sim"
                    checked={restrito === "sim"}
                    onChange={handleRestritoChange}
                  />
                  Sim
                </label>

                <label>
                  <input
                    type="radio"
                    name="restrito"
                    value="nao"
                    checked={restrito === "nao"}
                    onChange={handleRestritoChange}
                  />
                  Não
                </label>
              </div>
            </div>

            <button className="bg-amber-600 p-3 rounded-xl cursor-pointer w-[50%]">
              Transcrever
            </button>
          </div>
              
          <div className="w-[50%] flex pt-[150px] p-4 ">
              <div className=" bg-white w-[80%]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
