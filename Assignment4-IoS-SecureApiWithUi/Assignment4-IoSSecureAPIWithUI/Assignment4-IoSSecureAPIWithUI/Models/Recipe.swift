//
//  Recipe.swift
//  Assignment4-IoS-SecureApiWithUi
//
//  Created by Abhirami Pradeep Susi on 2024-12-07.
//

import Foundation

struct Recipe: Identifiable, Decodable {
    let id: String
    let recipeName: String
    let cuisine: String
    let averageRating: Double

    enum CodingKeys: String, CodingKey {
        case id = "_id"              // Maps "_id" from API JSON data to "id" in the struct
        case recipeName
        case cuisine
        case averageRating
    }
}
