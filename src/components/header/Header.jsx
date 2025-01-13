import styled from "styled-components";

const HeaderContainer = styled.div`
  position: fixed; /* Зафиксировать контейнер сверху */
  top: 0; /* Устанавливаем на верхнюю часть экрана */
  left: 0; /* Устанавливаем на левую сторону */
  width: 100%; /* Ширина на весь экран */
  background-color: black; /* Цвет фона шапки */
  color: white; /* Цвет текста */
  border-bottom: 2px solid #ccc; /* Отчерчиваем нижнюю границу */
  z-index: 1000; /* Поверх остальных элементов */
  padding: 0.5rem; /* Отступы внутри шапки */
`;

const Title = styled.div`
  font-family: 'Prompt', sans-serif;
  font-size: 1.5rem; /* Увеличенный шрифт */
  padding-left: 1rem;
`;

export default function Header() {
  return (
    <>
    <HeaderContainer className="d-flex">
      <Title>
        <h1>notes.</h1>
        <p style={{fontSize:'10px', marginTop:'-15px', marginLeft:'42px'}}>by matteblack</p>
      </Title>
    </HeaderContainer>
    </>
    
  );
}