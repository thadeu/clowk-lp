"""Builds every Clowk brand SVG in brand/svg from the rules in brand/README.md.

    python3 brand/tools/build.py

The mark is the face, drawn around (0, 0) with a width of 172 units. The
tile puts the face on a coral square: the coral is the hood. The full hood
drawing stays as the mascot, for large uses only. The wordmark paths come
from wordmark.json (see outline_wordmark.py).
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SVG = ROOT / 'svg'
TEXTS = json.loads((ROOT / 'tools' / 'wordmark.json').read_text())

INK = '#0B0B0F'
NIGHT = '#0C0014'
CORAL = '#F43F5E'
CREAM = '#FFF4EC'
WHITE = '#FFFFFF'
MUTED = '#C9C3D4'

FACE_RX = 86
FACE_RY = 74

HOOD = 'M100 14 C128 36 168 80 172 134 C175 168 162 186 140 186 L60 186 C38 186 25 168 28 134 C32 80 72 36 100 14 Z'
FOLD = 'M100 14 C95 42 84 64 64 88'


def face(size='normal'):
    """The face around (0, 0): normal, small (32 px and below) or tiny (16 px, on the tile)."""
    outline = {'normal': 5.7, 'small': 10, 'tiny': 0}[size]
    eye = {'normal': 13, 'small': 16, 'tiny': 18}[size]
    smile = {'normal': 7.3, 'small': 10, 'tiny': 12}[size]
    stroke = f' stroke="{INK}" stroke-width="{outline}"' if outline else ''

    parts = [
        f'<ellipse cx="0" cy="0" rx="{FACE_RX}" ry="{FACE_RY}" fill="{CREAM}"{stroke}/>',
        f'<circle cx="-31.3" cy="-3.9" r="{eye}" fill="{INK}"/>',
        f'<circle cx="31.3" cy="-3.9" r="{eye}" fill="{INK}"/>',
    ]

    if size == 'normal':
        parts += [
            f'<circle cx="-26.6" cy="-8.6" r="4.2" fill="{WHITE}"/>',
            f'<circle cx="36" cy="-8.6" r="4.2" fill="{WHITE}"/>',
        ]

    if size != 'tiny':
        parts += [
            f'<ellipse cx="-55.3" cy="24.7" rx="13.5" ry="7.8" fill="{CORAL}" opacity="0.55"/>',
            f'<ellipse cx="55.3" cy="24.7" rx="13.5" ry="7.8" fill="{CORAL}" opacity="0.55"/>',
        ]

    parts.append(f'<path d="M-13.6 26.5 Q0 39.5 13.6 26.5" fill="none" stroke="{INK}" stroke-width="{smile}" stroke-linecap="round"/>')

    return '\n    '.join(parts)


def face_mono(color):
    """One color: the outline of the face, the eyes and the smile."""
    return '\n    '.join([
        f'<ellipse cx="0" cy="0" rx="{FACE_RX}" ry="{FACE_RY}" fill="none" stroke="{color}" stroke-width="10"/>',
        f'<circle cx="-31.3" cy="-3.9" r="14" fill="{color}"/>',
        f'<circle cx="31.3" cy="-3.9" r="14" fill="{color}"/>',
        f'<path d="M-13.6 26.5 Q0 39.5 13.6 26.5" fill="none" stroke="{color}" stroke-width="9" stroke-linecap="round"/>',
    ])


def place(body, x, y, scale=1):
    return f'<g transform="translate({x:.2f} {y:.2f}) scale({scale:.4f})">\n    {body}\n  </g>'


def tile(size, radius, face_size='normal', coverage=0.645):
    """The coral tile with the face: radius 0 makes it full bleed (iOS rounds it)."""
    scale = size * coverage / (FACE_RX * 2)
    corner = f' rx="{radius:.1f}"' if radius else ''

    return f'<rect width="{size}" height="{size}"{corner} fill="{CORAL}"/>\n  ' + place(face(face_size), size / 2, size * 0.547, scale)


def mascot(halo=None):
    """The full hood drawing, kept for large illustrations only."""
    parts = []

    if halo:
        parts.append(f'<path d="{HOOD}" fill="none" stroke="{halo}" stroke-width="18" stroke-linejoin="round"/>')

    parts += [
        f'<path d="{HOOD}" fill="{CORAL}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>',
        f'<path d="{FOLD}" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round" opacity="0.28"/>',
        place(face(), 100, 128, 44 / FACE_RX),
    ]

    return '\n  '.join(parts)


def svg(view_box, body, width=None, height=None, label='Clowk'):
    size = f' width="{width}" height="{height}"' if width else ''

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}"{size} role="img" aria-label="{label}">\n'
        f'  {body}\n'
        '</svg>\n'
    )


def text(name, color, scale, x, baseline):
    entry = TEXTS[name]
    left = entry['bounds'][0]

    return f'<path transform="translate({x - left * scale:.2f} {baseline}) scale({scale})" fill="{color}" d="{entry["path"]}"/>'


def text_width(name, scale):
    left, _, right, _ = TEXTS[name]['bounds']

    return (right - left) * scale


def text_top(name, scale):
    return -TEXTS[name]['bounds'][1] * scale


def write(name, content):
    (SVG / f'{name}.svg').write_text(content)


FACE_BOX = '-92 -80 184 160'


def marks():
    for tone in ('light', 'dark'):
        write(f'mark-on-{tone}', svg(FACE_BOX, face()))
        write(f'mark-small-on-{tone}', svg(FACE_BOX, face('small')))

    write('mark-ink', svg(FACE_BOX, face_mono(INK)))
    write('mark-white', svg(FACE_BOX, face_mono(WHITE)))
    write('mark-tile', svg('0 0 200 200', tile(200, 45)))
    write('favicon', svg('0 0 200 200', tile(200, 45, 'small', 0.74)))
    write('mascot-on-light', svg('0 0 200 200', mascot()))
    write('mascot-on-dark', svg('0 0 200 200', mascot(halo=WHITE)))


def icons():
    write('app-icon', svg('0 0 1024 1024', tile(1024, 230)))
    write('app-icon-square', svg('0 0 1024 1024', tile(1024, 0)))
    write('favicon-tile', svg('0 0 64 64', tile(64, 14, 'tiny', 0.82)))


WORD_SCALE = 0.149
FACE_HEIGHT = 128
WORD_GAP = 24


def wordmarks():
    width = text_width('wordmark', WORD_SCALE)
    top = text_top('wordmark', WORD_SCALE)
    box = f'0 0 {width:.1f} {top + 4:.1f}'

    for tone, color in (('light', INK), ('dark', WHITE)):
        write(f'wordmark-on-{tone}', svg(box, text('wordmark', color, WORD_SCALE, 0, top), label='clowk'))


def lockups():
    width = text_width('wordmark', WORD_SCALE)
    top = text_top('wordmark', WORD_SCALE)
    face_scale = FACE_HEIGHT / (FACE_RY * 2 + 12)
    face_width = (FACE_RX * 2 + 12) * face_scale
    baseline = top + 2
    face_y = baseline - top / 2 - 2
    total = face_width + WORD_GAP + width

    for tone, color in (('light', INK), ('dark', WHITE)):
        body = place(face(), face_width / 2, face_y, face_scale) + '\n  ' + text('wordmark', color, WORD_SCALE, face_width + WORD_GAP, baseline)
        write(f'lockup-on-{tone}', svg(f'0 {face_y - FACE_HEIGHT / 2:.1f} {total:.1f} {FACE_HEIGHT:.1f}', body))

    stacked_scale = 0.17
    stacked_width = text_width('wordmark', stacked_scale)
    stacked_top = text_top('wordmark', stacked_scale)
    side = max(stacked_width, 184) + 40
    stacked_baseline = 180 + stacked_top

    for tone, color in (('light', INK), ('dark', WHITE)):
        body = place(face(), side / 2, 80) + '\n  ' + text('wordmark', color, stacked_scale, (side - stacked_width) / 2, stacked_baseline)
        write(f'lockup-stacked-on-{tone}', svg(f'0 0 {side:.1f} {stacked_baseline + 8:.1f}', body))


def social_preview():
    word_scale = 0.22
    line_scale = 1008 / text_width('tagline', 1)
    small_scale = 0.034
    word_top = text_top('wordmark', word_scale)

    body = '\n  '.join([
        f'<rect width="1200" height="630" fill="{NIGHT}"/>',
        place(tile(200, 45), 96, 96),
        text('wordmark', WHITE, word_scale, 340, 96 + 100 + word_top / 2),
        text('tagline', WHITE, line_scale, 96, 440),
        text('products', MUTED, small_scale, 96, 510),
        f'<rect x="96" y="548" width="72" height="6" rx="3" fill="{CORAL}"/>',
    ])

    write('social-preview', svg('0 0 1200 630', body, 1200, 630))


SVG.mkdir(exist_ok=True)

for old in ('app-icon-night', 'app-icon-coral', 'app-icon-light'):
    (SVG / f'{old}.svg').unlink(missing_ok=True)

marks()
icons()
wordmarks()
lockups()
social_preview()

print(f'{len(list(SVG.glob("*.svg")))} SVG files in {SVG}')
