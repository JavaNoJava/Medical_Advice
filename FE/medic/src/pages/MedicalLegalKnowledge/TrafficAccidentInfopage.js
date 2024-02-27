import React, { useEffect, useState } from "react";
import trafficAccident from '../../css/TrafficAccidentInfo.module.css';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TrafficAccidentInfopage(){
  const [searchKeyword, setSearchKeyword] = useState("");
  const [trafficAccidentInfos, setTrafficAccidentInfos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getTrafficAccidentInfos = async () => {
      try {
        const resp = await axios.get('/trafficAccident/list');
        const data = resp.data.reverse();
        setTrafficAccidentInfos(data);
        if(cookie.get('uRole')== 'manager'){
          setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }
      } catch (error) {
        console.error('교통사고 정보 리스트 불러오기:', error);
      }
    };

    getTrafficAccidentInfos();
  }, []);

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, trafficAccidentInfos.length);
  const visibleQuiryList = trafficAccidentInfos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(trafficAccidentInfos.length / itemsPerPage);

  const searchTrafficAccidentInfo = async () => {
    try {
      const resp = await axios.get(`/trafficAccident/search?keyword=${searchKeyword}`);
      const data = resp.data.reverse();
      setTrafficAccidentInfos(data);
      if(cookie.get('uRole') === 'manager'){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('교통사고 정보 검색:', error);
    }
  };

  const handleDeleteAnnounce = async (trafficAccidentInfoId) => {
    try {
      const confirmed = window.confirm('게시글을 삭제하시겠습니까?');
      if (confirmed) {
        await axios.post(`/trafficAccident/delete/${trafficAccidentInfoId}`);
        alert('게시글이 삭제되었습니다.');
        const resp = await axios.get('/trafficAccident/list');
        const data = resp.data.reverse();
        setTrafficAccidentInfos(data);
        if(cookie.get('uRole') === 'manager'){
          setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }
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
    
    navigate('/medic/medicalknowledge/trafficAccidentInfo/writetrafficAccident');
  };

  const goToDetailPage = (trafficAccidentInfoId) => {
    navigate(`/medic/knowledge/trafficaccidentdetails`, {state : {
      trafficAccidentInfoId : trafficAccidentInfoId
    }});
  };

  return (
    <div className={trafficAccident.assignform}>
      <div className={trafficAccident.trafficAccident_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          교통사고 정보
        </h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={searchTrafficAccidentInfo}>검색</button>
      </div>
      <br />
      <div className={trafficAccident.tb}>
        <table className={trafficAccident.trafficAccident_table}>
          <thead>
            <tr>
              <th className={trafficAccident.trafficAccident_th}>NO.</th>
              <th className={trafficAccident.trafficAccident_th}>제목</th>
              <th className={trafficAccident.trafficAccident_th}>기관명</th>
              <th className={trafficAccident.trafficAccident_th}>등록일</th>
              {isAdmin && (
                <th className={trafficAccident.trafficAccident_th}>삭제</th>
              )}
            </tr>
          </thead>
          <tbody>
            {visibleQuiryList.map((trafficAccidentInfo, index) => (
              <tr key={index}>
                <td className={trafficAccident.trafficAccident_td} onClick={() => goToDetailPage(trafficAccidentInfo.taId)}>
                      {trafficAccidentInfos.length - startIndex - index}
                </td>
                <td className={trafficAccident.trafficAccident_td}>{trafficAccidentInfo.taName}</td>
                <td className={trafficAccident.trafficAccident_td}>{trafficAccidentInfo.taInstitution}</td>
                <td className={trafficAccident.trafficAccident_td}>{formatDateString(trafficAccidentInfo.taRegdate)}</td>
                {isAdmin && (
                  <td className={trafficAccident.trafficAccident_td} onClick={() => handleDeleteAnnounce(trafficAccidentInfo.taId)}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAdmin &&(
        <div className={trafficAccident.complete}>
          <button type="button" onClick={medicWrite} className={trafficAccident.btt_write}>글쓰기</button>
        </div>
      )}
      <div className={trafficAccident.pagination}>
        <button
          className={trafficAccident.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(Math.ceil(trafficAccidentInfos.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={trafficAccident.paginationButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={trafficAccident.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  );
};