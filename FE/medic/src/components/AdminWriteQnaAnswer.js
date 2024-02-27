import React, {useEffect, useState} from "react";
import customerinquirydetails from '../css/QnaDetails.module.css'
import writecustomerinquiry from '../css/WriteQna.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminQnaAnswer from "./AdminQnaAnswer";

export default function AdminWriteQnaAnswer({qaId, answer}) {
    const [qaAnswer, setQaAnswer] = useState("");
    const [isAnswer, setIsAnswer] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(answer){
            setQaAnswer(answer.qaAnswer)
        }
    }, [])
    const handleAnswerChange = (e) => {
        setQaAnswer(e.target.value);
      };
    const currentTimer = () => {
        const date = new Date();
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).slice(-2);;
        const day = String(date.getDate()).slice(-2);
        const today = year + '-' + month + '-' + day;
        return today
    };
      const btn_post_answer = async() => {
        const today = new Date()
        const Adminanswer = {
            'qaAnswer' : qaAnswer,
            'qaAnswerDate' : today
        }
        try{
          if(window.confirm('답변을 작성하시겠습니까?')){
            await axios.post(`/qna/writeAnswer/${qaId}`, Adminanswer)
            alert('작성되었습니다.')
          }
          setIsAnswer(true)
        } catch(err){
          console.log(err)
        }
      };
      const btn_update_answer = async() => {
        const today = new Date()
        const AdminUpdateAnswer = {
            'qaAnswer' : qaAnswer,
            'qaAnswerDate' : today
        }
        try{
            if(window.confirm('답변을 수정하시겠습니까?')){
              await axios.put(`/qna/modifyAnswer/${qaId}/${answer.qaAnswerId}`, AdminUpdateAnswer)
              alert('작성되었습니다.')
            }
            setIsAnswer(true)
          } catch(err){
            console.log(err)
          }
      }
      const btn_goto_inquirylist = e => {
        navigate('/medic/customer/customerInquiry')
      }
    return(
        <>
            {
                isAnswer ? <AdminQnaAnswer qaId={qaId}/> :
                <div className={customerinquirydetails.answerwrap}>
            <div className={writecustomerinquiry.inquiry_title}>
                <h1>
                    <i className="fa-solid fa-circle icon"></i>
                    문의답변
                </h1>
                </div>
                <div className={customerinquirydetails.answerContainer}>
                <textarea
                    className={customerinquirydetails.answerInput}
                    placeholder="답변을 작성하세요..."
                    value={qaAnswer}
                    onChange={handleAnswerChange}
                    cols={10}
                    rows={60}
                />
                <div className={customerinquirydetails.answerButton_wrap}>
                  <div className={customerinquirydetails.answerButtonbox}>
                      {
                          answer 
                          ? 
                          <button 
                          className={customerinquirydetails.answerButton}
                          onClick={btn_update_answer}
                          >
                          답변 수정
                          </button>
                          :
                          <button 
                          className={customerinquirydetails.answerButton}
                          onClick={btn_post_answer}
                          >
                          답변 등록
                          </button>
                      }
                      <button
                          className={customerinquirydetails.answerButton}
                          onClick={btn_goto_inquirylist}
                      >
                          목록
                      </button>
                  </div>
                </div>
              </div>
          </div>
            }
        </>
        
    )
}