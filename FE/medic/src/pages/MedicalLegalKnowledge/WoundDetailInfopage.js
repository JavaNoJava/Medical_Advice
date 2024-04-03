import React, { useEffect, useState } from "react";
import woundAccidentDetail from '../../css/WoundAccidentInfoDetail.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WoundAccidentDetailInfopage(){
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = new Cookies();
  const woundInfoId = location.state.woundInfoId;   // 상세 게시글 번호 리스트

  const [prevNum, setPrevNum] = useState('');
  const [nextNum, setNextNum] = useState('');
  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevWriter, setPrevWriter] = useState('');
  const [nextWriter, setNextWriter] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [woundInfoDetail, setWoundInfoDetail] = useState([]);

  useEffect(() => {
    const getWoundInfos = async (woundInfoId) => {
        
        // 본문 게시물 내용 상세 조회
        const resp = await axios.get(`/woundInfo/detail/${woundInfoId}`);
        const data = resp.data;
        setWoundInfoDetail(data);
        console.log("본문 게시물 : {}", data)

        // 본문 게시물 이전글 정보 조회
        const prev = await axios.get(`/woundInfo/detail/prev/${woundInfoId}`)
        const prevData = prev.data;
        setPrevNum(prevData.prevNum); // 이전 글 번호 값
        setPrevTitle(prevData.prevTitle);
        setPrevWriter(prevData.prevWriter);
        setPrevDate(prevData.prevDate);

        // 본문 게시물 다음글 정보 조회
        const next = await axios.get(`/woundInfo/detail/next/${woundInfoId}`)
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
    getWoundInfos(woundInfoId);

  }, [woundInfoId]);

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
  const goToDetailPage = (woundInfoId) => {
    if(woundInfoId === '0'){
      return;
    }
    navigate(`/medic/knowledge/wounddetails`, {state : {
      woundInfoId : woundInfoId
    }});
  };

  const updateWound = () => {
    navigate('/medic/medicalknowledge/woundInfo/writewound', {state : {
      woId : woundInfoId,
      isUpdate : true
    }});
  };

  const deleteWound = async(woundInfoId)=> {
    const response = await axios.post(`/woundInfo/delete/${woundInfoId}`);
    // 삭제 응답에 따른 이동 여부 판단 로직 필요
    navigate('/medic/medicalknowledge/woundInfo');
  };

  const btn_wound_list = e => {
    navigate('/medic/medicalknowledge/woundInfo');
  }

  return (
    <div className={woundAccidentDetail.detailform}>
      <div className={woundAccidentDetail.detail_title}>
        <h2 className={woundAccidentDetail.title}>
          상해정보 상세보기
        </h2>
      </div>

      {/* 게시글 */}
      <div className={woundAccidentDetail.write_table}>
        <div className={woundAccidentDetail.row_box}>
            <div className={woundAccidentDetail.title_box}>
                제목
            </div>
            <div className={woundAccidentDetail.input_box} style={{width:'600px'}}>
              <span>{woundInfoDetail.woName}</span>
            </div>
        </div>
        <div className={woundAccidentDetail.row_box}>
          <div className={woundAccidentDetail.title_box}>
            기관명
          </div>
          <div className={woundAccidentDetail.input_box} style={{width:'300px'}}>
            <span>{woundInfoDetail.woInstitution}</span>
          </div>
          <div className={woundAccidentDetail.title_box} style={{borderLeft: '1px solid black'}}>
            작성일
          </div>
          <div className={woundAccidentDetail.input_box}  style={{width:'100px'}}>
            <span>{formatDateString(woundInfoDetail.woRegDate)}</span>
          </div>
        </div>
        <div className={`${woundAccidentDetail.row_box} ${woundAccidentDetail.row_contentbox}`} style={{alignItems: 'start'}}>
                <div className={`${woundAccidentDetail.title_box} ${woundAccidentDetail.row_contentbox}`}>내용</div>
                <div className={woundAccidentDetail.input_box} style={{width:'620px', height : '200px', justifyContent: 'start', alignItems: 'start', paddingLeft: '10px',paddingTop: '10px'}}>
                  <textarea cols="50" rows="10" value={woundInfoDetail.woContent} readOnly/>
                </div>
            </div>
      </div>

      <div className={woundAccidentDetail.complete}>
          <button type="button" onClick={btn_wound_list} className={woundAccidentDetail.btt_write}>
            목록
          </button>
          {isAdmin && (
            <button type="button" onClick={updateWound} className={woundAccidentDetail.btt_write}>
              수정
            </button>
          )}
          {isAdmin && (
            <button type="button" onClick={() => deleteWound(woundInfoId)} className={woundAccidentDetail.btt_write}>
              삭제
            </button>
          )}
      </div>

      {/* 이전/다음 게시글 */}
      <div className={woundAccidentDetail.preAndNext_table}>
        <div className={woundAccidentDetail.preAndNext_row_box}>
          <div className={woundAccidentDetail.preAndNext_title_box}>
            이전글
          </div>
          <div className={woundAccidentDetail.preAndNext_input_box} style={{width:'300px'}} onClick={() => goToDetailPage(prevNum)}>
            <span>{prevTitle}</span>
          </div>
        </div>
        <div className={woundAccidentDetail.preAndNext_row_box}>
          <div className={woundAccidentDetail.preAndNext_title_box}>
            다음글
          </div>
          <div className={woundAccidentDetail.preAndNext_input_box} style={{width:'300px'}} onClick={() => goToDetailPage(nextNum)}>
            <span>{nextTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};