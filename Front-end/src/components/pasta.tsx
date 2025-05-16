"use client";

import Image from "next/image";
import Folder from "@/assets/folder.png";
import Points from "@/assets/points.png";
import { useEffect, useRef, useState } from "react";

export default function Pasta({ title }: { title: string }) {
  const [modal, setModal] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const dotsRef = useRef<HTMLButtonElement>(null);

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

  // ✅ Trava o scroll ao abrir o menu
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
      <div className="bg-[#3D3D3D] flex justify-between w-[220px] rounded p-4 text-[14px]">
        <div className="flex items-center gap-3">
          <Image className="w-[23px]" src={Folder} alt="Ícone de pasta" />
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
