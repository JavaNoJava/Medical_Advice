import React, { useEffect, useState } from "react";
import industrialAccident from '../../css/IndustrialAccidentInfo.module.css';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function IndustrialAccidentInfopage(){
  const [industrialAccidentInfos, setIndustrialAccidentInfos] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

 
  useEffect(() => {
    const getIndustrialAccidentInfos = async () => {
      try {
        const resp = await axios.get('/industrialAccident/list');
        const data = resp.data.reverse();
        setIndustrialAccidentInfos(data);
        if(cookie.get('uRole') === 'manager'){
          setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }
      } catch (error) {
        console.error('산업재해 정보 리스트 불러오기:', error);
      }
    };

    getIndustrialAccidentInfos();
  }, []);

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, industrialAccidentInfos.length);
  const visibleQuiryList = industrialAccidentInfos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(industrialAccidentInfos.length / itemsPerPage);

  const searchIndustrialAccidentInfo = async () => {
    try {
      const resp = await axios.get(`/industrialAccident/search?keyword=${searchKeyword}`);
      const data = resp.data.reverse();
      setIndustrialAccidentInfos(data);
      if(cookie.get('uRole') === 'manager'){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('산업재해 정보 검색:', error);
    }
  };

  const handleDeleteAnnounce = async (industrialAccidentInfoId) => {
    try {
      const confirmed = window.confirm('게시글을 삭제하시겠습니까?');
      if (confirmed) {
        await axios.post(`/industrialAccident/delete/${industrialAccidentInfoId}`);
        alert('게시글이 삭제되었습니다.');
        const resp = await axios.get('/industrialAccident/list');
        const data = resp.data.reverse();
        setIndustrialAccidentInfos(data);
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
    navigate('/medic/admin/knowledge/industrialAccidentInfo/writeindustrialaccident');
  };

  const goToDetailPage = (industrialAccidentInfoId) => {
    navigate(`/medic/knowledge/industrialaccidentdetails`, {state : {
      industrialAccidentInfoId : industrialAccidentInfoId
    }});
  };

  return (
    <div className={industrialAccident.assignform}>
      <div className={industrialAccident.industrialAccident_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          산업재해정보
        </h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={searchIndustrialAccidentInfo}>검색</button>
      </div>
      <br />
      <div className={industrialAccident.tb}>
        <table className={industrialAccident.industrialAccident_table}>
          <thead>
            <tr>
              <th className={industrialAccident.industrialAccident_th}>NO.</th>
              <th className={industrialAccident.industrialAccident_th}>제목</th>
              <th className={industrialAccident.industrialAccident_th}>기관명</th>
              <th className={industrialAccident.industrialAccident_th}>등록일</th>
              {isAdmin && (
                <th className={industrialAccident.industrialAccident_th}>삭제</th>
              )}
            </tr>
          </thead>
          <tbody>
            {visibleQuiryList.map((industrialAccidentInfo, index) => (
                  <tr key={index}>
                    <td className={industrialAccident.industrialAccident_td} onClick={() => goToDetailPage(industrialAccidentInfo.iaId)}>
                      {industrialAccidentInfos.length - startIndex - index}
                    </td>
                    <td className={industrialAccident.industrialAccident_td}>{industrialAccidentInfo.iaName}</td>
                    <td className={industrialAccident.industrialAccident_td}>{industrialAccidentInfo.iaInstitution}</td>
                    <td className={industrialAccident.industrialAccident_td}>{formatDateString(industrialAccidentInfo.iaRegDate)}</td>
                    {isAdmin && (
                      <td className={industrialAccident.industrialAccident_td} onClick={() => handleDeleteAnnounce(industrialAccidentInfo.iaId)}>
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </td>
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {isAdmin &&(
        <div className={industrialAccident.complete}>
          <button type="button" onClick={medicWrite} className={industrialAccident.btt_write}>글쓰기</button>
        </div>
      )}
      
      <div className={industrialAccident.pagination}>
        <button
          className={industrialAccident.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {[...Array(Math.ceil(industrialAccidentInfos.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            className={industrialAccident.paginationButton}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={industrialAccident.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ▶
        </button>
      </div>

    </div>
  );
};
