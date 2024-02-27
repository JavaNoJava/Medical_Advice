import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from "react-router-dom";

export default function AdAnalyzeListPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const [allAnalyzeList, setAllAnalyzeList] = useState([]);
  const [assignmentDate, setAssignmentDate] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [anProgressStatus, setAnProgressStatus] = useState('자문의뢰중');
  const itemsPerPage = 7;

  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const quiryList = allAnalyzeList.slice(startIndex, startIndex + itemsPerPage);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/analyze/list');
        console.log("res",response);
        setAllAnalyzeList(response.data);
   
      } catch (error) {
        console.error('분석 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedAnalyzeList = allAnalyzeList.map((analyze, i) => {
      if (i === (currentPage - 1) * itemsPerPage + index) {
        return {
          ...analyze,
          [field]: value,
        };
      }
      return analyze;
    });

    setAllAnalyzeList(updatedAnalyzeList);
  };

  const calculateNo = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const btn_detail_analyze = async (index) => {
    navigate(`/medic/adminstrator/andetail/${index}`);
  };

  const btn_set_doctor = (index) => {
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


  const handleUpdateField = async () => {
    try {
      const updateAnalyzeList = allAnalyzeList.map((analyze, i) => {
        if (i === (currentPage - 1) * itemsPerPage) {
          return {
            ...analyze,
            adMdDate : formatDate(responseDate),
            anAnswerDate: responseDate,
            anProgressStatus: anProgressStatus,
          };
        }
        return analyze;
      });

      console.log('Request Data:', updateAnalyzeList);

      const response = await axios.put(`/admin/analyze/updateStatus`, updateAnalyzeList);
      navigate('/');
    } catch (error) {
      console.error(`분석 업데이트 중 에러 발생:`, error);
    }
  };



  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          분석의뢰 현황
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
            <th className={ad.ad_th}>의뢰분석일</th>
            <th className={ad.ad_th}>진행상태</th>
            <th className={ad.ad_th}>전문의</th>
                  <th className={ad.ad_th}>배정</th>
          </tr>
        </thead>
        <tbody>
          {quiryList?.map((analyze, index) => (
            <tr key={index}>
              <td className={ad.ad_td} onClick={() => btn_detail_analyze(analyze.anId)}>{calculateNo(index)}</td>
              <td className={ad.ad_td}>{analyze.uname}</td>
              <td className={ad.ad_td}>{analyze.anPtDiagnosis}</td>
              <td className={ad.ad_td}>{formatDate(analyze.anRegDate)}</td>
              <td className={ad.ad_td}>
                  {analyze.adMdDate||"미배정"}
              </td>
              <td className={ad.ad_td}>
              {analyze.anAnswerDate||"미답변"}
              </td>
              <td className={ad.ad_td}>
              {analyze.anProgressStatus||"분석의뢰중"}
              </td>
              <td className={ad.ad_td}>
      <span
   
  >
    {analyze.cname||''}
  </span>
</td>

<td className={ad.ad_td}>
<div  onClick={() => btn_set_doctor(analyze.anId)}>
<i class="fa-solid fa-pen-to-square"></i>
</div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className={ad.ad_pagination}>
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(Math.ceil(allAnalyzeList.length / itemsPerPage))].map((_, index) => (
          <button key={index} className={ad.ad_paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </div>
  );
}
 