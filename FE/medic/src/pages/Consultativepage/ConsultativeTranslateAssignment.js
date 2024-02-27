import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assignmentTranslate from '../../css/ConsultativeTranslateAssignment.module.css';
import { useNavigate} from 'react-router-dom';


export default function ConsultativeTranslateAssignmentpage() {
  const [selectedStatus, setSelectedStatus] = useState('번역의뢰중');
  const [currentPage, setCurrentPage] = useState(1);
  const [translateList, setTranslateList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/consultative/assignedTranslate/list');
        console.log(response)
        const data = response.data.reverse();
        setTranslateList(data);
      } catch (error) {
        console.error('Error fetching translation list:', error);
      }
    };

    fetchData();
  }, []);

  const handledetailClick = (trId) => {
    navigate(`/medic/consultative/assignmentTranslateDetail/${trId}`)
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
  const endIndex = Math.min(startIndex + itemsPerPage, translateList.length);
  const visibleTranslateList = translateList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(translateList.length / itemsPerPage);

  return (
    <div className={assignmentTranslate.contents}>
        <div className={assignmentTranslate.iconbox}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    배정 번역의뢰 현황
                </h1>
            </div>
      <table className={assignmentTranslate.translateList_table}>
        <thead>
          <tr>
            <th className={assignmentTranslate.translateList_th}>NO.</th>
            <th className={assignmentTranslate.translateList_th}>진단과목</th>
            <th className={assignmentTranslate.translateList_th}>진단명</th>
            <th className={assignmentTranslate.translateList_th}>의뢰신청일</th>
            <th className={assignmentTranslate.translateList_th}>의뢰배정일</th>
            <th className={assignmentTranslate.translateList_th}>의뢰번역일</th>
            <th className={assignmentTranslate.translateList_th}>진행상태</th>
          </tr>
          </thead>
          <tbody>
          {visibleTranslateList.map((translation, index) => (
            <tr key={index}>
              <td className={assignmentTranslate.translateList_td} onClick={() => handledetailClick(translation.trId)}>
                  {translateList.length - startIndex - index}
              </td>              
              <td className={assignmentTranslate.translateList_td}>{translation.trPtSub}</td>
              <td className={assignmentTranslate.translateList_td}>{translation.trPtDiagnosis}</td>
              <td className={assignmentTranslate.translateList_td}>{formatDate(translation.trRegDate)}</td>
              <td className={assignmentTranslate.translateList_td}>{translation.tamDate}</td>
              <td className={assignmentTranslate.translateList_td}>{translation.trAnswerDate === null ? '미답변' : translation.trAnswerDate}</td>
              <td className={assignmentTranslate.translateList_td}>{translation.trProgressStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={assignmentTranslate.pagination}>
        <button
          className={assignmentTranslate.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(Math.ceil(translateList.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={assignmentTranslate.paginationButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={assignmentTranslate.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(translateList.length / itemsPerPage)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}