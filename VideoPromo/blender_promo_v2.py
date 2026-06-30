"""
╔══════════════════════════════════════════════════════════════╗
║  SISTec Digital Pass — PREMIUM 3D PROMO VIDEO               ║
║  Blender 5.1 + Python + FFmpeg                              ║
║                                                              ║
║  Style : Premium SaaS Product Ad (White, Clean, Modern)     ║
║  Device: Samsung Galaxy S24 Ultra 3D Mockup                 ║
║  Format: 9:16 (1080×1920) • 30fps • ~35 seconds             ║
║  Colors: White + Blue (#1A73E8) + Purple (#7C3AED)          ║
║                                                              ║
║  RUN:  blender --background --python blender_promo_v2.py    ║
╚══════════════════════════════════════════════════════════════╝
"""

import bpy
import bmesh
import math
import os
import random
from mathutils import Vector, Euler

# ═════════════════════════════════════════════════════════════
#  CONFIG
# ═════════════════════════════════════════════════════════════

ASSETS  = r"C:\MY_PROJECTS\Gate_pas\VideoPromo\assets"
OUT_DIR = r"C:\MY_PROJECTS\Gate_pas\VideoPromo\render"
OUT_MP4 = os.path.join(OUT_DIR, "sistec_digital_pass_promo.mp4")
FRAMES  = os.path.join(OUT_DIR, "frames", "f_")

FPS = 30

# Font: Arial Bold (fallback chain)
FONT_PATHS = [
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\impact.ttf",
    r"C:\Windows\Fonts\arial.ttf",
]

# Brand colors
BLUE   = (0.102, 0.451, 0.910)   # #1A73E8
PURPLE = (0.486, 0.228, 0.929)   # #7C3AED
WHITE  = (1.0, 1.0, 1.0)
GRAY80 = (0.8, 0.8, 0.82)
GRAY50 = (0.5, 0.5, 0.52)
DARK   = (0.12, 0.12, 0.18)

# ═══ SCENE DEFINITIONS ═══
# Each: (dur_sec, screenshot, title_lines[], subtitle, phone_rot_y, cam_style)
SCENES = [
    # S01 — Intro
    { "dur": 2.8, "img": "s1_splash.jpeg",
      "t1": "SISTec Digital Pass", "t2": "", "sub": "SMART  •  SECURE  •  PAPERLESS",
      "pry": 0, "cam": "intro" },
    # S02 — Login
    { "dur": 2.2, "img": "s2_login.jpeg",
      "t1": "DIGITAL LOGIN", "t2": "FAST AND SECURE ACCESS", "sub": "FOR EVERY USER",
      "pry": -12, "cam": "zoom_in" },
    # S03 — Student Dashboard
    { "dur": 2.2, "img": "s3_apply.jpeg",
      "t1": "MANAGE", "t2": "STUDENTS • STAFF • SECURITY", "sub": "FROM ONE PLATFORM",
      "pry": 18, "cam": "slide_r" },
    # S04 — Apply Gate Pass
    { "dur": 2.2, "img": "s4_apply_popup.jpeg",
      "t1": "CREATE", "t2": "DIGITAL GATE PASSES", "sub": "IN SECONDS",
      "pry": -15, "cam": "slide_l" },
    # S05 — Gate Pass Details
    { "dur": 2.2, "img": "s5_pending.jpeg",
      "t1": "REAL-TIME", "t2": "PASS APPROVALS", "sub": "ANYTIME  •  ANYWHERE",
      "pry": 10, "cam": "zoom_in" },
    # S06 — Visitor Registration
    { "dur": 2.2, "img": "s7_visitor_form.jpeg",
      "t1": "VISITOR", "t2": "REGISTRATION SYSTEM", "sub": "WITH PHOTO VERIFICATION",
      "pry": -18, "cam": "slide_r" },
    # S07 — Visitor Meet
    { "dur": 2.2, "img": "s8_visitor_done.jpeg",
      "t1": "SMART", "t2": "VISITOR MANAGEMENT", "sub": "FOR MODERN CAMPUSES",
      "pry": 12, "cam": "slide_l" },
    # S08 — Security Guard
    { "dur": 2.0, "img": "s10_allot.jpeg",
      "t1": "ASSIGN", "t2": "SECURITY GUARDS", "sub": "WITH COMPLETE CONTROL",
      "pry": -10, "cam": "zoom_in" },
    # S09 — User Management
    { "dur": 2.0, "img": "s12_users.jpeg",
      "t1": "MANAGE", "t2": "USERS • ROLES • PERMISSIONS", "sub": "EASILY",
      "pry": 15, "cam": "slide_r" },
    # S10 — Admin Dashboard (Batch/Dept)
    { "dur": 2.0, "img": "s11_dashboard.jpeg",
      "t1": "ORGANIZE", "t2": "BATCHES • DEPARTMENTS", "sub": "AND CAMPUSES",
      "pry": -15, "cam": "slide_l" },
    # S11 — Pass History
    { "dur": 2.0, "img": "s9_history.jpeg",
      "t1": "TRACK", "t2": "EVERY ENTRY & EXIT", "sub": "IN REAL TIME",
      "pry": 10, "cam": "zoom_in" },
    # S12 — Approved Pass (Analytics view)
    { "dur": 2.0, "img": "s6_approved.jpeg",
      "t1": "VIEW", "t2": "PASS HISTORY", "sub": "AND ANALYTICS",
      "pry": -12, "cam": "slide_r" },
    # S13 — Profile
    { "dur": 2.0, "img": "s13_profile.jpeg",
      "t1": "ALL USER INFORMATION", "t2": "IN ONE PLACE", "sub": "",
      "pry": 0, "cam": "zoom_in" },
    # S14 — Go Digital CTA
    { "dur": 2.5, "img": "s14_student_detail.jpeg",
      "t1": "STOP USING PAPER PASSES", "t2": "GO DIGITAL", "sub": "WITH SISTec DIGITAL PASS",
      "pry": 0, "cam": "orbit" },
    # S15 — One App
    { "dur": 2.5, "img": "s1_splash.jpeg",
      "t1": "ONE APP", "t2": "FOR EVERYONE", "sub": "STUDENTS • FACULTY • SECURITY • ADMIN",
      "pry": 15, "cam": "slide_l" },
    # S16 — Final Logo
    { "dur": 3.0, "img": "s1_splash.jpeg",
      "t1": "SISTec Digital Pass", "t2": "SECURE ACCESS • SMART MANAGEMENT", "sub": "SEAMLESS EXPERIENCE",
      "pry": 0, "cam": "outro" },
    # S17 — CTA
    { "dur": 3.5, "img": None,
      "t1": "SISTec Digital Pass", "t2": "The Future of Campus", "sub": "Access Management",
      "pry": 0, "cam": "cta" },
]

