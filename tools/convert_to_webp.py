from PIL import Image
import os
from pathlib import Path
import sys
import shutil

def convert_to_webp(source_path: str, output_path: str = None):
    """
    将指定目录下的所有图片无损转换为webp格式
    
    参数:
        source_path: 源图片目录路径
        output_path: 输出目录路径(可选)
    """
    # 支持的图片格式
    SUPPORTED_FORMATS = {'.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'}
    
    source_dir = Path(source_path)
    if not source_dir.exists():
        print(f"目录不存在: {source_path}")
        return
        
    # 创建输出目录
    if output_path:
        output_dir = Path(output_path)
    else:
        output_dir = source_dir.parent / f"{source_dir.name}_webp"
    output_dir.mkdir(exist_ok=True, parents=True)
    
    # 遍历源目录中的所有文件
    for img_path in source_dir.glob('**/*'):
        if img_path.suffix in SUPPORTED_FORMATS:
            try:
                # 保持目录结构
                relative_path = img_path.relative_to(source_dir)
                output_path = output_dir / relative_path.with_suffix('.webp')
                
                # 确保输出文件的父目录存在
                output_path.parent.mkdir(parents=True, exist_ok=True)
                
                # 转换图片
                with Image.open(img_path) as img:
                    # 转换为RGBA模式以保持透明度(如果有的话)
                    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                        img = img.convert('RGBA')
                    else:
                        img = img.convert('RGB')
                        
                    # 无损转换
                    img.save(
                        output_path, 
                        'WEBP',
                        lossless=True,
                        quality=100,  # 最高质量
                        method=6,     # 最慢但最好的压缩方法
                    )
                
                # 比较文件大小
                original_size = os.path.getsize(img_path) / 1024  # KB
                converted_size = os.path.getsize(output_path) / 1024  # KB
                
                print(f"已转换: {img_path.name} -> {output_path.name}")
                print(f"大小变化: {original_size:.1f}KB -> {converted_size:.1f}KB")
                
            except Exception as e:
                print(f"转换失败 {img_path.name}: {str(e)}")

def copy_to_public(webp_dir: Path, public_dir: Path):
    """复制转换后的webp文件到public目录"""
    if webp_dir.exists():
        public_dir.mkdir(exist_ok=True, parents=True)
        for webp_file in webp_dir.glob('**/*.webp'):
            relative_path = webp_file.relative_to(webp_dir)
            dest_path = public_dir / relative_path
            dest_path.parent.mkdir(exist_ok=True, parents=True)
            shutil.copy2(webp_file, dest_path)
            print(f"已复制到public: {relative_path}")

def main():
    # 如果提供了命令行参数,就转换指定目录
    if len(sys.argv) > 1:
        source_path = sys.argv[1]
        if os.path.exists(source_path):
            print(f"\n正在转换目录: {source_path}")
            convert_to_webp(source_path)
        else:
            print(f"\n错误: 目录不存在: {source_path}")
        return

    # 默认行为
    illustrations_path = Path("assets/illustrations")
    if illustrations_path.exists():
        print("\n正在转换立绘...")
        convert_to_webp(str(illustrations_path))
        # 复制到public目录
        copy_to_public(
            illustrations_path.parent / "illustrations_webp",
            Path("public/illustrations")
        )
    else:
        print(f"\n未找到立绘目录,请创建: {illustrations_path}")

if __name__ == "__main__":
    main() 