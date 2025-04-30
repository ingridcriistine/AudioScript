import Image from "next/image";
import Folder from "@/assets/folder.png";
import Points from "@/assets/points.png";

export default function Pasta({title} : any) {
  return (
    <div className="bg-[#3D3D3D] flex justify-between w-[220px] rounded p-4 text-[14px]">
      <div className="flex items-center gap-3">
        <Image className="w-[23px]" src={Folder} alt={"Ícone de adicionar"}/>
        <p>{title}</p>
      </div>
      <Image className="w-[23px]" src={Points} alt={"Ícone de adicionar"}/>
    </div>
  );
}
