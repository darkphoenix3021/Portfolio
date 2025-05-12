import cv2
import torch
from torchvision import transforms
from PIL import Image

# Load the pre-trained AnimeGAN model
model = torch.hub.load('bryandlee/animegan2-pytorch', 'generator', pretrained=True)

# Function to transform an image into anime style
def transform_to_anime(image_path):
    image = Image.open(image_path).convert("RGB")

    preprocess = transforms.Compose([
        transforms.Resize((512, 512)),
        transforms.ToTensor(),
    ])

    input_tensor = preprocess(image).unsqueeze(0)

    with torch.no_grad():
        anime_image = model(input_tensor).squeeze(0)

    anime_image = transforms.ToPILImage()(anime_image)
    return anime_image

# Example usage
image_path = "input.jpg"  # Replace with your image file
anime_image = transform_to_anime(image_path)
anime_image.save("anime_style.jpg")

cv2.imshow("Anime Style", cv2.imread("anime_style.jpg"))
cv2.waitKey(0)
cv2.destroyAllWindows()
