rm -rf dist &&
vite build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M gh-pages &&
git remote add origin git@github.com/xmasuhai/vite-share-blog-website &&
git push -f -u origin gh-pages &&
cd -
echo https://xmasuhai.xyz/vite-share-blog-website/index.html
