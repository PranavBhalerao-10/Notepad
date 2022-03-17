import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <nav className="shadow-lg border-t-4 border-blue-500">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <Link to="/" className="flex items-center py-4 px-2"><span class="font-semibold text-gray-500 text-lg">NotePad</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header