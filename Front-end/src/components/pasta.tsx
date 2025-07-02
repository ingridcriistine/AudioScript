"use client";

import Image from "next/image";
import FolderWhite from "@/assets/folder-white.png";
import FolderBlack from "@/assets/folder-black.png";
import Points from "@/assets/points.png";
import { useEffect, useRef, useState } from "react";

export default function Pasta({ title }: { title: string }) {
  const [modal, setModal] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const dotsRef = useRef<HTMLButtonElement>(null);
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

  const closeMenu = () => setModal(false);

  const openMenu = () => {
    if (dotsRef.current) {
      const rect = dotsRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom,
        left: rect.left,
      });
      setModal(true);
    }
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modal]);

  return (
    <>
      <div className={isDarkMode ? "bg-[#3D3D3D] flex justify-between w-[220px] rounded p-4 text-[14px]" : "bg-[#bdbdbd] flex justify-between w-[220px] rounded p-4 text-[14px]"}>
        <div className="flex items-center gap-3">
          <Image className="w-[25px]" src={isDarkMode ? FolderWhite : FolderBlack} alt="Ícone de pasta" />
          <p className="cursor-pointer">{title}</p>
        </div>
        <button ref={dotsRef} onClick={openMenu} className="p-1">
          <Image
            className="w-[20px] cursor-pointer"
            src={Points}
            alt="Ícone de opções"
          />
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50" onClick={closeMenu}>
          <div
            className="fixed bg-zinc-800 text-white rounded-md shadow-md flex flex-col w-40"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="px-4 py-2 text-left hover:bg-zinc-700">Renomear</button>
            <button className="px-4 py-2 text-left hover:bg-zinc-700 text-red-400">Excluir</button>
          </div>
        </div>
      )}
    </>
  );
}
