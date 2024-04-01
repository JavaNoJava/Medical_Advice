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
            const [zipcode, userroadAddress, userDetailAddress] = response.data.userAddress.split('/');
            console.log(response.data)
            setUname(response.data.uname)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(`(${zipcode}) ${userroadAddress} ${userDetailAddress}`);
            setTrptname(response.data.trPtName)
            setTrptsub(response.data.trPtSub)
            setTrptdiagnosis(response.data.trPtDiagnosis)
            setTrptdiagcontent(response.data.trPtDiagContent)
            setTrEtcValue(response.data.trEtc)
            if(response.data.trProgressStatus === '결제하기' || response.data.trProgressStatus === '번역완료'){
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
                <h2 className={assignmenttranslatedetail.title}>
                    번역의뢰 답변
                </h2>
                <h4 className={assignmenttranslatedetail.title_bottom}>
                    - 분석의뢰 질문에 대한 답변을 모두 입력해주세요.
                </h4>
            </div>

            {/* 신청자 정보*/}

            <div className={assignmenttranslatedetail.iconbox}>
                <h3 className={assignmenttranslatedetail.tit}>
                    신청자 정보
                </h3>
            </div>
            <div className={assignmenttranslatedetail.request_usertable}>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>의뢰자명</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <span>{uname}</span>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>일반전화</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <span>{utel}</span>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>휴대전화</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <span>{uphone}</span>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>주소</div>
                    <div className={assignmenttranslatedetail.input_box} style={{width: "500px"}}>
                        <span>{uaddress}</span>
                    </div>
                </div>
            </div>

            {/* 환자의료 기록 정보*/}

            <div className={assignmenttranslatedetail.iconbox}>
                <h3 className={assignmenttranslatedetail.tit}>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={assignmenttranslatedetail.request_patienttable}>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>환자명</div>
                    <div className={assignmenttranslatedetail.input_box}>
                       <span>{tr_ptname}</span>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>주민등록번호</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <span>{tr_ptssnum}</span>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>진단과목</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <span>{tr_ptsub}</span>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className={assignmenttranslatedetail.title_box}>진단명</div>
                    <div className={assignmenttranslatedetail.input_box}>
                        <span>{tr_ptdiagnosis}</span>
                    </div>
                </div>
                <div className={assignmenttranslatedetail.row_box}>
                    <div className ={`${assignmenttranslatedetail.title_box} ${assignmenttranslatedetail.row_contentbox}`}>
                            진단사항
                    </div>
                    <div className={assignmenttranslatedetail.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={tr_ptdiagcontent} readOnly/>
                    </div>
                </div>
             </div>

            {/* 기타 정보*/}
            
            <div className={assignmenttranslatedetail.iconbox}>
                <h3 className={assignmenttranslatedetail.tit}>
                    기타사항
                </h3>
            </div>
            <div className={assignmenttranslatedetail.request_othertable}>
                <div className={assignmenttranslatedetail.row_box} >
                    <div className ={`${assignmenttranslatedetail.title_box} ${assignmenttranslatedetail.row_contentbox}`}>
                        기타사항
                    </div>
                    <div className={assignmenttranslatedetail.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={trEtcValue} readOnly/>
                    </div>
                </div>
            </div>

            {/* 첨부자료 정보*/}

            <div className={assignmenttranslatedetail.iconbox}>
                <h3 className={assignmenttranslatedetail.tit}>
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
                            <button className={assignmenttranslatedetail.btn_file_download}>
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
                            trProgressStatus ? 
                                <button className={assignmenttranslatedetail.btn_file_download}>
                                    <a
                                        href={`http://localhost:8080/assignedTranslate/findFile/${index}`}
                                    >
                                        다운로드
                                    </a>
                                </button>
                            :
                            <>
                                <button className={assignmenttranslatedetail.btn_file_download}>
                                    <a
                                        href={`http://localhost:8080/assignedTranslate/findFile/${index}`}
                                    >
                                        다운로드
                                    </a>
                                </button>
                                <button className={assignmenttranslatedetail.btn_file_cancle} onClick={
                                    btn_modify_trAnswer
                                } >수정</button>
                            </>
                            :
                            <>
                                <label htmlFor="file-upload" className={assignmenttranslatedetail.file_label}>
                                    <button className={assignmenttranslatedetail.btn_file}>
                                        <i class="fa-solid fa-plus" style={{color: '#ffffff'}}/> 파일 추가
                                    </button>
                                    <input
                                    id="file-upload"
                                    className={assignmenttranslatedetail.input_file}
                                    type="file"
                                    accept="application/zip"
                                    onChange={e => setTrAnswer(e.target.files[0])}
                                    />
                                </label>
                                <span className={assignmenttranslatedetail.file_msg}>{trAnswer ? `선택된 파일: ${trAnswer.name}` : `선택된 파일: 없음`}</span>
                        </>
                        }
                    </div>
                </div>
            </div>
            
            <div className={assignmenttranslatedetail.complete}>
                {
                        isAnswer ? (trProgressStatus ? <></> : 
                        <button type="button" className={assignmenttranslatedetail.complete_button} onClick={btn_translate_update}>번역의뢰 답변 수정</button>) 
                        :
                        isUpdate ? 
                        <button type="button" className={assignmenttranslatedetail.complete_button} onClick={btn_translate_update}>번역의뢰 답변 수정</button>
                        :
                        <button type="button" className={assignmenttranslatedetail.complete_button} onClick={btn_translate_request}>번역의뢰 답변 저장</button>
                }
                <button type="button" className={assignmenttranslatedetail.complete_button} onClick={btn_translate_cancle}>취소</button>
            </div>
        </div>
    )
}