import os
import codecs

slides_dir = r'd:\Giáo án\japanese-lms\public\slides'
style_injection = '<style>.wb-toolbar { display: none !important; }</style>'

count = 0
for root, dirs, files in os.walk(slides_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            try:
                with codecs.open(filepath, 'r', 'utf-8') as f:
                    content = f.read()
                
                # Check if already injected
                if style_injection not in content:
                    # Inject before </head> if it exists, else before </body>
                    if '</head>' in content:
                        new_content = content.replace('</head>', style_injection + '\n</head>')
                    elif '</body>' in content:
                        new_content = content.replace('</body>', style_injection + '\n</body>')
                    else:
                        new_content = content + '\n' + style_injection
                        
                    with codecs.open(filepath, 'w', 'utf-8') as f:
                        f.write(new_content)
                    count += 1
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

print(f"Injected CSS to hide old toolbar in {count} HTML files.")
