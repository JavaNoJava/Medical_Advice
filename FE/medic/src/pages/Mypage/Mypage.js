import React, { useEffect, useState } from "react";
import mypage from '../../css/Mypage.module.css'
import Footer from '../../components/Footer'
import ModifyMyInfopage from "../../components/ModifyMyInfopage";
import MyRequestCount from "../../components/MyRequestCount";

export default function Mypage(){
    const [userType, setUserType] = useState('');

    useEffect(()=>{
        const uPart = window.localStorage.getItem('uPart');
        setUserType(uPart);
    }, []);

    return(
        <>
            <div className={userType === '일반회원'? mypage.mypage_box_small : mypage.mypage_box}>
                <MyRequestCount/>
                <ModifyMyInfopage/>
            </div>
            <Footer/>
        </>
    )
}
