package dev.daryl.todo_app.repository;

import dev.daryl.todo_app.model.ApplicationUser;
import dev.daryl.todo_app.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser,Long> {
    Optional<ApplicationUser> findByUserId(Integer userId);
    List<ApplicationUser> findByUsername(String userName);
}
