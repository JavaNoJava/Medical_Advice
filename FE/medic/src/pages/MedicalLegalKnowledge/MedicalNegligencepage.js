import React, { useEffect, useState } from "react";
import MedicalNegligence from '../../css/MedicalNegligencepage.module.css';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function MedicalNegligencepage(){
    const [medicalNegligences, setMedicalNegligences] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const cookie = new Cookies();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getMedicalNegligences = async () => {
          try {
            const resp = await axios.get('/medicalNegligence/list');
            const data = resp.data.reverse()
            setMedicalNegligences(data);
            if(cookie.get('uRole')== 'manager'){
              setIsAdmin(true)
            }else{
              setIsAdmin(false)
            }
            console.log(resp);
          } catch (error) {
            console.error('의료과실 정보 리스트 불러오기:', error);
          }
        };

        getMedicalNegligences();
  }, []);

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, medicalNegligences.length);
  const visibleQuiryList = medicalNegligences.slice(startIndex, endIndex);
  const totalPages = Math.ceil(medicalNegligences.length / itemsPerPage);

  const searchMedicalNegligenceInfo = async () => {
    try {
      const resp = await axios.get(`/medicalNegligence/search?keyword=${searchKeyword}`);
      const data = resp.data.reverse();
      setMedicalNegligences(data);
    } catch (error) {
      console.error('의료과실 정보 검색:', error);
    }
  };

  const handleDeleteAnnounce = async (medicalNegligenceId) => {
    try {
      const confirmed = window.confirm('게시글을 삭제하시겠습니까?');
      if (confirmed) {
        await axios.post(`/medicalNegligence/delete/${medicalNegligenceId}`);
        alert('게시글이 삭제되었습니다.');
        const resp = await axios.get('/medicalNegligence/list');
        const data = resp.data.reverse();
        setMedicalNegligences(data);
      }
    } catch (error) {
      console.error('게시글 삭제 오류', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    navigate('/medic/medicalknowledge/medicalNegligence/writemedicalNegligence');
  };

  const goToDetailPage = (medicalNegligenceId) => {
    navigate(`/medic/medicalknowledge/medicalNegligence/medicalNegligencedetails`, {state : {
      medicalNegligenceId : medicalNegligenceId
    }});
  };

    return(
    <div className={MedicalNegligence.assignform}>
        <div className={MedicalNegligence.medicalNegligence_title}>
          <h2>
            <i className="fa-solid fa-circle icon"></i>
            의료과실정보
          </h2>
        </div>
        <div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={searchMedicalNegligenceInfo}>검색</button>
      </div>
        <br />
        <div className={MedicalNegligence.tb}>
          <table className={MedicalNegligence.medicalNegligence_table}>
            <thead>
              <tr>
                <th className={MedicalNegligence.medicalNegligence_th}>NO.</th>
                <th className={MedicalNegligence.medicalNegligence_th}>제목</th>
                <th className={MedicalNegligence.medicalNegligence_th}>기관명</th>
                <th className={MedicalNegligence.medicalNegligence_th}>등록일</th>
                {isAdmin && (
                  <th className={MedicalNegligence.medicalNegligence_th}>삭제</th>
                )}
              </tr>
            </thead>
            <tbody> 
              {visibleQuiryList.map((medicalNegligence, index) => (
                <tr key={index}>
                  <td className={MedicalNegligence.medicalNegligence_td} onClick={() => goToDetailPage(medicalNegligence.mnId)}>
                      {medicalNegligences.length - startIndex - index}
                  </td>
                  <td className={MedicalNegligence.medicalNegligence_td}>{medicalNegligence.mnName}</td>
                  <td className={MedicalNegligence.medicalNegligence_td}>{medicalNegligence.mnInstitution}</td>
                  <td className={MedicalNegligence.medicalNegligence_td}>{formatDateString(medicalNegligence.mnRegdate)}</td>
                  {isAdmin && (
                      <td className={MedicalNegligence.medicalNegligence_td} onClick={() => handleDeleteAnnounce(medicalNegligence.mnId)}>
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </td>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isAdmin &&(
          <div className={MedicalNegligence.complete}>
            <button type="button" onClick={medicWrite} className={MedicalNegligence.btt_write}>글쓰기</button>
          </div>
        )}

        <div className={MedicalNegligence.pagination}>
          <button
            className={MedicalNegligence.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
          ◀
          </button>
          {[...Array(Math.ceil(medicalNegligences.length / itemsPerPage))].map((_, index) => (
            <button
              key={index}
              className={MedicalNegligence.paginationButton}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={MedicalNegligence.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
          >
          ▶
          </button>
       </div>
      </div>
    );
  };