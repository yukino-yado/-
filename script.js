const SVG_NS = "http://www.w3.org/2000/svg";
const STORAGE_KEY = "mathPrintToolAutoSaveV77";
const LEGACY_STORAGE_KEYS = ["mathPrintToolAutoSaveV75", "mathPrintToolAutoSaveV72", "mathPrintToolAutoSaveV71", "mathPrintToolAutoSaveV69", "mathPrintToolAutoSaveV68", "mathPrintToolAutoSaveV67", "mathPrintToolAutoSaveV66", "mathPrintToolAutoSaveV65", "mathPrintToolAutoSaveV64", "mathPrintToolAutoSaveV63", "mathPrintToolAutoSaveV62", "mathPrintToolAutoSaveV61", "mathPrintToolAutoSaveV60", "mathPrintToolAutoSaveV59", "mathPrintToolAutoSaveV57", "mathPrintToolAutoSaveV56", "mathPrintToolAutoSaveV55", "mathPrintToolAutoSaveV54", "mathPrintToolAutoSaveV53", "mathPrintToolAutoSaveV52", "mathPrintToolAutoSaveV51", "mathPrintToolAutoSaveV50", "mathPrintToolAutoSaveV49", "mathPrintToolAutoSaveV48", "mathPrintToolAutoSaveV47", "mathPrintToolAutoSaveV46", "mathPrintToolAutoSaveV45", "mathPrintToolAutoSaveV44", "mathPrintToolAutoSaveV43", "mathPrintToolAutoSaveV42", "mathPrintToolAutoSaveV41", "mathPrintToolAutoSaveV40", "mathPrintToolAutoSaveV39", "mathPrintToolAutoSaveV38", "mathPrintToolAutoSaveV37", "mathPrintToolAutoSaveV36", "mathPrintToolAutoSaveV35", "mathPrintToolAutoSaveV34", "mathPrintToolAutoSaveV33", "mathPrintToolAutoSaveV32", "mathPrintToolAutoSaveV31", "mathPrintToolAutoSaveV30", "mathPrintToolAutoSaveV29", "mathPrintToolAutoSaveV28", "mathPrintToolAutoSaveV27", "mathPrintToolAutoSaveV26", "mathPrintToolAutoSaveV25", "mathPrintToolAutoSaveV24", "mathPrintToolAutoSaveV23", "mathPrintToolAutoSaveV22", "mathPrintToolAutoSaveV21", "mathPrintToolAutoSaveV20", "mathPrintToolAutoSaveV19", "mathPrintToolAutoSaveV18", "mathPrintToolAutoSaveV17", "mathPrintToolAutoSaveV16", "mathPrintToolAutoSaveV15", "mathPrintToolAutoSaveV14", "mathPrintToolAutoSaveV13", "mathPrintToolAutoSaveV12", "mathPrintToolAutoSaveV11", "mathPrintToolAutoSaveV10"];
const DEFAULT_TEXT_COLOR = "#111111";
const DEFAULT_BLOCK_FRAME = "none";
const DEFAULT_TEXT_SIZE = "normal";
const DEFAULT_FONT_SIZE_PT = 11;
const DEFAULT_MATH_FONT_SIZE_PT = 13;
const DEFAULT_BLOCK_ALIGN = "left";

const PAPER_SIZE_LABELS = {
  A3: "A3",
  A4: "A4",
  B5: "B5",
  A5: "A5",
  B4: "B4",
  Letter: "Letter"
};

const PAPER_SIZES_MM = {
  A3: { width: 297, height: 420, label: "A3" },
  A4: { width: 210, height: 297, label: "A4" },
  B5: { width: 182, height: 257, label: "B5" },
  A5: { width: 148, height: 210, label: "A5" },
  B4: { width: 257, height: 364, label: "B4" },
  Letter: { width: 216, height: 279, label: "Letter" }
};

const PAPER_ORIENTATION_LABELS = {
  portrait: "縦",
  landscape: "横"
};

const FONT_FAMILY_LABELS = {
  default: "基本フォント",
  gothic: "ゴシック",
  mincho: "明朝",
  meiryogothic: "メイリオ",
  yuGothic: "游ゴシック",
  yuMincho: "游明朝",
  rounded: "丸ゴシック",
  serif: "欧文セリフ",
  sans: "欧文サンセリフ"
};

const FONT_FAMILY_VALUES = {
  default: "var(--print-font-family)",
  gothic: "\"Yu Gothic\", \"YuGothic\", \"Hiragino Kaku Gothic ProN\", Meiryo, sans-serif",
  mincho: "\"Yu Mincho\", \"YuMincho\", \"Hiragino Mincho ProN\", \"MS Mincho\", serif",
  meiryogothic: "Meiryo, \"Yu Gothic\", sans-serif",
  yuGothic: "\"Yu Gothic\", \"YuGothic\", sans-serif",
  yuMincho: "\"Yu Mincho\", \"YuMincho\", serif",
  rounded: "\"Hiragino Maru Gothic ProN\", \"Yu Gothic\", Meiryo, sans-serif",
  serif: "\"Times New Roman\", \"Yu Mincho\", serif",
  sans: "Arial, \"Yu Gothic\", sans-serif"
};

const WORD_CENTER_LINE_LABELS = {
  solid: "実線",
  dashed: "破線",
  dotted: "点線",
  double: "二重線",
  none: "なし"
};


const TEXT_SIZE_PT_DEFAULTS = {
  small: 9,
  normal: 11,
  large: 13,
  xlarge: 15
};

const INLINE_MATH_SIZE_PT_DEFAULTS = {
  normal: 12,
  medium: 13,
  large: 14,
  xlarge: 16
};
let draggedBlockId = null;

const state = {
  title: "分数の計算",
  unit: "中1 数学 / 正負の数",
  nameLine: "名前：＿＿＿＿＿＿＿＿＿＿＿＿",
  paperSize: "A4",
  paperOrientation: "portrait",
  baseFontSizePt: DEFAULT_FONT_SIZE_PT,
  baseFontFamily: "gothic",
  pageMarginMm: 18,
  blocks: [
    {
      id: crypto.randomUUID(),
      type: "heading",
      content: "例題"
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      content: "次の計算をしなさい。分数は 1/2 のように入力できます。1/2x のように分数の後ろに文字も書けます。"
    },
    {
      id: crypto.randomUUID(),
      type: "math",
      content: "1/2 + 1/3",
      mathLayout: "center"
    },
    {
      id: crypto.randomUUID(),
      type: "problem",
      number: 1,
      content: "次の計算をしなさい。\n2/3 - 1/4",
      columns: 1,
      answerSize: "medium",
      answerFormat: "line",
      answerBoxSize: "medium",
      answerPlacement: "bottom",
      answerX: 0,
      answerY: 0
    },
    {
      id: crypto.randomUUID(),
      type: "problem",
      number: 2,
      content: "(1) 1/2x + 1/3x\n(2) (1/2x + 1/3x)",
      columns: 2,
      answerSize: "none",
      answerFormat: "line",
      answerBoxSize: "medium",
      answerPlacement: "bottom",
      inlineMathSize: "large",
      columnGap: "normal",
      rowGap: "normal",
      blankLineGap: "large",
      answerX: 0,
      answerY: 0,
      answerPositions: {}
    }
  ]
};

const blockLabels = {
  heading: "見出し",
  text: "本文",
  sidebox: "横並び枠",
  testLayout: "テスト2列",
  math: "数式",
  problem: "問題",
  problemRow: "横並び問題（旧）",
  answer: "解答欄",
  numberline: "数直線",
  geometry: "基本図形",
  coordinate: "座標・グラフ"
};

const answerSizeLabels = {
  small: "小",
  medium: "中",
  large: "大",
  xlarge: "特大"
};

const answerFormatLabels = {
  line: "罫線つき",
  box: "四角枠"
};

const answerBoxSizeLabels = {
  tiny: "かなり小さい",
  small: "小",
  medium: "中",
  large: "大",
  xlarge: "特大"
};

const answerPlacementLabels = {
  bottom: "問題の下",
  left: "問題の左",
  right: "問題の右",
  free: "下に置いて自由移動"
};

const problemRowGapLabels = {
  tight: "せまい",
  normal: "標準",
  wide: "広め",
  xwide: "かなり広め"
};

const problemBlankLineGapLabels = {
  small: "小",
  medium: "中",
  large: "大",
  xlarge: "特大"
};

const problemLayoutModeLabels = {
  auto: "自動判定",
  normal: "通常・横並び",
  calc: "横並び計算",
  free: "自由配置"
};

const mathLayoutLabels = {
  left: "左寄せ・大きめ",
  center: "中央寄せ・大きめ",
  right: "右寄せ・大きめ"
};

const diagramLayoutLabels = {
  left: "左寄せ",
  center: "中央寄せ",
  right: "右寄せ"
};

const blockFrameLabels = {
  none: "枠なし",
  simple: "一重枠",
  double: "二重枠",
  dashed: "点線枠",
  gray: "薄い背景つき"
};

const textSizeLabels = {
  small: "小",
  normal: "標準",
  large: "大",
  xlarge: "特大"
};

const problemInlineMathSizeLabels = {
  normal: "標準",
  medium: "少し大きい",
  large: "大きい",
  xlarge: "特大"
};

const blockAlignLabels = {
  left: "左寄せ",
  center: "中央寄せ",
  right: "右寄せ"
};

const sideBoxPositionLabels = {
  right: "文の右に配置",
  left: "文の左に配置",
  full: "下に全幅で配置"
};

const textNoteDefault = {
  noteEnabled: false,
  noteText: "",
  notePage: 1,
  noteX: 360,
  noteY: 40,
  noteWidth: 170,
  noteFrame: "simple",
  noteFontSize: "normal",
  noteFontSizePt: DEFAULT_FONT_SIZE_PT,
  noteFontFamily: "default",
  noteColor: DEFAULT_TEXT_COLOR,
  noteAlign: "left"
};

function createTextNote(overrides = {}) {
  return {
    id: overrides.id || crypto.randomUUID(),
    enabled: boolValue(overrides.enabled, overrides.noteEnabled ?? false),
    text: overrides.text ?? overrides.noteText ?? "",
    page: Math.max(1, Math.round(Number(overrides.page ?? overrides.notePage ?? textNoteDefault.notePage) || 1)),
    x: Number(overrides.x ?? overrides.noteX ?? textNoteDefault.noteX),
    y: Number(overrides.y ?? overrides.noteY ?? textNoteDefault.noteY),
    xMm: Number.isFinite(Number(overrides.xMm ?? overrides.noteXMm)) ? Number(overrides.xMm ?? overrides.noteXMm) : pxToMmX(Number(overrides.x ?? overrides.noteX ?? textNoteDefault.noteX)),
    yMm: Number.isFinite(Number(overrides.yMm ?? overrides.noteYMm)) ? Number(overrides.yMm ?? overrides.noteYMm) : pxToMmY(Number(overrides.y ?? overrides.noteY ?? textNoteDefault.noteY)),
    width: Number(overrides.width ?? overrides.noteWidth ?? textNoteDefault.noteWidth),
    frame: overrides.frame || overrides.noteFrame || textNoteDefault.noteFrame,
    fontSize: overrides.fontSize || overrides.noteFontSize || textNoteDefault.noteFontSize,
    fontSizePt: sanitizeFontSizePt(overrides.fontSizePt || overrides.noteFontSizePt, textSizeToPt(overrides.fontSize || overrides.noteFontSize || textNoteDefault.noteFontSize)),
    fontFamily: overrides.fontFamily || overrides.noteFontFamily || "default",
    color: normalizeColor(overrides.color || overrides.noteColor || textNoteDefault.noteColor),
    align: overrides.align || overrides.noteAlign || textNoteDefault.noteAlign
  };
}

function normalizeTextNotes(block) {
  let notes = Array.isArray(block.noteBoxes) ? block.noteBoxes : [];

  // v28〜v32の単一補助枠データを、複数補助枠データへ移行します。
  if (!notes.length && (boolValue(block.noteEnabled, false) || String(block.noteText || "").trim())) {
    notes = [createTextNote(block)];
  }

  block.noteBoxes = notes.map((note, index) => {
    const normalized = createTextNote(note);
    if (!normalized.text && index === 0 && block.noteText) normalized.text = block.noteText;
    return normalized;
  });

  return block.noteBoxes;
}


const geometryKindLabels = {
  triangle: "三角形",
  quadrilateral: "四角形",
  circle: "円",
  segment: "線分"
};

const titleInput = document.querySelector("#titleInput");
const unitInput = document.querySelector("#unitInput");
const nameLineInput = document.querySelector("#nameLineInput");
const paperSizeInput = document.querySelector("#paperSizeInput");
const paperOrientationInput = document.querySelector("#paperOrientationInput");
const baseFontSizeInput = document.querySelector("#baseFontSizeInput");
const baseFontFamilyInput = document.querySelector("#baseFontFamilyInput");
const pageMarginInput = document.querySelector("#pageMarginInput");
const blocksEl = document.querySelector("#blocks");
const printArea = document.querySelector("#printArea");
const pageStatus = document.querySelector("#pageStatus");
const saveStatus = document.querySelector("#saveStatus");
const template = document.querySelector("#blockTemplate");
let saveTimer = null;
let cachedPageHeightPx = null;
const boundAnswerElements = new WeakSet();
const boundFloatingNoteElements = new WeakSet();
const boundFreeProblemElements = new WeakSet();
const activeTextLineByBlock = {};
const activeTextSelectionByBlock = {};


function boolValue(value, fallback = true) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  return !["false", "0", "off", "no"].includes(String(value).toLowerCase());
}

function checkedAttr(value, fallback = true) {
  return boolValue(value, fallback) ? "checked" : "";
}

function readFieldValue(input) {
  return input.type === "checkbox" ? input.checked : input.value;
}

function normalizeColor(value) {
  const color = String(value || "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : DEFAULT_TEXT_COLOR;
}

function sanitizeFontSizePt(value, fallback = DEFAULT_FONT_SIZE_PT) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(72, Math.max(6, Math.round(num * 2) / 2));
}

function textSizeToPt(size, fallback = DEFAULT_FONT_SIZE_PT) {
  return sanitizeFontSizePt(TEXT_SIZE_PT_DEFAULTS[size] ?? fallback, fallback);
}

function inlineMathSizeToPt(size, fallback = 13) {
  return sanitizeFontSizePt(INLINE_MATH_SIZE_PT_DEFAULTS[size] ?? fallback, fallback);
}

function blockFontSizePt(block) {
  return sanitizeFontSizePt(block?.fontSizePt, textSizeToPt(block?.textSize || DEFAULT_TEXT_SIZE, Number(state.baseFontSizePt) || DEFAULT_FONT_SIZE_PT));
}

function noteFontSizePt(note) {
  return sanitizeFontSizePt(note?.fontSizePt, textSizeToPt(note?.fontSize || DEFAULT_TEXT_SIZE, Number(state.baseFontSizePt) || DEFAULT_FONT_SIZE_PT));
}

function inlineMathFontSizePt(block) {
  return sanitizeFontSizePt(block?.inlineMathPt, inlineMathSizeToPt(block?.inlineMathSize || "medium", blockFontSizePt(block) + 2));
}

function textLineFontSizePt(block, lineIndex = 0) {
  const sizes = block?.lineFontSizes && typeof block.lineFontSizes === "object" ? block.lineFontSizes : {};
  const value = sizes[String(lineIndex)];
  if (value === undefined || value === null || value === "") return blockFontSizePt(block);
  return sanitizeFontSizePt(value, blockFontSizePt(block));
}

function normalizeLineFontSizes(block) {
  if (!block.lineFontSizes || typeof block.lineFontSizes !== "object" || Array.isArray(block.lineFontSizes)) block.lineFontSizes = {};
  const lineCount = String(block.content || "").split(/\r?\n/).length;
  Object.keys(block.lineFontSizes).forEach((key) => {
    const index = Number(key);
    if (!Number.isInteger(index) || index < 0 || index >= lineCount) delete block.lineFontSizes[key];
  });
  return block.lineFontSizes;
}

function getTextareaCursorLine(textarea) {
  const cursor = textarea?.selectionStart ?? 0;
  return String(textarea?.value || "").slice(0, cursor).split(/\r?\n/).length - 1;
}

function setActiveTextLine(block, textarea, node = null) {
  if (!block || block.type !== "text" || !textarea) return;
  const lineIndex = Math.max(0, getTextareaCursorLine(textarea));
  activeTextLineByBlock[block.id] = lineIndex;

  const start = Number(textarea.selectionStart ?? 0);
  const end = Number(textarea.selectionEnd ?? start);
  activeTextSelectionByBlock[block.id] = { start: Math.min(start, end), end: Math.max(start, end) };

  const blockNode = node || textarea.closest(".block");
  const fontInput = blockNode?.querySelector('[data-field="fontSizePt"]');
  if (fontInput) fontInput.value = textLineFontSizePt(block, lineIndex);

  const lineLabel = blockNode?.querySelector("[data-current-line-label]");
  if (lineLabel) lineLabel.textContent = end > start ? "選択範囲の文字サイズ" : `${lineIndex + 1}行目の文字サイズ`;
}

function normalizeInlineStyles(block) {
  if (!block.inlineStyles || !Array.isArray(block.inlineStyles)) block.inlineStyles = [];
  const length = String(block.content || "").length;
  block.inlineStyles = block.inlineStyles
    .map((style) => ({
      ...style,
      start: Math.max(0, Math.min(length, Number(style.start) || 0)),
      end: Math.max(0, Math.min(length, Number(style.end) || 0))
    }))
    .filter((style) => style.end > style.start);
  return block.inlineStyles;
}

function hasActiveTextSelection(block) {
  const selection = activeTextSelectionByBlock[block?.id];
  return Boolean(selection && Number(selection.end) > Number(selection.start));
}

function selectedRangeForTextBlock(block) {
  const selection = activeTextSelectionByBlock[block?.id];
  if (!selection) return null;
  const length = String(block.content || "").length;
  const start = Math.max(0, Math.min(length, Number(selection.start) || 0));
  const end = Math.max(start, Math.min(length, Number(selection.end) || 0));
  return end > start ? { start, end } : null;
}

function addInlineStyleRange(block, field, value) {
  const range = selectedRangeForTextBlock(block);
  if (!range) return false;

  normalizeInlineStyles(block);
  const style = { start: range.start, end: range.end };

  if (field === "fontSizePt") style.fontSizePt = sanitizeFontSizePt(value, blockFontSizePt(block));
  if (field === "fontFamily") style.fontFamily = String(value || "default");
  if (field === "color") style.color = normalizeColor(value);

  block.inlineStyles.push(style);
  return true;
}

function effectiveInlineStyleForSegment(styles, start, end) {
  const result = {};
  styles.forEach((style) => {
    if (Number(style.start) < end && Number(style.end) > start) {
      if (style.fontSizePt !== undefined) result.fontSizePt = sanitizeFontSizePt(style.fontSizePt, DEFAULT_FONT_SIZE_PT);
      if (style.fontFamily !== undefined) result.fontFamily = style.fontFamily;
      if (style.color !== undefined) result.color = normalizeColor(style.color);
    }
  });
  return result;
}

function styledTextSegments(text, styles = [], offset = 0) {
  const source = String(text || "");
  const length = source.length;
  const points = new Set([0, length]);

  styles.forEach((style) => {
    const start = Math.max(0, Math.min(length, Number(style.start) - offset));
    const end = Math.max(0, Math.min(length, Number(style.end) - offset));
    if (end > 0 && start < length) {
      points.add(start);
      points.add(end);
    }
  });

  const sorted = Array.from(points).sort((a, b) => a - b);
  const segments = [];

  for (let i = 0; i < sorted.length - 1; i += 1) {
    const start = sorted[i];
    const end = sorted[i + 1];
    if (end <= start) continue;
    segments.push({
      text: source.slice(start, end),
      style: effectiveInlineStyleForSegment(styles, offset + start, offset + end)
    });
  }

  return segments;
}

function appendStyledRichText(target, source, options = {}) {
  const styles = Array.isArray(options.inlineStyles) ? options.inlineStyles : [];
  const offset = Number(options.charOffset || 0);
  if (!styles.length) {
    appendRichText(target, source, options);
    return;
  }

  styledTextSegments(source, styles, offset).forEach((segment) => {
    const hasStyle = segment.style && Object.keys(segment.style).length;
    if (!hasStyle) {
      appendRichText(target, segment.text, options);
      return;
    }

    const span = document.createElement("span");
    span.className = "inline-custom-style";
    if (segment.style.fontSizePt !== undefined) span.style.fontSize = `${segment.style.fontSizePt}pt`;
    if (segment.style.fontFamily !== undefined) span.style.fontFamily = fontFamilyCss(segment.style.fontFamily);
    if (segment.style.color !== undefined) span.style.color = normalizeColor(segment.style.color);
    appendRichText(span, segment.text, { ...options, inlineStyles: null });
    target.appendChild(span);
  });
}

function fontSizeNumberInput(field, value, label = "文字サイズ", min = 6, max = 72, step = 0.5) {
  return `<label>${label}
    <div class="word-size-control">
      <input data-field="${field}" type="number" min="${min}" max="${max}" step="${step}" value="${escapeHtml(sanitizeFontSizePt(value, DEFAULT_FONT_SIZE_PT))}" />
      <span>pt</span>
    </div>
  </label>`;
}

function noteFontSizeNumberInput(index, field, value, label = "文字サイズ", min = 6, max = 72, step = 0.5) {
  return `<label>${label}
    <div class="word-size-control">
      <input data-note-index="${index}" data-note-field="${field}" type="number" min="${min}" max="${max}" step="${step}" value="${escapeHtml(sanitizeFontSizePt(value, DEFAULT_FONT_SIZE_PT))}" />
      <span>pt</span>
    </div>
  </label>`;
}

function paperSizeOptions(selected = "A4") {
  return makeOptions(PAPER_SIZE_LABELS, selected);
}

function paperOrientationOptions(selected = "portrait") {
  return makeOptions(PAPER_ORIENTATION_LABELS, selected);
}

function fontFamilyOptions(selected = "default") {
  return makeOptions(FONT_FAMILY_LABELS, selected);
}

function fontFamilyCss(value = "default") {
  return FONT_FAMILY_VALUES[value] || FONT_FAMILY_VALUES.default;
}

function wordCenterLineOptions(selected = "solid") {
  return makeOptions(WORD_CENTER_LINE_LABELS, selected);
}

function wordCenterLineStyle(value = "solid") {
  return WORD_CENTER_LINE_LABELS[value] ? value : "solid";
}

function blockFontFamily(block) {
  return fontFamilyCss(block?.fontFamily || "default");
}

function getPaperSpec() {
  const key = PAPER_SIZES_MM[state.paperSize] ? state.paperSize : "A4";
  const base = PAPER_SIZES_MM[key];
  const landscape = state.paperOrientation === "landscape";
  const width = landscape ? base.height : base.width;
  const height = landscape ? base.width : base.height;
  const margin = Math.min(40, Math.max(5, Number(state.pageMarginMm) || 18));
  return {
    key,
    label: `${PAPER_SIZE_LABELS[key] || key}${landscape ? "横" : ""}`,
    width,
    height,
    marginTop: margin,
    marginRight: margin,
    marginBottom: margin,
    marginLeft: margin,
    bodyHeight: Math.max(40, height - margin * 2)
  };
}

function ensureDynamicPrintStyle() {
  let style = document.querySelector("#dynamicPrintPageStyle");
  if (!style) {
    style = document.createElement("style");
    style.id = "dynamicPrintPageStyle";
    document.head.appendChild(style);
  }
  return style;
}

function applyPaperSettingsToDocument() {
  const spec = getPaperSpec();
  const root = document.documentElement;
  root.style.setProperty("--paper-width", `${spec.width}mm`);
  root.style.setProperty("--paper-height", `${spec.height}mm`);
  root.style.setProperty("--paper-padding-top", `${spec.marginTop}mm`);
  root.style.setProperty("--paper-padding-right", `${spec.marginRight}mm`);
  root.style.setProperty("--paper-padding-bottom", `${spec.marginBottom}mm`);
  root.style.setProperty("--paper-padding-left", `${spec.marginLeft}mm`);
  root.style.setProperty("--paper-body-height", `${spec.bodyHeight}mm`);
  root.style.setProperty("--base-font-size", `${sanitizeFontSizePt(state.baseFontSizePt, DEFAULT_FONT_SIZE_PT)}pt`);
  root.style.setProperty("--print-font-family", fontFamilyCss(state.baseFontFamily || "gothic"));
  cachedPageHeightPx = null;

  ensureDynamicPrintStyle().textContent = `
    @page {
      size: ${spec.width}mm ${spec.height}mm;
      margin: 0;
    }
  `;
}

function blockColor(block) {
  return normalizeColor(block?.color);
}

