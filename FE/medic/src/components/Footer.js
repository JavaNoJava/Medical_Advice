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
                        상호: 주식회사 의료자문분석시스템 / 사업자번호:382-32-11357 / TEL: 02-815-3778 / FAX: 02-815-3778 / 이메일 : mass12@naver.com<br/>
                        대표: 김정남 / 주소: 서울 송파구 동남로 99, 13층(용현빌딩) &nbsp;우. 08761<br/>
                        Copyright © KMCC Corp. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}