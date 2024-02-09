import React, { useEffect, useState } from 'react';
import faq from '../../../css/Announcement.module.css'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash} from "@fortawesome/free-solid-svg-icons"

export default function FAQpage() {
  const [faqList, setFaqList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);

  const cookie = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const resp = await axios.get('/faq/list');
        const data = resp.data.reverse()
        setFaqList(data);
        if(cookie.get('uRole')== 'admin'){
          setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }
        console.log(resp);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    getAnnouncements();
  }, []); 

  const handleDeleteAnnounce = async (faqId) => {
    try {
      const confirmed = window.confirm('게시글을 삭제하시겠습니까?');
      const response = await axios.delete(`/faq/delete/${faqId}`);
      if (confirmed) {
        alert('게시글이 삭제되었습니다.');
      } else {
        
      }
    } catch (error) {
      console.error('게시글 삭제 오류', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  }

  
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleQuiryList = faqList.reverse().slice(startIndex, startIndex + itemsPerPage);

  
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(faqList.length / itemsPerPage);

    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const medicWrite = () => {
    
    navigate('/medic/customer/faqwrite');
  };

  const goToDetailPage = (faqId) => {
    const currentIndex = faqList.findIndex((faq) => faq.faqId === faqId);
    const previousFaq = faqList[currentIndex - 1];
    const nextFaq = faqList[currentIndex + 1];
  
    navigate('/medic/customer/faqdetail', {
      state: {
        faqdetail: faqList[currentIndex],
        faqId: faqId, 
        faq: faqList,
        previousFaq: previousFaq,
        nextFaq: nextFaq,
      },
    });
    console.log(faqList[faqId])
  };
  

  return (
    <div className={faq.wrap}>
      <div className={faq.announce_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          자주 묻는 질문
        </h1>
      </div>
     
      <div className={faq.announce_quirytable}>
        <div className={faq.announce_quirylist_titlebox}>
        

             <div className={`${faq.announce_list_no} ${faq.announce_list_title}`}>NO.</div>
              <div className={`${faq.announce_list_question} ${faq.announce_list_title}`}>질문</div>
              <div className={ `${faq.announce_list_writedate} ${faq.announce_list_title}`}>등록일</div>
              {isAdmin && (
               
               <div className={`${faq.announce_list_writedate} ${faq.announce_list_title}`}>
          삭제
      </div>
    
        )}
        
            </div>
        
          
          <div className={faq.announce_quirylist_listbox}>
              {visibleQuiryList?.map((list,index) => (
                <div key = {index} className={faq.announce_quirylist_content}>
                  <div className={`${faq.announce_quirylist_no} ${faq.announce_list_content}`} onClick={()=>goToDetailPage(list.faqId)} >
                    {list.faqId}
                </div>
                <div className={`${faq.announce_quirylist_question} ${faq.announce_list_content}`} >
                    {list.faqQuestion}
                </div>
                <div className={`${faq.announce_quirylist_writedate} ${faq.announce_list_content}`}>
                    {formatDateString(list.faqRegDate)}
                </div>
                {isAdmin && (
              <div className={`${faq.announce_quirylist_writedate} ${faq.announce_list_content}`} onClick={()=>handleDeleteAnnounce(list.faqId)}>
              <FontAwesomeIcon icon={faTrash}  />
              </div>
                )}
                </div>
              ))}
              </div>
              </div>

               <div className={faq.complete}>
            <button className={faq.btn_write_inquiry} onClick={medicWrite}>
                작성
            </button>
        </div>
        <div className={faq.pagination}>
            <button
            className={faq.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            ◀
            </button>
            {[...Array(Math.ceil(faqList.length / itemsPerPage))].map((_, index) => (
            <button
                key={index}
                className={faq.paginationButton}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
            >
                {index + 1}
        
            </button>
            ))}
            <button
            className={faq.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            >
            ▶
            </button>
        </div>
        </div>
    );
  }

         