function styleControl(block) {
  const isMathBlock = block.type === "math";
  const alignField = isMathBlock ? "mathLayout" : "align";
  const alignLabel = isMathBlock ? "数式配置" : "文字揃え";
  const alignSelected = isMathBlock
    ? normalizeMathLayout(block.mathLayout || block.align || DEFAULT_BLOCK_ALIGN)
    : (block.align || DEFAULT_BLOCK_ALIGN);

  return `
    <div class="style-controls">
      <label class="style-row">
        <span>文字色</span>
        <input data-field="color" type="color" value="${normalizeColor(block.color)}" />
      </label>
      <label class="style-row">
        <span>フォント</span>
        <select data-field="fontFamily">${fontFamilyOptions(block.fontFamily || "default")}</select>
      </label>
      <label class="style-row">
        <span>${block.type === "text" ? `<span data-current-line-label>文字サイズ</span>` : "文字サイズ"}</span>
        <div class="word-size-control">
          <input data-field="fontSizePt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(block.type === "text" ? textLineFontSizePt(block, activeTextLineByBlock[block.id] || 0) : blockFontSizePt(block))}" />
          <span>pt</span>
        </div>
        ${block.type === "text" ? `<span class="mini-note">選択中は選択範囲、未選択時はカーソル行に適用</span>` : ""}
      </label>
      <label class="style-row">
        <span>${alignLabel}</span>
        <select data-field="${alignField}">${blockAlignOptions(alignSelected)}</select>
      </label>
      <label class="style-row">
        <span>ブロック枠</span>
        <select data-field="frame">${blockFrameOptions(block.frame || DEFAULT_BLOCK_FRAME)}</select>
      </label>
    </div>
  `;
}

function problemContentFormatControl(block, columns = 1) {
  const mode = block.problemLayoutMode || "normal";
  return `
    <details class="settings-subsection" open>
      <summary>↳ 内容の書式</summary>
      <div class="three-columns">
        <label>配置モード
          <select data-field="problemLayoutMode">
            ${problemLayoutModeOptions(mode)}
          </select>
          <span class="mini-note">基本は自動判定のままでOK</span>
        </label>
        <label>表示形式
          <select data-field="columns">
            ${problemColumnsOptions(columns)}
          </select>
        </label>
        <label>配置
          <select data-field="align">${blockAlignOptions(block.align || DEFAULT_BLOCK_ALIGN)}</select>
        </label>
      </div>
      <div class="three-columns">
        <label>文字サイズ
          <div class="word-size-control">
            <input data-field="fontSizePt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(blockFontSizePt(block))}" />
            <span>pt</span>
          </div>
        </label>
        <label>数式サイズ
          <div class="word-size-control">
            <input data-field="inlineMathPt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(inlineMathFontSizePt(block))}" />
            <span>pt</span>
          </div>
        </label>
        <label>自由配置の高さ
          <div class="word-size-control">
            <input data-field="freeCanvasHeightMm" type="number" min="30" max="500" step="5" value="${escapeHtml(Number(block.freeCanvasHeightMm) || 95)}" />
            <span>mm</span>
          </div>
        </label>
      </div>
      <div class="three-columns">
        <label>横の間隔
          <select data-field="columnGap">
            ${problemRowGapOptions(block.columnGap || "normal")}
          </select>
        </label>
        <label>縦の間隔
          <select data-field="rowGap">
            ${problemRowGapOptions(block.rowGap || "normal")}
          </select>
        </label>
        <label>空行の間隔
          <select data-field="blankLineGap">
            ${problemBlankLineGapOptions(block.blankLineGap || "large")}
          </select>
        </label>
      </div>
      <div class="three-columns">
        <label>自由配置 初期列数
          <select data-field="freeColumns">${problemColumnsOptions(block.freeColumns || 3)}</select>
        </label>
        <label>自由配置 初期横間隔(px)
          <input data-field="freeColumnGapPx" type="number" min="40" max="420" step="5" value="${escapeHtml(Number(block.freeColumnGapPx) || 190)}" />
        </label>
        <label>自由配置 初期縦間隔(px)
          <input data-field="freeRowGapPx" type="number" min="30" max="260" step="5" value="${escapeHtml(Number(block.freeRowGapPx) || 86)}" />
        </label>
      </div>
      <button type="button" class="secondary small-btn" data-action="reset-free-problem-position">自由配置をリセット</button>
      <div class="helper-text">通常・横並びは1〜4列で自動整列します。自由配置は右側プレビューで各問題をドラッグして位置を決めます。</div>
    </details>
  `;
}

function problemDecorationControl(block) {
  return `
    <div class="two-columns equal-columns">
      <label>文字色
        <input data-field="color" type="color" value="${normalizeColor(block.color)}" />
      </label>
      <label>フォント
        <select data-field="fontFamily">${fontFamilyOptions(block.fontFamily || "default")}</select>
      </label>
      <label>ブロック枠
        <select data-field="frame">${blockFrameOptions(block.frame || DEFAULT_BLOCK_FRAME)}</select>
      </label>
    </div>
    <div class="helper-text">問題ブロック全体の色や枠に反映されます。本文中の強調は、下の記法でも指定できます。</div>
    ${formatHelp()}
  `;
}

function formatHelp() {
  return `<div class="format-help">強調：**太字** / __下線__ / ==マーカー== / [box]枠で囲む[/box]</div>`;
}

function mathHelperButtons(targetField = "content") {
  const buttons = [
    { label: "□/□", text: "1/2", back: 0 },
    { label: "√", text: "√()", back: 1 },
    { label: "x^2", text: "^2", back: 0 },
    { label: "大かっこ", text: "()", back: 1 },
    { label: "≦", text: "<=", back: 0 },
    { label: "≧", text: ">=", back: 0 },
    { label: "±", text: "+-", back: 0 },
    { label: "×", text: "*", back: 0 },
    { label: "÷", text: "÷", back: 0 }
  ];
  return `<div class="math-helper" data-target-field="${targetField}">
    <span>数式補助</span>
    ${buttons.map((item) => `<button type="button" class="math-insert-btn" data-insert-text="${escapeHtml(item.text)}" data-cursor-back="${item.back}" data-target-field="${targetField}">${escapeHtml(item.label)}</button>`).join("")}
  </div>`;
}

function setSectionColor(section, block) {
  section.style.color = blockColor(block);
}

function numberValue(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, numberValue(value, 0)));
}

function normalizeAnswerOffset(x, y) {
  return {
    x: Math.round(clampNumber(x, -420, 420)),
    y: Math.round(clampNumber(y, -240, 240))
  };
}

function getAnswerOffset(block, index = null) {
  if (index !== null && block.answerPositions && block.answerPositions[index]) {
    return normalizeAnswerOffset(block.answerPositions[index].x, block.answerPositions[index].y);
  }
  return normalizeAnswerOffset(block.answerX, block.answerY);
}

function setAnswerOffset(block, index, x, y) {
  const offset = normalizeAnswerOffset(x, y);
  if (index !== null) {
    if (!block.answerPositions || typeof block.answerPositions !== "object" || Array.isArray(block.answerPositions)) {
      block.answerPositions = {};
    }
    block.answerPositions[index] = offset;
  } else {
    block.answerX = offset.x;
    block.answerY = offset.y;
  }
  return offset;
}

function applyAnswerOffset(element, offset) {
  const safe = normalizeAnswerOffset(offset?.x, offset?.y);
  element.style.setProperty("--drag-x", `${safe.x}px`);
  element.style.setProperty("--drag-y", `${safe.y}px`);
  element.style.transform = `translate(${safe.x}px, ${safe.y}px)`;
  element.dataset.answerX = String(safe.x);
  element.dataset.answerY = String(safe.y);
  element.classList.toggle("answer-moved", safe.x !== 0 || safe.y !== 0);
}

function applyAnswerOffsetToMatchingElements(blockId, index, offset) {
  if (!printArea || !blockId) return;
  const selector = `.draggable-answer[data-block-id="${CSS.escape(String(blockId))}"][data-answer-index="${index === null ? "" : String(index)}"]`;
  printArea.querySelectorAll(selector).forEach((node) => applyAnswerOffset(node, offset));
}

function attachDraggableAnswer(element, block, index = null) {
  if (boundAnswerElements.has(element)) return;
  boundAnswerElements.add(element);
  element.classList.add("draggable-answer");
  element.dataset.blockId = block.id || "";
  element.dataset.answerIndex = index === null ? "" : String(index);
  element.title = "ドラッグで解答欄の位置を調整できます";
  applyAnswerOffset(element, getAnswerOffset(block, index));

  let dragging = false;
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;

  const finishDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const offset = setAnswerOffset(block, index, baseX + dx, baseY + dy);
    applyAnswerOffsetToMatchingElements(block.id, index, offset);
    element.classList.remove("dragging-answer");
    try {
      if (pointerId !== null) element.releasePointerCapture(pointerId);
    } catch (error) {
      // releasePointerCapture が不要な環境では無視します。
    }
    pointerId = null;
    saveToBrowser(50);
    updatePageStatus();
  };

  element.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const current = getAnswerOffset(block, index);
    dragging = true;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    baseX = current.x;
    baseY = current.y;
    element.classList.add("dragging-answer");
    try {
      element.setPointerCapture(event.pointerId);
    } catch (error) {
      // pointer capture 非対応でも通常のドラッグは動きます。
    }
  });

  element.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    event.preventDefault();
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const liveOffset = normalizeAnswerOffset(baseX + dx, baseY + dy);
    applyAnswerOffset(element, liveOffset);
  });

  element.addEventListener("pointerup", finishDrag);
  element.addEventListener("pointercancel", finishDrag);
}


function getPageBodySize() {
  const existing = printArea?.querySelector(".print-page-body");
  if (existing) {
    const rect = existing.getBoundingClientRect();
    if (rect?.width && rect?.height) return { width: rect.width, height: rect.height };
  }
  return { width: 660, height: getA4PreviewContentHeightPx() };
}

function getPageBodyMm() {
  const spec = getPaperSpec();
  return {
    width: Math.max(20, spec.width - spec.marginLeft - spec.marginRight),
    height: Math.max(20, spec.bodyHeight)
  };
}

function pxToMmX(px) {
  const size = getPageBodySize();
  const mm = getPageBodyMm();
  return Math.round(((Number(px) || 0) / Math.max(1, size.width)) * mm.width * 10) / 10;
}

function pxToMmY(px) {
  const size = getPageBodySize();
  const mm = getPageBodyMm();
  return Math.round(((Number(px) || 0) / Math.max(1, size.height)) * mm.height * 10) / 10;
}

function mmToPxX(mmValue) {
  const size = getPageBodySize();
  const mm = getPageBodyMm();
  return Math.round(((Number(mmValue) || 0) / Math.max(1, mm.width)) * size.width);
}

function mmToPxY(mmValue) {
  const size = getPageBodySize();
  const mm = getPageBodyMm();
  return Math.round(((Number(mmValue) || 0) / Math.max(1, mm.height)) * size.height);
}

function normalizeFloatingNoteOffset(x, y) {
  const size = getPageBodySize();
  return {
    x: Math.round(clampNumber(x, -20, Math.max(1200, size.width + 400))),
    y: Math.round(clampNumber(y, -20, Math.max(1800, size.height + 600)))
  };
}

function normalizeFloatingNotePage(noteOrBlock) {
  return Math.max(1, Math.round(Number(noteOrBlock.page ?? noteOrBlock.notePage ?? 1) || 1));
}

function getFloatingNoteOffset(noteOrBlock) {
  if (Number.isFinite(Number(noteOrBlock.xMm)) || Number.isFinite(Number(noteOrBlock.yMm))) {
    return normalizeFloatingNoteOffset(mmToPxX(noteOrBlock.xMm), mmToPxY(noteOrBlock.yMm));
  }
  return normalizeFloatingNoteOffset(noteOrBlock.x ?? noteOrBlock.noteX, noteOrBlock.y ?? noteOrBlock.noteY);
}

function setFloatingNoteOffset(noteOrBlock, x, y, page = null) {
  const offset = normalizeFloatingNoteOffset(x, y);
  const xMm = pxToMmX(offset.x);
  const yMm = pxToMmY(offset.y);
  if ("x" in noteOrBlock || "y" in noteOrBlock || "text" in noteOrBlock) {
    noteOrBlock.x = offset.x;
    noteOrBlock.y = offset.y;
    noteOrBlock.xMm = xMm;
    noteOrBlock.yMm = yMm;
    if (page !== null) noteOrBlock.page = Math.max(1, Math.round(Number(page) || 1));
  } else {
    noteOrBlock.noteX = offset.x;
    noteOrBlock.noteY = offset.y;
    noteOrBlock.noteXMm = xMm;
    noteOrBlock.noteYMm = yMm;
    if (page !== null) noteOrBlock.notePage = Math.max(1, Math.round(Number(page) || 1));
  }
  return offset;
}

function normalizeFloatingNotePageAndOffset(note, x, y) {
  const size = getPageBodySize();
  let page = normalizeFloatingNotePage(note);
  let nextY = Number(y) || 0;

  while (nextY >= size.height && page < 99) {
    nextY -= size.height;
    page += 1;
  }
  while (nextY < 0 && page > 1) {
    nextY += size.height;
    page -= 1;
  }

  return { page, ...normalizeFloatingNoteOffset(x, nextY) };
}

function applyFloatingNoteOffset(element, offset, page = null) {
  const safe = normalizeFloatingNoteOffset(offset?.x, offset?.y);
  element.style.left = `${safe.x}px`;
  element.style.top = `${safe.y}px`;
  element.style.transform = "none";
  element.style.setProperty("--drag-x", "0px");
  element.style.setProperty("--drag-y", "0px");
  element.dataset.noteX = String(safe.x);
  element.dataset.noteY = String(safe.y);
  if (page !== null) element.dataset.notePage = String(page);
  element.classList.toggle("note-moved", safe.x !== 0 || safe.y !== 0 || Number(page || 1) !== 1);
}

function applyFloatingNoteOffsetToMatchingElements(blockId, noteIndex, offset, page = null) {
  if (!printArea || !blockId) return;
  const selector = `.word-floating-note[data-block-id="${CSS.escape(String(blockId))}"][data-note-index="${noteIndex === null ? "" : String(noteIndex)}"]`;
  printArea.querySelectorAll(selector).forEach((node) => applyFloatingNoteOffset(node, offset, page));
}

function attachDraggableFloatingNote(element, block, noteIndex = null) {
  if (boundFloatingNoteElements.has(element)) return;
  boundFloatingNoteElements.add(element);
  element.classList.add("word-floating-note", "draggable-floating-note");
  element.dataset.blockId = block.id || "";
  element.dataset.noteIndex = noteIndex === null ? "" : String(noteIndex);
  element.title = "Wordのテキストボックスのようにドラッグでページ上に配置できます";
  const noteData = noteIndex === null ? block : normalizeTextNotes(block)[noteIndex];
  applyFloatingNoteOffset(element, getFloatingNoteOffset(noteData), normalizeFloatingNotePage(noteData));

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let basePage = 1;

  const finishDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const targetNote = noteIndex === null ? block : normalizeTextNotes(block)[noteIndex];
    targetNote.page = basePage;
    const adjusted = normalizeFloatingNotePageAndOffset(targetNote, baseX + dx, baseY + dy);
    targetNote.page = adjusted.page;
    setFloatingNoteOffset(targetNote, adjusted.x, adjusted.y, adjusted.page);
    element.classList.remove("dragging-floating-note");
    renderPreview();
    saveToBrowser();
    try {
      element.releasePointerCapture(event.pointerId);
    } catch (error) {
      // pointer capture 非対応でも通常のドラッグは動きます。
    }
  };

  element.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const current = getFloatingNoteOffset(noteData);
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    baseX = current.x;
    baseY = current.y;
    basePage = normalizeFloatingNotePage(noteData);
    element.classList.add("dragging-floating-note");
    try {
      element.setPointerCapture(event.pointerId);
    } catch (error) {
      // pointer capture 非対応でも通常のドラッグは動きます。
    }
  });

  element.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    event.preventDefault();
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const offset = normalizeFloatingNoteOffset(baseX + dx, baseY + dy);
    applyFloatingNoteOffset(element, offset, basePage);
  });

  element.addEventListener("pointerup", finishDrag);
  element.addEventListener("pointercancel", finishDrag);
}

function createWordFloatingNoteBox(block, noteData, noteIndex) {
  const note = createFloatingNoteBox(block, noteData, noteIndex);
  note.classList.add("word-floating-note");
  note.style.position = "absolute";
  note.style.transform = "none";
  note.style.zIndex = "30";
  return note;
}

function renderWordFloatingNotesOnPages() {
  if (!printArea) return;
  const pages = Array.from(printArea.querySelectorAll(".print-page"));
  if (!pages.length) return;

  state.blocks.forEach((block) => {
    if (block.type !== "text") return;
    normalizeTextNotes(block).forEach((note, noteIndex) => {
      if (!boolValue(note.enabled, false) && !String(note.text || "").trim()) return;
      let pageIndex = normalizeFloatingNotePage(note) - 1;
      while (pageIndex >= pages.length) {
        const current = createPreviewPage(pages.length + 1);
        current.page.dataset.page = String(pages.length + 1);
        const label = current.page.querySelector(".print-page-label");
        if (label) label.textContent = `${pages.length + 1}ページ目`;
        printArea.appendChild(current.page);
        pages.push(current.page);
      }

      const body = pages[pageIndex]?.querySelector(".print-page-body");
      if (!body) return;
      const noteBox = createWordFloatingNoteBox(block, note, noteIndex);
      body.appendChild(noteBox);
    });
  });
}

function createFloatingNoteBox(block, noteData = null, noteIndex = null) {
  const data = noteData || createTextNote(block);
  const note = document.createElement("div");
  const frame = data.frame || "simple";
  const fontSize = data.fontSize || "normal";
  note.className = `floating-note-box block-frame-${frame} text-size-${fontSize}`;
  note.style.fontSize = `${noteFontSizePt(data)}pt`;
  note.style.fontFamily = fontFamilyCss(data.fontFamily || "default");
  note.style.color = normalizeColor(data.color || block.color);
  note.style.textAlign = data.align || "left";
  const width = Math.min(Math.max(Number(data.width) || 170, 80), 420);
  note.style.setProperty("--note-width", `${width}px`);
  note.appendChild(renderTextWithInlineMath(data.text || "補助内容"));
  attachDraggableFloatingNote(note, block, noteIndex);
  return note;
}

function createAnswerSpace(block, className, index = null) {
  const answer = document.createElement("div");
  answer.className = className;
  attachDraggableAnswer(answer, block, index);
  return answer;
}

function applyBlockStyle(section, block) {
  setSectionColor(section, block);
  section.classList.add(`block-frame-${block.frame || DEFAULT_BLOCK_FRAME}`);
  section.classList.add(`text-size-${block.textSize || DEFAULT_TEXT_SIZE}`);
  section.style.fontSize = `${blockFontSizePt(block)}pt`;
  section.style.fontFamily = blockFontFamily(block);
  section.classList.add(`block-align-${block.align || DEFAULT_BLOCK_ALIGN}`);
}

function migrateStateData(data) {
  state.title = data?.title || state.title || "";
  state.unit = data?.unit || state.unit || "";
  state.nameLine = data?.nameLine || state.nameLine || "";
  state.paperSize = PAPER_SIZES_MM[data?.paperSize] ? data.paperSize : (PAPER_SIZES_MM[state.paperSize] ? state.paperSize : "A4");
  state.paperOrientation = ["portrait", "landscape"].includes(data?.paperOrientation) ? data.paperOrientation : (state.paperOrientation || "portrait");
  state.baseFontSizePt = sanitizeFontSizePt(data?.baseFontSizePt, DEFAULT_FONT_SIZE_PT);
  state.baseFontFamily = FONT_FAMILY_VALUES[data?.baseFontFamily] ? data.baseFontFamily : (state.baseFontFamily || "gothic");
  state.pageMarginMm = Math.min(40, Math.max(5, Number(data?.pageMarginMm || state.pageMarginMm || 18)));
  state.blocks = Array.isArray(data?.blocks) ? data.blocks : state.blocks;
  state.blocks.forEach((block) => {
    if (!block.id) block.id = crypto.randomUUID();
    if (!block.type) block.type = "text";
    block.color = normalizeColor(block.color);
    if (!block.frame) block.frame = DEFAULT_BLOCK_FRAME;
    if (!block.textSize) block.textSize = DEFAULT_TEXT_SIZE;
    if (!block.fontFamily) block.fontFamily = "default";
    if (!block.fontSizePt) block.fontSizePt = textSizeToPt(block.textSize, state.baseFontSizePt);
    block.fontSizePt = sanitizeFontSizePt(block.fontSizePt, textSizeToPt(block.textSize, state.baseFontSizePt));
    if (!block.align) block.align = DEFAULT_BLOCK_ALIGN;
    if (block.type === "text") {
      normalizeTextNotes(block);
      if (block.textAutoLayout === undefined) block.textAutoLayout = true;
      if (!block.columns) block.columns = 2;
      block.columns = Math.min(4, Math.max(1, Number(block.columns) || 2));
      if (!block.columnGap) block.columnGap = "wide";
      if (block.textColumnGapPx === undefined) block.textColumnGapPx = 80;
      if (!block.rowGap) block.rowGap = "normal";
      if (!block.blankLineGap) block.blankLineGap = "large";
      if (!block.inlineMathPt) block.inlineMathPt = 14;
      if (!block.lineFontSizes || typeof block.lineFontSizes !== "object" || Array.isArray(block.lineFontSizes)) block.lineFontSizes = {};
      normalizeInlineStyles(block);
    }
    if (block.type === "sidebox") {
      if (!block.boxFrame) block.boxFrame = "simple";
      if (!block.boxFontSize) block.boxFontSize = "normal";
      if (!block.boxFontSizePt) block.boxFontSizePt = textSizeToPt(block.boxFontSize);
      if (!block.boxFontFamily) block.boxFontFamily = "default";
      if (!block.boxPosition) block.boxPosition = "right";
      if (!block.boxWidth) block.boxWidth = 35;
      if (!block.boxColor) block.boxColor = block.color;
      if (!block.boxAlign) block.boxAlign = "left";
    }
    if (block.type === "problemRow") {
      // v24からは「問題」ブロックに統合します。旧データは自動で変換します。
      block.type = "problem";
      if (block.number === undefined || block.number === "") block.number = nextProblemNumber();
    }
    if (block.type === "freeProblem") {
      block.type = "problem";
      block.problemLayoutMode = "free";
      if (block.number === undefined || block.number === "") block.number = 0;
      if (!block.answerSize) block.answerSize = "none";
    }
    if (block.type === "problem") {
      if (block.content === undefined) {
        const textPart = block.text || "";
        const mathPart = block.math || "";
        block.content = [textPart, mathPart].filter(Boolean).join("\n");
      }
      if (block.number === undefined || block.number === "") block.number = nextProblemNumber();
      if (!block.problemLayoutMode) block.problemLayoutMode = "auto";
      if (!block.columns) block.columns = 1;
      block.columns = Math.min(4, Math.max(1, Number(block.columns) || 1));
      if (!block.freeCanvasHeightMm) block.freeCanvasHeightMm = 95;
      if (!block.freeColumns) block.freeColumns = 3;
      if (!block.freeColumnGapPx) block.freeColumnGapPx = 190;
      if (!block.freeRowGapPx) block.freeRowGapPx = 86;
      if (!block.freePositions || typeof block.freePositions !== "object" || Array.isArray(block.freePositions)) block.freePositions = {};
      if (!block.answerSize) block.answerSize = block.problemLayoutMode === "free" ? "none" : "medium";
      if (!block.answerFormat) block.answerFormat = "line";
      if (!block.answerBoxSize) block.answerBoxSize = "medium";
      if (!block.answerPlacement) block.answerPlacement = "bottom";
      if (!block.inlineMathSize) block.inlineMathSize = block.columns > 1 ? "large" : "medium";
      if (!block.inlineMathPt) block.inlineMathPt = inlineMathSizeToPt(block.inlineMathSize);
      if (!block.columnGap) block.columnGap = "normal";
      if (!block.rowGap) block.rowGap = "normal";
      if (!block.blankLineGap) block.blankLineGap = "large";
      if (block.answerX === undefined) block.answerX = 0;
      if (block.answerY === undefined) block.answerY = 0;
      if (!block.answerPositions || typeof block.answerPositions !== "object" || Array.isArray(block.answerPositions)) block.answerPositions = {};
      delete block.mathLayout;
    }
    if (block.type === "math" && block.mathLayout === "leftSmall") block.mathLayout = "left";
    if (block.type === "math" && ["left", "center", "right"].includes(block.align) && !block.mathLayout) {
      block.mathLayout = block.align;
    }
    if (block.type === "math" && !block.mathLayout) block.mathLayout = "center";
    if (block.type === "freeProblem") {
      if (!block.content) block.content = "(1)\n(2)\n(3)\n\n(4)\n(5)\n(6)";
      if (!block.freeCanvasHeightMm) block.freeCanvasHeightMm = 95;
      if (!block.inlineMathPt) block.inlineMathPt = 14;
      if (!block.freeColumns) block.freeColumns = 3;
      if (!block.freeColumnGapPx) block.freeColumnGapPx = 190;
      if (!block.freeRowGapPx) block.freeRowGapPx = 86;
      if (!block.freePositions || typeof block.freePositions !== "object" || Array.isArray(block.freePositions)) block.freePositions = {};
    }
    if (block.type === "testLayout") {
      if (!block.testTitle) block.testTitle = "テスト名";
      if (!block.leftTitle) block.leftTitle = "左列";
      if (!block.rightTitle) block.rightTitle = "右列";
      if (block.leftContent === undefined) block.leftContent = "";
      if (block.rightContent === undefined) block.rightContent = "";
      if (block.showAnswerBox === undefined) block.showAnswerBox = true;
      if (!block.testHeaderFontSizePt) block.testHeaderFontSizePt = 16;
      if (!block.testBodyFontSizePt) block.testBodyFontSizePt = 13;
      if (!block.testFontFamily) block.testFontFamily = "default";
      if (!block.testHeightMm) block.testHeightMm = 180;
      if (!block.centerLineStyle) block.centerLineStyle = "solid";
      if (block.centerLineWidthPx === undefined) block.centerLineWidthPx = 1;
      if (!block.centerLineColor) block.centerLineColor = "#111111";
    }
    if (["numberline", "geometry", "coordinate"].includes(block.type) && !block.diagramLayout) block.diagramLayout = "center";
    if (["numberline", "coordinate"].includes(block.type)) {
      if (block.showTicks === undefined) block.showTicks = true;
      if (block.showLabels === undefined) block.showLabels = true;
    }
  });
}

