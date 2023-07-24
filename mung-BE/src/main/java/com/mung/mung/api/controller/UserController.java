package com.mung.mung.api.controller;

import com.mung.mung.api.dto.UserDto;
import com.mung.mung.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

}
