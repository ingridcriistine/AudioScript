import Image from "next/image";
import Logo from "@/app/assets/Logo.png";
import Capa from "@/app/assets/image.png";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {/* <Image className="w-[400px] mb-12" src={Capa} alt={"Logo AudioScript"}/> */}
     <div>
        <Image className="w-[400px] mb-12" src={Logo} alt={"Logo AudioScript"}/>
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="text-[#FF8502] font-bold text-[30px] mb-6">Login</h2>
          <input className="border w-[400px] border-[rgb(255,133,2)] text-[16px] rounded-md p-2 pl-5" placeholder="Código da empresa"></input>
          <input className="border w-[400px] border-[#FF8502] text-[16px] rounded-md p-2 pl-5" placeholder="Seu código de verificação"></input>
          <button className="bg-[#FF8502] font-bold p-1 pl-6 pr-6 rounded-md mt-6">Entrar</button>
        </div>
      </div>
    </div>
  );
}
