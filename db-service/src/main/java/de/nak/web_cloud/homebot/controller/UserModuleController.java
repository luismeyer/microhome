package de.nak.web_cloud.homebot.controller;

import de.nak.web_cloud.homebot.controller.response.*;
import de.nak.web_cloud.homebot.entity.module.Module;
import de.nak.web_cloud.homebot.entity.module.ModuleRepository;
import de.nak.web_cloud.homebot.entity.user.*;
import de.nak.web_cloud.homebot.entity.usermodule.UserModule;
import de.nak.web_cloud.homebot.entity.usermodule.UserModuleRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Controller    // This means that this class is a Controller
@RequestMapping(path = "/user")
public class UserModuleController {

    private static final Logger LOG = LoggerFactory.getLogger(UserModuleController.class);

    @Autowired
    private UserRepository repository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private UserModuleRepository userModuleRepository;


    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping(path = "")
    public @ResponseBody
    List<UserModule> getAllUserModuls() {
        List<UserModule> modulList = new ArrayList<>();
        userModuleRepository.findAll().forEach(modulList::add);
        return modulList;
    }

    /**
     * Creates new resource for user
     * Maps Post Request with following Parameters
     *
     * @param userid User identifier
     * @param b      UrlBuilder
     * @return HttpResponse
     */

