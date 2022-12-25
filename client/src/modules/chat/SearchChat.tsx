import { useTranslate } from '@tolgee/react';
import Input from 'components/Input/Input';
import { ChangeEvent } from 'react';

const SearchChat = ({ onChange }: { onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  const t = useTranslate();
  return <Input className='mb-5' onChange={onChange} placeholder={t('labels.search')} />;
};

export default SearchChat;
