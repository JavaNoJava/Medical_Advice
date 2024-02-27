import React from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AssignAccept from './pages/AssignAccept';
import Mainpage from './pages/Mainpage';
import Joinpage from './pages/Joinpage';
import Loginpage from './pages/Loginpage';
import AdviceRequestpage from './pages/Advicepage/AdviceRequestpage';
import AdviceListpage from './pages/Advicepage/AdviceListPage';
import AdviceDetailpage from './pages/Advicepage/AdviceDetailpage';
import AdviceModifypage from "./pages/Advicepage/AdviceModifypage";
import AnalyzeRequestpage from './pages/Analyzepage/AnalyzeRequestpage';
import AnalyzeListpage from './pages/Analyzepage/AnalyzeListpage';
import AnalyzeDetailpage from './pages/Analyzepage/AnalyzeDetailpage';
import AnalyzeModifypage from "./pages/Analyzepage/AnalyzeModifypage";
import TranslateRequestpage from './pages/Translatepage/TranslateRequestpage'
import TranslateListpage from './pages/Translatepage/TranslateListpage'
import TranslateDetailpage from './pages/Translatepage/TranslateDetailpage'
import TranslateModifypage from './pages/Translatepage/TranslateModifypage'
import Qnapage from "./pages/Customerpage/Qnapage";
import MedicalNegligencepage from './pages/MedicalLegalKnowledge/MedicalNegligencepage'
import MedicalNegligenceWritepage from "./pages/MedicalLegalKnowledge/MedicalNegligenceWritepage";
import IndustrialAccidentInfopage from './pages/MedicalLegalKnowledge/IndustrialAccidentInfopage'
import IndustrialAccidentWritepage from './pages/MedicalLegalKnowledge/IndustrialAccidentWritepage'
import TrafficAccidentInfopage from'./pages/MedicalLegalKnowledge/TrafficAccidentInfopage'
import TrafficAccidentWritepage from'./pages/MedicalLegalKnowledge/TrafficAccidentWritepage'
import WoundInfopage from'./pages/MedicalLegalKnowledge/WoundInfopage'
import WoundWritepage from'./pages/MedicalLegalKnowledge/WoundWritepage'
import Mypage from './pages/Mypage/Mypage'
import ConsultativeMypage from './pages/Mypage/ConsultativeMypage'
import Header from "./components/Header";
import Announcementpage from "./pages/Customerpage/Announcementpage";
import AnnouncementDetail from "./pages/Customerpage/Announcement/AnnouncementDetail";
import WriteAnnouncement from "./pages/Customerpage/Announcement/WriteAnnouncement";
import FinduserInfopage from "./pages/FinduserInfo/FinduserInfopage";
import Updatepw from './pages/FinduserInfo/Updatepw'
import ChangeConsultativeInfo from "./pages/Mypage/ChangeConsultativeInfopage";
import ModifyMyInfopage from "./pages/Mypage/ModifyMyInfopage"
import ConsultativeAdviceAssignment from './pages/Consultativepage/ConsultativeAdviceAssignment'
import ConsultativeAnalyzeAssignment from './pages/Consultativepage/ConsultativeAnalyzeAssignment'
import ConsultativeTranslateAssignment from './pages/Consultativepage/ConsultativeTranslateAssignment'
import ConsultativeAdviceAssignmentDetail from './pages/Consultativepage/ConsultativeAssignmentAdviceDetail'
import ConsultativeAnalyzeAssignmenDetail from "./pages/Consultativepage/ConsultativeAssignmentAnalyzeDetail";
import ConsultativeTranslateAssignmentDetail from "./pages/Consultativepage/ConsultativeAssignmentTranslateDetail";
import IndustrialAccidentDetail from "./pages/MedicalLegalKnowledge/IndustrialAccidentDetailInfopage";
import MedicalNegligenceDetailpage from "./pages/MedicalLegalKnowledge/MedicalNegligenceDetailpage";
import TrafficAccidentDetail from "./pages/MedicalLegalKnowledge/TrafficAccidentDetailInfopage";
import WoundDetail from "./pages/MedicalLegalKnowledge/WoundDetailInfopage";
import ModifyMyPwpage from "./pages/Mypage/ModifyMyPwpage";
import AdministratorMypage from "./pages/Adminstrator/AdministratorMypage";
import DocManagement from "./pages/Adminstrator/DocManagement";
import UserManagement from "./pages/Adminstrator/UserManagement";
import DocEdit from "./pages/Adminstrator/DocEdit";
import UserEdit from "./pages/Adminstrator/UserEdit";
import FaqDetailPage from "./pages/Customerpage/FAQ/FAQDetailPage";
import WriteFaqPage from "./pages/Customerpage/FAQ/WriteFaqPage";
import FAQpage from "./pages/Customerpage/FAQ/FAQpage";
import AdAdviceListPage from "./pages/Adminstrator/AdAdviceListPage";
import AdSetDoc from "./pages/Adminstrator/AdSetDoc";
import AdAnalyzeListPage from "./pages/Adminstrator/AdAnalyzeListPage";
import AnSetDoc from "./pages/Adminstrator/AnSetDoc";
import TrSetDoc from "./pages/Adminstrator/TrSetDoc";
import AdTranslateListPage from "./pages/Adminstrator/AdTranslateListPage";
import AdDetailAdvice from "./pages/Adminstrator/AdDetailAdvice";
import AdDetailAnalyze from "./pages/Adminstrator/AdDetailAnalyze";
import AdDetailTranslate from "./pages/Adminstrator/AdDetailTranslate";
import ChangeConsultativePwpage from "./pages/Mypage/ChangeConsultativePwpage";
import AnnouncementEdit from "./pages/Customerpage/Announcement/AnnouncementEdit";
import FaqEdit  from "./pages/Customerpage/FAQ/FaqEdit";
import ScrollToTop from "./components/ScrollToTop";

