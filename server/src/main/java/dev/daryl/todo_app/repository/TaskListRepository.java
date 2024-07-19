package dev.daryl.todo_app.repository;


import java.time.LocalDateTime;
import java.util.List;

import dev.daryl.todo_app.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;


import dev.daryl.todo_app.model.TaskList;
import dev.daryl.todo_app.model.Type;


public interface TaskListRepository extends JpaRepository<TaskList, Long>{
    List<TaskList> findById(Integer id);
    List<TaskList> findByType(Type type);
    List<TaskList> findByTypeAndUser(Type type, ApplicationUser user);
    List<TaskList> findByUser(ApplicationUser user);
    List<TaskList> findByUserAndIsImportant( ApplicationUser user,Boolean isImportant);
    List<TaskList> findByUserAndDueDateBetween (ApplicationUser user,LocalDateTime from, LocalDateTime to);
    List<TaskList> findByUserAndDueDateNotNull(ApplicationUser user);
    List<TaskList> findByUserAndTitleContaining(ApplicationUser user, String title);
}