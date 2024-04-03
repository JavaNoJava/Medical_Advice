import React, { useState, useEffect } from 'react';
import writeannoucement from '../../../css/WriteAnnouncement.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WriteAnnouncement()  {
  const [timer, setTimer] = useState("");
  const [annoucement_titile, setAnnouncementTitle] = useState('')
  const [amContent, setAmContent] = useState('')
  const [amContentcount, setAmContentcount] = useState(0)
  const [announceCount, setAnnounceCount] = useState(0)
  const [writer, setWriter] = useState('');

  const navigate = useNavigate();
  const cookie = new Cookies()
  useEffect(()=>{
    currentTimer();
    setWriter(cookie.get('uId'))
  }, [])

  const medicannounce = async()=> {
    const today = new Date();
    const AnnoucementInfo = {
      'amName' : annoucement_titile,
      'amRegDate' : today,
      'amContent' : amContent,
      'mId' : writer
    }
    try{
      const response = axios.post('/announcement/post', AnnoucementInfo)
      navigate('/medic/customer/announcement');
    } catch(err){
      console.log(err)
    }
  };

  const announce = () => {
    navigate('/medic/customer/announcement');
  };
  

  const currentTimer = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).slice(-2);;
    const day = String(date.getDate()).slice(-2);
    const today = year + '-' + month + '-' + day;
    setTimer(today);
  };
  const input_annoucement_titile = e => {
    setAnnouncementTitle(e.target.value)
  } 
  const input_am_Content= e => {
    setAmContent(e.target.value)
    setAmContentcount(e.target.value.length)
  }
  return (
    <div className={writeannoucement.writeform}>
      <div className={writeannoucement.inquiry_title}>
        <h2 className={writeannoucement.title}>
    
          공지사항 작성
        </h2>
      </div>
      <br/>

      <div className={writeannoucement.write_table}>
        <div className={writeannoucement.write_rowbox}>
          <div className={writeannoucement.write_title}>
            제목
            </div>
            <div className={writeannoucement.write_titleinputbox} style={{width:'600px'}}>
              <input className={writeannoucement.write_titleinput} onChange={input_annoucement_titile} ></input>
            </div>
          </div>
          
        <div className={writeannoucement.write_rowbox}>
            <div className={writeannoucement.write_title}>
            작성자
            </div>
            <div className={writeannoucement.input_box} style={{width:'300px'}} >
              {writer}
            </div>
         
          <div className={writeannoucement.write_title} style={{borderLeft: '1px solid black'}}> 
              작성일
          </div>
          <div className={writeannoucement.input_box} style={{width:'150px'}}>
            {timer}
          </div>
    
        </div>

        <div className={`${writeannoucement.write_rowbox} ${writeannoucement.write_contentrowbox}`}>
          <div className={`${writeannoucement.write_title} ${writeannoucement.write_contentrowbox}`}>
            내용
          </div>
          <div className={writeannoucement.input_box} style={{width:'670px', height : '300px'}}>
          <textarea
          cols="50"
          rows="500"
          className={writeannoucement.write_content}
          onChange={e => 
          {setAmContent(e.target.value)
          setAnnounceCount(e.target.value.length)}}
          maxLength={500}
        
            ></textarea>

          <div className={writeannoucement.contentcount}>
            {announceCount}/500
          </div>
        </div>
        </div>
        

      </div>  

      <div className={writeannoucement.complete}>
          <button className={writeannoucement.btt_write} onClick={medicannounce}>작성</button>
          <button className={writeannoucement.btt_write} onClick={announce}>목록</button>
      </div>
</div>


  );
};