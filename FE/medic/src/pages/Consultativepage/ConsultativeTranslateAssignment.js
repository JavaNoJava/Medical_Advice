import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assignmentTranslate from '../../css/ConsultativeTranslateAssignment.module.css';
import { useNavigate} from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ConsultativeTranslateAssignmentpage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [translateList, setTranslateList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/consultative/assignedTranslate/list');
        console.log(response)
        const data = response.data.reverse();
        setTranslateList(data);
      } catch (error) {
        console.error('Error fetching translation list:', error);
      }
    };

    fetchData();
  }, []);

  const handledetailClick = (trId) => {
    navigate(`/medic/consultative/assignmentTranslateDetail/${trId}`)
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
  const endIndex = Math.min(startIndex + itemsPerPage, translateList.length);
  const visibleTranslateList = translateList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(translateList.length / itemsPerPage);

  return (
    <div className={assignmentTranslate.contents}>
      <div className={assignmentTranslate.iconbox}>
        <h2 className={assignmentTranslate.title}>
          배정 번역의뢰 현황
        </h2>
      </div>
      {/* 배정 번역의뢰 테이블*/}
      <div className={assignmentTranslate.write_table}>
        <div className={assignmentTranslate.title_row_box}>
          <div className={assignmentTranslate.title_box}>
            NO.
          </div>
          <div className={assignmentTranslate.title_box}>
            진단과목
          </div>
          <div className={assignmentTranslate.title_box}>
            진단명
          </div>
          <div className={assignmentTranslate.title_box}>
            의뢰신청일
          </div>
          <div className={assignmentTranslate.title_box}>
            의뢰배정일
          </div>
          <div className={assignmentTranslate.title_box}>
            의료번역일
          </div>
          <div className={assignmentTranslate.title_box} style={{borderRight: 'none'}}>
            진행상태
          </div>
        </div>
        {visibleTranslateList.map((translation, index) => (
          <div className={assignmentTranslate.data_row_box}>
            <div className={assignmentTranslate.input_box} onClick={() => handledetailClick(translation.trId)} key={index}>
              {translateList.length - startIndex - index}
            </div>
            <div className={assignmentTranslate.input_box}>{translation.trPtSub}</div>
            <div className={assignmentTranslate.input_box}>{translation.trPtDiagnosis}</div>
            <div className={assignmentTranslate.input_box}>{translation.trRegDate}</div>
            <div className={assignmentTranslate.input_box}>{translation.tamDate}</div>
            <div className={assignmentTranslate.input_box}>{translation.trAnswerDate === null ? '미답변' : translation.trAnswerDate}</div>
            <div className={assignmentTranslate.input_box} style={{borderRight: 'none'}}>{translation.trProgressStatus}</div>
          </div>
        ))}
      </div>
      <div className={assignmentTranslate.pagination}>
        <button
          className={assignmentTranslate.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
        <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(translateList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={assignmentTranslate.paginationNumber}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={assignmentTranslate.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(translateList.length / itemsPerPage)}
        >
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
}