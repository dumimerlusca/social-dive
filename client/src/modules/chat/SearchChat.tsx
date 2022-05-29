import Input from 'components/Input/Input';
import React, { ChangeEvent } from 'react';

const SearchChat = ({ onChange }: { onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  return <Input className='mb-5' onChange={onChange} placeholder='Search...' />;
};

export default SearchChat;
