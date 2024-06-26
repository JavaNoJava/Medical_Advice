import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Cookies } from 'react-cookie';

export default function FaqDetailPage()  {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();


  const [isAdmin, setIsAdmin] = useState(false);


  const faqId = location.state.faqId;
  const [faqDetail,setFaqDetail] = useState([]);


  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevFaqId, setPrevFaqId] = useState('');
  const [nextFaqId, setNextFaqId] = useState('');



  const getFaqDetail = async(faqId)=>{
    try {
        const response = await axios.get(`/faq/detail/${faqId}`);
        setFaqDetail(response.data);
        console.log(response.data)
    } catch (err) {
        console.log(err);
    }
}


useEffect(() => {
  const fetchData = async () => {
    const prev = await axios.get(`/faq/detail/prev/${faqId}`)
    const prevData = prev.data;
    console.log('prevData', prev)
    setPrevTitle(prevData.faqQuestion);
    setPrevFaqId(prevData.faqId);
 

    const next = await axios.get(`/faq/detail/next/${faqId}`)
    const nextData = next.data;
    console.log('nextData', next)
    setNextFaqId(nextData.faqId);
    setNextTitle(nextData.faqQuestion);
  
  };

  fetchData();
}, [faqId]);


useEffect( () => {

  
  getFaqDetail(faqId);
  if(cookie.get('uRole')== 'manager'){
    setIsAdmin(true)
  }else{
    setIsAdmin(false)
  }

}, []);

const formatDateString = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  } else {
    return dateString;
  }
};

const medicannounce = () => {
  navigate('/medic/customer/FAQ');
};

const editFaq = () => {
  navigate(`/medic/customre/faq/edit/${faqId}`,
  {state : {
    faqDetail : faqDetail,
    faqId : faqId
  }});
}

const nextDetailPage = async (nextFaqId) => {
  try {
    const response = await axios.get(`/faq/detail/${nextFaqId}`);
    navigate('/medic/customer/faqdetail', {
      state: {
        faqId: nextFaqId,
        faqdetail: response.data,
      },
    });
    window.location.reload()
  } catch (error) {
    console.log(error);
  }
};

const prevDetailPage = async (prevFaqId) => {
  try {
    const response = await axios.get(`/faq/detail/${prevFaqId}`);
    navigate('/medic/customer/faqdetail', {
      state: {
        faqId: prevFaqId,
        faqdetail: response.data,
      },
    });
    window.location.reload()
  } catch (error) {
    console.log(error);
  }
};


return (
  <div className={announcedetail.detailform}>
    <div className={announcedetail.inquiry_title}>
      <h2 className={announcedetail.title}>
        자주 묻는 질문 상세
      </h2>
    </div>
    <br />


    <div className={announcedetail.detail_table}>
          <div className={announcedetail.detail_rowbox}>
              <div className={announcedetail.detail_title} >
                  제목
              </div>
              <div className={announcedetail.detail_titleinputbox} style={{width:'300px'}}>
                  {faqDetail.faqQuestion}
              </div>
          </div>
          <div className={announcedetail.detail_rowbox}>
              <div className={announcedetail.detail_writerinfo}>
                  <div className={announcedetail.detail_title}  style={{width:'85px'}}>
                      작성자
                  </div>
                  <div className={announcedetail.detail_writerinfocontent}>
                      {faqDetail.mid}
                  </div>
              </div> 
              <div className={announcedetail.detail_writerinfo}>
                  <div className={announcedetail.detail_title}>
                      작성일
                  </div>
                  <div className={announcedetail.detail_writerinfocontent}>
                      {formatDateString(faqDetail.faqRegDate)}
                  </div>
              </div>   
              <div className={announcedetail.detail_writerinfo}>
                  <div className={announcedetail.detail_title}>
                      수정일
                  </div>
                  <div className={announcedetail.detail_writerinfocontent}>
                      {formatDateString(faqDetail.faqMdDate)}
                  </div>
              </div>  
          </div>
          <div className={`${announcedetail.detail_rowbox} ${announcedetail.detail_contentrowbox}`} style={{alignItems: 'start'}}>

              <div className={`${announcedetail.detail_contenttitle} ${announcedetail.detail_title}`}>
                내용
              </div>
              <div className={announcedetail.detail_content}  style={{width:'670px', height : '300px'}}>
              <textarea cols="50" rows="10" value={faqDetail.faqAnswer} readOnly/>
            
              </div>  
          </div>
      </div>


      <br></br>
  
      <div className={announcedetail.complete}>
        <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
          목록
        </button>


      {isAdmin &&(

      <button type="button" onClick={editFaq} className={announcedetail.btt_write}>수정</button>
  
    )}
  </div>
    <div className={announcedetail.preAndNext_table}>
<div className={announcedetail.preAndNext_row_box}>
<div className={announcedetail.preAndNext_title_box} >
  이전글
</div>
<div className={announcedetail.preAndNext_input_box} style={{width:'300px'}}>
  {prevTitle ? (
    <span onClick={() => prevDetailPage(prevFaqId)}>
      {prevTitle}
    </span>
  ) : (
    '이전 글이 없습니다.'
  )}
</div>
</div>
<div className={announcedetail.preAndNext_row_box}>
<div className={announcedetail.preAndNext_title_box} >
  다음글
</div>
<div className={announcedetail.preAndNext_input_box} style={{width:'300px'}}>
  {nextTitle ? (
    <span onClick={() => nextDetailPage(nextFaqId)}>
      {nextTitle}
    </span>
  ) : (
    '다음 글이 없습니다.'
  )}
</div>
</div>
</div>


<div style={{marginBottom:'100px'}}></div>
  </div>
);
};
