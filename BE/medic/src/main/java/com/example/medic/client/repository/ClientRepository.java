package com.example.medic.client.repository;

import com.example.medic.client.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client,String> {
    @Query("SELECT c FROM Client c WHERE c.uId =:uId")
    Optional<Client> findByUId(String uId);

    @Query("SELECT c FROM Client c WHERE c.uName = :uName AND c.uEmail = :uEmail")
    Optional<Client> findByUNameAndUEmail(String uName, String uEmail);

    @Query("SELECT c FROM Client c WHERE c.uId = :uId AND c.uEmail = :uEmail")
    Optional<Client> findByUIdAndUEmail(String uId, String uEmail);
}
