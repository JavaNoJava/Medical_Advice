package com.example.medic.consultative.repository;

import com.example.medic.consultative.domain.Consultative;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConsultativeRepository extends JpaRepository<Consultative,String> {

    @Query("SELECT c FROM Consultative c WHERE c.cId =:cId")
    Optional<Consultative> findByCId(String cId);
}
