import React, { useState, useEffect } from 'react';
import analyzerequest from '../../css/AdDetailRequestPage.module.css'
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

export default function AdDetailAnalyze(){
    const {index} = useParams();
    const [analyzeDetails, setAnalyzeDetails] = useState({});


    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [anPtName, setAnptname] = useState('')
    
    const [anPtSub, setAnptsub] = useState('');
    const [anPtDiagnosis, setAnptdiagnosis] = useState('')
    const [anPtCmt, setAnptcmt] = useState('')

    //기타사항
    const [anEtcValue, setAnEtcValue] = useState('');
    const [anEtcCount, setAnetccount] = useState(0)

    const [anQuestionTotal, setAnQuestionTotal] = useState(1);
    const [anQuestionContents, setAnQuestionContents] = useState([]);
    const [contentsCount, setContentscount] = useState(0)
    const [anptssnum1, setAnPtSsNum1] = useState(0);
    const [anptssnum2, setAnPtSsNum2] = useState(0);

    const [anReqForm, setAnReqForm] = useState(false)
    const [anDiagnosis, setAnDiagnosis] = useState(false)
    const [anRecord, setAnRecord] = useState(false)
    const [anFilm, setAnFilm] = useState(false)
    const [anOther, setAnOther] = useState(false)

    const [anQuestion, setAnQuestion] = useState(0);
    

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.get(`/admin/analyze/detail/${index}`);
                setAnalyzeDetails(response.data);
                console.log("response",response);
                console.log("response1",response.data.analyzeRequests);
                const anptssnum = response.data.anPtSsNum.split('-');
                setAnQuestion(response.data.analyzeRequestList);
                setAnPtSsNum1(anptssnum[0]);
                setAnPtSsNum2(anptssnum[1]);
                const [zipcode, userroadAddress, userDetailAddress] = response.data.userAddress.split('/');
                setUaddress(`(${zipcode}) ${userroadAddress} ${userDetailAddress}`);

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
                        return false
                    } else{
                        return true
                    }
                })
                console.log(response.data)

               
            }catch(error){
                console.error('유저 정보 에러:',error);
            }
        }
        fetchData();
    }, [])

    const renderQuestionInputs = () => {
        if (!anQuestion || anQuestion.length === 0) {
            return null; // 또는 다른 처리를 수행하거나 빈 배열을 반환
          }
        return anQuestion.map((question, index) => (
            
          <div className={analyzerequest.row_box} style={{ height: 'auto' }} key={index}>
            <div className={analyzerequest.title_box}>
              질문 {index + 1} 
            </div>
            <div className={analyzerequest.input_box}>
              <input
                type="text"
                value={question.anQuestionContent || ''}
                maxLength={300}
                readOnly={true}
              />
            </div>
          </div>
        ));
      };

      const renderAnswerInputs = () => {
        if (!anQuestion || anQuestion.length === 0) {
            return null; 
          }
          
        return anQuestion.map((question, index) => (
          <div className={analyzerequest.row_box} style={{ height: 'auto' }} key={index}>
            <div className={analyzerequest.title_box}>
              답변 {index + 1} 
            </div>
            <div className={analyzerequest.input_box}>
              <input
                type="text"
                value={question.anAnswerContent || ''}
                maxLength={300}
                readOnly={true}
              />
            </div>
          </div>
        ));
      };



 
      
      const btn_analyze_list = async() => {
          navigate('/medic/adminstrator/anlist')
      }

    return(
        <div className={analyzerequest.analyzerequest_wrap}>
      
      <div className={analyzerequest.iconbox}>
                <h2 className={analyzerequest.title}>
                    분석의뢰 상세페이지
                </h2>
                <h4>
                </h4>
             </div>

             <div className={analyzerequest.iconbox}>
                <h3 className={analyzerequest.tit}>
                    신청자 정보
                </h3>
             </div>

             <div className={analyzerequest.request_usertable}>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>의뢰자명</div>
                    <div className={analyzerequest.input_box}>
                    <span>{analyzeDetails.uname}</span>
                    </div>
                </div>

                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>일반전화</div>
                    <div className={analyzerequest.input_box}>
                            <span>  {analyzeDetails.userTel}</span>
                    </div>
                    </div>
                    <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box} >휴대전화</div>
                    <div className={analyzerequest.input_box}>
                    <span>  {analyzeDetails.userPhone}</span>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>주소</div>
                    <div className={analyzerequest.input_box}>
                    <span>{uaddress}</span>
                    </div>
                </div>
             </div>
             <div className={analyzerequest.iconbox}>
                <h3 className={analyzerequest.tit}>
                   
                    환자의료 기록 사항
                </h3>
            </div>

            <div className={analyzerequest.request_othertable}>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>환자명</div>
                    <div className={analyzerequest.input_box}>
                    <span> {analyzeDetails.anPtName}</span>                        
                    </div>
                    </div>
                    <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box} >주민등록번호</div>
                    <div className={analyzerequest.input_box} >
                     <span>{analyzeDetails.anPtSsNum}</span>

                    </div>
                </div>

                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>진단과목</div>
                    <div className={analyzerequest.input_box}>
                    <span>{analyzeDetails.anPtSub}</span>
                    </div>
                    </div>
                    <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box} >진단명</div>
                    <div className={analyzerequest.input_box}>
                    <span>{analyzeDetails.anPtDiagnosis}</span>
                    </div>
                </div>

                <div className={analyzerequest.row_box}>
                    <div className ={analyzerequest.title_box} style={{height:'128px'}} >
                        진단 사항
                    </div>
                    <div className={analyzerequest.input_box} style={{width : '400px', height : 'auto'}} >
                        <textarea cols="50" rows="5" readOnly value={analyzeDetails.anPtDiagContent}/> 
                    </div>
                </div>

            </div>
            <div className={analyzerequest.iconbox}>
                <h3 className={analyzerequest.tit}> 
                
                    기타사항
                </h3>
            </div>
            <div className={analyzerequest.request_othertable}>
                <div className={analyzerequest.row_box} >
                    <div className={`${analyzerequest.title_box} ${analyzerequest.row_contentbox}` }>기타사항</div>
                    <div className={analyzerequest.input_box} style={{width : '400px', height : 'auto'}} >
                        <textarea cols="50" rows="5" name="anEtc" readOnly value={analyzeDetails.anEtc} ></textarea>
                        </div>
                </div>
            </div>
            <div className={analyzerequest.iconbox} >
                <h3 className={analyzerequest.tit}>
                    질문지 작성
                </h3>
            </div>
            <div className = {analyzerequest.request_questiontable}>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        질문 항목수
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input
                            type="text"
                            disabled={true}
                            value={anQuestion ? anQuestion.length : 0}                        />
                    </div>
                </div>
                {renderQuestionInputs()}
                </div>

                <div className={analyzerequest.iconbox}>
                    <h3 className={analyzerequest.tit}>
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
                            value={anQuestion ? anQuestion.length : 0}                        />
                    </div>
                </div>
                {renderAnswerInputs()}
                </div>


             <div className={analyzerequest.iconbox} >
                <h3 className={analyzerequest.tit}> 
                        첨부자료
                </h3>
            </div>
            <div className={analyzerequest.file_table} style={{marginBottom:'1100px'}}>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        분석의뢰신청서
                    </div>
                    <div className={analyzerequest.input_box}>
                        {
                            anReqForm ?
                            <button className={analyzerequest.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anReqForm`}
                                    download="anReqForm.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            : 
                            "업로드된 파일이 없습니다."
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
                            <button className={analyzerequest.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anDiagnosis`}
                                    download="anDiagnosis.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
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
                            <button className={analyzerequest.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anRecord`}
                                    download="anRecord.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
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
                            <button className={analyzerequest.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anFilm`}
                                    download="anFilm.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
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
                            <button className={analyzerequest.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anOther`}
                                    download="anOther.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
                        }    
                    </div>
                </div>
                <div className={analyzerequest.complete}>
                    <button type = "button" className={analyzerequest.complete_button} onClick={btn_analyze_list}>목록</button>
                 </div>
            </div>
        </div>
    )
    }