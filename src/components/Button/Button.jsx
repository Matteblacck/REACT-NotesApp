import styled from 'styled-components';

const Buttonn = styled.button`
  background-color: black;
  color: white;
  border: 1px solid gray;
  font-weight: 400;
  font-size: 15px;
  font-family: 'Prompt';
  border-radius: 20px;
  width: 100px;
  height: 30px;

  /* Центрирование текста */
  display: flex;
  justify-content: center; /* Горизонтальное центрирование */
  align-items: center; /* Вертикальное центрирование */

  &:hover {
    background-color:#3d3c3c;
  }
`;

export default function Button({ children, onClick }) {
  return (
    <Buttonn onClick={onClick}>{children}</Buttonn> // Передаем обработчик события
  );
}