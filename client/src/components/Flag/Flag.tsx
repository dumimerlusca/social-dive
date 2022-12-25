import classNames from 'classnames';
import './Flag.scss';

const Flag = ({
  code,
  size = '1x1',
  className,
  rounded,
}: {
  code: string;
  size?: string;
  className?: string;
  rounded?: boolean;
}) => {
  return (
    <div
      className={classNames(
        'flag flex items-center justify-center overflow-hidden',
        className,
        `flag-${size}`,
        { 'rounded-full': rounded },
      )}
    >
      <div
        className={'inline-block w-full h-full'}
        style={{
          backgroundImage: `url(${getFlagUrl(code, size)})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </div>
  );
};

export default Flag;

const getFlagUrl = (code: string, size = '4x3') => {
  return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/${size}/${code}.svg`;
};
