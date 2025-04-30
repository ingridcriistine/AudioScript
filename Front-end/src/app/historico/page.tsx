import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Capa from "@/assets/bg-login.jpg";
import Pasta from "@/components/pasta";

export default function Historico() {
  return (
    <div className="">
        <h2>Histórico</h2>
        <div className="flex">
            <h3>Pastas</h3>
            <Image src={Logo} alt={"Ícone de adicionar"}/>
        </div>
        <Pasta title="Reuniões"/>
        <h3>Pastas</h3>
        <div>
            <div>
                <p>Formato</p>
                <Image src={Logo} alt={"Ícone de adicionar"}/>
            </div>
            <div>
                <p>Formato</p>
                <Image src={Logo} alt={"Ícone de adicionar"}/>
            </div>
        </div>
    </div>
  );
}
