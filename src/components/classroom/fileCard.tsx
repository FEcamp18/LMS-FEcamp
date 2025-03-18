'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Folder } from 'lucide-react'
import Image from 'next/image';



type fileCard = {
  fileTitle:string, 
  fileLocation:string, 
  fileDescription:string, 
  fileUploadTime:string, 
  isTutor:boolean
}
export default function FileCard({fileTitle, fileLocation, 
  fileDescription, fileUploadTime, isTutor}: fileCard) {

  const downloadFile = () => {
    const aTag = document.createElement("a")
    aTag.href = fileLocation
    aTag.setAttribute("download", fileTitle)
    document.body.appendChild(aTag)
    aTag.click();
    aTag.remove()
  }

  return (
    <div className="max-h-40 m-3 grid max-w-3xl grid-cols-8 gap-3 r bg-[url('/image/subject-picture/bg-card.png')] bg-cover bg-center p-3 pl-5">
        <div className='flex place-items-center justify-center pr-4'>
            <Folder className='' size={50} strokeWidth={1}/>
        </div>
        <div className='col-span-4'>
          <h3 className="font-prompt font-bold text-2xl ">{fileTitle}</h3>
          <p className="font-prompt text-sm">{fileDescription}</p>
        </div>
        
        
      
      {isTutor 
      ? <div className=' flex place-items-center justify-end col-span-2'>
          <Button variant = 'link' onClick={downloadFile} className='font-prompt flex-1 bg-[url("/image/subject-picture/bg-download-button.png")] bg-cover bg-center text-white h-12 rounded-xl text-lg hover:text-white'>Download</Button>
        </div>
      : <div className=''></div>
      }
      
      {isTutor 
      ? 
        <div className='flex place-items-center justify-end pl-4 pr-4'>
          <Button  variant = 'link' className='flex-1 bg-inherit p-1 ' ><Image src="/image/subject-picture/Trash.png" alt="Trash Icon" width={30} height={100} /></Button>
        </div>
      : <div className='flex place-items-center justify-end'>
          <Button variant = 'link' onClick={downloadFile} className='font-prompt flex-1 bg-[url("/image/subject-picture/bg-download-button.png")] bg-cover bg-center text-white h-12 rounded-xl text-lg hover:text-white'>Download</Button>
        </div>
      }
    </div>
  )
}