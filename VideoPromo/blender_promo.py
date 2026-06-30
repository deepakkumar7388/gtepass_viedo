"""
╔══════════════════════════════════════════════════════════════════╗
║   DIGITALPASS PROMO — BLENDER PYTHON SCRIPT                     ║
║   DigitalPass 3D Phone Promo Video Generator                    ║
╠══════════════════════════════════════════════════════════════════╣
║  HOW TO RUN:                                                     ║
║  1. Open Blender (free from blender.org)                        ║
║  2. Go to: Scripting tab (top menu)                             ║
║  3. Click "Open" and select this file                           ║
║  4. Click "Run Script" (▶) button                               ║
║  5. Wait for scene to build (~10 sec)                           ║
║  6. Press Ctrl+F12 to render animation → MP4 saved!            ║
╠══════════════════════════════════════════════════════════════════╣
║  OUTPUT: 1080×1920  (9:16 vertical — YouTube Shorts format)     ║
║  FPS:    30   |   Duration: ~42 seconds                         ║
║  Render: EEVEE (GPU-accelerated, fast render ~2-5 min)          ║
╚══════════════════════════════════════════════════════════════════╝
"""

import bpy
import math
import os
from mathutils import Vector, Euler, Color

# ══════════════════════════════════════════════════════════════════
#  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
#  ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
#  ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
#  ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
#  ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
#   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝
# ══════════════════════════════════════════════════════════════════

ASSETS_DIR = r"C:\MY_PROJECTS\Gate_pas\VideoPromo\assets"
OUTPUT_MP4 = r"C:\MY_PROJECTS\Gate_pas\VideoPromo\render\digitalpass_promo.mp4"

FPS          = 30
SLIDE_DUR    = 3.5   # seconds per slide
SLIDE_FRAMES = int(SLIDE_DUR * FPS)   # 105 frames
TRANS_FRAMES = 12    # transition overlap frames

# ── SLIDE DATA ─────────────────────────────────────────────────────
SLIDES = [
    # type, chip_text, title_line1, title_line2, bt_text, screenshot, theme_color(RGB)
    {
        "type":    "intro",
        "title1":  "SISTEC",
        "title2":  "DIGITAL PASS",
        "sub":     "SMART GATE PASS FOR MODERN CAMPUSES",
        "img":     None,
        "color":   (0.36, 0.42, 1.0),   # blue-purple
        "dur":     int(3.5 * FPS),
    },
    {
        "type":    "slide",
        "chip":    "INTRODUCING",
        "title1":  "SISTEC",
        "title2":  "DIGITAL PASS",
        "bt":      "SMART GATE PASS FOR MODERN CAMPUSES",
        "img":     "s1_splash.jpeg",
        "phone_ry": 0.0,              # phone Y-rotation (degrees)
        "color":   (0.36, 0.42, 1.0),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "FEATURE 01",
        "title1":  "SECURE",
        "title2":  "LOGIN",
        "bt":      "FAST & SAFE ACCESS",
        "img":     "s2_login.jpeg",
        "phone_ry": -25.0,
        "color":   (0.23, 0.51, 1.0),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "FEATURE 02",
        "title1":  "APPLY",
        "title2":  "GATE PASS",
        "bt":      "IN JUST FEW SECONDS",
        "img":     "s3_apply.jpeg",
        "phone_ry": 25.0,
        "color":   (0.04, 0.56, 0.70),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "FEATURE 03",
        "title1":  "NO MORE",
        "title2":  "PAPERWORK",
        "bt":      "DIGITAL APPROVAL SYSTEM",
        "img":     "s4_apply_popup.jpeg",
        "phone_ry": -15.0,
        "color":   (0.04, 0.59, 0.42),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "FEATURE 04",
        "title1":  "SMART",
        "title2":  "VISITOR ENTRY",
        "bt":      "TRACK EVERY VISIT",
        "img":     "s7_visitor_form.jpeg",
        "phone_ry": 0.0,
        "color":   (0.49, 0.22, 0.87),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "FEATURE 05",
        "title1":  "SECURE",
        "title2":  "VERIFICATION",
        "bt":      "REAL-TIME MONITORING",
        "img":     "s5_pending.jpeg",
        "phone_ry": -25.0,
        "color":   (0.88, 0.11, 0.28),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "FEATURE 06",
        "title1":  "MANAGE",
        "title2":  "EVERYTHING",
        "bt":      "FROM ONE DASHBOARD",
        "img":     "s11_dashboard.jpeg",
        "phone_ry": 25.0,
        "color":   (0.85, 0.47, 0.04),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "FEATURE 07",
        "title1":  "TRACK",
        "title2":  "EVERY REQUEST",
        "bt":      "ANYTIME  *  ANYWHERE",
        "img":     "s9_history.jpeg",
        "phone_ry": -15.0,
        "color":   (0.02, 0.71, 0.84),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "GO DIGITAL",
        "title1":  "STOP USING",
        "title2":  "PAPER PASSES",
        "bt":      "JOIN DIGITALPASS TODAY",
        "img":     "s6_approved.jpeg",
        "phone_ry": 0.0,
        "color":   (0.88, 0.11, 0.28),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "ONE PLATFORM",
        "title1":  "ONE",
        "title2":  "APP",
        "bt":      "STUDENTS * FACULTY * SECURITY",
        "img":     "s12_users.jpeg",
        "phone_ry": 25.0,
        "color":   (0.04, 0.59, 0.42),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "BENEFITS",
        "title1":  "FASTER",
        "title2":  "APPROVALS",
        "bt":      "BETTER SECURITY * SMARTER CAMPUS",
        "img":     "s10_allot.jpeg",
        "phone_ry": -20.0,
        "color":   (0.49, 0.22, 0.87),
        "dur":     SLIDE_FRAMES,
    },
    {
        "type":    "slide",
        "chip":    "BUILT FOR CAMPUSES",
        "title1":  "SISTEC",
        "title2":  "DIGITAL PASS",
        "bt":      "SECURE * SMART * EFFICIENT",
        "img":     "s8_visitor_done.jpeg",
        "phone_ry": 0.0,
        "color":   (0.36, 0.42, 1.0),
        "dur":     int(3.7 * FPS),
    },
    {
        "type":    "outro",
        "title1":  "SISTEC",
        "title2":  "DIGITAL PASS",
        "sub":     "THE FUTURE OF CAMPUS ACCESS MANAGEMENT",
        "footer":  "FOR COLLEGES TODAY - READY FOR ORGANIZATIONS TOMORROW",
        "img":     None,
        "color":   (0.43, 0.17, 0.87),
        "dur":     int(4.8 * FPS),
    },
]

