package dev.daryl.todo_app.controller;


import dev.daryl.todo_app.model.Users;
import dev.daryl.todo_app.repository.UserRepositoryArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserArrayListController {
    private final UserRepositoryArrayList userRepo;

    public UserArrayListController(UserRepositoryArrayList userRepo) {
        this.userRepo = userRepo;
    }


    //**************** Return all Users
    @GetMapping("")
    public ResponseEntity<List<Users>> viewAllUsers(){
        try {
            List<Users> users = userRepo.getAllUser();
            return new ResponseEntity<>(users, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //**************** Login
    @GetMapping("/login/{userName}/{password}")
    public ResponseEntity<Users> login(@PathVariable String userName,@PathVariable String password){
        try{
            Users findUser = userRepo.findByUsername(userName);
            if (findUser != null){
                if (findUser.getPassword().equals(password)){
                    return new ResponseEntity<>(findUser,HttpStatus.ACCEPTED);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //**************** Create Users
    @PostMapping("")
    public ResponseEntity<List<Users>> createUser(@RequestBody Users user){
        try{
            userRepo.createUser(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Delete Users


}
