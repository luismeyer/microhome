package de.nak.telegram_home_assistant.controller;

import de.nak.telegram_home_assistant.controller.response.ModuleResponse;
import de.nak.telegram_home_assistant.controller.response.ServiceRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller    // This means that this class is a Controller
@RequestMapping(path = "/module")
public class ModuleController {

    /*private static final Logger LOG = LoggerFactory.getLogger(ModuleController.class);

    @Autowired
    private ModuleRepository moduleRepository;

    @ResponseStatus(code = HttpStatus.CREATED) //positive response code
    @PostMapping(path = "") // Map ONLY POST Requests
    public @ResponseBody
    ResponseEntity<?> create(
            UriComponentsBuilder b, @RequestParam String name, @RequestParam String serviceURL, @RequestParam String functions, @RequestParam String baseAction) {
        Module module = null;
        module = new Module();
        module.setName(name);
        module.setServiceURL(serviceURL);
        module.setFunctions(functions);
        module.setBasisAction(baseAction);
        Module result = moduleRepository.save(module);
        UriComponents uriComponents = b.path("/module/{moduleid}").buildAndExpand(result.getId());
        return ResponseEntity.created(uriComponents.toUri()).build();
    }

    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping(path = "")
    public @ResponseBody
    List<ModuleResponse> getAllModules() {
        List<Module> moduleList = new ArrayList<>();
        moduleRepository.findAll().forEach(moduleList::add);

        return moduleList.stream()
                .map(module -> new ModuleResponse().setName(module.getName()).setId(module.getId()).setServiceRequest(new ServiceRequest().setServiceUrl(module.getServiceURL())))
                .collect(Collectors.toList());
    }*/
}
