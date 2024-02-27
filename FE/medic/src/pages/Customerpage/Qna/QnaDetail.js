import React, { useEffect, useState } from "react";
import axios from "axios";
import writecustomerinquiry from '../../../css/WriteQna.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import AdminQnaAnswer from '../../../components/AdminQnaAnswer.js'
import UserQnaAnswer from '../../../components/UserQnaAnswer.js'
import { Cookies } from "react-cookie";
import AdminWriteQnaAnswer from "../../../components/AdminWriteQnaAnswer.js";

export default function QnaDetail(){
    const [detaillist, setDetaillist] = useState({});
    const cookies = new Cookies()
    const navigate = useNavigate();
    const location = useLocation();
    const qaId = location.state.qaId
    const uRole = cookies.get('uRole')

    const [isManager, setIsManager] = useState(false)
    const [isWriteAnswer, setIsWriteAnswer] = useState(false)

    const getInquiryDetail = async()=>{
        try {
            const response = await axios.get(`/qna/detail/${qaId}`);
            setDetaillist(response.data);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        if(uRole ==='manager'){
            setIsManager(true)
        }else{
            setIsManager(false)
        }
    }, [])
    useEffect(()=>{
        if(location.state.isWriteAnswer){
            setIsWriteAnswer(location.state.isWriteAnswer)
        }
    }, [])
    useEffect(() => {
        getInquiryDetail()
    }, []);
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };
    return (
        <>
            <div className={writecustomerinquiry.writeform}>
                <div className={writecustomerinquiry.inquiry_title}>
                    <h1>
                        <i className="fa-solid fa-circle icon"></i>
                        문의사항
                    </h1>
                </div>
            <div className={writecustomerinquiry.write_table}>
                <div className={writecustomerinquiry.write_rowbox}>
                    <div className={writecustomerinquiry.write_title} style={{width : '96.5px'}}>
                        제목
                    </div>
                    <div className={writecustomerinquiry.write_titleinputbox}>
                        {detaillist.qaTitle}
                    </div>
                </div>
                <div className={writecustomerinquiry.write_rowbox}>
                    <div className={writecustomerinquiry.write_writerinfo}>
                        <div className={writecustomerinquiry.write_title}>
                            작성자
                        </div>
                        <div className={writecustomerinquiry.write_writerinfocontent}>
                            {detaillist.uid}
                        </div>
                    </div> 
                    <div className={writecustomerinquiry.write_writerinfo}>
                        <div className={writecustomerinquiry.write_title}>
                            작성일
                        </div>
                        <div className={writecustomerinquiry.write_writerinfocontent}>
                            {formatDateString(detaillist.qaDate)}
                        </div>
                    </div>     
                </div>
                <div className={`${writecustomerinquiry.write_rowbox} ${writecustomerinquiry.write_contentrowbox}`}>
                    <div className={`${writecustomerinquiry.write_contenttitle} ${writecustomerinquiry.write_title}`}>
                        <h3 style={{paddingLeft: '20px'}}>문의내용</h3>
                    </div>
                    <div className={writecustomerinquiry.write_content} >
                        {detaillist.qaQuestion}
                    </div>  
                </div>
            </div>
            </div>
            {
                <>
                {
                    isManager ?   isWriteAnswer ? 
                    <AdminWriteQnaAnswer qaId = {qaId}/>   
                    :          
                    <AdminQnaAnswer qaId = {qaId}/>                    
                    :
                    <UserQnaAnswer qaId = {qaId} QuestionInfo = {detaillist}/>
                }
                   
                </>
            }
        </>
      );
}