TOTAL_FRAMES = sum(s["dur"] for s in SLIDES) + TRANS_FRAMES * len(SLIDES)

# ══════════════════════════════════════════════════════════════════
#  UTILITY FUNCTIONS
# ══════════════════════════════════════════════════════════════════

def clear_scene():
    """Delete all objects and data"""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    # Clear orphan data
    for block in bpy.data.meshes:
        if block.users == 0:
            bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        if block.users == 0:
            bpy.data.materials.remove(block)
    for block in bpy.data.images:
        if block.users == 0:
            bpy.data.images.remove(block)
    print("✓ Scene cleared")


def set_frame(f):
    bpy.context.scene.frame_set(f)


def insert_kf(obj, data_path, frame, index=-1):
    obj.keyframe_insert(data_path=data_path, frame=frame, index=index)


def make_easing(fcurve, interp='BEZIER', easing='EASE_IN_OUT'):
    """Apply easing to all keyframe points in an fcurve"""
    for kp in fcurve.keyframe_points:
        kp.interpolation = interp
        kp.easing = easing


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))

# ══════════════════════════════════════════════════════════════════
#  SCENE SETUP
# ══════════════════════════════════════════════════════════════════

def setup_scene():
    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end   = TOTAL_FRAMES
    scene.render.fps  = FPS

    # Resolution — 9:16 vertical (YouTube Shorts) — 50% for speed
    scene.render.resolution_x = 1080
    scene.render.resolution_y = 1920
    scene.render.resolution_percentage = 50   # 540×960 — fast render
    # Change to 100 for full 1080×1920 quality (renders ~4x slower)

    # ── EEVEE Render Engine (Blender 5.1 compatible) ──
    scene.render.engine = 'BLENDER_EEVEE'
    eevee = scene.eevee
    # Blender 5.x: bloom moved to compositor, use safe attributes only
    try: eevee.use_gtao = True
    except: pass
    try: eevee.gtao_distance = 0.3
    except: pass
    try: eevee.taa_render_samples = 64
    except: pass
    try: eevee.use_screen_space_reflections = True
    except: pass

    # ── Output: PNG frames (Blender 5.1 removed FFMPEG output format)
    # After render, frames → MP4 via ffmpeg
    FRAMES_DIR = OUTPUT_MP4.replace("digitalpass_promo.mp4", "frames/")
    os.makedirs(FRAMES_DIR, exist_ok=True)
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode  = 'RGB'
    scene.render.image_settings.compression = 15
    scene.render.filepath = FRAMES_DIR + "frame_"

    # ── World background ──
    world = bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    wn = world.node_tree.nodes
    wn.clear()
    bg = wn.new('ShaderNodeBackground')
    bg.inputs['Color'].default_value    = (0.02, 0.02, 0.06, 1.0)
    bg.inputs['Strength'].default_value = 0.0
    out = wn.new('ShaderNodeOutputWorld')
    world.node_tree.links.new(bg.outputs[0], out.inputs[0])

    print(f"✓ Scene setup: {TOTAL_FRAMES} frames @ {FPS}fps ({TOTAL_FRAMES/FPS:.1f}s)")


# ══════════════════════════════════════════════════════════════════
#  MATERIAL BUILDERS
# ══════════════════════════════════════════════════════════════════

def make_phone_body_mat():
    """Dark glass metallic phone body"""
    mat = bpy.data.materials.new("M_PhoneBody")
    mat.use_nodes = True
    n = mat.node_tree.nodes
    lk = mat.node_tree.links
    n.clear()

    out   = n.new('ShaderNodeOutputMaterial')
    bsdf  = n.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value  = (0.04, 0.04, 0.10, 1.0)
    bsdf.inputs['Metallic'].default_value    = 0.85
    bsdf.inputs['Roughness'].default_value   = 0.12
    # Blender 5.x renamed Specular → Specular IOR Level, Clearcoat → Coat
    for spec_name in ['Specular IOR Level', 'Specular', 'Specular Tint']:
        if spec_name in bsdf.inputs:
            try: bsdf.inputs[spec_name].default_value = 1.0
            except: pass
            break
    for coat_name in ['Coat Weight', 'Clearcoat']:
        if coat_name in bsdf.inputs:
            try: bsdf.inputs[coat_name].default_value = 0.5
            except: pass
            break
    lk.new(bsdf.outputs[0], out.inputs[0])
    return mat


