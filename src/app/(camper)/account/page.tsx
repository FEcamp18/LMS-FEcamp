"use client";
import Logout from "./Logout";
import ChangePassForm from "./ChangePass";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function AccountPage() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = async () => {
      await update();
    };
    void handleLoad();
    setLoading(false);
  }, [status, update]);

  if (loading) return <div>Loading...</div>;

  if (status === "unauthenticated" || session === null) {
    return <div>You are not logged in. Please log in to access this page.</div>;
  }

  return (
    <>
      <Toaster />
      <h1 className="mx-8 mt-20 text-4xl">
        นี่ชื่อน้องค่าย นี่นามสกุล ({session?.user?.username ?? "Unknown"})
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
