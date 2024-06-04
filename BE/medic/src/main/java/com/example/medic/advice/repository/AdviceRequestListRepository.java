package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.client.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdviceRequestListRepository extends JpaRepository<AdviceRequestList,Long> {
    @Query("SELECT arl FROM AdviceRequestList arl WHERE arl.client.uId = :uId")
    List<AdviceRequestList> findByClient_UId(String uId);

    int countAllByClient(Client client);

    Client findClientByAdId(Long adId);
}