function updateSaveStatus(text, className = "") {
  if (!saveStatus) return;
  saveStatus.textContent = text;
  saveStatus.className = `save-status ${className}`.trim();
}

function saveToBrowser(delay = 250) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      state.title = titleInput.value;
      state.unit = unitInput.value;
      state.nameLine = nameLineInput.value;
      state.paperSize = paperSizeInput?.value || state.paperSize || "A4";
      state.paperOrientation = paperOrientationInput?.value || state.paperOrientation || "portrait";
      state.baseFontSizePt = sanitizeFontSizePt(baseFontSizeInput?.value, DEFAULT_FONT_SIZE_PT);
      state.baseFontFamily = baseFontFamilyInput?.value || state.baseFontFamily || "gothic";
      state.pageMarginMm = Math.min(40, Math.max(5, Number(pageMarginInput?.value) || 18));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      markDocumentDirty();
      updateSaveStatus("自動保存済み", "saved");
    } catch (error) {
      updateSaveStatus("自動保存できませんでした", "error");
    }
  }, delay);
}

function savedDataScore(data, key = "") {
  if (!data || typeof data !== "object") return -1;
  const blocks = Array.isArray(data.blocks) ? data.blocks : [];
  let score = blocks.length * 100;
  blocks.forEach((block) => {
    const raw = [block.content, block.text, block.boxText, block.title, block.points, block.functions, block.leftContent, block.rightContent, block.testTitle].filter(Boolean).join("\n");
    score += String(raw).trim().length;
    if (Array.isArray(block.noteBoxes)) score += block.noteBoxes.length * 80;
    if (block.type === "testLayout") score += 120;
    if (block.type === "problem" && Number(block.columns) > 1) score += 80;
    if (block.type === "freeProblem" || block.problemLayoutMode === "free") score += 80;
  });
  score += [data.title, data.unit, data.nameLine].filter(Boolean).join("").length;
  if (/V4[4-8]$/.test(key)) score -= 250;
  if (data.title === "分数の計算" && data.unit === "中1 数学 / 正負の数" && blocks.length <= 5) score -= 1200;
  return score;
}

function loadFromBrowser() {
  const keys = [STORAGE_KEY, ...(Array.isArray(LEGACY_STORAGE_KEYS) ? LEGACY_STORAGE_KEYS : [])];
  const candidates = [];

  keys.forEach((key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      candidates.push({ key, parsed, score: savedDataScore(parsed, key) });
    } catch (error) {
      console.warn(`保存データを読込めませんでした: ${key}`, error);
    }
  });

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates.find((item) => item.score >= 0) || candidates[0];
  if (!best) {
    updateSaveStatus("保存データなし", "");
    return false;
  }

  try {
    migrateStateData(best.parsed);
    updateSaveStatus(`保存データを復元: ${best.key.replace("mathPrintToolAutoSave", "v")}`, "saved");
    saveToBrowser(0);
    return true;
  } catch (error) {
    console.error("保存データの復元に失敗しました", error);
    updateSaveStatus("保存データを復元できませんでした", "error");
    return false;
  }
}

function exportAllBrowserSaves() {
  const keys = [STORAGE_KEY, ...(Array.isArray(LEGACY_STORAGE_KEYS) ? LEGACY_STORAGE_KEYS : [])];
  const backup = {};
  keys.forEach((key) => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) backup[key] = JSON.parse(raw);
    } catch (error) {
      backup[key] = { error: String(error), raw: localStorage.getItem(key) };
    }
  });
  downloadText("math-print-all-browser-saves.json", JSON.stringify(backup, null, 2), "application/json");
}

function clearBrowserSave() {
  [STORAGE_KEY, ...(Array.isArray(LEGACY_STORAGE_KEYS) ? LEGACY_STORAGE_KEYS : [])].forEach((key) => localStorage.removeItem(key));
  updateSaveStatus("自動保存を削除しました");
}

function getA4HeightPx() {
  if (cachedPageHeightPx) return cachedPageHeightPx;
  const spec = getPaperSpec();
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.height = `${spec.height}mm`;
  probe.style.width = "1px";
  document.body.appendChild(probe);
  cachedPageHeightPx = probe.getBoundingClientRect().height || 1122;
  probe.remove();
  return cachedPageHeightPx;
}

function getA4PreviewContentHeightPx() {
  const probe = document.createElement("div");
  probe.className = "print-page";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.left = "-9999px";
  probe.innerHTML = '<div class="print-page-body"></div>';
  document.body.appendChild(probe);
  const body = probe.querySelector(".print-page-body");
  const height = body?.getBoundingClientRect().height || (getA4HeightPx() * 259 / 297);
  probe.remove();
  return height;
}

function createPreviewPage(pageNumber) {
  const page = document.createElement("div");
  page.className = "print-page";
  page.dataset.page = String(pageNumber);

  const body = document.createElement("div");
  body.className = "print-page-body";
  page.appendChild(body);

  const label = document.createElement("div");
  label.className = "print-page-label";
  label.textContent = `${pageNumber}ページ目`;
  page.appendChild(label);

  return { page, body, label };
}
function findBlockById(blockId) {
  return state.blocks.find((block) => String(block.id) === String(blockId));
}

function rehydrateDraggablePreviewElements() {
  if (!printArea) return;

  printArea.querySelectorAll(".word-floating-note[data-block-id]").forEach((element) => {
    const block = findBlockById(element.dataset.blockId);
    if (!block) return;
    const rawIndex = element.dataset.noteIndex;
    const noteIndex = rawIndex === "" || rawIndex === undefined ? null : Number(rawIndex);
    attachDraggableFloatingNote(element, block, Number.isFinite(noteIndex) ? noteIndex : null);
  });

  printArea.querySelectorAll(".draggable-answer[data-block-id]").forEach((element) => {
    const block = findBlockById(element.dataset.blockId);
    if (!block) return;
    const rawIndex = element.dataset.answerIndex;
    const answerIndex = rawIndex === "" || rawIndex === undefined ? null : Number(rawIndex);
    attachDraggableAnswer(element, block, Number.isFinite(answerIndex) ? answerIndex : null);
  });

  printArea.querySelectorAll(".free-problem-item[data-block-id]").forEach((element) => {
    const block = findBlockById(element.dataset.blockId);
    if (!block) return;
    const index = Number(element.dataset.freeIndex);
    if (Number.isFinite(index)) attachDraggableFreeProblemItem(element, block, index);
  });
}



function getSlicedPreviewSourceHeight(source, pageBodyHeight) {
  const sourceRect = source.getBoundingClientRect();
  let height = Math.max(source.scrollHeight, sourceRect.height, pageBodyHeight);

  const targets = source.querySelectorAll(".floating-note-box, .draggable-floating-note, .answer-space, .draggable-answer");
  targets.forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (!rect || !Number.isFinite(rect.bottom)) return;
    const bottom = rect.bottom - sourceRect.top;
    if (Number.isFinite(bottom)) height = Math.max(height, bottom + 12);
  });

  return height;
}

function isPageBreakAvoidTarget(node) {
  if (!node || node.nodeType !== 1) return false;
  return node.matches?.([
    ".print-block",
    ".sidebox-layout",
    ".test-layout-block",
    ".diagram-block",
    ".numberline-block",
    ".coordinate-block",
    ".geometry-block",
    ".text-auto-grid",
    ".problem-row-grid",
    ".free-problem-canvas",
    ".math-block"
  ].join(", "));
}

function getElementTopRelativeToSource(node, sourceRect) {
  const rect = node.getBoundingClientRect();
  return rect.top - sourceRect.top;
}

function getElementHeight(node) {
  const rect = node.getBoundingClientRect();
  return rect.height || node.offsetHeight || 0;
}

function getNextBreakAvoidSibling(node) {
  let next = node.nextElementSibling;
  while (next && next.classList.contains("auto-page-spacer")) next = next.nextElementSibling;
  return next;
}

function isHeadingLikeBlock(node) {
  if (!node) return false;
  if (node.dataset.blockType === "heading") return true;
  if (node.querySelector?.(".print-heading")) return true;

  const text = String(node.textContent || "").trim();
  const height = getElementHeight(node);
  return text.length > 0 && text.length <= 32 && height < 120;
}

function requiredSpaceAfterHeading(node, next, pageBodyHeight) {
  const headingHeight = getElementHeight(node);
  const nextHeight = next ? getElementHeight(next) : 0;

  // Wordの「次の段落と分離しない」に寄せる。
  // 見出しだけでページ下に残さず、次の本文の冒頭数行分も一緒に入るかを見る。
  const firstPartOfNext = Math.min(Math.max(nextHeight * 0.28, 150), 260);
  const pageBottomSafety = Math.min(Math.max(pageBodyHeight * 0.23, 210), 310);
  return Math.max(headingHeight + firstPartOfNext, pageBottomSafety);
}

function insertSpacerBefore(source, node, height) {
  const spacerHeight = Math.max(0, Math.ceil(height));
  if (spacerHeight <= 2) return false;
  const spacer = document.createElement("div");
  spacer.className = "auto-page-spacer";
  spacer.style.height = `${spacerHeight}px`;
  spacer.setAttribute("aria-hidden", "true");
  source.insertBefore(spacer, node);
  return true;
}

function insertAutoPageSpacers(source, pageBodyHeight) {
  if (!source || !Number.isFinite(pageBodyHeight) || pageBodyHeight <= 0) return;

  source.querySelectorAll(".auto-page-spacer").forEach((node) => node.remove());

  // スペーサーを入れると位置が変わるため、安定するまで再計算する。
  for (let pass = 0; pass < 8; pass += 1) {
    let changed = false;
    const sourceRect = source.getBoundingClientRect();
    const targets = Array.from(source.children).filter(isPageBreakAvoidTarget);

    for (const node of targets) {
      const rect = node.getBoundingClientRect();
      if (!rect || !Number.isFinite(rect.top) || !Number.isFinite(rect.height)) continue;

      const top = rect.top - sourceRect.top;
      const height = rect.height;
      const pageTop = Math.floor(Math.max(0, top) / pageBodyHeight) * pageBodyHeight;
      const pageBottom = pageTop + pageBodyHeight;
      const remaining = pageBottom - top;

      const isHuge = height >= pageBodyHeight * 0.92;
      let shouldBreak = !isHuge && remaining > 0 && height > remaining - 8;

      if (!shouldBreak && isHeadingLikeBlock(node)) {
        const next = getNextBreakAvoidSibling(node);
        const needed = requiredSpaceAfterHeading(node, next, pageBodyHeight);

        // 見出しがページ下部に入ったら、改行で押し下げられたものとして次ページへ送る。
        if (remaining < needed) shouldBreak = true;
      }

      if (shouldBreak) {
        if (insertSpacerBefore(source, node, remaining + 1)) changed = true;
        break;
      }
    }

    if (!changed) break;
  }
}

function hideBoundaryHeadingsOnPreviousPages(pageBodyHeight) {
  if (!printArea || !Number.isFinite(pageBodyHeight) || pageBodyHeight <= 0) return;

  const pages = Array.from(printArea.querySelectorAll(".print-page"));
  if (pages.length <= 1) return;

  const boundaryZone = 120; // ページ末尾この範囲の見出しは次ページへ送る
  const topZone = 160;      // 次ページ上部に同じ見出しがあれば、前ページ側を消す

  for (let pageIndex = 0; pageIndex < pages.length - 1; pageIndex += 1) {
    const currentPage = pages[pageIndex];
    const nextPage = pages[pageIndex + 1];
    const currentBody = currentPage.querySelector(".print-page-body");
    const nextBody = nextPage.querySelector(".print-page-body");
    if (!currentBody || !nextBody) continue;

    const currentBodyRect = currentBody.getBoundingClientRect();
    const nextBodyRect = nextBody.getBoundingClientRect();

    const currentHeadings = Array.from(currentBody.querySelectorAll(".print-page-slice .print-block[data-block-type='heading'], .print-page-slice .print-heading"));
    const nextHeadings = Array.from(nextBody.querySelectorAll(".print-page-slice .print-block[data-block-type='heading'], .print-page-slice .print-heading"));

    currentHeadings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      const topInBody = rect.top - currentBodyRect.top;
      const bottomInBody = rect.bottom - currentBodyRect.top;
      const text = String(heading.textContent || "").trim();
      if (!text) return;

      const nearBottom = bottomInBody > pageBodyHeight - boundaryZone;
      if (!nearBottom) return;

      const existsOnNextTop = nextHeadings.some((nextHeading) => {
        const nextText = String(nextHeading.textContent || "").trim();
        if (nextText !== text) return false;
        const nextRect = nextHeading.getBoundingClientRect();
        const nextTop = nextRect.top - nextBodyRect.top;
        return nextTop >= -12 && nextTop < topZone;
      });

      // 同じ見出しが次ページ上部に出ているなら、前ページ末尾の見出しは消す。
      // 同じ見出しがなくても、ページ末尾に見出しだけ残る場合は消す。
      if (existsOnNextTop || topInBody > pageBodyHeight - boundaryZone) {
        heading.classList.add("hide-boundary-heading");
        const block = heading.closest(".print-block[data-block-type='heading']");
        if (block) block.classList.add("hide-boundary-heading");
      }
    });
  }
}

function insertLinePageSpacers(source, pageBodyHeight) {
  if (!source || !Number.isFinite(pageBodyHeight) || pageBodyHeight <= 0) return;

  source.querySelectorAll(".auto-line-page-spacer").forEach((node) => node.remove());

  // Wordのように、同じ本文ブロック内でもページ下端にかかる行は次ページへ送る。
  for (let pass = 0; pass < 10; pass += 1) {
    let changed = false;
    const sourceRect = source.getBoundingClientRect();
    const candidates = Array.from(source.querySelectorAll(".auto-math-line"));

    for (const line of candidates) {
      const rect = line.getBoundingClientRect();
      if (!rect || !Number.isFinite(rect.top) || !Number.isFinite(rect.height)) continue;
      if (rect.height <= 0 || rect.height >= pageBodyHeight * 0.8) continue;

      const top = rect.top - sourceRect.top;
      const bottom = rect.bottom - sourceRect.top;
      const pageTop = Math.floor(Math.max(0, top) / pageBodyHeight) * pageBodyHeight;
      const pageBottom = pageTop + pageBodyHeight;
      const remaining = pageBottom - top;

      const needsNextPage = top > pageTop + 2 && (remaining < rect.height + 8 || bottom > pageBottom - 6);
      if (!needsNextPage) continue;

      const spacer = document.createElement("span");
      spacer.className = "auto-line-page-spacer";
      spacer.style.height = `${Math.max(0, Math.ceil(remaining + 1))}px`;
      spacer.setAttribute("aria-hidden", "true");
      line.parentNode.insertBefore(spacer, line);

      changed = true;
      break;
    }

    if (!changed) break;
  }
}

function paginateA4Preview() {
  if (!printArea) return;
  const originalNodes = Array.from(printArea.childNodes).filter((node) => {
    if (node.nodeType !== 1) return true;
    return !node.classList?.contains("print-page") && !node.classList?.contains("print-flow-source");
  });
  if (!originalNodes.length) return;

  printArea.innerHTML = "";
  printArea.classList.add("paged-preview", "paged-preview-sliced");

  // v32: Wordのように、A4本文領域の高さごとに同じ本文を切り出して表示します。
  // これにより、1ページ目からはみ出した下側の内容が、プレビュー上でも2ページ目へ続きます。
  const source = document.createElement("div");
  source.className = "print-flow-source";
  originalNodes.forEach((node) => source.appendChild(node));
  printArea.appendChild(source);

  const pageBodyHeight = getA4PreviewContentHeightPx();
  insertAutoPageSpacers(source, pageBodyHeight);
  insertLinePageSpacers(source, pageBodyHeight);
  const sourceHeight = getSlicedPreviewSourceHeight(source, pageBodyHeight);
  const pageCount = Math.max(1, Math.ceil((sourceHeight - 1) / pageBodyHeight));

  for (let index = 0; index < pageCount; index += 1) {
    const current = createPreviewPage(index + 1);
    const slice = source.cloneNode(true);
    slice.className = "print-page-slice";
    slice.setAttribute("aria-hidden", "true");
    slice.style.transform = `translateY(${-index * pageBodyHeight}px)`;
    current.body.appendChild(slice);
    printArea.appendChild(current.page);
  }

  Array.from(printArea.querySelectorAll(".print-page")).forEach((page, index) => {
    page.dataset.page = String(index + 1);
    const label = page.querySelector(".print-page-label");
    if (label) label.textContent = `${index + 1}ページ目`;
  });

  hideBoundaryHeadingsOnPreviousPages(pageBodyHeight);
  renderWordFloatingNotesOnPages();
  rehydrateDraggablePreviewElements();
}

function updatePageStatus() {
  if (!pageStatus || !printArea) return;
  requestAnimationFrame(() => {
    const pageHeight = getA4HeightPx();
    printArea.style.setProperty("--page-height", `${pageHeight}px`);
    const renderedPages = printArea.querySelectorAll(".print-page").length;
    const height = printArea.scrollHeight;
    const pages = renderedPages || Math.max(1, Math.ceil((height - 2) / pageHeight));
    const overflowing = pages > 1;
    pageStatus.textContent = overflowing ? `${getPaperSpec().label} ${pages}ページ・プレビュー分割済み` : `${getPaperSpec().label} 1ページ内`;
    pageStatus.classList.toggle("warn", overflowing);
    printArea.classList.toggle("is-overflowing", overflowing);
    printArea.classList.toggle("has-page-guides", false);
  });
}

function normalizeMathInput(input) {
  return String(input || "")
    .replaceAll("　", " ")
    .replaceAll("−", "-")
    .replaceAll("－", "-")
    .replaceAll("×", "*")
    .replaceAll("／", "/")
    .trim();
}

function replaceSqrtFunctions(source) {
  let text = source;
  let previous;
  do {
    previous = text;
    text = text
      .replace(/sqrt\s*\(([^()]*)\)/g, "\\sqrt{$1}")
      .replace(/√\s*\(([^()]*)\)/g, "\\sqrt{$1}")
      .replace(/√\s*\{([^{}]*)\}/g, "\\sqrt{$1}");
  } while (text !== previous);

  text = text.replace(/√\s*([A-Za-z0-9]+(?:\^[A-Za-z0-9]+)?)/g, "\\sqrt{$1}");
  return text;
}

