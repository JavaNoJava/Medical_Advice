package com.example.medic.advice.dto;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@Getter
@Builder
public class AdviceAssignmentDto {

    private Long admId;

    private LocalDate admDate;

    private AdviceRequestList adviceRequestList;

    private Consultative consultative;
}
