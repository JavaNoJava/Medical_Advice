package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.domain.DiagnosisRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiagnosisRecordRepository extends JpaRepository<DiagnosisRecord,Long> {
    DiagnosisRecord findByAdviceRequestList(AdviceRequestList adviceRequestList);
}
