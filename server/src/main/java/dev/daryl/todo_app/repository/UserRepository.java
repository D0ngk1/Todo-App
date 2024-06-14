package dev.daryl.todo_app.repository;

import dev.daryl.todo_app.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<Users,Long> {
    List<Users> findById(Integer id);
    List<Users> findByUserName(String userName);
}
