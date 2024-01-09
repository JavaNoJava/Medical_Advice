import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from "react-router-dom";


export default function AdAnalyzeListPage() {
  const [selectedStatus, setSelectedStatus] = useState('자문의뢰중');
  const [currentPage, setCurrentPage] = useState(1);
  const [allAnalyzeList, setAllAnalyzeList] = useState([]);
  const [assignmentDate, setAssignmentDate] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [progressStatus, setProgressStatus] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/analyze/all');
        setAllAnalyzeList(response.data);
      } catch (error) {
        console.error('분석 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

   const btn_detail_analyze = async(index) => {
    navigate('/')
}

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
    setCurrentPage(newPage);
  };

  const handleUpdateField = async (analyzeId) => {
    try {
      await axios.put(`/analyze/update/${analyzeId}`, {
        'adAnswerDate': assignmentDate,
        'admDate': responseDate,
        'progressStatus': progressStatus,
      });

      const response = await axios.get('/analyze/all');
      setAllAnalyzeList(response.data);
    } catch (error) {
      console.error(`자문 업데이트 중 에러 발생:`, error);
    }
  };

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
            <th className={ad.ad_th}>진단과목</th>
            <th className={ad.ad_th}>진단명</th>
            <th className={ad.ad_th}>의뢰신청일</th>
            <th className={ad.ad_th}>의뢰배정일</th>
            <th className={ad.ad_th}>의뢰분석일</th>
            <th className={ad.ad_th}>진행상태</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {allAnalyzeList.map((analyze, index) => (
                rowIndex === index && (
                  <React.Fragment key={index}>
                    <td className={ad.ad_td} onClick={btn_detail_analyze(index)}>{index + 1}</td>
                    <td className={ad.ad_td}>{analyze.anPtSub}</td>
                    <td className={ad.ad_td}>{analyze.anPtDiagnosis}</td>
                    <td className={ad.ad_td}>
                      {formatDate(analyze.adRegDate)}
                    </td>
                    <td className={ad.ad_td}>{analyze.assignmentDate}</td>
                    <td className={ad.ad_td}>{analyze.responseDate}</td>
                    <td className={ad.ad_td}>{analyze.progressStatus}</td>
                    <td className={ad.ad_td}>
                      <input
                        type="date"
                        value={analyze.assignmentDate}
                        onChange={(e) => setAssignmentDate(e.target.value)}
                      />
                    </td>
                    <td className={ad.ad_td}>
                      <input
                        type="date"
                        value={analyze.responseDate}
                        onChange={(e) => setResponseDate(e.target.value)}
                      />
                    </td>
                    <td className={ad.ad_td}>
                      <select
                        value={analyze.progressStatus}
                        onChange={(e) => setProgressStatus(e.target.value)}
                      >
                        <option value="자문의뢰중">자문의뢰중</option>
                        <option value="자문배정중">자문배정중</option>
                        <option value="결제하기">결제하기</option>
                        <option value="자문완료">자문완료</option>
                      </select>
                    </td>
                  </React.Fragment>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={ad.ad_pagination}>
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(10)].map((_, index) => (
          <button key={index} className={ad.ad_paginationButton} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
      <button onClick={handleUpdateField}>저장</button>
    </div>
  );
}