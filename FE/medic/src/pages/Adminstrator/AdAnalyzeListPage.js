import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function AdAnalyzeListPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const [allAnalyzeList, setAllAnalyzeList] = useState([]);
  const itemsPerPage = 7;

  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const quiryList = allAnalyzeList.slice(startIndex, startIndex + itemsPerPage);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/analyze/list');
        console.log("res",response);
        const data = response.data.reverse();
        setAllAnalyzeList(data);
   
      } catch (error) {
        console.error('분석 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const calculateNo = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const btn_detail_analyze = async (index) => {
    navigate(`/medic/adminstrator/andetail/${index}`);
  };

  const btn_set_doctor = async (index) => {
    const anId= index;
    navigate(`/medic/adminstrator/andocset/${index}`,{state:{anId}});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(allAnalyzeList.length / 7)) {
      setCurrentPage(newPage);
    }
  }

  const endIndex = Math.min(startIndex + itemsPerPage, allAnalyzeList.length);
  const visibleAdviceList = allAnalyzeList.slice(startIndex, endIndex);
console.log('sex',visibleAdviceList)
  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h2 className={ad.title}> 
          분석의뢰 현황
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
            의뢰분석일
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
          {quiryList.map((analyze, index) => (
            <div className={ad.data_row_box}>
              <div className={ad.input_box_no} onClick={() => btn_detail_analyze(analyze.anId)} key={index}>
              {allAnalyzeList.length - startIndex - index}
              </div>
              <div className={ad.input_box}>{analyze.uname}</div>
              <div className={ad.input_box}>{analyze.anPtDiagnosis}</div>
              <div className={ad.input_box}>{formatDate(analyze.anRegDate)}</div>
              <div className={ad.input_box}>{analyze.adMdDate||"미배정"}</div>
              <div className={ad.input_box}>
                {analyze.adAnswerDate||"미답변"}
              </div>
              
              <div className={ad.input_box}>
              {analyze.anProgressStatus || '분석의뢰중'}
              </div>
              <div className={ad.input_box}> 
                <span className="your-custom-style">
                  {analyze.cname || '미배정'}
                </span></div>
              <div className={ad.input_box} onClick={() => btn_set_doctor(analyze.anId)} style={{borderRight: 'none'}}>
              <i className="fa-solid fa-pen-to-square"></i>
              </div>
              </div>
          ))}
      </div>


      
      <div className={ad.pagination}>
        <button className={ad.paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FaChevronLeft />
        </button>
        {[...Array(Math.ceil(allAnalyzeList.length / itemsPerPage))].map((_, index) => (
          <button key={index} className={ad.paginationNumber} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={ad.paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
 