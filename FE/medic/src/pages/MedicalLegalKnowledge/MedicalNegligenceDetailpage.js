import React, { useEffect, useState } from "react";
import medicalNegligencedetails from '../../css/MedicalNegligenceDetailpage.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function MedicalNegligenceDetailpage(){
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = new Cookies();
  const medicalNegligenceId = location.state.medicalNegligenceId;   // 상세 게시글 번호 리스트

  const [prevNum, setPrevNum] = useState('');
  const [nextNum, setNextNum] = useState('');
  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevWriter, setPrevWriter] = useState('');
  const [nextWriter, setNextWriter] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [medicalNegligenceDetail, setMedicalNegligenceDetail] = useState([]);

  useEffect(() => {
    const getMedicalNegligences = async (medicalNegligenceId) => {
        
      // 본문 게시물 내용 상세 조회
      const resp = await axios.get(`/medicalNegligence/detail/${medicalNegligenceId}`);
      const data = resp.data;
      setMedicalNegligenceDetail(data);
      console.log("본문 게시물 : {}", data)

      // 본문 게시물 이전글 정보 조회
      const prev = await axios.get(`/medicalNegligence/detail/prev/${medicalNegligenceId}`)
      const prevData = prev.data;
      setPrevNum(prevData.prevNum); // 이전 글 번호 값
      setPrevTitle(prevData.prevTitle);
      setPrevWriter(prevData.prevWriter);
      setPrevDate(prevData.prevDate);

      // 본문 게시물 다음글 정보 조회
      const next = await axios.get(`/medicalNegligence/detail/next/${medicalNegligenceId}`)
      const nextData = next.data;
      setNextNum(nextData.nextNum);  // 다음 글 번호 값
      setNextTitle(nextData.nextTitle);
      setNextWriter(nextData.nextWriter);
      setNextDate(nextData.nextDate);

      if(cookie.get('uRole') === 'manager'){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    };

    getMedicalNegligences(medicalNegligenceId);
  }, [medicalNegligenceId]);

  const formatDateString = (dateString) => {
    if(dateString === '-'){
      return '-';
    }
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  // 이전 또는 다음 글 이동
  // 이동할 글이 없으면 무반응
  const goToDetailPage = (medicalNegligenceId) => {
    if(medicalNegligenceId === '0'){
      return;
    }
    navigate(`/medic/medicalknowledge/medicalNegligence/medicalNegligencedetails`, {state : {
      medicalNegligenceId : medicalNegligenceId
    }});
  };

  const updateMedicalNegligence = () => {
    navigate('/medic/medicalknowledge/medicalNegligence/writemedicalNegligence', {state : {
      medicalNegligenceId : medicalNegligenceId,
      updateMedicalNegligence : true
    }});
  };
  
  const deleteMedicalNegligence = async(medicalNegligenceId)=> {
    const response = await axios.post(`/medicalNegligence/delete/${medicalNegligenceId}`);
    // 삭제 응답에 따른 이동 여부 판단 로직 필요
    navigate('/medic/medicalknowledge/medicalNegligence');
  };
 
  const btn_medicmedicalNegligence_list = e => {
    navigate('/medic/medicalknowledge/medicalNegligence');
  }
  return (
    <div className={medicalNegligencedetails.detailform}>
      <div className={medicalNegligencedetails.detail_title}>
        <h2 className={medicalNegligencedetails.title}>
          의료과실정보 상세 보기
        </h2>
      </div>

      {/* 게시글 */}
      <div className={medicalNegligencedetails.write_table}>
        <div className={medicalNegligencedetails.row_box}>
          <div className={medicalNegligencedetails.title_box}>
            기관명
          </div>
          <div className={medicalNegligencedetails.input_box} style={{width:'300px'}}>
            <span>{medicalNegligenceDetail.mnName}</span>
          </div>
          <div className={medicalNegligencedetails.title_box} style={{borderLeft: '1px solid black'}}>
            작성일
          </div>
          <div className={medicalNegligencedetails.input_box}  style={{width:'100px'}}>
            <span>{formatDateString(medicalNegligenceDetail.mnRegDate)}</span>
          </div>
        </div>
        <div className={`${medicalNegligencedetails.row_box} ${medicalNegligencedetails.row_contentbox}`}>
                <div className={`${medicalNegligencedetails.title_box} ${medicalNegligencedetails.row_contentbox}`}>내용</div>
                <div className={medicalNegligencedetails.content_box} style={{width:'730px', height : '330px', justifyContent: 'start'}}>
                  {medicalNegligenceDetail.mnContent}
                </div>
            </div>
      </div>

      <div className={medicalNegligencedetails.complete}>
          <button type="button" onClick={btn_medicmedicalNegligence_list} className={medicalNegligencedetails.btt_write}>
            목록
          </button>
          {isAdmin && (
            <button type="button" onClick={updateMedicalNegligence} className={medicalNegligencedetails.btt_write}>
              수정
            </button>
          )}
          {isAdmin && (
            <button type="button" onClick={() => deleteMedicalNegligence(medicalNegligenceId)} className={medicalNegligencedetails.btt_write}>
              삭제
            </button>
          )}
      </div>

      {/* 이전/다음 게시글 */}
      <div className={medicalNegligencedetails.preAndNext_table}>
        <div className={medicalNegligencedetails.preAndNext_row_box}>
          <div className={medicalNegligencedetails.preAndNext_title_box}>
            이전글
          </div>
          <div className={medicalNegligencedetails.preAndNext_input_box} style={{width:'300px'}} onClick={() => goToDetailPage(prevNum)}>
            <span>{prevTitle}</span>
          </div>
        </div>
        <div className={medicalNegligencedetails.preAndNext_row_box}>
          <div className={medicalNegligencedetails.preAndNext_title_box}>
            다음글
          </div>
          <div className={medicalNegligencedetails.preAndNext_input_box} style={{width:'300px'}} onClick={() => goToDetailPage(nextNum)}>
            <span>{nextTitle}</span>
          </div>
        </div>
      </div>

      
    </div>
  );
};