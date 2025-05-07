"use client"
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { useState } from "react";
import { useRef } from "react";

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
        <div className="w-[50%] p-8 text-white pt-[150px] pl-[80px]">

          <button onClick={handleButtonClick}
              className="bg-gray-800 rounded-xl p-4 w-[50%] flex items-center justify-center cursor-pointer"
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

          <ul className="mt-2">
            {arquivos.map((arquivo) => (
              <li key={arquivo.id} className="text-sm flex justify-between items-center bg-gray-800 p-2 rounded-xl">
                {arquivo.name}
                <button
                  onClick={() => handleExcluirArquivo(arquivo.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>

          {/* Nome do arquivo transcrito */}
          <div className="flex flex-col gap-2">
            <label htmlFor="">Nome do arquivo transcrito</label>
            <input
              type="text"
              className="text-white border rounded-sm p-1 border-amber-50"
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

          <button className="bg-amber-600 p-3 rounded-xl cursor-pointer">
            Transcrever
          </button>
        </div>

      </div>
    </>
  );
}
