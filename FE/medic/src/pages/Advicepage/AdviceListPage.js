import React, { useState, useEffect } from 'react';
import axios from 'axios';
import advicelist from '../../css/AdviceListPage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default function AdviceListPage() {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [adviceList, setAdviceList] = useState([]);
  const navigate = useNavigate();

  const btn_detail_advice = async(adId) => {
    navigate(`/medic/advice/adviceDetail/${adId}`)
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/user/advice/list');
        const data = resp.data.reverse()
        setAdviceList(data);
        console.log(resp)
      } catch (error) {
        console.error('Error fetching advice list:', error);
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
    <div className={advicelist.contents}>
        <div className={advicelist.iconbox}>
          <h2 className={advicelist.title}>
            자문의뢰 현황
          </h2>
        </div>
        <div className={advicelist.write_table}>
        <div className={advicelist.title_row_box}>
          <div className={advicelist.title_box}>
            NO.
          </div>
          <div className={advicelist.title_box}>
            진단과목
          </div>
          <div className={advicelist.title_box}>
            진단명
          </div>
          <div className={advicelist.title_box}>
            의뢰신청일
          </div>
          <div className={advicelist.title_box}>
            의뢰배정일
          </div>
          <div className={advicelist.title_box}>
            의뢰자문일
          </div>
          <div className={advicelist.title_box} style={{borderRight: 'none'}}>
            진행상태
          </div>
        </div>
          {visibleAdviceList.map((advice, index) => (
            <div className={advicelist.data_row_box}>
              <div className={advicelist.input_box} onClick={() => btn_detail_advice(advice.adId)} key={index}>
                  {adviceList.length - startIndex - index}
              </div>
              <div className={advicelist.input_box}>{advice.adPtSub}</div>
              <div className={advicelist.input_box}>{advice.adPtDiagnosis}</div>
              <div className={advicelist.input_box}>{formatDate(advice.adRegDate)}</div>
              <div className={advicelist.input_box}>{formatDate(advice.admDate)}</div>
              <div className={advicelist.input_box}>
                {advice.adAnswerDate === null ? '미답변' : advice.adAnswerDate}
              </div>
              <div className={advicelist.input_box} style={{borderRight: 'none'}}>{advice.admProgressStatus === null ? '자문의뢰중' : advice.admProgressStatus}</div>
            </div>
          ))}
      </div>
      <div className={advicelist.pagination}>
        <button
          className={advicelist.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
        <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(adviceList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={advicelist.paginationNumber}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={advicelist.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(adviceList.length / itemsPerPage)}
        >
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

