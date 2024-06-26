import React, { useState, useEffect } from 'react';
import advicerequest from '../../css/AdviceDetailpage.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ImageModal from '../../components/ImageModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AdviceModifypage(){
    
    const [imageError, setImageError] = useState(false);
    const today = new Date();
    const [adviceDetails, setAdviceDetails] = useState({});
    const [admStartDate, setAdmStartDate] = useState(null);
    const [admEndDate, setAdmEndDate] = useState(null);
    const [visitStartDate, setVisitStartDate] = useState(null);
    const [visitEndDate, setVisitEndDate] = useState(null);

    const minDate = new Date(1960, 0, 1);

    const todayYear = today.getFullYear();

    const startYear = 1960;

    const {index} = useParams();
    const allAdviceUpdate = new FormData();

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')
    
    //환자
    const [ad_ptname, setAdptname] = useState('')
    const [ad_ptssnum, setAdptssnum] = useState('');
    const [adPtSsNum1, setAdPtSsNum1] = useState();
    const [adPtSsNum2, setAdPtSsNum2] = useState();
    const [ad_ptsub, setAdptsub] = useState('');
    const [ad_ptdiagnosis, setAdptdiagnosis] = useState('')
    const [ad_ptrec ,setAdptrec] = useState('')
    const [ad_ptcmt, setAdptcmt] = useState('')
    
    // 보험사
    const [insurance ,setInsurance] = useState('')
    const [insure_name, setInsurename] = useState('')
    const [insureDate, setInsureDate] = useState('')

    const [insureYear, setInsureYear] = useState(2000);  
    const [insureMonth, setInsureMonth] = useState(1);
    const [insureDay, setInsureDay] = useState(1);
    
    // 진료기록
    const [hospital, setHospital] = useState('')
    const [admStart ,setAdmStart] = useState('')
    const [admEnd, setAdmEnd] = useState('')
    const [adm_startYear ,setAdmStartYear] = useState('')
    const [adm_startMonth, setAdmStartMonth] = useState('')
    const [adm_startDay, setAdmStartDay] = useState('')
    const [adm_endYear, setAdmEndYear] = useState('')
    const [adm_endMonth, setAdmEndMonth] = useState('')
    const [adm_endDay, setAdmEndDay] = useState('')
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
    const [adQuestionContentArray, setAdQuestionContentArray] = useState([]);
    const [contents_count, setContentscount] = useState(0)

    const [visitStart ,setVisitstart] = useState('')
    const [visitEnd, setVisitend] = useState('')
    const [visit_startYear ,setVisitStartYear] = useState('')
    const [visit_startMonth, setVisitStartMonth] = useState('')
    const [visit_startDay, setVisitStartDay] = useState('')
    const [visit_endYear, setVisitEndYear] = useState('')
    const [visit_endMonth, setVisitEndMonth] = useState('')
    const [visit_endDay, setVisitEndDay] = useState('')

    const [adQuestion, setAdQuestion] = useState(0);

    // 자문 파일
    const [adReqForm, setAdReqForm] = useState(null)
    const [adDiagnosis, setAdDiagnosis] = useState(null)
    const [adRecord, setAdRecord] = useState(null)
    const [adFilm, setAdFilm] = useState(null)
    const [adOther, setAdOther] = useState(null)

    //자문 파일 검사
    const [isAdReqForm, setIsAdReqForm] = useState(false)
    const [isAdDiagnosis, setIsAdDiagnosis] = useState(false)
    const [isAdRecord, setIsAdRecord] = useState(false)
    const [isAdFilm, setIsAdFilm] = useState(false)
    const [isAdOther, setIsAdOther] = useState(false)

    //사진 미리보기 팝업
    const [isOpenimage ,setIsOpenimage] = useState(false)
    const [src, setSrc] = useState('')

    const filename = {}

    const navigate = useNavigate()
    const adviceUpdate = new FormData()

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
        getAdviceRequest()
    }, [])

    const getAdviceRequest = async() => {
        try{
            const response = await axios.get(`/user/advice/detail/${index}`)
            console.log(response.data)
            setAdviceDetails(response.data);
            console.log("response",response);
            console.log("insure",response.data.insureDate);
            setAdQuestion(response.data.adviceQuestions);
            const adContented = response.data.adviceQuestions
            setAdQuestionContentArray(() => adContented.map(item => item.adQuestionContent))
            console.log(adQuestionContentArray);
            setAdQuestionTotal(response.data.adviceQuestions.length);
    
            setAdptname(response.data.adPtName)
            setAdptsub(response.data.adPtSub)
            setAdptdiagnosis(response.data.adPtDiagnosis)
            setAdptrec(response.data.adPtRec)
            setAdptcmt(response.data.adPtCmt)
            setInsurance(response.data.insurance)
            setInsurename(response.data.insureName)
            setHospital(response.data.hospital)
            setTreatcmt(response.data.treatCmt)
            setAdEtcValue(response.data.adEtc)

            console.log("adviceQuestions",response.data.adviceQuestions);
            const insure = response.data.insureDate.split('-');
            console.log("insure",insure);
            setInsureYear(insure[0]);
            setInsureMonth(insure[1]);
            setInsureDay(insure[2]);
            console.log("insure0",insureYear);
            console.log("insure1",insureMonth);
            console.log("insure2",insureDay);
            const adm_start_parts = response.data.admStart.split('-');
            setAdmStartYear(adm_start_parts[0]);
            setAdmStartMonth(adm_start_parts[1]);
            setAdmStartDay(adm_start_parts[2]);
              
            const adm_end_parts = response.data.admEnd.split('-');
            setAdmEndYear(adm_end_parts[0]);
            setAdmEndMonth(adm_end_parts[1]);
            setAdmEndDay(adm_end_parts[2]);
              
            const visit_start_parts = response.data.visitStart.split('-');
            setVisitStartYear(visit_start_parts[0]);
            setVisitStartMonth(visit_start_parts[1]);
            setVisitStartDay(visit_start_parts[2]);
              
            const visit_end_parts = response.data.visitEnd.split('-');
            setVisitEndYear(visit_end_parts[0]);
            setVisitEndMonth(visit_end_parts[1]);
            setVisitEndDay(visit_end_parts[2]);

            setAdmStartDate(response.data.admStart.replaceAll('-', '/'))
            setAdmEndDate(response.data.admEnd.replaceAll('-', '/'))
            setVisitStartDate(response.data.visitStart.replaceAll('-', '/'))
            setVisitEndDate(response.data.visitEnd.replaceAll('-', '/'))
        

            const ad_PtSsNum = response.data.adPtSsNum.split('-');
            setAdPtSsNum1(ad_PtSsNum[0]);
            setAdPtSsNum2(ad_PtSsNum[1]);
            setIsAdReqForm(() => {
                if(response.data.adReqForm === "empty_file"){
                    return false
                } else{
                    setAdReqForm(response.data.adReqForm)
                    return true
                }
            })
            setIsAdDiagnosis(()=>{
                if(response.data.adDiagnosis === "empty_file"){
                    return false
                } else{
                    setAdDiagnosis(response.data.adDiagnosis)
                    return true
                }
            })
            setIsAdRecord(()=>{
                if(response.data.adRecord === "empty_file"){
                    return false
                } else{
                    setAdRecord(response.data.adRecord)
                    return true
                }
            })
            setIsAdFilm(()=>{
                if(response.data.adFilm === "empty_file"){
                    return false
                } else{
                    setAdFilm(response.data.adFilm)
                    return true
                }
            })
            setIsAdOther(()=>{
                if(response.data.adOther === "empty_file"){
                    return false
                } else{
                    setAdOther(response.data.adOther)
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
    const isPtInfoValid = ad_ptname && adPtSsNum1 && adPtSsNum2 && ad_ptsub && ad_ptdiagnosis && ad_ptrec && ad_ptcmt;
    const isInsuranceValid = insurance && insure_name && insureYear && insureMonth && insureDay;
    const isHospitalInfoValid = hospital && adm_startYear && adm_startMonth && adm_startDay && adm_endYear && adm_endMonth && adm_endDay &&
      visit_startYear && visit_startMonth && visit_startDay && visit_endYear && visit_endMonth && visit_endDay && treat_cmt;
    const isEtcInfoValid = adEtcValue;
    const isQuestionInfoValid = adQuestionContents.every(content => content); // 모든 질문 내용이 비어있지 않아야 함

  
    // 모든 조건을 만족하면 true를 반환
    return isUserInfoValid && isPtInfoValid && isInsuranceValid && isHospitalInfoValid && isEtcInfoValid && isQuestionInfoValid;
  };
const btn_advice_update = async() => {
     // 유효성 검사
    if (!isFormValid()) {
        alert('입력값을 확인해주세요.');
        return;
    }
    const adPtSsNum = adPtSsNum1 + "-" + adPtSsNum2
    const insureDate = insureYear + '-' + insureMonth + '-' + insureDay
    const today = new Date()
    const admStart = adm_startYear + '-' + adm_startMonth + '-' + adm_startDay
    const admEnd = adm_endYear + '-' + adm_endMonth + '-' + adm_endDay
    const visitStart = visit_startYear + '-' + visit_startMonth + '-' + visit_startDay
    const visitEnd = visit_endYear + '-' + visit_endMonth + '-' + visit_endDay
    
    const adFile = [adReqForm, adDiagnosis, adRecord, adFilm, adOther];
    console.log(adFile)
        const adFile_toString = []
        adFile.forEach(file => {
            if (file === null || typeof file === 'undefined') {
                adFile_toString.push("empty_file")
            } else {
                if(typeof file === 'string'){
                    adFile_toString.push(file)
                } else{
                    allAdviceUpdate.append('files', file);
                    adFile_toString.push("no_empty_file")
                }
            }
        });
        console.log(adFile_toString)
        const formData = new FormData();
        allAdviceUpdate.append("dto", new Blob([JSON.stringify({
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
            "adQuestionContent" : adQuestionContentArray,
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

          adQuestionContentArray.forEach((question, index) => {
            formData.append(`adQuestionContent[${index}]`, question);
        });
        console.log(adQuestionContentArray)

    try{
        const maxSizeInBytes = 100 * 1024 * 1024
            if (allAdviceUpdate.getAll('files').some(file => file.size > maxSizeInBytes)) {
                throw new Error('파일 크기가 너무 큽니다.')
            }
        const response = await axios.put(`/user/advice/detail/update/${index}`, allAdviceUpdate,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert('자문의뢰 수정이 완료되었습니다.')
        navigate('/')
    } catch(err){
        alert(err.message);
    }
}

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
              value={adQuestionContentArray[index] || ''}
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

const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

const handleYearChange = (e) => {
    setInsureYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setInsureMonth(e.target.value);
  };

  const handleDayChange = (e) => {
    setInsureDay(e.target.value);
  };

  const handleAdEtcChange = (e) => {
      setAdEtcValue(e.target.value);
      setAdetccount(e.target.value.length)
    };

    const handleQuestionTotalChange = (e) => {
        let value = parseInt(e.target.value, 10);
        value = isNaN(value) ? 1 : Math.min(Math.max(value, 1), 5); // Ensure the value is between 1 and 5
        setAdQuestionTotal(value);
    
        const newContents = adQuestionContentArray.slice(0, value);
        
        if (value > adQuestionContentArray.length) {
            for (let i = adQuestionContentArray.length; i < value; i++) {
                newContents[i] = '';
            }
        }
        setAdQuestionContentArray(newContents);
    };
  
  const handleQuestionContentChange = (index, e) => {
      const newContents = [...adQuestionContentArray];
      newContents[index] = e.target.value;
      setAdQuestionContentArray(newContents);
  };
  
  const input_ad_ptname = e => {
      setAdptname(e.target.value)
  }
  const input_ad_ptssnum1 = e => {
      setAdPtSsNum1(e.target.value)
      console.log(e.target.value + '-')
  }
  const input_ad_ptssnum2 = e => {
      setAdPtSsNum2(e.target.value)
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
      setAdmStartYear(e.target.value)
  }
  const input_adm_startMonth = e => {
      setAdmStartMonth(e.target.value)
  } 
  const input_adm_startDay = e => {
      setAdmStartDay(e.target.value)
  }
  const input_adm_endYear = e => {
      setAdmEndYear(e.target.value)
  }
  const input_adm_endMonth = e => {
      setAdmEndMonth(e.target.value)
  }
  const input_adm_endDay = e => {
      setAdmEndDay(e.target.value)
  }
  const input_treat_cmt = e => {
      setTreatcmt(e.target.value)
      setTreatcmtcount(e.target.value.length)
  }
  const input_visit_startYear = e => {
      setVisitStartYear(e.target.value)
  }
  const input_visit_startMonth = e => {
      setVisitStartMonth(e.target.value)
  }
  const input_visit_startDay = e => {
      setVisitStartDay(e.target.value)
  }

  const input_visit_endYear = e => {
      setVisitEndYear(e.target.value)
  }
  const input_visit_endMonth = e => {
      setVisitEndMonth(e.target.value)
  }
  const input_visit_endDay = e => {
      setVisitEndDay(e.target.value)
  }

  const btn_advice_cancle = async() => {
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
    <div className={advicerequest.advicerequest_wrap}>
            <div className={advicerequest.iconbox}>
                <h2 className={advicerequest.title}>
                    자문의뢰 수정
                </h2>
                <h4 className={advicerequest.title_bottom}>
                   - 의료 자문의뢰를 신청하고자 하는 의뢰자께서는 아래 모든 항목에 대해 모두 입력해주세요.
                </h4>
             </div>

            {/*신청자 정보 */}

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
            <div className={advicerequest.request_patienttable2}>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>환자명</div>
                    <div className={advicerequest.input_box}>
                    <input type="text" name="ad_ptname" value={ad_ptname} disabled={false} onChange={input_ad_ptname} maxLength={20}></input>
                </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>주민등록번호</div>
                    <div className={advicerequest.input_box}>
                    <input type="text" name="ad_ptssnum1" value={adPtSsNum1} disabled={false} maxLength={6} onChange={input_ad_ptssnum1}></input>
                     -
                    <input type="password" name="ad_ptssnum2" value={adPtSsNum2} disabled={false} maxLength={7} onChange={input_ad_ptssnum2}></input>
                </div>
            </div>
            <div className={advicerequest.row_box}>
                <div className={advicerequest.title_box}>진단과목</div>
                <div className={advicerequest.input_box}>
                    <select value={ad_ptsub} onChange={e => setAdptsub(e.target.value)}>
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
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>진단명</div>
                    <div className={advicerequest.input_box}>
                    <input type="text" name="ad_ptdiagnosis" value={ad_ptdiagnosis} disabled={false} onChange={input_ad_ptdiagnosis} maxLength={50}/>
                </div>
            </div>
            <div className={advicerequest.row_box}>
                <div className={advicerequest.title_box}>과거 진단이력</div>
                <div className={advicerequest.input_box}>
                    <input type="text" name="ad_ptrec" value={ad_ptrec} disabled={false} onChange={input_ad_ptrec} maxLength={100}/>
                </div>
            </div>
            <div className={`${advicerequest.row_box}`}>
                <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>
                    내용
                </div>
                <div className={advicerequest.input_box} style={{width : '600px', height : 'auto'}}>
                    <textarea cols="50" rows="10" value={ad_ptcmt} disabled={false} onChange={input_ad_ptcmt} maxLength={500}/>
                    <div className={advicerequest.count_box}>
                        <span>{contents_count}/500</span>
                    </div>
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
                    <input type="text" name="insurance" value={insurance} disabled={false} onChange={input_insurance} maxLength={10}></input>
                </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>계약일자</div>
                    <div className={advicerequest.input_box}>
                    <select onChange={handleYearChange} value={insureYear}>{generateOptions(startYear, todayYear)}</select> -
                    <select onChange={handleMonthChange} value={insureMonth}>{generateOptions(1, 12)}</select> -
                    <select onChange={handleDayChange} value={insureDay}>{dayOptions.map((day) => day)}</select>
                </div>
            </div>
            <div className={advicerequest.row_box}>
                <div className={advicerequest.title_box}>보험계약명</div>
                <div className={advicerequest.input_box}>
                    <input type="text" name="insure_name" value={insure_name} disabled={false} onChange={input_insure_name} maxLength={20}></input>
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
                <div className={advicerequest.title_box} >1차 치료 병원명</div>
                <div className={advicerequest.input_box}>
                    <input type="text" name="hospital" value={hospital} disabled={false} onChange={input_hospital} maxLength={20}></input>
                </div>
            </div>
            <div className={advicerequest.row_box}>
                <div className={advicerequest.title_box}>입원 치료기간</div>
                    <div className={advicerequest.input_box}>
                        <div className={advicerequest.datebox}>
                        <DatePicker
                                selected={admStartDate}
                                onChange={date => {
                                    setAdmStartDate(date);
                                    setAdmStartYear(date.getFullYear());
                                    setAdmStartMonth(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더해줍니다.
                                    setAdmStartDay(date.getDate());
                                }}
                                dateFormat="yyyy/MM/dd"
                                selectsStart
                                startDate={admStartDate}
                                endDate={admEndDate}
                                // locale="ko"
                                minDate={minDate}
                            />
                        </div>
                        ~
                        <div className={advicerequest.datebox}>
                            <DatePicker
                                selected={admEndDate}
                                onChange={date => {
                                    setAdmEndDate(date);
                                    setAdmEndYear(date.getFullYear());
                                    setAdmEndMonth(date.getMonth() + 1);
                                    setAdmEndDay(date.getDate());
                                }}
                                dateFormat="yyyy/MM/dd"
                                selectsEnd
                                startDate={admStartDate}
                                endDate={admEndDate}
                                minDate={admStartDate || minDate} // 최소 날짜는 시작 날짜 이후부터
                                locale="ko"
                            />
                        </div>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className={advicerequest.title_box}>통원 치료기간</div>
                    <div className={advicerequest.input_box}>
                    <div className={advicerequest.datebox}>
                            <DatePicker
                                selected={visitStartDate}
                                onChange={date => {
                                    setVisitStartDate(date);
                                    setVisitStartYear(date.getFullYear());
                                    setVisitStartMonth(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더해줍니다.
                                    setVisitStartDay(date.getDate());
                                }}
                                dateFormat="yyyy/MM/dd"
                                selectsStart
                                startDate={visitStartDate}
                                endDate={visitEndDate}
                                // locale="ko"
                                minDate={minDate}
                            />
                        </div>
                        ~
                        <div className={advicerequest.datebox}>
                            <DatePicker
                                selected={visitEndDate}
                                onChange={date => {
                                    setVisitEndDate(date);
                                    setVisitEndYear(date.getFullYear());
                                    setVisitEndMonth(date.getMonth() + 1);
                                    setVisitEndDay(date.getDate());
                                }}
                                dateFormat="yyyy/MM/dd"
                                selectsEnd
                                startDate={visitStartDate}
                                endDate={visitEndDate}
                                minDate={visitStartDate || minDate} // 최소 날짜는 시작 날짜 이후부터
                                // locale="ko"
                            />
                        </div>
                    </div>
                </div>
                <div className={advicerequest.row_box}>
                    <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>치료사항</div>
                    <div className={advicerequest.input_box} style={{width : '600px', height : 'auto'}}>
                    <textarea cols="50" rows="10" value={treat_cmt} disabled={false} maxLength={500} onChange={input_treat_cmt}></textarea>
                    <div className={advicerequest.count_box}>
                            <span>{treat_cmt_count}/500</span>
                        </div>                   
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
                <div className ={`${advicerequest.title_box} ${advicerequest.row_contentbox}`}>기타사항</div>
                    <div className={advicerequest.input_box} style={{width : '600px'}}>
                    <textarea cols="50" rows="3" name="adEtc" disabled={false} value={adEtcValue} onChange={handleAdEtcChange} maxLength={300}></textarea>
                    <div className={advicerequest.count_box}>
                        <span>{ad_etc_count}/300</span>
                    </div>
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
                    <select value={adQuestionTotal} onChange={handleQuestionTotalChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
            </div>
                {renderQuestionInputs()}
            </div>
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
                        isAdReqForm ? 
                        <>
                            <button className={advicerequest.btn_preview} onClick={()=>btn_open_image(`http://localhost:8080/advice/findFile/${index}/adReqForm`)}>미리보기</button>
                            <button className={advicerequest.btn_file_cancle} onClick={()=>{
                                setAdReqForm(null)
                                setIsAdReqForm(false)
                                }} >x</button>
                        </>
                        :
                        <>
                            <label htmlFor="file-upload" className={advicerequest.file_label}>
                                <button className={advicerequest.btn_file}>
                                    <i class="fa-solid fa-plus" style={{color: '#ffffff'}}/> 파일 추가
                                </button>
                                <input
                                id="file-upload"
                                className={advicerequest.input_file}
                                type="file"
                                accept="image/*"
                                onChange={e => setAdReqForm(e.target.files[0])}
                                />
                            </label>
                            <span className={advicerequest.file_msg}>{adReqForm ? `선택된 파일: ${adReqForm.name}` : `선택된 파일: 없음`}</span>
                        </>
                    }
                </div>
            </div>
            <div className={advicerequest.row_box} style={{height : 'auto'}}>
                <div className={advicerequest.title_box}>
                    진단서
                </div>
                <div className={advicerequest.input_box}>
                    {
                        isAdDiagnosis ?
                        <>
                            <button className={advicerequest.btn_preview} onClick={()=>btn_open_image(`http://localhost:8080/advice/findFile/${index}/adDiagnosis`)}>미리보기</button>
                            <button className={advicerequest.btn_file_cancle} onClick={()=>{
                                setAdDiagnosis(null)
                                setIsAdDiagnosis(false)
                                }} >x</button>
                        </>
                        :
                        <>
                            <label htmlFor="file-upload" className={advicerequest.file_label}>
                                <button className={advicerequest.btn_file}>
                                    <i class="fa-solid fa-plus" style={{color: '#ffffff'}}/> 파일 추가
                                </button>
                                <input
                                id="file-upload"
                                className={advicerequest.input_file}
                                type="file"
                                accept="image/*"
                                onChange={e => setAdDiagnosis(e.target.files[0])}
                                />
                            </label>
                            <span className={advicerequest.file_msg}>{adDiagnosis ? `선택된 파일: ${adDiagnosis.name}` : `선택된 파일: 없음`}</span>
                        </>
                    }
                    
                </div>
            </div>
            <div className={advicerequest.row_box} style={{height : 'auto'}}>
                <div className={advicerequest.title_box}>
                    의무기록지
                </div>
                <div className={advicerequest.input_box}>
                    {
                        isAdRecord ?
                        <>
                            <button className={advicerequest.btn_preview} onClick={()=>btn_open_image(`http://localhost:8080/advice/findFile/${index}/adRecord`)}>미리보기</button>
                            <button className={advicerequest.btn_file_cancle} onClick={()=>{
                                setAdRecord(null)
                                setIsAdRecord(false)                                
                                }} >x</button>
                        </>
                        :
                        <>
                            <label htmlFor="file-upload" className={advicerequest.file_label}>
                                <button className={advicerequest.btn_file}>
                                    <i class="fa-solid fa-plus" style={{color: '#ffffff'}}/> 파일 추가
                                </button>
                                <input
                                id="file-upload"
                                className={advicerequest.input_file}
                                type="file"
                                accept="image/*"
                                onChange={e => setAdRecord(e.target.files[0])}
                                />
                            </label>
                            <span className={advicerequest.file_msg}>{adRecord ? `선택된 파일: ${adRecord.name}` : `선택된 파일: 없음`}</span>
                        </>
                    }
                </div>
            </div>
            <div className={advicerequest.row_box} style={{height : 'auto'}}>
                <div className={advicerequest.title_box}>
                    필름
                </div>
                <div className={advicerequest.input_box}>
                    {
                        isAdFilm ? 
                        <>
                            <button className={advicerequest.btn_preview} onClick={()=>btn_open_image(`http://localhost:8080/advice/findFile/${index}/adFilm`)}>미리보기</button>
                            <button className={advicerequest.btn_file_cancle} onClick={()=>{
                                setAdFilm(null)
                                setIsAdFilm(false)
                                }} >x</button>
                        </>
                        :
                        <>
                            <label htmlFor="file-upload" className={advicerequest.file_label}>
                                <button className={advicerequest.btn_file}>
                                    <i class="fa-solid fa-plus" style={{color: '#ffffff'}}/> 파일 추가
                                </button>
                                <input
                                id="file-upload"
                                className={advicerequest.input_file}
                                type="file"
                                accept="image/*"
                                onChange={e => setAdFilm(e.target.files[0])}
                                />
                            </label>
                            <span className={advicerequest.file_msg}>{adFilm ? `선택된 파일: ${adFilm.name}` : `선택된 파일: 없음`}</span>
                        </>
                    }      
                </div>
            </div>
            <div className={advicerequest.row_box} style={{height : 'auto'}}>
                <div className={advicerequest.title_box}>
                    기타 자료
                </div>
                <div className={advicerequest.input_box}>
                    {
                        isAdOther ?
                        <>
                            <button className={advicerequest.btn_preview} onClick={()=>btn_open_image(`http://localhost:8080/advice/findFile/${index}/adOther`)}>미리보기</button>
                            <button className={advicerequest.btn_file_cancle} onClick={()=>{
                                setAdOther(null)
                                setIsAdOther(false)
                                }} >x</button>
                        </>
                        :
                        <>
                            <label htmlFor="file-upload" className={advicerequest.file_label}>
                                <button className={advicerequest.btn_file}>
                                    <i class="fa-solid fa-plus" style={{color: '#ffffff'}}/> 파일 추가
                                </button>
                                <input
                                id="file-upload"
                                className={advicerequest.input_file}
                                type="file"
                                accept="image/*"
                                onChange={e => setAdOther(e.target.files[0])}
                                />
                            </label>
                            <span className={advicerequest.file_msg}>{adOther ? `선택된 파일: ${adOther.name}` : `선택된 파일: 없음`}</span>
                        </>
                    }
                </div>
            </div>
            <div className={advicerequest.complete}>
                <button type = "button" className={advicerequest.complete_button} onClick={btn_advice_update}>자문 의뢰수정</button>
                <button type = "button" className={advicerequest.complete_button} onClick={btn_advice_cancle}>취소</button>
             </div>
             <ImageModal src={src} isOpenimage={isOpenimage} onRequestClose={closeImageModal} />
        </div>
    </div>  
)
}