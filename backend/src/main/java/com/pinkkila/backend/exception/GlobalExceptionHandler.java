package com.pinkkila.backend.exception;

import com.pinkkila.backend.electricitydata.SingleDayStatisticsNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(SingleDayStatisticsNotFoundException.class)
    public ResponseEntity<ApiException> handleSingleDayStatisticsNotFoundException(SingleDayStatisticsNotFoundException ex) {
        log.warn(ex.getMessage());
        var exeption = new ApiException(
                HttpStatus.NOT_FOUND.value(),
                "Data for date not found",
                ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exeption);
    }
    
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiException> handleBadRequesException(BadRequestException ex) {
        log.warn("Bad request: {}", ex.getMessage());
        var exception = new ApiException(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception);
    }
    
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ApiException> handleBindException(BindException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> {
                    if (fieldError.getCode() != null && fieldError.getCode().contains("typeMismatch")) {
                        return "Invalid value for " + fieldError.getField();
                    }
                    return fieldError.getField() + " " + fieldError.getDefaultMessage();
                })
                .collect(Collectors.joining(", "));
        log.warn("Incorrect query params: {}", message);
        var apiException = new ApiException(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                message
        );
        return ResponseEntity.badRequest().body(apiException);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiException> handleGenericException(Exception ex) {
        log.error("Unexpected error occurred", ex);
        var error = new ApiException(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "An unexpected error occurred. Please try again later."
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
