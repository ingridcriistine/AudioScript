import Image from "next/image";
import Logo from "@/app/assets/Logo.png";
import Capa from "@/app/assets/bg-login.jpg";

export default function Home() {
  return (
    <div className="flex items-center h-screen w-full">
      <Image className="w-[45%] h-full flex justify-start items-start" src={Capa} alt={"Logo AudioScript"}/>
     <div className="flex items-center justify-center w-[50%]">
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="text-[#FF8502] font-bold text-[30px] mb-6">Login</h2>
          <input placeholder="Código da empresa" className="border w-[400px] border-[rgb(255,133,2)] text-[16px] rounded-md p-2 pl-5 placeholder:opacity-60"></input>
          <input placeholder="Seu código de verificação" className="border w-[400px] border-[#FF8502] text-[16px] rounded-md p-2 pl-5 placeholder:opacity-60"></input>
          <button className="bg-[#FF8502] font-bold p-1 pl-6 pr-6 rounded-md mt-6 opacity-80 cursor-pointer hover:opacity-100">Entrar</button>
        </div>
      </div>
    </div>
  );
}
