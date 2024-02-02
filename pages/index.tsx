import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Search from "./components/Search";
import Properties from "./components/Properties";
import Promo from "./components/Promo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Header/>
    <Search />
    <Properties />
    <Promo />
    </>
  );
}
