package dev.daryl.todo_app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

    @RequestMapping(value = "/{path:^(?!api|auth|users).*}/**")
    public String forward() {
        // Forward to the Angular index.html
        return "forward:/index.html";
    }
}