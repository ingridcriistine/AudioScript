// components/ArquivoItem.tsx
import Image from "next/image";
import Lixeira from "@/assets/bin.png";
import { useEffect, useState } from "react";

type ArquivoItemProps = {
  id: string;
  name: string;
  onExcluir: (id: string) => void;
};

export const ArquivoItem = ({ id, name, onExcluir }: ArquivoItemProps) => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      console.log("Evento 'themeChanged' capturado. Novo tema:", storedTheme);
      if (storedTheme !== null) {
        try {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        } catch (error) {
          console.error("Erro ao fazer parse do tema no localStorage:", error);
          setIsDarkMode(false);
        }
      }
    };

    updateTheme();
    window.addEventListener("themeChanged", updateTheme);

    return () => window.removeEventListener("themeChanged", updateTheme);
  }, []);

  return (
    <li className={isDarkMode ? "text-sm flex justify-between items-center bg-[#272727] p-2 rounded-xl text-white" : "text-sm flex text-black justify-between items-center bg-[#bdbdbd] p-2 rounded-xl"}>
      {name}
      <button
        onClick={() => onExcluir(id)}
        className="ml-2 cursor-pointer"
      >
        <Image src={Lixeira} alt="Excluir" width={16} height={16} />
      </button>
    </li>
  );
};
