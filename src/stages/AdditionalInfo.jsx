import React, { useState, useContext } from 'react';
import {
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Checkbox,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tooltip
} from '@chakra-ui/react';

import { InfoIcon } from '@chakra-ui/icons';

import { AppContext } from '../context/AppContext';

import RadioBox from '../components/RadioBox';
import { Link } from 'react-router-dom';

const AdditionalInfo = () => {
  const context = useContext(AppContext);
  const [specificInfo, setSpecificInfo] = useState('');
  const [priority, setPriority] = useState('Fast & Polished');
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);

  const [buttonClick, setButtonClickStatus] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState(true);
  const [dialogStatus, setDialogStatus] = useState(false);
  const onClose = () => context.updateDialogState();
  const cancelRef = React.useRef();

  const modalConfirmHandler = () => {
    setPaymentStatus(false);
    setCheckBoxStatus(true);
  };

  const checkBoxChangeHandler = () => {
    if (checkBoxStatus) {
      setPaymentStatus(true);
      setCheckBoxStatus(false);
    }
    if (!checkBoxStatus) {
      setDialogStatus(true);
    }
  };

  return (
    <div className='additional-info-container'>
      <h2 className='step-title'>Step 4 of 4: Additional Information</h2>
      <FormControl
        mb={10}
        isRequired
        isInvalid={specificInfo === '' && buttonClick ? true : false}
      >
        <FormLabel>Do you need something very specific?</FormLabel>
        <Textarea
          placeholder='In plain words, tell us how you think we can best help you.'
          onChange={(e) => setSpecificInfo(e.target.value)}
        />
      </FormControl>

      <Stack mb={10} direction='row'>
        <FormControl isRequired>
          <FormLabel as='legend'>
            What are your priorities?{' '}
            <Tooltip
              hasArrow
              placement='top'
              label='It can be fast, polished, or inexpensive.'
              aria-label='disclaimer tooltip'
            >
              <InfoIcon />
            </Tooltip>
          </FormLabel>
          <RadioBox
            options={[
              'Fast & Polished',
              'Fast & Inexpensive',
              'Polished & Inexpensive'
            ]}
            updateRadio={setPriority}
            name='priority'
            defaultValue='Fast & Polished'
          />
        </FormControl>
      </Stack>

      <FormControl>
        <Checkbox
          isChecked={checkBoxStatus}
          colorScheme='red'
          onChange={checkBoxChangeHandler}
        >
          Continue without paying
        </Checkbox>
      </FormControl>

      <AlertDialog
        isOpen={dialogStatus}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Disclaimer
            </AlertDialogHeader>

            <AlertDialogBody>
              If you choose not to pay, we can’t guarantee a quick reply.
            </AlertDialogBody>

            <AlertDialogFooter>
              <button className='dialog-button-cancel' ref={cancelRef}>
                Cancel
              </button>
              <button
                className='dialog-button-select'
                colorScheme='red'
                onClick={modalConfirmHandler}
                ml={3}
              >
                Continue
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {!context.is_not_paid && (
        <Link to='/faq' target='_blank' rel='noopener noreferrer'>
          <p id='payment-info-link'>What am I paying for?</p>
        </Link>
      )}

      {context.is_not_paid && (
        <button
          id='next-stage-button'
          onClick={() => {
            context.updateStage('next');
          }}
        >
          Submit
        </button>
      )}

      {!context.is_not_paid && (
        <button
          id='next-stage-button'
          onClick={() => {
            context.updateStage('next');
          }}
        >
          Pay 300 DAI & Submit
        </button>
      )}
    </div>
  );
};

export default AdditionalInfo;
