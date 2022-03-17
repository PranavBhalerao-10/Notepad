import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert.component';

export function withRouter(Children) {
    return (props) => {

        const match = { params: useParams() };
        const navigate = useNavigate()
        return <Children {...props} match={match} navigate={navigate} />
    }
}

class EditNote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: '',
            goBack: false,
            show: null,
        };
    }

    componentDidMount() {
        let noteId = this.props.match.params.id;

        axios.get(`http://localhost:5000/notes/${noteId}`)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    body: response.data.body,
                    isPinned: response.data.isPinned,
                })
                console.log(this.state.isPinned)
            });
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleBodyChange(e) {
        this.setState({ body: e.target.value });
    }
    handlePinChange(e) {
        e.preventDefault();
        // Make an api call to save the note the the id of this.props.match.params.id
        this.setState({ isPinned: !(this.state.isPinned) })
        this.setState({ show: true })
        axios.patch(`http://localhost:5000/notes/${this.props.match.params.id}`, {
            isPinned: this.state.isPinned,
        }).then(response => {
            console.log(this.state.show)
        })

    }

    handleDelete(e) {
        e.preventDefault();
        // Make an api call to delete the note with the id of this.props.match.params.id
        axios.delete(`http://localhost:5000/notes/${this.props.match.params.id}`)
            .then(response => {
                this.props.navigate('/')
            })
    }

    handleSave(e) {
        e.preventDefault();
        // Make an api call to save the note the the id of this.props.match.params.id
        axios.patch(`http://localhost:5000/notes/${this.props.match.params.id}`, {
            title: this.state.title,
            body: this.state.body,
            isPinned: this.state.isPinned,

        }).then(response => {
            this.props.navigate('/')
        })
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.navigate('/')
    }
    render() {
        return (
            <>
                <header className="bg-gray-900 shadow h-12 w-full mb-4 flex justify-center items-center">
                    <a href="/" className="text-gray-50 font-bold text-lg uppercase tracking-wide">Notes</a>
                </header>

                <div className="px-4 mb-4">
                    <Alert isPinned={this.state.isPinned} show={this.state.show} />
                    <form className="px-4 py-6 rounded-lg shadow-lg">
                        <label htmlFor="title" className="text-black text ml-1">Title</label>
                        <input value={this.state.title} onChange={this.handleTitleChange.bind(this)} type="text" className="w-full p-4 rounded-lg outline-none text-gray-300 bg-gray-800 block mb-4 " id="title" name="title" />
                        <label htmlFor="body" className="text-black text ml-1">Description</label>
                        <textarea value={this.state.body} onChange={this.handleBodyChange.bind(this)} type="text" className="w-full h-36 p-4 rounded-lg text-gray-300 bg-gray-800 outline-none bg-black mb-4" id="body" name="title" />
                        <div className="flex justify-between items-center">
                            <div>
                                <button onClick={this.handleDelete.bind(this)} className="bg-red-500 text-white px-6 py-3 inline-block mb-6 shadow-lg rounded-lg hover:shadow flex items-center">
                                    <svg className="h-5 w-5 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="hidden ml-2 md:inline">Delete Note</span>
                                </button>
                            </div>
                            <div>
                                <button onClick={this.handlePinChange.bind(this)} className="bg-blue-500 text-white px-6 py-3 inline-block mb-6 shadow-lg rounded-lg hover:shadow flex items-center">
                                    <img src='../../../Assets/thumbtack-solid.svg' alt="" />
                                    <span className="hidden ml-2 md:inline">{this.state.isPinned ? 'Pin Note' : 'Unpin Note'}</span>
                                </button>
                            </div>
                            <div className="flex">
                                <Link onClick={this.handleSave.bind(this)} to="/" className="bg-blue-500 text-white px-6 py-3 inline-block mb-6 shadow-lg rounded-lg hover:shadow flex items-center">
                                    <svg className="h-5 w-5 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="hidden ml-2 md:inline">Save</span>
                                </Link>
                                <Link onClick={this.handleCancel.bind(this)} to="/" className="bg-transparent text-gray-800 px-6 py-3 inline-block mb-6 rounded-lg hover:shadow flex items-center">
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
}
export default withRouter(EditNote);