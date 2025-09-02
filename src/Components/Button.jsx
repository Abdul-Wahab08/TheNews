import React from 'react'

function Button({ onClick, children }) {
    return (
        <div>
            <button
                onClick={onClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow cursor-pointer hover:bg-blue-700 active:scale-95 transition">
                {children}
            </button>
        </div>
    )
}

export default Button
