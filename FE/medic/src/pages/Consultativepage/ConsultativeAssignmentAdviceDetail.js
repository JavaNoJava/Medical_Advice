import React, { useState, useEffect } from 'react';
import assignmentadvicedetail from '../../css/ConsultativeAdviceAssignmentDetailpage.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConsultativeAdviceAssignmentDetailpage(){
    const navigate = useNavigate();
  
    const {index} = useParams();
    
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [ad_ptname, setAdptname] = useState('')
    const [ad_ptssnum, setAdptssnum] = useState('');
    const [ad_ptsub, setAdptsub] = useState('');
    const [ad_ptdiagnosis, setAdptdiagnosis] = useState('')
    const [ad_ptrec ,setAdptrec] = useState('')
    const [ad_ptcmt, setAdptcmt] = useState('')
    
    // 보험사
    const [insurance ,setInsurance] = useState('')
    const [insure_name, setInsurename] = useState('')
    const [insureDate, setInsureDate] = useState('')  // 계약일자

    // 진료기록
    const [hospital, setHospital] = useState('')
    const [adm_startDay, setAdmstartDay] = useState('')
    const [adm_endDay, setAdmendDay] = useState('')
    const [visit_startDay, setVisitstartDay] = useState('')
    const [visit_endDay, setVisitendDay] = useState('')
    const [treat_cmt ,setTreatcmt] = useState('')

    //기타사항
    const [adEtcValue, setAdEtcValue] = useState('');

    // 질문지
    const [adQuestionTotal, setAdQuestionTotal] = useState('');
    const [adQuestionContents, setAdQuestionContents] = useState([]);
    const [adAnswerContents, setAdAnswerContents] = useState([]);

    const [adAnswerDate, setAdAnswerDate] = useState('');

    //자문 파일
    const [adReqForm, setAdReqForm] = useState(false)
    const [adDiagnosis, setAdDiagnosis] = useState(false)
    const [adRecord, setAdRecord] = useState(false)
    const [adFilm, setAdFilm] = useState(false)
    const [adOther, setAdOther] = useState(false)

    const [admProgressStatus, setAdmProgressStatus] = useState('');

    const [assignmentAdvice, setAssignmentAdvice] = useState('');


    const getUserInfo = async() =>{
        try{
            const response = await axios.get(`/consultative/assignedAdvice/detail/${index}`)
            const [zipcode, userroadAddress, userDetailAddress] = response.data.userAddress.split('/');
            console.log(response)
            setAssignmentAdvice(response.data)
            setUname(response.data.uname)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(`(${zipcode}) ${userroadAddress} ${userDetailAddress}`);
            setAdptname(response.data.adPtName)
            setAdptsub(response.data.adPtSub)
            setAdptdiagnosis(response.data.adPtDiagnosis)
            setAdptrec(response.data.adPtRec)
            setAdptcmt(response.data.adPtCmt)
            setInsurance(response.data.insurance)
            setInsurename(response.data.insureName)
            setHospital(response.data.hospital)
            setTreatcmt(response.data.treatCmt)
            setAdEtcValue(response.data.adEtc)
            setAdQuestionTotal(response.data.adQuestionContent)
            setAdQuestionContents(response.data.adQuestionContent)
            setAdAnswerContents(response.data.adAnswerContent)
            setAdmProgressStatus(response.data.admProgressStatus)
            setInsureDate(response.data.insureDate.replaceAll('-', '/'))
            setAdptssnum(response.data.adPtSsNum);
            setAdmstartDay(response.data.admStart.replaceAll('-', '/'))
            setAdmendDay(response.data.admEnd.replaceAll('-', '/'))
            setVisitstartDay(response.data.visitStart.replaceAll('-', '/'))
            setVisitendDay(response.data.visitEnd.replaceAll('-', '/'))

            setAdReqForm(() => {
                if(response.data.adReqForm === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAdDiagnosis(()=>{
                if(response.data.adDiagnosis === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAdRecord(()=>{
                if(response.data.adRecord === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAdFilm(()=>{
                if(response.data.adFilm === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAdOther(()=>{
                if(response.data.adOther === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
    } catch(err){
        console.log(err)
    }  
    }

    useEffect(()=>{
        getUserInfo()
    }, [])


    const renderQuestionInputs = () => {
        return adQuestionContents.map((content, index) => (
          <div className={assignmentadvicedetail.row_box} style={{ height: 'auto' }} key={index}>
            <div className={assignmentadvicedetail.title_box} style={{width: '140px'}}>
              질문 {index + 1}
            </div>
            <div className={assignmentadvicedetail.input_box} style={{width: '275px'}}>
              <input
                type="text"
                name={`adQuestionContent_${index}`}
                value={content}
                readOnly
                maxLength={300}
              />
            </div>
            <div className={assignmentadvicedetail.title_box} style={{width: '150px', borderLeft: '1px solid black'}}>
              답변 {index + 1}
            </div>
            <div className={assignmentadvicedetail.input_box} style={{width: '275px'}}>
              <input
                type="text"
                name={`adAnswerContent_${index}`}
                value={adAnswerContents[index] || ''}
                onChange={(e) => handleAnswerContentChange(index, e)}
                maxLength={300}
              />
            </div>
          </div>
        ));
      };
      
    const handleAnswerContentChange = (index, event) => {
        const newAnswerContents = [...adAnswerContents];
        newAnswerContents[index] = event.target.value;
        setAdAnswerContents(newAnswerContents);
    };
    
    const btn_advice_request = async() => {
        if (assignmentAdvice.admProgressStatus === '결제하기' || assignmentAdvice.admProgressStatus === '자문완료') {
            alert("회원에게 답변이 전달되면 답변을 수정할 수 없습니다.");
        } else {
            await saveAdviceisResponse();
        }
    };
    

    const saveAdviceisResponse = async () => {
        const today = new Date()
        try{
            const response = axios.put(`/consultative/assignedAdvice/answer/${index}`, {
                adAnswerContent: adAnswerContents,
                adAnswerDate: today
            });
            setAdAnswerDate(today);
            alert('자문의뢰 답변이 저장되었습니다.')
            navigate('/')
            console.log(response.data);
        } catch (error) {
            console.error('Error saving advice response:', error);
        }
    };
    const btn_advice_cancle = async() => {
        navigate('/')
    }
    return(
        <div className={assignmentadvicedetail.advicerequest_wrap}>
            <div className={assignmentadvicedetail.iconbox}>
                <h2 className={assignmentadvicedetail.title}>
                    자문의뢰 답변
                </h2>
                <h4 className={assignmentadvicedetail.title_bottom}>
                    - 자문의뢰 질문에 대한 답변을 모두 입력해주세요.
                </h4>
            </div>

            {/* 신청자 정보*/}

            <div className={assignmentadvicedetail.iconbox}>
                <h3 className={assignmentadvicedetail.tit}>
                    신청자 정보
                </h3>
            </div>
            <div className={assignmentadvicedetail.request_usertable}>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>의뢰자명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{uname}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>일반전화</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{utel}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>휴대전화</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{uphone}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>주소</div>
                    <div className={assignmentadvicedetail.input_box} style={{width: "500px"}}>
                        <span>{uaddress}</span>
                    </div>
                </div>
            </div>

            {/* 환자의료 기록 정보*/}

            <div className={assignmentadvicedetail.iconbox}>
                <h3 className={assignmentadvicedetail.tit}>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={assignmentadvicedetail.request_patienttable}>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>환자명</div>
                    <div className={assignmentadvicedetail.input_box}>
                       <span>{ad_ptname}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>주민등록번호</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{ad_ptssnum}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>진단과목</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{ad_ptsub}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>진단명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{ad_ptdiagnosis}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>과거 진단이력</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{ad_ptrec}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className ={`${assignmentadvicedetail.title_box} ${assignmentadvicedetail.row_contentbox}`}>
                            내용
                    </div>
                    <div className={assignmentadvicedetail.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={ad_ptcmt} readOnly/>
                    </div>
                </div>
             </div>

            {/* 보험 계약 정보*/}

            <div className={assignmentadvicedetail.iconbox}>
                <h3 className={assignmentadvicedetail.tit}>
                    보험 계약 정보
                </h3>
            </div>
            <div className={assignmentadvicedetail.request_insurancetable}>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>보험사명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{insurance}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>계약일자</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{insureDate}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>보험계약명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{insure_name}</span>
                    </div>
                </div>
            </div>
        
            {/* 병원 치료 정보*/}

            <div className={assignmentadvicedetail.iconbox}>
                <h3 className={assignmentadvicedetail.tit}>
                    병원치료사항
                </h3>
            </div>
            <div className={assignmentadvicedetail.request_hospitaltable}>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>1차 치료 병원명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{hospital}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>입원 치료기간</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{adm_startDay}</span>
                        ~
                        <span>{adm_endDay}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>통원 치료기간</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <span>{visit_startDay}</span>
                        ~
                        <span>{visit_endDay}</span>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className ={`${assignmentadvicedetail.title_box} ${assignmentadvicedetail.row_contentbox}`}>
                        치료사항
                    </div>
                    <div className={assignmentadvicedetail.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={treat_cmt} readOnly/>
                    </div>
                </div>
            </div>

            {/* 기타 정보*/}
            
            <div className={assignmentadvicedetail.iconbox}>
                <h3 className={assignmentadvicedetail.tit}>
                    기타사항
                </h3>
            </div>
            <div className={assignmentadvicedetail.request_othertable}>
                <div className={assignmentadvicedetail.row_box} >
                    <div className ={`${assignmentadvicedetail.title_box} ${assignmentadvicedetail.row_contentbox}`}>
                        기타사항
                    </div>
                    <div className={assignmentadvicedetail.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={adEtcValue} readOnly/>
                    </div>
                </div>
            </div>

            {/* 질문지 정보*/}

            <div className={assignmentadvicedetail.iconbox}>
                <h3 className={assignmentadvicedetail.tit}>
                    질문지 작성
                </h3>
            </div>
            <div className = {assignmentadvicedetail.request_questiontable}>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        질문 항목
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input
                            type="text"
                            name="adQuestionTotal"
                            value={adQuestionTotal.length}
                        />
                    </div>
                </div>
                    {renderQuestionInputs()}
            </div>

            {/* 첨부자료 정보*/}

            <div className={assignmentadvicedetail.iconbox}>
                <h3 className={assignmentadvicedetail.tit}>
                    첨부자료
                </h3>
            </div>
            <div className={assignmentadvicedetail.file_table}>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        자문의뢰신청서
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                    {
                            adReqForm ? 
                            <button className={assignmentadvicedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adReqForm`}
                                    download="adReqForm.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
                        }
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        진단서
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                        {
                            adDiagnosis ?
                            <button className={assignmentadvicedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adDiagnosis`}
                                    download="adDiagnosis.jpg"
                                >
                                다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
                        }
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        의무기록지
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                        {
                            adRecord ?
                            <button className={assignmentadvicedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adRecord`}
                                    download="adRecord.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
                        }
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        필름
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                        {
                            adFilm ?
                            <button className={assignmentadvicedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adFilm`}
                                    download="adFilm.jpg"
                                >다운로드</a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
                        }
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        기타 자료
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                        {
                            adOther ?
                            <button className={assignmentadvicedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adOther`}
                                    download="adOther.jpg"
                                >다운로드</a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
                        }
                    </div>
                </div>
            </div>      

            <div className={assignmentadvicedetail.complete}>
                <button type = "button" className={assignmentadvicedetail.complete_button} onClick={btn_advice_request}>답변 저장</button>
                <button type = "button" className={assignmentadvicedetail.complete_button} onClick={btn_advice_cancle}>취소</button>
            </div>
        </div>
    )
}