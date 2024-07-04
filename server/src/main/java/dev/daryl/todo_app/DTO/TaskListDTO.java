package dev.daryl.todo_app.DTO;

import dev.daryl.todo_app.model.Type;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TaskListDTO(
        Long id,
        String title,
        String description,
        Type type,
        LocalDateTime dateCreated,
        LocalDateTime dueDate,
        Boolean isDone,
        Boolean isImportant,
        Long uid
) {
}
