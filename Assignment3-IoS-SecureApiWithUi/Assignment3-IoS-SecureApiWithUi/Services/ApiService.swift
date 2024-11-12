//
//  ApiService.swift
//  Assignment3-IoS-SecureApiWithUi
//
//  Created by Abhirami Pradeep Susi on 2024-11-12.
//

import Foundation
import Combine

class ApiService {
    func fetchRecipes() -> AnyPublisher<[Recipe], Error> {
        guard let url = URL(string: "http://10.0.0.143:3000/recipe/") else {
            fatalError("Invalid URL")
        }

        return URLSession.shared.dataTaskPublisher(for: url)
            .map { $0.data }
            .decode(type: [Recipe].self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .eraseToAnyPublisher()
    }
}
