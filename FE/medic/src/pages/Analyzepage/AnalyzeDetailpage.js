import React, { useState, useEffect } from 'react';
import analyzerequest from '../../css/AnalyzeRequestpage.module.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AnalyzeDetailpage(){
    const [imageError, setImageError] = useState(false);
    
    const navigate = useNavigate();
    const startYear = 1960;

    const {index} = useParams();

    const [analyzeDetails, setAnalyzeDetails] = useState({});

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    const [anPtSsNum1, setAnPtSsNum1] = useState();
    const [anPtSsNum2, setAnPtSsNum2] = useState();

    const [an_etc_count, setAnEtcCount] = useState(0);

    const [anReqForm, setAnReqForm] = useState(false)
    const [anDiagnosis, setAnDiagnosis] = useState(false)
    const [anRecord, setAnRecord] = useState(false)
    const [anFilm, setAnFilm] = useState(false)
    const [anOther, setAnOther] = useState(false)

    const [anQuestion, setAnQuestion] = useState(0);

    const getAnalyzeRequest = async() => {
            try{
                const response = await axios.get(`/user/analyze/detail/${index}`);
                setAnalyzeDetails(response.data);
                console.log("response",response);
                console.log("response1",response.data.analyzeRequests);
                setAnQuestion(response.data.analyzeRequests);
                const an_PtSsNum = response.data.anPtSsNum.split('-');
                setAnPtSsNum1(an_PtSsNum[0]);
                setAnPtSsNum2(an_PtSsNum[1]);
            setAnReqForm(() => {
                if(response.data.anReqForm === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAnDiagnosis(()=>{
                if(response.data.anDiagnosis === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAnRecord(()=>{
                if(response.data.anRecord === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAnFilm(()=>{
                if(response.data.anFilm === "empty_file"){
                    return false
                } else{
                    return true
                }
            })
            setAnOther(()=>{
                if(response.data.anOther === "empty_file"){
                    console.log(1)
                    return false
                } else{
                    return true
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
        getAnalyzeRequest()
    },{index})

    const btn_goto_list = () => {
        navigate('/medic/analyze/analyzeList');
    }

    const btn_edit = () => {
        if (analyzeDetails.adMdDate == null) {
            navigate(`/medic/analyze/analyzeUpdate/${index}`);
        } else {
            alert("분석의뢰 신청이 전문의에게 배정된 이후로는 수정할 수 없습니다.")
        }
    }

    const renderQuestionInputs = () => {
        if (!anQuestion || anQuestion.length === 0) {
            return null; // 또는 다른 처리를 수행하거나 빈 배열을 반환
          }
        return anQuestion.map((question, index) => (
            
          <div className={analyzerequest.row_box} style={{ height: 'auto' }} key={index}>
            <div className={analyzerequest.title_box}>
              질문 {index + 1} 입력
            </div>
            <div className={analyzerequest.input_box}>
              <input
                type="text"
                value={question.anQuestionContent || ''}
                maxLength={300}
              />
            </div>
          </div>
        ));
      };

      const renderAnswerInputs = () => {
        if (!anQuestion || anQuestion.length === 0) {
            return null; // 또는 다른 처리를 수행하거나 빈 배열을 반환
          }
        return anQuestion.map((question, index) => (
          <div className={analyzerequest.row_box} style={{ height: 'auto' }} key={index}>
            <div className={analyzerequest.title_box}>
              답변 {index + 1} 입력
            </div>
            <div className={analyzerequest.input_box}>
              <input
                type="text"
                value={question.anAnswerContent || ''}
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
        <div className={analyzerequest.anvicerequest_wrap}>
            <div className={analyzerequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    분석의뢰 상세페이지
                </h2>
             </div>
             <div className={analyzerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={analyzerequest.request_usertable}>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>의뢰자명</div>
                    <div className={analyzerequest.input_box}><input type="text" disabled={true} value={uname}/></div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>일반전화</div>
                    <div className={analyzerequest.input_box}><input type="text" disabled={true} value={utel}/></div>
                    <div className={analyzerequest.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={analyzerequest.input_box}><input type="text" disabled={true} value={uphone}/></div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>주소</div>
                    <div className={analyzerequest.input_box}><input type="text" disabled={true} value={uaddress}/></div>
                </div>
             </div>
             <div className={analyzerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={analyzerequest.request_patienttable}>
                <div className={`${analyzerequest.row_box} ${analyzerequest.patient_box}`}>
                    <div className={`${analyzerequest.title_box} ${analyzerequest.patient_box}`}>환자명</div>
                    <div className={`${analyzerequest.input_box} ${analyzerequest.patient_box}`}>
                            <input type="text" name="an_ptname" disabled={true} value={analyzeDetails.anPtName} ></input>
                    </div>
                    <div className={`${analyzerequest.title_box} ${analyzerequest.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${analyzerequest.input_box} ${analyzerequest.input_ptssnumbox} ${analyzerequest.patient_box}`}>
                        <input type="text" name="an_ptssnum1" disabled={true} value={anPtSsNum1}></input>
                         -
                        <input type="password" name="an_ptssnum2" disabled={true} value={anPtSsNum2}></input>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>진단과목</div>
                    <div className={analyzerequest.input_box}>
                             <input type="text" name="an_ptsub" disabled={true} value={analyzeDetails.anPtSub} />
                    </div>
                    <div className={analyzerequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={analyzerequest.input_box}>
                            <input type="text" name="an_ptdiagnosis" disabled={true} value={analyzeDetails.anPtDiagnosis} />
                    </div>
                </div>
                <div className={`${analyzerequest.row_box}`}>
                    <div className ={`${analyzerequest.title_box} ${analyzerequest.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={analyzerequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" disabled={true} value={analyzeDetails.anPtDiagContent}/>
                        <div className={analyzerequest.count_box}>
                            <span>/500</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={analyzerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={analyzerequest.request_othertable}>
                <div className={analyzerequest.row_box} >
                    <div className={analyzerequest.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={analyzerequest.input_box} style={{width : '400px'}}>
                        <textarea cols="50" rows="3" name="anEtc" disabled={true} value={analyzeDetails.anEtc} ></textarea>
                        <div className={analyzerequest.count_box}>
                            <span>{an_etc_count}/300</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={analyzerequest.iconbox} style={{marginTop : '50px'}}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    질문지 작성
                </h3>
            </div>
            <div className = {analyzerequest.request_questiontable}>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        질문 항목 수
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input
                            type="text"
                            disabled={true}
                            value={anQuestion ? anQuestion.length : 0}/>
                </div>
                </div>
                {renderQuestionInputs()}
                </div>
        {analyzeDetails.anProgressStatus === '분석완료' && (
            <div>
            <div className={analyzerequest.iconbox} style={{marginTop : '50px'}}>
                    <h3>
                        <i className="fa-solid fa-circle icon"></i>
                        전문의 답변
                    </h3>
                    </div>

                <div className = {analyzerequest.request_questiontable}>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        답변 항목수
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input
                            type="text"
                            name="anQuestionTotal"
                            disabled={true}
                            value={anQuestion ? anQuestion.length : 0}
                        />
                    </div>
                </div>
                {renderAnswerInputs()}
                </div>
                </div>
                )}
             <div className={analyzerequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                        첨부자료
                </h3>
            </div>
            <div className={analyzerequest.file_table}>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        분석의뢰신청서
                    </div>
                    <div className={analyzerequest.input_box}>
                        {
                            anReqForm ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anReqForm`}
                                    download="anReqForm.jpg"
                                    style={{ display: imageError ? 'none' : 'block' }}
                                >
                                    다운로드
                                </a>
                            </button>
                            : 
                            "해당 파일이 존재하지 않습니다."
                        }
                        
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        진단서
                    </div>
                    <div className={analyzerequest.input_box}>
                        {
                            anDiagnosis ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anDiagnosis`}
                                    download="anDiagnosis.jpg"
                                    style={{ display: imageError ? 'none' : 'block' }}
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                        
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        의무기록지
                    </div>
                    <div className={analyzerequest.input_box}>
                        {
                            anRecord ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anRecord`}
                                    download="anRecord.jpg"
                                    style={{ display: imageError ? 'none' : 'block' }}
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                        
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        필름
                    </div>
                    <div className={analyzerequest.input_box}>
                        {
                            anFilm ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anFilm`}
                                    download="anFilm.jpg"
                                    style={{ display: imageError ? 'none' : 'block' }}
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                        
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        기타자료
                    </div>
                    <div className={analyzerequest.input_box}>
                        {
                            anOther ?
                            <button>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anOther`}
                                    download="anOther.jpg"
                                    style={{ display: imageError ? 'none' : 'block' }}
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }                      
                    </div>
                </div>
                <div className={analyzerequest.complete}>
                    <button type="button" onClick={btn_goto_list} className={analyzerequest.btt_complete}>목록</button>
                    <button type="button" onClick={btn_edit} className={analyzerequest.btt_complete}>수정</button>
                    </div>
                 </div>
            </div>
    )
}