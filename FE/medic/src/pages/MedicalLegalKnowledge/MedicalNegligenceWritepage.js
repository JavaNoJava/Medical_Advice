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

    const handleMedicalNegligenceWriteChange = (e) => {
        const content = e.target.value;
        setMedicalNegligenceWrite(content);
        setQuestionCount(content.length);
    }

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
        <h2 className={MedicalNegligenceWrite.title}>
          의료과실 정보 작성
        </h2>
      </div>
        <div className={MedicalNegligenceWrite.write_table}>
            <div className={MedicalNegligenceWrite.row_box}>
                <div className={MedicalNegligenceWrite.title_box}>
                    제목
                </div>
                <div className={MedicalNegligenceWrite.input_box} style={{width:'600px'}}>
                    <input value = {postTitle} className={MedicalNegligenceWrite.write_titleinput} onChange={input_postTitle}/>
                </div>
            </div>

            <div className={MedicalNegligenceWrite.row_box}>
                <div className={MedicalNegligenceWrite.title_box}>
                    기관명
                </div>
                <div className={MedicalNegligenceWrite.input_box} style={{width:'300px'}}>
                    <input value = {writer} className={MedicalNegligenceWrite.write_titleinput} onChange={input_writer} style={{width:'250px'}}/>
                </div>
                <div className={MedicalNegligenceWrite.title_box} style={{borderLeft: '1px solid black'}}>
                    작성일
                </div>
                <div value={timer} className={MedicalNegligenceWrite.input_box}  style={{width:'150px'}}>
                    <span>{timer}</span>
                </div>
            </div>

            <div className={`${MedicalNegligenceWrite.row_box} ${MedicalNegligenceWrite.row_contentbox}`}>
                <div className={`${MedicalNegligenceWrite.title_box} ${MedicalNegligenceWrite.row_contentbox}`}>내용</div>
                <div className={MedicalNegligenceWrite.input_box} style={{width:'670px', height : '340px'}}>
                    <textarea cols="50" rows="10" maxLength={300} value={medicalNegligenceWrite} onChange={handleMedicalNegligenceWriteChange} style={{height: '300px'}}/>
                        <div className={MedicalNegligenceWrite.contentcount}>
                            <span>{questionCount}/300</span>
                        </div>
                </div>
            </div>
        </div>
        <div className={MedicalNegligenceWrite.btn_writequestionbox}>
            {isUpdate ? 
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


