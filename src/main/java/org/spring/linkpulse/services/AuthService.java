package org.spring.linkpulse.services;

import lombok.RequiredArgsConstructor;
import org.spring.linkpulse.dto.AuthResponse;
import org.spring.linkpulse.dto.LoginRequest;
import org.spring.linkpulse.dto.RegisterRequest;
import org.spring.linkpulse.dto.UserDto;
import org.spring.linkpulse.exception.EmailAlreadyRegisteredException;
import org.spring.linkpulse.exception.InvalidCredentialsException;
import org.spring.linkpulse.models.User;
import org.spring.linkpulse.repository.UserRepository;
import org.spring.linkpulse.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtTokenProvider;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new EmailAlreadyRegisteredException(request.email());
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));

        User saved = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(saved.getEmail(), saved.getId());

        return new AuthResponse(token, UserDto.from(saved));
    }
    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.email())
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getId());

            return new AuthResponse(token, UserDto.from(user));
        }
}