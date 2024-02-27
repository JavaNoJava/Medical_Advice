import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from "react-router-dom";

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
        console.log('',response.data)
        setAllAdviceList(response.data);
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

  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          자문의뢰 현황
        </h1>
      </div>
      <table className={ad.ad_table}>
        <thead>
          <tr>
            <th className={ad.ad_th}>NO.</th>
            <th className={ad.ad_th}>이름</th>
            <th className={ad.ad_th}>진단명</th>
            <th className={ad.ad_th}>의뢰신청일</th>
            <th className={ad.ad_th}>의뢰배정일</th>
            <th className={ad.ad_th}>의뢰자문일</th>
            <th className={ad.ad_th}>진행상태</th>
            <th className={ad.ad_th}>전문의</th>
            <th className={ad.ad_th}>배정</th>
          </tr>
        </thead>
        <tbody>
          {quiryList?.map((advice, index) => (
            <tr key={index}>
              <td className={ad.ad_td} onClick={() => btn_detail_advice(advice.adId)}>
                {calculateNo(index)}
              </td>
              <td className={ad.ad_td}>{advice.uname}</td>
              <td className={ad.ad_td}>{advice.adPtDiagnosis}</td>
              <td className={ad.ad_td}>{formatDate(advice.adRegDate)}</td>
              <td className={ad.ad_td}>{advice.admDate||"미배정"}</td>
              <td className={ad.ad_td}>{advice.adAnswerDate||"미답변"}</td>
              <td className={ad.ad_td}>{advice.admProgressStatus || '자문의뢰중'}</td>
              <td className={ad.ad_td}>
                <span className="your-custom-style">
                  {advice.cname || '미배정'}
                </span>
              </td>
              <td className={ad.ad_td}>
                <div onClick={() => btn_set_doctor(advice.adId)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={ad.ad_pagination}>
        <button
          className={ad.ad_paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(Math.ceil(allAdviceList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={ad.ad_paginationButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={ad.ad_paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
