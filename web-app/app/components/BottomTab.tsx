import { Heart, Home, User } from 'lucide-react'
import React from 'react'

export default function BottomTab() {
  return (
    <div className="w-full max-w-xs mx-auto rounded-[20px] bg-red-200 my-10 border-zinc-700 flex justify-around py-4">
      <button className="text-white hover:text-zinc-400 transition-all duration-200 cursor-pointer">
        <Home size={24} />
      </button>
      <button className="text-white hover:text-zinc-400 transition-all duration-200 cursor-pointer">
        <Heart size={24} />
      </button>
      <button className="text-white hover:text-zinc-400 transition-all duration-200 cursor-pointer">
        <User size={24} />
      </button>
    </div>
  )
}
