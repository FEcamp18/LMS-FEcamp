"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const WebPhase: string = "BeforeCam"
  const router = useRouter()

  function redirectToLogin() {
    router.push("/login")
  }

  function redirectToClassroom() {

    router.push("/classroom")
  }

  function redirectToFeedback() {
    router.push("/feedback")
  }

  return (
    <div>
      {(WebPhase === "BeforeCamp" || WebPhase !== "Close") && (
        <div className="bg-gray-300 w-full h-16 flex justify-between items-center px-6 py-2 fixed top-0 left-0 z-10">
          
          <img
            src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex justify-end items-center space-x-4">
            <button
              onClick={redirectToClassroom}
              className="bg-grey-500 text-black rounded-full px-6 py-2"
            >
              Classroom
            </button>
            <button
              onClick={redirectToFeedback}
              className="bg-grey-500 text-black rounded-full px-6 py-2"
            >
              Feedback
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center min-h-screen pt-16">

        {WebPhase === "Close" ? (
          <div className="text-4xl font-bold">ปิดปรับปรุง</div>
        ) : WebPhase === "BeforeCamp" ? (
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-4">Landing Page ngub</h1>
            <button
              className="px-8 py-3 bg-gray-300 text-white rounded-full border-2 border-gray-400 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        ) : (
          
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-4">Landing Page ngub</h1>
            <button onClick={redirectToLogin} className="px-8 py-3 bg-blue-500 text-white rounded-full">
              Login</button>
          </div>
        )}
      </div>
    </div>
  );
}
