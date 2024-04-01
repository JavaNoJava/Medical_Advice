import React, { useState, useEffect } from 'react';
import advicerequest from '../../css/AdviceDetailpage.module.css'
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

    const [admStartDay, setAdmStartDay] = useState('');

    const [admEndDay, setAdmEndDay] = useState('');

    const [visitStartDay, setVisitStartDay] = useState('');

    const [visitEndDay, setVisitEndDay] = useState('');

    const [insureYear, setInsureYear] = useState(2000);  
    const [insureMounth, setInsureMonth] = useState(1);
    const [insureDay, setInsureDay] = useState(1);

    const [treat_cmt_count, setTreatCmtCount] = useState(0);
    const [ad_etc_count, setAdEtcCount] = useState(0);
    const [adPtSsNum, setAdPtSsNum] = useState();

    const [adQuestion, setAdQuestion] = useState(0);
    const [adAnswer, setAdAnswer] = useState(0);

    const [questionCount, setQuestionCount] = useState([]);
    const [insureDate, setInsureDate] = useState([]);


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
            setInsureDate(response.data.insureDate.replaceAll('-', '/'))
            setAdPtSsNum(response.data.adPtSsNum);
            setAdmStartDay(response.data.admStart.replaceAll('-', '/'))
            setAdmEndDay(response.data.admEnd.replaceAll('-', '/'))
            setVisitStartDay(response.data.visitStart.replaceAll('-', '/'))
            setVisitEndDay(response.data.visitEnd.replaceAll('-', '/'))
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
            const [zipcode, userroadAddress, userDetailAddress] = response.data.userAddress.split('/');
            console.log(response.data)
            setUname(response.data.name)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(`(${zipcode}) ${userroadAddress} ${userDetailAddress}`);
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
                        <span>{uname}</span>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>일반전화</div>
                    <div className={advicerequest.input_box}>
                        <span>{utel}</span>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>휴대전화</div>
                    <div className={advicerequest.input_box}>
                        <span>{uphone}</span>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>주소</div>
                    <div className={advicerequest.input_box} style={{width: "500px"}}>
                        <span>{uaddress}</span>
                    </div>
                </div>
             </div>
             <div className={advicerequest.iconbox}>
                <h3 className={advicerequest.tit}>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={advicerequest.request_patienttable}>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>환자명</div>
                    <div className={advicerequest.input_box}>
                        <span>{adviceDetails.adPtName}</span>
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
                    <div className={advicerequest.title_box}>진단명</div>
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
                <div className={advicerequest.row_box}>
                    <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>
                            내용
                    </div>
                    <div className={advicerequest.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={adviceDetails.adPtCmt} readOnly/>
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
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>1차 치료 병원명</div>
                    <div className={advicerequest.input_box}>
                        <span>{adviceDetails.hospital}</span>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>입원 치료기간</div>
                    <div className={advicerequest.input_box}>
                        <span>{admStartDay}</span>
                        ~
                        <span>{admEndDay}</span>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>통원 치료기간</div>
                    <div className={advicerequest.input_box}>
                        <span>{visitStartDay}</span>
                        ~
                        <span>{visitEndDay}</span>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>
                        치료사항
                    </div>
                    <div className={advicerequest.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={adviceDetails.treatCmt} readOnly/>
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
                    <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>
                        기타사항
                    </div>
                    <div className={advicerequest.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={adviceDetails.adEtc} readOnly/>
                    </div>
                </div>
            </div>
            <div className={advicerequest.iconbox}>
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
                            name="adQuestionTotal"
                            value={adQuestion.length}
                        />
                    </div>
                </div>
                    {renderQuestionInputs()}
            </div>
        {adviceDetails.admProgressStatus === '자문완료' && (
            <div>
            <div className={advicerequest.iconbox}>
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
                            name="adQuestionTotal"
                            value={adAnswer.length}
                        />
                    </div>
                </div>
                    {renderQuestionInputs()}
            </div>
                    </div>
        )}
             <div className={advicerequest.iconbox}>
                <h3 className={advicerequest.tit}>
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
                            <button className={advicerequest.btn_file_download}>
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
                            <button className={advicerequest.btn_file_download}>
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
                            <button className={advicerequest.btn_file_download}>
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
                            <button className={advicerequest.btn_file_download}> 
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
                            <button className={advicerequest.btn_file_download}>
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
                    <button type="button" onClick={btn_goto_list} className={advicerequest.complete_button}>목록</button>
                    <button type="button" onClick={btn_edit} className={advicerequest.complete_button}>수정</button>
                 </div>
            </div>
             </div> 
    )
}