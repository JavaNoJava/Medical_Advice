import React, { useState, useEffect } from 'react';
import writeannoucement from '../../../css/WriteQna.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WriteFaqPage  ()  {
  const [timer, setTimer] = useState("");
  const [faq_titile, setFaqTitle] = useState('')
  const [faqAnswer, setFaqAnswer] = useState('')
  const [faqCount, setFaqContentcount] = useState(0)
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
      console.log(FaqSituationDto)
      const response = axios.post(`/faq/post/${writer}`, FaqSituationDto)
      navigate('/medic/customer/FAQ');
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
  const input_faq_Answer= e => {
    setFaqAnswer(e.target.value)
    setFaqContentcount(e.target.value.length)
  }
  return (
    <div className={writeannoucement.writeform}>
      <div className={writeannoucement.inquiry_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
            자주 묻는 질문 작성
        </h2>
      </div>
      <br/>

      <div className={writeannoucement.write_table}>
        <div className={writeannoucement.write_rowbox}>
          <div className={writeannoucement.write_title}>
            질문
            </div>
            <div className={writeannoucement.write_titleinputbox}>
              <input className={writeannoucement.write_titleinput} onChange={input_faq_titile} ></input>
            </div>
          </div>
        <div className={writeannoucement.write_rowbox}>
          <div className={writeannoucement.write_writerinfo}>
            <div className={writeannoucement.write_title}>
            작성자
            </div>
            <div className={writeannoucement.write_writerinfocontent}>
              {writer}
            </div>
          </div>
          
          <div className={writeannoucement.write_writerinfo}>
          <div className={writeannoucement.write_title}> 
              작성일
          </div>
          <div className={writeannoucement.write_writerinfocontent}>
            {timer}
          </div>
          </div>

        </div>

        <div className={`${writeannoucement.write_rowbox} ${writeannoucement.write_contentrowbox}`}>
          <div className={`${writeannoucement.write_contenttitle} ${writeannoucement.write_title}`}>
              <h3 style={{paddingLeft:'20px'}}> 답변내용 </h3>
          </div>
          <textarea
          className={writeannoucement.write_content}
          cols={60}
          rows={50}
          onChange={e => {
            setFaqAnswer(e.target.value)
            setFaqContentcount(e.target.value.length)
          }} maxLength={300}
          >

          </textarea>
        </div>
        

      </div>  


        <div className={writeannoucement.btn_writequestionbox}>
          <button type="button" onClick={faqWrite} className={writeannoucement.btn_writequestion}>작성</button>
          <button type="button" onClick={faqList} className={writeannoucement.btn_writequestion}>목록</button>

        </div>
    </div>
  );
};


