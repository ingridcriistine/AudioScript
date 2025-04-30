import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import iconHome from "@/assets/home.png";
import iconExit from "@/assets/exit.png";
import iconSecret from "@/assets/lock.png";
import iconHistoryc from "@/assets/history.png";

export const Menu = () => {
    return (
        <>
            <div className="bg-[#272727] items-center flex justify-between text-amber-50 w-full h-20 shadow-lg shadow-gray-900/50 z-10 p-6 fixed top-0 left-0">
                <div className="flex">
                    <h1>Logo</h1>
                </div>
                <div className="flex items-center gap-20">
                    <h1>Nome pessoal</h1>
                    <Link href={ROUTES.login}className="flex gap-2">
                        <Image src={iconExit} alt="histórico" width={20}  />
                    </Link>
                </div>
            </div>

            <div className="pt-20 flex">
                <div className="bg-[#272725] flex flex-col w-[250px] h-screen">
                    <div className="flex p-5">
                        <Link href={ROUTES.home} className="flex items-center gap-2">
                            <Image src={iconHome} alt="home" width={22} height={22} />
                            <span className="text-amber-50 hover:border-b border-amber-50">Página Inicial</span>
                        </Link>
                    </div>
                    <div className="flex p-5">
                        <Link href={ROUTES.hist} className="flex items-center gap-2">
                            <Image src={iconHistoryc} alt="histórico" width={20} height={20} />
                            <span className="text-amber-50 hover:border-b border-amber-50">Histórico</span>
                        </Link>
                    </div>
                    <div className="flex p-5">
                        <Link href={ROUTES.aqvScrt} className="flex items-center gap-2">
                            <Image src={iconSecret} alt="arquivos secretos"  width={20} height={20}  />
                            <span className="text-amber-50 hover:border-b border-amber-50">Arquivos Secretos</span>
                        </Link>
                    </div>
                    <div className="flex p-5">
                        <Link href={ROUTES.aqvScrt} className="flex items-center gap-2">
                            <Image src={iconHome} alt="colaboradores" width={20} height={20} />
                            <span className="text-amber-50 hover:border-b border-amber-50">Colaboradores</span>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
};
