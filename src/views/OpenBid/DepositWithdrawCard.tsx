import { Box, Flex, Spinner } from '@chakra-ui/react';
import { utils } from 'ethers';
import React, { useMemo, useState } from 'react';
import {
  StyledBodyText,
  StyledCard,
  StyledInput,
  StyledNumberText,
  StyledPrimaryButton,
} from 'themes/styled';
import { round } from 'utils';
import type { ICombinedBid } from 'utils/types';

type DepositWithdrawCardProps = {
  address: string;
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  setTxConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  consultationDetails: ICombinedBid;
  lockTime: string;
  lockupEnded: boolean;
  refresh: () => void;
};

const DepositWithdrawCared: React.FC<DepositWithdrawCardProps> = ({
  address,
  setShowSnackbar,
  setTxConfirmed,
  consultationDetails,
  lockTime,
  lockupEnded,
  refresh,
}) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const [isApproved] = useState(false);
  const [isDepositing] = useState(false);
  const [isWithdrawing] = useState(false);

  const onDepositAndUpdate = async (id: string) => {
    setTxConfirmed(false);
    setShowSnackbar(true);
    if (consultationDetails.bid_id) {
      // await onIncreaseBid(id);
    } else {
      // await onDeposit(id);
    }
    setTxConfirmed(true);
    refresh();
  };

  const onApproveAndUpdate = async () => {
    setTxConfirmed(false);
    setShowSnackbar(true);
    // await onApprove();
    setTxConfirmed(true);
    refresh();
  };

  const onWithdrawAndupdate = async (id: string) => {
    setTxConfirmed(false);
    setShowSnackbar(true);
    // await onWithdraw(id);
    setTxConfirmed(true);
    refresh();
  };

  const insufficientBalance = useMemo(() => false, []);

  // const insufficientBalance = useMemo(() => {
  //   if (!(depositAmount && raidBalance)) return false;
  //   try {
  //     return (
  //       BigInt(utils.parseEther(depositAmount || '0').toString()) >
  //       BigInt(utils.parseEther(raidBalance).toString())
  //     );
  //   } catch (e) {
  //     return false;
  //   }
  // }, [raidBalance, depositAmount]);

  return (
    <StyledCard p={'32px'}>
      <Flex justify={'space-between'}>
        <Flex direction={'column'} justify={'space-between'} w={'48%'}>
          <Box>
            <StyledBodyText>Wallet Balance:</StyledBodyText>
            {/* <h2>{round(raidBalance, 4)} $RAID</h2> */}
            <StyledNumberText fontSize={'20px'} mb={'16px'}>
              {round('500', 4)} $RAID
            </StyledNumberText>
          </Box>
          <Box>
            {insufficientBalance && (
              <StyledBodyText fontSize={'12px'} mb={'10px'}>
                Insufficient balance
              </StyledBodyText>
            )}
            <StyledInput
              color={'#fff'}
              id={'deposit-amount'}
              placeholder={`0`}
              type={'number'}
              min={'0'}
              step={'0.01'}
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
            />
            <StyledPrimaryButton
              disabled={
                depositAmount === '0' ||
                depositAmount === '' ||
                insufficientBalance ||
                isDepositing
              }
              onClick={() => {
                isApproved
                  ? onDepositAndUpdate(
                      consultationDetails.bid_id
                        ? consultationDetails.bid_id
                        : consultationDetails.airtable_id,
                    )
                  : onApproveAndUpdate();
              }}
              mt={'20px'}
              w={'100%'}
            >
              {isDepositing ? (
                <Spinner color={'#fff'} />
              ) : isApproved ? (
                'Submit Bid'
              ) : (
                'Approve $RAID'
              )}
            </StyledPrimaryButton>
          </Box>
        </Flex>
        <Flex direction={'column'} justify={'space-between'} w={'48%'}>
          <Box>
            <StyledBodyText>You deposited:</StyledBodyText>
            <StyledNumberText fontSize={'20px'} mb={'16px'}>
              {consultationDetails.submitter === address
                ? round(utils.formatEther(consultationDetails.amount), 4)
                : '0'}{' '}
              $RAID
            </StyledNumberText>
          </Box>
          <Box>
            <StyledInput
              id={'deposit-amount'}
              placeholder={`0`}
              type={'number'}
              min={'0'}
              step={'0.01'}
              value={withdrawAmount}
              onChange={e => setWithdrawAmount(e.target.value)}
            />
            <StyledPrimaryButton
              disabled={
                withdrawAmount === '0' ||
                withdrawAmount === '' ||
                BigInt(utils.parseEther(withdrawAmount).toString()) >
                  BigInt(consultationDetails.amount) ||
                isWithdrawing ||
                !lockupEnded
              }
              onClick={() => {
                onWithdrawAndupdate(consultationDetails.bid_id);
              }}
              mt={'20px'}
              w={'100%'}
            >
              {isWithdrawing ? <Spinner color={'#fff'} /> : 'Withdraw Bid'}
            </StyledPrimaryButton>
          </Box>
        </Flex>
      </Flex>
      <Flex justify={'center'}>
        {!!consultationDetails.bid_id && !lockupEnded && (
          <StyledBodyText>{lockTime}</StyledBodyText>
        )}
      </Flex>
    </StyledCard>
  );
};

export default DepositWithdrawCared;
