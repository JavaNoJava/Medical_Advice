import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ad from '../../css/AdAdviceListPage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


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
  const itemsPerPage = 7;
  const startIndex = (Page - 1) * itemsPerPage;
  const endIndex = Math.min(userList.length, startIndex + itemsPerPage);

  // const renderUserList = () => {
  //   if (userList.length === 0) return null;

  //   const itemsPerPage = 7;
  //   const startIndex = (Page - 1) * itemsPerPage;
  //   const endIndex = Math.min(userList.length, startIndex + itemsPerPage);

  //   return userList.slice(startIndex, endIndex).map((user, index) => (
  //     <tr key={index}>
  //       <td className={usermanage.user_td} onClick={() => handleEditUser(startIndex + index)}>{startIndex + index + 1}</td>
  //       <td className={usermanage.user_td}>{user.uname}</td>
  //       <td className={usermanage.user_td}>{user.urole}</td>
  //       <td className={usermanage.user_td}>{user.userTel}</td>
  //       <td className={usermanage.user_td}>{user.countByAdvice}</td>
  //       <td className={usermanage.user_td}>{user.countByAnalyze}</td>
  //       <td className={usermanage.user_td}>{user.countByTranslate}</td>
  //       <td className={usermanage.user_td} onClick={() => handleDeleteUser(user.uid)}>
  //         <FontAwesomeIcon icon={faTrash} />
  //       </td>
  //     </tr>
  //   ));
  // }

  return (
    <div className={ad.ad_contents}>
      <div className={ad.iconbox}>
        <h2 className={ad.title}>
          회원 관리
        </h2>
      </div>

      <div className={ad.write_table}>
        <div className={ad.title_row_box}>
          <div className={ad.title_box_no}>
            NO.
          </div>
          <div className={ad.title_box}  style={{width:'120px'}}>
            이름
          </div>
          <div className={ad.title_box}  style={{width:'130px'}}>
            구분
          </div>
          <div className={ad.title_box} style={{width:'150px'}}>
            전화 번호 
          </div>
          <div className={ad.title_box}>
            자문 건수
          </div>
          <div className={ad.title_box}>
            분석 건수
          </div>
          <div className={ad.title_box} >
            번역 건수 
          </div>
          <div className={ad.title_box}  style={{borderRight:'none'}}>
            삭제 
          </div>
        
        </div>
          {userList.slice(startIndex, endIndex).map((user,index) => (
            <div className={ad.data_row_box}>
              <div className={ad.input_box_no} onClick={() => handleEditUser(startIndex+endIndex)}>
              {startIndex + index + 1}
              </div>
              <div className={ad.input_box}  style={{width:'120px'}}>{user.uname}</div>
              <div className={ad.input_box}  style={{width:'130px'}}>{user.urole} </div>
              <div className={ad.input_box}  style={{width:'150px'}}>{user.userTel}</div>
              <div className={ad.input_box}>{user.countByAdvice}</div>
              <div className={ad.input_box}>
              {user.countByAnalyze}
              </div>
              {/* <div className={ad.input_box} style={{borderRight: 'none'}}>{advice.admProgressStatus === null ? '자문의뢰중' : advice.admProgressStatus}</div> */}
              <div className={ad.input_box}>
              {user.countByTranslate}
              </div>
              <div className={ad.input_box} style={{borderRight:'none'}} onClick={() => handleDeleteUser(user.uid)}> 
              <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
          ))}
      </div>



      {/* <table className={usermanage.user_table}>
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
      </table> */}
      <div className={ad.pagination}>
        <button className={ad.paginationButton} onClick={() => handlePageChange(Page - 1)} disabled={Page === 1}>
        <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(userList.length / 7))].map((_, index) => (
          <button key={index} className={ad.paginationNumber} onClick={() => handlePageChange(index + 1)} disabled={Page === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={ad.paginationButton} onClick={() => handlePageChange(Page + 1)}>
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
};
