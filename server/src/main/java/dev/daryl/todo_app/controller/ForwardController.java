package dev.daryl.todo_app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

    //@RequestMapping(value = "/{path:^(?!api|auth|users).*}/**")
    @RequestMapping(value = "/{path:[^\\.]*}/**")
    public String forward() {
        // Forward to the Angular index.html
        System.out.println("ForwardController");
        return "forward:/index.html";
    }
}