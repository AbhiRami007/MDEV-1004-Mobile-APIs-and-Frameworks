//
//  ApiService.swift
//  Assignment4-IoS-SecureApiWithUi
//
//  Created by Abhirami Pradeep Susi on 2024-12-6.
//

import Foundation
import Combine

class ApiService {
    func fetchRecipes() -> AnyPublisher<[Recipe], Error> {
        guard let url = URL(string: "https://mdev-1004-mobile-apis-and-frameworks.onrender.com/recipe/") else {
            fatalError("Invalid URL")
        }

        return URLSession.shared.dataTaskPublisher(for: url)
            .map { $0.data }
            .decode(type: [Recipe].self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .eraseToAnyPublisher()
    }
}
