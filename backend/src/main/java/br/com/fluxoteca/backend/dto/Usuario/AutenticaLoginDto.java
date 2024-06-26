package br.com.fluxoteca.backend.dto.Usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AutenticaLoginDto(
    @NotBlank
    @Size(min = 5, max = 20)
    String login,
    @NotBlank
    @Size(min = 8, max = 15)
    String senha
) {
    
}
