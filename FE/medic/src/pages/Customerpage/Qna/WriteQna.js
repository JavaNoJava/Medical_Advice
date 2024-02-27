import React, { useState, useEffect } from 'react';
import writecustomerinquiry from '../../../css/WriteQna.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WriteQna() {
    const [timer, setTimer] = useState("");
    const [inquiryQuestion, setInquiryQuestion] = useState('')
    const [isSecret, setIsSecret] = useState(false)
    const [questionCount, setQuestioncount] = useState(0)
    const [writer, setWriter] = useState('');
    const [secretPw, setSecretPw] = useState('')
    const [inputTitle, setInputTitle] = useState('')
    const [isEmpty, setIsEmpty] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)
    const [qaId, setQaId] = useState(null)

    const navigate = useNavigate();
    const location = useLocation();
    //로컬스토리지 이용해서 수정
    useEffect(()=>{
        if(location.state){
            setIsUpdate(location.state.updateQuestion)
            setQaId(location.state.qaId)
            const QuestionInfo = location.state.QuestionInfo
            setInputTitle(QuestionInfo.qaTitle)
            setIsSecret(QuestionInfo.qaSecret)
            setSecretPw(QuestionInfo.qaPw)
            setInquiryQuestion(QuestionInfo.qaQuestion)
        }
    }, [])

    const cookie = new Cookies()
    useEffect(()=>{
        currentTimer();
        setWriter(cookie.get('uId'))
    }, [])

    useEffect(()=>{
        if(inputTitle && inquiryQuestion){
            setIsEmpty(false);
        } else{
            setIsEmpty(true);
        }
    },[inputTitle, inquiryQuestion])
    const btn_writequestion = async()=> {
        const today = new Date();
        const InquiryInfo = {
            'qaTitle' : inputTitle,
            'qaQuestion' : inquiryQuestion,
            'qaDate' : today,
            'qaSecret' : isSecret,
            'qaPw' : secretPw
        }
        try{
            await axios.post('/qna/post', InquiryInfo)
            alert('작성되었습니다.')
            navigate('/medic/customer/customerInquiry');
        } catch(err){
            console.log(err)
        }
    };
    const btn_questionlist = e => {
        navigate('/medic/customer/customerInquiry')
    }
    const currentTimer = () => {
        const date = new Date();
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).slice(-2);;
        const day = String(date.getDate()).slice(-2);
        const today = year + '-' + month + '-' + day;
        setTimer(today);
    };
    const input_questiontitle = e => {
        setInputTitle(e.target.value)
    }
    const btn_updatequestion = async(e) =>{
        const today = new Date()
        const updateqna = {
            'qaTitle' : inputTitle,
            'qaQuestion' : inquiryQuestion,
            'qaDate' : today,
            'qaSecret' : isSecret,
            'qaPw' : secretPw
        }
        try{
            await axios.put(`/qna/modify/${qaId}`, updateqna)
            alert('수정되었습니다.')
            navigate('/medic/customer/customerinquiry/')
        } catch(err){
            console.log(err)
        }
    }
  return (
    <div className={writecustomerinquiry.writeform}>
      <div className={writecustomerinquiry.inquiry_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          문의사항 작성
        </h1>
      </div>
      <div className={writecustomerinquiry.write_table}>
        <div className={writecustomerinquiry.write_rowbox}>
            <div className={writecustomerinquiry.write_title} style={{width : '96.5px'}}>
                제목
            </div>
            <div className={writecustomerinquiry.write_titleinputbox}>
                <input className={writecustomerinquiry.write_titleinput} value={inputTitle} onChange={input_questiontitle}/>
            </div>
        </div>
        <div className={writecustomerinquiry.write_rowbox}>
            <div className={writecustomerinquiry.write_writerinfo}>
                <div className={writecustomerinquiry.write_title}>
                    작성자
                </div>
                <div className={writecustomerinquiry.write_writerinfocontent}>
                    {writer}
                </div>
            </div> 
            <div className={writecustomerinquiry.write_writerinfo}>
                <div className={writecustomerinquiry.write_title}>
                    작성일
                </div>
                <div className={writecustomerinquiry.write_writerinfocontent}>
                    {timer}
                </div>
            </div> 
            <div className={writecustomerinquiry.write_writerinfo}>
                <div className={writecustomerinquiry.write_title}>
                    비밀글 여부
                </div>
                <div className={writecustomerinquiry.write_writerinfocontent} style={{paddingLeft : '5px'}}>
                    <input
                        type='checkbox'
                        checked = {isSecret}
                        onChange={e => {
                            setIsSecret(isSecret => !isSecret);
                            if (isSecret) {
                                setSecretPw('');
                            }
                        }}
                    />
                    <input
                        type='password'
                        maxLength={4}
                        disabled={!isSecret}
                        value={secretPw}
                        style={{
                            height : '20px',
                            width : '140px'
                        }}
                        onChange={e => {
                            if (!isSecret) {
                                e.target.value = ''; 
                            }
                            setSecretPw(e.target.value);
                        }}
                    />
                </div>
            </div>     
        </div>
        <div className={`${writecustomerinquiry.write_rowbox} ${writecustomerinquiry.write_contentrowbox}`}>
            <div className={`${writecustomerinquiry.write_contenttitle} ${writecustomerinquiry.write_title}`}>
                <h3 style={{paddingLeft: '20px'}}>문의내용</h3>
            </div>
            <div className={writecustomerinquiry.write_contentbox}>
                <textarea 
                className={writecustomerinquiry.write_content} 
                cols={60} 
                rows={50} 
                value={inquiryQuestion}
                onChange={e => {
                    setInquiryQuestion(e.target.value)
                    setQuestioncount(e.target.value.length)
                    }} maxLength={300}></textarea>
            </div>
            <div className={writecustomerinquiry.contentcount}>
                {questionCount}/300
            </div>   
        </div>
      </div>
      <div className={writecustomerinquiry.btn_writequestionbox}>
        {
            <>
            {
                isUpdate ?
                <button className={writecustomerinquiry.btn_writequestion} disabled={isEmpty} onClick={btn_updatequestion}>수정</button>
                :
                <button className={writecustomerinquiry.btn_writequestion} disabled={isEmpty} onClick={btn_writequestion}>작성</button>
            }
               
            </>
        }
        <button className={writecustomerinquiry.btn_writequestion} onClick={btn_questionlist}>목록</button>
      </div>
    </div>
  );
};


