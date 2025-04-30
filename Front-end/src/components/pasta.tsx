import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Capa from "@/assets/bg-login.jpg";

export default function Pasta({title} : any) {
  return (
    <div className="">
        <Image src={Logo} alt={"Ícone de adicionar"}/>
        <p>{title}</p>
        <Image src={Logo} alt={"Ícone de adicionar"}/>
    </div>
  );
}
