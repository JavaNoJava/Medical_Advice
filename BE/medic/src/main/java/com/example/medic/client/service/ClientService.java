package com.example.medic.client.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoAllDto;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.dto.ModifyUserDto;
import com.example.medic.client.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final Logger logger = LoggerFactory.getLogger(ClientService.class);

    public ClientInfoDto findClientInfo(ClientInfoDto clientInfoDto) {

        try{
            String uid = clientInfoDto.getUId();
            Client client = findClient(uid);
            ClientInfoDto responseClientInfo = ClientInfoDto.builder()
                    .uId(client.getUId())
                    .name(client.getUName())
                    .userTel(client.getUserTel())
                    .userPhone(client.getUserPhone())
                    .userAddress(client.getUserAddress())
                    .build();
            return responseClientInfo;
        }catch (NoSuchElementException n){
            logger.info("해당 회원을 찾을 수 없습니다.");
            return clientInfoDto;
        }
    }
    public ClientInfoAllDto findClientInfoAll(ClientInfoAllDto clientInfoAllDto) {
        try{
            String uid = clientInfoAllDto.getUId();
            Client client = findClient(uid);
            ClientInfoAllDto responseClientInfoAll = ClientInfoAllDto.builder()
                    .uId(client.getUId())
                    .uPw(client.getUPw())
                    .uPart(client.getUPart())
                    .uEmail(client.getUEmail())
                    .name(client.getUName())
                    .userTel(client.getUserTel())
                    .userPhone(client.getUserPhone())
                    .userAddress(client.getUserAddress())
                    .company(client.getCompany())
                    .ceo(client.getCeo())
                    .cpTel(client.getCpTel())
                    .cpFx(client.getCpFx())
                    .cpNum(client.getCpNum())
                    .cpAddress(client.getCpAddress())
                    .build();
            return responseClientInfoAll;
        }catch (NoSuchElementException n){
            logger.info("해당 회원을 찾을 수 없습니다.");
            return clientInfoAllDto;
        }
    }

    public void deleteUser(ClientInfoDto clientInfoDto){
        String uid = clientInfoDto.getUId();
        clientRepository.deleteById(uid);
    }

    public Client findClient(String uid){
        Optional<Client> client = clientRepository.findByUId(uid);
        return client.orElseThrow(() -> new NoSuchElementException());
    }

}
