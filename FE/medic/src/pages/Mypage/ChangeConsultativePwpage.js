import React from "react";
import ChangeInputConsultativePw from "../../components/ChangeInputConsultativePw";
import changePw from '../../css/ChangeConsultativePw.module.css'

export default function ChangeConsultativePwpage(){
    return(
        <div className={changePw.wrap}>
            <div className={changePw.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    비밀번호 재설정
                </h2>
            </div>
            <ChangeInputConsultativePw/>
        </div>
    )
}