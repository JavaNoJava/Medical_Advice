import React, { useEffect, useState } from "react";
import trafficAccidentDetail from '../../css/TrafficAccidentDetailInfo.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function TrafficAccidentDetailInfopage(){
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = new Cookies();
  const trafficAccidentInfoId = location.state.trafficAccidentInfoId;   // 상세 게시글 번호 리스트

  const [prevNum, setPrevNum] = useState('');
  const [nextNum, setNextNum] = useState('');
  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [trafficAccidentInfoDetail, setTrafficAccidentInfoDetail] = useState([]);

  useEffect(() => {
    const getTrafficAccidentInfos = async (trafficAccidentInfoId) => {
        
      // 본문 게시물 내용 상세 조회
      const resp = await axios.get(`/trafficAccident/detail/${trafficAccidentInfoId}`);
      const data = resp.data;
      setTrafficAccidentInfoDetail(data);

      // 본문 게시물 이전글 정보 조회
      const prev = await axios.get(`/trafficAccident/detail/prev/${trafficAccidentInfoId}`)
      const prevData = prev.data;
      setPrevNum(prevData.prevNum); // 이전 글 번호 값
      setPrevTitle(prevData.prevTitle);

      // 본문 게시물 다음글 정보 조회
      const next = await axios.get(`/trafficAccident/detail/next/${trafficAccidentInfoId}`)
      const nextData = next.data;
      setNextNum(nextData.nextNum);  // 다음 글 번호 값
      setNextTitle(nextData.nextTitle);

      if(cookie.get('uRole') === 'manager'){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    };
    getTrafficAccidentInfos(trafficAccidentInfoId);

  }, [trafficAccidentInfoId]);

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
  const goToDetailPage = (trafficAccidentInfoId) => {
    if(!trafficAccidentInfoId || trafficAccidentInfoId === '0'){
      return;
    }
    navigate(`/medic/knowledge/trafficaccidentdetails`, {state : {
      trafficAccidentInfoId : trafficAccidentInfoId
    }});
  };

  const updateTrafficAccident = () => {
    navigate('/medic/medicalknowledge/trafficAccidentInfo/writetrafficAccident', {state : {
      taId : trafficAccidentInfoId,
      isUpdate : true
    }});
  };

  const deleteTrafficAccident = async(trafficAccidentInfoId)=> {

    const confirmed = window.confirm('삭제하시겠습니까?');

    if (confirmed) {
      const response = await axios.post(`/trafficAccident/delete/${trafficAccidentInfoId}`);
      // 삭제 응답에 따른 이동 여부 판단 로직 필요
      navigate('/medic/medicalknowledge/trafficAccidentInfo');
    } else {
      return
    }
  };

  const btn_trafficAccident_list = e => {
    navigate('/medic/medicalknowledge/trafficAccidentInfo');
  }

  return (
    <div className={trafficAccidentDetail.detailform}>
      <div className={trafficAccidentDetail.detail_title}>
        <h2 className={trafficAccidentDetail.title}>
          교통사고정보 상세 보기
        </h2>
      </div>
      
      {/* 게시글 */}
      <div className={trafficAccidentDetail.write_table}>
        <div className={trafficAccidentDetail.row_box}>
            <div className={trafficAccidentDetail.title_box}>
                제목
            </div>
            <div className={trafficAccidentDetail.input_box} style={{width:'600px'}}>
              <span>{trafficAccidentInfoDetail.taName}</span>
            </div>
        </div>
        <div className={trafficAccidentDetail.row_box}>
          <div className={trafficAccidentDetail.title_box}>
            기관명
          </div>
          <div className={trafficAccidentDetail.input_box} style={{width:'300px'}}>
            <span>{trafficAccidentInfoDetail.taInstitution}</span>
          </div>
          <div className={trafficAccidentDetail.title_box} style={{borderLeft: '1px solid black'}}>
            작성일
          </div>
          <div className={trafficAccidentDetail.input_box}  style={{width:'100px'}}>
            <span>{formatDateString(trafficAccidentInfoDetail.taRegDate)}</span>
          </div>
        </div>
        <div className={`${trafficAccidentDetail.row_box} ${trafficAccidentDetail.row_contentbox}`} style={{alignItems: 'start'}}>
                <div className={`${trafficAccidentDetail.title_box} ${trafficAccidentDetail.row_contentbox}`}>내용</div>
                <div className={trafficAccidentDetail.input_box} style={{width:'620px', height : '200px', justifyContent: 'start', alignItems: 'start', paddingLeft: '10px',paddingTop: '10px'}}>
                  <textarea cols="50" rows="10" value={trafficAccidentInfoDetail.taContent} readOnly disabled/>
                </div>
            </div>
      </div>

      <div className={trafficAccidentDetail.complete}>
          <button type="button" onClick={btn_trafficAccident_list} className={trafficAccidentDetail.btt_write}>
            목록
          </button>
          {isAdmin && (
            <button type="button" onClick={updateTrafficAccident} className={trafficAccidentDetail.btt_write}>
              수정
            </button>
          )}
          {isAdmin && (
            <button type="button" onClick={() => deleteTrafficAccident(trafficAccidentInfoId)} className={trafficAccidentDetail.btt_write}>
              삭제
            </button>
          )}
      </div>

      {/* 이전/다음 게시글 */}
      <div className={trafficAccidentDetail.preAndNext_table}>
        <div className={trafficAccidentDetail.preAndNext_row_box}>
          <div className={trafficAccidentDetail.preAndNext_title_box}>
            이전글
          </div>
          <div className={trafficAccidentDetail.preAndNext_input_box} style={{width:'300px'}} onClick={() => goToDetailPage(prevNum)}>
          {prevTitle != null ? (
            prevTitle.length > 15 ? `${prevTitle.slice(0, 15)}...` : prevTitle
          ) : (
            '이전 글이 없습니다.'
          )}
          </div>
        </div>
        <div className={trafficAccidentDetail.preAndNext_row_box}>
          <div className={trafficAccidentDetail.preAndNext_title_box}>
            다음글
          </div>
          <div className={trafficAccidentDetail.preAndNext_input_box} style={{width:'300px'}} onClick={() => goToDetailPage(nextNum)}>
          {nextTitle != null? (
            nextTitle.length > 15 ? `${nextTitle.slice(0, 15)}...` : nextTitle
          ) : (
                '다음 글이 없습니다.'
              )}
          </div>
        </div>
      </div> 
    </div>
  );
};