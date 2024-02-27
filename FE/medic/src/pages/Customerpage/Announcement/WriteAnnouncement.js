import React, { useState, useEffect } from 'react';
import writeannoucement from '../../../css/WriteAnnouncement.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const WriteAnnouncement = () => {
  const [timer, setTimer] = useState("");
  const [annoucement_titile, setAnnouncementTitle] = useState('')
  const [amContent, setAmContent] = useState('')
  const [amContentcount, setAmContentcount] = useState(0)
  const [writer, setWriter] = useState('');

  const navigate = useNavigate();
  const cookie = new Cookies()
  useEffect(()=>{
    currentTimer();
    setWriter(cookie.get('uId'))
  }, [])

  const medicannounce = async()=> {
    const today = new Date();
    const AnnoucementInfo = {
      'amName' : annoucement_titile,
      'amRegDate' : today,
      'amContent' : amContent,
      'mId' : writer
    }
    try{
      const response = axios.post('/announcement/post', AnnoucementInfo)
      navigate('/medic/customer/announcement');
    } catch(err){
      console.log(err)
    }
  };

  const currentTimer = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).slice(-2);;
    const day = String(date.getDate()).slice(-2);
    const today = year + '-' + month + '-' + day;
    setTimer(today);
  };
  const input_annoucement_titile = e => {
    setAnnouncementTitle(e.target.value)
  } 
  const input_am_Content= e => {
    setAmContent(e.target.value)
    setAmContentcount(e.target.value.length)
  }
  return (
    <div className={writeannoucement.writeform}>
      <div className={writeannoucement.announce_title}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          공지사항 작성
        </h2>
      </div>
      <br/>
        <table className={writeannoucement.write_table}>
          <tbody>
            <tr>
              <th className={writeannoucement.write_th}>제목</th>
              <td className={writeannoucement.write_td} colSpan="3"><input type="text" name="subject" onChange={input_annoucement_titile} maxLength={50}/></td>
            </tr>
            <tr>
            <th className={writeannoucement.write_th}>작성자</th>
              <td className={writeannoucement.write_td}><input type="text" disabled={true} name="writer" value={writer} maxLength={20} width={900}/></td>
              <th className={writeannoucement.write_th}>등록일</th>
              <td className={writeannoucement.write_td}><input type="text" name="date" value={timer} readOnly /></td>
            </tr>
            <tr>
              <th className={writeannoucement.write_th}>내용</th>
              <td className={writeannoucement.write_td} colSpan="3">
                <textarea name="content" onChange={input_am_Content} maxLength={500}></textarea>
                <span>{amContentcount}/500</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={writeannoucement.complete}>
          <button type="button" onClick={medicannounce} className={writeannoucement.btt_write}>글쓰기 완료</button>
        </div>
    </div>
  );
};

export default WriteAnnouncement;
