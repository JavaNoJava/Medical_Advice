import React, { useState, useEffect } from 'react';
import faultinfowrite from '../../css/TrafficAccidentWritepage.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function TrafficAccidentWritepage() {
    const [timer, setTimer] = useState("");
    const [trafficWrite, setTrafficWrite] = useState('')
    const [questionCount, setQuestionCount] = useState(0)
    const [writer, setWriter] = useState('');
    const [postTitle, setPostTitle] = useState('')

    const [taId, setTaId] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)

    const navigate = useNavigate();
    const cookie = new Cookies()
    const location = useLocation();

    useEffect(()=>{
        currentTimer();
    }, [])
    const getUpdateInfo = async() =>{
        if(location.state){
            setTaId(location.state.taId)
            setIsUpdate(location.state.isUpdate)
            if(location.state.isUpdate){
                try{
                    const response = await axios.get(`/find/tainfo/detail/${location.state.taId}`)
                    setPostTitle(response.data.taName)
                    setWriter(response.data.taInstitution)
                    setTrafficWrite(response.data.taContent)
                } catch(err){
                    console.log(err)
                }
            }
        }
    }
    
    useEffect(()=>{
        getUpdateInfo()
    },[])
    const btn_writePost = async()=> {
        const today = new Date();
        const TrafficAccidentInfo = {
            'taName' : postTitle,
            'taInstitution' : writer,
            'taContent' : trafficWrite,
            'taRegDate' : today,
        }
        try{
            const response = await axios.post('/post/tainfo', TrafficAccidentInfo)
            navigate('/medic/medicalknowledge/trafficAccidentInfo');
        } catch(err){
            console.log(err)
        }
    };
    const btn_postlist = e => {
        navigate('/medic/medicalknowledge/trafficAccidentInfo')
    }
    const currentTimer = () => {
        const date = new Date();
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).slice(-2);;
        const day = String(date.getDate()).slice(-2);
        const today = year + '-' + month + '-' + day;
        setTimer(today);
      };
    const input_postTitle = e => {
        setPostTitle(e.target.value)
    }
    const input_writer = e => {
        setWriter(e.target.value)
    }
    const btn_updatePost = e=> {
        const today = new Date();
        const upDatePost = {
            'taName' : postTitle,
            'taInstitution' : writer,
            'taContent' : trafficWrite,
            'taMdDate' : today,
        }
        try{
            if(window.confirm('수정하시겠습니까?')){
                const response = axios.put(`/update/tainfo/${taId}`, upDatePost)
                alert('수정되었습니다.')
                navigate('/medic/medicalknowledge/trafficAccidentInfo')
            }
        } catch(err){
            console.log(err)
        }
    }
  return (
    <div className={faultinfowrite.writeform}>
      <div className={faultinfowrite.fault_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          교통사고 정보 작성
        </h1>
      </div>
      <div className={faultinfowrite.write_table}>
        <div className={faultinfowrite.write_rowbox}>
            <div className={faultinfowrite.write_title}>
                제목
            </div>
            <div className={faultinfowrite.write_titleinputbox}>
                <input value={postTitle} className={faultinfowrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>
        <div className={faultinfowrite.write_rowbox}>
            <div className={faultinfowrite.write_writerinfo}>
                <div className={faultinfowrite.write_title}>
                    기관명
                </div>
                <div className={faultinfowrite.write_writerinfocontent}>
                <input value={writer} className={faultinfowrite.write_writerinputbox} onChange={input_writer}/>
                </div>
            </div> 
            <div className={faultinfowrite.write_writerinfo}>
                <div className={faultinfowrite.write_title}>
                    작성일
                </div>
                <div className={faultinfowrite.write_writerinfocontent}>
                    {timer}
                </div>
            </div>    
        </div>
        <div className={`${faultinfowrite.write_rowbox} ${faultinfowrite.write_contentrowbox}`}>
            <div className={`${faultinfowrite.write_contenttitle} ${faultinfowrite.write_title}`}>
                <h3 style={{paddingLeft: '20px'}}>내용</h3>
            </div>
            <textarea 
            className={faultinfowrite.write_content} 
            cols={60} 
            rows={50} 
            value={trafficWrite}
            onChange={e => {
                setTrafficWrite(e.target.value)
                setQuestionCount(e.target.value.length)
                }} maxLength={300}></textarea>
            <div className={faultinfowrite.contentcount}>
                {questionCount}/300
            </div>         
        </div>
      </div>
      <div className={faultinfowrite.btn_writequestionbox}>
        {
            isUpdate ?
            <>
                <button className={faultinfowrite.btn_writequestion} onClick={btn_updatePost}>수정</button>
                <button className={faultinfowrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
            :
            <>
                <button className={faultinfowrite.btn_writequestion} onClick={btn_writePost}>작성</button>
                <button className={faultinfowrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
        }
        
      </div>
    </div>
  );
};


