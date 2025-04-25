import Image from "next/image";

export default function Home() {
  return (
    <div>
      <image></image>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-orange-500">Login</h2>
        <input className="border border-orange-500 rounded-2xl" placeholder="Código da empresa"></input>
        <input placeholder="Seu código de verificação"></input>
        <button>Entrar</button>
      </div>
    </div>
  );
}
