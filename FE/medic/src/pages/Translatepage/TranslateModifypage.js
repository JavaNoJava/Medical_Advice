import React, { useState, useEffect } from 'react';
import translaterequest from '../../css/TranslateRequestpage.module.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function TranslateModifypage(){
    const [imageError, setImageError] = useState(false);
    
    const startYear = 1960;

    const {index} = useParams();
    const updateTranslate = new FormData()
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [tr_ptname, setTrptname] = useState('')
    const [tr_PtSsNum, setTrPtSsnum] = useState('');
    const [tr_ptssnum1, setTrptssnum1] = useState('');
    const [tr_ptssnum2, setTrptssnum2] = useState('');
    const [tr_ptsub, setTrptsub] = useState('');
    const [tr_ptdiagnosis, setTrptdiagnosis] = useState('')
    const [tr_ptcmt, setTrptcmt] = useState('')

    //기타사항
    const [trEtcValue, setTrEtcValue] = useState('');
    const [tr_etc_count, setTretccount] = useState(0)

    const [trMtl, setTrMtl] = useState(null)
    const [isTrMtl, setIsTrMtl] = useState(false)

    const [contents_count, setContentscount] = useState(0) 
    const navigate = useNavigate()
    const translateUpdate = new FormData()

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
        getTranslateRequest()
    }, [])

    const getTranslateRequest = async() => {
        try{
            const response = await axios.get(`/user/translate/translateDetail/${index}`)
            console.log(response.data)
            setTrptname(response.data.trPtName)
            const trPtSsNum = response.data.trPtSsNum.split('-');
            setTrptssnum1(trPtSsNum[0]);
            setTrptssnum2(trPtSsNum[1]);
            setTrptsub(response.data.trPtSub)
            setTrptdiagnosis(response.data.trPtDiagnosis)
            setTrptcmt(response.data.trPtDiagContent)
            setTrEtcValue(response.data.trEtc)
            setIsTrMtl(() => {
                if(response.data.trMtl === "empty_file"){
                    return false
                } else{
                    setTrMtl(response.data.trMtl)
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
        const isPtInfoValid = tr_ptname && tr_ptssnum1 && tr_ptssnum2 && tr_ptsub && tr_ptdiagnosis && tr_ptcmt;
        const isEtcInfoValid = trEtcValue;

        // 모든 조건을 만족하면 true를 반환
        return isUserInfoValid && isPtInfoValid && isEtcInfoValid;
      };
    const btn_translate_update = async() => {
         // 유효성 검사
        if (!isFormValid()) {
            alert('입력값을 확인해주세요.');
            return;
        }
        const tr_PtSsNum = tr_ptssnum1 + '-' + tr_ptssnum2
        const today = new Date()

        const trFile = [trMtl];
        const trFile_toString = [];
        console.log(trMtl)
        if (trFile[0] === null) {
            trFile_toString.push("empty_file");
        } else {
            if (typeof trFile[0] === 'string') {
                trFile_toString.push(trFile[0]);
            } else {
                updateTranslate.append('files', trFile[0]);
                trFile_toString.push("no_empty_file");
            }
        }
        updateTranslate.append("dto", new Blob ([JSON.stringify({
            "trPtName" : tr_ptname,
            "trPtSsNum" : tr_PtSsNum,
            "trPtSub" : tr_ptsub,
            "trPtDiagnosis" : tr_ptdiagnosis,
            "trPtDiagContent" : tr_ptcmt,
            "trEtc" : trEtcValue,
            "trMdDate" : today,
            "trMtl" : trFile_toString[0]
        })], {type : "application/json"}))

        try{
            const maxSizeInBytes = 100 * 1024 * 1024
            if (updateTranslate.getAll('files').some(file => file.size > maxSizeInBytes)) {
                throw new Error('파일 크기가 너무 큽니다.')
            }
            const response = axios.put(`/user/translate/translateDetail/update/${index}`, updateTranslate, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            alert('번역의뢰 수정이 완료되었습니다.')
            navigate('/')
        } catch(err){
            alert(err.message);
        }
    }

    const handleTrEtcChange = (e) => {
        setTrEtcValue(e.target.value);
        setTretccount(e.target.value.length)
    };
      
    const input_tr_ptname = e => {
        setTrptname(e.target.value)
    }
    const input_tr_ptssnum1 = e => {
        setTrptssnum1(e.target.value)
        console.log(e.target.value + '-')
    }
    const input_tr_ptssnum2 = e => {
        setTrptssnum2(e.target.value)
    }
    const input_tr_ptsub = e => {
        setTrptsub(e.target.value)
    }
    const input_tr_ptdiagnosis = e => {
        setTrptdiagnosis(e.target.value)
    }
    const input_tr_ptcmt = e => {
        const contents = e.target.value
        setTrptcmt(contents)
        setContentscount(contents.length)
    }
    const btn_translate_cancle = async() => {
        navigate('/')
    }

    return(
        <div className={translaterequest.translaterequest_wrap}>
            <div className={translaterequest.iconbox}>
                <h2 className={translaterequest.title}>
                    번역의뢰 수정
                </h2>
                <h4 className={translaterequest.title_bottom}>
                   - 의료 번역의뢰를 신청하고자 하는 의뢰자께서는 아래 모든 항목에 대해 모두 입력해주세요.
                </h4>
             </div>
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
             <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={translaterequest.request_patienttable}>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>환자명</div>
                    <div className={translaterequest.input_box}>
                    <input type="text" name="tr_ptname" value={tr_ptname} disabled={false} onChange={input_tr_ptname} maxLength={20}></input>
                </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주민등록번호</div>
                    <div className={translaterequest.input_box}>
                    <input type="text" name="tr_ptssnum1" value={tr_ptssnum1} disabled={false} maxLength={6} onChange={input_tr_ptssnum1}></input>
                     -
                    <input type="password" name="tr_ptssnum2" value={tr_ptssnum2} disabled={false} maxLength={7} onChange={input_tr_ptssnum2}></input>
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
                    <input type="text" name="tr_ptdiagnosis" value={tr_ptdiagnosis} disabled={false} onChange={input_tr_ptdiagnosis} maxLength={50}/>
                </div>
            </div>
            <div className={`${translaterequest.row_box}`}>
                <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>
                    진단 사항
                </div>
                <div className={translaterequest.input_box} style={{width : '600px', height : 'auto'}}>
                    <textarea cols="50" rows="10" value={tr_ptcmt} disabled={false} onChange={input_tr_ptcmt} maxLength={500}/>
                    <div className={translaterequest.count_box}>
                        <span>{contents_count}/500</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    기타사항
                </h3>
            </div>
            <div className={translaterequest.request_othertable}>
                <div className={translaterequest.row_box} >
                <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>기타사항</div>
                    <div className={translaterequest.input_box} style={{width : '600px'}}>
                    <textarea cols="50" rows="3" name="trEtc" disabled={false} value={trEtcValue} onChange={handleTrEtcChange} maxLength={300}></textarea>
                    <div className={translaterequest.count_box}>
                        <span>{tr_etc_count}/300</span>
                    </div>
                </div>
            </div>
        </div>

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
                        {
                            isTrMtl ?
                            <>
                                <button className={translaterequest.btn_file_download}>
                                    <a
                                        href={`http://localhost:8080/translate/findFile/${index}`}
                                        download="adRecord.zip"
                                    >
                                        다운로드
                                    </a>
                                </button>
                                <button className={translaterequest.btn_file_cancle} onClick = {()=>{
                                    setIsTrMtl(!isTrMtl)
                                    setTrMtl(null)
                                    }}>x</button>
                            </>
                            :
                            <>
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
                            </>
                        }
                    </div>
                </div>
                <div className={translaterequest.complete}>
                <button type = "button" className={translaterequest.complete_button} onClick={btn_translate_update}>저장</button>
                    <button type = "button" className={translaterequest.complete_button} onClick={btn_translate_cancle}>취소</button>
                 </div>
            </div>
        </div>
    )
}