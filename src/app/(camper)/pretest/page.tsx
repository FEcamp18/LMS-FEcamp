export default function CheckinPage() {
  return (
    <main className="relative flex w-full flex-col space-y-8 overflow-x-visible p-4">
      <div className="w-full items-center justify-center text-center">
        <p className="font-inknut from-brown to-light-gray bg-gradient-to-b bg-clip-text text-[4vw] text-transparent">
          Pre-Test Room
        </p>
        <p className="font-xl text-brown">ประกาศห้องสอบ</p>
      </div>
      <div className="relative left-1/2 h-64 w-[110%] -translate-x-1/2 bg-white p-10 px-20">
        <p>ข้อกำหนดห้องสอบ</p>
        <ol className="list-[upper-roman] space-y-1">
          <li className="ml-16">ข้อยาวๆ นี่นะน้อง บลาบลา</li>
          <li className="ml-16">ข้อยาวๆ นี่นะน้อง บลาบลา</li>
          <li className="ml-16">ข้อยาวๆ นี่นะน้อง บลาบลา</li>
          <li className="ml-16">ข้อยาวๆ นี่นะน้อง บลาบลา</li>
          <li className="ml-16">ข้อยาวๆ นี่นะน้อง บลาบลา</li>
        </ol>
      </div>
    </main>
  );
}
