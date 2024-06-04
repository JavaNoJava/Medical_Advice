import mypage from '../css/Mypage.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConsultativeAssignmentCount(){
    
    const [conAdvice, setConAdvice] = useState(0)
    const [conAnalyze, setConAnalyze] = useState(0)
    const [conTranslate, setConTranslate] = useState(0)

    const navigate = useNavigate();
    const myAssignmentCount = async()=>{
        try{
            const ConAdvice = await axios.get('/consultative/myPage/assignedAdvice')
            setConAdvice(ConAdvice.data)
            const ConAnalysis = await axios.get('/consultative/myPage/assignedAnalyze')
            setConAnalyze(ConAnalysis.data)
            const ConTranslation = await axios.get('/consultative/myPage/assignedTranslate')
            setConTranslate(ConTranslation.data)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        myAssignmentCount();
    }, [])

    const btn_show_conAdvice = e => {
        navigate('/medic/consultative/assignmentAdviceList')
        
        
    }
    const btn_show_conAnalyze = e => {
        navigate('/medic/consultative/assignmentAnalyzeList')
    }

    const btn_show_conTranslate = e => {
        navigate('/medic/consultative/assignmentTranslateList')
    }

    return(
        <div className={mypage.mypage_requestcount_box}>
            <h2 className={mypage.mypage_requestcount_title}>나의 현황</h2>
            <div className={mypage.mypage_count_wrap}>
                <div className={mypage.mypage_countbox} onClick={btn_show_conAdvice}>
                    배정받은 자문의뢰 {conAdvice}건
                </div>
                <div className={mypage.mypage_countbox} onClick={btn_show_conAnalyze}>
                    배정받은 분석의뢰 {conAnalyze}건
                </div>
                <div className={mypage.mypage_countbox} onClick={btn_show_conTranslate}>
                    배정받은 번역의뢰 {conTranslate}건
                </div>
            </div>
        </div>
    )
}