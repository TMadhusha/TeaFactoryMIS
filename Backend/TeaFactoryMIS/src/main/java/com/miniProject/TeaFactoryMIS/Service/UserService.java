package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.Repository.EmployeeRepository;
import com.miniProject.TeaFactoryMIS.Repository.UserRepository;
import com.miniProject.TeaFactoryMIS.model.Employee;
import com.miniProject.TeaFactoryMIS.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*" )
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Authenticate the user and return both user and employee data as a map
    public Optional<Map<String, Object>> authenticateUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Check if the provided password matches the stored password
            if (password.equals(user.getPassword())) {
                Optional<Employee> employeeOpt = employeeRepository.findByUser(user);
                if (employeeOpt.isPresent()) {
                    // Create a map to hold both user and employee data
                    Map<String, Object> userData = new HashMap<>();

                    userData.put("employee", employeeOpt.get());  // Add employee data

                    return Optional.of(userData);
                }
            }
        }
        return Optional.empty();
    }
}
