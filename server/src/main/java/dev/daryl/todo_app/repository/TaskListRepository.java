package dev.daryl.todo_app.repository;


import java.util.List;

import dev.daryl.todo_app.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;


import dev.daryl.todo_app.model.TaskList;
import dev.daryl.todo_app.model.Type;


public interface TaskListRepository extends JpaRepository<TaskList, Long>{
    List<TaskList> findById(Integer id);
    List<TaskList> findByType(Type type);
    List<TaskList> findByTypeAndUser(Type type, ApplicationUser user);
}