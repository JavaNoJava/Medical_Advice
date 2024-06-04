import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 모달을 사용할 엘리먼트를 설정

export default function ImageModal ({ isOpenimage, src, onRequestClose}) {

  return (
    <Modal
      isOpen={isOpenimage}
      onRequestClose={onRequestClose}
      contentLabel="비밀번호 확인"
      style={{
        overlay: {
          zIndex: 10,
        },
        content: {
          width: 'auto',
          height: 'auto',
          margin: 'auto',
          padding : 0,
          display : 'flex',
          justifyContent : 'center',
          alignItems : 'center'
        },
      }}
    >
      <img src={src} alt="Uploaded Preview" style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }} />
    </Modal>
  );
};
