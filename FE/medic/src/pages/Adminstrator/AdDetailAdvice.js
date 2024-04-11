    import React, { useState, useEffect } from 'react';
    import advicerequest from '../../css/AdDetailRequestPage.module.css'
    import axios from 'axios';
    import { useNavigate, useParams } from 'react-router-dom';

    export default function AdDetailAdvice(){
        

        const navigate = useNavigate()

        const {index} = useParams();
        const [adviceDetails, setAdviceDetails] = useState({});

        const [adQuestionTotal, setAdQuestionTotal] = useState(0);
        const [adQuestionContents, setAdQuestionContents] = useState([]);
        const [contents_count, setContentsCount] = useState(0);
        const [handleQuestionTotalChange, setHandleQuestionTotalChange] = useState(() => {});

        const [handleQuestionContentChange, setHandleQuestionContentChange] = useState(() => {});
        const [handleYearChange, setHandleYearChange] = useState(() => {});
        const [handleMonthChange, setHandleMonthChange] = useState(() => {});
        const [handleDayChange, setHandleDayChange] = useState(() => {});
        const [dayOptions, setDayOptions] = useState([]);

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

        const [uname, setUname] = useState('');
        const [utel, setUtel] = useState('');
        const [uphone, setUphone] = useState('');
        const [uaddress, setUaddress] = useState('');

        const [insureYear, setInsureYear] = useState(2000);  
        const [insureMounth, setInsureMonth] = useState(1);
        const [insureDay, setInsureDay] = useState(1);
        const [todayYear, setTodayYear] = useState(new Date().getFullYear());

        const [treat_cmt_count, setTreatCmtCount] = useState(0);
        const [ad_etc_count, setAdEtcCount] = useState(0);
        const [ptSsNum1, setPtSsNum1] = useState(0);
        const [ptSsNum2, setPtSsNum2] = useState(0);

        const [questionCount, setQuestionCount] = useState([]);
        const [questionAnswer , setAnswerCount] = useState([]);

        //자문의뢰 파일
        const [adReqForm, setAdReqForm] = useState(false)
        const [adDiagnosis, setAdDiagnosis] = useState(false)
        const [adRecord, setAdRecord] = useState(false)
        const [adFilm, setAdFilm] = useState(false)
        const [adOther, setAdOther] = useState(false)

        useEffect(()=>{
            const fetchData = async() => {
                try{
                    const response = await axios.get(`/admin/advice/detail/${index}`);
                    setAdviceDetails(response.data);
                    console.log("response",response);
                    console.log("insure",response.data.insureDate);
                    setQuestionCount(response.data.adviceQuestions);
    
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
                    setAdmStartDay(response.data.admStart.replaceAll('-', '/'));
              
                    const adm_end_parts = response.data.admEnd.split('-');
                    setAdmEndYear(adm_end_parts[0]);
                    setAdmEndMonth(adm_end_parts[1]);
                    setAdmEndDay(response.data.admEnd.replaceAll('-', '/'));
              
                    const visit_start_parts = response.data.visitStart.split('-');
                    setVisitStartYear(visit_start_parts[0]);
                    setVisitStartMonth(visit_start_parts[1]);
                    setVisitStartDay(response.data.visitStart.replaceAll('-', '/'));
              
                    const visit_end_parts = response.data.visitEnd.split('-');
                    setVisitEndYear(visit_end_parts[0]);
                    setVisitEndMonth(visit_end_parts[1]);
                    setVisitEndDay(response.data.visitEnd.replaceAll('-', '/'));
                    const [zipcode, userroadAddress, userDetailAddress] = response.data.userAddress.split('/');
                    setUaddress(`(${zipcode}) ${userroadAddress} ${userDetailAddress}`);

                    const ptSsNum = response.data.adPtSsNum.split('-');
                    setPtSsNum1(ptSsNum1[0]);
                    setPtSsNum2(ptSsNum2[1]);
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
                    console.log(response.data)
                }catch(error){
                    console.error('유저 정보 에러:',error);
                }
            } ;

            fetchData();
        }, []);

        const generateOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
        };

        const renderQuestionInputs = () => {
            return questionCount.map((question, index) => (
              <div className={advicerequest.row_box} style={{ height: 'auto' }} key={index}>
                <div className={advicerequest.title_box}>
                  질문 {index + 1} 
                </div>
                <div className={advicerequest.input_box}>
                  <input
                    type="text"
                    value={question.adQuestionContent || ''}
                    maxLength={300}
                    readOnly={true}
                  />
                </div>
              </div>
            ));
          };

          const renderAnswerInputs = () => {
            return questionCount.map((question, index) => (
              <div className={advicerequest.row_box} style={{ height: 'auto' }} key={index}>
                <div className={advicerequest.title_box}>
                  답변 {index + 1}
                </div>
                <div className={advicerequest.input_box}>
                  <input
                    type="text"
                    value={question.adAnswerContent || ''}
                    maxLength={300}
                    readOnly={true}
                  />
                </div>
              </div>
            ));
          };
          

    
        const btn_advice_list = async() => {
            navigate('/medic/adminstrator/adlist')
        }


        return(

            
            <div className={advicerequest.advicerequest_wrap}>
                     <div className={advicerequest.iconbox}>
                <h2 className={advicerequest.title}>
                    자문의뢰 상세페이지
                </h2>
                <h4>
                </h4>
             </div>


                <div className={advicerequest.iconbox}>
                    <h3 className={advicerequest.tit}>
                        신청자 정보
                    </h3>
                </div>

                <div className={advicerequest.request_usertable}>
                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>의뢰자명</div>
                        <div className={advicerequest.input_box}>
                            <span>{adviceDetails.uname}</span>
                        </div>
                    </div>

                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>일반전화</div>
                        <div className={advicerequest.input_box}>
                            <span>  {adviceDetails.userTel}</span>
                        </div>
                        </div>
                        <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>휴대전화</div>
                        <div className={advicerequest.input_box}>
                        <span>  {adviceDetails.userPhone}</span>
                        </div>
                    </div>
                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>주소</div>
                        <div className={advicerequest.input_box}>
                        <span>{uaddress}</span>
                        </div>
                    </div>
                </div>

                <div className={advicerequest.iconbox}>
                    <h3 className={advicerequest.tit}>
                        환자의료 기록 사항
                    </h3>
                </div>

                <div className={advicerequest.request_patienttable2}>
                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>환자명</div>
                        <div className={advicerequest.input_box} >
                            <span> {adviceDetails.adPtName}</span>                        
                            </div>
                        </div>
                            <div className={advicerequest.row_box}> 
                        <div className={advicerequest.title_box}>주민등록번호</div>
                        <div className={advicerequest.input_box}>
                            <span>{adviceDetails.adPtSsNum}</span>
                        </div>
                    </div>

                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>진단과목</div>
                        <div className={advicerequest.input_box}>
                        <span>{adviceDetails.adPtSub}</span>
                        </div>
                        </div>
                        <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box} >진단명</div>
                        <div className={advicerequest.input_box}>
                        <span>{adviceDetails.adPtDiagnosis}</span>
                        </div>
                    </div>
                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>과거 진단이력</div>
                        <div className={advicerequest.input_box}>
                        <span>{adviceDetails.adPtRec}</span>
                        </div>
                    </div>
                    <div className={`${advicerequest.row_box}`}>
                        <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>
                            내용
                        </div>
                        <div className={advicerequest.input_box} style={{width : '400px', height : 'auto'}}>
                            <textarea cols="50" rows="5" readOnly value={adviceDetails.adPtCmt}/>

                        </div>
                    </div>
                </div>
                
                <div className={advicerequest.iconbox}>
                    <h3 className={advicerequest.tit}>
                        보험 계약 정보
                    </h3>
                </div>
                <div className={advicerequest.request_insurancetable}>
                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>보험사명</div>
                        <div className={advicerequest.input_box}>
                        <span>{adviceDetails.insurance}</span>
                        </div>
                        </div>
                        <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>계약일자</div>
                        <div className={advicerequest.input_box}>
                        <span>{adviceDetails.insureDate}</span>
                        </div>
                    </div>
                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box}>보험계약명</div>
                        <div className={advicerequest.input_box}>
                        <span>{adviceDetails.insureName}</span>
                        </div>
                    </div>
                </div>
                <div className={advicerequest.iconbox}>
                    <h3 className={advicerequest.tit}>
                        병원치료사항
                    </h3>
                </div>
                <div className={advicerequest.request_hospitaltable}>
                    <div className={advicerequest.row_box} >
                        <div className={advicerequest.title_box} >1차 치료 병원명</div>
                        <div className={advicerequest.input_box}>
                        <span>{adviceDetails.hospital}</span> 
                        </div>
                    </div>
                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box} >입원 치료기간</div>
                        <div className={advicerequest.input_box}>
                            <div className={advicerequest.datebox}>
                            <span>{admStartDay}</span>                               
                             ~
                             <span>{admEndDay}</span>
                            </div>                       
                            </div>
                    </div>
                    <div className={advicerequest.row_box}>
                        <div className={advicerequest.title_box} >통원 치료기간</div>
                        <div className={advicerequest.input_box} >
                          
                            <span>{visitStartDay}</span>
                               ~
                               <span>{visitEndDay}</span>
                                                        
                        </div>
                    </div>
                    <div className={advicerequest.row_box}>
                        <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>
                            치료사항
                        </div>
                        <div className={advicerequest.input_box} style={{width : '400px', height : 'auto'}}>
                            <textarea cols="50" rows="5" readOnly value={adviceDetails.treatCmt} ></textarea>
                        </div>
                    </div>
                </div>
                <div className={advicerequest.iconbox}>
                    <h3 className={advicerequest.tit}> 
                        기타사항
                    </h3>
                </div>
                <div className={advicerequest.request_othertable}>
                    <div className={advicerequest.row_box} >
                        <div className={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>기타사항</div>
                        <div className={advicerequest.input_box} style={{width : '400px', height : 'auto'}}>
                            <textarea cols="5" rows="5" name="adEtc" readOnly value={adviceDetails.adEtc} ></textarea>
                        </div>
                    </div>
                </div>
                <div className={advicerequest.iconbox} >
                    <h3 className={advicerequest.tit}>
                       
                        질문지 작성
                    </h3>
                </div>
                <div className = {advicerequest.request_questiontable}>
                    <div className={advicerequest.row_box} style={{height : 'auto'}}>
                        <div className={advicerequest.title_box}>
                            질문 항목수
                        </div>
                        <div className={advicerequest.input_box}>
                            <input
                                type="text"
                                value={questionCount.length||0}
                                disabled={true}
                            />
                        </div>
                    </div>
                        {renderQuestionInputs()}
                    </div>

                    <div className={advicerequest.iconbox} >
                    <h3 className={advicerequest.tit}>
                       
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
                                value={questionCount.length}
                            />
                        </div>
                    </div>
                        {renderAnswerInputs()}
                    </div>

                <div className={advicerequest.iconbox}>
                    <h3 className={advicerequest.tit}>
                        
                            첨부자료
                    </h3>
                </div>
                <div className={advicerequest.file_table} >
                    <div className={advicerequest.row_box} style={{height : 'auto'}}>
                        <div className={advicerequest.title_box}>
                            자문의뢰신청서
                        </div>
                        <div className={advicerequest.input_box}>
                        {
                            adReqForm ? 
                            <button className={advicerequest.btn_file_download}>
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
                    <div className={advicerequest.row_box} style={{height : 'auto'}}>
                        <div className={advicerequest.title_box}>
                            진단서
                        </div>
                        <div className={advicerequest.input_box}>
                        {
                            adDiagnosis ?
                            <button className={advicerequest.btn_file_download}> 
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
                    <div className={advicerequest.row_box} style={{height : 'auto'}}>
                        <div className={advicerequest.title_box}>
                            의무기록지
                        </div>
                        <div className={advicerequest.input_box}>
                        {
                            adRecord ?
                            <button className={advicerequest.btn_file_download}>
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
                    <div className={advicerequest.row_box} style={{height : 'auto'}}>
                        <div className={advicerequest.title_box}>
                            필름
                        </div>
                        <div className={advicerequest.input_box}>
                        {
                            adFilm ?
                            <button className={advicerequest.btn_file_download}>
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
                    <div className={advicerequest.row_box} style={{height : 'auto' }} >
                        <div className={advicerequest.title_box}>
                            기타 자료
                        </div>
                        <div className={advicerequest.input_box}>
                            {
                                adOther ?
                                <button className={advicerequest.btn_file_download}>
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
                    <div className={advicerequest.complete} style={{marginBottom:'px'}}>
                        
                        <button type = "button" className={advicerequest.complete_button} onClick={btn_advice_list}>목록</button>
                    </div>
                </div>
            </div>  
        )
    }