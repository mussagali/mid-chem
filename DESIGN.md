---
name: CHEM101
description: A calm chemistry workbook, from first principles to exam practice.
colors:
  paper: "#f8f7f2"
  ink: "#293a32"
  green: "#294b3d"
  muted: "#667269"
  line: "#dedfd5"
  lime: "#e0e9c5"
  red: "#a03d32"
  soft: "#efeee6"
  field: "#fffefa"
  secondary-text: "#56664e"
  primary-text: "#f7f9ee"
  primary-hover: "#17392c"
typography:
  display:
    fontFamily: "Lora, serif"
    fontSize: "clamp(2.5rem, 3.65vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Lora, serif"
    fontSize: "clamp(2rem, 3.2vw, 3.15rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-.025em"
  title:
    fontFamily: "Lora, serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "-.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    lineHeight: 1.95
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  compact: "5px"
  control: "8px"
  panel: "12px"
  question: "14px"
spacing:
  tight: "6px"
  compact: "12px"
  control: "20px"
  panel: "24px"
  section: "30px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.primary-text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "13px 19px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "#35513d"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "13px 19px"
  search-field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 14px"
  navigation-active:
    backgroundColor: "#dfe7d5"
    textColor: "#234934"
    rounded: "9px"
    padding: "13px 13px"
  question-card:
    backgroundColor: "{colors.field}"
    rounded: "{rounded.question}"
    padding: "30px"
  answer-option:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "15px 17px"
---

# Design System: CHEM101

## Overview

**Creative North Star: "The Chemistry Workbook"**

CHEM101 is a calm study companion for a beginner preparing for an English-language chemistry exam. Cream paper, forest ink, editorial headings, and restrained rules make each screen feel like an approachable printed workbook.

The workspace supports learning, practice, timed exams, and reviewing errors. Comfortable reading and clear task states take priority over decorative dashboard chrome. Illustrations explain chemistry; progress and feedback communicate actual study state.

**Key Characteristics:**
- Cream paper and forest ink.
- Editorial Lora headings paired with practical Manrope text.
- Flat, ruled lists and gently rounded work surfaces.
- Readable problems with explicit answer and feedback states.

## Colors

The palette combines warm paper neutrals with botanical greens and a restrained red error accent. Frontmatter values are normative; the source custom properties remain in src/style.css.

### Primary
- **Forest Ink** (`green`): primary actions and high-emphasis study controls.
- **Young Leaf** (`lime`): supporting botanical accent.
- **Deep Forest** (`primary-hover`): primary-action hover response.

### Secondary
- **Correction Red** (`red`): error and persistence-warning cues, supplemented by labels or icons.

### Neutral
- **Workbook Paper** (`paper`): application background.
- **Reading Ink** (`ink`): main text.
- **Quiet Ink** (`muted`) and **Olive Annotation** (`secondary-text`): supporting copy and metadata.
- **Pencil Rule** (`line`): structural dividers.
- **Warm Margin** (`soft`): supporting neutral surface.
- **Clean Page** (`field`): inputs, answer choices, and task cards.
- **Light Ink** (`primary-text`): primary-button text.

**The Meaningful State Rule.** Use color with text, icons, or selection structure so feedback never depends on hue alone.

## Typography

**Display Font:** Lora, with serif fallback.
**Body Font:** Manrope, with sans-serif fallback.

Lora supplies the patient editorial voice; Manrope keeps English instructions, numbers, and controls legible. The source uses a 15px root size and several purpose-specific sizes rather than a strict modular scale.

### Hierarchy
- **Display:** home introduction, with responsive overrides at the documented breakpoints.
- **Headline:** page and lesson headings.
- **Title:** section headings and editorial subheads.
- **Body:** lesson prose, with a maximum line length of 73ch.
- **Label:** action text; supporting metadata varies from 9px to 12px in the existing implementation.

