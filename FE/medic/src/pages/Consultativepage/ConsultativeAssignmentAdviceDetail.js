import React, { useState, useEffect } from 'react';
import assignmentadvicedetail from '../../css/ConsultativeAdviceAssignmentDetailpage.module.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ConsultativeAdviceAssignmentDetailpage(){
    const navigate = useNavigate();
    const location = useLocation();
  
    const adviceIndex = location.state.index + 1;
    
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [ad_ptname, setAdptname] = useState('')
    const [ad_ptssnum1, setAdptssnum1] = useState('');
    const [ad_ptssnum2, setAdptssnum2] = useState('');
    const [ad_ptsub, setAdptsub] = useState('');
    const [ad_ptdiagnosis, setAdptdiagnosis] = useState('')
    const [ad_ptrec ,setAdptrec] = useState('')
    const [ad_ptcmt, setAdptcmt] = useState('')
    
    // 보험사
    const [insurance ,setInsurance] = useState('')
    const [insure_name, setInsurename] = useState('')
    const [insuranceYear, setInsuranceYear] = useState('')  // 계약일자
    const [insuranceMonth, setInsuranceMonth] = useState('')
    const [insuranceDay, setInsuranceDay] = useState('')

    // 진료기록
    const [hospital, setHospital] = useState('')
    const [adm_startYear ,setAdmstartYear] = useState('')
    const [adm_startMonth, setAdmstartMonth] = useState('')
    const [adm_startDay, setAdmstartDay] = useState('')
    const [adm_endYear, setAdmendYear] = useState('')
    const [adm_endMonth, setAdmendMonth] = useState('')
    const [adm_endDay, setAdmendDay] = useState('')
    const [visit_startYear ,setVisitstartYear] = useState('')
    const [visit_startMonth, setVisitstartMonth] = useState('')
    const [visit_startDay, setVisitstartDay] = useState('')
    const [visit_endYear, setVisitendYear] = useState('')
    const [visit_endMonth, setVisitendMonth] = useState('')
    const [visit_endDay, setVisitendDay] = useState('')
    const [treat_cmt ,setTreatcmt] = useState('')

    //기타사항
    const [adEtcValue, setAdEtcValue] = useState('');

    // 질문지
    const [adQuestionTotal, setAdQuestionTotal] = useState(1);
    const [adQuestionContents, setAdQuestionContents] = useState([]);
    const [adAnswerContents, setAdAnswerContents] = useState([]);


    const getUserInfo = async() =>{
        try{
            const response = await axios.get('/consultative/assignment/advice/${adviceIndex.id}/details')
            console.log(response.data)
            setUname(response.data.name)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(response.data.userAddress)
            setAdptname(response.data.adptNmae)
            setAdptssnum1(response.data.adptssnum1)
            setAdptssnum2(response.data.adptssnum2)
            setAdptsub(response.data.adptsub)
            setAdptdiagnosis(response.data.adptdiagnosis)
            setAdptrec(response.data.adptrec)
            setAdptcmt(response.data.adptcmt)
            setInsurance(response.data.insurance)
            setInsurename(response.data.insurename)
            setInsuranceYear(response.data.insuranceYear)
            setInsuranceMonth(response.data.insuranceMonth)
            setInsuranceDay(response.data.insuranceDay)
            setHospital(response.data.hospital)
            setAdmstartYear(response.data.admstartYear)
            setAdmstartMonth(response.data.admstartMonth)
            setAdmstartDay(response.data.admstartDay)
            setAdmendYear(response.data.admendYear)
            setAdmendMonth(response.data.admendMonth)
            setAdmendDay(response.data.admendDay)
            setVisitstartYear(response.data.visitstartYear)
            setVisitstartMonth(response.data.visitstartMonth)
            setVisitstartDay(response.data.visitstartDay)
            setVisitendYear(response.data.visitendYear)
            setVisitendMonth(response.data.visitendMonth)
            setVisitendDay(response.data.visitendDay)
            setTreatcmt(response.data.treatCmt)
            setAdEtcValue(response.data.adEtcValue)
            setAdQuestionTotal(response.data.adQuestionTotal)
            setAdQuestionContents(response.data.adQuestionContents)
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
              답변 입력
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
    
    const isFormValid = () => {
        // 여러 입력 필드와 텍스트 영역의 유효성을 확인
        
        const isadAnswerContentsInfoValid = adAnswerContents.every(content => content); // 모든 질문 내용이 비어있지 않아야 함
      
        // 모든 조건을 만족하면 true를 반환
        return isadAnswerContentsInfoValid;
    };
    
    const btn_advice_request = async() => {
         // 유효성 검사
        if (!isFormValid()) {
            alert('입력값을 확인해주세요.');
            return;
        }
    
        const answerList = adAnswerContents.map((answer, index) => {
            return {
              question: adQuestionContents[index],
              answer: answer,
            };
        });

        const adviceRequest = {
            "diagRound" : 1,
            "answerList" : answerList
        };

        try{
            const response = axios.post('/advice/request', adviceRequest)
            alert('자문의뢰 답변이 저장되었습니다.')
            navigate('/')
        } catch(err){
            console.log(err)
        }
    }
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
                        <input type="text" disabled={true} value={ad_ptssnum1}></input>
                         -
                        <input type="password" disabled={true} value={ad_ptssnum2}></input>
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
                    <input type="text" disabled={true} value={insuranceYear}></input> -
                    <input type="text" disabled={true} value={insuranceMonth}></input> -
                    <input type="text" disabled={true} value={insuranceDay}></input>
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
                    <div className={assignmentadvicedetail.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', alignItems : 'space-between', height : '80px'}}>
                        <div className={assignmentadvicedetail.datebox}>
                        <input type="text" disabled={true} value={adm_startYear}></input>년
                        <input type="text" disabled={true} value={adm_startMonth}></input>월
                        <input type="text" disabled={true} value={adm_startDay}></input>일
                        </div>                       
                        ~
                        <div className={assignmentadvicedetail.datebox}>
                        <input type="text" disabled={true} value={adm_endYear}></input>년
                        <input type="text" disabled={true} value={adm_endMonth}></input>월
                        <input type="text" disabled={true} value={adm_endDay}></input>일
                        </div>                       
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box}>
                    <div className={assignmentadvicedetail.title_box} style={{height : '92px'}}>통원 치료기간</div>
                    <div className={assignmentadvicedetail.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', justifyContent : 'start', alignItems : 'space-between', height : '80px'}}>
                        <div className={assignmentadvicedetail.datebox}>
                        <input type="text" disabled={true} value={visit_startYear}></input>년
                        <input type="text" disabled={true} value={visit_startMonth}></input>월
                        <input type="text" disabled={true} value={visit_startDay}></input>일
                        </div>                       
                        ~
                        <div className={assignmentadvicedetail.datebox}>
                        <input type="text" disabled={true} value={visit_endYear}></input>년
                        <input type="text" disabled={true} value={visit_endMonth}></input>월
                        <input type="text" disabled={true} value={visit_endDay}></input>일
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
                            value={adQuestionTotal}
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
                        <input type='file'/>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        진단서
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type='file'/>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        의무기록지
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type='file'/>
                    </div>
                </div>
                <div className={assignmentadvicedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentadvicedetail.title_box}>
                        필름
                    </div>
                    <div className={assignmentadvicedetail.input_box}>
                        <input type='file'/>
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