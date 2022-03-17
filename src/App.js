import './App.css';
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Notes from './components/Notes/Notes.component';
import CreateNote from './components/CreateNote/CreateNote.component';
import EditNote from './components/EditNote/EditNote.component';
import Header from './components/Header/Header.component';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route element={<Notes />} exact path='/' />
        <Route element={<EditNote />} exact path='/edit/:id' />
        <Route element={<CreateNote />} exact path='/create' />
      </Routes>
    </div>
  );
}

export default App;
