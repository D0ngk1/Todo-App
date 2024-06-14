package dev.daryl.todo_app.controller;

import dev.daryl.todo_app.model.TaskList;
import dev.daryl.todo_app.model.Users;
import dev.daryl.todo_app.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepo;


    //Dependency Injection
    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
    //***************** Get all users
    @GetMapping("")
    public ResponseEntity<List<Users>> getAllUsers(){
        try{
            List<Users> users = new ArrayList<>(userRepo.findAll());
            if (users.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //***************** Find username
    /*
    @GetMapping("/{userName}")
    public ResponseEntity <List<Users>> findUsername(@PathVariable String userName){
        try{
            List<Users> user = userRepo.findByUserName(userName);
            if (user != null){
                return new ResponseEntity<>(user,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/
    //***************** Login
    @GetMapping("/login/{userName}/{password}")
    public ResponseEntity<Users> login(@PathVariable String userName, @PathVariable String password){
        try{
            List <Users> users = userRepo.findByUserName(userName);
            Users user = users.get(0);
            if(user != null) {
                if (user.getPassword().equals(password)) {
                    return new ResponseEntity<>(user, HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //**************** Update Users
    @PutMapping("/edit/{id}")
    public ResponseEntity<Users> updateUser(@RequestBody Users user,@PathVariable Long id){
        try{
            Optional<Users> findUser = userRepo.findById(id);
            if (findUser.isPresent()){
                Users userF = findUser.get();
                userF.setUserName(user.getUserName());
                userF.setInvalidAttempt(user.getInvalidAttempt());
                userF.setLocked(user.getLocked());
                userF.setPassword(user.getPassword());
                return new ResponseEntity<>(userRepo.save(userF), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //***************** Create user
    @PostMapping("/create")
    public ResponseEntity<Users> createUser(@RequestBody Users user){
        try {
            userRepo.save(user);
            return new ResponseEntity<>(user,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //**************************** Delete user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id){
        try {
            userRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
