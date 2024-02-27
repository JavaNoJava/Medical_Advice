import React from "react";
import ModifyInputUserPw from "../../components/ModifyInputUserPw";
import modifypw from '../../css/ModifyMyPw.module.css'

export default function ModifyMyPwpage(){
    return(
        <div className={modifypw.wrap}>
            <div className={modifypw.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    비밀번호 재설정
                </h2>
            </div>
            <ModifyInputUserPw/>
        </div>
    )
}