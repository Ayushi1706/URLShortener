package org.spring.linkpulse.dto;

import org.spring.linkpulse.models.User;

public record UserDto(Long userId, String email) {
    public static UserDto from(User user) {
        return new UserDto(user.getId(), user.getEmail());
    }
}
