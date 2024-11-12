//
//  RecipeListView.swift
//  Assignment3-IoS-SecureApiWithUi
//
//  Created by Abhirami Pradeep Susi on 2024-11-12.
//

import SwiftUI
import Combine

struct RecipeListView: View {
    @State private var recipes: [Recipe] = []
    @State private var cancellable: AnyCancellable?
    
    var body: some View {
        NavigationView {
            List(recipes) { recipe in
                RecipeRowView(recipe: recipe)
            }
            .navigationTitle("Recipes")
            .onAppear {
                fetchRecipes()
            }
        }
    }

    func fetchRecipes() {
        let apiService = ApiService()
        cancellable = apiService.fetchRecipes()
            .sink(receiveCompletion: { completion in
                print(completion)
            }, receiveValue: { recipes in
                print("Fetched recipes:", recipes)
                self.recipes = recipes
            })
    }
}
