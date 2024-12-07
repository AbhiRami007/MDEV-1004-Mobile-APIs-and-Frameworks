//
//  RecipeRowView.swift
//  Assignment4-IoS-SecureApiWithUi
//
//  Created by Abhirami Pradeep Susi on 2024-12-6.
//

import SwiftUI

struct RecipeRowView: View {
    let recipe: Recipe

    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text("Recipe Name: \(recipe.recipeName)")
                    .font(.headline)
                Text("Recipe Studio: \(recipe.cuisine)")
                    .font(.subheadline)
                Text("Recipe Rating: \(recipe.averageRating, specifier: "%.1f")")
                    .font(.subheadline)
            }
        }
    }
}
