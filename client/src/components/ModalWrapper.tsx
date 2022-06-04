import classNames from 'classnames';
import { createPortal } from 'react-dom';
import React, { PropsWithChildren } from 'react';

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
  return createPortal(
    <div
      onClick={(e) => {
        if (modalContentRef.current && !modalContentRef.current.contains(e.target as any)) {
          closeModal();
        }
      }}
      className={classNames(
        'fixed flex text-white items-center justify-center top-0 left-0 w-full h-screen z-[998] px-3',
        !isModalOpen ? 'hidden' : '',
      )}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default ModalWrapper;
