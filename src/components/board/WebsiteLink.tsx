import Link from "next/link"

export default function WebsiteLink() {
  return (
    <>
      <div className="my-3 flex flex-row items-center justify-center space-x-5 border-y-2 py-2">
        <p>Website Link</p>
      </div>
      <div className="my-10 grid w-[80%] grid-cols-1 items-center justify-items-center gap-5 sm:grid-cols-2">
        {Object.keys(LINKS).map((key) => (
          <Link
            href={LINKS[key as keyof typeof LINKS]}
            key={key}
            className="flex w-72 cursor-pointer flex-col items-center justify-center rounded-lg bg-black p-2 text-lg hover:bg-zinc-800"
          >
            {key}
          </Link>
        ))}
      </div>
    </>
  )
}

const LINKS = {
  landing: "/",
  classroom: "/classroom",
  pretest: "/pretest",
  camperinfo: "/camperinfo",
  tutor: "/tutor",
}
