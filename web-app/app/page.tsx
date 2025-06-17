import Image from "next/image";
import Player from "./components/Player";
import BottomTab from "./components/BottomTab";

export default function Home() {
  return (
    <div className="container mx-auto px-10 my-10 h-100 mx-auto flex flex-col justify-between text-white">
      <Player />
      <BottomTab />
    </div>
  );
}
