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
    const location = useLocation();
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
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          상해 정보 작성
        </h1>
      </div>
      <div className={woundwrite.write_table}>
        <div className={woundwrite.write_rowbox}>
            <div className={woundwrite.write_title}>
                제목
            </div>
            <div className={woundwrite.write_titleinputbox}>
                <input value={postTitle} className={woundwrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>
        <div className={woundwrite.write_rowbox}>
            <div className={woundwrite.write_writerinfo}>
                <div className={woundwrite.write_title}>
                    기관명
                </div>
                <div className={woundwrite.write_writerinfocontent}>
                <input value={writer} className={woundwrite.write_writerinputbox} onChange={input_writer}/>
                </div>
            </div> 
            <div className={woundwrite.write_writerinfo}>
                <div className={woundwrite.write_title}>
                    작성일
                </div>
                <div className={woundwrite.write_writerinfocontent}>
                    {timer}
                </div>
            </div>    
        </div>
        <div className={`${woundwrite.write_rowbox} ${woundwrite.write_contentrowbox}`}>
            <div className={`${woundwrite.write_contenttitle} ${woundwrite.write_title}`}>
                <h3 style={{paddingLeft: '20px'}}>내용</h3>
            </div>
            <textarea 
            className={woundwrite.write_content} 
            cols={60} 
            rows={50} 
            value={woundWrite}
            onChange={e => {
                setWoundWrite(e.target.value)
                setQuestionCount(e.target.value.length)
                }} maxLength={300}></textarea>
            <div className={woundwrite.contentcount}>
                {questionCount}/300
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


