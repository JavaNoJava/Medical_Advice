import React, { useState, useEffect } from 'react';
import MedicalNegligenceWrite from '../../css/MedicalNegligenceWritepage.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function MedicalNegligenceWritepage() {
    const [timer, setTimer] = useState("");
    const [medicalNegligenceWrite, setMedicalNegligenceWrite] = useState('')
    const [questionCount, setQuestionCount] = useState(0)
    const [writer, setWriter] = useState('');
    const [postTitle, setPostTitle] = useState('')

    const [medicalNegligenceId, setMedicalNegligenceId] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)

    const navigate = useNavigate();
    const cookie = new Cookies()
    const location = new useLocation()

    useEffect(()=>{
        currentTimer();
    }, [])
    const getUpdateInfo = async() =>{
        if(location.state){
            setMedicalNegligenceId(location.state.medicalNegligenceId)
            setIsUpdate(location.state.updateMedicalNegligence)
            if(location.state.updateMedicalNegligence){
                try{
                    const response = await axios.get(`/medicalNegligence/detail/${location.state.medicalNegligenceId}`)
                    console.log(response)
                    setPostTitle(response.data.mnName)
                    setWriter(response.data.mnInstitution)
                    setMedicalNegligenceWrite(response.data.mnContent)
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
        const medicalNegligence = {
            'mnName' : postTitle,
            'mnInstitution' : writer,
            'mnContent' : medicalNegligenceWrite,
            'mnRegDate' : today,
        }
        try{
            const response = await axios.post('/medicalNegligence/post', medicalNegligence)
            navigate('/medic/medicalknowledge/medicalNegligence');
        } catch(err){
            console.log(err)
        }
    };
    const btn_postlist = e => {
        navigate('/medic/medicalknowledge/medicalNegligence')
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

    const btn_updatePost = async() => {
        const today = new Date();
        const upDatePost = {
            'mnName' : postTitle,
            'mnInstitution' : writer,
            'mnContent' : medicalNegligenceWrite,
            'mnMdDate' : today,
        }
        try{
            if(window.confirm('수정하시겠습니까?')){
                const response = await axios.put(`/medicalNegligence/modify/${medicalNegligenceId}`, upDatePost)
                alert('수정되었습니다.')
                navigate('/medic/medicalknowledge/medicalNegligence')
            }
        } catch(err){
            console.log(err)
        }
    }
  return (
    <div className={MedicalNegligenceWrite.writeform}>
      <div className={MedicalNegligenceWrite.medicalNegligence_title}>
        <h1>
          <i className="fa-solid fa-circle icon"></i>
          의료과실 정보 작성
        </h1>
      </div>
      <div className={MedicalNegligenceWrite.write_table}>
        <div className={MedicalNegligenceWrite.write_rowbox}>
            <div className={MedicalNegligenceWrite.write_title}>
                제목
            </div>
            <div className={MedicalNegligenceWrite.write_titleinputbox}>
                <input value = {postTitle} className={MedicalNegligenceWrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>
        <div className={MedicalNegligenceWrite.write_rowbox}>
            <div className={MedicalNegligenceWrite.write_writerinfo}>
                <div className={MedicalNegligenceWrite.write_title}>
                    기관명
                </div>
                <div className={MedicalNegligenceWrite.write_writerinfocontent}>
                <input value={writer} className={MedicalNegligenceWrite.write_writerinputbox} onChange={input_writer}/>
                </div>
            </div> 
            <div className={MedicalNegligenceWrite.write_writerinfo}>
                <div className={MedicalNegligenceWrite.write_title}>
                    작성일
                </div>
                <div value={timer} className={MedicalNegligenceWrite.write_writerinfocontent}>
                    {timer}
                </div>
            </div>    
        </div>
        <div className={`${MedicalNegligenceWrite.write_rowbox} ${MedicalNegligenceWrite.write_contentrowbox}`}>
            <div className={`${MedicalNegligenceWrite.write_contenttitle} ${MedicalNegligenceWrite.write_title}`}>
                <h3 style={{paddingLeft: '20px'}}>내용</h3>
            </div>
            <textarea 
            className={MedicalNegligenceWrite.write_content} 
            cols={60} 
            rows={50} 
            value={medicalNegligenceWrite}
            onChange={e => {
                setMedicalNegligenceWrite(e.target.value)
                setQuestionCount(e.target.value.length)
                }} maxLength={300}></textarea>
            <div className={MedicalNegligenceWrite.contentcount}>
                {questionCount}/300
            </div>         
        </div>
      </div>
      <div className={MedicalNegligenceWrite.btn_writequestionbox}>
        {
            isUpdate ? 
            <>
                <button className={MedicalNegligenceWrite.btn_writequestion} onClick={btn_updatePost}>수정</button>
                <button className={MedicalNegligenceWrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
            
            :
            <>
                <button className={MedicalNegligenceWrite.btn_writequestion} onClick={btn_writePost}>작성</button>
                <button className={MedicalNegligenceWrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
            
        }
        
      </div>
    </div>
  );
};


