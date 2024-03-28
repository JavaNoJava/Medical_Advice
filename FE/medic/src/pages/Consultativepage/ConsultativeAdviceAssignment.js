import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assignmentAdvice from '../../css/ConsultativeAdviceAssignment.module.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default function ConsultativeAdviceAssignmentpage() {
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
        <h2 className={assignmentAdvice.title}>
          배정 자문의뢰 현황
        </h2>
      </div>
      
      {/* 배정 자문의뢰 테이블*/}
      <div className={assignmentAdvice.write_table}>
        <div className={assignmentAdvice.title_row_box}>
          <div className={assignmentAdvice.title_box}>
            NO.
          </div>
          <div className={assignmentAdvice.title_box}>
            진단과목
          </div>
          <div className={assignmentAdvice.title_box}>
            진단명
          </div>
          <div className={assignmentAdvice.title_box}>
            의뢰신청일
          </div>
          <div className={assignmentAdvice.title_box}>
            의뢰배정일
          </div>
          <div className={assignmentAdvice.title_box}>
            의뢰자문일
          </div>
          <div className={assignmentAdvice.title_box} style={{borderRight: 'none'}}>
            진행상태
          </div>
        </div>
        {visibleAdviceList.map((advice, index) => (
          <div className={assignmentAdvice.data_row_box}>
            <div className={assignmentAdvice.input_box} onClick={() => handledetailClick(advice.adId)} key={index}>
              {adviceList.length - startIndex - index}
            </div>
            <div className={assignmentAdvice.input_box}>{advice.adPtSub}</div>
            <div className={assignmentAdvice.input_box}>{advice.adPtDiagnosis}</div>
            <div className={assignmentAdvice.input_box}>{advice.adRegDate}</div>
            <div className={assignmentAdvice.input_box}>{advice.admDate}</div>
            <div className={assignmentAdvice.input_box}>{advice.adAnswerDate === null ? '미답변' : advice.adAnswerDate}</div>
            <div className={assignmentAdvice.input_box} style={{borderRight: 'none'}}>{advice.admProgressStatus}</div>
          </div>
        ))}
      </div>
      <div className={assignmentAdvice.pagination}>
        <button
          className={assignmentAdvice.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
        <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(adviceList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={assignmentAdvice.paginationNumber}
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
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
