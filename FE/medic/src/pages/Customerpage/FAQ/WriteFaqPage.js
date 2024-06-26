import React, { useState, useEffect } from 'react';
import writeannoucement from '../../../css/WriteAnnouncement.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WriteFaqPage  ()  {
  const [timer, setTimer] = useState("");
  const [faq_titile, setFaqTitle] = useState('')
  const [faqAnswer, setFaqAnswer] = useState('')
  const [faqCount, setFaqContentCount] = useState(0)
  const [writer, setWriter] = useState('');
  

  const navigate = useNavigate();
  const cookie = new Cookies()
  useEffect(()=>{
    currentTimer();
    setWriter(cookie.get('uId'))
  }, [])

  const faqWrite = async()=> {
    const today = new Date();
    const FaqSituationDto = {
      'faqQuestion' : faq_titile,
      'faqRegDate' : today,
      'faqAnswer' : faqAnswer
    }
    try{
      if (faq_titile.trim() !== '' && faqAnswer.trim() !== '') {
        alert('작성되었습니다.')
        const response = axios.post(`/faq/post/${writer}`, FaqSituationDto)
        navigate('/medic/customer/FAQ');
      } else {
        alert('질문과 답변내용을 작성해주세요.')
      }

    } catch(err){
      console.log(err)
    }
  };

  const faqList = async()=>{
    navigate('/medic/customer/FAQ');  
  }



  const currentTimer = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).slice(-2);;
    const day = String(date.getDate()).slice(-2);
    const today = year + '-' + month + '-' + day;
    setTimer(today);    
  };
  const input_faq_titile = e => {
    setFaqTitle(e.target.value)
  } 

  return (
    <div className={writeannoucement.writeform}>
      <div className={writeannoucement.inquiry_title}>
        <h2 className={writeannoucement.title}>
            자주 묻는 질문 작성
        </h2>
      </div>
      <br/>

      <div className={writeannoucement.write_table}>
        <div className={writeannoucement.write_rowbox}>
          <div className={writeannoucement.write_title}>
            질문
            </div>
            <div className={writeannoucement.write_titleinputbox} style={{width:'600px'}}>
              <input className={writeannoucement.write_titleinput} onChange={input_faq_titile} ></input>
            </div>
          </div>

        <div className={writeannoucement.write_rowbox}>
            <div className={writeannoucement.write_title}>
            작성자
            </div>
            <div className={writeannoucement.input_box} style={{width:'300px'}}>
              {writer}
            </div>
        
        
          <div className={writeannoucement.write_title}  style={{borderLeft: '1px solid black'}}> 
              작성일
          </div>
          <div className={writeannoucement.input_box}  style={{width:'150px'}}>
            {timer}
          </div>
       

        </div>

        <div className={`${writeannoucement.write_rowbox} ${writeannoucement.write_contentrowbox}`} >
          <div className={`${writeannoucement.write_title} ${writeannoucement.write_contentrowbox}`}>
              답변내용 
          </div>
          <div className={writeannoucement.input_box} style={{width:'630px', height : '300px'}}>
          <textarea
          className={writeannoucement.write_content}
          cols="50"
          rows="10"
          onChange={e => {
            setFaqAnswer(e.target.value)
            setFaqContentCount(e.target.value.length)
          }} maxLength={500}
          >
          </textarea>
          <div className={writeannoucement.contentcount}>
            {faqCount}/500
          </div>
          </div>
        </div>
        

      </div>  


        <div className={writeannoucement.complete}>
          <button type="button" onClick={faqWrite} className={writeannoucement.btt_write}>작성</button>
          <button type="button" onClick={faqList} className={writeannoucement.btt_write}>목록</button>

        </div>
    </div>
  );
};


