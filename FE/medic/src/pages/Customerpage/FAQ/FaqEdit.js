import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from "axios";

export default function FaqEdit()  {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();
  const [faqDetail,setFaqDetail] = useState(location.state.faqDetail);
  const [isAdmin, setIsAdmin] = useState(false);
  const [faqAnswer , setFaqAnswer] = useState(faqDetail.faqAnswer);
  const [faqRegDate, setFaqRegDate] = useState(faqDetail.faqRegDate);
  const [faqMdDate, setFaqMdDate] = useState(faqDetail.faqMdDate);
  const [faqQuestion , setFaqQuestion] = useState(faqDetail.faqQuestion);
  const [faqId , setFaqId] = useState(location.state.faqId);
  const [timer, setTimer] = useState("");
  const [writer, setWriter] = useState('');

  useEffect(()=>{
    currentTimer();
    setWriter(cookie.get('uId'))
  })


  const currentTimer = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add padStart(2, '0') to ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Add padStart(2, '0') to ensure two digits
    const today = `${year}-${month}-${day}`;
    setTimer(today);
  };
  
console.log('ann',faqDetail)

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

  const btn_faq_modify = e => {
    if(window.confirm("수정하시겠습니까?")){
        e.preventDefault()
        const faqInfo = {
           'faqQuestion' : faqQuestion,
           'faqRegDate' : faqRegDate,
           'faqMdDate': formatDateString(new Date()),
           'faqAnswer' : faqAnswer
        } 
        faq_modify(faqInfo)
        console.log('faqfa',faqInfo);
    }
    
  }

  const faq_modify = async(faqInfo) => {
    const response = await axios.put(`/faq/modify/${faqId}`, faqInfo)
    console.log(response)
    if(response.data === 1){
        alert('정보수정이 완료되었습니다.')
        navigate('/medic/customer/FAQ')
    }
  }

  return (
    <>
        <div className={announcedetail.detailform}>
            <div className={announcedetail.inquiry_title}>
                <h2 className={announcedetail.title}>
                    자주 묻는 질문 수정
                </h2>
            </div>
        <div className={announcedetail.detail_table}>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} >
                    제목
                </div>
                <div className={announcedetail.detail_titleinputbox}>
                    <input type='text' value={faqQuestion} className={announcedetail.write_titleinput} onChange={e=>setFaqQuestion(e.target.value)}  style={{width:'800px'}}></input>
                </div>
            </div>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title} style={{width:'85px'}}>
                        작성자
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
        
                        {writer} 
                    </div>
                </div> 
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title} >
                        작성일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        
                       {formatDateString(faqRegDate)}
                    </div>
                </div>   
                 <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        수정일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                      {timer}
                    </div>
                  </div>  
            </div>

   <div className={`${announcedetail.write_rowbox} ${announcedetail.write_contentrowbox}`}>
  <div className={`${announcedetail.write_title} ${announcedetail.write_contentrowbox}`}>
   내용
  </div>
  <div className={announcedetail.input_box} style={{width:'670px', height : '300px'}}>
    <textarea
      value={faqAnswer}
      onChange={(e) => 
      setFaqAnswer(e.target.value)}
      className={announcedetail.write_content}
      style={{ height: '200px' , width:'400px' }}
      maxLength={300}
    ></textarea>
     <div className={announcedetail.contentcount}> 
    <span>/300</span>
    </div>
  </div>
</div>
        </div>
    <br></br>
    

        
        <div className={announcedetail.complete}>
          <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
            목록
          </button>
    
       
          <button type="button" onClick={btn_faq_modify} className={announcedetail.btt_write}>
            수정
          </button>
        </div>

      
        <div style={{marginBottom:'100px'}}></div>
        </div>
      
    </>
  );
};
