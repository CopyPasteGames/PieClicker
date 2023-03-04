from PIL import Image
import os

for filename in os.scandir("assets"):
    if filename.is_file():
        if(".png" in filename):
            im = Image.open(filename)
            im.save(filename.replace("png", "webp"), format = "WebP", lossless = True)
