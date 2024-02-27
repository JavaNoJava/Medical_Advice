package com.example.medic.qna.repository;

import com.example.medic.qna.domain.QnaAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QnaAnswerRepository extends JpaRepository<QnaAnswer, Long> {
    @Query("SELECT q.qaAnswerId FROM QnaAnswer q WHERE q.qna.qaId = :qaId")
    Optional<Long> findAnswerIdByQaId(@Param("qaId") Long qaId);

    @Query("SELECT q FROM QnaAnswer q WHERE q.qna.qaId = :qaId")
    Optional<QnaAnswer> findAnswerByQaId(@Param("qaId") Long qaId);

    @Query("SELECT q.manager.mId FROM QnaAnswer q WHERE q.qna.qaId = :qaId")
    Optional<String> findMIdByQaId(@Param("qaId") Long qaId);
}
