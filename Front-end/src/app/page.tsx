import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import Image from "next/image";
import TelaInicial from "./telaInicial/page";
import Login from "./login/page"
import Audioscript from "./audioscript/page";

export default function Home() {
  return (
    <div>
      {/* <Menu></Menu> */}

      <Audioscript></Audioscript>
    </div>
  );
}
