'use client'
import React from 'react'
import { Button } from '../ui/button'
import { DownloadButton } from '../ui/download-file-button'
import { Folder } from 'lucide-react'
import { Trash2 } from 'lucide-react'



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
          <DownloadButton onClick={downloadFile} className='font-prompt flex-1 bg-[url("/image/subject-picture/bg-download-button.png")] bg-cover bg-center text-white h-12 rounded-xl text-lg hover:text-white'>Download</DownloadButton>
        </div>
      : <div className=''></div>
      }
      
      {isTutor 
      ? 
        <div className='flex place-items-center justify-end pr-4'>
          <Button className='bg-inherit h-12 p-4 ' ><Trash2 className='bg-inherit' size={50} strokeWidth={2} color="#86796e"/></Button>
        </div>
      : <div className='flex place-items-center justify-end'>
          <DownloadButton onClick={downloadFile} className='font-prompt flex-1 bg-[url("/image/subject-picture/bg-download-button.png")] bg-cover bg-center text-white h-12 rounded-xl text-lg hover:text-white'>Download</DownloadButton>
        </div>
      }
    </div>
  )
}