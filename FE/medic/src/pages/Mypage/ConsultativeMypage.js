import React from "react";
import mypage from '../../css/Mypage.module.css'
import Footer from '../../components/Footer'
import ModifyConsultativeInfopage from "../../components/ModifyConsultativeInfopage";
import ConsultativeAssignmentCount from "../../components/ConsultativeAssignmentCount";

export default function ConsultativeMypage(){
    return(
        <>
            <div className={mypage.mypage_box}>
                <ConsultativeAssignmentCount/>
                <ModifyConsultativeInfopage/>
            </div>
            <Footer/>
        </>
        
    )
}