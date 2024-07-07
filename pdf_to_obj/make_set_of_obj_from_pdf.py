import cv2
import numpy as np
import os
from pdf2image import convert_from_path
import shutil

shutil.rmtree('ex')

# Функция для конвертации PDF в изображения
def convert_pdf_to_images(pdf_path, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    pages = convert_from_path(pdf_path, dpi=300)  # Увеличьте dpi для лучшего качества

    for i, page in enumerate(pages):
        image_filename = os.path.join(output_folder, f"page_{i + 1}.jpg")
        page.save(image_filename, "JPEG")
        print(f"Saved page {i + 1} as image to {image_filename}")

# Функция для обработки изображения и выделения ячеек таблицы
def process_image(image_path, output_folder, filename):
    image = cv2.imread(image_path)
    if image is None:
        print(f"Could not read image {image_path}. Skipping...")
        return

    # Определяем размеры изображения
    height, width, _ = image.shape

    # Вырезаем область интереса (ваша колонка 2)
    column2_left = width // 2
    column2_right = width

    # Определяем границы области интереса (ширина влево от колонки 2)
    left_extension = 100  # 170 Пример: расширяем на 100 пикселей влево от колонки 2
    right_extension = 900 # 1600
    roi_left = max(0, column2_left - left_extension)
    roi_right = column2_right - right_extension

    # Вырезаем область интереса
    roi = image[0:height, roi_left:roi_right]

    # Преобразование изображения в оттенки серого
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)

    # Применение порогового преобразования для выделения контуров
    _, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Применение морфологических операций для удаления мелких объектов
    kernel = np.ones((2, 2), np.uint8)
    closing = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel, iterations=2)

    # Поиск контуров для выделения ячеек таблицы
    contours, _ = cv2.findContours(closing, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Создание уникальной подпапки для каждого исходного изображения
    image_output_folder = os.path.join(output_folder, os.path.splitext(filename)[0])
    os.makedirs(image_output_folder, exist_ok=True)

    for i, contour in enumerate(contours):
        # Вычисляем прямоугольник вокруг контура
        x, y, w, h = cv2.boundingRect(contour)

        # Отфильтруем объекты по их размеру и соотношению сторон
        if w > 50 and h > 50:
            padding = 10  # Добавляемое пространство вокруг контура
            x = max(0, x - padding)
            y = max(0, y - padding)
            w = min(roi.shape[1] - x, w + 2 * padding)
            h = min(roi.shape[0] - y, h + 2 * padding)

            object_roi = roi[y:y + h, x:x + w]
            object_filename = os.path.join(image_output_folder, f"{os.path.splitext(filename)[0]}_obj_{i + 1}.png")
            cv2.imwrite(object_filename, object_roi)
            print(f"Saved object {i + 1} from {filename} to {object_filename}")


# Функция для извлечения объектов из изображений
def extract_objects_from_images(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(input_folder):
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            image_path = os.path.join(input_folder, filename)
            process_image(image_path, output_folder, filename)

# Пример использования
pdf_path = "Перечень обозначений электрических схем на чертеже.pdf"  # Укажите путь к вашему PDF-документу
output_folder_images = "folder_with_extracted_pictures"  # Укажите выходную папку для изображений
convert_pdf_to_images(pdf_path, output_folder_images)

input_folder_images = "folder_with_extracted_pictures"  # Путь к папке с изображениями
output_folder_objects = "ex"  # Папка для сохранения извлечённых объектов
extract_objects_from_images(input_folder_images, output_folder_objects)
