import React, {useEffect, useState} from "react";
import customerinquirydetails from '../css/QnaDetails.module.css'
import writecustomerinquiry from '../css/WriteQna.module.css';
import AdminWriteQnaAnswer from "./AdminWriteQnaAnswer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AdminQnaAnswer({qaId}) {
    const [answer, setAnswer] = useState("");
    const [isAnswer, setIsAnswer] = useState("")
    const [isWriteAnswer, setIsWriteAnswer] = useState(false)
    const [isUpdateAnswer, setIsUpdateAnswer] = useState(false)
    const [qaAnswerId, setQaAnswerId] = useState()
    const navigate = useNavigate();

    const getAnswer = async() => {
        try{
            const response = await axios.get(`/qna/findAnswer/${qaId}`)
            if(response.data){
              setAnswer(response.data)
              setQaAnswerId(response.data.qaAnswerId)
              setIsAnswer(false)
            }else{
              setIsAnswer(true)
            }
        } catch(err){
            console.log(err)
        }
    }
    const btn_write_answer = e => {
      setIsWriteAnswer(true)
    }
    const btn_update_answer = e => {
      setIsUpdateAnswer(true)
      setIsWriteAnswer(true)
    }
    const btn_delete_answer = async() => {
      try{
        if(window.confirm('답변을 삭제하시겠습니까?')){
          const response = await axios.delete(`/qna/deleteAnswer/${qaAnswerId}`)
          setAnswer('')
          getAnswer()
          alert('삭제되었습니다.')
        }
      } catch(err){
        console.log(err)
      }
    }
    useEffect(()=> {getAnswer()}, [])

      const btn_goto_inquirylist = e => {
        navigate('/medic/customer/customerInquiry')
      }
    return(
      <>
      {
        isWriteAnswer ? <AdminWriteQnaAnswer qaId={qaId} answer = {answer}/> : <div className={customerinquirydetails.answerwrap}>
        <div className={writecustomerinquiry.inquiry_title}>
            <h1>
                <i className="fa-solid fa-circle icon"></i>
                문의답변
            </h1>
            </div>
            <div className={customerinquirydetails.answerContainer}>
              <div className={customerinquirydetails.answertext}>{isAnswer ? '작성된 답변이 없습니다.' : answer.qaAnswer}</div>   
            </div>
              {
                
                answer.qaAnswer ? 
                <>
                <div className={customerinquirydetails.useranswerButtonbox}>
                  <button className={customerinquirydetails.answerButton} 
                    onClick={btn_update_answer}
                    >
                      답변수정
                    </button>
                    <button
                            className={customerinquirydetails.answerButton}
                            onClick={btn_goto_inquirylist}
                        >
                          목록
                    </button>
                    <button className={customerinquirydetails.answerButton} 
                    onClick={btn_delete_answer}
                    >
                      답변삭제
                    </button>
                  </div>
                  </>
                : 
                <>
                  <div className={writecustomerinquiry.btn_writequestionbox}>
                    <button className={customerinquirydetails.answerButton} 
                      onClick={btn_write_answer}
                      >
                        답변작성
                      </button>
                      <button
                              className={customerinquirydetails.answerButton}
                              onClick={btn_goto_inquirylist}
                          >
                            목록
                    </button>
                 </div>
                  
                  </>
              }
    </div>
      }
      </>
        
    )
}