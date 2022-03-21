import { Button, Flex, Image, Link as ChakraLink } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useWallet } from 'contexts/WalletContext';
import { hiringBoardLocation, rootLocation } from 'locations';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { StyledPrimaryButton } from 'themes/styled';
import { StyledSecondaryButton } from 'themes/styled';
import { theme } from 'themes/theme';
import { shortenAddress } from 'utils';

import saveDAO from '../../assets/logo/logo-color.png';

const StyledButton = styled(ChakraLink)`
  &::after {
    box-sizing: inherit;
    transition: all ease-in-out 0.2s;
    background: none repeat scroll 0 0 ${theme.colors.green};
    content: '';
    display: block;
    height: 2px;
    width: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    font-family: ${theme.fonts.rubik};
  }
  &:hover {
    text-decoration: none;
    ::after {
      width: 100%;
    }
  }
`;

const navItems = [
  { name: 'Manifesto', href: 'https://www.SaveDAO.org/#manifesto' },
  { name: 'Services', href: 'https://www.SaveDAO.org/#services' },
  { name: 'Portfolio', href: 'https://www.SaveDAO.org/#portfolio' },
  { name: 'Join', href: 'https://www.SaveDAO.org/#culture' },
  { name: 'Hire', href: 'https://www.SaveDAO.org/#services' },
];

type HeaderProps = {
  windowWidth: number;
};

export const Header: React.FC<HeaderProps> = ({ windowWidth }) => {
  const { address, connectWallet } = useWallet();
  const history = useHistory();
  const { pathname } = useLocation();

  const [isOpen, onOpen] = useState(false);

  const isRoot = pathname === rootLocation;

  return (
    <Flex
      w="100%"
      h={{ base: isRoot ? '4rem' : '11rem', md: '4rem' }}
      color="white"
      direction={{ base: isRoot ? 'row' : 'column', md: 'row' }}
      fontFamily="spaceMono"
      justify="space-between"
      align="center"
      zIndex={5}
    >
      <Image
        src={saveDAO}
        fallbackSrc="../../assets/logo/logo-color.png"
        alt="SaveDAO"
        width={{ base: '66px', lg: '100px' }}
        onClick={() => history.push(rootLocation)}
        cursor="pointer"
      />

      {windowWidth > 1200 && isRoot && (
        <Flex
          minWidth="50%"
          direction="row"
          justifyContent="space-around"
          fontSize="1.3rem"
          color="red"
        >
          <ChakraLink
            href={'https://www.SaveDAO.org/#manifesto'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            Manifesto
          </ChakraLink>
          <ChakraLink
            href={'https://www.SaveDAO.org/#services'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            Services
          </ChakraLink>
          <ChakraLink
            href={'https://www.SaveDAO.org/#portfolio'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            Portfolio
          </ChakraLink>
          <ChakraLink
            href={'https://www.SaveDAO.org/join'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            Join
          </ChakraLink>
          <ChakraLink
            href={'https://hireus.SaveDAO.org'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            Hire
          </ChakraLink>
        </Flex>
      )}

      {windowWidth < 1200 && isRoot && (
        <>
          <Flex align="center" height="8rem">
            <Button
              fontSize="2rem"
              onClick={() => onOpen(o => !o)}
              variant="link"
              ml={{ base: '0.5rem', sm: '1rem' }}
              zIndex={7}
            >
              {!isOpen && (
                <span style={{ width: '25px', color: theme.colors.green }}>
                  <i className="fas fa-bars" />
                </span>
              )}
              {isOpen && (
                <span style={{ width: '25px', color: theme.colors.green }}>
                  <i className="fas fa-times" />
                </span>
              )}
            </Button>
          </Flex>
          <Flex
            zIndex={6}
            position="fixed"
            left="0"
            top="0"
            bg="black"
            h="100%"
            w="100%"
            direction="column"
            justify="center"
            align="center"
            transition="all .8s ease-out"
            pointerEvents={isOpen ? 'all' : 'none'}
            css={{
              clipPath: isOpen
                ? 'circle(calc(100vw + 100vh) at 90% -10%)'
                : 'circle(100px at 90% -20%)',
            }}
          >
            {navItems.map((item, index) => {
              return (
                <StyledButton
                  key={index}
                  onClick={() => {
                    onOpen(o => !o);
                  }}
                  href={item.href}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                  my="1rem"
                  variant="link"
                  color={`${theme.colors.green}`}
                  fontWeight="normal"
                  fontSize="1.5rem"
                >
                  {item.name}
                </StyledButton>
              );
            })}

            <ChakraLink
              href="https://discord.gg/CanD2WcK7W"
              isExternal
              _hover={{}}
            ></ChakraLink>
          </Flex>
        </>
      )}
      {!isRoot && (
        <Flex mt={'8px'} direction={{ base: 'column-reverse', md: 'row' }}>
          <StyledSecondaryButton
            onClick={() =>
              history.location.pathname === hiringBoardLocation
                ? history.push(rootLocation)
                : history.push(hiringBoardLocation)
            }
            mr={{ base: '0px', md: '20px' }}
            w={{ base: '100%', md: '100px' }}
          >
            Back
          </StyledSecondaryButton>
          <StyledPrimaryButton
            fontSize={{ base: '16px', lg: '18px' }}
            mb={{ base: '8px', md: '0' }}
            onClick={connectWallet}
          >
            {address ? shortenAddress(address) : 'Connect Wallet'}
          </StyledPrimaryButton>
        </Flex>
      )}
    </Flex>
  );
};