def make_screen_mat(img_path=None, color=(0.04, 0.04, 0.12)):
    """Emissive phone screen — glowing screenshot"""
    mat = bpy.data.materials.new("M_Screen")
    mat.use_nodes = True
    n = mat.node_tree.nodes
    lk = mat.node_tree.links
    n.clear()

    out      = n.new('ShaderNodeOutputMaterial')
    emission = n.new('ShaderNodeEmission')
    mix      = n.new('ShaderNodeMixShader')
    bsdf     = n.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Roughness'].default_value = 0.0
    for spec_name in ['Specular IOR Level', 'Specular']:
        if spec_name in bsdf.inputs:
            try: bsdf.inputs[spec_name].default_value = 1.0
            except: pass
            break

    if img_path and os.path.exists(img_path):
        img_node = n.new('ShaderNodeTexImage')
        try:
            img = bpy.data.images.load(img_path, check_existing=True)
            img_node.image = img
            emission.inputs['Strength'].default_value = 2.5
            lk.new(img_node.outputs['Color'], emission.inputs['Color'])
        except Exception as e:
            print(f"  ⚠ Could not load {img_path}: {e}")
            emission.inputs['Color'].default_value   = (*color, 1.0)
            emission.inputs['Strength'].default_value = 1.5
    else:
        emission.inputs['Color'].default_value   = (*color, 1.0)
        emission.inputs['Strength'].default_value = 1.5

    # Mix emission with glossy for screen glare
    mix.inputs['Fac'].default_value = 0.85
    lk.new(bsdf.outputs[0],     mix.inputs[1])
    lk.new(emission.outputs[0], mix.inputs[2])
    lk.new(mix.outputs[0],      out.inputs[0])
    return mat


def make_notch_mat():
    mat = bpy.data.materials.new("M_Notch")
    mat.use_nodes = True
    n = mat.node_tree.nodes
    lk = mat.node_tree.links
    n.clear()
    out  = n.new('ShaderNodeOutputMaterial')
    bsdf = n.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value  = (0.01, 0.01, 0.02, 1.0)
    bsdf.inputs['Metallic'].default_value    = 0.0
    bsdf.inputs['Roughness'].default_value   = 0.5
    lk.new(bsdf.outputs[0], out.inputs[0])
    return mat


def make_side_mat():
    mat = bpy.data.materials.new("M_Side")
    mat.use_nodes = True
    n = mat.node_tree.nodes
    lk = mat.node_tree.links
    n.clear()
    out  = n.new('ShaderNodeOutputMaterial')
    bsdf = n.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value  = (0.15, 0.15, 0.22, 1.0)
    bsdf.inputs['Metallic'].default_value    = 1.0
    bsdf.inputs['Roughness'].default_value   = 0.08
    lk.new(bsdf.outputs[0], out.inputs[0])
    return mat
    return mat


def make_glow_mat(color=(0.36, 0.42, 1.0), strength=8.0):
    mat = bpy.data.materials.new("M_Glow")
    mat.use_nodes = True
    n = mat.node_tree.nodes
    lk = mat.node_tree.links
    n.clear()
    out      = n.new('ShaderNodeOutputMaterial')
    emission = n.new('ShaderNodeEmission')
    emission.inputs['Color'].default_value    = (*color, 1.0)
    emission.inputs['Strength'].default_value = strength
    lk.new(emission.outputs[0], out.inputs[0])
    return mat


def make_text_mat(color=(1.0, 1.0, 1.0), emissive=False, strength=2.0):
    mat = bpy.data.materials.new("M_Text")
    mat.use_nodes = True
    n = mat.node_tree.nodes
    lk = mat.node_tree.links
    n.clear()
    out = n.new('ShaderNodeOutputMaterial')
    if emissive:
        em = n.new('ShaderNodeEmission')
        em.inputs['Color'].default_value    = (*color, 1.0)
        em.inputs['Strength'].default_value = strength
        lk.new(em.outputs[0], out.inputs[0])
    else:
        bsdf = n.new('ShaderNodeBsdfPrincipled')
        bsdf.inputs['Base Color'].default_value  = (*color, 1.0)
        bsdf.inputs['Roughness'].default_value   = 0.4
        for spec_name in ['Specular IOR Level', 'Specular']:
            if spec_name in bsdf.inputs:
                try: bsdf.inputs[spec_name].default_value = 0.3
                except: pass
                break
        lk.new(bsdf.outputs[0], out.inputs[0])
    return mat


# ══════════════════════════════════════════════════════════════════
#  PHONE MODEL BUILDER
# ══════════════════════════════════════════════════════════════════

