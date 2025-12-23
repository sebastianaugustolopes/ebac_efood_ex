// Componente Footer - Rodapé reutilizável
// Exibe logo e ícones de redes sociais

import styled from 'styled-components';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { theme } from '../../styles/GlobalStyles';
import logo from '../../assets/images/logo.png';

// Container do footer
const FooterContainer = styled.footer`
  background-color: #FFEBD9;
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
  color: ${theme.colors.white};
  position: relative;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 14px;
    height: 14px;
    display: block;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
          <SocialIcon href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <Facebook />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <Twitter />
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
