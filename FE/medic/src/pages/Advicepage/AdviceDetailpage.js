import React, { useState, useEffect } from 'react';
import advicerequest from '../../css/AdviceRequestpage.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function AdviceDetailpage(){
    const navigate = useNavigate();
    const startYear = 1960;

    const {index} = useParams();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    const [adviceDetails, setAdviceDetails] = useState({});

    const [contents_count, setContentsCount] = useState(0);

    const [admStartYear, setAdmStartYear] = useState('');
    const [admStartMonth, setAdmStartMonth] = useState('');
    const [admStartDay, setAdmStartDay] = useState('');

    const [admEndYear, setAdmEndYear] = useState('');
    const [admEndMonth, setAdmEndMonth] = useState('');
    const [admEndDay, setAdmEndDay] = useState('');

    const [visitStartYear, setVisitStartYear] = useState('');
    const [visitStartMonth, setVisitStartMonth] = useState('');
    const [visitStartDay, setVisitStartDay] = useState('');

    const [visitEndYear, setVisitEndYear] = useState('');
    const [visitEndMonth, setVisitEndMonth] = useState('');
    const [visitEndDay, setVisitEndDay] = useState('');

    const [insureYear, setInsureYear] = useState(2000);  
    const [insureMounth, setInsureMonth] = useState(1);
    const [insureDay, setInsureDay] = useState(1);

    const [treat_cmt_count, setTreatCmtCount] = useState(0);
    const [ad_etc_count, setAdEtcCount] = useState(0);
    const [adPtSsNum1, setAdPtSsNum1] = useState();
    const [adPtSsNum2, setAdPtSsNum2] = useState();

    const [adQuestion, setAdQuestion] = useState(0);
    const [adAnswer, setAdAnswer] = useState(0);

    const [questionCount, setQuestionCount] = useState([]);


    const [adReqForm, setAdReqForm] = useState(false)
    const [adDiagnosis, setAdDiagnosis] = useState(false)
    const [adRecord, setAdRecord] = useState(false)
    const [adFilm, setAdFilm] = useState(false)
    const [adOther, setAdOther] = useState(false)

    const getAdviceRequest = async() => {
        try{
            const response = await axios.get(`/user/advice/detail/${index}`)
            console.log(response.data)
            setAdviceDetails(response.data);
            console.log("response",response);
            console.log("insure",response.data.insureDate);
            setAdQuestion(response.data.adviceQuestions);
            setAdAnswer(response.data.adviceQuestions);
    
            console.log("adviceQuestions",response.data.adviceQuestions);
            const insure = response.data.insureDate.split('-');
            console.log("inseure",insure);
            setInsureYear(insure[0]);
            setInsureMonth(insure[1]);
            setInsureDay(insure[2]);
            console.log("inseure0",insureYear);
            console.log("inseure1",insureMounth);
            console.log("inseure2",insureDay);
            const adm_start_parts = response.data.admStart.split('-');
            setAdmStartYear(adm_start_parts[0]);
            setAdmStartMonth(adm_start_parts[1]);
            setAdmStartDay(adm_start_parts[2]);
              
            const adm_end_parts = response.data.admEnd.split('-');
            setAdmEndYear(adm_end_parts[0]);
            setAdmEndMonth(adm_end_parts[1]);
            setAdmEndDay(adm_end_parts[2]);
              
            const visit_start_parts = response.data.visitStart.split('-');
            setVisitStartYear(visit_start_parts[0]);
            setVisitStartMonth(visit_start_parts[1]);
            setVisitStartDay(visit_start_parts[2]);
              
            const visit_end_parts = response.data.visitEnd.split('-');
            setVisitEndYear(visit_end_parts[0]);
            setVisitEndMonth(visit_end_parts[1]);
            setVisitEndDay(visit_end_parts[2]);
        

            const ad_PtSsNum = response.data.adPtSsNum.split('-');
            setAdPtSsNum1(ad_PtSsNum[0]);
            setAdPtSsNum2(ad_PtSsNum[1]);
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

const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
    };
    
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
        getAdviceRequest()
    },{index})


    const btn_goto_list = () => {
        navigate('/medic/advice/adviceList');
    }

    const btn_edit = () => {
        if (adviceDetails.admDate == null) {
            navigate(`/medic/advice/adviceUpdate/${index}`);
        } else {
            alert("자문의뢰 신청이 전문의에게 배정된 이후로는 수정할 수 없습니다.")
        }
    }

    const renderQuestionInputs = () => {
        if (!adQuestion || adQuestion.length === 0) {
            return null; // 또는 다른 처리를 수행하거나 빈 배열을 반환
          }
        return adQuestion.map((question, index) => (
        <div className={advicerequest.row_box} style={{height : 'auto'}} key={index}>
            <div className={advicerequest.title_box}>
            질문 {index + 1} 입력
            </div>
            <div className={advicerequest.input_box}>
            <input
                type="text"
                value={question.adQuestionContent || ''}
                maxLength={300}
            />
            </div>
        </div>
        ));
    };

    const renderAnswerInputs = () => {
        if (!adAnswer || adAnswer.length === 0) {
            return null; // 또는 다른 처리를 수행하거나 빈 배열을 반환
          }
        return adAnswer.map((answer, index) => (
          <div className={advicerequest.row_box} style={{ height: 'auto' }} key={index}>
            <div className={advicerequest.title_box}>
              답변 {index + 1} 입력
            </div>
            <div className={advicerequest.input_box}>
              <input
                type="text"
                value={answer.adAnswerContent || ''}
                maxLength={300}
              />
            </div>
          </div>
        ));
      };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };
    
    return(
        <div className={advicerequest.advicerequest_wrap}>
            <div className={advicerequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    자문의뢰 상세페이지
                </h2>
             </div>
             <div className={advicerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={advicerequest.request_usertable}>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>의뢰자명</div>
                    <div className={advicerequest.input_box}><input type="text" disabled={true} value={uname}/></div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>일반전화</div>
                    <div className={advicerequest.input_box}><input type="text" disabled={true} value={utel}/></div>
                    <div className={advicerequest.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={advicerequest.input_box}><input type="text" disabled={true} value={uphone}/></div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>주소</div>
                    <div className={advicerequest.input_box}><input type="text" disabled={true} value={uaddress}/></div>
                </div>
             </div>
             <div className={advicerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={advicerequest.request_patienttable}>
                <div className={`${advicerequest.row_box} ${advicerequest.patient_box}`}>
                    <div className={`${advicerequest.title_box} ${advicerequest.patient_box}`}>환자명</div>
                    <div className={`${advicerequest.input_box} ${advicerequest.patient_box}`}>
                    <input type="text" name="ad_ptname" disabled={true}  value={adviceDetails.adPtName}></input>
                    </div>
                <div className={`${advicerequest.title_box} ${advicerequest.patient_box}`} style={{borderLeft: '1px solid black'}}>주민등록번호</div>
                <div className={`${advicerequest.input_box} ${advicerequest.input_ptssnumbox} ${advicerequest.patient_box}`}>
                            <input type="text" name="ad_ptssnum1"disabled={true} value={adPtSsNum1} ></input>
                            -
                            <input type="password" name="ad_ptssnum2" disabled={true} value={adPtSsNum2} ></input>
                </div>
            </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>진단과목</div>
                    <div className={advicerequest.input_box}>
                            <input type="text" name="ad_ptsub" disabled={true} value={adviceDetails.adPtSub}/>
                </div>
                    <div className={advicerequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={advicerequest.input_box}>
                            <input type="text" name="ad_ptdiagnosis" disabled={true} value={adviceDetails.adPtDiagnosis}/>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>과거 진단이력</div>
                    <div className={advicerequest.input_box}>
                            <input type="text" name="ad_ptrec" disabled={true} value={adviceDetails.adPtRec}/>
                    </div>
                </div>
                <div className={`${advicerequest.row_box}`}>
                    <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>
                        내용
                    </div>
                    <div className={advicerequest.input_box} style={{width : '400px', height : 'auto'}}>
                            <textarea cols="50" rows="10" disabled={true} value={adviceDetails.adPtCmt}/>
                            <div className={advicerequest.count_box}>
                                <span>{contents_count}/500</span>
                            </div>
                    </div>
                </div>
            </div>
            <div className={advicerequest.iconbox}>
                 <h3>
                     <i className="fa-solid fa-circle icon"></i>
                     보험 계약 정보
                 </h3>
             </div>
             <div className={advicerequest.request_insurancetable}>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>보험사명</div>
                    <div className={advicerequest.input_box}>
                            <input type="text" name="insurance" disabled={true} value={adviceDetails.insurance} ></input>
                    </div>
                    <div className={advicerequest.title_box} style={{borderLeft : '1px solid black'}}>계약일자</div>
                    <div className={advicerequest.input_box}>
                            <input type='text' name='insure_date' disabled={true} value={adviceDetails.insureDate}></input>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>보험계약명</div>
                    <div className={advicerequest.input_box}>
                            <input type="text" name="insure_name" disabled={true} value={adviceDetails.insureName} ></input>
                    </div>
                </div>
            </div>
            <div className={advicerequest.iconbox}>
                 <h3>
                      <i className="fa-solid fa-circle icon"></i>
                     병원치료사항
                 </h3>
            </div>
            <div className={advicerequest.request_diagtable}>
                <div className={advicerequest.row_box} style={{height : '42px'}}>
                    <div className={advicerequest.title_box} >1차 치료 병원명</div>
                    <div className={advicerequest.input_box}>
                        <input type="text" name="hospital" disabled={true} value={adviceDetails.hospital} ></input>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box} style={{height : '92px'}}>입원 치료기간</div>
                    <div className={advicerequest.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', alignItems : 'space-between', height : '80px'}}>
                        <div className={advicerequest.datebox}>
                                <input type="text" name="adm_startYear" disabled={true} value={admStartYear}></input>년
                                <input type="text" name="adm_startMonth" disabled={true} value={admStartMonth}></input>월
                                <input type="text" name="adm_startDay" disabled={true} value={admStartDay}></input>일
                            </div>                       
                            ~
                            <div className={advicerequest.datebox}>
                                <input type="text" name="adm_endYear" disabled={true} value={admEndYear}></input>년
                                <input type="text" name="adm_endMonth" disabled={true} value={admEndMonth}></input>월
                                <input type="text" name="adm_endDay" disabled={true} value={admEndDay}></input>일
                        </div>                       
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box} style={{height : '92px'}}>통원 치료기간</div>
                    <div className={advicerequest.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', justifyContent : 'start', alignItems : 'space-between', height : '80px'}}>
                        <div className={advicerequest.datebox}>
                                <input type="text" name="visit_startYear" disabled={true} value={visitStartYear}></input>년
                                <input type="text" name="visit_startMonth" disabled={true} value={visitStartMonth}></input>월
                                <input type="text" name="visit_startDay" disabled={true} value={visitStartDay}></input>일
                            </div>                       
                            ~
                            <div className={advicerequest.datebox}>
                                <input type="text" name="visit_endYear" disabled={true} value={visitEndYear}></input>년
                                <input type="text" name="visit_endMonth" disabled={true} value={visitEndMonth}></input>월
                                <input type="text" name="visit_endDay" disabled={true} value={visitEndDay}></input>일
                        </div>                       
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`} style={{height : '130px'}}>
                        치료사항
                    </div>
                    <div className={advicerequest.input_box} style={{width : '400px', height : 'auto'}}>
                            <textarea cols="50" rows="10" disabled={true} value={adviceDetails.treatCmt} ></textarea>
                            <div className={advicerequest.count_box}>
                                <span>{treat_cmt_count}/500</span>
                            </div>
                    </div>
                </div>
            </div>
            <div className={advicerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={advicerequest.request_othertable}>
                <div className={advicerequest.row_box} >
                    <div className={advicerequest.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={advicerequest.input_box} style={{width : '400px'}}>
                            <textarea cols="50" rows="3" name="adEtc" disabled={true} value={adviceDetails.adEtc} ></textarea>
                            <div className={advicerequest.count_box}>
                                <span>{ad_etc_count }/300</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={advicerequest.iconbox} style={{marginTop : '50px'}}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    질문지 작성
                </h3>
            </div>
            <div className = {advicerequest.request_questiontable}>
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        질문 항목 수
                    </div>
                        <div className={advicerequest.input_box}>
                            <input
                                type="text"
                                disabled={true}
                                value={adQuestion ? adQuestion.length : 0}
                            />
                        </div>
                    </div>
                        {renderQuestionInputs()}
                    </div>
        {adviceDetails.admProgressStatus === '자문완료' && (
            <div>
            <div className={advicerequest.iconbox} style={{marginTop : '50px'}}>
                    <h3>
                        <i className="fa-solid fa-circle icon"></i>
                        전문의 답변
                    </h3>
            </div>
                <div className = {advicerequest.request_questiontable}>
                    <div className={advicerequest.row_box} style={{height : 'auto'}}>
                        <div className={advicerequest.title_box}>
                            답변 항목수
                        </div>
                        <div className={advicerequest.input_box}>
                            <input
                                type="text"
                                name="adQuestionTotal"
                                disabled={true}
                                value={adAnswer ? adAnswer.length : 0}  
                            />
                        </div>
                    </div>
                        {renderAnswerInputs()}
                    </div>
                    </div>
        )}
             <div className={advicerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                </h3>
            </div>
            <div className={advicerequest.file_table}>
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        자문의뢰신청서
                    </div>
                    <div className={advicerequest.input_box}>
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
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        진단서
                    </div>
                    <div className={advicerequest.input_box}>
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
                 <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        의무기록지
                    </div>
                    <div className={advicerequest.input_box}>
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
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        필름
                    </div>
                    <div className={advicerequest.input_box}>
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
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        기타 자료
                    </div>
                    <div className={advicerequest.input_box}>
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
                <div className={advicerequest.complete}>
                    <button type="button" onClick={btn_goto_list} className={advicerequest.btt_complete}>목록</button>
                    <button type="button" onClick={btn_edit} className={advicerequest.btt_complete}>수정</button>
                 </div>
            </div>
             </div> 
    )
}