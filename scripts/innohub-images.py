# Builds every Innohub image from Tari's Figma exports: the animated card tiles, the top collage, the bento
# around the original cover and the close-up panels. Exports live in design-references/innohub-exports. Exports keep their own transparency (rounded corners,
# tilted cards), so shadows follow each shape. Usage: python3 -I scripts/innohub-images.py design-references/innohub-exports .
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC, REPO = sys.argv[1], sys.argv[2]
OUT = REPO + "/public/projects/innohub"
# The brand palette (Tari's palette sheet).
BLUE = (21, 57, 195, 255)  # Azul principal #1539C3
CYAN = (136, 255, 252, 255)  # Cian #88FFFC
DARK = (6, 15, 49, 255)  # Azul oscuro #060F31
ORANGE = (250, 135, 93, 255)  # Naranja #FA875D
MAUVE = (225, 191, 237, 255)  # Malva #E1BFED
NEUTRAL = (249, 249, 249, 255)  # Azul base neutro #F9F9F9
HIGHLIGHT = (240, 240, 240, 255)  # Azul base destacado / Blanco #F0F0F0
JPG = dict(quality=95, subsampling=0)

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


def drop(canvas, img, x, y, shadow=True, strength=50, blur=26):
    if shadow:
        pad = blur * 3
        a = Image.new("L", (img.width + 2 * pad, img.height + 2 * pad), 0)
        a.paste(img.getchannel("A").point(lambda v: strength if v > 100 else 0), (pad, pad + 14))
        a = a.filter(ImageFilter.GaussianBlur(blur))
        s = Image.new("RGBA", a.size, DARK[:3] + (0,))
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
participa, norma, message = load("participa"), load("norma"), load("message")
# The ranking screen with its three cards evened out (scripts/innohub-ranking-even.py).
ranking = load("ranking-even")
mascot, rocket, block = load("mascot"), load("rocket"), load("block")
workshop = Image.open(f"{SRC}/workshop.jpg").convert("RGBA")
FONT = SRC + "/OpenSans-SemiBold.ttf"
FONT_REGULAR = SRC + "/OpenSans-Regular.ttf"

# The export's two right-hand columns carry part of the window behind it: trim them and round the corner again.
welcome = rounded(welcome.crop((0, 0, 1596, welcome.height)), 6)

# The mascot is called Inno here: rewrite the greeting in the export's own type (Open Sans SemiBold, white,
# centred where the original line sat) over the card's own blue.
d = ImageDraw.Draw(welcome)
d.rectangle((640, 562, 966, 616), fill=BLUE)
f = ImageFont.truetype(FONT, 41)
t = "¡Hola, soy Inno!"
bb = f.getbbox(t)
d.text((802.5 - (bb[2] - bb[0]) / 2 - bb[0], 570 - bb[1]), t, font=f, fill=(255, 255, 255, 255))


def empezar(scale):
    """The welcome screen's Empezar button, redrawn at any size from the export's own measurements
    (143 x 63 px, 12 px corners, #F9F9F9 face, Open Sans 24 px in #060F31) so it stays sharp."""
    w, h = round(143 * scale), round(63 * scale)
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(img).rounded_rectangle((0, 0, w - 1, h - 1), radius=round(12 * scale), fill=NEUTRAL)
    f = ImageFont.truetype(FONT_REGULAR, round(24 * scale))
    bb = f.getbbox("Empezar")
    ImageDraw.Draw(img).text(((w - (bb[2] - bb[0])) / 2 - bb[0], (h - (bb[3] - bb[1])) / 2 - bb[1]), "Empezar", font=f, fill=DARK)
    return img


# The nav crop is cut from a plain white sidebar: give it a card shape of its own.
nav = rounded(nav, 22)

# 1. Animated card tiles at full export size: each export whole, with its own transparency (the site shows them with object-contain).
for name, img in [("welcome", welcome), ("ideas", ideas), ("people", people), ("participa", participa),
                  ("norma", norma), ("ranking", ranking)]:
    img.save(f"{OUT}/bento/{name}.webp", "WEBP", quality=95, method=6)

# 2. Top collage, after the Deel cover: mauve panel, photo, mascot on blue, welcome on cyan.
W, H, G = 2400, 1350, 30
c = Image.new("RGBA", (W, H), NEUTRAL)
left = Image.new("RGBA", (760, H), MAUVE)
centre(left, fit(people, w=520), (0, 40, 760, 640))
centre(left, fit(ideas, w=440), (0, 640, 760, 680))
c.alpha_composite(rounded(left, 40), (0, 0))
cw, ch = W - 2 * 760 - 2 * G, (H - G) // 2
c.alpha_composite(rounded(cover_crop(workshop, cw, ch), 40), (760 + G, 0))
blue = Image.new("RGBA", (cw, H - ch - G), BLUE)
centre(blue, fit(mascot, h=470), (0, 0, blue.width, blue.height), shadow=False)
c.alpha_composite(rounded(blue, 40), (760 + G, ch + G))
right = Image.new("RGBA", (760, H), CYAN)
centre(right, fit(welcome, w=680), (0, 0, 760, H))
c.alpha_composite(rounded(right, 40), (W - 760, 0))
c.convert("RGB").save(f"{OUT}/cover-collage.jpg", **JPG)

# 3. Bento around the original cover, in the brand palette. Each export sits on a colour it already uses.
b = Image.new("RGBA", (W, H), HIGHLIGHT)
tile(b, (40, 40, 520, 744), NEUTRAL)
centre(b, fit(nav, w=380), (40, 40, 520, 744))
tile(b, (40, 808, 520, 502), MAUVE)
centre(b, fit(rocket, h=430), (40, 808, 520, 502), shadow=False)
tile(b, (584, 40, 1232, 760), NEUTRAL)
centre(b, rounded(fit(Image.open(f"{REPO}/public/projects/innohub/cover.png").convert("RGBA"), w=1120), 26), (584, 40, 1232, 760))
# The Empezar button on the welcome card's own blue, drawn at 3x rather than enlarged from a crop.
tile(b, (584, 824, 604, 486), BLUE)
centre(b, empezar(2.4), (584, 824, 604, 486))
tile(b, (1212, 824, 604, 486), ORANGE)
centre(b, fit(message, w=480), (1212, 824, 604, 486))
tile(b, (1840, 40, 520, 600), CYAN)
centre(b, fit(ideas, h=500), (1840, 40, 520, 600))
tile(b, (1840, 664, 520, 646), DARK)
centre(b, fit(block, w=400), (1840, 664, 520, 646), shadow=False)
b.convert("RGB").save(f"{OUT}/bento-cover.jpg", **JPG)

# 4. Close-up panels.
def panel(w, h, img, fw, name):
    p = Image.new("RGBA", (w, h), HIGHLIGHT)
    centre(p, fit(img, w=fw), (0, 0, w, h))
    p.convert("RGB").save(f"{OUT}/detail/{name}.jpg", **JPG)

panel(2400, 1100, welcome, 1250, "welcome")
panel(1200, 1500, participa, 760, "participa")
panel(1200, 1500, nav, 520, "nav")
panel(1200, 1500, people, 760, "people")
panel(1200, 1500, ranking, 760, "ranking")
panel(2400, 700, message, 760, "message")
print("done")
