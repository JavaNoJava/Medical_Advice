import React, { useState, useEffect } from 'react';
import advicerequest from '../../css/AdviceRequestpage.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdviceRequestpage(){
    const startYear = 1960;
    const today = new Date();
    const todayYear = today.getFullYear();
    
    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [ad_ptname, setAdptname] = useState('')
    const [ad_ptssnum1, setAdptssnum1] = useState('');
    const [ad_ptssnum2, setAdptssnum2] = useState('');
    const [ad_ptsub, setAdptsub] = useState('');
    const [ad_ptdiagnosis, setAdptdiagnosis] = useState('')
    const [ad_ptrec ,setAdptrec] = useState('')
    const [ad_ptcmt, setAdptcmt] = useState('')
    
    // 보험사
    const [insurance ,setInsurance] = useState('')
    const [insure_name, setInsurename] = useState('')
    
    // 진료기록
    const [hospital, setHospital] = useState('')
    const [adm_startYear ,setAdmstartYear] = useState('')
    const [adm_startMonth, setAdmstartMonth] = useState('')
    const [adm_startDay, setAdmstartDay] = useState('')
    const [adm_endYear, setAdmendYear] = useState('')
    const [adm_endMonth, setAdmendMonth] = useState('')
    const [adm_endDay, setAdmendDay] = useState('')
    const [treat_cmt ,setTreatcmt] = useState('')
    const [treat_cmt_count, setTreatcmtcount] = useState(0)

    //기타사항
    const [adEtcValue, setAdEtcValue] = useState('');
    const [ad_etc_count, setAdetccount] = useState(0)

    const [selectedYear, setSelectedYear] = useState(startYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [dayOptions, setDayOptions] = useState([]);
    const [adQuestionTotal, setAdQuestionTotal] = useState(1);
    const [adQuestionContents, setAdQuestionContents] = useState([]);
    const [contents_count, setContentscount] = useState(0)

    const [visit_startYear ,setVisitstartYear] = useState('')
    const [visit_startMonth, setVisitstartMonth] = useState('')
    const [visit_startDay, setVisitstartDay] = useState('')
    const [visit_endYear, setVisitendYear] = useState('')
    const [visit_endMonth, setVisitendMonth] = useState('')
    const [visit_endDay, setVisitendDay] = useState('')
    
    // 자문 파일
    const [adReqForm, setAdReqForm] = useState(null)
    const [adDiagnosis, setAdDiagnosis] = useState(null)
    const [adRecord, setAdRecord] = useState(null)
    const [adFilm, setAdFilm] = useState(null)
    const [adOther, setAdOther] = useState(null)

    const navigate = useNavigate()
    const allAdviceRequest = new FormData()

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

    const generateOptions = (start, end) => {
      const options = [];
      for (let i = start; i <= end; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
      }
      return options;
    };

    const renderQuestionInputs = () => {
        return Array.from({ length: adQuestionTotal }, (_, index) => (
          <div className={advicerequest.row_box} style={{height : 'auto'}} key={index}>
            <div className={advicerequest.title_box}>
              질문 {index + 1} 입력
            </div>
            <div className={advicerequest.input_box}>
              <input
                type="text"
                name={`adQuestionContent_${index}`}
                value={adQuestionContents[index] || ''}
                onChange={(e) => handleQuestionContentChange(index, e)}
                maxLength={300}
              />
            </div>
          </div>
        ));
    };
    
    const updateLastDay = () => {
        const year = parseInt(selectedYear);
        const month = parseInt(selectedMonth);
        const lastDay = new Date(year, month, 0).getDate();
    
        // Update options for days
        const newDayOptions = generateOptions(1, lastDay);
        setDayOptions(newDayOptions);
    
        // Adjust selected day if it exceeds the number of days in the month
        if (selectedDay > lastDay) {
          setSelectedDay(lastDay);
        }
    };
    
    useEffect(() => {
      updateLastDay();
    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        // Set initial values when the component mounts
        setSelectedYear(startYear);
        setSelectedMonth(1);
        setSelectedDay(1);
        setAdQuestionTotal(1);
      }, []); // Empty dependency array to run only once on mount

    const handleYearChange = (e) => {
      setSelectedYear(e.target.value);
    };
  
    const handleMonthChange = (e) => {
      setSelectedMonth(e.target.value);
    };
  
    const handleDayChange = (e) => {
      setSelectedDay(e.target.value);
    };

    const handleAdEtcChange = (e) => {
        setAdEtcValue(e.target.value);
        setAdetccount(e.target.value.length)
      };

    const handleQuestionTotalChange = (e) => {
        let value = parseInt(e.target.value, 10);
        value = isNaN(value) ? '' : Math.min(Math.max(value, 1), 5); // Ensure the value is between 1 and 10
        setAdQuestionTotal(value);
    };
    
    const handleQuestionContentChange = (index, e) => {
        const newContents = [...adQuestionContents];
        newContents[index] = e.target.value;
        setAdQuestionContents(newContents);
    };
    
    const input_ad_ptname = e => {
        setAdptname(e.target.value)
    }
    const input_ad_ptssnum1 = e => {
        setAdptssnum1(e.target.value)
        console.log(e.target.value + '-')
    }
    const input_ad_ptssnum2 = e => {
        setAdptssnum2(e.target.value)
    }
    const input_ad_ptsub = e => {
        setAdptsub(e.target.value)
    }
    const input_ad_ptdiagnosis = e => {
        setAdptdiagnosis(e.target.value)
    }
    const input_ad_ptrec = e => {
        setAdptrec(e.target.value)
    }
    const input_ad_ptcmt = e => {
        const contents = e.target.value
        setAdptcmt(contents)
        setContentscount(contents.length)
    }
    const input_insurance = e => {
        setInsurance(e.target.value)
    }
    const input_insure_name = e => {
        setInsurename(e.target.value)
    }
    const input_hospital = e => {
        setHospital(e.target.value)
    }
    const input_adm_startYear = e => {
        setAdmstartYear(e.target.value)
    }
    const input_adm_startMonth = e => {
        setAdmstartMonth(e.target.value)
    } 
    const input_adm_startDay = e => {
        setAdmstartDay(e.target.value)
    }
    const input_adm_endYear = e => {
        setAdmendYear(e.target.value)
    }
    const input_adm_endMonth = e => {
        setAdmendMonth(e.target.value)
    }
    const input_adm_endDay = e => {
        setAdmendDay(e.target.value)
    }
    const input_treat_cmt = e => {
        setTreatcmt(e.target.value)
        setTreatcmtcount(e.target.value.length)
    }
    const input_visit_startYear = e => {
        setVisitstartYear(e.target.value)
    }
    const input_visit_startMonth = e => {
        setVisitstartMonth(e.target.value)
    }
    const input_visit_startDay = e => {
        setVisitstartDay(e.target.value)
    }

    const input_visit_endYear = e => {
        setVisitendYear(e.target.value)
    }
    const input_visit_endMonth = e => {
        setVisitendMonth(e.target.value)
    }
    const input_visit_endDay = e => {
        setVisitendDay(e.target.value)
    }
    const isFormValid = () => {
        // 여러 입력 필드와 텍스트 영역의 유효성을 확인
        const isUserInfoValid = uname && utel && uphone && uaddress;
        const isPtInfoValid = ad_ptname && ad_ptssnum1 && ad_ptssnum2 && ad_ptsub && ad_ptdiagnosis && ad_ptrec && ad_ptcmt;
        const isInsuranceValid = insurance && insure_name && selectedYear && selectedMonth && selectedDay;
        const isHospitalInfoValid = hospital && adm_startYear && adm_startMonth && adm_startDay && adm_endYear && adm_endMonth && adm_endDay &&
          visit_startYear && visit_startMonth && visit_startDay && visit_endYear && visit_endMonth && visit_endDay && treat_cmt;
        const isEtcInfoValid = adEtcValue;
        const isQuestionInfoValid = adQuestionContents.every(content => content); // 모든 질문 내용이 비어있지 않아야 함
      
        // 모든 조건을 만족하면 true를 반환
        return isUserInfoValid && isPtInfoValid && isInsuranceValid && isHospitalInfoValid && isEtcInfoValid && isQuestionInfoValid;
      };
    const btn_advice_request = async() => {
         // 유효성 검사
        if (!isFormValid()) {
            alert('입력값을 확인해주세요.');
            return;
        }
        const adPtSsNum = ad_ptssnum1 + "-" + ad_ptssnum2
        const insureDate = selectedYear + '-' + selectedMonth + '-' + selectedDay
        const today = new Date()
        const admStart = adm_startYear + '-' + adm_startMonth + '-' + adm_startDay
        const admEnd = adm_endYear + '-' + adm_endMonth + '-' + adm_endDay
        const visitStart = visit_startYear + '-' + visit_startMonth + '-' + visit_startMonth
        const visitEnd = visit_endYear + '-' + visit_endMonth + '-' + visit_endDay
        
        const adFile = [adReqForm, adDiagnosis, adRecord, adFilm, adOther];
        console.log(adFile)
        const adFile_toString = []
        adFile.forEach(file => {
            if (file === null || typeof file === 'undefined') {
                adFile_toString.push("empty_file")
                console.log(adFile_toString)
            } else {
                allAdviceRequest.append('files', file);
                adFile_toString.push("no_empty_file")
                console.log(adFile_toString)
            }
        });
        console.log(allAdviceRequest.getAll('files'));
        console.log(adFile_toString)

        allAdviceRequest.append("dto", new Blob([JSON.stringify({
            "adPtName" : ad_ptname,
            "adPtSsNum" : adPtSsNum,
            "adPtSub" : ad_ptsub,
            "adPtDiagnosis" : ad_ptdiagnosis,
            "adPtRec" : ad_ptrec,
            "adPtCmt" : ad_ptcmt,
            "insurance" : insurance,
            "insureDate" : insureDate,
            "insureName" : insure_name,
            "adEtc" : adEtcValue,
            "adRegDate" : today,
            "adQuestionContent" : adQuestionContents,
            "hospital" : hospital,
            "admStart" : admStart,
            "admEnd" : admEnd,
            "visitStart" : visitStart,
            "visitEnd" : visitEnd,
            "treatCmt" : treat_cmt,
            "diagRound" : 1,
            "adReqForm" : adFile_toString[0],
            "adDiagnosis" : adFile_toString[1],
            "adRecord" : adFile_toString[2],
            "adFilm" : adFile_toString[3],
            "adOther" : adFile_toString[4],
          })], { type: "application/json" }));
          const a ={
            "adPtName" : ad_ptname,
            "adPtSsNum" : adPtSsNum,
            "adPtSub" : ad_ptsub,
            "adPtDiagnosis" : ad_ptdiagnosis,
            "adPtRec" : ad_ptrec,
            "adPtCmt" : ad_ptcmt,
            "insurance" : insurance,
            "insureDate" : insureDate,
            "insureName" : insure_name,
            "adEtc" : adEtcValue,
            "adRegDate" : today,
            "adQuestionContent" : adQuestionContents,
            "hospital" : hospital,
            "admStart" : admStart,
            "admEnd" : admEnd,
            "visitStart" : visitStart,
            "visitEnd" : visitEnd,
            "treatCmt" : treat_cmt,
            "diagRound" : 1,
            "adReqForm" : adFile_toString[0],
            "adDiagnosis" : adFile_toString[1],
            "adRecord" : adFile_toString[2],
            "adFilm" : adFile_toString[3],
            "adOther" : adFile_toString[4],
          }
        try{
            const maxSizeInBytes = 100 * 1024 * 1024
            if (allAdviceRequest.getAll('files').some(file => file.size > maxSizeInBytes)) {
                throw new Error('파일 크기가 너무 큽니다.')
            }
            const response = axios.post('/user/advice/request', allAdviceRequest,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('자문의뢰 신청이 완료되었습니다.')
            navigate('/')
        } catch(err){
            alert(err.message);
        }
    }
    const btn_advice_cancle = async() => {
        navigate('/')
    }
    useEffect(()=>{
        console.log(adReqForm)
        if(adReqForm){
            console.log(adReqForm.name)
        }
        console.log(adDiagnosis)
        console.log(adRecord)
        console.log(adFilm)
        console.log(adOther)
    },[adReqForm, adDiagnosis, adRecord, adFilm, adOther])
    return(
        <div className={advicerequest.advicerequest_wrap}>
            <div className={advicerequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    자문의뢰 신청
                </h2>
                - 의료 자문의뢰를 신청하고자 하는 의뢰자께서는 아래 모든 항목에 대해 모두 입력해주세요.
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
                    <div className={advicerequest.input_box}>
                        <input type="text" disabled={true} value={uname}/>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>일반전화</div>
                    <div className={advicerequest.input_box}>
                        <input type="text" disabled={true} value={utel}/>
                    </div>
                    <div className={advicerequest.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={advicerequest.input_box}>
                        <input type="text" disabled={true} value={uphone}/>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>주소</div>
                    <div className={advicerequest.input_box}>
                        <input type="text" disabled={true} value={uaddress}/>
                    </div>
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
                        <input type="text" name="ad_ptname" onChange={input_ad_ptname} maxLength={20}></input>
                    </div>
                    <div className={`${advicerequest.title_box} ${advicerequest.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${advicerequest.input_box} ${advicerequest.input_ptssnumbox} ${advicerequest.patient_box}`}>
                        <input type="text" name="ad_ptssnum1" maxLength={6} onChange={input_ad_ptssnum1}></input>
                         -
                        <input type="password" name="ad_ptssnum2" maxLength={7} onChange={input_ad_ptssnum2}></input>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>진단과목</div>
                    <div className={advicerequest.input_box}>
                        <input type="text" name="ad_ptsub" onChange={input_ad_ptsub} maxLength={10}/>
                    </div>
                    <div className={advicerequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={advicerequest.input_box}>
                        <input type="text" name="ad_ptdiagnosis" onChange={input_ad_ptdiagnosis} maxLength={50}/>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>과거 진단이력</div>
                    <div className={advicerequest.input_box}>
                        <input type="text" name="ad_ptrec" onChange={input_ad_ptrec} maxLength={100}/>
                    </div>
                </div>
                <div className={`${advicerequest.row_box}`}>
                    <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>
                        내용
                    </div>
                    <div className={advicerequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" onChange={input_ad_ptcmt} maxLength={500}/>
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
                        <input type="text" name="insurance" onChange={input_insurance} maxLength={10}></input>
                    </div>
                    <div className={advicerequest.title_box} style={{borderLeft : '1px solid black'}}>계약일자</div>
                    <div className={advicerequest.input_box}>
                        <select onChange={handleYearChange} value={selectedYear}>{generateOptions(startYear, todayYear)}</select> -
                        <select onChange={handleMonthChange} value={selectedMonth}>{generateOptions(1, 12)}</select> -
                        <select onChange={handleDayChange} value={selectedDay}>{dayOptions.map((day) => day)}</select>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>보험계약명</div>
                    <div className={advicerequest.input_box}>
                        <input type="text" name="insure_name" onChange={input_insure_name} maxLength={20}></input>
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
                        <input type="text" name="hospital" onChange={input_hospital} maxLength={20}></input>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box} style={{height : '92px'}}>입원 치료기간</div>
                    <div className={advicerequest.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', alignItems : 'space-between', height : '80px'}}>
                        <div className={advicerequest.datebox}>
                            <input type="text" name="adm_startYear" onChange={input_adm_startYear} minLength={4} maxLength={4}></input>년
                            <input type="text" name="adm_startMonth" onChange={input_adm_startMonth} minLength={2} maxLength={2}></input>월
                            <input type="text" name="adm_startDay" onChange={input_adm_startDay} minLength={2} maxLength={2}></input>일
                        </div>                       
                        ~
                        <div className={advicerequest.datebox}>
                            <input type="text" name="adm_endYear" onChange={input_adm_endYear} minLength={4} maxLength={4}></input>년
                            <input type="text" name="adm_endMonth" onChange={input_adm_endMonth} minLength={2} maxLength={2}></input>월
                            <input type="text" name="adm_endDay" onChange={input_adm_endDay} minLength={2} maxLength={2}></input>일
                        </div>                       
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box} style={{height : '92px'}}>통원 치료기간</div>
                    <div className={advicerequest.input_box} style={{display:'flex', flexDirection:'column' ,width: '600px', justifyContent : 'start', alignItems : 'space-between', height : '80px'}}>
                        <div className={advicerequest.datebox}>
                            <input type="text" name="visit_startYear" onChange={input_visit_startYear} minLength={4} maxLength={4}></input>년
                            <input type="text" name="visit_startMonth" onChange={input_visit_startMonth} minLength={2} maxLength={2}></input>월
                            <input type="text" name="visit_startDay" onChange={input_visit_startDay} minLength={2} maxLength={2}></input>일
                        </div>                       
                        ~
                        <div className={advicerequest.datebox}>
                            <input type="text" name="visit_endYear" onChange={input_visit_endYear} minLength={4} maxLength={4}></input>년
                            <input type="text" name="visit_endMonth" onChange={input_visit_endMonth} minLength={2} maxLength={2}></input>월
                            <input type="text" name="visit_endDay" onChange={input_visit_endDay} minLength={2} maxLength={2}></input>일
                        </div>                       
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`} style={{height : '130px'}}>
                        치료사항
                    </div>
                    <div className={advicerequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" maxLength={500} onChange={input_treat_cmt}></textarea>
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
                        <textarea cols="50" rows="3" name="adEtc" value={adEtcValue} onChange={handleAdEtcChange} maxLength={300}></textarea>
                        <div className={advicerequest.count_box}>
                            <span>{ad_etc_count}/300</span>
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
                        질문 항목수
                    </div>
                    <div className={advicerequest.input_box}>
                        <input
                            type="text"
                            name="adQuestionTotal"
                            value={adQuestionTotal}
                            onChange={handleQuestionTotalChange}
                        />
                    </div>
                </div>
                    {renderQuestionInputs()}
                </div>
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
                        <input type='file' accept="image/*" onChange={e => setAdReqForm(e.target.files[0])}/>
                    </div>
                </div>
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        진단서
                    </div>
                    <div className={advicerequest.input_box}>
                        <input type='file' accept="image/*" onChange={e => setAdDiagnosis(e.target.files[0])}/>
                    </div>
                </div>
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        의무기록지
                    </div>
                    <div className={advicerequest.input_box}>
                        <input type='file' accept="image/*" onChange={e => setAdRecord(e.target.files[0])}/>
                    </div>
                </div>
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        필름
                    </div>
                    <div className={advicerequest.input_box}>
                        <input type='file' accept="image/*" onChange={e => setAdFilm(e.target.files[0])}/>
                    </div>
                </div>
                <div className={advicerequest.row_box} style={{height : 'auto'}}>
                    <div className={advicerequest.title_box}>
                        기타 자료
                    </div>
                    <div className={advicerequest.input_box}>
                        <input type='file' accept="image/*" onChange={e => setAdOther(e.target.files[0])}/>
                    </div>
                </div>
                <div className={advicerequest.complete}>
                    <button type = "button" className={advicerequest.btt_complete} onClick={btn_advice_request}>자문 의뢰신청</button>
                    <button type = "button" className={advicerequest.btt_complete} onClick={btn_advice_cancle}>취소</button>
                 </div>
            </div>
        </div>  
    )
}   