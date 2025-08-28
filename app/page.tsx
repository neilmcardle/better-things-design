"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Look.\n\nI build ideas.\n\nI do not have a niche to sell you.\n\nInstead, for you, I am convinced of better things."
  const [displayText, setDisplayText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(typingInterval)
      }
    }, 50) // Adjust typing speed here

    return () => clearInterval(typingInterval)
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500) // Cursor blink speed

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <pre className="text-lg md:text-xl lg:text-2xl whitespace-pre-wrap leading-relaxed">
          {displayText}
          {(showCursor || !isTypingComplete) && (
            <span className="inline-block w-3 h-6 md:h-7 lg:h-8 bg-white ml-1 align-text-bottom animate-pulse" />
          )}
        </pre>
      </div>
    </div>
  )
}
