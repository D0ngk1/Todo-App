package dev.daryl.todo_app.service;

import java.time.LocalDateTime;

import dev.daryl.todo_app.model.Users;
import dev.daryl.todo_app.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import dev.daryl.todo_app.model.TaskList;
import dev.daryl.todo_app.model.Type;
import dev.daryl.todo_app.repository.TaskListRepository;
import jakarta.annotation.PostConstruct;

@Service
public class taskListService {
    private final TaskListRepository taskListRepository;
    private final UserRepository userRepo;
    //Dependency Injection
    public taskListService(TaskListRepository taskListRepository, UserRepository userRepo){
        this.taskListRepository= taskListRepository;
        this.userRepo = userRepo;
    }

    @PostConstruct
    public void init(){
        TaskList taskList = new TaskList(
            "Initial Task   Title",
            "Initial Description",
            Type.TASK,
            LocalDateTime.now()
        );
        TaskList taskList1 = new TaskList(
            "Initial List Title",
            "Initial Description",
            Type.LIST,
            LocalDateTime.now()
        );
        Users user1 = new Users(
                "userName1",
                0,
                false,
                "wew123123"
        );
        Users user2 = new Users(
                "userName2",
                0,
                false,
                "wew123123"
        );

        userRepo.save(user2);
        userRepo.save(user1);
        taskListRepository.save(taskList);
        taskListRepository.save(taskList1);
    }
}
