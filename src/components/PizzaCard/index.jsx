// Componente PizzaCard - Card de pizza do menu
// Exibe informações resumidas de uma pizza

import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

// Container do card
const Card = styled.article`
  background-color: ${theme.colors.primary};
  overflow: hidden;
`;

// Imagem da pizza
const CardImage = styled.div`
  height: 167px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Conteúdo do card
const CardContent = styled.div`
  padding: 8px;
`;

// Título da pizza
const CardTitle = styled.h3`
  color: ${theme.colors.primaryLight};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

// Descrição da pizza
const CardDescription = styled.p`
  color: ${theme.colors.primaryLight};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 8px;
  
  /* Limita a 4 linhas */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Botão de adicionar ao carrinho
const AddButton = styled.button`
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 700;
  padding: 4px 6px;
  transition: opacity 0.3s ease;

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
