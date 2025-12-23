// Componente PizzaCard - Card de pizza do menu
// Exibe informações resumidas de uma pizza

import styled from "styled-components";
import { theme } from "../../styles/GlobalStyles";

// Container do card
const Card = styled.article`
  background-color: ${theme.colors.white};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border: 8px solid #e66767;
`;

// Imagem da pizza
const CardImage = styled.div`
  height: 200px;
  overflow: hidden;
  width: 100%;

  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Conteúdo do card
const CardContent = styled.div`
  background-color: #e66767;
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Título da pizza
const CardTitle = styled.h3`
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

// Descrição da pizza
const CardDescription = styled.p`
  color: ${theme.colors.white};
  font-size: 13px;
  line-height: 1.4;
  margin: 0 0 12px 0;
  flex: 1;

  /* Limita a 4 linhas */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Botão de adicionar ao carrinho
const AddButton = styled.button`
  background-color: ${theme.colors.background};
  color: #e66767;
  font-size: 14px;
  font-weight: 800;
  padding: 10px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  width: 100%;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
`;

// Componente PizzaCard
// Props: pizza - objeto com dados da pizza
// Props: onAddClick - função chamada ao clicar no botão
function PizzaCard({ pizza, onAddClick }) {
  return (
    <Card>
      {/* Imagem */}
      <CardImage>
        <img src={pizza.image} alt={pizza.name} />
      </CardImage>

      {/* Conteúdo */}
      <CardContent>
        <CardTitle>{pizza.name}</CardTitle>
        <CardDescription>{pizza.description}</CardDescription>
        <AddButton onClick={() => onAddClick(pizza)}>
          Adicionar ao carrinho
        </AddButton>
      </CardContent>
    </Card>
  );
}

export default PizzaCard;
