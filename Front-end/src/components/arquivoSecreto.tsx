import Image from "next/image";
import Points from "@/assets/points.png";
import Locker from "@/assets/lock.png";

export default function ArquivoSecreto({title} : any) {
  return (
    <div className="bg-[#3D3D3D] flex justify-between w-[220px] rounded p-3 text-[14px]">
      <div>
        <p>{title}</p>
        <Image className="w-[23px] cursor-pointer" src={Points} alt={"Ícone de adicionar"}/>
      </div>
      <Image className="w-[23px] cursor-pointer" src={Locker} alt={"Ícone de cadeado"}/>
    </div>
    
  );
}