function findMatchingDelimiter(text, openIndex, openChar = "(", closeChar = ")") {
  let depth = 0;
  for (let i = openIndex; i < text.length; i += 1) {
    if (text[i] === openChar) depth += 1;
    if (text[i] === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findMatchingParen(text, openIndex) {
  return findMatchingDelimiter(text, openIndex, "(", ")");
}

function findMatchingOpenDelimiter(text, closeIndex, openChar = "{", closeChar = "}") {
  let depth = 0;
  for (let i = closeIndex; i >= 0; i -= 1) {
    if (text[i] === closeChar) depth += 1;
    if (text[i] === openChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function isFracDenominatorBrace(text, openIndex) {
  // \frac{a^{2}}{2} の2つ目の { を、\frac の引数として正しく扱う。
  // 正規表現だけだと a^{2} のような入れ子の { } を読めず、{2} が \{2\} に崩れる。
  let prev = openIndex - 1;
  while (text[prev] === " ") prev -= 1;
  if (text[prev] !== "}") return false;

  const numeratorOpen = findMatchingOpenDelimiter(text, prev, "{", "}");
  if (numeratorOpen < 0) return false;

  const beforeNumerator = text.slice(Math.max(0, numeratorOpen - 12), numeratorOpen);
  return /\\frac\s*$/.test(beforeNumerator);
}

function isLatexSizedDelimiter(text, openIndex) {
  const before = text.slice(Math.max(0, openIndex - 16), openIndex);
  return /\\(?:left|right)\s*$/.test(before);
}

function isLatexArgumentBrace(text, openIndex) {
  const before = text.slice(Math.max(0, openIndex - 24), openIndex);
  if (/\\(?:frac|sqrt|text|mathrm|mathbf|mathit|boxed|color|left|right)\s*$/.test(before)) return true;
  if (isFracDenominatorBrace(text, openIndex)) return true;
  if (/[\\^_]\s*$/.test(before)) return true;
  return false;
}

function enlargeFractionDelimiters(latex) {
  const pairs = {
    "(": { close: ")", left: "\\left(", right: "\\right)" },
    "[": { close: "]", left: "\\left[", right: "\\right]" },
    "{": { close: "}", left: "\\left\\{", right: "\\right\\}" }
  };
  let output = "";
  let i = 0;

  while (i < latex.length) {
    const ch = latex[i];
    const pair = pairs[ch];
    if (!pair) {
      output += ch;
      i += 1;
      continue;
    }

    const closeIndex = findMatchingDelimiter(latex, i, ch, pair.close);
    if (closeIndex < 0) {
      output += ch;
      i += 1;
      continue;
    }

    const innerRaw = latex.slice(i + 1, closeIndex);
    const inner = enlargeFractionDelimiters(innerRaw);
    const containsFraction = inner.includes("\\frac");
    const shouldKeepRawBrace = ch === "{" && isLatexArgumentBrace(latex, i);
    const alreadySized = isLatexSizedDelimiter(latex, i);

    if (containsFraction && !shouldKeepRawBrace && !alreadySized) {
      output += `${pair.left}${inner}${pair.right}`;
    } else if (ch === "{" && !shouldKeepRawBrace) {
      output += `\\{${inner}\\}`;
    } else {
      output += `${ch}${inner}${pair.close}`;
    }
    i = closeIndex + 1;
  }

  return output;
}

function readFractionDenominator(text, startIndex) {
  let start = startIndex;
  while (text[start] === " ") start += 1;
  if (text[start] === "(") {
    const close = findMatchingParen(text, start);
    if (close < 0) return null;
    return { value: text.slice(start + 1, close), end: close + 1 };
  }

  if (text.slice(start).startsWith("\\sqrt{")) {
    const match = text.slice(start).match(/^\\sqrt\{[^{}]+\}/);
    if (match) return { value: match[0], end: start + match[0].length };
  }

  const match = text.slice(start).match(/^-?(?:\d+(?:\.\d+)?|[A-Za-z](?:\^\{[^{}]+\}|\^\w+)?)/);
  if (!match) return null;
  return { value: match[0], end: start + match[0].length };
}


function isPureNumericLatex(value) {
  return /^-?\d+(?:\.\d+)?$/.test(String(value || "").trim());
}

function mergeTrailingFactorsIntoFractions(latex) {
  const factor = '(?:[A-Za-z](?:\\^\\{[^{}]+\\}|\\^\\w+)?|\\\\sqrt\\{[^{}]+\\}|\\([^()]+\\)|\\{[^{}]+\\}|\\d+)';
  const pattern = new RegExp(String.raw`\\frac\{([^{}]+)\}\{([^{}]+)\}((?:` + factor + String.raw`)+)`, "g");

  let previous;
  do {
    previous = latex;
    latex = latex.replace(pattern, (match, numerator, denominator, trailing) => {
      // 1/2x, -1/3a などの「数値分数 × 文字」は、そのまま残す。
      if (isPureNumericLatex(numerator) && isPureNumericLatex(denominator)) {
        return match;
      }
      return `\\frac{${numerator}}{${denominator}${trailing}}`;
    });
  } while (latex !== previous);

  return latex;
}

function readPlainDenominatorForFraction(text, startIndex) {
  let start = startIndex;
  while (text[start] === " ") start += 1;

  if (text[start] === "(") {
    const close = findMatchingParen(text, start);
    if (close < 0) return null;
    return { value: text.slice(start + 1, close), end: close + 1 };
  }

  if (text.slice(start).startsWith("\\sqrt{")) {
    const braceStart = start + "\\sqrt".length;
    const close = findMatchingDelimiter(text, braceStart, "{", "}");
    if (close >= 0) return { value: text.slice(start, close + 1), end: close + 1 };
  }

  if (/[A-Za-z]/.test(text[start])) {
    let end = start + 1;
    if (text[end] === "^") {
      if (text[end + 1] === "{") {
        const close = findMatchingDelimiter(text, end + 1, "{", "}");
        if (close >= 0) end = close + 1;
      } else if (text[end + 1]) {
        end += 2;
      }
    }
    return { value: text.slice(start, end), end };
  }

  const match = text.slice(start).match(/^-?\d+(?:\.\d+)?/);
  if (!match) return null;
  return { value: match[0], end: start + match[0].length };
}

function convertPowerNumeratorFractions(text) {
  // a^{2}/2, x^{3}/b のように、指数つき文字が分子になる場合だけ処理する。
  // 文字列置換の $1/$2 で a^{2} の { } が崩れる事故を避けるため、関数置換で返す。
  const denominator = String.raw`(?:-?\d+(?:\.\d+)?|[A-Za-z](?:\^\{[^{}]+\}|\^\w+)?|\\sqrt\{[^{}]+\})`;
  const powerTerm = String.raw`[A-Za-z](?:\^\{[^{}]+\}|\^\w+)`;

  let output = text;

  // まず (a^{2}/2) のような、かっこの中だけで完結する形を処理する。
  output = output.replace(
    new RegExp(String.raw`\(\s*(` + powerTerm + String.raw`)\s*\/\s*(` + denominator + String.raw`)\s*\)`, "g"),
    (_match, numerator, denom) => `\\left(\\frac{${numerator}}{${denom}}\\right)`
  );

  // 次に a^{2}/2 のような通常形を処理する。
  output = output.replace(
    new RegExp(String.raw`(^|[^\\\w}])(` + powerTerm + String.raw`)\s*\/\s*(` + denominator + String.raw`)(?![\\\w{])`, "g"),
    (_match, prefix, numerator, denom) => `${prefix}\\frac{${numerator}}{${denom}}`
  );

  return output;
}



function convertParenthesizedFractions(text) {
  let output = "";
  let i = 0;

  while (i < text.length) {
    if (text[i] !== "(") {
      output += text[i];
      i += 1;
      continue;
    }

    const close = findMatchingParen(text, i);
    if (close < 0) {
      output += text[i];
      i += 1;
      continue;
    }

    let slash = close + 1;
    while (text[slash] === " ") slash += 1;
    if (text[slash] !== "/") {
      output += text.slice(i, close + 1);
      i = close + 1;
      continue;
    }

    const denominator = readPlainDenominatorForFraction(text, slash + 1);
    if (!denominator) {
      output += text.slice(i, close + 1);
      i = close + 1;
      continue;
    }

    // ここで numerator 内の a^{2} の { } を絶対に外へ出さない。
    const numerator = text.slice(i + 1, close);
    output += `\\frac{${numerator}}{${denominator.value}}`;
    i = denominator.end;
  }

  return output;
}

function convertMathToLatex(input) {
  let latex = normalizeMathInput(input);
  if (!latex) return "";

  latex = latex
    .replace(/<=|≦/g, "\\leqq ")
    .replace(/>=|≧/g, "\\geqq ")
    .replace(/\+\-/g, "\\pm ")
    .replace(/\s*÷\s*/g, " \\div ")
    .replace(/\s*\*\s*/g, " \\times ");

  latex = replaceSqrtFunctions(latex);
  latex = latex.replace(/\^\s*\(([^()]+)\)/g, "^{$1}");
  latex = latex.replace(/\^\s*(-?\d+|[a-zA-Z]+\d*)/g, "^{$1}");

  // v61: a^2/2, (a^2/2) のように、累乗が分子になる分数だけを安全に処理する。
  latex = convertPowerNumeratorFractions(latex);


  // 2(a+b)/5, (2(a+b))/5 のように、分子側に丸かっこを含む分数を先に処理する。
  // 例：2(a+b)/5 -> \\frac{2(a+b)}{5}, (2(a+b))/5 -> \\frac{2(a+b)}{5}
  const prefixedParenNumerator = "-?(?:\\d+(?:\\.\\d+)?|[A-Za-z](?:\\^\\{[^{}]+\\}|\\^\\w+)?)\\s*\\([^()]+\\)";
  const simpleDenominatorWithParen = "(?:\\([^()]+\\)|-?(?:\\d+(?:\\.\\d+)?|[A-Za-z](?:\\^\\{[^{}]+\\}|\\^\\w+)?|\\\\sqrt\\{[^{}]+\\}))";
  let previousPrefixed;
  do {
    previousPrefixed = latex;
    latex = latex.replace(
      new RegExp(`(^|[^\\\\\\w}])(${prefixedParenNumerator})\\s*\\/\\s*(${simpleDenominatorWithParen})`, "g"),
      "$1\\frac{$2}{$3}"
    );
  } while (previousPrefixed !== latex);

  latex = convertParenthesizedFractions(latex);

  // 1/2x, 1/2 x, -1/3a は「分母に文字を入れない」ことを基本にする。
  // 例：1/2x -> \frac{1}{2}x
  latex = latex.replace(
    /(^|[^\\\w}])(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)(\s*)([a-zA-Z](?:\^\{[^{}]+\}|\^\w+)?)/g,
    "$1\\frac{$2}{$3}$5"
  );

  const simple = "-?(?:\\d+(?:\\.\\d+)?|[a-zA-Z](?:\\^\\{[^{}]+\\}|\\^\\w+)?|\\\\sqrt\\{[^{}]+\\})";
  let previous;
  do {
    previous = latex;
    latex = latex.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, (_match, numerator, denominator) => `\\frac{${numerator}}{${denominator}}`);
    latex = latex.replace(new RegExp(`\\(([^()]+)\\)\\s*\\/\\s*(${simple})`, "g"), (_match, numerator, denominator) => `\\frac{${numerator}}{${denominator}}`);
    latex = latex.replace(new RegExp(`(${simple})\\s*\\/\\s*\\(([^()]+)\\)`, "g"), (_match, numerator, denominator) => `\\frac{${numerator}}{${denominator}}`);
    latex = latex.replace(new RegExp(`(^|[^\\\\\\w}])(${simple})\\s*\\/\\s*(${simple})(?![\\w{])`, "g"), (_match, prefix, numerator, denominator) => `${prefix}\\frac{${numerator}}{${denominator}}`);
  } while (previous !== latex);

  // 分数を含む (), [], {} は、分数全体が収まる大きさにする。
  // 例：(1/2) → \left(\frac{1}{2}\right), [1/2] → \left[...\right], {1/2} → \left\{...\right\}
  latex = mergeTrailingFactorsIntoFractions(latex);

  latex = enlargeFractionDelimiters(latex);

  return latex.replace(/\s{2,}/g, " ").trim();
}

function escapeHtml(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeLatex(text) {
  return String(text || "")
    .replaceAll("\\", "\\textbackslash{}")
    .replaceAll("&", "\\&")
    .replaceAll("%", "\\%")
    .replaceAll("$", "\\$")
    .replaceAll("#", "\\#")
    .replaceAll("_", "\\_")
    .replaceAll("{", "\\{")
    .replaceAll("}", "\\}")
    .replaceAll("~", "\\textasciitilde{}")
    .replaceAll("^", "\\textasciicircum{}")
    .replaceAll("\n", "\\par\n");
}

function renderKatex(latex, displayMode = true) {
  const container = document.createElement(displayMode ? "div" : "span");
  container.className = displayMode ? "math-display" : "math-inline";

  if (!window.katex) {
    container.textContent = latex;
    return container;
  }

  try {
    katex.render(latex, container, {
      displayMode,
      throwOnError: false,
      strict: "ignore"
    });
  } catch (error) {
    container.textContent = latex;
  }

  return container;
}

function normalizeMathLayout(layout = "center") {
  if (layout === "leftSmall") return "left";
  return ["left", "center", "right"].includes(layout) ? layout : "center";
}

function renderMathBlock(rawMath, layout = "center", fontSizePt = DEFAULT_MATH_FONT_SIZE_PT) {
  const normalizedLayout = normalizeMathLayout(layout);
  const wrapper = document.createElement("div");
  wrapper.className = `math-block math-align-${normalizedLayout}`;
  wrapper.dataset.mathAlign = normalizedLayout;

  // KaTeXのdisplayModeは内部で中央寄せが強く残るため使わない。
  // 分数の大きさは\displaystyleで保ち、配置は外側のtext-alignで制御する。
  wrapper.style.display = "block";
  wrapper.style.width = "100%";
  wrapper.style.maxWidth = "100%";
  wrapper.style.textAlign = normalizedLayout;
  wrapper.style.fontSize = `${sanitizeFontSizePt(fontSizePt, DEFAULT_MATH_FONT_SIZE_PT)}pt`;

  const lines = String(rawMath || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const renderLine = (line) => {
    const lineEl = document.createElement("div");
    lineEl.className = "math-block-line";
    const latex = `\\displaystyle ${convertMathToLatex(line)}`;
    const math = renderKatex(latex, false);
    math.classList.add("math-block-inner");
    math.style.display = "inline-block";
    math.style.width = "auto";
    math.style.maxWidth = "100%";
    lineEl.appendChild(math);
    return lineEl;
  };

  if (!lines.length) {
    wrapper.appendChild(renderLine(""));
    return wrapper;
  }

  lines.forEach((line) => wrapper.appendChild(renderLine(line)));
  return wrapper;
}

function shouldAutoMathToken(token) {
  const trimmed = String(token || "").trim();
  if (!trimmed) return false;
  if (/sqrt\s*\(|√|<=|>=|\+\-|[A-Za-z]/.test(trimmed)) return true;
  return /\d/.test(trimmed) && /[+\-*/=^/×÷]/.test(trimmed);
}

function shouldUseDisplayStyleForInline(token, options = {}) {
  const trimmed = String(token || "").trim();
  if (options.forceDisplayFractions === false) return false;
  if (trimmed.includes("/") || trimmed.includes("\\frac")) return true;
  if (trimmed.includes("/") || /sqrt\s*\(|√/.test(trimmed)) return true;
  if (options.forceMathForHalfWidth) return true;
  return ["medium", "large", "xlarge"].includes(options.inlineMathSize);
}

const richMarkers = [
  { open: "[box]", close: "[/box]", className: "inline-box", texOpen: "\\fbox{", texClose: "}" },
  { open: "**", close: "**", className: "inline-strong", texOpen: "\\textbf{", texClose: "}" },
  { open: "__", close: "__", className: "inline-underline", texOpen: "\\underline{", texClose: "}" },
  { open: "==", close: "==", className: "inline-marker", texOpen: "\\colorbox{yellow!35}{", texClose: "}" }
];

function findRichMarker(source) {
  let best = null;
  richMarkers.forEach((marker) => {
    const start = source.indexOf(marker.open);
    if (start < 0) return;
    const innerStart = start + marker.open.length;
    const end = source.indexOf(marker.close, innerStart);
    if (end < 0) return;
    if (!best || start < best.start || (start === best.start && marker.open.length > best.open.length)) {
      best = { ...marker, start, innerStart, end, after: end + marker.close.length };
    }
  });
  return best;
}

function mathTokenPattern() {
  // 半角の式をまとめて検出する。[], {} も数式内のかっことして扱う。
  return /[A-Za-z0-9+\-*/=^().{}\[\]<>√≦≧±×÷]+(?:\s*[+\-*/=^<>≦≧±×÷]\s*[A-Za-z0-9+\-*/=^().{}\[\]<>√≦≧±×÷]+|\s+[A-Za-z0-9().{}\[\]√]+)*/g;
}
function appendPlainWithAutoMath(target, text, options = {}) {
  const pattern = mathTokenPattern();
  const source = String(text || "");
  let cursor = 0;

  for (const match of source.matchAll(pattern)) {
    const token = match[0];
    const start = match.index || 0;

    if (start > cursor) target.appendChild(document.createTextNode(source.slice(cursor, start)));

    const forceMath = options.forceMathForHalfWidth && /[A-Za-z0-9]/.test(token);
    if (forceMath || shouldAutoMathToken(token)) {
      const useDisplayStyle = options.useDisplayStyle || shouldUseDisplayStyleForInline(token, options);
      const latex = `${useDisplayStyle ? "\\displaystyle " : ""}${convertMathToLatex(token)}`;
      const math = renderKatex(latex, false);
      math.classList.add("inline-math-text", `inline-math-size-${options.inlineMathSize || "normal"}`);
      if (options.inlineMathPt) math.style.fontSize = `${sanitizeFontSizePt(options.inlineMathPt, INLINE_MATH_SIZE_PT_DEFAULTS.medium)}pt`;
      target.appendChild(math);
    } else {
      target.appendChild(document.createTextNode(token));
    }

    cursor = start + token.length;
  }

  if (cursor < source.length) target.appendChild(document.createTextNode(source.slice(cursor)));
}

function appendRichText(target, source, options = {}) {
  const text = String(source || "");
  const marker = findRichMarker(text);
  if (!marker) {
    appendPlainWithAutoMath(target, text, options);
    return;
  }

  appendPlainWithAutoMath(target, text.slice(0, marker.start), options);
  const span = document.createElement("span");
  span.className = marker.className;
  appendRichText(span, text.slice(marker.innerStart, marker.end), options);
  target.appendChild(span);
  appendRichText(target, text.slice(marker.after), options);
}

function lineNeedsTallMathSpacing(line) {
  const source = String(line || "");
  if (!source.trim()) return false;

  // 明示的なLaTeX分数・平方根
  if (/\\frac|\\sqrt/.test(source)) return true;

  // 普通の入力で分数化されるもの
  if (/[A-Za-z0-9)\]}]\s*\/\s*[A-Za-z0-9([{]/.test(source)) return true;
  if (/√|sqrt\s*\(/.test(source)) return true;

  // ÷ は分数へ直した式と混ざることが多いので、少し余裕を取る
  if (/÷/.test(source)) return true;

  return false;
}

function renderTextWithInlineMath(text, options = {}) {
  const fragment = document.createDocumentFragment();
  const lines = String(text || "").split("\n");
  const wrapLines = options.wrapLines !== false;
  const lineOffset = Number(options.lineOffset || 0);
  const baseCharOffset = Number(options.charOffset || 0);
  const lineFontSizes = options.lineFontSizes && typeof options.lineFontSizes === "object" ? options.lineFontSizes : null;
  let runningOffset = 0;

  lines.forEach((line, lineIndex) => {
    const absoluteLineIndex = lineOffset + lineIndex;
    const lineFontSize = lineFontSizes ? lineFontSizes[String(absoluteLineIndex)] : null;
    const lineOptions = { ...options, charOffset: baseCharOffset + runningOffset };

    if (wrapLines) {
      const lineNode = document.createElement("span");
      lineNode.className = `auto-math-line${lineNeedsTallMathSpacing(line) ? " tall-math-line" : ""}`;
      if (lineFontSize !== undefined && lineFontSize !== null && lineFontSize !== "") {
        lineNode.style.fontSize = `${sanitizeFontSizePt(lineFontSize, DEFAULT_FONT_SIZE_PT)}pt`;
      }
      appendStyledRichText(lineNode, line, lineOptions);
      fragment.appendChild(lineNode);
    } else {
      const inlineNode = document.createElement("span");
      if (lineFontSize !== undefined && lineFontSize !== null && lineFontSize !== "") {
        inlineNode.style.fontSize = `${sanitizeFontSizePt(lineFontSize, DEFAULT_FONT_SIZE_PT)}pt`;
      }
      appendStyledRichText(inlineNode, line, lineOptions);
      fragment.appendChild(inlineNode);
    }

    runningOffset += line.length;
    if (lineIndex < lines.length - 1) {
      fragment.appendChild(document.createElement("br"));
      runningOffset += 1;
    }
  });

  return fragment;
}

function renderPrintText(text, className = "print-text", options = {}) {
  const element = document.createElement("div");
  element.className = className;
  element.appendChild(renderTextWithInlineMath(text, options));
  return element;
}

function plainTextToLatexWithInlineMath(text) {
  const pattern = mathTokenPattern();
  const source = String(text || "");
  let cursor = 0;
  const parts = [];

  for (const match of source.matchAll(pattern)) {
    const token = match[0];
    const start = match.index || 0;

    if (start > cursor) parts.push(escapeLatex(source.slice(cursor, start)));

    if (shouldAutoMathToken(token)) {
      parts.push(`\\(${convertMathToLatex(token)}\\)`);
    } else {
      parts.push(escapeLatex(token));
    }

    cursor = start + token.length;
  }

  if (cursor < source.length) parts.push(escapeLatex(source.slice(cursor)));
  return parts.join("");
}

function convertRichTextToLatex(source) {
  const text = String(source || "");
  const marker = findRichMarker(text);
  if (!marker) return plainTextToLatexWithInlineMath(text);

  const before = plainTextToLatexWithInlineMath(text.slice(0, marker.start));
  const inner = convertRichTextToLatex(text.slice(marker.innerStart, marker.end));
  const after = convertRichTextToLatex(text.slice(marker.after));
  return `${before}${marker.texOpen}${inner}${marker.texClose}${after}`;
}

function convertTextToLatexWithInlineMath(text) {
  return String(text || "").split("\n").map(convertRichTextToLatex).join("\\par\n");
}

function geometryDefaults(kind = "triangle") {
  const base = {
    diagramLayout: "center",
    title: "",
    rightAngle: "none",
    dashedLines: "",
    parallelMarks: ""
  };

  if (kind === "quadrilateral") {
    return {
      ...base,
      shapeKind: "quadrilateral",
      coords: "A,90,160\nB,310,160\nC,280,60\nD,120,60",
      sideLabels: "AB=8cm\nBC=5cm\nCD=6cm\nDA=5cm",
      parallelMarks: "AB//CD"
    };
  }

  if (kind === "circle") {
    return {
      ...base,
      shapeKind: "circle",
      coords: "O,200,120\nA,285,120\nB,200,35",
      sideLabels: "OA=5cm",
      dashedLines: "O-A",
      rightAngle: "none"
    };
  }

  if (kind === "segment") {
    return {
      ...base,
      shapeKind: "segment",
      coords: "A,90,120\nB,320,120",
      sideLabels: "AB=7cm",
      rightAngle: "none"
    };
  }

  return {
    ...base,
    shapeKind: "triangle",
    coords: "A,110,165\nB,320,165\nC,170,55",
    sideLabels: "AB=6cm\nBC=5cm\nCA=4cm",
    rightAngle: "none",
    dashedLines: "",
    parallelMarks: ""
  };
}

function createBlock(type) {
  const base = {
    id: crypto.randomUUID(),
    type,
    color: DEFAULT_TEXT_COLOR,
    frame: DEFAULT_BLOCK_FRAME,
    textSize: DEFAULT_TEXT_SIZE,
    fontSizePt: DEFAULT_FONT_SIZE_PT,
    fontFamily: "default",
    align: DEFAULT_BLOCK_ALIGN
  };

  if (type === "heading") return { ...base, content: "新しい見出し" };
  if (type === "text") return {
    ...base,
    content: "本文を入力してください。",
    noteBoxes: [],
    textAutoLayout: true,
    columns: 2,
    columnGap: "wide",
    textColumnGapPx: 80,
    rowGap: "normal",
    blankLineGap: "large",
    inlineMathPt: 14,
    lineFontSizes: {},
    inlineStyles: []
  };
  if (type === "sidebox") return {
    ...base,
    text: "左側に本文を入力します。",
    boxText: "重要事項などを入力",
    boxPosition: "right",
    boxWidth: 35,
    boxFrame: "simple",
    boxFontSize: "normal",
    boxFontSizePt: DEFAULT_FONT_SIZE_PT,
    boxFontFamily: "default",
    boxColor: DEFAULT_TEXT_COLOR,
    boxAlign: "left"
  };
  if (type === "math") return { ...base, content: "1/2", mathLayout: "center", fontSizePt: DEFAULT_MATH_FONT_SIZE_PT };
  if (type === "problemRow") return {
    ...base,
    content: "(1) 1/2x + 1/3x\n(2) (1/2x + 1/3x)",
    columns: 2,
    answerSize: "none",
    answerFormat: "line",
    answerBoxSize: "medium",
    answerPlacement: "bottom",
    inlineMathSize: "large",
    inlineMathPt: 14,
    columnGap: "normal",
    rowGap: "normal",
    blankLineGap: "large",
    answerX: 0,
    answerY: 0,
    answerPositions: {}
  };
  if (type === "testLayout") return {
    ...base,
    testTitle: "テスト名",
    leftTitle: "左列",
    rightTitle: "右列",
    leftContent: "問1〜\n\n\n問3〜",
    rightContent: "問5〜\n\n\n問6〜",
    showAnswerBox: true,
    answerBoxText: "",
    testHeaderFontSizePt: 16,
    testBodyFontSizePt: 13,
    testFontFamily: "default",
    testHeightMm: 180,
    centerLineStyle: "solid",
    centerLineWidthPx: 1,
    centerLineColor: "#111111"
  };
  if (type === "problemGrid") {
    return {
      ...base,
      type: "problem",
      number: 0,
      content: "(1)\n(2)\n(3)\n\n(4)\n(5)\n(6)",
      columns: 3,
      answerSize: "none",
      answerFormat: "line",
      answerBoxSize: "medium",
      answerPlacement: "bottom",
      inlineMathSize: "medium",
      inlineMathPt: 13,
      columnGap: "wide",
      rowGap: "xwide",
      blankLineGap: "xlarge",
      answerX: 0,
      answerY: 0,
      answerPositions: {}
    };
  }
  if (type === "freeProblem") return {
    ...base,
    content: "(1)\n(2)\n(3)\n\n(4)\n(5)\n(6)",
    fontSizePt: 13,
    inlineMathPt: 14,
    freeCanvasHeightMm: 95,
    freeColumns: 3,
    freeColumnGapPx: 190,
    freeRowGapPx: 86,
    freePositions: {}
  };
  if (type === "answer") return { ...base, answerSize: "medium", answerX: 0, answerY: 0 };
  if (type === "numberline") {
    return {
      ...base,
      title: "",
      min: -5,
      max: 5,
      step: 1,
      arrow: "both",
      diagramLayout: "center",
      showTicks: true,
      showLabels: true,
      points: "-2,closed,A\n1/2,closed,1/2\n3,open,B",
      intervals: "-1,3,closed,open,-1≦x<3"
    };
  }
  if (type === "geometry") return { ...base, ...geometryDefaults("triangle") };
  if (type === "coordinate") {
    return {
      ...base,
      title: "",
      xmin: -5,
      xmax: 5,
      ymin: -5,
      ymax: 5,
      step: 1,
      diagramLayout: "center",
      showTicks: true,
      showLabels: true,
      points: "1,2,A\n-2,1,B",
      functions: "y=2x+1"
    };
  }
  return {
    ...base,
    number: nextProblemNumber(),
    content: "次の問題を解きなさい。\n1/2 + 1/4",
    columns: 1,
    problemLayoutMode: "auto",
    freeCanvasHeightMm: 95,
    freeColumns: 3,
    freeColumnGapPx: 190,
    freeRowGapPx: 86,
    freePositions: {},
    answerSize: "medium",
    answerFormat: "line",
    answerBoxSize: "medium",
    answerPlacement: "bottom",
    inlineMathSize: "medium",
    inlineMathPt: 13,
    columnGap: "normal",
    rowGap: "normal",
    blankLineGap: "large",
    answerX: 0,
    answerY: 0,
    answerPositions: {}
  };
}

function nextProblemNumber() {
  const nums = state.blocks
    .filter((block) => block.type === "problem")
    .map((block) => Number(block.number) || 0);
  return nums.length ? Math.max(...nums) + 1 : 1;
}

function makeOptions(options, selected) {
  return Object.entries(options).map(([value, label]) => `
    <option value="${value}" ${String(selected) === String(value) ? "selected" : ""}>${label}</option>
  `).join("");
}

function answerSizeOptions(selected) {
  return makeOptions(answerSizeLabels, selected);
}

function problemAnswerSizeOptions(selected = "medium") {
  return makeOptions({ none: "なし", ...answerSizeLabels }, selected);
}

function mathLayoutOptions(selected = "center") {
  return makeOptions(mathLayoutLabels, selected);
}

function diagramLayoutOptions(selected = "center") {
  return makeOptions(diagramLayoutLabels, selected);
}

function blockFrameOptions(selected = DEFAULT_BLOCK_FRAME) {
  return makeOptions(blockFrameLabels, selected);
}

function textSizeOptions(selected = DEFAULT_TEXT_SIZE) {
  return makeOptions(textSizeLabels, selected);
}

function problemInlineMathSizeOptions(selected = "normal") {
  return makeOptions(problemInlineMathSizeLabels, selected);
}

function problemColumnsOptions(selected = 2) {
  return makeOptions({ 1: "1列", 2: "2列", 3: "3列", 4: "4列" }, selected);
}

function problemRowAnswerSizeOptions(selected = "none") {
  return makeOptions({ none: "なし", small: "小", medium: "中", large: "大", xlarge: "特大" }, selected);
}

function answerFormatOptions(selected = "line") {
  return makeOptions(answerFormatLabels, selected);
}

function answerBoxSizeOptions(selected = "medium") {
  return makeOptions(answerBoxSizeLabels, selected);
}

function answerPlacementOptions(selected = "bottom") {
  return makeOptions(answerPlacementLabels, selected);
}

function answerBoxSizeClass(size = "medium") {
  return `box-${answerBoxSizeLabels[size] ? size : "medium"}`;
}

function problemRowGapOptions(selected = "normal") {
  return makeOptions(problemRowGapLabels, selected);
}

function problemBlankLineGapOptions(selected = "large") {
  return makeOptions(problemBlankLineGapLabels, selected);
}

function problemLayoutModeOptions(selected = "auto") {
  return makeOptions(problemLayoutModeLabels, selected);
}

function detectProblemLayoutMode(block) {
  const selected = block.problemLayoutMode || "auto";
  if (selected !== "auto") return selected;

  const content = String(block.content || "");
  const groups = content
    .split(/\n\s*\n+/)
    .map((group) => group.split(/\r?\n/).map((line) => line.trim()).filter(Boolean))
    .filter((group) => group.length);

  const hasMultiLineGroup = groups.some((group) => group.length >= 2);
  const hasMultipleGroups = groups.length >= 2;

  // 空行で区切られた複数のまとまりがあり、その中に複数行の計算があれば横並び計算。
  // 例：
  // (1) 式
  // =~
  // =
  //
  // (2) 式
  // =~
  // =
  if (hasMultipleGroups && hasMultiLineGroup) return "calc";

  return "normal";
}

function hasTextProblemMarker(line) {
  return /^\s*(?:\(\d+\)|（\d+）|[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳]|\d+[.)．、])/.test(String(line || ""));
}

function getTextProblemGroups(content) {
  return String(content || "")
    .split(/\n\s*\n+/)
    .map((group) => group.split(/\r?\n/).map((line) => line.trim()).filter(Boolean))
    .filter((group) => group.length);
}

function countNewlinesBefore(source, index) {
  const match = String(source || "").slice(0, Math.max(0, index)).match(/\n/g);
  return match ? match.length : 0;
}

function parseHashGroupedTextUnits(content) {
  return parseHashGroupedTextUnitsWithIndices(content).map((unit) => unit.text);
}

function parseHashGroupedTextUnitsWithIndices(content) {
  const source = String(content || "");
  const units = [];
  const pattern = /##([\s\S]*?)##/g;
  let match;

  while ((match = pattern.exec(source)) !== null) {
    const inner = String(match[1] || "").trim();
    if (!inner) continue;
    const innerStart = match.index + 2;
    const leadingTrim = String(match[1] || "").length - String(match[1] || "").replace(/^\s+/, "").length;
    units.push({
      text: inner,
      lineStart: countNewlinesBefore(source, innerStart),
      charStart: innerStart + leadingTrim
    });
  }

  return units;
}

function hasHashGroupedTextUnits(content) {
  return parseHashGroupedTextUnitsWithIndices(content).length > 0;
}

function getTextProblemGroupsWithIndices(content) {
  const source = String(content || "");
  const lines = source.split(/\r?\n/);
  const groups = [];
  let current = [];
  let startLine = 0;
  let startChar = 0;
  let charCursor = 0;

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    const leadingTrim = rawLine.length - rawLine.replace(/^\s+/, "").length;

    if (!line) {
      if (current.length) groups.push({ lines: current, lineStart: startLine, charStart: startChar });
      current = [];
      startLine = index + 1;
      startChar = charCursor + rawLine.length + 1;
      charCursor += rawLine.length + 1;
      return;
    }

    if (!current.length) {
      startLine = index;
      startChar = charCursor + leadingTrim;
    }

    current.push(line);
    charCursor += rawLine.length + 1;
  });

  if (current.length) groups.push({ lines: current, lineStart: startLine, charStart: startChar });
  return groups;
}

function detectTextLayoutMode(block) {
  if (!boolValue(block.textAutoLayout, true)) return "plain";

  const content = String(block.content || "");

  // ##...## で囲った範囲は、改行を含んでいても1つの固まりとして横並びにする。
  // 例：##(1)5*x
  // =5x## を1つのセルとして扱う。
  if (hasHashGroupedTextUnits(content)) return "normal";

  const groups = getTextProblemGroups(content);
  const nonEmptyLines = content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const markerLineCount = nonEmptyLines.filter(hasTextProblemMarker).length;
  const markerGroupCount = groups.filter((group) => hasTextProblemMarker(group[0])).length;
  const hasMultiLineGroup = groups.some((group) => group.length >= 2);

  // 空行で区切られた「(1) 式 / =~ / =」型は横並び計算。
  if (markerGroupCount >= 2 && hasMultiLineGroup) return "calc";

  // (1), (2), (3) などが2つ以上ある本文は、自動で横並び。
  if (markerLineCount >= 2 || markerGroupCount >= 2) return "normal";

  return "plain";
}

function parseTextAutoRows(content, columns = 2, layoutMode = "normal") {
  const safeColumns = Math.min(4, Math.max(1, Number(columns) || 2));

  const hashUnits = parseHashGroupedTextUnitsWithIndices(content);
  if (hashUnits.length) {
    const result = [];
    for (let i = 0; i < hashUnits.length; i += safeColumns) {
      result.push({ type: "items", items: hashUnits.slice(i, i + safeColumns) });
    }
    return result;
  }

  if (layoutMode === "calc") {
    const groups = getTextProblemGroupsWithIndices(content)
      .filter((group) => group.lines.length)
      .map((group) => ({ text: group.lines.join("\n"), lineStart: group.lineStart, charStart: group.charStart }));
    const result = [];
    for (let i = 0; i < groups.length; i += Math.max(2, safeColumns)) {
      result.push({ type: "items", items: groups.slice(i, i + Math.max(2, safeColumns)) });
    }
    return result;
  }

  const groups = getTextProblemGroupsWithIndices(content);
  if (groups.length >= 2 && groups.every((group) => group.lines.length === 1 && hasTextProblemMarker(group.lines[0]))) {
    const result = [];
    const items = groups.map((group) => ({ text: group.lines[0], lineStart: group.lineStart, charStart: group.charStart }));
    for (let i = 0; i < items.length; i += safeColumns) {
      result.push({ type: "items", items: items.slice(i, i + safeColumns) });
    }
    return result;
  }

  return parseProblemRowRows(content, Math.max(2, safeColumns), "normal");
}

function renderTextAutoLayoutBlock(block) {
  const mode = detectTextLayoutMode(block);
  if (mode === "plain") {
    return renderPrintText(block.content, "print-text", {
      inlineMathPt: inlineMathFontSizePt(block),
      forceMathForHalfWidth: true,
      lineFontSizes: block.lineFontSizes || {},
      inlineStyles: normalizeInlineStyles(block),
      charOffset: 0
    });
  }

  const columns = Math.min(4, Math.max(1, Number(block.columns) || 2));
  const wrapper = document.createElement("div");
  wrapper.className = `text-auto-grid problem-row-grid problem-row-${Math.max(2, columns)} problem-layout-${mode}`;
  wrapper.style.setProperty("--problem-row-columns", Math.max(2, columns));
  const textColumnGap = Math.min(400, Math.max(0, Number(block.textColumnGapPx ?? 80)));
  wrapper.style.setProperty("--problem-row-column-gap", `${textColumnGap}px`);
  wrapper.style.setProperty("--problem-row-row-gap", problemRowGapPx(block.rowGap || "normal", "row"));
  wrapper.style.setProperty("--problem-row-manual-gap", problemBlankLineGapPx(block.blankLineGap || "large"));
  wrapper.style.textAlign = block.align || DEFAULT_BLOCK_ALIGN;

  const rows = parseTextAutoRows(block.content, columns, mode);

  rows.forEach((row) => {
    if (row.type === "spacer") {
      const spacer = document.createElement("div");
      spacer.className = "problem-row-manual-gap";
      wrapper.appendChild(spacer);
      return;
    }

    row.items.forEach((entry) => {
      const line = typeof entry === "object" && entry !== null ? entry.text : entry;
      const lineStart = typeof entry === "object" && entry !== null ? Number(entry.lineStart || 0) : 0;
      const charStart = typeof entry === "object" && entry !== null ? Number(entry.charStart || 0) : 0;
      const item = document.createElement("div");
      item.className = "text-auto-item problem-row-item";
      const content = document.createElement("div");
      content.className = "text-auto-content problem-row-content";
      content.style.fontSize = `${blockFontSizePt(block)}pt`;
      content.appendChild(renderTextWithInlineMath(line, {
        inlineMathPt: inlineMathFontSizePt(block),
        forceMathForHalfWidth: true,
        lineFontSizes: block.lineFontSizes || {},
        inlineStyles: normalizeInlineStyles(block),
        lineOffset: lineStart,
        charOffset: charStart
      }));
      item.appendChild(content);
      wrapper.appendChild(item);
    });
  });

  return wrapper;
}

function problemRowGapPx(value, axis = "column") {
  const columnMap = { tight: 10, normal: 18, wide: 34, xwide: 54 };
  const rowMap = { tight: 12, normal: 22, wide: 40, xwide: 64 };
  const map = axis === "row" ? rowMap : columnMap;
  return `${map[value] || map.normal}px`;
}

function problemBlankLineGapPx(value = "large") {
  return { small: "20px", medium: "36px", large: "56px", xlarge: "82px" }[value] || "56px";
}

function answerFormatClass(format = "line") {
  return format === "box" ? "answer-box" : "answer-line";
}

function blockAlignOptions(selected = DEFAULT_BLOCK_ALIGN) {
  return makeOptions(blockAlignLabels, selected);
}

function sideBoxPositionOptions(selected = "right") {
  return makeOptions(sideBoxPositionLabels, selected);
}

function geometryKindOptions(selected = "triangle") {
  return makeOptions(geometryKindLabels, selected);
}


function renderTextNoteEditor(note, index) {
  return `
    <div class="note-editor" data-note-editor="${index}">
      <div class="note-editor-head">
        <strong>補助枠 ${index + 1}</strong>
        <button type="button" class="secondary small-btn" data-action="delete-text-note" data-note-index="${index}">削除</button>
      </div>
      <label class="checkbox-label">
        <input data-note-index="${index}" data-note-field="enabled" type="checkbox" ${checkedAttr(note.enabled, false)} />
        この補助枠を表示
      </label>
      <label>補助枠の内容
        <textarea data-note-index="${index}" data-note-field="text" placeholder="公式・注意・補足など">${escapeHtml(note.text || "")}</textarea>
      </label>
      <div class="four-columns">
        <label>ページ
          <input data-note-index="${index}" data-note-field="page" type="number" min="1" max="99" step="1" value="${escapeHtml(note.page ?? textNoteDefault.notePage)}" />
        </label>
        <label>横位置(px)
          <input data-note-index="${index}" data-note-field="x" type="number" min="-80" max="1200" step="1" value="${escapeHtml(note.x ?? textNoteDefault.noteX)}" />
        </label>
        <label>縦位置(px)
          <input data-note-index="${index}" data-note-field="y" type="number" min="-80" max="1800" step="1" value="${escapeHtml(note.y ?? textNoteDefault.noteY)}" />
        </label>
        <label>枠の幅(px)
          <input data-note-index="${index}" data-note-field="width" type="number" min="80" max="520" step="10" value="${escapeHtml(note.width || textNoteDefault.noteWidth)}" />
        </label>
      </div>
      <div class="three-columns">
        <label>枠の種類
          <select data-note-index="${index}" data-note-field="frame">${blockFrameOptions(note.frame || "simple")}</select>
        </label>
        <label>枠内フォント
          <select data-note-index="${index}" data-note-field="fontFamily">${fontFamilyOptions(note.fontFamily || "default")}</select>
        </label>
        ${noteFontSizeNumberInput(index, "fontSizePt", noteFontSizePt(note), "枠内文字サイズ")}
        <label>枠内文字色
          <input data-note-index="${index}" data-note-field="color" type="color" value="${normalizeColor(note.color || DEFAULT_TEXT_COLOR)}" />
        </label>
      </div>
      <div class="two-columns equal-columns">
        <label>枠内文字揃え
          <select data-note-index="${index}" data-note-field="align">${blockAlignOptions(note.align || "left")}</select>
        </label>
        <button type="button" class="secondary small-btn" data-action="reset-text-note-position" data-note-index="${index}">位置リセット</button>
      </div>
    </div>
  `;
}

function renderEditor() {
  titleInput.value = state.title;
  unitInput.value = state.unit;
  nameLineInput.value = state.nameLine;
  if (paperSizeInput) paperSizeInput.value = state.paperSize || "A4";
  if (paperOrientationInput) paperOrientationInput.value = state.paperOrientation || "portrait";
  if (baseFontSizeInput) baseFontSizeInput.value = sanitizeFontSizePt(state.baseFontSizePt, DEFAULT_FONT_SIZE_PT);
  if (baseFontFamilyInput) baseFontFamilyInput.value = state.baseFontFamily || "gothic";
  if (pageMarginInput) pageMarginInput.value = Math.min(40, Math.max(5, Number(state.pageMarginMm) || 18));
  blocksEl.innerHTML = "";

  state.blocks.forEach((block, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.id = block.id;
    node.querySelector(".block-title").textContent = blockLabels[block.type] || block.type;
    const body = node.querySelector(".block-body");

    if (block.type === "heading" || block.type === "text") {
      if (block.type === "heading") {
        body.innerHTML = `
          <label>見出し
            <textarea data-field="content">${escapeHtml(block.content)}</textarea>
          </label>
          ${formatHelp()}
        `;
      } else {
        body.innerHTML = `
          <details class="settings-section" open>
            <summary>内容</summary>
            <div class="section-body">
              <label>本文
                <textarea data-field="content">${escapeHtml(block.content)}</textarea>
              </label>
              ${mathHelperButtons("content")}
              <div class="helper-text">本文の一部を選択してから「文字サイズ・フォント・文字色」を変更すると、選択範囲だけ変更できます。1/2, √(2), (2(a+b))/5 なども自動で数式表示します。</div>
              ${formatHelp()}
            </div>
          </details>

          <details class="settings-section">
            <summary>本文の横並び</summary>
            <div class="section-body">
              <label class="checkbox-label">
                <input data-field="textAutoLayout" type="checkbox" ${checkedAttr(block.textAutoLayout, true)} />
                (1)(2) などを自動で横並びにする
              </label>
              <div class="three-columns">
                <label>列数
                  <select data-field="columns">${problemColumnsOptions(block.columns || 2)}</select>
                </label>
                <label>横の間隔
                  <div class="word-size-control">
                    <input data-field="textColumnGapPx" type="number" min="0" max="400" step="1" value="${escapeHtml(Number(block.textColumnGapPx ?? 80))}" />
                    <span>px</span>
                  </div>
                </label>
                <label>縦の間隔
                  <select data-field="rowGap">${problemRowGapOptions(block.rowGap || "normal")}</select>
                </label>
              </div>
              <div class="three-columns">
                <label>空行の間隔
                  <select data-field="blankLineGap">${problemBlankLineGapOptions(block.blankLineGap || "large")}</select>
                </label>
                <label>数式サイズ
                  <div class="word-size-control">
                    <input data-field="inlineMathPt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(inlineMathFontSizePt(block))}" />
                    <span>pt</span>
                  </div>
                </label>
              </div>
              <div class="helper-text">通常の文章はそのまま表示します。##...## で囲った範囲は、改行を含んでいても1つの固まりとして横並びにします。</div>
              <button type="button" class="secondary small-btn" data-action="reset-line-font-sizes">行別文字サイズを標準に戻す</button>
            </div>
          </details>

          <details class="settings-section">
            <summary>補助枠</summary>
            <div class="section-body">
              <div class="helper-text">補助枠はWordのテキストボックスのように、ページ上に浮かせて配置します。本文の改ページとは切り離し、ページ番号＋ページ内位置で管理します。</div>
              ${(normalizeTextNotes(block).length ? normalizeTextNotes(block) : []).map((note, noteIndex) => renderTextNoteEditor(note, noteIndex)).join("")}
              <button type="button" class="secondary small-btn" data-action="add-text-note">＋ 補助枠を追加</button>
            </div>
          </details>
        `;
      }
    }

    if (block.type === "sidebox") {
      body.innerHTML = `
        <label>本文
          <textarea data-field="text">${escapeHtml(block.text)}</textarea>
        </label>
        <label>枠の中の文字
          <textarea data-field="boxText">${escapeHtml(block.boxText)}</textarea>
        </label>
        ${formatHelp()}
        <div class="two-columns equal-columns">
          <label>配置
            <select data-field="boxPosition">${sideBoxPositionOptions(block.boxPosition || "right")}</select>
          </label>
          <label>枠の幅（%）
            <input data-field="boxWidth" type="number" min="15" max="80" value="${escapeHtml(block.boxWidth || 35)}" />
          </label>
        </div>
        <div class="three-columns">
          <label>枠の種類
            <select data-field="boxFrame">${blockFrameOptions(block.boxFrame || "simple")}</select>
          </label>
          <label>枠内フォント
            <select data-field="boxFontFamily">${fontFamilyOptions(block.boxFontFamily || "default")}</select>
          </label>
          <label>枠内文字サイズ
            <div class="word-size-control">
              <input data-field="boxFontSizePt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(sanitizeFontSizePt(block.boxFontSizePt, textSizeToPt(block.boxFontSize || "normal")))}" />
              <span>pt</span>
            </div>
          </label>
          <label>枠内文字色
            <input data-field="boxColor" type="color" value="${normalizeColor(block.boxColor || block.color)}" />
          </label>
        </div>
        <label>枠内文字揃え
          <select data-field="boxAlign">${blockAlignOptions(block.boxAlign || "left")}</select>
        </label>
      `;
    }

    if (block.type === "math") {
      const latex = String(block.content || "").split(/\r?\n/).map((line) => convertMathToLatex(line)).join(" \n");
      body.innerHTML = `
        <label>数式入力
          <textarea data-field="content" placeholder="例：1/2 + 1/3&#10;2/3 - 1/4">${escapeHtml(block.content || "")}</textarea>
        </label>
        ${mathHelperButtons("content")}
        <div class="helper-text">改行すると、プレビューでも数式が複数行で表示されます。√(2), sqrt(2), 2(a+b)/5, (2(a+b))/5, <=, >=, +- も自動変換します。</div>
        <div class="latex-preview">LaTeX: ${escapeHtml(latex)}</div>
      `;
    }

    if (block.type === "problem") {
      const content = block.content ?? [block.text || "", block.math || ""].filter(Boolean).join("\n");
      const columns = Math.min(4, Math.max(1, Number(block.columns) || 1));
      body.innerHTML = `
        <details class="settings-section" open>
          <summary>内容</summary>
          <div class="section-body">
            <label>大問番号
              <input data-field="number" type="number" min="0" value="${escapeHtml(block.number ?? nextProblemNumber())}" />
            </label>
            <label>問題文<br><span class="helper-text">ここに問題を入力します。2〜4列表示では1行につき1問。例：(1) (2) (3) を横に並べたいときは、3列にして各番号を1行ずつ入力します。空行を入れると次の段との間隔が広がります。</span>
              <textarea class="tall-textarea" data-field="content">${escapeHtml(content)}</textarea>
            </label>
            ${mathHelperButtons("content")}
            <div class="helper-text">文中の 1/2 や 1/2x は小さくなりにくい分数で表示します。√(2), sqrt(2), 2(a+b)/5, (2(a+b))/5, <=, >=, +- も自動変換します。</div>
            ${problemContentFormatControl(block, columns)}
          </div>
        </details>

        <details class="settings-section">
          <summary>解答欄</summary>
          <div class="section-body">
            <div class="three-columns">
              <label>解答欄
                <select data-field="answerSize">
                  ${problemAnswerSizeOptions(block.answerSize || "medium")}
                </select>
              </label>
              <label>解答欄の形
                <select data-field="answerFormat">
                  ${answerFormatOptions(block.answerFormat || "line")}
                </select>
              </label>
              <label>四角欄サイズ
                <select data-field="answerBoxSize">
                  ${answerBoxSizeOptions(block.answerBoxSize || "medium")}
                </select>
              </label>
            </div>
            <label>解答欄の位置
              <select data-field="answerPlacement">
                ${answerPlacementOptions(block.answerPlacement || "bottom")}
              </select>
            </label>
            <div class="three-columns">
              <label>解答欄 横位置(px)
                <input data-field="answerX" type="number" min="-420" max="420" step="1" value="${escapeHtml(block.answerX || 0)}" />
              </label>
              <label>解答欄 縦位置(px)
                <input data-field="answerY" type="number" min="-240" max="240" step="1" value="${escapeHtml(block.answerY || 0)}" />
              </label>
              <button type="button" class="secondary small-btn" data-action="reset-answer-position">解答欄位置リセット</button>
            </div>
          </div>
        </details>

        <details class="settings-section">
          <summary>枠・装飾</summary>
          <div class="section-body">
            ${problemDecorationControl(block)}
          </div>
        </details>
      `;
    }

    if (block.type === "problemRow") {
      body.innerHTML = `
        <details class="settings-section" open>
          <summary>問題の並び</summary>
          <div class="three-columns">
            <label>列数
              <select data-field="columns">
                ${problemColumnsOptions(block.columns || 2)}
              </select>
            </label>
            <label>横の間隔
              <select data-field="columnGap">
                ${problemRowGapOptions(block.columnGap || "normal")}
              </select>
            </label>
            <label>縦の間隔
              <select data-field="rowGap">
                ${problemRowGapOptions(block.rowGap || "normal")}
              </select>
            </label>
            <label>空行の間隔
              <select data-field="blankLineGap">
                ${problemBlankLineGapOptions(block.blankLineGap || "large")}
              </select>
            </label>
          </div>
          <div class="helper-text">問題入力欄で空行を入れると、その場所に大きめの余白を作れます。</div>
        </details>

        <details class="settings-section" open>
          <summary>問題文・数式</summary>
          <label>数式サイズ
            <select data-field="inlineMathSize">
              ${problemInlineMathSizeOptions(block.inlineMathSize || "large")}
            </select>
          </label>
          ${formatHelp()}
        </details>

        <details class="settings-section">
          <summary>解答欄</summary>
          <div class="three-columns">
            <label>解答欄
              <select data-field="answerSize">
                ${problemRowAnswerSizeOptions(block.answerSize || "none")}
              </select>
            </label>
            <label>解答欄の形
              <select data-field="answerFormat">
                ${answerFormatOptions(block.answerFormat || "line")}
              </select>
            </label>
            <label>四角欄サイズ
              <select data-field="answerBoxSize">
                ${answerBoxSizeOptions(block.answerBoxSize || "medium")}
              </select>
            </label>
          </div>
          <label>解答欄の位置
            <select data-field="answerPlacement">
              ${answerPlacementOptions(block.answerPlacement || "bottom")}
            </select>
          </label>
          <div class="three-columns">
            <label>解答欄 横位置(px)
              <input data-field="answerX" type="number" min="-420" max="420" step="1" value="${escapeHtml(block.answerX || 0)}" />
            </label>
            <label>解答欄 縦位置(px)
              <input data-field="answerY" type="number" min="-240" max="240" step="1" value="${escapeHtml(block.answerY || 0)}" />
            </label>
            <button type="button" class="secondary small-btn" data-action="reset-answer-position">解答欄位置リセット</button>
          </div>
        </details>

        <label>横並びにする問題<br><span class="helper-text">1行につき1問。空行を入れると、その場所の間隔が広がります。例：(1) 1/2x + 1/3x / (2) (1/2x + 1/3x)</span>
          <textarea class="tall-textarea" data-field="content">${escapeHtml(block.content || "")}</textarea>
        </label>
        <div class="helper-text">メニューは「問題の並び」「問題文・数式」「解答欄」に整理しました。半角で 1/2x と入力すると、分数の後ろに文字がついた形で表示されます。</div>
      `;
    }

    if (block.type === "freeProblem") {
      if (!block.content) block.content = "(1)\n(2)\n(3)\n\n(4)\n(5)\n(6)";
      if (!block.freeCanvasHeightMm) block.freeCanvasHeightMm = 95;
      if (!block.inlineMathPt) block.inlineMathPt = 14;
      if (!block.freeColumns) block.freeColumns = 3;
      if (!block.freeColumnGapPx) block.freeColumnGapPx = 190;
      if (!block.freeRowGapPx) block.freeRowGapPx = 86;
      if (!block.freePositions || typeof block.freePositions !== "object" || Array.isArray(block.freePositions)) block.freePositions = {};
    }
    if (block.type === "testLayout") {
      body.innerHTML = `
        <details class="settings-section" open>
          <summary>ヘッダー</summary>
          <div class="section-body">
            <label>テスト名・見出し
              <input data-field="testTitle" type="text" value="${escapeHtml(block.testTitle || "")}" />
            </label>
            <div class="three-columns">
              <label>フォント
                <select data-field="testFontFamily">${fontFamilyOptions(block.testFontFamily || "default")}</select>
              </label>
              <label>ヘッダー文字サイズ
                <div class="word-size-control">
                  <input data-field="testHeaderFontSizePt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(sanitizeFontSizePt(block.testHeaderFontSizePt, 16))}" />
                  <span>pt</span>
                </div>
              </label>
              <label>全体の高さ
                <div class="word-size-control">
                  <input data-field="testHeightMm" type="number" min="50" max="350" step="5" value="${escapeHtml(Number(block.testHeightMm) || 180)}" />
                  <span>mm</span>
                </div>
              </label>
            </div>
            <div class="three-columns">
              <label>中心線
                <select data-field="centerLineStyle">${wordCenterLineOptions(block.centerLineStyle || "solid")}</select>
              </label>
              <label>中心線の太さ
                <div class="word-size-control">
                  <input data-field="centerLineWidthPx" type="number" min="0" max="8" step="0.5" value="${escapeHtml(Number(block.centerLineWidthPx ?? 1))}" />
                  <span>px</span>
                </div>
              </label>
              <label>中心線の色
                <input data-field="centerLineColor" type="color" value="${normalizeColor(block.centerLineColor || "#111111")}" />
              </label>
            </div>
            <div class="helper-text">中心線はWordの段組みの境界線に近い扱いで、左右の列の間に表示されます。</div>
          </div>
        </details>

        <details class="settings-section" open>
          <summary>2列の内容</summary>
          <div class="section-body">
            <div class="two-columns equal-columns">
              <label>左列タイトル
                <input data-field="leftTitle" type="text" value="${escapeHtml(block.leftTitle || "")}" />
              </label>
              <label>右列タイトル
                <input data-field="rightTitle" type="text" value="${escapeHtml(block.rightTitle || "")}" />
              </label>
            </div>
            <div class="two-columns equal-columns">
              <label>左列
                <textarea class="tall-textarea" data-field="leftContent">${escapeHtml(block.leftContent || "")}</textarea>
              </label>
              <label>右列
                <textarea class="tall-textarea" data-field="rightContent">${escapeHtml(block.rightContent || "")}</textarea>
              </label>
            </div>
            ${mathHelperButtons("leftContent")}
            ${mathHelperButtons("rightContent")}
            <label>本文文字サイズ
              <div class="word-size-control">
                <input data-field="testBodyFontSizePt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(sanitizeFontSizePt(block.testBodyFontSizePt, 13))}" />
                <span>pt</span>
              </div>
            </label>
          </div>
        </details>

        <details class="settings-section">
          <summary>下部の解答欄</summary>
          <div class="section-body">
            <label class="checkbox-label">
              <input data-field="showAnswerBox" type="checkbox" ${checkedAttr(block.showAnswerBox, true)} />
              右下に解答欄を表示
            </label>
            <label>解答欄内の文字
              <input data-field="answerBoxText" type="text" value="${escapeHtml(block.answerBoxText || "")}" placeholder="空欄でもOK" />
            </label>
          </div>
        </details>
      `;
    }

    if (block.type === "freeProblem") {
      body.innerHTML = `
        <details class="settings-section" open>
          <summary>内容</summary>
          <div class="section-body">
            <label>問題<br><span class="helper-text">1行につき1問。プレビュー上で各問題をドラッグして、位置を自由に決められます。</span>
              <textarea class="tall-textarea" data-field="content">${escapeHtml(block.content || "")}</textarea>
            </label>
            ${mathHelperButtons("content")}
          </div>
        </details>

        <details class="settings-section" open>
          <summary>配置・サイズ</summary>
          <div class="section-body">
            <div class="three-columns">
              <label>キャンバス高さ
                <div class="word-size-control">
                  <input data-field="freeCanvasHeightMm" type="number" min="30" max="500" step="5" value="${escapeHtml(Number(block.freeCanvasHeightMm) || 95)}" />
                  <span>mm</span>
                </div>
              </label>
              <label>文字サイズ
                <div class="word-size-control">
                  <input data-field="fontSizePt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(blockFontSizePt(block))}" />
                  <span>pt</span>
                </div>
              </label>
              <label>数式サイズ
                <div class="word-size-control">
                  <input data-field="inlineMathPt" type="number" min="6" max="72" step="0.5" value="${escapeHtml(sanitizeFontSizePt(block.inlineMathPt, 14))}" />
                  <span>pt</span>
                </div>
              </label>
            </div>
            <div class="three-columns">
              <label>初期列数
                <select data-field="freeColumns">${problemColumnsOptions(block.freeColumns || 3)}</select>
              </label>
              <label>初期横間隔(px)
                <input data-field="freeColumnGapPx" type="number" min="40" max="420" step="5" value="${escapeHtml(Number(block.freeColumnGapPx) || 190)}" />
              </label>
              <label>初期縦間隔(px)
                <input data-field="freeRowGapPx" type="number" min="30" max="260" step="5" value="${escapeHtml(Number(block.freeRowGapPx) || 86)}" />
              </label>
            </div>
            <button type="button" class="secondary small-btn" data-action="reset-free-problem-position">自由配置をリセット</button>
          </div>
        </details>

        <details class="settings-section">
          <summary>枠・装飾</summary>
          <div class="section-body">
            ${problemDecorationControl(block)}
          </div>
        </details>
      `;
    }

    if (block.type === "answer") {
      body.innerHTML = `
        <label>解答欄サイズ
          <select data-field="answerSize">
            ${answerSizeOptions(block.answerSize)}
          </select>
        </label>
        <div class="three-columns">
          <label>解答欄 横位置(px)
            <input data-field="answerX" type="number" min="-420" max="420" step="1" value="${escapeHtml(block.answerX || 0)}" />
          </label>
          <label>解答欄 縦位置(px)
            <input data-field="answerY" type="number" min="-240" max="240" step="1" value="${escapeHtml(block.answerY || 0)}" />
          </label>
          <button type="button" class="secondary small-btn" data-action="reset-answer-position">解答欄位置リセット</button>
        </div>
      `;
    }

    if (block.type === "numberline") {
      body.innerHTML = `
        <label>図のタイトル・説明
          <input data-field="title" type="text" value="${escapeHtml(block.title)}" placeholder="空欄でもOK" />
        </label>
        <div class="three-columns">
          <label>最小値
            <input data-field="min" type="text" value="${escapeHtml(block.min)}" />
          </label>
          <label>最大値
            <input data-field="max" type="text" value="${escapeHtml(block.max)}" />
          </label>
          <label>目盛り間隔
            <input data-field="step" type="text" value="${escapeHtml(block.step)}" />
          </label>
        </div>
        <div class="two-columns">
          <label>矢印
            <select data-field="arrow">
              ${makeOptions({ none: "なし", left: "左", right: "右", both: "両端" }, block.arrow || "both")}
            </select>
          </label>
          <label>配置
            <select data-field="diagramLayout">
              ${diagramLayoutOptions(block.diagramLayout || "center")}
            </select>
          </label>
        </div>
        <div class="two-columns">
          <label class="checkbox-label">
            <input data-field="showTicks" type="checkbox" ${checkedAttr(block.showTicks, true)} />
            目盛り線を表示
          </label>
          <label class="checkbox-label">
            <input data-field="showLabels" type="checkbox" ${checkedAttr(block.showLabels, true)} />
            数字・座標を表示
          </label>
        </div>
        <label>点<br><span class="helper-text">書式：値,closed/open,ラベル　例：1/2,closed,1/2</span>
          <textarea data-field="points">${escapeHtml(block.points)}</textarea>
        </label>
        <label>区間<br><span class="helper-text">書式：開始,終了,closed/open,closed/open,ラベル　例：-1,3,closed,open,-1≦x&lt;3</span>
          <textarea data-field="intervals">${escapeHtml(block.intervals)}</textarea>
        </label>
      `;
    }

    if (block.type === "geometry") {
      body.innerHTML = `
        <label>図のタイトル・説明
          <input data-field="title" type="text" value="${escapeHtml(block.title)}" placeholder="空欄でもOK" />
        </label>
        <div class="two-columns">
          <label>図形の種類
            <select data-field="shapeKind">
              ${geometryKindOptions(block.shapeKind || "triangle")}
            </select>
          </label>
          <label>配置
            <select data-field="diagramLayout">
              ${diagramLayoutOptions(block.diagramLayout || "center")}
            </select>
          </label>
        </div>
        <label>頂点・点の位置<br><span class="helper-text">書式：点名,x,y　例：A,110,165</span>
          <textarea data-field="coords">${escapeHtml(block.coords)}</textarea>
        </label>
        <label>辺・半径の表示<br><span class="helper-text">書式：AB=6cm / OA=5cm など。1行に1つ。</span>
          <textarea data-field="sideLabels">${escapeHtml(block.sideLabels)}</textarea>
        </label>
        <div class="two-columns">
          <label>直角マーク
            <input data-field="rightAngle" type="text" value="${escapeHtml(block.rightAngle || "none")}" placeholder="例：A / B / none" />
          </label>
          <label>平行マーク
            <input data-field="parallelMarks" type="text" value="${escapeHtml(block.parallelMarks || "")}" placeholder="例：AB//CD" />
          </label>
        </div>
        <label>補助線<br><span class="helper-text">書式：A-C　複数なら改行。円なら O-A のように半径線も可。</span>
          <textarea data-field="dashedLines">${escapeHtml(block.dashedLines)}</textarea>
        </label>
      `;
    }

    if (block.type === "coordinate") {
      body.innerHTML = `
        <label>図のタイトル・説明
          <input data-field="title" type="text" value="${escapeHtml(block.title)}" placeholder="空欄でもOK" />
        </label>
        <div class="three-columns">
          <label>x最小
            <input data-field="xmin" type="text" value="${escapeHtml(block.xmin)}" />
          </label>
          <label>x最大
            <input data-field="xmax" type="text" value="${escapeHtml(block.xmax)}" />
          </label>
          <label>目盛り
            <input data-field="step" type="text" value="${escapeHtml(block.step)}" />
          </label>
        </div>
        <div class="three-columns">
          <label>y最小
            <input data-field="ymin" type="text" value="${escapeHtml(block.ymin)}" />
          </label>
          <label>y最大
            <input data-field="ymax" type="text" value="${escapeHtml(block.ymax)}" />
          </label>
          <label>配置
            <select data-field="diagramLayout">
              ${diagramLayoutOptions(block.diagramLayout || "center")}
            </select>
          </label>
        </div>
        <div class="two-columns">
          <label class="checkbox-label">
            <input data-field="showTicks" type="checkbox" ${checkedAttr(block.showTicks, true)} />
            目盛り線を表示
          </label>
          <label class="checkbox-label">
            <input data-field="showLabels" type="checkbox" ${checkedAttr(block.showLabels, true)} />
            座標の数字を表示
          </label>
        </div>
        <label>点<br><span class="helper-text">書式：x,y,ラベル　例：1,2,A</span>
          <textarea data-field="points">${escapeHtml(block.points)}</textarea>
        </label>
        <label>関数グラフ<br><span class="helper-text">一次関数や簡単な式に対応。例：y=2x+1 / y=-1/2x+3 / y=x^2</span>
          <textarea data-field="functions">${escapeHtml(block.functions)}</textarea>
        </label>
      `;
    }

    if (block.type !== "problem") {
      body.insertAdjacentHTML("afterbegin", styleControl(block));
    }

    node.querySelectorAll("[data-note-field]").forEach((input) => {
      input.addEventListener("input", (event) => updateTextNote(block.id, Number(event.target.dataset.noteIndex), event.target.dataset.noteField, readFieldValue(event.target), event.target));
      input.addEventListener("change", (event) => updateTextNote(block.id, Number(event.target.dataset.noteIndex), event.target.dataset.noteField, readFieldValue(event.target), event.target));
    });

    node.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("input", (event) => updateBlock(block.id, event.target.dataset.field, readFieldValue(event.target), event.target, event.type));
      input.addEventListener("change", (event) => updateBlock(block.id, event.target.dataset.field, readFieldValue(event.target), event.target, event.type));
    });

    if (block.type === "text") {
      const contentTextarea = node.querySelector('textarea[data-field="content"]');
      if (contentTextarea) {
        ["focus", "click", "keyup", "mouseup", "input", "select"].forEach((eventName) => {
          contentTextarea.addEventListener(eventName, () => setActiveTextLine(block, contentTextarea, node));
        });
        setActiveTextLine(block, contentTextarea, node);
      }
    }

    node.querySelectorAll("[data-insert-text]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetField = button.dataset.targetField || "content";
        const text = button.dataset.insertText || "";
        const target = node.querySelector(`[data-field="${targetField}"]`);
        if (!target) return;
        const start = target.selectionStart ?? target.value.length;
        const end = target.selectionEnd ?? target.value.length;
        const before = target.value.slice(0, start);
        const after = target.value.slice(end);
        target.value = `${before}${text}${after}`;
        const cursorBack = Number(button.dataset.cursorBack || 0);
        const nextPos = start + text.length - cursorBack;
        target.focus();
        target.setSelectionRange(nextPos, nextPos);
        updateBlock(block.id, targetField, target.value, target);
      });
    });

    node.querySelectorAll("[data-action='reset-answer-position']").forEach((button) => {
      button.addEventListener("click", () => {
        block.answerX = 0;
        block.answerY = 0;
        if (block.answerPositions) block.answerPositions = {};
        renderAll();
        saveToBrowser();
      });
    });

    node.querySelectorAll("[data-action='reset-free-problem-position']").forEach((button) => {
      button.addEventListener("click", () => {
        block.freePositions = {};
        renderAll();
        saveToBrowser();
      });
    });

    node.querySelectorAll("[data-action='reset-line-font-sizes']").forEach((button) => {
      button.addEventListener("click", () => {
        if (block.type !== "text") return;
        block.lineFontSizes = {};
        renderAll();
        saveToBrowser();
      });
    });

    node.querySelectorAll("[data-action='add-text-note']").forEach((button) => {
      button.addEventListener("click", () => {
        const notes = normalizeTextNotes(block);
        notes.push(createTextNote({ enabled: true, text: "", page: 1, x: textNoteDefault.noteX, y: 40 + notes.length * 56, color: block.color || DEFAULT_TEXT_COLOR }));
        renderAll();
        saveToBrowser();
      });
    });

    node.querySelectorAll("[data-action='delete-text-note']").forEach((button) => {
      button.addEventListener("click", () => {
        const indexToDelete = Number(button.dataset.noteIndex);
        block.noteBoxes = normalizeTextNotes(block).filter((_, noteIndex) => noteIndex !== indexToDelete);
        renderAll();
        saveToBrowser();
      });
    });

    node.querySelectorAll("[data-action='reset-text-note-position']").forEach((button) => {
      button.addEventListener("click", () => {
        const noteIndex = Number(button.dataset.noteIndex);
        const note = normalizeTextNotes(block)[noteIndex];
        if (!note) return;
        note.page = 1;
        note.x = textNoteDefault.noteX;
        note.y = 40 + noteIndex * 56;
        renderAll();
        saveToBrowser();
      });
    });

    node.querySelector("[data-action='delete']").addEventListener("click", () => {
      state.blocks = state.blocks.filter((item) => item.id !== block.id);
      renderAll();
      saveToBrowser();
    });

    node.querySelector("[data-action='up']").addEventListener("click", () => moveBlock(index, -1));
    node.querySelector("[data-action='down']").addEventListener("click", () => moveBlock(index, 1));

    node.addEventListener("dragstart", () => {
      draggedBlockId = block.id;
      node.classList.add("dragging");
    });
    node.addEventListener("dragend", () => {
      draggedBlockId = null;
      node.classList.remove("dragging");
      document.querySelectorAll(".block.drag-over").forEach((el) => el.classList.remove("drag-over"));
    });
    node.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (draggedBlockId && draggedBlockId !== block.id) node.classList.add("drag-over");
    });
    node.addEventListener("dragleave", () => node.classList.remove("drag-over"));
    node.addEventListener("drop", (event) => {
      event.preventDefault();
      node.classList.remove("drag-over");
      moveBlockTo(draggedBlockId, block.id);
    });

    blocksEl.appendChild(node);
  });
}

