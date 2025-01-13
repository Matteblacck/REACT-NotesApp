import styled from 'styled-components';
import Button from '../Button/Button';
import Modal from './ModalConfirm';
import { useState } from 'react';
import { fluidText } from '../../utils';

const SidebarContainer = styled.div`
  height: 100vh;
  border-right: 1px solid gray;
  font-family: 'Prompt', sans-serif;
  overflow-y: auto; /* Включаем вертикальную прокрутку, если контент выходит за пределы */
  scrollbar-width: thin; /* Стилизация скроллбара для современных браузеров */
  scrollbar-color: gray transparent;

  &::-webkit-scrollbar {
    width: 2px; /* Ширина скроллбара для Webkit-браузеров */
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray; /* Цвет ползунка */
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* Цвет трека */
  }
`;

const HeaderContainer = styled.div`
  position: sticky; /* Фиксируем заголовок */
  top: 0; /* Положение относительно верхней границы боковой панели */
  background-color: black; /* Цвет фона, чтобы перекрывать прокручиваемые элементы */
  z-index: 10; /* Чтобы оставаться выше содержимого */
  padding-top: 1.5rem;
  padding-left: 0.6rem;
  padding-right: 1.4rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid gray; /* Разделительная линия */
`;

const NoteInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: black;
  color: white;
  outline: none;

  &::placeholder {
    color: gray;
  }
`;

const NoteItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  &.active {
    background-color: #252525;
  }

  &:hover {
    border: 1px solid gray;
  }
  .note-date {
    font-size: 0.8rem;
    color: gray;
  }
`;

export default function SideBar({
  notes,
  onAddNote,
  onDeleteNote,
  onSelectNote,
  activeNoteId,
}) {
  const [neededNote, setNeededNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для отображения модалки
  const [noteToDeleteId, setNoteToDeleteId] = useState(null); // ID заметки, которую надо удалить

  // Modal funcs
  const openModal = (noteId) => {
    setNoteToDeleteId(noteId);
    setIsModalOpen(true); // Открываем модальное окно
  };
  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setNoteToDeleteId(null); // Сбрасываем выбранную заметку для удаления
  };
  const confirmDelete = () => {
    if (noteToDeleteId !== null) {
      onDeleteNote(noteToDeleteId); // Удаляем заметку
    }
    closeModal(); // Закрываем модальное окно
  };

  const result = notes
    .filter((note) => note.title.toLowerCase().includes(neededNote.toLowerCase())) // Фильтрация по введенному тексту
    .map((note) => (
      <NoteItem
        key={note.id}
        className={note.id === activeNoteId ? 'active' : ''}
        onClick={() => {
          onSelectNote(note.id); // Выбираем заметку
        }}
      >
        <div>
          <div>{note.title || 'Untitled'}</div>
          <div>{note.date}, {note.time}</div>
        </div>
        <div>
          {note.id === activeNoteId && (
            <div>
              <Button onClick={() => openModal(note.id)}>Delete</Button>
            </div>
          )}
        </div>
      </NoteItem>
    ));

  return (
    <SidebarContainer>
      <HeaderContainer className="d-flex flex-column">
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between ">
          <h2 style={{ fontSize: fluidText(25, 16) }} className="text-start">
            Your notes
          </h2>
          <Button onClick={onAddNote} style={{ fontSize: fluidText(20, 12) }}>
            Add note
          </Button>
        </div>
        {/* Input для поиска или фильтрации */}
        <NoteInput
          type="text"
          placeholder="Search note..."
          onChange={(e) => {
            setNeededNote(e.target.value);
          }}
        />
      </HeaderContainer>
      <div>{result}</div>
      {isModalOpen && (
        <Modal onConfirm={confirmDelete} onCancel={closeModal} />
      )}
    </SidebarContainer>
  );
}