'use client';

import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// const tracks = [
//     {
//         title: 'Chay Ngay Di',
//         artist: 'MTP',
//         src: 'https://zingmp3.vn/album/Chay-Ngay-Di-Single-Son-Tung-M-TP/ZOCZU0FZ.html',
//         thumbnail: 'https://upload.wikimedia.org/wikipedia/vi/8/85/Chay_ngay_di.png',
//     },
//     {
//         title: 'Hay Trao Cho Anh',
//         artist: 'MTP',
//         src: '/audios/lofi2.mp3',
//         thumbnail: 'https://i.ytimg.com/vi/knW7-x7Y7RE/maxresdefault.jpg',
//     },
// ];

const tracks = [
    {
        title: 'Lofi Chill',
        artist: 'NCS',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/vi/8/85/Chay_ngay_di.png',
    },
    {
        title: 'Calm Vibes',
        artist: 'NCS',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        thumbnail: 'https://i.ytimg.com/vi/knW7-x7Y7RE/maxresdefault.jpg',
    },
];


function formatTime(sec: number) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function Player() {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
        audio.addEventListener('ended', nextTrack);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
        };
    }, [currentTrack]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playTrack = (index: number) => {
        setCurrentTrack(index);
        setIsPlaying(true);
        setTimeout(() => {
            audioRef.current?.play();
        }, 100);
    };

    const nextTrack = () => {
        const next = (currentTrack + 1) % tracks.length;
        playTrack(next);
    };

    const prevTrack = () => {
        const prev = (currentTrack - 1 + tracks.length) % tracks.length;
        playTrack(prev);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    return (
        <div className="w-full max-w-xs mx-auto rounded-[20px] bg-red-200 flex flex-col items-center justify-center text-center px-6 py-10">
            <img
                src={tracks[currentTrack].thumbnail}
                alt="Cover"
                className="w-60 h-70 rounded-2xl object-cover shadow-xl mb-6"
            />
            <h2 className="text-2xl font-semibold">{tracks[currentTrack].title}</h2>
            <p className="text-gray-700 mt-1 text-xs">{tracks[currentTrack].artist}</p>

            {/* Progress + time */}
            <div className="w-full mt-6">
                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-zinc-300"
                />


                <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6">
                <button onClick={prevTrack} className="text-white hover:text-zinc-600 transition-all cursor-pointer">
                    <SkipBack size={32} />
                </button>
                <button onClick={togglePlay} className="text-white hover:text-zinc-600 transition-all cursor-pointer">
                    {isPlaying ? <Pause size={40} /> : <Play size={40} />}
                </button>
                <button onClick={nextTrack} className="text-white hover:text-zinc-600 transition-all cursor-pointer">
                    <SkipForward size={32} />
                </button>
            </div>

            {/* Playlist */}
            {/* <div className="w-full mt-4 text-left">
                <ul className="space-y-1">
                    {tracks.map((track, index) => (
                        <li key={index}>
                            <button
                                onClick={() => playTrack(index)}
                                className={`cursor-pointer w-full text-left px-4 py-2 rounded-md ${index === currentTrack ? 'bg-red-400 text-white' : 'bg-white text-gray-800'
                                    } transition`}
                            >
                                {track.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* Hidden audio */}
            <audio ref={audioRef} src={tracks[currentTrack].src} />
        </div>
    );
}
