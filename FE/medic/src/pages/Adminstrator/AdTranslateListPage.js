import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdTranslateListPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransList, setAllTransList] = useState([]);

  const [trProgressStatus, setTrProgressStatus] = useState('');
  console.log(allTransList)
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const quiryList = allTransList.slice(startIndex, startIndex + itemsPerPage);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/translate/list');
        const data = response.data.reverse();
        setAllTransList(data);
      } catch (error) {
        console.error('번역 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();

  const calculateNo = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const handleInputChange = (index, field, value) => {
    const updatedTransList = allTransList.map((trans, i) => {
      if (i === (currentPage - 1) * itemsPerPage + index) {
        return {
          ...trans,
          [field]: value,
        };
      }
      return trans;
    });

    setAllTransList(updatedTransList);
  };

  const btn_detail_translate = async (index) => {
    navigate(`/medic/adminstrator/tndetail/${index}`);
  };

  const btn_set_doctor = (index) => {
    const trId = index
    navigate(`/medic/adminstrator/trdocset/${index}`,{state:{trId}});
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
    if (newPage >= 1 && newPage <= Math.ceil(allTransList.length / 7)) {
      setCurrentPage(newPage);
    }
  }


  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h2 className={ad.title}>
          번역의뢰 현황
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
            의뢰번역일
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
          {quiryList.map((advice, index) => (
            <div className={ad.data_row_box}>
              <div className={ad.input_box_no} onClick={() => btn_detail_translate(advice.trId)} key={index}>
              {allTransList.length - startIndex - index}
              </div>
              <div className={ad.input_box}>{advice.uname}</div>
              <div className={ad.input_box}>{advice.trPtDiagnosis}</div>
              <div className={ad.input_box}>{formatDate(advice.trRegDate)}</div>
              <div className={ad.input_box}>{advice.tamDate||"미배정"}</div>
              <div className={ad.input_box}>
                {advice.trAnswerDate||"미답변"}
              </div>
              {/* <div className={ad.input_box} style={{borderRight: 'none'}}>{advice.admProgressStatus === null ? '자문의뢰중' : advice.admProgressStatus}</div> */}
              <div className={ad.input_box}>
              {advice.trProgressStatus || '번역의뢰중'}
              </div>
              <div className={ad.input_box}> 
                <span className="your-custom-style">
                  {advice.cname || '미배정'}
                </span></div>
              <div className={ad.input_box} onClick={() => btn_set_doctor(advice.trId)} style={{borderRight: 'none'}}>
              <i className="fa-solid fa-pen-to-square"></i>
              </div>
              </div>
          ))}
      </div>

{/* 
      <table className={ad.ad_table}>
        <thead>
          <tr>
            <th className={ad.ad_th}>NO.</th>
            <th className={ad.ad_th}>이름</th>
            <th className={ad.ad_th}>진단명</th>
            <th className={ad.ad_th}>의뢰신청일</th>
            <th className={ad.ad_th}>의뢰배정일</th>
            <th className={ad.ad_th}>의뢰번역일</th>
            <th className={ad.ad_th}>진행상태</th>
            <th className={ad.ad_th}>전문의</th>
            <th className={ad.ad_th}>배정</th>
          </tr>
        </thead>
        <tbody>
          {quiryList?.map((trans, index) => (
            <tr key={index}>
              <td className={ad.ad_td} onClick={() => btn_detail_translate(trans.trId)}>{calculateNo(index)}</td>
              <td className={ad.ad_td}>{trans.uname}</td>
              <td className={ad.ad_td}>{trans.trPtDiagnosis}</td>
              <td className={ad.ad_td}>{formatDate(trans.trRegDate)}</td>
              <td className={ad.ad_td}>
              
                  {formatDate(trans.tamDate)||"미배정"}
                 
              </td>
              <td className={ad.ad_td}>
               
                 {trans.trAnswerDate||"미답변"}
               
              </td>
              <td className={ad.ad_td}>
             {trans.trProgressStatus||"번역의뢰중"}
              </td>
              <td className={ad.ad_td}>
  <span
  >
    {trans.cname||'미배정'}
  </span>
</td>

<td className={ad.ad_td}>
<div  onClick={() => btn_set_doctor(trans.trId)}>
<i class="fa-solid fa-pen-to-square"></i>
</div>
</td>

            </tr>
          ))}
        </tbody>
      </table> */}

      <div className={ad.pagination}>
        <button className={ad.paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FaChevronLeft />

        </button>
        {[...Array(Math.ceil(allTransList.length / itemsPerPage))].map((_, index) => (
          <button key={index} className={ad.paginationNumber} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
        <FaChevronRight />

        </button>
      </div>
    </div>
  );
};

export default AdTranslateListPage;
