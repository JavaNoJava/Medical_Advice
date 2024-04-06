import React, { useEffect } from "react";
import style from '../css/Mainpage.module.css'
import banner from '../img/main_banner.png'
import main_bottom_btn1 from '../img/main_bottom_banner1.gif'
import main_bottom_btn2 from '../img/main_bottom_banner2.gif'
import main_bottom_btn3 from '../img/main_bottom_banner3.gif'


export default function Mainpage(){

    const btn_show_ICD = e => {
        window.open('http://km-cc.co.kr/center/disease.pdf', "_blank", "noopener, noreferrer");
    }
    const btn_show_medicine = e => {
        window.open('https://www.hira.or.kr/rb/dur/form.do?pgmid=HIRAA050300000100&WT.ac=%EB%82%B4%EA%B0%80%EB%A8%B9%EB%8A%94%EC%95%BD%ED%95%9C%EB%88%88%EC%97%90%EB%B0%94%EB%A1%9C%EA%B0%80%EA%B8%B0', "_blank", "noopener, noreferrer")
    }
    const btn_show_terminology = e => {
        window.open('https://www.kmle.co.kr/', "_blank", "noopener, noreferrer");
    }
    return (
        <div className={style.main_wrap}>
            <section>
                <div className={style.main_banner_wrap}>
                    <div className={style.main_banner_box}>
                        <div className={style.main_banner_titlebox}>
                            <span className={style.main_banner_title}>의료자문분석시스템</span>
                            <small className={style.main_banner_subtitle}>Medical Advice Analyze System</small>
                        </div>
                        <div className={style.main_banner_imgbox}>
                            <img src={banner} className={style.main_banner}></img>
                        </div>        
                    </div>                             
                </div>
                <div className={style.main_searchwrap}>
                    <div className={style.main_serachbox}>
                        <button className={`${style.main_bottom_btnbox}`} onClick={btn_show_ICD}>
                            <img src={main_bottom_btn1} className={style.main_bottom_btn} alt="질병분류표 검색"></img>
                        </button>
                        <button className={`${style.main_bottom_btnbox}`}>
                            <img src={main_bottom_btn2} className={style.main_bottom_btn} onClick={btn_show_medicine} alt="약품조회"></img>
                        </button>
                        <button className={`${style.main_bottom_btnbox}`}>
                            <img src={main_bottom_btn3} className={style.main_bottom_btn} onClick={btn_show_terminology} alt="의약용어 검색"></img>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}