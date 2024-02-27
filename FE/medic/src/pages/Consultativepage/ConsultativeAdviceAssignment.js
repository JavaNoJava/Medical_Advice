import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assignmentAdvice from '../../css/ConsultativeAdviceAssignment.module.css';
import { useNavigate } from 'react-router-dom';

export default function ConsultativeAdviceAssignmentpage() {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [adviceList, setAdviceList] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/consultative/assignedAdvice/list');
        console.log(response);
        const data = response.data.reverse();
        setAdviceList(data); // 데이터 역순으로 설정
      } catch (error) {
        console.error('Error fetching advice list:', error);
      }
    };

    fetchData();
  }, []);

  const handledetailClick = (adId) => {
    navigate(`/medic/consultative/assignmentAdviceDetail/${adId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, adviceList.length);
  const visibleAdviceList = adviceList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(adviceList.length / itemsPerPage);


  return (
    <div className={assignmentAdvice.contents}>
      <div className={assignmentAdvice.iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          배정 자문의뢰 현황
        </h1>
      </div>
      <table className={assignmentAdvice.adviceList_table}>
        <thead>
          <tr>
            <th className={assignmentAdvice.adviceList_th}>NO.</th>
            <th className={assignmentAdvice.adviceList_th}>진단과목</th>
            <th className={assignmentAdvice.adviceList_th}>진단명</th>
            <th className={assignmentAdvice.adviceList_th}>의뢰신청일</th>
            <th className={assignmentAdvice.adviceList_th}>의뢰배정일</th>
            <th className={assignmentAdvice.adviceList_th}>의뢰자문일</th>
            <th className={assignmentAdvice.adviceList_th}>진행상태</th>
          </tr>
        </thead>
        <tbody>
          {visibleAdviceList.map((advice, index) => (
            <tr key={index}>
              <td className={assignmentAdvice.adviceList_td} onClick={() => handledetailClick(advice.adId)}>
                  {adviceList.length - startIndex - index}
              </td>
              <td className={assignmentAdvice.adviceList_td}>{advice.adPtSub}</td>
              <td className={assignmentAdvice.adviceList_td}>{advice.adPtDiagnosis}</td>
              <td className={assignmentAdvice.adviceList_td}>{formatDate(advice.adRegDate)}</td>
              <td className={assignmentAdvice.adviceList_td}>{advice.admDate}</td>
              <td className={assignmentAdvice.adviceList_td}>
                {advice.adAnswerDate === null ? '미답변' : advice.adAnswerDate}
              </td>
              <td className={assignmentAdvice.adviceList_td}>{advice.admProgressStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={assignmentAdvice.pagination}>
        <button
          className={assignmentAdvice.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(Math.ceil(adviceList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={assignmentAdvice.paginationButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={assignmentAdvice.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(adviceList.length / itemsPerPage)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
