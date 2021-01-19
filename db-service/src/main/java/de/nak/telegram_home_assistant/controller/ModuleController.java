package de.nak.telegram_home_assistant.controller;

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
