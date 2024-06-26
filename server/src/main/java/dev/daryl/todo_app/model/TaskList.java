package dev.daryl.todo_app.model;

import jakarta.persistence.*;

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

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "uid")
    private ApplicationUser user;

    private String title;
    private String description;
    private Type type;
    private LocalDateTime dateCreated;

    public void setUser(ApplicationUser user) {
        // Default constructor for JPA
        this.user = user;
    }
    public TaskList(){}

   /* public TaskList(String title, String description, Type type, LocalDateTime dateCreated) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.dateCreated = dateCreated;
    }*/
    public TaskList(ApplicationUser user,String title, String description, Type type, LocalDateTime dateCreated) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.type = type;
        this.dateCreated = dateCreated;
    }

    // Getters and setters
    public long getUid(){
        return this.user.getUserId();
    }
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