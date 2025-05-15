"use client"
import { parse } from "csv-parse/sync"
import Link from "next/link"
import { useEffect, useState } from "react"
interface FeedbackInterface {
  id: number
  name: string
  topic: string
  link: string
}

export default function FeedbackPage() {
  const [feedbackLinks, setFeedbackLinks] = useState<FeedbackInterface[]>([])
  const [checkedState, setCheckedState] = useState<number[]>([])

  useEffect(() => {
    const fetchFeedbackLinks = async () => {
      const response = await fetch("/data/feedbackLinks.csv")
      const csvText = await response.text()

      let records: FeedbackInterface[] = []
      try {
        records = parse(csvText, {
          columns: true,
          skip_empty_lines: true,
          cast: true,
        }) as FeedbackInterface[]
      } catch {
        console.log("error while read staff.csv")
        return
      }
      setFeedbackLinks(records)
    }

    void fetchFeedbackLinks()
  }, [])

  // Load state from localStorage on mount
  useEffect(() => {
    const storedState = localStorage.getItem("feedbackCheckedState")
    if (storedState) {
      setCheckedState(JSON.parse(storedState) as number[])
    } else {
      setCheckedState(new Array(feedbackLinks.length).fill(0))
    }
  }, [feedbackLinks.length])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("feedbackCheckedState", JSON.stringify(checkedState))
  }, [checkedState])

  const handleCheckboxChange = (index: number) => {
    const updatedState = [...checkedState]
    updatedState[index] = updatedState[index] === 1 ? 0 : 1
    setCheckedState(updatedState)
  }

  // Group feedback links by topic
  const groupedFeedback = feedbackLinks.reduce(
    (acc, feedback) => {
      acc[feedback.topic] ??= []
      acc[feedback?.topic ?? "Overall"]?.push(feedback)
      return acc
    },
    {} as Record<string, typeof feedbackLinks>,
  )

  return (
    <main className="relative flex w-full flex-col space-y-8 overflow-x-visible p-4">
      {/* Main Text */}
      <div className="w-full items-center justify-center text-center">
        <p className="bg-gradient-to-b from-brown to-light-gray bg-clip-text font-inknut text-[4vw] text-transparent">
          Feedback Form
        </p>
        <p className="font-xl text-brown">แบบฟอร์มประเมินค่าย FE18</p>
      </div>

      {/* Feedback Sections */}
      {Object.entries(groupedFeedback).map(([topic, feedbacks]) => (
        <div key={topic} className="w-full px-8 sm:px-20">
          <p className="relative my-2 text-xl font-bold text-dark-brown">
            {topic}
          </p>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="flex flex-col items-center justify-between rounded-lg border-2 border-light-brown p-4"
              >
                <p className="text-center font-semibold">{feedback.name}</p>

                <a
                  href={feedback.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded bg-light-brown px-4 py-2 text-white hover:bg-dark-brown"
                >
                  ไปที่ฟอร์ม
                </a>
                <label className="mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checkedState[feedback.id] === 1}
                    onChange={() => handleCheckboxChange(feedback.id)}
                    className="h-5 w-5"
                  />
                  <span>เสร็จสิ้น</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
