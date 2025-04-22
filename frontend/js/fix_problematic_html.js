/**
 * @description 修复HTML底部的无效脚本标签和字符
 */
document.addEventListener('DOMContentLoaded', function() {
    // 移除文档中的无效脚本标签
    setTimeout(function() {
        // 查找带有空格的脚本标签
        const scriptElements = document.querySelectorAll('script');
        
        // 检查最后一个脚本标签
        const lastScript = scriptElements[scriptElements.length - 1];
        
        if (lastScript && lastScript.src && lastScript.src.includes(' ')) {
            console.log('发现无效脚本标签，准备移除');
            lastScript.parentNode.removeChild(lastScript);
        }
        
        // 移除页面底部可能存在的其他无效字符
        const html = document.documentElement.innerHTML;
        
        // 检查HTML中是否有不规则的脚本标签
        if (html.includes('< s c r i p t')) {
            // 使用DOM API找到并处理这些特殊的标签
            const bodyContent = document.body.innerHTML;
            const cleanedContent = bodyContent.replace(/< s c r i p t.*?< \/.*?>/g, '');
            document.body.innerHTML = cleanedContent;
            console.log('已移除不规则的脚本标签');
        }
        
        console.log('HTML文件清理完成');
    }, 500);
}); 