function updateTextNote(id, noteIndex, field, value, sourceEl) {
  const block = state.blocks.find((item) => item.id === id);
  if (!block || block.type !== "text") return;
  const notes = normalizeTextNotes(block);
  const note = notes[noteIndex];
  if (!note) return;

  if (["page", "x", "y", "width", "fontSizePt"].includes(field)) {
    if (field === "fontSizePt") {
      note[field] = sanitizeFontSizePt(value, DEFAULT_FONT_SIZE_PT);
    } else if (field === "page") {
      note[field] = Math.max(1, Math.round(Number(value) || 1));
    } else {
      note[field] = Number(value);
      if (field === "x") note.xMm = pxToMmX(note.x);
      if (field === "y") note.yMm = pxToMmY(note.y);
    }
  } else if (field === "color") {
    note[field] = normalizeColor(value);
  } else {
    note[field] = value;
  }

  renderPreview();
  updateLatexPreview(sourceEl, block);
  saveToBrowser();
}

function updateBlock(id, field, value, sourceEl, eventType = "") {
  const block = state.blocks.find((item) => item.id === id);
  if (!block) return;

  if (block.type === "geometry" && field === "shapeKind") {
    Object.assign(block, geometryDefaults(value), {
      id: block.id,
      type: "geometry",
      title: block.title || "",
      color: block.color || DEFAULT_TEXT_COLOR,
      frame: block.frame || DEFAULT_BLOCK_FRAME,
      textSize: block.textSize || DEFAULT_TEXT_SIZE
    });
    renderAll();
    saveToBrowser();
    return;
  }

  if (block.type === "text" && ["fontSizePt", "fontFamily", "color"].includes(field) && hasActiveTextSelection(block)) {
    // 入力途中ではなく、変更確定時に選択範囲へ適用する。
    if (eventType === "input") return;
    if (addInlineStyleRange(block, field, value)) {
      renderPreview();
      saveToBrowser();
      return;
    }
  }

  if (block.type === "text" && field === "fontSizePt") {
    normalizeLineFontSizes(block);
    const lineIndex = Math.max(0, Number(activeTextLineByBlock[block.id] || 0));
    block.lineFontSizes[String(lineIndex)] = sanitizeFontSizePt(value, blockFontSizePt(block));
    renderPreview();
    saveToBrowser();
    return;
  }

  block[field] = ["number", "columns", "answerX", "answerY", "noteX", "noteY", "noteWidth", "fontSizePt", "inlineMathPt", "boxFontSizePt", "centerLineWidthPx", "freeCanvasHeightMm", "freeColumns", "freeColumnGapPx", "freeRowGapPx", "textColumnGapPx"].includes(field) ? Number(value) : value;
  if (["fontSizePt", "inlineMathPt", "boxFontSizePt"].includes(field)) block[field] = sanitizeFontSizePt(value, field === "inlineMathPt" ? INLINE_MATH_SIZE_PT_DEFAULTS.medium : DEFAULT_FONT_SIZE_PT);
  if (["color", "boxColor", "noteColor", "centerLineColor"].includes(field)) block[field] = normalizeColor(value);

  if (field === "problemLayoutMode" && value === "free") {
    block.answerSize = "none";
    if (!block.freePositions || typeof block.freePositions !== "object" || Array.isArray(block.freePositions)) block.freePositions = {};
  }

  if (field === "problemLayoutMode" && ["auto", "calc"].includes(value)) {
    if (!block.columns || Number(block.columns) < 2) block.columns = 2;
    if (value === "calc") block.answerSize = "none";
  }

  // 数式ブロックでは、配置指定を数式専用の配置に同期する。
  if (block.type === "math" && field === "align") block.mathLayout = normalizeMathLayout(value);
  if (block.type === "math" && field === "mathLayout") block.align = normalizeMathLayout(value);

  renderPreview();
  updateLatexPreview(sourceEl, block);
  saveToBrowser();
}

