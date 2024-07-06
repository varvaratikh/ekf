from pdf2image import convert_from_path
import os

def convert_pdf_to_images(pdf_path, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    pages = convert_from_path(pdf_path, dpi=300)  # Увеличьте dpi для лучшего качества

    for i, page in enumerate(pages):
        image_filename = os.path.join(output_folder, f"page_{i + 1}.jpg")
        page.save(image_filename, "JPEG")
        print(f"Saved page {i + 1} as image to {image_filename}")

# Пример использования
pdf_path = "Перечень обозначений электрических схем на чертеже.pdf"  # Укажите путь к вашему PDF-документу
output_folder = "folder_with_extracted_pictures"  # Укажите выходную папку
convert_pdf_to_images(pdf_path, output_folder)

import cv2
import numpy as np
import os

def process_image(image_path, output_folder, filename):
    image = cv2.imread(image_path)
    if image is None:
        print(f"Could not read image {image_path}. Skipping...")
        return

    # Преобразование изображения в оттенки серого
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Применение адаптивного порога для выделения объектов
    binary = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 15)

    # Применение морфологических операций для удаления мелких объектов
    kernel = np.ones((3, 3), np.uint8)
    opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel, iterations=2)

    # Поиск контуров
    contours, _ = cv2.findContours(opening, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Создание уникальной подпапки для каждого исходного изображения
    image_output_folder = os.path.join(output_folder, os.path.splitext(filename)[0])
    os.makedirs(image_output_folder, exist_ok=True)

    for i, contour in enumerate(contours):
        # Вычисляем прямоугольник вокруг контура
        x, y, w, h = cv2.boundingRect(contour)

        # Отфильтруем объекты по их размеру и соотношению сторон
        if w > 100 and h > 100 and 0.5 < w / h < 2.0:
            padding = 20  # Добавляемое пространство вокруг контура
            x = max(0, x - padding)
            y = max(0, y - padding)
            w = min(image.shape[1] - x, w + 2 * padding)
            h = min(image.shape[0] - y, h + 2 * padding)

            roi = image[y:y + h, x:x + w]
            object_filename = os.path.join(image_output_folder, f"{os.path.splitext(filename)[0]}_obj_{i + 1}.png")
            cv2.imwrite(object_filename, roi)
            print(f"Saved object {i + 1} from {filename} to {object_filename}")


def extract_objects_from_images(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(input_folder):
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            image_path = os.path.join(input_folder, filename)
            process_image(image_path, output_folder, filename)

# Пример использования
input_folder = "folder_with_extracted_pictures"  # Замените на ваш путь к папке с изображениями
output_folder = "ex"  # Папка для сохранения извлечённых объектов

extract_objects_from_images(input_folder, output_folder)
