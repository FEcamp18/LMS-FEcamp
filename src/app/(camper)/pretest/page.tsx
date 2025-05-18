import ExamList from "@/components/pretest/ExamList"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Pretest Room | FE camp",
  description: "Pretest room announcement for 18th FE Camp",
}

export default function PretestPage() {
  return (
    <main className="relative flex w-full flex-col space-y-8 overflow-x-visible p-4">
      {/* Main Text */}
      <div className="w-full items-center justify-center text-center">
        <p className="bg-gradient-to-b from-brown to-light-gray bg-clip-text font-inknut text-[4vw] text-transparent">
          Pre-Test Room
        </p>
        <p className="font-xl text-brown">ประกาศห้องสอบ</p>
      </div>

      <ExamList />
    </main>
  )
}
