package com.pinkkila.backend.exception;

public record ApiException(int status, String error, String message) {
}
