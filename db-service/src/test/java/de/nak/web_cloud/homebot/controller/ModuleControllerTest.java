package de.nak.web_cloud.homebot.controller;

import de.nak.web_cloud.homebot.controller.ModuleController;
import de.nak.web_cloud.homebot.entity.module.Module;
import de.nak.web_cloud.homebot.entity.module.ModuleRepository;
import de.nak.web_cloud.homebot.entity.user.User;
import de.nak.web_cloud.homebot.entity.usermodule.UserModule;
import org.junit.jupiter.api.BeforeAll;
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
@WebMvcTest(ModuleController.class)
class ModuleControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    ModuleRepository moduleRepository;

    @Value("${ServiceUser}")
    private String serviceUser;
    @Value("${ServicePassword}")
    private String servicePassword;

    String authorization;

    @BeforeEach
    void befor(){
        String originalInput = serviceUser+":"+servicePassword;
        authorization =  "Basic " + Base64.getEncoder().encodeToString(originalInput.getBytes());
    }

    @Test
    void createErfolgreich () throws Exception {
        int moduleid = 12345;
        Module module = new Module();
        module.setBasisAction("/test");
        module.setFunctions("eins,zwei,drei");
        module.setId(12345);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/module?name=test&serviceURL=/test&functions=eins,zwei,drei&baseAction=list")
                .header("Authorization",authorization);
        when(moduleRepository.save(any(Module.class))).thenReturn(module);
        MvcResult result = mvc.perform(requestBuilder).andReturn();
        assertEquals("[http://localhost/module/"+moduleid+"]",result.getResponse().getHeaders("Location").toString());
        assertEquals(201,result.getResponse().getStatus());
    }

    @Test
    void createWithIllegalArguments () throws Exception {
        int moduleid = 12345;
        Module module = new Module();
        module.setBasisAction("/test");
        module.setFunctions("eins,zwei,drei");
        module.setId(12345);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/module?name=test&serviceURL=/test&baseAction=list")
                .header("Authorization", authorization);
        when(moduleRepository.save(any(Module.class))).thenReturn(module);
        MvcResult result = mvc.perform(requestBuilder).andReturn();
        assertEquals(400, result.getResponse().getStatus());

    }

   @Test
    void getAllModules () throws Exception {
       int moduleid = 12345;
       Module module = new Module();
       List<Module> moduleList = new LinkedList<Module>();
       module.setBasisAction("/test");
       module.setFunctions("eins,zwei,drei");
       module.setId(12345);
       moduleList.add(module);
       RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/module")
               .header("Authorization",authorization);
       when(moduleRepository.findAll()).thenReturn(moduleList);
       MvcResult result = mvc.perform(requestBuilder).andReturn();
       assertTrue(result.getResponse().getContentAsString().contains(String.valueOf(module.getId())));
       assertEquals(200,result.getResponse().getStatus());
    }
}