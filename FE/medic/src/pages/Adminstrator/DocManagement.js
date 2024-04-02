import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ad from '../../css/AdAdviceListPage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default function DocManagement() {
  const navigate = useNavigate();
  const [selectedStatu, setSelectedStatu] = useState('의사관리');
  const [doctorList, setDoctorList] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/manageConsultative/list');
        console.log(response);
        setDoctorList(response.data);
      } catch (error) {
        console.error('전문의 정보 가져오기 오류', error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = (newStatus) => {
    setSelectedStatu(newStatus);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const handleEditDoc = (docId) => {
    navigate(`/medic/adminstrator/docedit/${docId}`, { state: { docedit: docId, doclist: doctorList } });
  }

  const handleDeleteDoc = async (docId) => {
    try {
      const confirmed = window.confirm('의사를 삭제하시겠습니까?');
      if (confirmed) {
        const response = await axios.post(`/admin/manageConsultative/delete/${docId}`, { cId: docId });
        const updatedDoctorList = doctorList.filter(doctor => doctor.cid !== docId);
        setDoctorList(updatedDoctorList);
        alert('의사가 삭제되었습니다.');
      } else {
        alert('의사 삭제를 취소했습니다.');
      }
    } catch (error) {
      console.error('의사 삭제 오류', error);
      alert('의사 삭제 중 오류가 발생했습니다.');
    }
  }
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(doctorList.length, startIndex + itemsPerPage);

  // const renderDoctorList = () => {
  //   const startIndex = (page - 1) * itemsPerPage;
  //   const endIndex = Math.min(doctorList.length, startIndex + itemsPerPage);

  //   return doctorList.slice(startIndex, endIndex).map((doctor, index) => (
  //     <tr key={index}>
  //       <td className={administrator.doc_td} onClick={() => handleEditDoc(doctor.cid)}>{startIndex + index + 1}</td>
  //       <td className={administrator.doc_td}>{doctor.cname}</td>
  //       <td className={administrator.doc_td}>{doctor.crole}</td>
  //       <td className={administrator.doc_td}>{doctor.ctel}</td>
  //       <td className={administrator.doc_td}>{doctor.countByAdviceAssignment}</td>
  //       <td className={administrator.doc_td}>{doctor.countByAnalyzeAssignment}</td>
  //       <td className={administrator.doc_td}>{doctor.countByTranslateAssignment}</td>
  //       <td className={administrator.doc_td} onClick={() => handleDeleteDoc(doctor.cid)}>
  //         <FontAwesomeIcon icon={faTrash} />
  //       </td>
  //     </tr>
  //   ));
  // }

  const pageCount = Math.ceil(doctorList.length / itemsPerPage);
  // const pageButtons = [...Array(pageCount)].map((_, index) => (
  //   <button key={index} className={administrator.doc_paginationButton} onClick={() => handlePageChange(index + 1)} disabled={page === index + 1}>
  //     {index + 1}
  //   </button>
  // ));

  return (
    <div className={ad.ad_contents}>
     <div className={ad.iconbox}>
        <h2 className={ad.title}>
          의사 관리
        </h2>
      </div>

      <div className={ad.write_table}>
        <div className={ad.title_row_box}>
          <div className={ad.title_box_no}>
            NO.
          </div>
          <div className={ad.title_box}  style={{width:'120px'}}>
            이름
          </div>
          <div className={ad.title_box}  style={{width:'130px'}}>
            구분
          </div>
          <div className={ad.title_box} style={{width:'150px'}}>
            전화 번호 
          </div>
          <div className={ad.title_box}>
            자문 건수
          </div>
          <div className={ad.title_box}>
            분석 건수
          </div>
          <div className={ad.title_box} >
            번역 건수 
          </div>
          <div className={ad.title_box}  style={{borderRight:'none'}}>
            삭제 
          </div>
        
        </div>
          {doctorList.slice(startIndex, endIndex).map((doctor,index) => (
            <div className={ad.data_row_box}>
              <div className={ad.input_box_no}onClick={() => handleEditDoc(doctor.cid)}>
              {startIndex + index + 1}
              </div>
              <div className={ad.input_box}  style={{width:'120px'}}>{doctor.cname}</div>
              <div className={ad.input_box}  style={{width:'130px'}}>{doctor.crole} </div>
              <div className={ad.input_box}  style={{width:'150px'}}>{doctor.ctel}</div>
              <div className={ad.input_box}>{doctor.countByAdviceAssignment}</div>
              <div className={ad.input_box}>
              {doctor.countByAnalyzeAssignment}
              </div>
              {/* <div className={ad.input_box} style={{borderRight: 'none'}}>{advice.admProgressStatus === null ? '자문의뢰중' : advice.admProgressStatus}</div> */}
              <div className={ad.input_box}>
              {doctor.countByTranslateAssignment}
              </div>
              <div className={ad.input_box} style={{borderRight:'none'}} onClick={() => handleDeleteDoc(doctor.cid)}> 
              <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
          ))}
      </div>

      <div className={ad.pagination} style={{marginBottom:'100px'}}>
        <button className={ad.paginationButton} onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        <FaChevronLeft />

        </button>
        {[...Array(Math.ceil(doctorList.length / 7))].map((_, index) => (
          <button key={index} className={ad.paginationNumber} onClick={() => handlePageChange(index + 1)} disabled={page === index + 1}>
            {index + 1}
          </button>
        ))}
        <button className={ad.paginationButton} onClick={() => handlePageChange(page + 1)} disabled={page === pageCount}>
        <FaChevronRight />
        </button>
      </div>
    </div>
  );
}