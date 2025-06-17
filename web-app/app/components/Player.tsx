import { Play, SkipBack, SkipForward } from 'lucide-react'
import React from 'react'

export default function Player() {
    return (
        <div className="rounded-[20px] bg-red-200 flex flex-col items-center justify-center text-center px-4 pt-10">
            <img
                src="https://upload.wikimedia.org/wikipedia/vi/8/85/Chay_ngay_di.png"
                alt="Music Cover"
                className="w-64 h-64 rounded-2xl object-cover shadow-xl mb-6"
            />
            <h2 className="text-2xl font-semibold">Lofi Chill Vibes</h2>
            <p className="text-gray-400 mt-1">by DJ Relax</p>

            <div className="flex items-center justify-center my-6 space-x-6">
                <button className="text-white hover:text-zinc-400 transition-all duration-200 cursor-pointer">
                    <SkipBack size={32} />
                </button>
                <button className="text-white hover:text-zinc-400 transition-all duration-200 cursor-pointer">
                    <Play size={40} />
                </button>
                <button className="text-white hover:text-zinc-400 transition-all duration-200 cursor-pointer">
                    <SkipForward size={32} />
                </button>
            </div>

        </div>
    )
}