function updateLatexPreview(sourceEl, block) {
  if (!sourceEl || !["math", "content"].includes(sourceEl.dataset.field)) return;

  const blockNode = sourceEl.closest(".block");
  const latexPreview = blockNode?.querySelector(".latex-preview");
  if (!latexPreview) return;

  const rawMath = block.content || "";
  const latex = String(rawMath).split(/\r?\n/).map((line) => convertMathToLatex(line)).join(" \n");
  latexPreview.textContent = `LaTeX: ${latex}`;
}

function moveBlock(index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= state.blocks.length) return;
  const [block] = state.blocks.splice(index, 1);
  state.blocks.splice(nextIndex, 0, block);
  renderAll();
  saveToBrowser();
}

function moveBlockTo(fromId, toId) {
  if (!fromId || !toId || fromId === toId) return;
  const fromIndex = state.blocks.findIndex((block) => block.id === fromId);
  const toIndex = state.blocks.findIndex((block) => block.id === toId);
  if (fromIndex < 0 || toIndex < 0) return;
  const [block] = state.blocks.splice(fromIndex, 1);
  const insertIndex = fromIndex < toIndex ? toIndex : toIndex;
  state.blocks.splice(insertIndex, 0, block);
  renderAll();
  saveToBrowser();
}

function svgEl(name, attrs = {}) {
  const el = document.createElementNS(SVG_NS, name);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) el.setAttribute(key, String(value));
  });
  return el;
}

function appendSvgText(parent, text, x, y, attrs = {}) {
  const el = svgEl("text", { x, y, "text-anchor": attrs.anchor || "middle", ...attrs });
  el.textContent = text;
  parent.appendChild(el);
  return el;
}

function appendSvgMathLabel(parent, raw, x, y, attrs = {}) {
  const label = String(raw || "").trim();
  const fraction = label.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
  if (!fraction) return appendSvgText(parent, label, x, y, attrs);

  const g = svgEl("g");
  const anchor = attrs.anchor || "middle";
  const offset = anchor === "start" ? 0 : anchor === "end" ? -10 : 0;
  appendSvgText(g, fraction[1], x + offset, y - 7, { ...attrs, anchor: "middle" });
  g.appendChild(svgEl("line", { x1: x - 10 + offset, y1: y - 2, x2: x + 10 + offset, y2: y - 2, class: "thin-line" }));
  appendSvgText(g, fraction[2], x + offset, y + 12, { ...attrs, anchor: "middle" });
  parent.appendChild(g);
  return g;
}

function makeSvg(width, height) {
  const svg = svgEl("svg", {
    class: "diagram-svg",
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    role: "img"
  });

  const defs = svgEl("defs");
  defs.innerHTML = `
    <marker id="arrowEnd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"></path>
    </marker>
    <marker id="arrowStart" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 10 0 L 0 5 L 10 10 z" fill="currentColor"></path>
    </marker>
  `;
  svg.appendChild(defs);
  return svg;
}

function parseNumber(value, fallback = 0) {
  const s = String(value ?? "").trim().replaceAll("−", "-").replaceAll("－", "-");
  const fraction = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (denominator !== 0) return Number(fraction[1]) / denominator;
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : fallback;
}

