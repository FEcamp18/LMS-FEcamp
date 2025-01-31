// write your code here
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Account page | FE Camp"
};

export default function AccountPage() {
  

  return (
    <>
      <div className='mx-8 mt-20 text-4xl'>
        นี่ชื่อน้องค่าย นี่นามสกุล (นี่ชื่อเล่น)
      </div>

      <div className='md:grid grid-cols-6 gap-8 mt-5 mx-9'>
        
        <div className='col-span-2 text-xl'>
          <h1 className='font-semibold mb-1'>ข้อมูลส่วนตัว</h1>
          <ul>
            <li> &#8226; ContactTel</li>
            <li> &#8226; ContactEmail</li>
            <li> &#8226; FEyear</li>
            <li> &#8226; parentTel (ParentRalationship)</li>
            <li> &#8226; Section</li>
          </ul>
        </div>

        <div className='col-span-3 text-xl'>
          
          <div>
            <h1 className='font-semibold ml-10'>HealthInfo</h1>
            <div className='ml-10 py-10 mt-4 bg-slate-200 text-center'>
              textarea ยาวๆ
            </div>
          </div>

          <div className='mt-5'>
            <h1 className='font-semibold ml-10'>FoodInfo</h1>
            <div className='py-10 mt-4 ml-10 bg-slate-200 text-center'>
              textarea ยาวๆ
            </div>
          </div>
      
        </div>  

      </div>

      <div className='mx-9 mt-8'>
        <button className='bg-slate-300 rounded-3xl py-3 px-16 text-lg ' >
          change password
        </button>

        <button className='bg-slate-300 rounded-3xl py-3 px-28 mt-4 text-lg block'>
          log out
        </button>
      </div>
      
    
    
    </>
  )
}

