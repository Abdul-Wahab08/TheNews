import React from "react"

function Footer() {
  return (
    <footer className="w-full bg-cyan-700 text-white rounded-lg py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} NewsApp. All rights reserved.
        </p>

         <p className="text-sm text-gray-400">
          Built with React + NewsAPI
        </p>
      </div>
    </footer>
  )
}

export default Footer