function parseLines(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parsePointsList(text) {
  return parseLines(text).map((line) => {
    const parts = line.split(",").map((part) => part.trim());
    return {
      value: parseNumber(parts[0], 0),
      rawValue: parts[0] || "",
      type: parts[1] || "closed",
      label: parts.slice(2).join(",") || parts[0] || ""
    };
  });
}

function parseIntervalList(text) {
  return parseLines(text).map((line) => {
    const parts = line.split(",").map((part) => part.trim());
    return {
      start: parseNumber(parts[0], 0),
      end: parseNumber(parts[1], 0),
      left: parts[2] || "closed",
      right: parts[3] || "closed",
      label: parts.slice(4).join(",") || ""
    };
  });
}

function renderDiagramContainer(block, svg) {
  const wrapper = document.createElement("div");
  wrapper.style.color = blockColor(block);
  svg.style.color = blockColor(block);
  svg.style.setProperty("--diagram-text-color", blockColor(block));
  if (block.title) {
    const title = document.createElement("div");
    title.className = "diagram-title";
    title.appendChild(renderTextWithInlineMath(block.title));
    wrapper.appendChild(title);
  }

  const diagram = document.createElement("div");
  const diagramLayout = ["left", "center", "right"].includes(block.diagramLayout) ? block.diagramLayout : "center";
  diagram.className = `diagram-wrap diagram-${diagramLayout}`;
  diagram.appendChild(svg);
  wrapper.appendChild(diagram);
  return wrapper;
}

function renderNumberlineBlock(block) {
  const width = 680;
  const height = 130;
  const svg = makeSvg(width, height);
  const min = parseNumber(block.min, -5);
  const max = parseNumber(block.max, 5);
  const step = Math.max(Math.abs(parseNumber(block.step, 1)), 0.0001);
  const left = 52;
  const right = width - 42;
  const axisY = 70;
  const showTicks = boolValue(block.showTicks, true);
  const showLabels = boolValue(block.showLabels, true);
  const scale = (value) => left + ((value - min) / (max - min || 1)) * (right - left);

  const arrow = block.arrow || "both";
  const axisAttrs = { x1: left, y1: axisY, x2: right, y2: axisY, class: "axis" };
  if (arrow === "right" || arrow === "both") axisAttrs["marker-end"] = "url(#arrowEnd)";
  if (arrow === "left" || arrow === "both") axisAttrs["marker-start"] = "url(#arrowStart)";
  svg.appendChild(svgEl("line", axisAttrs));

  const tickStart = Math.ceil(min / step) * step;
  for (let v = tickStart; v <= max + step / 1000; v += step) {
    const rounded = Math.abs(v) < 1e-9 ? 0 : Number(v.toFixed(8));
    const x = scale(rounded);
    if (showTicks) svg.appendChild(svgEl("line", { x1: x, y1: axisY - 6, x2: x, y2: axisY + 6, class: "thin-line" }));
    if (showLabels) appendSvgMathLabel(svg, String(rounded).replace(/\.0$/, ""), x, axisY + 28);
  }

  parseIntervalList(block.intervals).forEach((interval, index) => {
    const y = 44 - index * 13;
    const x1 = scale(interval.start);
    const x2 = scale(interval.end);
    svg.appendChild(svgEl("line", { x1, y1: y, x2, y2: y, class: "interval-line" }));
    [
      { x: x1, type: interval.left },
      { x: x2, type: interval.right }
    ].forEach(({ x, type }) => {
      svg.appendChild(svgEl("circle", {
        cx: x,
        cy: y,
        r: 6,
        class: type === "open" ? "point-open" : "point-closed"
      }));
    });
    if (interval.label) appendSvgText(svg, interval.label, (x1 + x2) / 2, y - 12);
  });

  parsePointsList(block.points).forEach((point) => {
    const x = scale(point.value);
    svg.appendChild(svgEl("circle", {
      cx: x,
      cy: axisY,
      r: 5.5,
      class: point.type === "open" ? "point-open" : "point-closed"
    }));
    if (point.label) appendSvgMathLabel(svg, point.label, x, axisY - 18);
  });

  return renderDiagramContainer(block, svg);
}

function parseCoords(text) {
  return parseLines(text).map((line) => {
    const parts = line.split(",").map((part) => part.trim());
    return {
      name: parts[0] || "",
      x: parseNumber(parts[1], 0),
      y: parseNumber(parts[2], 0)
    };
  }).filter((point) => point.name && Number.isFinite(point.x) && Number.isFinite(point.y));
}

function pointMap(points) {
  return new Map(points.map((point) => [point.name, point]));
}

function getSideLabels(text) {
  const map = new Map();
  parseLines(text).forEach((line) => {
    const [key, ...rest] = line.split("=");
    const side = String(key || "").trim();
    const label = rest.join("=").trim();
    if (side && label) {
      map.set(side, label);
      map.set(side.split("").reverse().join(""), label);
    }
  });
  return map;
}

function drawVertex(svg, point) {
  svg.appendChild(svgEl("circle", { cx: point.x, cy: point.y, r: 3, class: "point-closed" }));
  appendSvgText(svg, point.name, point.x, point.y - 10);
}

function drawSideLabel(svg, p1, p2, label) {
  if (!label) return;
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  appendSvgMathLabel(svg, label, mx, my - 8);
}

function drawRightAngle(svg, vertex, p1, p2) {
  if (!vertex || !p1 || !p2) return;
  const size = 18;
  const v1 = normalizeVector({ x: p1.x - vertex.x, y: p1.y - vertex.y });
  const v2 = normalizeVector({ x: p2.x - vertex.x, y: p2.y - vertex.y });
  const a = { x: vertex.x + v1.x * size, y: vertex.y + v1.y * size };
  const b = { x: a.x + v2.x * size, y: a.y + v2.y * size };
  const c = { x: vertex.x + v2.x * size, y: vertex.y + v2.y * size };
  svg.appendChild(svgEl("path", { d: `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`, class: "right-angle" }));
}

function normalizeVector(v) {
  const len = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / len, y: v.y / len };
}

function drawDashedLines(svg, text, pointsByName) {
  parseLines(text).forEach((line) => {
    const [from, to] = line.split(/[-–—]/).map((part) => part.trim());
    const p1 = pointsByName.get(from);
    const p2 = pointsByName.get(to);
    if (!p1 || !p2) return;
    svg.appendChild(svgEl("line", { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, class: "dashed-line" }));
  });
}

function drawParallelMarks(svg, text, pointsByName) {
  parseLines(text).forEach((line) => {
    const [side1, side2] = line.split("//").map((part) => part.trim());
    [side1, side2].forEach((side) => {
      if (!side || side.length < 2) return;
      const p1 = pointsByName.get(side[0]);
      const p2 = pointsByName.get(side[1]);
      if (!p1 || !p2) return;
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const dir = normalizeVector({ x: p2.x - p1.x, y: p2.y - p1.y });
      const normal = { x: -dir.y, y: dir.x };
      for (let i = -1; i <= 1; i += 2) {
        const cx = mx + dir.x * i * 5;
        const cy = my + dir.y * i * 5;
        svg.appendChild(svgEl("line", {
          x1: cx - normal.x * 7,
          y1: cy - normal.y * 7,
          x2: cx + normal.x * 7,
          y2: cy + normal.y * 7,
          class: "parallel-mark"
        }));
      }
    });
  });
}

function polygonPath(points, closed = true) {
  if (!points.length) return "";
  const commands = [`M ${points[0].x} ${points[0].y}`];
  points.slice(1).forEach((point) => commands.push(`L ${point.x} ${point.y}`));
  if (closed) commands.push("Z");
  return commands.join(" ");
}

function renderGeometryBlock(block) {
  const svg = makeSvg(420, 230);
  const points = parseCoords(block.coords);
  const pointsByName = pointMap(points);
  const labels = getSideLabels(block.sideLabels);
  const kind = block.shapeKind || "triangle";

  if (kind === "circle") {
    const center = points[0] || { name: "O", x: 200, y: 120 };
    const radiusPoint = points[1] || { name: "A", x: 280, y: 120 };
    const r = Math.hypot(radiusPoint.x - center.x, radiusPoint.y - center.y) || 70;
    svg.appendChild(svgEl("circle", { cx: center.x, cy: center.y, r, class: "shape-line" }));
    drawDashedLines(svg, block.dashedLines, pointsByName);
    const radiusLabel = labels.get(`${center.name}${radiusPoint.name}`) || labels.get(`${radiusPoint.name}${center.name}`);
    drawSideLabel(svg, center, radiusPoint, radiusLabel);
    points.forEach((point) => drawVertex(svg, point));
  } else if (kind === "segment") {
    const p1 = points[0];
    const p2 = points[1];
    if (p1 && p2) {
      svg.appendChild(svgEl("line", { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, class: "shape-line" }));
      drawSideLabel(svg, p1, p2, labels.get(`${p1.name}${p2.name}`));
      points.slice(0, 2).forEach((point) => drawVertex(svg, point));
    }
  } else {
    const usePoints = kind === "quadrilateral" ? points.slice(0, 4) : points.slice(0, 3);
    svg.appendChild(svgEl("path", { d: polygonPath(usePoints, true), class: "shape-line" }));
    drawDashedLines(svg, block.dashedLines, pointsByName);
    usePoints.forEach((point, index) => {
      const next = usePoints[(index + 1) % usePoints.length];
      drawSideLabel(svg, point, next, labels.get(`${point.name}${next.name}`));
      drawVertex(svg, point);
    });
    if (block.rightAngle && block.rightAngle !== "none") {
      const vertex = pointsByName.get(String(block.rightAngle).trim());
      if (vertex) {
        const connected = usePoints.filter((point) => point !== vertex).sort((a, b) => {
          const da = Math.hypot(a.x - vertex.x, a.y - vertex.y);
          const db = Math.hypot(b.x - vertex.x, b.y - vertex.y);
          return da - db;
        });
        drawRightAngle(svg, vertex, connected[0], connected[1]);
      }
    }
    drawParallelMarks(svg, block.parallelMarks, pointsByName);
  }

  return renderDiagramContainer(block, svg);
}

function parseCoordinatePoints(text) {
  return parseLines(text).map((line) => {
    const parts = line.split(",").map((part) => part.trim());
    return {
      x: parseNumber(parts[0], 0),
      y: parseNumber(parts[1], 0),
      label: parts.slice(2).join(",") || ""
    };
  });
}

function sanitizeFunctionExpression(raw) {
  let expr = String(raw || "").trim();
  expr = expr.replace(/^y\s*=\s*/i, "");
  expr = expr.replaceAll("−", "-").replaceAll("－", "-");
  expr = expr.replace(/(\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?)\s*x/g, "($1)*x");
  expr = expr.replace(/(\d+(?:\.\d+)?)\s*x/g, "$1*x");
  expr = expr.replace(/x\s*(\d+(?:\.\d+)?)/g, "x*$1");
  expr = expr.replace(/\^/g, "**");
  if (!/^[0-9xX+\-*/().\s*]+$/.test(expr)) return null;
  return expr.replaceAll("X", "x");
}

function makeFunction(raw) {
  const expr = sanitizeFunctionExpression(raw);
  if (!expr) return null;
  try {
    // 入力文字は数字・x・四則演算・括弧だけに制限してから評価する。
    return new Function("x", `return ${expr};`);
  } catch (error) {
    return null;
  }
}

function renderCoordinateBlock(block) {
  const width = 520;
  const height = 340;
  const svg = makeSvg(width, height);
  const xmin = parseNumber(block.xmin, -5);
  const xmax = parseNumber(block.xmax, 5);
  const ymin = parseNumber(block.ymin, -5);
  const ymax = parseNumber(block.ymax, 5);
  const step = Math.max(Math.abs(parseNumber(block.step, 1)), 0.0001);
  const left = 48;
  const right = width - 28;
  const top = 24;
  const bottom = height - 38;
  const sx = (x) => left + ((x - xmin) / (xmax - xmin || 1)) * (right - left);
  const sy = (y) => bottom - ((y - ymin) / (ymax - ymin || 1)) * (bottom - top);
  const showTicks = boolValue(block.showTicks, true);
  const showLabels = boolValue(block.showLabels, true);

  for (let x = Math.ceil(xmin / step) * step; x <= xmax + step / 1000; x += step) {
    const rx = Number(x.toFixed(8));
    const px = sx(rx);
    if (showTicks) svg.appendChild(svgEl("line", { x1: px, y1: top, x2: px, y2: bottom, class: "grid-line" }));
    if (showLabels && Math.abs(rx) > 1e-9) appendSvgText(svg, String(rx).replace(/\.0$/, ""), px, sy(0) + 20);
  }

  for (let y = Math.ceil(ymin / step) * step; y <= ymax + step / 1000; y += step) {
    const ry = Number(y.toFixed(8));
    const py = sy(ry);
    if (showTicks) svg.appendChild(svgEl("line", { x1: left, y1: py, x2: right, y2: py, class: "grid-line" }));
    if (showLabels && Math.abs(ry) > 1e-9) appendSvgText(svg, String(ry).replace(/\.0$/, ""), sx(0) - 15, py + 5, { anchor: "end" });
  }

  const xAxisY = sy(0);
  const yAxisX = sx(0);
  if (ymin <= 0 && ymax >= 0) {
    svg.appendChild(svgEl("line", { x1: left, y1: xAxisY, x2: right, y2: xAxisY, class: "axis", "marker-end": "url(#arrowEnd)" }));
    if (showLabels) appendSvgText(svg, "x", right + 12, xAxisY + 5);
  }
  if (xmin <= 0 && xmax >= 0) {
    svg.appendChild(svgEl("line", { x1: yAxisX, y1: bottom, x2: yAxisX, y2: top, class: "axis", "marker-end": "url(#arrowEnd)" }));
    if (showLabels) appendSvgText(svg, "y", yAxisX - 10, top - 8);
  }

  parseLines(block.functions).forEach((line) => {
    const fn = makeFunction(line);
    if (!fn) return;
    const points = [];
    const samples = 180;
    for (let i = 0; i <= samples; i += 1) {
      const x = xmin + ((xmax - xmin) * i) / samples;
      const y = fn(x);
      if (!Number.isFinite(y) || y < ymin - 1 || y > ymax + 1) continue;
      points.push([sx(x), sy(y)]);
    }
    if (points.length < 2) return;
    const d = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
    svg.appendChild(svgEl("path", { d, class: "function-line" }));
  });

  parseCoordinatePoints(block.points).forEach((point) => {
    const x = sx(point.x);
    const y = sy(point.y);
    svg.appendChild(svgEl("circle", { cx: x, cy: y, r: 4.5, class: "point-closed" }));
    if (point.label) appendSvgText(svg, point.label, x + 12, y - 8, { anchor: "start" });
  });

  if (showLabels) appendSvgText(svg, "O", sx(0) - 9, sy(0) + 16, { anchor: "end" });
  return renderDiagramContainer(block, svg);
}

function renderTextBlockWithFloatingNote(block) {
  const wrapper = document.createElement("div");
  wrapper.className = "text-with-floating-note";
  wrapper.appendChild(renderTextAutoLayoutBlock(block));
  return wrapper;
}

function renderSideboxBlock(block) {
  const wrapper = document.createElement("div");
  const position = block.boxPosition || "right";
  wrapper.className = `sidebox-layout sidebox-${position}`;
  wrapper.style.setProperty("--box-width", `${Math.min(Math.max(Number(block.boxWidth) || 35, 15), 80)}%`);

  const text = renderPrintText(block.text, "sidebox-main-text");
  const box = document.createElement("div");
  box.className = `sidebox-note block-frame-${block.boxFrame || "simple"} text-size-${block.boxFontSize || "normal"}`;
  box.style.fontSize = `${sanitizeFontSizePt(block.boxFontSizePt, textSizeToPt(block.boxFontSize || "normal"))}pt`;
  box.style.fontFamily = fontFamilyCss(block.boxFontFamily || "default");
  box.style.color = normalizeColor(block.boxColor || block.color);
  box.style.textAlign = block.boxAlign || "left";
  box.appendChild(renderTextWithInlineMath(block.boxText));

  if (position === "left") {
    wrapper.appendChild(box);
    wrapper.appendChild(text);
  } else {
    wrapper.appendChild(text);
    wrapper.appendChild(box);
  }
  return wrapper;
}


function parseProblemRowRows(content, columns = 2, layoutMode = "normal") {
  const safeColumns = Math.min(4, Math.max(2, Number(columns) || 2));
  const result = [];

  if (layoutMode === "calc") {
    const items = String(content || "")
      .split(/\n\s*\n+/)
      .map((item) => item.trim())
      .filter(Boolean);

    for (let i = 0; i < items.length; i += safeColumns) {
      result.push({ type: "items", items: items.slice(i, i + safeColumns) });
    }
    return result;
  }

  let current = [];

  String(content || "").split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      if (current.length) {
        result.push({ type: "items", items: current });
        current = [];
      }
      result.push({ type: "spacer" });
      return;
    }

    current.push(line);
    if (current.length >= safeColumns) {
      result.push({ type: "items", items: current });
      current = [];
    }
  });

  if (current.length) result.push({ type: "items", items: current });
  return result;
}

function createProblemContentNode(content, block, className = "problem-answer-content") {
  const node = document.createElement("div");
  node.className = className;
  node.appendChild(renderTextWithInlineMath(content, {
    inlineMathSize: block.inlineMathSize || "normal",
    inlineMathPt: inlineMathFontSizePt(block),
    forceMathForHalfWidth: true
  }));
  return node;
}

function composeAnswerWithContent(contentNode, answerNode, placement = "bottom") {
  const mode = ["left", "right", "free"].includes(placement) ? placement : "bottom";
  if (mode === "left" || mode === "right") {
    const layout = document.createElement("div");
    layout.className = `problem-answer-layout problem-answer-${mode}`;
    if (mode === "left") {
      answerNode.classList.add("inline-answer");
      layout.appendChild(answerNode);
      layout.appendChild(contentNode);
    } else {
      layout.appendChild(contentNode);
      answerNode.classList.add("inline-answer");
      layout.appendChild(answerNode);
    }
    return layout;
  }

  const layout = document.createElement("div");
  layout.className = `problem-answer-layout problem-answer-${mode}`;
  layout.appendChild(contentNode);
  answerNode.classList.add("below-answer");
  layout.appendChild(answerNode);
  return layout;
}

function renderProblemRowBlock(block) {
  const wrapper = document.createElement("div");
  const columns = Math.min(4, Math.max(2, Number(block.columns) || 2));
  const effectiveMode = detectProblemLayoutMode(block);
  wrapper.className = `problem-row-grid problem-row-${columns} problem-layout-${effectiveMode}`;
  wrapper.style.setProperty("--problem-row-columns", columns);
  wrapper.style.setProperty("--problem-row-column-gap", problemRowGapPx(block.columnGap || "normal", "column"));
  wrapper.style.setProperty("--problem-row-row-gap", problemRowGapPx(block.rowGap || "normal", "row"));
  wrapper.style.setProperty("--problem-row-manual-gap", problemBlankLineGapPx(block.blankLineGap || "large"));
  wrapper.style.textAlign = block.align || DEFAULT_BLOCK_ALIGN;

  const rows = parseProblemRowRows(block.content, columns, effectiveMode);
  let itemIndex = 0;

  rows.forEach((row) => {
    if (row.type === "spacer") {
      const spacer = document.createElement("div");
      spacer.className = "problem-row-manual-gap";
      wrapper.appendChild(spacer);
      return;
    }

    row.items.forEach((line) => {
      const item = document.createElement("div");
      item.className = "problem-row-item";
      const contentNode = createProblemContentNode(line, { ...block, inlineMathSize: block.inlineMathSize || "large" }, "problem-row-content");

      if ((block.answerSize || "none") !== "none") {
        const answer = createAnswerSpace(
          block,
          `answer-space row-answer ${block.answerSize || "small"} ${answerFormatClass(block.answerFormat || "line")} ${answerBoxSizeClass(block.answerBoxSize || "medium")}`,
          itemIndex
        );
        item.appendChild(composeAnswerWithContent(contentNode, answer, block.answerPlacement || "bottom"));
      } else {
        item.appendChild(contentNode);
      }

      wrapper.appendChild(item);
      itemIndex += 1;
    });
  });

  return wrapper;
}


function renderTestLayoutBlock(block) {
  const wrapper = document.createElement("div");
  wrapper.className = "test-layout-block test-layout-clean";
  wrapper.style.fontFamily = fontFamilyCss(block.testFontFamily || block.fontFamily || "default");
  wrapper.style.setProperty("--test-layout-height", `${Math.min(350, Math.max(50, Number(block.testHeightMm) || 180))}mm`);
  wrapper.style.setProperty("--center-line-style", wordCenterLineStyle(block.centerLineStyle || "solid"));
  wrapper.style.setProperty("--center-line-width", `${Math.max(0, Number(block.centerLineWidthPx ?? 1))}px`);
  wrapper.style.setProperty("--center-line-color", normalizeColor(block.centerLineColor || "#111111"));

  const columns = document.createElement("div");
  columns.className = "test-layout-columns";

  const makeColumn = (content) => {
    const column = document.createElement("div");
    column.className = "test-layout-column";

    const body = document.createElement("div");
    body.className = "test-layout-column-body";
    body.style.fontSize = `${sanitizeFontSizePt(block.testBodyFontSizePt, 13)}pt`;
    body.appendChild(renderTextWithInlineMath(content || "", {
      inlineMathPt: sanitizeFontSizePt(block.testBodyFontSizePt, 13) + 1,
      forceMathForHalfWidth: true
    }));
    column.appendChild(body);
    return column;
  };

  columns.appendChild(makeColumn(block.leftContent));
  columns.appendChild(makeColumn(block.rightContent));
  wrapper.appendChild(columns);

  return wrapper;
}

function renderPreview() {
  state.title = titleInput.value;
  state.unit = unitInput.value;
  state.nameLine = nameLineInput.value;
  state.paperSize = paperSizeInput?.value || state.paperSize || "A4";
  state.paperOrientation = paperOrientationInput?.value || state.paperOrientation || "portrait";
  state.baseFontSizePt = sanitizeFontSizePt(baseFontSizeInput?.value, DEFAULT_FONT_SIZE_PT);
  state.baseFontFamily = baseFontFamilyInput?.value || state.baseFontFamily || "gothic";
  state.pageMarginMm = Math.min(40, Math.max(5, Number(pageMarginInput?.value) || 18));
  applyPaperSettingsToDocument();

  printArea.innerHTML = `
    <header class="print-head">
      <div class="print-title">
        <h2>${escapeHtml(state.title)}</h2>
        <div class="print-name">${escapeHtml(state.nameLine)}</div>
      </div>
      <div class="print-unit">${escapeHtml(state.unit)}</div>
    </header>
  `;

  state.blocks.forEach((block) => {
    const section = document.createElement("section");
    section.className = "print-block";
    section.dataset.blockType = block.type || "";
    applyBlockStyle(section, block);

    if (block.type === "heading") {
      const heading = document.createElement("h3");
      heading.className = "print-heading";
      heading.appendChild(renderTextWithInlineMath(block.content));
      section.appendChild(heading);
    }

    if (block.type === "text") {
      section.appendChild(renderTextBlockWithFloatingNote(block));
    }

    if (block.type === "sidebox") {
      section.appendChild(renderSideboxBlock(block));
    }

    if (block.type === "freeProblem") {
      if (!block.content) block.content = "(1)\n(2)\n(3)\n\n(4)\n(5)\n(6)";
      if (!block.freeCanvasHeightMm) block.freeCanvasHeightMm = 95;
      if (!block.inlineMathPt) block.inlineMathPt = 14;
      if (!block.freeColumns) block.freeColumns = 3;
      if (!block.freeColumnGapPx) block.freeColumnGapPx = 190;
      if (!block.freeRowGapPx) block.freeRowGapPx = 86;
      if (!block.freePositions || typeof block.freePositions !== "object" || Array.isArray(block.freePositions)) block.freePositions = {};
    }
    if (block.type === "testLayout") {
      section.appendChild(renderTestLayoutBlock(block));
    }

    if (block.type === "math") {
      section.appendChild(renderMathBlock(block.content, block.mathLayout || block.align, blockFontSizePt(block)));
    }

    if (block.type === "problem") {
      if (detectProblemLayoutMode(block) === "free") {
        section.classList.add("free-problem-box");
        section.appendChild(renderFreeProblemBlock(block));
      } else {
        const columns = Math.min(4, Math.max(1, Number(block.columns) || 1));
        if (columns > 1) {
          section.classList.add("problem-row-box", "problem-common-box");
          section.appendChild(renderProblemRowBlock({ ...block, columns }));
        } else {
        section.classList.add("problem-box", "problem-common-box");
        const number = document.createElement("div");
        number.className = "problem-number";
        number.textContent = Number(block.number) > 0 ? `${block.number}.` : "";

        const body = document.createElement("div");
        body.className = "problem-body";
        body.style.textAlign = block.align || DEFAULT_BLOCK_ALIGN;
        const content = block.content ?? [block.text || "", block.math || ""].filter(Boolean).join("\n");
        const contentNode = createProblemContentNode(content, { ...block, inlineMathSize: block.inlineMathSize || "medium" });
        if ((block.answerSize || "medium") !== "none") {
          const answer = createAnswerSpace(
            block,
            `answer-space ${block.answerSize || "medium"} ${answerFormatClass(block.answerFormat || "line")} ${answerBoxSizeClass(block.answerBoxSize || "medium")}`
          );
          body.appendChild(composeAnswerWithContent(contentNode, answer, block.answerPlacement || "bottom"));
        } else {
          body.appendChild(contentNode);
        }

        section.appendChild(number);
        section.appendChild(body);
        }
      }
    }

    if (block.type === "freeProblem") {
      section.classList.add("free-problem-box");
      section.appendChild(renderFreeProblemBlock(block));
    }

    if (block.type === "problemRow") {
      section.classList.add("problem-row-box");
      section.appendChild(renderProblemRowBlock(block));
    }

    if (block.type === "answer") {
      section.appendChild(createAnswerSpace(block, `answer-space ${block.answerSize || "medium"} answer-line`));
    }

    if (block.type === "numberline") {
      section.appendChild(renderNumberlineBlock(block));
    }

    if (block.type === "geometry") {
      section.appendChild(renderGeometryBlock(block));
    }

    if (block.type === "coordinate") {
      section.appendChild(renderCoordinateBlock(block));
    }

    printArea.appendChild(section);
  });

  paginateA4Preview();
  updatePageStatus();
}

