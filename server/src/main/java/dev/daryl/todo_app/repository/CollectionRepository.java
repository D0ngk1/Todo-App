package dev.daryl.todo_app.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import dev.daryl.todo_app.model.TaskList;
import dev.daryl.todo_app.model.Type;
import jakarta.annotation.PostConstruct;

@Repository
public class CollectionRepository {
    private List <TaskList> contentList = new ArrayList<>();

    public CollectionRepository (){
    }
    public List<TaskList> findAll(){
        return contentList;
    }
    public Optional<TaskList> findById(Integer id) {
        return contentList.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    public void  save(TaskList content){
        contentList.add(content);
    }
    public void update (TaskList content, Integer id){
        contentList.set(id-1, content);
    }
    
    //Initialization of first Object
    @PostConstruct
    private void init() {
        TaskList content = new TaskList(
            "My title",
            "My Description...",
            Type.LIST,
            LocalDateTime.now()
        );
        contentList.add(content);
    }
    public void delete(Integer id) {
        contentList.removeIf(c -> c.getId().equals(id));
    }
}
