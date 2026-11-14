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

def status_bar(width, height):
    # An iOS status bar (time on the left, battery on the right) around the Dynamic Island.
    bar = Image.new("RGBA", (width, height), (255, 255, 255, 255))
    d = ImageDraw.Draw(bar)
    u = height / 10
    # "9:41" drawn as simple blocks would look fake; use the default font scaled up.
    try:
        from PIL import ImageFont
        f = ImageFont.truetype("DejaVuSans-Bold.ttf", int(height * 0.32))
    except Exception:
        f = None
    d.text((int(width * 0.12), int(height * 0.38)), "9:41", fill=(20, 20, 24, 255), font=f)
    bx, by, bw, bh = int(width * 0.8), int(height * 0.43), int(width * 0.075), int(height * 0.2)
    d.rounded_rectangle((bx, by, bx + bw, by + bh), radius=int(bh * 0.3), outline=(20, 20, 24, 255), width=max(2, int(u * 0.25)))
    d.rounded_rectangle((bx + 4, by + 4, bx + int(bw * 0.7), by + bh - 4), radius=int(bh * 0.2), fill=(20, 20, 24, 255))
    return bar

def device(frame_path, screen_path, offset_y=0, bar=0, status=0):
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
    if status:
        th = round(sh * status)
        scale = sw / shot.width
        page = shot.resize((sw, round(shot.height * scale)), Image.LANCZOS).crop((0, 0, sw, sh - th))
        shot = Image.new("RGBA", (sw, sh), (255, 255, 255, 255))
        shot.paste(status_bar(sw, th), (0, 0))
        shot.paste(page, (0, th))
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
transparent = spec["background"] == "transparent"
canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0) if transparent else spec["background"])
for d in spec["devices"]:
    img = device(d["frame"], d["screen"], d.get("offset_y", 0), d.get("bar", 0), d.get("status", 0))
    img = img.resize((round(img.width * d["scale"]), round(img.height * d["scale"])), Image.LANCZOS)
    # Soft contact shadow under each device.
    # Built on a larger layer so the blur fades out instead of being cut off into a visible box.
    pad = 120
    a = Image.new("L", (img.width + 2 * pad, img.height + 2 * pad), 0)
    a.paste(img.getchannel("A").point(lambda v: 70 if v > 128 else 0), (pad, pad))
    a = a.filter(ImageFilter.GaussianBlur(28))
    sh = Image.new("RGBA", a.size, (40, 30, 20, 0))
    sh.putalpha(a)
    x, y = d["pos"]
    canvas.alpha_composite(sh, (max(0, x - pad), max(0, y + 30 - pad)), (max(0, pad - x), max(0, pad - y - 30)))
    canvas.alpha_composite(img, (x, y))
if transparent:
    # Trim to the devices and their shadow, keeping a small margin, and keep the alpha.
    x0, y0, x1, y1 = canvas.getchannel("A").point(lambda v: 255 if v > 3 else 0).getbbox()
    m = 24
    canvas.crop((max(0, x0 - m), max(0, y0 - m), min(W, x1 + m), min(H, y1 + m))).save(spec["out"], optimize=True)
else:
    canvas.convert("RGB").save(spec["out"], quality=92)
print("saved", spec["out"])
