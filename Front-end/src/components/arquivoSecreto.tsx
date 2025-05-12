import Image from "next/image";
import Points from "@/assets/points.png";
import Locker from "@/assets/lock.png";

export default function ArquivoSecreto({title} : any) {
  return (
    <div className="bg-[#3D3D3D] flex flex-col w-[220px] rounded p-3 pb-5 gap-4 text-[14px] items-center">
      <div className="flex justify-between w-[190px]">
        <p className="cursor-pointer">{title}</p>
        <Image className="w-[20px] cursor-pointer" src={Points} alt={"Ícone de adicionar"}/>
      </div>
      <Image className="w-[28px] cursor-pointer" src={Locker} alt={"Ícone de cadeado"}/>
    </div>
    
  );
}
