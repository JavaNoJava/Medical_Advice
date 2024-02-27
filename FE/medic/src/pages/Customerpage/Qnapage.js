import React, { useEffect, useState } from "react";
import cusinquiry from '../../css/Qnapage.module.css'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { Cookies } from "react-cookie";
import QaPasswordModal from "./Qna/QaPassordModal";

export default function Qnapage(){
    const [quiryList, setQuiryList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [isAdmin, setIsAdmin] = useState(false);

    //비밀 게시글 검사
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [selectedQaId, setSelectedQaId] = useState(null);

    const itemsPerPage = 7;
    const startIndex = (currentPage - 1) * itemsPerPage;
    
    // 팝업 모달이 열릴 때와 닫힐 때의 동작을 유지하기 위해 역순으로 매핑
    const reverseQuiryList = [...quiryList].reverse();
    const visibleQuiryList = reverseQuiryList.slice(startIndex, startIndex + itemsPerPage);

    const navigate = useNavigate();
    const cookie = new Cookies();

    const uRole = cookie.get('uRole')
    const handlePageChange = (newPage) => {
      const totalPages = Math.ceil(quiryList.length / itemsPerPage);
  
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
    // 비밀번호 확인 모달을 열기
    const openPasswordModal = (qaId) => {
        setSelectedQaId(qaId);
        setIsPasswordModalOpen(true);
    };

    // 비밀번호 확인 모달을 닫기
    const closePasswordModal = () => {
        setSelectedQaId(null);
        setIsPasswordModalOpen(false);
    };

    // 비밀번호 확인 후 처리
    const handlePasswordSubmit = async (qaPw) => {
        // 비밀번호를 서버로 전송하여 확인하고 처리하는 로직 추가
        const qaPassword = {
            qaPw : qaPw
        }
        try {
            const response = await axios.post(`/qna/checkPassword/${selectedQaId}`, qaPassword);
            if (response.data) {
                alert('확인되었습니다.')
                btn_inquiryDetail(selectedQaId);
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('비밀번호 확인 중 에러:', error);
        }
    
        closePasswordModal(); // 비밀번호 확인 후 모달 닫기
    };

    const btn_write_inquiry = e => {
        navigate('/medic/customer/customerinquiry/writecustomerinquiry')
    }
    const btn_inquiryDetail = (qaId) => {
      navigate('/medic/customer/customerinquiry/customerinquirydetails', { state: { qaId: qaId } });
    };
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };
    useEffect(() => {
        async function getQnaAll(){
            try {
                const response = await axios.get('/qna/list');
                console.log(response.data)
                setQuiryList(response.data);
                if(cookie.get('uRole') == 'manager'){
                    setIsAdmin(true)
                } else{
                    setIsAdmin(false)
                }
              } catch (err) {
                console.log(err);
              }
        }
        getQnaAll(); 
    }, []);
    
    return (
        <div className={cusinquiry.wrap}>
        <div className={cusinquiry.cusinquiry_title}>
            <h1>
            <i className="fa-solid fa-circle icon"></i>
            고객문의
            </h1>
        </div>
        <div className={cusinquiry.cusinquiry_quirytable}>
            <div className={cusinquiry.cusinquiry_quirylist_titlebox}>
            <div className={`${cusinquiry.list_no} ${cusinquiry.list_title}`}>
                NO
            </div>
            <div className={`${cusinquiry.list_question} ${cusinquiry.list_title}`}>
                제목
            </div>
            <div className={`${cusinquiry.list_writedate} ${cusinquiry.list_title}`}>
                작성일
            </div>
            </div>
            <div className={cusinquiry.cusinquiry_quirylist_listbox}>
            {visibleQuiryList?.map((quiry, index) => (
                <div key={index} className={cusinquiry.cusinquiry_quirylist_content}>
                <div className={`${cusinquiry.quirylist_no} ${cusinquiry.list_content}`}>
                    {quiry.qaId}
                </div>
                <>
                    
                    {
                        quiry.qaSecret && !isAdmin ? 
                        <div className={`${cusinquiry.quirylist_question} ${cusinquiry.list_content}`} onClick={()=>openPasswordModal(quiry.qaId)}>
                            <i className="fa-solid fa-lock" style={{fontSize : '16px'}}></i> {'비밀 게시글입니다.'}
                        </div>
                        : 
                        <div className={`${cusinquiry.quirylist_question} ${cusinquiry.list_content}`} onClick={()=>btn_inquiryDetail(quiry.qaId)}>
                            {quiry.qaTitle}
                        </div>
                    }
                </>
               
                <div className={`${cusinquiry.quirylist_writedate} ${cusinquiry.list_content}`}>
                    {formatDateString(quiry.qaDate)}
                </div>
                </div>
            ))}
            </div>
        </div>
        <div className={cusinquiry.btn_write_inquirybox}>
                {
                    uRole === 'consultative' || uRole === 'manager'? 
                    <></>
                    :
                    <button className={cusinquiry.btn_write_inquiry} onClick={btn_write_inquiry}>
                            문의하기
                    </button>
                }
            
        </div>
        <div className={cusinquiry.pagination}>
            <button
            className={cusinquiry.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            ◀
            </button>
            {[...Array(Math.ceil(quiryList.length / itemsPerPage))].map((_, index) => (
            <button
                key={index}
                className={cusinquiry.paginationButton}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
            >
                {index + 1}
            </button>
            ))}
            <button
            className={cusinquiry.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            >
            ▶
            </button>
        </div>
        <QaPasswordModal
            isOpen={isPasswordModalOpen}
            onRequestClose={closePasswordModal}
            onPasswordSubmit={handlePasswordSubmit}
        />
        </div>
    );
}