SCENE_FRAMES = []
total = 1
for s in SCENES:
    nf = int(s["dur"] * FPS)
    SCENE_FRAMES.append((total, total + nf - 1, nf))
    total += nf
TOTAL_FRAMES = total - 1

# ═════════════════════════════════════════════════════════════
#  HELPERS
# ═════════════════════════════════════════════════════════════

def safe_set(obj, attr, val):
    try: setattr(obj, attr, val)
    except: pass

def kf(obj, path, frame):
    try: obj.keyframe_insert(data_path=path, frame=frame)
    except: pass

def load_font():
    for fp in FONT_PATHS:
        if os.path.exists(fp):
            try: return bpy.data.fonts.load(fp, check_existing=True)
            except: continue
    return None

def load_img(name):
    if not name: return None
    p = os.path.join(ASSETS, name)
    if os.path.exists(p):
        try: return bpy.data.images.load(p, check_existing=True)
        except: pass
    return None

# ═════════════════════════════════════════════════════════════
#  CLEAR SCENE
# ═════════════════════════════════════════════════════════════

def clear_all():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    for c in [bpy.data.meshes, bpy.data.materials, bpy.data.images,
              bpy.data.cameras, bpy.data.lights, bpy.data.fonts,
              bpy.data.curves, bpy.data.textures]:
        for b in list(c):
            if b.users == 0:
                c.remove(b)
    print("✓ Scene cleared")

# ═════════════════════════════════════════════════════════════
#  SCENE SETUP
# ═════════════════════════════════════════════════════════════

def setup_scene():
    sc = bpy.context.scene
    sc.frame_start = 1
    sc.frame_end   = TOTAL_FRAMES
    sc.render.fps  = FPS

    # 9:16 at 50% for speed (540×960)
    sc.render.resolution_x = 1080
    sc.render.resolution_y = 1920
    sc.render.resolution_percentage = 50

    # EEVEE
    sc.render.engine = 'BLENDER_EEVEE'
    eevee = sc.eevee
    safe_set(eevee, 'taa_render_samples', 48)

    # PNG output
    os.makedirs(os.path.dirname(FRAMES), exist_ok=True)
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_mode  = 'RGB'
    sc.render.image_settings.compression = 15
    sc.render.filepath = FRAMES

    # WHITE world background
    world = bpy.data.worlds.new("W_White")
    sc.world = world
    world.use_nodes = True
    wn = world.node_tree.nodes
    wn.clear()
    bg = wn.new('ShaderNodeBackground')
    bg.inputs['Color'].default_value    = (0.98, 0.98, 1.0, 1.0)
    bg.inputs['Strength'].default_value = 1.5
    out = wn.new('ShaderNodeOutputWorld')
    world.node_tree.links.new(bg.outputs[0], out.inputs[0])

    # Color management
    try:
        sc.view_settings.view_transform = 'Standard'
        sc.view_settings.look = 'None'
    except:
        pass
    sc.view_settings.exposure = 0.0
    sc.view_settings.gamma    = 1.0

    print(f"✓ Scene: {TOTAL_FRAMES} frames ({TOTAL_FRAMES/FPS:.1f}s) @ {FPS}fps")

# ═════════════════════════════════════════════════════════════
#  MATERIALS
# ═════════════════════════════════════════════════════════════

def mat_principled(name, color, metallic=0, rough=0.5, spec=0.5):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    n = m.node_tree.nodes; lk = m.node_tree.links
    n.clear()
    o = n.new('ShaderNodeOutputMaterial')
    b = n.new('ShaderNodeBsdfPrincipled')
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Metallic'].default_value   = metallic
    b.inputs['Roughness'].default_value  = rough
    # Specular IOR Level (Blender 5.x) or Specular (4.x)
    for sn in ['Specular IOR Level', 'Specular']:
        if sn in b.inputs:
            try: b.inputs[sn].default_value = spec
            except: pass
            break
    lk.new(b.outputs[0], o.inputs[0])
    return m

