import React, { useState, useEffect } from 'react';
import assignmenttranslatedetail from '../../css/ConsultativeTranslateAssignmentDetailpage.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConsultativeTranslateAssignmentDetailpage(){
    const navigate = useNavigate();
  
    const {index} = useParams();
    
    const translateAnswer = new FormData();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [tr_ptname, setTrptname] = useState('')
    const [tr_ptssnum, setTrptssnum] = useState('');
    const [tr_ptsub, setTrptsub] = useState('');
    const [tr_ptdiagnosis, setTrptdiagnosis] = useState('')
    const [tr_ptdiagcontent, setTrptdiagcontent] = useState('')

    const [trProgressStatus, setTrProgressStatus] = useState(false)
   
    //기타사항
    const [trEtcValue, setTrEtcValue] = useState('');
    const allTranslateRequest = new FormData()

    //답변
    const [isAnswer, setIsAnswer] = useState(false)
    const [trAnswer, setTrAnswer] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)

    //번역요청파일
    const [trMtl, setTrMtl] = useState(false)

    const getUserInfo = async() =>{
        try{
            const response = await axios.get(`/consultative/assignedTranslate/detail/${index}`)
            console.log(response.data)
            setUname(response.data.uname)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(response.data.userAddress)
            setTrptname(response.data.trPtName)
            setTrptsub(response.data.trPtSub)
            setTrptdiagnosis(response.data.trPtDiagnosis)
            setTrptdiagcontent(response.data.trPtDiagContent)
            setTrEtcValue(response.data.trEtc)
            if(response.data.trProgressStatus === '결제하기'){
                setTrProgressStatus(true)
            } else{
                setTrProgressStatus(false)
            }

            setTrptssnum(response.data.trPtSsNum);

            setTrMtl(()=>{
                if(response.data.trMtl === "empty_file"){
                    return false
                } else{
                    return true
                }
            })

            setIsAnswer(()=>{
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

    useEffect(()=>{
        getUserInfo()
    }, [])

    const btn_translate_request = async() => {
        if (trAnswer === null || typeof trAnswer === 'undefined') {
            alert('입력값을 확인해주세요.');
            return;
        }
        const today = new Date()
        translateAnswer.append('files', trAnswer)  
        translateAnswer.append("dto", new Blob([JSON.stringify({
              "trAnswerDate" : today
        })], {type : "application/json"}))
        try{
            const maxSizeInBytes = 100 * 1024 * 1024
            if (translateAnswer.getAll('files').some(file => file.size > maxSizeInBytes)) {
                throw new Error('파일 크기가 너무 큽니다.')
            }
            const response = await axios.post(`/consultative/assignedTranslate/saveFile/${index}`, translateAnswer, {
                headers : {
                    "Content-Type" : 'multipart/form-data',
                },
            })
            alert('번역의뢰 답변이 저장되었습니다.')
            navigate('/')
        } catch(err){
            alert(err.message);
        }
    }
    const btn_translate_cancle = async() => {
        navigate('/')
    }

    const btn_modify_trAnswer = e => {
        if(window.confirm('수정하시겠습니까?')){
            setIsAnswer(false)
            setTrAnswer(null)
            setIsUpdate(true)
        }
    }
    const btn_translate_update = async() => {
        if (trAnswer === null || typeof trAnswer === 'undefined') {
            alert('입력값을 확인해주세요.');
            return;
        }
        const today = new Date()
        translateAnswer.append('files', trAnswer)  
        translateAnswer.append("dto", new Blob([JSON.stringify({
            "trAnswerDate" : today
        })], {type : "application/json"}))
        try{
            const maxSizeInBytes = 100 * 1024 * 1024
            if (translateAnswer.getAll('files').some(file => file.size > maxSizeInBytes)) {
                throw new Error('파일 크기가 너무 큽니다.')
            }
            const response = await axios.put(`/consultative/assignedTranslate/updateFile/${index}`, translateAnswer, {
                headers : {
                    "Content-Type" : 'multipart/form-data',
                },
            })
            alert('번역의뢰 답변이 수정되었습니다.')
            navigate('/')
        } catch(err){
            alert(err.message);
        }
    }
    return(
        <div className={assignmenttranslatedetail.translaterequest_wrap}>
            <div className={assignmenttranslatedetail.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    번역의뢰 답변
                </h2>
                - 분석의뢰 질문에 대한 답변을 모두 입력해주세요.
             </div>
             <div className={assignmenttranslatedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={assignmenttranslatedetail.request_usertable}>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>의뢰자명</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <input type="text" disabled={true} value={uname}/>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>일반전화</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <input type="text" disabled={true} value={utel}/>
                    </div>
                    <div className={assignmenttranslatedetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <input type="text" disabled={true} value={uphone}/>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>주소</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <input type="text" disabled={true} value={uaddress}/>
                    </div>
                </div>
             </div>
             <div className={assignmenttranslatedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={assignmenttranslatedetail.request_patienttable}>
                <div className={`${assignmenttranslatedetail.row_box} ${assignmenttranslatedetail.patient_box}`}>
                    <div className={`${assignmenttranslatedetail.title_box} ${assignmenttranslatedetail.patient_box}`}>환자명</div>
                    <div className={`${assignmenttranslatedetail.input_box} ${assignmenttranslatedetail.patient_box}`}>
                        <input type="text" disabled={true} value={tr_ptname}></input>
                    </div>
                    <div className={`${assignmenttranslatedetail.title_box} ${assignmenttranslatedetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${assignmenttranslatedetail.input_box} ${assignmenttranslatedetail.input_ptssnumbox} ${assignmenttranslatedetail.patient_box}`}>
                        <input type="text" disabled={true} value={tr_ptssnum}></input>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>진단과목</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <input type="text" disabled={true} value={tr_ptsub}/>
                    </div>
                    <div className={assignmenttranslatedetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <input type="text" disabled={true} value={tr_ptdiagnosis}/>
                    </div>
                </div>
                <div className={`${assignmenttranslatedetail.row_box}`}>
                    <div className ={`${assignmenttranslatedetail.title_box} ${assignmenttranslatedetail.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={assignmenttranslatedetail.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={tr_ptdiagcontent} readOnly/>
                    </div>
                </div>
            </div>
            <div className={assignmenttranslatedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={assignmenttranslatedetail.request_othertable}>
                <div className={assignmenttranslatedetail.row_box} >
                    <div className={assignmenttranslatedetail.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={assignmenttranslatedetail.input_box} style={{width : '400px'}}>
                        <textarea cols="50" rows="10" value={trEtcValue} readOnly/>
                    </div>
                </div>
            </div>

             <div className={`${assignmenttranslatedetail.iconbox} ${assignmenttranslatedetail.file_box}`}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                        <span className={assignmenttranslatedetail.notice}>
                        ※ 번역자료는 압축파일(zip 파일형식) 으로 첨부해 주세요
                        </span>
                </h3>
            </div>
            <div className={assignmenttranslatedetail.file_table}>
                <div className={assignmenttranslatedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmenttranslatedetail.title_box}>
                        번역 요청자료
                    </div>
                    <div className={assignmenttranslatedetail.input_box}>
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
                <div className={assignmenttranslatedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmenttranslatedetail.title_box}>
                        번역자료
                    </div>
                    <div className={assignmenttranslatedetail.input_box}>
                        {
                            isAnswer ?
                            <>
                                <button>
                                    <a
                                        href={`http://localhost:8080/assignedTranslate/findFile/${index}`}
                                    >
                                        다운로드
                                    </a>
                                </button>
                                <button onClick={
                                    btn_modify_trAnswer
                                } >수정</button>
                            </>
                            :
                            <input type='file' accept='application/zip' onChange={(e)=> setTrAnswer(e.target.files[0])}/>
                        }
                    </div>
                </div>
                <div className={assignmenttranslatedetail.complete}>
                    {
                        isAnswer ? (trProgressStatus ? <></> : 
                        <button type="button" className={assignmenttranslatedetail.btt_complete} onClick={btn_translate_update}>번역의뢰 답변 수정</button>) 
                        :
                        isUpdate ? 
                        <button type="button" className={assignmenttranslatedetail.btt_complete} onClick={btn_translate_update}>번역의뢰 답변 수정</button>
                        :
                        <button type="button" className={assignmenttranslatedetail.btt_complete} onClick={btn_translate_request}>번역의뢰 답변 저장</button>
                    }
                <button type="button" className={assignmenttranslatedetail.btt_complete} onClick={btn_translate_cancle}>취소</button>
                </div>
            </div>
        </div>
    )
}