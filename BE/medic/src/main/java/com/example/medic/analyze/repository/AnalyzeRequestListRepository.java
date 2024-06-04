package com.example.medic.analyze.repository;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.client.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnalyzeRequestListRepository extends JpaRepository<AnalyzeRequestList,Long> {

    @Query("SELECT arl FROM AnalyzeRequestList arl WHERE arl.client.uId = :uId")
    List<AnalyzeRequestList> findByClient_UId(String uId);

    int countAllByClient(Client client);

    AnalyzeRequestList findByAnPtName(String anPtName);

    Client findClientByAnId(Long anId);
}
