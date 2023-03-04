from PIL import Image
import os

for filename in os.scandir("assets"):
    if filename.is_file():
        print(filename.path)
        if(".png" in filename.path):
            im = Image.open(filename.path)
            im.save(filename.path.replace("png", "webp"), format = "WebP", lossless = True)
