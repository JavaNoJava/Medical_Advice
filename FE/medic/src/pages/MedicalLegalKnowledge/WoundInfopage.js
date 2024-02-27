import React, { useEffect, useState } from "react";
import wound from '../../css/WoundInfo.module.css';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function WoundInfopage(){
  const [woundInfos, setWoundInfos] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getWoundInfos = async () => {
      try {
        const resp = await axios.get('/woundInfo/list');
        const data = resp.data.reverse()
        setWoundInfos(data);
        if(cookie.get('uRole')== 'manager'){
          setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }
      } catch (error) {
        console.error('상해정보 리스트 불러오기:', error);
      }
    };

    getWoundInfos();
  }, []);

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, woundInfos.length);
  const visibleQuiryList = woundInfos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(woundInfos.length / itemsPerPage);

  const searchWoundInfo = async () => {
    try {
      const resp = await axios.get(`/woundInfo/search?keyword=${searchKeyword}`);
      const data = resp.data.reverse();
      setWoundInfos(data);
      if(cookie.get('uRole') === 'manager'){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('상해 정보 검색:', error);
    }
  };

  const handleDeleteAnnounce = async (woundInfoId) => {
    try {
      const confirmed = window.confirm('게시글을 삭제하시겠습니까?');
      if (confirmed) {
        await axios.post(`/woundInfo/delete/${woundInfoId}`);
        alert('게시글이 삭제되었습니다.');
        const resp = await axios.get('/woundInfo/list');
        const data = resp.data.reverse();
        setWoundInfos(data);
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
    navigate('/medic/medicalknowledge/woundInfo/writewound');
  };

  const goToDetailPage = (woundInfoId) => {
    navigate(`/medic/knowledge/wounddetails`, {state : {
      woundInfoId : woundInfoId
    }});
  };

  return (
    <div className={wound.assignform}>
      <div className={wound.wound_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          상해 정보
        </h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={searchWoundInfo}>검색</button>
      </div>
      <br />
      <div className={wound.tb}>
        <table className={wound.wound_table}>
          <thead>
            <tr>
              <th className={wound.wound_th}>NO.</th>
              <th className={wound.wound_th}>제목</th>
              <th className={wound.wound_th}>기관명</th>
              <th className={wound.wound_th}>등록일</th>
              {isAdmin && (
                <th className={wound.wound_th}>삭제</th>
              )}
            </tr>
          </thead>
          <tbody>
            {visibleQuiryList.map((woundInfo, index) => (
              <tr key={index}>
                <td className={wound.wound_td} onClick={() => goToDetailPage(woundInfo.woId)}>
                      {woundInfos.length - startIndex - index}
                </td>
                <td className={wound.wound_td}>{woundInfo.woName}</td>
                <td className={wound.wound_td}>{woundInfo.woInstitution}</td>
                <td className={wound.wound_td}>{formatDateString(woundInfo.woRegdate)}</td>
                {isAdmin && (
                  <td className={wound.wound_td} onClick={() => handleDeleteAnnounce(woundInfo.woId)}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAdmin &&(
        <div className={wound.complete}>
          <button type="button" onClick={medicWrite} className={wound.btt_write}>글쓰기</button>
        </div>
      )}

      <div className={wound.pagination}>
        <button
          className={wound.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(Math.ceil(woundInfos.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={wound.paginationButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={wound.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  );
};