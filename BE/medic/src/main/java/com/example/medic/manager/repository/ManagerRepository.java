package com.example.medic.manager.repository;

import com.example.medic.consultative.domain.Consultative;
import com.example.medic.manager.domain.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, String> {

    @Query("SELECT m FROM Manager m WHERE m.mId =:mId")
    Optional<Manager> findByMId(String mId);
}
