import React, { useEffect, useState } from "react";
import cusinquiry from '../../css/Qnapage.module.css'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { Cookies } from "react-cookie";
import QaPasswordModal from "./Qna/QaPassordModal";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


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
// 비밀번호 확인 후 처리
const handlePasswordSubmit = async (qaPw) => {
    // 비밀번호를 서버로 전송하여 확인하고 처리하는 로직 추가
    const qaPassword = {
        qaPw: qaPw
    }
    try {
        const response = await axios.post(`/qna/checkPassword/${selectedQaId}`, qaPassword);
        if (response.data) {
            alert('확인되었습니다.');
            // 비밀번호가 일치할 때 페이지를 이동시키기 위해 navigate 함수를 호출
            navigate('/medic/customer/customerinquiry/customerinquirydetails', { state: { qaId: selectedQaId } });
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
    const btn_inquiryDetail = async (qaId) => {
        // 비밀글 여부를 확인하고 처리
        const inquiry = quiryList.find(item => item.qaId === qaId);
        if (inquiry.qaSecret && !isAdmin) {
          openPasswordModal(qaId); // 비밀글이면 비밀번호 입력 창 열기
          
        } else {
          // 
          navigate('/medic/customer/customerinquiry/customerinquirydetails', { state: { qaId: qaId } });
        }
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
        <div className={cusinquiry.announce_title}>
            <h2 className={cusinquiry.title}>
            고객문의
            </h2>
        </div>
        <div className={cusinquiry.announce_quirytable}>
            <div className={cusinquiry.announce_quirylist_titlebox}>
            <div className={`${cusinquiry.announce_list_no} ${cusinquiry.announce_list_title}`}>
                NO
            </div>
            <div className={`${cusinquiry.announce_list_question} ${cusinquiry.announce_list_title}`}>
                제목
            </div>
            <div className={`${cusinquiry.announce_list_writedate} ${cusinquiry.announce_list_title}`}>
                작성일
            </div>
            </div>
            <div className={cusinquiry.cusinquiry_quirylist_listbox}>
            {visibleQuiryList?.map((quiry, index) => (
                <div key={index} className={cusinquiry.announce_quirylist_content}>
                <div className={`${cusinquiry.announce_quirylist_no} ${cusinquiry.announce_list_content}`} onClick={()=>btn_inquiryDetail(quiry.qaId)}>
                    {quiryList.length - startIndex - index}
                </div>
                <>
                    
                    {
                        quiry.qaSecret && !isAdmin ? 
                        <div className={`${cusinquiry.announce_quirylist_question} ${cusinquiry.announce_list_content}`} /*onClick={()=>openPasswordModal(quiry.qaId)}*/>
                            <i className="fa-solid fa-lock" style={{fontSize : '16px'}}></i> {'비밀 게시글입니다.'}
                        </div>
                        : 
                        <div className={`${cusinquiry.announce_quirylist_question} ${cusinquiry.announce_list_content}`} >
                            {quiry.qaTitle}
                        </div>
                    }
                </>
               
                <div className={`${cusinquiry.announce_quirylist_writedate} ${cusinquiry.announce_list_content}`}>
                    {formatDateString(quiry.qaDate)}
                </div>
                </div>
            ))}
            </div>
        </div>
        <div className={cusinquiry.complete}>
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
            <FaChevronLeft />
            </button>
            {[...Array(Math.ceil(quiryList.length / itemsPerPage))].map((_, index) => (
            <button
                key={index}
                className={cusinquiry.paginationNumber}
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
             <FaChevronRight />
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