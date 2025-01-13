import styled from 'styled-components';

const NoteContainer = styled.div`
  height: 100vh;
  font-family: 'Prompt', sans-serif;
  background-color: black;
  display: flex;
  flex-direction: column;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2rem;
  padding-left: 0.5rem;
  padding-bottom:1rem;
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
`;

const NoteArea = styled.textarea`
  flex: 1;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding-left: 0.5rem;
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  resize: none;
  outline: none;
  background-color: black;
  color: white;
`;

const TitleInput = styled.input`
  flex: 1;
  width: 40vw;
  border: none;
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  outline: none;
  background-color: black;
  color: white;
  margin-bottom:1.1rem;
`;
const TagSelect = styled.select`
  padding: 0.4rem;
  font-size: 1rem;
  width:15vw;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: black;
  color: White;
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: white;
  }

`;

const TagSelectOption = styled.option`
  background-color: white;
  color: black;
`;



export default function Note({ note, onUpdateNote }) {
  return (
    <NoteContainer>
      <Toolbar>
        <div className='d-flex flex-column'>
          <TitleInput
            value={note.title}
            placeholder="Enter the title..."
            onChange={(e) => onUpdateNote(note.id, 'title', e.target.value)}
          />
        </div>
      </Toolbar>
      <NoteArea
        value={note.content}
        placeholder="Write your note here..."
        onChange={(e) => onUpdateNote(note.id, 'content', e.target.value)}
      />
    </NoteContainer>
  );
}