import React, { useEffect, useState } from "react";
import mypage from '../../css/Mypage.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function Mypage(){
    const [myAdvice, setMyAdvice] = useState(0)
    const [myanalysis, setMyAnalysis] = useState(0)
    const [myTranslation, setMyTranslation] = useState(0)
    const [myRequest, setMyRequset] = useState(0)
    const cookie = new Cookies();
    const navigate = useNavigate();
    
    const myRequestcount = async()=>{
        try{
            const advice = await axios.get('/user/myPage/myAdviceSituation')
            setMyAdvice(advice.data)
            const Analysis = await axios.get('/user/myPage/myAnalyzeSituation')
            setMyAnalysis(Analysis.data)
            const Translation = await axios.get('/user/myPage/myTranslateSituation')
            setMyTranslation(Translation.data)
            const CustomerInquiry = await axios.get(`/myPage/myQna`)
            setMyRequset(CustomerInquiry.data)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        myRequestcount();
    }, [])

    const btn_show_myAdvice = e => {
        navigate('/medic/advice/adviceList')
        
        
    }
    const btn_show_myAnalysis = e => {
        navigate('/medic/analyze/analyzeList')
    }

    const btn_show_myTranslaion = e => {
        navigate('/medic/translate/translateList')
    }
    const btn_show_customerInquiry = e => {
        navigate('/medic/customer/customerinquiry')
    }
    const btn_show_myInfo = e => {
        navigate('/medic/mypage/modifymyinfo')
    }
    return(
        <div className={mypage.mypage_box}>
            <div className={mypage.mypage_requestcount_box}>
                <div className={mypage.mypage_count_wrap}>
                    <div className={mypage.mypage_countbox} onClick={btn_show_myAdvice}>
                        <h2 className={mypage.my_counttitle}>나의 자문의뢰 현황</h2>
                        <div className={mypage.my_count}>
                            <h3>전체 {myAdvice}건</h3>
                        </div>
                    </div>
                    <div className={mypage.mypage_countbox} onClick={btn_show_myAnalysis}>
                        <h2 className={mypage.my_counttitle}>나의 분석의뢰 현황</h2>
                        <div className={mypage.my_count}>
                            <h3>전체 {myanalysis}건</h3>
                        </div>
                    </div>
                </div>
                <div className={mypage.mypage_count_wrap}>
                    <div className={mypage.mypage_countbox} onClick={btn_show_myTranslaion}>
                        <h2 className={mypage.my_counttitle}>나의 번역의뢰 현황</h2>
                        <div className={mypage.my_count}>
                            <h3>전체 {myTranslation}건</h3>
                        </div>
                    </div>
                    <div className={mypage.mypage_countbox} onClick={btn_show_customerInquiry}>
                        <h2 className={mypage.my_counttitle}>나의 문의 현황</h2>                     
                        <div className={mypage.my_count}>
                            <h3>전체 {myRequest}건</h3>
                        </div>
                    </div>
                </div>
            </div>
            <button className={mypage.mypage_modifymyinfo} onClick={btn_show_myInfo}>내 정보수정</button>
        </div>
    )
}