def build_phone():
    """
    Build a realistic phone consisting of:
    - Body (cube + bevel)
    - Screen plane (emissive texture)
    - Notch (pill shape on front top)
    - Side buttons (vol up/dn, power)
    - Home indicator bar
    - Glow sphere behind phone (for cinematic bloom)
    Returns the parent empty object.
    """

    # ── Empty parent (all phone parts parent to this) ──
    bpy.ops.object.empty_add(location=(0, 0, 0))
    parent = bpy.context.active_object
    parent.name = "Phone_Parent"

    # ── Body ──
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    body = bpy.context.active_object
    body.name = "Phone_Body"
    # Phone dims: width=1, depth=0.1, height=2.0 (approx 20:9)
    body.scale = (1.0, 0.1, 2.0)
    bpy.ops.object.transform_apply(scale=True)

    bevel = body.modifiers.new("Bevel", 'BEVEL')
    bevel.width    = 0.08
    bevel.segments = 5
    bevel.limit_method = 'ANGLE'

    body.data.materials.append(make_phone_body_mat())
    body.parent = parent

    # ── Screen ──
    bpy.ops.mesh.primitive_plane_add(
        size=1,
        location=(0, 0.055, 0)
    )
    screen = bpy.context.active_object
    screen.name = "Phone_Screen"
    screen.scale = (0.9, 1.85, 1.0)
    bpy.ops.object.transform_apply(scale=True)
    screen.data.materials.append(make_screen_mat())  # starts blank
    screen.parent = parent

    # ── Notch ──
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=32,
        radius=0.18,
        depth=0.02,
        location=(0, 0.058, 0.85),
        rotation=(math.radians(90), 0, 0)
    )
    notch = bpy.context.active_object
    notch.name = "Phone_Notch"
    notch.scale = (1.0, 0.4, 1.0)
    bpy.ops.object.transform_apply(scale=True)
    notch.data.materials.append(make_notch_mat())
    notch.parent = parent

    # ── Camera dot (in notch) ──
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=16,
        radius=0.04,
        depth=0.025,
        location=(0.09, 0.059, 0.85),
        rotation=(math.radians(90), 0, 0)
    )
    cam_dot = bpy.context.active_object
    cam_dot.name = "Phone_Camera"
    cam_dot.data.materials.append(make_glow_mat((0.2, 0.8, 1.0), 3.0))
    cam_dot.parent = parent

    # ── Side buttons ──
    side_mat = make_side_mat()
    # Vol up
    bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.54, 0, 0.55))
    v_up = bpy.context.active_object
    v_up.name = "Btn_VolUp"
    v_up.scale = (0.04, 0.06, 0.14)
    bpy.ops.object.transform_apply(scale=True)
    v_up.data.materials.append(side_mat)
    v_up.parent = parent
    # Vol down
    bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.54, 0, 0.28))
    v_dn = bpy.context.active_object
    v_dn.name = "Btn_VolDn"
    v_dn.scale = (0.04, 0.06, 0.14)
    bpy.ops.object.transform_apply(scale=True)
    v_dn.data.materials.append(side_mat)
    v_dn.parent = parent
    # Power button
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0.54, 0, 0.35))
    pwr = bpy.context.active_object
    pwr.name = "Btn_Power"
    pwr.scale = (0.04, 0.06, 0.20)
    bpy.ops.object.transform_apply(scale=True)
    pwr.data.materials.append(side_mat)
    pwr.parent = parent

    # ── Home indicator bar ──
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.058, -0.87))
    home = bpy.context.active_object
    home.name = "Phone_HomeBar"
    home.scale = (0.22, 0.005, 0.015)
    bpy.ops.object.transform_apply(scale=True)
    home_mat = make_text_mat((0.8, 0.8, 0.9), emissive=True, strength=1.5)
    home.data.materials.append(home_mat)
    home.parent = parent

    # ── Glow sphere (bloom source behind phone) ──
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=1.2,
        location=(0, -0.3, 0),
        segments=16, ring_count=8
    )
    glow = bpy.context.active_object
    glow.name = "Phone_GlowSphere"
    glow.data.materials.append(make_glow_mat(SLIDES[0]["color"], 1.5))
    glow.parent = parent

    print("✓ Phone model built")
    return parent, screen, glow


# ══════════════════════════════════════════════════════════════════
#  LIGHTING
# ══════════════════════════════════════════════════════════════════

def setup_lights():
    lights = []

    # ── Key light (main front-side) ──
    bpy.ops.object.light_add(type='AREA', location=(3, -3, 4))
    key = bpy.context.active_object
    key.name = "Light_Key"
    key.data.energy = 800
    key.data.size   = 3.0
    key.data.color  = (0.8, 0.9, 1.0)
    key.rotation_euler = Euler((math.radians(45), 0, math.radians(35)), 'XYZ')
    lights.append(key)

    # ── Fill light (soft opposite) ──
    bpy.ops.object.light_add(type='AREA', location=(-3, -2, 2))
    fill = bpy.context.active_object
    fill.name = "Light_Fill"
    fill.data.energy = 200
    fill.data.size   = 5.0
    fill.data.color  = (0.6, 0.7, 1.0)
    fill.rotation_euler = Euler((math.radians(30), 0, math.radians(-40)), 'XYZ')
    lights.append(fill)

    # ── Rim / edge light (back) ──
    bpy.ops.object.light_add(type='SPOT', location=(0, 4, 3))
    rim = bpy.context.active_object
    rim.name = "Light_Rim"
    rim.data.energy        = 400
    rim.data.spot_size     = math.radians(45)
    rim.data.spot_blend    = 0.3
    rim.data.color         = (0.7, 0.5, 1.0)  # purple rim
    rim.rotation_euler     = Euler((math.radians(-60), 0, 0), 'XYZ')
    lights.append(rim)

    # ── Bottom accent (colored bounce light) ──
    bpy.ops.object.light_add(type='AREA', location=(0, -1, -3))
    bot = bpy.context.active_object
    bot.name = "Light_Bottom"
    bot.data.energy = 150
    bot.data.size   = 4.0
    bot.data.color  = (0.4, 0.3, 1.0)
    bot.rotation_euler = Euler((math.radians(90), 0, 0), 'XYZ')
    lights.append(bot)

    print("✓ Lights set up")
    return lights


# ══════════════════════════════════════════════════════════════════
#  CAMERA
# ══════════════════════════════════════════════════════════════════

def setup_camera():
    bpy.ops.object.camera_add(location=(0, -7, 0))
    cam = bpy.context.active_object
    cam.name = "Camera_Main"
    cam.rotation_euler = Euler((math.radians(90), 0, 0), 'XYZ')

    # Perspective with slight telephoto (50mm equiv)
    cam.data.lens        = 50
    cam.data.clip_start  = 0.1
    cam.data.clip_end    = 100
    cam.data.dof.use_dof = True
    cam.data.dof.aperture_fstop = 2.8

    bpy.context.scene.camera = cam
    print("✓ Camera set up")
    return cam


# ══════════════════════════════════════════════════════════════════
#  3D TEXT OBJECTS
# ══════════════════════════════════════════════════════════════════

