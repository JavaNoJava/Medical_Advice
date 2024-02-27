package com.example.medic.advice.domain;


import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class AdviceAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long admId;

    private LocalDate admDate;

    private String admProgressStatus;


    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    @JoinColumn(name = "adId")
    private AdviceRequestList adviceRequestList;

    @ManyToOne
    @JoinColumn(name = "cId")
    @JsonIgnore(value = false)
    private Consultative consultative;

    @Builder


    public AdviceAssignment(LocalDate admDate, Consultative consultative, AdviceRequestList adviceRequestList) {

            this.admDate = admDate;
            this.consultative = consultative;
            this.adviceRequestList = adviceRequestList;

        }


    public void updateAdmDate() {
        this.admDate = LocalDate.now();


    }

    public void updateStatus( String admProgressStatus) {

        this.admProgressStatus = admProgressStatus;

    }
    public void updateDoc( Consultative consultative
                                       ) {
        this.consultative = consultative;

    }
    public void setConsultativeToNull() {
        this.consultative = null;
    }

}
