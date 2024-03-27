import React, { useState, useEffect } from 'react';
import industrialwrite from '../../css/IndustrialAccidentWritepage.module.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export default function IndustrialAccidentWritepage() {
    const [timer, setTimer] = useState("");
    const [industrialWrite, setIndustrialWrite] = useState('')
    const [questionCount, setQuestionCount] = useState(0)
    const [writer, setWriter] = useState('');
    const [postTitle, setPostTitle] = useState('')

    const [indusId, setIndusId] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)

    const navigate = useNavigate();
    const cookie = new Cookies()
    const location = new useLocation()

    const handleIndustrialAccidentWriteChange = (e) => {
        const content = e.target.value;
        setIndustrialWrite(content);
        setQuestionCount(content.length);
    }

    useEffect(()=>{
        currentTimer();
    }, [])

    const getUpdateInfo = async() =>{
        if(location.state){
            setIndusId(location.state.IndustId)
            setIsUpdate(location.state.isUpdate)
            if(location.state.isUpdate){
                try{
                    const response = await axios.get(`/industrialAccident/detail/${location.state.IndustId}`)
                    setPostTitle(response.data.iaName)
                    setWriter(response.data.iaInstitution)
                    setIndustrialWrite(response.data.iaContent)
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
        const IndustrialAccidentInfo = {
            'iaName' : postTitle,
            'iaInstitution' : writer,
            'iaContent' : industrialWrite,
            'iaRegDate' : today,
        }
        try{
            const response = await axios.post('/industrialAccident/post', IndustrialAccidentInfo)
            navigate('/medic/medicalknowledge/industrialAccidentInfo');
        } catch(err){
            console.log(err)
        }
    };
    const btn_postlist = e => {
        navigate('/medic/medicalknowledge/industrialAccidentInfo')
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
            'iaName' : postTitle,
            'iaInstitution' : writer,
            'iaContent' : industrialWrite,
            'iaMdDate' : today,
        }
        try{
            if(window.confirm('수정하시겠습니까?')){
                const response = await axios.put(`/industrialAccident/modify/${indusId}`, upDatePost)
                alert('수정되었습니다.')
                navigate('/medic/medicalknowledge/industrialAccidentInfo')
            }
        } catch(err){
            console.log(err)
        }
    }
  return (
    <div className={industrialwrite.writeform}>
      <div className={industrialwrite.industrial_title}>
        <h2 className={industrialwrite.title}>
          산업재해 정보 작성
        </h2>
      </div>
      <div className={industrialwrite.write_table}>
        <div className={industrialwrite.row_box}>
            <div className={industrialwrite.title_box}>
                제목
            </div>
            <div className={industrialwrite.input_box} style={{width:'600px'}}>
                <input value={postTitle} className={industrialwrite.write_titleinput} onChange={input_postTitle}/>
            </div>
        </div>
        <div className={industrialwrite.row_box}>
            <div className={industrialwrite.title_box}>
                    기관명
            </div>
            <div className={industrialwrite.input_box} style={{width:'300px'}}>
                <input value = {writer} className={industrialwrite.write_titleinput} onChange={input_writer} style={{width:'250px'}}/>
            </div>
            <div className={industrialwrite.title_box} style={{borderLeft: '1px solid black'}}>
                작성일
            </div>
            <div value={timer} className={industrialwrite.input_box}  style={{width:'150px'}}>
                <span>{timer}</span>
            </div>
        </div>

        <div className={`${industrialwrite.row_box} ${industrialwrite.row_contentbox}`}>
            <div className={`${industrialwrite.title_box} ${industrialwrite.row_contentbox}`}>내용</div>
            <div className={industrialwrite.input_box} style={{width:'670px', height : '340px'}}>
                <textarea cols="50" rows="10" maxLength={300} value={industrialWrite} onChange={handleIndustrialAccidentWriteChange} style={{height: '300px'}}/>
                    <div className={industrialwrite.contentcount}>
                        <span>{questionCount}/300</span>
                    </div>         
            </div>
        </div>
      </div>
      <div className={industrialwrite.btn_writequestionbox}>
        {
            isUpdate ?
            <>
                <button className={industrialwrite.btn_writequestion} onClick={btn_updatePost}>수정</button>
                <button className={industrialwrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>
            
            :
            <>
                <button className={industrialwrite.btn_writequestion} onClick={btn_writePost}>작성</button>
                <button className={industrialwrite.btn_writequestion} onClick={btn_postlist}>목록</button>
            </>   
        }
      </div>
    </div>
  );
};


