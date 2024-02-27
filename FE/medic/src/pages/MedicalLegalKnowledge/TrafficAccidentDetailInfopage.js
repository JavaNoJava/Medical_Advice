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
  const [prevWriter, setPrevWriter] = useState('');
  const [nextWriter, setNextWriter] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');
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
      setPrevWriter(prevData.prevWriter);
      setPrevDate(prevData.prevDate);

      // 본문 게시물 다음글 정보 조회
      const next = await axios.get(`/trafficAccident/detail/next/${trafficAccidentInfoId}`)
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
    if(trafficAccidentInfoId === '0'){
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
    const response = await axios.post(`/trafficAccident/delete/${trafficAccidentInfoId}`);
    // 삭제 응답에 따른 이동 여부 판단 로직 필요
    navigate('/medic/medicalknowledge/trafficAccidentInfo');
  };

  const btn_trafficAccident_list = e => {
    navigate('/medic/medicalknowledge/trafficAccidentInfo');
  }

  return (
    <div className={trafficAccidentDetail.detailform}>
      <div className={trafficAccidentDetail.detail_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          교통사고정보 상세 보기
        </h2>
      </div>
      <br />
      <form>
        <table className={trafficAccidentDetail.trafficaccidentdetail_table}>
          <tr>
            <th className={trafficAccidentDetail.trafficaccidentdetail_th}>제목</th>
            <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{trafficAccidentInfoDetail.taName}</td>
            <th className={trafficAccidentDetail.trafficaccidentdetail_th}>등록일</th>
            <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{formatDateString(trafficAccidentInfoDetail.taRegDate)}</td>
          </tr>
          <th className={trafficAccidentDetail.trafficaccidentdetail_th}>내용</th>
          <td colSpan="3" className={trafficAccidentDetail.trafficaccidentdetail_td}>
            <div className={trafficAccidentDetail.content}>{trafficAccidentInfoDetail.taContent}</div>
          </td>
          <tr></tr>
        </table>
        <br />
        <div className={trafficAccidentDetail.secondTable}>
          <table className={trafficAccidentDetail.trafficaccidentdetail_table}>
          <tr onClick={() => goToDetailPage(prevNum)}>
              <th className={trafficAccidentDetail.trafficaccidentdetail_th}>이전글</th>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{prevTitle}</td>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{prevWriter}</td>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{formatDateString(prevDate)}</td>
            </tr>
            <tr onClick={() => goToDetailPage(nextNum)}>
              <th className={trafficAccidentDetail.trafficaccidentdetail_th}>다음글</th>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{nextTitle}</td>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{nextWriter}</td>
              <td className={trafficAccidentDetail.trafficaccidentdetail_td}>{formatDateString(nextDate)}</td>
            </tr>
          </table>
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
      </form>
    </div>
  );
};