def add_text_3d(name, text, location, scale=(1,1,1),
                color=(1,1,1), emissive=True, strength=3.0,
                extrude=0.02, bevel=0.004, align='CENTER'):
    bpy.ops.object.text_add(location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.body       = text
    obj.data.align_x    = align
    obj.data.align_y    = 'CENTER'
    obj.data.extrude    = extrude
    obj.data.bevel_depth = bevel
    obj.data.size       = 1.0

    # Font — use built-in or system font
    try:
        obj.data.font = bpy.data.fonts.load(
            "C:\\Windows\\Fonts\\BebasNeue-Regular.ttf", check_existing=True
        )
    except Exception:
        try:
            obj.data.font = bpy.data.fonts.load(
                "C:\\Windows\\Fonts\\impact.ttf", check_existing=True
            )
        except Exception:
            pass  # Use Blender default

    obj.scale = scale
    mat = make_text_mat(color, emissive=emissive, strength=strength)
    obj.data.materials.append(mat)
    return obj


# ══════════════════════════════════════════════════════════════════
#  BACKGROUND PLANE (gradient behind phone)
# ══════════════════════════════════════════════════════════════════

def create_background():
    bpy.ops.mesh.primitive_plane_add(size=20, location=(0, 2, 0))
    bg = bpy.context.active_object
    bg.name = "Background_Plane"
    bg.rotation_euler = Euler((math.radians(90), 0, 0), 'XYZ')

    mat = bpy.data.materials.new("M_Background")
    mat.use_nodes = True
    n = mat.node_tree.nodes
    lk = mat.node_tree.links
    n.clear()

    out      = n.new('ShaderNodeOutputMaterial')
    emission = n.new('ShaderNodeEmission')
    gradient = n.new('ShaderNodeTexGradient')
    gradient.gradient_type = 'RADIAL'
    coord    = n.new('ShaderNodeTexCoord')
    ramp     = n.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].position  = 0.0
    ramp.color_ramp.elements[0].color     = (0.08, 0.05, 0.18, 1.0)
    ramp.color_ramp.elements[1].position  = 1.0
    ramp.color_ramp.elements[1].color     = (0.01, 0.01, 0.04, 1.0)

    lk.new(coord.outputs['Generated'], gradient.inputs['Vector'])
    lk.new(gradient.outputs['Fac'],    ramp.inputs['Fac'])
    lk.new(ramp.outputs['Color'],      emission.inputs['Color'])
    emission.inputs['Strength'].default_value = 0.8
    lk.new(emission.outputs[0], out.inputs[0])

    bg.data.materials.append(mat)
    print("✓ Background created")
    return bg, mat


# ══════════════════════════════════════════════════════════════════
#  PARTICLE DOTS (decorative floating particles for cinematic look)
# ══════════════════════════════════════════════════════════════════

def create_particles():
    import random
    random.seed(42)
    empties = []
    for i in range(40):
        x = random.uniform(-4, 4)
        y = random.uniform(-1, 1)
        z = random.uniform(-4, 4)
        bpy.ops.mesh.primitive_uv_sphere_add(
            radius=random.uniform(0.01, 0.04),
            location=(x, y, z)
        )
        p = bpy.context.active_object
        p.name = f"Particle_{i:03d}"
        c = random.choice([
            (0.36, 0.42, 1.0),
            (0.66, 0.33, 1.0),
            (0.14, 0.82, 0.94),
            (0.98, 0.75, 0.14),
        ])
        p.data.materials.append(make_glow_mat(c, random.uniform(4.0, 12.0)))
        empties.append(p)
    print(f"✓ {len(empties)} particles created")
    return empties


# ══════════════════════════════════════════════════════════════════
#  MAIN ANIMATION  — KEYFRAMES PER SLIDE
# ══════════════════════════════════════════════════════════════════

