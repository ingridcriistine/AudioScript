// components/ArquivoItem.tsx
import Image from "next/image";
import Lixeira from "@/assets/bin.png";

type ArquivoItemProps = {
  id: string;
  name: string;
  onExcluir: (id: string) => void;
};

export const ArquivoItem = ({ id, name, onExcluir }: ArquivoItemProps) => {
  return (
    <li className="text-sm flex justify-between items-center bg-[#272727] p-2 rounded-xl">
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
