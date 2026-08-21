package com.school.websitesekolah.service;

import com.school.websitesekolah.dto.LoginRequest;
import com.school.websitesekolah.dto.LoginResponse;
import com.school.websitesekolah.security.AdminUserDetails;
import com.school.websitesekolah.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        AdminUserDetails userDetails = (AdminUserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        return new LoginResponse(token, "Bearer", userDetails.getUsername());
    }
}
