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
                1. 사업자 정보
                2. 회사소개
                3. 펙스 및 이메일 정보
            </div>
        </div>
    )
}