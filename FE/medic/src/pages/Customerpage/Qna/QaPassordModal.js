import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 모달을 사용할 엘리먼트를 설정

export default function QaPasswordModal ({ isOpen, onRequestClose, onPasswordSubmit}) {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    onPasswordSubmit(password);
    setPassword('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="비밀번호 확인"
      style={{
        overlay: {
          zIndex: 10,
        },
        content: {
          width: '250px',
          height: '70px',
          margin: 'auto',
          padding : 0,
        },
      }}
    >
      <div style={{
        display :'flex',
        flexDirection : 'column',
        justifyContent :'center',
        alignItems : 'center'
      }}>
        <div style={{
            width : '170px',
            display : 'flex',
            justifyContent : 'start'
        }}>
            <h4 style={{margin : '0'}}>비밀번호 확인</h4>
        </div>
        <div style={{
            width : '250px',
            display : 'flex',
            justifyContent : 'center'
        }}><input
          type="password"
          value={password}
          onChange={handlePasswordChange}
            />
        </div>
        <div style={{
        width : '170px',
        display : 'flex',
        justifyContent : 'end'
      }}>
        <button onClick={handleSubmit}>확인</button>
      </div> 
      </div>
    </Modal>
  );
};
