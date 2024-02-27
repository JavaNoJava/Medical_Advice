import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function AdSetDoc() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allDocList, setAllDocList] = useState([]);
  const [selectedCId, setSelectedCId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const { index } = useParams();
  const navigate = useNavigate();
  const itemsPerPage = 7;
  const location = useLocation();
  const { adId } = location.state || {};
  const [selectedAdvice, setSelectedAdvice] = useState([]);
  const [admDate, setAdmDate] = useState(selectedAdvice.admDate || "미배정");
  const [admProgressStatus, setAdProgressStatus] = useState(selectedAdvice.admProgressStatus || "");
  const [adAnswerDate,setAdAnswerDate] = useState(selectedAdvice.adAnswerDate || "미답변")
  console.log('sese', adId);
  console.log('adid', adId);
  console.log(admDate);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`/admin/advice/status/${adId}`)
        console.log('response', response.data)
        const data = response.data
        setSelectedAdvice(data);

        setAdProgressStatus(response.data.admProgressStatus);
        setAdmDate(response.data.admDate);
        setAdAnswerDate(response.data.adAnswerDate);

      } catch (error) {
        console.error('에러발생:', error)
      }
    };
    fetchData1();
  }, [adId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/advice/consultativeList');
        setAllDocList(response.data)
        console.log(response);

      } catch (error) {
        console.error('자문 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const input_admDate = (e) => {
    setAdmDate(e.target.value);
  };
  const input_admProgressStatus = (e) => {
    setAdProgressStatus(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredDocList.length / 7)) {
      setCurrentPage(newPage);
    }
  }
  const handleCheckboxChange = (cId) => {
    setSelectedCId((prevSelectedCId) => (prevSelectedCId === cId ? null : cId));
  };

  const btn_trans_list = () => {
    navigate('/medic/adminstrator/adlist');
  }

  const handleSave = async () => {
    try {
      if (window.confirm("배정하시겠습니까?")) {
        if (selectedCId !== null) {
          const response = await axios.post(`/admin/advice/setConsultative/${index}`, { cId: selectedCId });
          if (response.data == 1) {
            alert('배정 성공')
          } else {
            alert('배정 오류')
          }
          console.log('저장 응답:', response.data);
        } else {
          console.error('선택된 cId가 없습니다.');
        }
      }

    } catch (error) {
      console.error('저장 중 에러 발생:', error);
    }
  };

  const btn_modify = e => {
    if (window.confirm("진행상태를 변경하시겠습니까?")) {
      e.preventDefault()
      console.log(admDate)
      console.log(admProgressStatus)
      const info = {
        'admDate': admDate,
        'admProgressStatus': admProgressStatus
      }
      handleUpdateField(info)
    }

  }

  const handleUpdateField = async (info) => {
    try {

      const response = await axios.put(`/admin/advice/updateStatus/${index}`, info);
      console.log(response)

      if (response.data == 1) {
        alert('변경 성공!')
      } else {
        alert('변경 오류')
      }


    } catch (error) {
      console.error('에러발생')
    }
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const filteredDocList = allDocList.filter(doc => doc.department === selectedDepartment);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredDocList.length / itemsPerPage);

  const isSaveButtonEnabled = selectedCId !== null;

  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          전문의 목록
        </h1>
      </div>
      <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
        <option value="">부서 선택</option>
        <option value="가정의학과">가정의학과</option>
        <option value="감염내과">감염내과</option>
        <option value="류마티스내과">류마티스내과</option>
        <option value="마취통증의학">마취통증의학</option>
        <option value="방사종양학과">방사종양학과</option>
        <option value="병리과">병리과</option>
        <option value="치과">치과</option>
        <option value="비뇨기과">비뇨기과</option>
        <option value="산부인과">산부인과</option>
        <option value="성형외과">성형외과</option>
        <option value="소아청소년과">소아청소년과</option>
        <option value="신경과">신경과</option>
        <option value="신경외과">신경외과</option>
        <option value="신장내과">신장내과</option>
        <option value="심장내과">심장내과</option>
        <option value="소아심장과">소아심장과</option>
        <option value="안과">안과</option>
        <option value="영상의학과">영상의학과</option>
        <option value="외과">외과</option>
        <option value="응급의학과">응급의학과</option>
        <option value="이비인과">이비인과</option>
        <option value="재활의학과">재활의학과</option>
        <option value="정신건강의학과">정신건강의학과</option>
        <option value="정형외과">정형외과</option>
        <option value="진단검사의학과">진단검사의학과</option>
        <option value="피부과">피부과</option>
        <option value="핵의학과">핵의학과</option>
        <option value="혈액종양내과">혈액종양내과</option>
        <option value="호흡기내과">호흡기내과</option>
        <option value="흉부외과">흉부외과</option>
      </select>
      <table className={ad.ad_table}>
        <thead>
          <tr>
            <th className={ad.ad_th}>NO.</th>
            <th className={ad.ad_th}>아이디</th>
            <th className={ad.ad_th}>이름</th>
            <th className={ad.ad_th}>전화번호</th>
            <th className={ad.ad_th}>부서</th>
            <th className={ad.ad_th}>병원명</th>
            <th className={ad.ad_th}>병원번호</th>
            <th className={ad.ad_th}>선택</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocList.slice(startIndex, endIndex).map((advice, index) => (
            <tr key={index}>
              <td className={ad.ad_td}>{startIndex + index + 1}</td>
              <td className={ad.ad_td}>{advice.cid}</td>
              <td className={ad.ad_td}>{advice.cname}</td>
              <td className={ad.ad_td}>{advice.cphone}</td>
              <td className={ad.ad_td}>{advice.department}</td>
              <td className={ad.ad_td}>{advice.hospName}</td>
              <td className={ad.ad_td}>{advice.hospTel}</td>
              <td className={ad.ad_td}>
                <input
                  type="checkbox"
                  checked={selectedCId === advice.cid}
                  onChange={() => handleCheckboxChange(advice.cid)}
                />
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
        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            className={ad.ad_paginationButton}
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={currentPage === pageIndex + 1}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button className={ad.ad_paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>

      <div className={ad.ad_complete}>
        <button className={ad.ad_complete} onClick={handleSave} disabled={!isSaveButtonEnabled}>
          배정
        </button>
      </div>

      <div className={ad.ad_iconbox}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          진행 상황
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
          </tr>
        </thead>
        <tbody>
          <tr key={index}>
            <td className={ad.ad_td}>{adId}</td>
            <td className={ad.ad_td}>{selectedAdvice.uname}</td>
            <td className={ad.ad_td}>{selectedAdvice.adPtDiagnosis}</td>
            <td className={ad.ad_td}>{selectedAdvice.adRegDate}</td>
            <td className={ad.ad_td}>{admDate||"미배정"}
            </td>
            <td className={ad.ad_td}>{adAnswerDate||"미답변"}</td>
            <td className={ad.ad_td}>
              <select
                value={admProgressStatus || '자문의뢰중'}
                onChange={(e) => input_admProgressStatus(e)}
              >
                <option value="자문의뢰중">자문의뢰중</option>
                <option value="자문배정중">자문배정중</option>
                <option value="결제하기">결제하기</option>
                <option value="자문완료">자문완료</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div className={ad.ad_complete}>
        <button className={ad.ad_complete} onClick={btn_modify}>
          저장
        </button>
      </div>

      <div className={ad.ad_complete}>
        <button className={ad.ad_complete} onClick={btn_trans_list}>
          목록
        </button>
      </div>

    </div>
  );
}
