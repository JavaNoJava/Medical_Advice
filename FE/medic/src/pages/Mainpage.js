import React, { useEffect } from "react";
import Footer from "../components/Footer";
import style from '../css/Mainpage.module.css'

export default function Mainpage(){
    const btn_show_mypage = e => {
        // 버튼 클릭 시 수행할 로직
    }

    return (
        <div className={style.main_wrap}>
            <section>
            </section>
            <Footer/>
        </div>
    )
}