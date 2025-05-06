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
        </>
    );
};
