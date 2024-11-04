import NextImage from "next/image";
import Link from "next/link";
import { Button } from "~/components/button";

export default function Render() {
  return (
    <div className={"flex flex-col h-[75dvh] gap-1 relative"}>
      <div className={"h-full w-full m-auto text-center items-center justify-center flex absolute bottom-[25%] z-[-1] inset-0 overflow-visible"}>
        <p className={"text-[14rem] sm:text-[25rem] font-extrabold h-fit w-fit opacity-[0.03] m-auto"}>404</p>
      </div>
      <div className={"flex flex-col gap-1 h-fit text-center m-auto z-50"}>
        <h1 className={"text-3xl font-semibold"}>404 - Not Found</h1>
        <p>Sorry, we couldn't find what you were looking for.</p>
        <div className={"flex flex-row gap-2 justify-center"}>
          <Link href={"/"} passHref>
            <Button className={""}>Home</Button>
          </Link>
          <Link href={"/"} passHref>
            <Button className={""}>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
