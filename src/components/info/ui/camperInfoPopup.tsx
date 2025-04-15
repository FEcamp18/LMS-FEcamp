'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import * as ZigzagEdge from 'public/image/camperInfo-image/Zigzag_Edge.svg';
import * as ZigzagEdge2 from 'public/image/camperInfo-image/Zigzag Edge-2.svg';



interface CamperInfoPopupProps {
    camperId: string;
}


const baseUrl = 'https://example.com'; // Replace 
export default function CamperInfoPopup({ camperId }: CamperInfoPopupProps) {
    interface CamperInfo {
        name: string;
        details: string;
    }

    const [camperInfo, setCamperInfo] = useState<CamperInfo | null>(null);
    interface Note {
        id: string;
        content: string;
    }

    const [camperNotes, setCamperNotes] = useState<Note[]>([]);

    return (
        <div className="flex flex-col items-center">
            <Image src={ZigzagEdge} alt="Zigzag_Edge" className="justify-start h-full" />
            <div className="border rounded shadow" style={{ width: 669, height: 538 }}>
                <div className="text-lg font-bold p-4 bg-[url('/image/camperInfo-image/Top_App_Bar.svg')] bg-cover bg-center">
                    <div>Name</div>
                </div>

                <div className="pt-8 bg-[url('/image/camperInfo-image/Content-3.svg')] bg-cover bg-center">
                    <div className="flex justify-between">
                        <div className="mb-4 pl-4 text-2xl font-medium font-[Prompt]">หมายเหตุ</div>
                        <div
                            className="mb-4 text-2xl font-medium font-[Prompt] text-right pr-4 cursor-pointer text-amber-900 hover:"
                            onClick={() => alert('เพิ่มหมายเหตุ')}
                        >
                            + เพิ่ม
                        </div>
                    </div>
                    <div className="pl-4 pr-4">
                        <div className="flex justify-between">
                            <div className="w-1/3 h-32 bg-white rounded shadow"></div>
                            <div className="w-1/3 h-32 bg-white rounded shadow mx-4"></div>
                            <div className="w-1/3 h-32 bg-white rounded shadow"></div>
                        </div>
                    </div>

                    <div className="flex justify-start pr-4 pb-20 pt-12 pl-4">
                        <div className="container">
                            <h2 className="text-xl font-semibold mb-2">ข้อมูลสุขภาพ</h2>
                            <p className="text-gray-600">รายละเอียดเกี่ยวกับข้อมูลสุขภาพของผู้เข้าร่วม</p>
                        </div>
                        <div className="flex flex-col ml-8">
                            <h2 className="text-xl font-semibold mb-2">ข้อจํากัดด้านอาหาร</h2>
                            <p className="text-gray-600">รายละเอียดเกี่ยวกับข้อจํากัดด้านอาหาร</p>
                        </div>
                    </div>

                    <hr className="border-gray-700 border-1 w-full" />
                    <div>
                        <h2 className="mb-4 pt-7 pl-4 text-xl">ข้อมูลส่วนตัว</h2>
                        <div className="grid grid-cols-3 gap-4 pb-8 pl-4">
                            <div className="container">
                                <h2 className="text-xl font-semibold mb-2">เบอร์โทรศัพท์</h2>
                                <p className="text-gray-600">000-000-0000</p>
                            </div>
                            <div className="container">
                                <h2 className="text-xl font-semibold mb-2">เบอร์ผู้ปกครอง</h2>
                                <p className="text-gray-600">000-000-0000 (มารดา)</p>
                            </div>
                            <div className="container">
                                <h2 className="text-xl font-semibold mb-2">อีเมล</h2>
                                <p className="text-gray-600">somchai.mee@gmail.com</p>
                            </div>
                            <div className="container">
                                <h2 className="text-xl font-semibold mb-2">โรงเรียน</h2>
                                <p className="text-gray-600">สมชายวิทยาลัย</p>
                            </div>
                            <div className="container">
                                <h2 className="text-xl font-semibold mb-2">ปี FE</h2>
                                <p className="text-gray-600">1</p>
                            </div>
                            <div className="container">
                                <h2 className="text-xl font-semibold mb-2">Room</h2>
                                <p className="text-gray-600">1</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[url('/image/camperInfo-image/Contacts.svg')] bg-cover bg-center">
                    <hr className="border-black border-1" />

                    <div className="flex justify-start mt-4 pl-4 pr-4 pb-4 bg-[url('/image/camperInfo-image/Contact.svg')] bg-cover bg-center">
                        <div>
                            <button className="w-[147px] h-[40px] flex justify-center p-2 items-center bg-[#86796E] text-white hover:bg-[#39332f]">
                                <Image
                                    src="/image/camperInfo-image/Icon_note.svg"
                                    alt="Call Icon1"
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                    unoptimized
                                />
                                เพิ่มหมายเหตุ
                            </button>
                        </div>

                        <div className="flex items-center ml-4">
                            <div className="border-l border-black mx-3 h-full"></div>
                            <button className="w-[147px] h-[40px] flex justify-center p-2 items-center bg-[#B7A99B] text-white hover:bg-[#59524b] mr-3">
                                <Image
                                    src="/image/camperInfo-image/Icon_call.svg"
                                    alt="Call Icon2"
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                    unoptimized
                                />
                                โทรหาน้อง
                            </button>
                            <button className="w-[147px] h-[40px] flex justify-center p-2 bg-[#F98181] text-white hover:bg-[#a45555] items-center ml-4">
                                <Image
                                    src="/image/camperInfo-image/Icon_star.svg"
                                    alt="Call Icon3"
                                    width={20}
                                    height={50}
                                    className="mr-2"
                                />
                                โทรหาผู้ปกครอง
                            </button>
                        </div>
                        
                    </div>
                    
                </div>
                <Image src={ZigzagEdge2} alt="Zigzag Edge1 " className="justify-start transform  h-full" />
                <div className='mt-10'> </div>
            </div>
            
        </div>
    );

// with the actual base URL of your API
}
