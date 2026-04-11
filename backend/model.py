import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

class SignLanguageModel:
    def __init__(self, model_path="models/sign_model.pkl"):
        self.model_path = model_path
        self.model = None
        self.label_encoder = LabelEncoder()
        self.sequence_length = 30  # frames per sign
        self.num_landmarks = 63  # 21 hand landmarks * 3 (x,y,z)
        
    def extract_landmarks(self, hand_landmarks):
        """Extract landmarks from MediaPipe hand detection"""
        if hand_landmarks is None:
            return np.zeros(self.num_landmarks)
        
        landmarks = []
        for lm in hand_landmarks.landmark:
            landmarks.extend([lm.x, lm.y, lm.z])
        
        # Pad if less than 21 landmarks (should be exactly 21)
        while len(landmarks) < self.num_landmarks:
            landmarks.append(0)
        
        return np.array(landmarks[:self.num_landmarks])
    
    def train(self, X, y):
        """Train the model with collected landmark sequences"""
        self.label_encoder.fit(y)
        y_encoded = self.label_encoder.transform(y)
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X, y_encoded)
        self.save_model()
        
    def predict(self, landmarks_sequence):
        """Predict sign from landmark sequence"""
        if self.model is None:
            self.load_model()
        
        if self.model is None:
            return "Model not trained"
        
        # Flatten sequence for prediction
        features = np.array(landmarks_sequence).flatten().reshape(1, -1)
        pred_encoded = self.model.predict(features)[0]
        return self.label_encoder.inverse_transform([pred_encoded])[0]
    
    def save_model(self):
        os.makedirs("models", exist_ok=True)
        with open(self.model_path, 'wb') as f:
            pickle.dump({
                'model': self.model,
                'label_encoder': self.label_encoder
            }, f)
    
    def load_model(self):
        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                data = pickle.load(f)
                self.model = data['model']
                self.label_encoder = data['label_encoder']
            return True
        return False
    
    def get_trained_words(self):
        """Return list of trained words"""
        if self.label_encoder is None or len(self.label_encoder.classes_) == 0:
            return []
        return self.label_encoder.classes_.tolist()