import React, { useState, useEffect } from 'react';
import translaterequest from '../../css/TranslateRequestpage.module.css'
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';

export default function AdDetailTranslate(){

    const {userId} = useParams();
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

    const navigate = useNavigate()

    // const getUserInfo = async() =>{
    //     try{
    //         const response = await axios.get('/userInfo')
    //         console.log(response.data)
    //         setUname(response.data.name)
    //         setUtel(response.data.userTel)
    //         setUphone(response.data.userPhone)
    //         setUaddress(response.data.userAddress)
    //     } catch(err){
    //         console.log(err)
    //     }  
    // }

    // useEffect(()=>{
    //     getUserInfo()
    // }, [])

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.get('/analyze/details/${userId}');
                setTranslateDetails(response.data);

                const anptssnum = response.data.anPtSsNum.split('-');
                setTrptssnum1(anptssnum[0]);
                setTrptssnum2(anptssnum[1]);
                

               
            }catch(error){
                console.error('유저 정보 에러:',error);
            }
        }
    }, [])
    const btn_translate_list = async() => {
        navigate('/medic/adminstrator/adtranslatelistpage')
    }

    return(
        <div className={translaterequest.translaterequest_wrap}>
            <div className={translaterequest.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    번역의뢰 신청
                </h2>
                - 의료 번역의뢰를 신청하고자 하는 의뢰자께서는 아래 모든 항목에 대해 모두 입력해주세요.
             </div>
             <div className={translaterequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    신청자 정보
                </h3>
             </div>
             <div className={translaterequest.request_usertable}>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>의뢰자명</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={uname}/>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>일반전화</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={utel}/>
                    </div>
                    <div className={translaterequest.title_box} style={{borderLeft : '1px solid black'}}>휴대전화</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={uphone}/>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>주소</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" disabled={true} value={uaddress}/>
                    </div>
                </div>
             </div>
             <div className={translaterequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    환자의료 기록 사항
                </h3>
            </div>
            <div className={translaterequest.request_patienttable}>
                <div className={`${translaterequest.row_box} ${translaterequest.patient_box}`}>
                    <div className={`${translaterequest.title_box} ${translaterequest.patient_box}`}>환자명</div>
                    <div className={`${translaterequest.input_box} ${translaterequest.patient_box}`}>
                        <input type="text" name="tr_ptname" disabled={true} value={translateDetails.trPtName} ></input>
                    </div>
                    <div className={`${translaterequest.title_box} ${translaterequest.patient_box}`} style={{borderLeft : '1px solid black'}}>주민등록번호</div>
                    <div className={`${translaterequest.input_box} ${translaterequest.input_ptssnumbox} ${translaterequest.patient_box}`}>
                        <input type="text" name="tr_ptssnum1" disabled={true} value={trPtSsNum1}></input>
                         -
                        <input type="password" name="tr_ptssnum2" disabled={true} value={trPtSsnum2}></input>
                    </div>
                </div>
                <div className={translaterequest.row_box}>
                    <div className={translaterequest.title_box}>진단과목</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" name="tr_ptsub" disabled={true} value={trPtSub}/>
                    </div>
                    <div className={translaterequest.title_box} style={{borderLeft : '1px solid black'}}>진단명</div>
                    <div className={translaterequest.input_box}>
                        <input type="text" name="tr_ptdiagnosis" disabled={true} value={translateDetails.trPtDiagnosis}/>
                    </div>
                </div>
                <div className={`${translaterequest.row_box}`}>
                    <div className ={`${translaterequest.title_box} ${translaterequest.row_contentbox}`}>
                        진단 사항
                    </div>
                    <div className={translaterequest.input_box} style={{width : '400px', height : 'auto'}}>
                        <textarea cols="50" rows="10" disabled={true} value={translateDetails.trPtCmt}/>   
                        <div className={translaterequest.count_box}>
                            <span>/500</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={translaterequest.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    기타사항
                </h3>
            </div>
            <div className={translaterequest.request_othertable}>
                <div className={translaterequest.row_box} >
                    <div className={translaterequest.title_box} style={{height : '130px'}}>기타사항</div>
                    <div className={translaterequest.input_box} style={{width : '400px'}}>
                        <textarea cols="50" rows="3" name="trEtc" disabled={true} value={translateDetails.trEtc} ></textarea>
                        <div className={translaterequest.count_box}>
                            <span>{tr_etc_count}/300</span>
                        </div>
                    </div>
                </div>
            </div>

             <div className={`${translaterequest.iconbox} ${translaterequest.file_box}`}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
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
                        <input type='file' disabled={true} value={translateDetails.trMtl}/>
                    </div>
                </div>
                <div className={translaterequest.complete}>
                    <button type = "button" className={translaterequest.btt_complete} onClick={btn_translate_list} >목록</button>
                 </div>
            </div>
        </div>
    )
}