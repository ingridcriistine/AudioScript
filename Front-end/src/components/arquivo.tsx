import Image from "next/image";
import Points from "@/assets/points.png";

export default function Arquivo({title} : any) {
  return (
    <div className="bg-[#3D3D3D] flex justify-between w-[220px] rounded p-3 text-[14px]">
      <p className="cursor-pointer">{title}</p>
      <Image className="w-[20px] cursor-pointer" src={Points} alt={"Ícone de adicionar"}/>
    </div>
  );
}
