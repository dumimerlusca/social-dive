import classNames from 'classnames';
import { createPortal } from 'react-dom';
import React, { PropsWithChildren, useEffect } from 'react';

type ModalWrapperPropTypes = {
  closeModal: () => void;
  isModalOpen: boolean;
  modalContentRef: React.RefObject<Element>;
};

const ModalWrapper: React.FC<PropsWithChildren<ModalWrapperPropTypes>> = ({
  children,
  closeModal,
  isModalOpen,
  modalContentRef,
}) => {
  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (isModalOpen) {
      htmlElement?.classList.add('overflow-hidden');
    } else {
      htmlElement?.classList.remove('overflow-hidden');
    }
  }, [isModalOpen]);

  return createPortal(
    <div
      onClick={(e) => {
        if (modalContentRef.current && !modalContentRef.current.contains(e.target as any)) {
          closeModal();
        }
      }}
      className={classNames(
        'fixed flex text-white items-center justify-center top-0 left-0 w-full h-screen z-[1000] px-3',
        !isModalOpen ? 'hidden' : '',
      )}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default ModalWrapper;
