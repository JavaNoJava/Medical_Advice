import React, {useEffect, useState} from "react";
import customerinquirydetails from '../css/QnaDetails.module.css'
import ad from '../css/AnnouncementDetail.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Cookies} from "react-cookie";

export default function UserQnaAnswer({qaId, QuestionInfo}) {
    const [answer, setAnswer] = useState("");
    const [isAnswer, setIsAnswer] = useState("")

    const navigate = useNavigate();
    const cookies = new Cookies();

    const getAnswer = async() => {
        try{
            const response = await axios.get(`/qna/findAnswer/${qaId}`)
            if(response.data){
              setAnswer(response.data)
              setIsAnswer(false)
            }else{
              setIsAnswer(true)
            }
        } catch(err){
            console.log(err)
        }
    }
    const getIsMyQuestion = () =>{
      if(cookies.get('uId') === QuestionInfo.uid){
        return true
      } else{
        return false
      }
    }
    useEffect(()=> {getAnswer()}, [])
    const btn_goto_inquirylist = e => {
      navigate('/medic/customer/customerInquiry')
    }
    const btn_update_myquestion = e => {
      navigate('/medic/customer/customerinquiry/writecustomerinquiry', {state : 
        {
          updateQuestion : true,
          qaId : qaId, 
          QuestionInfo: QuestionInfo
        }})
    }
    const btn_delete_myquestion = async(e) => {
      try{
        if(window.confirm("삭제하시겠습니까?")){
          const response = await axios.post(`/qna/delete/${qaId}`)
          alert('삭제되었습니다.')
          navigate('/medic/customer/customerInquiry')
        }
      }catch(err){
        console.log(err)
      }
    }
    return(
        <div className={ad.detailform} style={{marginTop:'50px'}}>
            <div className={ad.inquiry_title}>
                <h2 className={ad.title}>
                    문의답변
                </h2>
                </div>
                <div className={customerinquirydetails.answerContainer} >
                  <div className={customerinquirydetails.answertext}>{isAnswer ? '작성된 답변이 없습니다.' : 
                    <>
                      <textarea className={customerinquirydetails.answerbox} value={answer.qaAnswer}></textarea>
                    </>
                  }</div>   
                </div>
                <>
                  {
                    getIsMyQuestion() && isAnswer ? 
                    <div className={customerinquirydetails.useranswerButtonbox}>
                    <button
                          className={customerinquirydetails.answerButton}
                          onClick={btn_update_myquestion}
                      >
                          수정
                    </button>
                  <button
                          className={customerinquirydetails.answerButton}
                          onClick={btn_goto_inquirylist}
                      >
                          목록
                  </button>
                  <button
                          className={customerinquirydetails.answerButton}
                          onClick={btn_delete_myquestion}
                      >
                          삭제
                  </button>
                </div>
                :
                <div className={customerinquirydetails.useranswerButtonbox}>
                  <button
                          className={customerinquirydetails.answerButton}
                          onClick={btn_goto_inquirylist}
                      >
                          목록
                  </button>
                </div>
                  }
                </>             
        </div>
    )
}