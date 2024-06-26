package dev.daryl.todo_app.DTO;

import dev.daryl.todo_app.model.Type;

import java.time.LocalDateTime;

public record TaskListDTO(
        String title,
        String description,
        Type type,
        LocalDateTime dateCreated,
        Long uid
) {
}
