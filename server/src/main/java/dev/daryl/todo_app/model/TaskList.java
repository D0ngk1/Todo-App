package dev.daryl.todo_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity(name = "TaskLists")
@Table(name ="TaskLists")
public class TaskList {
    @Id
    @SequenceGenerator(
        name="tl_sequence",
        sequenceName = "tl_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "tl_sequence"
    )
    private Long id;
    private String title;
    private String description;
    private Type type;
    private LocalDateTime dateCreated;

    public TaskList() {
        // Default constructor for JPA
    }
    public TaskList(String title, String description, Type type, LocalDateTime dateCreated) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.dateCreated = dateCreated;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }
}