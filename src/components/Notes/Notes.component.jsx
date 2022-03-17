import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Notes.styles.css'
import axios from 'axios';

export default class Notes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            currentPage: 1,
        };
    }
    pinnedNotes() {
        return this.state.notes.filter((note) => note.isPinned)
    }
    unPinnedNotes() {
        return this.state.notes.filter((note) => note.isPinned === false)
    }
    componentDidMount() {
        axios.get(`https://notepad-live.herokuapp.com/notes/`)
            .then(response => this.setState({ notes: response.data }))
    }
    render() {
        const Notes = this.pinnedNotes().concat(this.unPinnedNotes())
        const s_idx = 6 * (this.state.currentPage) - 6
        const e_idx = 6 * (this.state.currentPage)
        return (
            <>
                <div className='grid_container'>
                    {Notes.splice(s_idx, e_idx).map(note =>
                        <Link to={`/edit/${note.id}`} key={note.id} className="bg-blue-200 p-3 rounded shadow">
                            <div className="flex justify-between items-center mb-1">
                                <h1 className="font-medium text-lg">{note.title}</h1>
                            </div>
                            <p className="text-gray-600 text-sm">{note.body}</p>
                        </Link>
                    )
                    }
                </div>
                <Link to="/create" className="right-10 bottom-10 z-10 absolute h-14 w-14 rounded-full bg-blue-500 text-white shadow-lg text-xl flex justify-center items-center outline-none focus:outline-none focus:bg-blue-600">
                    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </Link>
                <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-20 flex justify-center items-center hidden">
                    <div className="bg-white w-4/5 rounded-lg p-4">
                        <div className="flex justify-end">
                            <div className="rounded-full bg-transparent border border-gray-500 h-8 w-8 flex justify-center items-center text-gray-500 cursor-pointer hover:border-gray-700 text-gray-700">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='button_container'>
                        <button className={'btn btn-primary'} onClick={(e) => this.setState({ currentPage: this.state.currentPage - 1 })} disabled={(this.state.currentPage <= 1)}>&larr;Previous</button>
                        <span className='page_count'><h2>{this.state.currentPage}</h2></span>
                        <button className={'btn btn-primary'} onClick={(e) => this.setState({ currentPage: this.state.currentPage + 1 })} disabled={this.state.currentPage >= (Math.ceil(this.state.notes.length / 6))}>Next&rarr;</button>
                    </div>
                </div>
            </>

        )
    }
}
