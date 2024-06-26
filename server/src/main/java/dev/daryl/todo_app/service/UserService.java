package dev.daryl.todo_app.service;


import dev.daryl.todo_app.model.ApplicationUser;
import dev.daryl.todo_app.model.Role;
import dev.daryl.todo_app.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    public UserService(PasswordEncoder encoder, UserRepository userRepository) {
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In the user details service");
        Optional<ApplicationUser> checkUser =  userRepository.findByUsername(username).stream().findFirst();

        return checkUser.orElseThrow(() -> new UsernameNotFoundException("User is not valid"));
    }
}