def mat_emission(name, color, strength=2.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    n = m.node_tree.nodes; lk = m.node_tree.links
    n.clear()
    o = n.new('ShaderNodeOutputMaterial')
    e = n.new('ShaderNodeEmission')
    e.inputs['Color'].default_value    = (*color, 1)
    e.inputs['Strength'].default_value = strength
    lk.new(e.outputs[0], o.inputs[0])
    return m

def mat_screen(img_data=None, fallback_color=BLUE):
    """Emissive screen material with screenshot texture"""
    m = bpy.data.materials.new("M_Screen")
    m.use_nodes = True
    n = m.node_tree.nodes; lk = m.node_tree.links
    n.clear()

    o = n.new('ShaderNodeOutputMaterial')
    e = n.new('ShaderNodeEmission')

    if img_data:
        tex = n.new('ShaderNodeTexImage')
        tex.image = img_data
        e.inputs['Strength'].default_value = 1.8
        lk.new(tex.outputs['Color'], e.inputs['Color'])
    else:
        e.inputs['Color'].default_value    = (*fallback_color, 1)
        e.inputs['Strength'].default_value = 1.2

    lk.new(e.outputs[0], o.inputs[0])
    return m

def mat_glass_white():
    """White frosted glass for premium background elements"""
    m = bpy.data.materials.new("M_Glass")
    m.use_nodes = True
    n = m.node_tree.nodes; lk = m.node_tree.links
    n.clear()
    o = n.new('ShaderNodeOutputMaterial')
    b = n.new('ShaderNodeBsdfPrincipled')
    b.inputs['Base Color'].default_value = (0.95, 0.95, 0.98, 1)
    b.inputs['Roughness'].default_value  = 0.1
    b.inputs['Metallic'].default_value   = 0.0
    for sn in ['Specular IOR Level', 'Specular']:
        if sn in b.inputs:
            try: b.inputs[sn].default_value = 0.8
            except: pass
            break
    # Transmission for glass
    for tn in ['Transmission Weight', 'Transmission']:
        if tn in b.inputs:
            try: b.inputs[tn].default_value = 0.3
            except: pass
            break
    lk.new(b.outputs[0], o.inputs[0])
    return m

# ═════════════════════════════════════════════════════════════
#  SAMSUNG S24 ULTRA PHONE MODEL
# ═════════════════════════════════════════════════════════════

def build_s24_ultra():
    """
    Samsung Galaxy S24 Ultra characteristics:
    - Flat display, flat titanium sides
    - Sharp angular design with minimal corner radius
    - Slim bezels, centered punch-hole camera
    - Titanium gray/silver color
    - 6.8" display ratio ≈ 1:2.17
    """
    # Parent empty
    bpy.ops.object.empty_add(location=(0, 0, 0))
    parent = bpy.context.active_object
    parent.name = "S24_Parent"

    # === BODY (main slab) ===
    # S24 Ultra: 79mm × 163mm × 8.6mm → normalized to ~1 unit width
    W, H, D = 1.0, 2.06, 0.10
    bpy.ops.mesh.primitive_cube_add(size=1)
    body = bpy.context.active_object
    body.name = "S24_Body"
    body.scale = (W, D, H)
    bpy.ops.object.transform_apply(scale=True)

    # Bevel for S24 Ultra's slight corner radius (smaller than iPhone)
    bev = body.modifiers.new("Bevel", 'BEVEL')
    bev.width = 0.04
    bev.segments = 3
    bev.limit_method = 'ANGLE'

    # Titanium silver body material
    body_mat = mat_principled("M_S24Body",
        color=(0.72, 0.72, 0.74), metallic=0.9, rough=0.15, spec=0.9)
    body.data.materials.append(body_mat)
    body.parent = parent

    # === SCREEN (front face) ===
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, D/2 + 0.001, 0))
    screen = bpy.context.active_object
    screen.name = "S24_Screen"
    sw = W * 0.92   # slim bezels
    sh = H * 0.94
    screen.scale = (sw, sh, 1)
    bpy.ops.object.transform_apply(scale=True)
    screen.rotation_euler = Euler((math.radians(90), 0, 0))
    bpy.ops.object.transform_apply(rotation=True)
    # Default blank screen
    screen.data.materials.append(mat_emission("M_ScreenBlank", DARK, 0.5))
    screen.parent = parent

    # === CAMERA ISLAND (back - individual circles like S24U) ===
    cam_positions = [
        (0.25, -D/2 - 0.005, 0.65),  # top cam
        (0.25, -D/2 - 0.005, 0.35),  # middle cam
        (0.25, -D/2 - 0.005, 0.05),  # bottom cam
    ]
    cam_mat = mat_principled("M_CamLens", (0.05, 0.05, 0.08), metallic=0.4, rough=0.02, spec=1.0)
    ring_mat = mat_principled("M_CamRing", (0.6, 0.6, 0.65), metallic=1.0, rough=0.08, spec=0.9)

    for i, pos in enumerate(cam_positions):
        # Ring
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=24, radius=0.07, depth=0.012,
            location=pos, rotation=(math.radians(90), 0, 0))
        ring = bpy.context.active_object
        ring.name = f"S24_CamRing_{i}"
        ring.data.materials.append(ring_mat)
        ring.parent = parent
        # Lens
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=24, radius=0.05, depth=0.014,
            location=pos, rotation=(math.radians(90), 0, 0))
        lens = bpy.context.active_object
        lens.name = f"S24_CamLens_{i}"
        lens.data.materials.append(cam_mat)
        lens.parent = parent

    # Flash
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=12, radius=0.025, depth=0.008,
        location=(0.25, -D/2 - 0.005, -0.20),
        rotation=(math.radians(90), 0, 0))
    flash = bpy.context.active_object
    flash.name = "S24_Flash"
    flash.data.materials.append(mat_emission("M_Flash", (1, 0.95, 0.7), 0.3))
    flash.parent = parent

    # === PUNCH-HOLE FRONT CAMERA ===
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=16, radius=0.028, depth=0.01,
        location=(0, D/2 + 0.003, 0.82),
        rotation=(math.radians(90), 0, 0))
    fc = bpy.context.active_object
    fc.name = "S24_FrontCam"
    fc.data.materials.append(mat_principled("M_FrontCam", (0.02, 0.02, 0.04), rough=0.05))
    fc.parent = parent

    # === SIDE BUTTONS ===
    btn_mat = mat_principled("M_Button", (0.65, 0.65, 0.68), metallic=1, rough=0.1)
    # Power (right side)
    bpy.ops.mesh.primitive_cube_add(size=1, location=(W/2 + 0.015, 0, 0.3))
    pwr = bpy.context.active_object
    pwr.name = "S24_Power"
    pwr.scale = (0.03, 0.05, 0.18)
    bpy.ops.object.transform_apply(scale=True)
    pwr.data.materials.append(btn_mat)
    pwr.parent = parent

    # Volume (left side)
    for vi, vz in enumerate([0.5, 0.25]):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(-W/2 - 0.015, 0, vz))
        vb = bpy.context.active_object
        vb.name = f"S24_Vol_{vi}"
        vb.scale = (0.03, 0.05, 0.12)
        bpy.ops.object.transform_apply(scale=True)
        vb.data.materials.append(btn_mat)
        vb.parent = parent

    print("✓ Samsung S24 Ultra model built")
    return parent, screen

