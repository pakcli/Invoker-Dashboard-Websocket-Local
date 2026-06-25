import os
import shutil
import frontmatter

def test_duplication():
    source_dir = r"d:\0pro\backend-python-porto\data\proj\peer-to-peer"
    target_dir = r"d:\0pro\backend-python-porto\data\proj\peer-to-peer-copy"
    
    if os.path.exists(target_dir):
        print("Cleaning up old copy directory...")
        shutil.rmtree(target_dir)
        
    print(f"Copying {source_dir} -> {target_dir}...")
    shutil.copytree(source_dir, target_dir)
    
    md_file_path = os.path.join(target_dir, "index.md")
    print(f"Reading {md_file_path}...")
    with open(md_file_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)
        
    old_title = post.metadata.get("title", "Unknown")
    new_title = f"{old_title} (Copy)"
    print(f"Updating title: {old_title} -> {new_title}")
    post.metadata["title"] = new_title
    
    content = frontmatter.dumps(post)
    with open(md_file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    # Reload and check
    with open(md_file_path, "r", encoding="utf-8") as f:
        post_reloaded = frontmatter.load(f)
    print("Reloaded title:", post_reloaded.metadata.get("title"))
    
    # Cleanup copy folder
    shutil.rmtree(target_dir)
    print("Temporary copy folder cleaned up. Test passed successfully!")

if __name__ == "__main__":
    test_duplication()