def animate_all(phone_parent, screen_obj, glow_obj, cam, bg_obj, lights):
    """
    Keyframe everything per slide:
    - Phone: position, rotation, scale
    - Screen: material (screenshot swap via visibility)
    - Camera: position, focal length, dof focus
    - Glow sphere: color, scale
    - Background: color
    - Text: scale (pop-in), position
    """
    scene   = bpy.context.scene
    rim_light = lights[2]  # rim light changes color per slide

    # Pre-create per-slide screen objects for screenshot swapping
    # (We create separate screen material per slide and animate visibility)
    screen_mats = []
    for i, s in enumerate(SLIDES):
        if s.get("img"):
            img_path = os.path.join(ASSETS_DIR, s["img"])
        else:
            img_path = None
        mat = make_screen_mat(
            img_path,
            color=s["color"]
        )
        mat.name = f"ScreenMat_{i:02d}"
        screen_mats.append(mat)

    # Text objects — one set visible per slide
    text_objects = []  # list of dicts per slide

    frame = 1
    for slide_idx, s in enumerate(SLIDES):
        slide_end   = frame + s["dur"] - 1
        color       = s["color"]
        is_intro    = (s["type"] == "intro")
        is_outro    = (s["type"] == "outro")
        is_slide    = (s["type"] == "slide")

        ry_deg = s.get("phone_ry", 0.0)  # phone Y-rotation in degrees

        # ─────────────────────────────────────────────────────────
        # 1. SCREEN MATERIAL SWAP
        # ─────────────────────────────────────────────────────────
        # Remove all mats and assign current slide's mat
        screen_obj.data.materials.clear()
        screen_obj.data.materials.append(screen_mats[slide_idx])

        # ─────────────────────────────────────────────────────────
        # 2. PHONE ANIMATION  (position, rotation, scale)
        # ─────────────────────────────────────────────────────────
        atf  = frame          # animation target frame (start)
        peakf = frame + 18    # peak frame (after entrance bounce)
        midf  = frame + s["dur"] // 2
        endf  = slide_end

        if is_intro:
            # Spin in dramatically
            set_frame(atf)
            phone_parent.location = (0, 0, 0)
            phone_parent.scale    = (0.2, 0.2, 0.2)
            phone_parent.rotation_euler = Euler(
                (0, math.radians(-90), 0), 'XYZ'
            )
            phone_parent.keyframe_insert(data_path="location",       frame=atf)
            phone_parent.keyframe_insert(data_path="scale",          frame=atf)
            phone_parent.keyframe_insert(data_path="rotation_euler", frame=atf)

            set_frame(peakf)
            phone_parent.scale    = (1.1, 1.1, 1.1)
            phone_parent.rotation_euler = Euler(
                (0, math.radians(8), 0), 'XYZ'
            )
            phone_parent.keyframe_insert(data_path="scale", frame=peakf)
            phone_parent.keyframe_insert(data_path="rotation_euler", frame=peakf)

            set_frame(peakf + 12)
            phone_parent.scale    = (1.0, 1.0, 1.0)
            phone_parent.rotation_euler = Euler((0, 0, 0), 'XYZ')
            phone_parent.keyframe_insert(data_path="scale", frame=peakf + 12)
            phone_parent.keyframe_insert(data_path="rotation_euler", frame=peakf + 12)

            # Gentle float during hold
            float_f = peakf + 30
            set_frame(float_f)
            phone_parent.location = (0, 0, 0.08)
            phone_parent.keyframe_insert(data_path="location", frame=float_f)
            set_frame(endf)
            phone_parent.location = (0, 0, 0)
            phone_parent.keyframe_insert(data_path="location", frame=endf)

        elif is_outro:
            # Rise from below + scale
            set_frame(atf)
            phone_parent.location = (0, 0, -3)
            phone_parent.scale    = (0.5, 0.5, 0.5)
            phone_parent.rotation_euler = Euler((0, 0, 0), 'XYZ')
            phone_parent.keyframe_insert(data_path="location", frame=atf)
            phone_parent.keyframe_insert(data_path="scale", frame=atf)
            phone_parent.keyframe_insert(data_path="rotation_euler", frame=atf)

            set_frame(peakf)
            phone_parent.location = (0, 0, 0.15)
            phone_parent.scale    = (1.06, 1.06, 1.06)
            phone_parent.keyframe_insert(data_path="location", frame=peakf)
            phone_parent.keyframe_insert(data_path="scale", frame=peakf)

            set_frame(peakf + 15)
            phone_parent.location = (0, 0, 0)
            phone_parent.scale    = (1.0, 1.0, 1.0)
            phone_parent.keyframe_insert(data_path="location", frame=peakf + 15)
            phone_parent.keyframe_insert(data_path="scale", frame=peakf + 15)

        else:  # normal slide
            ry_rad = math.radians(ry_deg)

            # Entrance
            set_frame(atf)
            phone_parent.location = (0, 0, 0)
            phone_parent.rotation_euler = Euler(
                (0, ry_rad * 1.4, 0), 'XYZ'   # overshoot
            )
            phone_parent.scale = (1.0, 1.0, 1.0)
            phone_parent.keyframe_insert(data_path="location", frame=atf)
            phone_parent.keyframe_insert(data_path="rotation_euler", frame=atf)
            phone_parent.keyframe_insert(data_path="scale", frame=atf)

            # Settle with slight overshoot
            set_frame(peakf)
            phone_parent.rotation_euler = Euler(
                (0, ry_rad, 0), 'XYZ'
            )
            phone_parent.scale = (1.04, 1.04, 1.04)
            phone_parent.keyframe_insert(data_path="rotation_euler", frame=peakf)
            phone_parent.keyframe_insert(data_path="scale", frame=peakf)

            set_frame(peakf + 8)
            phone_parent.scale = (1.0, 1.0, 1.0)
            phone_parent.keyframe_insert(data_path="scale", frame=peakf + 8)

            # Idle float during hold
            float_a = midf - 15
            float_b = midf + 15
            set_frame(float_a)
            phone_parent.location = (0, 0, 0.06)
            phone_parent.keyframe_insert(data_path="location", frame=float_a)
            set_frame(float_b)
            phone_parent.location = (0, 0, -0.06)
            phone_parent.keyframe_insert(data_path="location", frame=float_b)
            set_frame(endf)
            phone_parent.location = (0, 0, 0)
            phone_parent.keyframe_insert(data_path="location", frame=endf)

        # ─────────────────────────────────────────────────────────
        # 3. GLOW COLOR  (matches slide theme)
        # ─────────────────────────────────────────────────────────
        glow_mat = glow_obj.data.materials[0]
        glow_mat.node_tree.nodes['Emission'].inputs['Color'].default_value = \
            (*color, 1.0)
        # Animate glow scale (pulsing)
        set_frame(atf)
        glow_obj.scale = (1.0, 1.0, 1.0)
        glow_obj.keyframe_insert(data_path="scale", frame=atf)
        set_frame(midf)
        glow_obj.scale = (1.4, 1.4, 1.4)
        glow_obj.keyframe_insert(data_path="scale", frame=midf)
        set_frame(endf)
        glow_obj.scale = (1.0, 1.0, 1.0)
        glow_obj.keyframe_insert(data_path="scale", frame=endf)

        # ─────────────────────────────────────────────────────────
        # 4. CAMERA ANIMATION  — cinematic dolly + slight orbit
        # ─────────────────────────────────────────────────────────
        orbit_x = 0.3 * math.sin(slide_idx * 0.7)  # gentle orbit
        orbit_z = 0.2 * math.cos(slide_idx * 0.5)

        set_frame(atf)
        cam.location = (orbit_x, -7.5, orbit_z)
        cam.data.lens = 48 + slide_idx % 3 * 4  # vary focal length slightly
        cam.keyframe_insert(data_path="location", frame=atf)

        set_frame(endf)
        cam.location = (orbit_x * 0.5, -6.8, orbit_z * 0.5)
        cam.keyframe_insert(data_path="location", frame=endf)

        # ─────────────────────────────────────────────────────────
        # 5. RIM LIGHT COLOR — matches theme
        # ─────────────────────────────────────────────────────────
        rim_light.data.color = color

        # ─────────────────────────────────────────────────────────
        # 6. TEXT OBJECTS for this slide
        # ─────────────────────────────────────────────────────────
        slide_texts = {}

        if is_intro:
            # Big centered logo text
            t_logo = add_text_3d(
                f"Text_Intro_Logo_{slide_idx}",
                "SISTec Digital Pass",
                location=(0, -0.5, 2.2),
                scale=(0.32, 0.32, 0.32),
                color=(1.0, 1.0, 1.0),
                emissive=True,
                strength=3.0,
                extrude=0.04,
            )
            slide_texts["logo"] = t_logo

            t_sub = add_text_3d(
                f"Text_Intro_Sub_{slide_idx}",
                "SMART GATE PASS FOR MODERN CAMPUSES",
                location=(0, -0.5, 1.6),
                scale=(0.09, 0.09, 0.09),
                color=(*color, ),
                emissive=True,
                strength=4.0,
                extrude=0.01,
            )
            slide_texts["sub"] = t_sub

        elif is_outro:
            t_logo = add_text_3d(
                f"Text_Outro_Logo_{slide_idx}",
                "SISTec Digital Pass",
                location=(0, -0.5, 2.5),
                scale=(0.32, 0.32, 0.32),
                color=(1.0, 1.0, 1.0),
                emissive=True,
                strength=4.0,
                extrude=0.05,
            )
            slide_texts["logo"] = t_logo

            t_tag = add_text_3d(
                f"Text_Outro_Tag_{slide_idx}",
                "SECURE  *  SMART  *  EFFICIENT",
                location=(0, -0.5, 1.9),
                scale=(0.11, 0.11, 0.11),
                color=(*color,),
                emissive=True,
                strength=5.0,
                extrude=0.02,
            )
            slide_texts["tag"] = t_tag

            t_foot = add_text_3d(
                f"Text_Outro_Footer_{slide_idx}",
                "FOR COLLEGES TODAY - READY FOR ORGANIZATIONS TOMORROW",
                location=(0, -0.5, 1.4),
                scale=(0.065, 0.065, 0.065),
                color=(0.7, 0.7, 0.8),
                emissive=True,
                strength=2.0,
                extrude=0.008,
            )
            slide_texts["footer"] = t_foot

        else:
            # Chip badge
            t_chip = add_text_3d(
                f"Text_Chip_{slide_idx}",
                s.get("chip", ""),
                location=(0, -0.5, 2.55),
                scale=(0.09, 0.09, 0.09),
                color=(*color,),
                emissive=True,
                strength=5.0,
                extrude=0.01,
            )
            slide_texts["chip"] = t_chip

            # Title line 1
            t_t1 = add_text_3d(
                f"Text_Title1_{slide_idx}",
                s.get("title1", ""),
                location=(0, -0.5, 2.3),
                scale=(0.28, 0.28, 0.28),
                color=(1.0, 1.0, 1.0),
                emissive=True,
                strength=3.5,
                extrude=0.04,
            )
            slide_texts["t1"] = t_t1

            # Title line 2
            t_t2 = add_text_3d(
                f"Text_Title2_{slide_idx}",
                s.get("title2", ""),
                location=(0, -0.5, 1.95),
                scale=(0.28, 0.28, 0.28),
                color=(1.0, 1.0, 1.0),
                emissive=True,
                strength=3.5,
                extrude=0.04,
            )
            slide_texts["t2"] = t_t2

            # Bottom text
            t_bt = add_text_3d(
                f"Text_BtMain_{slide_idx}",
                s.get("bt", ""),
                location=(0, -0.5, -2.3),
                scale=(0.09, 0.09, 0.09),
                color=(*color,),
                emissive=True,
                strength=4.5,
                extrude=0.01,
            )
            slide_texts["bt"] = t_bt

        # ── TEXT ANIMATION  (scale pop-in, hold, fade out) ──
        for key, tobj in slide_texts.items():
            # Start invisible (scale=0) — BEFORE slide
            hide_f    = atf - 2
            appear_f  = atf + 8    # pop in fast
            peak_f    = atf + 18   # slight overshoot settle
            hold_f    = endf - 10  # start fade out
            gone_f    = endf + TRANS_FRAMES

            set_frame(hide_f)
            tobj.scale = (0.0, 0.0, 0.0)
            tobj.keyframe_insert(data_path="scale", frame=hide_f)

            set_frame(appear_f)
            overshoot_scale = 1.18
            tobj.scale = (overshoot_scale, overshoot_scale, overshoot_scale)
            tobj.keyframe_insert(data_path="scale", frame=appear_f)

            set_frame(peak_f)
            tobj.scale = (1.0, 1.0, 1.0)
            tobj.keyframe_insert(data_path="scale", frame=peak_f)

            # Hold at 1.0 during slide
            set_frame(hold_f)
            tobj.scale = (1.0, 1.0, 1.0)
            tobj.keyframe_insert(data_path="scale", frame=hold_f)

            # Fade out
            set_frame(gone_f)
            tobj.scale = (0.0, 0.0, 0.0)
            tobj.keyframe_insert(data_path="scale", frame=gone_f)

        text_objects.append(slide_texts)

        # Advance frame counter
        frame = slide_end + 1 + TRANS_FRAMES

        print(f"  Slide {slide_idx+1:02d}/{len(SLIDES)} animated (frames {frame-s['dur']-TRANS_FRAMES}–{slide_end})")

    print(f"\n✓ All {len(SLIDES)} slides animated! Total frames: {frame}")


