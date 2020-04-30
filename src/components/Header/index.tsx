import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link key="listagem" to="/">
          <p>Listagem</p>
        </Link>
        <Link key="import" to="/import">
          <p>Importar</p>
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
