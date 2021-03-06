import React from 'react';
import { useNavigate } from 'react-router'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useState } from 'react';

const CreateNote = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [isPinned] = useState(false)
    const navigate = useNavigate()

    const handleSave = (e) => {
        e.preventDefault();
        // Make an api call to create a new note
        axios.post('https://notepad-live.herokuapp.com/notes', {
            title: title,
            body: body,
            isPinned: isPinned,
        }).then(response => {
            navigate('/')
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    }

    return (
        <>
            <header className="bg-gray-900 shadow h-12 w-full mb-4 flex justify-center items-center">
                <Link to="/" className="text-gray-50 font-bold text-lg uppercase tracking-wide">Notepad</Link>
            </header>
            <div className="px-4 mb-4">
                <form className="px-4 py-6 rounded-lg shadow-lg">
                    <label htmlFor="title" className="text-black text-sm ml-1">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-full p-4 rounded-lg outline-none text-gray-300 bg-gray-800 block mb-4 " id="title" name="title" />
                    <label htmlFor="body" className="text-black text-sm ml-1">Description</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} type="text" className="w-full h-36 p-4 rounded-lg text-gray-300 bg-gray-800 outline-none bg-black mb-4" id="body" name="title" />
                    <div className="flex justify-between items-center">
                        <div>
                        </div>
                        <div className="flex">
                            <Link onClick={handleSave} to="/" className="bg-blue-500 text-white px-6 py-3 inline-block mb-6 shadow-lg rounded-lg hover:shadow flex items-center">
                                <svg className="h-5 w-5 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="hidden ml-2 md:inline">Save</span>
                            </Link>
                            <Link onClick={handleCancel} to="/" className="bg-transparent text-gray-800 px-6 py-3 inline-block mb-6 rounded-lg hover:shadow flex items-center">
                                <svg className="h-5 w-5 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="hidden ml-2 md:inline">Cancel</span>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}

export default CreateNote;
