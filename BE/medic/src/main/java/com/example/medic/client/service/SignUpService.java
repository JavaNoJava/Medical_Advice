package com.example.medic.client.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.SignUpDto;
import com.example.medic.client.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignUpService {
    private final ClientRepository clientRepository;

    public boolean idConfirm(String uid){
        return clientRepository.existsById(uid);  //존재하면 true 반환

    }

    public Client insertUser(SignUpDto signUpDto){
        if(signUpDto.getUId() == null){
            throw new IllegalArgumentException("유저를 찾을 수 없습니다.");
        }
        Client client =  Client.builder()
                .uId(signUpDto.getUId())
                .uPw(signUpDto.getUPw())
                .uName(signUpDto.getUName())
                .uRole(signUpDto.getURole())
                .uEmail(signUpDto.getUEmail())
                .userTel(signUpDto.getUserTel())
                .userPhone(signUpDto.getUserPhone())
                .userAddress(signUpDto.getUserAddress())
                .company(signUpDto.getCompany())
                .ceo(signUpDto.getCeo())
                .cpTel(signUpDto.getCpTel())
                .cpFx(signUpDto.getCpFx())
                .cpNum(signUpDto.getCpNum())
                .cpAddress(signUpDto.getCpAddress())
                .uPart(signUpDto.getUPart())
                .build();

        return clientRepository.save(client);
    }
}
