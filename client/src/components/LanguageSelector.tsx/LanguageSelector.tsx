import Tippy from '@tippyjs/react';
import { useCurrentLanguage, useSetLanguage, useTranslate } from '@tolgee/react';
import Button from 'components/Button/Button';
import Flag from 'components/Flag/Flag';
import { useCallback, useMemo, useState } from 'react';

const LanguageSelector = ({ className }: { className?: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const getCurrentLanguage = useCurrentLanguage();

  const currentLanguage = useMemo(() => getCurrentLanguage(), [getCurrentLanguage]);

  return (
    <Tippy
      theme='transparent'
      visible={isDropdownOpen}
      interactive
      content={<LanguageSelectorDropdownContent closeDropdown={closeDropdown} />}
      onClickOutside={() => {
        closeDropdown();
      }}
    >
      <button
        className={className}
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
      >
        <Flag code={currentLanguage} className='bg-red-100' />
      </button>
    </Tippy>
  );
};

export default LanguageSelector;

const LanguageSelectorDropdownContent = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const setLanguage = useSetLanguage();

  const onOptionClick = useCallback(
    (code: string) => {
      setLanguage(code);
      closeDropdown();
    },
    [closeDropdown, setLanguage],
  );

  const t = useTranslate();

  return (
    <div className='bg-primary-lighter rounded-xl p-2'>
      <div>
        <ul className='p-2 mb-2 space-y-2'>
          <LanguageListItem code='us' onClick={onOptionClick} />
          <LanguageListItem code='ro' onClick={onOptionClick} />
        </ul>
      </div>
      <Button onClick={closeDropdown} className='w-full' color='primary'>
        {t('labels.close')}
      </Button>
    </div>
  );
};

const LanguageListItem = ({ code, onClick }: { code: string; onClick: (code: string) => void }) => {
  const t = useTranslate();
  return (
    <li
      onClick={() => {
        onClick(code);
      }}
      className='flex items-center gap-2 p-2 rounded-md hover:bg-primary cursor-pointer'
    >
      <Flag rounded code={code} />
      <p>{t(`languages.${code}`)}</p>
    </li>
  );
};
