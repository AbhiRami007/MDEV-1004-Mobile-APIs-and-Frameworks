//
//  ApiService.swift
//  Assignment4-IoSSecureAPIWithUI
//
//  Created by Abhirami Pradeep Susi on 2024-12-06.
//

import Foundation
import Combine

class ApiService {
    private let baseURL = "http://localhost:3000/recipe/"
    
    // Fetch the token from a secure storage location (adjust this method to your app's implementation)
    private func getAuthorizationToken() -> String? {
        // Example: Retrieve token from UserDefaults (use Keychain for better security in production)
        return UserDefaults.standard.string(forKey: "authToken")
    }
    
    private func addAuthorizationHeader(to request: inout URLRequest) {
        if let token = getAuthorizationToken() {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        } else {
            print("Authorization token is missing.")
        }
    }
    
    func fetchRecipes() -> AnyPublisher<[Recipe], Error> {
        guard let url = URL(string: baseURL) else {
            fatalError("Invalid URL")
        }

        return URLSession.shared.dataTaskPublisher(for: url)
            .map { $0.data }
            .decode(type: [Recipe].self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .eraseToAnyPublisher()
    }
    
}

//https://mdev-1004-mobile-apis-and-frameworks.onrender.com/
