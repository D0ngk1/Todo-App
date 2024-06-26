package dev.daryl.todo_app.repository;

import dev.daryl.todo_app.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository <Role,Integer> {
    Optional <Role> findByAuthority(String authority);
}
