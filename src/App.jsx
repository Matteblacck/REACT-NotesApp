import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';
import SideBarOnPhone from './components/sidebar/SideBarOnPhone'
import Note from './components/note/Note';
import styled from 'styled-components';
import Button from './components/Button/Button';

const ContentContainer = styled.div`
  margin-top: 6rem;

  @media (max-width: 576px) {
    margin-top: 0; /* Убираем отступ для экранов меньше 576px */
  }
`;

function App() {
  const [notes, setNotes] = useState([]); // Храним список заметок
  const [activeNoteId, setActiveNoteId] = useState(null); // ID активной заметки
  const [sidebarOpen, setSidebarOpen] = useState(false); // Состояние для открытия/закрытия сайдбара

  // Загружаем заметки из localStorage при старте приложения
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || []; // Если заметки есть, загружаем их
    setNotes(storedNotes);
  }, []);
  
  // Сохраняем заметки в localStorage каждый раз, когда они изменяются
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = () => {
    const now = new Date();
    const newNote = {
      id: Date.now(),
      title: '',
      content: '',
      date: now.toLocaleDateString(), // Дата
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Время в формате часы:минуты
    };
    setNotes([newNote, ...notes]); // Добавляем заметку в начало
    setActiveNoteId(newNote.id);
  };
  
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  
  const updateNote = (id, field, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <>
      <div className='d-sm-block d-none'>
        <Header/>
      </div>
      
      <ContentContainer className="container-fluid">
        <div className="row">
          {/* Сайдбар, который скрывается на экранах ниже sm */}
          <div className={`col-lg-3 col-4 d-none d-sm-block`}>
            <SideBar
              notes={notes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
              onSelectNote={setActiveNoteId}
              activeNoteId={activeNoteId}
            />
          </div>
          <div className={`${sidebarOpen ? 'd-block' : 'd-none'}`}>
            <SideBarOnPhone
              notes={notes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
              onSelectNote={setActiveNoteId}
              activeNoteId={activeNoteId}
              setSidebarOpen={setSidebarOpen} // Передаем setSidebarOpen
            />
          </div>

          {/* Основной контент, который занимает остальную часть экрана */}
          <div className="col-lg-9 col-sm-8 col-12">
            <div className="d-block d-sm-none pt-2">
              <Button
                style={{ border: 'none', width: '20px' }}
                onClick={() => {
                  setSidebarOpen(!sidebarOpen);
                }}
              >
                -All notes
              </Button>
            </div>
            {activeNote ? (
              <Note note={activeNote} onUpdateNote={updateNote} />
            ) : (
              <div style={{ padding: '2rem', color: 'gray' }}>
                Choose or create a note.
              </div>
            )}
          </div>
        </div>
      </ContentContainer>
    </>
  );
}

export default App;