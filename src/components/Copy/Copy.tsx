import { useState } from 'react';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Copy = ({
  value,
  className = ''
}: {
  value: string;
  className?: string;
}) => {
  const [confirm, setConfirm] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setConfirm(true);
    setTimeout(() => setConfirm(false), 2000);
  };

  return (
    <span
      className={`ml-0.5 inline-block cursor-pointer px-1 hover:text-white ${className} ${
        confirm ? 'text-white' : 'text-gray-400'
      }`}
      onClick={copy}
    >
      <FontAwesomeIcon icon={confirm ? faCheck : faCopy} />
    </span>
  );
};
