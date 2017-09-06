npm run demo:prepublish
cd gh-pages
git init
git add -A
git commit -m 'update gh-pages'
git push -f git@github.com:savoygu@gmail.com/vue-md-icons.git master:gh-pages