# ═════════════════════════════════════════════════════════════
#  LIGHTING (Bright, clean, premium white)
# ═════════════════════════════════════════════════════════════

def setup_lights():
    lights = []

    # Key light — bright white from front-right
    bpy.ops.object.light_add(type='AREA', location=(4, -4, 5))
    k = bpy.context.active_object
    k.name = "Key"
    k.data.energy = 600
    k.data.size   = 4.0
    k.data.color  = (1, 1, 1)
    k.rotation_euler = Euler((math.radians(50), 0, math.radians(35)))
    lights.append(k)

    # Fill — soft from left
    bpy.ops.object.light_add(type='AREA', location=(-4, -3, 3))
    f = bpy.context.active_object
    f.name = "Fill"
    f.data.energy = 300
    f.data.size   = 6.0
    f.data.color  = (0.95, 0.95, 1.0)
    f.rotation_euler = Euler((math.radians(40), 0, math.radians(-35)))
    lights.append(f)

    # Top — even illumination
    bpy.ops.object.light_add(type='AREA', location=(0, 0, 7))
    t = bpy.context.active_object
    t.name = "Top"
    t.data.energy = 400
    t.data.size   = 8.0
    t.data.color  = (1, 1, 1)
    t.rotation_euler = Euler((0, 0, 0))
    lights.append(t)

    # Rim — subtle blue tint from behind
    bpy.ops.object.light_add(type='AREA', location=(0, 3, 2))
    r = bpy.context.active_object
    r.name = "Rim"
    r.data.energy = 200
    r.data.size   = 3.0
    r.data.color  = (0.7, 0.8, 1.0)
    r.rotation_euler = Euler((math.radians(-60), 0, 0))
    lights.append(r)

    print("✓ Lights (4-point white setup)")
    return lights

# ═════════════════════════════════════════════════════════════
#  CAMERA
# ═════════════════════════════════════════════════════════════

def setup_camera():
    bpy.ops.object.camera_add(location=(0, -7, 0.3))
    cam = bpy.context.active_object
    cam.name = "Cam"
    cam.rotation_euler = Euler((math.radians(88), 0, 0))
    cam.data.lens       = 65
    cam.data.clip_start = 0.1
    cam.data.clip_end   = 100

    bpy.context.scene.camera = cam
    print("✓ Camera (65mm telephoto)")
    return cam

# ═════════════════════════════════════════════════════════════
#  3D TEXT BUILDER
# ═════════════════════════════════════════════════════════════

def make_text(name, text, loc, scale=0.2, color=DARK, font=None,
              extrude=0.015, bevel=0.003, emissive=False, strength=1.5):
    bpy.ops.object.text_add(location=loc)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.body      = text
    obj.data.align_x   = 'CENTER'
    obj.data.align_y   = 'CENTER'
    obj.data.extrude   = extrude
    obj.data.bevel_depth = bevel
    obj.data.size      = 1
    if font:
        obj.data.font = font
    obj.scale = (scale, scale, scale)

    if emissive:
        obj.data.materials.append(mat_emission(f"MT_{name}", color, strength))
    else:
        obj.data.materials.append(mat_principled(f"MT_{name}", color, rough=0.3))

    return obj

