import React, { useEffect, useState } from "react";
import consultativeMypage from '../../css/ConsultativeMypage.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mypage(){
    const [conAdvice, setConAdvice] = useState(0)
    const [conAnalysis, setConAnalysis] = useState(0)
    const [conTranslation, setConTranslation] = useState(0)

    const navigate = useNavigate();
    const myAssignmentCount = async()=>{
        try{
            const ConAdvice = await axios.get('/consultative/myPage/assignedAdvice')
            setConAdvice(ConAdvice.data)
            const ConAnalysis = await axios.get('/consultative/myPage/assignedAnalyze')
            setConAnalysis(ConAnalysis.data)
            const ConTranslation = await axios.get('/consultative/myPage/assignedTranslate')
            setConTranslation(ConTranslation.data)
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
    const btn_show_conAnalysis = e => {
        navigate('/medic/consultative/assignmentAnalyzeList')
    }

    const btn_show_conTranslaion = e => {
        navigate('/medic/consultative/assignmentTranslateList')
    }
    return(
        <div className={consultativeMypage.consultativeMypage_box}>
            <div className={consultativeMypage.consultativeMypage_assignmentCount_box}>
                <div className={consultativeMypage.consultativeMypage_count_wrap}>
                    <div className={consultativeMypage.consultativeMypage_countbox} onClick={btn_show_conAdvice}>
                        <h2 className={consultativeMypage.count_counttitle}>배정받은 자문의뢰 현황</h2>
                        <div className={consultativeMypage.con_count}>
                            <h3>전체 {conAdvice}건</h3>
                        </div>
                    </div>
                    <div className={consultativeMypage.consultativeMypage_countbox} onClick={btn_show_conAnalysis}>
                        <h2 className={consultativeMypage.con_counttitle}>배정받은 분석의뢰 현황</h2>
                        <div className={consultativeMypage.my_count}>
                            <h3>전체 {conAnalysis}건</h3>
                        </div>
                    </div>
                </div>
                <div className={consultativeMypage.consultativeMypage_count_wrap}>
                    <div className={consultativeMypage.consultativeMypage_countbox} onClick={btn_show_conTranslaion}>
                        <h2 className={consultativeMypage.con_counttitle}>배정받은 번역의뢰 현황</h2>
                        <div className={consultativeMypage.con_count}>
                            <h3>전체 {conTranslation}건</h3>
                        </div>
                    </div>
                    <div className={consultativeMypage.consultativeMypage_countbox}>
                        <h2 className={consultativeMypage.con_counttitle}>나의 문의 현황</h2>                     
                        <div className={consultativeMypage.con_count}>
                            <h3>전체 0건</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}