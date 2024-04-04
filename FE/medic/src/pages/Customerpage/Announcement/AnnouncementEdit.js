import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from "axios";

export default function AnnouncementEdit()  {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();
  const [announceDetail,setAnnounceDetail] = useState(location.state.announceDetail);
  const [amContent , setAmContent] = useState(announceDetail.amContent);
  const [amRegDate, setAmRegDate] = useState(announceDetail.amRegDate);
  const [amMdDate, setAmMdDate] = useState(announceDetail.amMdDate);
  const [amName , setAmName] = useState(announceDetail.amName);
  const [amId , setAmId] = useState(location.state.amId);
  const [mId, setMid] = useState(announceDetail.mId);
  const [timer, setTimer] = useState("");
  const [writer, setWriter] = useState('');
  const [announceCount, setAnnouncecount] = useState(announceDetail.amContent.trim().length);

  useEffect(()=>{
    currentTimer();
    setWriter(cookie.get('uId'))
  })

  const input_amName = (e) =>{
    setAmName(e.target.value)
  }

  const input_amRegDate = (e) =>{
    setAmRegDate(e.target.value)
  }
  const input_amContent = (e) =>{
    setAmContent(e.target.value)
  }
  const input_amMdDate = (e)=>{
    setAmMdDate(e.target.value)
  }

  const currentTimer = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add padStart(2, '0') to ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Add padStart(2, '0') to ensure two digits
    const today = `${year}-${month}-${day}`;
    setTimer(today);
  };
  
console.log('ann',announceDetail)

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
    navigate('/medic/customer/announcement');
  };

  const btn_announce_modify = e => {
    if(window.confirm("수정하시겠습니까?")){
        e.preventDefault()
        const announceInfo = {
            'mId' : mId,
           'amName' : amName,
           'amRegDate' : amRegDate,
           'amMdDate': formatDateString(new Date()),
           'amContent' : amContent
        } 
        announce_modify(announceInfo)
    }
    
  }

  const announce_modify = async(announceInfo) => {
    console.log(2)
    const response = await axios.put(`/announcement/modify/${amId}`, announceInfo)
    console.log(response)
    if(response.data === 1){
        alert('정보수정이 완료되었습니다.')
        navigate('/medic/customer/announcement')
    }
  }

  return (
    <>
        <div className={announcedetail.detailform}>
            <div className={announcedetail.inquiry_title}>
                <h2 className={announcedetail.title}>
          
                    공지사항 수정
                </h2>
            </div>
        <div className={announcedetail.detail_table}>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} >
                    제목
                </div>
                <div className={announcedetail.detail_titleinputbox} style={{width:'300px'}}>
                    <input type='text' value={amName} className={announcedetail.write_titleinput} onChange={e=>input_amName(e)} ></input>
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
                        
                        {formatDateString(amRegDate)} 
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

  <div className={`${announcedetail.write_rowbox} ${announcedetail.write_contentrowbox}`}  style={{alignItems: 'start'}}>
  <div className={`${announcedetail.write_title} ${announcedetail.write_contentrowbox}`}>
    내용
  </div>
  <div className={announcedetail.detail_content} style={{width:'630px', height : '350px'}}>
    <textarea
    cols="50"
    rows="500"
      value={amContent}
      onChange={e =>{setAmContent(e.target.value)
        setAnnouncecount(e.target.value.length)} 
      }
      maxLength={500}
      // style={{ height: '200px' }}
      className={announcedetail.write_content}
    ></textarea>
    <div className={announcedetail.contentcount}> 
    {announceCount}/500
    </div>
  </div>
</div>
        </div>
    <br></br>
            
        <div className={announcedetail.complete}>
          <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
            목록
          </button>
        
        
          <button type="button" onClick={btn_announce_modify} className={announcedetail.btt_write}>
            수정
          </button>
        </div>

      
        <div style={{marginBottom:'100px'}}></div>
        </div>
      
    </>
  );
};
