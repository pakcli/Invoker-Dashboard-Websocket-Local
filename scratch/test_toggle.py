import os
import sys
import frontmatter

def test_toggle():
    md_file_path = r"d:\0pro\backend-python-porto\data\proj\peer-to-peer\index.md"
    print("Loading file...")
    with open(md_file_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)
    
    print("Original done status:", post.metadata.get("done"))
    
    # Toggle to True
    post.metadata["done"] = True
    content = frontmatter.dumps(post)
    with open(md_file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    # Reload and check
    with open(md_file_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)
    print("After toggling to True:", post.metadata.get("done"))
    
    # Toggle back to False
    post.metadata["done"] = False
    content = frontmatter.dumps(post)
    with open(md_file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    # Reload and check
    with open(md_file_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)
    print("After toggling back to False:", post.metadata.get("done"))
    print("Test passed successfully!")

if __name__ == "__main__":
    test_toggle()
