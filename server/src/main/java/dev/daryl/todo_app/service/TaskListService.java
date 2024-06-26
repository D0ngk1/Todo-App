package dev.daryl.todo_app.service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import dev.daryl.todo_app.DTO.TaskListDTO;
import dev.daryl.todo_app.model.*;
import dev.daryl.todo_app.repository.RoleRepository;
import dev.daryl.todo_app.repository.UserRepository;
import org.springframework.stereotype.Service;

import dev.daryl.todo_app.repository.TaskListRepository;
import jakarta.annotation.PostConstruct;

@Service
public class TaskListService {

    private final TaskListRepository taskListRepository;
    private final UserRepository userRepo;
    private final AuthenticationService authenticationService;
    private final RoleRepository roleRepository;


    public TaskListService(TaskListRepository taskListRepository,
                           UserRepository userRepo, AuthenticationService authenticationService, RoleRepository roleRepository){
        this.taskListRepository = taskListRepository;
        this.userRepo = userRepo;
        this.authenticationService = authenticationService;
        this.roleRepository = roleRepository;
    }

    //get all tasklists
    public List<TaskListDTO> getAllTaskLists(){
        return taskListRepository.findAll()
                .stream()
                .map(taskList -> new TaskListDTO(
                        taskList.getTitle(),
                        taskList.getDescription(),
                        taskList.getType(),
                        taskList.getDateCreated(),
                        taskList.getUid()
                )).collect(Collectors.toList());
    }


    @PostConstruct
    public void init(){
        Optional<Role> roleUser = roleRepository.findByAuthority("USER");
        if (!roleUser.isPresent()) roleRepository.save(new Role("USER"));
        ApplicationUser user1 = authenticationService.registerUser(
                "userName1",
                "wew123123"
        );
        ApplicationUser user2 = authenticationService.registerUser(
                "userName",
                "wew123123"
        );

        ApplicationUser savedUser1 = userRepo.save(user1);
        ApplicationUser savedUser2 = userRepo.save(user2);
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
    }


}
