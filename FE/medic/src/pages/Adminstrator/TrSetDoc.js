import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate, useParams , useLocation} from 'react-router-dom';

export default function TrSetDoc() {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const [allDocList, setAllDocList] = useState([]);
  const [selectedCIds, setSelectedCIds] = useState(new Set());
  const { index } = useParams();
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const {trId} = location.state||{};
  const navigate = useNavigate();
  const itemsPerPage = 7;
  

  const [selectedTranslate,setSelectedTranslate] = useState("");
  console.log(selectedTranslate);
  
  const [tamDate , setTamDate] = useState();
  const [trProgressStatus , setTrProgressStatus] = useState();
  const [trAnswerDate,setTrAnswerDate] = useState();

  const [selectedCId, setSelectedCId] = useState(null);


  useEffect(()=> {
    const fetchData1 = async () => {
      try{
     const response = await axios.get(`/admin/trnaslation/status/${trId}`)
        console.log('response',response.data)
        const data = response.data
        setSelectedTranslate(data);
       
        setTamDate(response.data.tamDate)
        setTrProgressStatus(response.data.trProgressStatus);
        setTrAnswerDate(response.data.trAnswerDate);

      } catch(error){
        console.error('에러발생:',error)
      }
    };
fetchData1();
},[]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/translate/consultativeList');
        console.log(response);
        setAllDocList(response.data);
      
      } catch (error) {
        console.error('자문 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);
  
  const btn_trans_list = async() => {
    navigate('/medic/adminstrator/trlist')
}


const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= Math.ceil(filteredDocList.length / 7)) {
    setCurrentPage(newPage);
  }
}


  const handleCheckboxChange = (cId) => {
    setSelectedCId((prevSelectedCId) => (prevSelectedCId === cId ? null : cId));
  };

  const input_tamDate = (e) =>{
    setTamDate(e.target.value);
  } ;

  const input_trProgressStatus = (e) =>{
    setTrProgressStatus(e.target.value);
  } ;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    try {
      if (selectedCId !== null) {
        if (window.confirm('배정하시겠습니까?')) {
          const response = await axios.post(`/admin/translate/setConsultative/${trId}`, { cId: selectedCId });
          console.log('저장 응답:', response.data);
          if (response.data === 1) {
            alert('배정이 완료되었습니다.');
          } else {
            alert('배정 중 오류 발생.');
          }
        }
      } else {
        console.error('선택된 cId가 없습니다.');
      }
    } catch (error) {
      console.error('저장 중 에러 발생:', error);
    }
  };

  const filteredDocList = allDocList.filter(doc => doc.department === selectedDepartment);


  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredDocList.length / itemsPerPage);

  const isSaveButtonEnabled = selectedCId !== null;

  const btn_modify = e => {
    if(window.confirm("진행상태를 변경하시겠습니까?")){
        e.preventDefault()
        console.log(tamDate)
        console.log(trProgressStatus)
        const info = {
          'tamDate' : tamDate,
          'trProgressStatus' : trProgressStatus
        }
        handleUpdateField(info)
    }
    
  }

  const handleUpdateField = async(info) => {
    try{
    
        const response = await axios.put(`/admin/translate/updateStatus/${trId}`,info);
        if(response.data==1){
          alert('변경 성공!')

        }else{
          alert('변경 실패')
        }
      
     
    }catch(error){
      console.error('에러발생')
    }
  }
  



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
                  checked={selectedCId===advice.cid}
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
              <td className={ad.ad_td}>{trId}</td>
              <td className={ad.ad_td}>{selectedTranslate.uname}</td>
              <td className={ad.ad_td}>{selectedTranslate.trPtDiagnosis}</td>
              <td className={ad.ad_td}>{selectedTranslate.trRegDate}</td>
              <td className={ad.ad_td}>
               {tamDate||"미배정"}
              </td>
              <td className={ad.ad_td}>{trAnswerDate||"미답변"}</td>
              <td className={ad.ad_td}>
              <select
                  value={trProgressStatus || '번역의뢰중'}
                  onChange={(e) => input_trProgressStatus(e)}
                >
                  <option value="번역의뢰중">번역의뢰중</option>
                  <option value="번역배정중">번역배정중</option>
                  <option value="결제하기">결제하기</option>
                  <option value="번역완료">번역완료</option>
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
