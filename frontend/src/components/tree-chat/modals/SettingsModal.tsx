import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import React from 'react';

interface Settings {
  darkMode: boolean;
  notifications: boolean;
  autoSave: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingChange: (setting: keyof Settings, value: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingChange,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        bg="gray.900"
        borderColor="whiteAlpha.200"
        borderWidth="1px"
        boxShadow="xl"
      >
        <ModalHeader color="white">Settings</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="dark-mode" mb="0" color="white">
                Dark Mode
              </FormLabel>
              <Switch
                id="dark-mode"
                isChecked={settings.darkMode}
                onChange={(e) => onSettingChange('darkMode', e.target.checked)}
                colorScheme="green"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="notifications" mb="0" color="white">
                Notifications
              </FormLabel>
              <Switch
                id="notifications"
                isChecked={settings.notifications}
                onChange={(e) => onSettingChange('notifications', e.target.checked)}
                colorScheme="green"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="auto-save" mb="0" color="white">
                Auto Save
              </FormLabel>
              <Switch
                id="auto-save"
                isChecked={settings.autoSave}
                onChange={(e) => onSettingChange('autoSave', e.target.checked)}
                colorScheme="green"
              />
            </FormControl>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
