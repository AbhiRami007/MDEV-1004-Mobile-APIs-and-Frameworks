package com.example.assignment4_secureapiwithui.Services;

import com.example.assignment4_secureapiwithui.Models.LoginRequest;
import com.example.assignment4_secureapiwithui.Models.LoginResponse;
import com.example.assignment4_secureapiwithui.Models.Recipe;
import com.example.assignment4_secureapiwithui.Models.RecipeResponseNew;
import com.example.assignment4_secureapiwithui.Models.RegisterRequestNew;
import com.example.assignment4_secureapiwithui.Models.RegisterResponseNew;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;


public interface ApiService {
    // User APIs
    @POST("/user/register")
    Call<RegisterResponseNew> registerUser(@Body RegisterRequestNew request);

    @POST("/user/login")
    Call<LoginResponse> loginUser(
            @Body LoginRequest loginRequest
    );
    @GET("/user/logout")
    Call<Void> logoutUser();

    @GET("/recipe/")
    Call<List<RecipeResponseNew>> getRecipes();

    @POST("/recipe/")
    Call<RecipeResponseNew> createRecipe(@Body Recipe recipe, @Header("Authorization") String token);

    @PUT("/recipe/{id}")
    Call<RecipeResponseNew> updateRecipe(@Path("id") String id, @Body Recipe recipe, @Header("Authorization") String token);

    @DELETE("/recipe/{id}")
    Call<Void> deleteRecipe(@Path("id") String id,  @Header("Authorization") String token);
}
