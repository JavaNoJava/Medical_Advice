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
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidInstitution, setIsValidInstitution] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const cookie = new Cookies()
    const location = useLocation();

    const handleTrafficAccidentWriteChange = (e) => {
        const content = e.target.value;
        setTrafficWrite(content);
        setQuestionCount(content.length);
    }

    useEffect(()=>{
        currentTimer();
    }, [])
    const getUpdateInfo = async() =>{
        if(location.state){
            setTaId(location.state.taId)
            setIsUpdate(location.state.isUpdate)
            if(location.state.isUpdate){
                try{
                    const response = await axios.get(`/trafficAccident/detail/${location.state.taId}`)
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
    useEffect(() => {
        if (errorMessage !== '') {
            alert(errorMessage);
        }
    }, [errorMessage]);
    const btn_writePost = async()=> {
        if (!postTitle.trim() || !writer.trim() || !trafficWrite.trim()) { //빈 문자열인 경우 저장 방지
            alert("모든 필드를 입력해주세요.");
            return;
        }
        if (!isValidTitle) { // 유효성 검사 결과를 확인
            alert("올바른 제목 형식이 아닙니다.");
            return;
        }
        if (!isValidInstitution) { // 기관명 유효성 검사 결과를 확인
            alert("올바른 기관명 형식이 아닙니다.");
            return;
        }
        const today = new Date();
        const TrafficAccidentInfo = {
            'taName' : postTitle,
            'taInstitution' : writer,
            'taContent' : trafficWrite,
            'taRegDate' : today,
        }
        try{
            const response = await axios.post('/trafficAccident/post', TrafficAccidentInfo)
            alert('작성되었습니다.')
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
        setIsValidTitle(true);
    }
    const valid_title = e => {
        const titleRegex = /^[a-zA-Z가-힣0-9\s]{1,30}$/;
        setIsValidTitle(titleRegex.test(e.target.value))
    }
    const input_writer = e => {
        setWriter(e.target.value)
        setIsValidInstitution(true);
    }
    const valid_institution = e => {
        const institutionRegex = /^[a-zA-Z가-힣0-9\s]{1,30}$/;
        setIsValidInstitution(institutionRegex.test(e.target.value))
    }
    const btn_updatePost = e=> {
        if (!postTitle.trim() || !writer.trim() || !trafficWrite.trim()) { //빈 문자열인 경우 저장 방지
            alert("모든 필드를 입력해주세요.");
            return;
        }
        if (!isValidTitle) { // 유효성 검사 결과를 확인
            alert("올바른 제목 형식이 아닙니다.");
            return;
        }
        if (!isValidInstitution) { // 기관명 유효성 검사 결과를 확인
            alert("올바른 기관명 형식이 아닙니다.");
            return;
        }
        const today = new Date();
        const upDatePost = {
            'taName' : postTitle,
            'taInstitution' : writer,
            'taContent' : trafficWrite,
            'taMdDate' : today,
        }
        try{
            if(window.confirm('수정하시겠습니까?')){
                const response = axios.put(`/trafficAccident/modify/${taId}`, upDatePost)
                alert('수정되었습니다.')
                navigate('/medic/medicalknowledge/trafficAccidentInfo')
            }
        } catch(err){
            console.log(err)
        }
    }
  return (
    <div className={faultinfowrite.writeform}>
      <div className={faultinfowrite.traffic_title}>
        <h2 className={faultinfowrite.title}>
          교통사고 정보 작성
        </h2>
      </div>
      <div className={faultinfowrite.write_table}>
        <div className={faultinfowrite.row_box}>
            <div className={faultinfowrite.title_box}>
                제목
            </div>
            <div className={faultinfowrite.input_box} style={{width:'600px'}}>
                <input value={postTitle} onBlur={valid_title} className={faultinfowrite.write_titleinput} onChange={input_postTitle}/>
                {!isValidTitle && <></>}
            </div>
        </div>

        <div className={faultinfowrite.row_box}>
            <div className={faultinfowrite.title_box}>
                기관명
            </div> 
            <div className={faultinfowrite.input_box} style={{width:'300px'}}>
                <input value = {writer} onBlur={valid_institution} className={faultinfowrite.write_titleinput} onChange={input_writer} style={{width:'250px'}}/>
                {!isValidInstitution && <></>}
            </div>
            <div className={faultinfowrite.title_box} style={{borderLeft: '1px solid black'}}>
                작성일
            </div>
            <div value={timer} className={faultinfowrite.input_box}  style={{width:'150px'}}>
                <span>{timer}</span>
            </div>
        </div>

        <div className={`${faultinfowrite.row_box} ${faultinfowrite.row_contentbox}`}>
            <div className={`${faultinfowrite.title_box} ${faultinfowrite.row_contentbox}`}>내용</div>
            <div className={faultinfowrite.input_box} style={{width:'620px', height : '250px'}}>
                <textarea cols="50" rows="10" maxLength={500} value={trafficWrite} onChange={handleTrafficAccidentWriteChange}/>
                    <div className={faultinfowrite.contentcount}>
                        <span>{questionCount}/500</span>
                    </div>
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


