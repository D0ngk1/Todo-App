package dev.daryl.todo_app.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import dev.daryl.todo_app.model.TaskList;
import dev.daryl.todo_app.model.Type;
import dev.daryl.todo_app.repository.TaskListRepository;
import jakarta.annotation.PostConstruct;

@Service
public class taskListService {
    private final TaskListRepository taskListRepository;

    public taskListService(TaskListRepository taskListRepository){
        this.taskListRepository= taskListRepository;
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
        taskListRepository.save(taskList);
        taskListRepository.save(taskList1);
    }
}
