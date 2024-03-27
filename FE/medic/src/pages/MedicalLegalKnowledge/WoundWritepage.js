import React, { useState, useEffect } from 'react';
import woundwrite from '../../css/WoundWritepage.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function WoundWritepage() {
    const [timer, setTimer] = useState("");
    const [woundWrite, setWoundWrite] = useState('')
    const [questionCount, setQuestionCount] = useState(0)
    const [writer, setWriter] = useState('');
    const [postTitle, setPostTitle] = useState('')
    
    const [woId, setWoId] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)

    const navigate = useNavigate();
    const cookie = new Cookies()
    const location = new useLocation();

    const handleWoundWriteChange = (e) => {
        const content = e.target.value;
        setWoundWrite(content);
        setQuestionCount(content.length);
    }

    useEffect(()=>{
        currentTimer();
    }, [])

    const getUpdateInfo = async() =>{
        if(location.state){
            setWoId(location.state.woId)
            setIsUpdate(location.state.isUpdate)
            if(location.state.isUpdate){
                try{
                    const response = await axios.get(`/woundInfo/detail/${location.state.woId}`)
                    setPostTitle(response.data.woName)
                    setWriter(response.data.woInstitution)
                    setWoundWrite(response.data.woContent)
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
        const WoundInfo = {
            'woName' : postTitle,
            'woInstitution' : writer,
            'woContent' : woundWrite,
            'woRegDate' : today,
        }
        try{
            const response = await axios.post('/woundInfo/post', WoundInfo)
            navigate('/medic/medicalknowledge/woundInfo');
        } catch(err){
            console.log(err)
        }
    };
    const btn_postlist = e => {
        navigate('/medic/medicalknowledge/woundInfo')
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
            'woName' : postTitle,
            'woInstitution' : writer,
            'woContent' : woundWrite,
            'woMdDate' : today,
        }
        try{
            if(window.confirm('수정하시겠습니까?')){
                const response = axios.put(`/woundInfo/modify/${woId}`, upDatePost)
                alert('수정되었습니다.')
                navigate('/medic/medicalknowledge/woundInfo')
            }
        } catch(err){
            console.log(err)
        }
    }
  return (
    <div className={woundwrite.writeform}>
      <div className={woundwrite.wound_title}>
        <h2 className={woundwrite.title}>
          상해 정보 작성
        </h2>
      </div>
      <div className={woundwrite.write_table}>
        <div className={woundwrite.row_box}>
            <div className={woundwrite.title_box}>
                제목
            </div>
            <div className={woundwrite.input_box} style={{width:'600px'}}>
            <input value = {postTitle} className={woundwrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>

        <div className={woundwrite.row_box}>
            <div className={woundwrite.title_box}>
                기관명
            </div>
            <div className={woundwrite.input_box} style={{width:'300px'}}>
                <input value = {writer} className={woundwrite.write_titleinput} onChange={input_writer} style={{width:'250px'}}/>
            </div>
            <div className={woundwrite.title_box} style={{borderLeft: '1px solid black'}}>
                작성일
            </div>
            <div value={timer} className={woundwrite.input_box}  style={{width:'150px'}}>
                <span>{timer}</span>
            </div>
        </div>

        <div className={`${woundwrite.row_box} ${woundwrite.row_contentbox}`}>
            <div className={`${woundwrite.title_box} ${woundwrite.row_contentbox}`}>내용</div>
            <div className={woundwrite.input_box} style={{width:'670px', height : '340px'}}>
                    <textarea cols="50" rows="10" maxLength={300} value={woundWrite} onChange={handleWoundWriteChange} style={{height: '300px'}}/>
                        <div className={woundwrite.contentcount}>
                            <span>{questionCount}/300</span>
                        </div>
                </div>
            </div>
      </div>
      <div className={woundwrite.btn_writequestionbox}>
        {
            isUpdate ?
            <>
                <button className={woundwrite.btn_writequestion} onClick={btn_updatePost}>수정</button>
                <button className={woundwrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
            :
            <>
                <button className={woundwrite.btn_writequestion} onClick={btn_writePost}>작성</button>
                <button className={woundwrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
        }
        
      </div>
    </div>
  );
};


