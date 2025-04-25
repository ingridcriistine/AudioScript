import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export const Menu = () => {
    return(
        <>
        <div className="h-screen w-full ">
            <div className="bg-gray-800 flex text-amber-50 w-full h-15 align-bottom ">
                <div className="flex">
                    <h1>Logo</h1>
                </div>
                <div className="flex">
                    <h1>Nome pessoal</h1>
                    <Link href={ROUTES.login}>Sair</Link>
                </div>
            </div>
            <div className="bg-gray-800 flex flex-col w-[250px] h-full">
                <div className="flex p-5">
                    <Link href={ROUTES.home}>
                        <h1 className="text-amber-50 hover:border-b border-amber-50">Página Inicial</h1>
                    </Link>
                </div>
                <div className="flex p-5">
                    <Link href={ROUTES.hist}>
                        <h1 className="text-amber-50 hover:border-b border-amber-50">Histórico</h1>
                    </Link>
                </div>
                <div className="flex p-5">
                    <Link href={ROUTES.aqvScrt}>
                        <h1 className="text-amber-50 hover:border-b border-amber-50">Arquivos Secretos</h1>
                    </Link>
                </div>
                <div className="flex p-5">
                    <Link href={ROUTES.aqvScrt}>
                        <h1 className="text-amber-50 hover:border-b border-amber-50">Colaboradores</h1>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}