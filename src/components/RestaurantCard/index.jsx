// Componente RestaurantCard - Card de restaurante
// Exibe informações resumidas de um restaurante na home

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/GlobalStyles';

// Container do card
const Card = styled.article`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.primary};
  overflow: hidden;
`;

// Imagem de capa do restaurante
const CardImage = styled.div`
  position: relative;
  height: 217px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Badge de destaque
const HighlightBadge = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: 700;
  padding: 6px 8px;
`;

// Badge de categoria
const CategoryBadge = styled.span`
  position: absolute;
  top: 16px;
  right: ${props => props.$hasHighlight ? '140px' : '16px'};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: 700;
  padding: 6px 8px;
`;

// Conteúdo do card
const CardContent = styled.div`
  padding: 8px;
  background-color: ${theme.colors.white};
`;

// Cabeçalho com título e nota
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

// Título do restaurante
const CardTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
`;

// Container da avaliação
const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
`;

// Estrela de avaliação
const Star = styled.span`
  color: #FFB930;
  font-size: 20px;
`;

// Descrição do restaurante
const CardDescription = styled.p`
  color: ${theme.colors.primary};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
  
  /* Limita a 4 linhas */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Botão de saiba mais
const CardButton = styled(Link)`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  padding: 4px 6px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #D45656;
  }
`;

// Componente RestaurantCard
// Props: restaurante com id, name, description, rating, category, highlight, image
function RestaurantCard({ restaurant }) {
  return (
    <Card>
      {/* Imagem com badges */}
      <CardImage>
        <img src={restaurant.image} alt={restaurant.name} />
        <CategoryBadge $hasHighlight={!!restaurant.highlight}>
          {restaurant.category}
        </CategoryBadge>
        {restaurant.highlight && (
          <HighlightBadge>{restaurant.highlight}</HighlightBadge>
        )}
      </CardImage>

      {/* Conteúdo */}
      <CardContent>
        <CardHeader>
          <CardTitle>{restaurant.name}</CardTitle>
          <Rating>
            {restaurant.rating}
            <Star>★</Star>
          </Rating>
        </CardHeader>

        <CardDescription>{restaurant.description}</CardDescription>

        <CardButton to={`/restaurant/${restaurant.id}`}>
          Saiba mais
        </CardButton>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
