import os
import frontmatter

def update_markdown_files():
    categories = ['proj', 'cert', 'item', 'achv']
    watch_dir = 'data'
    
    for cat in categories:
        dir_path = os.path.join(watch_dir, cat)
        if not os.path.exists(dir_path):
            continue
            
        for entry in os.listdir(dir_path):
            entry_path = os.path.join(dir_path, entry)
            if not os.path.isdir(entry_path):
                continue
                
            idx_file = os.path.join(entry_path, 'index.md')
            if os.path.exists(idx_file):
                print(f"Processing {idx_file}...")
                with open(idx_file, 'r', encoding='utf-8') as f:
                    post = frontmatter.load(f)
                
                # Check if done is already in metadata
                if 'done' not in post.metadata:
                    post.metadata['done'] = False
                    
                    # Dump back
                    content = frontmatter.dumps(post)
                    with open(idx_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {idx_file} with done: false")
                else:
                    print(f"{idx_file} already has done: {post.metadata['done']}")

if __name__ == '__main__':
    update_markdown_files()
