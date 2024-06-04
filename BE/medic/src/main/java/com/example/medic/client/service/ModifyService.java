package com.example.medic.client.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.dto.LoginDto;
import com.example.medic.client.dto.ModifyUserDto;
import com.example.medic.client.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModifyService {
    private final ClientRepository clientRepository;
    private final ClientService clientService;
    private final Logger logger = LoggerFactory.getLogger(ModifyService.class);
    public ModifyUserDto modifyUserInfo(ClientInfoDto clientInfoDto, ModifyUserDto modifyUserDto) {
        String uid = clientInfoDto.getUId();
        Client client = clientService.findClient(uid);
        if(client == null){
            throw new IllegalArgumentException("유저를 찾을 수 없습니다.");
        }
        Client updateClient =  client.builder()
                .uId(client.getUId())
                .uName(client.getUName())
                .uPw(client.getUPw())
                .uPart(client.getUPart())
                .uRole(client.getURole())
                .uEmail(modifyUserDto.getUEmail())
                .userTel(modifyUserDto.getUserTel())
                .userPhone(modifyUserDto.getUserPhone())
                .userAddress(modifyUserDto.getUserAddress())
                .company(modifyUserDto.getCompany())
                .ceo(modifyUserDto.getCeo())
                .cpTel(modifyUserDto.getCpTel())
                .cpFx(modifyUserDto.getCpFx())
                .cpNum(modifyUserDto.getCpNum())
                .cpAddress(modifyUserDto.getCpAddress())
                .build();
        Client savedClient = clientRepository.save(updateClient);
        return modifyUserDto.form(savedClient);
    }
    public void modifyUserPw(String uid, String newPw){

        if (newPw == null) {
            throw new IllegalArgumentException("새로운 비밀번호는 null일 수 없습니다.");
        }
        try {
            Client client = clientService.findClient(uid);
            client.updatePassword(newPw);
            clientRepository.save(client);
        } catch (Exception e) {
            logger.error("비밀번호 업데이트 중 오류 발생", e);
        }
    }
}
