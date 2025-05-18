import { useState, useEffect } from "react";
import React from "react";
import bg2 from "public/image/announcement/bg2.svg";
import bg1 from "public/image/announcement/bg1.svg";
import leaf  from "public/image/announcement/leaf2.svg";
import leaf1 from "public/image/announcement/leaf1.svg";
import Image from "next/image";

const Announcement = () => {
    const [activeBackground, setActiveBackground] = useState(0);
    const [textStep, setTextStep] = useState(0);

    useEffect(() => {
        if (activeBackground === 0) {
            const timer = setTimeout(() => {
                setActiveBackground(1); // เปลี่ยนไปที่ bg2
            }, 5000); // 4s duration for the first animation
            return () => clearTimeout(timer);
        }
    }, [activeBackground]);

    useEffect(() => {
        if (textStep < 2) {
            const timer = setTimeout(() => {
                setTextStep((prev) => prev + 1); // เปลี่ยนข้อความทีละขั้น
            }, 2500); // 2s duration for each text animation
            return () => clearTimeout(timer);
        }
    }, [textStep]);

    const renderText = () => {
        switch (textStep) {
            case 0:
                return (
                    <div className="flex flex-col items-center justify-center relative">
                        <div className="absolute z-0">
                            <Image
                                src={leaf1}
                                alt="Leaf"
                                width={350}
                                height={350}
                                className="opacity-50 animate-spin"
                            />
                        </div>
                        <div className="relative z-10 transition-all duration-1000 opacity-100 translate-y-0 text-5xl text-white text-center">
                            ผลการคัดเลือกจากเทพเจ้าได้ออกมาแล้ว ....
                        </div>
                    </div>
                );
            case 1:
                return (
                    < div className="flex flex-col items-center justify-center relative">
                        <div className='absolute z-0'>
                            <Image
                                src={leaf1}
                                alt="Leaf"
                                width={900}
                                height={900}
                                className="opacity-50 animate-spin"
                            />
                        </div>
                        <div className="transition-all z-10 duration-1000 opacity-100 translate-y-0 text-5xl text-white">
                            น้อง AAA จะได้เข้าสู่
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div
                        className="transition-all duration-1000 opacity-100 translate-y-0 justify-center text-center"
                    >
                        <div className="text-white text-2xl">
                            ผลการคัดเลือกจากเทพเจ้าได้ออกมาแล้ว
                        </div>
                        <div className="text-slate-600 text-3xl">น้อง AAA ได้ถูกต้องรับสู่</div>
                        <div className="text-amber-950 text-5xl">วหารเฮอร์มีส</div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative h-screen w-full">
            {/* Background */}
            <div className="absolute inset-0 z-0 transition-opacity duration-1000">
                <Image
                    src={bg1}
                    alt="Background 1"
                    layout="fill"
                    objectFit="cover"
                    className={`h-full w-full transition-opacity duration-1000 ${
                        activeBackground === 0 ? "opacity-100" : "opacity-0"
                    }`}
                />
                <Image
                    src={bg2}
                    alt="Background 2"
                    layout="fill"
                    objectFit="cover"
                    className={`h-full w-full transition-opacity duration-1000 ${
                        activeBackground === 1 ? "opacity-100" : "opacity-0"
                    }`}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <div
                    className={`transition-all duration-1000 ${
                        textStep < 2 ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
                    }`}
                >
                    {renderText()}
                </div>
            </div>
        </div>
    );
};

export default Announcement;
