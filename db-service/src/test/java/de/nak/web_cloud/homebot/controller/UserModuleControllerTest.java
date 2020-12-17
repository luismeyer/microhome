package de.nak.web_cloud.homebot.controller;

import de.nak.web_cloud.homebot.entity.module.Module;
import de.nak.web_cloud.homebot.entity.module.ModuleRepository;
import de.nak.web_cloud.homebot.entity.user.User;
import de.nak.web_cloud.homebot.entity.user.UserRepository;
import de.nak.web_cloud.homebot.entity.usermodule.UserModule;
import de.nak.web_cloud.homebot.entity.usermodule.UserModuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserModuleController.class)
class UserModuleControllerTest {


    @Autowired
    private MockMvc mvc;

    @MockBean
    UserRepository userRepository;

    @MockBean
    UserModuleRepository userModuleRepository;

    @MockBean
    ModuleRepository moduleRepository;

    UserModule userModule;
    User user;
    Optional<User> optionalUser;
    Module module;
    int userid;
    int moduleid;
    String token;
    List<UserModule> userModuleList;

    @Value("${ServiceUser}")
    private String serviceUser;
    @Value("${ServicePassword}")
    private String servicePassword;

    String authorization;

    @BeforeEach
    void befor(){
        module = new Module();
        moduleid = 12345;

        token = "eplmfeposfmordjnfvojnseoifno";
        module.setId(moduleid);
        module.setName("name");
        module.setFunctions("eins,zwei,drei");

        user = new User();
        userid = 1;
        optionalUser = Optional.of(user);

        userModule = new UserModule();
        userModule.setToken(token);
        userModule.setModul(module);
        userModule.setUser(user);
        userModuleList = new ArrayList<UserModule>();
        userModuleList.add(userModule);
        String originalInput = serviceUser+":"+servicePassword;
        authorization =  "Basic " +Base64.getEncoder().encodeToString(originalInput.getBytes());
    }

    @Test
    void getAllUserModuls() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(optionalUser);
        when(userModuleRepository.findAllByUser(any())).thenReturn(userModuleList);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/user/"+userid+"/module")
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains(String.valueOf(moduleid)));
        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void create() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(optionalUser);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/user/"+userid)
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void createNew() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(Optional.empty());
        when(userRepository.save(any())).thenReturn(user);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/user/"+userid)
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertEquals(201,result.getResponse().getStatus());
    }

    @Test
    void getModuleDevices() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(Optional.of(user));
        when(moduleRepository.findById(any())).thenReturn(Optional.of(module));
        when(userModuleRepository.findByUserAndModule(any(),any())).thenReturn(Optional.of(userModule));

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/user/"+userid+"/module/"+moduleid+"")
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void getModuleDevicesNot() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(Optional.empty());
        when(moduleRepository.findById(any())).thenReturn(Optional.of(module));
        when(userModuleRepository.findByUserAndModule(any(),any())).thenReturn(Optional.of(userModule));

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/user/"+userid+"/module/"+moduleid+"")
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertEquals(404,result.getResponse().getStatus());
    }

    @Test
    void getModuleDevicesFunctions() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(Optional.of(user));
        when(moduleRepository.findById(any())).thenReturn(Optional.of(module));
        when(userModuleRepository.findByUserAndModule(any(),any())).thenReturn(Optional.of(userModule));

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/user/"+userid+"/module/"+moduleid+"/devices/12/functions")
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("zwei"));
        assertEquals(200,result.getResponse().getStatus());
    }



    @Test
    void getModuleDiveceFunction() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(Optional.of(user));
        when(moduleRepository.findById(any())).thenReturn(Optional.of(module));
        when(userModuleRepository.findByUserAndModule(any(),any())).thenReturn(Optional.of(userModule));

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/user/"+userid+"/module/"+moduleid+"/devices/12/functions/list")
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("list"));
        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void addModule() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(Optional.of(user));
        when(moduleRepository.findById(any())).thenReturn(Optional.of(module));
        when(userModuleRepository.save(any())).thenReturn(userModule);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/user/"+userid+"/module/"+moduleid)
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("auth"));
        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void testSetToken() throws Exception {
        when(userModuleRepository.findAllByToken(any())).thenReturn(userModuleList);
        when(userModuleRepository.save(any())).thenReturn(userModule);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/user/token/"+token+"?token="+token)
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void testSetTokenNot() throws Exception {
        userModuleList.clear();
        when(userModuleRepository.findAllByToken(any())).thenReturn(userModuleList);
        when(userModuleRepository.save(any())).thenReturn(userModule);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/user/token/"+token+"?token="+token)
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertEquals(404,result.getResponse().getStatus());
    }

    @Test
    void deleteModul() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(Optional.of(user));
        when(moduleRepository.findById(any())).thenReturn(Optional.of(module));
        when(userModuleRepository.save(any())).thenReturn(userModule);
        when(userModuleRepository.deleteAllByUserAndModule(any(),any())).thenReturn(1);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/user/"+userid+"/module/"+moduleid)
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void deleteUser() throws Exception {
        when(userRepository.findByTelegramUserid(any())).thenReturn(Optional.of(user));
        when(userRepository.deleteByTelegramUserid(any())).thenReturn(true);
        when(userModuleRepository.deleteAllByUser(any())).thenReturn(1);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/user/"+userid)
                .header("Authorization",authorization);
        MvcResult result = mvc.perform(requestBuilder).andReturn();

        assertEquals(200,result.getResponse().getStatus());
    }
}