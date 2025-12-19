// Componente Footer - Rodapé reutilizável
// Exibe logo e ícones de redes sociais

import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import logo from '../../assets/images/logo.png';

// Container do footer
const FooterContainer = styled.footer`
  background-color: ${theme.colors.primaryLight};
  padding: 40px 0;
  margin-top: auto;
`;

// Wrapper interno
const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

// Logo do footer
const LogoImage = styled.img`
  height: 40px;
`;

// Container dos ícones sociais
const SocialIcons = styled.div`
  display: flex;
  gap: 8px;
`;

// Ícone social (círculo)
const SocialIcon = styled.a`
  width: 24px;
  height: 24px;
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

// Texto do copyright
const Copyright = styled.p`
  color: ${theme.colors.primary};
  font-size: 10px;
  text-align: center;
  max-width: 480px;
  line-height: 1.5;
`;

// Componente Footer
function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        {/* Logo */}
        <LogoImage src={logo} alt="efood" />

        {/* Ícones de redes sociais */}
        <SocialIcons>
          <SocialIcon href="#" aria-label="Instagram">
            {/* Ícone simplificado */}
          </SocialIcon>
          <SocialIcon href="#" aria-label="Facebook">
            {/* Ícone simplificado */}
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">
            {/* Ícone simplificado */}
          </SocialIcon>
        </SocialIcons>

        {/* Texto de copyright */}
        <Copyright>
          A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
