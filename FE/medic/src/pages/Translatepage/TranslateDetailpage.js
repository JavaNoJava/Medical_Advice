import React, { useState, useEffect } from 'react';
import translaterequest from '../../css/AdviceRequestpage.module.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function TranslateDetailpage(){
    const navigate = useNavigate();
    const [translateDetails, setTranslateDetails] = useState({});

    const {index} = useParams();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    const [trPtSsNum, setTrPtSsNum] = useState('');

    const [tr_etc_count, setTretccount] = useState(0)

    const [trMtl, setTrMtl] = useState(false);
    const [trAnswer, setTrAnswer] = useState(false)

    const getTranslateRequest = async() => {
        try{
            const response = await axios.get(`/user/translate/translateDetail/${index}`)
            setTranslateDetails(response.data);
            console.log(response.data)
            setTrPtSsNum(response.data.trPtSsNum);
            setTrMtl(()=>{
                if(response.data.trMtl === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setTrAnswer(()=>{
                if(response.data.trAnswer){
                    return true
                } else{
                    return false
                }
            })
    } catch(err){
        console.log(err)
    }  
}

    const getUserInfo = async() =>{
        try{
            const response = await axios.get('/user/userInfo')
            console.log(response.data)
            setUname(response.data.name)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(response.data.userAddress)
        } catch(err){
            console.log(err)
        }  
    }

    useEffect(()=>{
        getUserInfo()
        getTranslateRequest()
    }, [index])

    const btn_goto_list = () => {
        navigate('/medic/translate/translateList');
    }

    const btn_edit = () => {
        if (translateDetails.tamDate == null) {
            navigate(`/medic/translate/translateUpdate/${index}`);
        } else {
            alert("번역의뢰 신청이 전문의에게 배정된 이후로는 수정할 수 없습니다.")
        }
    }

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };


    return(
        <div className={translaterequest.advicerequest_wrap}>
            <div className={translaterequest.iconbox}>
                <h2 className={translaterequest.title}>
                    번역의뢰 상세페이지
                </h2>
                <h4>
                </h4>
            </div>
             <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    신청자 정보
                </h3>
             </div>
             <div className={translaterequest.request_usertable}>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>의뢰자명</div>
                    <div className={translaterequest.input_box}>
                        <span>{uname}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>일반전화</div>
                    <div className={translaterequest.input_box}>
                        <span>{utel}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>휴대전화</div>
                    <div className={translaterequest.input_box}>
                        <span>{uphone}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주소</div>
                    <div className={translaterequest.input_box}>
                        <span>{uaddress}</span>
                    </div>
                </div>
             </div>
             <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={translaterequest.request_patienttable2}>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>환자명</div>
                    <div className={translaterequest.input_box}>
                        <span>{translateDetails.trPtName}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주민등록번호</div>
                    <div className={translaterequest.input_box}>
                        <span>{translateDetails.trPtSsNum}</span>               
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>진단과목</div>
                    <div className={translaterequest.input_box}>
                        <span>{translateDetails.trPtSub}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>진단명</div>
                    <div className={translaterequest.input_box}>
                            <span>{translateDetails.trPtDiagnosis}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>
                            진단 사항
                    </div>
                    <div className={translaterequest.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={translateDetails.trPtDiagContent} readOnly/>
                    </div>
                </div>
            </div>
            <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    기타사항
                </h3>
            </div>
            <div className={translaterequest.request_othertable}>
                <div className={translaterequest.row_box} >
                    <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>
                        기타사항
                    </div>
                    <div className={translaterequest.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={translateDetails.trEtc} readOnly/>
                    </div>
                </div>
            </div>

            <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    첨부자료
                </h3>
            </div>
            <div className={translaterequest.file_table}>
                <div className={translaterequest.row_box} style={{height : 'auto'}}>
                    <div className={translaterequest.title_box}>
                        번역 요청자료
                    </div>
                    <div className={translaterequest.input_box}>
                        {
                            trMtl ?
                            <button>
                                <a
                                    href={`http://localhost:8080/translate/findFile/${index}`}
                                    download="adRecord.zip"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                {translateDetails.trProgressStatus === '번역완료' && (
                <div>
                <div className={translaterequest.row_box} style={{height : 'auto'}}>
                    <div className={translaterequest.title_box}>
                        번역 자료
                    </div>
                    <div className={translaterequest.input_box}>
                            <button>
                                <a
                                    href={`http://localhost:8080/assignedTranslate/findFile/${index}`}
                                    download="trAnswer.zip"
                                >
                                    다운로드
                                </a>
                            </button>
                    </div>
                </div>
                </div>
                )}
                <div className={translaterequest.complete}>
                    <button type="button" onClick={btn_goto_list} className={translaterequest.complete_button}>목록</button>
                    <button type="button" onClick={btn_edit} className={translaterequest.complete_button}>수정</button>
                </div>
            </div>
        </div>
    )
}