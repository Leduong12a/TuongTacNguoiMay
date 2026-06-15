import React from 'react'

// Custom Chat Bubble Icon matching the reference image
export const ChatIcon = () => (
  <div className="w-14 h-14 bg-[#2B78E4] rounded-full flex items-center justify-center mb-6 shadow-sm transform transition-transform hover:scale-105 duration-200">
    <svg
      className="w-7 h-7 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
        fill="currentColor"
      />
      <rect x="6" y="7" width="12" height="2" rx="1" fill="#2B78E4" />
      <rect x="6" y="11" width="12" height="2" rx="1" fill="#2B78E4" />
    </svg>
  </div>
)

// Custom Red Exclamation Warning Icon matching the reference image
export const ErrorIcon = () => (
  <svg
    className="w-6 h-6 text-[#D32F2F]"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
    <path
      d="M12 7V13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.5" r="1" fill="white" />
  </svg>
)

// Custom Hourglass Icon for OTP Timer matching the reference image
export const HourglassIcon = () => (
  <svg
    className="w-4 h-4 text-[#4A4A4A] mr-1.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 2h14" />
    <path d="M5 22h14" />
    <path d="M19 2v4c0 4-3 7-7 7s-7-3-7-7V2" />
    <path d="M5 22v-4c0-4 3-7 7-7s7 3 7 7v4" />
  </svg>
)
