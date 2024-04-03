import React, { useState, useEffect } from 'react';
import translaterequest from '../../css/TranslateRequestpage.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TranslateRequestpage(){
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //유효성 체크
    //환자
    const [isValidTrptname, setIsValidTrptname] = useState(true);
    const [isValidTrptssnum1, setIsValidTrptssnum1] = useState(true);
    const [isValidTrptssnum2, setIsValidTrptssnum2] = useState(true);
    const [isValidTrptdiagnosis, setIsValidTrptdiagnosis] = useState(true);
    //모든 유효성 통과
    const [infoEmpty, setInfoEmpty] = useState(false)

    const errmsg = {
        msg : '올바르지 않은 형식입니다.',
    }

    //환자
    const [tr_ptname, setTrptname] = useState('')
    const [tr_ptssnum1, setTrptssnum1] = useState('');
    const [tr_ptssnum2, setTrptssnum2] = useState('');
    const [tr_ptsub, setTrptsub] = useState('');
    const [tr_ptdiagnosis, setTrptdiagnosis] = useState('')
    const [tr_ptcmt, setTrptcmt] = useState('')

    //기타사항
    const [trEtcValue, setTrEtcValue] = useState('');
    const [tr_etc_count, setTretccount] = useState(0)

    const [contents_count, setContentscount] = useState(0)

    const [trMtl, setTrMtl] = useState(null)

    const navigate = useNavigate()
    const allTranslateRequest = new FormData()

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
    }, [])

    const handleTrEtcChange = (e) => {
        setTrEtcValue(e.target.value);
        setTretccount(e.target.value.length)
    };
      
    const input_tr_ptname = e => {
        setTrptname(e.target.value)
    }
    const valid_tr_ptname = e => {
        const trptnameRegex = /^[a-zA-Z가-힣\s]{1,20}$/;
        setIsValidTrptname(trptnameRegex.test(e.target.value))
    }
    const input_tr_ptssnum1 = e => {
        setTrptssnum1(e.target.value)
        console.log(e.target.value + '-')
    }
    const valid_tr_ptssnum1 = e => {
        const trptssnum1Regex = /^\d{6}$/;
        setIsValidTrptssnum1(trptssnum1Regex.test(e.target.value))
    }
    const input_tr_ptssnum2 = e => {
        setTrptssnum2(e.target.value)
    }
    const valid_tr_ptssnum2 = e => {
        const trptssnum2Regex = /^[1-4]\d{6}$/;
        setIsValidTrptssnum2(trptssnum2Regex.test(e.target.value))
    }
    const input_tr_ptdiagnosis = e => {
        setTrptdiagnosis(e.target.value)
    }
    const valid_tr_ptdiagnosis = e => {
        const trptdiagnosisRegex = /^[a-zA-Z가-힣0-9\s]{1,50}$/;
        setIsValidTrptdiagnosis(trptdiagnosisRegex.test(e.target.value))
    }
    const input_tr_ptcmt = e => {
        const contents = e.target.value
        setTrptcmt(contents)
        setContentscount(contents.length)
    }
    
    //유효성 전체 조건 검사
    useEffect(() => {
        if (isValidTrptname && isValidTrptssnum1 && isValidTrptssnum2 && isValidTrptdiagnosis) {
            setInfoEmpty(true);
        } else {
            setInfoEmpty(false);
        }
    }, [isValidTrptname, isValidTrptssnum1, isValidTrptssnum2, isValidTrptdiagnosis]);
    
    const isFormValid = () => {
        // 여러 입력 필드와 텍스트 영역의 유효성을 확인
        const isUserInfoValid = uname && utel && uphone && uaddress;
        const isPtInfoValid = tr_ptname && tr_ptssnum1 && tr_ptssnum2 && tr_ptsub && tr_ptdiagnosis && tr_ptcmt;
        const isEtcInfoValid = trEtcValue;
        
        // 모든 조건을 만족하면 true를 반환
        return isUserInfoValid && isPtInfoValid && isEtcInfoValid && infoEmpty;
    };
      const btn_translate_request = async() => {
           // 유효성 검사
          if (!isFormValid()) {
              alert('입력값을 확인해주세요.');
              return;
          }
          const tr_PtSsNum = tr_ptssnum1 + '-' + tr_ptssnum2
          const today = new Date()
          const trFile = [trMtl]
          const trFile_toString = []
          trFile.forEach(file => {
            if(file === null || typeof file === 'undefined'){
                trFile_toString.push("empty_file")
            }else{
                allTranslateRequest.append('files', file)
                trFile_toString.push("no_empty_file")
            }
          })

          allTranslateRequest.append("dto", new Blob([JSON.stringify({
            "trPtName" : tr_ptname,
              "trPtSsNum" : tr_PtSsNum,
              "trPtSub" : tr_ptsub,
              "trPtDiagnosis" : tr_ptdiagnosis,
              "trPtDiagContent" : tr_ptcmt,
              "trEtc" : trEtcValue,
              "trRegDate" : today,
              "trMtl" : trFile_toString[0]
        })], {type : "application/json"}))
          try{
            const maxSizeInBytes = 100 * 1024 * 1024
            if (allTranslateRequest.getAll('files').some(file => file.size > maxSizeInBytes)) {
                throw new Error('파일 크기가 너무 큽니다.')
            }
              const response = axios.post('/user/translate/request', allTranslateRequest, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
              alert('번역의뢰 신청이 완료되었습니다.')
              navigate('/')
          } catch (err) {
            alert(err.message); // 에러 메시지 출력
        }
      }
      const btn_translate_cancle = async() => {
          navigate('/')
      }

    return(
        <div className={translaterequest.translaterequest_wrap}>
            <div className={translaterequest.iconbox}>
                <h2 className={translaterequest.title}>
                    번역의뢰 신청
                </h2>
                <h4 className={translaterequest.title_bottom}>
                    - 의료 번역의뢰를 신청하고자 하는 의뢰자께서는 아래 모든 항목에 대해 모두 입력해주세요.
                </h4>
             </div>

            {/* 신청자 정보 */}

             <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    신청자 정보
                </h3>
             </div>
             <div className={translaterequest.request_usertable}>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>의뢰자명</div>
                    <div className={translaterequest.input_box}>
                        <span>{uname}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>일반전화</div>
                    <div className={translaterequest.input_box}>
                        <span>{utel}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>휴대전화</div>
                    <div className={translaterequest.input_box}>
                        <span>{uphone}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주소</div>
                    <div className={translaterequest.input_box} style={{width: "500px"}}>
                        <span>{uaddress}</span>
                    </div>
                </div>
             </div>

            {/* 환자의료 기록 사항 */}

             <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={translaterequest.request_patienttable}>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>환자명</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" name="tr_ptname" onBlur={valid_tr_ptname} onChange={input_tr_ptname}></input>
                        {isValidTrptname? <></> : <span className={translaterequest.errmsg}>{errmsg.msg} <br/>(한글 또는 영문으로 최대 20자(띄어쓰기 포함))</span>}
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주민등록번호</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" name="tr_ptssnum1" onBlur={valid_tr_ptssnum1} maxLength={6} onChange={input_tr_ptssnum1}></input>
                         -
                        <input type="password" name="tr_ptssnum2" onBlur={valid_tr_ptssnum2} maxLength={7} onChange={input_tr_ptssnum2}></input>
                        {!isValidTrptssnum1 || !isValidTrptssnum2 ? (
                            <span className={translaterequest.errmsg}>{errmsg.msg} <br/>(숫자 앞자리 6자, 뒷자리 7자)</span>
                        ) : null}
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>진단과목</div>
                    <div className={translaterequest.input_box}>
                        <select value={tr_ptsub} onChange={e => setTrptsub(e.target.value)}>
                            <option value="">부서 선택</option>
                            <option value="내과">내과</option>
                            <option value="신경과">신경과</option>
                            <option value="정신건강의학과">정신건강의학과</option>
                            <option value="외과">외과</option>
                            <option value="정형외과">정형외과</option>
                            <option value="신경외과">신경외과</option>
                            <option value="흉부외과">흉부외과</option>
                            <option value="성형외과">성형외과</option>
                            <option value="마취통증의학과">마취통증의학과</option>
                            <option value="산부인과">산부인과</option>
                            <option value="소아청소년과">소아청소년과</option>
                            <option value="안과">안과</option>
                            <option value="이비인후과">이비인후과</option>
                            <option value="피부과">피부과</option>
                            <option value="비뇨의학과">비뇨의학과</option>
                            <option value="영상의학과">영상의학과</option>
                            <option value="방사선종양학과">방사선종양학과</option>
                            <option value="병리과">병리과</option>
                            <option value="진단검사의학과">진단검사의학과</option>
                            <option value="결핵과">결핵과</option>
                            <option value="재활의학과">재활의학과</option>
                            <option value="예방의학과">예방의학과</option>
                            <option value="가정의학과">가정의학과</option>
                            <option value="응급의학과">응급의학과</option>
                            <option value="핵의학과">핵의학과</option>
                            <option value="직업환경의학과">직업환경의학과</option>
                        </select>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>진단명</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" name="tr_ptdiagnosis" onBlur={valid_tr_ptdiagnosis} onChange={input_tr_ptdiagnosis}/>
                        {isValidTrptdiagnosis? <></> : <span className={translaterequest.errmsg}>{errmsg.msg} <br/>(한글 또는 영문으로 최대 50자(띄어쓰기 포함)))</span>}
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>
                        진단사항
                    </div>
                    <div className={translaterequest.input_box} style={{width : '600px', height : 'auto'}}>
                        <textarea cols="50" rows="10" onChange={input_tr_ptcmt} maxLength={500}/>   
                        <div className={translaterequest.count_box}>
                            <span>{contents_count}/500</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기타사항 */}

            <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    기타사항
                </h3>
            </div>
            <div className={translaterequest.request_othertable}>
                <div className={translaterequest.row_box} >
                    <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>기타사항</div>
                    <div className={translaterequest.input_box} style={{width : '600px'}}>
                        <textarea cols="50" rows="3" name="trEtc" value={trEtcValue} onChange={handleTrEtcChange} maxLength={300}></textarea>
                        <div className={translaterequest.count_box}>
                            <span>{tr_etc_count}/300</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 첨부자료 */}
            
            <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                        첨부자료
                        <span className={translaterequest.notice}>
                        ※ 번역자료는 압축파일(zip 파일형식) 으로 첨부해 주세요
                        </span>
                </h3>
            </div>
            <div className={translaterequest.file_table}>
                <div className={translaterequest.row_box} style={{height : 'auto'}}>
                    <div className={translaterequest.title_box}>
                        번역 요청자료
                    </div>
                    <div className={translaterequest.input_box}>
                        <label htmlFor="file-upload" className={translaterequest.file_label}>
                            <button className={translaterequest.btn_file}>
                                <i class="fa-solid fa-plus" style={{color: '#ffffff'}}/> 파일 추가
                            </button>
                            <input
                            id="file-upload"
                            className={translaterequest.input_file}
                            type="file"
                            accept="application/zip"
                            onChange={e => setTrMtl(e.target.files[0])}
                            />
                        </label>
                        <span className={translaterequest.file_msg}>{trMtl ? `선택된 파일: ${trMtl.name}` : `선택된 파일: 없음`}</span>
                    </div>
                </div>
                <div className={translaterequest.complete}>
                    <button type = "button" className={translaterequest.complete_button} onClick={btn_translate_request}>번역 의뢰신청</button>
                    <button type = "button" className={translaterequest.complete_button} onClick={btn_translate_cancle}>취소</button>
                 </div>
            </div>
        </div>
    )
}