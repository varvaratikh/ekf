from flask import Flask, request, jsonify
from PIL import Image
import random

app = Flask(__name__)

@app.route('/resize', methods=['POST'])
def resize_image():
    if 'image' not in request.files:
        return "No image file found in the request", 400

    image_file = request.files['image']
    try:
        image = Image.open(image_file)
        width, height = image.size

        boxes = []
        for _ in range(random.randint(1, 5)):
            box_width = random.randint(1, 100)
            box_height = random.randint(1, 100)
            left_x = random.randint(0, width - box_width)
            left_y = random.randint(0, height - box_height)
            right_x = left_x + box_width
            right_y = left_y + box_height

            boxes.append({
                "left": {"x": left_x, "y": left_y},
                "right": {"x": right_x, "y": right_y}
            })

        response = {
            "mp": {str(i): "box" for i in range(len(boxes))},
            "boxes": boxes
        }

        return jsonify(response)

    except Exception as e:
        return str(e), 500


if __name__ == '__main__':
    app.run(debug=True)