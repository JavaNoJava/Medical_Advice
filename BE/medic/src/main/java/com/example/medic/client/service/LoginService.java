package com.example.medic.client.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.LoginDto;
import com.example.medic.client.exception.NotCorrespondingIdException;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.domain.Manager;
import com.example.medic.manager.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private final ClientRepository clientRepository;
    private final ConsultativeRepository consultativeRepository;
    private final ManagerRepository managerRepository;
    private final Logger logger = LoggerFactory.getLogger(LoginService.class);

    public Object login(LoginDto loginDto) {
        String role = loginDto.getRole();
        if (role.equals("user")) {
            return userLogin(loginDto);
        } else if (role.equals("consultative")) {
            return consultativeLogin(loginDto);
        } else if (role.equals("manager")) {
            return managerLogin(loginDto);
        } else {
            throw new NoSuchElementException("일치하는 역할이 아닙니다.");
        }
    }

    public Client userLogin(LoginDto loginDto) {
        Optional<Client> optionalClient = clientRepository.findByUId(loginDto.getUId());

        Client client = optionalClient.orElseThrow(() -> new NotCorrespondingIdException("ID가 일치하지 않습니다."));

        String clientPassword = client.getUPw();
        if (clientPassword == null || !clientPassword.equals(loginDto.getUPw())) {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }

        return client;
    }

    public Consultative consultativeLogin(LoginDto loginDto) {
        Optional<Consultative> optionalConsultative = consultativeRepository.findByCId(loginDto.getUId());

        Consultative consultative = optionalConsultative.orElseThrow(() -> new NotCorrespondingIdException("ID가 일치하지 않습니다."));

        String consultativePassword = consultative.getCPw();
        if (consultativePassword == null || !consultativePassword.equals(loginDto.getUPw())) {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }

        return consultative;
    }

    public Manager managerLogin(LoginDto loginDto) {
        Optional<Manager> optionalManager = managerRepository.findByMId(loginDto.getUId());

        Manager manager = optionalManager.orElseThrow(() -> new NotCorrespondingIdException("ID가 일치하지 않습니다."));

        String managerPassword = manager.getMPw();
        if (managerPassword == null || !managerPassword.equals(loginDto.getUPw())) {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }

        return manager;
    }

    public String findId(LoginDto loginDto) {
        Optional<Client> optionalClient =
                clientRepository.findByUNameAndUEmail(loginDto.getUName(), loginDto.getUEmail());
        return optionalClient.map(Client::getUId).orElse(null);
    }

    public Optional<Client> findClient(LoginDto loginDto) {
        return clientRepository.findByUIdAndUEmail((loginDto.getUId()), loginDto.getUEmail());
    }

    @Transactional
    public boolean updatePassword(LoginDto loginDto) {
        if (loginDto.getNewUpw() == null) {
            throw new IllegalArgumentException("새로운 비밀번호는 null일 수 없습니다.");
        }

        try {
            Optional<Client> optionalClient = findClient(loginDto);

            if (optionalClient.isPresent()) {
                Client client = optionalClient.get();
                client.updatePassword(loginDto.getNewUpw());
                clientRepository.save(client);

                return true;
            }
        } catch (Exception e) {
            logger.error("비밀번호 업데이트 중 오류 발생", e);
        }
        return false;
    }
}