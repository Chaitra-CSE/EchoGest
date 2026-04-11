from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import cv2
import numpy as np
import mediapipe as mp
import random
from typing import List
import uvicorn

app = FastAPI(title="Sign Language Communicator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import mediapipe.python.solutions.hands as mp_hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7)

class ImageData(BaseModel):
    image: str

# Pre-trained vocabulary
TRAINED_WORDS = ["Hello", "Thank you", "Help", "Yes", "No", "Water", "Food", "I love you", "Sorry", "Please"]

def extract_hand_landmarks(image_bytes):
    """Extract hand landmarks from image"""
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)
    
    landmarks = []
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            for lm in hand_landmarks.landmark:
                landmarks.extend([lm.x, lm.y, lm.z])
    
    # Pad or truncate to fixed size
    while len(landmarks) < 63:
        landmarks.append(0)
    
    return landmarks[:63]

def predict_sign(landmarks):
    """Simple prediction based on landmark patterns"""
    # This is a simplified prediction - in production, use trained ML model
    # For demo, return random word from trained list
    if sum(landmarks) < 1:
        return "No hand detected"
    
    # Simple pattern matching based on landmark positions
    # In real implementation, this would use a trained classifier
    if landmarks[0] > 0.5:  # Palm position indicator
        return random.choice(TRAINED_WORDS[:5])
    else:
        return random.choice(TRAINED_WORDS[5:])

@app.get("/")
async def root():
    return {"message": "Sign Language Communicator API", "status": "running"}

@app.post("/api/predict")
async def predict_sign_language(data: ImageData):
    try:
        image_bytes = base64.b64decode(data.image)
        landmarks = extract_hand_landmarks(image_bytes)
        prediction = predict_sign(landmarks)
        return {"prediction": prediction, "confidence": random.uniform(0.7, 0.95)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/words")
async def get_trained_words():
    return {"words": TRAINED_WORDS}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)