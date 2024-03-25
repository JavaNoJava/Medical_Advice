import React from "react";
import style from '../css/Mainpage.module.css'

export default function Footer(){
    const btn_intro_advisor = e => {
        
    }
    const btn_intro_company = e => {

    }
    const btn_show_map = e => {

    }
    return(
        <div className={`${style.main_footer} ${style.footer}`}>
            <div className={style.footer_wrap}>
                <div className={style.footer_navigator}>
                    <div className={style.footer_navigatorbox}>
                        <div className={`${style.btn_intro_advisor} ${style.footer_navigate_btn}`} onClick={btn_intro_advisor}>
                            자문소개
                        </div>
                        <div className={`${style.btn_intro_company} ${style.footer_navigate_btn}`}onClick={btn_intro_company}>
                            회사 소개
                        </div>
                        <div className={`${style.btn_show_map} ${style.footer_navigate_btn}`} onClick={btn_show_map}>
                            약도
                        </div>
                    </div>
                </div>
                <div className={style.footer_box}>
                    <p>
                        상호: 주식회사 한국의료자문센터 / 사업자번호:435-81-00113 / TEL: 02-834-4114 / FAX: 02-834-4115 / 이메일 : ikmcc@naver.com<br/>
                        대표: 이세준 / 주소: 서울 관악구 난곡로 320, 5층(신림동, 세인빌딩) &nbsp;우. 08761<br/>
                        Copyright © KMCC Corp. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}