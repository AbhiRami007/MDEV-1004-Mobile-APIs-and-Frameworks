//
//  Recipe.swift
//  Assignment4-IoSSecureAPIWithUI
//
//  Created by Abhirami Pradeep Susi on 2024-12-06.
//

import Foundation

struct Recipe: Identifiable, Codable {
    let id: String
    let recipeName: String
    let cookingTime: String
    let difficulty: String
    let cuisine: String
    let description: String
    let photoLink: String
    let averageRating: Double

    enum CodingKeys: String, CodingKey {
        case id = "_id"              // Maps "_id" from API JSON data to "id" in the struct
        case recipeName
        case cookingTime
        case difficulty
        case cuisine
        case description
        case photoLink
        case averageRating
    }
}