function generateTex() {
  const lines = [];
  lines.push(`\\documentclass[${state.paperSize === "A4" ? "a4paper" : "a4paper"},${Math.round(sanitizeFontSizePt(state.baseFontSizePt, DEFAULT_FONT_SIZE_PT))}pt]{jsarticle}`);
  lines.push("\\usepackage{amsmath,amssymb}");
  lines.push("\\usepackage{tikz}");
  lines.push("\\usetikzlibrary{arrows.meta}");
  { const spec = getPaperSpec(); lines.push(`\\usepackage[paperwidth=${spec.width}mm,paperheight=${spec.height}mm,top=${spec.marginTop}mm,bottom=${spec.marginBottom}mm,left=${spec.marginLeft}mm,right=${spec.marginRight}mm]{geometry}`); }
  lines.push("\\pagestyle{empty}");
  lines.push("\\begin{document}");
  lines.push(`\\noindent{\\LARGE\\bfseries ${escapeLatex(state.title)}}\\hfill ${escapeLatex(state.nameLine)}`);
  lines.push("\\par\\vspace{2mm}");
  lines.push(`\\noindent ${escapeLatex(state.unit)}`);
  lines.push("\\par\\hrule\\vspace{5mm}");

  state.blocks.forEach((block) => {
    if (block.type === "heading") lines.push(`\\subsection*{${escapeLatex(block.content)}}`);
    if (block.type === "text") {
      const textMode = detectTextLayoutMode(block);
      if (textMode === "plain") {
        lines.push(`${convertTextToLatexWithInlineMath(block.content)}\\par`);
      } else {
        const columns = Math.min(4, Math.max(2, Number(block.columns) || 2));
        const colWidth = (0.94 / columns).toFixed(2);
        const colSpec = Array.from({ length: columns }, () => `p{${colWidth}\\linewidth}`).join("");
        const parsedRows = parseTextAutoRows(block.content, columns, textMode);
        lines.push(`\\begin{tabular}{${colSpec}}`);
        parsedRows.forEach((row) => {
          if (row.type === "spacer") {
            lines.push(`\\multicolumn{${columns}}{l}{\\vspace{4mm}}\\\\`);
            return;
          }
          const cells = Array.from({ length: columns }, (_, i) => {
          const entry = row.items[i] || "";
          return convertTextToLatexWithInlineMath(typeof entry === "object" && entry !== null ? entry.text : entry);
        });
          lines.push(`${cells.join(" & ")} \\\\`);
          lines.push(`\\addlinespace[2mm]`);
        });
        lines.push("\\end{tabular}\\par");
      }
    }
    if (block.type === "math") lines.push(mathToTexLines(block.content, block.mathLayout || block.align));
    if (block.type === "problem") {
      if (detectProblemLayoutMode(block) === "free") {
        parseFreeProblemItems(block.content).forEach((line) => {
          lines.push(`\\noindent ${convertTextToLatexWithInlineMath(line)}\\par\\vspace{8mm}`);
        });
        return;
      }
      const columns = Math.min(4, Math.max(1, Number(block.columns) || 1));
      const content = block.content ?? [block.text || "", block.math || ""].filter(Boolean).join("\n");
      if (columns > 1) {
        const colWidth = (0.94 / columns).toFixed(2);
        const colSpec = Array.from({ length: columns }, () => `p{${colWidth}\linewidth}`).join("");
        const parsedRows = parseProblemRowRows(content, columns, detectProblemLayoutMode(block));
        const rowGapTex = problemRowGapToTex(block.rowGap || "normal");
        const blankGapTex = problemBlankLineGapToTex(block.blankLineGap || "large");
        lines.push(`\\noindent\\begin{tabular}{@{}${colSpec}@{}}`);
        parsedRows.forEach((parsedRow) => {
          if (parsedRow.type === "spacer") {
            lines.push(`\\multicolumn{${columns}}{c}{}\\\\[${blankGapTex}]`);
            return;
          }
          const row = parsedRow.items.map((item) => {
            const rowContent = convertTextToLatexWithInlineMath(item);
            if ((block.answerSize || "none") === "none") return rowContent;
            return `${rowContent}\\[1mm]${answerSpaceToTex(block.answerSize, block.answerFormat || "line", block.answerBoxSize || "medium")}`;
          });
          while (row.length < columns) row.push("");
          lines.push(row.join(" & ") + `\\\\[${rowGapTex}]`);
        });
        lines.push("\\end{tabular}\\par");
      } else {
        lines.push(`\\noindent ${Number(block.number) > 0 ? `${block.number}. ` : ""}${convertTextToLatexWithInlineMath(content)}\\par`);
        if ((block.answerSize || "medium") !== "none") lines.push(answerSpaceToTex(block.answerSize, block.answerFormat || "line", block.answerBoxSize || "medium"));
      }
    }
    if (block.type === "problemRow") {
      const columns = Math.min(4, Math.max(2, Number(block.columns) || 2));
      const colWidth = (0.94 / columns).toFixed(2);
      const colSpec = Array.from({ length: columns }, () => `p{${colWidth}\linewidth}`).join("");
      const parsedRows = parseProblemRowRows(block.content, columns);
      const rowGapTex = problemRowGapToTex(block.rowGap || "normal");
      const blankGapTex = problemBlankLineGapToTex(block.blankLineGap || "large");
      lines.push(`\noindent\begin{tabular}{@{}${colSpec}@{}}`);
      parsedRows.forEach((parsedRow) => {
        if (parsedRow.type === "spacer") {
          lines.push(`\multicolumn{${columns}}{c}{}\\[${blankGapTex}]`);
          return;
        }
        const row = parsedRow.items.map((item) => {
          const content = convertTextToLatexWithInlineMath(item);
          if ((block.answerSize || "none") === "none") return content;
          return `${content}\\[1mm]${answerSpaceToTex(block.answerSize, block.answerFormat || "line", block.answerBoxSize || "medium")}`;
        });
        while (row.length < columns) row.push("");
        lines.push(row.join(" & ") + `\\[${rowGapTex}]`);
      });
      lines.push("\end{tabular}\par");
    }
    if (block.type === "answer") lines.push(answerSpaceToTex(block.answerSize, "line"));
    if (block.type === "numberline") lines.push(numberlineToTikz(block));
    if (block.type === "geometry") lines.push(geometryToTikz(block));
    if (block.type === "coordinate") lines.push(coordinateToTikz(block));
    lines.push("\\vspace{2mm}");
  });

  lines.push("\\end{document}");
  return lines.join("\n");
}

function texSizeCommand(size = "normal") {
  return { small: "\\small", normal: "", large: "\\large", xlarge: "\\Large" }[size] || "";
}

function wrapStyledTex(block, content) {
  const size = texSizeCommand(block.textSize);
  let body = size ? `{${size} ${content}}` : content;
  const frame = block.frame || "none";
  if (frame === "simple" || frame === "dashed" || frame === "double" || frame === "gray") {
    body = `\noindent\fbox{\begin{minipage}{0.96\linewidth}
${body}
\end{minipage}}`;
  }
  return body;
}

function sideboxToTex(block) {
  const leftWidth = Math.max(20, 100 - (Number(block.boxWidth) || 35) - 4);
  const boxWidth = Math.min(Math.max(Number(block.boxWidth) || 35, 15), 80);
  const main = convertTextToLatexWithInlineMath(block.text);
  const noteSize = texSizeCommand(block.boxFontSize);
  const note = noteSize ? `{${noteSize} ${convertTextToLatexWithInlineMath(block.boxText)}}` : convertTextToLatexWithInlineMath(block.boxText);
  if ((block.boxPosition || "right") === "full") {
    return `${main}\par
\noindent\fbox{\begin{minipage}{0.96\linewidth}
${note}
\end{minipage}}`;
  }
  const mainBox = `\begin{minipage}[t]{${leftWidth / 100}\linewidth}
${main}
\end{minipage}`;
  const noteBox = `\fbox{\begin{minipage}[t]{${boxWidth / 100}\linewidth}
${note}
\end{minipage}}`;
  return (block.boxPosition === "left") ? `${noteBox}\hfill ${mainBox}` : `${mainBox}\hfill ${noteBox}`;
}

function mathToTexLines(rawMath, layout = "center") {
  const latexLines = String(rawMath || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => convertMathToLatex(line));
  const lines = latexLines.length ? latexLines : [""];
  const normalizedLayout = normalizeMathLayout(layout);

  if (normalizedLayout === "left") {
    return lines.map((line) => `\\noindent \\(\\displaystyle ${line}\\)\\par`).join("\n");
  }
  if (normalizedLayout === "right") {
    return `\\begin{flushright}\n${lines.map((line) => `\\(\\displaystyle ${line}\\)`).join("\\\\[1mm]\n")}\n\\end{flushright}`;
  }
  if (lines.length === 1) return `\\[\n${lines[0]}\n\\]`;
  return `\\[\n\\begin{aligned}\n${lines.join("\\\\\n")}\n\\end{aligned}\n\\]`;
}

function problemRowGapToTex(value = "normal") {
  return { tight: "3mm", normal: "6mm", wide: "11mm", xwide: "17mm" }[value] || "6mm";
}

function problemBlankLineGapToTex(value = "large") {
  return { small: "5mm", medium: "9mm", large: "14mm", xlarge: "21mm" }[value] || "14mm";
}

function answerSpaceToTex(size, format = "line") {
  const map = { small: "12mm", medium: "22mm", large: "36mm", xlarge: "52mm" };
  const height = map[size] || map.medium;
  if (format === "box") {
    return `\\noindent\\fbox{\\rule{0pt}{${height}}\\hspace{0.96\\linewidth}}`;
  }
  return `\\vspace{${height}}`;
}


function numberlineToTikz(block) {
  const min = parseNumber(block.min, -5);
  const max = parseNumber(block.max, 5);
  const step = Math.max(Math.abs(parseNumber(block.step, 1)), 0.0001);
  const arrow = block.arrow === "none" ? "-" : block.arrow === "left" ? "<-" : block.arrow === "right" ? "->" : "<->";
  const showTicks = boolValue(block.showTicks, true);
  const showLabels = boolValue(block.showLabels, true);
  const lines = [];
  if (block.title) lines.push(`\\noindent ${convertTextToLatexWithInlineMath(block.title)}\\par`);
  lines.push("\\begin{center}");
  lines.push("\\begin{tikzpicture}[x=0.75cm,y=0.75cm]");
  lines.push(`\\draw[${arrow}] (${min},0)--(${max},0);`);
  for (let v = Math.ceil(min / step) * step; v <= max + step / 1000; v += step) {
    const rounded = Number(v.toFixed(8));
    lines.push(`\\draw (${rounded},0.1)--(${rounded},-0.1) node[below]{$${rounded}$};`);
  }
  parsePointsList(block.points).forEach((point) => {
    const fill = point.type === "open" ? "white" : "black";
    lines.push(`\\draw[fill=${fill}] (${point.value},0) circle (2pt) node[above]{$${escapeLatex(point.label)}$};`);
  });
  parseIntervalList(block.intervals).forEach((interval) => {
    lines.push(`\\draw[line width=1.4pt] (${interval.start},0.45)--(${interval.end},0.45);`);
    if (interval.label) lines.push(`\\node at (${(interval.start + interval.end) / 2},0.85){${escapeLatex(interval.label)}};`);
  });
  lines.push("\\end{tikzpicture}");
  lines.push("\\end{center}");
  return lines.join("\n");
}

function geometryToTikz(block) {
  const points = parseCoords(block.coords);
  const scale = 0.02;
  const pName = (p) => `(${p.name})`;
  const lines = [];
  if (block.title) lines.push(`\\noindent ${convertTextToLatexWithInlineMath(block.title)}\\par`);
  lines.push("\\begin{center}");
  lines.push("\\begin{tikzpicture}[scale=1]");
  points.forEach((p) => lines.push(`\\coordinate (${p.name}) at (${(p.x * scale).toFixed(2)},${(-p.y * scale).toFixed(2)});`));
  if ((block.shapeKind || "triangle") === "circle") {
    const center = points[0];
    const radiusPoint = points[1];
    if (center && radiusPoint) {
      const r = Math.hypot(radiusPoint.x - center.x, radiusPoint.y - center.y) * scale;
      lines.push(`\\draw ${pName(center)} circle (${r.toFixed(2)});`);
    }
  } else if ((block.shapeKind || "triangle") === "segment") {
    if (points[0] && points[1]) lines.push(`\\draw ${pName(points[0])}--${pName(points[1])};`);
  } else {
    const usePoints = (block.shapeKind || "triangle") === "quadrilateral" ? points.slice(0, 4) : points.slice(0, 3);
    if (usePoints.length) lines.push(`\\draw ${usePoints.map(pName).join("--")}--cycle;`);
  }
  parseLines(block.dashedLines).forEach((line) => {
    const [from, to] = line.split(/[-–—]/).map((part) => part.trim());
    if (from && to) lines.push(`\\draw[dashed] (${from})--(${to});`);
  });
  points.forEach((p) => lines.push(`\\fill ${pName(p)} circle (1.5pt) node[above]{$${escapeLatex(p.name)}$};`));
  lines.push("\\end{tikzpicture}");
  lines.push("\\end{center}");
  return lines.join("\n");
}

function coordinateToTikz(block) {
  const xmin = parseNumber(block.xmin, -5);
  const xmax = parseNumber(block.xmax, 5);
  const ymin = parseNumber(block.ymin, -5);
  const ymax = parseNumber(block.ymax, 5);
  const step = Math.max(Math.abs(parseNumber(block.step, 1)), 0.0001);
  const lines = [];
  if (block.title) lines.push(`\\noindent ${convertTextToLatexWithInlineMath(block.title)}\\par`);
  lines.push("\\begin{center}");
  lines.push("\\begin{tikzpicture}[scale=0.55]");
  lines.push(`\\draw[step=${step},gray!25,very thin] (${xmin},${ymin}) grid (${xmax},${ymax});`);
  lines.push(`\\draw[->] (${xmin},0)--(${xmax},0) node[right]{$x$};`);
  lines.push(`\\draw[->] (0,${ymin})--(0,${ymax}) node[above]{$y$};`);
  parseLines(block.functions).forEach((raw) => {
    const expr = sanitizeFunctionExpression(raw);
    if (!expr) return;
    const tikzExpr = expr.replace(/\*\*/g, "^").replaceAll("x", "\\x");
    lines.push(`% 関数: ${escapeLatex(raw)}\n\\draw[domain=${xmin}:${xmax},samples=100] plot (\\x,{${tikzExpr}});`);
  });
  parseCoordinatePoints(block.points).forEach((p) => {
    lines.push(`\\fill (${p.x},${p.y}) circle (2pt) node[above right]{$${escapeLatex(p.label)}$};`);
  });
  lines.push("\\end{tikzpicture}");
  lines.push("\\end{center}");
  return lines.join("\n");
}

const DOCUMENT_LIBRARY_KEY = "mathPrintToolDocumentLibraryV77";
const CURRENT_DOCUMENT_ID_KEY = "mathPrintToolCurrentDocumentIdV77";
let currentDocumentId = "";
let hasUnsavedDocumentChanges = false;

function clonePlain(value) { return JSON.parse(JSON.stringify(value)); }
function appNowIso() { return new Date().toISOString(); }
function safeDocumentTitle(source = "") { return String(source || state.title || "無題のプリント").trim() || "無題のプリント"; }
function generateDocumentId() { return crypto?.randomUUID ? crypto.randomUUID() : `doc_${Date.now()}_${Math.random().toString(16).slice(2)}`; }
function getDocumentLibrary() { try { const parsed = JSON.parse(localStorage.getItem(DOCUMENT_LIBRARY_KEY) || "[]"); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
function setDocumentLibrary(library) { localStorage.setItem(DOCUMENT_LIBRARY_KEY, JSON.stringify(Array.isArray(library) ? library : [])); }
function getCurrentDocument() { return currentDocumentId ? getDocumentLibrary().find((doc) => doc.id === currentDocumentId) || null : null; }
function updateCurrentDocName() { const label = document.querySelector("#currentDocName"); if (!label) return; const current = getCurrentDocument(); label.textContent = `${current ? current.title : "未保存"}${hasUnsavedDocumentChanges ? " *" : ""}`; }
function markDocumentDirty() { hasUnsavedDocumentChanges = true; updateCurrentDocName(); }
function markDocumentSaved() { hasUnsavedDocumentChanges = false; updateCurrentDocName(); }
function makeDocumentRecord(id = "", title = "") { renderPreview(); const now = appNowIso(); const existing = id ? getDocumentLibrary().find((doc) => doc.id === id) : null; return { id: id || generateDocumentId(), title: safeDocumentTitle(title || state.title), createdAt: existing?.createdAt || now, updatedAt: now, data: clonePlain(state) }; }
function saveDocumentRecord(record) { const library = getDocumentLibrary(); const index = library.findIndex((doc) => doc.id === record.id); if (index >= 0) library[index] = record; else library.unshift(record); library.sort((a,b)=>String(b.updatedAt||"").localeCompare(String(a.updatedAt||""))); setDocumentLibrary(library); currentDocumentId = record.id; localStorage.setItem(CURRENT_DOCUMENT_ID_KEY, currentDocumentId); markDocumentSaved(); updateSaveStatus(`保存済み：${record.title}`, "saved"); }
function saveCurrentDocument() { if (!currentDocumentId) { saveAsDocument(); return; } saveDocumentRecord(makeDocumentRecord(currentDocumentId)); }
function saveAsDocument() { const title = prompt("保存するプリント名を入力してください。", safeDocumentTitle(state.title)); if (title === null) return; saveDocumentRecord(makeDocumentRecord("", title)); }
function duplicateCurrentDocument() { const title = prompt("複製後のプリント名を入力してください。", `${safeDocumentTitle(state.title)} コピー`); if (title === null) return; saveDocumentRecord(makeDocumentRecord("", title)); }
function newDocument() { if (hasUnsavedDocumentChanges && !confirm("未保存の変更があります。新規作成しますか？")) return; state = defaultState(); currentDocumentId = ""; localStorage.removeItem(CURRENT_DOCUMENT_ID_KEY); hasUnsavedDocumentChanges = false; migrateStateData(state); renderAll(); saveToBrowser(0); updateCurrentDocName(); updateSaveStatus("新規作成しました", "saved"); }
function openDocumentFromLibrary(id) { const doc = getDocumentLibrary().find((item)=>item.id===id); if (!doc) { alert("プリントが見つかりませんでした。"); renderLibraryList(); return; } if (hasUnsavedDocumentChanges && !confirm("未保存の変更があります。このプリントを開きますか？")) return; state = clonePlain(doc.data); migrateStateData(state); currentDocumentId = doc.id; localStorage.setItem(CURRENT_DOCUMENT_ID_KEY, currentDocumentId); hasUnsavedDocumentChanges = false; renderAll(); saveToBrowser(0); markDocumentSaved(); updateSaveStatus(`読込済み：${doc.title}`, "saved"); document.querySelector("#libraryDialog")?.close(); }
function deleteDocumentFromLibrary(id) { const library = getDocumentLibrary(); const doc = library.find((item)=>item.id===id); if (!doc) return; if (!confirm(`「${doc.title}」を削除しますか？`)) return; setDocumentLibrary(library.filter((item)=>item.id!==id)); if (currentDocumentId === id) { currentDocumentId = ""; localStorage.removeItem(CURRENT_DOCUMENT_ID_KEY); hasUnsavedDocumentChanges = false; } renderLibraryList(); updateCurrentDocName(); updateSaveStatus("削除しました", "saved"); }
function deleteCurrentDocument() { if (!currentDocumentId) { alert("まだアプリ内保存されていません。"); return; } deleteDocumentFromLibrary(currentDocumentId); }
function formatDocumentTime(value) { if (!value) return ""; const date = new Date(value); if (Number.isNaN(date.getTime())) return ""; return date.toLocaleString("ja-JP", { month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit" }); }
function renderLibraryList() { const list = document.querySelector("#libraryList"); if (!list) return; const library = getDocumentLibrary(); if (!library.length) { list.innerHTML = `<div class="library-empty">保存済みプリントはまだありません。<br>「名前を付けて保存」から保存してください。</div>`; return; } list.innerHTML = library.map((doc)=>`<div class="library-item ${doc.id===currentDocumentId?"active":""}" data-doc-id="${escapeHtml(doc.id)}"><div class="library-item-main"><strong>${escapeHtml(doc.title || "無題のプリント")}</strong><span>更新：${escapeHtml(formatDocumentTime(doc.updatedAt))}</span></div><div class="library-item-actions"><button type="button" data-library-action="open" data-doc-id="${escapeHtml(doc.id)}">開く</button><button type="button" data-library-action="duplicate" data-doc-id="${escapeHtml(doc.id)}">複製</button><button type="button" data-library-action="delete" data-doc-id="${escapeHtml(doc.id)}">削除</button></div></div>`).join(""); list.querySelectorAll("[data-library-action]").forEach((button)=>button.addEventListener("click",()=>{ const id=button.dataset.docId; const action=button.dataset.libraryAction; if(action==="open") openDocumentFromLibrary(id); if(action==="delete") deleteDocumentFromLibrary(id); if(action==="duplicate"){ const doc=getDocumentLibrary().find((item)=>item.id===id); if(!doc) return; const title=prompt("複製後のプリント名を入力してください。", `${doc.title || "無題のプリント"} コピー`); if(title===null) return; saveDocumentRecord({ id:generateDocumentId(), title:safeDocumentTitle(title), createdAt:appNowIso(), updatedAt:appNowIso(), data:clonePlain(doc.data) }); renderLibraryList(); }})); }
function openLibraryDialog() { renderLibraryList(); const dialog = document.querySelector("#libraryDialog"); if (dialog?.showModal) dialog.showModal(); }
function exportLibraryBackup() { const payload = { app:"math_print_tool_library", version:77, exportedAt:appNowIso(), currentDocumentId, library:getDocumentLibrary() }; const stamp = new Date().toISOString().slice(0,10).replaceAll("-",""); downloadText(`mathprint_backup_${stamp}.json`, JSON.stringify(payload,null,2), "application/json"); }
async function importLibraryBackupFile(file) { if (!file) return; try { const payload = JSON.parse(await file.text()); let incoming=[]; if(payload?.app==="math_print_tool_library" && Array.isArray(payload.library)) incoming=payload.library; else if(payload?.app==="math_print_tool" && payload.data) incoming=[{title:payload.data.title||"読込プリント", data:payload.data}]; else if(payload && typeof payload==="object" && Array.isArray(payload.blocks)) incoming=[{title:payload.title||"読込プリント", data:payload}]; else if(Array.isArray(payload)) incoming=payload; if(!incoming.length){ alert("読み込めるプリントデータが見つかりませんでした。"); return; } const library=getDocumentLibrary(); const map=new Map(library.map((doc)=>[doc.id,doc])); incoming.forEach((doc)=>{ if(!doc?.data) return; const id=(doc.id && !map.has(doc.id)) ? doc.id : generateDocumentId(); map.set(id,{ id, title:safeDocumentTitle(doc.title || doc.data.title || "読込プリント"), createdAt:doc.createdAt || appNowIso(), updatedAt:appNowIso(), data:doc.data }); }); setDocumentLibrary(Array.from(map.values()).sort((a,b)=>String(b.updatedAt||"").localeCompare(String(a.updatedAt||"")))); renderLibraryList(); updateSaveStatus("バックアップを読み込みました", "saved"); alert("バックアップを読み込みました。プリント一覧から開けます。"); } catch(error) { console.error(error); alert("バックアップを読み込めませんでした。ファイルを確認してください。"); } }
function restoreCurrentDocumentPointer() { const savedId = localStorage.getItem(CURRENT_DOCUMENT_ID_KEY) || ""; if (savedId && getDocumentLibrary().some((doc)=>doc.id===savedId)) currentDocumentId = savedId; hasUnsavedDocumentChanges = false; updateCurrentDocName(); }

function downloadText(filename, text, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function renderAll() {
  renderEditor();
  renderPreview();
}

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    state.blocks.push(createBlock(button.dataset.add));
    renderAll();
    saveToBrowser();
  });
});

[titleInput, unitInput, nameLineInput, paperSizeInput, paperOrientationInput, baseFontSizeInput, baseFontFamilyInput, pageMarginInput].filter(Boolean).forEach((input) => {
  input.addEventListener("input", () => {
    renderPreview();
    saveToBrowser();
  });
});

document.querySelector("#printBtn").addEventListener("click", () => {
  renderPreview();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => window.print());
  });
});

window.addEventListener("beforeprint", () => {
  renderPreview();
});

document.querySelector("#downloadTexBtn").addEventListener("click", () => {
  renderPreview();
  downloadText("math-print.tex", generateTex(), "text/x-tex");
});

document.querySelector("#newDocBtn")?.addEventListener("click", () => newDocument());
document.querySelector("#openLibraryBtn")?.addEventListener("click", () => openLibraryDialog());
document.querySelector("#saveDocBtn")?.addEventListener("click", () => saveCurrentDocument());
document.querySelector("#saveAsDocBtn")?.addEventListener("click", () => saveAsDocument());
document.querySelector("#duplicateDocBtn")?.addEventListener("click", () => duplicateCurrentDocument());
document.querySelector("#deleteDocBtn")?.addEventListener("click", () => deleteCurrentDocument());
document.querySelector("#backupExportBtn")?.addEventListener("click", () => exportLibraryBackup());

document.querySelector("#backupImportInput")?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  await importLibraryBackupFile(file);
  event.target.value = "";
});

document.querySelector("#exportAllSavesBtn")?.addEventListener("click", () => {
  exportAllBrowserSaves();
});

document.querySelector("#clearSavedBtn")?.addEventListener("click", () => {
  clearBrowserSave();
});

window.addEventListener("resize", () => { cachedPageHeightPx = null; updatePageStatus(); });

window.addEventListener("load", () => {
  const loaded = loadFromBrowser();
  migrateStateData(state);
  renderAll();
  restoreCurrentDocumentPointer();
  if (loaded) updateSaveStatus("自動保存を復元しました", "saved");
});
