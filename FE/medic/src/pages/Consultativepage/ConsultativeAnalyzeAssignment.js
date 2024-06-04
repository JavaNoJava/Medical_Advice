import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assignmentAnalyze from '../../css/ConsultativeAnalyzeAssignment.module.css';
import { useNavigate} from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default function ConsultativeAnalyzeAssignmentpage() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [analyzeList, setAnalyzeList] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/consultative/assignedAnalyze/list');
        console.log(response)
        const data = response.data.reverse();
        setAnalyzeList(data);
      } catch (error) {
        console.error('Error fetching analyze list:', error);
      }
    };

    fetchData();
  }, []);
  
  const handledetailClick = (anId) => {
    navigate(`/medic/consultative/assignmentAnalyzeDetail/${anId}`)
  }

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
  const endIndex = Math.min(startIndex + itemsPerPage, analyzeList.length);
  const visibleAnalyzeList = analyzeList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(analyzeList.length / itemsPerPage);



  return (
    <div className={assignmentAnalyze.contents}>
      <div className={assignmentAnalyze.iconbox}>
        <h2 className={assignmentAnalyze.title}>
          배정 분석의뢰 현황
        </h2>
      </div>

      {/* 배정 분석의뢰 테이블*/}
      <div className={assignmentAnalyze.write_table}>
        <div className={assignmentAnalyze.title_row_box}>
          <div className={assignmentAnalyze.title_box}>
            NO.
          </div>
          <div className={assignmentAnalyze.title_box}>
            진단과목
          </div>
          <div className={assignmentAnalyze.title_box}>
            진단명
          </div>
          <div className={assignmentAnalyze.title_box}>
            의뢰신청일
          </div>
          <div className={assignmentAnalyze.title_box}>
            의뢰배정일
          </div>
          <div className={assignmentAnalyze.title_box}>
            의뢰분석일
          </div>
          <div className={assignmentAnalyze.title_box} style={{borderRight: 'none'}}>
            진행상태
          </div>
        </div>
        {visibleAnalyzeList.map((analyze, index) => (
          <div className={assignmentAnalyze.data_row_box}>
            <div className={assignmentAnalyze.input_box} onClick={() => handledetailClick(analyze.anId)} key={index}>
              {analyzeList.length - startIndex - index}
            </div>
            <div className={assignmentAnalyze.input_box}>{analyze.anPtSub}</div>
            <div className={assignmentAnalyze.input_box}>{analyze.anPtDiagnosis}</div>
            <div className={assignmentAnalyze.input_box}>{analyze.anRegDate}</div>
            <div className={assignmentAnalyze.input_box}>{analyze.anMdDate}</div>
            <div className={assignmentAnalyze.input_box}>{analyze.anAnswerDate === null ? '미답변' : analyze.anAnswerDate}</div>
            <div className={assignmentAnalyze.input_box} style={{borderRight: 'none'}}>{analyze.anProgressStatus}</div>
          </div>
        ))}
      </div>
      <div className={assignmentAnalyze.pagination}>
        <button
          className={assignmentAnalyze.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
        <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(analyzeList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={assignmentAnalyze.paginationNumber}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={assignmentAnalyze.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(analyzeList.length / itemsPerPage)}
        >
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
}