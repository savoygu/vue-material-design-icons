npm run demo:prepublish
cd gh-pages
git init
git add -A
git commit -m 'update gh-pages'
git push -f git@github.com:savoygu/vue-material-design-icons.git master:gh-pages