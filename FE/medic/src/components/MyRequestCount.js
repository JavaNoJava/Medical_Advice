import mypage from '../css/Mypage.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyRequestCount(){
    
    const navigate = useNavigate();
    const [myAdvice, setMyAdvice] = useState(0)
    const [myAnalysis, setMyAnalysis] = useState(0)
    const [myTranslation, setMyTranslation] = useState(0)
    const [myRequest, setMyRequset] = useState(0)

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

    return(
        <div className={mypage.mypage_requestcount_box}>
            <h2 className={mypage.mypage_requestcount_title}>나의 현황</h2>
            <div className={mypage.mypage_count_wrap}>
                <div className={mypage.mypage_countbox} onClick={btn_show_myAdvice}>
                    자문의뢰 {myAdvice}건
                </div>
                <div className={mypage.mypage_countbox} onClick={btn_show_myAnalysis}>
                    분석의뢰 {myAnalysis}건
                </div>
                <div className={mypage.mypage_countbox} onClick={btn_show_myTranslaion}>
                    번역의뢰 {myTranslation}건
                </div>
                <div className={mypage.mypage_countbox} onClick={btn_show_customerInquiry}>
                    고객문의 {myRequest}건
                </div>
            </div>
        </div>
    )
}