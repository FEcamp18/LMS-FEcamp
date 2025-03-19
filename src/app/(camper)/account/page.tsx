// write your code here
import Logout from "./Logout";
import ChangePassForm from "./ChangePass";
import { useSession } from "next-auth/react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  return (
    <>
      <h1 className="mx-8 mt-20 text-4xl">
        นี่ชื่อน้องค่าย นี่นามสกุล (นี่ชื่อเล่น)
        {session?.user.name}
      </h1>

      <main className="mx-9 mt-5 grid-cols-6 gap-8 md:grid">
        <section className="col-span-2 text-xl">
          <h1 className="mb-1 font-semibold">ข้อมูลส่วนตัว</h1>
          <ul>
            <li> &#8226; ContactTel</li>
            <li> &#8226; ContactEmail</li>
            <li> &#8226; FEyear</li>
            <li> &#8226; parentTel (ParentRalationship)</li>
            <li> &#8226; Section</li>
          </ul>
        </section>

        <section className="col-span-3 text-xl">
          <div>
            <h2 className="ml-10 font-semibold">HealthInfo</h2>
            <p className="ml-10 mt-4 bg-slate-200 py-10 text-center">
              textarea ยาวๆ
            </p>
          </div>

          <div className="mt-5">
            <h2 className="ml-10 font-semibold">FoodInfo</h2>
            <p className="ml-10 mt-4 bg-slate-200 py-10 text-center">
              textarea ยาวๆ
            </p>
          </div>
        </section>
      </main>

      <div className="mx-9 mt-8">
        <Logout />
        <ChangePassForm />
      </div>
    </>
  );
}
