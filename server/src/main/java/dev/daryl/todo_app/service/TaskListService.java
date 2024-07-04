package dev.daryl.todo_app.service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import dev.daryl.todo_app.DTO.TaskListDTO;
import dev.daryl.todo_app.DTO.TaskListDTOMapper;
import dev.daryl.todo_app.model.*;
import dev.daryl.todo_app.repository.RoleRepository;
import dev.daryl.todo_app.repository.UserRepository;
import org.springframework.stereotype.Service;

import dev.daryl.todo_app.repository.TaskListRepository;
import jakarta.annotation.PostConstruct;

@Service
public class TaskListService {

    private final TaskListRepository taskListRepository;
    private final AuthenticationService authenticationService;
    private final TaskListDTOMapper taskListDTOMapper;

    public TaskListService(TaskListRepository taskListRepository,
                           UserRepository userRepo, AuthenticationService authenticationService, RoleRepository roleRepository, TaskListDTOMapper taskListDTOMapper){
        this.taskListRepository = taskListRepository;
        this.authenticationService = authenticationService;
        this.taskListDTOMapper = taskListDTOMapper;
    }

    //get all tasklists
    public List<TaskListDTO> getAllTaskLists(){
        return taskListRepository.findAll()
                .stream()
                .map(taskListDTOMapper).collect(Collectors.toList());
    }
    public List<TaskListDTO> getAllTaskListsByUser(ApplicationUser user){
        return taskListRepository.findByUser(user)
                .stream()
                .map(taskListDTOMapper).collect(Collectors.toList());
    }
    public List<TaskListDTO> getAllTaskListsByUserAndImportance(ApplicationUser user){
        return taskListRepository.findByUserAndIsImportant(user, true)
                .stream()
                .map(taskListDTOMapper).collect(Collectors.toList());
    }

/*
    @PostConstruct
    public void init(){

         authenticationService.registerUser(
                "daryl",
                "bhadz_01"
        );
        ApplicationUser user2 = authenticationService.registerUser(
                "asdf",
                "wew123123"
        );
        ApplicationUser user1 =  authenticationService.registerUser(
                "asdf23423",
                "wew123123"
        );
        authenticationService.registerUser(
                "dgdfgdfgdfg",
                "wew123123"
        );
        TaskList taskList = new TaskList(
                user1,
                "Initial Task   Title",
                "Initial Description",
                Type.TASK,
                LocalDateTime.now()
        );
        TaskList taskList1 = new TaskList(
                user2,
                "Initial List Title",
                "Initial Description",
                Type.LIST,
                LocalDateTime.now()
        );
        taskListRepository.save(taskList);
        taskListRepository.save(taskList1);
    }*/


}
