package dev.daryl.todo_app.controller;

import dev.daryl.todo_app.DTO.TaskListDTO;
import dev.daryl.todo_app.model.ApplicationUser;
import dev.daryl.todo_app.service.AuthenticationService;
import dev.daryl.todo_app.service.TaskListService;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import dev.daryl.todo_app.repository.CollectionRepository;
import dev.daryl.todo_app.repository.TaskListRepository;
import dev.daryl.todo_app.model.TaskList;
import dev.daryl.todo_app.model.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.scheduling.config.Task;
//import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@EnableWebSecurity
@RequestMapping("/api/content")
public class TaskListController {
    private final CollectionRepository repository;
    private final TaskListRepository taskListRepository;
    private final TaskListService taskListService;
    private final AuthenticationService authenticationService;

    //Dependecy Injection
    public TaskListController(CollectionRepository repository, TaskListRepository taskListRepository, TaskListService taskListService, AuthenticationService authenticationService){
        this.repository = repository;
        this.taskListRepository = taskListRepository;
        this.taskListService = taskListService;
        this.authenticationService = authenticationService;

    }
    //Return all records without Database
    @GetMapping("")    
    public List<TaskList> findAll(){
        return repository.findAll();
    }
    //*************************** Return all records with Database
    @SuppressWarnings("null")
    @GetMapping("/sql")    
    public ResponseEntity<List<TaskListDTO>> getAllTaskList(){
        try {
            //Returns all records
            List<TaskListDTO> taskLists = new ArrayList<TaskListDTO>(taskListService.getAllTaskLists());
            if (taskLists.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
              }
            //Return HttpStatus OK
            return new ResponseEntity<>(taskLists,HttpStatus.OK);

        } catch (Exception e) {
            // Handles exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // Return records by Types
    @GetMapping("/type/{type}")
    public ResponseEntity<List<TaskList>> findByTypes(@PathVariable Type type) {
       try {
            List<TaskList> taskLists = taskListRepository.findByType(type);
            return new ResponseEntity<>(taskLists,HttpStatus.OK);
        } catch (Exception e) {
            // handle exceptions
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //**************************** Return records by Types and User
    @GetMapping("/type/{type}/{uid}")
    public ResponseEntity<List<TaskList>> findByTypesAndUid(@PathVariable Type type,@PathVariable Integer uid) {
        try {
            Optional<ApplicationUser> userOptional = authenticationService.findbyId(uid);
            if (userOptional.isPresent()) {
                ApplicationUser user = userOptional.get();
                List<TaskList> taskLists = taskListRepository.findByTypeAndUser(type, user);
                return new ResponseEntity<>(taskLists, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
            }
        } catch (Exception e) {
            // handle exceptions
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //**************************** Create a record with the Database using RequestBody
    @PostMapping("/json")
    public ResponseEntity<TaskList> addTaskListWithBody(@RequestBody TaskList content) {
        try {
            //**************************** Fetch the user from the database using the userId
            Integer uid = Math.toIntExact(content.getUid());
            ApplicationUser user = authenticationService.findbyId(uid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Set the fetched user to the task list
            content.setUser(user);
            TaskList _taskList = taskListRepository.save(content);
            return new ResponseEntity<>(content, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //**************************** Find by id without Database
    @GetMapping("/{id}")
    public Optional<TaskList> findById(@PathVariable Integer id){
        return repository.findById(id);
    }

    //*************************** Find records by id with Database
    @GetMapping("/sql/{id}")
    public ResponseEntity<List<TaskList>> getId(@PathVariable Integer id) {
        try {

            List<TaskList> taskList = taskListRepository.findById(id);
            return new ResponseEntity<>(taskList,HttpStatus.OK);
        } catch (Exception e) {
            // handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Create a record without the Database
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@RequestBody TaskList content){
        repository.save(content);
    }
    //********* Create a record with the Database using query parameters
    /*
    @SuppressWarnings("null")
    @PostMapping("/param")
    public ResponseEntity<TaskList> addTaskList(            
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam Type type,
            @RequestParam LocalDateTime dateCreated){
        try {
            TaskList _taskList = taskListRepository.save(new TaskList(title, description, type, dateCreated));
            return new ResponseEntity<>(_taskList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/





    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@RequestBody TaskList content,@PathVariable Integer id) {
        if (repository.findById(id).isPresent())
            repository.update(content, id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Content Not Found");
    }
    //Update a record with the Database using RequestBody
    @PutMapping("sql/{id}")
    public ResponseEntity<TaskList> updateTaskList(@PathVariable Long id, @RequestBody TaskList taskList) {
        //Process PUT request
        Optional<TaskList> taskListData = taskListRepository.findById(id);
        if (taskListData.isPresent()){
            TaskList tList = taskListData.get();
            tList.setTitle(taskList.getTitle());
            tList.setDescription(taskList.getDescription());
            tList.setDateCreated(taskList.getDateCreated());
            return new ResponseEntity<>(taskListRepository.save(tList), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //**************************** Delete TaskList
    @DeleteMapping("/sql/{id}")
    public ResponseEntity<HttpStatus>delete(@PathVariable Long id){
        try {
           taskListRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            // handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
