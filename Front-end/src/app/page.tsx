import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import Image from "next/image";
import TelaInicial from "./telaInicial/page";
import Login from "./login/page"

export default function Home() {
  return (
    <div>
      {/* <Menu></Menu> */}

      <Login></Login>
    </div>
  );
}
