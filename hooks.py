import re
import shutil
from pathlib import Path


def vuepress_slugify(text, sep):
    text = re.sub(r'[（）【】『』「」《》〈〉]', '-', text)
    text = text.lower()
    text = re.sub(r'[^\w一-鿿぀-ヿ]', '-', text)
    text = re.sub(r'-+', '-', text).strip('-')
    return text


def _read_frontmatter(path):
    try:
        text = Path(path).read_text(encoding="utf-8")
        if not text.startswith("---"):
            return {}
        end = text.index("\n---", 3)
        import yaml
        return yaml.safe_load(text[3:end]) or {}
    except Exception:
        return {}


def _page_order(item):
    if hasattr(item, "file") and item.file and item.file.abs_src_path:
        fm = _read_frontmatter(item.file.abs_src_path)
        return fm.get("order", 0)
    return 0


def _section_order(item):
    from mkdocs.structure.nav import Section
    if isinstance(item, Section) and item.children:
        for child in item.children:
            if hasattr(child, "file") and child.file and child.file.abs_src_path:
                fm = _read_frontmatter(child.file.abs_src_path)
                d = fm.get("dir")
                if isinstance(d, dict) and "order" in d:
                    return d["order"]
    return 0


def _sort_nav(items):
    from mkdocs.structure.nav import Section
    sections = [i for i in items if isinstance(i, Section)]
    pages = [i for i in items if not isinstance(i, Section)]
    sections.sort(key=_section_order)
    pages.sort(key=_page_order)
    for section in sections:
        if not section.children:
            continue
        index_page = None
        rest = []
        for child in section.children:
            src = getattr(getattr(child, "file", None), "src_path", "")
            if src.endswith("README.md"):
                index_page = child
            else:
                rest.append(child)
        sorted_rest = _sort_nav(rest)
        if index_page is not None:
            fm = _read_frontmatter(index_page.file.abs_src_path)
            if fm.get("index") is False:
                # index: false → README 不在导航列表里，但保留让 MkDocs 能生成文件
                section.children = [index_page] + sorted_rest
            else:
                # 无 index: false → README 作为第一个显式页面出现在列表里
                section.children = [index_page] + sorted_rest
        else:
            section.children = sorted_rest
    return sections + pages


def on_nav(nav, **kwargs):
    nav.items = _sort_nav(nav.items)
    return nav


def on_config(config, **kwargs):
    for ext in config["markdown_extensions"]:
        if hasattr(ext, "getConfigs"):
            cfg = ext.getConfigs()
            if "slugify" in cfg:
                ext.setConfig("slugify", vuepress_slugify)
                return config
    config["mdx_configs"].setdefault("toc", {})["slugify"] = vuepress_slugify
    return config


def on_env(env, config, files, **kwargs):
    for file in files.documentation_pages():
        if file.page and file.page.meta:
            file.page.meta.pop("icon", None)
    return env


# theme.ts stylize 规则：**红色** / **潜伏战线** 等加 class
_STYLIZE = [
    (re.compile(r'\*\*(红色?)\*\*'), r'<strong class="red">\1</strong>'),
    (re.compile(r'\*\*(蓝色?)\*\*'), r'<strong class="blue">\1</strong>'),
    (re.compile(r'\*\*(绿色?)\*\*'), r'<strong class="green">\1</strong>'),
    (re.compile(r'\*\*(黑色?)\*\*'), r'<strong class="black">\1</strong>'),
    (re.compile(r'\*\*(潜伏战线)\*\*'), r'<strong class="red">\1</strong>'),
    (re.compile(r'\*\*(特工机关)\*\*'), r'<strong class="blue">\1</strong>'),
    (re.compile(r'\*\*(神秘人)\*\*'), r'<strong class="green">\1</strong>'),
    (re.compile(r'~~([^~]+)~~'), r'<s style="color:#999">\1</s>'),
]


def on_page_markdown(markdown, page, config, **kwargs):
    # index: false 的 README → 清空内容，section 标题可点但页面为空
    if page.file.src_path.endswith("README.md"):
        fm = page.meta if page.meta else _read_frontmatter(page.file.abs_src_path)
        if fm.get("index") is False:
            return ""

    # 删除 VuePress container 标记行（::: info 等）
    markdown = re.sub(r'^:{3,}.*$', '', markdown, flags=re.MULTILINE)
    # 从标题行删除所有 Vue 组件（影响 anchor 生成）
    markdown = re.sub(r'(<[A-Z][A-Za-z]*[^>]*/>\s*)+$', '', markdown, flags=re.MULTILINE)
    # 删除整行的 Vue 组件（如 <Catalog></Catalog>）
    markdown = re.sub(r'^<[A-Z][A-Za-z]*[^>]*>.*?</[A-Za-z]+>\s*$', '', markdown, flags=re.MULTILINE)
    # 删除 ::b:iconname =size /#color:: 图标语法
    markdown = re.sub(r'::b:\w+(?:\s*=\d+)?(?:\s*/#[\w]+)?::', '', markdown)
    # {.class} 语法：给前面的行内元素加 class，转成 HTML span 包裹
    # 例：**文字**{.green} → <strong class="green">文字</strong>
    markdown = re.sub(
        r'\*\*([^*]+)\*\*\{\.(\w+)\}',
        lambda m: f'<strong class="{m.group(2)}">{m.group(1)}</strong>',
        markdown
    )
    # 剩余孤立的 {.class} 直接删掉
    markdown = re.sub(r'\{\.[\w\s-]+\}', '', markdown)
    # \ + 换行 → <br/>
    markdown = re.sub(r'\\\n', '<br/>\n', markdown)
    # 收集含链接的脚注定义的 key，然后删掉定义和对应的引用
    bad_keys = re.findall(r'^\[(\^[^\]]+)\]:.*\[.*?\]\(.*?\)', markdown, flags=re.MULTILINE)
    markdown = re.sub(r'^\[\^[^\]]+\]:.*\[.*?\]\(.*?\).*$', '', markdown, flags=re.MULTILINE)
    for key in bad_keys:
        markdown = re.sub(r'\[' + re.escape(key) + r'\]', '', markdown)
    # stylize：关键词加色
    for pattern, repl in _STYLIZE:
        markdown = pattern.sub(repl, markdown)
    markdown = re.sub(r'@tab\s+(\w+)', r'\1代码：', markdown)
    return markdown


def on_post_build(config, **kwargs):
    public = Path(config["docs_dir"]).parent / ".vuepress" / "public"
    site = Path(config["site_dir"])

    if public.is_dir():
        for src in public.iterdir():
            dst = site / src.name
            if src.is_dir():
                shutil.copytree(src, dst, dirs_exist_ok=True)
            else:
                shutil.copy2(src, dst)

    scss = (Path(config["docs_dir"]).parent / ".vuepress" / "styles" / "index.scss").read_text(encoding="utf-8")
    css = scss.replace('html[data-theme="dark"]', '[data-md-color-scheme="slate"]')
    _CUSTOM_CSS = f"<style>\n{css}</style>"

    # 把 HTML 里的绝对路径改成相对路径，使 file:// 直接打开时也能正常加载
    for html_file in site.rglob("*.html"):
        depth = len(html_file.relative_to(site).parts) - 1
        prefix = "../" * depth if depth > 0 else ""
        text = html_file.read_text(encoding="utf-8")
        text = re.sub(r'((?:src|href)=")/', lambda m: m.group(1) + prefix, text)
        text = text.replace("</head>", _CUSTOM_CSS + "</head>", 1)
        html_file.write_text(text, encoding="utf-8")
