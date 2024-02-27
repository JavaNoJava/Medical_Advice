import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usermanage from '../../css/UserManagement.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function UserManagement() {
  const navigate = useNavigate();
  const [selectedStatu, setSelectedStatu] = useState('회원관리');
  const [userList, setUserList] = useState([]);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/manageClient/list');
        console.log('response', response);
        setUserList(response.data);
      } catch (error) {
        console.error('회원 정보 가져오기 오류', error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = (newStatus) => {
    setSelectedStatu(newStatus);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(userList.length / 7)) {
      setPage(newPage);
    }
  }
  
  const handleEditUser = (userId) => {
    navigate(`/medic/adminstrator/useredit/${userId}`, { state: { useredit: userList[userId] } });
  }

  const handleDeleteUser = async (userId) => {
    try {
      const confirmed = window.confirm('사용자를 삭제하시겠습니까?');
      if (confirmed) {
        const response = await axios.delete(`/admin/manageClient/delete/${userId}`);
        const updatedUserList = userList.filter(user => user.uId !== userId);
        setUserList(updatedUserList);
        alert('사용자가 삭제되었습니다.');
      } else {
        alert('사용자 삭제가 취소되었습니다.');
      }
    } catch (error) {
      console.error('사용자 삭제 오류', error);
      alert('사용자 삭제 중 오류가 발생했습니다.');
    }
  }

  const renderUserList = () => {
    if (userList.length === 0) return null;

    const itemsPerPage = 7;
    const startIndex = (Page - 1) * itemsPerPage;
    const endIndex = Math.min(userList.length, startIndex + itemsPerPage);

    return userList.slice(startIndex, endIndex).map((user, index) => (
      <tr key={index}>
        <td className={usermanage.user_td} onClick={() => handleEditUser(startIndex + index)}>{startIndex + index + 1}</td>
        <td className={usermanage.user_td}>{user.uname}</td>
        <td className={usermanage.user_td}>{user.urole}</td>
        <td className={usermanage.user_td}>{user.userTel}</td>
        <td className={usermanage.user_td}>{user.countByAdvice}</td>
        <td className={usermanage.user_td}>{user.countByAnalyze}</td>
        <td className={usermanage.user_td}>{user.countByTranslate}</td>
        <td className={usermanage.user_td} onClick={() => handleDeleteUser(user.uid)}>
          <FontAwesomeIcon icon={faTrash} />
        </td>
      </tr>
    ));
  }

  return (
    <div className={usermanage.user_contents}>
      <div className={usermanage.user_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          회원 관리
        </h1>
      </div>
      <table className={usermanage.user_table}>
        <thead>
          <tr>
            <th className={usermanage.user_th}>NO.</th>
            <th className={usermanage.user_th}>이름</th>
            <th className={usermanage.user_th}>구분</th>
            <th className={usermanage.user_th}>전화 번호</th>
            <th className={usermanage.user_th}>자문 건수</th>
            <th className={usermanage.user_th}>분석 건수</th>
            <th className={usermanage.user_th}>번역 건수</th>
            <th className={usermanage.user_th}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {renderUserList()}
        </tbody>
      </table>
      <div className={usermanage.user_pagination}>
        <button className={usermanage.user_paginationButton} onClick={() => handlePageChange(Page - 1)} disabled={Page === 1}>
          ◀
        </button>
        {[...Array(Math.ceil(userList.length / 7))].map((_, index) => (
          <button key={index} className={usermanage.user_paginationButton} onClick={() => handlePageChange(index + 1)} disabled={Page === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={usermanage.user_paginationButton} onClick={() => handlePageChange(Page + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
};
