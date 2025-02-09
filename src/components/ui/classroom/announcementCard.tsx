import React from 'react'

type announcementCard = {
    annoTime:Date, 
    annoTitle:string, 
    annoText:string, 
}

export default function AnnouncementCard({annoTime,annoTitle,annoText}: announcementCard) {
    return (
        <div className= "max-w-2xl max-h-30 rounded-2xl grid grid-cols-5 gap-3 p-3 pl-5 m-3 border-2 border-black bg-gray-100">
            <div className="border-b sm:border-b-0 sm:border-r-4 border-gray-400">
                <p className= "align-middle p-2 text-gray-600">
                    {`${annoTime.getDate()}/${annoTime.getMonth()+1}/${annoTime.getFullYear().toString().substr(-2)}`} <br />  {`${annoTime.getHours()}:${annoTime.getMinutes()}` }
                </p>
            </div>
            <div className='col-span-4'>
                <h1 className= "font-bold">
                    {annoTitle} 
                </h1>
                <p className= "font-light text-sm">
                    {annoText}
                </p>
            </div>
            
        </div>
    )
}