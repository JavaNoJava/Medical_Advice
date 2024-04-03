import React, { useEffect, useState } from "react";
import industrialAccidentDetail from '../../css/IndustrialAccidentInfoDetail.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function IndustrialAccidentDetailInfopage(){
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = new Cookies();
  const industrialAccidentInfoId = location.state.industrialAccidentInfoId;   // 상세 게시글 번호 리스트


  const [prevNum, setPrevNum] = useState('');
  const [nextNum, setNextNum] = useState('');
  const [prevTitle, setPrevTitle] = useState('');
  const [nextTitle, setNextTitle] = useState('');
  const [prevWriter, setPrevWriter] = useState('');
  const [nextWriter, setNextWriter] = useState('');
  const [prevDate, setPrevDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [industrialAccidentInfoDetail, setIndustrialAccidentInfoDetail] = useState([]);

  useEffect(() => {
    const getIndustrialAccidentInfos = async (industrialAccidentInfoId) => {
        
      // 본문 게시물 내용 상세 조회
      const resp = await axios.get(`/industrialAccident/detail/${industrialAccidentInfoId}`);
      const data = resp.data;
      setIndustrialAccidentInfoDetail(data);

      // 본문 게시물 이전글 정보 조회
      const prev = await axios.get(`/industrialAccident/detail/prev/${industrialAccidentInfoId}`)
      const prevData = prev.data;
      setPrevNum(prevData.prevNum); // 이전 글 번호 값
      setPrevTitle(prevData.prevTitle);
      setPrevWriter(prevData.prevWriter);
      setPrevDate(prevData.prevDate);

      // 본문 게시물 다음글 정보 조회
      const next = await axios.get(`/industrialAccident/detail/next/${industrialAccidentInfoId}`)
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
  getIndustrialAccidentInfos(industrialAccidentInfoId);
  }, [industrialAccidentInfoId]);

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
  const goToDetailPage = (industrialAccidentInfoId) => {
    if(industrialAccidentInfoId === '0'){
      return;
    }
    navigate(`/medic/knowledge/industrialaccidentdetails`, {state : {
      industrialAccidentInfoId : industrialAccidentInfoId
    }});
  };


  const udpateIndustrialAccident = () => {
    navigate('/medic/admin/knowledge/industrialAccidentInfo/writeindustrialaccident', {state : {
      IndustId : industrialAccidentInfoId,
      isUpdate : true
    }});
  };

  const deleteIndustrialAccident = async(industrialAccidentInfoId)=> {
    const response = await axios.post(`/industrialAccident/delete/${industrialAccidentInfoId}`);
    // 삭제 응답에 따른 이동 여부 판단 로직 필요
    navigate('/medic/medicalknowledge/industrialAccidentInfo');
  };

  const btn_industrialAccident_list = e => {
    navigate('/medic/medicalknowledge/industrialAccidentInfo');
  }

  return (
    <div className={industrialAccidentDetail.detailform}>
      <div className={industrialAccidentDetail.detail_title}>
        <h2 className={industrialAccidentDetail.title}>
          산업재해정보 상세 보기
        </h2>
      </div>

      {/* 게시글 */}
      <div className={industrialAccidentDetail.write_table}>
        <div className={industrialAccidentDetail.row_box}>
            <div className={industrialAccidentDetail.title_box}>
                제목
            </div>
            <div className={industrialAccidentDetail.input_box} style={{width:'600px'}}>
              <span>{industrialAccidentInfoDetail.iaName}</span>
            </div>
        </div>
        <div className={industrialAccidentDetail.row_box}>
          <div className={industrialAccidentDetail.title_box}>
            기관명
          </div>
          <div className={industrialAccidentDetail.input_box} style={{width:'300px'}}>
            <span>{industrialAccidentInfoDetail.iaInstitution}</span>
          </div>
          <div className={industrialAccidentDetail.title_box} style={{borderLeft: '1px solid black'}}>
            작성일
          </div>
          <div className={industrialAccidentDetail.input_box}  style={{width:'100px'}}>
            <span>{formatDateString(industrialAccidentInfoDetail.iaRegDate)}</span>
          </div>
        </div>
        <div className={`${industrialAccidentDetail.row_box} ${industrialAccidentDetail.row_contentbox}`}>
            <div className={`${industrialAccidentDetail.title_box} ${industrialAccidentDetail.row_contentbox}`}>내용</div>
            <div className={industrialAccidentDetail.input_box} style={{width:'620px', height : '200px', justifyContent: 'start',alignItems: 'flex-start' }}>
                {industrialAccidentInfoDetail.iaContent}
            </div>
        </div>
      </div>

      <div className={industrialAccidentDetail.complete}>
          <button type="button" onClick={btn_industrialAccident_list} className={industrialAccidentDetail.btt_write}>
            목록
          </button>
          {isAdmin && (
            <button type="button" onClick={udpateIndustrialAccident} className={industrialAccidentDetail.btt_write}>
              수정
            </button>
          )}
          {isAdmin && (
            <button type="button" onClick={() => deleteIndustrialAccident(industrialAccidentInfoId)} className={industrialAccidentDetail.btt_write}>
              삭제
            </button>
          )}
      </div>

      {/* 이전/다음 게시글 */}
      <div className={industrialAccidentDetail.preAndNext_table}>
        <div className={industrialAccidentDetail.preAndNext_row_box}>
          <div className={industrialAccidentDetail.preAndNext_title_box}>
            이전글
          </div>
          <div className={industrialAccidentDetail.preAndNext_input_box} style={{width:'300px'}} onClick={() => goToDetailPage(prevNum)}>
            <span>{prevTitle}</span>
          </div>
        </div>
        <div className={industrialAccidentDetail.preAndNext_row_box}>
          <div className={industrialAccidentDetail.preAndNext_title_box}>
            다음글
          </div>
          <div className={industrialAccidentDetail.preAndNext_input_box} style={{width:'300px'}} onClick={() => goToDetailPage(nextNum)}>
            <span>{nextTitle}</span>
          </div>
        </div>
      </div>

      
    </div>


    //   <form>
    //     <table className={industrialAccidentDetail.industrialaccidentdetail_table}>
    //       <tr>
    //         <th className={industrialAccidentDetail.industrialaccidentdetail_th}>제목</th>
    //         <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{industrialAccidentInfoDetail.iaName}</td>
    //         <th className={industrialAccidentDetail.industrialaccidentdetail_th}>등록일</th>
    //         <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{formatDateString(industrialAccidentInfoDetail.iaRegDate)}</td>
    //       </tr>
    //       <th className={industrialAccidentDetail.industrialaccidentdetail_th}>내용</th>
    //       <td colSpan="3" className={industrialAccidentDetail.industrialaccidentdetail_td}>
    //         <div className={industrialAccidentDetail.content}>{industrialAccidentInfoDetail.iaContent}</div>
    //       </td>
    //       <tr></tr>
    //     </table>
    //     <br />
    //     <div className={industrialAccidentDetail.secondTable}>
    //       <table className={industrialAccidentDetail.industrialaccidentdetail_table}>
    //         <tr onClick={() => goToDetailPage(prevNum)}>
    //           <th className={industrialAccidentDetail.industrialaccidentdetail_th}>이전글</th>
    //           <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{prevTitle}</td>
    //           <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{prevWriter}</td>
    //           <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{formatDateString(prevDate)}</td>
    //         </tr>
    //         <tr onClick={() => goToDetailPage(nextNum)}>
    //           <th className={industrialAccidentDetail.industrialaccidentdetail_th}>다음글</th>
    //           <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{nextTitle}</td>
    //           <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{nextWriter}</td>
    //           <td className={industrialAccidentDetail.industrialaccidentdetail_td}>{formatDateString(nextDate)}</td>
    //         </tr>
    //       </table>
    //     </div>
    //     <div className={industrialAccidentDetail.complete}>
    //       <button type="button" onClick={btn_industrialAccident_list} className={industrialAccidentDetail.btt_write}>
    //         목록
    //       </button>
    //       {isAdmin && (
    //         <button type="button" onClick={udpateIndustrialAccident} className={industrialAccidentDetail.btt_write}>
    //           수정
    //         </button>
    //       )}
    //       {isAdmin && (
    //         <button type="button" onClick={() => deleteIndustrialAccident(industrialAccidentInfoId)} className={industrialAccidentDetail.btt_write}>
    //           삭제
    //         </button>
    //       )}
    //     </div>
    //   </form>
    // </div>
  );
};