# ═════════════════════════════════════════════════════════════
#  DECORATIVE: Subtle floating particles (white theme)
# ═════════════════════════════════════════════════════════════

def create_particles():
    random.seed(123)
    particles = []
    for i in range(25):
        x = random.uniform(-5, 5)
        y = random.uniform(-1.5, 1.5)
        z = random.uniform(-4, 5)
        r = random.uniform(0.01, 0.035)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=(x, y, z), segments=8, ring_count=6)
        p = bpy.context.active_object
        p.name = f"Dot_{i}"
        c = random.choice([
            (0.7, 0.82, 1.0),    # light blue
            (0.82, 0.72, 1.0),   # light purple
            (0.9, 0.9, 0.95),    # near-white
        ])
        p.data.materials.append(mat_emission(f"MD_{i}", c, random.uniform(0.5, 2.0)))
        particles.append(p)

        # Gentle float animation
        sf = 1
        ef = TOTAL_FRAMES
        p.location = (x, y, z)
        kf(p, "location", sf)
        p.location = (x + random.uniform(-0.5, 0.5), y, z + random.uniform(-0.8, 0.8))
        kf(p, "location", ef)

    print(f"✓ {len(particles)} decorative particles")
    return particles

# ═════════════════════════════════════════════════════════════
#  BACKGROUND GRADIENT PLANE
# ═════════════════════════════════════════════════════════════

def create_bg_plane():
    bpy.ops.mesh.primitive_plane_add(size=30, location=(0, 4, 0))
    bg = bpy.context.active_object
    bg.name = "BG_Plane"
    bg.rotation_euler = Euler((math.radians(90), 0, 0))

    m = bpy.data.materials.new("M_BG")
    m.use_nodes = True
    n = m.node_tree.nodes; lk = m.node_tree.links
    n.clear()
    o = n.new('ShaderNodeOutputMaterial')
    e = n.new('ShaderNodeEmission')
    g = n.new('ShaderNodeTexGradient')
    g.gradient_type = 'RADIAL'
    tc = n.new('ShaderNodeTexCoord')
    cr = n.new('ShaderNodeValToRGB')
    cr.color_ramp.elements[0].position = 0.0
    cr.color_ramp.elements[0].color    = (0.96, 0.96, 0.99, 1)  # center: near white
    cr.color_ramp.elements[1].position = 1.0
    cr.color_ramp.elements[1].color    = (0.88, 0.88, 0.94, 1)  # edges: very light gray

    lk.new(tc.outputs['Generated'], g.inputs['Vector'])
    lk.new(g.outputs['Fac'], cr.inputs['Fac'])
    lk.new(cr.outputs['Color'], e.inputs['Color'])
    e.inputs['Strength'].default_value = 1.2
    lk.new(e.outputs[0], o.inputs[0])

    bg.data.materials.append(m)
    print("✓ White background plane")
    return bg

# ═════════════════════════════════════════════════════════════
#  ACCENT SHAPES (subtle blue/purple geometric accents)
# ═════════════════════════════════════════════════════════════

def create_accents():
    """Floating glass cubes and rings for premium SaaS look"""
    accents = []

    # Glass cube - top right
    bpy.ops.mesh.primitive_cube_add(size=0.5, location=(3, 0.5, 3))
    c1 = bpy.context.active_object
    c1.name = "Accent_Cube1"
    c1.rotation_euler = Euler((0.4, 0.6, 0.3))
    c1.data.materials.append(mat_glass_white())
    accents.append(c1)
    # Animate rotation
    kf(c1, "rotation_euler", 1)
    c1.rotation_euler = Euler((0.4 + 0.5, 0.6 + 0.5, 0.3 + 0.5))
    kf(c1, "rotation_euler", TOTAL_FRAMES)

    # Glass cube - bottom left
    bpy.ops.mesh.primitive_cube_add(size=0.35, location=(-3.5, 0.3, -2))
    c2 = bpy.context.active_object
    c2.name = "Accent_Cube2"
    c2.rotation_euler = Euler((0.7, 0.2, 0.5))
    c2.data.materials.append(mat_glass_white())
    accents.append(c2)
    kf(c2, "rotation_euler", 1)
    c2.rotation_euler = Euler((0.7 + 0.4, 0.2 + 0.4, 0.5 + 0.4))
    kf(c2, "rotation_euler", TOTAL_FRAMES)

    # Torus ring accent
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.6, minor_radius=0.02,
        location=(-2.5, 0.5, 3.5))
    t1 = bpy.context.active_object
    t1.name = "Accent_Ring"
    t1.rotation_euler = Euler((0.8, 0.3, 0))
    t1.data.materials.append(mat_emission("M_RingAccent", BLUE, 0.4))
    accents.append(t1)
    kf(t1, "rotation_euler", 1)
    t1.rotation_euler = Euler((0.8, 0.3 + 1.0, 0.5))
    kf(t1, "rotation_euler", TOTAL_FRAMES)

    print("✓ Accent shapes (glass cubes + ring)")
    return accents

# ═════════════════════════════════════════════════════════════
#  MAIN ANIMATION ENGINE
# ═════════════════════════════════════════════════════════════