    @ResponseStatus(code = HttpStatus.CREATED) //positive response code
    @PostMapping(path = "/{userid}") // Map ONLY POST Requests
    public @ResponseBody
    ResponseEntity<?> create(
            @PathVariable final Long userid, UriComponentsBuilder b) {
        LOG.debug("Create new entity for userid userid={}", userid);
        if (repository.findByTelegramUserid(userid).isPresent()) {
            throw new ResponseStatusException(HttpStatus.OK);
        }
        repository.save(new User(userid));
        UriComponents uriComponents = b.path("/user/{id}").buildAndExpand(userid);
        return ResponseEntity.created(uriComponents.toUri()).build();
    }

    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping(path = "/{userid}/module")
    public @ResponseBody
    List<ModuleResponse> getAllModuls(@PathVariable final Long userid) {
        Optional<User> oUser = repository.findByTelegramUserid(userid);
        if (oUser.isPresent()) {

            return userModuleRepository.findAllByUser(oUser.get()).stream().map(UserModule::getModul)
                    .map(modul -> new ModuleResponse()
                            .setName(modul.getName())
                            .setId(modul.getId()))
                    .collect(Collectors.toList());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping(path = "/{userid}/module/{moduleid}")
    public @ResponseBody
    ModuleResponse getModuleDevices(@PathVariable final Long userid, @PathVariable final Integer moduleid) {
        Optional<User> oUser = repository.findByTelegramUserid(userid);
        Optional<Module> oModul = moduleRepository.findById(moduleid);
        if (oUser.isPresent() && oModul.isPresent()) {
            Optional<UserModule> oUserModul = userModuleRepository.findByUserAndModule(oUser.get(), oModul.get());
            if (oUserModul.isPresent()) {
                Module module = oUserModul.get().getModul();
                return new ModuleResponse().setId(moduleid).setName(module.getName())
                        .setServiceRequest(new ServiceRequest()
                                .setServiceUrl(module.getServiceURL())
                                .setBody(new ServiceRequestBody()
                                        .setAction(module.getBasisAction())
                                        .setToken(oUserModul.get().getToken())));
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping(path = "/{userid}/module/{moduleid}/devices/{deviceId}/functions")
    public @ResponseBody
    FunctionsResponse getModuleDevicesFunctions(@PathVariable final Long userid, @PathVariable final Integer moduleid, @PathVariable final String deviceId) {
        Optional<User> oUser = repository.findByTelegramUserid(userid);
        Optional<Module> oModul = moduleRepository.findById(moduleid);
        if (oUser.isPresent() && oModul.isPresent()) {
            Optional<UserModule> oUserModul = userModuleRepository.findByUserAndModule(oUser.get(), oModul.get());
            if (oUserModul.isPresent()) {
                Module module = oUserModul.get().getModul();
                List<String> functions = Arrays.asList(module.getFunctions().split(","));
                return new FunctionsResponse()
                        .setFunctions(functions)
                        .setServiceRequest(new ServiceRequest()
                                .setServiceUrl(module.getServiceURL())
                                .setBody(new ServiceRequestBody()
                                        .setToken(oUserModul.get().getToken())
                                        .setAction("get")
                                        .setDeviceId(deviceId)));
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping(path = "/{userid}/module/{moduleid}/devices/{deviceId}/functions/{function}")
    public @ResponseBody
    ServiceRequest getModuleDeviceFunction(@PathVariable final Long userid, @PathVariable final Integer moduleid, @PathVariable final String function, @PathVariable final String deviceId) {
        Optional<User> oUser = repository.findByTelegramUserid(userid);
        Optional<Module> oModul = moduleRepository.findById(moduleid);
        if (oUser.isPresent() && oModul.isPresent()) {
            Optional<UserModule> oUserModul = userModuleRepository.findByUserAndModule(oUser.get(), oModul.get());
            if (oUserModul.isPresent()) {
                Module module = oUserModul.get().getModul();
                return new ServiceRequest()
                        .setServiceUrl(module.getServiceURL())
                        .setBody(new ServiceRequestBody()
                                .setToken(oUserModul.get().getToken())
                                .setAction(function)
                                .setDeviceId(deviceId));
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(code = HttpStatus.OK)
    @PutMapping(path = "/{userid}/module/{moduleid}")
    @Transactional
    public @ResponseBody
    ServiceRequest addModul(
            @PathVariable final Long userid,
            @PathVariable final Integer moduleid) {

        Optional<User> oUser = repository.findByTelegramUserid(userid);
        Optional<Module> oModul = moduleRepository.findById(moduleid);

        if (oUser.isPresent() && oModul.isPresent()) {
            Module module = oModul.get();

            UserModule userModule = new UserModule();
            userModule.setModul(oModul.get());
            userModule.setUser(oUser.get());
            String editToken = new RandomString().nextString();
            userModule.setToken(editToken);
            userModuleRepository.save(userModule);
            ServiceRequest serviceRequest = new ServiceRequest().setServiceUrl(module.getServiceURL()).setBody(new ServiceRequestBody().setAction("auth").setData(editToken));
            return serviceRequest;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(code = HttpStatus.OK)
    @PostMapping(path = "/token/{editToken}")
    @Transactional
    public @ResponseBody
    void setToken(
            @PathVariable final String editToken,
            @RequestParam final String token) {
        Optional<UserModule> oUserModul = userModuleRepository.findAllByToken(editToken).stream().findFirst();
        oUserModul.ifPresent(userModule -> {
            userModule.setToken(token);
            userModuleRepository.save(userModule);
        });
        if (!oUserModul.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @ResponseStatus(code = HttpStatus.OK)
    @PostMapping(path = "/{userid}/module/{modulId}/token")
    @Transactional
    public @ResponseBody
    void setToken(
            @PathVariable final Long userid,
            @PathVariable final Integer modulId,
            @RequestParam final String token) {

        Optional<User> oUser = repository.findByTelegramUserid(userid);
        Optional<Module> oModul = moduleRepository.findById(modulId);

        if (oUser.isPresent() && oModul.isPresent()) {
            userModuleRepository.findByUserAndModule(oUser.get(), oModul.get()).ifPresent(userModule -> userModule.setToken(token));
            return;
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(code = HttpStatus.OK)
    @DeleteMapping(path = "/{userid}/module/{modulId}")
    @Transactional
    public @ResponseBody
    void deleteModul(
            @PathVariable final Long userid,
            @PathVariable final Integer modulId) {
        Optional<User> oUser = repository.findByTelegramUserid(userid);
        Optional<Module> optionalModul = moduleRepository.findById(modulId);
        if (oUser.isPresent() && optionalModul.isPresent()) {
            userModuleRepository.deleteAllByUserAndModule(oUser.get(), optionalModul.get());
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(path = "/{userid}")
    @Transactional
    public @ResponseBody
    void deleteUser(
            @PathVariable final Long userid) {
        Optional<User> oUser = repository.findByTelegramUserid(userid);
        if (oUser.isPresent()) {
            userModuleRepository.deleteAllByUser(oUser.get());
            repository.deleteByTelegramUserid(userid);
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(path = "/all")
    @Transactional
    public @ResponseBody
    void deleteModul() {
        userModuleRepository.deleteAll();
        repository.deleteAll();
        moduleRepository.deleteAll();
    }

}
