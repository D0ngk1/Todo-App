package dev.daryl.todo_app.model;

public class Users {
    private Long id;
    private String userName;
    private String password;
    private Integer invalidAttempt;
    private Boolean isLocked;

    public Users(Long id, String userName, Integer invalidAttempt, Boolean isLocked, String password) {
        this.id = id;
        this.userName = userName;
        this.invalidAttempt = invalidAttempt;
        this.isLocked = isLocked;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getInvalidAttempt() {
        return invalidAttempt;
    }

    public void setInvalidAttempt(Integer invalidAttempt) {
        this.invalidAttempt = invalidAttempt;
    }

    public Boolean getLocked() {
        return isLocked;
    }

    public void setLocked(Boolean locked) {
        isLocked = locked;
    }
}
