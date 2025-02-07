// write your code here
import Logout from "./Logout"
import ChangePassForm from "./ChangePass"


export default function AccountPage() {

  return (
    <>
      <h1 className='mx-8 mt-20 text-4xl'>
        นี่ชื่อน้องค่าย นี่นามสกุล (นี่ชื่อเล่น)
      </h1>

      <main className='md:grid grid-cols-6 gap-8 mt-5 mx-9'>
        
        <section className='col-span-2 text-xl'>
          <h1 className='font-semibold mb-1'>ข้อมูลส่วนตัว</h1>
          <ul>
            <li> &#8226; ContactTel</li>
            <li> &#8226; ContactEmail</li>
            <li> &#8226; FEyear</li>
            <li> &#8226; parentTel (ParentRalationship)</li>
            <li> &#8226; Section</li>
          </ul>
        </section>

        <section className='col-span-3 text-xl'>
          
          <div>
            <h2 className='font-semibold ml-10'>HealthInfo</h2>
            <p className='ml-10 py-10 mt-4 bg-slate-200 text-center'>
              textarea ยาวๆ
            </p>
          </div>

          <div className='mt-5'>
            <h2 className='font-semibold ml-10'>FoodInfo</h2>
            <p className='py-10 mt-4 ml-10 bg-slate-200 text-center'>
              textarea ยาวๆ
            </p>
          </div>
      
        </section>  

      </main>

      <div className='mx-9 mt-8'>
        <Logout/>
        <ChangePassForm/>
      </div>

    </>
  )
}



