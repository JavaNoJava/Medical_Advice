import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assignmentAnalyze from '../../css/ConsultativeAnalyzeAssignment.module.css';
import { useNavigate} from 'react-router-dom';


export default function ConsultativeAnalyzeAssignmentpage() {
  const [selectedStatus, setSelectedStatus] = useState('분석의뢰중');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [analyzeList, setAnalyzeList] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/consultative/assignedAnalyze/list');
        console.log(response)
        const data = response.data.reverse();
        setAnalyzeList(data);
      } catch (error) {
        console.error('Error fetching analyze list:', error);
      }
    };

    fetchData();
  }, []);
  
  const handledetailClick = (anId) => {
    navigate(`/medic/consultative/assignmentAnalyzeDetail/${anId}`)
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
    <div className={assignmentAnalyze.contents}>
        <div className={assignmentAnalyze.iconbox}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                   배정 분석의뢰 현황
                </h1>
            </div>
      <table className={assignmentAnalyze.analyzeList_table}>
        <thead>
          <tr>
            <th className={assignmentAnalyze.analyzeList_th}>NO.</th>
            <th className={assignmentAnalyze.analyzeList_th}>진단과목</th>
            <th className={assignmentAnalyze.analyzeList_th}>진단명</th>
            <th className={assignmentAnalyze.analyzeList_th}>의뢰신청일</th>
            <th className={assignmentAnalyze.analyzeList_th}>의뢰배정일</th>
            <th className={assignmentAnalyze.analyzeList_th}>의뢰분석일</th>
            <th className={assignmentAnalyze.analyzeList_th}>진행상태</th>
          </tr>
          </thead>
          <tbody>
          {visibleAnalyzeList.map((analyze, index) => (
            <tr key={index}>
              <td className={assignmentAnalyze.analyzeList_td} onClick={() => handledetailClick(analyze.anId)}>
                  {analyzeList.length - startIndex - index}
              </td>             
              <td className={assignmentAnalyze.analyzeList_td}>{analyze.anPtSub}</td>
              <td className={assignmentAnalyze.analyzeList_td}>{analyze.anPtDiagnosis}</td>
              <td className={assignmentAnalyze.analyzeList_td}>{formatDate(analyze.anRegDate)}</td>
              <td className={assignmentAnalyze.analyzeList_td}>{analyze.anMdDate}</td>
              <td className={assignmentAnalyze.analyzeList_td}>{analyze.anAnswerDate === null ? '미답변' : analyze.anAnswerDate}</td>
              <td className={assignmentAnalyze.analyzeList_td}>{analyze.anProgressStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={assignmentAnalyze.pagination}>
        <button
          className={assignmentAnalyze.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(Math.ceil(analyzeList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={assignmentAnalyze.paginationButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={assignmentAnalyze.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(analyzeList.length / itemsPerPage)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}