import React, { useState, useEffect } from 'react';
import analyzerequest from '../../css/AnalyzeRequestpage.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ImageModal from '../../components/ImageModal';

export default function AnalyzeModifypage(){
    const [imageError, setImageError] = useState(false);
    // const [showQuestionForm, setShowQuestionForm] = useState(false);
    const startYear = 1960;

    const {index} = useParams();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [an_ptname, setAnptname] = useState('')
    const [an_PtSsNum, setAn_PtSsNum] = useState('');
    const [an_ptssnum1, setAnPtSsNum1] = useState('');
    const [an_ptssnum2, setAnPtSsNum2] = useState('');
    const [an_ptsub, setAnptsub] = useState('');
    const [an_ptdiagnosis, setAnptdiagnosis] = useState('')
    const [an_ptdiagcontent, setAnptdiagcontent] = useState('')

    //기타사항
    const [anEtcValue, setAnEtcValue] = useState('');
    const [an_etc_count, setAnetccount] = useState(0)

    const [anQuestionTotal, setAnQuestionTotal] = useState(1);
    const [anQuestionContents, setAnQuestionContents] = useState([]);
    const [anQuestionContentArray, setAnQuestionContentArray] = useState([]);
    const [contents_count, setContentscount] = useState(0)
    const [anQuestion, setAnQuestion] = useState(0);

    // 자문 파일
    const [anReqForm, setAnReqForm] = useState(null)
    const [anDiagnosis, setAnDiagnosis] = useState(null)
    const [anRecord, setAnRecord] = useState(null)
    const [anFilm, setAnFilm] = useState(null)
    const [anOther, setAnOther] = useState(null)

    //자문 파일 검사
    const [isAnReqForm, setIsAnReqForm] = useState(false)
    const [isAnDiagnosis, setIsAnDiagnosis] = useState(false)
    const [isAnRecord, setIsAnRecord] = useState(false)
    const [isAnFilm, setIsAnFilm] = useState(false)
    const [isAnOther, setIsAnOther] = useState(false)

    const [isOpenimage ,setIsOpenimage] = useState(false)
    const [src, setSrc] = useState('')

    const navigate = useNavigate()
    const analyzeUpdate = new FormData()

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
    }, [])

    const getAnalyzeRequest = async() => {
        try{
            const response = await axios.get(`/user/analyze/detail/${index}`)
            console.log(response.data)
            setAnptname(response.data.anPtName)
            const an_PtSsNum = response.data.anPtSsNum.split('-');
            setAnPtSsNum1(an_PtSsNum[0]);
            setAnPtSsNum2(an_PtSsNum[1]);
            setAnptsub(response.data.anPtSub)
            setAnptdiagnosis(response.data.anPtDiagnosis)
            setAnptdiagcontent(response.data.anPtDiagContent)
            setAnEtcValue(response.data.anEtc)
            setAnQuestion(response.data.analyzeRequests);
            const anContented = response.data.analyzeRequests
            setAnQuestionContentArray(() => anContented.map(item => item.anQuestionContent))
            console.log(anQuestionContentArray);
            setAnQuestionTotal(response.data.analyzeRequests.length);
            setIsAnReqForm(() => {
                if(response.data.anReqForm === "empty_file"){
                    return false
                } else{
                    setAnReqForm(response.data.anReqForm)
                    return true
                }
            })
            setIsAnDiagnosis(()=>{
                if(response.data.anDiagnosis === "empty_file"){
                    return false
                } else{
                    setAnDiagnosis(response.data.anDiagnosis)
                    return true
                }
            })
            setIsAnRecord(()=>{
                if(response.data.anRecord === "empty_file"){
                    return false
                } else{
                    setAnRecord(response.data.anRecord)
                    return true
                }
            })
            setIsAnFilm(()=>{
                if(response.data.anFilm === "empty_file"){
                    return false
                } else{
                    setAnFilm(response.data.anFilm)
                    return true
                }
            })
            setIsAnOther(()=>{
                if(response.data.anOther === "empty_file"){
                    return false
                } else{
                    setAnOther(response.data.anOther)
                    return true
                }
            })
    } catch(err){
        console.log(err)
    }  
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

const btn_analyze_update = async() => {
           //유효성 검사
          if (!isFormValid()) {
              alert('입력값을 확인해주세요.');
              return;
          }
          const an_PtSsNum = an_ptssnum1 + '-' + an_ptssnum2
          const today = new Date()
          const anFile = [anReqForm, anDiagnosis, anRecord, anFilm, anOther];
        const anFile_toString = []
        anFile.forEach(file => {
            if (file === null || typeof file === 'undefined') {
                anFile_toString.push("empty_file")
            } else {
                if(typeof file === 'string'){
                    anFile_toString.push(file)
                }else{
                    analyzeUpdate.append('files', file);
                    anFile_toString.push("no_empty_file")
                }
                
            }
        });
        const formData = new FormData();
        analyzeUpdate.append("dto", new Blob([JSON.stringify({
            "anPtName" : an_ptname,
            "anPtSsNum" : an_PtSsNum,
            "anPtSub" : an_ptsub,
            "anPtDiagnosis" : an_ptdiagnosis,
            "anPtDiagContent" : an_ptdiagcontent,
            "anQuestionContent" : anQuestionContentArray,
            "anEtc" : anEtcValue,
            "anMdDate" : today,
            "anReqForm" : anFile_toString[0],
            "anDiagnosis" : anFile_toString[1],
            "anRecord" : anFile_toString[2],
            "anFilm" : anFile_toString[3],
            "anOther" : anFile_toString[4],
        })], {type: "application/json"}))

        anQuestionContentArray.forEach((question, index) => {
            formData.append(`anQuestionContent[${index}]`, question);
        });
        console.log(anQuestionContentArray)
        
          try{
            const maxSizeInBytes = 100 * 1024 * 1024
            if (analyzeUpdate.getAll('files').some(file => file.size > maxSizeInBytes)) {
                throw new Error('파일 크기가 너무 큽니다.')
            }
              const response = await axios.put(`/user/analyze/detail/update/${index}`, analyzeUpdate,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
              alert('분석의뢰 수정이 완료되었습니다.')
              navigate('/')
          } catch(err){
            alert(err.message);
          }
      }


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
                value={anQuestionContentArray[index] || ''}
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
        value = isNaN(value) ? 1 : Math.min(Math.max(value, 1), 5); // Ensure the value is between 1 and 5
        setAnQuestionTotal(value);
    
        const newContents = anQuestionContentArray.slice(0, value);
        
        if (value > anQuestionContentArray.length) {
            for (let i = anQuestionContentArray.length; i < value; i++) {
                newContents[i] = '';
            }
        }
        setAnQuestionContentArray(newContents);
    };
      
    const handleQuestionContentChange = (index, e) => {
        const newContents = [...anQuestionContentArray];
        newContents[index] = e.target.value;
        setAnQuestionContentArray(newContents);
    };
      
    const input_an_ptname = e => {
        setAnptname(e.target.value)
    }
    const input_an_ptssnum1 = e => {
        setAnPtSsNum1(e.target.value)
        console.log(e.target.value + '-')
    }
    const input_an_ptssnum2 = e => {
        setAnPtSsNum2(e.target.value)
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
    const btn_analyze_cancle = async() => {
        navigate('/')
    }
    const btn_open_image = src => {
        setIsOpenimage(true)
        setSrc(src)
    }
    const closeImageModal = e => {
        setIsOpenimage(false)
    }
    return(
        <div className={analyzerequest.anvicerequest_wrap}>
            <div className={analyzerequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    분석의뢰 수정
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
                        <input type="text" name="an_ptname" value={an_ptname} disabled={false} onChange={input_an_ptname}></input>
                    </div>
                    <div className={`${analyzerequest.title_box} ${analyzerequest.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${analyzerequest.input_box} ${analyzerequest.input_ptssnumbox} ${analyzerequest.patient_box}`}>
                        <input type="text" name="an_ptssnum1" value={an_ptssnum1} disabled={false} maxLength={6} onChange={input_an_ptssnum1}></input>
                         -
                        <input type="password" name="an_ptssnum2" value={an_ptssnum2} disabled={false} maxLength={7} onChange={input_an_ptssnum2}></input>
                    </div>
                </div>
                <div className={analyzerequest.row_box}>
                    <div className={analyzerequest.title_box}>진단과목</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" name="an_ptsub" value={an_ptsub} disabled={false} onChange={input_an_ptsub}/>
                    </div>
                    <div className={analyzerequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={analyzerequest.input_box}>
                        <input type="text" name="an_ptdiagnosis" value={an_ptdiagnosis} disabled={false} onChange={input_an_ptdiagnosis}/>
                    </div>
                </div>
                <div className={`${analyzerequest.row_box}`}>
                    <div className ={`${analyzerequest.title_box} ${analyzerequest.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={analyzerequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" value={an_ptdiagcontent} disabled={false} onChange={input_an_ptdiagcontent} maxLength={500}/>
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
                        <textarea cols="50" rows="3" name="anEtc" disabled={false} value={anEtcValue} onChange={handleAnEtcChange} maxLength={300}></textarea>
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
                    {
                        isAnReqForm ? 
                        <>
                            <button onClick={()=>btn_open_image(`http://localhost:8080/analyze/findFile/${index}/anReqForm`)}>미리보기</button>
                            <button onClick={()=>{
                                setIsAnReqForm(!isAnReqForm)
                                setAnReqForm(null)
                                }} >X</button>
                        </>
                        :
                        <input type='file' accept="image/*" onChange={(e) => setAnReqForm(e.target.files[0])} />
                    }
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        진단서
                    </div>
                    <div className={analyzerequest.input_box}>
                    {
                        isAnDiagnosis ? 
                        <>
                            <button onClick={()=>btn_open_image(`http://localhost:8080/analyze/findFile/${index}/anDiagnosis`)}>미리보기</button>
                            <button onClick={()=>{
                                setIsAnDiagnosis(!isAnDiagnosis)
                                setAnDiagnosis(null)
                                }} >X</button>
                        </>
                        :
                        <input type='file' accept="image/*" onChange={(e) => setAnDiagnosis(e.target.files[0])} />
                    }
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        의무기록지
                    </div>
                    <div className={analyzerequest.input_box}>
                    {
                        isAnRecord ? 
                        <>
                            <button onClick={()=>btn_open_image(`http://localhost:8080/analyze/findFile/${index}/anRecord`)}>미리보기</button>
                            <button onClick={()=>{
                                setIsAnRecord(!isAnRecord)
                                setAnRecord(null)
                                }} >X</button>
                        </>
                        :
                        <input type='file' accept="image/*" onChange={(e) => setAnRecord(e.target.files[0])} />
                    }
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        필름
                    </div>
                    <div className={analyzerequest.input_box}>
                    {
                        isAnFilm ? 
                        <>
                            <button onClick={()=>btn_open_image(`http://localhost:8080/analyze/findFile/${index}/anFilm`)}>미리보기</button>
                            <button onClick={()=>{
                                setIsAnFilm(!isAnFilm)
                                setAnFilm(null)
                                }} >X</button>
                        </>
                        :
                        <input type='file' accept="image/*" onChange={(e) => setAnFilm(e.target.files[0])} />
                    }
                    </div>
                </div>
                <div className={analyzerequest.row_box} style={{height : 'auto'}}>
                    <div className={analyzerequest.title_box}>
                        기타자료
                    </div>
                    <div className={analyzerequest.input_box}>
                    {
                        isAnOther ? 
                        <>
                            <button onClick={()=>btn_open_image(`http://localhost:8080/analyze/findFile/${index}/anOther`)}>미리보기</button>
                            <button onClick={()=>{
                                setIsAnOther(!isAnOther)
                                setAnOther(null)
                                }} >X</button>
                        </>
                        :
                        <input type='file' accept="image/*" onChange={(e) => setAnOther(e.target.files[0])} />
                    }
                    </div>
                </div>
                <div className={analyzerequest.complete}>
                    <button type = "button" className={analyzerequest.btt_complete} onClick={btn_analyze_update}>저장</button>
                    <button type = "button" className={analyzerequest.btt_complete} onClick={btn_analyze_cancle}>취소</button>
                 </div>
                 <ImageModal src={src} isOpenimage={isOpenimage} onRequestClose={closeImageModal} />
            </div>
        </div>
    )
}
    
