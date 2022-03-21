import { Flex, Link } from '@chakra-ui/react';
import { FAQ } from 'components/FAQ';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  StyledBodyText,
  StyledMessageText,
  StyledPrimaryButton,
  StyledPrimaryHeading,
  StyledSecondaryButton,
} from 'themes/styled';
import { theme } from 'themes/theme';
import { SaveDAO_WEBSITE_URL } from 'web3/constants';

const Explainer: React.FC = () => {
  const history = useHistory();

  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <>
      <Flex
        direction="column"
        py="2rem"
        px={{ base: '1rem', lg: '4rem' }}
        mx="1rem"
      >
        <StyledPrimaryHeading
          fontSize={{ base: '1.5rem', lg: '36px' }}
          mb="1rem"
        >
          Consultation Queue
        </StyledPrimaryHeading>

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          The first step to hiring SaveDAO is submitting a request for a
          consultation (submission cost is 500{' '}
          <Link
            href={
              'https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&chainId=100'
            }
            target={'_blank'}
            rel={'noopener noreferrer'}
            color={theme.colors.green}
          >
            $xDAI
          </Link>
          ). During the consultation, we will discuss your needs, whether
          SaveDAO can meet them, and collectively determine how best to If you
          If you haven&apos;t done so yet, you can submit a consultation request{' '}
          <Link
            href={`${SaveDAO_WEBSITE_URL}/hire`}
            target={'_blank'}
            rel={'noopener noreferrer'}
            color={theme.colors.green}
          >
            here
          </Link>
          .
        </StyledBodyText>
        <br />

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          Since demand for our services is high,{' '}
          <strong>
            SaveDAO selects the next consultation to take from a queue.
          </strong>{' '}
          When you submit your consultation request, it will be placed at the
          bottom of the queue.
        </StyledBodyText>
        <br />

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          If you’d like to get prioritized access to our services, you can move
          your submission up in the queue by bidding{' '}
          <Link
            href={
              'https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&chainId=100'
            }
            target={'_blank'}
            rel={'noopener noreferrer'}
            color={theme.colors.green}
          >
            $xDAI
          </Link>{' '}
          tokens. SaveDAO will accept the consultation request with the $xDAI.
        </StyledBodyText>
        <br />

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          Your bid will be locked for 7 days. After 7 days, you may decrease or
          cancel your bid if you’d like. You are welcome to increase your bid at
          any time to move further up the queue.
        </StyledBodyText>

        <br />
        <Flex
          direction="column"
          bgColor="white"
          borderRadius="0.5rem"
          p="0.5rem 1rem"
          maxW="720px"
        >
          <StyledMessageText
            fontSize={{ base: '1rem', lg: '18px' }}
            fontWeight="bold"
            mb=".5rem"
          >
            IMPORTANT
          </StyledMessageText>
          <StyledMessageText fontSize={{ base: '1rem', lg: '16px' }}>
            This HireUs app for SaveDAO is a work in progress and still in beta!{' '}
            {/* <Link
              href="https://hireus.SaveDAO.org"
              isExternal
              textDecoration="underline"
            >
              hireus.SaveDAO.org
            </Link> */}
          </StyledMessageText>
        </Flex>
        <br />
        <br />

        <Flex
          direction={{ base: 'column-reverse', md: 'row' }}
          justifyContent={'space-between'}
        >
          <StyledSecondaryButton w={'100px'} onClick={() => setIsFaqOpen(true)}>
            Read FAQ
          </StyledSecondaryButton>
          <StyledPrimaryButton
            fontSize={{ base: '16px', lg: '18px' }}
            mb={'1rem'}
            onClick={() => history.push('/hiring-board')}
          >
            Bid on Consultation
          </StyledPrimaryButton>
        </Flex>
        <br />
      </Flex>
      <FAQ isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
    </>
  );
};

export default Explainer;
