import React, { useEffect, useState } from "react";
import administrator from '../../css/AdministratorMypage.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function AdministratorMypage() {
    const [userCount, setUserCount] = useState(0);
    const [consultativeCount, setConsultativeCount] = useState(0);
    const [qnaCount, setQnaCount] = useState(0);
    const [myAdvice, setMyAdvice] = useState(0)
    const [myanalysis, setMyAnalysis] = useState(0)
    const [faqCount,setFaqCount] = useState(0);
    const [announceCount,setAnnounceCount] = useState(0);
    const [myTranslation, setMyTranslation] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 추가
    const cookie = new Cookies();
    const navigate = useNavigate();

    const myRequestcount = async () => {
        try {
            const userResponse = await axios.get('/admin/userCount');
            setUserCount(userResponse.data);

            const consultativeResponse = await axios.get('/admin/consultativeCount');
            setConsultativeCount(consultativeResponse.data);

            const advice = await axios.get('/admin/adviceCount')
            setMyAdvice(advice.data)
            const Analysis = await axios.get('/admin/analyzeCount')
            setMyAnalysis(Analysis.data)
            const Translation = await axios.get('/admin/translateCount')
            setMyTranslation(Translation.data)
            
            const qnaResponse = await axios.get('/admin/qnaCount');
            setQnaCount(qnaResponse.data);

            const faqCount = await axios.get('/admin/faqCount');
            setFaqCount(faqCount.data);

            const announceCount = await axios.get('/admin/announceCount')
            setAnnounceCount(announceCount.data)
            if (cookie.get('uRole') === 'manager') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
                // 관리자가 아닌 경우 오류 페이지로 리디렉션
                navigate('/medic/adminstrator/error');
            }

        } catch (err) {
            console.error(err);
        }
    }

    const btn_show_doc = e => {
        navigate('/medic/adminstrator/docmanagement')
    }

    const btn_show_faq = e => {
        navigate('/medic/customer/FAQ')
    }

    const btn_show_announce = e => {
        navigate('/medic/customer/announcement')
    }
    
    const btn_show_user = e => {
        navigate('/medic/adminstrator/usermanagement')
    }

    const btn_show_advice = e => {
        navigate('/medic/adminstrator/adlist')
    }

    const btn_show_analyze = e => {
        navigate('/medic/adminstrator/anlist')
    }

    const btn_show_translate = e => {
        navigate('/medic/adminstrator/trlist')
    }
   
    const btn_show_qna = e => {
        navigate('/medic/customer/customerInquiry')
    }
    useEffect(() => {
        // 페이지가 마운트될 때 데이터를 가져오도록 useEffect를 사용
        myRequestcount();
    }, [])

    return (
        <div className={administrator.adminMypage_box}>
            <div className={administrator.adminMypage_requestcount_box}>
                <div className={administrator.adminMypage_count_wrap}>
                    <div className={administrator.adminMypage_countbox} onClick={btn_show_user}>
                        <h2 className={administrator.adminMypage_my_counttitle}>회원 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {userCount}명</h3>
                        </div>
                    </div>
                    <div className={administrator.adminMypage_countbox} onClick={btn_show_doc}>
                        <h2 className={administrator.adminMypage_my_counttitle}>전문의 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {consultativeCount}명</h3>
                        </div>
                    </div>
                </div>

                <div className={administrator.adminMypage_count_wrap}>
                    <div className={administrator.adminMypage_countbox} onClick={btn_show_advice}>
                        <h2 className={administrator.adminMypage_my_counttitle}>자문 현황 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {myAdvice} 건</h3>
                        </div>
                    </div>

                    <div className={administrator.adminMypage_countbox} onClick={btn_show_analyze}>
                        <h2 className={administrator.adminMypage_my_counttitle}>분석 현황 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {myanalysis}건</h3>
                        </div>
                    </div>
                    
                 
                </div>

                <div className={administrator.adminMypage_count_wrap}>
                <div className={administrator.adminMypage_countbox} onClick={btn_show_translate} >
                        <h2 className={administrator.adminMypage_my_counttitle}>번역 현황 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {myTranslation}명</h3>
                        </div>
                    </div>
                    <div className={administrator.adminMypage_countbox} onClick={btn_show_qna}>
                        <h2 className={administrator.adminMypage_my_counttitle}>Qna 관리</h2>
                        <div className= {administrator.adminMy_count}>
                            <h3>전체 {qnaCount} 건</h3>
                        </div>
                    </div>
            
                </div>

                   <div className={administrator.adminMypage_count_wrap}>
                    <div className={administrator.adminMypage_countbox} onClick={btn_show_faq}>
                        <h2 className={administrator.adminMypage_my_counttitle}>FAQ 관리</h2>
                        <div className={administrator.adminMy_count}>
                            <h3>전체 {faqCount} 건</h3>
                        </div>
                    </div>
                    <div className={administrator.adminMypage_countbox} onClick={btn_show_announce}>
                        <h2 className={administrator.adminMypage_my_counttitle}>공지사항 관리</h2>
                        <div className= {administrator.adminMy_count}>
                            <h3>전체 {announceCount} 건</h3>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
