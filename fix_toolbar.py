import os
import codecs

slides_dir = r'd:\Giáo án\japanese-lms\public\slides'
old_injection = '<style>.wb-toolbar { display: none !important; }</style>'
new_injection = "<script>if(window.self !== window.top) { document.write('<style>.wb-toolbar { display: none !important; }</style>'); }</script>"

count = 0
for root, dirs, files in os.walk(slides_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            try:
                with codecs.open(filepath, 'r', 'utf-8') as f:
                    content = f.read()
                
                if old_injection in content:
                    new_content = content.replace(old_injection, new_injection)
                    with codecs.open(filepath, 'w', 'utf-8') as f:
                        f.write(new_content)
                    count += 1
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

print(f"Replaced CSS injection with JS injection in {count} HTML files.")
