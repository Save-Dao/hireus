import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

type IPausedModal = {
  showPauseModal: boolean;
  setShowPauseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PausedModal: React.FC<IPausedModal> = ({
  showPauseModal,
  setShowPauseModal,
}) => {
  return (
    <Modal
      onClose={() => setShowPauseModal(false)}
      isOpen={showPauseModal}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Paused for the Holidays</ModalHeader>
        <ModalBody>
          <p>
            Hello prospective clients! Thank you for your interest in working
            with the Guild, as we approach the holiday season, we want you to
            know that we will pause additional consultations for the remainder
            of the year.
          </p>
          <br />
          <p>
            Please feel free to submit your projects and use the $xDAI bidding
            queue to signal how strongly you wish to align with the Guild in
            2022 - but please respect our Savers as we take time off this
            season to reflect upon this wild year and spend time with our
            friends and loved ones. We look forward to working with you and
            learning more about your project in the New Year! ⚔️
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setShowPauseModal(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PausedModal;
