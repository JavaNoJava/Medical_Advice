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
            console.log(response)
            setAssignmentAdvice(response.data)
            setUname(response.data.uname)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(response.data.userAddress)
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
            <div className={assignmentadvicedetail.title_box}>
              질문 {index + 1}
            </div>
            <div className={assignmentadvicedetail.input_box}>
              <input
                type="text"
                name={`adQuestionContent_${index}`}
                value={content}
                readOnly
                maxLength={300}
              />
            </div>
            <div className={assignmentadvicedetail.title_box}>
              답변 {index + 1}
            </div>
            <div className={assignmentadvicedetail.input_box}>
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
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    자문의뢰 답변
                </h2>
                - 자문의뢰 질문에 대한 답변을 모두 입력해주세요.
             </div>
             <div className={assignmentadvicedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={assignmentadvicedetail.request_usertable}>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>의뢰자명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={uname}/>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>일반전화</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={utel}/>
                    </div>
                    <div className={assignmentadvicedetail.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={uphone}/>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>주소</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={uaddress}/>
                    </div>
                </div>
             </div>
             <div className={assignmentadvicedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={assignmentadvicedetail.request_patienttable}>
                <div className={`${assignmentadvicedetail.row_box} ${assignmentadvicedetail.patient_box}`}>
                    <div className={`${assignmentadvicedetail.title_box} ${assignmentadvicedetail.patient_box}`}>환자명</div>
                    <div className={`${assignmentadvicedetail.input_box} ${assignmentadvicedetail.patient_box}`}>
                        <input type="text" disabled={true} value={ad_ptname}></input>
                    </div>
                    <div className={`${assignmentadvicedetail.title_box} ${assignmentadvicedetail.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${assignmentadvicedetail.input_box} ${assignmentadvicedetail.input_ptssnumbox} ${assignmentadvicedetail.patient_box}`}>
                        <input type="text" disabled={true} value={ad_ptssnum}></input>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>진단과목</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={ad_ptsub}/>
                    </div>
                    <div className={assignmentadvicedetail.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={ad_ptdiagnosis}/>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>과거 진단이력</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={ad_ptrec}/>
                    </div>
                </div>
                <div className={`${assignmentadvicedetail.row_box}`}>
                    <div className ={`${assignmentadvicedetail.title_box} ${assignmentadvicedetail.row_contentbox}`}>
                        내용
                    </div>
                    <div className={assignmentadvicedetail.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={ad_ptcmt} readOnly/>
                    </div>
                </div>
            </div>
            <div className={assignmentadvicedetail.iconbox}>
                 <h3>
                     <i className="fa-solid fa-circle icon"></i>
                     보험 계약 정보
                 </h3>
             </div>
             <div className={assignmentadvicedetail.request_insurancetable}>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>보험사명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={insurance}></input>
                    </div>
                    <div className={assignmentadvicedetail.title_box} style={{borderLeft : '1px solid black'}}>계약일자</div>
                    <div className={assignmentadvicedetail.input_box}>
                    <input type="text" disabled={true} value={insureDate}></input>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box}>보험계약명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={insure_name}></input>
                    </div>
                </div>
            </div>
            <div className={assignmentadvicedetail.iconbox}>
                 <h3>
                      <i className="fa-solid fa-circle icon"></i>
                     병원치료사항
                 </h3>
            </div>
            <div className={assignmentadvicedetail.request_diagtable}>
                <div className={assignmentadvicedetail.row_box} style={{height : '42px'}}>
                    <div className={assignmentadvicedetail.title_box} >1차 치료 병원명</div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type="text" disabled={true} value={hospital}></input>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box} style={{height : '92px'}}>입원 치료기간</div>
                    <div className={assignmentadvicedetail.input_box} style={{display:'flex', width: '600px', alignItems : 'space-between', height : '80px'}}>
                        <div className={assignmentadvicedetail.datebox}>
                        <input type="text" disabled={true} value={adm_startDay}></input>
                        </div>                       
                        ~
                        <div className={assignmentadvicedetail.datebox}>
                        <input type="text" disabled={true} value={adm_endDay}></input>
                        </div>                       
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box} style={{height : '92px'}}>통원 치료기간</div>
                    <div className={assignmentadvicedetail.input_box} style={{display:'flex', width: '600px', alignItems : 'space-between', height : '80px'}}>
                        <div className={assignmentadvicedetail.datebox}>
                        <input type="text" disabled={true} value={visit_startDay}></input>
                        ~
                        </div>
                        <div className={assignmentadvicedetail.datebox}>
                        <input type="text" disabled={true} value={visit_endDay}></input>
                        </div>                       
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className ={`${assignmentadvicedetail.title_box} ${assignmentadvicedetail.row_contentbox}`} style={{height : '130px'}}>
                        치료사항
                    </div>
                    <div className={assignmentadvicedetail.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={treat_cmt} readOnly/>
                    </div>
                </div>
            </div>
            <div className={assignmentadvicedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={assignmentadvicedetail.request_othertable}>
                <div className={assignmentadvicedetail.row_box} >
                    <div className={assignmentadvicedetail.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={assignmentadvicedetail.input_box} style={{width : '400px'}}>
                        <textarea cols="50" rows="10" value={adEtcValue} readOnly/>
                    </div>
                </div>
            </div>
            <div className={assignmentadvicedetail.iconbox} style={{marginTop : '50px'}}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    질문지
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
            <div className={assignmentadvicedetail.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
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
                            <button>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adReqForm`}
                                    download="adReqForm.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
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
                            <button>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adDiagnosis`}
                                    download="adDiagnosis.jpg"
                                >
                                다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
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
                            <button>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adRecord`}
                                    download="adRecord.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
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
                            <button>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adFilm`}
                                    download="adFilm.jpg"
                                >다운로드</a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
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
                            <button>
                                <a
                                    href={`http://localhost:8080/advice/findFile/${index}/adOther`}
                                    download="adOther.jpg"
                                >다운로드</a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                        
                    </div>
                </div>
                <div className={assignmentadvicedetail.complete}>
                    <button type = "button" className={assignmentadvicedetail.btt_complete} onClick={btn_advice_request}>자문의뢰 답변 저장</button>
                    <button type = "button" className={assignmentadvicedetail.btt_complete} onClick={btn_advice_cancle}>취소</button>
                 </div>
            </div>
        </div>  
    )
}