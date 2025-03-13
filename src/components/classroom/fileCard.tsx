'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Folder } from 'lucide-react'



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
    <div className='max-w-2xl md:h-20 rounded-2xl m-3 grid grid-cols-4 gap-3 border-2 border-black'>
      <div className='col-span-2 flex'>
        <div className='flex-auto'>
        <Folder className='ml-3 mt-4' size={28}/>
        </div>
        <div className='flex-auto mt-4 ml-2'>
          <h1>{fileTitle}</h1>
          <p>{fileDescription}</p>
        </div>
      </div>
      
      {isTutor 
      ? <div className='flex items-center mx-1'>
          <Button onClick={downloadFile} className='flex-1 bg-[#ACCCFD] text-black h-12 rounded-xl text-lg hover:text-white'>Dowload</Button>
        </div>
      : <div className=''></div>
      }
      
      {isTutor 
      ? <div className='flex items-center mr-2'>
          <Button className='flex-1 bg-[#FFB6B6] text-black h-12 rounded-xl text-lg hover:text-white'>Delete</Button>
        </div>
      : <div className='flex items-center mx-2'>
          <Button onClick={downloadFile} className='flex-1 bg-[#D9D9D9] text-black h-12 rounded-xl text-lg hover:text-white'>Dowload</Button>
        </div>
      }
    </div>
  )
}