# ══════════════════════════════════════════════════════════════════
#  SMOOTH KEYFRAMES — apply BEZIER easing to all fcurves
# ══════════════════════════════════════════════════════════════════

def smooth_all_fcurves():
    """Make all animations use smooth bezier easing — Blender 4/5 compatible"""
    for obj in bpy.data.objects:
        if not (obj.animation_data and obj.animation_data.action):
            continue
        action = obj.animation_data.action
        # Try legacy API (Blender ≤4.3)
        try:
            fcurves = action.fcurves
            for fc in fcurves:
                for kp in fc.keyframe_points:
                    kp.interpolation = 'BEZIER'
                    kp.handle_left_type  = 'AUTO_CLAMPED'
                    kp.handle_right_type = 'AUTO_CLAMPED'
        except AttributeError:
            # Blender 5.x layered action API
            try:
                for layer in action.layers:
                    for strip in layer.strips:
                        for channelbag in strip.channelbags:
                            for fc in channelbag.fcurves:
                                for kp in fc.keyframe_points:
                                    kp.interpolation = 'BEZIER'
                                    kp.handle_left_type  = 'AUTO_CLAMPED'
                                    kp.handle_right_type = 'AUTO_CLAMPED'
            except Exception as e:
                print(f"  Note: Could not smooth {obj.name}: {e}")
    print("✓ All fcurves smoothed (BEZIER AUTO_CLAMPED)")


