import React, { useState, useEffect } from 'react';
import assignmentanalyzedetail from '../../css/ConsultativeAnalyzeAssignmentDetailpage.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConsultativeAnalyzeAssignmentDetailpage(){
    const navigate = useNavigate();
  
    const {index} = useParams();
    
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [an_ptname, setAnptname] = useState('')
    const [an_ptssnum, setAnptssnum] = useState('');
    const [an_ptsub, setAnptsub] = useState('');
    const [an_ptdiagnosis, setAnptdiagnosis] = useState('')
    const [an_ptdiagcontent, setAnptdiagcontent] = useState('')

    //기타사항
    const [anEtcValue, setAnEtcValue] = useState('');

    // 질문지
    const [anQuestionTotal, setAnQuestionTotal] = useState('');
    const [anQuestionContents, setAnQuestionContents] = useState([]);
    const [anAnswerContents, setAnAnswerContents] = useState([]);
    
    //분석의뢰 파일
    const [anReqForm, setAnReqForm] = useState(false)
    const [anDiagnosis, setAnDiagnosis] = useState(false)
    const [anRecord, setAnRecord] = useState(false)
    const [anFilm, setAnFilm] = useState(false)
    const [anOther, setAnOther] = useState(false)

    const [anAnswerDate, setAnAnswerDate] = useState('');

    const [assignmentAnalyze, setAssignmentAnalyze] = useState('');

    const getUserInfo = async() =>{
        try{
            const response = await axios.get(`/consultative/assignedAnalyze/detail/${index}`)
            const [zipcode, userroadAddress, userDetailAddress] = response.data.userAddress.split('/');
            console.log(response)
            setAssignmentAnalyze(response.data)
            setUname(response.data.uname)
            setUtel(response.data.userTel)
            setUphone(response.data.userPhone)
            setUaddress(`(${zipcode}) ${userroadAddress} ${userDetailAddress}`);
            setAnptname(response.data.anPtName)
            setAnptsub(response.data.anPtSub)
            setAnptdiagnosis(response.data.anPtDiagnosis)
            setAnptdiagcontent(response.data.anPtDiagContent)
            setAnEtcValue(response.data.anEtc)
            setAnQuestionTotal(response.data.anQuestionContent)
            setAnQuestionContents(response.data.anQuestionContent)
            setAnAnswerContents(response.data.anAnswerContent)
            setAnptssnum(response.data.anPtSsNum);

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

    useEffect(()=>{
        getUserInfo()
    }, [])


    const renderQuestionInputs = () => {
        return anQuestionContents.map((content, index) => (
          <div className={assignmentanalyzedetail.row_box} style={{ height: 'auto' }} key={index}>
            <div className={assignmentanalyzedetail.title_box}>
              질문 {index + 1}
            </div>
            <div className={assignmentanalyzedetail.input_box}>
              <input
                type="text"
                name={`anQuestionContent_${index}`}
                value={content}
                readOnly
                maxLength={300}
              />
            </div>
            <div className={assignmentanalyzedetail.title_box}>
              답변 {index + 1}
            </div>
            <div className={assignmentanalyzedetail.input_box}>
              <input
                type="text"
                name={`anAnswerContent_${index}`}
                value={anAnswerContents[index] || ''}
                onChange={(e) => handleAnswerContentChange(index, e)}
                maxLength={300}
              />
            </div>
          </div>
        ));
      };
      
    const handleAnswerContentChange = (index, event) => {
        const newAnswerContents = [...anAnswerContents];
        newAnswerContents[index] = event.target.value;
        setAnAnswerContents(newAnswerContents);
    };

    const saveAnalysisResponse = async () => {

        const today = new Date()
        try {
            const response = await axios.put(`/consultative/assignedAnalyze/answer/${index}`, {
                anAnswerContent: anAnswerContents,
                anAnswerDate: today
            });
            setAnAnswerDate(today);
            alert('분석의뢰 답변이 저장되었습니다.')
            navigate('/')
            console.log(response.data); 
        } catch (error) {
            console.error('Error saving analysis response:', error);
        }
    };
    
    const btn_analyze_request = async() => {
        if (assignmentAnalyze.anProgressStatus === '결제하기' || assignmentAnalyze.anProgressStatus === '분석완료') {
            alert("회원에게 답변이 전달되면 답변을 수정할 수 없습니다.");
        } else {
            await saveAnalysisResponse();
        }
    };

    
    const btn_analyze_cancle = async() => {
        navigate('/')
    }
    return(
        <div className={assignmentanalyzedetail.analyzereequest_wrap}>
            <div className={assignmentanalyzedetail.iconbox}>
                <h2 className={assignmentanalyzedetail.title}>
                    분석의뢰 답변
                </h2>
                <h4 className={assignmentanalyzedetail.title_bottom}>
                    - 분석의뢰 질문에 대한 답변을 모두 입력해주세요.
                </h4>
             </div>

            {/* 신청자 정보*/}

            <div className={assignmentanalyzedetail.iconbox}>
                <h3 className={assignmentanalyzedetail.tit}>
                    신청자 정보
                </h3>
            </div>
            <div className={assignmentanalyzedetail.request_usertable}>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>의뢰자명</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <span>{uname}</span>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>일반전화</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <span>{utel}</span>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>휴대전화</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <span>{uphone}</span>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>주소</div>
                    <div className={assignmentanalyzedetail.input_box} style={{width: "500px"}}>
                        <span>{uaddress}</span>
                    </div>
                </div>
            </div>

            {/* 환자의료 기록 정보*/}

            <div className={assignmentanalyzedetail.iconbox}>
                <h3 className={assignmentanalyzedetail.tit}>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={assignmentanalyzedetail.request_patienttable}>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>환자명</div>
                    <div className={assignmentanalyzedetail.input_box}>
                       <span>{an_ptname}</span>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>주민등록번호</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <span>{an_ptssnum}</span>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>진단과목</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <span>{an_ptsub}</span>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className={assignmentanalyzedetail.title_box}>진단명</div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <span>{an_ptdiagnosis}</span>
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box}>
                    <div className ={`${assignmentanalyzedetail.title_box} ${assignmentanalyzedetail.row_contentbox}`}>
                            진단 사항
                    </div>
                    <div className={assignmentanalyzedetail.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={an_ptdiagcontent} readOnly/>
                    </div>
                </div>
            </div>

            {/* 기타사항 정보*/}

            <div className={assignmentanalyzedetail.iconbox}>
                <h3 className={assignmentanalyzedetail.tit}>
                    기타사항
                </h3>
            </div>
            <div className={assignmentanalyzedetail.request_othertable}>
                <div className={assignmentanalyzedetail.row_box} >
                    <div className ={`${assignmentanalyzedetail.title_box} ${assignmentanalyzedetail.row_contentbox}`}>
                        기타사항
                    </div>
                    <div className={assignmentanalyzedetail.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={anEtcValue} readOnly/>
                    </div>
                </div>
            </div>

            {/* 질문지 정보*/}

            <div className={assignmentanalyzedetail.iconbox}>
                <h3 className={assignmentanalyzedetail.tit}>
                    질문지 작성
                </h3>
            </div>
            <div className = {assignmentanalyzedetail.request_questiontable}>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        질문 항목수
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        <input
                            type="text"
                            name="anQuestionTotal"
                            value={anQuestionTotal.length}
                        />
                    </div>
                </div>
                    {renderQuestionInputs()}
            </div>

            {/* 첨부자료 정보*/}

            <div className={assignmentanalyzedetail.iconbox}>
                <h3 className={assignmentanalyzedetail.tit}>
                    첨부자료
                </h3>
            </div>
            <div className={assignmentanalyzedetail.file_table}>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        분석의뢰신청서
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        {
                            anReqForm ?
                            <button className={assignmentanalyzedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anReqForm`}
                                    download="anReqForm.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            : 
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        진단서
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        {
                            anDiagnosis ?
                            <button className={assignmentanalyzedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anDiagnosis`}
                                    download="anDiagnosis.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        의무기록지
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        {
                            anRecord ?
                            <button className={assignmentanalyzedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anRecord`}
                                    download="anRecord.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        필름
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                        {
                            anFilm ?
                            <button className={assignmentanalyzedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anFilm`}
                                    download="anFilm.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
                <div className={assignmentanalyzedetail.row_box} style={{height : 'auto'}}>
                    <div className={assignmentanalyzedetail.title_box}>
                        기타자료
                    </div>
                    <div className={assignmentanalyzedetail.input_box}>
                    {
                            anOther ?
                            <button className={assignmentanalyzedetail.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/analyze/findFile/${index}/anOther`}
                                    download="anOther.jpg"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "해당 파일이 존재하지 않습니다."
                        }
                    </div>
                </div>
            </div>

            <div className={assignmentanalyzedetail.complete}>
                <button type = "button" className={assignmentanalyzedetail.complete_button} onClick={btn_analyze_request}>분석의뢰 답변 저장</button>
                <button type = "button" className={assignmentanalyzedetail.complete_button} onClick={btn_analyze_cancle}>취소</button>
            </div>
        </div>
    )
}