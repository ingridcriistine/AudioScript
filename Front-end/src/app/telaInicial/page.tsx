"use client"
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { useState } from "react";
import { useRef } from "react";
import Lixeira from "@/assets/bin.png";
import { ArquivoItem } from "@/components/upaloadArquivo";
import { ROUTES } from "@/constants/routes";

type Arquivo = {
  file: File
  name: string;
  id: string;
};

export default function TelaInicial() {

  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [restrito, setRestrito] = useState<"sim" | "nao" | "">("");
  const [filename, setFilename] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const idUsuario = localStorage.getItem("idUsuario");
  const idEmpresa = localStorage.getItem("idEmpresa");

  if (!idUsuario || !idEmpresa) {
    alert("Erro: ID do usuário ou da empresa não encontrado. Faça login novamente.");
    return;
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novosArquivos: Arquivo[] = Array.from(e.target.files).map((file) => ({
        file,
        name: file.name,
        id: `${file.name}-${Date.now()}`
      }));
      setArquivos((prevArquivos) => [...prevArquivos, ...novosArquivos]);
    }
  };

  const handleExcluirArquivo = (id: string) => {
    setArquivos((prevArquivos) => prevArquivos.filter((arquivo) => arquivo.id !== id));
  };

  const handleRestritoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestrito(e.target.value as "sim" | "nao");
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < arquivos.length; i++){
      formData.append('files', arquivos[i].file)
    }
    
    const customFileName = document.getElementById('customFileName') as HTMLInputElement
    formData.append('user-file-name', customFileName.value)
    formData.append('restrito', restrito);
    formData.append('idUser', idUsuario);
    formData.append('idEmpresa', idEmpresa);

    try {
      const response = await fetch(ROUTES.upload_files, {
        method: 'POST',
        body: formData
      })
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log("json result: " + result)
      }
      else {
        const text = await response.text()
        console.log("text result: " + text)
      }
    } catch (error) {
      console.log(error)
    }

  }

    return (
      <>
        <Menu />
        <div className="flex">
          <Submenu />
          <div className="flex w-full">
            <div className="flex flex-col w-[50%] p-8 gap-8 text-white pt-[150px] pl-[80px]">
              <div className="flex flex-col w-[50%] ">
                <button onClick={handleButtonClick}
                  className="bg-[#272727] rounded-xl p-4 flex items-center justify-center cursor-pointer hover:bg-[#333333]"
                >
                  Escolher arquivos
                </button>

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

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="">Nome do arquivo transcrito</label>
                <input
                  type="text"
                  className="flex text-white border rounded-sm p-1 border-amber-50 w-[50%]"
                  id="customFileName"
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

              <button className="bg-amber-600 p-3 rounded-xl cursor-pointer w-[50%]" onClick={handleUpload}>
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
