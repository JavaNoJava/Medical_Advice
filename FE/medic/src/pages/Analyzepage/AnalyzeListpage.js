import React, { useState, useEffect } from 'react';
import axios from 'axios';
import analyzelist from '../../css/AnalyzeListpage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';



export default function AnalyzeListPage() {
  const [selectedStatus, setSelectedStatus] = useState('분석의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [analyzeList, setAnalyzeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/user/analyze/list');
        const data = resp.data.reverse()
        setAnalyzeList(data);
        console.log(data.anPtDiagnosis)
        console.log(resp)
      } catch (error) {
        console.error('Error fetching analyze list:', error);
      }
    };

    fetchData();
  }, []);
  
  const formatDate = (dateString) => {
      if (!dateString) { 
        return '미배정';
      }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const btn_detail_analyze = async(anId) => {
    navigate(`/medic/analyze/analyzeDetail/${anId}`)
  }
  
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
  const endIndex = Math.min(startIndex + itemsPerPage, analyzeList.length);
  const visibleAnalyzeList = analyzeList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(analyzeList.length / itemsPerPage);



  return (
    <div className={analyzelist.contents}>
        <div className={analyzelist.iconbox}>
          <h2 className={analyzelist.title}>
            분석의뢰 현황
          </h2>
        </div>
        <div className={analyzelist.write_table}>
        <div className={analyzelist.title_row_box}>
          <div className={analyzelist.title_box}>
            NO.
          </div>
          <div className={analyzelist.title_box}>
            진단과목
          </div>
          <div className={analyzelist.title_box}>
            진단명
          </div>
          <div className={analyzelist.title_box}>
            의뢰신청일
          </div>
          <div className={analyzelist.title_box}>
            의뢰배정일
          </div>
          <div className={analyzelist.title_box}>
            의뢰분석일
          </div>
          <div className={analyzelist.title_box} style={{borderRight: 'none'}}>
            진행상태
          </div>
        </div>
          {visibleAnalyzeList.map((analyze, index) => (
            <div className={analyzelist.data_row_box}>
              <div className={analyzelist.input_box} onClick={() => btn_detail_analyze(analyze.anId)} key={index}>
                  {analyzeList.length - startIndex - index}
              </div>
              <div className={analyzelist.input_box}>{analyze.anPtSub}</div>
              <div className={analyzelist.input_box}>{analyze.anPtDiagnosis}</div>
              <div className={analyzelist.input_box}>{formatDate(analyze.anRegDate)}</div>
              <div className={analyzelist.input_box}>{formatDate(analyze.anMdDate)}</div>
              <div className={analyzelist.input_box}>
                {analyze.anAnswerDate === null ? '미답변' : analyze.anAnswerDate}
              </div>
              <div className={analyzelist.input_box} style={{borderRight: 'none'}}>{analyze.anProgressStatus === null ? '분석의뢰중' : analyze.anProgressStatus}</div>
            </div>
          ))}
      </div>
      <div className={analyzelist.pagination}>
        <button
          className={analyzelist.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
        <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(analyzeList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={analyzelist.paginationNumber}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={analyzelist.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(analyzelist.length / itemsPerPage)}
        >
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