Question prompts use Manrope at 18px, weight 600, and line-height 1.8; compact layouts reduce them to 16px. Numerical progress and timers use tabular figures. Keep chemical subscripts, superscripts, symbols, and English terminology intact.

## Layout

Desktop uses a fixed 244px sidebar and a main region offset by the same amount. Content has a 1400px maximum width and 44px 48px 64px padding. The top bar is 76px tall. Lesson articles narrow to 790px; prose narrows further to 73ch.

Practice and exam views pair a flexible problem column with a 235px supporting column, separated by 28px. Curriculum and review lists use horizontal rules rather than repeated floating cards. Exam selection uses two columns.

At 1150px and below, the sidebar becomes 215px and main horizontal padding becomes 30px. At 900px and below, navigation becomes a hidden off-canvas drawer with a scrim, and the content offset disappears. At 650px and below, the hero, exams, and problem/support layouts stack, main horizontal padding is 20px, and progress becomes a two-column strip. At 1500px and above, the hero receives more space and a 56px display heading.

## Elevation & Depth

The system is flat: no box shadows. Depth comes from warm tonal changes, thin borders, and spacing. The off-canvas navigation uses a translucent scrim to distinguish its modal layer. Focus is visible through an offset outline rather than a shadow.

**The Flat Workbook Rule.** Separate study regions with rules and paper tones; do not add floating-card shadows.

## Shapes

Controls use modest rounded corners, while supporting surfaces use larger, quiet rounding. Answer choices retain a rectangular silhouette with a small letter tile. Circular lesson completion markers and square exam-navigation cells encode their purpose rather than decoration. Dividers remain thin and straight.

## Components

### Buttons

Confident, restrained actions. Primary buttons use Forest Ink and Light Ink; secondary buttons use a transparent fill and a muted green border. Both have a 46px minimum height. Hover transitions change background and text over 0.2s. Global keyboard focus is a 3px outline with 4px offset; disabled controls use 0.45 opacity and a not-allowed cursor.

### Inputs / Fields

Clean Page fields have a thin muted border and control rounding. Search pairs a contextual icon with an unfilled input inside its enclosing surface; focus-within adds a 2px green outline. Scratchpads are multiline paper-toned fields, visibly described as temporary notes.

### Navigation

Sidebar items use Manrope at weight 600, small icons, a 47px minimum height, and a softly filled active state. Mobile navigation retains the same item structure inside a closable drawer. A focus-visible skip link supports keyboard access to the main content.

### Cards / Containers

Question cards use Clean Page with a thin border, question rounding, and generous padding. Supporting notes, worked examples, exam instructions, and scratchpads use pale tonal fills. They remain shadowless. Mobile question cards reduce padding to 22px 18px and use panel rounding.

### Answer choices

Full-width choices have a small letter tile, a minimum 59px height, and a readable text column. Hover adds a pale green fill; selection changes both border and letter-tile fill. Correct and incorrect feedback add distinct text/icons as well as green or red tones. The underlying radio input remains keyboard-operable, with a visible outline on its enclosing choice.

### Exam navigator

Five columns of numbered cells show current, answered, and flagged questions separately. The current cell uses an offset outline; answered cells use a leaf fill; flags use an icon. The timer uses tabular figures and a warmer urgent state. Mobile cells maintain a 40px minimum height.

### Motion

Motion is limited to short state transitions and the mobile navigation slide. The reduced-motion media query removes animation, transitions, and smooth scrolling.

## Do's and Don'ts

### Do:
- **Do** preserve cream paper, forest ink, and the Lora/Manrope pairing.
- **Do** use ruled lists for curriculum and review content.
- **Do** retain visible keyboard focus and explicit answer-state cues.
- **Do** keep problem text, chemistry notation, and solution steps readable before adding decoration.

### Don't:
- **Don't** add floating-card shadows or decorative dashboard chrome.
- **Don't** communicate correctness only through color.
- **Don't** replace readable study content with oversized metrics or ornamental imagery.
