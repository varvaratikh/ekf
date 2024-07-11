from flask import Flask, request, jsonify
import torch
from pathlib import Path
import cv2
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from PIL import Image, ImageDraw, ImageFont
import pandas as pd
from PIL import Image, ImageDraw, ImageFont
import pytesseract
from PIL import Image, ImageEnhance, ImageFilter
import re

pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

model = torch.hub.load('ultralytics/yolov5', 'custom', path='C:/ekf_hackaton/yolov5/runs/train/custom_yolov5s2/weights/best.pt', device='cpu')
model.eval()  # Set model to evaluation mode
app = Flask(__name__)

def pad_image_to_divisible(image, frame_size=(640, 640)):
    width, height = image.size
    pad_width = (frame_size[0] - (width % frame_size[0])) % frame_size[0]
    pad_height = (frame_size[1] - (height % frame_size[1])) % frame_size[1]

    new_width = width + pad_width
    new_height = height + pad_height

    padded_image = Image.new(image.mode, (new_width, new_height), (255, 255, 255))
    padded_image.paste(image, (0, 0))

    return padded_image

def split_image_into_patches(image, frame_size=(640, 640)):
    width, height = image.size
    patches = []
    patch_bboxes = []

    for y in range(0, height, frame_size[1]):
        for x in range(0, width, frame_size[0]):
            patch = image.crop((x, y, x + frame_size[0], y + frame_size[1]))
            patches.append(patch)

            # Filter and convert bboxes for this patch
            bboxes_in_patch = model(patch).pandas().xyxy[0]
            patch_bboxes.append(bboxes_in_patch)

            # Handle overlapping patches
            if x + frame_size[0] < width:
                overlapping_patch = image.crop((x + frame_size[0] // 2, y, x + frame_size[0] // 2 + frame_size[0], y + frame_size[1]))
                patches.append(overlapping_patch)
                bboxes_in_patch = model(overlapping_patch).pandas().xyxy[0]
                patch_bboxes.append(bboxes_in_patch)

            if y + frame_size[1] < height:
                overlapping_patch = image.crop((x, y + frame_size[1] // 2, x + frame_size[0], y + frame_size[1] // 2 + frame_size[1]))
                patches.append(overlapping_patch)
                bboxes_in_patch = model(overlapping_patch).pandas().xyxy[0]
                patch_bboxes.append(bboxes_in_patch)

            if x + frame_size[0] < width and y + frame_size[1] < height:
                overlapping_patch = image.crop((x + frame_size[0] // 2, y + frame_size[1] // 2, x + frame_size[0] // 2 + frame_size[0], y + frame_size[1] // 2 + frame_size[1]))
                patches.append(overlapping_patch)
                bboxes_in_patch = model(overlapping_patch).pandas().xyxy[0]
                patch_bboxes.append(bboxes_in_patch)

    return patches, patch_bboxes


def bbox_is_close(bbox1, bbox2, epsilon=10):
    """
    Check if two bounding boxes are 'close' based on a given epsilon threshold.
    Bounding boxes are considered close if the absolute difference between
    corresponding coordinates (xtl, ytl, xbr, ybr) is less than epsilon.
    """
    return (abs(bbox1[0] - bbox2[0]) < epsilon and  # xtl
            abs(bbox1[1] - bbox2[1]) < epsilon and  # ytl
            abs(bbox1[2] - bbox2[2]) < epsilon and  # xbr
            abs(bbox1[3] - bbox2[3]) < epsilon and # ybr
            bbox1[4] == bbox2[4])


def calculate_overlap_area(bbox1, bbox2):
    """
    Calculate the overlapping area between two bounding boxes.
    bbox = (xmin, ymin, xmax, ymax)
    """
    x_left = max(bbox1[0], bbox2[0])
    y_top = max(bbox1[1], bbox2[1])
    x_right = min(bbox1[2], bbox2[2])
    y_bottom = min(bbox1[3], bbox2[3])

    if x_right < x_left or y_bottom < y_top:
        return 0.0

    overlap_area = (x_right - x_left) * (y_bottom - y_top)
    return overlap_area

def should_keep_bbox(bbox1, bbox2):
    """
    Determine if bbox1 should be kept based on its overlap with bbox2.
    """
    area1 = (bbox1[2] - bbox1[0]) * (bbox1[3] - bbox1[1])
    area2 = (bbox2[2] - bbox2[0]) * (bbox2[3] - bbox2[1])
    overlap_area = calculate_overlap_area(bbox1, bbox2)

    overlap1 = overlap_area / area1
    overlap2 = overlap_area / area2

    if overlap1 > 0.3 or overlap2 > 0.3:
        return area1 >= area2
    return True

def merge_patches_with_bboxes(padded_image, patch_bboxes, frame_size=(640, 640)):
    width, height = padded_image.size
    merged_image = padded_image.copy()
    merged_bboxes = []
    patch_index = 0

    for y in range(0, height, frame_size[1]):
        for x in range(0, width, frame_size[0]):
            # Normal patches
            for _, bbox in patch_bboxes[patch_index].iterrows():
                xmin, ymin, xmax, ymax, confidence, class_id, label = bbox['xmin'], bbox['ymin'], bbox['xmax'], bbox['ymax'], bbox['confidence'], bbox['class'], bbox['name']
                xtl = xmin + x
                ytl = ymin + y
                xbr = xmax + x
                ybr = ymax + y
                merged_bboxes.append((xtl, ytl, xbr, ybr, class_id, confidence))
            patch_index += 1

            # Overlapping patches horizontally
            if x + frame_size[0] < width:
                for _, bbox in patch_bboxes[patch_index].iterrows():
                    xmin, ymin, xmax, ymax, confidence, class_id, label = bbox['xmin'], bbox['ymin'], bbox['xmax'], bbox['ymax'], bbox['confidence'], bbox['class'], bbox['name']
                    xtl = xmin + x + frame_size[0] // 2
                    ytl = ymin + y
                    xbr = xmax + x + frame_size[0] // 2
                    ybr = ymax + y
                    merged_bboxes.append((xtl, ytl, xbr, ybr, class_id, confidence))
                patch_index += 1

            # Overlapping patches vertically
            if y + frame_size[1] < height:
                for _, bbox in patch_bboxes[patch_index].iterrows():
                    xmin, ymin, xmax, ymax, confidence, class_id, label = bbox['xmin'], bbox['ymin'], bbox['xmax'], bbox['ymax'], bbox['confidence'], bbox['class'], bbox['name']
                    xtl = xmin + x
                    ytl = ymin + y + frame_size[1] // 2
                    xbr = xmax + x
                    ybr = ymax + y + frame_size[1] // 2
                    merged_bboxes.append((xtl, ytl, xbr, ybr, class_id, confidence))
                patch_index += 1

            # Overlapping patches both horizontally and vertically
            if x + frame_size[0] < width and y + frame_size[1] < height:
                for _, bbox in patch_bboxes[patch_index].iterrows():
                    xmin, ymin, xmax, ymax, confidence, class_id, label = bbox['xmin'], bbox['ymin'], bbox['xmax'], bbox['ymax'], bbox['confidence'], bbox['class'], bbox['name']
                    xtl = xmin + x + frame_size[0] // 2
                    ytl = ymin + y + frame_size[1] // 2
                    xbr = xmax + x + frame_size[0] // 2
                    ybr = ymax + y + frame_size[1] // 2
                    merged_bboxes.append((xtl, ytl, xbr, ybr, class_id, confidence))
                patch_index += 1

    unique_bboxes = []
    for bbox in merged_bboxes:
        is_unique = True
        for unique_bbox in unique_bboxes:
            if bbox_is_close(bbox, unique_bbox, 70):
                is_unique = False
                break
        if is_unique:
            unique_bboxes.append(bbox)

    # Filter out overlapping smaller bounding boxes
    filtered_bboxes = []
    for i, bbox in enumerate(unique_bboxes):
        keep = True
        for j, other_bbox in enumerate(unique_bboxes):
            if i != j and not should_keep_bbox(bbox, other_bbox):
                keep = False
                break
        if keep:
            filtered_bboxes.append(bbox)

    confident_bboxes = []
    # Draw the filtered bounding boxes
    for bbox in filtered_bboxes:
        xtl, ytl, xbr, ybr, label, confidence = bbox
        if confidence < 0.7:
            continue
        else:
            confident_bboxes.append(bbox)
    
    text_bboxes = [x for x in confident_bboxes if x[4] == 6]
    two_char_bboxes = [x for x in confident_bboxes if x[4] != 6 and x[4] != 16]
    box_bboxes = [x for x in confident_bboxes if x[4] == 16]
    text_bboxes.sort(key=lambda x: x[0])
    two_char_bboxes.sort(key=lambda x: x[0])
    for text in text_bboxes:
        confident_bboxes.remove(text)
    for object in two_char_bboxes:
        confident_bboxes.remove(object)
    for box in box_bboxes:
        confident_bboxes.remove(box)   
    
    def is_close(bbox1, bbox2, threshold):
        # Extract coordinates from bounding boxes
        x1_min, y1_min, x1_max, y1_max = bbox1[:4]
        x2_min, y2_min, x2_max, y2_max = bbox2[:4]
        
        # Calculate horizontal and vertical distances
        horizontal_dist = max(0, x2_min - x1_max, x1_min - x2_max)
        vertical_dist = max(0, y2_min - y1_max, y1_min - y2_max)
        
        # Calculate the minimum distance between the rectangles
        min_dist = (horizontal_dist ** 2 + vertical_dist ** 2) ** 0.5
        
        # Check if the minimum distance is less than or equal to the threshold
        return min_dist <= threshold


    result = []
    for box in box_bboxes:
        img = padded_image.crop(box[:4])
        original_size = img.size

        # Calculate the new size
        new_size = (original_size[0] * 3, original_size[1] * 3)

        # Resize the image to the new size
        img_resized = img.resize(new_size, Image.LANCZOS)
        img = img_resized
        img = img.convert('L')
        threshold = 75
        img = img.point(lambda x: 0 if x < threshold else 255, '1')
        img = img.convert('L')
        # Enhance the sharpness of the image
        enhancer = ImageEnhance.Sharpness(img)
        img = enhancer.enhance(2)  # Increase the factor if needed
        recognized_text = pytesseract.image_to_string(img, lang='rus')
        ip_text = pytesseract.image_to_string(img, lang='eng')
        pattern = r'\bIP\d{2}\b'

        # Find all matches in the input text
        matches = re.findall(pattern, ip_text)
        recognized_text = recognized_text.replace('\n', ' ')
        recognized_text += ' '.join(matches)
        result.append((box, recognized_text))
    for object_bbox in two_char_bboxes:
        for text in text_bboxes:
            if is_close(object_bbox, text, 60):
                custom_config = r'--psm 6 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.- '
                img = padded_image.crop(text[:4])
                original_size = img.size

                # Calculate the new size
                new_size = (original_size[0] * 3, original_size[1] * 3)

                # Resize the image to the new size
                img_resized = img.resize(new_size, Image.LANCZOS)
                img = img_resized
                img = img.convert('L')
                threshold = 65
                img = img.point(lambda x: 0 if x < threshold else 255, '1')
                img = img.convert('L')
                # Enhance the sharpness of the image
                enhancer = ImageEnhance.Sharpness(img)
                img = enhancer.enhance(1.9)  # Increase the factor if needed
                recognized_text = pytesseract.image_to_string(img, lang='eng', config=custom_config)
                recognized_text = recognized_text.replace('\n', ' ')
                result.append((object_bbox, recognized_text))
                text_bboxes.remove(text)
                break
        else:
            result.append((object_bbox, ""))
    answer = {"mp":{}, "boxes": [], "class_id": []}
    for i, (box, text) in enumerate(result):
        answer["mp"][f"additionalProp{i+1}"] = text
        answer["boxes"].append({"left":{"x":box[0], "y":box[1]}, "right":{"x": box[2], "y": box[3]}})
        answer["class_id"].append(box[4])
    for i, box in enumerate(confident_bboxes):
        answer["mp"][f"additionalProp{len(result)+i+1}"] = ""
        answer["boxes"].append({"left":{"x":box[0], "y":box[1]}, "right":{"x": box[2], "y": box[3]}})
        answer["class_id"].append(box[4])

    return answer


@app.route('/resize', methods=['POST'])
def resize_image():
    if 'image' not in request.files:
        return "No image file found in the request", 400

    image_file = request.files['image']
    try:
        image = Image.open(image_file)
        padded_image = pad_image_to_divisible(image)
        patches, patch_bboxes = split_image_into_patches(padded_image)
        response = merge_patches_with_bboxes(padded_image, patch_bboxes)
        
        return jsonify(response)

    except Exception as e:
        return str(e), 500


if __name__ == '__main__':
    app.run(debug=True)