def animate_all(phone_parent, screen_obj, cam):
    font = load_font()
    all_text_objs = []

    # Pre-load all screenshot materials
    screen_mats = []
    for i, s in enumerate(SCENES):
        img = load_img(s["img"])
        sm = mat_screen(img, BLUE)
        sm.name = f"SM_{i:02d}"
        screen_mats.append(sm)

    for si, scene in enumerate(SCENES):
        sf, ef, nf = SCENE_FRAMES[si]
        mid = sf + nf // 2
        pry = math.radians(scene["pry"])
        cam_style = scene["cam"]

        print(f"  Scene {si+1:02d}/{len(SCENES)}: frames {sf}–{ef} ({scene['dur']:.1f}s) [{cam_style}]")

        # ─── SCREEN MATERIAL SWAP ───
        screen_obj.data.materials.clear()
        screen_obj.data.materials.append(screen_mats[si])

        # ─── PHONE ANIMATION ───
        enter_f   = sf
        settle_f  = sf + 12
        hold_f    = ef - 8
        exit_f    = ef

        if cam_style == "intro":
            # Dramatic spin-in from far right
            bpy.context.scene.frame_set(enter_f)
            phone_parent.location       = (5, 0, 0)
            phone_parent.rotation_euler = Euler((0, math.radians(-180), 0))
            phone_parent.scale          = (0.3, 0.3, 0.3)
            kf(phone_parent, "location", enter_f)
            kf(phone_parent, "rotation_euler", enter_f)
            kf(phone_parent, "scale", enter_f)

            bpy.context.scene.frame_set(settle_f + 6)
            phone_parent.location       = (0, 0, 0)
            phone_parent.rotation_euler = Euler((0, math.radians(5), 0))
            phone_parent.scale          = (1.05, 1.05, 1.05)
            kf(phone_parent, "location", settle_f + 6)
            kf(phone_parent, "rotation_euler", settle_f + 6)
            kf(phone_parent, "scale", settle_f + 6)

            bpy.context.scene.frame_set(settle_f + 14)
            phone_parent.rotation_euler = Euler((0, 0, 0))
            phone_parent.scale          = (1, 1, 1)
            kf(phone_parent, "rotation_euler", settle_f + 14)
            kf(phone_parent, "scale", settle_f + 14)

        elif cam_style == "outro":
            # Gentle rise + glow
            bpy.context.scene.frame_set(enter_f)
            phone_parent.location       = (0, 0, -1.5)
            phone_parent.scale          = (0.6, 0.6, 0.6)
            phone_parent.rotation_euler = Euler((0, 0, 0))
            kf(phone_parent, "location", enter_f)
            kf(phone_parent, "scale", enter_f)

            bpy.context.scene.frame_set(settle_f)
            phone_parent.location = (0, 0, 0.1)
            phone_parent.scale    = (1.03, 1.03, 1.03)
            kf(phone_parent, "location", settle_f)
            kf(phone_parent, "scale", settle_f)

            bpy.context.scene.frame_set(settle_f + 8)
            phone_parent.location = (0, 0, 0)
            phone_parent.scale    = (1, 1, 1)
            kf(phone_parent, "location", settle_f + 8)
            kf(phone_parent, "scale", settle_f + 8)

        elif cam_style == "cta":
            # Phone scales down and out
            bpy.context.scene.frame_set(enter_f)
            phone_parent.location = (0, 0, 0)
            phone_parent.scale    = (1, 1, 1)
            kf(phone_parent, "location", enter_f)
            kf(phone_parent, "scale", enter_f)

            bpy.context.scene.frame_set(mid)
            phone_parent.scale = (0.7, 0.7, 0.7)
            phone_parent.location = (0, 0, -0.5)
            kf(phone_parent, "scale", mid)
            kf(phone_parent, "location", mid)

            bpy.context.scene.frame_set(exit_f)
            phone_parent.scale = (0.0, 0.0, 0.0)
            phone_parent.location = (0, 0, -2)
            kf(phone_parent, "scale", exit_f)
            kf(phone_parent, "location", exit_f)

        elif cam_style == "orbit":
            # Orbit around phone
            bpy.context.scene.frame_set(enter_f)
            phone_parent.rotation_euler = Euler((0, math.radians(-20), 0))
            phone_parent.location = (0, 0, 0)
            kf(phone_parent, "rotation_euler", enter_f)
            kf(phone_parent, "location", enter_f)

            bpy.context.scene.frame_set(mid)
            phone_parent.rotation_euler = Euler((0, math.radians(20), 0))
            kf(phone_parent, "rotation_euler", mid)

            bpy.context.scene.frame_set(exit_f)
            phone_parent.rotation_euler = Euler((0, 0, 0))
            kf(phone_parent, "rotation_euler", exit_f)

        else:
            # Standard slide transitions
            overshoot_ry = pry * 1.3

            bpy.context.scene.frame_set(enter_f)
            phone_parent.rotation_euler = Euler((0, overshoot_ry, 0))
            phone_parent.scale = (0.95, 0.95, 0.95)
            phone_parent.location = (0, 0, 0)
            kf(phone_parent, "rotation_euler", enter_f)
            kf(phone_parent, "scale", enter_f)
            kf(phone_parent, "location", enter_f)

            bpy.context.scene.frame_set(settle_f)
            phone_parent.rotation_euler = Euler((0, pry, 0))
            phone_parent.scale = (1.02, 1.02, 1.02)
            kf(phone_parent, "rotation_euler", settle_f)
            kf(phone_parent, "scale", settle_f)

            bpy.context.scene.frame_set(settle_f + 6)
            phone_parent.scale = (1, 1, 1)
            kf(phone_parent, "scale", settle_f + 6)

            # Gentle float
            bpy.context.scene.frame_set(mid)
            phone_parent.location = (0, 0, 0.05)
            kf(phone_parent, "location", mid)

            bpy.context.scene.frame_set(exit_f)
            phone_parent.location = (0, 0, 0)
            kf(phone_parent, "location", exit_f)

        # ─── CAMERA ANIMATION ───
        orbit_x = 0.25 * math.sin(si * 0.6)
        orbit_z = 0.15 * math.cos(si * 0.4) + 0.3

        if cam_style == "intro":
            bpy.context.scene.frame_set(enter_f)
            cam.location = (0, -9, 0.3)
            cam.data.lens = 50
            kf(cam, "location", enter_f)
            bpy.context.scene.frame_set(exit_f)
            cam.location = (0, -7, 0.3)
            cam.data.lens = 65
            kf(cam, "location", exit_f)

        elif cam_style == "zoom_in":
            bpy.context.scene.frame_set(enter_f)
            cam.location = (orbit_x, -7.5, orbit_z)
            kf(cam, "location", enter_f)
            bpy.context.scene.frame_set(exit_f)
            cam.location = (orbit_x * 0.5, -6.0, orbit_z * 0.8)
            kf(cam, "location", exit_f)

        elif cam_style in ("slide_r", "slide_l"):
            dx = 0.6 if cam_style == "slide_r" else -0.6
            bpy.context.scene.frame_set(enter_f)
            cam.location = (dx, -7.2, orbit_z)
            kf(cam, "location", enter_f)
            bpy.context.scene.frame_set(exit_f)
            cam.location = (-dx * 0.3, -6.8, orbit_z * 0.9)
            kf(cam, "location", exit_f)

        elif cam_style == "orbit":
            bpy.context.scene.frame_set(enter_f)
            cam.location = (1.5, -7, 0.5)
            kf(cam, "location", enter_f)
            bpy.context.scene.frame_set(mid)
            cam.location = (-1.5, -6.5, 0.3)
            kf(cam, "location", mid)
            bpy.context.scene.frame_set(exit_f)
            cam.location = (0, -7, 0.3)
            kf(cam, "location", exit_f)

        elif cam_style == "cta":
            bpy.context.scene.frame_set(enter_f)
            cam.location = (0, -7, 0.3)
            kf(cam, "location", enter_f)
            bpy.context.scene.frame_set(exit_f)
            cam.location = (0, -8, 0.5)
            kf(cam, "location", exit_f)

        else:  # outro
            bpy.context.scene.frame_set(enter_f)
            cam.location = (0, -8, 0)
            kf(cam, "location", enter_f)
            bpy.context.scene.frame_set(exit_f)
            cam.location = (0, -6.5, 0.4)
            kf(cam, "location", exit_f)

        # ─── TEXT OBJECTS ───
        t1_text = scene["t1"]
        t2_text = scene["t2"]
        sub_text = scene["sub"]

        is_brand = (cam_style in ("intro", "outro", "cta"))

        # Title 1 (top text, above phone)
        if t1_text:
            t1_size = 0.28 if is_brand else 0.32
            t1_color = BLUE if is_brand else DARK
            t1 = make_text(f"T1_{si}", t1_text,
                loc=(0, -0.5, 2.8),
                scale=t1_size, color=t1_color, font=font,
                extrude=0.025 if is_brand else 0.02,
                bevel=0.004)
            all_text_objs.append(t1)

            # Pop-in animation
            bpy.context.scene.frame_set(enter_f - 1)
            t1.scale = (0, 0, 0)
            kf(t1, "scale", enter_f - 1)

            bpy.context.scene.frame_set(enter_f + 8)
            s = t1_size * 1.12
            t1.scale = (s, s, s)
            kf(t1, "scale", enter_f + 8)

            bpy.context.scene.frame_set(enter_f + 14)
            t1.scale = (t1_size, t1_size, t1_size)
            kf(t1, "scale", enter_f + 14)

            # Fade out
            bpy.context.scene.frame_set(exit_f - 4)
            t1.scale = (t1_size, t1_size, t1_size)
            kf(t1, "scale", exit_f - 4)
            bpy.context.scene.frame_set(exit_f + 3)
            t1.scale = (0, 0, 0)
            kf(t1, "scale", exit_f + 3)

        # Title 2 (below title 1)
        if t2_text:
            t2_size = 0.15 if len(t2_text) > 25 else 0.20
            t2 = make_text(f"T2_{si}", t2_text,
                loc=(0, -0.5, 2.35),
                scale=t2_size, color=PURPLE, font=font,
                extrude=0.015, bevel=0.003)
            all_text_objs.append(t2)

            bpy.context.scene.frame_set(enter_f + 2)
            t2.scale = (0, 0, 0)
            kf(t2, "scale", enter_f + 2)
            bpy.context.scene.frame_set(enter_f + 12)
            s = t2_size * 1.1
            t2.scale = (s, s, s)
            kf(t2, "scale", enter_f + 12)
            bpy.context.scene.frame_set(enter_f + 18)
            t2.scale = (t2_size, t2_size, t2_size)
            kf(t2, "scale", enter_f + 18)

            bpy.context.scene.frame_set(exit_f - 3)
            t2.scale = (t2_size, t2_size, t2_size)
            kf(t2, "scale", exit_f - 3)
            bpy.context.scene.frame_set(exit_f + 4)
            t2.scale = (0, 0, 0)
            kf(t2, "scale", exit_f + 4)

        # Subtitle (below phone)
        if sub_text:
            sub_size = 0.10 if len(sub_text) > 30 else 0.12
            sub = make_text(f"Sub_{si}", sub_text,
                loc=(0, -0.5, -2.3),
                scale=sub_size, color=GRAY50, font=font,
                extrude=0.008, bevel=0.002)
            all_text_objs.append(sub)

            bpy.context.scene.frame_set(enter_f + 6)
            sub.scale = (0, 0, 0)
            kf(sub, "scale", enter_f + 6)
            bpy.context.scene.frame_set(enter_f + 16)
            sub.scale = (sub_size, sub_size, sub_size)
            kf(sub, "scale", enter_f + 16)

            bpy.context.scene.frame_set(exit_f - 2)
            sub.scale = (sub_size, sub_size, sub_size)
            kf(sub, "scale", exit_f - 2)
            bpy.context.scene.frame_set(exit_f + 5)
            sub.scale = (0, 0, 0)
            kf(sub, "scale", exit_f + 5)

    print(f"✓ All {len(SCENES)} scenes animated, {len(all_text_objs)} text objects")
    return all_text_objs

