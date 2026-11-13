# Puts flat screens inside real device frames and arranges them on a tinted canvas.
# Usage: python3 -I compose.py <spec.json>
import json, sys
from PIL import Image, ImageDraw, ImageFilter

def screen_mask(frame):
    # The screen is the transparent area connected to the centre of the frame.
    a = frame.getchannel("A").point(lambda v: 255 if v < 10 else 0)
    w, h = a.size
    seed = (w // 2, int(h * 0.6))
    ImageDraw.floodfill(a, seed, 128)
    m = a.point(lambda v: 255 if v == 128 else 0)
    return m

def browser_bar(width, height):
    # A light Safari-style toolbar, so the MacBook notch sits over chrome, not over the page.
    bar = Image.new("RGBA", (width, height), (246, 245, 243, 255))
    d = ImageDraw.Draw(bar)
    r = height // 7
    for i, c in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        cx = int(height * 0.6) + i * int(r * 3.2)
        d.ellipse((cx - r, height // 2 - r, cx + r, height // 2 + r), fill=c + (255,))
    w = int(width * 0.34)
    d.rounded_rectangle(((width - w) // 2, int(height * 0.28), (width + w) // 2, int(height * 0.72)), radius=height // 5, fill=(232, 231, 228, 255))
    d.line((0, height - 1, width, height - 1), fill=(225, 223, 220, 255), width=2)
    return bar

def device(frame_path, screen_path, offset_y=0, bar=0):
    frame = Image.open(frame_path).convert("RGBA")
    mask = screen_mask(frame)
    x0, y0, x1, y1 = mask.getbbox()
    shot = Image.open(screen_path).convert("RGBA")
    sw, sh = x1 - x0, y1 - y0
    if bar:
        # Fit the page under the toolbar.
        bh = round(sh * bar)
        scale = sw / shot.width
        page = shot.resize((sw, round(shot.height * scale)), Image.LANCZOS).crop((0, 0, sw, sh - bh))
        shot = Image.new("RGBA", (sw, sh), (255, 255, 255, 255))
        shot.paste(browser_bar(sw, bh), (0, 0))
        shot.paste(page, (0, bh))
    scale = max(sw / shot.width, sh / shot.height)
    shot = shot.resize((round(shot.width * scale), round(shot.height * scale)), Image.LANCZOS)
    left = (shot.width - sw) // 2
    top = min(max(0, offset_y), shot.height - sh)
    shot = shot.crop((left, top, left + sw, top + sh))
    layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    layer.paste(shot, (x0, y0), mask.crop((x0, y0, x1, y1)))
    layer.alpha_composite(frame)
    return layer

spec = json.load(open(sys.argv[1]))
W, H = spec["size"]
canvas = Image.new("RGBA", (W, H), spec["background"])
for d in spec["devices"]:
    img = device(d["frame"], d["screen"], d.get("offset_y", 0), d.get("bar", 0))
    img = img.resize((round(img.width * d["scale"]), round(img.height * d["scale"])), Image.LANCZOS)
    # Soft contact shadow under each device.
    sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
    sh.paste((40, 30, 20, 70), (0, 0), img.getchannel("A"))
    sh = sh.filter(ImageFilter.GaussianBlur(28))
    x, y = d["pos"]
    canvas.alpha_composite(sh, (x, y + 30))
    canvas.alpha_composite(img, (x, y))
canvas.convert("RGB").save(spec["out"], quality=92)
print("saved", spec["out"])
