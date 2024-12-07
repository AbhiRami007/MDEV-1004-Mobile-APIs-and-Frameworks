package com.example.assignment4_secureapiwithui.Controllers;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.assignment4_secureapiwithui.Services.ApiService;
import com.example.assignment4_secureapiwithui.Auth.LoginActivity;
import com.example.assignment4_secureapiwithui.R;
import com.example.assignment4_secureapiwithui.Models.Recipe;
import com.example.assignment4_secureapiwithui.Services.RecipeAdapter;
import com.example.assignment4_secureapiwithui.Models.RecipeResponseNew;
import com.example.assignment4_secureapiwithui.Services.RetrofitClient;
import com.example.assignment4_secureapiwithui.Services.TokenManager;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MainActivity extends AppCompatActivity {
    private static final int ADD_RECIPE_REQUEST_CODE = 1;
    public static final int EDIT_RECIPE_REQUEST_CODE = 2;

    private Button addRecipeButton; // Declare the button
    private Button logoutButton;    // Declare the button
    private RecyclerView recyclerView;
    private RecipeAdapter recipeAdapter;



    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize Add Recipe Button
        addRecipeButton = findViewById(R.id.addRecipeButton);
        addRecipeButton.setOnClickListener(v -> {
            // Navigate to AddRecipeActivity
            Intent intent = new Intent(MainActivity.this, AddRecipeActivity.class);
            startActivityForResult(intent, ADD_RECIPE_REQUEST_CODE);
        });

        // Initialize Logout Button
        logoutButton = findViewById(R.id.logoutButton);
        logoutButton.setOnClickListener(v -> {
            // Clear the token and navigate to LoginActivity
            TokenManager.clearToken(this);
            Toast.makeText(this, "Logged out successfully", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
            startActivity(intent);
            finish(); // Close MainActivity
        });

        // Initialize RecyclerView
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Initialize Adapter
        recipeAdapter = new RecipeAdapter(this, new ArrayList<>());
        recyclerView.setAdapter(recipeAdapter);

        // Fetch Recipes
        fetchRecipes();
    }

    private final ActivityResultLauncher<Intent> editRecipeLauncher =
            registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
                if (result.getResultCode() == RESULT_OK) {
                    fetchRecipes();
                }
            });

    private void fetchRecipes() {
        ApiService apiService = RetrofitClient.getApiService(this);
        Call<List<RecipeResponseNew>> call = apiService.getRecipes();

        call.enqueue(new Callback<List<RecipeResponseNew>>() {
            @Override
            public void onResponse(Call<List<RecipeResponseNew>> call, Response<List<RecipeResponseNew>> response) {
                if (response.isSuccessful() && response.body() != null && !response.body().isEmpty()) {
                    List<Recipe> recipes = new ArrayList<>();
                    for (RecipeResponseNew recipeResponseNew : response.body()) {
                        String id = recipeResponseNew.getId();
                        String recipeName = recipeResponseNew.getRecipeName();
                        String cuisine= recipeResponseNew.getCuisine();
                        Double rating = recipeResponseNew.getAverageRating();

                        Recipe recipe = new Recipe(id, recipeName, cuisine, rating);

                        recipe.setId(recipeResponseNew.getId());
                        recipe.setRecipeName(recipeResponseNew.getRecipeName());
                        recipe.setCookingTime(recipeResponseNew.getCookingTime());
                        recipe.setDifficulty(recipeResponseNew.getDifficulty());
                        recipe.setCuisine(recipeResponseNew.getCuisine());
                        recipe.setDescription(recipeResponseNew.getDescription());
                        recipe.setPhotoLink(recipeResponseNew.getPhotoLink());
                        recipe.setAverageRating(recipeResponseNew.getAverageRating());
                        recipes.add(recipe);
                    }
                    recipeAdapter.updateData(recipes);
                } else {
                    Toast.makeText(MainActivity.this, "Failed to load recipes or no recipes available", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<RecipeResponseNew>> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_LONG).show();
                Log.e("MainActivity", "Error fetching recipes", t);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == ADD_RECIPE_REQUEST_CODE && resultCode == RESULT_OK) {
            Toast.makeText(this, "Recipe added! Refreshing list...", Toast.LENGTH_SHORT).show();
            fetchRecipes(); // Reload the recipes after adding
        }

        if (requestCode == EDIT_RECIPE_REQUEST_CODE && resultCode == RESULT_OK) {
            Toast.makeText(this, "Recipe updated! Refreshing list...", Toast.LENGTH_SHORT).show();
            fetchRecipes();  // Refresh list
        }
    }
}
