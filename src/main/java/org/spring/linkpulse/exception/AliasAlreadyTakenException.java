package org.spring.linkpulse.exception;

public class AliasAlreadyTakenException extends RuntimeException {
    public AliasAlreadyTakenException(String alias) {
        super("This alias is already taken: " + alias);
    }
}
