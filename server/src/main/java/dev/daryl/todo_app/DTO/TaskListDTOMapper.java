package dev.daryl.todo_app.DTO;

import dev.daryl.todo_app.model.TaskList;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TaskListDTOMapper  implements Function<TaskList, TaskListDTO> {
    @Override
    public TaskListDTO apply(TaskList taskList) {
        return new TaskListDTO(
                taskList.getTitle(),
                taskList.getDescription(),
                taskList.getType(),
                taskList.getDateCreated(),
                taskList.getUid()
        );
    }
}
