import React, { useEffect, useState } from 'react';
import announcedetail from '../../../css/AnnouncementDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from "axios";

export default function AnnouncementDetail()  {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();
  const [isAdmin, setIsAdmin] = useState(false);
  const [announceDetail,setAnnounceDetail ] = useState(location.state.announceDetail);;
  const [announceDetail1,setAnnounceDetail1 ] = useState([]);
  const amId = location.state.amid;
  console.log(announceDetail)
  console.log('amId',amId)
  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevAnId, setPrevAnId] = useState('');
  const [nextAnId, setNextAnId] = useState('');


  const getAnnounceDetail = async(amId)=>{
    try {
        const response = await axios.get(`/announcement/detail/${amId}`);
        setAnnounceDetail1(response.data);
        console.log(response.data)
    } catch (err) {
        console.log(err);
    }
}

const editAnnouncement = () => {
  navigate(`/medic/customer/announcement/edit/${amId}`,
  {state : {
    announceDetail : announceDetail,
    amId : amId
  }});
}

useEffect(() => {
  getAnnounceDetail(amId)
  if(cookie.get('uRole')== 'manager'){
    setIsAdmin(true)
  }else{
    setIsAdmin(false)
  }

}, []);

useEffect(() => {
  const fetchData = async () => {
    const prev = await axios.get(`/announcement/detail/prev/${amId}`)
    const prevData = prev.data;
    console.log('prevData', prev)
    setPrevTitle(prevData.amName);
    setPrevAnId(prevData.amId);
 

    const next = await axios.get(`/announcement/detail/next/${amId}`)
    const nextData = next.data;
    console.log('nextData', next)
    setNextAnId(nextData.amId);
    setNextTitle(nextData.amName);
  
  };

  fetchData();
}, [amId]);

const nextDetailPage = async (nextAmId) => {
  try {
    const response = await axios.get(`/announcement/detail/${nextAnId}`);
    navigate('/medic/customer/announcement/announcementdetails', {
      state: {
        amid: nextAnId,
        announceDetail : response.data,
      },
    });
    window.location.reload()
  } catch (error) {
    console.log(error);
  }
};

const prevDetailPage = async (prevAmId) => {
  try {
    console.log('prevAnId', prevAnId)
    const response = await axios.get(`/announcement/detail/${prevAnId}`);
    navigate('/medic/customer/announcement/announcementdetails', {
      state: {
        amid: prevAnId,
        announceDetail : response.data,
      },
    });
    window.location.reload()
  } catch (error) {
    console.log(error);
  }
};



  const formatDateString = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;
    } else {
      return dateString;
    }
  };

  const medicannounce = () => {
    navigate('/medic/customer/announcement');
  };


  return (
    <>
        <div className={announcedetail.detailform}>
            <div className={announcedetail.inquiry_title}>
                <h2 className={announcedetail.title}>
                    공지사항 상세
                </h2>
            </div>

        <div className={announcedetail.detail_table}>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_title} >
                    제목
                </div>
                <div className={announcedetail.detail_titleinputbox} style={{width:'300px'}}>
                   <span> {announceDetail1.amName}</span>
                </div>
            </div>
            <div className={announcedetail.detail_rowbox}>
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title} style={{width:'85px'}}>
                        작성자
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {announceDetail1.mid}
                    </div>
                </div> 
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        작성일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {formatDateString(announceDetail1.amRegDate)}
                    </div>
                </div>   
                <div className={announcedetail.detail_writerinfo}>
                    <div className={announcedetail.detail_title}>
                        수정일
                    </div>
                    <div className={announcedetail.detail_writerinfocontent}>
                        {formatDateString(announceDetail1.amMdDate)}
                    </div>
                </div>  
            </div>
            <div className={`${announcedetail.detail_rowbox} ${announcedetail.detail_contentrowbox}`}>
                <div className={`${announcedetail.detail_contenttitle} ${announcedetail.detail_contentrowbox}`}>
                    내용
                </div>
                <div className={announcedetail.detail_content} style={{width:'730px', height : '330px', justifyContent: 'start'}} >
                    {announceDetail1.amContent}
                </div>  
            </div>
        </div>
    <br></br>

    <div className={announcedetail.complete}>
          <button type="button" onClick={medicannounce} className={announcedetail.btt_write}>
            목록
          </button>
        

        {isAdmin &&(

        <button type="button" onClick={editAnnouncement} className={announcedetail.btt_write}>수정</button>
      
      )}
      </div>
    
    <div className={announcedetail.preAndNext_table}>
    <div className={announcedetail.preAndNext_row_box}>
  <div className={announcedetail.preAndNext_title_box} >
    이전글
  </div>
  <div className={announcedetail.preAndNext_input_box} style={{width:'300px'}}>
  {prevTitle ? (
    <span onClick={() => prevDetailPage(prevAnId)}>
      {prevTitle}
    </span>
  ) : (
    '이전 글이 없습니다.'
  )}
  </div>
</div>
<div className={announcedetail.preAndNext_row_box}>
  <div className={announcedetail.preAndNext_title_box} >
    다음글
  </div>
  <div className={announcedetail.preAndNext_input_box} style={{width:'300px'}}>
  {nextTitle ? (
    <span onClick={() => nextDetailPage(nextAnId)}>
      {nextTitle}
    </span>
  ) : (
    '다음 글이 없습니다.'
  )}
  </div>
</div>
</div>

        


        </div>


    </>
  );
};

