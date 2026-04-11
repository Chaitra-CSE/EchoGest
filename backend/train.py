import numpy as np
import pickle
import os
from model import SignLanguageModel

# Pre-trained sample data for 10 common signs
# In real scenario, this would come from recorded webcam data
SAMPLE_TRAINING_DATA = {
    "Hello": [
        np.random.rand(30, 63) for _ in range(10)  # 10 sample sequences
    ],
    "Thank you": [
        np.random.rand(30, 63) for _ in range(10)
    ],
    "Help": [
        np.random.rand(30, 63) for _ in range(10)
    ],
    "Yes": [
        np.random.rand(30, 63) for _ in range(10)
    ],
    "No": [
        np.random.rand(30, 63) for _ in range(10)
    ],
    "Water": [
        np.random.rand(30, 63) for _ in range(10)
    ],
    "Food": [
        np.random.rand(30, 63) for _ in range(10)
    ],
    "I love you": [
        np.random.rand(30, 63) for _ in range(10)
    ],
    "Sorry": [
        np.random.rand(30, 63) for _ in range(10)
    ],
    "Please": [
        np.random.rand(30, 63) for _ in range(10)
    ]
}

def train_default_model():
    print("Training sign language model with sample data...")
    
    model = SignLanguageModel()
    X_train = []
    y_train = []
    
    for word, sequences in SAMPLE_TRAINING_DATA.items():
        for seq in sequences:
            X_train.append(seq.flatten())
            y_train.append(word)
    
    model.train(X_train, y_train)
    print(f