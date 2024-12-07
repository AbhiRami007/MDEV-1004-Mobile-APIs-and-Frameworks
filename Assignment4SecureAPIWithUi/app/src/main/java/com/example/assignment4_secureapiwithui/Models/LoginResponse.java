package com.example.assignment4_secureapiwithui.Models;

import com.google.gson.annotations.SerializedName;

public class LoginResponse {
    @SerializedName("message")
    private String message;

    @SerializedName("token")
    private String token;

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }
}
