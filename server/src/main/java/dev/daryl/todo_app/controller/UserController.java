package dev.daryl.todo_app.controller;


import dev.daryl.todo_app.model.ApplicationUser;
import dev.daryl.todo_app.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
@EnableWebSecurity
public class UserController {

    private final UserRepository userRepo;

    //Dependency Injection
    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
    //***************** Get all users
    @GetMapping("")
    public ResponseEntity<List<ApplicationUser>> getAllUsers(){
        try{
            List<ApplicationUser> users = new ArrayList<>(userRepo.findAll());
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
    }
    //***************** Login
    @GetMapping("/login/{userName}/{password}")
    public ResponseEntity<Users> login(@PathVariable String userName, @PathVariable String password){
        try{
            Users user = taskListService.login(userName,password);
            if(user != null) {
                if (user.getPassword().equals(password)) {
                    return new ResponseEntity<>(user, HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/
    //**************** Update Users
    @PutMapping("/edit/{id}")
    public ResponseEntity<ApplicationUser> updateUser(@RequestBody ApplicationUser user,@PathVariable Long id){
        try{
            Optional<ApplicationUser> findUser = userRepo.findById(id);
            if (findUser.isPresent()){
                ApplicationUser userF = findUser.get();
                userF.setUsername(user.getUsername());
                return new ResponseEntity<>(userRepo.save(userF), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e){
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
