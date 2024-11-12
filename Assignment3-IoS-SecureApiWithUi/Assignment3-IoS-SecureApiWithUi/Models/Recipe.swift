//
//  Recipe.swift
//  Assignment3-IoS-SecureApiWithUi
//
//  Created by Abhirami Pradeep Susi on 2024-11-12.
//

import Foundation

struct Recipe: Identifiable, Decodable {
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
