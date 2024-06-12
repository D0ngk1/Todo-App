package dev.daryl.todo_app.repository;

import dev.daryl.todo_app.model.TaskList;
import dev.daryl.todo_app.model.Users;
import org.apache.catalina.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryArrayList {
    private List<Users> userList = new ArrayList<>();
    public UserRepositoryArrayList(){}

    public List<Users> getAllUser(){
        return userList;
    }
    public Users findByUsername(String userName){

        for (Users user : userList) {
            if (userName.equals(user.getUserName())) {
                return user;
            }
        }
        return null;
    }
    public Optional<Users> login(List<Users> user , String password){
        return user.stream().filter(c -> c.getPassword().equals(password)).findFirst();
    }
    public void createUser(Users user){userList.add(user); }
    public void update (Users user, Integer id){
        userList.set(id-1, user);
    }
}
