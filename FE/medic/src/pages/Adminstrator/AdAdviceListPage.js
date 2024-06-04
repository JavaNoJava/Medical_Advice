import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default function AdAdviceListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allAdviceList, setAllAdviceList] = useState([]);
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const quiryList = allAdviceList.slice(startIndex, startIndex + itemsPerPage);
  const navigate = useNavigate();
  

  const btn_detail_advice = async (index) => {
    navigate(`/medic/adminstrator/addetail/${index}`);
  };

  const btn_set_doctor = (index) => {
    const adId = index;
    navigate(`/medic/adminstrator/docset/${index}`, { state: { adId } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/advice/list');
        const data = response.data.reverse()
        console.log('1',data)
        setAllAdviceList(data);
      } catch (error) {
        console.error('자문 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateNo = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(allAdviceList.length / 7)) {
      setCurrentPage(newPage);
    }
  }
  const endIndex = Math.min(startIndex + itemsPerPage, allAdviceList.length);
  const visibleAdviceList = allAdviceList.slice(startIndex, endIndex);
  const rverseAdviceList = visibleAdviceList.reverse;
  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h2 className={ad.title}>
          자문의뢰 현황
        </h2>
      </div>

      
      <div className={ad.write_table}>
        <div className={ad.title_row_box}>
          <div className={ad.title_box_no}>
            NO.
          </div>
          <div className={ad.title_box}>
            진단과목
          </div>
          <div className={ad.title_box}>
            진단명
          </div>
          <div className={ad.title_box}>
            의뢰신청일
          </div>
          <div className={ad.title_box}>
            의뢰배정일
          </div>
          <div className={ad.title_box}>
            의뢰자문일
          </div>
          <div className={ad.title_box} >
            진행상태
          </div>
          <div className={ad.title_box} >
            전문의 
          </div>
          <div className={ad.title_box } style={{borderRight: 'none'}} >
            배정
          </div>
        </div>
          {visibleAdviceList.map((advice, index) => (
            <div className={ad.data_row_box}>
              <div className={ad.input_box_no} onClick={() => btn_detail_advice(advice.adId)} key={index}>
              {allAdviceList.length - startIndex - index}
              </div>
              <div className={ad.input_box}>{advice.uname}</div>
              <div className={ad.input_box}>{advice.adPtDiagnosis}</div>
              <div className={ad.input_box}>{formatDate(advice.adRegDate)}</div>
              <div className={ad.input_box}>{advice.admDate||"미배정"}</div>
              <div className={ad.input_box}>
                {advice.adAnswerDate||"미답변"}
              </div>
              {/* <div className={ad.input_box} style={{borderRight: 'none'}}>{advice.admProgressStatus === null ? '자문의뢰중' : advice.admProgressStatus}</div> */}
              <div className={ad.input_box}>
              {advice.admProgressStatus || '자문의뢰중'}
              </div>
              <div className={ad.input_box}> 
                <span className="your-custom-style">
                  {advice.cname || '미배정'}
                </span></div>
              <div className={ad.input_box} onClick={() => btn_set_doctor(advice.adId)} style={{borderRight: 'none'}}>
              <i className="fa-solid fa-pen-to-square"></i>
              </div>
              </div>
          ))}
      </div>

      <div className={ad.pagination}>
        <button
          className={ad.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
           <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(allAdviceList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={ad.paginationNumber}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={ad.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
