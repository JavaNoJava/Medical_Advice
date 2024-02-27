import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate } from 'react-router-dom';

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
        setAllTransList(response.data);
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
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          번역의뢰 현황
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
      </table>
      <div className={ad.ad_pagination}>
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ◀
        </button>
        {[...Array(Math.ceil(allTransList.length / itemsPerPage))].map((_, index) => (
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
};

export default AdTranslateListPage;
