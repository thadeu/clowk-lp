"""Outlines the brand texts from Nunito into SVG path data, so that the brand
files do not need the font.

Run this only when a text changes. It needs fonttools and uharfbuzz, and the
static Nunito 900 and 800 files from Google Fonts:

    python3 -m venv .venv && .venv/bin/pip install fonttools uharfbuzz
    .venv/bin/python brand/tools/outline_wordmark.py Nunito-900.ttf Nunito-800.ttf

Nunito is under the SIL Open Font License, from github.com/google/fonts.
"""

import json
import pathlib
import sys

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

TEXTS = {
    'wordmark': ('black', 'clowk', -0.03),
    'tagline': ('extra', 'Small tools you run on your own servers', -0.01),
    'products': ('extra', 'Auth · ndb · Voodu · Anway · Cronota', 0),
}


def outline(source, text, tracking):
    font = TTFont(source)
    upem = font['head'].unitsPerEm
    glyphs = font.getGlyphSet()
    names = font.getGlyphOrder()

    shaper = hb.Font(hb.Face(hb.Blob.from_file_path(source)))

    buffer = hb.Buffer()
    buffer.add_str(text)
    buffer.guess_segment_properties()
    hb.shape(shaper, buffer, {'kern': True, 'liga': True})

    pen = SVGPathPen(glyphs)
    bounds = BoundsPen(glyphs)
    count = len(buffer.glyph_infos)
    x = 0.0

    for index, (info, position) in enumerate(zip(buffer.glyph_infos, buffer.glyph_positions)):
        transform = (1, 0, 0, -1, x + position.x_offset, -position.y_offset)
        glyph = glyphs[names[info.codepoint]]
        glyph.draw(TransformPen(pen, transform))
        glyph.draw(TransformPen(bounds, transform))
        x += position.x_advance

        if index < count - 1:
            x += tracking * upem

    return {
        'text': text,
        'font': f'{pathlib.Path(source).stem}, tracking {tracking}em',
        'units_per_em': upem,
        'advance': round(x, 2),
        'x_height': font['OS/2'].sxHeight,
        'cap_height': font['OS/2'].sCapHeight,
        'bounds': [round(value, 2) for value in bounds.bounds],
        'path': pen.getCommands(),
    }


sources = {'black': sys.argv[1], 'extra': sys.argv[2]}
out = pathlib.Path(__file__).with_name('wordmark.json')
result = {name: outline(sources[weight], text, tracking) for name, (weight, text, tracking) in TEXTS.items()}

json.dump(result, out.open('w'), indent=1)

print(out, {name: round(entry['advance']) for name, entry in result.items()})
