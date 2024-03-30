import React, { useState, useEffect } from 'react';
import axios from 'axios';
import translatelist from '../../css/TranslateListpage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function TranslateListPage() {
  const [selectedStatus, setSelectedStatus] = useState('번역의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [translateList, setTranslateList] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/user/translate/list');
        const data = resp.data.reverse()
        setTranslateList(data);
        console.log(resp)
      } catch (error) {
        console.error('Error fetching translation list:', error);
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

  const btn_detail_translate = async(trId) => {
    navigate(`/medic/translate/translateDetail/${trId}`)
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
  const endIndex = Math.min(startIndex + itemsPerPage, translateList.length);
  const visibleTranslateList = translateList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(translateList.length / itemsPerPage);


  return (
    <div className={translatelist.contents}>
        <div className={translatelist.iconbox}>
          <h2 className={translatelist.title}>
            번역의뢰 현황
          </h2>
        </div>
        <div className={translatelist.write_table}>
        <div className={translatelist.title_row_box}>
          <div className={translatelist.title_box}>
            NO.
          </div>
          <div className={translatelist.title_box}>
            진단과목
          </div>
          <div className={translatelist.title_box}>
            진단명
          </div>
          <div className={translatelist.title_box}>
            의뢰신청일
          </div>
          <div className={translatelist.title_box}>
            의뢰배정일
          </div>
          <div className={translatelist.title_box}>
            의뢰번역일
          </div>
          <div className={translatelist.title_box} style={{borderRight: 'none'}}>
            진행상태
          </div>
        </div>
          {visibleTranslateList.map((translate, index) => (
            <div className={translatelist.data_row_box}>
              <div className={translatelist.input_box} onClick={() => btn_detail_translate(translate.trId)} key={index}>
                  {translateList.length - startIndex - index}
              </div>
              <div className={translatelist.input_box}>{translate.trPtSub}</div>
              <div className={translatelist.input_box}>{translate.trPtDiagnosis}</div>
              <div className={translatelist.input_box}>{formatDate(translate.trRegDate)}</div>
              <div className={translatelist.input_box}>{formatDate(translate.tamDate)}</div>
              <div className={translatelist.input_box}>
                {translate.trAnswerDate === null ? '미답변' : translate.trAnswerDate}
              </div>
              <div className={translatelist.input_box} style={{borderRight: 'none'}}>{translate.trProgressStatus === null ? '번역의뢰중' : translate.trProgressStatus}</div>
            </div>
          ))}
      </div>
      <div className={translatelist.pagination}>
        <button
          className={translatelist.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
        <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(translateList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={translatelist.paginationNumber}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={translatelist.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(translateList.length / itemsPerPage)}
        >
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

