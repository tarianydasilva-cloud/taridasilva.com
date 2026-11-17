# Builds every Innohub image from Tari's Figma exports: the animated card tiles, the top collage, the bento
# around the original cover and the close-up panels. Exports live in design-references/innohub-exports. Exports keep their own transparency (rounded corners,
# tilted cards), so shadows follow each shape. Usage: python3 -I scripts/innohub-images.py design-references/innohub-exports .
import sys
from PIL import Image, ImageDraw, ImageFilter

SRC, REPO = sys.argv[1], sys.argv[2]
OUT = REPO + "/public/projects/innohub"
BLUE = (21, 57, 195, 255)
CYAN = (127, 243, 255, 255)
SOFT = (207, 217, 255, 255)
LIGHT = (238, 241, 253, 255)
PANEL = (216, 223, 250, 255)
DETAIL = (236, 238, 248, 255)


def load(name):
    return Image.open(f"{SRC}/{name}.png").convert("RGBA")


def fit(img, w=None, h=None):
    s = (w / img.width) if w else (h / img.height)
    return img.resize((max(1, round(img.width * s)), max(1, round(img.height * s))), Image.LANCZOS)


def rounded(img, r):
    m = Image.new("L", img.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, img.width - 1, img.height - 1), radius=r, fill=255)
    a = Image.composite(img.getchannel("A"), Image.new("L", img.size, 0), m)
    out = img.copy()
    out.putalpha(a)
    return out


def drop(canvas, img, x, y, shadow=True, strength=60, blur=26):
    if shadow:
        pad = blur * 3
        a = Image.new("L", (img.width + 2 * pad, img.height + 2 * pad), 0)
        a.paste(img.getchannel("A").point(lambda v: strength if v > 100 else 0), (pad, pad + 14))
        a = a.filter(ImageFilter.GaussianBlur(blur))
        s = Image.new("RGBA", a.size, (20, 40, 130, 0))
        s.putalpha(a)
        canvas.alpha_composite(s, (x - pad, y - pad))
    canvas.alpha_composite(img, (x, y))


def centre(canvas, img, box, shadow=True):
    x, y, w, h = box
    drop(canvas, img, x + (w - img.width) // 2, y + (h - img.height) // 2, shadow)


def tile(canvas, box, fill, r=34):
    x, y, w, h = box
    t = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(t).rounded_rectangle((0, 0, w - 1, h - 1), radius=r, fill=fill)
    canvas.alpha_composite(t, (x, y))


def cover_crop(img, w, h):
    s = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    x, y = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((x, y, x + w, y + h))


nav, people, ideas, welcome = load("nav"), load("people"), load("ideas"), load("welcome")
participa, norma, ranking, message = load("participa"), load("norma"), load("ranking"), load("message")
mascot, rocket, block = load("mascot"), load("rocket"), load("block")
workshop = Image.open(f"{SRC}/workshop.jpg").convert("RGBA")
# The nav crop is cut from a plain white sidebar: give it a card shape of its own.
nav = rounded(nav, 22)

# 1. Animated card tiles (object-cover, top-aligned inside rounded tiles on the site).
for name, img in [("welcome", welcome), ("ideas", ideas), ("people", people), ("participa", participa),
                  ("norma", norma), ("ranking", ranking)]:
    flat = Image.new("RGBA", img.size, (255, 255, 255, 255))
    flat.alpha_composite(img)
    fit(flat.convert("RGB"), w=900 if img.width > 900 else img.width).save(f"{OUT}/bento/{name}.webp", "WEBP", quality=92, method=6)

# 2. Top collage, after the Deel cover: soft blue panel, photo, mascot on blue, welcome on cyan.
W, H, G = 2400, 1350, 30
c = Image.new("RGBA", (W, H), (255, 255, 255, 255))
left = Image.new("RGBA", (760, H), SOFT)
drop(left, fit(nav, w=230), 60, 420)
drop(left, fit(people, w=400), 320, 120)
drop(left, fit(ideas, w=400), 320, 720)
c.alpha_composite(rounded(left, 40), (0, 0))
cw, ch = W - 2 * 760 - 2 * G, (H - G) // 2
c.alpha_composite(rounded(cover_crop(workshop, cw, ch), 40), (760 + G, 0))
blue = Image.new("RGBA", (cw, H - ch - G), BLUE)
centre(blue, fit(mascot, h=470), (0, 0, blue.width, blue.height), shadow=False)
c.alpha_composite(rounded(blue, 40), (760 + G, ch + G))
right = Image.new("RGBA", (760, H), CYAN)
centre(right, fit(welcome, w=640), (0, 0, 760, H))
c.alpha_composite(rounded(right, 40), (W - 760, 0))
c.convert("RGB").save(f"{OUT}/cover-collage.jpg", quality=92)

# 3. Bento around the original cover.
b = Image.new("RGBA", (W, H), PANEL)
tile(b, (40, 40, 520, 744), LIGHT)
centre(b, fit(nav, w=380), (40, 40, 520, 744))
tile(b, (40, 808, 520, 502), BLUE)
centre(b, fit(rocket, h=430), (40, 808, 520, 502), shadow=False)
tile(b, (584, 40, 1232, 760), LIGHT)
centre(b, rounded(fit(Image.open(f"{REPO}/public/projects/innohub/cover.png").convert("RGBA"), w=1120), 26), (584, 40, 1232, 760))
tile(b, (584, 824, 604, 486), LIGHT)
sx = welcome.width / 1600  # Empezar button, from the welcome export
button = welcome.crop((750, 848, 890, 925))
centre(b, rounded(fit(button, w=330), 14), (584, 824, 604, 486))
tile(b, (1212, 824, 604, 486), BLUE)
centre(b, fit(message, w=480), (1212, 824, 604, 486))
tile(b, (1840, 40, 520, 600), LIGHT)
centre(b, fit(ideas, h=500), (1840, 40, 520, 600))
tile(b, (1840, 664, 520, 646), BLUE)
centre(b, fit(block, w=400), (1840, 664, 520, 646), shadow=False)
b.convert("RGB").save(f"{OUT}/bento-cover.jpg", quality=92)

# 4. Close-up panels.
def panel(w, h, img, fw, name):
    p = Image.new("RGBA", (w, h), DETAIL)
    centre(p, fit(img, w=fw), (0, 0, w, h))
    p.convert("RGB").save(f"{OUT}/detail/{name}.jpg", quality=92)

panel(2400, 1100, welcome, 1250, "welcome")
panel(1200, 1500, participa, 760, "participa")
panel(1200, 1500, nav, 520, "nav")
panel(1200, 1500, people, 760, "people")
panel(1200, 1500, ranking, 760, "ranking")
panel(2400, 700, message, 760, "message")
print("done")
