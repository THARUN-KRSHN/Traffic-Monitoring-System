from flask import Flask, render_template, jsonify
import cv2
import numpy as np
import matplotlib.pyplot as plt

app = Flask(__name__)

def process_video(video_path):
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    vehicle_counts = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convert to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Simple thresholding to detect vehicles (basic method)
        _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)

        # Count non-zero pixels (this represents vehicles in a basic way)
        vehicle_count = np.count_nonzero(thresh) // 10000  # Adjust division for scaling
        vehicle_counts.append(vehicle_count)

        frame_count += 1

    cap.release()

    # Generate traffic graph
    plt.figure(figsize=(8, 4))
    plt.plot(vehicle_counts, marker='o', linestyle='-')
    plt.xlabel('Time (frames)')
    plt.ylabel('Vehicle Count')
    plt.title('Traffic Analysis Over Time')
    plt.savefig("static/traffic_graph.png")  # Save graph image

    return "static/traffic_graph.png"

@app.route('/traffic_analysis')
def traffic_analysis():
    graph_path = process_video('static/video/sample.mp4')
    return jsonify({"graph_url": graph_path})

if __name__ == '__main__':
    app.run(debug=True)
