import React, { useState, useEffect } from 'react';
import translaterequest from '../../css/AdDetailRequestPage.module.css'
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';

export default function AdDetailTranslate(){

    const {index} = useParams();
    const [translateDetails, setTranslateDetails] = useState({});

    const [uname, setUname] = useState('')
    const [utel, setUtel] = useState('')
    const [uphone, setUphone] = useState('')
    const [uaddress, setUaddress] = useState('')

    //환자
    const [trPtName, setTrptname] = useState('')
    const [trPtSsNum1, setTrptssnum1] = useState('');
    const [trPtSsnum2, setTrptssnum2] = useState('');
    const [trPtSub, setTrptsub] = useState('');
    const [trPtDiagnosis, setTrptdiagnosis] = useState('')
    const [trPtCmt, setTrptcmt] = useState('')
    const [trEct,setTrEct] = useState('')

    //기타사항
    const [trEtcValue, setTrEtcValue] = useState('');
    const [tr_etc_count, setTretccount] = useState(0)

    const [contents_count, setContentscount] = useState(0)

    const [trMtl, setTrMtl] = useState(false);
    const [trAnswer, setTrAnswer] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.get(`/admin/translate/detail/${index}`);
                setTranslateDetails(response.data);
                console.log("response",response);
                const anptssnum = response.data.trPtSsNum.split('-');
                setTrptssnum1(anptssnum[0]);
                setTrptssnum2(anptssnum[1]);
                const [zipcode, userroadAddress, userDetailAddress] = response.data.userAddress.split('/');
                setUaddress(`(${zipcode}) ${userroadAddress} ${userDetailAddress}`);

                setTrMtl(()=>{
                    if(response.data.trMtl === "empty_file"){
                        return false
                    } else{
                        return true
                    }
                    
                })
                setTrAnswer(()=>{
                    if(response.data.trAnswer === null){
                        return false
                    } else{
                        return true
                    }
                })
               
            }catch(error){
                console.error('유저 정보 에러:',error);
            }
        }
        fetchData();
    }, [])
    const btn_translate_list = async() => {
        navigate('/medic/adminstrator/trlist')
    }

    return(
        <div className={translaterequest.translaterequest_wrap}>
                  <div className={translaterequest.iconbox}>
                <h2 className={translaterequest.title}>
                    번역의뢰 상세페이지
                </h2>
                <h4>
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
                    <span>{translateDetails.uname}</span>
                    </div>
                </div>

                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>일반전화</div>
                    <div className={translaterequest.input_box}>
                    <span>  {translateDetails.userTel}</span>
                    </div>
                    </div>
                    <div className={translaterequest.row_box}>

                    <div className={translaterequest.title_box} >휴대전화</div>
                    <div className={translaterequest.input_box}>
                    <span>  {translateDetails.userPhone}</span>
                    </div>
                </div>

                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주소</div>
                    <div className={translaterequest.input_box}>
                        <span>{uaddress}</span>
                    </div>
                </div>
             </div>
             <div className={translaterequest.iconbox}>
                <h3 className={translaterequest.tit}>
                    
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={translaterequest.request_othertable}>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>환자명</div>
                    <div className={translaterequest.input_box}>
                    <span> {translateDetails.trPtName}</span>                        
                    </div>
                    </div>
                    <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주민등록번호</div>
                    <div className={translaterequest.input_box}>
                    <span>{translateDetails.trPtSsNum}</span>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>진단과목</div>
                    <div className={translaterequest.input_box}>
                    <span>{translateDetails.trPtSub}</span>
                    </div>
                    </div>
                    <div className={translaterequest.row_box}>

                    <div className={translaterequest.title_box} >진단명</div>
                    <div className={translaterequest.input_box}>
                    <span>{translateDetails.trPtDiagnosis}</span>
                    </div>
                </div>
                <div className={`${translaterequest.row_box}`}>
                    <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={translaterequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="5" readOnly value={translateDetails.trPtDiagContent}/>   
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
                    <div className={translaterequest.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={translaterequest.input_box} style={{width : '400px'}}>
                        <textarea cols="50" rows="5" name="trEtc" disabled={true} value={translateDetails.trEtc} ></textarea>
                    </div>
                </div>
            </div>

             <div className={translaterequest.iconbox} >
                <h3 className={translaterequest.tit} >
                        첨부자료
                        <span >
                        ※ 번역자료는 압축파일(zip 파일형식) 으로 첨부해 주세요
                        </span>
                </h3>
            </div>
            <div className={translaterequest.file_table} style={{marginBottom:'1100px'}}>
                <div className={translaterequest.row_box} style={{height : 'auto'}}>
                    <div className={translaterequest.title_box}>
                        번역 요청자료
                    </div>
                    <div className={translaterequest.input_box}>
                    {
                            trMtl ?
                            <button className={translaterequest.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/translate/findFile/${index}`}
                                    download="adRecord.zip"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
                        }
                    </div>
                </div>
                <div className={translaterequest.row_box} style={{height : 'auto'}}>
                    <div className={translaterequest.title_box}>
                        번역 자료
                    </div>
                    <div className={translaterequest.input_box}>
                        {
                            trAnswer ?
                            <button className={translaterequest.btn_file_download}>
                                <a
                                    href={`http://localhost:8080/assignedTranslate/findFile/${index}`}
                                    download="adRecord.zip"
                                >
                                    다운로드
                                </a>
                            </button>
                            :
                            "업로드된 파일이 없습니다."
                        }
                        
                    </div>
                </div>
                <div className={translaterequest.complete} >
                    <button type = "button" className={translaterequest.complete_button} onClick={btn_translate_list} >목록</button>
                 </div>
            </div>
         
        </div>
    )
}