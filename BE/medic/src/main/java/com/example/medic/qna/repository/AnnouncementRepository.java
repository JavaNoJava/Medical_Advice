package com.example.medic.qna.repository;

import com.example.medic.qna.domain.Announcement;
import com.example.medic.qna.domain.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    @Query(value = "SELECT * FROM announcement WHERE am_id < :amId ORDER BY am_id DESC LIMIT 1",
            nativeQuery = true)
    Announcement findPrevAnnouncementInfo(@Param("amId") Long amId);

    @Query(value = "SELECT * FROM announcement WHERE am_id > :amId ORDER BY am_id ASC LIMIT 1", nativeQuery = true)
    Announcement findNextAnnouncementInfo(@Param("amId") Long amId);

    List<Announcement> findByAmNameContaining(String keyword);

}
