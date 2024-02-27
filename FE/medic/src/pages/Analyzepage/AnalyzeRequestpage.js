import React, { useState, useEffect } from 'react';
import analyzerequest from '../../css/AnalyzeRequestpage.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AnalyzeRequestpage(){
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [an_ptname, setAnptname] = useState('')
    const [an_ptssnum1, setAnptssnum1] = useState('');
    const [an_ptssnum2, setAnptssnum2] = useState('');
    const [an_ptsub, setAnptsub] = useState('');
    const [an_ptdiagnosis, setAnptdiagnosis] = useState('')
    const [an_ptdiagcontent, setAnptdiagcontent] = useState('')

    //기타사항
    const [anEtcValue, setAnEtcValue] = useState('');
    const [an_etc_count, setAnetccount] = useState(0)

    const [anQuestionTotal, setAnQuestionTotal] = useState(1);
    const [anQuestionContents, setAnQuestionContents] = useState([]);
    const [contents_count, setContentscount] = useState(0)
    
    const [anReqForm, setAnReqForm] = useState(null)
    const [anDiagnosis, setAnDiagnosis] = useState(null)
    const [anRecord, setAnRecord] = useState(null)
    const [anFilm, setAnFilm] = useState(null)
    const [anOther, setAnOther] = useState(null)


    const navigate = useNavigate()
    const allAnalyzeRequest = new FormData()

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
    }, [])

    const renderQuestionInputs = () => {
        return Array.from({ length: anQuestionTotal }, (_, index) => (
          <div className={analyzerequest.row_box} style={{height : 'auto'}} key={index}>
            <div className={analyzerequest.title_box}>
              질문 {index + 1} 입력
            </div>
            <div className={analyzerequest.input_box}>
              <input
                type="text"
                name={`anQuestionContent_${index}`}
                value={anQuestionContents[index] || ''}
                onChange={(e) => handleQuestionContentChange(index, e)}
                maxLength={300}
              />
            </div>
          </div>
        ));
    };

    const handleAnEtcChange = (e) => {
        setAnEtcValue(e.target.value);
        setAnetccount(e.target.value.length)
    };
  
    const handleQuestionTotalChange = (e) => {
        let value = parseInt(e.target.value, 10);
        value = isNaN(value) ? '' : Math.min(Math.max(value, 1), 5); // Ensure the value is between 1 and 10
        setAnQuestionTotal(value);
    };
      
    const handleQuestionContentChange = (index, e) => {
        const newContents = [...anQuestionContents];
        newContents[index] = e.target.value;
        setAnQuestionContents(newContents);
    };
      
    const input_an_ptname = e => {
        setAnptname(e.target.value)
    }
    const input_an_ptssnum1 = e => {
        setAnptssnum1(e.target.value)
        console.log(e.target.value + '-')
    }
    const input_an_ptssnum2 = e => {
        setAnptssnum2(e.target.value)
    }
    const input_an_ptsub = e => {
        setAnptsub(e.target.value)
    }
    const input_an_ptdiagnosis = e => {
        setAnptdiagnosis(e.target.value)
    }
    const input_an_ptdiagcontent = e => {
        const contents = e.target.value
        setAnptdiagcontent(contents)
        setContentscount(contents.length)
    }
    const isFormValid = () => {
          // 여러 입력 필드와 텍스트 영역의 유효성을 확인
          const isUserInfoValid = uname && utel && uphone && uaddress;
          const isPtInfoValid = an_ptname && an_ptssnum1 && an_ptssnum2 && an_ptsub && an_ptdiagnosis;
          const isEtcInfoValid = anEtcValue;
          const isQuestionInfoValid = anQuestionContents.every(content => content); // 모든 질문 내용이 비어있지 않아야 함
        
          // 모든 조건을 만족하면 true를 반환
          return isUserInfoValid && isPtInfoValid && isEtcInfoValid && isQuestionInfoValid;
        };
      const btn_analyze_request = async() => {
           // 유효성 검사
          if (!isFormValid()) {
              alert('입력값을 확인해주세요.');
              return;
          }
          const an_PtSsNum = an_ptssnum1 + "-" + an_ptssnum2
          const today = new Date()

          const anFile = [anReqForm, anDiagnosis, anRecord, anFilm, anOther]
          const anFile_toString = []
          anFile.forEach(file => {
            if (file === null || typeof file === 'undefined') {
                anFile_toString.push("empty_file")
            } else {
                allAnalyzeRequest.append('files', file);
                anFile_toString.push("no_empty_file")
            }
        });
            allAnalyzeRequest.append("dto", new Blob([JSON.stringify({
                "anPtName" : an_ptname,
                "anPtSsNum" : an_PtSsNum,
                "anPtSub" : an_ptsub,
                "anPtDiagnosis" : an_ptdiagnosis,
                "anPtDiagContent" : an_ptdiagcontent,
                "anEtc" : anEtcValue,
                "anRegDate" : today,
                "anQuestionContent" : anQuestionContents,
                "anReqForm" : anFile_toString[0],
                "anDiagnosis" : anFile_toString[1],
                "anRecord" : anFile_toString[2],
                "anFilm" : anFile_toString[3],
                "anOther" : anFile_toString[4],
            })], {type : "application/json"}))

          try{
            const maxSizeInBytes = 100 * 1024 * 1024
            if (allAnalyzeRequest.getAll('files').some(file => file.size > maxSizeInBytes)) {
                throw new Error('파일 크기가 너무 큽니다.')
            }
              const response = axios.post('/user/analyze/request', allAnalyzeRequest, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
              alert('분석의뢰 신청이 완료되었습니다.')
              navigate('/')
          } catch(err){
            alert(err.message);
          }
      }
      const btn_analyze_cancle = async() => {
          navigate('/')
      }

    return(
        <div className={analyzerequest.anvicerequest_wrap}>
            <div className={analyzerequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    분석의뢰 신청
                </h2>
                - 의료 분석의뢰를 신청하고자 하는 의뢰자께서는 아래 모든 항목에 대해 모두 입력해주세요.
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
                    <div className={analyzerequest.input_box}>
                        <input type="text" disabled={true} value={uname}/>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>일반전화</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" disabled={true} value={utel}/>
                    </div>
                    <div className={analyzerequest.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" disabled={true} value={uphone}/>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>주소</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" disabled={true} value={uaddress}/>
                    </div>
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
                        <input type="text" name="an_ptname" onChange={input_an_ptname}></input>
                    </div>
                    <div className={`${analyzerequest.title_box} ${analyzerequest.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${analyzerequest.input_box} ${analyzerequest.input_ptssnumbox} ${analyzerequest.patient_box}`}>
                        <input type="text" name="an_ptssnum1" maxLength={6} onChange={input_an_ptssnum1}></input>
                         -
                        <input type="password" name="an_ptssnum2" maxLength={7} onChange={input_an_ptssnum2}></input>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>진단과목</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" name="an_ptsub" onChange={input_an_ptsub}/>
                    </div>
                    <div className={analyzerequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" name="an_ptdiagnosis" onChange={input_an_ptdiagnosis}/>
                    </div>
                </div>
                <div className={`${analyzerequest.row_box}`}>
                    <div className ={`${analyzerequest.title_box} ${analyzerequest.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={analyzerequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" onChange={input_an_ptdiagcontent} maxLength={500}/>
                        <div className={analyzerequest.count_box}>
                            <span>{contents_count}/500</span>
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
                        <textarea cols="50" rows="3" name="anEtc" value={anEtcValue} onChange={handleAnEtcChange} maxLength={300}></textarea>
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
                        질문 항목수
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input
                            type="text"
                            name="anQuestionTotal"
                            value={anQuestionTotal}
                            onChange={handleQuestionTotalChange}
                        />
                    </div>
                </div>
                    {renderQuestionInputs()}
                </div>
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
                        <input type='file' accept="image/*" onChange={(e) => setAnReqForm(e.target.files[0])}/>
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        진단서
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*" onChange={e => setAnDiagnosis(e.target.files[0])}/>
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        의무기록지
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*" onChange={e => setAnRecord(e.target.files[0])}/>
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        필름
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*" onChange={e => setAnFilm(e.target.files[0])}/>
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        기타자료
                    </div>
                    <div className={analyzerequest.input_box}>
                        <input type='file' accept="image/*" onChange={e => setAnOther(e.target.files[0])}/>
                    </div>
                </div>
                <div className={analyzerequest.complete}>
                    <button type = "button" className={analyzerequest.btt_complete} onClick={btn_analyze_request}>분석 의뢰신청</button>
                    <button type = "button" className={analyzerequest.btt_complete} onClick={btn_analyze_cancle}>취소</button>
                 </div>
            </div>
        </div>
    )
}