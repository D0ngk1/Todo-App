package dev.daryl.todo_app.service;


import dev.daryl.todo_app.DTO.LoginResponseDTO;
import dev.daryl.todo_app.model.ApplicationUser;
import dev.daryl.todo_app.model.Role;
import dev.daryl.todo_app.repository.RoleRepository;
import dev.daryl.todo_app.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, TokenService tokenService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    public ApplicationUser registerUser(String username,String password){
        String encodedPassword = passwordEncoder.encode(password);

        Optional<Role> roleUser = roleRepository.findByAuthority("USER");

        if (!roleUser.isPresent()) { roleRepository.save(new Role("USER")); }
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);

        return userRepository.save(new ApplicationUser(null,username,encodedPassword,authorities));
    }
    public Optional<ApplicationUser> findbyId(Integer uid){
        return userRepository.findByUserId(uid);
    }

    public LoginResponseDTO loginUser(String username, String password){

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username,password)
            );
            String token = tokenService.generateJwt(auth);

            return new LoginResponseDTO(userRepository.findByUsername(username).get(0),token);

        }catch (AuthenticationException e){
            return new LoginResponseDTO(null,"");
        }
    }


}
