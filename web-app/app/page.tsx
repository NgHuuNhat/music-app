import Image from "next/image";
import Player from "./components/Player";
import BottomTab from "./components/BottomTab";

export default function Home() {
  return (
    <div className="my-10 w-100 h-100 mx-auto flex flex-col justify-between text-white">
      <Player />
      <BottomTab />
    </div>
  );
}
