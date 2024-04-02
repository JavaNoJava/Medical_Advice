import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ad from '../../css/AdAdviceListPage.module.css';
import { useNavigate, useParams , useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function AnSetDoc() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allDocList, setAllDocList] = useState([]);
  const [selectedCIds, setSelectedCIds] = useState(new Set());
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const { index } = useParams();
  const {cId} = useState();
  const [selectedCId, setSelectedCId] = useState(null);
  const location = useLocation();
  const [selectedAnalyze, setSelectedAnalyze] = useState([]);
  const {anId} = location.state||{}; 
  console.log(anId)
  const navigate = useNavigate();
  const itemsPerPage = 7;
  const [adMdDate,setAdMdDate] = useState(selectedAnalyze.adMdDate||"미배정")
  const [adProgressStatus , setAdProgressStatus] = useState(selectedAnalyze.admProgressStatus||"")
  const [anAnswerDate, setAnAnswerDate] = useState(selectedAnalyze.anAnswerDate||"미답변") 

  useEffect(()=> {
    const fetchData1 = async () => {
      try{
     const response = await axios.get(`/admin/analyze/status/${anId}`)
        console.log('response',response.data)
        const data = response.data
       setSelectedAnalyze(data);
       
        setAdProgressStatus(response.data.admProgressStatus);
        setAdMdDate(response.data.adMdDate);
        setAnAnswerDate(response.data.anAnswerDate);

      } catch(error){
        console.error('에러발생:',error)
      }
    };
fetchData1();
},[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/analyze/consultativeList');
        console.log(response);
        setAllDocList(response.data);
      } catch (error) {
        console.error('자문 리스트를 가져오는 도중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredDocList.length / 7)) {
      setCurrentPage(newPage);
    }
  }

  const input_adMdate = (e) =>{
    setAdMdDate(e.target.value);
  } ;
  const input_adProgressStatus = (e) =>{
    setAdProgressStatus(e.target.value);
  } ;
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const handleCheckboxChange = (cId) => {
    setSelectedCId((prevSelectedCId) => (prevSelectedCId === cId ? null : cId));
  };


  const handleSave = async () => {
    try {
      // const selectedCId = Array.from(selectedCIds)[0];
      if(window.confirm("배정하시겠습니까?")){
        if (selectedCId !== null) {
          const response = await axios.post(`/admin/analyze/setConsultative/${anId}`, { cId: selectedCId });
          console.log('저장 응답:', response.data);
          if(response.data == 1){
            alert('배정 성공')
          }else{
            alert('배정 오류')
          }
    
        } else {
          console.error('선택된 cId가 없습니다.');
        }
      }
      
    } catch (error) {
      console.error('저장 중 에러 발생:', error);
    }
  };
  
  const btn_modify = e => {
    if(window.confirm("진행상황을 변경하시겠습니까?")){
        e.preventDefault()
        console.log(adMdDate)
        console.log(adProgressStatus)
        const info = {
          'adMdDate' : adMdDate,
          'anProgressStatus' : adProgressStatus
        }
        handleUpdateField(info)
    }
    
  }

  const btn_trans_list = async() => {
    navigate('/medic/adminstrator/anlist')
}

  const handleUpdateField = async(info) => {
    try{
     
        const response = await axios.put(`/admin/analyze/updateStatus/${anId}`,info);
        console.log(response)
          if(response.data == 1){
            alert('변경 성공')
          }else{
            alert('변경 실패')
          }
      
          }catch(error){
      console.error('에러발생')
    }
  }
  
  const isSaveButtonEnabled = selectedCId !== null;

  const filteredDocList = allDocList.filter(doc => doc.department === selectedDepartment);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredDocList.length / itemsPerPage);


  return (
    <div className={ad.ad_contents}>
      <div className={ad.ad_iconbox}>
        <h2 className={ad.title}>
          전문의 목록
        </h2>
      </div>
      <div style={{marginLeft:'730px', marginBottom:'10px'}}>
      <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
        <option value="">부서 선택</option>
        <option value="내과">내과</option>
        <option value="신경과">신경과</option>
        <option value="정신건강의학과">정신건강의학과</option>
        <option value="외과">외과</option>
        <option value="정형외과">정형외과</option>
        <option value="신경외과">신경외과</option>
        <option value="흉부외과">흉부외과</option>
        <option value="성형외과">성형외과</option>
        <option value="마취통증의학과">마취통증의학과</option>
        <option value="산부인과">산부인과</option>
        <option value="소아청소년과">소아청소년과</option>
        <option value="안과">안과</option>
        <option value="이비인후과">이비인후과</option>
        <option value="피부과">피부과</option>
        <option value="비뇨의학과">비뇨의학과</option>
        <option value="영상의학과">영상의학과</option>
        <option value="방사선종양학과">방사선종양학과</option>
        <option value="병리과">병리과</option>
        <option value="진단검사의학과">진단검사의학과</option>
        <option value="결핵과">결핵과</option>
        <option value="재활의학과">재활의학과</option>
        <option value="예방의학과">예방의학과</option>
        <option value="가정의학과">가정의학과</option>
        <option value="응급의학과">응급의학과</option>
        <option value="핵의학과">핵의학과</option>
        <option value="직업환경의학과">직업환경의학과</option>
      </select>
      </div>

      <div className={ad.write_table}>
        <div className={ad.title_row_box}>
          <div className={ad.title_box}>
            NO.
          </div>
          <div className={ad.title_box}>
            아이디
          </div>
          <div className={ad.title_box}>
            이름
          </div>
          <div className={ad.title_box} style={{width:'150px'}}>
            전화번호
          </div>
          <div className={ad.title_box} style={{width:'150px'}}>
            부서
          </div>
          <div className={ad.title_box}>
            병원명
          </div>
          <div className={ad.title_box} >
            병원번호
          </div>
          <div className={ad.title_box} style={{borderRight: 'none'}} >
            선택
          </div>
         
        </div>
          {filteredDocList.slice(startIndex, endIndex).map((advice,index) => (
            <div className={ad.data_row_box}>
              <div className={ad.input_box} >
              {startIndex + index + 1}
              </div>
              <div className={ad.input_box}>{advice.cid}</div>
              <div className={ad.input_box}>{advice.cname}</div>
              <div className={ad.input_box} style={{width:'150px'}}>{advice.cphone}</div>
              <div className={ad.input_box} style={{width:'150px'}}>{advice.department}</div>
              <div className={ad.input_box}>
              {advice.hospName}
              </div>
              <div className={ad.input_box}>
              {advice.hospTel}
              </div>
              <div className={ad.input_box} style={{borderRight: 'none'}}> 
              <input
                  type="checkbox"
                  checked={selectedCId === advice.cid}
                  onChange={() => handleCheckboxChange(advice.cid)}
                />
                </div>
             
              </div>
          ))}
      </div>

      <div className={ad.pagination}>
        <button
          className={ad.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
         <FaChevronLeft />
        </button>
        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            className={ad.paginationNumber}
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={currentPage === pageIndex + 1}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button className={ad.paginationButton} onClick={() => handlePageChange(currentPage + 1)}>
        <FaChevronRight />
        </button>
      </div>
      <div className={ad.complete} style={{marginBottom:'100px'}}>
      <button className={ad.complete_button} onClick={handleSave} disabled={!isSaveButtonEnabled}>
        배정
      </button>
      </div>


      <div className={ad.ad_iconbox}>
        <h2 className={ad.title}>
          진행 상황
        </h2>
      </div>

      <div className={ad.write_table}>
        <div className={ad.title_row_box}>
          <div className={ad.title_box}>
            NO.
          </div>
          <div className={ad.title_box}>
            이름
          </div>
          <div className={ad.title_box}>
            진단명
          </div>
          <div className={ad.title_box} style={{width:'150px'}}>
            의뢰신청일
          </div>
          <div className={ad.title_box} style={{width:'150px'}}>
            의뢰배정일
          </div>
          <div className={ad.title_box} style={{width:'150px'}}>
            의뢰자문일
          </div>
          <div className={ad.title_box} style={{borderRight:'none'}} >
            진행상태
          </div>
         
        </div>
        
            <div className={ad.data_row_box}>
              <div className={ad.input_box} >
              {anId}
              </div>
              <div className={ad.input_box}>{selectedAnalyze ? selectedAnalyze.uname : ""}</div>
              <div className={ad.input_box}>{selectedAnalyze ? selectedAnalyze.anPtDiagnosis : ""}</div>
              <div className={ad.input_box} style={{width:'150px'}}>{selectedAnalyze ? selectedAnalyze.anRegDate : ""}</div>
              <div className={ad.input_box } style={{width:'150px'}}>{adMdDate||"미배정"}</div>
              <div className={ad.input_box} style={{width:'150px'}}>
              {anAnswerDate||"미답변"}
              </div>
              <div className={ad.input_box} style={{borderRight:'none'}} >
              <select
                value={adProgressStatus || '분석의뢰중'}
                onChange={(e) => input_adProgressStatus(e)}
              >
                <option value="자문의뢰중">분석의뢰중</option>
                <option value="자문배정중">분석배정중</option>
                <option value="결제하기">결제하기</option>
                <option value="자문완료">자문완료</option>
              </select>
              </div>
             
              </div>
      </div>


      {/* <table className={ad.ad_table}>
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
              <td className={ad.ad_td}>{anId}</td>
              <td className={ad.ad_td}>{selectedAnalyze ? selectedAnalyze.uname : ""}</td>
              <td className={ad.ad_td}>{selectedAnalyze ? selectedAnalyze.anPtDiagnosis : ""}</td>
              <td className={ad.ad_td}>{selectedAnalyze ? selectedAnalyze.anRegDate : ""}</td>
              <td className={ad.ad_td}>{adMdDate||"미배정"}

</td>
<td className={ad.ad_td}>{anAnswerDate||"미답변"}</td>

              <td className={ad.ad_td}>
              <select
                  value={adProgressStatus || '분석의뢰중'}
                  onChange={(e) => input_adProgressStatus(e)}
                >
                  <option value="분석의뢰중">분석의뢰중</option>
                  <option value="분석배정중">분석배정중</option>
                  <option value="결제하기">결제하기</option>
                  <option value="분석완료">분석완료</option>
                </select>
              </td>
            </tr>
          
        </tbody>
      </table> */}

      <div className={ad.complete} style={{marginBottom:'100px'}}>
        <button className={ad.complete_button} onClick={btn_modify}>
          저장
        </button>
  
        <button className={ad.complete_button} onClick={btn_trans_list}>
          목록
        </button>
      </div>

    </div>
  );
}