# ══════════════════════════════════════════════════════════════════
#  RENDER SETUP
# ══════════════════════════════════════════════════════════════════

def finalize_render():
    scene = bpy.context.scene

    # Ensure output dir exists
    os.makedirs(os.path.dirname(OUTPUT_MP4), exist_ok=True)

    # EEVEE quality boost — only safe attributes
    eevee = scene.eevee
    try: eevee.taa_render_samples = 128
    except: pass

    # Color management — AgX is default in Blender 4+/5+
    try:
        scene.view_settings.view_transform = 'AgX'
        scene.view_settings.look           = 'AgX - High Contrast'
    except Exception:
        try:
            scene.view_settings.view_transform = 'Filmic'
            scene.view_settings.look           = 'High Contrast'
        except Exception:
            pass
    scene.view_settings.exposure = 0.3
    scene.view_settings.gamma    = 1.1

    print(f"\n✅ RENDER READY!")
    print(f"   Output:  {OUTPUT_MP4}")
    print(f"   Frames:  {scene.frame_start} → {scene.frame_end}")
    print(f"   Size:    {scene.render.resolution_x}×{scene.render.resolution_y}")
    print(f"   FPS:     {scene.render.fps}")


# ══════════════════════════════════════════════════════════════════
#  MAIN  ──  ASSEMBLE EVERYTHING + RENDER + ASSEMBLE MP4
# ══════════════════════════════════════════════════════════════════

def main():
    print("\n" + "═"*60)
    print("  DIGITALPASS PROMO — Blender Python Build Script")
    print("═"*60 + "\n")

    # 1. Clear scene
    clear_scene()

    # 2. Scene render settings
    setup_scene()

    # 3. Background
    bg_obj, bg_mat = create_background()

    # 4. Phone model
    phone_parent, screen_obj, glow_obj = build_phone()

    # 5. Cinematic lights
    lights = setup_lights()

    # 6. Camera
    cam = setup_camera()

    # 7. Decorative particles
    create_particles()

    # 8. Keyframe animate everything
    print("\n⚡ Generating keyframes for all slides...")
    animate_all(phone_parent, screen_obj, glow_obj, cam, bg_obj, lights)

    # 9. Smooth all curves
    smooth_all_fcurves()

    # 10. Finalize render settings
    finalize_render()

    print("\n⚡ Starting animation render (PNG frames)...")
    print("   This will take a few minutes. Please wait...")
    bpy.ops.render.render(animation=True)

    # 11. Assemble frames → MP4 using ffmpeg
    frames_dir = OUTPUT_MP4.replace("digitalpass_promo.mp4", "frames/")
    frame_pattern = frames_dir + "frame_%04d.png"
    print(f"\n⚡ Assembling MP4 from frames...")
    import subprocess
    ffmpeg_cmds = [
        # Try system ffmpeg first
        "ffmpeg",
        # Then Blender's bundled ffmpeg
        r"C:\Program Files\Blender Foundation\Blender 5.1\ffmpeg.exe",
    ]
    success = False
    for ffmpeg in ffmpeg_cmds:
        try:
            result = subprocess.run([
                ffmpeg, "-y",
                "-framerate", str(FPS),
                "-i", frame_pattern,
                "-c:v", "libx264",
                "-preset", "fast",
                "-crf", "18",
                "-pix_fmt", "yuv420p",
                OUTPUT_MP4
            ], capture_output=True, text=True, timeout=300)
            if result.returncode == 0:
                print(f"✅ MP4 created: {OUTPUT_MP4}")
                success = True
                break
            else:
                print(f"  ffmpeg error: {result.stderr[:200]}")
        except FileNotFoundError:
            continue
        except Exception as e:
            print(f"  Error: {e}")

    if not success:
        print("\n⚠ ffmpeg not found in PATH.")
        print("  PNG frames are at:", frames_dir)
        print("  Run this command manually to get MP4:")
        print(f'  ffmpeg -framerate {FPS} -i "{frame_pattern}" -c:v libx264 -crf 18 -pix_fmt yuv420p "{OUTPUT_MP4}"')

    print("\n" + "═"*60)
    print("  BUILD COMPLETE!")
    print("═"*60)


# Run it!
main()