import ErrorPage from "./pages/Adminstrator/ErrorPage";

import WriteQna from "./pages/Customerpage/Qna/WriteQna";
import QnaDetail from "./pages/Customerpage/Qna/QnaDetail";


export default function App(){
    return(
        <BrowserRouter>
        <div className="App">
            <Header/>
            <ScrollToTop/>
            <div className="App-body">
                <Routes>
                    <Route path='/' element={<Mainpage/>}/>
                    <Route path='/medicassign' element={<AssignAccept/>}/>
                    <Route path='/mediclogin' element={<Loginpage/>}/>
                    <Route path='/medicsignup' element={<Joinpage/>}/>
                    <Route path='/medic/advice/adviceRequest' element={<AdviceRequestpage/>}/>
                    <Route path='/medic/advice/adviceList' element={<AdviceListpage/>}/>
                    <Route path='/medic/advice/adviceDetail/:index' element={<AdviceDetailpage/>}/>
                    <Route path='/medic/advice/adviceUpdate/:index' element={<AdviceModifypage/>}/>
                    <Route path='/medic/analyze/analyzeRequest' element={<AnalyzeRequestpage/>}/>
                    <Route path='/medic/analyze/analyzeList' element={<AnalyzeListpage/>}/>
                    <Route path='/medic/analyze/analyzeDetail/:index' element={<AnalyzeDetailpage/>}/>
                    <Route path='/medic/analyze/analyzeUpdate/:index' element={<AnalyzeModifypage/>}/>
                    <Route path='/medic/translate/translateRequest' element={<TranslateRequestpage/>}/>
                    <Route path='/medic/translate/translateList' element={<TranslateListpage/>}/>
                    <Route path='/medic/translate/translateDetail/:index' element={<TranslateDetailpage/>}/>
                    <Route path='/medic/translate/translateUpdate/:index' element={<TranslateModifypage/>}/>
                    <Route path='/medic/customer/customerInquiry' element={<Qnapage/>}/>
                    <Route path="/medic/customer/customerinquiry/writecustomerinquiry" element={<WriteQna/>}/>
                    <Route path="/medic/customer/customerinquiry/customerinquirydetails" element={<QnaDetail/>}/>
                    <Route path='/medic/customer/announcement' element={<Announcementpage/>}/>
                    <Route path='/medic/customer/FAQ' element={<FAQpage/>}/>
                    <Route path='/medic/medicalknowledge/medicalNegligence' element={<MedicalNegligencepage/>}/>
                    <Route path='/medic/medicalknowledge/medicalNegligence/writemedicalNegligence' element={<MedicalNegligenceWritepage/>}/>
                    <Route path='/medic/medicalknowledge/industrialAccidentInfo' element={<IndustrialAccidentInfopage/>}/>
                    <Route path='/medic/admin/knowledge/industrialAccidentInfo/writeindustrialaccident' element={<IndustrialAccidentWritepage/>}/>
                    <Route path='/medic/medicalknowledge/trafficAccidentInfo' element={<TrafficAccidentInfopage/>}/>
                    <Route path='/medic/medicalknowledge/trafficAccidentInfo/writetrafficAccident' element={<TrafficAccidentWritepage/>}/>
                    <Route path='/medic/medicalknowledge/woundInfo' element={<WoundInfopage/>}/>
                    <Route path='/medic/medicalknowledge/woundInfo/writewound' element={<WoundWritepage/>}/>
                    <Route path='/medic/mypage' element={<Mypage/>}/>
                    <Route path='/medic/consultativeMypage' element={<ConsultativeMypage/>}/>
                    <Route path='/medic/customer/announcement/announcementdetails' element={<AnnouncementDetail/>}/>
                    <Route path='/medic/customer/announcement/writeannouncement' element={<WriteAnnouncement/>}/> 
                    <Route path="/medic/finduserinfo" element={<FinduserInfopage/>}/>
                    <Route path="/medic/finduserinfo/findpw" element={<Updatepw/>}/>
                    <Route path="/medic/mypage/ChangeConsultativeInfo" element={<ChangeConsultativeInfo/>}/>
                    <Route path="/medic/mypage/modifymyinfo" element={<ModifyMyInfopage/>}/>
                    <Route path="/medic/consultative/assignmentAdviceList" element={<ConsultativeAdviceAssignment/>}/>
                    <Route path="/medic/consultative/assignmentAnalyzeList" element={<ConsultativeAnalyzeAssignment/>}/>
                    <Route path="/medic/consultative/assignmentTranslateList" element={<ConsultativeTranslateAssignment/>}/>
                    <Route path="/medic/consultative/assignmentAdviceDetail/:index" element={<ConsultativeAdviceAssignmentDetail/>}/>
                    <Route path="/medic/consultative/assignmentAnalyzeDetail/:index" element={<ConsultativeAnalyzeAssignmenDetail/>}/>
                    <Route path="/medic/consultative/assignmentTranslateDetail/:index" element={<ConsultativeTranslateAssignmentDetail/>}/>
                    <Route path="/medic/knowledge/industrialaccidentdetails" element={<IndustrialAccidentDetail/>}/>
                    <Route path="/medic/medicalknowledge/medicalNegligence/medicalNegligencedetails" element={<MedicalNegligenceDetailpage/>}/>
                    <Route path="/medic/knowledge/trafficaccidentdetails" element={<TrafficAccidentDetail/>}/>
                    <Route path="/medic/knowledge/wounddetails" element={<WoundDetail/>}/>
                    <Route path="/medic/mypage/modifymyinfo/modifyMyPw" element={<ModifyMyPwpage/>}/>
                    <Route path="/medic/mypage/ChangeConsultativeInfo/ChangeMyPw" element={<ChangeConsultativePwpage/>}/>
                    <Route path="/medic/adminstrator/docmanagement" element={<DocManagement/>}/>
                    <Route path="/medic/adminstrator/administratormypage" element={<AdministratorMypage/>}/>
                    <Route path="/medic/adminstrator/usermanagement" element={<UserManagement/>}/>
                    <Route path="/medic/adminstrator/docedit/:index" element={<DocEdit/>}/>
                    <Route path="/medic/adminstrator/useredit/:index" element={<UserEdit/>}/>
                    <Route path='/medic/customer/faqdetail' element={<FaqDetailPage/>}/>
                    <Route path='/medic/customer/faqwrite' element={<WriteFaqPage/>}/>
                    <Route path='/medic/adminstrator/docset/:index' element={<AdSetDoc/>}/>
                    <Route path='/medic/adminstrator/adlist' element={<AdAdviceListPage/>}/>
                    <Route path='/medic/adminstrator/anlist' element={<AdAnalyzeListPage/>}/>
                    <Route path='/medic/adminstrator/andocset/:index' element={<AnSetDoc/>}/>
                    <Route path='/medic/adminstrator/trdocset/:index' element={<TrSetDoc/>}/>
                    <Route path='/medic/adminstrator/trlist' element={<AdTranslateListPage/>}/>
                    <Route path='/medic/adminstrator/addetail/:index' element={<AdDetailAdvice/>}/>
                    <Route path='/medic/adminstrator/andetail/:index' element={<AdDetailAnalyze/>}/>
                    <Route path='/medic/adminstrator/tndetail/:index' element={<AdDetailTranslate/>}/>
                    <Route path='/medic/customer/announcement/edit/:amId' element ={<AnnouncementEdit/>}/>
                    <Route path='/medic/customre/faq/edit/:faqId' element={<FaqEdit/>}/>
                    <Route path="/medic/adminstrator/error" element={<ErrorPage/>}/>



                </Routes>

            </div> 
            </div>   
        </BrowserRouter>
    )
}