package com.pinkkila.backend.electricitydatadaily;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { RequestFilterConsistencyValidator.class })
@Documented
public @interface ValidFilter {
    String message() default "Invalid date / min-max ranges";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}