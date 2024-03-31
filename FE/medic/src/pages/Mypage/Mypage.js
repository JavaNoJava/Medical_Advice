import React from "react";
import mypage from '../../css/Mypage.module.css'
import Footer from '../../components/Footer'
import ModifyMyInfopage from "../../components/ModifyMyInfopage";
import MyRequestCount from "../../components/MyRequestCount";

export default function Mypage(){
    return(
        <>
            <div className={mypage.mypage_box}>
                <MyRequestCount/>
                <ModifyMyInfopage/>
            </div>
            <Footer/>
        </>
        
    )
}