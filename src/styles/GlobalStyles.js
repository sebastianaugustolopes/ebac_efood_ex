// Estilos globais usando styled-components
import { createGlobalStyle } from 'styled-components';

// Variáveis de cores do tema efood
export const theme = {
  colors: {
    primary: '#E66767',        // Coral/Vermelho principal
    primaryLight: '#FFEAEA',   // Coral claro
    background: '#FFF8F2',     // Fundo creme
    backgroundAlt: '#FFFAF7',  // Fundo alternativo
    text: '#4A4A4A',           // Texto principal
    textLight: '#666666',      // Texto secundário
    white: '#FFFFFF',
    border: '#E6E6E6',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  fonts: {
    primary: "'Roboto', sans-serif",
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  },
};

const GlobalStyles = createGlobalStyle`
  /* Importa a fonte Roboto do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  /* Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${theme.fonts.primary};
  }

  /* Estilos do body */
  body {
    font-family: ${theme.fonts.primary};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* Garante que todos os elementos de texto usem Roboto */
  h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea, select, label {
    font-family: ${theme.fonts.primary};
  }

  /* Remove estilos padrão de listas */
  ul, ol {
    list-style: none;
  }

  /* Remove sublinhado de links */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Estilo padrão para botões */
  button {
    cursor: pointer;
    border: none;
    font-family: inherit;
  }

  /* Imagens responsivas */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Container padrão */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
`;

export default GlobalStyles;
