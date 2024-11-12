//
//  Item.swift
//  Assignment3-IoS-SecureApiWithUi
//
//  Created by Abhirami Pradeep Susi on 2024-11-12.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
