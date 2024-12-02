import { Button, Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'zh', label: '中文' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        color="white"
        _hover={{ bg: 'whiteAlpha.200' }}
        _active={{ bg: 'whiteAlpha.300' }}
        leftIcon={<Icon as={FiGlobe} />}
        rightIcon={<FiChevronDown />}
      >
        {languages.find(lang => lang.code === i18n.language)?.label || 'Language'}
      </MenuButton>
      <MenuList
        bg="gray.800"
        borderColor="whiteAlpha.200"
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            _hover={{ bg: 'whiteAlpha.200' }}
            _focus={{ bg: 'whiteAlpha.200' }}
            color="white"
          >
            {lang.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
