package dev.daryl.todo_app.controller;

import dev.daryl.todo_app.DTO.LoginResponseDTO;
import dev.daryl.todo_app.DTO.RegistrationDTO;
import dev.daryl.todo_app.model.ApplicationUser;
import dev.daryl.todo_app.service.AuthenticationService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.username(), body.password());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body){
        return authenticationService.loginUser(body.username(),body.password());
    }
    /*@GetMapping("/{uid}")
    public ApplicationUser getById(@PathVariable Integer uid){
        return authenticationService.findbyId(uid).get();
    }*/
}
