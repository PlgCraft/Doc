import Link from "next/link";
import Image from "next/image"
export const Logo = ({withBG}: {withBG?:boolean}) => {
  return (
    <Link
      href="/"
      className="text-3xl font-black tracking-tighter flex items-center select-none gap-2"
    >
      <Image src={"/plgLogo.svg"} alt="Plg" height={50} width={50} className={`${withBG ? "bg-white rounded-2xl":""}`} />

      <h1 className="text-4xl">
        PlgCraft
        <span className="text-red-500">.</span>
      </h1>
    </Link>
  );
};
