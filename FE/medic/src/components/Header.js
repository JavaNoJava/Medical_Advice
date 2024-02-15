import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import navigator from '../css/Navigator.module.css';
import axios from "axios";
import { Cookies } from "react-cookie";

export default function Header({}) {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isSession, setIsSession] = useState();
    const [uRole, setURole] = useState(cookies.get('uRole'));
    const uId = cookies.get('uId')
    useEffect(() => {
        if(cookies.get('uId')){
            setIsSession(true)
        } else{
            setIsSession(false)
        }
    },[uId])

    useEffect(() => {
        setURole(cookies.get('uRole'));
    }, [cookies.get('uRole')]);

    const btn_program_Mainpage_view = e => {
        navigate('/')
    }
    const signin_text = (e) => {
        navigate('/mediclogin');
    }

    const signup_text = (e) => {
        navigate('/medicassign');
    }

    const signout_text = async () => {
        try {
            const response = await axios.get('/logout');
            if (response.status === 200) {
                alert('로그아웃 되었습니다.');
                cookies.remove('uId')
                cookies.remove('uRole')
                navigate('/');
            } else {
                alert('현재 로그인된 세션이 없습니다.');
            }
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    const btn_program_adviceRequest_view = (e) => {
        if(isSession){
            navigate('/medic/advice/adviceRequest')
        } else{
            alert('로그인 후 이용해주세요!')
            navigate('/mediclogin')
        }
    }

    const btn_program_adviceList_view = (e) => {
        if (isSession) {
            navigate('/medic/advice/adviceList');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_analyzeRequest_view = (e) => {
        if (isSession) {
            navigate('/medic/analyze/analyzeRequest');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_analyzeList_view = (e) => {
        if (isSession) {
            navigate('/medic/analyze/analyzeList');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_translateRequest_view = (e) => {
        if (isSession) {
            navigate('/medic/translate/translateRequest');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_translateList_view = (e) => {
        if (isSession) {
            navigate('/medic/translate/translateList');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_medicalNegligence_view = (e) => {
        if (isSession) {
            navigate('/medic/medicalknowledge/medicalNegligence');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_industrialAccidentInfo_view = (e) => {
        if (isSession) {
            navigate('/medic/medicalknowledge/industrialAccidentInfo');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_trafficAccidentInfo_view = (e) => {
        if (isSession) {
            navigate('/medic/medicalknowledge/trafficAccidentInfo');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_woundInfo_view = (e) => {
        if (isSession) {
            navigate('/medic/medicalknowledge/woundInfo');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_announcement_view = (e) => {
        if (isSession) {
            navigate('/medic/customer/announcement');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_customerInquiry_view = (e) => {
        if (isSession) {
            navigate('/medic/customer/customerInquiry');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_FAQ_view = (e) => {
        if (isSession) {
            navigate('/medic/customer/FAQ');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_myAdviceList_view = (e) => {
        if (isSession) {
            navigate('/medic/advice/adviceList');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_myAnalyzeList_view = (e) => {
        if (isSession) {
            navigate('/medic/analyze/analyzeList');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    
    const btn_program_myTranslateList_view = (e) => {
        if (isSession) {
            navigate('/medic/translate/translateList');
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    }
    const getAddress = (myInfo) => {
        if (myInfo) {
            const uAdd = myInfo.userAddress.split(' ');
            const cAdd = myInfo.cpAddress.split(' ');
            const cadd = myInfo.cAddress.split(' ');
            const hpadd = myInfo.hospAddress.split(' ');
            myInfo['zipcodeNum'] = uAdd[0]
            myInfo['zipCode'] = uAdd[1]
            myInfo['detailAddress'] = uAdd[2]
            myInfo['cpZipcodeNum'] = cAdd[0]
            myInfo['cpZipcode'] = cAdd[1]
            myInfo['detailCpAddress'] = cAdd[2]
            myInfo['cZipcodeNum'] = cadd[0]
            myInfo['cZipCode'] = cadd[1]
            myInfo['cDetailAddress'] = cadd[2]
            myInfo['hpZipcodeNum'] = hpadd[0]
            myInfo['hpZipcode'] = hpadd[1]
            myInfo['detailHpAddress'] = hpadd[2]
            
        }
    }
    const getMyInfo = async () => {
        try {
            const role = cookies.get('uRole');
            let endpoint = '/user/userInfoAll';
            if (role === 'docter') {
                endpoint = '/consultative/consultativeInfoAll';
            }
            const response = await axios.get(endpoint);
            const myInfo = response.data;
            getAddress(myInfo);
            console.log(myInfo);
            return myInfo;
        } catch (err) {
            console.log(err);
            return err;
        }
    };
    const btn_program_changeMemberInfo_view = async (e) => {
        if (isSession) {
            const myInfo = await getMyInfo();
            const role = cookies.get('uRole');
            let nextPage = '/medic/mypage/modifymyinfo';
    
            if (role === 'docter') {
                nextPage = '/medic/mypage/ChangeConsultativeInfo';
            }
            
            console.log(myInfo);
            navigate(nextPage, { state: { myInfo: myInfo } });
        } else {
            alert('로그인 후 이용해주세요!');
            navigate('/mediclogin');
        }
    };
    
    const btn_program_mypage_view = e => {
    if (isSession) {
        const role = cookies.get('uRole');
        if (role === 'docter') {
            navigate('/medic/consultativeMypage');
        } else {
            navigate('/medic/mypage');
        }
    } else {
        alert('로그인 후 이용해주세요!');
        navigate('/mediclogin');
    }
}
    
    return (
        <div className={navigator.main_header}>
        <div className={navigator.top_header}>
            <div className={navigator.mainlogo} onClick={btn_program_Mainpage_view}></div>
            <div className={navigator.user_sign}>
                {isSession ? (
                    <button className={`${navigator.signin_text} ${navigator.sign_text}`} name="signin_text" onClick={signout_text}>로그아웃</button>
                ) : (
                    <>
                        <button className={`${navigator.signin_text} ${navigator.sign_text}`} name="signin_text" onClick={signin_text}>로그인</button>
                        <button className={`${navigator.signup_text} ${navigator.sign_text}`} name="signup_text" onClick={signup_text}>회원가입</button>
                    </>
                )}
            </div>
        </div>
            <div className={navigator.navigator}>
            <ul className={navigator.menu} style={{marginLeft : 0}}>
                <li>
                    <button>의료자문</button>
                    <ul className={`${navigator.submenu}`}>
                        <li><span onClick={btn_program_adviceRequest_view}>의료자문신청</span></li>
                        <li><span onClick={btn_program_adviceList_view}>의료자문현황</span></li>
                    </ul>
                </li>
                <li>
                    <button>의료분석</button>
                    <ul className={`${navigator.submenu}`}>
                        <li><span onClick={btn_program_analyzeRequest_view}>의료분석신청</span></li>
                        <li><span onClick={btn_program_analyzeList_view}>의료분석현황</span></li>
                    </ul>
                </li>
                <li>
                    <button>의료번역</button>
                    <ul className={`${navigator.submenu}`}>
                        <li><span onClick={btn_program_translateRequest_view}>의료번역신청</span></li>
                        <li><span onClick={btn_program_translateList_view}>의료번역현황</span></li>
                    </ul>
                </li>
                <li>
                    <button>의료법률지식</button>
                    <ul className={`${navigator.submenu}`}>
                        <li><span onClick={btn_program_medicalNegligence_view}>의료과실 정보</span></li>
                        <li><span onClick={btn_program_industrialAccidentInfo_view}>산업재해 정보</span></li>
                        <li><span onClick={btn_program_trafficAccidentInfo_view}>교통사고 정보</span></li>
                        <li><span onClick={btn_program_woundInfo_view}>상해 정보</span></li>
                    </ul>
                </li>
                <li>
                    <button>고객지원</button>
                    <ul className={`${navigator.submenu}`}>
                        <li><span onClick={btn_program_announcement_view}>공지사항</span></li>
                        <li><span onClick={btn_program_customerInquiry_view}>고객문의</span></li>
                        <li><span onClick={btn_program_FAQ_view}>자주 묻는 질문</span></li>
                    </ul>
                </li>
                <li>
                    <button>마이페이지</button>
                    <ul className={`${navigator.submenu}`}>
                        <li><span onClick={btn_program_mypage_view}>마이페이지</span></li>
                        <li><span onClick={btn_program_myAdviceList_view}>나의 자문의뢰현황</span></li>
                        <li><span onClick={btn_program_myAnalyzeList_view}>나의 분석의뢰현황</span></li>
                        <li><span onClick={btn_program_myTranslateList_view}>나의 번역의뢰현황</span></li>
                        <li><span onClick={btn_program_changeMemberInfo_view}>회원정보변경</span></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
);
}