# ═════════════════════════════════════════════════════════════
#  SMOOTH ALL KEYFRAMES
# ═════════════════════════════════════════════════════════════

def smooth_fcurves():
    for obj in bpy.data.objects:
        if not (obj.animation_data and obj.animation_data.action):
            continue
        action = obj.animation_data.action
        # Blender 5.x layered actions
        try:
            for layer in action.layers:
                for strip in layer.strips:
                    for cb in strip.channelbags:
                        for fc in cb.fcurves:
                            for kp in fc.keyframe_points:
                                kp.interpolation     = 'BEZIER'
                                kp.handle_left_type  = 'AUTO_CLAMPED'
                                kp.handle_right_type = 'AUTO_CLAMPED'
        except AttributeError:
            # Legacy Blender API
            try:
                for fc in action.fcurves:
                    for kp in fc.keyframe_points:
                        kp.interpolation     = 'BEZIER'
                        kp.handle_left_type  = 'AUTO_CLAMPED'
                        kp.handle_right_type = 'AUTO_CLAMPED'
            except:
                pass
    print("✓ All keyframes smoothed")

# ═════════════════════════════════════════════════════════════
#  RENDER + ASSEMBLE
# ═════════════════════════════════════════════════════════════

def render_and_assemble():
    print("\n🎬 Rendering animation (PNG frames)...")
    print(f"   Frames: 1 → {TOTAL_FRAMES}")
    print(f"   Output: {os.path.dirname(FRAMES)}")
    bpy.ops.render.render(animation=True)

    # Assemble MP4
    print("\n🎬 Assembling MP4 with ffmpeg...")
    import subprocess
    pattern = FRAMES + "%04d.png"

    for ffmpeg in ["ffmpeg", r"C:\Program Files\Blender Foundation\Blender 5.1\ffmpeg.exe"]:
        try:
            r = subprocess.run([
                ffmpeg, "-y",
                "-framerate", str(FPS),
                "-i", pattern,
                "-c:v", "libx264", "-preset", "fast",
                "-crf", "18", "-pix_fmt", "yuv420p",
                OUT_MP4
            ], capture_output=True, text=True, timeout=600)
            if r.returncode == 0:
                size = os.path.getsize(OUT_MP4) / (1024*1024)
                print(f"✅ MP4 created: {OUT_MP4} ({size:.1f} MB)")
                return True
            else:
                print(f"  ffmpeg error: {r.stderr[:300]}")
        except FileNotFoundError:
            continue
        except Exception as e:
            print(f"  Error: {e}")

    print(f"\n⚠ ffmpeg not found. Frames at: {os.path.dirname(FRAMES)}")
    print(f'  Manual: ffmpeg -framerate {FPS} -i "{pattern}" -c:v libx264 -crf 18 -pix_fmt yuv420p "{OUT_MP4}"')
    return False

# ═════════════════════════════════════════════════════════════
#  MAIN
# ═════════════════════════════════════════════════════════════

def main():
    print("\n" + "═"*60)
    print("  SISTec Digital Pass — Premium 3D Promo")
    print("  Blender 5.1 + Python + FFmpeg")
    print("═"*60)

    clear_all()
    setup_scene()
    create_bg_plane()
    phone_parent, screen = build_s24_ultra()
    setup_lights()
    cam = setup_camera()
    create_particles()
    create_accents()

    print("\n⚡ Animating all scenes...")
    animate_all(phone_parent, screen, cam)
    smooth_fcurves()

    print("\n" + "─"*60)
    render_and_assemble()

    print("\n" + "═"*60)
    print("  ✅ BUILD COMPLETE!")
    print("═"*60)

main()
